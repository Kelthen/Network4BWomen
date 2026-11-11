// OWNED BY: shared — verrou global du site (page 404 pour tout le monde).
//
// Tant que le verrou est actif, CHAQUE requête (pages, API, images, robots, sitemap)
// reçoit la page 404 de lib/lock/page.ts avec un vrai statut 404.
// Seuls ceux qui ont le code d'accès (variable SITE_UNLOCK_CODE sur Vercel) voient le site.
//
//   • Déverrouiller le site pour tout le monde : SITE_LOCK=off sur Vercel + redéployer.
//   • Accès privé : sur la page 404, cliquer sur « Error » (en haut), puis entrer le code.
//     Cookie valable 30 jours. /__lock pour se déconnecter.
//   • 3 codes faux par IP → blocage 24 h (table Supabase site_unlock_attempts,
//     migration 0011). Un code juste ne passe pas non plus pendant le blocage.
//   • Sans SITE_UNLOCK_CODE, personne ne peut entrer.
import { NextResponse, type NextRequest } from "next/server";
import { LOCK_PAGE_HTML } from "@/lib/lock/page";

const COOKIE = "__site_key";
const BLOCKED_COOKIE = "__site_blocked"; // lisible par la page : masque le champ pendant le blocage
const MAX_AGE = 60 * 60 * 24 * 30;
const MAX_TRIES = 3;
const LOCK_SECONDS = 60 * 60 * 24;

async function sha256(text: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buf), (b) => b.toString(16).padStart(2, "0")).join("");
}

// Le cookie ne contient jamais le code lui-même, seulement une empreinte salée.
function token(code: string) {
  return sha256(`nbw-lock:v1:${code}`);
}

function safeEqual(a: string, b: string) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

function clientIp(req: NextRequest) {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

// ---------------------------------------------------------------------------
// Compteur d'essais : Supabase (partagé entre instances) + mémoire (secours).
// ---------------------------------------------------------------------------
type Attempt = { failures: number; lockedUntil: number };
const memory = new Map<string, Attempt>();

const SB_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const sbHeaders = SB_KEY
  ? { apikey: SB_KEY, authorization: `Bearer ${SB_KEY}`, "content-type": "application/json" }
  : undefined;

async function lockedUntil(ipHash: string): Promise<number> {
  const mem = memory.get(ipHash);
  let until = mem && mem.lockedUntil > Date.now() ? mem.lockedUntil : 0;
  if (SB_URL && sbHeaders) {
    try {
      const r = await fetch(
        `${SB_URL}/rest/v1/site_unlock_attempts?ip_hash=eq.${ipHash}&select=locked_until`,
        { headers: sbHeaders, cache: "no-store" },
      );
      if (r.ok) {
        const rows = (await r.json()) as { locked_until: string | null }[];
        const db = rows[0]?.locked_until ? Date.parse(rows[0].locked_until) : 0;
        if (db > Date.now()) until = Math.max(until, db);
      }
    } catch {
      /* base injoignable : on garde la mémoire */
    }
  }
  return until;
}

async function recordFailure(ipHash: string): Promise<Attempt> {
  const now = Date.now();
  const prev = memory.get(ipHash);
  const fresh = !prev || (prev.lockedUntil && prev.lockedUntil <= now);
  const mem: Attempt = { failures: fresh ? 1 : prev.failures + 1, lockedUntil: fresh ? 0 : prev.lockedUntil };
  if (mem.failures >= MAX_TRIES && !mem.lockedUntil) mem.lockedUntil = now + LOCK_SECONDS * 1000;
  memory.set(ipHash, mem);
  if (memory.size > 5000) for (const [k, v] of memory) if (v.lockedUntil && v.lockedUntil < now) memory.delete(k);

  if (SB_URL && sbHeaders) {
    try {
      const r = await fetch(`${SB_URL}/rest/v1/rpc/site_unlock_fail`, {
        method: "POST",
        headers: sbHeaders,
        cache: "no-store",
        body: JSON.stringify({ p_ip_hash: ipHash, p_max: MAX_TRIES, p_lock: `${LOCK_SECONDS} seconds` }),
      });
      if (r.ok) {
        const rows = (await r.json()) as { out_failures: number; out_locked_until: string | null }[];
        const row = rows[0];
        if (row) {
          return {
            failures: Math.max(row.out_failures, mem.failures),
            lockedUntil: Math.max(row.out_locked_until ? Date.parse(row.out_locked_until) : 0, mem.lockedUntil),
          };
        }
      }
    } catch {
      /* base injoignable : on garde la mémoire */
    }
  }
  return mem;
}

async function clearFailures(ipHash: string) {
  memory.delete(ipHash);
  if (SB_URL && sbHeaders) {
    await fetch(`${SB_URL}/rest/v1/site_unlock_attempts?ip_hash=eq.${ipHash}`, {
      method: "DELETE",
      headers: sbHeaders,
      cache: "no-store",
    }).catch(() => undefined);
  }
}

function blocked(req: NextRequest, until: number) {
  const res = NextResponse.redirect(new URL("/?blocked", req.url), 303);
  res.cookies.set(BLOCKED_COOKIE, "1", {
    path: "/",
    sameSite: "lax",
    secure: true,
    maxAge: Math.max(60, Math.ceil((until - Date.now()) / 1000)),
  });
  return res;
}

function lockedPage() {
  return new NextResponse(LOCK_PAGE_HTML, {
    status: 404,
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
      "x-robots-tag": "noindex, nofollow",
    },
  });
}

export async function middleware(req: NextRequest) {
  if (process.env.SITE_LOCK === "off") return NextResponse.next();

  const code = process.env.SITE_UNLOCK_CODE ?? "";
  const { pathname } = req.nextUrl;

  if (pathname === "/__unlock" && req.method === "POST") {
    const ipHash = await sha256(`nbw-lock:ip:${clientIp(req)}`);

    // Bloqué ? On ne regarde même pas le code.
    const until = await lockedUntil(ipHash);
    if (until > Date.now()) return blocked(req, until);

    const form = await req.formData().catch(() => null);
    const given = String(form?.get("code") ?? "").slice(0, 200);
    if (code && given && safeEqual(await token(given), await token(code))) {
      await clearFailures(ipHash);
      const res = NextResponse.redirect(new URL("/", req.url), 303);
      res.cookies.set(COOKIE, await token(code), {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: MAX_AGE,
      });
      res.cookies.delete(BLOCKED_COOKIE);
      return res;
    }

    const state = await recordFailure(ipHash);
    await new Promise((r) => setTimeout(r, 800)); // freine le devinage
    if (state.lockedUntil > Date.now()) return blocked(req, state.lockedUntil);
    const left = Math.max(0, MAX_TRIES - state.failures);
    return NextResponse.redirect(new URL(`/?denied=${left}`, req.url), 303);
  }

  if (pathname === "/__lock") {
    const res = NextResponse.redirect(new URL("/", req.url), 303);
    res.cookies.delete(COOKIE);
    return res;
  }

  const cookie = req.cookies.get(COOKIE)?.value;
  if (code && cookie && safeEqual(cookie, await token(code))) return NextResponse.next();

  return lockedPage();
}

// Tout passe par le verrou, y compris /_next, /images, /api, robots.txt et sitemap.xml.
export const config = { matcher: "/:path*" };

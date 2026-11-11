// OWNED BY: shared — verrou global du site (page 404 pour tout le monde).
//
// Tant que le verrou est actif, CHAQUE requête (pages, API, images, robots, sitemap)
// reçoit la page 404 de lib/lock/page.ts avec un vrai statut 404.
// Seuls ceux qui ont le code d'accès (variable SITE_UNLOCK_CODE sur Vercel) voient le site.
//
//   • Déverrouiller le site pour tout le monde : SITE_LOCK=off sur Vercel + redéployer.
//   • Accès privé : sur la page 404, cliquer 5 fois sur « 404 » (ou taper « open sesame »),
//     puis entrer le code. Cookie valable 30 jours. /__lock pour se déconnecter.
//   • Sans SITE_UNLOCK_CODE, personne ne peut entrer.
import { NextResponse, type NextRequest } from "next/server";
import { LOCK_PAGE_HTML } from "@/lib/lock/page";

const COOKIE = "__site_key";
const MAX_AGE = 60 * 60 * 24 * 30;

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
    const form = await req.formData().catch(() => null);
    const given = String(form?.get("code") ?? "");
    if (code && given && safeEqual(await token(given), await token(code))) {
      const res = NextResponse.redirect(new URL("/", req.url), 303);
      res.cookies.set(COOKIE, await token(code), {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: MAX_AGE,
      });
      return res;
    }
    await new Promise((r) => setTimeout(r, 800)); // freine le devinage
    return NextResponse.redirect(new URL("/?denied", req.url), 303);
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

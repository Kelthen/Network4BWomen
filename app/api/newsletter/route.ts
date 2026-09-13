// OWNED BY: rhamon — Newsletter API (double opt-in).
// Voir docs/DATA-MODEL.md (newsletter_subscribers) et supabase/migrations/0009.
//
// Flux :
//   1. POST ici → insère un rang inactif + confirmation_token (48h), envoie l'email
//      de confirmation. Ne notifie PAS NBW à ce stade (attendre la confirmation).
//   2. GET /api/newsletter/confirm?token=xxx → active, envoie welcome + notif NBW.
//   3. GET /api/newsletter/unsubscribe?token=<manage_token> → désactive (CASL).
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import { getClientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";
import { sendEmail } from "@/lib/email";
import { confirmationEmail } from "@/lib/newsletterEmails";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const CONFIRMATION_TTL_MS = 48 * 60 * 60 * 1000; // 48h

function newToken(): string {
  return randomBytes(24).toString("hex");
}

export async function POST(req: Request) {
  // Rate limiting : 5 inscriptions / minute / IP.
  const rl = rateLimit(`newsletter:${getClientIp(req)}`, 5, 60_000);
  if (!rl.ok) return tooManyRequests(rl.retryAfter);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const email = String(body.email ?? "").trim().toLowerCase();
  const source = String(body.source ?? "site").trim().slice(0, 100);

  if (!EMAIL_RE.test(email) || email.length > 200) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 422 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    return NextResponse.json(
      { error: "Newsletter isn't active yet. Please email info.networkofblackwomen@gmail.com." },
      { status: 503 },
    );
  }

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  // Regarde l'existant : si déjà confirmé, on ne renvoie pas d'email — on répond
  // en douceur pour ne pas révéler l'appartenance à la liste (privacy).
  const { data: existing, error: fetchErr } = await supabase
    .from("newsletter_subscribers")
    .select("id, is_active, confirmed_at")
    .eq("email", email)
    .maybeSingle();

  if (fetchErr) {
    console.error("[newsletter] fetch error:", fetchErr.message);
    return NextResponse.json({ error: "Couldn't subscribe right now. Please try again later." }, { status: 500 });
  }

  if (existing?.confirmed_at) {
    // Déjà confirmé → répondre "check your inbox" sans rien envoyer.
    return NextResponse.json({ ok: true, state: "already_confirmed" });
  }

  const token = newToken();
  const expiresAt = new Date(Date.now() + CONFIRMATION_TTL_MS).toISOString();

  const { error: upsertErr } = await supabase
    .from("newsletter_subscribers")
    .upsert(
      {
        email,
        source,
        is_active: false,
        confirmation_token: token,
        token_expires_at: expiresAt,
      },
      { onConflict: "email" },
    );

  if (upsertErr) {
    console.error("[newsletter] upsert error:", upsertErr.message);
    return NextResponse.json({ error: "Couldn't subscribe right now. Please try again later." }, { status: 500 });
  }

  // Best-effort : l'email peut échouer sans casser la souscription. Le rang existe
  // en base ; l'utilisateur peut re-tenter, ce qui régénérera un token.
  const mail = await sendEmail({ to: email, ...confirmationEmail(email, token) });
  if (!mail.ok && !mail.skipped) {
    console.error("[newsletter] confirmation email failed:", mail.error);
  }

  return NextResponse.json({ ok: true, state: "confirmation_sent" });
}

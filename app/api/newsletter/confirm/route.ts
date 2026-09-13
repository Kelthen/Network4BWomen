// OWNED BY: rhamon — Newsletter confirm (double opt-in step 2).
// GET /api/newsletter/confirm?token=xxx →
//   1. Vérifie le confirmation_token + non-expiry.
//   2. Passe is_active=true, set confirmed_at, génère un manage_token permanent
//      (pour l'unsubscribe futur), efface le confirmation_token/token_expires_at.
//   3. Envoie welcome au subscriber + notif à l'équipe NBW (best-effort).
//   4. Redirige vers /newsletter/confirmed (état=ok) ou avec ?state=… en cas d'erreur.
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "node:crypto";
import { SITE_URL, CONTACT_EMAIL } from "@/lib/site";
import { sendEmail } from "@/lib/email";
import { welcomeEmail, adminNotifyEmail } from "@/lib/newsletterEmails";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function redirect(state: "ok" | "expired" | "invalid" | "already" | "unavailable"): NextResponse {
  const dest = new URL(`${SITE_URL}/newsletter/confirmed`);
  if (state !== "ok") dest.searchParams.set("state", state);
  return NextResponse.redirect(dest, { status: 302 });
}

export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token")?.trim() ?? "";
  if (!token || token.length > 200) return redirect("invalid");

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return redirect("unavailable");

  const supabase = createClient(url, serviceKey, { auth: { persistSession: false } });

  const { data: row, error: fetchErr } = await supabase
    .from("newsletter_subscribers")
    .select("id, email, source, confirmed_at, token_expires_at, manage_token")
    .eq("confirmation_token", token)
    .maybeSingle();

  if (fetchErr) {
    console.error("[newsletter/confirm] fetch error:", fetchErr.message);
    return redirect("unavailable");
  }

  if (!row) {
    // Token inconnu — soit invalide, soit déjà consommé. On distingue en cherchant
    // par manage_token (post-confirmation, on l'expose dans l'unsubscribe, pas ici),
    // donc on reste vague : "invalid" couvre les deux cas côté UX.
    return redirect("invalid");
  }

  if (row.confirmed_at) {
    return redirect("already");
  }

  if (!row.token_expires_at || new Date(row.token_expires_at).getTime() < Date.now()) {
    return redirect("expired");
  }

  const manageToken = row.manage_token || randomBytes(24).toString("hex");
  const nowIso = new Date().toISOString();

  const { error: updErr } = await supabase
    .from("newsletter_subscribers")
    .update({
      is_active: true,
      confirmed_at: nowIso,
      confirmation_token: null,
      token_expires_at: null,
      manage_token: manageToken,
      unsubscribed_at: null,
    })
    .eq("id", row.id);

  if (updErr) {
    console.error("[newsletter/confirm] update error:", updErr.message);
    return redirect("unavailable");
  }

  // Best-effort : welcome au subscriber + notif à NBW.
  const welcome = await sendEmail({ to: row.email, ...welcomeEmail(row.email, manageToken) });
  if (!welcome.ok && !welcome.skipped) {
    console.error("[newsletter/confirm] welcome email failed:", welcome.error);
  }

  const notifyTo = process.env.NEWSLETTER_NOTIFY_TO || CONTACT_EMAIL;
  const notif = await sendEmail({ to: notifyTo, ...adminNotifyEmail(row.email, row.source ?? "site") });
  if (!notif.ok && !notif.skipped) {
    console.error("[newsletter/confirm] admin notif failed:", notif.error);
  }

  return redirect("ok");
}

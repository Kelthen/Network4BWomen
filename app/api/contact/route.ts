// OWNED BY: rhamon — API Contact. Voir docs/DATA-MODEL.md (form_submissions).
// Deux canaux, indépendants et tolérants aux pannes :
//   1) Email via Resend  → notification à NBW (reply-to = visiteur) + auto-réponse au visiteur.
//   2) Base Supabase     → copie/historique dans form_submissions (SERVICE_ROLE, jamais côté client).
// Le formulaire est "actif" dès qu'AU MOINS un canal est configuré (clé Resend OU clés Supabase).
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { sendEmail, escapeHtml } from "@/lib/email";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import { getClientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";

// Plafonds de longueur (anti-abus / payload) — voir checklist sécurité.
const MAX = { name: 100, email: 200, message: 5000 };

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Sujets exposés (CONTENT §10) → type normalisé dans form_submissions + libellé lisible.
const SUBJECT_TO_TYPE: Record<string, string> = {
  general: "contact",
  partnership: "partner",
  media: "contact",
  volunteer: "volunteer",
};
const SUBJECT_LABEL: Record<string, string> = {
  general: "General",
  partnership: "Partnership",
  media: "Media",
  volunteer: "Volunteer",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  // Rate limiting : 5 envois / minute / IP (best-effort, anti-spam).
  const rl = rateLimit(`contact:${getClientIp(req)}`, 5, 60_000);
  if (!rl.ok) return tooManyRequests(rl.retryAfter);

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  // Honeypot anti-spam : champ caché "company" que seuls les bots remplissent.
  // On accepte silencieusement (200) sans rien envoyer → le bot croit avoir réussi.
  if (String(body.company ?? "").trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const subject = String(body.subject ?? "general").trim();

  // Validation serveur (bornes min ET max).
  if (
    name.length < 2 || name.length > MAX.name ||
    !EMAIL_RE.test(email) || email.length > MAX.email ||
    message.length < 10 || message.length > MAX.message
  ) {
    return NextResponse.json(
      { error: "Please check your name, email, and message (10–5000 characters)." },
      { status: 422 },
    );
  }

  const type = SUBJECT_TO_TYPE[subject] ?? "contact";
  const subjectLabel = SUBJECT_LABEL[subject] ?? "General";

  const hasResend = Boolean(process.env.RESEND_API_KEY);
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const hasSupabase = Boolean(supabaseUrl && serviceKey);

  // Aucun canal configuré → le formulaire n'est pas encore branché.
  if (!hasResend && !hasSupabase) {
    return NextResponse.json(
      { error: `The form isn't active yet. Please email us at ${CONTACT_EMAIL}.` },
      { status: 503 },
    );
  }

  let anySuccess = false;

  // --- Canal 2 : stockage Supabase (best-effort, ne bloque pas la réponse) ---
  if (hasSupabase) {
    try {
      const supabase = createClient(supabaseUrl!, serviceKey!, { auth: { persistSession: false } });
      const { error } = await supabase.from("form_submissions").insert({
        type,
        name,
        email,
        message,
        payload: { subject },
        status: "new",
      });
      if (!error) anySuccess = true;
      else console.error("[contact] supabase insert error:", error.message);
    } catch (e) {
      console.error("[contact] supabase threw:", e);
    }
  }

  // --- Canal 1 : emails via Resend ---
  if (hasResend) {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMsg = escapeHtml(message).replace(/\n/g, "<br>");

    // 1a) Notification à l'équipe NBW — reply-to = visiteur (répondre en un clic).
    // Destinataire configurable : tant que le domaine n'est pas vérifié dans Resend,
    // pointer CONTACT_NOTIFY_TO sur l'adresse vérifiée du compte pour éviter le 403.
    const notifyTo = process.env.CONTACT_NOTIFY_TO || CONTACT_EMAIL;
    const notif = await sendEmail({
      to: notifyTo,
      replyTo: email,
      subject: `New ${subjectLabel} message from ${name}`,
      text: `From: ${name} <${email}>\nSubject: ${subjectLabel}\n\n${message}`,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#44312b">
          <h2 style="margin:0 0 12px">New ${escapeHtml(subjectLabel)} message</h2>
          <p style="margin:0 0 4px"><strong>Name:</strong> ${safeName}</p>
          <p style="margin:0 0 4px"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p style="margin:16px 0 4px"><strong>Message:</strong></p>
          <p style="margin:0;padding:12px 16px;background:#FBF7F0;border-radius:8px;line-height:1.6">${safeMsg}</p>
          <p style="margin:20px 0 0;color:#8a6d1f;font-size:13px">Reply directly to this email to answer ${safeName}.</p>
        </div>`,
    });
    if (notif.ok) anySuccess = true;
    else if (!notif.skipped) console.error("[contact] notif email failed:", notif.error);

    // 1b) Auto-réponse au visiteur (best-effort — n'affecte pas le succès global).
    const auto = await sendEmail({
      to: email,
      replyTo: CONTACT_EMAIL,
      subject: `Thank you for reaching out to ${SITE_NAME}`,
      text: `Hi ${name},\n\nThank you for contacting ${SITE_NAME}. We've received your message and a member of our team will get back to you soon.\n\nWith gratitude,\nThe ${SITE_NAME} team`,
      html: `
        <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#44312b;line-height:1.6">
          <p>Hi ${safeName},</p>
          <p>Thank you for reaching out to <strong>${escapeHtml(SITE_NAME)}</strong> 💛</p>
          <p>We've received your message and a member of our team will get back to you soon. In the meantime, feel free to explore our programs and upcoming events.</p>
          <p style="margin-top:20px">With gratitude,<br>The ${escapeHtml(SITE_NAME)} team</p>
        </div>`,
    });
    if (!auto.ok && !auto.skipped) console.error("[contact] auto-reply failed:", auto.error);
  }

  if (!anySuccess) {
    return NextResponse.json(
      { error: "Couldn't send right now. Please try again later." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true });
}

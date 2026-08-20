// OWNED BY: rhamon — envoi d'emails transactionnels via Resend (REST, sans dépendance).
// Clé en env uniquement (RESEND_API_KEY). Si absente → no-op (le build/les routes restent OK).
// "From" : RESEND_FROM si défini (ex. "NBW <hello@networkofblackwomen.ca>"), sinon domaine de test Resend.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const DEFAULT_FROM = "Network of Black Women <onboarding@resend.dev>";

export type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
};

export type SendEmailResult =
  | { ok: true; id: string }
  | { ok: false; skipped: true } // pas de clé configurée
  | { ok: false; skipped: false; error: string };

/** Envoie un email via Resend. No-op propre si RESEND_API_KEY n'est pas défini. */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, skipped: true };

  const from = process.env.RESEND_FROM || DEFAULT_FROM;

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(input.to) ? input.to : [input.to],
        subject: input.subject,
        html: input.html,
        ...(input.text ? { text: input.text } : {}),
        ...(input.replyTo ? { reply_to: input.replyTo } : {}),
      }),
    });

    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      return { ok: false, skipped: false, error: `Resend ${res.status}: ${detail.slice(0, 300)}` };
    }

    const data = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: data.id ?? "" };
  } catch (e) {
    return { ok: false, skipped: false, error: e instanceof Error ? e.message : "network error" };
  }
}

/** Échappe le texte utilisateur avant de l'injecter dans du HTML d'email. */
export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

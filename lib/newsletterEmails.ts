// OWNED BY: rhamon — Gabarits d'emails newsletter (confirmation, welcome, notif admin).
// Séparés de la route pour être testables + réutilisables.
import { SITE_NAME, SITE_URL, CONTACT_EMAIL } from "@/lib/site";
import { escapeHtml } from "@/lib/email";

const BRAND_BROWN = "#573425";
const BRAND_PINK = "#F6828F";
const BRAND_CREAM = "#FBF7F0";

function shell(inner: string): string {
  return `
    <div style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:${BRAND_BROWN};max-width:560px;margin:0 auto;background:${BRAND_CREAM};padding:32px 24px;border-radius:16px;line-height:1.6">
      ${inner}
      <p style="margin:32px 0 0;font-size:12px;color:#8a6d1f">
        ${escapeHtml(SITE_NAME)} · Alberta · <a href="mailto:${CONTACT_EMAIL}" style="color:#8a6d1f">${CONTACT_EMAIL}</a>
      </p>
    </div>`;
}

/** Email envoyé à un nouvel inscrit — lien de confirmation (48h). */
export function confirmationEmail(email: string, token: string): { subject: string; html: string; text: string } {
  const url = `${SITE_URL}/api/newsletter/confirm?token=${encodeURIComponent(token)}`;
  const safeEmail = escapeHtml(email);
  return {
    subject: `Confirm your subscription to ${SITE_NAME}`,
    text: `Hi,

Please confirm your subscription to ${SITE_NAME} by opening this link within 48 hours:

${url}

If you didn't request this, ignore this email — nothing will happen.

With gratitude,
The ${SITE_NAME} team
${CONTACT_EMAIL}`,
    html: shell(`
      <p style="margin:0 0 12px;font-size:20px;font-family:Georgia,serif">Almost there 💛</p>
      <p style="margin:0 0 20px">Please confirm that <strong>${safeEmail}</strong> subscribed to updates from <strong>${escapeHtml(SITE_NAME)}</strong>.</p>
      <p style="margin:0 0 24px">
        <a href="${url}" style="display:inline-block;background:${BRAND_PINK};color:${BRAND_BROWN};text-decoration:none;padding:14px 24px;border-radius:999px;font-weight:600">
          Confirm my subscription
        </a>
      </p>
      <p style="margin:0 0 8px;font-size:13px;color:#8a6d1f">This link expires in 48 hours.</p>
      <p style="margin:0 0 20px;font-size:13px;color:#8a6d1f">If the button doesn't work, copy and paste this URL:<br>
        <span style="word-break:break-all">${url}</span>
      </p>
      <p style="margin:0;font-size:13px">If you didn't request this, ignore this email — nothing will happen.</p>
    `),
  };
}

/** Welcome email envoyé après confirmation. Inclut le lien unsubscribe (CASL). */
export function welcomeEmail(email: string, manageToken: string): { subject: string; html: string; text: string } {
  const unsubUrl = `${SITE_URL}/api/newsletter/unsubscribe?token=${encodeURIComponent(manageToken)}`;
  return {
    subject: `Welcome to ${SITE_NAME} 💛`,
    text: `Hi,

Thanks for joining the ${SITE_NAME} newsletter — we're glad to have you.

You'll hear from us about programs, events, scholarships, and stories from the community. We keep it warm, useful, and never too frequent.

Unsubscribe anytime: ${unsubUrl}

With gratitude,
The ${SITE_NAME} team
${CONTACT_EMAIL}`,
    html: shell(`
      <p style="margin:0 0 12px;font-size:22px;font-family:Georgia,serif">Welcome to ${escapeHtml(SITE_NAME)} 💛</p>
      <p style="margin:0 0 16px">Thank you for joining our community. You'll hear from us about programs, events, scholarships, and stories from the network.</p>
      <p style="margin:0 0 24px">We keep things warm, useful, and never too frequent.</p>
      <p style="margin:24px 0 0;font-size:12px;color:#8a6d1f">
        You subscribed as ${escapeHtml(email)}. Not you, or changed your mind?
        <a href="${unsubUrl}" style="color:#8a6d1f">Unsubscribe here</a>.
      </p>
    `),
  };
}

/** Notification à l'équipe NBW pour chaque confirmation réussie. */
export function adminNotifyEmail(email: string, source: string): { subject: string; html: string; text: string } {
  const safeEmail = escapeHtml(email);
  const safeSource = escapeHtml(source);
  return {
    subject: `New newsletter subscriber: ${email}`,
    text: `A new subscriber just confirmed their newsletter subscription.

Email : ${email}
Source: ${source}
When  : ${new Date().toLocaleString("en-CA", { timeZone: "America/Edmonton" })} (Alberta time)`,
    html: `
      <div style="font-family:system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;color:#44312b">
        <h2 style="margin:0 0 12px">New confirmed subscriber 🎉</h2>
        <p style="margin:0 0 4px"><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
        <p style="margin:0 0 4px"><strong>Source:</strong> ${safeSource}</p>
        <p style="margin:0 0 12px;color:#8a6d1f;font-size:13px">Alberta time: ${new Date().toLocaleString("en-CA", { timeZone: "America/Edmonton" })}</p>
      </div>`,
  };
}

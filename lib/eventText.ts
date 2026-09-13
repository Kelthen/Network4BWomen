// OWNED BY: rhamon — Événements (override zone serge, voir OWNERSHIP.yml).
// Helpers pour parser une description d'événement rédigée à main libre
// (souvent avec un lien d'inscription collé dedans) et en tirer un
// lien externe propre + une prose lisible.

export type ParsedEventDescription = {
  /** Description nettoyée (URL extraite retirée, espaces normalisés). */
  clean: string;
  /** Première URL http(s) trouvée dans le texte, sinon null. */
  extractedUrl: string | null;
  /** Premier paragraphe / phrase, borné en longueur — pour les teasers de carte. */
  teaser: string;
};

const URL_RE = /https?:\/\/\S+/i;

/**
 * Extrait le premier lien d'inscription trouvé dans le texte, retourne aussi
 * une version « propre » (sans le lien) et un teaser court pour l'affichage
 * carte. Le comportement est purement défensif : si `text` est null/vide, tout
 * est null/vide.
 */
export function parseEventDescription(text: string | null | undefined): ParsedEventDescription {
  if (!text) return { clean: "", extractedUrl: null, teaser: "" };

  const match = text.match(URL_RE);
  const extractedUrl = match ? cleanUrl(match[0]) : null;

  const clean = text
    .replace(URL_RE, "")
    // pattern courant : "Register: <url>" ou "Sign up: <url>" → on retire le préfixe orphelin
    .replace(/\b(register|sign\s?up|tickets?|inscri(?:re|ption))\s*:?\s*$/gim, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  const teaser = shortTeaser(clean, 140);
  return { clean, extractedUrl, teaser };
}

/**
 * Retourne la première phrase ou paragraphe de `text`, tronqué proprement
 * (mot entier) à `max` caractères, avec ellipse si tronqué.
 */
export function shortTeaser(text: string, max = 140): string {
  if (!text) return "";
  const firstBreak = text.search(/[.!?](\s|$)/);
  let base = firstBreak > 0 ? text.slice(0, firstBreak + 1) : text;
  if (base.length <= max) return base.trim();
  const cut = base.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 60 ? cut.slice(0, lastSpace) : cut).trim() + "…";
}

/** Retire la ponctuation résiduelle collée à la fin d'une URL (`)`, `.`, `,`). */
function cleanUrl(u: string): string {
  return u.replace(/[)\].,;:!?]+$/, "");
}

/** Label court + humain pour un CTA d'inscription externe (Bloomtickets, Eventbrite…). */
export function registerLabelFor(url: string): string {
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (/bloomtickets/i.test(host)) return "Register on Bloomtickets";
    if (/eventbrite/i.test(host)) return "Register on Eventbrite";
    if (/luma|lu\.ma/i.test(host)) return "Register on Lu.ma";
    if (/tickettailor/i.test(host)) return "Register on Ticket Tailor";
    return "Register (external)";
  } catch {
    return "Register";
  }
}

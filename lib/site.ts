// OWNED BY: shared — constantes du site (SEO, URL canonique).
// ⚠️ Définir NEXT_PUBLIC_SITE_URL sur Vercel = ton vrai domaine (ex. https://networkofblackwomen.ca).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export const SITE_NAME = "Network of Black Women";
export const SITE_TAGLINE = "Empowering Black Women. Building Community. Creating Leaders.";
export const SITE_DESCRIPTION =
  "Network of Black Women (NBW) is a sisterhood for Black women and girls in Toronto, Ontario — empowering, connecting, and uplifting through community, leadership, wellness, and opportunity.";

export const CONTACT_EMAIL = "info.networkofblackwomen@gmail.com";
export const CONTACT_PHONE = "(403) 635-8688";

// Réseaux sociaux — comptes réels NBW (questionnaire de contenu). Facebook/TikTok
// pas encore fournis par NBW → volontairement absents (pas de lien mort/placeholder).
export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/networkofblackwomen/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/network-of-black-women-32461342a/" },
] as const;

// Routes indexables (hors routes API).
export const ROUTES = [
  "",
  "/about",
  "/programs",
  "/events",
  "/conference",
  "/resources",
  "/news",
  "/gallery",
  "/get-involved",
  "/contact",
  "/donate",
  "/privacy",
] as const;

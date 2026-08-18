// OWNED BY: shared — constantes du site (SEO, URL canonique).
// ⚠️ Définir NEXT_PUBLIC_SITE_URL sur Vercel = ton vrai domaine (ex. https://networkofblackwomen.ca).
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/+$/, "");

export const SITE_NAME = "Network of Black Women";
export const SITE_TAGLINE = "Empowering Black Women. Building Community. Creating Leaders.";
export const SITE_DESCRIPTION =
  "Network of Black Women (NBW) is a sisterhood for Black women and girls in Southern Alberta — empowering, connecting, and uplifting through community, leadership, wellness, and opportunity.";

export const CONTACT_EMAIL = "info.networkofblackwomen@gmail.com";
export const CONTACT_PHONE = "(403) 635-8688";

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

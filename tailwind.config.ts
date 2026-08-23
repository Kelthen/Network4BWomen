import type { Config } from "tailwindcss";

// Tokens de marque NBW — voir docs/BRAND.md.
// ⚠️ Accessibilité : texte long en brand.brown, jamais en rose clair sur blanc.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Palette officielle NBW — voir docs/BRAND.md (Brand Guidelines, août 2026).
        brand: {
          pink: "#F6828F", // Pink Primary — accent / fonds de boutons (PAS de texte sur blanc)
          pinkLight: "#ffbbbb",
          crimson: "#B84C65", // Pink Secondary — fonds/CTA foncés, texte blanc dessus
          brown: "#573425", // Brown Primary — texte principal, fonds foncés
          brownDark: "#642F19", // Brown Secondary — headers, contraste fort
          cream: "#FBF7F0", // neutre chaud (base)
          beige: "#E8DCC8",
          gold: "#C9962C", // Gold (accent) — graphique (filets, num sur brun)
          goldText: "#8a6d1f", // gold accessible (AA) pour texte sur fond clair
          rose: "#b23a4e", // rose accessible (AA) pour liens/texte sur fond clair
          sage: "#528574", // Tilda Sage Blue (accent)
          blush: "#E9C8C9",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"], // titres (Playfair)
        sans: ["var(--font-sans)", "system-ui", "sans-serif"], // corps (Lato)
        sub: ["var(--font-sub)", "var(--font-sans)", "system-ui", "sans-serif"], // sous-titres / UI (Montserrat)
      },
    },
  },
  plugins: [],
};

export default config;

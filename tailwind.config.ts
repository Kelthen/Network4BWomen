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
        brand: {
          pink: "#f6828f",
          pinkLight: "#ffbbbb",
          brown: "#44312b", // texte principal
          cream: "#FBF7F0",
          beige: "#E8DCC8",
          gold: "#C9A24B",
          sage: "#97AC9F",
          blush: "#E9C8C9",
        },
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;

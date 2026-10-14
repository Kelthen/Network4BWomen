// OWNED BY: rhamon — Équipe NBW (source unique : docs/TEAM.md / CONTENT §2).
// Extrait de app/(site)/about/page.tsx le 2026-10-14 (serge, override sur instruction
// humaine) pour être partagé avec la section « Board Governance » de l'accueil.
// Photos : public/images/team/<slug>.jpg (slugify du nom).

export type TeamMember = { name: string; role: string };

// Board + Leadership — ordre d'affichage de la page À propos.
export const TEAM: TeamMember[] = [
  { name: "Maleeka Thomas", role: "Founding Executive Director" },
  { name: "Kimoya Edwards", role: "Associate Director" },
  { name: "Miriam Ngungkpan", role: "Board Member" },
  { name: "Jodine Robin", role: "Board Member" },
  { name: "Martha Mathurin-Moe", role: "Advisor to the Executive Director" },
  { name: "Abishey Anderson", role: "Director of Operations" },
  { name: "Felisha Boehme", role: "Director of Communications" },
  { name: "Tobore Okome", role: "Board Member" },
  { name: "Aytia Police", role: "Board Member" },
  { name: "Kadeja Edwards", role: "Social Media & Content Creator Intern" },
];

// Gouvernance (accueil, fiche NBW 2026-10-10 « Create Board Governance section ») :
// direction exécutive + membres du Board.
const GOVERNANCE_ROLES = new Set(["Founding Executive Director", "Associate Director", "Board Member"]);
export const GOVERNANCE: TeamMember[] = TEAM.filter((m) => GOVERNANCE_ROLES.has(m.role));

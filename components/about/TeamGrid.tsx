// OWNED BY: rhamon — À propos. Grille équipe (Board + Leadership).
// Données : docs/TEAM.md / docs/CONTENT.md §2. Photos & bios à venir (placeholders élégants).
// Déposer les photos dans public/images/team/<slug>.jpg (ex. maleeka-thomas.jpg).
import Reveal from "@/components/home/Reveal";
import { coverImage, slugify } from "@/lib/media";

type Member = { name: string; role: string };

// Dégradés de marque pour les avatars (jamais de gris vide — voir docs/DESIGN.md §5).
const GRADIENTS = [
  "linear-gradient(160deg,#97ac9f,#e8dcc8)",
  "linear-gradient(160deg,#e9c8c9,#ffbbbb)",
  "linear-gradient(160deg,#c9a24b,#e8dcc8)",
  "linear-gradient(160deg,#f6828f,#44312b)",
  "linear-gradient(160deg,#e8dcc8,#97ac9f)",
];

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
}

export default function TeamGrid({ members }: { members: Member[] }) {
  return (
    <ul className="mt-10 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {members.map((m, i) => (
        <Reveal
          as="li"
          key={m.name}
          delay={((i % 3) + 1) as 1 | 2 | 3}
          className="group"
        >
          <div
            className="aspect-[4/5] w-full overflow-hidden rounded-2xl"
            style={coverImage(`/images/team/${slugify(m.name)}.jpg`, GRADIENTS[i % GRADIENTS.length])}
            aria-hidden="true"
          >
            <div className="flex h-full items-end p-4">
              <span className="font-serif text-3xl font-semibold text-brand-cream/85">
                {initials(m.name)}
              </span>
            </div>
          </div>
          <h3 className="mt-4 font-serif text-xl text-brand-brown">{m.name}</h3>
          <p className="mt-1 text-sm text-brand-brown/70">{m.role}</p>
        </Reveal>
      ))}
    </ul>
  );
}

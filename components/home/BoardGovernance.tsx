// OWNED BY: rhamon — Accueil. Section « Board Governance » (fiche NBW 2026-10-10).
// Créée le 2026-10-14 par serge (override sur instruction humaine). Données : lib/team.ts.
// Aucun texte inventé : noms + rôles officiels, photos existantes (initiales sinon).
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import ZoomablePhoto from "@/components/photo/ZoomablePhoto";
import { slugify } from "@/lib/media";
import { GOVERNANCE } from "@/lib/team";

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

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

export default function BoardGovernance() {
  return (
    <section className="bg-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal as="p" className={EYEBROW}>
              Board governance
            </Reveal>
            <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl text-brand-brown">
              Meet our Board &amp; Leadership.
            </Reveal>
          </div>
          <Reveal delay={1}>
            <Link
              href="/about#board"
              className="rounded-full border border-brand-brown px-5 py-2.5 text-sm font-semibold text-brand-brown transition hover:bg-brand-beige"
            >
              Meet the full team →
            </Link>
          </Reveal>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {GOVERNANCE.map((m, i) => (
            <Reveal as="li" key={m.name} delay={((i % 3) + 1) as 1 | 2 | 3} className="text-center">
              <ZoomablePhoto
                src={`/images/team/${slugify(m.name)}.jpg`}
                gradient={GRADIENTS[i % GRADIENTS.length]}
                alt={`${m.name} — ${m.role}`}
                className="mx-auto aspect-square w-full max-w-[160px] overflow-hidden rounded-full"
                objectPosition="center 25%"
              >
                <div className="flex h-full items-center justify-center">
                  <span className="font-serif text-3xl font-semibold text-brand-cream/90">{initials(m.name)}</span>
                </div>
              </ZoomablePhoto>
              <h3 className="mt-4 font-serif text-lg leading-snug text-brand-brown">{m.name}</h3>
              <p className="mt-1 text-sm text-brand-brown/75">{m.role}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

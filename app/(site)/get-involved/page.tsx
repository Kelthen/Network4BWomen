// OWNED BY: rhamon — Get Involved. Voir PLAN-rhamon.md, docs/CONTENT.md §6.
// Note : le câblage des formulaires (→ app/api/* → table form_submissions) est une étape
// ultérieure (zone rhamon). Ici, chaque parcours pointe vers Contact ou Don.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";

export const metadata: Metadata = {
  title: "Get Involved — Network of Black Women (NBW)",
  description:
    "Bénévolat, mentorat, prise de parole, partenariats, sponsoring, dons, opportunités au conseil — plusieurs façons de faire grandir NBW.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold";

type Way = {
  title: string;
  desc: string;
  cta: string;
  href: string;
  accent: string; // dégradé de marque
};

const WAYS: Way[] = [
  {
    title: "Devenir bénévole",
    desc: "Donne de ton temps et de ton énergie pour faire vivre les événements et programmes de la communauté.",
    cta: "Je veux aider",
    href: "/contact",
    accent: "linear-gradient(160deg,#97ac9f,#e8dcc8)",
  },
  {
    title: "Devenir mentore",
    desc: "Partage ton expérience et accompagne une femme ou une jeune fille dans son parcours.",
    cta: "Devenir mentore",
    href: "/contact",
    accent: "linear-gradient(160deg,#e9c8c9,#ffbbbb)",
  },
  {
    title: "Prendre la parole",
    desc: "Interviens lors d'un atelier, d'un panel ou de notre conférence annuelle.",
    cta: "Proposer une intervention",
    href: "/contact",
    accent: "linear-gradient(160deg,#c9a24b,#e8dcc8)",
  },
  {
    title: "Devenir partenaire",
    desc: "Ton organisation partage nos valeurs ? Construisons ensemble des initiatives à impact.",
    cta: "Discuter d'un partenariat",
    href: "/contact",
    accent: "linear-gradient(160deg,#97ac9f,#6e9179)",
  },
  {
    title: "Sponsoring d'entreprise",
    desc: "Soutiens nos programmes et notre conférence via un sponsoring corporate.",
    cta: "Devenir sponsor",
    href: "/contact",
    accent: "linear-gradient(160deg,#f6828f,#44312b)",
  },
  {
    title: "Opportunités au conseil",
    desc: "Contribue à la gouvernance de NBW et à sa direction stratégique.",
    cta: "En savoir plus",
    href: "/contact",
    accent: "linear-gradient(160deg,#e8dcc8,#c9a24b)",
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="bg-brand-cream text-brand-brown">
      {/* Hero */}
      <header className="mx-auto max-w-6xl px-6 pt-24 pb-14 md:pt-32">
        <Reveal as="p" className={EYEBROW}>
          Get Involved
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
        >
          Il y a une place pour toi dans cette sororité.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
          Bénévolat, mentorat, prise de parole, partenariats ou dons — chaque contribution fait
          grandir la communauté et élève les femmes noires du Sud de l&apos;Alberta.
        </Reveal>
      </header>

      {/* Grille des parcours */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WAYS.map((w, i) => (
            <Reveal
              as="li"
              key={w.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_#e8dcc8] transition hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(68,49,43,0.35)]"
            >
              <div className="h-28 w-full" style={{ background: w.accent }} aria-hidden="true" />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-serif text-2xl text-brand-brown">{w.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-brown/70">{w.desc}</p>
                <Link
                  href={w.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-pink"
                >
                  {w.cta} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Bloc Don proéminent */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="overflow-hidden rounded-3xl bg-brand-brown text-brand-cream">
          <div className="grid gap-8 p-10 md:grid-cols-2 md:items-center md:p-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-pinkLight">
                Faire un don
              </p>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl">
                Ton don finance des espaces où les femmes noires s&apos;épanouissent.
              </h2>
              <p className="mt-4 max-w-md text-brand-cream/80">
                Programmes, bourses, événements, bien-être : chaque contribution a un impact
                concret et durable.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/donate"
                className="rounded-full bg-brand-pink px-7 py-3 font-semibold text-brand-brown transition hover:-translate-y-0.5"
              >
                Faire un don
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-brand-cream/40 px-7 py-3 font-semibold text-brand-cream transition hover:bg-brand-cream/10"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

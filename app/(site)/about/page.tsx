// OWNED BY: rhamon — À propos NBW. Voir PLAN-rhamon.md, docs/CONTENT.md §2 (verbatim),
// docs/DESIGN.md + docs/BRAND.md. Textes marqués « verbatim » = reproduits tels quels (client).
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import TeamGrid from "@/components/about/TeamGrid";

export const metadata: Metadata = {
  title: "À propos — Network of Black Women (NBW)",
  description:
    "Notre histoire, notre mission, notre vision et l'équipe qui porte NBW — une sororité pour les femmes noires du Sud de l'Alberta.",
};

// Valeurs (verbatim CONTENT §2) + courte glose éditoriale.
const VALUES = [
  { en: "Equity", fr: "Équité", desc: "Ouvrir des portes et rééquilibrer les chances." },
  { en: "Sisterhood", fr: "Sororité", desc: "Se tenir les coudes, célébrer chacune." },
  { en: "Community Care", fr: "Community Care", desc: "Prendre soin les unes des autres, sans condition." },
  { en: "Accountability", fr: "Responsabilité", desc: "Tenir nos engagements, avec intégrité." },
  {
    en: "Collective Empowerment",
    fr: "Autonomisation collective",
    desc: "La force du groupe fait avancer chacune.",
  },
];

// Board + Leadership (docs/TEAM.md / CONTENT §2).
const TEAM = [
  { name: "Maleeka Thomas", role: "Founding Executive Director" },
  { name: "Kimoya Edwards", role: "Associate Director" },
  { name: "Khamaya Cawley", role: "Board Member & Signing Authority" },
  { name: "Jodine Robin", role: "Board Member" },
  { name: "Martha Mathurin-Moe", role: "Advisor to the Executive Director" },
  { name: "Abishey Anderson", role: "Director of Operations" },
  { name: "Felisha Boehme", role: "Director of Communications" },
  { name: "Tobore Okome", role: "Board Member" },
  { name: "Aytia Police", role: "Board Member" },
];

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold";

export default function AboutPage() {
  return (
    <div className="bg-brand-cream text-brand-brown">
      {/* Hero */}
      <header className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-32">
        <Reveal as="p" className={EYEBROW}>
          À propos · Network of Black Women
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
        >
          This is a space curated by Black&nbsp;Women for Black&nbsp;Women.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
          Une sororité pour les femmes et filles noires du Sud de l&apos;Alberta — sur le
          territoire traditionnel de la Confédération Blackfoot. Un espace pour être célébrée,
          être soi-même, et grandir ensemble.
        </Reveal>
      </header>

      {/* Our Story */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal as="p" className={`${EYEBROW} md:col-span-3`}>
            Our Story
          </Reveal>
          <Reveal as="blockquote" delay={1} className="md:col-span-9">
            <p className="font-serif text-2xl leading-snug md:text-4xl">
              « Network of Black Women was created on the goal to create a sisterhood community
              in Southern Alberta for Black Women and a space for Black Women to be celebrated,
              to be themselves. »
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission + Vision — section sombre pour la respiration (DESIGN §4) */}
      <section className="bg-brand-brown text-brand-cream">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 py-20 md:grid-cols-2 md:py-28">
          <Reveal>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-pinkLight">
              Notre mission
            </p>
            <p className="mt-5 text-lg leading-relaxed text-brand-cream/90">
              Our mission is to empower, connect, and uplift Black Women by fostering a
              supportive community by curating meaningful opportunities to grow. We are dedicated
              to creating spaces where Black Women can share their stories, celebrate one
              another&apos;s successes, and build lasting, transformative networks. Through
              collaboration and mutual support, we aim to break down barriers, amplify voices,
              and ensure that Black women gain the skills and tools needed to thrive both
              personally and professionally.
            </p>
          </Reveal>
          <Reveal delay={1}>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-pinkLight">
              Notre vision
            </p>
            <p className="mt-5 text-lg leading-relaxed text-brand-cream/90">
              Our vision is to create a strong, inclusive, safe and supportive environment where
              Black Women are celebrated for their work, creativity and contributions to society.
              Through our initiatives we envision a future where Black Women, united in
              sisterhood, empower one another through shared experiences and mutual support, while
              being equipped to succeed in all aspects of their lives. In this community, Black
              Women&apos;s voices are amplified, their achievements are recognized, and their
              collective strength drives positive change.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Our Values */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal as="p" className={EYEBROW}>
          Nos valeurs
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 max-w-2xl font-serif text-3xl md:text-4xl">
          Ce qui nous guide, chaque jour.
        </Reveal>
        <ul className="mt-12 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal
              as="li"
              key={v.en}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="border-t border-brand-beige pt-5"
            >
              <span className="font-serif text-4xl text-brand-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-serif text-2xl text-brand-brown">{v.fr}</h3>
              <p className="mt-1 text-sm uppercase tracking-wider text-brand-brown/50">{v.en}</p>
              <p className="mt-3 text-brand-brown/75">{v.desc}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Why NBW Exists */}
      <section className="bg-brand-beige/50">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-28">
          <Reveal as="p" className={EYEBROW}>
            Pourquoi NBW existe
          </Reveal>
          <Reveal
            as="p"
            delay={1}
            className="mt-6 font-serif text-2xl leading-snug text-brand-brown md:text-3xl"
          >
            Parce que chaque femme noire mérite un espace où sa voix est amplifiée, ses réussites
            reconnues, et sa force collective moteur d&apos;un changement positif.
          </Reveal>
        </div>
      </section>

      {/* Board & Leadership */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal as="p" className={EYEBROW}>
          Gouvernance
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 max-w-3xl font-serif text-3xl md:text-4xl">
          Meet Our Board &amp; Leadership.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 max-w-2xl text-brand-brown/70">
          Les femmes qui portent NBW. Photos et bios à venir.
        </Reveal>
        <TeamGrid members={TEAM} />
      </section>

      {/* CTA */}
      <section className="bg-brand-brown text-brand-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-serif text-3xl md:text-4xl">
            Rejoins une communauté qui t&apos;élève.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/get-involved"
              className="rounded-full bg-brand-pink px-6 py-3 font-semibold text-brand-brown transition hover:-translate-y-0.5"
            >
              S&apos;impliquer
            </Link>
            <Link
              href="/donate"
              className="rounded-full border border-brand-cream/40 px-6 py-3 font-semibold text-brand-cream transition hover:bg-brand-cream/10"
            >
              Faire un don
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

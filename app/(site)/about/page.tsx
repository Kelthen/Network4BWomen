// OWNED BY: rhamon — About NBW. See PLAN-rhamon.md, docs/CONTENT.md §2 (verbatim),
// docs/DESIGN.md + docs/BRAND.md. Text marked "verbatim" is reproduced as-is (client copy).
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import TeamGrid from "@/components/about/TeamGrid";

export const metadata: Metadata = {
  title: "About — Network of Black Women (NBW)",
  description:
    "Our story, mission, vision, and the team behind NBW — a sisterhood for Black women in Toronto, Ontario.",
};

// Values (verbatim CONTENT §2) + short editorial gloss.
const VALUES = [
  { name: "Equity", desc: "Opening doors and levelling the playing field." },
  { name: "Sisterhood", desc: "Standing by one another, celebrating each woman." },
  { name: "Community Care", desc: "Caring for one another, unconditionally." },
  { name: "Accountability", desc: "Keeping our commitments, with integrity." },
  { name: "Collective Empowerment", desc: "The strength of the group moves each of us forward." },
];

// Board + Leadership (docs/TEAM.md / CONTENT §2).
const TEAM = [
  { name: "Maleeka Thomas", role: "Founding Executive Director" },
  { name: "Kimoya Edwards", role: "Associate Director" },
  { name: "Miriam Ngungkpan", role: "Board Member" },
  { name: "Jodine Robin", role: "Board Member" },
  { name: "Martha Mathurin-Moe", role: "Advisor to the Executive Director" },
  { name: "Abishey Anderson", role: "Director of Operations" },
  { name: "Felisha Boehme", role: "Director of Communications" },
  { name: "Tobore Okome", role: "Board Member" },
  { name: "Aytia Police", role: "Board Member" },
];

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";
const EYEBROW_LIGHT = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-pinkLight nbw-eyebrow";

export default function AboutPage() {
  return (
    <div className="bg-brand-cream text-brand-brown">
      {/* Hero */}
      <header className="mx-auto max-w-6xl px-6 pt-28 pb-20 md:pt-36 md:pb-24">
        <Reveal as="p" className={EYEBROW}>
          About · Network of Black Women
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.025em] sm:text-6xl md:text-7xl"
        >
          This is a space curated by Black&nbsp;Women for Black&nbsp;Women.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-7 max-w-2xl text-lg leading-relaxed text-brand-brown/80">
          A sisterhood for Black women and girls in Toronto, Ontario — on the traditional
          territory of many nations, covered by Treaty 13. A space to be celebrated, to be
          yourself, and to grow together.
        </Reveal>
      </header>

      {/* Our Story — grande citation avec guillemet surdimensionné */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 md:grid-cols-12">
          <Reveal as="p" className={`${EYEBROW} md:col-span-3 md:pt-4`}>
            Our Story
          </Reveal>
          <Reveal as="blockquote" delay={1} className="md:col-span-9">
            <span
              aria-hidden="true"
              className="block font-serif text-[5.5rem] leading-[0.4] text-brand-gold/30 md:text-[8rem]"
            >
              &ldquo;
            </span>
            <p className="mt-7 font-serif text-[1.7rem] leading-[1.2] md:mt-9 md:text-[2.6rem] md:leading-[1.15]">
              Network of Black Women was created on the goal to create a sisterhood community in
              Toronto for Black Women and a space for Black Women to be celebrated, to be
              themselves.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Mission + Vision — dark section for visual rhythm (DESIGN §4) */}
      <section className="bg-brand-brown text-brand-cream">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:gap-0 md:py-28">
          <Reveal className="md:pr-14">
            <p className={EYEBROW_LIGHT}>Our mission</p>
            <p className="mt-6 text-lg leading-relaxed text-brand-cream/90">
              Our mission is to empower, connect, and uplift Black Women by fostering a
              supportive community by curating meaningful opportunities to grow. We are dedicated
              to creating spaces where Black Women can share their stories, celebrate one
              another&apos;s successes, and build lasting, transformative networks. Through
              collaboration and mutual support, we aim to break down barriers, amplify voices,
              and ensure that Black women gain the skills and tools needed to thrive both
              personally and professionally.
            </p>
          </Reveal>
          <Reveal delay={1} className="md:border-l md:border-brand-gold/30 md:pl-14">
            <p className={EYEBROW_LIGHT}>Our vision</p>
            <p className="mt-6 text-lg leading-relaxed text-brand-cream/90">
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

      {/* Our Values — numéros surdimensionnés, filet or au survol */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal as="p" className={EYEBROW}>
          Our values
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-4 max-w-2xl font-serif text-3xl tracking-[-0.02em] md:text-5xl">
          What guides us, every day.
        </Reveal>
        <ul className="mt-14 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal
              as="li"
              key={v.name}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="group border-t border-brand-beige pt-6 transition-colors duration-300 hover:border-brand-gold"
            >
              <div className="transition-transform duration-300 group-hover:-translate-y-1">
                <span className="font-serif text-5xl leading-none text-brand-goldText">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-serif text-2xl text-brand-brown">{v.name}</h3>
                <p className="mt-3 text-brand-brown/75">{v.desc}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Why NBW Exists — moment éditorial (grande citation) */}
      <section className="bg-brand-beige/50">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <Reveal as="p" className={`${EYEBROW} justify-center`}>
            Why NBW exists
          </Reveal>
          <Reveal as="figure" delay={1} className="mt-6">
            <span
              aria-hidden="true"
              className="block font-serif text-[6rem] leading-[0.4] text-brand-gold/25 md:text-[8rem]"
            >
              &ldquo;
            </span>
            <p className="mt-6 font-serif text-[1.75rem] leading-[1.25] text-brand-brown md:mt-8 md:text-[2.9rem] md:leading-[1.15]">
              Because every Black woman deserves a space where her voice is amplified, her
              successes recognized, and her collective strength drives positive change.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Board & Leadership */}
      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <Reveal as="p" className={EYEBROW}>
          Governance
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-4 max-w-3xl font-serif text-3xl tracking-[-0.02em] md:text-5xl">
          Meet Our Board &amp; Leadership.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 max-w-2xl text-brand-brown/80">
          The women behind NBW. Photos and bios coming soon.
        </Reveal>
        <TeamGrid members={TEAM} />
      </section>

      {/* CTA */}
      <section className="bg-brand-brown text-brand-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-serif text-3xl md:text-4xl">
            Join a community that lifts you up.
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/get-involved"
              className="rounded-full bg-brand-pink px-6 py-3 font-semibold text-brand-brown transition hover:-translate-y-0.5"
            >
              Get involved
            </Link>
            <Link
              href="/donate"
              className="rounded-full border border-brand-cream/40 px-6 py-3 font-semibold text-brand-cream transition hover:bg-brand-cream/10"
            >
              Donate
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

// OWNED BY: serge — Programs & Initiatives. (Built by rhamon's Claude as help, with owner's
// approval — see .claude/journal/rhamon.md and OWNERSHIP.yml.) See docs/CONTENT.md §3.
// The 7 programs are NBW's canonical list; descriptions are placeholders until NBW provides
// final copy, and the list is ready to be sourced from the `programs` Supabase table.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { coverImage, slugify } from "@/lib/media";

export const metadata: Metadata = {
  title: "Programs — Network of Black Women (NBW)",
  description:
    "Professional development, leadership, mentorship, wellness, youth programming, and more — NBW's programs for Black women and girls.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold";

// docs/CONTENT.md §3 — 7 programs. desc = placeholder, serves = short audience note.
const PROGRAMS = [
  {
    title: "Professional Development",
    desc: "Workshops, tools, and skill-building to help members grow their careers.",
    serves: "Working professionals & career changers",
    accent: "linear-gradient(160deg,#97ac9f,#e8dcc8)",
  },
  {
    title: "Leadership Development",
    desc: "Programs that shape the next generation of confident, capable leaders.",
    serves: "Emerging & established leaders",
    accent: "linear-gradient(160deg,#e9c8c9,#ffbbbb)",
  },
  {
    title: "Mentorship",
    desc: "One-to-one and group mentoring that connects experience with ambition.",
    serves: "Mentees & mentors",
    accent: "linear-gradient(160deg,#c9a24b,#e8dcc8)",
  },
  {
    title: "Community Events",
    desc: "Gatherings that build connection, belonging, and sisterhood.",
    serves: "The whole community",
    accent: "linear-gradient(160deg,#97ac9f,#6e9179)",
  },
  {
    title: "Health & Wellness",
    desc: "Caring for mind and body — because wellbeing is foundational.",
    serves: "Members & families",
    accent: "linear-gradient(160deg,#e8dcc8,#c9a24b)",
  },
  {
    title: "Youth Programming",
    desc: "Mentorship, skills, and celebration for Black girls and young women.",
    serves: "Youth & young adults",
    accent: "linear-gradient(160deg,#f6828f,#44312b)",
  },
  {
    title: "Annual Conference & Summit",
    desc: "A flagship gathering of speakers, workshops, and community.",
    serves: "Everyone — members & allies",
    accent: "linear-gradient(160deg,#e9c8c9,#97ac9f)",
  },
];

export default function ProgramsPage() {
  return (
    <div className="bg-brand-cream text-brand-brown">
      {/* Hero */}
      <header className="mx-auto max-w-6xl px-6 pt-24 pb-14 md:pt-32">
        <Reveal as="p" className={EYEBROW}>
          Programs &amp; Initiatives
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
        >
          Spaces to grow — personally, professionally, together.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
          NBW&apos;s programs support Black women and girls at every stage — through connection,
          leadership, wellness, and opportunity.
        </Reveal>
      </header>

      {/* Program cards */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_#e8dcc8] transition hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(68,49,43,0.35)]"
            >
              <div
                className="h-32 w-full"
                style={coverImage(`/images/programs/${slugify(p.title)}.jpg`, p.accent)}
                aria-hidden="true"
              />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-serif text-2xl text-brand-brown">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-brown/70">{p.desc}</p>
                <p className="mt-4 text-xs uppercase tracking-wider text-brand-brown/50">
                  {p.serves}
                </p>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="bg-brand-brown text-brand-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-serif text-3xl md:text-4xl">
            Want to take part, or bring a program to your community?
          </h2>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/get-involved"
              className="rounded-full bg-brand-pink px-6 py-3 font-semibold text-brand-brown transition hover:-translate-y-0.5"
            >
              Get involved
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-brand-cream/40 px-6 py-3 font-semibold text-brand-cream transition hover:bg-brand-cream/10"
            >
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

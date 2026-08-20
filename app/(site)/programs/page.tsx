// OWNED BY: serge — Programs & Initiatives. See docs/CONTENT.md §3 and
// docs/DATA-MODEL.md (table `programs`, public read on is_active — see
// supabase/migrations/0002_programs.sql).
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { coverImage, slugify } from "@/lib/media";
import { supabase } from "@/lib/supabase";

export const metadata: Metadata = {
  title: "Programs — Network of Black Women (NBW)",
  description:
    "Professional development, leadership, mentorship, wellness, youth programming, and more — NBW's programs for Black women and girls.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-goldText";

const ACCENTS = [
  "linear-gradient(160deg,#97ac9f,#e8dcc8)",
  "linear-gradient(160deg,#e9c8c9,#ffbbbb)",
  "linear-gradient(160deg,#c9a24b,#e8dcc8)",
  "linear-gradient(160deg,#97ac9f,#6e9179)",
  "linear-gradient(160deg,#e8dcc8,#c9a24b)",
  "linear-gradient(160deg,#f6828f,#44312b)",
  "linear-gradient(160deg,#e9c8c9,#97ac9f)",
];

type Program = {
  title: string;
  desc: string;
  serves: string;
  outcomes: string[];
  accent: string;
};

// Fallback if the `programs` table is empty or unreachable (e.g. Supabase env vars
// not yet set) — NBW's canonical 7-program list from docs/CONTENT.md §3, so the page
// never breaks. Same copy is seeded into the DB by supabase/migrations/0002_programs.sql.
const FALLBACK_PROGRAMS: Program[] = [
  { title: "Professional Development", desc: "Workshops, tools, and skill-building to help members grow their careers.", serves: "Working professionals & career changers", outcomes: [], accent: ACCENTS[0] },
  { title: "Leadership Development", desc: "Programs that shape the next generation of confident, capable leaders.", serves: "Emerging & established leaders", outcomes: [], accent: ACCENTS[1] },
  { title: "Mentorship", desc: "One-to-one and group mentoring that connects experience with ambition.", serves: "Mentees & mentors", outcomes: [], accent: ACCENTS[2] },
  { title: "Community Events", desc: "Gatherings that build connection, belonging, and sisterhood.", serves: "The whole community", outcomes: [], accent: ACCENTS[3] },
  { title: "Health & Wellness", desc: "Caring for mind and body — because wellbeing is foundational.", serves: "Members & families", outcomes: [], accent: ACCENTS[4] },
  { title: "Youth Programming", desc: "Mentorship, skills, and celebration for Black girls and young women.", serves: "Youth & young adults", outcomes: [], accent: ACCENTS[5] },
  { title: "Annual Conference & Summit", desc: "A flagship gathering of speakers, workshops, and community.", serves: "Everyone — members & allies", outcomes: [], accent: ACCENTS[6] },
];

async function getPrograms(): Promise<Program[]> {
  if (!supabase) return FALLBACK_PROGRAMS;

  const { data, error } = await supabase
    .from("programs")
    .select("title, purpose, who_it_serves, outcomes")
    .eq("is_active", true)
    .order("sort_order", { ascending: true });

  if (error || !data || data.length === 0) return FALLBACK_PROGRAMS;

  return data.map((row, i) => ({
    title: row.title,
    desc: row.purpose,
    serves: row.who_it_serves,
    outcomes: row.outcomes ?? [],
    accent: ACCENTS[i % ACCENTS.length],
  }));
}

export default async function ProgramsPage() {
  const PROGRAMS = await getPrograms();
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
                <p className="mt-2 text-sm leading-relaxed text-brand-brown/80">{p.desc}</p>
                {p.outcomes.length > 0 && (
                  <ul className="mt-3 space-y-1 text-sm text-brand-brown/80">
                    {p.outcomes.map((o) => (
                      <li key={o} className="flex gap-2">
                        <span aria-hidden="true" className="text-brand-goldText">
                          &bull;
                        </span>
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-4 flex-1" />
                <p className="text-xs uppercase tracking-wider text-brand-brown/75">
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

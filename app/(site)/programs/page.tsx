// OWNED BY: serge — Programs & Initiatives. Wired to Supabase `programs` table.
// Fallback to static placeholder data when Supabase is unavailable.
// See docs/CONTENT.md §3.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { coverImage, slugify } from "@/lib/media";
import { supabase } from "@/lib/supabase";

export const revalidate = 60; // ISR — revalidate every 60s

export const metadata: Metadata = {
  title: "Programs — Network of Black Women (NBW)",
  description:
    "Professional development, leadership, mentorship, wellness, youth programming, and more — NBW's programs for Black women and girls.",
};

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

// Fallback data when Supabase is unavailable or empty.
const FALLBACK_PROGRAMS = [
  {
    title: "Professional Development",
    purpose: "Workshops, tools, and skill-building to help members grow their careers.",
    who_it_serves: "Working professionals & career changers",
    accent: "linear-gradient(160deg,#97ac9f,#e8dcc8)",
  },
  {
    title: "Leadership Development",
    purpose: "Programs that shape the next generation of confident, capable leaders.",
    who_it_serves: "Emerging & established leaders",
    accent: "linear-gradient(160deg,#e9c8c9,#ffbbbb)",
  },
  {
    title: "Mentorship",
    purpose: "One-to-one and group mentoring that connects experience with ambition.",
    who_it_serves: "Mentees & mentors",
    accent: "linear-gradient(160deg,#c9a24b,#e8dcc8)",
  },
  {
    title: "Community Events",
    purpose: "Gatherings that build connection, belonging, and sisterhood.",
    who_it_serves: "The whole community",
    accent: "linear-gradient(160deg,#97ac9f,#6e9179)",
  },
  {
    title: "Health & Wellness",
    purpose: "Caring for mind and body — because wellbeing is foundational.",
    who_it_serves: "Members & families",
    accent: "linear-gradient(160deg,#e8dcc8,#c9a24b)",
  },
  {
    title: "Youth Programming",
    purpose: "Mentorship, skills, and celebration for Black girls and young women.",
    who_it_serves: "Youth & young adults",
    accent: "linear-gradient(160deg,#f6828f,#44312b)",
  },
  {
    title: "Annual Conference & Summit",
    purpose: "A flagship gathering of speakers, workshops, and community.",
    who_it_serves: "Everyone — members & allies",
    accent: "linear-gradient(160deg,#e9c8c9,#97ac9f)",
  },
];

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
  slug?: string;
  purpose: string | null;
  who_it_serves: string | null;
  outcomes?: string[];
  photos?: string[];
  accent?: string;
};

async function getPrograms(): Promise<Program[]> {
  try {
    const { data, error } = await supabase
      .from("programs")
      .select("slug, title, purpose, who_it_serves, outcomes, photos")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_PROGRAMS;
    }

    return data.map((p, i) => ({
      ...p,
      accent: ACCENTS[i % ACCENTS.length],
    }));
  } catch {
    return FALLBACK_PROGRAMS;
  }
}

export default async function ProgramsPage() {
  const programs = await getPrograms();

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
          {programs.map((p, i) => {
            const photoSrc =
              p.photos && p.photos.length > 0
                ? p.photos[0]
                : `/images/programs/${slugify(p.title)}.jpg`;

            return (
              <Reveal
                as="li"
                key={p.slug ?? p.title}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_#e8dcc8] transition hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(68,49,43,0.35)]"
              >
                <div
                  className="h-32 w-full"
                  style={coverImage(photoSrc, p.accent ?? ACCENTS[i % ACCENTS.length])}
                  aria-hidden="true"
                />
                <div className="flex flex-1 flex-col p-6">
                  <h2 className="font-serif text-2xl text-brand-brown">{p.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-brown/80">
                    {p.purpose}
                  </p>
                  {p.outcomes && p.outcomes.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {p.outcomes.map((o) => (
                        <li key={o} className="text-xs text-brand-brown/75">
                          — {o}
                        </li>
                      ))}
                    </ul>
                  )}
                  {p.who_it_serves && (
                    <p className="mt-4 text-xs uppercase tracking-wider text-brand-brown/75">
                      {p.who_it_serves}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
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

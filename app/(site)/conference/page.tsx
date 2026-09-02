// OWNED BY: serge — Conference. Wired to Supabase `events` + `conference_speakers` tables.
// Fallback to placeholder data when Supabase is unavailable.
// See docs/CONTENT.md §5.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { coverImage } from "@/lib/media";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Annual Conference — Network of Black Women (NBW)",
  description:
    "NBW's flagship annual conference — keynotes, workshops, and community for Black women in Toronto, Ontario.",
};

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

const HIGHLIGHTS = [
  { title: "Keynote speakers", desc: "Voices leading change across business, wellness, and the arts." },
  { title: "Workshops", desc: "Hands-on sessions in leadership, career, and personal growth." },
  { title: "Community", desc: "A full day to connect, celebrate, and build lasting networks." },
];

const FAQ = [
  { q: "When and where is the conference?", a: "Dates and venue for the next edition will be announced soon." },
  { q: "How much does it cost?", a: "Pricing, including early-bird and student rates, will be shared with registration." },
  { q: "Is accommodation available?", a: "We'll share recommended accommodation options closer to the event." },
];

const SPEAKER_ACCENTS = [
  "linear-gradient(160deg,#97ac9f,#e8dcc8)",
  "linear-gradient(160deg,#e9c8c9,#ffbbbb)",
  "linear-gradient(160deg,#c9a24b,#e8dcc8)",
  "linear-gradient(160deg,#f6828f,#44312b)",
];

type Speaker = {
  id: string;
  name: string;
  title: string | null;
  org: string | null;
  bio: string | null;
  photo_url: string | null;
  is_keynote: boolean;
};

async function getSpeakers(): Promise<Speaker[]> {
  try {
    const { data: confEvent } = await supabase
      .from("events")
      .select("id")
      .eq("is_conference", true)
      .order("starts_at", { ascending: false })
      .limit(1)
      .single();

    if (!confEvent) return [];

    const { data, error } = await supabase
      .from("conference_speakers")
      .select("id, name, title, org, bio, photo_url, is_keynote")
      .eq("event_id", confEvent.id)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export default async function ConferencePage() {
  const speakers = await getSpeakers();

  return (
    <div className="bg-brand-cream text-brand-brown">
      {/* Hero */}
      <header className="relative overflow-hidden">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 md:pt-32 md:pb-24">
          <Reveal as="p" className={EYEBROW}>Annual Conference & Summit</Reveal>
          <Reveal as="h1" delay={1} className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.03] tracking-tight md:text-6xl">
            One day. One community. Endless possibility.
          </Reveal>
          <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
            NBW&apos;s flagship gathering brings together speakers, workshops, and sisterhood — a space
            to be inspired and equipped to thrive.
          </Reveal>
          <Reveal delay={3} className="mt-8 flex flex-wrap gap-3">
            <Link href="/contact" className="rounded-full bg-brand-pink px-6 py-3 font-semibold text-brand-brown transition hover:-translate-y-0.5">
              Register your interest
            </Link>
            <Link href="/get-involved" className="rounded-full border border-brand-brown px-6 py-3 font-semibold text-brand-brown transition hover:bg-brand-beige">
              Become a sponsor
            </Link>
          </Reveal>
        </div>
      </header>

      {/* Highlights */}
      <section className="mx-auto max-w-6xl px-6 py-8">
        <ul className="grid gap-6 md:grid-cols-3">
          {HIGHLIGHTS.map((h, i) => (
            <Reveal as="li" key={h.title} delay={((i % 3) + 1) as 1 | 2 | 3} className="rounded-2xl bg-white p-6 shadow-[0_1px_0_#e8dcc8]">
              <h2 className="font-serif text-xl text-brand-brown">{h.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-brand-brown/80">{h.desc}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Speakers */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal as="p" className={EYEBROW}>Speakers</Reveal>
        <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl">
          {speakers.length > 0 ? "This year's lineup" : "This year's lineup, revealed soon."}
        </Reveal>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {speakers.length > 0
            ? speakers.map((s, i) => (
                <Reveal as="li" key={s.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div
                    className="aspect-square w-full rounded-2xl"
                    style={coverImage(
                      s.photo_url ?? `/images/conference/speaker-${(i % 4) + 1}.jpg`,
                      SPEAKER_ACCENTS[i % SPEAKER_ACCENTS.length],
                    )}
                    aria-hidden="true"
                  />
                  <p className="mt-3 font-serif text-lg text-brand-brown">{s.name}</p>
                  <p className="text-sm text-brand-brown/80">
                    {s.is_keynote ? "Keynote · " : ""}
                    {s.title}
                    {s.org ? ` — ${s.org}` : ""}
                  </p>
                  {s.bio && (
                    <p className="mt-1 text-xs text-brand-brown/70 line-clamp-3">{s.bio}</p>
                  )}
                </Reveal>
              ))
            : [0, 1, 2, 3].map((i) => (
                <Reveal as="li" key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div
                    className="aspect-square w-full rounded-2xl"
                    style={coverImage(
                      `/images/conference/speaker-${i + 1}.jpg`,
                      SPEAKER_ACCENTS[i],
                    )}
                    aria-hidden="true"
                  />
                  <p className="mt-3 font-serif text-lg text-brand-brown">To be announced</p>
                  <p className="text-sm text-brand-brown/80">Keynote</p>
                </Reveal>
              ))}
        </ul>
      </section>

      {/* FAQ */}
      <section className="bg-brand-beige/40">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <Reveal as="p" className={EYEBROW}>FAQ</Reveal>
          <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl">Good to know</Reveal>
          <div className="mt-8 grid gap-3">
            {FAQ.map((f, i) => (
              <Reveal as="div" key={f.q} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <details className="rounded-xl border border-brand-beige bg-white px-5 py-1">
                  <summary className="cursor-pointer list-none py-4 font-serif text-lg text-brand-brown">{f.q}</summary>
                  <p className="pb-4 text-brand-brown/80">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

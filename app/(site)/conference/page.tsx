// OWNED BY: serge — Conference. Wired to Supabase `events` + `conference_speakers` tables.
// Fallback to placeholder data when Supabase is unavailable.
// See docs/CONTENT.md §5.
//
// ⚠️ 2026-09-15 — édité par rhamon sous override (voir OWNERSHIP.yml + PR).
//   Contenu Our Essence Conference (mars 2027) intégré verbatim depuis le
//   questionnaire NBW 2026-09-15. Speakers, itinéraire, pricing = TBA.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { coverImage } from "@/lib/media";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Our Essence Conference — Network of Black Women (NBW)",
  description:
    "Our Essence is Alberta's most premium and anticipated Black Women Leadership conference — March 5–7, 2027, Excite Lethbridge. Theme: She Deserves Rest.",
};

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

const WHO_ITS_FOR = [
  "Black women ready to grow, lead, and step boldly into their next chapter.",
  "Students and recent graduates, emerging professionals, and established leaders looking to build confidence, skills, and meaningful connections.",
  "Entrepreneurs, founders, and creatives ready to turn their ideas, talents, and passions into impact.",
  "Women seeking meaningful conversations, inspiration, wellness, and a community that understands their journey.",
  "Visionaries, changemakers, and culture-shapers who are creating space for themselves and the women coming behind them.",
  "Black women who deserve a space to pause, recharge, reflect, and remember that rest is part of the journey, not a reward for reaching the finish line.",
];

const TAKEAWAYS = [
  "A stronger professional network of ambitious Black women, leaders, professionals, entrepreneurs, and future collaborators.",
  "Practical tools and insights to help you navigate your career, strengthen your leadership skills, and achieve your professional goals.",
  "Meaningful connections and conversations with inspiring speakers, industry professionals, and women making an impact in their fields.",
  "Greater confidence and clarity to advocate for yourself, take up space, and pursue opportunities that align with your vision.",
  "Fresh perspectives and inspiration to challenge the way you think about leadership, success, and what's possible for your future.",
  "A renewed sense of purpose, leaving with the motivation, connections, and tools to continue growing both personally and professionally.",
];

const FAQ = [
  { q: "When is the conference?", a: "March 5–7, 2027." },
  { q: "Where is it held?", a: "Excite Lethbridge, 101 Exhibition Way South, Lethbridge, AB." },
  { q: "How much does it cost?", a: "Ticket pricing will be announced soon — join the newsletter to be the first to know." },
  { q: "Who is speaking?", a: "The full lineup will be revealed in the coming months." },
  { q: "Is accommodation arranged?", a: "NBW is not arranging accommodations directly — recommendations will be shared closer to the event." },
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
          <Reveal as="p" className={EYEBROW}>2nd Annual Conference · #OURESSENCE</Reveal>
          <Reveal
            as="h1"
            delay={1}
            className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.03] tracking-tight md:text-6xl"
          >
            Our Essence — <em className="text-brand-rose">She&nbsp;Deserves&nbsp;Rest.</em>
          </Reveal>
          <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
            Alberta&apos;s most premium and anticipated Black Women Leadership conference for young
            professionals, entrepreneurs, creatives and leaders coming together to serve our community.
          </Reveal>
          <Reveal as="dl" delay={3} className="mt-8 grid gap-3 text-sm text-brand-brown/85 sm:grid-cols-3">
            <div>
              <dt className="font-semibold text-brand-brown">When</dt>
              <dd>March 5–7, 2027</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-brown">Where</dt>
              <dd>Excite Lethbridge, 101 Exhibition Way South, Lethbridge, AB</dd>
            </div>
            <div>
              <dt className="font-semibold text-brand-brown">Theme</dt>
              <dd>She Deserves Rest</dd>
            </div>
          </Reveal>
          <Reveal delay={3} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-brand-pink px-6 py-3 font-semibold text-brand-brown transition hover:-translate-y-0.5"
            >
              Register your interest
            </Link>
            <Link
              href="/get-involved"
              className="rounded-full border border-brand-brown px-6 py-3 font-semibold text-brand-brown transition hover:bg-brand-beige"
            >
              Become a sponsor
            </Link>
          </Reveal>
        </div>
      </header>

      {/* About */}
      <section className="mx-auto max-w-3xl px-6 py-12">
        <Reveal as="p" className={EYEBROW}>About the event</Reveal>
        <Reveal
          as="p"
          delay={1}
          className="mt-4 font-serif text-2xl leading-[1.3] text-brand-brown md:text-3xl"
        >
          A space created to celebrate, empower, and connect Black women through meaningful
          conversations, inspiring voices, and transformative experiences.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-6 text-brand-brown/85 md:text-lg">
          From leadership and professional growth to wellness, entrepreneurship, identity, and
          personal development, attendees will gain practical tools, fresh perspectives, and
          meaningful connections to support them both personally and professionally.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 text-brand-brown/85 md:text-lg">
          Come ready to learn, connect, reflect, recharge, and embrace your essence — because Black
          women deserve spaces where they can grow, be celebrated, and simply rest.
        </Reveal>
      </section>

      {/* Who is this for? */}
      <section className="mx-auto max-w-4xl px-6 py-12">
        <Reveal as="p" className={EYEBROW}>Who is this for?</Reveal>
        <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl">
          A room for every stage of your journey.
        </Reveal>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {WHO_ITS_FOR.map((line, i) => (
            <Reveal
              as="li"
              key={i}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="rounded-2xl bg-white p-5 shadow-[0_1px_0_#e8dcc8]"
            >
              <span aria-hidden="true" className="font-serif text-2xl text-brand-pink">✓</span>
              <p className="mt-2 text-sm leading-relaxed text-brand-brown/85">{line}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Takeaways */}
      <section className="bg-brand-brown text-brand-cream">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
          <Reveal as="p" className="text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-pinkLight nbw-eyebrow">
            What you'll walk away with
          </Reveal>
          <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl">
            Takeaways
          </Reveal>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {TAKEAWAYS.map((line, i) => (
              <Reveal
                as="li"
                key={i}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className="rounded-2xl border border-brand-cream/15 p-5"
              >
                <span aria-hidden="true" className="font-serif text-2xl text-brand-pink">→</span>
                <p className="mt-2 text-sm leading-relaxed text-brand-cream/90">{line}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Schedule (Coming soon) */}
      <section className="mx-auto max-w-4xl px-6 py-16 md:py-20">
        <Reveal as="p" className={EYEBROW}>Event schedule · March 5–7, 2027</Reveal>
        <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl">
          Coming soon.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-4 max-w-2xl text-brand-brown/80">
          The full 3-day agenda is being finalized — panels, workshops, networking sessions, and the
          keynote lineup will be revealed here in the coming months.
        </Reveal>
      </section>

      {/* Speakers */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
        <Reveal as="p" className={EYEBROW}>Speakers</Reveal>
        <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl">
          {speakers.length > 0 ? "This year's lineup" : "To be announced."}
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
                </Reveal>
              ))}
        </ul>
      </section>

      {/* Work with us */}
      <section className="bg-brand-beige/40">
        <div className="mx-auto max-w-4xl px-6 py-16 md:py-20 text-center">
          <Reveal as="p" className={EYEBROW}>Work with us</Reveal>
          <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl">
            Interested in joining the Black Business Marketplace?
          </Reveal>
          <Reveal delay={2} className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/get-involved"
              className="rounded-full bg-brand-brown px-6 py-3 font-semibold text-brand-cream transition hover:opacity-90"
            >
              Apply to be a vendor
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-brand-brown px-6 py-3 font-semibold text-brand-brown transition hover:bg-brand-cream"
            >
              Contact us
            </Link>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
          <Reveal as="p" className={EYEBROW}>FAQ</Reveal>
          <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl">
            Good to know
          </Reveal>
          <div className="mt-8 grid gap-3">
            {FAQ.map((f, i) => (
              <Reveal as="div" key={f.q} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <details className="rounded-xl border border-brand-beige bg-white px-5 py-1">
                  <summary className="cursor-pointer list-none py-4 font-serif text-lg text-brand-brown">
                    {f.q}
                  </summary>
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

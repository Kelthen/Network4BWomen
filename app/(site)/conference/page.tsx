// OWNED BY: serge — Conference. Wired to Supabase `events` + `conference_speakers` tables.
// Fallback to placeholder data when Supabase is unavailable.
// See docs/CONTENT.md §5.
//
// ⚠️ 2026-09-17 — édité par rhamon sous override :
//   Reprise structure « Sip N' Slay » (référence design NBW) : sections alternées
//   texte ↔ photo. Chaque emplacement photo est un placeholder visible (dégradé
//   brand + label « Photo — coming soon ») pour montrer OÙ la vraie photo NBW
//   ira quand fournie. Grille speakers passée à 6 tuiles « Coming Soon » (au
//   lieu de 4). Nouvelle section « Passes » avec 3 tarifs « Coming Soon »
//   (pattern Sip N' Slay). Nouvelle section « Event Location » avec placeholder
//   photo landscape.
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

// 3 passes façon Sip N' Slay. Prix + perks = « Coming Soon » tant que NBW n'a
// pas fixé les tarifs.
// 6 photos NBW réutilisées comme « teaser » de la grille speakers tant que le
// lineup n'est pas confirmé. Chaque tuile porte un label « Speaker to be
// announced » — on ne prétend jamais que ce sont les intervenantes réelles.
// Objectif : vibrer communauté, jamais de placeholder vide à l'écran.
const SPEAKER_TEASE_PHOTOS = [
  "/images/events/img-1702.jpg",
  "/images/events/img-6720.jpg",
  "/images/events/img-6793.jpg",
  "/images/conference/hero.jpg",
  "/images/events/img-6705.jpg",
  "/images/events/img-6724.jpg",
];

const PASSES = [
  {
    name: "Wallet Friendly",
    subtitle: "Our Essence Pass",
    perks: [
      "Standard entry",
      "Access to panels & activations",
      "Access to the Black Business Marketplace",
    ],
  },
  {
    name: "General Admission",
    subtitle: "Our Essence Pass",
    perks: [
      "Standard entry",
      "Light bites & beverage offerings",
      "Curated conference gift bag",
      "Access to panels & activations",
      "Access to the Black Business Marketplace",
    ],
    highlight: true,
  },
  {
    name: "VIP",
    subtitle: "Our Essence Pass",
    perks: [
      "GA perks, plus:",
      "Early access to the summit",
      "Upgraded gift bag",
      "Reserved front-row seating",
      "VIP lounge with premium sips & snacks",
      "Digital replay of all panels",
    ],
  },
];

const FAQ = [
  { q: "When is the conference?", a: "March 5–7, 2027." },
  { q: "Where is it held?", a: "Excite Lethbridge, 101 Exhibition Way South, Lethbridge, AB." },
  { q: "How much does it cost?", a: "Ticket pricing will be announced soon — join the newsletter to be the first to know." },
  { q: "Who is speaking?", a: "The full lineup will be revealed in the coming months." },
  { q: "Is accommodation arranged?", a: "NBW is not arranging accommodations directly — recommendations will be shared closer to the event." },
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

/** Placeholder visible pour un emplacement photo à venir (label discret sur
 *  dégradé brand). Passe une src si la vraie photo existe, sinon rend un
 *  visuel « Photo coming soon » cohérent avec la charte. */
function PhotoSlot({
  src,
  gradient,
  label = "Photo coming soon",
  className = "",
  aspectClass = "aspect-[4/5]",
}: {
  src?: string | null;
  gradient: string;
  label?: string;
  className?: string;
  aspectClass?: string;
}) {
  const hasReal = !!src;
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${aspectClass} ${className}`}
      style={hasReal ? coverImage(src!, gradient) : { background: gradient }}
      aria-hidden="true"
    >
      {!hasReal && (
        <>
          {/* Motif discret + label placeholder pour signaler « ici va une photo » */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "repeating-linear-gradient(45deg, transparent 0 14px, rgba(255,255,255,0.35) 14px 15px)",
            }}
          />
          <div className="absolute inset-0 flex items-end p-4">
            <span className="text-[10px] font-semibold font-sub uppercase tracking-[0.22em] text-white/85">
              {label}
            </span>
          </div>
        </>
      )}
    </div>
  );
}

export default async function ConferencePage() {
  const speakers = await getSpeakers();

  return (
    <div className="bg-brand-cream text-brand-brown">
      {/* Hero split — texte à gauche, grande photo à droite (pattern Sip N' Slay) */}
      <header className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl gap-8 px-6 pt-24 pb-16 md:pt-32 md:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
          <div>
            <Reveal as="p" className={EYEBROW}>2nd Annual Conference · #OURESSENCE</Reveal>
            <Reveal
              as="h1"
              delay={1}
              className="mt-4 font-serif text-4xl font-semibold leading-[1.02] tracking-tight md:text-6xl"
            >
              Our Essence — <em className="text-brand-rose">She&nbsp;Deserves&nbsp;Rest.</em>
            </Reveal>
            <Reveal as="p" delay={2} className="mt-6 max-w-xl text-lg text-brand-brown/80">
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
                <dd>Excite Lethbridge, AB</dd>
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
                Grab your tickets
              </Link>
              <Link
                href="/get-involved"
                className="rounded-full border border-brand-brown px-6 py-3 font-semibold text-brand-brown transition hover:bg-brand-beige"
              >
                Become a sponsor
              </Link>
            </Reveal>
          </div>
          <Reveal className="relative">
            <PhotoSlot
              gradient="linear-gradient(160deg,#f6828f 0%,#b23a4e 55%,#573425 100%)"
              label="Hero photo — Our Essence"
              aspectClass="aspect-[4/5] w-full max-w-md ml-auto"
              className="shadow-[0_24px_60px_-24px_rgba(68,49,43,0.35)]"
              src="/images/conference/hero.jpg"
            />
          </Reveal>
        </div>
      </header>

      {/* About the event — texte gauche, collage photos droite (Sip N' Slay pattern) */}
      <section className="mx-auto max-w-6xl px-6 pb-16 md:pb-20">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14">
          <div>
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
            <Reveal delay={3} className="mt-6">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-brand-brown px-5 py-2.5 text-sm font-semibold text-brand-cream transition hover:opacity-90"
              >
                Save your spot →
              </Link>
            </Reveal>
          </div>
          {/* Collage 3 photos placeholder — reproduit le pattern Sip N' Slay */}
          <div className="relative grid grid-cols-3 gap-3">
            <Reveal className="col-span-2 row-span-2">
              <PhotoSlot
                gradient="linear-gradient(160deg,#8aa9d4,#f6828f)"
                label="Group photo"
                aspectClass="aspect-square"
                src="/images/events/img-6705.jpg"
              />
            </Reveal>
            <Reveal delay={1}>
              <PhotoSlot
                gradient="linear-gradient(160deg,#c9a24b,#e8dcc8)"
                label="Speaker moment"
                aspectClass="aspect-square"
                src="/images/events/img-6720.jpg"
              />
            </Reveal>
            <Reveal delay={2}>
              <PhotoSlot
                gradient="linear-gradient(160deg,#97ac9f,#6e9179)"
                label="Panel session"
                aspectClass="aspect-square"
                src="/images/events/img-6793.jpg"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Who is this for — photo gauche, contenu droite */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
          <Reveal className="lg:sticky lg:top-24 lg:self-start">
            <PhotoSlot
              gradient="linear-gradient(160deg,#e9c8c9,#f6828f 60%,#b23a4e)"
              label="Attendees celebrating"
              aspectClass="aspect-[4/5]"
              src="/images/events/img-1702.jpg"
            />
          </Reveal>
          <div>
            <Reveal as="p" className={EYEBROW}>Who is this for?</Reveal>
            <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl">
              A room for every stage of your journey.
            </Reveal>
            <ul className="mt-8 grid gap-4">
              {WHO_ITS_FOR.map((line, i) => (
                <Reveal
                  as="li"
                  key={i}
                  delay={((i % 3) + 1) as 1 | 2 | 3}
                  className="flex items-start gap-3 rounded-2xl bg-white p-5 shadow-[0_1px_0_#e8dcc8]"
                >
                  <span aria-hidden="true" className="mt-0.5 font-serif text-xl leading-none text-brand-pink">✓</span>
                  <p className="text-sm leading-relaxed text-brand-brown/85">{line}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Takeaways — contenu gauche, photo droite (fond brun inversé) */}
      <section className="bg-brand-brown text-brand-cream">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-14">
            <div>
              <Reveal as="p" className="text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-pinkLight nbw-eyebrow">
                What you'll walk away with
              </Reveal>
              <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl">
                Takeaways
              </Reveal>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {TAKEAWAYS.map((line, i) => (
                  <Reveal
                    as="li"
                    key={i}
                    delay={((i % 3) + 1) as 1 | 2 | 3}
                    className="flex items-start gap-3 rounded-xl border border-brand-cream/15 p-4"
                  >
                    <span aria-hidden="true" className="mt-0.5 font-serif text-lg leading-none text-brand-pink">→</span>
                    <p className="text-sm leading-relaxed text-brand-cream/90">{line}</p>
                  </Reveal>
                ))}
              </ul>
            </div>
            <Reveal className="lg:sticky lg:top-24 lg:self-start">
              <PhotoSlot
                gradient="linear-gradient(160deg,#e9c8c9,#c9a24b)"
                label="Keynote speaker on stage"
                aspectClass="aspect-[4/5]"
                src="/images/events/img-6724.jpg"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Event Schedule + Meet the Panel Speakers (6 tuiles Coming Soon) */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="text-center">
          <Reveal as="p" className={EYEBROW}>Event Schedule</Reveal>
          <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-5xl">
            March 5–7, 2027
          </Reveal>
          <Reveal as="p" delay={2} className="mt-3 text-brand-brown/70">Coming soon.</Reveal>
        </div>

        <div className="mt-16 text-center">
          <Reveal as="p" className={EYEBROW}>Meet the panel speakers</Reveal>
          <Reveal as="h3" delay={1} className="mt-3 font-serif text-2xl md:text-3xl">
            {speakers.length > 0 ? "This year's lineup" : "To be announced"}
          </Reveal>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {speakers.length > 0
            ? speakers.map((s, i) => (
                <Reveal as="li" key={s.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <PhotoSlot
                    gradient="linear-gradient(160deg,#e8dcc8,#c9a24b)"
                    label={s.name}
                    aspectClass="aspect-[3/4]"
                    src={s.photo_url ?? undefined}
                  />
                  <p className="mt-3 text-center font-serif text-base text-brand-brown">{s.name}</p>
                  <p className="text-center text-xs text-brand-brown/70">
                    {s.is_keynote ? "Keynote · " : ""}
                    {s.title}
                    {s.org ? ` — ${s.org}` : ""}
                  </p>
                </Reveal>
              ))
            : SPEAKER_TEASE_PHOTOS.map((photo, i) => (
                <Reveal as="li" key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
                  <div
                    className="relative aspect-[3/4] w-full overflow-hidden rounded-2xl"
                    style={coverImage(photo, "linear-gradient(160deg,#e8dcc8,#c9a24b)", "center 20%")}
                  >
                    {/* Voile brun bas → haut pour lisibilité du label */}
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(87,52,37,0) 45%, rgba(87,52,37,0.75) 100%)",
                      }}
                      aria-hidden="true"
                    />
                    <div className="absolute inset-x-0 bottom-0 p-4 text-center">
                      <span className="inline-block rounded-full bg-brand-cream/95 px-3 py-1 text-[10px] font-semibold font-sub uppercase tracking-[0.22em] text-brand-brown shadow-[0_1px_0_rgba(0,0,0,0.06)]">
                        Speaker to be announced
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
        </ul>
      </section>

      {/* Passes / Pricing — 3 tarifs façon Sip N' Slay (« Coming Soon » sur les prix) */}
      <section className="bg-brand-beige/40">
        <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
          <div className="text-center">
            <Reveal as="p" className={EYEBROW}>Our Essence Passes</Reveal>
            <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-5xl">
              Pick the pass that fits.
            </Reveal>
            <Reveal as="p" delay={2} className="mt-3 text-brand-brown/70">
              Full pricing announced soon — join the newsletter to be the first to know.
            </Reveal>
          </div>
          <ul className="mt-10 grid gap-6 md:grid-cols-3">
            {PASSES.map((p, i) => (
              <Reveal
                as="li"
                key={p.name}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className={`flex flex-col rounded-2xl border p-6 shadow-[0_1px_0_#e8dcc8] transition ${
                  p.highlight
                    ? "border-brand-pink bg-brand-pink/10 ring-2 ring-brand-pink/40"
                    : "border-brand-beige bg-white"
                }`}
              >
                <p className={EYEBROW}>{p.subtitle}</p>
                <h3 className="mt-2 font-serif text-2xl text-brand-brown">{p.name}</h3>
                <p className="mt-4 font-serif text-3xl text-brand-brown/50">
                  <span className="text-sm font-semibold font-sub uppercase tracking-[0.22em] text-brand-brown/60">
                    Coming soon
                  </span>
                </p>
                <ul className="mt-6 flex-1 space-y-2">
                  {p.perks.map((perk, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-brand-brown/85">
                      <span aria-hidden="true" className="mt-0.5 text-brand-pink">✓</span>
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <button
                    type="button"
                    disabled
                    className="w-full cursor-not-allowed rounded-full bg-brand-brown/20 px-5 py-2.5 text-sm font-semibold text-brand-brown/60"
                  >
                    Sold out — join the waitlist
                  </button>
                </div>
              </Reveal>
            ))}
          </ul>
          <div className="mt-8 text-center">
            <Link
              href="/contact"
              className="inline-block text-sm font-semibold text-brand-brown/75 underline underline-offset-4 hover:text-brand-brown"
            >
              Contact us for group / student pricing
            </Link>
          </div>
        </div>
      </section>

      {/* Event Location — photo landscape gauche, texte droite */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-14">
          <Reveal>
            <PhotoSlot
              gradient="linear-gradient(160deg,#8aa9d4 0%,#c9a24b 55%,#573425 100%)"
              label="Excite Lethbridge — venue photo"
              aspectClass="aspect-[4/3]"
              src="/images/conference/hero.jpg"
            />
          </Reveal>
          <div className="flex flex-col justify-center">
            <Reveal as="p" className={EYEBROW}>Event Location</Reveal>
            <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl">
              Excite Lethbridge
            </Reveal>
            <Reveal as="p" delay={2} className="mt-4 text-brand-brown/85 md:text-lg">
              101 Exhibition Way South<br />
              Lethbridge, AB
            </Reveal>
            <Reveal delay={3} className="mt-6">
              <a
                href="https://maps.google.com/?q=101+Exhibition+Way+South+Lethbridge+AB"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-brand-brown px-5 py-2.5 text-sm font-semibold text-brand-brown transition hover:bg-brand-beige"
              >
                Open in Google Maps ↗
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Work with us — Marketplace CTA */}
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

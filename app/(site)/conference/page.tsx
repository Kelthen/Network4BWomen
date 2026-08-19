// OWNED BY: serge — Conference. (Built by rhamon's Claude as help — serge unavailable — with
// the owner's approval.) See docs/CONTENT.md §5. Placeholder content pending NBW.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { coverImage } from "@/lib/media";

export const metadata: Metadata = {
  title: "Annual Conference — Network of Black Women (NBW)",
  description:
    "NBW's flagship annual conference — keynotes, workshops, and community for Black women in Southern Alberta.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold";

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

export default function ConferencePage() {
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
            NBW's flagship gathering brings together speakers, workshops, and sisterhood — a space
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
              <p className="mt-2 text-sm leading-relaxed text-brand-brown/70">{h.desc}</p>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Speakers placeholder */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal as="p" className={EYEBROW}>Speakers</Reveal>
        <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl">This year&apos;s lineup, revealed soon.</Reveal>
        <ul className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <Reveal as="li" key={i} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div
                className="aspect-square w-full rounded-2xl"
                style={coverImage(
                  `/images/conference/speaker-${i + 1}.jpg`,
                  ["linear-gradient(160deg,#97ac9f,#e8dcc8)", "linear-gradient(160deg,#e9c8c9,#ffbbbb)", "linear-gradient(160deg,#c9a24b,#e8dcc8)", "linear-gradient(160deg,#f6828f,#44312b)"][i],
                )}
                aria-hidden="true"
              />
              <p className="mt-3 font-serif text-lg text-brand-brown">To be announced</p>
              <p className="text-sm text-brand-brown/60">Keynote</p>
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
                  <p className="pb-4 text-brand-brown/70">{f.a}</p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

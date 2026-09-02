// OWNED BY: rhamon — Accueil. « Sponsors & Community Partners » (logos + Become a Partner).
import Link from "next/link";
import Reveal from "@/components/home/Reveal";

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

// Placeholder — remplacer par les vrais logos partenaires (public/images/sponsors/…).
const SPONSORS = ["Partner", "Partner", "Partner", "Partner", "Partner", "Partner"];

export default function Sponsors() {
  return (
    <section className="bg-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal as="p" className={EYEBROW}>Sponsors &amp; community partners</Reveal>
            <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl text-brand-brown">
              Built together, with our partners.
            </Reveal>
          </div>
          <Reveal delay={1}>
            <Link href="/get-involved" className="rounded-full bg-brand-pink px-5 py-2.5 text-sm font-semibold text-brand-brown transition hover:-translate-y-0.5">
              Become a partner
            </Link>
          </Reveal>
        </div>

        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {SPONSORS.map((s, i) => (
            <Reveal
              as="li"
              key={i}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="flex h-24 items-center justify-center rounded-xl border border-brand-beige bg-white text-sm font-semibold uppercase tracking-wide text-brand-brown/35"
            >
              {s}
            </Reveal>
          ))}
        </ul>
        <p className="mt-4 text-sm text-brand-brown/60">Partner logos are placeholders — real sponsors coming soon.</p>
      </div>
    </section>
  );
}

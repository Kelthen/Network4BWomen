// OWNED BY: rhamon — Accueil. Témoignages (plusieurs vraies histoires — CONTENT §1).
import Reveal from "@/components/home/Reveal";

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

// Placeholder — à remplacer par de vrais témoignages de membres (verbatim NBW).
const QUOTES = [
  { quote: "NBW gave me the confidence to pursue leadership.", who: "A community member" },
  { quote: "I found lifelong friendships and a real sisterhood.", who: "NBW member" },
  { quote: "This community changed my life.", who: "Program participant" },
];

export default function Testimonials() {
  return (
    <section className="bg-brand-blush/40">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal as="p" className={EYEBROW}>Voices from the community</Reveal>
        <Reveal as="h2" delay={1} className="mt-3 max-w-2xl font-serif text-3xl md:text-4xl text-brand-brown">
          Sisterhood, in their own words.
        </Reveal>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {QUOTES.map((t, i) => (
            <Reveal
              as="figure"
              key={t.quote}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="flex flex-col rounded-2xl bg-white p-7 shadow-[0_1px_0_#e8dcc8]"
            >
              <span aria-hidden="true" className="font-serif text-5xl leading-none text-brand-pink">&ldquo;</span>
              <blockquote className="mt-2 flex-1 font-serif text-lg leading-snug text-brand-brown">
                {t.quote}
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-brand-brown/70">— {t.who}</figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

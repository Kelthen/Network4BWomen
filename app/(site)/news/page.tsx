// OWNED BY: serge — News & Stories. (Built by rhamon's Claude as help — serge unavailable —
// with the owner's approval.) See docs/CONTENT.md §8. Placeholder pending the `posts` table.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";

export const metadata: Metadata = {
  title: "News & Stories — Network of Black Women (NBW)",
  description:
    "Success stories, community news, leadership articles, and wellness tips from Network of Black Women.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold";

const CATEGORIES = ["Success Stories", "Community News", "Leadership", "Wellness Tips", "Event Recaps", "Announcements"];

// Placeholder posts — real content comes from the `posts` table.
const POSTS = [
  { cat: "Success Stories", title: "Celebrating our members' wins", excerpt: "Stories of growth, leadership, and community from across the network." },
  { cat: "Wellness Tips", title: "Small habits, big change", excerpt: "Practical, culturally-aware ideas for looking after your wellbeing." },
  { cat: "Event Recaps", title: "Looking back on our gatherings", excerpt: "Highlights and moments from recent NBW events." },
];

const ACCENTS = [
  "linear-gradient(160deg,#e9c8c9,#ffbbbb)",
  "linear-gradient(160deg,#97ac9f,#e8dcc8)",
  "linear-gradient(160deg,#c9a24b,#e8dcc8)",
];

export default function NewsPage() {
  return (
    <div className="bg-brand-cream text-brand-brown">
      <header className="mx-auto max-w-6xl px-6 pt-24 pb-12 md:pt-32">
        <Reveal as="p" className={EYEBROW}>News & Stories</Reveal>
        <Reveal as="h1" delay={1} className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Voices, wins, and wisdom from the community.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
          Stories that celebrate Black women, share knowledge, and keep our community connected.
        </Reveal>
        <Reveal delay={3} className="mt-6 flex flex-wrap gap-2">
          {CATEGORIES.map((c) => (
            <span key={c} className="rounded-full border border-brand-beige bg-brand-beige/30 px-3.5 py-1.5 text-sm text-brand-brown/70">
              {c}
            </span>
          ))}
        </Reveal>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {POSTS.map((p, i) => (
            <Reveal
              as="li"
              key={p.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_#e8dcc8] transition hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(68,49,43,0.35)]"
            >
              <div className="aspect-[16/10] w-full" style={{ background: ACCENTS[i % ACCENTS.length] }} aria-hidden="true" />
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold">{p.cat}</span>
                <h2 className="mt-2 font-serif text-xl text-brand-brown">{p.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-brown/70">{p.excerpt}</p>
                <span className="mt-4 text-sm font-semibold text-brand-brown/40">Article coming soon</span>
              </div>
            </Reveal>
          ))}
        </ul>
        <p className="mt-6 text-sm text-brand-brown/50">Articles are placeholders pending NBW&apos;s stories.</p>
      </section>

      <section className="bg-brand-brown text-brand-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-serif text-3xl md:text-4xl">Have a story to share?</h2>
          <Link href="/contact" className="rounded-full bg-brand-pink px-6 py-3 font-semibold text-brand-brown transition hover:-translate-y-0.5">
            Tell us about it
          </Link>
        </div>
      </section>
    </div>
  );
}

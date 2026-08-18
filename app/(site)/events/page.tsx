// OWNED BY: serge — Events. (Built by rhamon's Claude as help — serge unavailable — with the
// owner's approval; see OWNERSHIP.yml + .claude/journal/rhamon.md.) See docs/CONTENT.md §4.
// Placeholder events until wired to the `events` / `registrations` Supabase tables.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";

export const metadata: Metadata = {
  title: "Events — Network of Black Women (NBW)",
  description:
    "Upcoming gatherings, the annual conference and retreat, networking, and community events for Black women in Southern Alberta.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold";

// Placeholder — real events come from the `events` table.
const UPCOMING = [
  { month: "SEP", day: "14", title: "Fall Networking Mixer", cat: "Networking", where: "Calgary" },
  { month: "OCT", day: "05", title: "Wellness & Self-Care Morning", cat: "Health & Wellness", where: "Lethbridge" },
  { month: "NOV", day: "23", title: "Leadership Roundtable", cat: "Leadership", where: "Online" },
];

const CATEGORIES = [
  "Annual Conference",
  "Annual Retreat",
  "Networking",
  "Community Gatherings",
  "Sports & Wellness",
  "Past Events Gallery",
];

export default function EventsPage() {
  return (
    <div className="bg-brand-cream text-brand-brown">
      <header className="mx-auto max-w-6xl px-6 pt-24 pb-12 md:pt-32">
        <Reveal as="p" className={EYEBROW}>Events</Reveal>
        <Reveal as="h1" delay={1} className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Come together, grow together.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
          From intimate gatherings to our annual conference — spaces to connect, learn, and
          celebrate. Online registration coming soon.
        </Reveal>
      </header>

      {/* Upcoming */}
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <Reveal as="h2" className="font-serif text-2xl md:text-3xl">Upcoming events</Reveal>
        <ul className="mt-8 grid gap-4">
          {UPCOMING.map((e, i) => (
            <Reveal
              as="li"
              key={e.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="flex items-center gap-5 rounded-2xl bg-white p-5 shadow-[0_1px_0_#e8dcc8] transition hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(68,49,43,0.35)] sm:gap-7"
            >
              <div className="flex w-16 flex-none flex-col items-center rounded-xl bg-brand-brown py-2 text-brand-cream">
                <span className="text-xs uppercase tracking-wider text-brand-pinkLight">{e.month}</span>
                <span className="font-serif text-2xl leading-none">{e.day}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-serif text-xl text-brand-brown">{e.title}</h3>
                <p className="mt-1 text-sm text-brand-brown/60">{e.cat} · {e.where}</p>
              </div>
              <Link href="/contact" className="hidden flex-none rounded-full border border-brand-brown px-5 py-2 text-sm font-semibold text-brand-brown transition hover:bg-brand-beige sm:inline-block">
                Register
              </Link>
            </Reveal>
          ))}
        </ul>
        <p className="mt-4 text-sm text-brand-brown/50">Dates and details are placeholders pending NBW's calendar.</p>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <Reveal as="p" className={EYEBROW}>Explore</Reveal>
        <ul className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {CATEGORIES.map((c, i) => (
            <Reveal as="li" key={c} delay={((i % 3) + 1) as 1 | 2 | 3} className="rounded-xl border border-brand-beige bg-brand-beige/30 px-5 py-4 font-serif text-lg text-brand-brown">
              {c}
            </Reveal>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="bg-brand-brown text-brand-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-serif text-3xl md:text-4xl">Want to be the first to know about new events?</h2>
          <Link href="/" className="rounded-full bg-brand-pink px-6 py-3 font-semibold text-brand-brown transition hover:-translate-y-0.5">
            Join our newsletter
          </Link>
        </div>
      </section>
    </div>
  );
}

// OWNED BY: rhamon — Accueil. Teaser « Upcoming Events » (statique, lie vers /events).
import Link from "next/link";
import Reveal from "@/components/home/Reveal";

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

// Placeholder — les vrais événements vivent sur /events (table Supabase `events`).
const EVENTS = [
  { month: "SEP", day: "14", title: "Fall Networking Mixer", cat: "Networking", where: "Toronto" },
  { month: "OCT", day: "05", title: "Wellness & Self-Care Morning", cat: "Health & Wellness", where: "Toronto" },
  { month: "NOV", day: "23", title: "Leadership Roundtable", cat: "Leadership", where: "Online" },
];

export default function UpcomingEvents() {
  return (
    <section className="bg-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal as="p" className={EYEBROW}>Upcoming events</Reveal>
            <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl text-brand-brown">
              Come together, grow together.
            </Reveal>
          </div>
          <Reveal delay={1}>
            <Link href="/events" className="rounded-full border border-brand-brown px-5 py-2.5 text-sm font-semibold text-brand-brown transition hover:bg-brand-beige">
              View calendar →
            </Link>
          </Reveal>
        </div>

        <ul className="mt-8 grid gap-4">
          {EVENTS.map((e, i) => (
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
                <p className="mt-1 text-sm text-brand-brown/80">{e.cat} · {e.where}</p>
              </div>
              <Link href="/events" className="hidden flex-none rounded-full border border-brand-brown px-5 py-2 text-sm font-semibold text-brand-brown transition hover:bg-brand-beige sm:inline-block">
                Details
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

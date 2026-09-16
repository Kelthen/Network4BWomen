// OWNED BY: rhamon — Accueil. Teaser « Upcoming Events » (statique, lie vers /events).
//
// Chaque carte = Link entier vers la page détail (/events/[slug]) — même
// ergonomie que la page /events (voir app/(site)/events/page.tsx). Contenu
// statique volontaire pour rester rapide au premier rendu.
import Link from "next/link";
import Reveal from "@/components/home/Reveal";

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

type TeaserEvent = {
  slug: string;
  month: string;
  day: string;
  title: string;
  cat: string;
  where: string;
};

// Programme réel NBW (questionnaire 2026-09-15). Ordre chronologique.
const EVENTS: TeaserEvent[] = [
  { slug: "girl-talk-and-gratitude",      month: "OCT", day: "17", title: "Girl Talk & Gratitude",       cat: "Networking",         where: "Lethbridge AB" },
  { slug: "chapter-collective",           month: "NOV", day: "01", title: "Chapter Collective",           cat: "Community",          where: "TBA" },
  { slug: "nbw-career-conversations",     month: "JAN", day: "TBD", title: "NBW: Career Conversations",   cat: "Professional",       where: "TBA" },
  { slug: "paint-and-sip",                month: "MAR", day: "05", title: "Paint & Sip",                  cat: "Community",          where: "Lethbridge AB" },
  { slug: "our-essence-conference",       month: "MAR", day: "06", title: "Our Essence Conference",      cat: "Annual Conference",  where: "Excite Lethbridge" },
  { slug: "she-deserves-rest",            month: "MAR", day: "07", title: "She Deserves Rest",            cat: "Wellness",           where: "TBA" },
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
              key={e.slug}
              delay={((i % 3) + 1) as 1 | 2 | 3}
            >
              <Link
                href={`/events/${e.slug}`}
                aria-label={`See details for ${e.title}`}
                className="group flex items-center gap-5 rounded-2xl bg-white p-5 shadow-[0_1px_0_#e8dcc8] transition hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(68,49,43,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-brown sm:gap-7"
              >
                <div className="flex w-16 flex-none flex-col items-center rounded-xl bg-brand-brown py-2 text-brand-cream">
                  <span className="text-xs uppercase tracking-wider text-brand-pinkLight">{e.month}</span>
                  <span className="font-serif text-2xl leading-none">{e.day}</span>
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-xl text-brand-brown group-hover:underline">{e.title}</h3>
                  <p className="mt-1 text-sm text-brand-brown/80">{e.cat} · {e.where}</p>
                </div>
                <span
                  aria-hidden="true"
                  className="flex-none text-brand-brown/60 transition group-hover:translate-x-0.5 group-hover:text-brand-brown"
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

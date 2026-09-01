// OWNED BY: serge — Events. Wired to Supabase `events` table.
// Fallback to static placeholder data when Supabase is unavailable.
// See docs/CONTENT.md §4.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Events — Network of Black Women (NBW)",
  description:
    "Upcoming gatherings, the annual conference and retreat, networking, and community events for Black women in Toronto, Ontario.",
};

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText";

const CATEGORIES = [
  "Annual Conference",
  "Annual Retreat",
  "Networking",
  "Community Gatherings",
  "Sports & Wellness",
  "Past Events Gallery",
];

type Event = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  starts_at: string | null;
  ends_at: string | null;
  location: string | null;
  cover_url: string | null;
  is_conference: boolean;
  capacity: number | null;
};

// Fallback placeholder events
const FALLBACK_EVENTS: Event[] = [
  { id: "1", slug: "fall-networking-mixer", title: "Fall Networking Mixer", description: null, category: "Networking", starts_at: "2026-09-14T18:00:00Z", ends_at: null, location: "Toronto", cover_url: null, is_conference: false, capacity: null },
  { id: "2", slug: "wellness-self-care-morning", title: "Wellness & Self-Care Morning", description: null, category: "Health & Wellness", starts_at: "2026-10-05T10:00:00Z", ends_at: null, location: "Toronto", cover_url: null, is_conference: false, capacity: null },
  { id: "3", slug: "leadership-roundtable", title: "Leadership Roundtable", description: null, category: "Leadership", starts_at: "2026-11-23T14:00:00Z", ends_at: null, location: "Online", cover_url: null, is_conference: false, capacity: null },
];

function formatDate(iso: string): { month: string; day: string } {
  const d = new Date(iso);
  return {
    month: d.toLocaleString("en-US", { month: "short" }).toUpperCase(),
    day: String(d.getDate()),
  };
}

async function getUpcomingEvents(): Promise<Event[]> {
  try {
    const { data, error } = await supabase
      .from("events")
      .select("id, slug, title, description, category, starts_at, ends_at, location, cover_url, is_conference, capacity")
      .gte("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true })
      .limit(10);

    if (error || !data || data.length === 0) {
      return FALLBACK_EVENTS;
    }
    return data;
  } catch {
    return FALLBACK_EVENTS;
  }
}

export default async function EventsPage() {
  const events = await getUpcomingEvents();

  return (
    <div className="bg-brand-cream text-brand-brown">
      <header className="mx-auto max-w-6xl px-6 pt-24 pb-12 md:pt-32">
        <Reveal as="p" className={EYEBROW}>Events</Reveal>
        <Reveal as="h1" delay={1} className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Come together, grow together.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
          From intimate gatherings to our annual conference — spaces to connect, learn, and
          celebrate.
        </Reveal>
      </header>

      {/* Upcoming */}
      <section className="mx-auto max-w-6xl px-6 pb-6">
        <Reveal as="h2" className="font-serif text-2xl md:text-3xl">Upcoming events</Reveal>
        <ul className="mt-8 grid gap-4">
          {events.map((e, i) => {
            const date = e.starts_at ? formatDate(e.starts_at) : { month: "TBD", day: "—" };
            return (
              <Reveal
                as="li"
                key={e.id}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className="flex items-center gap-5 rounded-2xl bg-white p-5 shadow-[0_1px_0_#e8dcc8] transition hover:-translate-y-1 hover:shadow-[0_24px_48px_-24px_rgba(68,49,43,0.35)] sm:gap-7"
              >
                <div className="flex w-16 flex-none flex-col items-center rounded-xl bg-brand-brown py-2 text-brand-cream">
                  <span className="text-xs uppercase tracking-wider text-brand-pinkLight">{date.month}</span>
                  <span className="font-serif text-2xl leading-none">{date.day}</span>
                </div>
                <div className="flex-1">
                  <h3 className="font-serif text-xl text-brand-brown">{e.title}</h3>
                  <p className="mt-1 text-sm text-brand-brown/80">
                    {e.category}{e.location ? ` · ${e.location}` : ""}
                    {e.capacity ? ` · ${e.capacity} places` : ""}
                  </p>
                  {e.description && (
                    <p className="mt-1 text-sm text-brand-brown/70">{e.description}</p>
                  )}
                </div>
                <Link
                  href={`/events/${e.slug}`}
                  className="hidden flex-none rounded-full border border-brand-brown px-5 py-2 text-sm font-semibold text-brand-brown transition hover:bg-brand-beige sm:inline-block"
                >
                  Details
                </Link>
              </Reveal>
            );
          })}
        </ul>
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

// OWNED BY: serge — Event detail page with registration.
//
// ⚠️ 2026-09-13 — édition par rhamon sous override (voir OWNERSHIP.yml + PR).
//   Ajout : CTA « Register » externe (via registration_url OU URL extraite de
//   la description), sections optionnelles Speakers + Agenda, mise en forme
//   propre de la description (URLs retirées, retours paragraphe préservés).
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { coverImage } from "@/lib/media";
import { supabase } from "@/lib/supabase";
import RegistrationForm from "@/components/events/RegistrationForm";
import { parseEventDescription, registerLabelFor } from "@/lib/eventText";
import { FALLBACK_EVENTS } from "@/lib/eventFallbacks";

export const revalidate = 60;

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

import type { EventRow } from "@/lib/eventFallbacks";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase
    .from("events")
    .select("title, description")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Event — NBW" };

  const clean = parseEventDescription(data.description).clean;
  return {
    title: `${data.title} — Network of Black Women (NBW)`,
    description: clean || "An event by Network of Black Women.",
  };
}

// NBW opère en Alberta → fuseau Mountain Time. On affiche toutes les dates dans
// ce fuseau pour éviter les surprises quand un rang est saisi en UTC.
const EVENT_TZ = "America/Edmonton";

function formatEventDateTime(startIso: string, endIso: string | null): string {
  const start = new Date(startIso);
  const dateOpts: Intl.DateTimeFormatOptions = {
    timeZone: EVENT_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const timeOpts: Intl.DateTimeFormatOptions = {
    timeZone: EVENT_TZ,
    hour: "numeric",
    minute: "2-digit",
  };
  const startDate = start.toLocaleDateString("en-US", dateOpts);
  const startTime = start.toLocaleTimeString("en-US", timeOpts);
  if (!endIso) return `${startDate} · ${startTime}`;
  const end = new Date(endIso);
  const endTime = end.toLocaleTimeString("en-US", timeOpts);
  // Même jour local Alberta ? on compare via des composantes formatées.
  const dayKey = (d: Date) =>
    d.toLocaleDateString("en-CA", { timeZone: EVENT_TZ });
  if (dayKey(start) === dayKey(end)) {
    return `${startDate} · ${startTime} – ${endTime}`;
  }
  const endDate = end.toLocaleDateString("en-US", dateOpts);
  return `${startDate} · ${startTime} → ${endDate} · ${endTime}`;
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;

  let raw: EventRow | null = null;
  try {
    const { data } = await supabase
      .from("events")
      .select("*")
      .eq("slug", slug)
      .single();
    raw = (data as EventRow | null) ?? null;
  } catch (err) {
    console.warn("[events/[slug]] Supabase unreachable, falling back to static list:", err);
    raw = null;
  }
  // Fallback : quand Supabase est indisponible (preview sans env, build hors ligne),
  // on cherche le slug dans les événements en dur — même liste que la page /events.
  if (!raw) {
    const found = FALLBACK_EVENTS.find((e) => e.slug === slug);
    if (found) raw = found;
  }
  if (!raw) notFound();
  const event: EventRow = raw;

  const parsed = parseEventDescription(event.description);
  // Priorité 1 : colonne registration_url (propre). Priorité 2 : URL extraite
  // de la description (rétro-compat pour les rangs saisis avant la migration).
  const registerUrl = event.registration_url?.trim() || parsed.extractedUrl;
  const cleanDescription = parsed.clean;
  const speakers = Array.isArray(event.speakers) ? event.speakers : [];
  const agenda = Array.isArray(event.agenda) ? event.agenda : [];

  const descriptionParagraphs = cleanDescription
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="bg-brand-cream text-brand-brown">
      {/* Hero */}
      <header className="relative overflow-hidden">
        {event.cover_url && (
          <div
            className="absolute inset-0 opacity-20"
            style={coverImage(event.cover_url, "linear-gradient(160deg,#97ac9f,#e8dcc8)")}
            aria-hidden="true"
          />
        )}
        <div className="relative mx-auto max-w-4xl px-6 pt-24 pb-14 md:pt-32">
          <Reveal as="p" className={EYEBROW}>
            {event.category ?? "Event"}
          </Reveal>
          <Reveal
            as="h1"
            delay={1}
            className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
          >
            {event.title}
          </Reveal>

          <dl className="mt-6 grid gap-3 text-sm text-brand-brown/80 sm:grid-cols-2">
            {event.starts_at && (
              <div>
                <dt className="font-semibold text-brand-brown">When</dt>
                <dd>{formatEventDateTime(event.starts_at, event.ends_at)}</dd>
              </div>
            )}
            {event.location && (
              <div>
                <dt className="font-semibold text-brand-brown">Where</dt>
                <dd>{event.location}</dd>
              </div>
            )}
            {event.capacity != null && (
              <div>
                <dt className="font-semibold text-brand-brown">Capacity</dt>
                <dd>{event.capacity} places</dd>
              </div>
            )}
            {event.category && (
              <div>
                <dt className="font-semibold text-brand-brown">Category</dt>
                <dd>{event.category}</dd>
              </div>
            )}
          </dl>

          {registerUrl && (
            <div className="mt-8">
              <a
                href={registerUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-brand-pink px-6 py-3 font-semibold text-brand-brown shadow-[0_1px_0_#e8dcc8] transition hover:-translate-y-0.5"
              >
                {registerLabelFor(registerUrl)}
                <span aria-hidden="true">↗</span>
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Description */}
      {descriptionParagraphs.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 pb-16">
          <Reveal as="h2" className="font-serif text-2xl md:text-3xl">
            About this event
          </Reveal>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-brand-brown/85 md:text-lg">
            {descriptionParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>
      )}

      {/* Agenda */}
      {agenda.length > 0 && (
        <section className="mx-auto max-w-3xl px-6 pb-16">
          <Reveal as="h2" className="font-serif text-2xl md:text-3xl">
            Program
          </Reveal>
          <ol className="mt-6 divide-y divide-brand-beige/70 rounded-2xl border border-brand-beige bg-white">
            {agenda.map((item, i) => (
              <li key={i} className="flex items-baseline gap-4 px-5 py-4">
                <span className="w-20 flex-none font-semibold text-brand-brown">{item.time}</span>
                <span className="text-brand-brown/85">{item.item}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* Speakers */}
      {speakers.length > 0 && (
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <Reveal as="h2" className="font-serif text-2xl md:text-3xl">
            Speakers
          </Reveal>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2">
            {speakers.map((s, i) => (
              <li key={i} className="flex gap-4 rounded-2xl bg-white p-4 shadow-[0_1px_0_#e8dcc8]">
                {s.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={s.photo_url}
                    alt=""
                    className="h-16 w-16 flex-none rounded-full object-cover"
                  />
                ) : (
                  <div
                    aria-hidden="true"
                    className="h-16 w-16 flex-none rounded-full bg-brand-beige"
                  />
                )}
                <div className="min-w-0">
                  <p className="font-serif text-lg text-brand-brown">{s.name}</p>
                  {s.role && <p className="text-sm text-brand-brown/70">{s.role}</p>}
                  {s.bio && <p className="mt-1 text-sm text-brand-brown/80">{s.bio}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Registration : formulaire interne UNIQUEMENT quand pas d'URL externe */}
      {!registerUrl && (
        <section className="mx-auto max-w-2xl px-6 pb-24">
          <Reveal as="h2" className="font-serif text-2xl md:text-3xl">
            Register for this event
          </Reveal>
          <RegistrationForm eventId={event.id} eventTitle={event.title} />
        </section>
      )}

      {/* Back */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <Link
          href="/events"
          className="text-sm font-semibold text-brand-brown/75 transition hover:text-brand-brown"
        >
          ← Back to all events
        </Link>
      </section>

      {/* JSON-LD schema.org Event */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            name: event.title,
            startDate: event.starts_at,
            endDate: event.ends_at ?? undefined,
            eventStatus: "https://schema.org/EventScheduled",
            eventAttendanceMode:
              event.location?.toLowerCase() === "online"
                ? "https://schema.org/OnlineEventAttendanceMode"
                : "https://schema.org/OfflineEventAttendanceMode",
            location: event.location
              ? {
                  "@type": event.location.toLowerCase() === "online" ? "VirtualLocation" : "Place",
                  name: event.location,
                }
              : undefined,
            description: cleanDescription || undefined,
            organizer: {
              "@type": "NGO",
              name: "Network of Black Women",
              url: "https://www.networkofblackwomen.ca",
            },
            offers: registerUrl
              ? {
                  "@type": "Offer",
                  url: registerUrl,
                  availability: "https://schema.org/InStock",
                }
              : undefined,
          }),
        }}
      />
    </div>
  );
}

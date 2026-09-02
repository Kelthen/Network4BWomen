// OWNED BY: serge — Event detail page with registration.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { coverImage } from "@/lib/media";
import { supabase } from "@/lib/supabase";
import RegistrationForm from "@/components/events/RegistrationForm";

export const revalidate = 60;

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const { data } = await supabase
    .from("events")
    .select("title, description")
    .eq("slug", slug)
    .single();

  if (!data) return { title: "Event — NBW" };

  return {
    title: `${data.title} — Network of Black Women (NBW)`,
    description: data.description ?? "An event by Network of Black Women.",
  };
}

function formatFullDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;

  const { data: event } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .single();

  if (!event) notFound();

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

          <div className="mt-6 flex flex-wrap gap-4 text-sm text-brand-brown/80">
            {event.starts_at && (
              <span>📅 {formatFullDate(event.starts_at)}</span>
            )}
            {event.location && <span>📍 {event.location}</span>}
            {event.capacity && <span>👥 {event.capacity} places</span>}
          </div>

          {event.description && (
            <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
              {event.description}
            </Reveal>
          )}
        </div>
      </header>

      {/* Registration */}
      <section className="mx-auto max-w-2xl px-6 pb-24">
        <Reveal as="h2" className="font-serif text-2xl md:text-3xl">
          Register for this event
        </Reveal>
        <RegistrationForm eventId={event.id} eventTitle={event.title} />
      </section>

      {/* Back */}
      <section className="mx-auto max-w-4xl px-6 pb-16">
        <Link
          href="/events"
          className="text-sm font-semibold text-brand-brown/75 transition hover:text-brand-brown"
        >
          ← Back to all events
        </Link>
      </section>
    </div>
  );
}

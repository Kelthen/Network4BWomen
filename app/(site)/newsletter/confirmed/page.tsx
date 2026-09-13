// OWNED BY: rhamon — Page d'atterrissage après clic sur le lien de confirmation
// newsletter. States passés en query (?state=expired|invalid|already|unavailable).
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Subscription confirmed — Network of Black Women (NBW)",
  description: "Your newsletter subscription is confirmed. Welcome to the community.",
  robots: { index: false, follow: false },
};

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

type State = "ok" | "expired" | "invalid" | "already" | "unavailable";
type Props = { searchParams: Promise<{ state?: string }> };

const COPY: Record<State, { eyebrow: string; title: string; body: string }> = {
  ok: {
    eyebrow: "You're in",
    title: "Welcome to the community 💛",
    body: "Your subscription is confirmed. We'll send updates about programs, events, scholarships, and community stories — thoughtfully, never too often.",
  },
  already: {
    eyebrow: "Already confirmed",
    title: "You're already on the list.",
    body: "This confirmation link has already been used. No action needed — you're subscribed.",
  },
  expired: {
    eyebrow: "Link expired",
    title: "This confirmation link has expired.",
    body: "For your security, confirmation links are valid for 48 hours. Please subscribe again from the site and we'll send a fresh one.",
  },
  invalid: {
    eyebrow: "Link not recognized",
    title: "We couldn't confirm this subscription.",
    body: "The link doesn't match any pending subscription. It may have been used already, or altered on the way. Try subscribing again from the site.",
  },
  unavailable: {
    eyebrow: "Temporarily unavailable",
    title: "Something went wrong on our side.",
    body: "The newsletter service is temporarily unavailable. Please try again in a moment, or reach us directly.",
  },
};

export default async function Page({ searchParams }: Props) {
  const { state: stateRaw } = await searchParams;
  const state: State = ((stateRaw ?? "ok") as State) in COPY ? (stateRaw as State) ?? "ok" : "ok";
  const copy = COPY[state];

  return (
    <section className="mx-auto flex min-h-[70vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center text-brand-brown">
      <p className={EYEBROW}>{copy.eyebrow}</p>
      <h1 className="mt-4 font-serif text-3xl font-semibold leading-tight md:text-5xl">{copy.title}</h1>
      <p className="mt-6 max-w-lg text-lg text-brand-brown/80">{copy.body}</p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-brand-brown px-6 py-3 font-semibold text-brand-cream transition hover:opacity-90"
        >
          Back to home
        </Link>
        <Link
          href="/events"
          className="rounded-full border border-brand-brown px-6 py-3 font-semibold text-brand-brown transition hover:bg-brand-beige"
        >
          See upcoming events
        </Link>
      </div>
    </section>
  );
}

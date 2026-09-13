// OWNED BY: rhamon — Page d'atterrissage après clic sur le lien d'unsubscribe.
import type { Metadata } from "next";
import Link from "next/link";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Unsubscribed — Network of Black Women (NBW)",
  description: "You've unsubscribed from the newsletter.",
  robots: { index: false, follow: false },
};

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

type State = "ok" | "invalid" | "unavailable";
type Props = { searchParams: Promise<{ state?: string }> };

const COPY: Record<State, { eyebrow: string; title: string; body: string }> = {
  ok: {
    eyebrow: "Unsubscribed",
    title: "You've been removed from our newsletter.",
    body: "We won't send you any more email updates. You're always welcome back — the door stays open. 💛",
  },
  invalid: {
    eyebrow: "Link not recognized",
    title: "We couldn't process this request.",
    body: "The unsubscribe link doesn't match any subscription. It may have been altered on the way.",
  },
  unavailable: {
    eyebrow: "Temporarily unavailable",
    title: "Something went wrong on our side.",
    body: "Please try again in a moment. If it persists, email us directly and we'll remove you manually.",
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
      {state !== "ok" && (
        <p className="mt-4 text-sm text-brand-brown/70">
          Or write to <a href={`mailto:${CONTACT_EMAIL}`} className="underline">{CONTACT_EMAIL}</a>.
        </p>
      )}
      <div className="mt-10">
        <Link
          href="/"
          className="rounded-full bg-brand-brown px-6 py-3 font-semibold text-brand-cream transition hover:opacity-90"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}

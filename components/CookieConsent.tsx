// OWNED BY: shared — bandeau de consentement cookies. Voir lib/consent.ts.
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONSENT_EVENT, getConsent, setConsent } from "@/lib/consent";

export default function CookieConsent() {
  // `null` = pas encore monté (évite le flash SSR) ; false/true = visible.
  const [visible, setVisible] = useState<boolean | null>(null);

  useEffect(() => {
    const sync = () => setVisible(getConsent() === null);
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[60] px-4 pb-4"
    >
      <div className="mx-auto flex max-w-3xl flex-col gap-4 rounded-2xl border border-brand-beige bg-brand-cream/95 p-5 shadow-[0_-8px_40px_-16px_rgba(68,49,43,0.45)] backdrop-blur sm:flex-row sm:items-center">
        <p className="flex-1 text-sm text-brand-brown/85">
          We use essential cookies to run this site, and analytics cookies (only if you accept) to
          understand how it&apos;s used.{" "}
          <Link href="/privacy" className="font-semibold text-brand-pink underline">
            Learn more
          </Link>
          .
        </p>
        <div className="flex flex-none gap-2">
          <button
            type="button"
            onClick={() => setConsent("declined")}
            className="rounded-full border border-brand-brown px-5 py-2.5 text-sm font-semibold text-brand-brown transition hover:bg-brand-beige"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => setConsent("accepted")}
            className="rounded-full bg-brand-brown px-5 py-2.5 text-sm font-semibold text-brand-cream transition hover:opacity-90"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

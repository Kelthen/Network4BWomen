// OWNED BY: shared — rouvre le bandeau cookies (footer).
"use client";

import { resetConsent } from "@/lib/consent";

export default function CookiePreferencesButton() {
  return (
    <button
      type="button"
      onClick={resetConsent}
      className="text-left underline-offset-2 hover:text-brand-pink hover:underline"
    >
      Cookie preferences
    </button>
  );
}

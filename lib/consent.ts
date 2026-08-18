// OWNED BY: shared — état du consentement cookies (analytics).
// Stocké en localStorage ; un évènement custom prévient les composants (bandeau + analytics).
export const CONSENT_KEY = "nbw-cookie-consent";
export const CONSENT_EVENT = "nbw-consent-change";

export type Consent = "accepted" | "declined" | null;

export function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(CONSENT_KEY);
  return v === "accepted" || v === "declined" ? v : null;
}

export function setConsent(value: Exclude<Consent, null>) {
  window.localStorage.setItem(CONSENT_KEY, value);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

export function resetConsent() {
  window.localStorage.removeItem(CONSENT_KEY);
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

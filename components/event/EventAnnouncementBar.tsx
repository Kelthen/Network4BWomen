// OWNED BY: rhamon — « mode événement ». Bandeau fin en haut du site quand un
// événement approche (voir lib/featuredEvent.ts). Fermable ; le choix est mémorisé
// pour la session (sessionStorage) — non intrusif, réapparaît à la prochaine visite.
"use client";

import { useEffect, useState } from "react";
import { FEATURED_EVENT, isFeaturedActive } from "@/lib/featuredEvent";

const KEY = "nbw-eventbar-dismissed";

export default function EventAnnouncementBar() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isFeaturedActive()) return;
    let dismissed = false;
    try {
      dismissed = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* sessionStorage indisponible → on affiche */
    }
    if (!dismissed) setShow(true);
  }, []);

  if (!show || !FEATURED_EVENT) return null;
  const ev = FEATURED_EVENT;

  function dismiss() {
    setShow(false);
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="relative z-[60] bg-brand-brown text-brand-cream">
      <div className="mx-auto flex max-w-7xl items-center justify-center gap-x-3 gap-y-1 px-10 py-2 text-center text-sm">
        <span aria-hidden="true">🎟️</span>
        <p className="font-sub">
          <span className="font-semibold">{ev.title}</span>
          <span className="hidden text-brand-cream/70 sm:inline"> · {ev.dateLabel.split(" · ")[0]}</span>
        </p>
        <a
          href={ev.ticketUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="whitespace-nowrap rounded-full bg-brand-pink px-3 py-1 text-xs font-semibold text-brand-brown transition hover:opacity-90"
        >
          Get tickets
        </a>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-cream/70 transition hover:text-brand-cream"
      >
        <span aria-hidden="true" className="text-lg leading-none">&times;</span>
      </button>
    </div>
  );
}

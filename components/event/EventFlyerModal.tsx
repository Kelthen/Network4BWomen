// OWNED BY: rhamon — « mode événement ». Flyer de l'événement vedette affiché UNE
// SEULE FOIS par visiteur (localStorage), avec une entrée douce. Non bloquant :
// fermable (× / Échap / clic dehors). CTA billetterie + rappel e-mail (réutilise
// /api/newsletter). Respecte prefers-reduced-motion (pas d'animation d'entrée).
"use client";

import { useEffect, useRef, useState } from "react";
import { FEATURED_EVENT, isFeaturedActive } from "@/lib/featuredEvent";

const SEEN_KEY = "nbw-eventmodal-seen-girltalk-2026";

type Remind = "idle" | "form" | "sending" | "ok" | "error";

export default function EventFlyerModal() {
  const [open, setOpen] = useState(false);
  const [remind, setRemind] = useState<Remind>("idle");
  const [email, setEmail] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isFeaturedActive()) return;
    let seen = false;
    try {
      seen = localStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* localStorage indisponible → on montre une fois cette session */
    }
    if (seen) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const t = setTimeout(() => setOpen(true), reduce ? 0 : 900);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function markSeen() {
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  function close() {
    setOpen(false);
    markSeen();
  }

  async function submitRemind(e: React.FormEvent) {
    e.preventDefault();
    setRemind("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "event:girl-talk-gratitude" }),
      });
      setRemind(res.ok ? "ok" : "error");
    } catch {
      setRemind("error");
    }
  }

  if (!open || !FEATURED_EVENT) return null;
  const ev = FEATURED_EVENT;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Upcoming event: ${ev.title}`}
      onClick={close}
      className="fixed inset-0 z-[120] flex items-center justify-center bg-brand-brown/70 p-4 backdrop-blur-md"
    >
      <div
        ref={dialogRef}
        onClick={(e) => e.stopPropagation()}
        className="relative grid max-h-[92vh] w-full max-w-3xl grid-cols-1 overflow-hidden rounded-2xl bg-brand-cream shadow-2xl sm:grid-cols-2"
      >
        {/* Close */}
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand-brown shadow transition hover:scale-105"
        >
          <span aria-hidden="true" className="text-xl leading-none">&times;</span>
        </button>

        {/* Flyer */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ev.flyer}
          alt={`${ev.title} — event flyer`}
          className="max-h-[38vh] w-full object-cover sm:max-h-none sm:h-full"
        />

        {/* Content */}
        <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
          <p className="nbw-eyebrow font-sub text-xs font-semibold uppercase tracking-[0.22em] text-brand-goldText">
            Upcoming event
          </p>
          <h2 className="font-serif text-2xl leading-tight text-brand-brown sm:text-3xl">{ev.title}</h2>
          <p className="text-sm text-brand-brown/80">{ev.tagline}</p>
          <ul className="mt-1 space-y-1 text-sm text-brand-brown/90">
            <li>📅 {ev.dateLabel}</li>
            <li>📍 {ev.location}</li>
          </ul>

          {remind === "ok" ? (
            <p className="mt-3 rounded-xl bg-brand-beige/60 px-4 py-3 text-sm text-brand-brown">
              You&apos;re on the list — we&apos;ll send you a reminder. 💛
            </p>
          ) : remind === "form" || remind === "sending" || remind === "error" ? (
            <form onSubmit={submitRemind} className="mt-2 flex flex-col gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                aria-label="Your email for a reminder"
                className="w-full rounded-full border border-brand-beige bg-white px-4 py-2.5 text-sm text-brand-brown outline-none focus:border-brand-brown"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  disabled={remind === "sending"}
                  className="flex-1 rounded-full bg-brand-brown px-4 py-2.5 text-sm font-semibold text-brand-cream transition hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {remind === "sending" ? "…" : "Remind me"}
                </button>
                <a
                  href={ev.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={markSeen}
                  className="flex-1 rounded-full bg-brand-pink px-4 py-2.5 text-center text-sm font-semibold text-brand-brown transition hover:-translate-y-0.5"
                >
                  Get tickets
                </a>
              </div>
              {remind === "error" && (
                <p className="text-xs text-brand-rose">Something went wrong — please try again.</p>
              )}
            </form>
          ) : (
            <div className="mt-3 flex flex-col gap-2 sm:flex-row">
              <a
                href={ev.ticketUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={markSeen}
                className="flex-1 rounded-full bg-brand-pink px-5 py-2.5 text-center text-sm font-semibold text-brand-brown transition hover:-translate-y-0.5"
              >
                Get tickets →
              </a>
              <button
                type="button"
                onClick={() => setRemind("form")}
                className="flex-1 rounded-full border border-brand-brown/30 px-5 py-2.5 text-sm font-semibold text-brand-brown transition hover:bg-brand-beige/50"
              >
                I&apos;m interested
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={close}
            className="mt-1 text-left text-xs text-brand-brown/50 underline-offset-2 hover:underline"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}

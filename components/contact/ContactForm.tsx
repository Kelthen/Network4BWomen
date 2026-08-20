// OWNED BY: rhamon — Contact. Form → POST /api/contact → form_submissions.
"use client";

import { useState } from "react";

const SUBJECTS = [
  { value: "general", label: "General" },
  { value: "partnership", label: "Partnership" },
  { value: "media", label: "Media / Press" },
  { value: "volunteer", label: "Volunteer" },
] as const;

type Status = "idle" | "sending" | "ok" | "error";

const inputClass =
  "w-full rounded-xl border border-brand-beige bg-white px-4 py-3 text-brand-brown outline-none transition focus:border-brand-brown";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? "general"),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""), // honeypot (doit rester vide)
    };

    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string };
      if (res.ok) {
        setStatus("ok");
        form.reset();
      } else {
        setStatus("error");
        setFeedback(json.error ?? "Something went wrong. Please try again later.");
      }
    } catch {
      setStatus("error");
      setFeedback("Connection failed. Please check your network and try again.");
    }
  }

  if (status === "ok") {
    return (
      <div
        role="status"
        className="rounded-2xl border border-brand-beige bg-white p-8 text-center"
      >
        <p className="font-serif text-2xl text-brand-brown">Thank you! 💛</p>
        <p className="mt-2 text-brand-brown/80">
          Your message has been sent. We&apos;ll get back to you within 24–48 hours.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-6 rounded-full border border-brand-brown px-5 py-2 text-sm font-semibold text-brand-brown transition hover:bg-brand-beige"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4" noValidate>
      {/* Honeypot anti-spam : caché aux humains, rempli par les bots. Non focusable. */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", height: 0, overflow: "hidden" }}>
        <label htmlFor="company">Company (leave blank)</label>
        <input id="company" name="company" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-brand-brown">
            Name
          </label>
          <input id="name" name="name" required autoComplete="name" className={inputClass} />
        </div>
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-brown">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-brand-brown">
          Subject
        </label>
        <select id="subject" name="subject" defaultValue="general" className={inputClass}>
          {SUBJECTS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-brown">
          Message
        </label>
        <textarea id="message" name="message" required rows={6} className={inputClass} />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-brand-rose">
          {feedback}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-2 inline-flex items-center justify-center rounded-full bg-brand-brown px-7 py-3 font-semibold text-brand-cream transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

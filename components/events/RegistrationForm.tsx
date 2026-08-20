// OWNED BY: serge — Event registration form (client component).
"use client";

import { useState, type FormEvent } from "react";

type Props = {
  eventId: string;
  eventTitle: string;
};

type Status = "idle" | "sending" | "ok" | "error";

export default function RegistrationForm({ eventId, eventTitle }: Props) {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot anti-spam
    if (data.get("company")) {
      setStatus("ok");
      return;
    }

    try {
      const res = await fetch("/api/registrations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          event_id: eventId,
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone") || null,
          notes: data.get("notes") || null,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Registration failed");
      }

      setStatus("ok");
      form.reset();
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("error");
    }
  }

  if (status === "ok") {
    return (
      <div className="mt-8 rounded-2xl bg-white p-8 text-center shadow-[0_1px_0_#e8dcc8]">
        <p className="font-serif text-2xl text-brand-brown">You&apos;re registered! 🎉</p>
        <p className="mt-2 text-brand-brown/80">
          We&apos;ll be in touch with details for <strong>{eventTitle}</strong>.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      {/* Honeypot */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
        aria-hidden="true"
      />

      <div>
        <label htmlFor="reg-name" className="block text-sm font-semibold text-brand-brown">
          Full name *
        </label>
        <input
          id="reg-name"
          name="name"
          type="text"
          required
          className="mt-1 w-full rounded-xl border border-brand-beige bg-white px-4 py-3 text-brand-brown placeholder:text-brand-brown/40 focus:border-brand-brown focus:outline-none"
          placeholder="Your name"
        />
      </div>

      <div>
        <label htmlFor="reg-email" className="block text-sm font-semibold text-brand-brown">
          Email *
        </label>
        <input
          id="reg-email"
          name="email"
          type="email"
          required
          className="mt-1 w-full rounded-xl border border-brand-beige bg-white px-4 py-3 text-brand-brown placeholder:text-brand-brown/40 focus:border-brand-brown focus:outline-none"
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label htmlFor="reg-phone" className="block text-sm font-semibold text-brand-brown">
          Phone (optional)
        </label>
        <input
          id="reg-phone"
          name="phone"
          type="tel"
          className="mt-1 w-full rounded-xl border border-brand-beige bg-white px-4 py-3 text-brand-brown placeholder:text-brand-brown/40 focus:border-brand-brown focus:outline-none"
          placeholder="+1 (xxx) xxx-xxxx"
        />
      </div>

      <div>
        <label htmlFor="reg-notes" className="block text-sm font-semibold text-brand-brown">
          Notes (optional)
        </label>
        <textarea
          id="reg-notes"
          name="notes"
          rows={3}
          className="mt-1 w-full rounded-xl border border-brand-beige bg-white px-4 py-3 text-brand-brown placeholder:text-brand-brown/40 focus:border-brand-brown focus:outline-none"
          placeholder="Anything we should know?"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="w-full rounded-full bg-brand-pink px-6 py-3 font-semibold text-brand-brown transition hover:-translate-y-0.5 disabled:opacity-50"
      >
        {status === "sending" ? "Registering…" : "Register"}
      </button>
    </form>
  );
}

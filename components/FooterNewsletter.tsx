// OWNED BY: shared — inscription newsletter compacte (footer). Poste vers /api/newsletter.
"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "ok" | "error";

export default function FooterNewsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("ok");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "ok") {
    return <p className="mt-2 text-sm text-brand-cream/80">Thanks — you&apos;re subscribed. 💛</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 flex gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        aria-label="Your email address"
        className="min-w-0 flex-1 rounded-full border border-brand-cream/20 bg-brand-cream/10 px-4 py-2 text-sm text-brand-cream outline-none placeholder:text-brand-cream/50 focus:border-brand-pink"
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="flex-none rounded-full bg-brand-pink px-4 py-2 text-sm font-semibold text-brand-brown transition hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "…" : "Subscribe"}
      </button>
      {status === "error" && (
        <span className="sr-only" role="alert">Subscription failed, please try again.</span>
      )}
    </form>
  );
}

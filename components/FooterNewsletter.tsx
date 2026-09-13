// OWNED BY: shared — inscription newsletter compacte (footer). Poste vers /api/newsletter.
// Double opt-in : le success message indique de confirmer l'email.
"use client";

import { useState } from "react";

type Status = "idle" | "sending" | "sent" | "already" | "error";

export default function FooterNewsletter() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");
  const [email, setEmail] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "footer" }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; state?: string };
      if (res.ok) {
        setStatus(json.state === "already_confirmed" ? "already" : "sent");
        setEmail("");
      } else {
        setStatus("error");
        setFeedback(json.error ?? "Subscription failed, please try again.");
      }
    } catch {
      setStatus("error");
      setFeedback("Connection failed. Please try again.");
    }
  }

  if (status === "sent") {
    return (
      <p className="mt-2 text-sm text-brand-cream/90" role="status">
        Almost there — check your inbox to confirm. 💌
      </p>
    );
  }
  if (status === "already") {
    return (
      <p className="mt-2 text-sm text-brand-cream/90" role="status">
        You&apos;re already on the list — thanks for being with us. 💛
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="mt-3 flex flex-col gap-2">
      <div className="flex gap-2">
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
      </div>
      {status === "error" && (
        <p className="text-xs text-brand-pink" role="alert">
          {feedback}
        </p>
      )}
    </form>
  );
}

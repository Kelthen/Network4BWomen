// OWNED BY: rhamon — Donate. Preset/custom amounts, one-time/monthly → Stripe Checkout.
"use client";

import { useState } from "react";

const PRESETS = [25, 50, 100, 250];

type Status = "idle" | "loading" | "error";

const chipBase =
  "rounded-xl border px-4 py-3 text-center font-semibold transition";

export default function DonateForm() {
  const [amount, setAmount] = useState<number>(50);
  const [custom, setCustom] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  const effectiveAmount = custom ? Number(custom) : amount;

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!Number.isFinite(effectiveAmount) || effectiveAmount < 1) {
      setStatus("error");
      setFeedback("Please choose or enter a valid amount.");
      return;
    }
    setStatus("loading");
    setFeedback("");
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: effectiveAmount, recurring, email: email || undefined }),
      });
      const json = (await res.json().catch(() => ({}))) as { url?: string; error?: string };
      if (res.ok && json.url) {
        window.location.href = json.url; // redirect to Stripe Checkout
        return;
      }
      setStatus("error");
      setFeedback(json.error ?? "Couldn't start checkout. Please try again.");
    } catch {
      setStatus("error");
      setFeedback("Connection failed. Please try again.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-6 rounded-3xl border border-brand-beige bg-white p-6 md:p-8">
      {/* Frequency */}
      <div className="grid grid-cols-2 gap-2 rounded-full bg-brand-beige/40 p-1">
        <button
          type="button"
          onClick={() => setRecurring(false)}
          aria-pressed={!recurring}
          className={`rounded-full py-2 text-sm font-semibold transition ${
            !recurring ? "bg-brand-brown text-brand-cream" : "text-brand-brown"
          }`}
        >
          One-time
        </button>
        <button
          type="button"
          onClick={() => setRecurring(true)}
          aria-pressed={recurring}
          className={`rounded-full py-2 text-sm font-semibold transition ${
            recurring ? "bg-brand-brown text-brand-cream" : "text-brand-brown"
          }`}
        >
          Monthly
        </button>
      </div>

      {/* Preset amounts */}
      <div className="grid grid-cols-4 gap-3">
        {PRESETS.map((p) => {
          const active = !custom && amount === p;
          return (
            <button
              key={p}
              type="button"
              onClick={() => {
                setAmount(p);
                setCustom("");
              }}
              className={`${chipBase} ${
                active
                  ? "border-brand-brown bg-brand-brown text-brand-cream"
                  : "border-brand-beige text-brand-brown hover:border-brand-brown"
              }`}
            >
              ${p}
            </button>
          );
        })}
      </div>

      {/* Custom amount */}
      <div>
        <label htmlFor="custom" className="mb-1.5 block text-sm font-medium text-brand-brown">
          Or enter an amount (CAD)
        </label>
        <div className="flex items-center rounded-xl border border-brand-beige bg-white px-4">
          <span className="text-brand-brown/60">$</span>
          <input
            id="custom"
            inputMode="decimal"
            value={custom}
            onChange={(e) => setCustom(e.target.value.replace(/[^0-9.]/g, ""))}
            placeholder="Custom"
            className="w-full bg-transparent px-2 py-3 text-brand-brown outline-none"
          />
        </div>
      </div>

      {/* Optional email */}
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-brand-brown">
          Email (optional — for your receipt)
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-brand-beige bg-white px-4 py-3 text-brand-brown outline-none focus:border-brand-brown"
        />
      </div>

      {status === "error" && (
        <p role="alert" className="text-sm text-brand-pink">
          {feedback}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="rounded-full bg-brand-pink px-7 py-3.5 text-center font-semibold text-brand-brown transition hover:-translate-y-0.5 disabled:opacity-60"
      >
        {status === "loading"
          ? "Redirecting…"
          : recurring
            ? `Donate $${effectiveAmount || 0}/month`
            : `Donate $${effectiveAmount || 0}`}
      </button>
      <p className="text-center text-xs text-brand-brown/50">
        Secure payment via Stripe. You&apos;ll be redirected to complete your donation.
      </p>
    </form>
  );
}

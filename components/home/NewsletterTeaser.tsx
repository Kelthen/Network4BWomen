// OWNED BY: rhamon — Home. Newsletter signup ("Stay Connected.") → POST /api/newsletter.
"use client";

import { useState } from "react";
import styles from "./home.module.css";

type Status = "idle" | "sending" | "sent" | "already" | "error";

export default function NewsletterTeaser() {
  const [status, setStatus] = useState<Status>("idle");
  const [feedback, setFeedback] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = String(new FormData(form).get("email") ?? "");
    setStatus("sending");
    setFeedback("");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "home" }),
      });
      const json = (await res.json().catch(() => ({}))) as { error?: string; state?: string };
      if (res.ok) {
        setStatus(json.state === "already_confirmed" ? "already" : "sent");
        form.reset();
      } else {
        setStatus("error");
        setFeedback(json.error ?? "Something went wrong. Please try again later.");
      }
    } catch {
      setStatus("error");
      setFeedback("Connection failed. Please try again.");
    }
  }

  return (
    <section className={styles.news}>
      <div className={styles.wrap}>
        <div className={styles.box}>
          <p className={styles.eyebrow} style={{ color: "var(--pink-light)" }}>
            Stay connected
          </p>
          <h2>Stay Connected.</h2>
          {status === "sent" ? (
            <p className={styles.fieldNote} role="status">
              Almost there — check your inbox to confirm your subscription. 💌
            </p>
          ) : status === "already" ? (
            <p className={styles.fieldNote} role="status">
              You&apos;re already on the list — thanks for being with us. 💛
            </p>
          ) : (
            <>
              <form className={styles.field} onSubmit={onSubmit}>
                <input
                  type="email"
                  name="email"
                  required
                  aria-label="Your email address"
                  placeholder="Your email address"
                />
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={`${styles.btn} ${styles.btnPink}`}
                >
                  {status === "sending" ? "…" : "Subscribe"}
                </button>
              </form>
              {status === "error" && (
                <p className={styles.fieldNote} role="alert">
                  {feedback}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}

// OWNED BY: rhamon — Accueil. Teaser Newsletter (« Stay Connected. »).
"use client";

import { useState } from "react";
import styles from "./home.module.css";

/**
 * Teaser visuel de la newsletter sur l'accueil.
 * ⚠️ Le branchement réel (composant Newsletter.tsx + app/api/newsletter →
 * table newsletter_subscribers) relève de la zone `newsletter` (voir PLAN-rhamon.md).
 * Ici on reste un teaser : soumission sans réseau, simple accusé de réception.
 */
export default function NewsletterTeaser() {
  const [done, setDone] = useState(false);

  return (
    <section className={styles.news}>
      <div className={styles.wrap}>
        <div className={styles.box}>
          <p className={styles.eyebrow} style={{ color: "var(--pink-light)" }}>
            Stay connected
          </p>
          <h2>Stay Connected.</h2>
          {done ? (
            <p className={styles.fieldNote} role="status">
              Thank you! Newsletter sign-up is coming soon.
            </p>
          ) : (
            <form
              className={styles.field}
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <input
                type="email"
                required
                aria-label="Your email address"
                placeholder="Your email address"
              />
              <button type="submit" className={`${styles.btn} ${styles.btnPink}`}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

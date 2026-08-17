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
            Restons connectées
          </p>
          <h2>Stay Connected.</h2>
          {done ? (
            <p className={styles.fieldNote} role="status">
              Merci ! L&apos;inscription à la newsletter arrive bientôt.
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
                aria-label="Votre adresse e-mail"
                placeholder="Votre adresse e-mail"
              />
              <button type="submit" className={`${styles.btn} ${styles.btnPink}`}>
                S&apos;abonner
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

// OWNED BY: rhamon — Accueil. Bandeau signature avant footer (révélation moderne de la photo).
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./home.module.css";

/**
 * Pattern signature validé (docs/nbw-home-reference.html §12) :
 * au scroll, la photo se révèle — rideau qui monte (clip-path), dézoom, flou→net,
 * désaturé→saturé, fin balayage de lumière, puis titre ligne par ligne + colonnes + boutons.
 * `prefers-reduced-motion` : le CSS affiche l'état final sans animation.
 */
export default function CtaBand() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShown(true);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section className={styles.ctaBandOuter}>
      <div ref={ref} className={`${styles.ctaBand} ${shown ? styles.in : ""}`}>
        <div className={styles.bg} aria-hidden="true" />
        <div className={styles.sheen} aria-hidden="true" />
        <div className={styles.overlay} aria-hidden="true" />
        <div className={styles.content}>
          <div className={styles.grid}>
            <h2>
              <span className={styles.line}>
                <span>Every Black Woman</span>
              </span>
              <span className={styles.line}>
                <span>Deserves To Be</span>
              </span>
              <span className={styles.line}>
                <span>Celebrated.</span>
              </span>
            </h2>
            <div>
              <div className={styles.cols}>
                <div>
                  <b>Une question ?</b>
                  <p>
                    Écris-nous :{" "}
                    <a href="mailto:info.networkofblackwomen@gmail.com">
                      info.networkofblackwomen@gmail.com
                    </a>{" "}
                    · <a href="tel:+14036358688">(403) 635-8688</a>
                  </p>
                </div>
                <div>
                  <b>Autres façons d&apos;aider</b>
                  <p>Devenir bénévole · Mentore · Partager notre mission · Organiser une collecte</p>
                </div>
              </div>
              <div className={styles.actions}>
                <Link href="/donate" className={`${styles.pill} ${styles.pillPink}`}>
                  Faire un don
                </Link>
                <Link href="/get-involved" className={`${styles.pill} ${styles.pillCream}`}>
                  Devenir bénévole
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

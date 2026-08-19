// OWNED BY: rhamon — Accueil. Bandeau signature avant footer (révélation moderne de la photo).
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./home.module.css";
import { coverImage } from "@/lib/media";

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
        <div
          className={styles.bg}
          style={coverImage(
            "/images/cta-band.jpg",
            "radial-gradient(120% 90% at 72% 18%, #ffe6cf 0%, transparent 55%), linear-gradient(160deg,#8aa9d4 0%,#f6828f 55%,#5c2233 100%)",
          )}
          aria-hidden="true"
        />
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
                  <b>Have a question?</b>
                  <p>
                    Email us:{" "}
                    <a href="mailto:info.networkofblackwomen@gmail.com">
                      info.networkofblackwomen@gmail.com
                    </a>{" "}
                    · <a href="tel:+14036358688">(403) 635-8688</a>
                  </p>
                </div>
                <div>
                  <b>Other ways to help</b>
                  <p>Volunteer · Mentor · Share our mission · Host a fundraiser</p>
                </div>
              </div>
              <div className={styles.actions}>
                <Link href="/donate" className={`${styles.pill} ${styles.pillPink}`}>
                  Donate
                </Link>
                <Link href="/get-involved" className={`${styles.pill} ${styles.pillCream}`}>
                  Volunteer
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

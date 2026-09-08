// OWNED BY: rhamon — Accueil. Hero éditorial signature (masque + parallaxe).
// EXPÉRIMENTATION : version pleine largeur (photo en fond + voile éditorial).
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./home.module.css";

/**
 * Hero pleine largeur : la vraie photo NBW occupe tout le fond de la section,
 * un voile brun s'estompe de gauche à droite pour préserver la lisibilité du
 * texte à gauche. Titres révélés par masque, sous-titre + CTA pilules.
 * Textes = verbatim (docs/CONTENT.md §0). `prefers-reduced-motion` : parallaxe désactivée.
 */
export default function Hero() {
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = bgRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        // Parallaxe légère : la photo monte 2× moins vite que le scroll.
        el.style.transform = `translate3d(0, ${y * 0.15}px, 0) scale(1.05)`;
        frame = 0;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <header className={styles.heroFull}>
      {/* Fond photo + voile — sous le contenu, non interactifs. */}
      <div ref={bgRef} className={styles.heroBg} aria-hidden="true" />
      <div className={styles.heroOverlay} aria-hidden="true" />

      <div className={`${styles.wrap} ${styles.heroContent}`}>
        <p className={`${styles.eyebrow} ${styles.heroEyebrowLight} nbw-eyebrow`}>
          Network of Black Women · Toronto, Ontario
        </p>
        <h1 className={styles.heroTitle}>
          <span className={styles.line}>
            <span>Empowering Black Women.</span>
          </span>
          <span className={styles.line}>
            <span>
              Building Community. <em>Creating&nbsp;Leaders.</em>
            </span>
          </span>
        </h1>
        <p className={styles.heroTextLight}>
          A safe and empowering space where Black women and girls grow personally,
          professionally, and collectively through connection, leadership, wellness, and
          opportunity.
        </p>
        <div className={styles.heroCta}>
          <Link href="/donate" className={`${styles.btn} ${styles.btnPink}`}>
            Donate
          </Link>
          <Link href="/get-involved" className={`${styles.btn} ${styles.btnCream}`}>
            Join our community
          </Link>
          <Link href="/about" className={`${styles.btn} ${styles.btnGhost}`}>
            About us
          </Link>
        </div>
      </div>
    </header>
  );
}

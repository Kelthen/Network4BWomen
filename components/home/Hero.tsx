// OWNED BY: rhamon — Accueil. Hero éditorial signature (masque + parallaxe).
"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import styles from "./home.module.css";
import { coverImage } from "@/lib/media";

/**
 * Hero : eyebrow + titre serif révélé par masque (lignes qui montent),
 * sous-titre, CTA pilules, visuel arrondi à droite avec parallaxe légère.
 * Textes = verbatim (docs/CONTENT.md §0). `prefers-reduced-motion` : parallaxe désactivée.
 */
export default function Hero() {
  const visualRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        const y = window.scrollY;
        el.style.transform = `translateY(calc(-50% + ${y * 0.12}px)) rotate(${y * 0.006}deg)`;
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
    <header className={styles.hero}>
      <div className={styles.wrap}>
        <p className={`${styles.eyebrow} ${styles.heroEyebrow}`}>
          Network of Black Women · Toronto, Ontario
        </p>
        <h1>
          <span className={styles.line}>
            <span>Empowering Black Women.</span>
          </span>
          <span className={styles.line}>
            <span>
              Building Community. <em>Creating&nbsp;Leaders.</em>
            </span>
          </span>
        </h1>
        <p className={styles.heroText}>
          A safe and empowering space where Black women and girls grow personally,
          professionally, and collectively through connection, leadership, wellness, and
          opportunity.
        </p>
        <div className={styles.heroCta}>
          <Link href="/get-involved" className={`${styles.btn} ${styles.btnDark}`}>
            Join the community
          </Link>
          <Link href="/programs" className={`${styles.btn} ${styles.btnOutline}`}>
            Explore our programs
          </Link>
          <Link href="/donate" className={`${styles.btn} ${styles.btnPink}`}>
            Donate
          </Link>
        </div>
        <div
          ref={visualRef}
          className={styles.heroVisual}
          style={coverImage("/images/hero.jpg", "linear-gradient(150deg,#e9c8c9,#f6828f 45%,#44312b)")}
          aria-hidden="true"
        />
      </div>
    </header>
  );
}

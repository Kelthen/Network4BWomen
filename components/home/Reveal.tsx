// OWNED BY: rhamon — Accueil. Révélation au scroll (fade + translation douce).
"use client";

import { createElement, useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import styles from "./home.module.css";

type RevealProps = {
  children: ReactNode;
  /** Balise HTML à rendre (défaut: div). */
  as?: ElementType;
  /** Délai en cascade : 1, 2 ou 3 (mappe .d1/.d2/.d3). */
  delay?: 1 | 2 | 3;
  className?: string;
};

/**
 * Enveloppe un bloc et lui ajoute la classe `.in` quand il entre dans le viewport.
 * Se dégrade proprement : si `prefers-reduced-motion`, le CSS neutralise la transition.
 */
export default function Reveal({ children, as, delay, className }: RevealProps) {
  const Tag = as ?? "div";
  const ref = useRef<HTMLElement | null>(null);
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
      { threshold: 0.18 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const classes = [
    styles.reveal,
    delay ? styles[`d${delay}`] : "",
    shown ? styles.in : "",
    className ?? "",
  ]
    .filter(Boolean)
    .join(" ");

  // createElement évite l'erreur de typage « ref sur balise dynamique » (ElementType).
  return createElement(Tag, { ref, className: classes }, children);
}

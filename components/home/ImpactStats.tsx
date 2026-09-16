// OWNED BY: rhamon — Accueil. Bande « Our Impact » (fond brun, compteurs animés).
"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./home.module.css";

// Chiffres réels fournis par NBW (questionnaire 2026-09-15). Le "+" trailing est
// ajouté par <Counter/> une fois l'animation terminée — signifie « au moins ».
const STATS = [
  { end: 200, label: "Women supported" },
  { end: 10, label: "Events hosted" },
  { end: 15, label: "Professional programming" },
  { end: 1200, label: "Volunteer hours" },
  { end: 20, label: "Black Businesses supported" },
] as const;

function Counter({ end }: { end: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [value, setValue] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setValue(end);
      setDone(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          io.unobserve(entry.target);
          let start: number | null = null;
          const tick = (t: number) => {
            if (start === null) start = t;
            const p = Math.min((t - start) / 1400, 1);
            setValue(Math.floor(p * end));
            if (p < 1) requestAnimationFrame(tick);
            else setDone(true);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [end]);

  return (
    <div ref={ref} className={styles.num}>
      {value}
      {done ? "+" : ""}
    </div>
  );
}

export default function ImpactStats() {
  return (
    <section className={styles.impact}>
      <div className={styles.wrap}>
        <p className={styles.eyebrow}>Our impact</p>
        <div className={styles.stats}>
          {STATS.map((s) => (
            <div key={s.label} className={styles.stat}>
              <Counter end={s.end} />
              <div className={styles.lbl}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

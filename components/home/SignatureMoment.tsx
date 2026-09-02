// OWNED BY: rhamon — Accueil. Moment signature (docs/DESIGN.md §6) : une vraie photo
// NBW qui s'agrandit du format carte au plein cadre pendant le scroll, avec une ligne
// éditoriale qui se révèle. Piloté par la progression du scroll (rAF, 60fps, sans
// dépendance). prefers-reduced-motion : rendu statique plein cadre + texte visible.
"use client";

import { useEffect, useRef } from "react";

// Vraie photo communautaire (remplaçable). object/bg-cover → tout ratio fonctionne.
const PHOTO = "/images/gallery/2025-2.jpg";

export default function SignatureMoment() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const track = trackRef.current;
    const card = cardRef.current;
    const overlay = overlayRef.current;
    const text = textRef.current;
    if (!track || !card) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      card.style.transform = "scale(1)";
      card.style.borderRadius = "0px";
      if (overlay) overlay.style.opacity = "0.55";
      if (text) {
        text.style.opacity = "1";
        text.style.transform = "none";
      }
      return;
    }

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      let p = total > 0 ? -rect.top / total : 0;
      p = Math.max(0, Math.min(1, p));
      // easeInOutQuad pour un mouvement naturel
      const e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;

      const scale = 0.62 + (1 - 0.62) * e;
      const radius = 30 * (1 - e);
      card.style.transform = `scale(${scale.toFixed(4)})`;
      card.style.borderRadius = `${radius.toFixed(1)}px`;

      // Voile + texte se révèlent sur les 45 derniers % du parcours.
      const t = Math.max(0, Math.min(1, (p - 0.45) / 0.4));
      if (overlay) overlay.style.opacity = (0.6 * t).toFixed(3);
      if (text) {
        text.style.opacity = t.toFixed(3);
        text.style.transform = `translateY(${((1 - t) * 24).toFixed(1)}px)`;
      }
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        rafRef.current = requestAnimationFrame(update);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <section ref={trackRef} className="relative" style={{ height: "220vh" }} aria-label="Our community">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-brand-cream">
        <div
          ref={cardRef}
          className="relative h-[78vh] w-[92vw] max-w-[1400px] overflow-hidden shadow-[0_40px_80px_-40px_rgba(68,49,43,0.5)] will-change-transform"
          style={{ borderRadius: 30, transform: "scale(0.62)" }}
        >
          {/* Photo (fond) */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${PHOTO}')` }}
            aria-hidden="true"
          />
          {/* Voile brun (contraste du texte) */}
          <div ref={overlayRef} className="absolute inset-0 bg-brand-brown" style={{ opacity: 0 }} aria-hidden="true" />
          {/* Texte éditorial révélé */}
          <div
            ref={textRef}
            className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
            style={{ opacity: 0 }}
          >
            <p className="nbw-eyebrow font-sub text-xs font-semibold uppercase tracking-[0.28em] text-brand-pinkLight">
              Our community
            </p>
            <h2 className="mt-5 max-w-3xl font-serif text-3xl font-semibold leading-[1.08] text-brand-cream sm:text-5xl md:text-6xl">
              A sisterhood where every Black woman is seen, celebrated, and&nbsp;lifted.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

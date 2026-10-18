// OWNED BY: rhamon — Accueil. Moment signature (docs/DESIGN.md §6) : une vraie photo
// NBW qui s'agrandit du format carte au plein cadre pendant le scroll, avec une ligne
// éditoriale qui se révèle. Piloté par la progression du scroll (rAF, 60fps, sans
// dépendance). prefers-reduced-motion : rendu statique plein cadre + texte visible.
//
// Notes NBW du 16/10 : la photo change à chaque passage. Chaque fois que la section sort
// de l'écran, la photo suivante est prête pour le prochain passage (fondu enchaîné) ; on
// ne revoit pas la même en revenant, ni en rechargeant l'accueil dans la même visite.
"use client";

import { useEffect, useRef, useState } from "react";

// Photos de la conférence Our Essence, utilisées nulle part ailleurs sur le site (hors galerie).
// Ajouter une photo ici = elle entre dans la rotation (en retirer une autre ailleurs si besoin).
// `pos` garde les visages dans le cadre (bg-cover recadre selon l'écran).
const PHOTOS = [
  { src: "/images/gallery/2025-2.jpg", pos: "center 40%" },
  { src: "/images/gallery/2025-3.jpg", pos: "center 28%" },
];
const STORAGE_KEY = "nbw-signature-photo";

function readIndex(): number | null {
  try {
    const v = window.sessionStorage.getItem(STORAGE_KEY);
    return v === null ? null : Number(v);
  } catch {
    return null;
  }
}

function writeIndex(i: number) {
  try {
    window.sessionStorage.setItem(STORAGE_KEY, String(i));
  } catch {
    // Stockage bloqué (navigation privée) : la rotation marche quand même pendant la visite.
  }
}

export default function SignatureMoment() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [current, setCurrent] = useState(0);

  // Rotation : nouvelle photo à chaque arrivée sur l'accueil, puis à chaque sortie de la
  // section (le changement se fait hors écran, la photo suivante attend le prochain passage).
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const stored = readIndex();
    let index = stored === null || Number.isNaN(stored) ? 0 : (stored + 1) % PHOTOS.length;
    setCurrent(index);
    writeIndex(index);

    let seen = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          seen = true;
        } else if (seen) {
          seen = false;
          index = (index + 1) % PHOTOS.length;
          setCurrent(index);
          writeIndex(index);
        }
      },
      { threshold: 0 },
    );
    io.observe(track);
    return () => io.disconnect();
  }, []);

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

      // Voile + texte se révèlent plus tôt (à partir de ~35% du parcours).
      const t = Math.max(0, Math.min(1, (p - 0.35) / 0.35));
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
    <section ref={trackRef} className="relative" style={{ height: "150vh" }} aria-label="Our community">
      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden bg-brand-cream">
        <div
          ref={cardRef}
          className="relative h-[78vh] w-[92vw] max-w-[1400px] overflow-hidden shadow-[0_40px_80px_-40px_rgba(68,49,43,0.5)] will-change-transform"
          style={{ borderRadius: 30, transform: "scale(0.62)" }}
        >
          {/* Photos (fond) — empilées et préchargées, fondu vers la photo courante */}
          {PHOTOS.map((p, i) => (
            <div
              key={p.src}
              className="absolute inset-0 bg-cover transition-opacity duration-700 ease-out motion-reduce:transition-none"
              style={{
                backgroundImage: `url('${p.src}')`,
                backgroundPosition: p.pos,
                opacity: i === current ? 1 : 0,
              }}
              aria-hidden="true"
            />
          ))}
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
              Creating a space where Black Women are seen, celebrated and encouraged to strive for&nbsp;success.
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

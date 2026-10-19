// OWNED BY: rhamon — Accueil. Moment signature (docs/DESIGN.md §6) : une vraie photo
// NBW qui s'agrandit du format carte au plein cadre pendant le scroll, avec une ligne
// éditoriale qui se révèle. Piloté par la progression du scroll (rAF, 60fps, sans
// dépendance). prefers-reduced-motion : rendu statique plein cadre + texte visible.
//
// Notes NBW du 16/10 : chaque visite commence sur une photo différente.
// 2026-10-19 (serge, override zone rhamon, demande humaine, maquette validée) : diaporama.
// Les photos glissent de droite à gauche toutes les 4 s, en boucle, dans le même cadre ;
// texte, voile et agrandissement au scroll inchangés. Le défilement s'arrête hors écran,
// onglet caché, ou avec le bouton pause (WCAG 2.2.2). prefers-reduced-motion : pas de
// défilement automatique, pas de bouton.
"use client";

import { useEffect, useRef, useState } from "react";

// Photos utilisées nulle part ailleurs sur le site (hors galerie) : conférence Our Essence
// et pickleball. Ajouter une photo ici = elle entre dans le diaporama (en retirer une autre
// ailleurs si besoin, règle « une photo par emplacement » du 16/10).
// `pos` garde les visages dans le cadre (bg-cover recadre selon l'écran).
const PHOTOS = [
  { src: "/images/gallery/2025-2.jpg", pos: "center 40%" },
  { src: "/images/gallery/pickleball/pickleball-highlights-02.jpg", pos: "center 25%" },
  { src: "/images/gallery/2025-3.jpg", pos: "center 28%" },
  { src: "/images/gallery/pickleball/pickleball-highlights-04.jpg", pos: "center 20%" },
  { src: "/images/gallery/pickleball/pickleball-highlights-14.jpg", pos: "center 15%" },
  { src: "/images/gallery/pickleball/pickleball-highlights-08.jpg", pos: "center 20%" },
];
// Rangée affichée : les photos + une copie de la première, pour boucler sans saut visible.
const SLIDES = [...PHOTOS, PHOTOS[0]];
const INTERVAL_MS = 4000;
const SLIDE_MS = 1100;
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
    // Stockage bloqué (navigation privée) : le diaporama marche quand même pendant la visite.
  }
}

export default function SignatureMoment() {
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(false);
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(false);
  const [tabHidden, setTabHidden] = useState(false);
  const [paused, setPaused] = useState(false);

  // Départ : une photo différente à chaque visite (règle du 16/10, gardée).
  useEffect(() => {
    const stored = readIndex();
    const start = stored === null || Number.isNaN(stored) ? 0 : (stored + 1) % PHOTOS.length;
    setIndex(start);
    writeIndex(start);
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Le diaporama ne tourne que lorsque la section est à l'écran et l'onglet visible.
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    io.observe(card);
    const onVisibility = () => setTabHidden(document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const running = visible && !tabHidden && !paused && !reduced;
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setAnimate(true);
      setIndex((i) => {
        writeIndex((i + 1) % PHOTOS.length);
        return Math.min(i + 1, PHOTOS.length);
      });
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [running]);

  // Arrivé sur la copie de la première photo : retour instantané au début de la rangée
  // (identique à l'œil), avant le glissement suivant.
  useEffect(() => {
    if (index !== PHOTOS.length) return;
    const t = window.setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, SLIDE_MS + 50);
    return () => window.clearTimeout(t);
  }, [index]);

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
          {/* Photos (fond) — une rangée qui glisse de droite à gauche */}
          <div
            className="absolute inset-0 flex"
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: animate ? `transform ${SLIDE_MS}ms cubic-bezier(0.65, 0, 0.35, 1)` : "none",
            }}
            aria-hidden="true"
          >
            {SLIDES.map((p, i) => (
              <div
                key={`${p.src}-${i}`}
                className="h-full w-full flex-none bg-cover"
                style={{ backgroundImage: `url('${p.src}')`, backgroundPosition: p.pos }}
              />
            ))}
          </div>
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
          {/* Pause / lecture du diaporama (seul ajout visible, accessibilité) */}
          {!reduced && (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-pressed={paused}
              aria-label={paused ? "Play the slideshow" : "Pause the slideshow"}
              className="absolute bottom-[18px] right-[18px] z-10 grid h-[38px] w-[38px] place-items-center rounded-full border border-brand-cream/45 bg-brand-brown/35 text-brand-cream backdrop-blur-sm transition hover:bg-brand-brown/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-brand-pinkLight"
            >
              {paused ? (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <path d="M3.5 1.8v10.4a.6.6 0 0 0 .9.5l8.2-5.2a.6.6 0 0 0 0-1L4.4 1.3a.6.6 0 0 0-.9.5z" fill="currentColor" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                  <rect x="2.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
                  <rect x="8.5" y="1.5" width="3" height="11" rx="1" fill="currentColor" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

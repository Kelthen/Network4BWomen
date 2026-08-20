// OWNED BY: rhamon (built into serge's Gallery zone, with the owner's approval).
// Interactive image lightbox: enlarge on click, backdrop blur, Esc/click/close,
// ◀ ▶ navigation, and a tasteful 3D tilt + glare that tracks mouse AND touch.
// No dependency: the spring is a small requestAnimationFrame lerp (best perf /
// smallest bundle). prefers-reduced-motion disables the tilt.
"use client";

import { useCallback, useEffect, useRef } from "react";

type Props = {
  photos: string[];
  index: number;
  onClose: () => void;
  onNavigate: (nextIndex: number) => void;
};

const MAX_TILT = 10; // degrés max de rotation
const EASE = 0.14; // facteur de lerp (plus petit = plus "ressort")

export default function Lightbox({ photos, index, onClose, onNavigate }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number | null>(null);
  // état d'animation (hors React pour la fluidité)
  const cur = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, go: 0 });
  const target = useRef({ rx: 0, ry: 0, gx: 50, gy: 50, go: 0 });

  const total = photos.length;
  const src = photos[index];

  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  const goPrev = useCallback(() => onNavigate((index - 1 + total) % total), [index, total, onNavigate]);
  const goNext = useCallback(() => onNavigate((index + 1) % total), [index, total, onNavigate]);

  // Clavier : Esc ferme, ← → naviguent.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") goPrev();
      else if (e.key === "ArrowRight") goNext();
    }
    document.addEventListener("keydown", onKey);
    // scroll lock
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose, goPrev, goNext]);

  // Boucle d'animation (ressort) — n'écrit que dans le DOM, jamais dans le state.
  useEffect(() => {
    if (prefersReduced) return;
    function tick() {
      const c = cur.current;
      const t = target.current;
      c.rx += (t.rx - c.rx) * EASE;
      c.ry += (t.ry - c.ry) * EASE;
      c.gx += (t.gx - c.gx) * EASE;
      c.gy += (t.gy - c.gy) * EASE;
      c.go += (t.go - c.go) * EASE;
      if (cardRef.current) {
        cardRef.current.style.transform = `perspective(1100px) rotateX(${c.rx.toFixed(2)}deg) rotateY(${c.ry.toFixed(2)}deg)`;
      }
      if (glareRef.current) {
        glareRef.current.style.background = `radial-gradient(circle at ${c.gx.toFixed(1)}% ${c.gy.toFixed(1)}%, rgba(255,255,255,0.45), rgba(255,255,255,0) 55%)`;
        glareRef.current.style.opacity = c.go.toFixed(3);
      }
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [prefersReduced]);

  function pointFromEvent(clientX: number, clientY: number) {
    const el = cardRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (clientX - r.left) / r.width; // 0..1
    const py = (clientY - r.top) / r.height; // 0..1
    target.current.ry = (px - 0.5) * 2 * MAX_TILT;
    target.current.rx = -(py - 0.5) * 2 * MAX_TILT;
    target.current.gx = px * 100;
    target.current.gy = py * 100;
    target.current.go = 1;
  }

  function resetTilt() {
    target.current.rx = 0;
    target.current.ry = 0;
    target.current.go = 0;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Photo viewer"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-brand-brown/70 p-4 backdrop-blur-md sm:p-8"
    >
      {/* Close */}
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-brand-brown shadow-lg transition hover:scale-105 hover:bg-white"
      >
        <span aria-hidden="true" className="text-2xl leading-none">&times;</span>
      </button>

      {/* Prev / Next */}
      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            aria-label="Previous photo"
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-brown shadow-lg transition hover:scale-105 hover:bg-white sm:left-6"
          >
            <span aria-hidden="true" className="text-2xl leading-none">&#8249;</span>
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            aria-label="Next photo"
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/85 text-brand-brown shadow-lg transition hover:scale-105 hover:bg-white sm:right-6"
          >
            <span aria-hidden="true" className="text-2xl leading-none">&#8250;</span>
          </button>
        </>
      )}

      {/* Carte photo (tilt) — stopPropagation pour ne pas fermer au clic dessus */}
      <div
        ref={cardRef}
        onClick={(e) => e.stopPropagation()}
        onMouseMove={(e) => pointFromEvent(e.clientX, e.clientY)}
        onMouseLeave={resetTilt}
        onTouchStart={(e) => { const t = e.touches[0]; if (t) pointFromEvent(t.clientX, t.clientY); }}
        onTouchMove={(e) => { const t = e.touches[0]; if (t) pointFromEvent(t.clientX, t.clientY); }}
        onTouchEnd={resetTilt}
        className="relative max-h-[85vh] max-w-[92vw] overflow-hidden rounded-2xl shadow-2xl will-change-transform sm:max-w-[80vw]"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt="Network of Black Women — community moment"
          className="block max-h-[85vh] w-auto max-w-full select-none object-contain"
          draggable={false}
        />
        {/* Reflet dynamique */}
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 mix-blend-soft-light"
        />
      </div>

      {/* Compteur */}
      {total > 1 && (
        <p className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/85 px-3 py-1 text-xs font-medium text-brand-brown">
          {index + 1} / {total}
        </p>
      )}
    </div>
  );
}

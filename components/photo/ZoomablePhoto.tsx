// OWNED BY: shared — primitive photo cliquable + zoomable, réutilisable partout.
// Tant que le fichier n'existe pas: dégradé de marque en secours + overlay optionnel
// (ex. initiales), NON cliquable. Dès que la vraie photo charge: la carte devient un
// bouton "zoom" qui ouvre la visionneuse 3D globale (voir PhotoLightboxProvider + Lightbox).
// Accessible (clavier, aria), respecte prefers-reduced-motion via le Lightbox lui-même.
"use client";

import { useEffect, useRef, useState } from "react";
import { usePhotoLightbox } from "./PhotoLightboxProvider";

type Props = {
  src: string;
  /** Dégradé de secours (CSS background-image) affiché tant que la photo n'a pas chargé. */
  gradient: string;
  alt: string;
  /** Classes du conteneur (aspect-ratio, rounded, etc.). */
  className?: string;
  /** Album optionnel pour naviguer ◀▶ dans la visionneuse. Par défaut: la photo seule. */
  group?: string[];
  index?: number;
  /** Overlay affiché sur le dégradé de secours (ex. initiales). Disparaît quand la photo charge. */
  children?: React.ReactNode;
  priority?: boolean;
};

export default function ZoomablePhoto({
  src,
  gradient,
  alt,
  className = "",
  group,
  index = 0,
  children,
  priority = false,
}: Props) {
  const open = usePhotoLightbox();
  const imgRef = useRef<HTMLImageElement>(null);
  const [ready, setReady] = useState(false);

  // Cas des images déjà en cache: onLoad peut avoir eu lieu avant l'hydratation.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) setReady(true);
  }, [src]);

  const album = group && group.length ? group : [src];
  const start = group && group.length ? index : 0;

  return (
    <button
      type="button"
      onClick={ready ? () => open(album, start) : undefined}
      tabIndex={ready ? 0 : -1}
      aria-hidden={ready ? undefined : true}
      aria-label={ready ? `Enlarge photo: ${alt}` : undefined}
      className={`group relative block w-full overflow-hidden text-left ${
        ready ? "cursor-zoom-in" : "cursor-default"
      } ${className}`}
      style={{ backgroundImage: gradient, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      {/* La vraie photo — fond en secours si absente. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setReady(true)}
        onError={() => setReady(false)}
        loading={priority ? "eager" : "lazy"}
        draggable={false}
        className={`absolute inset-0 h-full w-full select-none object-cover transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Overlay du placeholder (initiales…) — s'estompe quand la photo apparaît. */}
      {children != null && (
        <div
          aria-hidden="true"
          className={`relative z-[1] h-full transition-opacity duration-500 ${ready ? "opacity-0" : "opacity-100"}`}
        >
          {children}
        </div>
      )}

      {/* Voile + pastille "zoom" au survol (seulement quand cliquable). */}
      {ready && (
        <>
          <span className="pointer-events-none absolute inset-0 z-[2] bg-brand-brown/0 transition duration-500 group-hover:bg-brand-brown/15" />
          <span className="pointer-events-none absolute bottom-3 right-3 z-[2] flex h-9 w-9 translate-y-1 items-center justify-center rounded-full bg-brand-cream/90 text-brand-brown opacity-0 shadow-md transition duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M11 8v6M8 11h6M20 20l-3.6-3.6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </>
      )}
    </button>
  );
}

// OWNED BY: shared — visionneuse photo globale. Un seul Lightbox monté pour tout le site.
// N'importe quelle photo (via <ZoomablePhoto>) peut l'ouvrir. Modif = coordonner (CLAUDE.md §1.2).
"use client";

import { createContext, useCallback, useContext, useState } from "react";
import Lightbox from "@/components/gallery/Lightbox";

type OpenFn = (photos: string[], index?: number) => void;

const PhotoLightboxContext = createContext<OpenFn>(() => {});

/** Ouvre la visionneuse depuis n'importe où : openLightbox([src]) ou openLightbox(album, i). */
export function usePhotoLightbox(): OpenFn {
  return useContext(PhotoLightboxContext);
}

type State = { photos: string[]; index: number } | null;

export default function PhotoLightboxProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(null);

  const open = useCallback<OpenFn>((photos, index = 0) => {
    if (!photos.length) return;
    setState({ photos, index });
  }, []);

  return (
    <PhotoLightboxContext.Provider value={open}>
      {children}
      {state && (
        <Lightbox
          photos={state.photos}
          index={state.index}
          onClose={() => setState(null)}
          onNavigate={(next) => setState((s) => (s ? { ...s, index: next } : s))}
        />
      )}
    </PhotoLightboxContext.Provider>
  );
}

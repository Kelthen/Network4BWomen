// OWNED BY: rhamon (built into serge's Gallery zone, with the owner's approval).
// Renders one album's tiles. Real photos are clickable and open the Lightbox;
// remaining slots are decorative brand-gradient placeholders (non-clickable).
"use client";

import { useState } from "react";
import { coverImage } from "@/lib/media";
import Reveal from "@/components/home/Reveal";
import Lightbox from "@/components/gallery/Lightbox";

const GRADIENTS = [
  "linear-gradient(160deg,#97ac9f,#e8dcc8)",
  "linear-gradient(160deg,#e9c8c9,#ffbbbb)",
  "linear-gradient(160deg,#c9a24b,#e8dcc8)",
  "linear-gradient(160deg,#f6828f,#44312b)",
  "linear-gradient(160deg,#97ac9f,#6e9179)",
  "linear-gradient(160deg,#e8dcc8,#c9a24b)",
  "linear-gradient(160deg,#e9c8c9,#97ac9f)",
  "linear-gradient(160deg,#ffbbbb,#c9a24b)",
];
const SPANS = ["row-span-2", "", "", "row-span-2", "", "", "", ""];

export default function GalleryGrid({ photos, minTiles = 8 }: { photos: string[]; minTiles?: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const tileCount = Math.max(photos.length, minTiles);

  return (
    <>
      <div className="mt-6 grid auto-rows-[140px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {Array.from({ length: tileCount }).map((_, i) => {
          const src = photos[i];
          const g = GRADIENTS[i % GRADIENTS.length];
          const span = SPANS[i % SPANS.length];
          const delay = ((i % 3) + 1) as 1 | 2 | 3;

          if (src) {
            return (
              <Reveal as="div" key={i} delay={delay} className={`overflow-hidden rounded-xl ${span}`}>
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-label="Open photo"
                  className="group relative block h-full w-full cursor-pointer"
                >
                  <span
                    className="block h-full w-full transition duration-500 group-hover:scale-[1.03]"
                    style={coverImage(src, g)}
                  />
                  <span className="pointer-events-none absolute inset-0 bg-brand-brown/0 transition group-hover:bg-brand-brown/10" />
                </button>
              </Reveal>
            );
          }

          return (
            <Reveal as="div" key={i} delay={delay} className={`overflow-hidden rounded-xl ${span}`}>
              <div
                className="h-full w-full"
                style={{ backgroundImage: g }}
                aria-hidden="true"
              />
            </Reveal>
          );
        })}
      </div>

      {open !== null && (
        <Lightbox
          photos={photos}
          index={open}
          onClose={() => setOpen(null)}
          onNavigate={(next) => setOpen(next)}
        />
      )}
    </>
  );
}

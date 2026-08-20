// OWNED BY: serge — Gallery. (Built by rhamon's Claude as help — serge unavailable — with the
// owner's approval.) See docs/CONTENT.md §9. Placeholder tiles pending the `gallery_media` table.
import type { Metadata } from "next";
import Reveal from "@/components/home/Reveal";
import GalleryGrid from "@/components/gallery/GalleryGrid";

export const metadata: Metadata = {
  title: "Gallery — Network of Black Women (NBW)",
  description: "Moments from NBW events and gatherings — celebrating Black women and girls in Toronto, Ontario.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-goldText";

// Albums by year. `photos` lists the real files present in public/images/gallery/
// (lowercase .jpg). Remaining tiles render as brand-gradient placeholders.
// Real media will eventually come from the `gallery_media` table.
const ALBUMS = [
  {
    year: "2025",
    label: "Community & events",
    photos: [
      "/images/gallery/2025-1.jpg",
      "/images/gallery/2025-2.jpg",
      "/images/gallery/2025-3.jpg",
      "/images/gallery/2025-4.jpg",
    ],
  },
  { year: "2024", label: "Conference & retreat", photos: [] as string[] },
];

export default function GalleryPage() {
  return (
    <div className="bg-brand-cream text-brand-brown">
      <header className="mx-auto max-w-6xl px-6 pt-24 pb-12 md:pt-32">
        <Reveal as="p" className={EYEBROW}>Gallery</Reveal>
        <Reveal as="h1" delay={1} className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Our community, in full colour.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
          Moments from our events and gatherings. Real photography is on the way — these are
          placeholders in the meantime.
        </Reveal>
      </header>

      {ALBUMS.map((album) => (
        <section key={album.year} className="mx-auto max-w-6xl px-6 pb-14">
          <Reveal as="div" className="flex items-baseline gap-4 border-b border-brand-beige pb-3">
            <h2 className="font-serif text-3xl text-brand-brown">{album.year}</h2>
            <p className="text-brand-brown/80">{album.label}</p>
          </Reveal>
          <GalleryGrid photos={album.photos} />
          {album.photos.length > 0 && (
            <p className="mt-4 text-sm text-brand-brown/60">Click a photo to view it larger.</p>
          )}
        </section>
      ))}

      <p className="mx-auto max-w-6xl px-6 pb-24 text-sm text-brand-brown/75">
        Albums and photos are placeholders pending NBW&apos;s media.
      </p>
    </div>
  );
}

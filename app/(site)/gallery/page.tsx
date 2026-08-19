// OWNED BY: serge — Gallery. (Built by rhamon's Claude as help — serge unavailable — with the
// owner's approval.) See docs/CONTENT.md §9. Placeholder tiles pending the `gallery_media` table.
import type { Metadata } from "next";
import Reveal from "@/components/home/Reveal";
import { coverImage } from "@/lib/media";

export const metadata: Metadata = {
  title: "Gallery — Network of Black Women (NBW)",
  description: "Moments from NBW events and gatherings — celebrating Black women and girls in Toronto, Ontario.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-goldText";

// Placeholder albums by year — real media comes from `gallery_media`.
const ALBUMS = [
  { year: "2025", label: "Community & events" },
  { year: "2024", label: "Conference & retreat" },
];

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

// Varied tile spans for an editorial masonry feel.
const SPANS = ["row-span-2", "", "", "row-span-2", "", "", "", ""];

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
          <div className="mt-6 grid auto-rows-[140px] grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {GRADIENTS.map((g, i) => (
              <Reveal
                as="div"
                key={i}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className={`overflow-hidden rounded-xl ${SPANS[i]}`}
              >
                <div
                  className="h-full w-full transition duration-500 hover:scale-[1.03]"
                  style={coverImage(`/images/gallery/${album.year}-${i + 1}.jpg`, g)}
                  aria-hidden="true"
                />
              </Reveal>
            ))}
          </div>
        </section>
      ))}

      <p className="mx-auto max-w-6xl px-6 pb-24 text-sm text-brand-brown/75">
        Albums and photos are placeholders pending NBW&apos;s media.
      </p>
    </div>
  );
}

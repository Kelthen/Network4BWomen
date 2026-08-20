// OWNED BY: serge — Gallery. Wired to Supabase `gallery_media` table.
// Falls back to local photos + gradient placeholders when Supabase is unavailable.
// See docs/CONTENT.md §9.
import type { Metadata } from "next";
import Reveal from "@/components/home/Reveal";
import GalleryGrid from "@/components/gallery/GalleryGrid";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Gallery — Network of Black Women (NBW)",
  description: "Moments from NBW events and gatherings — celebrating Black women and girls in Toronto, Ontario.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-goldText";

type Album = {
  year: string;
  label: string;
  photos: string[];
};

// Fallback albums with local photos
const FALLBACK_ALBUMS: Album[] = [
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
  { year: "2024", label: "Conference & retreat", photos: [] },
];

async function getAlbums(): Promise<Album[]> {
  try {
    const { data, error } = await supabase
      .from("gallery_media")
      .select("year, event_name, image_url, caption, sort_order")
      .order("year", { ascending: false })
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_ALBUMS;
    }

    // Group by year
    const grouped = new Map<number, { event_name: string; photos: string[] }>();
    for (const item of data) {
      if (!grouped.has(item.year)) {
        grouped.set(item.year, { event_name: item.event_name, photos: [] });
      }
      grouped.get(item.year)!.photos.push(item.image_url);
    }

    return Array.from(grouped.entries()).map(([year, { event_name, photos }]) => ({
      year: String(year),
      label: event_name,
      photos,
    }));
  } catch {
    return FALLBACK_ALBUMS;
  }
}

export default async function GalleryPage() {
  const albums = await getAlbums();

  return (
    <div className="bg-brand-cream text-brand-brown">
      <header className="mx-auto max-w-6xl px-6 pt-24 pb-12 md:pt-32">
        <Reveal as="p" className={EYEBROW}>Gallery</Reveal>
        <Reveal as="h1" delay={1} className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Our community, in full colour.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
          Moments from our events and gatherings — celebrating Black women and sisterhood.
        </Reveal>
      </header>

      {albums.map((album) => (
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
    </div>
  );
}

// OWNED BY: serge — Recherche site.
// Agrège programmes/événements/ressources/articles (Supabase) + pages statiques
// en un seul index, passé au composant client qui filtre à la frappe (pas de
// requête réseau par lettre tapée). Si Supabase est indisponible, on retombe sur
// les pages statiques seules — jamais une recherche cassée.
import type { Metadata } from "next";
import Reveal from "@/components/home/Reveal";
import SearchClient, { type SearchHit } from "@/components/search/SearchClient";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Search — Network of Black Women (NBW)",
  description: "Search programs, events, resources, and stories across the NBW site.",
};

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText";

// Pages statiques du site — toujours présentes dans l'index, même si Supabase tombe.
const STATIC_PAGES: SearchHit[] = [
  { type: "Page", title: "About", excerpt: "Our story, mission, vision, and the team behind NBW.", href: "/about" },
  { type: "Page", title: "Programs", excerpt: "Professional development, leadership, mentorship, and more.", href: "/programs" },
  { type: "Page", title: "Events", excerpt: "Upcoming gatherings, workshops, and networking.", href: "/events" },
  { type: "Page", title: "Conference", excerpt: "NBW's annual conference — speakers, schedule, registration.", href: "/conference" },
  { type: "Page", title: "Get Involved", excerpt: "Volunteer, mentor, speak, or partner with NBW.", href: "/get-involved" },
  { type: "Page", title: "Donate", excerpt: "Support NBW with a one-time or monthly gift.", href: "/donate" },
  { type: "Page", title: "Resources", excerpt: "Career, scholarships, mental health, and community resources.", href: "/resources" },
  { type: "Page", title: "News & Stories", excerpt: "Success stories, community news, and wellness tips.", href: "/news" },
  { type: "Page", title: "Gallery", excerpt: "Photos from NBW events, by year.", href: "/gallery" },
  { type: "Page", title: "Contact", excerpt: "Get in touch with the NBW team.", href: "/contact" },
];

async function getSearchIndex(): Promise<SearchHit[]> {
  const hits: SearchHit[] = [...STATIC_PAGES];

  try {
    const [programs, events, resources, posts] = await Promise.all([
      supabase.from("programs").select("slug, title, purpose").eq("is_active", true),
      supabase.from("events").select("slug, title, description"),
      supabase.from("resources").select("title, description"),
      supabase.from("posts").select("slug, title, excerpt").eq("is_published", true),
    ]);

    programs.data?.forEach((p) =>
      hits.push({ type: "Program", title: p.title, excerpt: p.purpose, href: "/programs" }),
    );
    events.data?.forEach((e) =>
      hits.push({
        type: "Event",
        title: e.title,
        excerpt: e.description,
        href: e.slug ? `/events/${e.slug}` : "/events",
      }),
    );
    resources.data?.forEach((r) =>
      hits.push({ type: "Resource", title: r.title, excerpt: r.description, href: "/resources" }),
    );
    posts.data?.forEach((p) =>
      hits.push({ type: "Article", title: p.title, excerpt: p.excerpt, href: `/news/${p.slug}` }),
    );
  } catch {
    // Supabase indisponible : on garde au moins les pages statiques.
  }

  return hits;
}

export default async function SearchPage() {
  const index = await getSearchIndex();

  return (
    <div className="bg-brand-cream text-brand-brown">
      <header className="mx-auto max-w-3xl px-6 pt-24 pb-4 md:pt-32">
        <Reveal as="p" className={EYEBROW}>
          Search
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl"
        >
          Find what you&apos;re looking for.
        </Reveal>
      </header>

      <section className="mx-auto max-w-3xl px-6 pb-24">
        <SearchClient items={index} />
      </section>
    </div>
  );
}

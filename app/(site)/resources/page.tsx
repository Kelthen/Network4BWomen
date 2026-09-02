// OWNED BY: serge — Resources. Wired to Supabase `resources` table.
// Fallback to placeholder data when Supabase is unavailable.
// See docs/CONTENT.md §7.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { supabase } from "@/lib/supabase";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Resources — Network of Black Women (NBW)",
  description:
    "Career, scholarships, mental health, business directory, and community resources for Black women in Toronto, Ontario.",
};

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

const ACCENTS = [
  "linear-gradient(160deg,#97ac9f,#e8dcc8)",
  "linear-gradient(160deg,#e9c8c9,#ffbbbb)",
  "linear-gradient(160deg,#c9a24b,#e8dcc8)",
  "linear-gradient(160deg,#97ac9f,#6e9179)",
  "linear-gradient(160deg,#f6828f,#44312b)",
  "linear-gradient(160deg,#e8dcc8,#c9a24b)",
  "linear-gradient(160deg,#e9c8c9,#97ac9f)",
];

const FALLBACK_RESOURCES = [
  { title: "Career", description: "Job boards, résumé help, and interview preparation.", category: "Career", url: null, file_url: null },
  { title: "Scholarships", description: "Funding opportunities for members and youth.", category: "Scholarships", url: null, file_url: null },
  { title: "Mental Health", description: "Culturally-aware wellness and counselling resources.", category: "Mental Health", url: null, file_url: null },
  { title: "Business Directory", description: "Discover and support Black-owned businesses.", category: "Business Directory", url: null, file_url: null },
  { title: "Professional Development Tools", description: "Courses, templates, and skill-building.", category: "Professional Development", url: null, file_url: null },
  { title: "Community Resources", description: "Local services and support networks.", category: "Community", url: null, file_url: null },
  { title: "Templates & Guides", description: "Practical downloads to help you move forward.", category: "Templates", url: null, file_url: null },
];

type Resource = {
  id?: string;
  title: string;
  description: string | null;
  category: string;
  url: string | null;
  file_url: string | null;
};

async function getResources(): Promise<Resource[]> {
  try {
    const { data, error } = await supabase
      .from("resources")
      .select("id, title, description, category, url, file_url")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_RESOURCES;
    }
    return data;
  } catch {
    return FALLBACK_RESOURCES;
  }
}

export default async function ResourcesPage() {
  const resources = await getResources();

  // Group by category
  const categories = [...new Set(resources.map((r) => r.category))];

  return (
    <div className="bg-brand-cream text-brand-brown">
      <header className="mx-auto max-w-6xl px-6 pt-24 pb-14 md:pt-32">
        <Reveal as="p" className={EYEBROW}>Resources</Reveal>
        <Reveal as="h1" delay={1} className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Tools and support, in one place.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
          Curated resources to help Black women and girls grow — personally and professionally.
        </Reveal>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resources.map((r, i) => (
            <Reveal
              as="li"
              key={r.id ?? r.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_#e8dcc8] transition hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(68,49,43,0.35)]"
            >
              <div className="h-24 w-full" style={{ background: ACCENTS[i % ACCENTS.length] }} aria-hidden="true" />
              <div className="flex flex-1 flex-col p-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-brand-goldText">
                  {r.category}
                </span>
                <h2 className="mt-1 font-serif text-xl text-brand-brown">{r.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-brown/80">{r.description}</p>
                {r.url ? (
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-sm font-semibold text-brand-brown transition hover:text-brand-pink"
                  >
                    Visit resource →
                  </a>
                ) : r.file_url ? (
                  <a
                    href={r.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-sm font-semibold text-brand-brown transition hover:text-brand-pink"
                  >
                    Download →
                  </a>
                ) : (
                  <span className="mt-4 text-sm font-semibold text-brand-brown/75">Coming soon</span>
                )}
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      <section className="bg-brand-brown text-brand-cream">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:flex-row md:items-center md:justify-between">
          <h2 className="max-w-xl font-serif text-3xl md:text-4xl">Know a resource we should add?</h2>
          <Link href="/contact" className="rounded-full bg-brand-pink px-6 py-3 font-semibold text-brand-brown transition hover:-translate-y-0.5">
            Suggest a resource
          </Link>
        </div>
      </section>
    </div>
  );
}

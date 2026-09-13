// OWNED BY: rhamon — Accueil. « Sponsors & Community Partners » (table sponsors — CONTENT §1).
import Link from "next/link";
import Reveal from "@/components/home/Reveal";
import { supabase } from "@/lib/supabase";

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

type Sponsor = { name: string; logo_url: string | null };

async function getSponsors(): Promise<Sponsor[]> {
  try {
    const { data, error } = await supabase
      .from("sponsors")
      .select("name, logo_url")
      .order("sort_order", { ascending: true });
    if (error || !data) return [];
    return data;
  } catch {
    return [];
  }
}

export default async function Sponsors() {
  const sponsors = await getSponsors();

  return (
    <section className="bg-brand-cream">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Reveal as="p" className={EYEBROW}>
              Sponsors &amp; community partners
            </Reveal>
            <Reveal as="h2" delay={1} className="mt-3 font-serif text-3xl md:text-4xl text-brand-brown">
              Built together, with our partners.
            </Reveal>
          </div>
          <Reveal delay={1}>
            <Link
              href="/get-involved"
              className="rounded-full bg-brand-pink px-5 py-2.5 text-sm font-semibold text-brand-brown transition hover:-translate-y-0.5"
            >
              Become a partner
            </Link>
          </Reveal>
        </div>

        {sponsors.length === 0 ? (
          <p className="mt-8 text-sm text-brand-brown/60">Our partner list is growing — check back soon.</p>
        ) : (
          <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {sponsors.map((s, i) => (
              <Reveal
                as="li"
                key={s.name + i}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className="flex h-24 items-center justify-center rounded-xl border border-brand-beige bg-white p-3"
              >
                {s.logo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.logo_url} alt={s.name} className="max-h-full max-w-full object-contain" />
                ) : (
                  <span className="text-sm font-semibold uppercase tracking-wide text-brand-brown/50">{s.name}</span>
                )}
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

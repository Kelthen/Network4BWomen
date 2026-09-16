// OWNED BY: rhamon — Accueil. Témoignages (table testimonials — CONTENT §1).
import Reveal from "@/components/home/Reveal";
import { supabase } from "@/lib/supabase";

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

type Testimonial = { quote: string; author_name: string; author_role: string | null };

// Citations réelles fournies par NBW (questionnaire 2026-09-15). Servent de fallback
// tant que la table Supabase `testimonials` n'est pas peuplée.
const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "The Network of Black Women is a wonderful organization that provides accessibility to resources and personal/professional support systems to Black women of all ages across Southern Alberta and beyond. Through partnerships and collaborations the NBW opens the door for creativity whilst highlighting the necessity of self-care and accessibility.",
    author_name: "Board of Directors Member",
    author_role: null,
  },
  {
    quote:
      "I have had the pleasure of attending a Network of Black Women's event. The pickleball event was thoughtfully organized and was filled with friendly faces and a warm community of Black women uplifting each other, with a side of friendly competition. I strongly encourage anyone looking to come hang out and try something new. Everyone is so welcoming.",
    author_name: "Community member",
    author_role: null,
  },
];

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("quote, author_name, author_role")
      .eq("is_featured", true)
      .order("sort_order", { ascending: true })
      .limit(3);
    if (error || !data || data.length === 0) return FALLBACK_TESTIMONIALS;
    return data;
  } catch {
    return FALLBACK_TESTIMONIALS;
  }
}

export default async function Testimonials() {
  const quotes = await getTestimonials();

  return (
    <section className="bg-brand-blush/40">
      <div className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <Reveal as="p" className={EYEBROW}>
          Voices from the community
        </Reveal>
        <Reveal as="h2" delay={1} className="mt-3 max-w-2xl font-serif text-3xl md:text-4xl text-brand-brown">
          Our network, in their own words.
        </Reveal>

        {quotes.length === 0 ? (
          <Reveal as="p" delay={2} className="mt-6 text-brand-brown/60">
            Real stories from our members are coming soon.
          </Reveal>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {quotes.map((t, i) => (
              <Reveal
                as="figure"
                key={t.author_name + i}
                delay={((i % 3) + 1) as 1 | 2 | 3}
                className="flex flex-col rounded-2xl bg-white p-7 shadow-[0_1px_0_#e8dcc8]"
              >
                <span aria-hidden="true" className="font-serif text-5xl leading-none text-brand-pink">
                  &ldquo;
                </span>
                <blockquote className="mt-2 flex-1 font-serif text-lg leading-snug text-brand-brown">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-brand-brown/70">
                  — {t.author_name}
                  {t.author_role ? `, ${t.author_role}` : ""}
                </figcaption>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

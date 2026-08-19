// OWNED BY: serge — Resources. (Built by rhamon's Claude as help — serge unavailable — with the
// owner's approval.) See docs/CONTENT.md §7. Placeholder content pending the `resources` table.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";

export const metadata: Metadata = {
  title: "Resources — Network of Black Women (NBW)",
  description:
    "Career, scholarships, mental health, business directory, and community resources for Black women in Southern Alberta.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-goldText";

const RESOURCES = [
  { title: "Career", desc: "Job boards, résumé help, and interview preparation." },
  { title: "Scholarships", desc: "Funding opportunities for members and youth." },
  { title: "Mental Health", desc: "Culturally-aware wellness and counselling resources." },
  { title: "Business Directory", desc: "Discover and support Black-owned businesses." },
  { title: "Professional Development Tools", desc: "Courses, templates, and skill-building." },
  { title: "Community Resources", desc: "Local services and support networks." },
  { title: "Templates & Guides", desc: "Practical downloads to help you move forward." },
];

const ACCENTS = [
  "linear-gradient(160deg,#97ac9f,#e8dcc8)",
  "linear-gradient(160deg,#e9c8c9,#ffbbbb)",
  "linear-gradient(160deg,#c9a24b,#e8dcc8)",
  "linear-gradient(160deg,#97ac9f,#6e9179)",
  "linear-gradient(160deg,#f6828f,#44312b)",
  "linear-gradient(160deg,#e8dcc8,#c9a24b)",
  "linear-gradient(160deg,#e9c8c9,#97ac9f)",
];

export default function ResourcesPage() {
  return (
    <div className="bg-brand-cream text-brand-brown">
      <header className="mx-auto max-w-6xl px-6 pt-24 pb-14 md:pt-32">
        <Reveal as="p" className={EYEBROW}>Resources</Reveal>
        <Reveal as="h1" delay={1} className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl">
          Tools and support, in one place.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
          Curated resources to help Black women and girls grow — personally and professionally.
          Links and downloads are being added.
        </Reveal>
      </header>

      <section className="mx-auto max-w-6xl px-6 pb-24">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {RESOURCES.map((r, i) => (
            <Reveal
              as="li"
              key={r.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_#e8dcc8] transition hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(68,49,43,0.35)]"
            >
              <div className="h-24 w-full" style={{ background: ACCENTS[i % ACCENTS.length] }} aria-hidden="true" />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-serif text-xl text-brand-brown">{r.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-brown/80">{r.desc}</p>
                <span className="mt-4 text-sm font-semibold text-brand-brown/75">Coming soon</span>
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

// OWNED BY: rhamon — Get Involved. See PLAN-rhamon.md, docs/CONTENT.md §6.
// Note: form wiring (app/api/* → form_submissions table) is a later step (rhamon zone).
// For now each path links to Contact or Donate.
import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/home/Reveal";

export const metadata: Metadata = {
  title: "Get Involved — Network of Black Women (NBW)",
  description:
    "Volunteer, mentor, speak, partner, sponsor, or serve on the board — many ways to help NBW grow.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold";

type Way = {
  title: string;
  desc: string;
  cta: string;
  href: string;
  accent: string; // brand gradient
};

const WAYS: Way[] = [
  {
    title: "Volunteer",
    desc: "Give your time and energy to bring the community's events and programs to life.",
    cta: "I want to help",
    href: "/contact",
    accent: "linear-gradient(160deg,#97ac9f,#e8dcc8)",
  },
  {
    title: "Become a Mentor",
    desc: "Share your experience and guide a woman or girl on her journey.",
    cta: "Become a mentor",
    href: "/contact",
    accent: "linear-gradient(160deg,#e9c8c9,#ffbbbb)",
  },
  {
    title: "Become a Speaker",
    desc: "Speak at a workshop, a panel, or our annual conference.",
    cta: "Propose a talk",
    href: "/contact",
    accent: "linear-gradient(160deg,#c9a24b,#e8dcc8)",
  },
  {
    title: "Partner With Us",
    desc: "Does your organization share our values? Let's build meaningful initiatives together.",
    cta: "Discuss a partnership",
    href: "/contact",
    accent: "linear-gradient(160deg,#97ac9f,#6e9179)",
  },
  {
    title: "Corporate Sponsorship",
    desc: "Support our programs and annual conference through corporate sponsorship.",
    cta: "Become a sponsor",
    href: "/contact",
    accent: "linear-gradient(160deg,#f6828f,#44312b)",
  },
  {
    title: "Board Opportunities",
    desc: "Contribute to NBW's governance and strategic direction.",
    cta: "Learn more",
    href: "/contact",
    accent: "linear-gradient(160deg,#e8dcc8,#c9a24b)",
  },
];

export default function GetInvolvedPage() {
  return (
    <div className="bg-brand-cream text-brand-brown">
      {/* Hero */}
      <header className="mx-auto max-w-6xl px-6 pt-24 pb-14 md:pt-32">
        <Reveal as="p" className={EYEBROW}>
          Get Involved
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-4 max-w-4xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
        >
          There&apos;s a place for you in this sisterhood.
        </Reveal>
        <Reveal as="p" delay={2} className="mt-6 max-w-2xl text-lg text-brand-brown/80">
          Volunteering, mentoring, speaking, partnering, or giving — every contribution helps the
          community grow and uplifts Black women across Southern Alberta.
        </Reveal>
      </header>

      {/* Ways to get involved */}
      <section className="mx-auto max-w-6xl px-6 pb-8">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {WAYS.map((w, i) => (
            <Reveal
              as="li"
              key={w.title}
              delay={((i % 3) + 1) as 1 | 2 | 3}
              className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_#e8dcc8] transition hover:-translate-y-1.5 hover:shadow-[0_24px_48px_-24px_rgba(68,49,43,0.35)]"
            >
              <div className="h-28 w-full" style={{ background: w.accent }} aria-hidden="true" />
              <div className="flex flex-1 flex-col p-6">
                <h2 className="font-serif text-2xl text-brand-brown">{w.title}</h2>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-brown/70">{w.desc}</p>
                <Link
                  href={w.href}
                  className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-brand-pink"
                >
                  {w.cta} <span aria-hidden="true">→</span>
                </Link>
              </div>
            </Reveal>
          ))}
        </ul>
      </section>

      {/* Prominent donation block */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:py-24">
        <div className="overflow-hidden rounded-3xl bg-brand-brown text-brand-cream">
          <div className="grid gap-8 p-10 md:grid-cols-2 md:items-center md:p-14">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-pinkLight">
                Donate
              </p>
              <h2 className="mt-4 font-serif text-3xl md:text-4xl">
                Your gift funds spaces where Black women thrive.
              </h2>
              <p className="mt-4 max-w-md text-brand-cream/80">
                Programs, scholarships, events, wellness — every contribution has a real, lasting
                impact.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Link
                href="/donate"
                className="rounded-full bg-brand-pink px-7 py-3 font-semibold text-brand-brown transition hover:-translate-y-0.5"
              >
                Donate
              </Link>
              <Link
                href="/contact"
                className="rounded-full border border-brand-cream/40 px-7 py-3 font-semibold text-brand-cream transition hover:bg-brand-cream/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

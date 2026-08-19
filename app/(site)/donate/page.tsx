// OWNED BY: rhamon — Donate (Stripe). See PLAN-rhamon.md, docs/CONTENT.md §6.
import type { Metadata } from "next";
import Reveal from "@/components/home/Reveal";
import DonateForm from "@/components/donate/DonateForm";

export const metadata: Metadata = {
  title: "Donate — Network of Black Women (NBW)",
  description:
    "Your gift funds programs, scholarships, events, and wellness for Black women in Southern Alberta.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-goldText";

const IMPACT = [
  "Workshops and professional development",
  "Scholarships for members and youth",
  "Community events and gatherings",
  "Health & wellness programming",
];

export default function DonatePage({
  searchParams,
}: {
  searchParams?: { status?: string };
}) {
  const status = searchParams?.status;

  return (
    <div className="bg-brand-cream text-brand-brown">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-24 md:pt-32">
        {status === "success" && (
          <div
            role="status"
            className="mb-10 rounded-2xl border border-brand-sage bg-brand-sage/15 px-6 py-4 text-brand-brown"
          >
            <b>Thank you for your generosity!</b> Your donation supports Black women across
            Southern Alberta. 💛
          </div>
        )}
        {status === "cancel" && (
          <div
            role="status"
            className="mb-10 rounded-2xl border border-brand-beige bg-white px-6 py-4 text-brand-brown"
          >
            Your donation was cancelled — no charge was made. You&apos;re welcome to try again
            anytime.
          </div>
        )}

        <div className="grid gap-14 md:grid-cols-2 md:items-start">
          {/* Left: message */}
          <Reveal>
            <p className={EYEBROW}>Donate</p>
            <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-5xl">
              Fund spaces where Black women thrive.
            </h1>
            <p className="mt-6 max-w-md text-lg text-brand-brown/80">
              Every gift — one-time or monthly — has a real, lasting impact. Here&apos;s what your
              support makes possible:
            </p>
            <ul className="mt-6 grid gap-3">
              {IMPACT.map((item) => (
                <li key={item} className="flex items-start gap-3 text-brand-brown/80">
                  <span aria-hidden="true" className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-brand-pink" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm text-brand-brown/80">
              A tax receipt can be issued where applicable. Questions? Email
              info.networkofblackwomen@gmail.com.
            </p>
          </Reveal>

          {/* Right: form */}
          <Reveal delay={1}>
            <DonateForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

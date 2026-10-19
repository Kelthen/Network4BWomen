// OWNED BY: rhamon — Contact. See docs/CONTENT.md §10.
import type { Metadata } from "next";
import Reveal from "@/components/home/Reveal";
import ContactForm from "@/components/contact/ContactForm";
import { SOCIALS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact — Network of Black Women (NBW)",
  description:
    "A question, a partnership, or a way to get involved? Reach out to Network of Black Women, Alberta.",
};

const EYEBROW = "text-xs font-semibold font-sub uppercase tracking-[0.22em] text-brand-goldText nbw-eyebrow";

export default function ContactPage() {
  return (
    <div className="bg-brand-cream text-brand-brown">
      <div className="mx-auto max-w-6xl px-6 pt-24 pb-24 md:pt-32">
        <Reveal as="p" className={EYEBROW}>
          Contact
        </Reveal>
        <Reveal
          as="h1"
          delay={1}
          className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.05] tracking-tight md:text-6xl"
        >
          Let&apos;s talk. We reply within 24–48 hours.
        </Reveal>

        <div className="mt-14 grid gap-12 md:grid-cols-5">
          {/* Contact details */}
          <Reveal className="md:col-span-2">
            <div className="grid gap-8">
              <div>
                <p className={EYEBROW}>Email us</p>
                <a
                  href="mailto:info.networkofblackwomen@gmail.com"
                  className="mt-2 block font-serif text-xl text-brand-brown hover:text-brand-pink"
                >
                  info.networkofblackwomen@gmail.com
                </a>
              </div>
              <div>
                <p className={EYEBROW}>Follow us</p>
                {/* 2026-10-19 (serge, override zone rhamon, demande humaine) : vrais comptes NBW
                    depuis lib/site.ts (comme le footer) ; liens génériques et note interne retirés. */}
                <ul className="mt-2 flex flex-wrap gap-4 text-brand-brown/80">
                  {SOCIALS.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink">
                        {s.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Form */}
          <Reveal delay={1} className="md:col-span-3">
            <ContactForm />
          </Reveal>
        </div>
      </div>
    </div>
  );
}

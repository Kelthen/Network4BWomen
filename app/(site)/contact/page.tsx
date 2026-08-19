// OWNED BY: rhamon — Contact. See docs/CONTENT.md §10.
import type { Metadata } from "next";
import Reveal from "@/components/home/Reveal";
import ContactForm from "@/components/contact/ContactForm";

export const metadata: Metadata = {
  title: "Contact — Network of Black Women (NBW)",
  description:
    "A question, a partnership, or a way to get involved? Reach out to Network of Black Women, Southern Alberta.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-goldText";

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
                <p className={EYEBROW}>Phone</p>
                <a
                  href="tel:+14036358688"
                  className="mt-2 block font-serif text-xl text-brand-brown hover:text-brand-pink"
                >
                  (403) 635-8688
                </a>
              </div>
              <div>
                <p className={EYEBROW}>Where we are</p>
                <p className="mt-2 text-brand-brown/80">
                  Southern Alberta — traditional territory of the Blackfoot Confederacy.
                </p>
              </div>
              <div>
                <p className={EYEBROW}>Follow us</p>
                <div className="mt-2 flex flex-wrap gap-4 text-brand-brown/80">
                  <a href="https://instagram.com" className="hover:text-brand-pink">
                    Instagram
                  </a>
                  <a href="https://facebook.com" className="hover:text-brand-pink">
                    Facebook
                  </a>
                  <a href="https://linkedin.com" className="hover:text-brand-pink">
                    LinkedIn
                  </a>
                </div>
                <p className="mt-2 text-xs text-brand-brown/75">Social links to be confirmed with NBW.</p>
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

// OWNED BY: shared — Privacy notice. Draft — à faire relire par NBW (contenu juridique).
import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy & Cookies — Network of Black Women (NBW)",
  description: "How Network of Black Women collects, uses, and protects your information, and how we use cookies.",
};

const EYEBROW = "text-xs font-semibold uppercase tracking-[0.22em] text-brand-goldText";

export default function PrivacyPage() {
  return (
    <div className="bg-brand-cream text-brand-brown">
      <article className="mx-auto max-w-2xl px-6 pt-24 pb-24 md:pt-32">
        <p className={EYEBROW}>Privacy & Cookies</p>
        <h1 className="mt-4 font-serif text-4xl font-semibold leading-[1.05] md:text-5xl">
          Your privacy matters to us.
        </h1>
        <p className="mt-4 text-sm text-brand-brown/75">
          This is a starting draft and should be reviewed by NBW before launch.
        </p>

        <div className="mt-10 grid gap-8 leading-relaxed text-brand-brown/85">
          <section>
            <h2 className="font-serif text-2xl text-brand-brown">What we collect</h2>
            <p className="mt-2">
              We only collect what you choose to share: the details you enter in our contact form,
              your email address if you subscribe to our newsletter, and the information needed to
              process a donation. Payments are handled securely by Stripe; we never store your card
              details.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-brand-brown">Cookies</h2>
            <p className="mt-2">
              We use a small number of <strong>essential</strong> cookies to run the site. With your
              consent, we also use <strong>analytics</strong> cookies (Google Analytics) to
              understand how the site is used and improve it. No analytics cookies are set unless you
              accept them in the banner.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-brand-brown">Your choices</h2>
            <p className="mt-2">
              You can accept or decline analytics cookies at any time using the banner, or change
              your choice via the <strong>Cookie preferences</strong> link in the footer. You can
              also ask us to access or delete the information you&apos;ve shared.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-2xl text-brand-brown">Contact</h2>
            <p className="mt-2">
              Questions about your privacy? Email us at{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="font-semibold text-brand-rose underline">
                {CONTACT_EMAIL}
              </a>
              .
            </p>
          </section>
        </div>
      </article>
    </div>
  );
}

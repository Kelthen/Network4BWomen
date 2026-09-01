// OWNED BY: shared — footer global. Modif = coordonner (voir CLAUDE.md §1.2).
import Link from "next/link";
import Image from "next/image";
import LandAcknowledgment from "./LandAcknowledgment";
import CookiePreferencesButton from "./CookiePreferencesButton";
import FooterNewsletter from "./FooterNewsletter";
import { SOCIALS, CONTACT_EMAIL, CONTACT_PHONE } from "@/lib/site";

const EXPLORE = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/conference", label: "Conference" },
  { href: "/gallery", label: "Gallery" },
  { href: "/news", label: "News & Stories" },
];

const INVOLVED = [
  { href: "/get-involved", label: "Get Involved" },
  { href: "/resources", label: "Resources" },
  { href: "/donate", label: "Donate" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-brown text-brand-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-2 lg:grid-cols-4">
        {/* Brand + mission + donate + socials */}
        <div>
          <Image
            src="/images/brand/logo-white.png"
            alt="Network of Black Women"
            width={900}
            height={443}
            className="h-14 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-brand-cream/80">
            Empowering, connecting, and uplifting Black women and girls through community,
            leadership, wellness, and opportunity.
          </p>
          <Link
            href="/donate"
            className="mt-5 inline-block rounded-full bg-brand-pink px-6 py-2.5 text-sm font-semibold text-brand-brown transition hover:-translate-y-0.5"
          >
            Donate
          </Link>
          <ul className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-brand-cream/80">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="hover:text-brand-pink">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Explore */}
        <nav className="text-sm" aria-label="Explore">
          <p className="font-sub font-semibold uppercase tracking-wider text-brand-cream">Explore</p>
          <ul className="mt-3 space-y-2 text-brand-cream/80">
            {EXPLORE.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-brand-pink">{l.label}</Link></li>
            ))}
          </ul>
        </nav>

        {/* Get involved + contact */}
        <nav className="text-sm" aria-label="Get involved">
          <p className="font-sub font-semibold uppercase tracking-wider text-brand-cream">Get involved</p>
          <ul className="mt-3 space-y-2 text-brand-cream/80">
            {INVOLVED.map((l) => (
              <li key={l.href}><Link href={l.href} className="hover:text-brand-pink">{l.label}</Link></li>
            ))}
          </ul>
          <div className="mt-5 text-brand-cream/80">
            <a href={`mailto:${CONTACT_EMAIL}`} className="block hover:text-brand-pink">{CONTACT_EMAIL}</a>
            <a href={`tel:${CONTACT_PHONE.replace(/[^0-9+]/g, "")}`} className="hover:text-brand-pink">{CONTACT_PHONE}</a>
          </div>
        </nav>

        {/* Newsletter */}
        <div className="text-sm">
          <p className="font-sub font-semibold uppercase tracking-wider text-brand-cream">Stay connected</p>
          <p className="mt-3 text-brand-cream/80">
            Updates on programs, events, scholarships, and opportunities.
          </p>
          <FooterNewsletter />
        </div>
      </div>

      <div className="border-t border-brand-cream/20">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <LandAcknowledgment />
          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-brand-cream/60">
            <span>© {new Date().getFullYear()} Network of Black Women — site by Kelthen.</span>
            <Link href="/privacy" className="hover:text-brand-pink">Privacy &amp; Cookies</Link>
            <CookiePreferencesButton />
          </div>
        </div>
      </div>
    </footer>
  );
}

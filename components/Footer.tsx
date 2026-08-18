// OWNED BY: shared — footer global. Modif = coordonner (voir CLAUDE.md §1.2).
import Link from "next/link";
import LandAcknowledgment from "./LandAcknowledgment";
import CookiePreferencesButton from "./CookiePreferencesButton";

export default function Footer() {
  return (
    <footer className="mt-16 bg-brand-brown text-brand-cream">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="font-serif text-lg font-bold">Network of Black Women</p>
          <p className="mt-2 text-sm text-brand-cream/80">
            Empowering Black Women. Building Community. Creating Leaders.
          </p>
        </div>
        <div className="text-sm">
          <p className="font-semibold">Links</p>
          <ul className="mt-2 space-y-1 text-brand-cream/80">
            <li><Link href="/about" className="hover:text-brand-pink">About</Link></li>
            <li><Link href="/programs" className="hover:text-brand-pink">Programs</Link></li>
            <li><Link href="/events" className="hover:text-brand-pink">Events</Link></li>
            <li><Link href="/donate" className="hover:text-brand-pink">Donate</Link></li>
            <li><Link href="/contact" className="hover:text-brand-pink">Contact</Link></li>
          </ul>
        </div>
        <div className="text-sm text-brand-cream/80">
          <p className="font-semibold text-brand-cream">Contact</p>
          <p className="mt-2">info.networkofblackwomen@gmail.com</p>
          <p>(403) 635-8688</p>
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

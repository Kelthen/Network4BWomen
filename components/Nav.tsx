// OWNED BY: shared — navigation globale. Modif = coordonner (voir CLAUDE.md §1.2).
import Link from "next/link";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/programs", label: "Programs" },
  { href: "/events", label: "Events" },
  { href: "/conference", label: "Conference" },
  { href: "/resources", label: "Resources" },
  { href: "/news", label: "News" },
  { href: "/gallery", label: "Gallery" },
  { href: "/get-involved", label: "Get Involved" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  return (
    <header className="border-b border-brand-beige bg-brand-cream">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4">
        <Link href="/" className="font-serif text-xl font-bold text-brand-brown">
          NBW
        </Link>
        <ul className="hidden flex-wrap items-center gap-4 text-sm md:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link href={l.href} className="text-brand-brown hover:text-brand-pink">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/donate"
          className="rounded-full bg-brand-pink px-4 py-2 text-sm font-semibold text-brand-brown hover:opacity-90"
        >
          Donate
        </Link>
      </nav>
    </header>
  );
}

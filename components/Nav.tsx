// OWNED BY: shared — navigation globale. Modif = coordonner (voir CLAUDE.md §1.2).
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

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
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  // Close the menu on route change.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Close on Escape; lock body scroll while the mobile menu is open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-50 border-b border-brand-beige bg-brand-cream/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4" aria-label="Main">
        <Link href="/" aria-label="Network of Black Women — home" className="flex items-center">
          <Image
            src="/images/brand/logo-black.png"
            alt="Network of Black Women"
            width={900}
            height={443}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden flex-wrap items-center gap-4 text-sm lg:flex">
          {LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`transition hover:text-brand-pink ${
                  isActive(l.href) ? "text-brand-pink" : "text-brand-brown"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/donate"
            className="rounded-full bg-brand-pink px-4 py-2 text-sm font-semibold text-brand-brown transition hover:opacity-90"
          >
            Donate
          </Link>

          {/* Hamburger — mobile / tablet only */}
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-beige text-brand-brown lg:hidden"
          >
            <span className="sr-only">Menu</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile panel */}
      {open && (
        <div id="mobile-menu" className="border-t border-brand-beige bg-brand-cream lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`block border-b border-brand-beige/60 py-3 text-base ${
                    isActive(l.href) ? "font-semibold text-brand-pink" : "text-brand-brown"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

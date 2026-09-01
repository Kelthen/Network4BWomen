// OWNED BY: shared — navigation globale. Modif = coordonner (voir CLAUDE.md §1.2).
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

type Item = { href: string; label: string; children?: { href: string; label: string }[] };

// Menu regroupé : ~5 entrées de haut niveau + le bouton Donate.
const NAV: Item[] = [
  { href: "/about", label: "About" },
  {
    href: "/programs",
    label: "Programs",
    children: [
      { href: "/programs", label: "Programs & Initiatives" },
      { href: "/conference", label: "Annual Conference" },
    ],
  },
  {
    href: "/events",
    label: "Events",
    children: [
      { href: "/events", label: "Upcoming Events" },
      { href: "/gallery", label: "Photo Gallery" },
      { href: "/news", label: "News & Stories" },
    ],
  },
  {
    href: "/get-involved",
    label: "Get Involved",
    children: [
      { href: "/get-involved", label: "Get Involved" },
      { href: "/resources", label: "Resources" },
    ],
  },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

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

  const isActive = (item: Item) => {
    const hrefs = [item.href, ...(item.children?.map((c) => c.href) ?? [])];
    return hrefs.some((h) => pathname === h || pathname.startsWith(h + "/"));
  };

  return (
    <header className="sticky top-0 z-50 border-b border-brand-beige bg-brand-cream/85 backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 font-sub" aria-label="Main">
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

        {/* Desktop links (grouped) */}
        <ul className="hidden items-center gap-6 text-sm lg:flex">
          {NAV.map((item) => {
            const active = isActive(item);
            if (!item.children) {
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={`transition hover:text-brand-pink ${active ? "text-brand-pink" : "text-brand-brown"}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            }
            return (
              <li key={item.href} className="group relative">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`inline-flex items-center gap-1 transition hover:text-brand-pink ${active ? "text-brand-pink" : "text-brand-brown"}`}
                >
                  {item.label}
                  <svg width="10" height="10" viewBox="0 0 12 12" aria-hidden="true" className="mt-0.5 opacity-60">
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                {/* Dropdown */}
                <div className="invisible absolute left-1/2 top-full z-50 -translate-x-1/2 pt-3 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <ul className="min-w-[220px] rounded-2xl border border-brand-beige bg-brand-cream p-2 shadow-[0_24px_48px_-24px_rgba(68,49,43,0.45)]">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className={`block rounded-xl px-4 py-2.5 transition hover:bg-brand-beige/50 ${
                            pathname === c.href ? "text-brand-pink" : "text-brand-brown"
                          }`}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/donate"
            className="rounded-full bg-brand-pink px-4 py-2 text-sm font-semibold text-brand-brown transition hover:opacity-90"
          >
            Donate
          </Link>

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

      {/* Mobile panel — groups shown with their sub-links indented */}
      {open && (
        <div id="mobile-menu" className="max-h-[80vh] overflow-y-auto border-t border-brand-beige bg-brand-cream font-sub lg:hidden">
          <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2">
            {NAV.map((item) => (
              <li key={item.href} className="border-b border-brand-beige/60 py-2">
                <Link
                  href={item.href}
                  className={`block py-2 text-base font-semibold ${isActive(item) ? "text-brand-pink" : "text-brand-brown"}`}
                >
                  {item.label}
                </Link>
                {item.children && (
                  <ul className="mb-1 ml-3 border-l border-brand-beige pl-4">
                    {item.children.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className={`block py-2 text-sm ${pathname === c.href ? "text-brand-pink" : "text-brand-brown/80"}`}
                        >
                          {c.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

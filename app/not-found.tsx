// OWNED BY: shared — page 404. Modif = coordonner.
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Network of Black Women (NBW)",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center px-6 py-24 text-center text-brand-brown">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-gold">404</p>
      <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">This page wandered off.</h1>
      <p className="mt-4 max-w-md text-brand-brown/70">
        The page you&apos;re looking for doesn&apos;t exist or may have moved. Let&apos;s get you
        back to the community.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/" className="rounded-full bg-brand-brown px-6 py-3 font-semibold text-brand-cream transition hover:opacity-90">
          Back to home
        </Link>
        <Link href="/contact" className="rounded-full border border-brand-brown px-6 py-3 font-semibold text-brand-brown transition hover:bg-brand-beige">
          Contact us
        </Link>
      </div>
    </section>
  );
}

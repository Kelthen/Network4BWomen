// OWNED BY: shared — layout global. Modif = coordonner (voir CLAUDE.md §1.2).
import type { Metadata } from "next";
import { Playfair_Display, Lato, Montserrat } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PhotoLightboxProvider from "@/components/photo/PhotoLightboxProvider";
import EventAnnouncementBar from "@/components/event/EventAnnouncementBar";
import EventFlyerModal from "@/components/event/EventFlyerModal";
import CookieConsent from "@/components/CookieConsent";
import Analytics from "@/components/Analytics";
import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import {
  SITE_URL,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_DESCRIPTION,
  CONTACT_EMAIL,
  CONTACT_PHONE,
} from "@/lib/site";

// Charte NBW : Playfair (titres), Lato (corps), Montserrat (sous-titres / UI géométrique).
const serif = Playfair_Display({ subsets: ["latin"], variable: "--font-serif", display: "swap" });
const sans = Lato({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-sans", display: "swap" });
const sub = Montserrat({ subsets: ["latin"], variable: "--font-sub", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} (NBW) — ${SITE_TAGLINE}`,
    template: `%s`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Network of Black Women",
    "NBW",
    "Black women",
    "sisterhood",
    "Toronto",
    "Ontario",
    "community",
    "leadership",
    "mentorship",
    "wellness",
    "nonprofit",
  ],
  authors: [{ name: SITE_NAME }],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} (NBW)`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} (NBW)`,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true },
};

// Données structurées (JSON-LD) — aide Google à comprendre l'organisation.
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  name: SITE_NAME,
  alternateName: "NBW",
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  email: CONTACT_EMAIL,
  telephone: CONTACT_PHONE,
  areaServed: "Toronto, Ontario, Canada",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Toronto",
    addressRegion: "ON",
    addressCountry: "CA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${sub.variable}`}>
      <body className="font-sans">
        <a href="#main" className="skip-link">Skip to content</a>
        <PhotoLightboxProvider>
          <EventAnnouncementBar />
          <Nav />
          <main id="main">{children}</main>
          <Footer />
          <EventFlyerModal />
        </PhotoLightboxProvider>
        <CookieConsent />
        <Analytics />
        {/* Vercel Analytics — cookieless & privacy-friendly (aucun consentement requis).
            À activer dans Vercel → Project → Analytics. */}
        <VercelAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
      </body>
    </html>
  );
}

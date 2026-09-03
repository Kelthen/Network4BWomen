// OWNED BY: rhamon — Accueil. Voir PLAN-rhamon.md (Phase 1 · Accueil), docs/CONTENT.md §1,
// design docs/nbw-home-reference.html (maquette validée).
import Link from "next/link";
import styles from "@/components/home/home.module.css";
import ZoomablePhoto from "@/components/photo/ZoomablePhoto";
import Hero from "@/components/home/Hero";
import ImpactStats from "@/components/home/ImpactStats";
import Reveal from "@/components/home/Reveal";
import SignatureMoment from "@/components/home/SignatureMoment";
import CtaBand from "@/components/home/CtaBand";
import NewsletterTeaser from "@/components/home/NewsletterTeaser";
import UpcomingEvents from "@/components/home/UpcomingEvents";
import Testimonials from "@/components/home/Testimonials";
import Sponsors from "@/components/home/Sponsors";

// Program teasers (3 of NBW's 7 programs — see docs/CONTENT.md §3).
// img = photo path (drop the file in public/); grad = brand-gradient fallback.
const PROGRAMS = [
  {
    title: "Professional Development",
    text: "Workshops, mentorship, and tools to move your career forward.",
    img: "/images/home/professional-development.jpg",
    grad: "linear-gradient(160deg,#97ac9f,#e8dcc8)",
  },
  {
    title: "Leadership",
    text: "Shaping the next generation of leaders and voices.",
    img: "/images/home/leadership.jpg",
    grad: "linear-gradient(160deg,#e9c8c9,#ffbbbb)",
  },
  {
    title: "Health & Wellness",
    text: "Caring for yourself and the community, without guilt.",
    img: "/images/home/health-wellness.jpg",
    grad: "linear-gradient(160deg,#c9a24b,#e8dcc8)",
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Hero éditorial signature (masque + parallaxe) */}
      <Hero />

      {/* Our Impact — fond brun, compteurs animés */}
      <ImpactStats />

      {/* Moment signature — photo qui s'agrandit en plein cadre au scroll */}
      <SignatureMoment />

      {/* Programmes & initiatives */}
      <section className={styles.sec}>
        <div className={styles.wrap}>
          <Reveal as="p" className={styles.eyebrow}>
            Programs &amp; initiatives
          </Reveal>
          <Reveal as="h2" delay={1}>
            Spaces to grow, together.
          </Reveal>
          <div className={styles.cards}>
            {PROGRAMS.map((p, i) => (
              <Reveal
                key={p.title}
                as="article"
                delay={i === 0 ? undefined : (i as 1 | 2)}
                className={styles.card}
              >
                <ZoomablePhoto src={p.img} gradient={p.grad} alt={p.title} className={styles.img} />
                <div className={styles.body}>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <Link href="/programs" className={styles.more}>
                    Learn more →
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming events (teaser → /events) */}
      <UpcomingEvents />

      {/* Témoignages — plusieurs voix de la communauté */}
      <Testimonials />

      {/* Sponsors & partenaires */}
      <Sponsors />

      {/* Newsletter — « Stay Connected. » */}
      <NewsletterTeaser />

      {/* Bandeau signature avant footer — révélation moderne de la photo */}
      <CtaBand />
    </div>
  );
}

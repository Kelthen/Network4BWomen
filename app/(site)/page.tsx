// OWNED BY: rhamon — Accueil. Voir PLAN-rhamon.md (Phase 1 · Accueil), docs/CONTENT.md §1,
// design docs/nbw-home-reference.html (maquette validée).
import Link from "next/link";
import styles from "@/components/home/home.module.css";
import Hero from "@/components/home/Hero";
import ImpactStats from "@/components/home/ImpactStats";
import Reveal from "@/components/home/Reveal";
import CtaBand from "@/components/home/CtaBand";
import NewsletterTeaser from "@/components/home/NewsletterTeaser";

// Program teasers (3 of NBW's 7 programs — see docs/CONTENT.md §3).
const PROGRAMS = [
  {
    title: "Professional Development",
    text: "Workshops, mentorship, and tools to move your career forward.",
  },
  {
    title: "Leadership",
    text: "Shaping the next generation of leaders and voices.",
  },
  {
    title: "Health & Wellness",
    text: "Caring for yourself and the community, without guilt.",
  },
];

export default function HomePage() {
  return (
    <div className={styles.page}>
      {/* Hero éditorial signature (masque + parallaxe) */}
      <Hero />

      {/* Our Impact — fond brun, compteurs animés */}
      <ImpactStats />

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
                <div className={styles.img} aria-hidden="true" />
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

      {/* Témoignage pleine largeur (fond blush) */}
      <section className={styles.quote}>
        <div className={styles.wrap}>
          <Reveal as="blockquote">
            “NBW gave me the confidence to step into leadership.”
          </Reveal>
          <Reveal as="cite" delay={1}>
            — A community member
          </Reveal>
        </div>
      </section>

      {/* Newsletter — « Stay Connected. » */}
      <NewsletterTeaser />

      {/* Bandeau signature avant footer — révélation moderne de la photo */}
      <CtaBand />
    </div>
  );
}

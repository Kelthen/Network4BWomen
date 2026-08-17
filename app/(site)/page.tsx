// OWNED BY: rhamon — Accueil. Voir PLAN-rhamon.md (Phase 1 · Accueil), docs/CONTENT.md §1,
// design docs/nbw-home-reference.html (maquette validée).
import Link from "next/link";
import styles from "@/components/home/home.module.css";
import Hero from "@/components/home/Hero";
import ImpactStats from "@/components/home/ImpactStats";
import Reveal from "@/components/home/Reveal";
import CtaBand from "@/components/home/CtaBand";
import NewsletterTeaser from "@/components/home/NewsletterTeaser";

// Teasers programmes (3 des 7 programmes NBW — voir docs/CONTENT.md §3).
const PROGRAMS = [
  {
    title: "Développement pro",
    text: "Ateliers, mentorat et outils pour avancer dans sa carrière.",
  },
  {
    title: "Leadership",
    text: "Former la prochaine génération de leaders et de voix.",
  },
  {
    title: "Bien-être & santé",
    text: "Prendre soin de soi et de la collectivité, sans culpabilité.",
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
            Programmes &amp; initiatives
          </Reveal>
          <Reveal as="h2" delay={1}>
            Des espaces pour grandir, ensemble.
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
                    En savoir plus →
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
            « NBW m&apos;a donné la confiance de viser le leadership. »
          </Reveal>
          <Reveal as="cite" delay={1}>
            — Une membre de la communauté
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

// OWNED BY: rhamon — Accueil. Voir PLAN-rhamon.md.
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-cream">
        <div className="mx-auto max-w-5xl px-4 py-24 text-center">
          <h1 className="font-serif text-4xl font-bold leading-tight text-brand-brown md:text-6xl">
            Empowering Black Women.
            <br />
            Building Community. Creating Leaders.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-brand-brown/80">
            A safe and empowering space where Black women and girls grow personally,
            professionally, and collectively through connection, leadership, wellness,
            and opportunity.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            <Link href="/about" className="rounded-full bg-brand-brown px-6 py-3 font-semibold text-brand-cream hover:opacity-90">
              À propos
            </Link>
            <Link href="/programs" className="rounded-full border border-brand-brown px-6 py-3 font-semibold text-brand-brown hover:bg-brand-beige">
              Programmes
            </Link>
            <Link href="/get-involved" className="rounded-full bg-brand-pink px-6 py-3 font-semibold text-brand-brown hover:opacity-90">
              Rejoindre la communauté
            </Link>
            <Link href="/donate" className="rounded-full border border-brand-brown px-6 py-3 font-semibold text-brand-brown hover:bg-brand-beige">
              Faire un don
            </Link>
          </div>
        </div>
      </section>

      {/* Placeholders des sections à construire (voir PLAN-rhamon.md) */}
      <section className="mx-auto max-w-7xl px-4 py-16">
        <p className="text-center text-brand-brown/60">
          Sections à venir : Our Impact · Programmes · Événements · Témoignages · Sponsors · Newsletter.
        </p>
      </section>
    </>
  );
}

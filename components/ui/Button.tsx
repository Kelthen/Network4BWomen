// OWNED BY: shared — Primitive UI de base.
// Variantes calées sur le style déjà en usage dans le site (voir
// components/events/RegistrationForm.tsx, components/home/Hero.tsx) : pilule
// (rounded-full), fond rose ou brun, léger lift au survol. Ajout additif —
// n'oblige personne à migrer l'existant, à utiliser pour tout nouveau bouton.
import type { ButtonHTMLAttributes, ReactNode } from "react";
import Link from "next/link";

type Variant = "primary" | "secondary" | "outline";

const VARIANT_CLASSES: Record<Variant, string> = {
  // Fond rose, texte brun — CTA principal (ex: "Register", "Donate").
  primary: "bg-brand-pink text-brand-brown hover:-translate-y-0.5",
  // Fond brun foncé, texte crème — CTA secondaire fort (ex: "Join our community").
  secondary: "bg-brand-brown text-brand-cream hover:-translate-y-0.5",
  // Contour seul, transparent — CTA tertiaire (ex: "About us").
  outline: "border border-brand-brown text-brand-brown hover:bg-brand-brown/5",
};

const BASE =
  "inline-flex items-center justify-center rounded-full px-6 py-3 font-semibold transition disabled:opacity-50 disabled:pointer-events-none";

type CommonProps = {
  variant?: Variant;
  className?: string;
  children: ReactNode;
};

type ButtonProps = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

type LinkProps = CommonProps & {
  href: string;
};

/**
 * Bouton pilule aux couleurs de marque. Passe `href` pour un lien (next/link),
 * sinon rend un vrai <button> (utilisable dans un <form>, avec `type="submit"`, etc.).
 *
 * <Button variant="primary">Register</Button>
 * <Button href="/donate" variant="secondary">Donate</Button>
 */
export default function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${BASE} ${VARIANT_CLASSES[variant]} ${className}`.trim();

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const { href: _href, variant: _v, className: _c, children: _ch, ...rest } =
    props as ButtonProps;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

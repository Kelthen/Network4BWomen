// OWNED BY: shared — Primitive UI de base.
// Calée sur components/events/RegistrationForm.tsx (bloc de succès) : fond
// blanc, coins arrondis, ombre fine couleur marque plutôt qu'une ombre grise
// générique. Ajout additif, opt-in pour tout nouveau bloc carte du site.
import type { HTMLAttributes, ReactNode } from "react";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  /** Retire le padding interne par défaut, pour un contrôle total du contenu. */
  noPadding?: boolean;
};

export default function Card({
  children,
  className = "",
  noPadding = false,
  ...rest
}: CardProps) {
  const padding = noPadding ? "" : "p-6 md:p-8";
  return (
    <div
      className={`rounded-2xl bg-white shadow-[0_1px_0_#e8dcc8] ${padding} ${className}`.trim()}
      {...rest}
    >
      {children}
    </div>
  );
}

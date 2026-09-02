// OWNED BY: shared — Primitive UI de base.
// Unifie les largeurs max déjà utilisées un peu partout à la main
// (max-w-3xl pour du texte, max-w-6xl/7xl pour des grilles). Ajout additif.
import type { HTMLAttributes, ReactNode } from "react";

type Size = "sm" | "md" | "lg";

const SIZE_CLASSES: Record<Size, string> = {
  sm: "max-w-3xl", // texte long, formulaires, pages d'article
  md: "max-w-5xl", // grilles moyennes (cartes 2-3 colonnes)
  lg: "max-w-7xl", // grilles larges, sections pleine largeur
};

type ContainerProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  size?: Size;
};

export default function Container({
  children,
  size = "sm",
  className = "",
  ...rest
}: ContainerProps) {
  return (
    <div className={`mx-auto ${SIZE_CLASSES[size]} px-6 ${className}`.trim()} {...rest}>
      {children}
    </div>
  );
}

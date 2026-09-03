// OWNED BY: shared — Primitive UI de base.
// Unifie l'espacement vertical entre sections (actuellement chaque page choisit
// son propre pt-24/pb-16 à la main). Ajout additif : les pages existantes
// n'ont pas besoin de migrer pour que ça reste cohérent.
import type { ElementType, HTMLAttributes, ReactNode } from "react";

type Spacing = "sm" | "md" | "lg";

const SPACING_CLASSES: Record<Spacing, string> = {
  sm: "py-8 md:py-12",
  md: "py-16 md:py-20",
  lg: "py-24 md:py-32",
};

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  spacing?: Spacing;
  /** Balise HTML à rendre (défaut: section). */
  as?: ElementType;
};

export default function Section({
  children,
  spacing = "md",
  as: Tag = "section",
  className = "",
  ...rest
}: SectionProps) {
  return (
    <Tag className={`${SPACING_CLASSES[spacing]} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}

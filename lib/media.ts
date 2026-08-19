// OWNED BY: shared — helper média. Photo avec dégradé de marque en SECOURS automatique.
// Tant que le fichier /public/images/... n'existe pas, le navigateur ignore la couche image
// et affiche le dégradé en dessous (jamais d'image cassée). Dès que la photo est déposée,
// elle s'affiche par-dessus.
import type { CSSProperties } from "react";

export function coverImage(src: string, fallbackGradient: string): CSSProperties {
  return {
    backgroundImage: `url('${src}'), ${fallbackGradient}`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
}

// Slug de fichier depuis un nom ("Martha Mathurin-Moe" -> "martha-mathurin-moe").
export function slugify(name: string): string {
  return name
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

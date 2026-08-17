# BRAND.md — Identité de marque NBW

Source : « NBW Website Vision & Content Plan » + « Operational Staff Onboarding ».
Direction visuelle complète → `docs/DESIGN.md`.

## 🎨 Palette (l'essentiel, en un coup d'œil)

| Token | Nom | Hex | Usage |
|---|---|---|---|
| `brand.pink` | Rose | **`#f6828f`** | accent principal, CTA |
| `brand.pinkLight` | Rose clair | **`#ffbbbb`** | accents doux, fonds (⚠️ jamais texte) |
| `brand.brown` | Brun profond | **`#44312b`** | **texte principal**, sections sombres |
| `brand.cream` | Crème/Ivoire | **`#FBF7F0`** | fond dominant |
| `brand.beige` | Beige chaud | **`#E8DCC8`** | fonds secondaires, séparateurs |
| `brand.gold` | Or | **`#C9A24B`** | filets, hovers, détails précieux |
| `brand.sage` | Sauge | **`#97AC9F`** | secondaire |
| `brand.blush` | Blush | **`#E9C8C9`** | secondaire |

**Ratio 60/30/10** : 60% crème · 30% brun · 10% rose/or. (Hex crème/beige/or/sauge/blush : proposés, à confirmer avec la charte NBW.)

## Feel général
Sophistiqué et professionnel · chaleureux et accueillant · communautaire · épuré et facile à naviguer · photographie de qualité de vraies femmes et filles noires · grandes images, texte minimal · **storytelling** partout.

Le visiteur doit comprendre qui est NBW en **10 secondes** sur l'accueil. Chaque page pousse à l'action (rejoindre, participer à un événement, faire du bénévolat, donner, devenir partenaire). Professionnalisme + chaleur et authenticité de la sororité.

## Palette de couleurs (documentée)

| Rôle | Couleur | Hex |
|---|---|---|
| Rose (primaire) | Pink | `#f6828f` |
| Rose clair | Light pink | `#ffbbbb` |
| Brun profond | Deep Brown | `#44312b` |
| Crème / Ivoire | Cream / Ivory | `#FBF7F0` (à valider) |
| Noir | Black | `#000000` |
| Beige chaud | Warm Beige | `#E8DCC8` (à valider) |
| Or (accents) | Gold | `#C9A24B` (à valider) |
| Secondaires | Soft sage · muted blush | sage `#97AC9F` · blush `#E9C8C9` |

Palette secondaire « Pastel Paradise » (référence design fournie) : `#C9B6C1` · `#E9C8C9` · `#98B4AD` · `#97AC9F` · `#6E9179` (teintes lavande/blush/sauge — à caler précisément sur l'image de référence).

> Les hex marqués « à valider » sont des propositions cohérentes avec le brief ; à confirmer avec NBW / la charte finale.

### ⚠️ Accessibilité (contraste — obligatoire, WCAG AA)
- Le rose `#f6828f` et surtout `#ffbbbb` **n'ont pas un contraste suffisant** pour du texte sur fond blanc.
- Règle : **texte principal en brun profond `#44312b`** sur crème/ivoire/blanc (contraste élevé). Le rose sert aux **accents, boutons, éléments graphiques**, pas au texte long.
- Boutons roses : texte en brun profond ou blanc selon le test de contraste (viser ratio ≥ 4.5:1 pour le texte courant, ≥ 3:1 pour le gros texte).

## Typographie
- **Titres** : serif élégant (ex. Playfair Display, Cormorant, Fraunces).
- **Corps** : sans-serif moderne (ex. Inter, Nunito Sans, Work Sans).
- Charger via `next/font`. Définir en variables CSS + tokens Tailwind (`font-serif`, `font-sans`).

## Tokens Tailwind (cible `tailwind.config.ts`)
```
colors:
  brand.pink      #f6828f
  brand.pinkLight #ffbbbb
  brand.brown     #44312b   (texte principal)
  brand.cream     #FBF7F0
  brand.beige     #E8DCC8
  brand.gold      #C9A24B
  brand.sage      #97AC9F
  brand.blush     #E9C8C9
fontFamily:
  serif -> titres · sans -> corps
```

## Reconnaissance du territoire (obligatoire)
NBW est situé sur le **territoire traditionnel de la Confédération Blackfoot** (Sud de l'Alberta). Un énoncé de reconnaissance doit figurer dans le **footer** de chaque page (composant `LandAcknowledgment`).

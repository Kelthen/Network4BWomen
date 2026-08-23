# BRAND.md — Identité de marque NBW

Source : **NBW Brand Guidelines (officiel, août 2026)** — charte fournie par le client.
Direction visuelle complète → `docs/DESIGN.md`. Logos officiels → `public/images/brand/`.

> Ton de marque : **warm · black luxury · professional · empowering.** Rich browns, pink signature, accents parcimonieux.

## 🎨 Palette officielle

### Couleurs primaires (fondation)
| Token | Nom | Hex | RGB |
|---|---|---|---|
| `brand.brown` | Brown Primary | **`#573425`** | 87, 52, 37 |
| `brand.brownDark` | Brown Secondary | **`#642F19`** | 100, 47, 25 |
| `brand.pink` | Pink Primary | **`#F6828F`** | 246, 130, 143 |
| `brand.crimson` | Pink Secondary (Crimson) | **`#B84C65`** | 184, 76, 101 |

### Texte & fonds
| Nom | Hex |
|---|---|
| Black | `#000000` |
| White | `#FFFFFF` |
| Cream (neutre chaud, base du site) | `#FBF7F0` |
| Beige | `#E8DCC8` |

### Accents (avec parcimonie — jamais dominants)
| Token | Nom | Hex | RGB |
|---|---|---|---|
| `brand.sage` | Tilda Sage Blue | **`#528574`** | 82, 133, 116 |
| `brand.gold` | Gold | **`#C9962C`** | 201, 150, 44 |

## Règle 60 / 30 / 10
- **60 %** — base neutre : blanc/crème ou noir (fonds, corps de texte)
- **30 %** — primaires : **Brown & Pink** (headers, structure, visuels clés)
- **10 %** — accents : **Sage Blue** ou **Gold** (CTA, highlights, icônes, dates)

**Pairings recommandés** : Brown Primary + White (headers/hero) · Pink Primary + Black/Brown Secondary (CTA) · texte blanc sur Brown/Pink Secondary · Gold & Sage en petits accents (icônes, filets, dates), jamais en grands aplats. **Max 3 couleurs par mise en page.**

### ⚠️ Accessibilité (WCAG AA — obligatoire)
- **Ne pas** mettre Pink Primary ou Gold en **texte** sur fond blanc/clair (contraste trop faible).
- Texte courant : **Black, Brown Secondary, ou blanc-sur-foncé.** Tokens texte accessibles fournis : `brand.goldText #8a6d1f`, `brand.rose #b23a4e` (≥ 4.5:1 sur crème).
- Rose/Gold vifs réservés aux **fonds de boutons / éléments décoratifs**.

## Logo (officiel — ne jamais recréer)
6 versions approuvées fournies (`public/images/brand/`, générées transparentes depuis la charte) :
- `logo-black.png` — tout noir → **fonds clairs/crème** (nav)
- `logo-white.png` — tout blanc → **fonds foncés** (footer, hero)
- `logo-primary.png` — blanc + pink → **fonds brun/noir** (version primaire par défaut)

Le logo = wordmark serif « NETWORK OF » (font *The Seasons*), display rétro « BLACK », filet « EST 2025 », script « Women » (*Beautifully Delicious Script*).

**À faire** : garder l'espace de protection (hauteur des initiales), min. 120 px de large à l'écran, ratio verrouillé. **Ne pas** étirer, recolorer hors charte, ajouter ombres/contours, poser sur photo chargée, **ni recréer avec des polices système**, ni mettre des visages/imagerie dans le logo.

## Typographie
- **Titres / H1** : *The Seasons* (Canva) → web : **Georgia / Playfair Display** (déjà en place), Brown Primary, généreux.
- **Sous-titres / H2** : **Montserrat** (ou Georgia Bold/Semibold), Brown Secondary.
- **Corps** : *Calibri* → web : **Lato** (propre, ≥ 14 px à l'écran).
- **Emphase** : gras pour le poids ; Pink Primary pour **un seul** mot/phrase mis en avant — jamais gras + couleur + italique en même temps.
- Charger via `next/font` (variables CSS + tokens `font-serif` / `font-sans`).

## Voix & ton
Piliers : **Warm · Empowering · Grounded · Professional · Community-rooted.** On écrit comme une amie de confiance, à la 1re personne du pluriel (« we / us »), jamais corporate-froid. Person-first, inclusif, clair ; on épelle « Network of Black Women » à la 1re mention. Sentence case pour le social, title case seulement pour les titres formels.

## ⚠️ Imagerie (politique officielle)
**Pas d'imagerie IA** pour le contenu de marque. Les visuels doivent refléter de **vraies personnes, vraie photographie**, propriété de NBW à **≥ 85 %**. L'IA texte n'est qu'un support de brouillon interne, révisé avant publication. → Les dégradés/placeholders du site sont décoratifs (OK) ; les photos réelles remplacent les slots.

## Reconnaissance du territoire (obligatoire)
NBW est situé à **Toronto (Ontario)**, sur le **territoire traditionnel de nombreuses nations** (visé par le Traité 13 et le Dish With One Spoon Wampum). Énoncé dans le **footer** de chaque page (`LandAcknowledgment`).

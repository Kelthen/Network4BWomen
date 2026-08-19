# Images du site — où déposer quoi

Dépose simplement les fichiers avec **exactement** ces noms dans les dossiers indiqués.
Tant qu'un fichier manque, un **dégradé de marque** s'affiche à la place (jamais d'image cassée).
Dès que tu déposes le bon fichier → la photo apparaît. Aucun code à toucher.

> Format conseillé : **JPG** (ou WebP), photos réelles de femmes/filles noires (charte NBW).
> Évite les fichiers énormes (vise < 500 Ko chacun ; Vercel optimise, mais pas 20 Mo).

## Accueil
| Fichier | Emplacement | Ratio conseillé |
|---|---|---|
| `hero.jpg` | Grand visuel du hero (à droite) | portrait **4:5** (~1200×1500) |
| `cta-band.jpg` | Grand bandeau avant le footer | paysage **16:9** (~1600×900) |
| `home/professional-development.jpg` | Carte « Professional Development » | portrait 4:5 |
| `home/leadership.jpg` | Carte « Leadership » | portrait 4:5 |
| `home/health-wellness.jpg` | Carte « Health & Wellness » | portrait 4:5 |

## À propos — équipe (`team/`)
Portraits **4:5**. Un fichier par personne :
`maleeka-thomas.jpg` · `kimoya-edwards.jpg` · `khamaya-cawley.jpg` · `jodine-robin.jpg` ·
`martha-mathurin-moe.jpg` · `abishey-anderson.jpg` · `felisha-boehme.jpg` ·
`tobore-okome.jpg` · `aytia-police.jpg`

## Programmes (`programs/`)
En-têtes de cartes, paysage. Un fichier par programme :
`professional-development.jpg` · `leadership-development.jpg` · `mentorship.jpg` ·
`community-events.jpg` · `health-wellness.jpg` · `youth-programming.jpg` ·
`annual-conference-summit.jpg`

## Conférence (`conference/`)
Photos d'intervenant·es, **carré** : `speaker-1.jpg` … `speaker-4.jpg`

## News (`news/`)
Vignettes d'articles, **16:10** : `1.jpg`, `2.jpg`, `3.jpg`

## Galerie (`gallery/`)
Par année : `2025-1.jpg` … `2025-8.jpg` et `2024-1.jpg` … `2024-8.jpg`

---

### Comment déposer (VS Code)
1. Ouvre le dossier `public/images/…` correspondant.
2. Glisse-dépose tes fichiers (avec les noms ci-dessus).
3. `git add . && git commit -m "content: photos" && git push` → Vercel les met en ligne.

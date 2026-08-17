# DESIGN.md — Doctrine de design (niveau mondial)

> Objectif : un site **top 1% mondial**, digne des Awwwards, au service de NBW.
> Direction : **éditorial chaleureux & élégant** — magazine haut de gamme + chaleur de la sororité.
> Mouvement : **riche mais tasteful**, avec des **moments signature** immersifs choisis.
> Cette doctrine est un contrat : chaque page doit pouvoir être défendue face à ces principes.

## 1. Philosophie
- **Le contenu est le héros, la femme noire est au centre.** Le design encadre les histoires et les visages, il ne les concurrence pas.
- **Éditorial** : on pense « magazine », pas « template ». Grandes typographies, hiérarchie forte, rythme de lecture.
- **Chaleur premium** : sophistiqué SANS être froid. Élégant SANS être corporate.
- **Le calme est un luxe** : beaucoup d'espace négatif. Ce qu'on retire compte autant que ce qu'on ajoute.

## 2. Layout & grille
- Grille 12 colonnes, gouttières larges. **Marges généreuses** (respirer).
- **Asymétrie contrôlée** : décalages éditoriaux, texte qui déborde sur l'image, chiffres surdimensionnés.
- Sections pleine largeur alternant fonds crème / brun / photo. Rythme visuel.
- Container max ~1280px pour le texte ; images et héros peuvent aller full-bleed.
- **Mobile-first** : la version mobile doit être aussi soignée que le desktop (souvent plus vue).

## 3. Typographie (système)
- **Display / titres** : serif éditorial expressif — **Fraunces** ou **Playfair Display**. Grands (clamp 2.5rem→5rem), interlettrage serré, italiques pour l'accent.
- **Corps** : sans-serif moderne — **Inter**. Confort de lecture, 1.6 d'interligne.
- Échelle typographique fluide (`clamp()`), pas de tailles au hasard. Contraste fort titre/corps = signature éditoriale.
- Une seule idée par section, portée par un titre qui a de la présence.

## 4. Couleur (voir BRAND.md pour les hex)
- **Règle 60 / 30 / 10** : 60% crème/ivoire (fond), 30% brun profond (texte, sections sombres), 10% rose/or (accents, CTA).
- **Rose = accent, jamais texte long** (contraste). Or = détails précieux (filets, hovers, icônes).
- Sections sombres (brun) pour créer des respirations dramatiques et faire ressortir la photo.

## 5. Imagerie & art direction
- Photographie **réelle** de femmes et filles noires, plein cadre, chaude, authentique. Jamais de stock générique.
- Traitement cohérent (tonalité chaude, léger grain possible). Ratios éditoriaux (4:5, 3:2).
- En attendant les vraies photos : placeholders élégants (dégradés de marque + texture), jamais de gris vide.
- Détails précieux : filets fins or, petites majuscules espacées (eyebrows), numérotation de sections.

## 6. Mouvement (Framer Motion)
**Base (riche mais tasteful) — partout :**
- Révélations au scroll (fade + translation douce, stagger sur les listes).
- Micro-interactions : hover boutons/cartes (élévation, soulignement animé), curseurs de focus nets.
- Compteurs animés sur les stats d'impact.
- Parallaxe légère sur les images de section.

**Moments signature (immersif) — 2 à 3 max sur tout le site :**
- Hero : révélation du titre par masque + parallaxe de l'image au scroll.
- Une transition de section mémorable (ex. image qui s'agrandit en plein écran au scroll).
- Éventuellement transitions de page douces.

**Règles :** 60fps ou rien · durées 200–600ms · easing naturel (ease-out) · **respecter `prefers-reduced-motion`** (tout se dégrade proprement). Le mouvement sert la narration, il ne décore pas.

## 7. Composants (patterns cibles)
Hero éditorial · sections « feature » texte+image asymétriques · cartes programme (image 4:5, hover élévation) · bande de stats · citation/testimonial pleine largeur sur fond brun · bandeau newsletter · footer riche avec reconnaissance du territoire. Tous dans `components/ui` (base) puis `components/<zone>`.

## 8. Non négociable
- **Accessibilité AAA visée, AA minimum** : contraste, focus visibles, navigation clavier, `alt`, sémantique. Un beau site inaccessible est un échec.
- **Performance** : Lighthouse ≥ 95. Images `next/image`, lazy-load, polices `next/font`. Le luxe, c'est aussi la vitesse.
- **Cohérence** : tout sort des mêmes tokens (couleur, espace, type). Zéro valeur magique.

## 9. À éviter (anti-patterns)
Templates génériques · dégradés criards · trop d'ombres · animations gratuites qui distraient · murs de texte · rose clair en texte courant · carrousels sans raison · pop-ups agressifs.

## 10. Références (benchmark mental)
Sites éditoriaux d'ONG et de marques premium primés (Awwwards / Godly / sites de studios) : chaleur + rigueur typographique + mouvement retenu. On vise ce niveau, adapté à la mission NBW.

## 11. Inspiration retenue — template Wix « WellWell » (ONG Bold)
Référence validée par le client. On en reprend la **structure et l'énergie**, PAS les couleurs (on garde la palette NBW).

Ce qu'on adopte :
- **Hero deux panneaux** : gros titre « chunky » à gauche, **grande image à coins très arrondis** à droite (border-radius ~28-40px).
- **Carte-stat flottante** en pastille arrondie qui chevauche l'image (icône ligne « cœur souriant » + chiffre en gras : ex. « 480+ femmes connectées ce mois »).
- **Tout est arrondi** : images, cartes, boutons en pilule. Ambiance chaleureuse, bienveillante, « bold » mais douce (pas minimale-froide).
- **CTA Donate très visible** en haut à droite (bouton plein, foncé).
- Fonds pastel doux, icônes ligne ludiques, photographie authentique de femmes noires.

Ce qu'on change vs WellWell :
- Couleurs : **palette NBW** (crème/brun/rose/or), pas le bleu périwinkle + bordeaux de WellWell. Option : un **prune/vin profond** peut servir d'accent riche en harmonie avec le brun NBW.
- Titres : on garde une **touche éditoriale serif** (Fraunces) pour l'élégance, en version bien grasse — mélange « bold + chic ».
- On ajoute ce que NBW demande et que le template n'a pas : **bande Événements** (promotion + inscription) et **bloc Dons** proéminents.

Réf. visuelle : voir la capture du template livrée dans le chat.

## 12. Direction VALIDÉE + maquette de référence
**Maquette de référence approuvée : `docs/nbw-home-reference.html`** (ouvrir dans un navigateur). C'est le rendu cible de l'accueil — le code Next.js doit le reproduire.

Éléments canoniques à reprendre :
- **Hero éditorial** : eyebrow, grand titre serif Fraunces qui se **révèle en masque** (lignes qui montent), sous-titre, CTA pilules, visuel arrondi à droite avec parallaxe.
- **Bande Impact** (fond brun) avec **compteurs animés**.
- **Cartes** (programmes / événements) arrondies, hover avec élévation.
- **Bandeau animé AVANT le footer** (pattern signature) : « Every Black Woman Deserves To Be Celebrated. » — la **photo se révèle de façon moderne** au scroll : rideau qui monte (`clip-path: inset(100%→0 round 44px)`) + **dézoom** (scale 1.28→1) + **flou→net** + **désaturé→saturé** + fin **balayage de lumière** ; puis titre ligne par ligne, colonnes et boutons en décalé. Respecte `prefers-reduced-motion`.
- **Remplacement photo réelle** : dans `.cta-band .bg` et le visuel hero, remplacer le dégradé par `background:url(<photo>) center/cover` — l'animation reste identique.

Animations : Framer Motion en Next.js (l'équivalent des `IntersectionObserver`/`clip-path` de la maquette). 60fps, easings naturels, tasteful.

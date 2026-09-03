# components/ui — Primitives UI partagées

Zone `shared` (voir `OWNERSHIP.yml`). Base commune de composants, calés
au caractère près sur le style déjà en usage dans le site (voir
`components/events/RegistrationForm.tsx`, `components/home/Hero.tsx`) —
rien de nouveau visuellement, juste centralisé.

**Opt-in, pas de migration forcée.** Les pages existantes qui ont déjà
leurs boutons/cartes/inputs écrits à la main continuent de fonctionner
telles quelles. Utilisez ces primitives pour tout **nouveau** composant,
pour que le prochain changement de style (couleur de bouton, radius...)
se fasse à un seul endroit plutôt que dans dix fichiers.

## Composants

- **`Button`** — bouton pilule, variantes `primary` (rose), `secondary`
  (brun foncé), `outline` (contour). Accepte `href` pour un lien ou les
  props natives de `<button>` sinon (utilisable dans un `<form>`).
- **`Card`** — bloc blanc, coins arrondis, ombre fine couleur marque.
- **`Input` / `Textarea` / `Label`** — champs de formulaire au style
  déjà utilisé dans les inscriptions événements.
- **`Container`** — largeur max cohérente (`sm` = texte/formulaires,
  `md`/`lg` = grilles).
- **`Section`** — espacement vertical standard entre blocs de page.

## Exemple

```tsx
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { Input, Label } from "@/components/ui/Input";

<Section>
  <Container>
    <Card>
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" />
      <Button variant="primary" className="mt-4">
        Submit
      </Button>
    </Card>
  </Container>
</Section>
```

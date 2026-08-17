# OWNERSHIP.yml — Registre « qui possède quoi »
# Source de vérité pour trancher tout conflit de périmètre.
# Lu par les deux Claude AVANT d'agir (voir CLAUDE.md §1).
# owner: rhamon | serge | shared
# status: todo | wip | done
# Mettre à jour par PR quand une zone change de statut/propriétaire.

meta:
  repo: kelthen/Network4BWomen
  client: Network of Black Women (NBW)
  devs:
    rhamon: { github: RhamonK, branch_prefix: feat/rhamon }
    serge:  { github: sergesanou, branch_prefix: feat/serge }

# --- FONDATIONS (à faire en premier, de façon coordonnée) ---
foundations:
  - area: design-system
    files: ["tailwind.config.ts", "app/globals.css", "docs/BRAND.md"]
    owner: shared
    status: todo
    note: "Amorcé en premier. Tokens de marque NBW. Changement = petit + atomique + push rapide."
  - area: layout-global
    files: ["app/layout.tsx", "components/Nav.tsx", "components/Footer.tsx", "components/LandAcknowledgment.tsx"]
    owner: shared
    status: todo
    note: "Nav + Footer + reconnaissance territoire Blackfoot (obligatoire)."
  - area: supabase-schema
    files: ["lib/supabase.ts", "supabase/**", "docs/DATA-MODEL.md"]
    owner: shared
    status: todo
    note: "Schéma initial commun. Chacun ajoute ses tables par migration nommée."
  - area: ui-primitives
    files: ["components/ui/**"]
    owner: shared
    status: todo
    note: "Button, Card, Input, Section, Container. Base commune."

# --- PAGES / ZONES rhamon ---
rhamon:
  - area: homepage
    files: ["app/(site)/page.tsx", "components/home/**"]
    status: todo
  - area: about
    files: ["app/(site)/about/**", "components/about/**"]
    status: todo
  - area: get-involved
    files: ["app/(site)/get-involved/**", "components/getinvolved/**"]
    status: todo
  - area: donate-stripe
    files: ["app/(site)/donate/**", "app/api/stripe/**", "components/donate/**"]
    status: todo
    note: "Dons sécurisés Stripe Checkout + webhook."
  - area: contact
    files: ["app/(site)/contact/**", "app/api/contact/**", "components/contact/**"]
    status: todo
  - area: newsletter
    files: ["app/api/newsletter/**", "components/Newsletter.tsx"]
    status: todo
    note: "Signup newsletter (footer + accueil)."

# --- PAGES / ZONES serge ---
serge:
  - area: programs
    files: ["app/(site)/programs/**", "components/programs/**"]
    status: todo
  - area: events
    files: ["app/(site)/events/**", "app/api/registrations/**", "components/events/**"]
    status: todo
    note: "Inscription événements en ligne."
  - area: conference
    files: ["app/(site)/conference/**", "components/conference/**"]
    status: todo
    note: "Landing dédiée conférence annuelle."
  - area: resources
    files: ["app/(site)/resources/**", "components/resources/**"]
    status: todo
  - area: news-blog
    files: ["app/(site)/news/**", "components/news/**"]
    status: todo
    note: "Success Stories, Community News, articles, wellness tips."
  - area: gallery
    files: ["app/(site)/gallery/**", "components/gallery/**"]
    status: todo
    note: "Galerie photo par année/événement."
  - area: search
    files: ["app/(site)/search/**", "components/Search.tsx"]
    status: todo
    note: "Recherche site (phase ultérieure)."

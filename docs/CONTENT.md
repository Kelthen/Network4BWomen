# CONTENT.md — Source de vérité du contenu (où va quoi)

> **Pour Claude Code :** c'est ICI qu'on dit quel texte va sur quelle page/section. Le texte marqué « verbatim » vient du client (PDF onboarding + Website Goal) — le reproduire tel quel. Le texte marqué « placeholder » est à remplacer par le vrai contenu NBW quand il arrivera.
>
> ⚠️ **PUBLIC vs INTERNE** : seul le contenu marqué 🟢 PUBLIC va sur le site. Le contenu 🔴 INTERNE (code de conduite, confidentialité, honoraires, planning interne) **ne doit JAMAIS être publié** — il sert seulement de contexte.

---

## 0. Éléments de marque réutilisables (verbatim, 🟢 PUBLIC)

- **Nom** : Network of Black Women (NBW)
- **Tagline hero** : « Empowering Black Women. Building Community. Creating Leaders. »
- **Phrase signature** : « This is a space curated by Black Women for Black Women. »
- **Sous-titre hero** (placeholder validé) : « A safe and empowering space where Black women and girls grow personally, professionally, and collectively through connection, leadership, wellness, and opportunity. »
- **Localisation** : Southern Alberta — territoire traditionnel de la Confédération Blackfoot.
- **Contact** : info.networkofblackwomen@gmail.com · (403) 635-8688
- **Reconnaissance du territoire** (footer, obligatoire) : voir `components/LandAcknowledgment.tsx`.

---

## 1. Accueil `/` — [rhamon] → `app/(site)/page.tsx`
| Section | Contenu | Source |
|---|---|---|
| Hero | Tagline + sous-titre + CTA (À propos, Programmes, Rejoindre, Don, Événements) | verbatim ci-dessus |
| About teaser | Résumé « who we are / why founded / who we serve » + bouton Learn More | § À propos |
| Our Impact | Stats : Members Connected, Events Hosted, Professional Workshops, Volunteer Hours, Scholarships Awarded, Community Partnerships | placeholder (chiffres à confirmer) → table `testimonials`/manuel |
| Programmes | Cartes des 7 programmes (§4) | table `programs` |
| Événements à venir | 3 prochains + bouton calendrier | table `events` |
| Testimonials | Citations membres | table `testimonials` |
| Sponsors | Logos + « Become a Partner » | table `sponsors` |
| Newsletter | « Stay Connected. » | composant Newsletter |
| **Bandeau avant footer** | « Every Black Woman Deserves To Be Celebrated. » + colonnes (Une question / Autres façons d'aider) + CTA Don/Bénévole, **révélation moderne de la photo** | voir `docs/nbw-home-reference.html` (pattern validé) |

## 2. À propos `/about` — [rhamon] → `app/(site)/about/**`

**Our Story / About Us (verbatim, 🟢 PUBLIC)** :
> « Network of Black Women was created on the goal to create a sisterhood community in Southern Alberta for Black Women and a space for Black Women to be celebrated, to be themselves. »

**Mission (verbatim, 🟢 PUBLIC)** :
> « Our mission is to empower, connect, and uplift Black Women by fostering a supportive community by curating meaningful opportunities to grow. We are dedicated to creating spaces where Black Women can share their stories, celebrate one another's successes, and build lasting, transformative networks. Through collaboration and mutual support, we aim to break down barriers, amplify voices, and ensure that Black women gain the skills and tools needed to thrive both personally and professionally. »

**Vision (verbatim, 🟢 PUBLIC)** :
> « Our vision is to create a strong, inclusive, safe and supportive environment where Black Women are celebrated for their work, creativity and contributions to society. Through our initiatives we envision a future where Black Women, united in sisterhood, empower one another through shared experiences and mutual support, while being equipped to succeed in all aspects of their lives. In this community, Black Women's voices are amplified, their achievements are recognized, and their collective strength drives positive change. »

**Valeurs (verbatim, 🟢 PUBLIC)** : Équité (Equity) · Sororité (Sisterhood) · Community Care · Responsabilité (Accountability) · Autonomisation collective (Collective Empowerment).

**Sections de la page** : Our Story · Mission · Vision · Our Values · Why NBW Exists · Community Impact · Timeline of Growth · Meet Our Board of Directors · Meet Our Leadership Team.

**Équipe (verbatim, 🟢 PUBLIC — photos/bios à venir)** → table `team_members`, voir aussi `docs/TEAM.md` :
Maleeka Thomas — Founding Executive Director · Kimoya Edwards — Associate Director · Khamaya Cawley — Board Member & Signing Authority · Jodine Robin — Board Member · Martha Mathurin-Moe — Advisor to the Executive Director · Abishey Anderson — Director of Operations · Felisha Boehme — Director of Communications · Tobore Okome — Board Member · Aytia Police — Board Member.

## 3. Programmes `/programs` — [serge] → `app/(site)/programs/**` · table `programs`
7 programmes, chacun : purpose · who it serves · outcomes · photos · testimonials · bouton inscription :
Professional Development · Leadership Development · Mentorship · Community Events · Health & Wellness · Youth Programming · Annual Conference & Summit. (Descriptions détaillées = placeholder, à fournir par NBW.)

## 4. Événements `/events` — [serge] → `app/(site)/events/**` · tables `events`,`registrations`
Upcoming Events · Past Events Gallery · Annual Conference · Annual Retreat · Networking · Community Gatherings · Sports & Wellness · Calendar View. Inscription en ligne.

## 5. Conférence `/conference` — [serge] → `app/(site)/conference/**`
Overview · itinerary · accommodations · keynote speakers · FAQs · pricing · registration.

## 6. Get Involved `/get-involved` + Don `/donate` — [rhamon]
Volunteer · Become a Mentor · Become a Speaker · Partner With Us · Corporate Sponsorship · Donate · Board Opportunities. Dons Stripe. Formulaires → `form_submissions`.

## 7. Ressources `/resources` — [serge] · table `resources`
Career · Scholarships · Mental Health · Business Directory · Professional Development Tools · Community Resources · Templates & Guides.

## 8. News & Stories `/news` — [serge] · table `posts`
Success Stories · Community News · Leadership Articles · Wellness Tips · Event Recaps · Announcements.

## 9. Galerie `/gallery` — [serge] · table `gallery_media` (par année/événement).

## 10. Contact `/contact` — [rhamon] · `form_submissions`
Types : General · Partnership · Media · Volunteer. + réseaux sociaux + newsletter.

---

## 🔴 INTERNE — NE PAS PUBLIER (contexte seulement)
Du PDF onboarding, garder hors du site public : Code of Conduct, Confidentiality & Conflict of Interest, Communication & Culture (iMessage/email, délai 24-48h), Participation/Boundaries, Timesheet & honoraires (10h/mois, soumission mensuelle), planning du 1er trimestre (Conference promotion, Project Elevate, LinkedIn/TikTok/Facebook launch). Ces éléments servent au ton et à la compréhension, pas au contenu public.

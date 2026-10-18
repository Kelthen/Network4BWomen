// OWNED BY: rhamon — Événements (override zone serge, voir OWNERSHIP.yml).
// Événements « en dur » utilisés quand Supabase est indisponible (preview
// sans env, build hors ligne). Même liste consommée par la page liste et par
// la page détail — un seul endroit à maintenir.

export type EventSpeaker = { name: string; role?: string | null; bio?: string | null; photo_url?: string | null };
export type EventAgendaItem = { time: string; item: string };

export type EventRow = {
  id: string;
  slug: string;
  title: string;
  description: string | null;
  category: string | null;
  starts_at: string | null;
  ends_at: string | null;
  location: string | null;
  cover_url: string | null;
  is_conference: boolean;
  capacity: number | null;
  registration_url?: string | null;
  speakers?: EventSpeaker[] | null;
  agenda?: EventAgendaItem[] | null;
};

// Événements réels NBW (questionnaire 2026-09-15). Ordre chronologique.
// 2026-10-14 (serge, override sur demande humaine) : Girl Talk & Gratitude reporté à l'an prochain → retiré.
// 2026-10-17 (rhamon, notes NBW du 16/10) : Our Essence sur deux jours (6–7 mars), She Deserves Rest
//   retiré (événement + thème), couvertures sans reprise d'une photo déjà utilisée ailleurs.
// Le fuseau Alberta est en UTC-6 (heure d'été UTC-6, hiver UTC-7).
export const FALLBACK_EVENTS: EventRow[] = [
  {
    id: "2",
    slug: "chapter-collective",
    title: "Chapter Collective",
    description: null,
    category: "Community",
    starts_at: "2026-11-01T18:00:00-06:00",
    ends_at: null,
    location: "TBA",
    cover_url: "/images/gallery/pickleball/pickleball-highlights-12.jpg",
    is_conference: false,
    capacity: null,
  },
  {
    id: "3",
    slug: "nbw-career-conversations",
    title: "NBW: Career Conversations",
    description: null,
    category: "Professional",
    // Date à préciser — l'ISO est un placeholder pour janvier 2027.
    starts_at: "2027-01-15T18:00:00-07:00",
    ends_at: null,
    location: "TBA",
    cover_url: "/images/gallery/pickleball/pickleball-highlights-07.jpg",
    is_conference: false,
    capacity: null,
  },
  {
    id: "4",
    slug: "paint-and-sip",
    title: "Paint & Sip",
    description: null,
    category: "Community",
    starts_at: "2027-03-05T18:00:00-07:00",
    ends_at: null,
    location: "Lethbridge AB",
    cover_url: "/images/gallery/pickleball/pickleball-highlights-15.jpg",
    is_conference: false,
    capacity: null,
  },
  {
    id: "5",
    slug: "our-essence-conference",
    title: "Our Essence Conference",
    description:
      "Alberta's most premium and anticipated Black Women Leadership conference for young professionals, entrepreneurs, creatives and leaders coming together to serve our community.",
    category: "Annual Conference",
    starts_at: "2027-03-06T09:00:00-07:00",
    ends_at: "2027-03-07T18:00:00-07:00",
    location: "Excite Lethbridge, 101 Exhibition Way South",
    cover_url: "/images/conference/hero.jpg",
    is_conference: true,
    capacity: null,
  },
];

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
// Le fuseau Alberta est en UTC-6 (heure d'été UTC-6, hiver UTC-7).
export const FALLBACK_EVENTS: EventRow[] = [
  {
    id: "1",
    slug: "girl-talk-and-gratitude",
    title: "Girl Talk & Gratitude",
    description:
      "An intimate evening built around honest conversation, hands-on flower making, and gratitude. A space where Black women can talk openly about the things that matter to them, in a room where they don't have to explain themselves first. Wine, finger snacks, a bright orange–yellow–red–pink theme, and a room of Black women ready to celebrate each other.",
    category: "Networking",
    starts_at: "2026-10-17T23:30:00Z",
    ends_at: "2026-10-18T02:30:00Z",
    location: "Lethbridge AB",
    cover_url: "/images/events/girl-talk-gratitude.jpg",
    is_conference: false,
    capacity: 30,
    registration_url: "https://network-of-black-women.bloomtickets.ca/event/3228",
    speakers: null,
    agenda: null,
  },
  {
    id: "2",
    slug: "chapter-collective",
    title: "Chapter Collective",
    description: null,
    category: "Community",
    starts_at: "2026-11-01T18:00:00-06:00",
    ends_at: null,
    location: "TBA",
    cover_url: "/images/events/img-1702.jpg",
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
    cover_url: "/images/events/img-6705.jpg",
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
    cover_url: "/images/events/img-6720.jpg",
    is_conference: false,
    capacity: null,
  },
  {
    id: "5",
    slug: "our-essence-conference",
    title: "Our Essence Conference",
    description:
      "Alberta's most premium and anticipated Black Women Leadership conference for young professionals, entrepreneurs, creatives and leaders coming together to serve our community. Theme: She Deserves Rest.",
    category: "Annual Conference",
    starts_at: "2027-03-06T09:00:00-07:00",
    ends_at: "2027-03-06T18:00:00-07:00",
    location: "Excite Lethbridge, 101 Exhibition Way South",
    cover_url: "/images/conference/hero.jpg",
    is_conference: true,
    capacity: null,
  },
  {
    id: "6",
    slug: "she-deserves-rest",
    title: "She Deserves Rest",
    description: null,
    category: "Wellness",
    starts_at: "2027-03-07T10:00:00-07:00",
    ends_at: null,
    location: "TBA",
    cover_url: "/images/events/img-6793.jpg",
    is_conference: false,
    capacity: null,
  },
];

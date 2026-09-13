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

export const FALLBACK_EVENTS: EventRow[] = [
  {
    id: "1",
    slug: "girl-talk-and-gratitude",
    title: "Girl Talk & Gratitude",
    description:
      "An intimate evening built around honest conversation, hands-on flower making, and gratitude. Wine, finger snacks, a bright orange–yellow–red–pink theme, and a room of Black women ready to celebrate each other.",
    category: "Networking",
    starts_at: "2026-10-17T23:30:00Z",
    ends_at: "2026-10-18T02:30:00Z",
    location: "The Loft on 5th",
    cover_url: null,
    is_conference: false,
    capacity: 30,
    registration_url: "https://network-of-black-women.bloomtickets.ca/event/2960?GirlTalk&Gratitude",
    speakers: null,
    agenda: null,
  },
  {
    id: "2",
    slug: "wellness-self-care-morning",
    title: "Wellness & Self-Care Morning",
    description: null,
    category: "Health & Wellness",
    starts_at: "2026-10-05T10:00:00Z",
    ends_at: null,
    location: "Alberta",
    cover_url: null,
    is_conference: false,
    capacity: null,
  },
  {
    id: "3",
    slug: "leadership-roundtable",
    title: "Leadership Roundtable",
    description: null,
    category: "Leadership",
    starts_at: "2026-11-23T14:00:00Z",
    ends_at: null,
    location: "Online",
    cover_url: null,
    is_conference: false,
    capacity: null,
  },
];

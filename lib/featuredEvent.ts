// OWNED BY: rhamon — événement mis en avant sur tout le site (« mode événement »).
// Source unique de vérité pour le bandeau + le flyer d'accueil. Data-driven : le site
// décide seul QUAND promouvoir (fenêtre promoteFrom → date de fin). Mettre à jour ici
// pour changer l'événement vedette. (Pourra plus tard lire la table Supabase `events`.)

export type FeaturedEvent = {
  title: string;
  tagline: string;
  /** Date/heure de début (ISO avec fuseau). */
  start: string;
  /** Date/heure de fin (ISO). Après cette date, la promo disparaît. */
  end: string;
  dateLabel: string;
  location: string;
  category: string;
  /** Chemin du flyer dans /public. */
  flyer: string;
  /** Lien billetterie (externe). */
  ticketUrl: string;
  /** Début de la promotion (ISO). Avant cette date, rien ne s'affiche. */
  promoteFrom: string;
};

// Événement vedette actuel — « Girl Talk & Gratitude » (questionnaire NBW).
export const FEATURED_EVENT: FeaturedEvent | null = {
  title: "Girl Talk & Gratitude",
  tagline: "An intimate evening of honest conversation, flower-making, and gratitude.",
  start: "2026-10-17T17:30:00-04:00",
  end: "2026-10-17T20:30:00-04:00",
  dateLabel: "Friday, October 17, 2026 · 5:30–8:30 PM",
  location: "The Loft on 5th",
  category: "Networking",
  flyer: "/images/events/girl-talk-gratitude.jpg",
  ticketUrl: "https://network-of-black-women.bloomtickets.ca/event/2960?GirlTalk&Gratitude",
  promoteFrom: "2026-09-01T00:00:00-04:00",
};

/** L'événement est-il à promouvoir maintenant ? (fenêtre promoteFrom → fin) */
export function isFeaturedActive(now: Date = new Date()): boolean {
  const ev = FEATURED_EVENT;
  if (!ev) return false;
  const t = now.getTime();
  return t >= new Date(ev.promoteFrom).getTime() && t <= new Date(ev.end).getTime();
}

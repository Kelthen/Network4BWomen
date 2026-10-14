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

// Aucun événement vedette pour l'instant.
// 2026-10-14 (serge, override sur demande humaine) : « Girl Talk & Gratitude » (prévu le
// 17 oct. 2026) est reporté à l'an prochain → bandeau + flyer retirés. Pour relancer le
// « mode événement », remettre ici un objet FeaturedEvent (l'exemple Girl Talk complet
// est dans l'historique git de ce fichier).
export const FEATURED_EVENT: FeaturedEvent | null = null;

/** L'événement est-il à promouvoir maintenant ? (fenêtre promoteFrom → fin) */
export function isFeaturedActive(now: Date = new Date()): boolean {
  const ev = FEATURED_EVENT;
  if (!ev) return false;
  const t = now.getTime();
  return t >= new Date(ev.promoteFrom).getTime() && t <= new Date(ev.end).getTime();
}

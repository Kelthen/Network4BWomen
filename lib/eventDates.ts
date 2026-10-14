// OWNED BY: serge — Formatage des dates d'événements (fuseau Alberta + précision).
//
// NBW opère en Alberta → toutes les dates s'affichent en Mountain Time, jamais
// dans le fuseau du serveur (Vercel = UTC : un événement à 18 h MST tombait au
// lendemain dans la liste).
//
// `date_precision` (migration 0010) dit ce qui est réellement confirmé :
//   datetime → date + heure · day → date seule (heure à venir) · month → mois seul.

export const EVENT_TZ = "America/Edmonton";

export type DatePrecision = "datetime" | "day" | "month";

export function precisionOf(value: unknown): DatePrecision {
  return value === "day" || value === "month" ? value : "datetime";
}

/** Pastille de la liste : { month: "OCT", day: "17" } — ou "TBD" si seul le mois est connu. */
export function listBadge(iso: string | null, precision: DatePrecision): { month: string; day: string } {
  if (!iso) return { month: "TBD", day: "—" };
  const d = new Date(iso);
  const month = d.toLocaleString("en-US", { timeZone: EVENT_TZ, month: "short" }).toUpperCase();
  if (precision === "month") return { month, day: "TBD" };
  const day = d.toLocaleString("en-US", { timeZone: EVENT_TZ, day: "numeric" });
  return { month, day };
}

/** Ligne « When » de la page détail, sans jamais inventer d'heure ou de jour. */
export function formatEventWhen(startIso: string, endIso: string | null, precision: DatePrecision): string {
  const start = new Date(startIso);

  if (precision === "month") {
    const monthYear = start.toLocaleDateString("en-US", { timeZone: EVENT_TZ, month: "long", year: "numeric" });
    return `${monthYear} · Date to be announced`;
  }

  const dateOpts: Intl.DateTimeFormatOptions = {
    timeZone: EVENT_TZ,
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const startDate = start.toLocaleDateString("en-US", dateOpts);
  if (precision === "day") return `${startDate} · Time to be announced`;

  const timeOpts: Intl.DateTimeFormatOptions = { timeZone: EVENT_TZ, hour: "numeric", minute: "2-digit" };
  const startTime = start.toLocaleTimeString("en-US", timeOpts);
  if (!endIso) return `${startDate} · ${startTime}`;

  const end = new Date(endIso);
  const endTime = end.toLocaleTimeString("en-US", timeOpts);
  const dayKey = (d: Date) => d.toLocaleDateString("en-CA", { timeZone: EVENT_TZ });
  if (dayKey(start) === dayKey(end)) return `${startDate} · ${startTime} – ${endTime}`;
  const endDate = end.toLocaleDateString("en-US", dateOpts);
  return `${startDate} · ${startTime} → ${endDate} · ${endTime}`;
}

/** Date ISO pour schema.org : complète si l'heure est confirmée, YYYY-MM-DD si seul le jour l'est. */
export function schemaDate(iso: string | null, precision: DatePrecision): string | undefined {
  if (!iso || precision === "month") return undefined;
  if (precision === "day") return new Date(iso).toLocaleDateString("en-CA", { timeZone: EVENT_TZ });
  return iso;
}

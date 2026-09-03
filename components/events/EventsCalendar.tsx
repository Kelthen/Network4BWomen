// OWNED BY: serge — Events. Vue calendrier mensuelle (client).
"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type CalendarEvent = {
  id: string;
  slug: string;
  title: string;
  category: string | null;
  starts_at: string | null;
};

const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];

function startOfMonth(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

export default function EventsCalendar({ events }: { events: CalendarEvent[] }) {
  const dated = useMemo(
    () => events.filter((e): e is CalendarEvent & { starts_at: string } => !!e.starts_at),
    [events],
  );

  const [cursor, setCursor] = useState(() => startOfMonth(dated[0] ? new Date(dated[0].starts_at) : new Date()));
  const [selected, setSelected] = useState<Date | null>(null);

  const monthLabel = cursor.toLocaleString("en-US", { month: "long", year: "numeric" });

  const grid = useMemo(() => {
    const first = startOfMonth(cursor);
    const startWeekday = first.getDay();
    const daysInMonth = new Date(cursor.getFullYear(), cursor.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(cursor.getFullYear(), cursor.getMonth(), d));
    while (cells.length % 7 !== 0) cells.push(null);
    return cells;
  }, [cursor]);

  const eventsOn = (day: Date) => dated.filter((e) => sameDay(new Date(e.starts_at), day));

  const selectedEvents = selected ? eventsOn(selected) : [];

  return (
    <div className="rounded-2xl bg-white p-5 shadow-[0_1px_0_#e8dcc8] sm:p-7">
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() - 1, 1))}
          aria-label="Previous month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-beige text-brand-brown transition hover:bg-brand-beige/50"
        >
          ‹
        </button>
        <h3 className="font-serif text-xl text-brand-brown">{monthLabel}</h3>
        <button
          type="button"
          onClick={() => setCursor(new Date(cursor.getFullYear(), cursor.getMonth() + 1, 1))}
          aria-label="Next month"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-brand-beige text-brand-brown transition hover:bg-brand-beige/50"
        >
          ›
        </button>
      </div>

      <div className="mt-5 grid grid-cols-7 gap-1 text-center text-xs font-semibold uppercase tracking-wider text-brand-brown/50">
        {WEEKDAYS.map((w, i) => (
          <div key={i}>{w}</div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {grid.map((day, i) => {
          if (!day) return <div key={i} />;
          const dayEvents = eventsOn(day);
          const isSelected = selected && sameDay(day, selected);
          const isToday = sameDay(day, new Date());
          return (
            <button
              key={i}
              type="button"
              disabled={dayEvents.length === 0}
              onClick={() => setSelected(isSelected ? null : day)}
              className={`flex aspect-square flex-col items-center justify-center rounded-lg text-sm transition ${
                isSelected
                  ? "bg-brand-brown text-brand-cream"
                  : dayEvents.length > 0
                    ? "bg-brand-beige/50 text-brand-brown hover:bg-brand-beige"
                    : "text-brand-brown/40"
              } ${isToday && !isSelected ? "ring-1 ring-inset ring-brand-pink" : ""}`}
            >
              <span>{day.getDate()}</span>
              {dayEvents.length > 0 && (
                <span className={`mt-0.5 h-1 w-1 rounded-full ${isSelected ? "bg-brand-cream" : "bg-brand-pink"}`} />
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <div className="mt-6 border-t border-brand-beige pt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-goldText">
            {selected.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
          </p>
          {selectedEvents.length === 0 ? (
            <p className="mt-2 text-sm text-brand-brown/60">No events this day.</p>
          ) : (
            <ul className="mt-3 grid gap-2">
              {selectedEvents.map((e) => (
                <li key={e.id}>
                  <Link
                    href={`/events/${e.slug}`}
                    className="block rounded-xl bg-brand-beige/30 px-4 py-3 transition hover:bg-brand-beige/60"
                  >
                    <span className="font-serif text-base text-brand-brown">{e.title}</span>
                    {e.category && <span className="ml-2 text-sm text-brand-brown/60">· {e.category}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

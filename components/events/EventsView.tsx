// OWNED BY: serge — Events. Bascule Liste / Calendrier (client).
"use client";

import { useState, type ReactNode } from "react";
import EventsCalendar, { type CalendarEvent } from "./EventsCalendar";

const TAB_BASE = "rounded-full px-5 py-2 text-sm font-semibold transition";

export default function EventsView({ events, listView }: { events: CalendarEvent[]; listView: ReactNode }) {
  const [tab, setTab] = useState<"list" | "calendar">("list");

  return (
    <div>
      <div className="mb-6 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("list")}
          className={`${TAB_BASE} ${tab === "list" ? "bg-brand-brown text-brand-cream" : "border border-brand-beige text-brand-brown hover:bg-brand-beige/40"}`}
        >
          List
        </button>
        <button
          type="button"
          onClick={() => setTab("calendar")}
          className={`${TAB_BASE} ${tab === "calendar" ? "bg-brand-brown text-brand-cream" : "border border-brand-beige text-brand-brown hover:bg-brand-beige/40"}`}
        >
          Calendar
        </button>
      </div>

      {tab === "list" ? listView : <EventsCalendar events={events} />}
    </div>
  );
}

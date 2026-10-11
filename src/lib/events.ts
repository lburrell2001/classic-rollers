"use client";

import { useEffect, useState } from "react";
import type { EventItem } from "@/lib/site-content";

// Pulls a calendar date like "July 25, 2026" out of free-text event dates.
const datePattern = /(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2},\s+\d{4}/i;

export function getEventStart(event: EventItem) {
  const fromCountdown = event.countdownAt ? Date.parse(event.countdownAt) : Number.NaN;
  if (Number.isFinite(fromCountdown)) return fromCountdown;

  const match = event.date?.match(datePattern);
  const fromText = match ? Date.parse(match[0]) : Number.NaN;
  return Number.isFinite(fromText) ? fromText : null;
}

// An event stays listed through the end of the day it happens on.
export function isEventUpcoming(event: EventItem, now: number) {
  const start = getEventStart(event);
  if (start === null) return true;

  const endOfDay = new Date(start);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay.getTime() >= now;
}

// Ticking clock that stays null until mounted, so static HTML never shows stale events.
export function useNow(intervalMs = 1000) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setNow(Date.now()));
    const interval = window.setInterval(() => setNow(Date.now()), intervalMs);

    return () => {
      window.cancelAnimationFrame(frame);
      window.clearInterval(interval);
    };
  }, [intervalMs]);

  return now;
}

export function getUpcomingEvents(events: EventItem[], now: number | null) {
  if (now === null) return [];

  return events
    .filter((event) => isEventUpcoming(event, now))
    .sort((a, b) => (getEventStart(a) ?? Number.MAX_SAFE_INTEGER) - (getEventStart(b) ?? Number.MAX_SAFE_INTEGER));
}

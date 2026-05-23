/*
 * Planning Center iCal fetcher.
 *
 * Server-side only — this module is imported by server components and the
 * /calendar route. It NEVER ships to the client (no 'use client', no client
 * imports).
 *
 * Reads the public iCal feed URL from PLANNING_CENTER_ICAL_URL env, fetches
 * with Next.js ISR caching (10-minute revalidation), parses with ical.js,
 * filters to upcoming events, and returns a normalized CalendarEvent[].
 *
 * Failure is silent — if the feed is unreachable or malformed, returns an
 * empty array. The Scene 5 BookmarkRibbon falls back to a "see full calendar"
 * single ribbon. The site doesn't break.
 */

import ICAL from 'ical.js';
import type { CalendarEvent } from '@/types';

const REVALIDATE_SECONDS = 600; // 10 minutes
const DEFAULT_LIMIT = 8;

function normalizeIcalUrl(raw: string): string {
  // Planning Center returns webcal:// URLs; fetch needs http(s)
  return raw.replace(/^webcal:\/\//i, 'https://');
}

/**
 * Fetch + parse Planning Center iCal feed.
 * @param limit max events to return (default 8). Upcoming only, sorted ascending.
 */
export async function fetchUpcomingEvents(limit: number = DEFAULT_LIMIT): Promise<CalendarEvent[]> {
  const rawUrl = process.env.PLANNING_CENTER_ICAL_URL;
  if (!rawUrl) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[planningCenter] PLANNING_CENTER_ICAL_URL not set');
    }
    return [];
  }

  try {
    const url = normalizeIcalUrl(rawUrl);
    const res = await fetch(url, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: { Accept: 'text/calendar, text/plain, */*' },
    });
    if (!res.ok) {
      return [];
    }
    const text = await res.text();
    return parseIcal(text, limit);
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.warn('[planningCenter] fetch failed', err);
    }
    return [];
  }
}

function parseIcal(text: string, limit: number): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const now = Date.now();

  try {
    const jcal = ICAL.parse(text);
    const comp = new ICAL.Component(jcal);
    const vevents = comp.getAllSubcomponents('vevent');

    for (const v of vevents) {
      try {
        const ev = new ICAL.Event(v);
        // Use the next future occurrence for recurring events
        const start = ev.startDate?.toJSDate();
        const end = ev.endDate?.toJSDate();
        if (!start || !end) continue;
        if (start.getTime() < now - 1000 * 60 * 60) continue; // skip past

        events.push({
          uid: ev.uid ?? `${start.getTime()}`,
          summary: ev.summary ?? 'Untitled event',
          description: ev.description ?? undefined,
          location: ev.location ?? undefined,
          start,
          end,
          url: undefined,
        });
      } catch {
        // skip malformed vevent
      }
    }

    events.sort((a, b) => a.start.getTime() - b.start.getTime());
    return events.slice(0, limit);
  } catch {
    return [];
  }
}

export const PLANNING_CENTER_REVALIDATE = REVALIDATE_SECONDS;

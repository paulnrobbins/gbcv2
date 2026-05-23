/*
 * Scene 5 — The Week
 *
 * Phase 4a: live Planning Center events (server-fetched in app/page.tsx,
 * passed down as a prop). 3D bookmark ribbons in the Canvas carry the
 * visual; HTML keeps full event details for accessibility + low-tier
 * fallback + keyboard navigation.
 *
 * If the iCal feed returns nothing (no env, fetch failed), falls back to
 * a single "Full calendar" CTA — site doesn't break.
 */
'use client';

import { useQualityTier } from '@/hooks/useQualityTier';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Button } from '@/components/ui/Button';
import { formatEventDate, formatEventTime } from '@/lib/utils';
import type { CalendarEvent } from '@/types';

interface TheWeekProps {
  events: CalendarEvent[];
}

export function TheWeek({ events }: TheWeekProps) {
  const tier = useQualityTier();
  const prefersReduced = useReducedMotion();
  const showHtmlCards = tier === 'low' || prefersReduced;

  const display = events.slice(0, 3);
  const hasEvents = display.length > 0;

  return (
    <section
      data-scene="the-week"
      aria-label="What's happening this week"
      className="
        relative min-h-screen
        px-[var(--gutter)]
        py-[var(--section-gap)]
      "
    >
      {/* Soft bone-warm field on the left where the header lives */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, var(--bone) 0%, var(--bone) 35%, transparent 70%, transparent 100%)',
        }}
      />

      <div className="relative max-w-[var(--page-max)] mx-auto w-full">
        <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-[var(--section-gap-tight)]">
          <div>
            <p className="caption text-ink/55 mb-6">The week ahead</p>
            <h2 className="display text-display-xl text-ink leading-[1.02]">
              What&rsquo;s coming up.
            </h2>
          </div>
          <Button href="/calendar" variant="ghost">Full calendar</Button>
        </header>

        {hasEvents ? (
          showHtmlCards ? (
            <ul className="grid md:grid-cols-3 gap-6">
              {display.map((e) => (
                <li
                  key={e.uid}
                  className="
                    group relative p-7 bg-bone border-l-2 border-gilt
                    shadow-[0_1px_0_rgba(26,20,16,0.04)]
                    transition-transform duration-300 ease-editorial
                    hover:-translate-y-1
                  "
                >
                  <p className="caption text-gilt mb-3">
                    {formatEventDate(e.start)} <span className="text-ink/40 mx-2">·</span> {formatEventTime(e.start)}
                  </p>
                  <p className="display text-xl text-ink leading-tight mb-3">{e.summary}</p>
                  {e.description ? (
                    <p className="text-sm text-ink/70 leading-relaxed line-clamp-3">
                      {e.description}
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          ) : (
            // High-tier: 3D ribbons in Canvas carry the visual.
            // We still surface text-only event details for screen readers + keyboard nav.
            <ul className="grid md:grid-cols-3 gap-6" aria-label="Upcoming events">
              {display.map((e) => (
                <li key={e.uid} className="text-ink/85">
                  <p className="caption text-gilt mb-2">
                    {formatEventDate(e.start)} <span className="text-ink/40 mx-2">·</span> {formatEventTime(e.start)}
                  </p>
                  <p className="display text-xl text-ink leading-tight">{e.summary}</p>
                </li>
              ))}
            </ul>
          )
        ) : (
          <p className="text-body-lg text-ink/70 max-w-xl leading-relaxed">
            New events post throughout the week. Check the full calendar for what&rsquo;s ahead.
          </p>
        )}
      </div>
    </section>
  );
}

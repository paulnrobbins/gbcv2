/*
 * Calendar — monthly-grouped event list with embroidered-ribbon styling.
 *
 * Groups events by Month YYYY, renders each as a horizontal row with date
 * on the left, time + title in the middle, optional location/description
 * on the right. Visual: gilt left-border on each row (the embroidered edge),
 * subtle hover lift.
 */
import { cn } from '@/lib/utils';
import { formatEventDate, formatEventTime } from '@/lib/utils';
import type { CalendarEvent } from '@/types';

interface CalendarMonthListProps {
  events: CalendarEvent[];
}

function monthKey(d: Date): string {
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
}

export function CalendarMonthList({ events }: CalendarMonthListProps) {
  if (events.length === 0) {
    return (
      <p className="text-body-lg text-ink/70 max-w-xl leading-relaxed">
        No upcoming events scheduled. Check back — the calendar fills in throughout the week.
      </p>
    );
  }

  // Group by Month YYYY in order
  const groups = new Map<string, CalendarEvent[]>();
  for (const e of events) {
    const k = monthKey(e.start);
    const arr = groups.get(k) ?? [];
    arr.push(e);
    groups.set(k, arr);
  }

  return (
    <div className="space-y-16">
      {Array.from(groups.entries()).map(([month, items]) => (
        <section key={month}>
          <h2 className="caption text-ink/55 mb-6">{month}</h2>
          <ul className="space-y-3">
            {items.map((e) => (
              <li key={e.uid}>
                <article
                  className={cn(
                    'grid grid-cols-[6rem_1fr] sm:grid-cols-[7rem_1fr_1fr] gap-4 sm:gap-8',
                    'p-5 bg-bone border-l-2 border-gilt',
                    'transition-transform duration-200 ease-editorial',
                    'hover:-translate-y-0.5'
                  )}
                >
                  <div className="space-y-1">
                    <p className="caption text-gilt">{formatEventDate(e.start)}</p>
                    <p className="text-sm text-ink/65">{formatEventTime(e.start)}</p>
                  </div>
                  <div>
                    <p className="display text-lg text-ink leading-snug">{e.summary}</p>
                    {e.description ? (
                      <p className="text-sm text-ink/65 mt-1 line-clamp-2 sm:hidden">
                        {e.description}
                      </p>
                    ) : null}
                  </div>
                  <div className="hidden sm:block text-sm text-ink/65 leading-relaxed">
                    {e.description ? (
                      <p className="line-clamp-3">{e.description}</p>
                    ) : null}
                    {e.location ? (
                      <p className="caption text-ink/45 mt-2">{e.location}</p>
                    ) : null}
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}

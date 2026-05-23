/*
 * Missionary card — respects privacy defaults from missionaries.ts.
 *
 * Shows: name, location, agency, role, focus tags, public agency email.
 * Does NOT show: home address, children's specifics, personal phone.
 *
 * Per /content/missionaries/missionaries.ts header — those fields were
 * never imported. Defense in depth: even if a future edit accidentally
 * added them, this card only reads the public-safe properties.
 */
import { cn } from '@/lib/utils';
import type { Missionary } from '@/content/missionaries/missionaries';

interface MissionaryCardProps {
  missionary: Missionary;
  className?: string;
}

const REGION_LABEL: Record<Missionary['region'], string> = {
  local: 'Local',
  domestic: 'Domestic',
  international: 'International',
};

export function MissionaryCard({ missionary: m, className }: MissionaryCardProps) {
  return (
    <article
      className={cn(
        'group h-full p-7 bg-bone border-l-2 border-gilt',
        'shadow-[0_1px_0_rgba(26,20,16,0.04)]',
        'transition-transform duration-200 ease-editorial',
        'hover:-translate-y-1',
        className
      )}
    >
      <p className="caption text-gilt mb-3">
        {REGION_LABEL[m.region]} <span className="text-ink/40 mx-2">·</span> {m.location}
      </p>
      <h3 className="display text-display-md text-ink leading-tight mb-3">{m.name}</h3>
      <p className="caption text-ink/55 mb-4">{m.agency}</p>
      <p className="text-sm text-ink/75 leading-relaxed mb-5">{m.role}</p>

      {m.focus.length > 0 && (
        <ul className="flex flex-wrap gap-2 mb-4">
          {m.focus.map((f) => (
            <li
              key={f}
              className="px-2.5 py-1 text-[0.7rem] uppercase tracking-widest text-ink/65 border border-ink/15"
            >
              {f}
            </li>
          ))}
        </ul>
      )}

      {m.email ? (
        <a
          href={`mailto:${m.email}`}
          className="caption text-ink/70 hover:text-gilt transition-colors"
        >
          {m.email}
        </a>
      ) : null}
    </article>
  );
}

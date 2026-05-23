/*
 * Missions — filterable directory of 24 missionaries + ministries.
 *
 * Three filter axes (combinable):
 *   • Region: local / domestic / international
 *   • Focus tag: any of the focus categories used by missionaries
 *
 * Privacy defaults baked into the data file. Card component reads only
 * public-safe properties.
 *
 * No per-missionary detail page in Phase 4c — most sending agencies prefer
 * the directory-level treatment, and a detail page risks pushing too much
 * into public view. If Paul wants per-missionary detail pages later,
 * Phase 5 adds them with the same privacy gates.
 */
'use client';

import { useMemo, useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { MissionaryCard } from '@/components/ui/MissionaryCard';
import { missionaries } from '@/content/missionaries/missionaries';
import { cn } from '@/lib/utils';

type RegionFilter = 'all' | 'local' | 'domestic' | 'international';

const REGION_CHIPS: Array<{ id: RegionFilter; label: string }> = [
  { id: 'all', label: 'All missionaries' },
  { id: 'local', label: 'Local' },
  { id: 'domestic', label: 'Domestic' },
  { id: 'international', label: 'International' },
];

export default function MissionsPage() {
  const [region, setRegion] = useState<RegionFilter>('all');
  const [focus, setFocus] = useState<string | null>(null);

  // Build the set of unique focus tags across all missionaries
  const allFocusTags = useMemo(() => {
    const tags = new Set<string>();
    missionaries.forEach((m) => m.focus.forEach((f) => tags.add(f)));
    return Array.from(tags).sort();
  }, []);

  const filtered = useMemo(() => {
    return missionaries.filter((m) => {
      if (region !== 'all' && m.region !== region) return false;
      if (focus && !m.focus.includes(focus)) return false;
      return true;
    });
  }, [region, focus]);

  return (
    <>
      <main className="relative min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full">
          <header className="grid md:grid-cols-12 gap-8 mb-[var(--section-gap-tight)]">
            <div className="md:col-span-8">
              <p className="caption text-ink/55 mb-6">Sent from Dayton</p>
              <h1 className="display text-display-2xl text-ink leading-[0.95]">
                Missions.
              </h1>
              <p className="mt-10 text-body-lg text-ink/75 max-w-xl leading-relaxed">
                {missionaries.length} families and ministries serve in East Tennessee,
                across the United States, and on four continents. Translating Scripture.
                Planting churches. Training pastors. Sitting with people who have never
                heard the name of Jesus. Filter by region or focus, or read the whole list.
              </p>
            </div>
            <aside className="md:col-span-4 md:pl-8 md:border-l md:border-ink/15 self-end">
              <p className="caption text-ink/55 mb-3">Want to give to missions?</p>
              <p className="text-sm text-ink/70 leading-relaxed">
                GBC supports each of these families monthly through the missions budget.
                Designated gifts go through the church office.
              </p>
            </aside>
          </header>

          {/* Region chips */}
          <nav aria-label="Filter by region" className="flex flex-wrap gap-2 mb-4">
            {REGION_CHIPS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setRegion(c.id)}
                aria-pressed={region === c.id}
                className={cn(
                  'px-4 py-2 text-xs uppercase tracking-widest font-medium border transition-colors',
                  region === c.id
                    ? 'bg-ink text-bone border-ink'
                    : 'bg-transparent text-ink/70 border-ink/20 hover:border-ink/60'
                )}
              >
                {c.label}
              </button>
            ))}
          </nav>

          {/* Focus chips */}
          <nav aria-label="Filter by focus" className="flex flex-wrap gap-2 mb-12">
            <button
              type="button"
              onClick={() => setFocus(null)}
              aria-pressed={focus === null}
              className={cn(
                'px-3 py-1.5 text-[0.7rem] uppercase tracking-widest border transition-colors',
                focus === null
                  ? 'bg-gilt text-ink border-gilt'
                  : 'bg-transparent text-ink/60 border-ink/15 hover:border-ink/40'
              )}
            >
              All focus
            </button>
            {allFocusTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setFocus(focus === tag ? null : tag)}
                aria-pressed={focus === tag}
                className={cn(
                  'px-3 py-1.5 text-[0.7rem] uppercase tracking-widest border transition-colors',
                  focus === tag
                    ? 'bg-gilt text-ink border-gilt'
                    : 'bg-transparent text-ink/60 border-ink/15 hover:border-ink/40'
                )}
              >
                {tag}
              </button>
            ))}
          </nav>

          {/* Count line */}
          <p className="caption text-ink/50 mb-8">
            Showing <span className="text-ink/80">{filtered.length}</span> of{' '}
            <span className="text-ink/80">{missionaries.length}</span>
          </p>

          {/* Grid */}
          {filtered.length > 0 ? (
            <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((m) => (
                <li key={m.slug}>
                  <MissionaryCard missionary={m} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-body-lg text-ink/65 leading-relaxed py-12">
              No missionaries match that filter combination. Clear a chip to see more.
            </p>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

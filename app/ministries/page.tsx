/*
 * Ministries directory — filterable by category.
 *
 * Categories: All / Kids / Youth / Young Adults / Adults / Care
 *
 * Client component because filter state lives in URL search params + UI.
 * Server-side would require re-routing on every chip click — too heavy.
 *
 * Ministry data is statically imported from /content/ministries/ministries.ts
 * — the bundle includes all 17 entries (small, no need for dynamic fetch).
 */
'use client';

import { useMemo, useState } from 'react';
import { Footer } from '@/components/layout/Footer';
import { MinistryRibbon } from '@/components/ui/MinistryRibbon';
import { ministries, type MinistryEntry, type MinistryCategoryExtended } from '@/content/ministries/ministries';
import { cn } from '@/lib/utils';

interface CategoryChip {
  id: 'all' | MinistryCategoryExtended;
  label: string;
}

const CHIPS: CategoryChip[] = [
  { id: 'all', label: 'All ministries' },
  { id: 'kids', label: 'Kids' },
  { id: 'youth', label: 'Youth' },
  { id: 'young-adults', label: 'Young adults' },
  { id: 'adults', label: 'Adults' },
  { id: 'care', label: 'Care' },
];

export default function MinistriesPage() {
  const [active, setActive] = useState<CategoryChip['id']>('all');

  const filtered = useMemo(() => {
    if (active === 'all') return ministries;
    return ministries.filter((m) => m.category === active);
  }, [active]);

  // Group ministries by category for the "all" view so the page reads as
  // a structured directory, not one giant flat grid
  const grouped = useMemo(() => {
    if (active !== 'all') return [{ category: active, items: filtered }];
    const groups: Array<{ category: MinistryCategoryExtended; items: MinistryEntry[] }> = [];
    for (const chip of CHIPS) {
      if (chip.id === 'all') continue;
      const items = ministries.filter((m) => m.category === chip.id);
      if (items.length) groups.push({ category: chip.id, items });
    }
    return groups;
  }, [active, filtered]);

  const labelFor = (cat: CategoryChip['id']) =>
    CHIPS.find((c) => c.id === cat)?.label ?? String(cat);

  return (
    <>
      <main className="relative min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full">
          {/* Header */}
          <header className="grid md:grid-cols-12 gap-8 mb-[var(--section-gap-tight)]">
            <div className="md:col-span-8">
              <p className="caption text-ink/55 mb-6">Find a place to plug in</p>
              <h1 className="display text-display-2xl text-ink leading-[0.95]">
                Ministries.
              </h1>
              <p className="mt-10 text-body-lg text-ink/75 max-w-xl leading-relaxed">
                Every age, every stage. {ministries.length} ministries — from the
                nursery to GriefShare, from middle-school youth night to the men&rsquo;s
                Saturday morning prayer breakfast. Filter by who it&rsquo;s for, or read
                the whole list.
              </p>
            </div>
          </header>

          {/* Filter chips */}
          <nav aria-label="Filter ministries by category" className="flex flex-wrap gap-2 mb-12">
            {CHIPS.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c.id)}
                aria-pressed={active === c.id}
                className={cn(
                  'px-4 py-2 text-xs uppercase tracking-widest font-medium border transition-colors',
                  active === c.id
                    ? 'bg-ink text-bone border-ink'
                    : 'bg-transparent text-ink/70 border-ink/20 hover:border-ink/60'
                )}
              >
                {c.label}
              </button>
            ))}
          </nav>

          {/* Grid */}
          {grouped.map(({ category, items }) => (
            <section key={category} className="mb-16">
              {active === 'all' && (
                <h2 className="caption text-ink/55 mb-6 sticky top-0 py-2 bg-bone/90 backdrop-blur-sm z-10">
                  {labelFor(category)}
                </h2>
              )}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((m) => (
                  <MinistryRibbon
                    key={m.slug}
                    title={m.title}
                    caption={m.ageRange ?? m.season ?? labelFor(m.category)}
                    description={m.shortDescription}
                    meta={m.meetingTime}
                    href={`/ministries/${m.slug}`}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}

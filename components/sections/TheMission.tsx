/*
 * Scene 6 — The Mission
 *
 * Phase 4a: missionary count comes from the loaded missionaries data.
 * The 3D globe + pin lights live in the Canvas (GlobeMap). Section
 * background is the ink-veil treatment (same as Scene 3) so the warm
 * globe reads against a darkened backdrop.
 *
 * Tier-aware: low-tier visitors still get the editorial Mission card
 * with count + Core Value + CTA.
 */
'use client';

import { Button } from '@/components/ui/Button';

interface TheMissionProps {
  missionaryCount: number;
}

export function TheMission({ missionaryCount }: TheMissionProps) {
  return (
    <section
      data-scene="the-mission"
      aria-label="Missions sent by Grace Bible Church"
      className="
        relative min-h-screen flex items-center
        px-[var(--gutter)]
        py-[var(--section-gap)]
        text-bone grain-overlay
      "
    >
      {/* Ink veil so the Canvas globe reads warm against a dark backdrop */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'rgba(26, 20, 16, 0.74)' }}
      />

      <div className="relative max-w-[var(--page-max)] mx-auto w-full grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7 lg:col-span-7">
          <p className="caption text-bone/55 mb-6">Share the Gospel</p>
          <h2 className="display text-display-xl text-bone leading-[1.02]">
            We send people.<br />Here&rsquo;s where they are.
          </h2>
          <p className="mt-8 text-body-lg text-bone/75 max-w-xl leading-relaxed">
            {missionaryCount} families and ministries serve in East Tennessee, across
            the United States, and on four continents — translating Scripture,
            planting churches, training pastors, rescuing children out of trafficking,
            sitting with people who have never heard the name of Jesus.
          </p>
        </div>

        <div className="md:col-span-5 md:pl-8 md:border-l md:border-bone/15 space-y-6">
          <div>
            <p className="caption text-bone/50 mb-3">Sent from Dayton</p>
            <p className="display text-[6rem] md:text-[8rem] leading-none text-gilt">
              {missionaryCount}
            </p>
            <p className="text-sm text-bone/60 mt-2">missionaries on the field</p>
          </div>
          <Button href="/missions" variant="gilt">Pray for our missionaries</Button>
        </div>
      </div>
    </section>
  );
}

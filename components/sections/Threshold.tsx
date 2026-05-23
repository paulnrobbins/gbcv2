/*
 * Scene 1 — Threshold
 *
 * Phase 3: transparent background — the BibleWorld Canvas is the visual.
 * Content sits at the right margin so the closed Bible in the center of the
 * Canvas is visible. Hero display type appears above the Bible's left edge;
 * service times + CTA pin to the right margin where the page would have
 * editorial captions.
 *
 * Tier-aware: when Canvas is suppressed (low tier / reduced motion), this
 * section still reads as a complete editorial hero — content positions
 * still work in a flat layout because they use grid columns, not absolute
 * overlay positioning.
 */
import { Button } from '@/components/ui/Button';
import { CHURCH_INFO, SERVICE_TIMES } from '@/lib/utils';

export function Threshold() {
  return (
    <section
      data-scene="threshold"
      aria-label="Welcome to Grace Bible Church"
      className="
        relative min-h-screen flex items-end
        px-[var(--gutter)]
        pt-[20vh] pb-[15vh]
      "
    >
      {/* No background — the BibleWorld Canvas is the visual ground.
          A very subtle bone-to-transparent gradient at the bottom edge
          gives the next section a soft handoff without blocking the Bible. */}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-[20vh] pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, transparent 0%, var(--bone) 100%)',
        }}
      />

      <div className="relative max-w-[var(--page-max)] mx-auto w-full grid md:grid-cols-12 gap-8 items-end">
        {/* Hero display headline — top-left margin */}
        <div className="md:col-span-8 lg:col-span-7">
          <p className="caption text-ink/55 mb-6">{CHURCH_INFO.cityState}</p>
          <h1 className="display text-display-2xl text-ink leading-[0.95]">
            Grace Bible<br />Church
          </h1>
        </div>

        {/* Service times — right margin like a page caption */}
        <aside className="md:col-span-4 lg:col-span-5 lg:pl-8 lg:border-l lg:border-ink/15 space-y-4">
          <p className="caption text-ink/55">{SERVICE_TIMES.day} mornings</p>
          <div className="space-y-2 text-ink/80 text-body-lg leading-snug font-body">
            <p>
              <span className="text-ink font-medium">{SERVICE_TIMES.sundaySchoolTime}</span>
              <br />
              <span className="text-sm text-ink/65">{SERVICE_TIMES.sundaySchoolLabel}</span>
            </p>
            <p>
              <span className="text-ink font-medium">{SERVICE_TIMES.worshipTime}</span>
              <br />
              <span className="text-sm text-ink/65">{SERVICE_TIMES.worshipLabel}</span>
            </p>
          </div>
          <div className="pt-4">
            <Button href="/visit" variant="gilt">
              Plan a Sunday visit
            </Button>
          </div>
        </aside>
      </div>
    </section>
  );
}

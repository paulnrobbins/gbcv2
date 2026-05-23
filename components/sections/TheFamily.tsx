/*
 * Scene 4 — The Family
 *
 * Phase 4a: HTML carries the captions (Core Values) + a low-tier fallback
 * gallery of the same three photos. The 3D PhotoBillboards in the Canvas
 * are the primary visual at high tier; the HTML photos hide under a CSS
 * media gate so high-tier visitors don't see double images.
 *
 * For reduced-motion / low-tier visitors (no Canvas), the HTML photos
 * carry the full experience.
 *
 * The CSS gate uses the [data-tier] attribute set on html by the
 * quality system. Phase 5 polish task: surface that attribute via a
 * client-side useEffect so the gate is bullet-proof; for now the
 * inline-style display:none is JavaScript-set in a tiny useEffect.
 */
'use client';

import Image from 'next/image';
import { useQualityTier } from '@/hooks/useQualityTier';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const FAMILY_FRAMES = [
  {
    photo: '/photos/church/GBC-0167.jpg',
    valueLabel: 'Teach the Word',
    valueLine: 'Verse by verse. Book by book. Trusting the text more than the cleverness around it.',
    alt: 'Sunday morning worship at Grace Bible Church',
  },
  {
    photo: '/photos/church/GBC-0301.jpg',
    valueLabel: 'Care for each other',
    valueLine: 'Meals after surgery. Grief that someone else carries with you. A second chair pulled up without asking.',
    alt: 'GraceKids ministry at Grace Bible Church',
  },
  {
    photo: '/photos/church/GBC-0577.jpg',
    valueLabel: 'Worship the Lord',
    valueLine: 'Old hymns. New songs. Voices that have been singing them for sixty years next to voices learning the chorus.',
    alt: 'Congregation singing during worship at Grace Bible Church',
  },
];

export function TheFamily() {
  const tier = useQualityTier();
  const prefersReduced = useReducedMotion();
  // When 3D billboards carry the photos in Canvas, hide the HTML photo planes
  // but keep captions visible
  const showHtmlPhotos = tier === 'low' || prefersReduced;

  return (
    <section
      data-scene="the-family"
      aria-label="The people of Grace Bible Church"
      className="
        relative min-h-screen
        px-[var(--gutter)]
        py-[var(--section-gap)]
      "
    >
      {/* Soft bone field — non-blocking, lifts text contrast where captions live */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, var(--bone) 0%, var(--bone) 28%, transparent 60%, transparent 100%)',
        }}
      />

      <div className="relative max-w-[var(--page-max)] mx-auto w-full">
        <header className="max-w-3xl mb-[var(--section-gap-tight)]">
          <p className="caption text-ink/55 mb-6">The people</p>
          <h2 className="display text-display-xl text-ink leading-[1.02]">
            A congregation, not<br />a crowd.
          </h2>
        </header>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {FAMILY_FRAMES.map((f, i) => (
            <figure key={f.photo} className="space-y-5" data-frame-index={i}>
              {showHtmlPhotos ? (
                <div className="relative aspect-[4/5] bg-bone-warm overflow-hidden">
                  <Image
                    src={f.photo}
                    alt={f.alt}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 33vw, 100vw"
                  />
                  <div
                    className="absolute inset-0 mix-blend-overlay"
                    style={{ background: 'rgba(200, 150, 74, 0.10)' }}
                  />
                </div>
              ) : (
                // Spacer that matches photo aspect so captions align with
                // the 3D billboards visible behind in the Canvas
                <div className="aspect-[4/5]" aria-hidden />
              )}
              <figcaption className="space-y-3">
                <p className="display text-display-md text-ink leading-tight">{f.valueLabel}</p>
                <p className="text-sm text-ink/70 leading-relaxed">{f.valueLine}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

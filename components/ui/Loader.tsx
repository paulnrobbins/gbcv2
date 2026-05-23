/*
 * Loading as theater.
 *
 * The visitor's first impression of the site is this loader. Treated as
 * art-directed in the site's aesthetic, not a throwaway spinner.
 *
 * Reads real asset progress from drei's useProgress hook. As HDRI + fonts
 * load, the gold-leaf bar fills left-to-right. Wordmark hangs above.
 * Beneath, a single ribbon of caption text invites the visitor:
 * "An invitation, opening." When progress hits 100%, the loader holds for
 * 400ms (so the visitor reads the wordmark), then fades out as the cover
 * begins opening in the Bible scene below.
 *
 * Bug Audit Failure Mode #4 — if HDRIs/assets fail to load, useProgress
 * still ticks to 100% based on other deps. The loader will always finish.
 *
 * Mounted by app/page.tsx ABOVE the BibleWorld so it covers the canvas
 * during initial load.
 */
'use client';

import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useQualityTier } from '@/hooks/useQualityTier';
import { useMounted } from '@/hooks/useMounted';

const HOLD_MS = 500;
const FADE_MS = 1200;
// Maximum time the loader will block — even if useProgress never fires
// (e.g. R3F Suspense is empty because user is on 'low' tier and Canvas
// rendered nothing), the page must show after this safety timeout.
const SAFETY_TIMEOUT_MS = 3500;

export function Loader() {
  const mounted = useMounted();
  const prefersReduced = useReducedMotion();
  const tier = useQualityTier();
  const { progress, active } = useProgress();
  const [done, setDone] = useState(false);
  const [hide, setHide] = useState(false);

  // Reduced-motion / low-tier visitors get the static-page experience
  // immediately — no Canvas to wait for, so no loader to show.
  const skipLoader = mounted && (prefersReduced || tier === 'low');

  useEffect(() => {
    // Done when useProgress reports completion AND progress is 100,
    // OR when the safety timeout elapses.
    if (progress >= 100 && !active && !done) {
      const t = setTimeout(() => setDone(true), HOLD_MS);
      return () => clearTimeout(t);
    }
  }, [progress, active, done]);

  useEffect(() => {
    const safety = setTimeout(() => setDone(true), SAFETY_TIMEOUT_MS);
    return () => clearTimeout(safety);
  }, []);

  useEffect(() => {
    if (done) {
      const t = setTimeout(() => setHide(true), FADE_MS);
      return () => clearTimeout(t);
    }
  }, [done]);

  if (hide || skipLoader) return null;

  const pct = Math.max(0, Math.min(100, Math.round(progress)));

  return (
    <div
      role="status"
      aria-busy={!done}
      aria-label="Grace Bible Church — opening"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        background: 'var(--ink)',
        color: 'var(--bone)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '2.5rem',
        opacity: done ? 0 : 1,
        transition: `opacity ${FADE_MS}ms var(--ease-editorial)`,
        pointerEvents: done ? 'none' : 'auto',
      }}
    >
      {/* Wordmark */}
      <div
        className="display"
        style={{
          fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--bone)',
          textAlign: 'center',
        }}
      >
        Grace Bible Church
      </div>

      {/* Gold-leaf bar — the real-load progress, animated as a gilt fill */}
      <div
        style={{
          width: 'min(22rem, 64vw)',
          height: '2px',
          background: 'rgba(244, 236, 220, 0.10)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, var(--gilt) 12%, var(--gilt) 88%, transparent 100%)',
            transformOrigin: 'left center',
            transform: `scaleX(${pct / 100})`,
            transition: 'transform 280ms var(--ease-editorial)',
            // Subtle vertical glow above the bar
            boxShadow: '0 0 18px rgba(200, 150, 74, 0.4)',
          }}
        />
      </div>

      {/* Invitation caption — beneath the bar */}
      <p
        style={{
          fontFamily: 'var(--font-scripture)',
          fontStyle: 'italic',
          fontSize: '0.95rem',
          color: 'rgba(244, 236, 220, 0.55)',
          letterSpacing: '0.01em',
        }}
      >
        An invitation, opening.
      </p>
    </div>
  );
}

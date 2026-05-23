/*
 * Lenis smooth-scroll provider — now also drives ScrollTrigger sync.
 *
 * Mounts Lenis client-side only (inside useEffect). Exposes the instance via
 * context. Bridges Lenis frames into ScrollTrigger so the Phase 3 scroll
 * choreography sees the smoothed scroll position, not the native browser
 * scroll (which would feel jittery against Lenis).
 *
 * Disabled entirely under prefers-reduced-motion — ScrollTrigger then runs
 * against native scroll, which is what the reduced-motion fallback needs.
 *
 * Bug Audit:
 *   - #11: Lenis dynamic-imported, never at module top
 *   - #13: ScrollTrigger plugin is already registered at module top by
 *          lib/gsap.ts; we only call its tick methods here, not registerPlugin
 */
'use client';

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import type { LenisInstance } from '@/lib/lenis';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const LenisContext = createContext<LenisInstance | null>(null);

export function LenisProvider({ children }: { children: ReactNode }) {
  const [instance, setInstance] = useState<LenisInstance | null>(null);
  const rafRef = useRef<number | null>(null);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (prefersReduced) return;
    let cancelled = false;
    let lenis: LenisInstance | null = null;

    (async () => {
      try {
        const { createLenis } = await import('@/lib/lenis');
        if (cancelled) return;
        lenis = createLenis();
        setInstance(lenis);

        // Bridge Lenis → ScrollTrigger.
        // Each Lenis scroll event triggers a ScrollTrigger tick, so animations
        // scrubbed with ScrollTrigger see the smoothed scroll position.
        lenis.on('scroll', ScrollTrigger.update);

        // GSAP's ticker drives Lenis (instead of our own RAF) so Lenis frames
        // align with GSAP's update loop — prevents jitter against ScrollTrigger.
        const tick = (time: number) => {
          lenis?.raf(time * 1000);
        };
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        // Mark html so global Lenis CSS classes apply
        document.documentElement.classList.add('lenis', 'lenis-smooth');

        return () => {
          gsap.ticker.remove(tick);
        };
      } catch {
        // Lenis failed to load — native scroll still works, ScrollTrigger
        // will use the document scroll directly. Page is functional.
      }
    })();

    return () => {
      cancelled = true;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      try {
        lenis?.destroy();
      } catch {
        // ignore
      }
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
    };
  }, [prefersReduced]);

  return <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>;
}

export function useLenis(): LenisInstance | null {
  return useContext(LenisContext);
}

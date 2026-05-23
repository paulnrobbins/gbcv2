/*
 * Reduced-motion preference.
 *
 * Returns false on first SSR + first client render (matches server),
 * then reflects the user's preference after first effect runs.
 * Pair with the static-page fallback experience for Scene 1+ (no Bible
 * animation; sections become stacked editorial cards).
 */
'use client';

import { useEffect, useState } from 'react';

export function useReducedMotion(): boolean {
  const [prefersReduced, setPrefersReduced] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = () => setPrefersReduced(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return prefersReduced;
}

/*
 * GSAP module setup.
 *
 * CRITICAL: ScrollTrigger is registered at module evaluation time (top of file),
 * NOT inside a useEffect or async dynamic import. This prevents Bug Audit
 * Failure Mode #13 — the GSAP ScrollTrigger race that crashes production
 * with "Missing plugin?" warnings then `ev is not a function`.
 *
 * Scene components import ScrollTrigger synchronously, so it must already be
 * registered by the time they evaluate.
 *
 * The 'use client' below is intentional and required — gsap touches window.
 * Components consuming this module are themselves 'use client' or wrapped
 * via next/dynamic with ssr:false (e.g., the BibleWorld Canvas).
 */
'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Module-evaluation registration. Idempotent — gsap.registerPlugin no-ops on re-register.
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Default editorial easing — matches CSS --ease-editorial token.
// Use across all scroll-driven animations for camera + content reveals.
export const ease = {
  editorial: 'cubic-bezier(0.22, 1, 0.36, 1)',
  gilt: 'cubic-bezier(0.45, 0, 0.15, 1)',
  pageTurn: 'cubic-bezier(0.65, 0, 0.35, 1)',
};

export { gsap, ScrollTrigger };

/*
 * Lenis smooth-scroll setup.
 *
 * Lenis touches window — only instantiated client-side. The LenisProvider
 * dynamic-imports this module inside useEffect so it never runs during SSR.
 *
 * Bug Audit Failure Mode #11: no `new Lenis(...)` at module top level.
 */

import Lenis from 'lenis';

export type LenisInstance = InstanceType<typeof Lenis>;

export function createLenis(): LenisInstance {
  return new Lenis({
    // Smooth-scroll duration in seconds for wheel/touch flicks
    duration: 1.2,
    // Editorial easing — matches CSS --ease-editorial
    easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    // Disable on touch — native mobile scroll feels better
    smoothWheel: true,
    touchMultiplier: 1.5,
  });
}

/*
 * Responsive breakpoint helper.
 *
 * Returns a single 'isMobile' boolean. SSR-safe: defaults to false, updates
 * after first effect. Mobile breakpoint matches Tailwind's default `md` (768px).
 */
'use client';

import { useEffect, useState } from 'react';

const MOBILE_QUERY = '(max-width: 767px)';

export function useResponsive() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia(MOBILE_QUERY);
    const handler = () => setIsMobile(mq.matches);
    handler();
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return { isMobile };
}

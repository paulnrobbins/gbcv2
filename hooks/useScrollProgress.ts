/*
 * Scroll progress hook — reads from Lenis when available.
 *
 * Returns a 0..1 scalar of overall page scroll. Use in scene components that
 * need a raw scroll position (rare — most scenes drive off ScrollTrigger).
 */
'use client';

import { useEffect, useState } from 'react';
import { useLenis } from '@/components/providers/LenisProvider';

export function useScrollProgress(): number {
  const lenis = useLenis();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!lenis) return;
    const onScroll = ({ progress }: { progress: number }) => setProgress(progress);
    lenis.on('scroll', onScroll);
    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis]);

  return progress;
}

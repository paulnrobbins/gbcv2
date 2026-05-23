/*
 * Hydration safety gate.
 *
 * Returns false on first SSR pass + first client render; true after first effect runs.
 * Use to gate any conditional render that depends on browser detection, GPU class,
 * mute state, etc. — keeps server and client first paint identical so React
 * doesn't unmount the tree on hydration mismatch (Bug Audit Failure Mode #12).
 *
 * Example:
 *   const mounted = useMounted();
 *   return <Canvas>{mounted && <BibleWorld />}</Canvas>;
 */
'use client';

import { useEffect, useState } from 'react';

export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

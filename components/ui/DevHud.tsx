/*
 * Dev-only debug HUD — tiny info panel in the bottom-left so you can see
 * at a glance: what quality tier was detected, whether reduced-motion is on,
 * whether the Canvas should be mounted, what the scroll progress is.
 *
 * Only renders when NODE_ENV === 'development'. Production builds tree-shake
 * the whole component because the conditional becomes constant-false.
 */
'use client';

import { useEffect, useState } from 'react';
import { useMounted } from '@/hooks/useMounted';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useQualityTier } from '@/hooks/useQualityTier';
import { useScene } from '@/components/three/SceneController';

export function DevHud() {
  const mounted = useMounted();
  const prefersReduced = useReducedMotion();
  const tier = useQualityTier();
  const sceneRef = useScene();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    let raf = 0;
    const tick = () => {
      setProgress(sceneRef.current.progress);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [sceneRef]);

  if (process.env.NODE_ENV !== 'development') return null;
  if (!mounted) return null;

  const canvasMounted = !(prefersReduced || tier === 'low');

  return (
    <div
      role="status"
      aria-hidden
      style={{
        position: 'fixed',
        bottom: '0.75rem',
        left: '0.75rem',
        zIndex: 9998,
        padding: '0.5rem 0.75rem',
        background: 'rgba(26, 20, 16, 0.86)',
        color: '#F4ECDC',
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        fontSize: '11px',
        lineHeight: 1.4,
        border: `1px solid ${canvasMounted ? '#C8964A' : '#a33'}`,
        borderRadius: '2px',
        pointerEvents: 'none',
      }}
    >
      <div>
        canvas:{' '}
        <span style={{ color: canvasMounted ? '#C8964A' : '#ff7777' }}>
          {canvasMounted ? 'MOUNTED' : 'SUPPRESSED'}
        </span>
      </div>
      <div>tier: {tier}</div>
      <div>reduced-motion: {prefersReduced ? 'true' : 'false'}</div>
      <div>scene progress: {progress.toFixed(3)}</div>
    </div>
  );
}

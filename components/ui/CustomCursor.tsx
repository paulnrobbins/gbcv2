/*
 * Custom cursor — state-aware, only active on pointer:fine devices.
 *
 * Three states:
 *   • default      — small gilt dot following the cursor
 *   • interactive  — larger ring around the dot when over a button/link/input
 *   • text         — vertical caret when over selectable text inside <p>/<blockquote>
 *
 * Disabled when:
 *   • prefers-reduced-motion is set
 *   • pointer device is coarse (touch)
 *
 * The native cursor stays visible at smaller opacity — this is an ENHANCEMENT,
 * not a replacement. If anything fails, the user still sees the real cursor.
 *
 * Pillar 5 — Tactile Detail. One signature touch, executed precisely.
 */
'use client';

import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMounted } from '@/hooks/useMounted';

type CursorState = 'default' | 'interactive' | 'text';

export function CustomCursor() {
  const mounted = useMounted();
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [state, setState] = useState<CursorState>('default');
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0 });
  const ringPosRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  // Detect pointer:fine — only enable on real mouse/trackpad devices
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(pointer: fine)');
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Track cursor + drive the dot directly (no smoothing), ring with eased lerp
  useEffect(() => {
    if (!enabled || prefersReduced) return;

    const onMove = (e: MouseEvent) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;

      // Update state based on hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        'a, button, [role="button"], input, textarea, select, [data-cursor="interactive"]'
      );
      if (interactive) {
        setState('interactive');
        return;
      }
      const textish = target.closest('p, blockquote, h1, h2, h3, [data-cursor="text"]');
      setState(textish ? 'text' : 'default');
    };

    const tick = () => {
      const { x, y } = posRef.current;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      }
      // Ring eases toward the cursor
      ringPosRef.current.x += (x - ringPosRef.current.x) * 0.18;
      ringPosRef.current.y += (y - ringPosRef.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPosRef.current.x}px, ${ringPosRef.current.y}px, 0) translate(-50%, -50%)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      document.removeEventListener('mousemove', onMove);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [enabled, prefersReduced]);

  if (!mounted || !enabled || prefersReduced) return null;

  return (
    <>
      {/* Dot — small gilt dot at the exact cursor position */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: state === 'text' ? '2px' : '6px',
          height: state === 'text' ? '24px' : '6px',
          background: 'var(--gilt)',
          borderRadius: state === 'text' ? '0' : '50%',
          pointerEvents: 'none',
          zIndex: 99999,
          mixBlendMode: 'multiply',
          transition: 'width 200ms var(--ease-gilt), height 200ms var(--ease-gilt), border-radius 200ms var(--ease-gilt)',
          willChange: 'transform',
        }}
      />
      {/* Ring — eased ring; expands on interactive zones */}
      <div
        ref={ringRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: state === 'interactive' ? '52px' : '28px',
          height: state === 'interactive' ? '52px' : '28px',
          border: `1px solid var(--ink)`,
          opacity: state === 'text' ? 0 : state === 'interactive' ? 0.5 : 0.22,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 99998,
          transition: 'width 250ms var(--ease-gilt), height 250ms var(--ease-gilt), opacity 200ms ease',
          willChange: 'transform',
        }}
      />
    </>
  );
}

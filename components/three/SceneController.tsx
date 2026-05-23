/*
 * Scene controller — bridges page scroll to 3D scene state.
 *
 * The page is a single long-scroll surface containing 7 section elements
 * with [data-scene="..."] markers. ScrollTrigger watches the document
 * scroll and produces a single 0..1 `progress` value representing position
 * across the entire homepage.
 *
 * A ref-based publish/subscribe pattern means every 3D component reads the
 * current progress every frame without triggering React re-renders. This is
 * the canonical scroll-driven 3D pattern from the system doc + 3d-web-experience
 * skill — props update too slowly to keep up with 60fps animation.
 *
 * Bug Audit Failure Mode #13: ScrollTrigger plugin registered at module top
 * in lib/gsap.ts. This component imports the already-registered ScrollTrigger.
 *
 * Lifecycle:
 *   - Phase 2 LenisProvider wires Lenis → ScrollTrigger.update.
 *   - Phase 3 SceneController creates the master ScrollTrigger and pushes
 *     scrubbed progress into the scene state ref.
 */
'use client';

import { createContext, useContext, useEffect, useRef, type ReactNode, type MutableRefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

export interface SceneState {
  progress: number;       // 0..1 across the whole homepage scroll
  activeSceneIndex: number; // 0..6 — which of the 7 named scenes is "current"
  mouseX: number;         // -1..1 — normalized cursor x (parallax)
  mouseY: number;         // -1..1 — normalized cursor y
}

const initialState: SceneState = {
  progress: 0,
  activeSceneIndex: 0,
  mouseX: 0,
  mouseY: 0,
};

const SceneCtx = createContext<MutableRefObject<SceneState> | null>(null);

// Scene boundary thresholds in normalized progress space (must sum-approximate to 1).
// These are referenced by Bible.tsx, ScriptureType.tsx, and camera rig.
const SCENE_BOUNDS = [0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1.0];

function activeIndexFor(p: number): number {
  for (let i = 0; i < SCENE_BOUNDS.length; i++) {
    if (p < SCENE_BOUNDS[i]) return i;
  }
  return SCENE_BOUNDS.length - 1;
}

interface SceneControllerProps {
  children: ReactNode;
  // The page scroll container — defaults to document body
  triggerSelector?: string;
}

export function SceneController({ children, triggerSelector = 'main' }: SceneControllerProps) {
  const stateRef = useRef<SceneState>({ ...initialState });

  useEffect(() => {
    // Wait one frame so the page DOM is fully measured
    const raf = requestAnimationFrame(() => {
      const trigger = document.querySelector(triggerSelector) as HTMLElement | null;
      if (!trigger) return;

      const st = ScrollTrigger.create({
        trigger,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // smooth scrub — gives Lenis room to breathe
        onUpdate: (self) => {
          const p = self.progress;
          stateRef.current.progress = p;
          stateRef.current.activeSceneIndex = activeIndexFor(p);
        },
      });

      // Mouse parallax — cheap, dt-stable lerp updated on mousemove
      const onMouse = (e: MouseEvent) => {
        const nx = (e.clientX / window.innerWidth) * 2 - 1;
        const ny = (e.clientY / window.innerHeight) * 2 - 1;
        // Smooth toward target — we don't need RAF here because the listener
        // fires frequently and the consumer uses these in useFrame anyway
        stateRef.current.mouseX += (nx - stateRef.current.mouseX) * 0.25;
        stateRef.current.mouseY += (ny - stateRef.current.mouseY) * 0.25;
      };
      window.addEventListener('mousemove', onMouse, { passive: true });

      return () => {
        window.removeEventListener('mousemove', onMouse);
        st.kill();
      };
    });

    return () => {
      cancelAnimationFrame(raf);
      // Defensive: kill any ScrollTriggers this component created in case
      // they survived the inner cleanup
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger instanceof Element && t.vars.trigger.matches(triggerSelector)) {
          t.kill();
        }
      });
    };
  }, [triggerSelector]);

  return <SceneCtx.Provider value={stateRef}>{children}</SceneCtx.Provider>;
}

export function useScene(): MutableRefObject<SceneState> {
  const ref = useContext(SceneCtx);
  if (!ref) {
    // Fallback ref so components mounted outside the provider don't crash.
    // (Happens in tests + during initial dynamic-import of BibleWorld.)
    const local: MutableRefObject<SceneState> = { current: { ...initialState } };
    return local;
  }
  return ref;
}

// Touch GSAP so it doesn't get tree-shaken in case nothing else imports it
void gsap;

/*
 * Scene-boundary foley + organ pedal triggers.
 *
 * Sits OUTSIDE the Canvas (no R3F dependencies — just useScene + useAudio).
 * Polls the scene state ref every animation frame and fires sounds when:
 *   • scene index changes (page-turn foley, with variant rotation)
 *   • progress crosses 0.30 (organ pedal enters)
 *   • progress crosses 0.74 (organ pedal resolves up)
 *
 * Default-muted respected — playOneShot is a no-op when muted.
 * Reduced-motion respected — AudioProvider force-mutes in that case.
 *
 * Mounted by app/page.tsx, sibling to BibleWorld inside SceneController.
 */
'use client';

import { useEffect, useRef } from 'react';
import { useScene } from '@/components/three/SceneController';
import { useAudio } from '@/components/providers/AudioProvider';
import type { SoundKey } from '@/lib/audio';

const PAGE_TURN_VARIANTS: SoundKey[] = ['foley.pageTurn1', 'foley.pageTurn2', 'foley.pageTurn3'];

const ORGAN_PEDAL_THRESHOLD = 0.30;
const ORGAN_RESOLVE_THRESHOLD = 0.74;

export function SoundDirector() {
  const sceneRef = useScene();
  const { playOneShot, muted } = useAudio();
  const lastSceneIdx = useRef<number>(-1);
  const organStartedRef = useRef(false);
  const organResolvedRef = useRef(false);

  useEffect(() => {
    let raf = 0;
    let turnVariantIdx = 0;

    const tick = () => {
      const { progress, activeSceneIndex } = sceneRef.current;

      // Scene-index transition → page-turn foley
      if (activeSceneIndex !== lastSceneIdx.current) {
        // Don't fire on initial mount (index -1 → 0)
        if (lastSceneIdx.current !== -1 && !muted) {
          const variant = PAGE_TURN_VARIANTS[turnVariantIdx % PAGE_TURN_VARIANTS.length];
          playOneShot(variant);
          turnVariantIdx++;
        }
        lastSceneIdx.current = activeSceneIndex;
      }

      // Organ pedal enters at Scene 3 start
      if (!organStartedRef.current && progress >= ORGAN_PEDAL_THRESHOLD) {
        organStartedRef.current = true;
        playOneShot('organ.pedal');
      }
      // Organ resolves up at Scene 6 peak
      if (!organResolvedRef.current && progress >= ORGAN_RESOLVE_THRESHOLD) {
        organResolvedRef.current = true;
        playOneShot('organ.pedalResolve');
      }
      // Reset triggers when user scrolls back to the top
      if (progress < 0.05) {
        organStartedRef.current = false;
        organResolvedRef.current = false;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [sceneRef, playOneShot, muted]);

  return null;
}

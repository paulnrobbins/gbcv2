/*
 * Audio provider.
 *
 * Default state: muted. The MuteToggle (visible from frame 1) sets `muted=false`,
 * which kicks the ambient bed to begin loading + playing.
 *
 * Howler is dynamic-imported inside useEffect when the user first unmutes —
 * NEVER on module load, NEVER before user interaction. This avoids:
 *   • Bug Audit Failure Mode #7 (audio pool exhaustion on missing files)
 *   • Browser autoplay-policy violations
 *   • Wasted bandwidth for visitors who never enable sound
 *
 * If audio files fail to load (404, codec, network), the page does not break —
 * each Howl has silent onloaderror/onplayerror handlers. The mute toggle stays
 * functional even if no sound ever plays.
 */
'use client';

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import type { SoundKey } from '@/lib/audio';

interface AudioContextValue {
  muted: boolean;
  ready: boolean;       // true once Howler has been loaded at least once
  toggleMuted: () => void;
  setMuted: (m: boolean) => void;
  // Play a one-shot sound (page turn, scripture gild, ribbon sway, etc.)
  // No-ops if muted or if Howler hasn't loaded.
  playOneShot: (key: SoundKey) => void;
}

const AudioCtx = createContext<AudioContextValue>({
  muted: true,
  ready: false,
  toggleMuted: () => {},
  setMuted: () => {},
  playOneShot: () => {},
});

const AMBIENT_KEYS: SoundKey[] = ['ambient.sanctuary', 'ambient.cicadas', 'ambient.piano'];

export function AudioProvider({ children }: { children: ReactNode }) {
  const [muted, setMutedState] = useState(true);
  const [ready, setReady] = useState(false);
  const ambientHandlesRef = useRef<Map<SoundKey, unknown>>(new Map());
  const prefersReduced = useReducedMotion();

  // Reduced motion → force-mute (audio is part of the motion experience)
  useEffect(() => {
    if (prefersReduced) setMutedState(true);
  }, [prefersReduced]);

  // When unmuted: load and start ambient bed (lazy import Howler)
  useEffect(() => {
    if (muted) {
      // Stop everything currently playing
      ambientHandlesRef.current.forEach((handle) => {
        try {
          (handle as { stop: () => void }).stop();
        } catch {
          // ignore
        }
      });
      return;
    }
    if (prefersReduced) return;

    let cancelled = false;
    (async () => {
      try {
        const { getSound } = await import('@/lib/audio');
        if (cancelled) return;
        for (const key of AMBIENT_KEYS) {
          const sound = await getSound(key);
          if (!sound || cancelled) continue;
          try {
            sound.play();
            ambientHandlesRef.current.set(key, sound);
          } catch {
            // ignore — sound may not be ready
          }
        }
        setReady(true);
      } catch {
        // dynamic import failed — leave muted, page still works
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [muted, prefersReduced]);

  const setMuted = useCallback((m: boolean) => {
    setMutedState(m);
  }, []);

  const toggleMuted = useCallback(() => {
    setMutedState((prev) => !prev);
  }, []);

  const playOneShot = useCallback((key: SoundKey) => {
    if (muted || prefersReduced) return;
    (async () => {
      try {
        const { getSound } = await import('@/lib/audio');
        const sound = await getSound(key);
        if (sound) sound.play();
      } catch {
        // ignore
      }
    })();
  }, [muted, prefersReduced]);

  return (
    <AudioCtx.Provider value={{ muted, ready, toggleMuted, setMuted, playOneShot }}>
      {children}
    </AudioCtx.Provider>
  );
}

export function useAudio() {
  return useContext(AudioCtx);
}

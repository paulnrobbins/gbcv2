/*
 * Sound layer setup — Howler.js.
 *
 * Audio is opt-in. No sound files are fetched until the user interacts with
 * the mute toggle (per system doc Pattern 5 — sound design + obvious toggle
 * in first few seconds). Default state: muted.
 *
 * Bug Audit Failure Mode #7: every sound has onloaderror handler so a missing
 * file logs to console but never throws or cascades.
 *
 * Howler touches window — dynamic-imported inside AudioProvider's useEffect.
 */

import type { Howl } from 'howler';

// Sound registry — declared statically; sounds load on first play, not on
// module evaluation. Path resolution honors NEXT_PUBLIC_ASSET_CDN for large files.
export type SoundKey =
  | 'ambient.sanctuary'    // room tone bed (Scene 1+)
  | 'ambient.cicadas'      // distant Tennessee summer (Scene 1)
  | 'ambient.piano'        // faint sustained note (Scene 1)
  | 'organ.pedal'          // sustained low note (Scenes 3-6)
  | 'organ.pedalResolve'   // higher sustain (Scene 6)
  | 'foley.pageTurn1'      // page-turn variant 1
  | 'foley.pageTurn2'      // page-turn variant 2
  | 'foley.pageTurn3'      // page-turn variant 3
  | 'fx.scriptureGild'     // chime as scripture gilds (Scene 3)
  | 'fx.ribbonSway'        // hover on event ribbon (Scene 5)
  | 'detail.childLaugh';   // once in Scene 4

export interface SoundEntry {
  src: string[];
  volume: number;
  loop: boolean;
  // True = part of the ambient bed that runs continuously; false = one-shot
  ambient?: boolean;
}

function audioUrl(filename: string): string {
  const cdn = process.env.NEXT_PUBLIC_ASSET_CDN;
  if (cdn) return `${cdn.replace(/\/$/, '')}/audio/${filename}`;
  return `/audio/${filename}`;
}

export const SOUND_REGISTRY: Record<SoundKey, SoundEntry> = {
  'ambient.sanctuary': {
    src: [audioUrl('ambient-sanctuary.webm'), audioUrl('ambient-sanctuary.mp3')],
    volume: 0.35,
    loop: true,
    ambient: true,
  },
  'ambient.cicadas': {
    src: [audioUrl('ambient-cicadas.webm'), audioUrl('ambient-cicadas.mp3')],
    volume: 0.18,
    loop: true,
    ambient: true,
  },
  'ambient.piano': {
    src: [audioUrl('ambient-piano-sustain.webm'), audioUrl('ambient-piano-sustain.mp3')],
    volume: 0.22,
    loop: true,
    ambient: true,
  },
  'organ.pedal': {
    src: [audioUrl('organ-pedal.webm'), audioUrl('organ-pedal.mp3')],
    volume: 0.30,
    loop: true,
    ambient: true,
  },
  'organ.pedalResolve': {
    src: [audioUrl('organ-pedal-resolve.webm'), audioUrl('organ-pedal-resolve.mp3')],
    volume: 0.32,
    loop: false,
  },
  'foley.pageTurn1': {
    src: [audioUrl('page-turn-1.webm'), audioUrl('page-turn-1.mp3')],
    volume: 0.55,
    loop: false,
  },
  'foley.pageTurn2': {
    src: [audioUrl('page-turn-2.webm'), audioUrl('page-turn-2.mp3')],
    volume: 0.55,
    loop: false,
  },
  'foley.pageTurn3': {
    src: [audioUrl('page-turn-3.webm'), audioUrl('page-turn-3.mp3')],
    volume: 0.55,
    loop: false,
  },
  'fx.scriptureGild': {
    src: [audioUrl('scripture-gild.webm'), audioUrl('scripture-gild.mp3')],
    volume: 0.40,
    loop: false,
  },
  'fx.ribbonSway': {
    src: [audioUrl('ribbon-sway.webm'), audioUrl('ribbon-sway.mp3')],
    volume: 0.25,
    loop: false,
  },
  'detail.childLaugh': {
    src: [audioUrl('child-laugh-distant.webm'), audioUrl('child-laugh-distant.mp3')],
    volume: 0.20,
    loop: false,
  },
};

// Lazy instance cache — created on first play, never on module load.
const instances = new Map<SoundKey, Howl>();

export async function loadHowl(): Promise<typeof import('howler')> {
  return import('howler');
}

export async function getSound(key: SoundKey): Promise<Howl | null> {
  if (instances.has(key)) return instances.get(key)!;
  const entry = SOUND_REGISTRY[key];
  if (!entry) return null;
  try {
    const { Howl } = await loadHowl();
    const h = new Howl({
      src: entry.src,
      volume: entry.volume,
      loop: entry.loop,
      html5: false,
      preload: false,
      // Silent failure handlers — missing assets must not crash the page
      onloaderror: () => {
        // Intentionally silent in production. Log only in dev.
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[audio] failed to load ${key}`);
        }
      },
      onplayerror: () => {},
    });
    instances.set(key, h);
    return h;
  } catch {
    return null;
  }
}

export function clearSoundCache() {
  instances.forEach((h) => {
    try {
      h.stop();
      h.unload();
    } catch {
      // ignore
    }
  });
  instances.clear();
}

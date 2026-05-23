/*
 * Mute state hook — re-exports the AudioProvider context.
 *
 * Audio default is muted. User opt-in via the MuteToggle component.
 */
'use client';

import { useAudio } from '@/components/providers/AudioProvider';

export function useMuted() {
  const { muted, toggleMuted, setMuted, ready } = useAudio();
  return { muted, toggleMuted, setMuted, ready };
}

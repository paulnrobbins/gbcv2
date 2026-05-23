/*
 * Audio mute toggle — visible from frame 1, top-right of viewport.
 *
 * Default state: muted. The toggle invites the visitor to enable sound.
 * Per system doc Pattern 5: "obvious mute toggle in the first few seconds."
 *
 * Tier 3 sites that hide sound controls fail the World-Building Gate.
 */
'use client';

import { useMuted } from '@/hooks/useMuted';
import { useMounted } from '@/hooks/useMounted';

export function MuteToggle() {
  const mounted = useMounted();
  const { muted, toggleMuted, ready } = useMuted();

  // Hide until mounted so server and client render the same first frame
  // (hydration safety — Bug Audit Failure Mode #12).
  if (!mounted) return null;

  return (
    <button
      type="button"
      onClick={toggleMuted}
      aria-pressed={!muted}
      aria-label={muted ? 'Enable ambient sound' : 'Mute ambient sound'}
      title={muted ? 'Enable sound' : 'Mute sound'}
      className="
        fixed top-4 right-4 z-[60]
        inline-flex items-center gap-2
        px-3 py-2
        text-xs uppercase tracking-widest font-medium
        text-ink/80 bg-bone/85 backdrop-blur-sm
        border border-ink/15 hover:border-ink/40
        transition-colors duration-200 ease-gilt
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-gilt focus-visible:outline-offset-2
      "
    >
      <SpeakerIcon muted={muted} />
      <span className="hidden sm:inline">{muted ? 'Sound on' : 'Mute'}</span>
      {!muted && !ready ? <span aria-hidden className="block w-1.5 h-1.5 rounded-full bg-gilt animate-pulse" /> : null}
    </button>
  );
}

function SpeakerIcon({ muted }: { muted: boolean }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path d="M11 5L6 9H2v6h4l5 4z" />
      {muted ? (
        <>
          <line x1="22" y1="9" x2="16" y2="15" />
          <line x1="16" y1="9" x2="22" y2="15" />
        </>
      ) : (
        <>
          <path d="M15.54 8.46a5 5 0 010 7.07" />
          <path d="M19.07 4.93a10 10 0 010 14.14" />
        </>
      )}
    </svg>
  );
}

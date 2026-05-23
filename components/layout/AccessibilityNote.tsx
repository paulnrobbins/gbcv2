/*
 * The Scene 7 accessibility note — quietly proud, not buried.
 *
 * Per Better-Solution Audit recommendation #2 from the Phase 1 brief:
 * lift the assisted-listening / ASL detail out of footnote treatment into
 * Scene 7 with the same craft as everything else. Visual manifestation of
 * the "Care for each other" core value.
 *
 * Also reused on /contact and /accessibility.
 */
import { CHURCH_INFO } from '@/lib/utils';

interface AccessibilityNoteProps {
  variant?: 'inline' | 'card';
}

export function AccessibilityNote({ variant = 'inline' }: AccessibilityNoteProps) {
  if (variant === 'card') {
    return (
      <aside
        className="
          inline-flex flex-col gap-3 p-6 max-w-md
          bg-bone-warm/60 border-l-2 border-gilt
        "
      >
        <span className="caption text-ink/60">For everyone</span>
        <p className="display text-display-md text-ink leading-snug">
          {CHURCH_INFO.accessibilityNote}
        </p>
      </aside>
    );
  }

  return (
    <p className="display text-display-md text-ink/85 leading-snug max-w-2xl">
      {CHURCH_INFO.accessibilityNote}
    </p>
  );
}

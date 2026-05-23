/*
 * Scene 7 — The Invitation
 *
 * Phase 4a: same content as Phase 2 but with a soft bone field on the
 * left so the closing Bible (in the Canvas) is visible in the center-right
 * as the camera returns to Scene 1 framing.
 */
import { Button } from '@/components/ui/Button';
import { AccessibilityNote } from '@/components/layout/AccessibilityNote';
import { CHURCH_INFO, SERVICE_TIMES } from '@/lib/utils';

export function TheInvitation() {
  return (
    <section
      data-scene="the-invitation"
      aria-label="Come and see"
      className="
        relative min-h-screen
        px-[var(--gutter)]
        pt-[var(--section-gap)] pb-[var(--section-gap-tight)]
      "
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, var(--bone) 0%, var(--bone) 45%, transparent 80%, transparent 100%)',
        }}
      />

      <div className="relative max-w-[var(--page-max)] mx-auto w-full">
        <header className="max-w-3xl mb-[var(--section-gap-tight)]">
          <p className="caption text-ink/55 mb-6">An invitation</p>
          <h2 className="display text-display-2xl text-ink leading-[0.95]">
            Come and see.
          </h2>
        </header>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 space-y-8">
            <div className="space-y-3">
              <p className="caption text-ink/55">{SERVICE_TIMES.day} mornings</p>
              <div className="space-y-2 text-ink text-body-lg leading-snug">
                <p>
                  <span className="font-medium">{SERVICE_TIMES.sundaySchoolTime}</span>{' '}
                  <span className="text-ink/65 text-sm">{SERVICE_TIMES.sundaySchoolLabel}</span>
                </p>
                <p>
                  <span className="font-medium">{SERVICE_TIMES.worshipTime}</span>{' '}
                  <span className="text-ink/65 text-sm">{SERVICE_TIMES.worshipLabel}</span>
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Button href="/next-steps" variant="gilt">Send a connection card</Button>
              <Button href={CHURCH_INFO.giveUrl} variant="ghost" external>Give</Button>
            </div>
          </div>

          <div className="md:col-span-7 space-y-8">
            <div className="space-y-3">
              <p className="caption text-ink/55">Find us</p>
              <a
                href={CHURCH_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="display text-display-md text-ink hover:text-gilt transition-colors"
              >
                {CHURCH_INFO.addressShort}<br />
                {CHURCH_INFO.cityState}
              </a>
              <p className="text-sm text-ink/65 pt-2">
                <a href={`tel:${CHURCH_INFO.phoneTel}`} className="hover:text-gilt">{CHURCH_INFO.phone}</a>
                <span className="mx-2 text-ink/30">·</span>
                <a href={`mailto:${CHURCH_INFO.email}`} className="hover:text-gilt">{CHURCH_INFO.email}</a>
              </p>
            </div>

            <AccessibilityNote variant="card" />
          </div>
        </div>
      </div>
    </section>
  );
}

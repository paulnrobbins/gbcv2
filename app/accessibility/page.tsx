/* Detailed accessibility info — optional per Phase 1 brief */
import { Footer } from '@/components/layout/Footer';
import { CHURCH_INFO } from '@/lib/utils';

export const metadata = { title: 'Accessibility', description: 'Accessibility services and accommodations at Grace Bible Church.' };

export default function AccessibilityPage() {
  return (
    <>
      <main className="min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full max-w-3xl">
          <p className="caption text-ink/55 mb-6">For everyone</p>
          <h1 className="display text-display-2xl text-ink leading-[0.95]">Accessibility.</h1>

          <div className="mt-10 space-y-8 text-body-lg text-ink/80 leading-relaxed">
            <p>
              {CHURCH_INFO.accessibilityNote}
            </p>
            <p>
              The building has accessible parking near the main entrance, a ground-level worship center, and a single-stall accessible restroom in the main lobby. Nursery, GraceKids, and Jr. Church classrooms are all on the main floor.
            </p>
            <p>
              For ASL interpretation, please contact the office at <a href={`mailto:${CHURCH_INFO.email}`} className="text-gilt hover:underline">{CHURCH_INFO.email}</a> by the Wednesday before the service you&rsquo;re planning to attend.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

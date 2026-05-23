/*
 * Next steps — 4 bookmark-ribbon cards.
 *
 * Connection card, volunteer, membership, give. Each is a distinct
 * next step a visitor might want to take, written with a specific
 * action verb and an honest description of what happens next.
 */
import { Footer } from '@/components/layout/Footer';
import { MinistryRibbon } from '@/components/ui/MinistryRibbon';
import { CHURCH_INFO } from '@/lib/utils';

export const metadata = {
  title: 'Next steps',
  description: 'Connection card, volunteer, membership, give — four ways to take a step toward Grace Bible Church.',
};

const STEPS = [
  {
    title: 'Send a connection card',
    caption: 'New here',
    body: 'A short note about yourself — where you live, what brought you, how we can pray. Someone from the office responds during the week with whatever information might help.',
    href: `mailto:${CHURCH_INFO.email}?subject=Connection%20card`,
    external: true,
    cta: 'Email the office',
  },
  {
    title: 'Volunteer somewhere',
    caption: 'Find your place',
    body: 'Every ministry needs hands — children, youth, hospitality, music, tech, building. We start with a short conversation about your gifts and your week, and we match you with one place to try first.',
    href: `mailto:${CHURCH_INFO.email}?subject=Volunteer%20interest`,
    external: true,
    cta: 'Tell us you’re interested',
  },
  {
    title: 'Pursue membership',
    caption: 'Make it official',
    body: 'Membership is a public commitment to this body — the elders care for you, you commit to be cared for and to serve in return. The membership class meets quarterly; ask any pastor for the next start date.',
    href: `mailto:${CHURCH_INFO.email}?subject=Membership%20class`,
    external: true,
    cta: 'Ask about the next class',
  },
  {
    title: 'Give',
    caption: 'Support the work',
    body: 'Generosity carries the missions budget, the building, the staff, the care ministries, and everything else. Online giving is handled by Church Center — secure, fee-free on bank transfers, one-time or recurring.',
    href: CHURCH_INFO.giveUrl,
    external: true,
    cta: 'Open Church Center',
  },
];

export default function NextStepsPage() {
  return (
    <>
      <main className="relative min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full">
          <header className="grid md:grid-cols-12 gap-8 mb-[var(--section-gap-tight)]">
            <div className="md:col-span-8">
              <p className="caption text-ink/55 mb-6">A way forward</p>
              <h1 className="display text-display-2xl text-ink leading-[0.95]">
                Next steps.
              </h1>
              <p className="mt-10 text-body-lg text-ink/75 max-w-xl leading-relaxed">
                Four ways to take a step toward this church — wherever you are in
                the journey. Pick the one that fits where you actually are, not
                the one that sounds most advanced.
              </p>
            </div>
          </header>

          <ul className="grid sm:grid-cols-2 gap-6">
            {STEPS.map((s) => (
              <li key={s.title}>
                <MinistryRibbon
                  title={s.title}
                  caption={s.caption}
                  description={s.body}
                  href={s.href}
                  external={s.external}
                >
                  <p className="caption text-gilt mt-4 group-hover:text-gilt-deep transition-colors">
                    {s.cta} →
                  </p>
                </MinistryRibbon>
              </li>
            ))}
          </ul>
        </div>
      </main>
      <Footer />
    </>
  );
}

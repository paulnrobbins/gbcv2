/*
 * Statement of Faith — scrollytell.
 *
 * 14 beliefs, each its own "page" in a long-scroll page. A ScopedBibleScene
 * fixed to the right half of the viewport turns pages as the visitor scrolls
 * through the beliefs.
 *
 * Per Better-Solution Audit #3: editorial scrollytell, not a wall of text.
 * Each belief gets generous whitespace, the title in display serif, body
 * in editorial weight, scripture refs as a separate gilt-accented row.
 *
 * Mobile: single column, no scoped Bible (would compete with content).
 * The beliefs read as a clean editorial scroll on mobile.
 */
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';
import { beliefs } from '@/content/beliefs';
import { CHURCH_INFO } from '@/lib/utils';

const ScopedBibleScene = dynamic(
  () =>
    import('@/components/three/ScopedBibleScene').then((m) => m.ScopedBibleScene),
  { ssr: false, loading: () => null }
);

export const metadata = {
  title: 'Statement of Faith',
  description: `What ${CHURCH_INFO.name} believes about Scripture, God, salvation, and the Church.`,
};

export default function BeliefsPage() {
  return (
    <>
      <ScopedBibleScene
        triggerId="beliefs-scroll"
        pageCount={beliefs.length - 1}
      />

      <main className="relative" style={{ zIndex: 'var(--z-content, 10)' }}>
        {/* Intro */}
        <section className="px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap-tight)]">
          <div className="max-w-[var(--page-max)] mx-auto w-full grid md:grid-cols-12 gap-8">
            <header className="md:col-span-7">
              <p className="caption text-ink/55 mb-6">What we believe</p>
              <h1 className="display text-display-2xl text-ink leading-[0.95]">
                Statement<br />of Faith.
              </h1>
              <p className="mt-10 text-body-lg text-ink/75 max-w-xl leading-relaxed">
                Fourteen convictions about Scripture, God, humanity, salvation, the
                Church, and what comes next. Each one rooted in the text — scripture
                references travel alongside, not as footnotes but as the source.
              </p>
            </header>
            <aside className="md:col-span-5 md:pl-8 md:border-l md:border-ink/15 self-end">
              <p className="caption text-ink/55 mb-4">Quick links</p>
              <ul className="space-y-2 text-sm">
                {beliefs.slice(0, 7).map((b) => (
                  <li key={b.number}>
                    <a
                      href={`#belief-${b.number}`}
                      className="text-ink/80 hover:text-gilt transition-colors flex items-baseline gap-3"
                    >
                      <span className="caption text-gilt w-6 text-right">{b.numeral}</span>
                      <span>{b.title}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>

        {/* Scrollytell — each belief its own scroll page */}
        <div id="beliefs-scroll" className="relative">
          {beliefs.map((b, idx) => (
            <article
              key={b.number}
              id={`belief-${b.number}`}
              data-belief-index={idx}
              className="
                relative min-h-screen
                px-[var(--gutter)]
                py-[var(--section-gap)]
                flex items-center
              "
            >
              <div className="max-w-[var(--page-max)] mx-auto w-full grid md:grid-cols-12 gap-8">
                <div className="md:col-span-7 lg:col-span-6 space-y-8">
                  <div className="flex items-baseline gap-6">
                    <span className="display text-display-md text-gilt leading-none">{b.numeral}</span>
                    <span className="caption text-ink/45 pb-2">Belief {b.number} of 14</span>
                  </div>
                  <h2 className="display text-display-xl text-ink leading-[1.05]">
                    {b.title}
                  </h2>
                  <p className="text-body-lg text-ink/80 leading-relaxed max-w-prose">
                    {b.body}
                  </p>
                  <div className="pt-4 border-t border-ink/10">
                    <p className="caption text-ink/50 mb-3">Scripture</p>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2">
                      {b.scriptures.map((s) => (
                        <li
                          key={s}
                          className="scripture text-ink/85 text-lg leading-snug"
                        >
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Outro */}
        <section className="px-[var(--gutter)] py-[var(--section-gap)] bg-ink text-bone grain-overlay relative">
          <div className="max-w-[var(--page-max)] mx-auto w-full grid md:grid-cols-12 gap-8">
            <div className="md:col-span-8">
              <p className="caption text-bone/55 mb-6">If this resonates</p>
              <h2 className="display text-display-xl text-bone leading-[1.02]">
                The doors open Sunday at nine.
              </h2>
              <p className="mt-8 text-body-lg text-bone/75 max-w-xl leading-relaxed">
                The shortest path to knowing what a church actually believes isn&rsquo;t
                a page like this — it&rsquo;s watching what gets taught from the front
                and how the people there talk to each other in the lobby afterward.
                You&rsquo;re welcome to come and check.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Link
                  href="/visit"
                  className="inline-flex items-center gap-3 px-8 py-4 font-body font-medium text-base tracking-wide text-ink bg-gilt hover:bg-gilt-deep transition-colors"
                >
                  Plan a Sunday visit
                </Link>
                <Link
                  href="/sermons"
                  className="inline-flex items-center gap-2 px-5 py-3 text-sm uppercase tracking-widest font-medium text-bone border border-bone/30 hover:border-gilt"
                >
                  Hear what gets taught
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

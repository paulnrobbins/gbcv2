/*
 * Our mission — vision/mission narrative + elder-led governance, no names.
 *
 * Editorial layout. Long-form prose. The tagline drives the heading.
 */
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { CHURCH_INFO } from '@/lib/utils';

export const metadata = {
  title: 'Our mission',
  description: 'The mission and elder-led governance of Grace Bible Church Dayton.',
};

export default function MissionPage() {
  return (
    <>
      <main className="relative min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full">
          <header className="grid md:grid-cols-12 gap-8 mb-[var(--section-gap-tight)]">
            <div className="md:col-span-9">
              <p className="caption text-ink/55 mb-6">Why we exist</p>
              <h1 className="display text-display-2xl text-ink leading-[0.95]">
                Love God.<br />Love people.<br />Impact the world.
              </h1>
            </div>
          </header>

          {/* Body */}
          <div className="grid md:grid-cols-12 gap-12">
            <article className="md:col-span-8 space-y-7 text-body-lg text-ink/85 leading-relaxed max-w-prose">
              <p>
                Three short phrases on the sign outside the building. The same three
                phrases everyone here can recite. They describe the order in which
                a person grows in following Jesus — God first, then people, then the
                world beyond the walls of this room.
              </p>
              <p>
                <strong>Love God</strong> means worship — Sunday morning, sermon-shaped,
                song-shaped, communion-shaped — and also the unglamorous work of reading
                Scripture and praying when no one&rsquo;s watching. It&rsquo;s the
                difference between knowing about God and walking with him.
              </p>
              <p>
                <strong>Love people</strong> happens at every level of the building —
                the nursery, the Sunday school classes, the Grace Groups meeting in
                living rooms, the GriefShare table on Tuesday nights, the meals that
                show up after surgery. Care isn&rsquo;t a program. It&rsquo;s how a
                congregation acts when it remembers that it&rsquo;s a family.
              </p>
              <p>
                <strong>Impact the world</strong> means missions — twenty-three families
                serving on four continents — and it also means the parents in the
                pickup line at Bryan College, the neighbors on the next street, the
                co-worker who only knows you well enough to ask why you go to church.
                You don&rsquo;t have to leave Dayton to be part of this.
              </p>
            </article>

            <aside className="md:col-span-4 md:pl-8 md:border-l md:border-ink/15 space-y-8 self-start sticky top-24">
              <div>
                <p className="caption text-gilt mb-3">Elder-led</p>
                <p className="text-sm text-ink/75 leading-relaxed">
                  A plurality of elders leads this church. The Senior Pastor and the
                  elders work together; the elder board provides accountability,
                  vision, and shepherding. Deacons and Deaconesses serve alongside.
                </p>
              </div>
              <div>
                <p className="caption text-gilt mb-3">Our convictions</p>
                <p className="text-sm text-ink/75 leading-relaxed">
                  Fourteen written beliefs, anchored in scripture, posted publicly.
                </p>
                <Button href="/about/beliefs" variant="inline">
                  Statement of Faith
                </Button>
              </div>
              <div>
                <p className="caption text-gilt mb-3">Want to meet someone?</p>
                <p className="text-sm text-ink/75 leading-relaxed mb-3">
                  Any of the staff will sit down for coffee.
                </p>
                <a
                  href={`mailto:${CHURCH_INFO.email}`}
                  className="caption text-ink/75 hover:text-gilt transition-colors"
                >
                  {CHURCH_INFO.email}
                </a>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

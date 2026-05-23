/*
 * Sermons archive.
 *
 * Server component — pulls the latest 50 uploads from the GBC YouTube
 * channel via Data API. The "load more" interaction would require
 * client state + cursor pagination from playlistItems pageToken — flagged
 * for Phase 5 polish. For now, the first 50 covers ~6 months of weekly
 * sermons, which is enough for the audience the brief named.
 *
 * Failure-silent: if the API key is missing or quota is exhausted, the
 * page renders a "watch on YouTube" CTA instead of an empty grid.
 */
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { SermonCard } from '@/components/ui/SermonCard';
import { fetchRecentSermons } from '@/lib/youtube';
import { CHURCH_INFO } from '@/lib/utils';

export const metadata = {
  title: 'Sermons',
  description: 'Sermon archive from Grace Bible Church Dayton — verse-by-verse expository teaching from Sunday morning worship.',
};

export const revalidate = 1800; // 30 min — same as YOUTUBE_SERMONS_REVALIDATE

export default async function SermonsPage() {
  const sermons = await fetchRecentSermons(50);

  return (
    <>
      <main className="relative min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full">
          <header className="grid md:grid-cols-12 gap-8 mb-[var(--section-gap-tight)]">
            <div className="md:col-span-8">
              <p className="caption text-ink/55 mb-6">Sermon archive</p>
              <h1 className="display text-display-2xl text-ink leading-[0.95]">
                Sermons.
              </h1>
              <p className="mt-10 text-body-lg text-ink/75 max-w-xl leading-relaxed">
                Verse by verse. Book by book. Every Sunday at {' '}
                <span className="text-ink">10:30 AM</span>, recorded and posted to
                YouTube. Browse the last six months below; the full archive lives
                on the channel.
              </p>
            </div>
            <aside className="md:col-span-4 md:pl-8 md:border-l md:border-ink/15 self-end">
              <Button href={CHURCH_INFO.youtubeChannelUrl} variant="ghost" external>
                Full channel on YouTube
              </Button>
            </aside>
          </header>

          {sermons.length > 0 ? (
            <ul
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
              aria-label={`${sermons.length} recent sermons`}
            >
              {sermons.map((s) => (
                <li key={s.id}>
                  <SermonCard sermon={s} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="py-20 max-w-xl">
              <p className="display text-display-md text-ink leading-tight mb-6">
                The full archive lives on YouTube.
              </p>
              <p className="text-body-lg text-ink/70 leading-relaxed mb-8">
                We&rsquo;re working on the in-site sermon library — for now, every
                Sunday sermon is posted to the GBC channel right after the service.
              </p>
              <Button href={CHURCH_INFO.youtubeChannelUrl} variant="gilt" external>
                Open the channel
              </Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

/*
 * Live page — auto-detects YouTube live state.
 *
 * Server-fetches the live video id via YouTube Data API (cached 2 minutes).
 * If live: embed the player full-bleed inside a leather-bound frame.
 * If not live: countdown to next Sunday 10:30 AM + link to YouTube channel
 * + last recorded sermon as a fallback link.
 *
 * The countdown is computed server-side at request time. The 2-minute ISR
 * window means the page is fresh enough to swap from "next Sunday at 10:30"
 * to "live now" within a few minutes of the stream starting.
 */
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { fetchIsLive, fetchLatestSermon } from '@/lib/youtube';
import { CHURCH_INFO, SERVICE_TIMES } from '@/lib/utils';

export const metadata = {
  title: 'Live',
  description: 'Watch Sunday worship live at Grace Bible Church Dayton — every Sunday at 10:30 AM.',
};

export const revalidate = 120; // 2 min — same as YOUTUBE_LIVE_REVALIDATE

function getNextSundayMorning(): Date {
  const now = new Date();
  const d = new Date(now);
  // 0 = Sunday; targetHour = 10, targetMinute = 30 ET (we don't time-zone-correct
  // here — server clock is UTC on Vercel; a precise visitor-time countdown would
  // require client-side computation. This server-side approximation is good
  // enough for the "next Sunday" headline; client-side countdown is a Phase 5 polish.)
  const daysUntilSunday = (7 - d.getDay()) % 7;
  // If today IS Sunday and it's before 10:30, point to today; otherwise next Sunday
  if (daysUntilSunday === 0 && (d.getHours() < 10 || (d.getHours() === 10 && d.getMinutes() < 30))) {
    d.setHours(10, 30, 0, 0);
    return d;
  }
  d.setDate(d.getDate() + (daysUntilSunday || 7));
  d.setHours(10, 30, 0, 0);
  return d;
}

export default async function LivePage() {
  const [liveVideoId, latestSermon] = await Promise.all([
    fetchIsLive(),
    fetchLatestSermon(),
  ]);

  if (liveVideoId) {
    return <LiveNow videoId={liveVideoId} />;
  }

  const next = getNextSundayMorning();
  const nextLabel = next.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <main className="relative min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)] bg-ink text-bone grain-overlay">
        <div className="max-w-[var(--page-max)] mx-auto w-full">
          <header className="grid md:grid-cols-12 gap-8 mb-[var(--section-gap-tight)]">
            <div className="md:col-span-8">
              <p className="caption text-bone/55 mb-6">Sunday worship live</p>
              <h1 className="display text-display-2xl text-bone leading-[0.95]">
                Next service:<br />
                <span className="text-gilt">{nextLabel}</span>
              </h1>
              <p className="mt-10 text-body-lg text-bone/75 max-w-xl leading-relaxed">
                Every Sunday at <span className="text-gilt">{SERVICE_TIMES.worshipTime}</span>{' '}
                Eastern. The stream goes live a few minutes before the service starts
                and stays up afterward as a recording.
              </p>
              <div className="mt-10 flex flex-wrap gap-3">
                <Button href={`${CHURCH_INFO.youtubeChannelUrl}/live`} variant="gilt" external>
                  Open YouTube live
                </Button>
                <Button href="/sermons" variant="ghost">Past sermons</Button>
              </div>
            </div>
          </header>

          {latestSermon ? (
            <section className="mt-20 pt-12 border-t border-bone/15">
              <p className="caption text-bone/50 mb-4">Most recent sermon</p>
              <a
                href={`https://www.youtube.com/watch?v=${latestSermon.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  group inline-block max-w-xl
                  transition-transform duration-300 ease-editorial
                  hover:-translate-y-1
                "
              >
                {latestSermon.thumbnailUrl ? (
                  <div className="relative aspect-video overflow-hidden border border-bone/15 mb-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={latestSermon.thumbnailUrl}
                      alt=""
                      loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  </div>
                ) : null}
                <p className="display text-display-md text-bone leading-tight group-hover:text-gilt transition-colors">
                  {latestSermon.title}
                </p>
              </a>
            </section>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  );
}

function LiveNow({ videoId }: { videoId: string }) {
  return (
    <>
      <main className="relative min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)] bg-ink text-bone grain-overlay">
        <div className="max-w-[var(--page-max)] mx-auto w-full">
          <header className="grid md:grid-cols-12 gap-8 mb-12">
            <div className="md:col-span-8">
              <p className="caption text-gilt mb-6 inline-flex items-center gap-3">
                <span className="block w-2 h-2 rounded-full bg-gilt animate-pulse" aria-hidden />
                Live now
              </p>
              <h1 className="display text-display-2xl text-bone leading-[0.95]">
                Sunday worship.
              </h1>
            </div>
          </header>

          <div className="relative aspect-video w-full border border-bone/15 bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
              title="Grace Bible Church — live stream"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>

          <p className="mt-8 text-sm text-bone/55 max-w-xl leading-relaxed">
            Trouble loading? Open directly on{' '}
            <a
              href={`https://www.youtube.com/watch?v=${videoId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gilt hover:underline"
            >
              YouTube
            </a>
            .
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

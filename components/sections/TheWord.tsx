/*
 * Scene 3 — The Word
 *
 * Phase 4a: scripture data comes from /content/scripture/current.json,
 * sermon series + latest sermon come from YouTube Data API.
 * Both fetched server-side in app/page.tsx and passed as props.
 *
 * Semi-transparent ink veil so the 3D gilded scripture (rendered in the
 * Canvas behind) reads against a darkened backdrop. The HTML scripture
 * quote serves as reduced-motion / low-tier fallback.
 */
import { Button } from '@/components/ui/Button';
import type { YouTubeVideo } from '@/types';

interface TheWordProps {
  scriptureRef: string;
  scriptureText: string;
  scriptureTranslation: string;
  seriesTitle: string;
  seriesSubtitle: string;
  latestSermon: YouTubeVideo | null;
}

export function TheWord({
  scriptureRef,
  scriptureText,
  scriptureTranslation,
  seriesTitle,
  seriesSubtitle,
  latestSermon,
}: TheWordProps) {
  return (
    <section
      data-scene="the-word"
      aria-label="This week at Grace Bible Church"
      className="
        relative min-h-screen flex items-center
        px-[var(--gutter)]
        py-[var(--section-gap)]
        text-bone grain-overlay
      "
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{ background: 'rgba(26, 20, 16, 0.78)' }}
      />

      <div className="relative max-w-[var(--page-max)] mx-auto w-full grid md:grid-cols-12 gap-12 items-center">
        <div className="md:col-span-7">
          <p className="caption text-bone/50 mb-6">This week</p>
          <blockquote className="scripture text-display-md md:text-display-lg text-bone leading-[1.15]">
            &ldquo;{scriptureText}&rdquo;
          </blockquote>
          <p className="mt-6 caption text-gilt">
            {scriptureRef}{' '}
            <span className="text-bone/40 ml-2">{scriptureTranslation}</span>
          </p>
        </div>

        <div className="md:col-span-5 md:pl-8 md:border-l md:border-bone/15 space-y-6">
          <div>
            <p className="caption text-bone/50 mb-3">Currently teaching</p>
            <p className="display text-display-md text-bone leading-tight">{seriesTitle}</p>
            <p className="mt-2 text-sm text-bone/65">{seriesSubtitle}</p>
          </div>

          {latestSermon ? (
            <a
              href={`https://www.youtube.com/watch?v=${latestSermon.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="
                group block relative aspect-video overflow-hidden
                border border-bone/15 hover:border-gilt
                transition-colors duration-200 ease-gilt
              "
            >
              {latestSermon.thumbnailUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img
                  src={latestSermon.thumbnailUrl}
                  alt={latestSermon.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              ) : null}
              <div
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(26,20,16,0.85) 0%, transparent 60%)' }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="caption text-gilt mb-1">Latest sermon</p>
                <p className="text-sm text-bone leading-tight line-clamp-2">{latestSermon.title}</p>
              </div>
            </a>
          ) : (
            <div className="aspect-video bg-ink-soft border border-bone/10 flex items-center justify-center">
              <span className="caption text-bone/40">Latest sermon</span>
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <Button href="/live" variant="gilt">Watch live Sunday</Button>
            <Button href="/sermons" variant="ghost">Sermon archive</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

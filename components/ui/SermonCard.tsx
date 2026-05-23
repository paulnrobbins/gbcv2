/*
 * Sermon card — page-edge metaphor for the YouTube sermon archive.
 *
 * Each card is treated like the edge of a turned page poking out of a
 * stack. Date as caption, title as display headline, thumbnail as the
 * page interior visible when hovered. Click opens YouTube in a new tab.
 */
import { cn } from '@/lib/utils';
import type { YouTubeVideo } from '@/types';

interface SermonCardProps {
  sermon: YouTubeVideo;
  className?: string;
}

function formatPublishedDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  } catch {
    return '';
  }
}

export function SermonCard({ sermon, className }: SermonCardProps) {
  const href = `https://www.youtube.com/watch?v=${sermon.id}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'group block relative bg-bone border-l-2 border-gilt overflow-hidden',
        'shadow-[0_1px_0_rgba(26,20,16,0.04)]',
        'transition-transform duration-300 ease-editorial',
        'hover:-translate-y-1',
        className
      )}
    >
      {sermon.thumbnailUrl ? (
        <div className="relative aspect-video overflow-hidden bg-bone-warm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={sermon.thumbnailUrl}
            alt=""
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div
            aria-hidden
            className="absolute inset-0 mix-blend-overlay"
            style={{ background: 'rgba(200, 150, 74, 0.08)' }}
          />
        </div>
      ) : null}
      <div className="p-5 space-y-2">
        <p className="caption text-gilt">{formatPublishedDate(sermon.publishedAt)}</p>
        <p className="display text-xl text-ink leading-snug line-clamp-3">{sermon.title}</p>
      </div>
    </a>
  );
}

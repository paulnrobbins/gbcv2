/*
 * Bookmark-ribbon styled card — echoes the homepage Scene 5 ribbons in HTML.
 * Used in the Ministries directory + Grace Groups grid.
 *
 * Visual: thin gilt left border (the ribbon's stitched edge), warm-cream
 * surface, slight lift on hover (the ribbon lifts off the page).
 */
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MinistryRibbonProps {
  title: string;
  caption?: string;
  description?: string;
  href?: string;
  external?: boolean;
  meta?: string;
  className?: string;
  children?: React.ReactNode;
}

export function MinistryRibbon({
  title,
  caption,
  description,
  href,
  external,
  meta,
  className,
  children,
}: MinistryRibbonProps) {
  const inner = (
    <div
      className={cn(
        'group relative h-full p-6 md:p-7',
        'bg-bone border-l-2 border-gilt',
        'shadow-[0_1px_0_rgba(26,20,16,0.04)]',
        'transition-transform duration-300 ease-editorial',
        href && 'hover:-translate-y-1 cursor-pointer',
        className
      )}
    >
      {caption ? <p className="caption text-gilt mb-3">{caption}</p> : null}
      <p className="display text-display-md text-ink leading-tight mb-3">{title}</p>
      {description ? (
        <p className="text-sm text-ink/70 leading-relaxed mb-4 line-clamp-4">
          {description}
        </p>
      ) : null}
      {meta ? <p className="caption text-ink/55">{meta}</p> : null}
      {children}
    </div>
  );

  if (!href) return inner;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="block h-full">
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className="block h-full">
      {inner}
    </Link>
  );
}

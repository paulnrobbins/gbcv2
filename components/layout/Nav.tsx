/*
 * Navigation chrome.
 *
 * Minimal page-margin treatment per Editorial Reverence direction.
 * Visible on all routes; transparent over hero scene; tints in over content
 * sections (handled in Phase 3 via scroll-driven state).
 */
'use client';

import Link from 'next/link';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '/visit', label: 'Visit' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/ministries', label: 'Ministries' },
  { href: '/missions', label: 'Missions' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/about/beliefs', label: 'About' },
];

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      <div className="max-w-[var(--page-max)] mx-auto px-[var(--gutter)] pt-4 pb-3 flex items-center justify-between">
        {/* Wordmark — replaces image logo until SVG is dropped in /public */}
        <Link
          href="/"
          className="pointer-events-auto display text-base tracking-widest uppercase text-ink/90 hover:text-ink transition-colors"
          aria-label="Grace Bible Church — home"
        >
          Grace Bible Church
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7 pointer-events-auto">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="caption text-ink/70 hover:text-ink transition-colors"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/give"
            className="ml-2 px-4 py-1.5 text-xs uppercase tracking-widest font-medium bg-gilt text-ink hover:bg-gilt-deep transition-colors"
          >
            Give
          </Link>
        </nav>

        {/* Mobile menu trigger */}
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden pointer-events-auto p-2 -m-2 text-ink"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
            {mobileOpen ? (
              <>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="7" x2="21" y2="7" />
                <line x1="3" y1="17" x2="21" y2="17" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-bone/95 backdrop-blur-md',
          'pointer-events-auto border-t border-ink/10',
          'transition-[transform,opacity] duration-300 ease-editorial origin-top',
          mobileOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2 pointer-events-none'
        )}
      >
        <nav className="flex flex-col py-4 px-[var(--gutter)] gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobileOpen(false)}
              className="py-3 caption text-ink/80 hover:text-ink border-b border-ink/5 last:border-b-0"
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/give"
            onClick={() => setMobileOpen(false)}
            className="mt-3 inline-flex w-fit px-5 py-2 text-xs uppercase tracking-widest font-medium bg-gilt text-ink"
          >
            Give
          </Link>
        </nav>
      </div>
    </header>
  );
}

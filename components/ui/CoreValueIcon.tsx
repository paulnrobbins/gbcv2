/*
 * Custom line-icons for the four Core Values, drawn in the gilt accent.
 *
 * Per Better-Solution Audit #6: replaces the original pink/blue/teal/lime
 * values graphic with cohesive editorial line-icons in the brand palette.
 *
 * Icons are inline SVG — no external dependencies, scales to any size,
 * uses currentColor so a parent's color class controls the stroke.
 */
import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
  strokeWidth?: number;
}

const baseSvg = (size: number = 64) =>
  ({
    width: size,
    height: size,
    viewBox: '0 0 64 64',
    fill: 'none',
    stroke: 'currentColor',
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    role: 'img',
    'aria-hidden': true,
  }) as const;

export function TeachTheWordIcon({ className, strokeWidth = 1.25 }: IconProps) {
  // Open book glyph
  return (
    <svg {...baseSvg()} className={cn(className)}>
      <title>Teach the Word</title>
      <path d="M8 16c8-4 16-4 24 0v34c-8-4-16-4-24 0V16z" strokeWidth={strokeWidth} />
      <path d="M56 16c-8-4-16-4-24 0v34c8-4 16-4 24 0V16z" strokeWidth={strokeWidth} />
      <path d="M32 16v34" strokeWidth={strokeWidth} />
      <path d="M14 24h10M14 30h10M14 36h10" strokeWidth={strokeWidth * 0.8} />
      <path d="M40 24h10M40 30h10M40 36h10" strokeWidth={strokeWidth * 0.8} />
    </svg>
  );
}

export function CareForEachOtherIcon({ className, strokeWidth = 1.25 }: IconProps) {
  // Two figures clasping hands
  return (
    <svg {...baseSvg()} className={cn(className)}>
      <title>Care for each other</title>
      <circle cx="20" cy="20" r="6" strokeWidth={strokeWidth} />
      <circle cx="44" cy="20" r="6" strokeWidth={strokeWidth} />
      <path d="M10 50c0-7 4-12 10-12s10 5 10 12" strokeWidth={strokeWidth} />
      <path d="M34 50c0-7 4-12 10-12s10 5 10 12" strokeWidth={strokeWidth} />
      <path d="M28 38l4 4 4-4" strokeWidth={strokeWidth} />
    </svg>
  );
}

export function WorshipTheLordIcon({ className, strokeWidth = 1.25 }: IconProps) {
  // Stylized open hands lifted upward + small flame above
  return (
    <svg {...baseSvg()} className={cn(className)}>
      <title>Worship the Lord</title>
      <path d="M14 40c0-3 2-5 5-5s5 2 5 5v8" strokeWidth={strokeWidth} />
      <path d="M40 40c0-3 2-5 5-5s5 2 5 5v8" strokeWidth={strokeWidth} />
      <path d="M24 36V18M40 36V18" strokeWidth={strokeWidth} />
      <path d="M28 22c0-3 2-5 4-5s4 2 4 5" strokeWidth={strokeWidth} />
      <path d="M32 14c-2-2-2-5 0-7 2 2 2 5 0 7z" strokeWidth={strokeWidth} />
    </svg>
  );
}

export function ShareTheGospelIcon({ className, strokeWidth = 1.25 }: IconProps) {
  // Globe + radiating lines
  return (
    <svg {...baseSvg()} className={cn(className)}>
      <title>Share the Gospel</title>
      <circle cx="32" cy="32" r="14" strokeWidth={strokeWidth} />
      <path d="M18 32h28" strokeWidth={strokeWidth} />
      <path d="M32 18c5 6 5 22 0 28M32 18c-5 6-5 22 0 28" strokeWidth={strokeWidth} />
      <path d="M8 8l8 8M56 8l-8 8M8 56l8-8M56 56l-8-8" strokeWidth={strokeWidth * 0.9} />
    </svg>
  );
}

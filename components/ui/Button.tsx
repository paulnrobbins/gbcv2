/*
 * Primary CTA primitive — gilt accent button.
 *
 * Three variants:
 *   gilt    — primary action (Plan a Visit, Send a connection card, etc.)
 *   ghost   — secondary (Watch the sermon, Full calendar)
 *   inline  — text-link weight for low-emphasis actions
 *
 * Always specific, brand-toned copy as children — never "Learn More" or
 * "Get Started" per Anti-AI-Tell Gate.
 */
'use client';

import Link from 'next/link';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { cn } from '@/lib/utils';

type Variant = 'gilt' | 'ghost' | 'inline';

interface BaseProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

interface AsLinkProps extends BaseProps {
  href: string;
  external?: boolean;
}
interface AsButtonProps extends BaseProps, Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> {
  href?: undefined;
}

const VARIANT_CLASSES: Record<Variant, string> = {
  gilt:
    'inline-flex items-center gap-3 px-8 py-4 font-body font-medium text-base tracking-wide ' +
    'text-ink bg-gilt hover:bg-gilt-deep transition-colors duration-200 ease-gilt ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ink',
  ghost:
    'inline-flex items-center gap-2 px-5 py-3 font-body font-medium text-sm tracking-wider uppercase ' +
    'text-ink border border-ink/20 hover:border-ink/60 transition-colors duration-200 ease-gilt ' +
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gilt',
  inline:
    'inline-flex items-baseline gap-2 font-body font-medium text-base text-ink underline underline-offset-4 ' +
    'decoration-gilt decoration-2 hover:decoration-ink transition-colors duration-150',
};

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, AsLinkProps | AsButtonProps>(
  function Button(props, ref) {
    const { variant = 'gilt', className, children } = props;
    const classes = cn(VARIANT_CLASSES[variant], className);

    if ('href' in props && props.href !== undefined) {
      const { href, external } = props;
      if (external) {
        return (
          <a
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={classes}
            target="_blank"
            rel="noopener noreferrer"
          >
            {children}
          </a>
        );
      }
      return (
        <Link ref={ref as React.Ref<HTMLAnchorElement>} href={href} className={classes}>
          {children}
        </Link>
      );
    }

    const { variant: _v, className: _c, children: _ch, ...buttonProps } = props as AsButtonProps;
    return (
      <button ref={ref as React.Ref<HTMLButtonElement>} className={classes} {...buttonProps}>
        {children}
      </button>
    );
  }
);

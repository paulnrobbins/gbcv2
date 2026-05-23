/*
 * 404 — on-brand inside the Bible-as-architecture metaphor.
 *
 * The visitor walked into a section of the book that hasn't been written.
 */
import Link from 'next/link';
import { Footer } from '@/components/layout/Footer';

export default function NotFound() {
  return (
    <>
      <main className="min-h-[80vh] flex items-center px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full grid md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-8">
            <p className="caption text-ink/55 mb-6">Page not found</p>
            <h1 className="display text-display-2xl text-ink leading-[0.95]">
              This page<br />hasn&rsquo;t been<br />written yet.
            </h1>
          </div>
          <div className="md:col-span-4 md:pl-8 md:border-l md:border-ink/15 space-y-5">
            <p className="text-ink/70 leading-relaxed">
              Or it has, and we&rsquo;ve moved it. Either way, the front door is open.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-3 px-8 py-4 font-body font-medium text-base tracking-wide text-ink bg-gilt hover:bg-gilt-deep transition-colors duration-200"
            >
              Back to the start
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

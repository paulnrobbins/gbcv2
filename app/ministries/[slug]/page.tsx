/*
 * Per-ministry detail page.
 *
 * Server component — reads the ministry by slug at request time.
 * If the slug isn't found, returns 404.
 *
 * Layout: single-column editorial. Tagline + title + full description.
 * Optional meta sidebar (meeting time, location, age range, contact).
 */
import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { ministries } from '@/content/ministries/ministries';

interface PageProps {
  params: { slug: string };
}

function findMinistry(slug: string) {
  return ministries.find((m) => m.slug === slug) ?? null;
}

export async function generateStaticParams() {
  return ministries.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const m = findMinistry(params.slug);
  if (!m) return { title: 'Ministry' };
  return {
    title: m.title,
    description: m.shortDescription,
  };
}

export default function MinistryDetailPage({ params }: PageProps) {
  const m = findMinistry(params.slug);
  if (!m) return notFound();

  return (
    <>
      <main className="relative min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full">
          {/* Back link */}
          <Link
            href="/ministries"
            className="caption text-ink/55 hover:text-gilt transition-colors inline-flex items-center gap-2 mb-8"
          >
            <span aria-hidden>←</span>
            <span>All ministries</span>
          </Link>

          <div className="grid md:grid-cols-12 gap-12">
            {/* Body */}
            <article className="md:col-span-8 space-y-8">
              <header className="space-y-5">
                <p className="caption text-gilt">{m.ageRange ?? m.season ?? m.category}</p>
                <h1 className="display text-display-2xl text-ink leading-[0.95]">
                  {m.title}
                </h1>
                <p className="text-body-lg text-ink/80 max-w-xl leading-relaxed">
                  {m.shortDescription}
                </p>
              </header>

              <div className="prose-like space-y-5 text-body text-ink/85 max-w-2xl leading-relaxed">
                {m.fullDescription.split(/\n\n+/).map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {m.contact?.email ? (
                <div className="pt-6">
                  <Button href={`mailto:${m.contact.email}`} variant="gilt" external>
                    Email {m.contact.name ?? 'the ministry lead'}
                  </Button>
                </div>
              ) : null}
            </article>

            {/* Meta sidebar */}
            <aside className="md:col-span-4 md:pl-8 md:border-l md:border-ink/10 space-y-7 self-start sticky top-24">
              {m.meetingTime ? (
                <Meta caption="When" body={m.meetingTime} />
              ) : null}
              {m.location ? <Meta caption="Where" body={m.location} /> : null}
              {m.season ? <Meta caption="Season" body={m.season} /> : null}
              {m.ageRange ? <Meta caption="For" body={m.ageRange} /> : null}
              {m.contact?.name ? (
                <Meta caption="Lead" body={m.contact.name} />
              ) : null}
              {m.contact?.phone ? (
                <Meta caption="Call" body={m.contact.phone} link={`tel:${m.contact.phone.replace(/\D/g, '')}`} />
              ) : null}
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function Meta({ caption, body, link }: { caption: string; body: string; link?: string }) {
  const content = (
    <>
      <p className="caption text-ink/50 mb-2">{caption}</p>
      <p className="text-ink/85 text-body leading-snug">{body}</p>
    </>
  );
  if (link) {
    return (
      <a href={link} className="block hover:text-gilt transition-colors">
        {content}
      </a>
    );
  }
  return <div>{content}</div>;
}

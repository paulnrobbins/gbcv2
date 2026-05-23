/*
 * Leadership — 6 staff with circle-crop headshots, names + titles + emails.
 *
 * Initials placeholder until headshots ship into /public/photos/staff/.
 * Governance narrative (elder-led / deacon / deaconess) sits above the
 * staff grid as a single tight paragraph.
 */
import Image from 'next/image';
import { Footer } from '@/components/layout/Footer';
import { staff, type StaffMember } from '@/content/staff';
import { cn } from '@/lib/utils';

export const metadata = {
  title: 'Leadership',
  description: 'The pastoral and administrative staff serving Grace Bible Church alongside the elder board.',
};

export default function LeadershipPage() {
  return (
    <>
      <main className="relative min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full">
          <header className="grid md:grid-cols-12 gap-8 mb-[var(--section-gap-tight)]">
            <div className="md:col-span-8">
              <p className="caption text-ink/55 mb-6">Pastoral + ministry staff</p>
              <h1 className="display text-display-2xl text-ink leading-[0.95]">
                Leadership.
              </h1>
              <p className="mt-10 text-body-lg text-ink/80 max-w-xl leading-relaxed">
                Grace Bible Church is led by a plurality of elders. Pastoral and
                administrative staff carry the day-to-day work alongside the elder
                board, deacons, and deaconesses — visible week to week, never alone.
                Reach any of them directly.
              </p>
            </div>
          </header>

          {/* Staff grid */}
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14">
            {staff.map((person) => (
              <li key={person.slug}>
                <StaffPortrait person={person} />
              </li>
            ))}
          </ul>

          {/* Governance + constitution note */}
          <section className="mt-[var(--section-gap)] pt-12 border-t border-ink/10 grid md:grid-cols-12 gap-8">
            <div className="md:col-span-7">
              <p className="caption text-ink/55 mb-4">Church governance</p>
              <p className="text-body-lg text-ink/80 max-w-xl leading-relaxed">
                The Senior Pastor and the elder board lead together. Other boards
                include Deacons and Deaconesses. Staff serve under elder oversight,
                sharing the day-to-day work of teaching, care, and administration.
              </p>
            </div>
            <aside className="md:col-span-4 md:col-start-9 md:pl-8 md:border-l md:border-ink/15">
              <p className="caption text-gilt mb-3">Request the constitution</p>
              <p className="text-sm text-ink/70 leading-relaxed mb-4">
                For the full church constitution — including governance structure,
                membership requirements, and elder qualifications — contact the office.
              </p>
              <a
                href="mailto:office@gbcdayton.org?subject=Church%20constitution%20request"
                className="caption text-ink/75 hover:text-gilt transition-colors"
              >
                office@gbcdayton.org
              </a>
            </aside>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function StaffPortrait({ person }: { person: StaffMember }) {
  const initials = person.name
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div>
      <figure
        className={cn(
          'relative w-40 h-40 mx-auto sm:mx-0 mb-6 rounded-full overflow-hidden',
          'bg-bone-warm border border-ink/10 flex items-center justify-center'
        )}
      >
        {person.photoPath ? (
          <Image
            src={person.photoPath}
            alt={`${person.name} — ${person.title}`}
            fill
            className="object-cover"
            sizes="160px"
          />
        ) : (
          <span
            aria-hidden
            className="display text-[3.5rem] text-ink/12 leading-none select-none"
          >
            {initials}
          </span>
        )}
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{ background: 'rgba(200, 150, 74, 0.06)' }}
          aria-hidden
        />
      </figure>
      <div className="text-center sm:text-left space-y-1">
        <h2 className="display text-display-md text-ink leading-tight">{person.name}</h2>
        <p className="text-sm text-ink/65">{person.title}</p>
        <a
          href={`mailto:${person.email}`}
          className="inline-block caption text-gilt hover:text-gilt-deep transition-colors mt-2"
        >
          {person.email}
        </a>
      </div>
    </div>
  );
}

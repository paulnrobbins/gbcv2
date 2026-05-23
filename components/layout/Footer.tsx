/*
 * Footer — bookmark-ribbon styled per Scene 7 of the scroll score.
 *
 * The "ribbon" treatment in Phase 2 ships as a clean editorial footer; the
 * full ribbon-physics version with sway lands in Phase 3 alongside the
 * Bible scene. Information architecture is identical.
 */
import Link from 'next/link';
import { CHURCH_INFO, SERVICE_TIMES } from '@/lib/utils';

const FOOTER_LINKS = [
  { href: '/visit', label: 'Plan a visit' },
  { href: '/sermons', label: 'Sermons' },
  { href: '/ministries', label: 'Ministries' },
  { href: '/missions', label: 'Missions' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/grace-groups', label: 'Grace Groups' },
  { href: '/next-steps', label: 'Next steps' },
  { href: '/about/beliefs', label: 'Statement of Faith' },
  { href: '/about/leadership', label: 'Leadership' },
  { href: '/about/mission', label: 'Our mission' },
  { href: '/contact', label: 'Contact' },
];

export function Footer() {
  return (
    <footer className="relative bg-ink text-bone pt-[var(--section-gap-tight)] pb-12">
      <div className="max-w-[var(--page-max)] mx-auto px-[var(--gutter)] grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
        {/* Identity column */}
        <div className="space-y-5">
          <p className="display text-display-md leading-tight text-bone">
            {CHURCH_INFO.tagline}
          </p>
          <div className="space-y-1 text-sm text-bone/75 leading-relaxed">
            <p>{CHURCH_INFO.addressShort}</p>
            <p>{CHURCH_INFO.cityState}</p>
            <p className="pt-2">
              <a href={`tel:${CHURCH_INFO.phoneTel}`} className="hover:text-gilt transition-colors">
                {CHURCH_INFO.phone}
              </a>
            </p>
            <p>
              <a href={`mailto:${CHURCH_INFO.email}`} className="hover:text-gilt transition-colors">
                {CHURCH_INFO.email}
              </a>
            </p>
          </div>
        </div>

        {/* Service times column */}
        <div className="space-y-3">
          <p className="caption text-bone/55">{SERVICE_TIMES.day}</p>
          <ul className="space-y-2 text-sm text-bone/85">
            <li>
              <span className="text-gilt">{SERVICE_TIMES.sundaySchoolTime}</span>{' '}
              {SERVICE_TIMES.sundaySchoolLabel}
            </li>
            <li>
              <span className="text-gilt">{SERVICE_TIMES.worshipTime}</span>{' '}
              {SERVICE_TIMES.worshipLabel}
            </li>
          </ul>
          <p className="pt-3 text-xs text-bone/55 leading-relaxed max-w-xs">
            {CHURCH_INFO.accessibilityNote}
          </p>
        </div>

        {/* Sitemap column */}
        <nav aria-label="Footer navigation" className="space-y-2 text-sm">
          {FOOTER_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-bone/75 hover:text-gilt transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="max-w-[var(--page-max)] mx-auto mt-12 px-[var(--gutter)] pt-6 border-t border-bone/10 flex flex-col md:flex-row gap-3 justify-between text-xs text-bone/50">
        <p>© {new Date().getFullYear()} {CHURCH_INFO.name}</p>
        <div className="flex gap-5">
          <a href={CHURCH_INFO.facebookUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gilt">
            Facebook
          </a>
          <a href={CHURCH_INFO.youtubeChannelUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gilt">
            YouTube
          </a>
        </div>
      </div>
    </footer>
  );
}

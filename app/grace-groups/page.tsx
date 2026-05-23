/*
 * Grace Groups — 5-card grid with circle-cropped leader photos.
 *
 * Per Better-Solution Audit #5: keep the Fellowship Bible card-grid pattern,
 * elevate with warm-grain photo treatment + editorial typography. Single
 * Contact Pastor Dave CTA at the bottom — no form.
 */
import Image from 'next/image';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import {
  graceGroups,
  GRACE_GROUPS_CONTACT_EMAIL,
  GRACE_GROUPS_CONTACT_NAME,
} from '@/content/grace-groups/grace-groups';

export const metadata = {
  title: 'Grace Groups',
  description: 'Small groups that meet in homes around Dayton for Bible study, prayer, and life together.',
};

export default function GraceGroupsPage() {
  return (
    <>
      <main className="relative min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full">
          <header className="grid md:grid-cols-12 gap-8 mb-[var(--section-gap-tight)]">
            <div className="md:col-span-8">
              <p className="caption text-ink/55 mb-6">Small groups in homes</p>
              <h1 className="display text-display-2xl text-ink leading-[0.95]">
                Grace Groups.
              </h1>
              <p className="mt-10 text-body-lg text-ink/75 max-w-xl leading-relaxed">
                Five groups meet around Dayton in homes (and one at the Annex) for Bible
                study, prayer, a meal, and the rhythm of life lived alongside other people
                who follow Jesus. Most groups review the previous Sunday&rsquo;s sermon
                together. Childcare is generally available — ask the host.
              </p>
            </div>
          </header>

          {/* Card grid */}
          <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {graceGroups.map((g) => (
              <li key={g.slug} className="space-y-5">
                <figure className="relative w-44 h-44 mx-auto md:mx-0 rounded-full overflow-hidden bg-bone-warm">
                  {g.photoPath ? (
                    <Image
                      src={g.photoPath}
                      alt={`${g.leaderName} — Grace Group leaders`}
                      fill
                      className="object-cover"
                      sizes="176px"
                    />
                  ) : null}
                  <div
                    className="absolute inset-0 mix-blend-overlay"
                    style={{ background: 'rgba(200, 150, 74, 0.10)' }}
                  />
                </figure>
                <div className="text-center md:text-left space-y-2">
                  <h2 className="display text-display-md text-ink leading-tight">
                    {g.leaderName}
                  </h2>
                  {g.meetingNight ? (
                    <p className="caption text-gilt">{g.meetingNight}</p>
                  ) : null}
                  {g.generalLocation ? (
                    <p className="text-sm text-ink/65">{g.generalLocation}</p>
                  ) : null}
                  {g.blurb ? (
                    <p className="text-sm text-ink/75 leading-relaxed pt-2">{g.blurb}</p>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>

          {/* Contact CTA */}
          <section className="mt-[var(--section-gap)] py-12 border-t border-ink/10">
            <div className="grid md:grid-cols-12 gap-8 items-start">
              <div className="md:col-span-7">
                <p className="caption text-ink/55 mb-4">Want to join a group?</p>
                <h2 className="display text-display-xl text-ink leading-[1.05]">
                  Send a note. We&rsquo;ll match you with a group.
                </h2>
                <p className="mt-6 text-body-lg text-ink/75 max-w-xl leading-relaxed">
                  No form, no signup wall — just an email to {GRACE_GROUPS_CONTACT_NAME}.
                  Tell him a little about your schedule and what part of town you&rsquo;re
                  in, and he&rsquo;ll suggest the group that fits.
                </p>
              </div>
              <div className="md:col-span-5 md:pl-8 md:border-l md:border-ink/15">
                <Button
                  href={`mailto:${GRACE_GROUPS_CONTACT_EMAIL}?subject=Grace%20Groups%20interest`}
                  variant="gilt"
                  external
                >
                  Contact {GRACE_GROUPS_CONTACT_NAME.split(' ').slice(0, 2).join(' ')}
                </Button>
                <p className="caption text-ink/50 mt-4">
                  {GRACE_GROUPS_CONTACT_EMAIL}
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

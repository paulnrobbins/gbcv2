/*
 * Core Values — four convictions expanded with custom line-icons.
 *
 * Per Better-Solution Audit #6: replaces the original disconnected
 * pink/blue/teal/lime icon set with cohesive gilt-accent line-icons,
 * displayed at editorial scale alongside an expanded paragraph for each.
 */
import { Footer } from '@/components/layout/Footer';
import type { ComponentType } from 'react';
import {
  TeachTheWordIcon,
  CareForEachOtherIcon,
  WorshipTheLordIcon,
  ShareTheGospelIcon,
} from '@/components/ui/CoreValueIcon';

interface CoreValue {
  label: string;
  Icon: ComponentType<{ className?: string; strokeWidth?: number }>;
  body: string;
}

// Explicitly typed (not `as const`) — keeps the JSX <v.Icon /> call site happy
// in strict mode, since TS needs a single component signature, not a union of
// literal types.
const VALUES: CoreValue[] = [
  {
    label: 'Teach the Word',
    Icon: TeachTheWordIcon,
    body: 'The Bible is what we sit under. Sermons are expository — verse by verse, book by book — because we trust the text more than the cleverness around it. Sunday School covers the whole counsel of Scripture for kids through adults. Wednesday Bible study goes slower and deeper. Everything in the building keeps coming back to the same source.',
  },
  {
    label: 'Care for each other',
    Icon: CareForEachOtherIcon,
    body: 'Care isn’t a program. It’s how the body acts when one member is hurting. Grace Groups meet in living rooms throughout the week. GriefShare meets Tuesdays through the hardest months of a loss. Moms4Moms walks new mothers through the first years. Meals show up after surgery. The deacons and deaconesses sit with people in the hospital. None of this is glamorous — all of it is the church.',
  },
  {
    label: 'Worship the Lord',
    Icon: WorshipTheLordIcon,
    body: 'Sunday morning is the central act of the week. Songs old and new, the reading of Scripture, the preaching of the Word, the Lord’s Supper at the rhythm Christ commanded. The worship team leads; the congregation sings. The room is full of voices that have been singing the same hymns for sixty years next to voices learning the chorus. Both belong.',
  },
  {
    label: 'Share the Gospel',
    Icon: ShareTheGospelIcon,
    body: 'Twenty-three families serve as missionaries on four continents, supported month after month by the GBC missions budget and prayed for by name in the Sunday bulletin. But the Great Commission isn’t outsourced. It’s the parents in the pickup line, the neighbors on the next street, the co-worker who only knows you well enough to ask why you go to church. You don’t have to leave Dayton to be part of this.',
  },
];

export const metadata = {
  title: 'Core values',
  description: 'Teach the Word. Care for each other. Worship the Lord. Share the Gospel — the four convictions that order Grace Bible Church.',
};

export default function ValuesPage() {
  return (
    <>
      <main className="relative min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full">
          <header className="grid md:grid-cols-12 gap-8 mb-[var(--section-gap)]">
            <div className="md:col-span-9">
              <p className="caption text-ink/55 mb-6">What anchors us</p>
              <h1 className="display text-display-2xl text-ink leading-[0.95]">
                Four core values.
              </h1>
              <p className="mt-10 text-body-lg text-ink/75 max-w-xl leading-relaxed">
                Short enough to memorize. Specific enough to recognize when they
                slip. They describe what a congregation does when it is healthy —
                in the order that matters.
              </p>
            </div>
          </header>

          <ol className="space-y-[var(--section-gap-tight)]">
            {VALUES.map((v, i) => (
              <li key={v.label} className="grid md:grid-cols-12 gap-8 md:gap-12 items-start">
                <div className="md:col-span-3 lg:col-span-2 flex md:flex-col items-baseline md:items-start gap-4 md:gap-2">
                  <span className="display text-display-md text-gilt leading-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <v.Icon className="text-gilt w-14 h-14 md:w-20 md:h-20" />
                </div>
                <div className="md:col-span-9 lg:col-span-10 space-y-5 max-w-prose">
                  <h2 className="display text-display-xl text-ink leading-[1.02]">
                    {v.label}
                  </h2>
                  <p className="text-body-lg text-ink/80 leading-relaxed">{v.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </main>
      <Footer />
    </>
  );
}

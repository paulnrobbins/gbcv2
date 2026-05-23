/*
 * Calendar — Planning Center iCal rendered in the site's design system.
 *
 * Pulls up to 40 upcoming events (multi-month) and groups by month for
 * readable scanning. Same iCal feed the homepage Scene 5 ribbons read.
 */
import { Footer } from '@/components/layout/Footer';
import { CalendarMonthList } from '@/components/ui/CalendarMonthList';
import { fetchUpcomingEvents } from '@/lib/planningCenter';

export const metadata = {
  title: 'Calendar',
  description: 'Services, studies, and events at Grace Bible Church Dayton.',
};

export const revalidate = 600; // 10 min

export default async function CalendarPage() {
  const events = await fetchUpcomingEvents(40);

  return (
    <>
      <main className="relative min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full">
          <header className="grid md:grid-cols-12 gap-8 mb-[var(--section-gap-tight)]">
            <div className="md:col-span-8">
              <p className="caption text-ink/55 mb-6">Services + studies + events</p>
              <h1 className="display text-display-2xl text-ink leading-[0.95]">
                Calendar.
              </h1>
              <p className="mt-10 text-body-lg text-ink/75 max-w-xl leading-relaxed">
                Sunday services, midweek Bible study, GraceKids events, member
                meetings, the things that don&rsquo;t fit a category. Pulled
                live from Planning Center.
              </p>
            </div>
          </header>

          <CalendarMonthList events={events} />
        </div>
      </main>
      <Footer />
    </>
  );
}

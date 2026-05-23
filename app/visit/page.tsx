/*
 * Visit — what to expect your first Sunday.
 *
 * Editorial column. Specific, warm, no condescension. Answers the actual
 * questions a first-time visitor has: where do I park, what do I wear,
 * is there anything for my kids, will anyone make me stand up and
 * introduce myself (no).
 */
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { AccessibilityNote } from '@/components/layout/AccessibilityNote';
import { CHURCH_INFO, SERVICE_TIMES } from '@/lib/utils';

export const metadata = {
  title: 'Plan a visit',
  description: 'What to expect your first Sunday at Grace Bible Church Dayton — service times, kids, parking, dress, the honest answers.',
};

const SECTIONS = [
  {
    eyebrow: 'Sunday morning',
    title: 'When and where',
    body: `Sunday School at ${SERVICE_TIMES.sundaySchoolTime} for every age. Worship at ${SERVICE_TIMES.worshipTime}. Doors open at 9:00 — come early if you want coffee or want to look around without a crowd. The building sits on Old Washington Highway just north of downtown Dayton; there's a paved lot and overflow grass parking.`,
  },
  {
    eyebrow: 'What to wear',
    title: 'Whatever feels like you',
    body: `Some men wear ties. More wear jeans and a button-down. Women wear dresses, slacks, jeans, whatever. Nobody is going to look at you. You'll fit in.`,
  },
  {
    eyebrow: 'Your kids',
    title: 'Real childcare from the nursery up',
    body: `Nursery for ages 0–2 is open during Sunday School and worship. Jr. Church (ages 3 through pre-K) meets in Room 7 during the whole service. GraceKids Church (kindergarten through 5th grade) is dismissed to Room 14 partway through worship. Every room is staffed by background-checked volunteers. You can check in at the Welcome Center as soon as you walk in.`,
  },
  {
    eyebrow: 'The service itself',
    title: 'Songs, scripture, a sermon, and an invitation',
    body: `About an hour. Singing — a mix of hymns and contemporary worship. Scripture reading. A sermon that works through a book of the Bible passage by passage. Communion on the first Sunday of every month, open to anyone walking with Christ. No one will single you out, ask you to stand, or make a fuss. If you want to talk to a pastor afterward, one of them will be standing in the lobby — just say hello.`,
  },
  {
    eyebrow: 'After the service',
    title: 'Hang around if you want',
    body: `Coffee and snacks in the fellowship hall most Sundays. Several people will probably introduce themselves. If you'd rather slip out, that's fine too — no pressure either way. If you fill out a connection card (or send us a note), someone from the office will follow up during the week with whatever information might help.`,
  },
];

export default function VisitPage() {
  return (
    <>
      <main className="relative min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full">
          <header className="grid md:grid-cols-12 gap-8 mb-[var(--section-gap-tight)]">
            <div className="md:col-span-8">
              <p className="caption text-ink/55 mb-6">First Sunday</p>
              <h1 className="display text-display-2xl text-ink leading-[0.95]">
                What to expect.
              </h1>
              <p className="mt-10 text-body-lg text-ink/75 max-w-xl leading-relaxed">
                The honest answers to the questions a first-time visitor actually
                asks — where to park, what to wear, what happens to your kids, what
                the service looks like.
              </p>
            </div>
            <aside className="md:col-span-4 md:pl-8 md:border-l md:border-ink/15 self-start space-y-5">
              <div>
                <p className="caption text-gilt mb-3">{SERVICE_TIMES.day} mornings</p>
                <p className="text-ink/85 text-body-lg leading-snug">
                  <span className="font-medium">{SERVICE_TIMES.sundaySchoolTime}</span>
                  <br />
                  <span className="text-sm text-ink/65">{SERVICE_TIMES.sundaySchoolLabel}</span>
                </p>
                <p className="text-ink/85 text-body-lg leading-snug mt-2">
                  <span className="font-medium">{SERVICE_TIMES.worshipTime}</span>
                  <br />
                  <span className="text-sm text-ink/65">{SERVICE_TIMES.worshipLabel}</span>
                </p>
              </div>
              <a
                href={CHURCH_INFO.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block display text-display-md text-ink hover:text-gilt transition-colors leading-tight"
              >
                {CHURCH_INFO.addressShort}<br />
                {CHURCH_INFO.cityState}
              </a>
              <Button href="/next-steps" variant="gilt">
                Send a connection card
              </Button>
            </aside>
          </header>

          {/* Sections */}
          <div className="space-y-[var(--section-gap-tight)] max-w-3xl">
            {SECTIONS.map((s) => (
              <section key={s.title}>
                <p className="caption text-gilt mb-3">{s.eyebrow}</p>
                <h2 className="display text-display-md text-ink leading-tight mb-5">{s.title}</h2>
                <p className="text-body-lg text-ink/80 leading-relaxed">{s.body}</p>
              </section>
            ))}

            <section className="pt-12 border-t border-ink/10">
              <p className="caption text-gilt mb-3">For everyone</p>
              <AccessibilityNote />
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

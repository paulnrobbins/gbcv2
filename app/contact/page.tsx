/* Office contact + map + accessibility note (accessibility treated as a moment, not a footnote) */
import { Footer } from '@/components/layout/Footer';
import { AccessibilityNote } from '@/components/layout/AccessibilityNote';
import { CHURCH_INFO } from '@/lib/utils';

export const metadata = { title: 'Contact', description: 'Office contact information and directions to Grace Bible Church.' };

export default function ContactPage() {
  return (
    <>
      <main className="min-h-screen px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="caption text-ink/55 mb-6">Get in touch</p>
            <h1 className="display text-display-2xl text-ink leading-[0.95]">Contact.</h1>

            <div className="mt-10 space-y-3 text-body-lg text-ink/85 leading-snug">
              <p>
                <a href={`tel:${CHURCH_INFO.phoneTel}`} className="hover:text-gilt transition-colors">
                  {CHURCH_INFO.phone}
                </a>
              </p>
              <p>
                <a href={`mailto:${CHURCH_INFO.email}`} className="hover:text-gilt transition-colors">
                  {CHURCH_INFO.email}
                </a>
              </p>
              <p className="pt-4">
                <a href={CHURCH_INFO.mapsUrl} target="_blank" rel="noopener noreferrer" className="display text-display-md text-ink hover:text-gilt transition-colors block">
                  {CHURCH_INFO.addressShort}<br />{CHURCH_INFO.cityState}
                </a>
              </p>
            </div>
          </div>
          <aside className="md:col-span-5">
            <AccessibilityNote variant="card" />
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}

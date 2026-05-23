/* Single-button bounce to Church Center external donation URL */
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { CHURCH_INFO } from '@/lib/utils';

export const metadata = { title: 'Give', description: 'Give to the ministry of Grace Bible Church Dayton.' };

export default function GivePage() {
  return (
    <>
      <main className="min-h-[70vh] flex items-center px-[var(--gutter)] pt-[20vh] pb-[var(--section-gap)]">
        <div className="max-w-[var(--page-max)] mx-auto w-full max-w-2xl">
          <p className="caption text-ink/55 mb-6">Generosity</p>
          <h1 className="display text-display-2xl text-ink leading-[0.95]">Give.</h1>
          <p className="mt-8 text-body-lg text-ink/75 leading-relaxed">
            Giving is handled by Church Center — secure, no fees on bank transfers, with the option for a one-time gift or recurring schedule.
          </p>
          <div className="mt-10">
            <Button href={CHURCH_INFO.giveUrl} variant="gilt" external>
              Open Church Center
            </Button>
          </div>
          <p className="mt-12 text-sm text-ink/55 leading-relaxed">
            Prefer to give in person? Drop a gift in the offering box at the back of the worship center on Sunday morning, or mail to {CHURCH_INFO.addressShort}, {CHURCH_INFO.cityState}.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

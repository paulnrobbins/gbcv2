/*
 * Homepage — the 7-scene immersive scroll.
 *
 * Phase 4a wiring:
 *   • Server-side: fetch current scripture, Planning Center events, latest
 *     YouTube sermon, missionaries with coords
 *   • Pass data down to: BibleWorld (3D scenes) + section components
 *   • SoundDirector handles foley + organ-pedal triggers as scenes advance
 *
 * Page is a Server Component so the fetches run during render and benefit
 * from Next.js fetch deduping + ISR revalidation.
 *
 * BibleWorld is still dynamic-imported with ssr:false — its props are
 * serialized JSON which crosses the server→client boundary cleanly.
 */
import dynamic from 'next/dynamic';
import { Threshold } from '@/components/sections/Threshold';
import { TheWelcome } from '@/components/sections/TheWelcome';
import { TheWord } from '@/components/sections/TheWord';
import { TheFamily } from '@/components/sections/TheFamily';
import { TheWeek } from '@/components/sections/TheWeek';
import { TheMission } from '@/components/sections/TheMission';
import { TheInvitation } from '@/components/sections/TheInvitation';
import { Footer } from '@/components/layout/Footer';
import { SceneController } from '@/components/three/SceneController';
import { SoundDirector } from '@/components/three/SoundDirector';
import { Loader } from '@/components/ui/Loader';

import { loadCurrentScripture } from '@/lib/scripture';
import { fetchUpcomingEvents } from '@/lib/planningCenter';
import { fetchLatestSermon } from '@/lib/youtube';
import { loadMissionariesForGlobe, getMissionaryCount } from '@/lib/missionaries';

const BibleWorld = dynamic(
  () => import('@/components/three/BibleWorld').then((m) => m.BibleWorld),
  { ssr: false, loading: () => null }
);

// Family photo set — kept in sync with TheFamily's caption set
const FAMILY_PHOTOS = [
  { src: '/photos/church/GBC-0167.jpg' },
  { src: '/photos/church/GBC-0301.jpg' },
  { src: '/photos/church/GBC-0577.jpg' },
];

// ISR revalidation envelope for the page itself — Planning Center + YouTube
// each have their own narrower revalidate windows, but the page wrapper picks
// a generous outer bound so static optimization still works.
export const revalidate = 600; // 10 min

export default async function HomePage() {
  // Parallel server fetches — short-circuit gracefully on any failure
  const [scripture, events, latestSermon] = await Promise.all([
    loadCurrentScripture(),
    fetchUpcomingEvents(3),
    fetchLatestSermon(),
  ]);

  const missionaries = loadMissionariesForGlobe();
  const missionaryCount = getMissionaryCount();

  return (
    <SceneController>
      <Loader />
      <BibleWorld
        scriptureText={scripture.text}
        scriptureRef={scripture.ref}
        events={events}
        missionaries={missionaries}
        familyPhotos={FAMILY_PHOTOS}
      />
      <SoundDirector />
      <main className="relative" style={{ zIndex: 'var(--z-content, 10)' }}>
        <Threshold />
        <TheWelcome />
        <TheWord
          scriptureText={scripture.text}
          scriptureRef={scripture.ref}
          scriptureTranslation={scripture.translation}
          seriesTitle={scripture.sermonSeriesTitle}
          seriesSubtitle={scripture.sermonSeriesSubtitle}
          latestSermon={latestSermon}
        />
        <TheFamily />
        <TheWeek events={events} />
        <TheMission missionaryCount={missionaryCount} />
        <TheInvitation />
      </main>
      <Footer />
    </SceneController>
  );
}

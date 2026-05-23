/*
 * The master 3D Canvas — "The Living Page" world container.
 *
 * Phase 4a additions:
 *   • BookmarkRibbonField — Scene 5 event ribbons (live Planning Center data)
 *   • GlobeMap — Scene 6 world map with pin lights at missionary locations
 *   • PhotoBillboard ×3 — Scene 4 family photos hovering above the page
 *   • Scripture text uses the loaded current.json (passed in via props)
 *
 * All asset-loaders (drei Image, Environment) sit inside Suspense +
 * WorldErrorBoundary so missing assets degrade silently.
 *
 * Reduced motion or 'low' tier → returns null.
 */
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { TONE_MAPPING, OUTPUT_COLOR_SPACE, TONE_MAPPING_EXPOSURE } from '@/lib/three';
import { useQualityProfile } from '@/components/three/AdaptiveQuality';
import { useQualityTier } from '@/hooks/useQualityTier';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { WorldErrorBoundary } from '@/components/ui/WorldErrorBoundary';

import { CameraRig } from '@/components/three/CameraRig';
import { StainedGlassLight } from '@/components/three/StainedGlassLight';
import { DustMotes } from '@/components/three/DustMotes';
import { Bible } from '@/components/three/Bible';
import { ScriptureType } from '@/components/three/ScriptureType';
import { PostFX } from '@/components/three/PostFX';
import { BookmarkRibbonField } from '@/components/three/BookmarkRibbon';
import { GlobeMap } from '@/components/three/GlobeMap';
import { PhotoBillboard } from '@/components/three/PhotoBillboard';
import type { CalendarEvent } from '@/types';
import type { MissionaryWithCoords } from '@/lib/missionaries';

export interface BibleWorldProps {
  scriptureText: string;
  scriptureRef: string;
  events: CalendarEvent[];
  missionaries: MissionaryWithCoords[];
  familyPhotos: Array<{ src: string }>;
}

export function BibleWorld({
  scriptureText,
  scriptureRef,
  events,
  missionaries,
  familyPhotos,
}: BibleWorldProps) {
  const profile = useQualityProfile();
  const tier = useQualityTier();
  const prefersReduced = useReducedMotion();

  if (prefersReduced || tier === 'low') {
    return null;
  }

  return (
    <WorldErrorBoundary fallback={null}>
      <div
        aria-hidden
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 'var(--z-canvas, 0)' }}
      >
        <Canvas
          dpr={profile.dpr}
          shadows={profile.shadows}
          camera={{ position: [0, 1.6, 5], fov: 38, near: 0.1, far: 100 }}
          gl={{
            toneMapping: TONE_MAPPING,
            toneMappingExposure: TONE_MAPPING_EXPOSURE,
            outputColorSpace: OUTPUT_COLOR_SPACE,
            antialias: profile.postFX,
            powerPreference: 'high-performance',
          }}
        >
          <Suspense fallback={null}>
            <CameraRig />
            <StainedGlassLight />
            <Bible />
            <ScriptureType text={scriptureText} reference={scriptureRef} />

            {/* Scene 4 — family photo billboards positioned above the page,
                varying depths so camera dolly creates parallax */}
            <WorldErrorBoundary fallback={null}>
              <Suspense fallback={null}>
                {familyPhotos[0] && (
                  <PhotoBillboard
                    src={familyPhotos[0].src}
                    position={[-2.1, 1.7, 0.4]}
                    size={[1.4, 1.75]}
                    tilt={0.08}
                    visibleRange={[0.40, 0.56]}
                    seed={1.1}
                  />
                )}
                {familyPhotos[1] && (
                  <PhotoBillboard
                    src={familyPhotos[1].src}
                    position={[0, 2.0, 0.2]}
                    size={[1.5, 1.85]}
                    tilt={-0.04}
                    visibleRange={[0.42, 0.58]}
                    seed={2.3}
                  />
                )}
                {familyPhotos[2] && (
                  <PhotoBillboard
                    src={familyPhotos[2].src}
                    position={[2.1, 1.7, 0.4]}
                    size={[1.4, 1.75]}
                    tilt={-0.06}
                    visibleRange={[0.44, 0.60]}
                    seed={3.5}
                  />
                )}
              </Suspense>
            </WorldErrorBoundary>

            {/* Scene 5 — event ribbons hanging from the page edge */}
            <BookmarkRibbonField events={events} />

            {/* Scene 6 — slow-rotating globe with missionary pin lights */}
            <GlobeMap missionaries={missionaries} />

            <DustMotes />
            <PostFX />
          </Suspense>
        </Canvas>
      </div>
    </WorldErrorBoundary>
  );
}

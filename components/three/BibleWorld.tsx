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
    if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.info('[BibleWorld] suppressed', { tier, prefersReduced });
    }
    return null;
  }

  if (process.env.NODE_ENV === 'development') {
    // eslint-disable-next-line no-console
    console.info('[BibleWorld] rendering', { tier, dpr: profile.dpr, postFX: profile.postFX });
  }

  return (
    <WorldErrorBoundary
      fallback={null}
      onError={(err) => {
        if (process.env.NODE_ENV === 'development') {
          // eslint-disable-next-line no-console
          console.error('[BibleWorld] outer boundary caught — Canvas/WebGL failure', err);
        }
      }}
    >
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
        onCreated={() => {
          if (process.env.NODE_ENV === 'development') {
            // eslint-disable-next-line no-console
            console.info('[BibleWorld] canvas created');
          }
        }}
      >
        {/* Every scene element gets its OWN error boundary so a single failure
            (missing asset, shader compile error, font fetch CORS) can never
            blank the whole world. Each branch can independently disappear. */}

        <WorldErrorBoundary fallback={null}>
          <CameraRig />
        </WorldErrorBoundary>

        <WorldErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <StainedGlassLight />
          </Suspense>
        </WorldErrorBoundary>

        <WorldErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <Bible />
          </Suspense>
        </WorldErrorBoundary>

        <WorldErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <ScriptureType text={scriptureText} reference={scriptureRef} />
          </Suspense>
        </WorldErrorBoundary>

        {/* Scene 4 — family photo billboards */}
        {familyPhotos[0] && (
          <WorldErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <PhotoBillboard
                src={familyPhotos[0].src}
                position={[-2.1, 1.7, 0.4]}
                size={[1.4, 1.75]}
                tilt={0.08}
                visibleRange={[0.40, 0.56]}
                seed={1.1}
              />
            </Suspense>
          </WorldErrorBoundary>
        )}
        {familyPhotos[1] && (
          <WorldErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <PhotoBillboard
                src={familyPhotos[1].src}
                position={[0, 2.0, 0.2]}
                size={[1.5, 1.85]}
                tilt={-0.04}
                visibleRange={[0.42, 0.58]}
                seed={2.3}
              />
            </Suspense>
          </WorldErrorBoundary>
        )}
        {familyPhotos[2] && (
          <WorldErrorBoundary fallback={null}>
            <Suspense fallback={null}>
              <PhotoBillboard
                src={familyPhotos[2].src}
                position={[2.1, 1.7, 0.4]}
                size={[1.4, 1.75]}
                tilt={-0.06}
                visibleRange={[0.44, 0.60]}
                seed={3.5}
              />
            </Suspense>
          </WorldErrorBoundary>
        )}

        {/* Scene 5 — event ribbons */}
        <WorldErrorBoundary fallback={null}>
          <BookmarkRibbonField events={events} />
        </WorldErrorBoundary>

        {/* Scene 6 — globe + pin lights */}
        <WorldErrorBoundary fallback={null}>
          <GlobeMap missionaries={missionaries} />
        </WorldErrorBoundary>

        <WorldErrorBoundary fallback={null}>
          <DustMotes />
        </WorldErrorBoundary>

        <WorldErrorBoundary fallback={null}>
          <PostFX />
        </WorldErrorBoundary>
      </Canvas>
      </div>
    </WorldErrorBoundary>
  );
}

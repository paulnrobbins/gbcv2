/*
 * Adaptive quality wrapper for the R3F Canvas.
 *
 * Reads useQualityTier and adjusts Canvas DPR + post-FX intensity accordingly.
 * Phase 2 ships the tier detection; per-tier scene behavior wires up in Phase 3.
 *
 * Usage:
 *   <AdaptiveCanvas>
 *     <BibleScene />
 *   </AdaptiveCanvas>
 *
 * On 'low' tier we render an empty Canvas (or skip entirely) — the visitor
 * gets the static-page fallback via the section components, which always
 * render content regardless of 3D availability.
 */
'use client';

import { useQualityTier } from '@/hooks/useQualityTier';

export interface QualityProfile {
  dpr: [number, number];      // device pixel ratio range
  shadows: boolean;
  postFX: boolean;
  dustMotes: boolean;
  ribbonPhysics: boolean;
  ambientLifeDetails: boolean;
}

const PROFILES: Record<'high' | 'medium' | 'low', QualityProfile> = {
  high: {
    dpr: [1, 2],
    shadows: true,
    postFX: true,
    dustMotes: true,
    ribbonPhysics: true,
    ambientLifeDetails: true,
  },
  medium: {
    dpr: [1, 1.5],
    shadows: false,
    postFX: true,
    dustMotes: false,
    ribbonPhysics: false,
    ambientLifeDetails: false,
  },
  low: {
    dpr: [1, 1],
    shadows: false,
    postFX: false,
    dustMotes: false,
    ribbonPhysics: false,
    ambientLifeDetails: false,
  },
};

export function useQualityProfile(): QualityProfile {
  const tier = useQualityTier();
  return PROFILES[tier];
}

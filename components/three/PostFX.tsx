/*
 * Post-processing stack.
 *
 * Conservative use only — bloom strictly capped so the gilt scripture glows
 * without smearing; vignette deepens the corners; film grain unifies textures
 * across the warm-cream + dark-leather palette.
 *
 * Bug Audit Failure Mode #6: postprocessing props that vary by minor version
 * are avoided. Only the stable v2.16 props are used here.
 *
 * Only active when QualityProfile.postFX = true (off on 'low' tier).
 */
'use client';

import {
  EffectComposer,
  Bloom,
  Vignette,
  Noise,
  BrightnessContrast,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { useQualityProfile } from '@/components/three/AdaptiveQuality';

export function PostFX() {
  const profile = useQualityProfile();
  if (!profile.postFX) return null;

  return (
    <EffectComposer multisampling={profile.shadows ? 4 : 0}>
      <Bloom
        intensity={0.42}
        luminanceThreshold={0.78}
        luminanceSmoothing={0.22}
        radius={0.7}
      />
      <BrightnessContrast brightness={0.0} contrast={0.05} />
      <Vignette offset={0.32} darkness={0.5} blendFunction={BlendFunction.NORMAL} />
      <Noise premultiply opacity={0.05} blendFunction={BlendFunction.OVERLAY} />
    </EffectComposer>
  );
}

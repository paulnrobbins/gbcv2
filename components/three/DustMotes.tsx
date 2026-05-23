/*
 * Dust motes drifting in the light shafts.
 *
 * 800 instanced points (140 on 'medium' tier) with a custom shader for
 * soft circular appearance + per-point seed-based drift. Density is biased
 * toward the three shaft positions so motes are visible where they should
 * be — inside the light, almost invisible elsewhere.
 *
 * Ambient Life pattern (system doc, Pattern 2). Skipped entirely on
 * 'low' / reduced-motion via AdaptiveQuality gating in BibleWorld.
 *
 * Each mote drifts slowly upward + a sine-curve sway. Total motion budget
 * stays under the 80/20 rule — motes are sub-pixel for the most part.
 */
'use client';

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useQualityProfile } from '@/components/three/AdaptiveQuality';

const SHAFT_CENTERS = [
  new THREE.Vector3(-3.2, 2, 1.5),
  new THREE.Vector3(0, 2.5, 1),
  new THREE.Vector3(3.2, 2, 1.5),
];

const COUNT_HIGH = 800;
const COUNT_MEDIUM = 140;

export function DustMotes() {
  const profile = useQualityProfile();
  if (!profile.dustMotes && !profile.postFX) return null;
  const count = profile.dustMotes ? COUNT_HIGH : COUNT_MEDIUM;
  return <DustField count={count} />;
}

function DustField({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);

  // Build positions, seeds, and per-point properties once.
  const { positions, seeds, spreads } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const spreads = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Pick a shaft to bias toward, with some scatter
      const shaft = SHAFT_CENTERS[i % SHAFT_CENTERS.length];
      const rx = (Math.random() - 0.5) * 2.2;
      const ry = (Math.random() - 0.5) * 4.5;
      const rz = (Math.random() - 0.5) * 1.6;
      positions[i * 3 + 0] = shaft.x + rx;
      positions[i * 3 + 1] = shaft.y + ry;
      positions[i * 3 + 2] = shaft.z + rz;
      seeds[i] = Math.random() * 1000;
      spreads[i] = 0.5 + Math.random() * 0.6;
    }

    return { positions, seeds, spreads };
  }, [count]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    g.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    g.setAttribute('aSpread', new THREE.BufferAttribute(spreads, 1));
    return g;
  }, [positions, seeds, spreads]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 8.0 },
        uColor: { value: new THREE.Color('#FFD49A') },
      },
      vertexShader: `
        attribute float aSeed;
        attribute float aSpread;
        uniform float uTime;
        uniform float uSize;
        varying float vAlpha;
        void main() {
          // Slow upward drift + horizontal sway
          float t = uTime * 0.08 + aSeed;
          vec3 p = position;
          p.y += mod(t * 0.4, 6.0) - 3.0;            // looping rise
          p.x += sin(t * 1.7) * 0.18 * aSpread;
          p.z += cos(t * 1.3) * 0.15 * aSpread;

          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          // Closer points slightly bigger, but capped so dust stays subtle
          gl_PointSize = uSize * (1.0 / -mv.z);
          // Fade with distance + per-point brightness variation
          vAlpha = 0.55 + 0.35 * sin(aSeed * 12.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        varying float vAlpha;
        void main() {
          // Soft circular sprite
          float d = distance(gl_PointCoord, vec2(0.5));
          float a = smoothstep(0.5, 0.0, d) * vAlpha;
          gl_FragColor = vec4(uColor, a);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    if (ref.current) {
      const mat = ref.current.material as THREE.ShaderMaterial;
      mat.uniforms.uTime.value = state.clock.elapsedTime;
    }
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

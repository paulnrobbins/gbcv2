/*
 * Stained-glass overhead lighting.
 *
 * Two layers:
 *   1. Image-based lighting via drei <Environment files=...>, IF an HDRI is
 *      present at the configured path. Wrapped in WorldErrorBoundary +
 *      Suspense so a missing file is silent — fall through to layer 2.
 *      (Bug Audit Failure Mode #4 — missing HDRI must not crash production.)
 *
 *   2. Procedural fallback: three cone-shaped warm light shafts descending
 *      from above, plus a directional light + ambient + a hemisphere light
 *      with bone/ink tinting. Works with zero external assets.
 *
 * Both layers can coexist — the procedural lights add character even when
 * the HDRI is loaded.
 *
 * Light color: warm-amber matching the gilt accent.
 *
 * Drop the HDRI at /public/hdri/stained-glass-warm.hdr (search Poly Haven
 * for: church / chapel / stained glass / warm window).
 */
'use client';

import * as THREE from 'three';
import { forwardRef, useMemo, useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { hdriUrl } from '@/lib/three';
import { useQualityProfile } from '@/components/three/AdaptiveQuality';
import { useScene } from '@/components/three/SceneController';
import { WorldErrorBoundary } from '@/components/ui/WorldErrorBoundary';

const DEFAULT_HDRI = 'stained-glass-warm.hdr';

interface Props {
  hdriPath?: string;
  hdriIntensity?: number;
}

export function StainedGlassLight({ hdriPath = DEFAULT_HDRI, hdriIntensity = 0.5 }: Props) {
  const profile = useQualityProfile();

  return (
    <>
      <ProceduralLights />

      {profile.postFX && (
        <WorldErrorBoundary fallback={null}>
          <Suspense fallback={null}>
            <Environment
              files={hdriUrl(hdriPath)}
              background={false}
              environmentIntensity={hdriIntensity}
            />
          </Suspense>
        </WorldErrorBoundary>
      )}
    </>
  );
}

function ProceduralLights() {
  const profile = useQualityProfile();
  const shaftRef1 = useRef<THREE.Mesh>(null);
  const shaftRef2 = useRef<THREE.Mesh>(null);
  const shaftRef3 = useRef<THREE.Mesh>(null);
  const sceneRef = useScene();

  useFrame((_, dt) => {
    const p = sceneRef.current.progress;
    // 0..1 morning warmth — peaks around scene 4 (progress ~0.45)
    const warmth = Math.sin(p * Math.PI) * 0.6 + 0.4;
    const refs = [shaftRef1, shaftRef2, shaftRef3];
    refs.forEach((r, i) => {
      if (!r.current) return;
      const mat = r.current.material as THREE.ShaderMaterial;
      if (mat && mat.uniforms?.uOpacity) {
        const target = warmth * (0.28 - i * 0.04);
        mat.uniforms.uOpacity.value = THREE.MathUtils.lerp(
          mat.uniforms.uOpacity.value,
          target,
          Math.min(dt * 3, 1)
        );
      }
    });
  });

  return (
    <>
      {/* Ambient — fills shadows so we never hit pure black */}
      <ambientLight color={'#3a2a1c'} intensity={0.45} />

      {/* Hemisphere — warm sky tint, cool ground tint */}
      <hemisphereLight color={'#F4ECDC'} groundColor={'#1A1410'} intensity={0.35} />

      {/* Three directional lights — implied left / center / right windows */}
      <directionalLight
        color={'#F0C485'}
        intensity={1.4}
        position={[-3.5, 6, 2.5]}
        castShadow={profile.shadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={20}
      />
      <directionalLight color={'#E8B872'} intensity={0.9} position={[0, 7, 1.5]} />
      <directionalLight color={'#E5A65A'} intensity={0.8} position={[3.5, 6, 2.5]} />

      {/* Tight warm pool on the Bible */}
      <spotLight
        color={'#FFD9A0'}
        intensity={2.4}
        position={[0, 5, 3]}
        angle={0.55}
        penumbra={0.85}
        distance={14}
        castShadow={profile.shadows}
        shadow-bias={-0.0005}
      />

      {/* Visible light shafts — only on 'high'/'medium' postFX */}
      {profile.postFX && (
        <>
          <LightShaft ref={shaftRef1} position={[-3.2, 4.5, 1.5]} angle={0.18} length={11} />
          <LightShaft ref={shaftRef2} position={[0, 5.2, 1.0]} angle={0.16} length={12} />
          <LightShaft ref={shaftRef3} position={[3.2, 4.5, 1.5]} angle={0.18} length={11} />
        </>
      )}
    </>
  );
}

interface ShaftProps {
  position: [number, number, number];
  angle: number;
  length: number;
}

// Additive-blended cone with radial gradient — a soft "shaft of light" effect.
const LightShaft = forwardRef<THREE.Mesh, ShaftProps>(function LightShaft(
  { position, angle, length },
  ref
) {
  const geometry = useMemo(() => {
    const g = new THREE.ConeGeometry(length * angle, length, 24, 1, true);
    g.rotateX(Math.PI);
    g.translate(0, -length / 2, 0);
    return g;
  }, [angle, length]);

  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      side: THREE.DoubleSide,
      uniforms: {
        uColor: { value: new THREE.Color('#FFB876') },
        uOpacity: { value: 0.2 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        varying vec2 vUv;
        void main() {
          float radial = 1.0 - smoothstep(0.0, 0.5, abs(vUv.x - 0.5));
          float vertical = smoothstep(0.0, 1.0, vUv.y);
          float a = radial * vertical * uOpacity;
          gl_FragColor = vec4(uColor, a);
        }
      `,
    });
  }, []);

  return (
    <mesh ref={ref} position={position} geometry={geometry} material={material} renderOrder={2} />
  );
});

/*
 * Scoped Bible Scene — non-homepage Bible appearances.
 *
 * The homepage Bible is a fixed-position Canvas that spans the entire
 * 7-scene scroll. For subpages that want a Bible visual without owning the
 * whole viewport, this is the scoped version:
 *
 *   • Inline (not fixed) — sits within a section
 *   • Driven by its own ScrollTrigger keyed to its container element
 *   • Lighter footprint — no globe, no ribbons, no scripture gild;
 *     just cover + page turns
 *
 * The Beliefs scrollytell uses one ScopedBibleScene that turns to a new
 * page as each belief enters view — 14 beliefs = 14 page turns (or one
 * per cluster of 2-3 beliefs if 14 turns feels excessive).
 *
 * Bug Audit: same SSR safety as BibleWorld — dynamic-imported with ssr:false
 * at the consumer.
 */
'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { TONE_MAPPING, OUTPUT_COLOR_SPACE, TONE_MAPPING_EXPOSURE } from '@/lib/three';
import { useQualityProfile } from '@/components/three/AdaptiveQuality';
import { useQualityTier } from '@/hooks/useQualityTier';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { WorldErrorBoundary } from '@/components/ui/WorldErrorBoundary';
import { gsap, ScrollTrigger } from '@/lib/gsap';

interface ScopedBibleSceneProps {
  /** ID of the container element this Bible's scroll is bound to */
  triggerId: string;
  /** Number of page-turn steps (the scroll length is divided into this many) */
  pageCount: number;
  /** Optional className for the fixed container — defaults to right half of viewport */
  className?: string;
}

export function ScopedBibleScene({ triggerId, pageCount, className }: ScopedBibleSceneProps) {
  const profile = useQualityProfile();
  const tier = useQualityTier();
  const prefersReduced = useReducedMotion();
  const progressRef = useRef({ progress: 0 });

  // ScrollTrigger keyed to the named element — pins this Canvas's progress
  // to the container's scroll position
  useEffect(() => {
    const el = document.getElementById(triggerId);
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.4,
      onUpdate: (self) => {
        progressRef.current.progress = self.progress;
      },
    });
    return () => {
      st.kill();
    };
  }, [triggerId]);

  if (prefersReduced || tier === 'low') return null;

  return (
    <WorldErrorBoundary fallback={null}>
      <div
        aria-hidden
        className={
          className ??
          'fixed top-0 right-0 w-1/2 h-screen pointer-events-none hidden md:block'
        }
        style={{ zIndex: 'var(--z-canvas, 0)' }}
      >
        <Canvas
          dpr={profile.dpr}
          shadows={false}
          camera={{ position: [0, 1.4, 4.2], fov: 36, near: 0.1, far: 50 }}
          gl={{
            toneMapping: TONE_MAPPING,
            toneMappingExposure: TONE_MAPPING_EXPOSURE,
            outputColorSpace: OUTPUT_COLOR_SPACE,
            antialias: profile.postFX,
            powerPreference: 'high-performance',
            alpha: true,
          }}
        >
          <Suspense fallback={null}>
            <ScopedLighting />
            <ScopedBible pageCount={pageCount} progressRef={progressRef} />
          </Suspense>
        </Canvas>
      </div>
    </WorldErrorBoundary>
  );
}

function ScopedLighting() {
  return (
    <>
      <ambientLight color={'#3a2a1c'} intensity={0.55} />
      <hemisphereLight color={'#F4ECDC'} groundColor={'#1A1410'} intensity={0.35} />
      <directionalLight color={'#F0C485'} intensity={1.2} position={[-2.5, 5, 3]} />
      <directionalLight color={'#E8B872'} intensity={0.7} position={[0, 6, 1.5]} />
      <spotLight color={'#FFD9A0'} intensity={1.8} position={[0, 4, 3]} angle={0.6} penumbra={0.9} distance={12} />
    </>
  );
}

const COVER_W = 2.7;
const COVER_H = 3.5;
const COVER_THICKNESS = 0.32;
const SPINE_W = 0.32;
const COVER_MAX_ANGLE = Math.PI * 0.92;

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

// Page-turn shader — same as Bible.tsx but extracted here for self-containment
const PAGE_VERT = /* glsl */ `
  uniform float uProgress;
  uniform float uWidth;
  varying vec2 vUv;
  varying float vFold;
  void main() {
    vUv = uv;
    float t = clamp(uProgress, 0.0, 1.0);
    float eased = smoothstep(0.0, 1.0, t);
    float angle = eased * 3.14159265;
    float xLocal = position.x;
    float cosA = cos(angle);
    float sinA = sin(angle);
    float bowAmount = sin(t * 3.14159265) * 0.18;
    float bowX = (xLocal / uWidth);
    float bow = sin(bowX * 3.14159265) * bowAmount;
    vec3 p = position;
    p.x = xLocal * cosA;
    p.z = xLocal * sinA + bow * 0.15;
    p.y += bow * 0.04 * (1.0 - cosA);
    vFold = abs(sinA);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const PAGE_FRAG = /* glsl */ `
  uniform vec3 uColorFront;
  uniform vec3 uColorBack;
  uniform vec3 uColorShadow;
  varying vec2 vUv;
  varying float vFold;
  void main() {
    vec3 base = gl_FrontFacing ? uColorFront : uColorBack;
    float edgeMask = smoothstep(0.0, 0.04, vUv.x) * smoothstep(0.0, 0.04, vUv.y)
                   * smoothstep(0.0, 0.04, 1.0 - vUv.y);
    base = mix(uColorShadow, base, edgeMask);
    base = mix(base, base * 0.78, vFold * 0.45);
    gl_FragColor = vec4(base, 1.0);
  }
`;

interface ScopedBibleProps {
  pageCount: number;
  progressRef: React.MutableRefObject<{ progress: number }>;
}

function ScopedBible({ pageCount, progressRef }: ScopedBibleProps) {
  const coverRef = useRef<THREE.Mesh>(null);
  const leatherMat = useRef(
    new THREE.MeshStandardMaterial({ color: '#3A2418', roughness: 0.82, metalness: 0.05 })
  ).current;
  const goldMat = useRef(
    new THREE.MeshStandardMaterial({
      color: '#C8964A',
      roughness: 0.32,
      metalness: 0.85,
      emissive: '#3a2810',
      emissiveIntensity: 0.15,
    })
  ).current;

  useFrame(() => {
    const p = progressRef.current.progress;
    // Cover opens in first 10% of scroll, stays open until last 5%, then closes
    let angle = 0;
    if (p < 0.05) {
      angle = 0;
    } else if (p < 0.10) {
      angle = smoothstep((p - 0.05) / 0.05) * COVER_MAX_ANGLE;
    } else if (p < 0.95) {
      angle = COVER_MAX_ANGLE;
    } else {
      angle = smoothstep(1 - (p - 0.95) / 0.05) * COVER_MAX_ANGLE;
    }
    if (coverRef.current) coverRef.current.rotation.y = -angle;
  });

  return (
    <group position={[0, -0.1, 0]}>
      {/* Back cover */}
      <mesh position={[0, 0, -COVER_THICKNESS * 0.3]} material={leatherMat}>
        <boxGeometry args={[COVER_W, COVER_H, COVER_THICKNESS * 0.45, 4, 6, 1]} />
      </mesh>
      {/* Spine */}
      <mesh position={[-COVER_W / 2 + SPINE_W / 2, 0, -COVER_THICKNESS * 0.05]} material={leatherMat}>
        <boxGeometry args={[SPINE_W, COVER_H, COVER_THICKNESS, 1, 4, 1]} />
      </mesh>
      {/* Closed page block */}
      <mesh position={[SPINE_W * 0.5, 0, -COVER_THICKNESS * 0.05]}>
        <boxGeometry args={[COVER_W - SPINE_W - 0.04, COVER_H - 0.08, COVER_THICKNESS * 0.45, 1, 1, 1]} />
        <meshStandardMaterial color="#ECE0CB" roughness={0.95} metalness={0} />
      </mesh>
      {/* Gilt edge */}
      <mesh position={[COVER_W / 2 - 0.04, 0, -COVER_THICKNESS * 0.05]} material={goldMat}>
        <boxGeometry args={[0.02, COVER_H - 0.1, COVER_THICKNESS * 0.85, 1, 1, 1]} />
      </mesh>
      {/* Front cover hinged at spine */}
      <group position={[-COVER_W / 2 + SPINE_W, 0, 0.16]}>
        <mesh ref={coverRef} position={[COVER_W / 2 - SPINE_W / 2, 0, 0]} material={leatherMat}>
          <boxGeometry args={[COVER_W, COVER_H, COVER_THICKNESS * 0.45, 4, 6, 1]} />
        </mesh>
      </group>
      {/* Page stack */}
      <group position={[-COVER_W / 2 + SPINE_W, 0, 0.05]}>
        {Array.from({ length: pageCount }).map((_, idx) => (
          <ScopedPage
            key={idx}
            idx={idx}
            total={pageCount}
            width={COVER_W - SPINE_W - 0.08}
            height={COVER_H - 0.16}
            progressRef={progressRef}
          />
        ))}
      </group>
    </group>
  );
}

interface ScopedPageProps {
  idx: number;
  total: number;
  width: number;
  height: number;
  progressRef: React.MutableRefObject<{ progress: number }>;
}

function ScopedPage({ idx, total, width, height, progressRef }: ScopedPageProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  // Page-turn band: pages turn AFTER cover opens (0.10) and BEFORE cover closes (0.95)
  const TURN_START = 0.10;
  const TURN_END = 0.92;
  const span = (TURN_END - TURN_START) / total;
  const aStart = TURN_START + idx * span;
  const aEnd = aStart + span;

  useFrame(() => {
    const p = progressRef.current.progress;
    let pageProg = 0;
    if (p > aStart) {
      if (p >= aEnd) pageProg = 1;
      else pageProg = (p - aStart) / (aEnd - aStart);
    }
    if (matRef.current) matRef.current.uniforms.uProgress.value = pageProg;
  });

  return (
    <mesh position={[0, 0, idx * 0.0014]} receiveShadow>
      <planeGeometry
        args={[width, height, 60, 80]}
        // hinge at x=0
        onUpdate={(g) => g.translate(width / 2, 0, 0)}
      />
      <shaderMaterial
        ref={matRef}
        vertexShader={PAGE_VERT}
        fragmentShader={PAGE_FRAG}
        uniforms={{
          uProgress: { value: 0 },
          uWidth: { value: width },
          uColorFront: { value: new THREE.Color('#F4ECDC') },
          uColorBack: { value: new THREE.Color('#ECE0CB') },
          uColorShadow: { value: new THREE.Color('#A89072') },
        }}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

// Touch gsap so it isn't tree-shaken
void gsap;

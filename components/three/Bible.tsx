/*
 * The anchor object — procedural 3D Bible.
 *
 * Phase 3 ships procedural geometry: a leather-covered box-spine, the closed
 * page block, gilt-leaf page edges, and a stack of 6 turnable pages — one
 * per scene transition in the scroll score.
 *
 * The cover opens (toward the viewer) as scene progress crosses 0.14 → 0.20,
 * stays open through scenes 2–6, and closes again at 0.84 → 0.96 for the
 * Invitation. Each of the 6 pages turns at its own scene-transition range
 * (see PAGE_TURN_RANGES).
 *
 * Production upgrade: Paul runs Hyper3D on a leather Bible reference photo
 * → GLB → drops at /public/models/bible-hero.glb → swap the cover/spine
 * meshes for the loaded model in this file. The Page system stays identical.
 *
 * Mounted by BibleWorld inside Suspense + WorldErrorBoundary.
 * Reads scroll-driven progress via useScene every frame (no React renders).
 */
'use client';

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScene } from '@/components/three/SceneController';

const COVER_W = 2.7;
const COVER_H = 3.5;
const COVER_THICKNESS = 0.32;
const SPINE_W = 0.32;

// Cover hinge range in scroll-progress space
const COVER_OPEN_START = 0.14;
const COVER_OPEN_END = 0.20;
const COVER_CLOSE_START = 0.84;
const COVER_CLOSE_END = 0.96;
const COVER_MAX_ANGLE = Math.PI * 0.92;

// Each page turns inside its own progress range
const PAGE_TURN_RANGES: Array<[number, number]> = [
  [0.20, 0.30], // → Scene 3 (Word)
  [0.32, 0.42], // → Scene 4 (Family)
  [0.44, 0.54], // → Scene 5 (Week)
  [0.56, 0.66], // → Scene 6 (Mission)
  [0.68, 0.78], // → Scene 7 (Invitation)
];

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

function coverAngleFromProgress(p: number): number {
  if (p < COVER_OPEN_START) return 0;
  if (p < COVER_OPEN_END) {
    return smoothstep((p - COVER_OPEN_START) / (COVER_OPEN_END - COVER_OPEN_START)) * COVER_MAX_ANGLE;
  }
  if (p < COVER_CLOSE_START) return COVER_MAX_ANGLE;
  if (p < COVER_CLOSE_END) {
    return smoothstep(1 - (p - COVER_CLOSE_START) / (COVER_CLOSE_END - COVER_CLOSE_START)) * COVER_MAX_ANGLE;
  }
  return 0;
}

function pageProgressForIndex(sceneProgress: number, idx: number): number {
  const range = PAGE_TURN_RANGES[idx];
  if (!range) return 0;
  const [a, b] = range;
  if (sceneProgress <= a) return 0;
  if (sceneProgress >= b) return 1;
  return (sceneProgress - a) / (b - a);
}

// Page-turn shader — bend a hinged plane around its left edge
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

export function Bible() {
  const coverFrontRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const sceneRef = useScene();

  const leatherMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#3A2418',
        roughness: 0.82,
        metalness: 0.05,
      }),
    []
  );

  const goldEdgeMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#C8964A',
        roughness: 0.32,
        metalness: 0.85,
        emissive: '#3a2810',
        emissiveIntensity: 0.15,
      }),
    []
  );

  const coverGeo = useMemo(
    () => new THREE.BoxGeometry(COVER_W, COVER_H, COVER_THICKNESS * 0.45, 4, 6, 1),
    []
  );

  const spineGeo = useMemo(
    () => new THREE.BoxGeometry(SPINE_W, COVER_H, COVER_THICKNESS, 1, 4, 1),
    []
  );

  const goldEdgeGeo = useMemo(
    () => new THREE.BoxGeometry(0.02, COVER_H - 0.1, COVER_THICKNESS * 0.85, 1, 1, 1),
    []
  );

  useFrame(() => {
    const p = sceneRef.current.progress;
    if (coverFrontRef.current) {
      coverFrontRef.current.rotation.y = -coverAngleFromProgress(p);
    }
    if (groupRef.current) {
      const settle = Math.sin(coverAngleFromProgress(p)) * 0.005;
      groupRef.current.position.y = -0.05 - settle;
    }
  });

  return (
    <group ref={groupRef} position={[0, -0.05, 0]}>
      {/* Back cover */}
      <mesh
        position={[0, 0, -COVER_THICKNESS * 0.3]}
        geometry={coverGeo}
        material={leatherMaterial}
        castShadow
        receiveShadow
      />

      {/* Spine */}
      <mesh
        position={[-COVER_W / 2 + SPINE_W / 2, 0, -COVER_THICKNESS * 0.05]}
        geometry={spineGeo}
        material={leatherMaterial}
        castShadow
        receiveShadow
      />

      {/* Closed page block */}
      <mesh position={[SPINE_W * 0.5, 0, -COVER_THICKNESS * 0.05]} receiveShadow>
        <boxGeometry args={[COVER_W - SPINE_W - 0.04, COVER_H - 0.08, COVER_THICKNESS * 0.45, 1, 1, 1]} />
        <meshStandardMaterial color="#ECE0CB" roughness={0.95} metalness={0} />
      </mesh>

      {/* Gilt page edge */}
      <mesh
        position={[COVER_W / 2 - 0.04, 0, -COVER_THICKNESS * 0.05]}
        geometry={goldEdgeGeo}
        material={goldEdgeMaterial}
      />

      {/* Front cover — hinges at spine */}
      <group position={[-COVER_W / 2 + SPINE_W, 0, 0.16]}>
        <mesh
          ref={coverFrontRef}
          position={[COVER_W / 2 - SPINE_W / 2, 0, 0]}
          geometry={coverGeo}
          material={leatherMaterial}
          castShadow
          receiveShadow
        />
      </group>

      {/* Page stack — 6 turnable pages, hinged at spine */}
      <group position={[-COVER_W / 2 + SPINE_W, 0, 0.05]}>
        {PAGE_TURN_RANGES.map((_, idx) => (
          <ScrollPage
            key={idx}
            idx={idx}
            sceneRef={sceneRef}
            width={COVER_W - SPINE_W - 0.08}
            height={COVER_H - 0.16}
          />
        ))}
      </group>
    </group>
  );
}

interface ScrollPageProps {
  idx: number;
  sceneRef: ReturnType<typeof useScene>;
  width: number;
  height: number;
}

// A single page mesh that pulls its turn-progress from the live scene state
// every frame — no React re-renders, just a shader uniform update.
function ScrollPage({ idx, sceneRef, width, height }: ScrollPageProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(width, height, 60, 80);
    g.translate(width / 2, 0, 0); // hinge along x=0
    return g;
  }, [width, height]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: 0 },
      uWidth: { value: width },
      uColorFront: { value: new THREE.Color('#F4ECDC') },
      uColorBack: { value: new THREE.Color('#ECE0CB') },
      uColorShadow: { value: new THREE.Color('#A89072') },
    }),
    [width]
  );

  useFrame(() => {
    if (matRef.current) {
      matRef.current.uniforms.uProgress.value = pageProgressForIndex(
        sceneRef.current.progress,
        idx
      );
    }
  });

  return (
    <mesh
      position={[0, 0, idx * 0.0014]}
      geometry={geometry}
      receiveShadow
    >
      <shaderMaterial
        ref={matRef}
        vertexShader={PAGE_VERT}
        fragmentShader={PAGE_FRAG}
        uniforms={uniforms}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

/*
 * A single page mesh with a vertex-shader-driven page-turn bend.
 *
 * The page is a high-segment plane (60×80 subdivisions) hinged along its
 * left edge. A `progress` uniform 0..1 bends the page across a smooth arc
 * from flat-right (0) through standing-vertical (0.5) to flat-left (1).
 *
 * The bend is computed in the vertex shader so we don't pay a per-frame
 * geometry rebuild — the GPU does the work. The shader uses a sigmoid-eased
 * angle so the page hinges in a way that resembles real paper rather than
 * a rigid hinge.
 *
 * Front face is warm-cream (--bone-warm); back face is bone with subtle
 * margin lines so a fully-open spread still reads as a book interior.
 *
 * Mounted by Bible.tsx. Not used standalone.
 */
'use client';

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

interface PageProps {
  // Hinge position — pages stack to the left of the spine
  position?: [number, number, number];
  // Page width / height in world units
  width?: number;
  height?: number;
  // 0..1 turn progress (0 = flat right, 1 = flat left)
  progress: number;
  // Index in the page stack — used to nudge z-offset so pages don't z-fight
  stackIndex?: number;
}

// Vertex shader: bend the plane around the left edge (hinge).
// uniform `uProgress` drives the bend angle in [0, π].
// We map each vertex's local-x into [0..1] and rotate around the y-axis at the hinge.
const PAGE_VERT = /* glsl */ `
  uniform float uProgress;
  uniform float uWidth;
  varying vec2 vUv;
  varying float vFold;

  void main() {
    vUv = uv;

    // Sigmoid-easing on the progress for paper-like hinge
    float t = clamp(uProgress, 0.0, 1.0);
    float eased = smoothstep(0.0, 1.0, t);
    float angle = eased * 3.14159265;

    // Local x in [0, uWidth] — hinge is at x=0
    float xLocal = position.x;
    float cosA = cos(angle);
    float sinA = sin(angle);

    // Subtle paper bow along the page length — peaks at progress 0.5
    float bowAmount = sin(t * 3.14159265) * 0.18;
    float bowX = (xLocal / uWidth);
    float bow = sin(bowX * 3.14159265) * bowAmount;

    // Rotate the vertex around the hinge axis (y-axis at x=0)
    vec3 p = position;
    p.x = xLocal * cosA;
    p.z = xLocal * sinA + bow * 0.15;
    // Slight vertical droop near the open end for paper weight
    p.y += bow * 0.04 * (1.0 - cosA);

    vFold = abs(sinA); // 0 = flat (no fold visible), 1 = vertical (mid-turn)

    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

// Fragment shader: cream paper with subtle warm tint that deepens slightly mid-fold.
// Mid-fold pages catch shadow on their underside, which we simulate with vFold.
const PAGE_FRAG = /* glsl */ `
  uniform vec3 uColorFront;
  uniform vec3 uColorBack;
  uniform vec3 uColorShadow;
  varying vec2 vUv;
  varying float vFold;

  void main() {
    // Render front vs back by interpreting gl_FrontFacing.
    // Front of the page (the side we see when closed-right) is warm cream;
    // back face is slightly cooler so the open spread reads as two pages.
    vec3 base = gl_FrontFacing ? uColorFront : uColorBack;

    // Edge darkening — subtle vignette on each page so the deckle reads
    float edgeMask = smoothstep(0.0, 0.04, vUv.x) * smoothstep(0.0, 0.04, vUv.y)
                   * smoothstep(0.0, 0.04, 1.0 - vUv.y);
    base = mix(uColorShadow, base, edgeMask);

    // Mid-fold receives more shadow from the implied overhead light
    base = mix(base, base * 0.78, vFold * 0.45);

    gl_FragColor = vec4(base, 1.0);
  }
`;

export function Page({
  position = [0, 0, 0],
  width = 2.6,
  height = 3.4,
  progress,
  stackIndex = 0,
}: PageProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null!);

  // Geometry: subdivided plane, hinged along left edge.
  // We translate the geometry so x=0 is the hinge (left edge of page).
  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(width, height, 60, 80);
    g.translate(width / 2, 0, 0); // shift so x=0 is at the hinge
    return g;
  }, [width, height]);

  const uniforms = useMemo(
    () => ({
      uProgress: { value: progress },
      uWidth: { value: width },
      uColorFront: { value: new THREE.Color('#F4ECDC') },
      uColorBack: { value: new THREE.Color('#ECE0CB') },
      uColorShadow: { value: new THREE.Color('#A89072') },
    }),
    [width]
  );

  // Per-frame: push the current progress into the shader uniform.
  // We don't useState because uniforms update without re-render.
  useFrame(() => {
    if (matRef.current) {
      const u = matRef.current.uniforms;
      u.uProgress.value = progress;
    }
  });

  // Tiny z-offset per stack-index prevents z-fighting between stacked pages
  const z = stackIndex * 0.0012;

  return (
    <mesh
      position={[position[0], position[1], position[2] + z]}
      geometry={geometry}
      castShadow={false}
      receiveShadow
    >
      <shaderMaterial
        ref={matRef}
        vertexShader={PAGE_VERT}
        fragmentShader={PAGE_FRAG}
        uniforms={uniforms}
        side={THREE.DoubleSide}
        transparent={false}
      />
    </mesh>
  );
}

/*
 * 3D gilded scripture text.
 *
 * drei <Text> renders the scripture on a flat plane above the page surface.
 * A custom material does three jobs:
 *   1. Base color: warm-cream paper-toned (so the text reads as embossed in
 *      the page surface before the gild animates in)
 *   2. Gild mask: animates left-to-right as scene progress crosses the
 *      Scene 3 range — letters fill with the --gilt color from left edge
 *   3. Subtle shadow plane below for the "raised letterform" effect
 *
 * Activates when the SceneController progress is inside [0.28, 0.40] —
 * the Word scene. Outside that range, opacity smoothly fades to 0 so the
 * text disappears for surrounding scenes.
 *
 * Production note: replace the Newsreader font URL with a local self-hosted
 * .woff2 once next/font's woff2 paths are inspected. For Phase 3 we use the
 * Google Fonts CDN URL so the loader works in dev without extra setup.
 */
'use client';

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useScene } from '@/components/three/SceneController';

interface ScriptureTypeProps {
  text: string;
  reference: string;
  // Position above the page surface (page surface is around y=0)
  position?: [number, number, number];
  // Visible during this scroll range (0..1)
  visibleRange?: [number, number];
  // Gild animates in across this sub-range
  gildRange?: [number, number];
}

// Newsreader from Google Fonts — same family next/font is serving for HTML.
// Troika downloads + caches the woff/ttf for use inside the canvas.
const NEWSREADER_URL =
  'https://fonts.gstatic.com/s/newsreader/v22/cY9qfjOCX1hbuyalUrK49dLac06G1ZGsZBtoBCzBDXXD9JVF438w.woff2';

export function ScriptureType({
  text,
  reference,
  position = [0, 0.6, 0.32],
  visibleRange = [0.28, 0.42],
  gildRange = [0.30, 0.38],
}: ScriptureTypeProps) {
  const groupRef = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const refMatRef = useRef<THREE.ShaderMaterial>(null);
  const sceneRef = useScene();

  // Shader material: ink-on-paper text with a left-to-right gild mask.
  const material = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColorBase: { value: new THREE.Color('#1A1410') },     // ink
        uColorGilt: { value: new THREE.Color('#C8964A') },     // gilt
        uColorGiltGlow: { value: new THREE.Color('#FFD58A') }, // hot edge of gild
        uGild: { value: 0 },         // 0..1 sweep across letters
        uOpacity: { value: 0 },      // global opacity (controlled by scene range)
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorBase;
        uniform vec3 uColorGilt;
        uniform vec3 uColorGiltGlow;
        uniform float uGild;
        uniform float uOpacity;
        varying vec2 vUv;

        void main() {
          // Soft transition band centered at uGild
          float band = 0.05;
          float t = smoothstep(uGild - band, uGild + band, vUv.x);
          // 0 = base (ink), 1 = gilt
          vec3 col = mix(uColorBase, uColorGilt, 1.0 - t);
          // Hot glow at the transition edge
          float edge = smoothstep(band, 0.0, abs(vUv.x - uGild));
          col = mix(col, uColorGiltGlow, edge * 0.8 * (1.0 - step(1.0, uGild)));
          gl_FragColor = vec4(col, uOpacity);
        }
      `,
    });
  }, []);

  const refMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uColor: { value: new THREE.Color('#C8964A') },
        uOpacity: { value: 0 },
      },
      vertexShader: `
        void main() { gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
      `,
      fragmentShader: `
        uniform vec3 uColor;
        uniform float uOpacity;
        void main() { gl_FragColor = vec4(uColor, uOpacity); }
      `,
    });
  }, []);

  useFrame(() => {
    const p = sceneRef.current.progress;

    // Visibility — smoothstep into/out of the visible range
    const [v0, v1] = visibleRange;
    const inT = smoothstep(v0 - 0.02, v0 + 0.04, p);
    const outT = 1 - smoothstep(v1 - 0.04, v1 + 0.02, p);
    const op = Math.max(0, Math.min(inT, outT));

    if (matRef.current) {
      matRef.current.uniforms.uOpacity.value = op;
      // Gild sweep
      const [g0, g1] = gildRange;
      const g = (p - g0) / (g1 - g0);
      matRef.current.uniforms.uGild.value = Math.max(0, Math.min(1, g));
    }
    if (refMatRef.current) {
      // Reference fades in slightly later than the scripture itself
      const refOp = op * smoothstep(0.31, 0.34, p);
      refMatRef.current.uniforms.uOpacity.value = refOp;
    }
    if (groupRef.current) {
      // Slight Z-rise as gild progresses — embossing effect
      const z = position[2] + (matRef.current?.uniforms.uGild.value ?? 0) * 0.04;
      groupRef.current.position.set(position[0], position[1], z);
    }
  });

  return (
    <group ref={groupRef} position={position}>
      <Text
        font={NEWSREADER_URL}
        fontSize={0.20}
        maxWidth={2.2}
        textAlign="left"
        anchorX="left"
        anchorY="middle"
        lineHeight={1.18}
        letterSpacing={-0.005}
        position={[-1.1, 0.05, 0]}
      >
        {text}
        <primitive ref={matRef} object={material} attach="material" />
      </Text>

      <Text
        font={NEWSREADER_URL}
        fontSize={0.085}
        maxWidth={2.2}
        anchorX="left"
        anchorY="top"
        letterSpacing={0.04}
        position={[-1.1, -0.6, 0]}
      >
        {reference.toUpperCase()}
        <primitive ref={refMatRef} object={refMaterial} attach="material" />
      </Text>
    </group>
  );
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

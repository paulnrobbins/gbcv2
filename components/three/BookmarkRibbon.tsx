/*
 * Scene 5 — bookmark ribbons hanging from the Bible's page edge.
 *
 * Each ribbon is a thin, tall plane with a sigmoid-curve sway driven by
 * sin(time + seed). The ribbon hangs from a fixed Y at the top edge and
 * extends downward with a slight S-curve. Color: muted gilt — readable
 * against the warm page surface.
 *
 * Hover (via raycast in Canvas) is approximated through scene-progress
 * proximity: when the visitor is in Scene 5 (progress 0.56..0.66), all
 * three ribbons lift slightly + saturate. Per-ribbon DOM hover is not
 * possible from inside Canvas without drei <Html> (Bug Audit Failure
 * Mode #5 — we avoid that), so a Phase 5 polish task is to add 3D-raycast
 * hover via pointer events on the meshes.
 *
 * Visibility: smooth fade in at progress 0.50, fully visible 0.58, fade
 * out at 0.70.
 */
'use client';

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScene } from '@/components/three/SceneController';
import type { CalendarEvent } from '@/types';

interface BookmarkRibbonProps {
  event: CalendarEvent;
  // Horizontal slot along the Bible's right page edge
  slot: number;
  // Total slots — used to space ribbons evenly
  totalSlots: number;
}

const RIBBON_VERT = /* glsl */ `
  uniform float uTime;
  uniform float uSway;
  uniform float uLift;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 p = position;
    // Sway: stronger toward the bottom of the ribbon
    float bottomBias = 1.0 - (vUv.y);
    float sway = sin(uTime * 0.6 + position.y * 1.3) * 0.04 * bottomBias * uSway;
    p.x += sway;
    p.z += sin(uTime * 0.4 + position.y * 0.9) * 0.025 * bottomBias * uSway;
    // Lift: pull whole ribbon slightly up + forward when active scene
    p.y += uLift * 0.08;
    p.z += uLift * 0.06;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const RIBBON_FRAG = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uColorDeep;
  uniform float uOpacity;
  varying vec2 vUv;
  void main() {
    // Fabric gradient: lighter at top, deeper at bottom
    vec3 col = mix(uColor, uColorDeep, smoothstep(0.0, 1.0, 1.0 - vUv.y));
    // Subtle edge fade
    float edge = smoothstep(0.0, 0.02, vUv.x) * smoothstep(0.0, 0.02, 1.0 - vUv.x);
    col *= edge;
    gl_FragColor = vec4(col, uOpacity * edge);
  }
`;

const RIBBON_W = 0.28;
const RIBBON_H = 1.4;
const PAGE_RIGHT_EDGE = 1.18;  // matches Bible page geometry
const PAGE_TOP = 1.65;
const VISIBLE_RANGE: [number, number] = [0.50, 0.72];

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function BookmarkRibbon({ event, slot, totalSlots }: BookmarkRibbonProps) {
  const matRef = useRef<THREE.ShaderMaterial>(null);
  const groupRef = useRef<THREE.Group>(null);
  const sceneRef = useScene();

  // Per-ribbon stable seed so multiple ribbons sway out of phase
  const seed = useMemo(() => Math.random() * 1000, []);

  // Horizontal position along the page edge
  const x = PAGE_RIGHT_EDGE - 0.6 + slot * (1.2 / Math.max(1, totalSlots - 1));

  const geometry = useMemo(() => {
    const g = new THREE.PlaneGeometry(RIBBON_W, RIBBON_H, 1, 24);
    g.translate(0, -RIBBON_H / 2, 0); // hinge at the top
    return g;
  }, []);

  const uniforms = useMemo(
    () => ({
      uTime: { value: seed },
      uSway: { value: 1 },
      uLift: { value: 0 },
      uOpacity: { value: 0 },
      uColor: { value: new THREE.Color('#D9A85B') },
      uColorDeep: { value: new THREE.Color('#9C6E2E') },
    }),
    [seed]
  );

  useFrame((state) => {
    const p = sceneRef.current.progress;
    const inT = smoothstep(VISIBLE_RANGE[0] - 0.02, VISIBLE_RANGE[0] + 0.06, p);
    const outT = 1 - smoothstep(VISIBLE_RANGE[1] - 0.06, VISIBLE_RANGE[1] + 0.02, p);
    const opacity = Math.max(0, Math.min(inT, outT));

    // Lift when scene is at its peak
    const center = (VISIBLE_RANGE[0] + VISIBLE_RANGE[1]) / 2;
    const proximity = 1 - Math.min(1, Math.abs(p - center) / ((VISIBLE_RANGE[1] - VISIBLE_RANGE[0]) / 2));

    if (matRef.current) {
      matRef.current.uniforms.uTime.value = seed + state.clock.elapsedTime;
      matRef.current.uniforms.uOpacity.value = opacity;
      matRef.current.uniforms.uLift.value = proximity;
    }
  });

  return (
    <group ref={groupRef} position={[x, PAGE_TOP, 0.08]}>
      <mesh geometry={geometry} renderOrder={3}>
        <shaderMaterial
          ref={matRef}
          vertexShader={RIBBON_VERT}
          fragmentShader={RIBBON_FRAG}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

/**
 * Container that lays out N ribbons across the page edge given an events array.
 * Renders nothing when there are no events.
 */
export function BookmarkRibbonField({ events }: { events: CalendarEvent[] }) {
  const display = events.slice(0, 3);
  if (display.length === 0) return null;
  return (
    <>
      {display.map((e, i) => (
        <BookmarkRibbon key={e.uid} event={e} slot={i} totalSlots={display.length} />
      ))}
    </>
  );
}

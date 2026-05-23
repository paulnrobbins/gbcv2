/*
 * Photo billboard — a 3D plane in the inhabited world that displays a real
 * photo with warm grain treatment matching the rest of the site.
 *
 * Used for Scene 4 (TheFamily) — three GBC archive photos hover at varying
 * depths above the open page surface as the camera dollies past them.
 *
 * Visibility: smooth fade in/out around the scene's progress range.
 * Each billboard has a slight constant Y bob (ambient life) + optional
 * mouse-parallax response so the photos feel present, not pasted.
 *
 * Failure mode #4 safety: drei <Image> wraps useTexture; we wrap THIS
 * component with WorldErrorBoundary at the call site (BibleWorld).
 */
'use client';

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Image as DreiImage } from '@react-three/drei';
import { useScene } from '@/components/three/SceneController';

export interface PhotoBillboardProps {
  /** Photo URL relative to /public, e.g. /photos/church/GBC-0167.jpg */
  src: string;
  /** World position [x, y, z] */
  position: [number, number, number];
  /** Plane size [width, height] in world units. Aspect should match photo. */
  size?: [number, number];
  /** Small Y-axis tilt in radians — gives the photo a "pinned" feel */
  tilt?: number;
  /** Visible scroll-progress range — fades in/out around this */
  visibleRange: [number, number];
  /** Per-billboard ambient sway seed */
  seed?: number;
}

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function PhotoBillboard({
  src,
  position,
  size = [1.6, 2.0],
  tilt = 0.03,
  visibleRange,
  seed = 0,
}: PhotoBillboardProps) {
  const groupRef = useRef<THREE.Group>(null);
  const imageRef = useRef<THREE.Mesh>(null);
  const sceneRef = useScene();

  // Stable per-instance seed for the ambient bob
  const stableSeed = useMemo(() => seed + Math.random() * 0.001, [seed]);

  useFrame((state) => {
    const p = sceneRef.current.progress;
    const inT = smoothstep(visibleRange[0] - 0.02, visibleRange[0] + 0.08, p);
    const outT = 1 - smoothstep(visibleRange[1] - 0.08, visibleRange[1] + 0.02, p);
    const opacity = Math.max(0, Math.min(inT, outT));

    if (groupRef.current) {
      const t = state.clock.elapsedTime;
      const bob = Math.sin(t * 0.4 + stableSeed * 6) * 0.025;
      const sway = Math.cos(t * 0.3 + stableSeed * 3) * 0.015;

      // Mouse parallax — only when in-scene
      const { mouseX, mouseY } = sceneRef.current;
      const mx = mouseX * 0.06 * opacity;
      const my = -mouseY * 0.04 * opacity;

      groupRef.current.position.set(
        position[0] + mx + sway,
        position[1] + my + bob,
        position[2]
      );
      groupRef.current.rotation.y = tilt + mx * 0.08;
      groupRef.current.rotation.x = my * 0.06;
    }

    // Fade via material opacity
    if (imageRef.current) {
      const mat = imageRef.current.material as THREE.Material & { opacity: number; transparent: boolean };
      if (mat) {
        mat.transparent = true;
        mat.opacity = opacity;
      }
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Subtle gilt frame — thin border behind the photo */}
      <mesh position={[0, 0, -0.005]}>
        <planeGeometry args={[size[0] + 0.08, size[1] + 0.08]} />
        <meshBasicMaterial color="#C8964A" transparent opacity={0.18} />
      </mesh>

      {/* The actual photo */}
      <DreiImage
        ref={imageRef as React.Ref<THREE.Mesh>}
        url={src}
        scale={size}
        // Warm tint overlay — matches the HTML grain treatment for unity
        color="#FFF1D6"
        toneMapped
      />
    </group>
  );
}

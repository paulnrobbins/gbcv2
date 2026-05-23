/*
 * Three.js helpers — color space, tone mapping, common constants.
 *
 * These run inside R3F components (which are themselves inside a Canvas
 * wrapped via next/dynamic ssr:false), so they are safe to import statically.
 */

import * as THREE from 'three';

// ACES Filmic is the modern cinematic standard (per system doc Pattern 1).
// Applied via <Canvas gl={{ toneMapping: TONE_MAPPING }} /> in BibleWorld.
export const TONE_MAPPING = THREE.ACESFilmicToneMapping;

// Color space — three.js r152+ defaults to sRGB outputColorSpace,
// but we set it explicitly so a future stack bump doesn't surprise us.
export const OUTPUT_COLOR_SPACE = THREE.SRGBColorSpace;

// Tone-mapping exposure — calibrated for warm stained-glass HDRI lighting.
// 1.0 = neutral; <1.0 = darker / more dramatic; >1.0 = lifted / brighter.
export const TONE_MAPPING_EXPOSURE = 1.05;

// Brand color tokens as THREE.Color instances for shader uniforms.
export const COLOR = {
  bone: new THREE.Color('#F4ECDC'),
  ink: new THREE.Color('#1A1410'),
  gilt: new THREE.Color('#C8964A'),
  giltDeep: new THREE.Color('#9C6E2E'),
};

// HDRI path — primary stained-glass cathedral HDR.
// Default looks for Poly Haven CC0 file; production override via env CDN.
export function hdriUrl(filename: string): string {
  const cdn = process.env.NEXT_PUBLIC_ASSET_CDN;
  if (cdn) return `${cdn.replace(/\/$/, '')}/hdri/${filename}`;
  return `/hdri/${filename}`;
}

export function modelUrl(filename: string): string {
  const cdn = process.env.NEXT_PUBLIC_ASSET_CDN;
  if (cdn) return `${cdn.replace(/\/$/, '')}/models/${filename}`;
  return `/models/${filename}`;
}

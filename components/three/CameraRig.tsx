/*
 * Camera rig — the cinematographer.
 *
 * Three responsibilities per system doc Pattern 3 (Cinematic Camera):
 *   1. Per-scene framing — camera position lerps between keyframes as
 *      sceneProgress advances. Each scene has its own (position, lookAt) pair.
 *   2. Ambient breath — a 1° yaw oscillation when idle, plus a tiny vertical
 *      drift. Mimics the weight of a real cinematographer holding the rig.
 *   3. Mouse parallax — subtle camera offset based on cursor x/y. Visitor
 *      feels noticed by the environment (Pattern 7 Reactive Environment).
 *
 * Uses useFrame for per-frame smoothing — no useState in the hot path.
 * All lerps are dt-stable using framerate-independent smoothing.
 */
'use client';

import * as THREE from 'three';
import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useScene } from '@/components/three/SceneController';

// Camera keyframes per scene boundary.
// Each entry: { progress, position [x,y,z], lookAt [x,y,z] }
//
// NOTE: explicitly typed (no `as const`) so iteration produces a uniform
// element type — otherwise each tuple's literal types diverge and the
// interpKeyframes loop can't assign one entry's slot from another's.
interface Keyframe {
  p: number;
  pos: [number, number, number];
  look: [number, number, number];
}

const KEYFRAMES: Keyframe[] = [
  // Scene 1 — Threshold: looking straight at the closed Bible from slightly above
  { p: 0.0, pos: [0, 1.6, 5.0], look: [0, 0.2, 0] },
  // Scene 2 — Welcome: dolly forward + slight tilt as cover opens
  { p: 0.18, pos: [0, 1.8, 4.2], look: [0, 0.3, 0] },
  // Scene 3 — Word: 3/4 angle down onto the open page
  { p: 0.32, pos: [-0.8, 2.2, 3.8], look: [0, 0.5, 0] },
  // Scene 4 — Family: lateral dolly back to wider framing
  { p: 0.46, pos: [0.5, 2.0, 4.5], look: [0, 0.4, 0] },
  // Scene 5 — Week: forward-facing, slight tilt down to see ribbons
  { p: 0.60, pos: [0, 1.7, 4.2], look: [0, 0.0, 0] },
  // Scene 6 — Mission: pulled back high — globe reveal angle
  { p: 0.74, pos: [0, 3.2, 5.5], look: [0, 0.8, 0] },
  // Scene 7 — Invitation: returns to Scene 1 framing
  { p: 1.0, pos: [0, 1.6, 5.0], look: [0, 0.2, 0] },
];

// Lerp between adjacent keyframes based on progress
function interpKeyframes(p: number, out: { pos: THREE.Vector3; look: THREE.Vector3 }) {
  let a = KEYFRAMES[0];
  let b = KEYFRAMES[KEYFRAMES.length - 1];
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    if (p >= KEYFRAMES[i].p && p <= KEYFRAMES[i + 1].p) {
      a = KEYFRAMES[i];
      b = KEYFRAMES[i + 1];
      break;
    }
  }
  const span = b.p - a.p || 1;
  const t = (p - a.p) / span;
  const e = smoothstep(t);
  out.pos.set(
    a.pos[0] + (b.pos[0] - a.pos[0]) * e,
    a.pos[1] + (b.pos[1] - a.pos[1]) * e,
    a.pos[2] + (b.pos[2] - a.pos[2]) * e
  );
  out.look.set(
    a.look[0] + (b.look[0] - a.look[0]) * e,
    a.look[1] + (b.look[1] - a.look[1]) * e,
    a.look[2] + (b.look[2] - a.look[2]) * e
  );
}

function smoothstep(t: number) {
  const x = Math.max(0, Math.min(1, t));
  return x * x * (3 - 2 * x);
}

// Reusable temp objects — never allocate per frame
const _target = { pos: new THREE.Vector3(), look: new THREE.Vector3() };
const _tmpLook = new THREE.Vector3();

export function CameraRig() {
  const { camera } = useThree();
  const sceneRef = useScene();
  const startTime = useRef(performance.now());

  useFrame((_, dt) => {
    const { progress, mouseX, mouseY } = sceneRef.current;

    // 1. Scene-driven framing
    interpKeyframes(progress, _target);

    // 2. Ambient breath — slow yaw + tiny vertical drift
    const t = (performance.now() - startTime.current) / 1000;
    const breathYaw = Math.sin(t * 0.18) * 0.018; // ~1° in radians
    const breathY = Math.sin(t * 0.13) * 0.012;

    // 3. Mouse parallax — subtle, capped
    const parallaxX = mouseX * 0.14;
    const parallaxY = -mouseY * 0.08;

    // Compose target position
    const targetX = _target.pos.x + breathYaw + parallaxX;
    const targetY = _target.pos.y + breathY + parallaxY;
    const targetZ = _target.pos.z;

    // Framerate-independent smoothing toward target
    const smooth = 1 - Math.pow(0.001, dt);
    camera.position.x += (targetX - camera.position.x) * smooth;
    camera.position.y += (targetY - camera.position.y) * smooth;
    camera.position.z += (targetZ - camera.position.z) * smooth;

    // Look-at — also smoothed so a sharp scene change doesn't snap
    _tmpLook.copy(_target.look);
    _tmpLook.x += parallaxX * 0.3;
    _tmpLook.y += parallaxY * 0.3;
    camera.lookAt(_tmpLook);
  });

  return null;
}

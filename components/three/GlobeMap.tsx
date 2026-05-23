/*
 * Scene 6 — slow-rotating world map with missionary pin lights.
 *
 * The globe is a low-poly icosphere with a custom shader that paints
 * subtle latitude/longitude grid lines + a hemispheric warmth gradient.
 * No continent texture (Phase 5 polish item — for now the grid + pins
 * suggest a world map without expensive earth texture).
 *
 * Pin lights are an instanced mesh — one instance per missionary, positioned
 * at lat/lng on the globe surface. Each pin pulses softly at irregular
 * intervals (different seed per instance) like real flickering candles.
 *
 * Visibility: smooth fade in at progress 0.64, fully visible 0.74,
 * fade out at 0.82. The globe rotates continuously throughout but only
 * draws when within range, so off-screen rotation costs nothing.
 *
 * Reads missionary coords via the `missionaries` prop — server-loaded from
 * lib/missionaries.ts and passed through BibleWorld.
 */
'use client';

import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useScene } from '@/components/three/SceneController';
import type { MissionaryWithCoords } from '@/lib/missionaries';

interface GlobeMapProps {
  missionaries: MissionaryWithCoords[];
}

const GLOBE_RADIUS = 1.4;
const VISIBLE_RANGE: [number, number] = [0.62, 0.84];
const ROTATION_SECONDS = 90; // one full rotation

function smoothstep(edge0: number, edge1: number, x: number) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

// Lat/lng → 3D position on unit sphere (radius applied separately)
function latLngToVec3(lat: number, lng: number, radius: number, out: THREE.Vector3) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  out.x = -(radius * Math.sin(phi) * Math.cos(theta));
  out.y = radius * Math.cos(phi);
  out.z = radius * Math.sin(phi) * Math.sin(theta);
}

const GLOBE_VERT = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorldPos = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const GLOBE_FRAG = /* glsl */ `
  uniform vec3 uColorBase;
  uniform vec3 uColorWarm;
  uniform vec3 uGridColor;
  uniform float uOpacity;
  varying vec2 vUv;
  varying vec3 vNormal;
  varying vec3 vWorldPos;

  void main() {
    // Hemispheric tint — warmer where light hits, cooler in shadow
    vec3 lightDir = normalize(vec3(0.3, 1.0, 0.5));
    float lambert = max(0.0, dot(vNormal, lightDir));
    vec3 base = mix(uColorBase, uColorWarm, lambert);

    // Latitude grid lines — 12 bands
    float lat = abs(fract(vUv.y * 12.0) - 0.5);
    float latLine = smoothstep(0.48, 0.5, lat);
    // Longitude grid lines — 24 bands
    float lng = abs(fract(vUv.x * 24.0) - 0.5);
    float lngLine = smoothstep(0.48, 0.5, lng);
    float gridMask = max(latLine, lngLine) * 0.25;

    vec3 col = mix(base, uGridColor, gridMask);

    // Limb darkening — edge of the sphere fades toward warm shadow
    float limb = pow(1.0 - max(0.0, dot(vNormal, vec3(0.0, 0.0, 1.0))), 1.5);
    col = mix(col, col * 0.55, limb * 0.4);

    gl_FragColor = vec4(col, uOpacity);
  }
`;

const PIN_VERT = /* glsl */ `
  attribute float aSeed;
  uniform float uTime;
  uniform float uOpacity;
  varying float vAlpha;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Flicker — slow irregular pulse
    float pulse = 0.6 + 0.4 * sin(uTime * 1.3 + aSeed * 12.0)
                     * sin(uTime * 0.7 + aSeed * 4.0);
    vAlpha = uOpacity * pulse;
    // Slight outward float — pin breathes off the surface
    vec3 p = position;
    p.xyz += normal * (0.005 * sin(uTime * 2.0 + aSeed * 7.0));
    gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(p, 1.0);
  }
`;

const PIN_FRAG = /* glsl */ `
  varying float vAlpha;
  varying vec2 vUv;
  uniform vec3 uColor;
  void main() {
    float d = distance(vUv, vec2(0.5));
    float a = smoothstep(0.5, 0.0, d) * vAlpha;
    gl_FragColor = vec4(uColor, a);
  }
`;

export function GlobeMap({ missionaries }: GlobeMapProps) {
  const globeGroupRef = useRef<THREE.Group>(null);
  const globeMatRef = useRef<THREE.ShaderMaterial>(null);
  const pinMatRef = useRef<THREE.ShaderMaterial>(null);
  const sceneRef = useScene();

  const globeGeo = useMemo(() => new THREE.IcosahedronGeometry(GLOBE_RADIUS, 5), []);

  const globeUniforms = useMemo(
    () => ({
      uColorBase: { value: new THREE.Color('#2A1F15') },
      uColorWarm: { value: new THREE.Color('#5C3E22') },
      uGridColor: { value: new THREE.Color('#C8964A') },
      uOpacity: { value: 0 },
    }),
    []
  );

  // Build instanced pin mesh
  const pinGeo = useMemo(() => new THREE.PlaneGeometry(0.08, 0.08), []);

  const pinUniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uOpacity: { value: 0 },
      uColor: { value: new THREE.Color('#FFD58A') },
    }),
    []
  );

  const { instancedMesh, seeds } = useMemo(() => {
    const count = missionaries.length;
    const seeds = new Float32Array(count);
    const dummy = new THREE.Object3D();
    const tmpVec = new THREE.Vector3();

    const im = new THREE.InstancedMesh(
      pinGeo,
      new THREE.ShaderMaterial({
        vertexShader: PIN_VERT,
        fragmentShader: PIN_FRAG,
        uniforms: pinUniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        side: THREE.DoubleSide,
      }),
      count
    );
    im.frustumCulled = false;

    missionaries.forEach((m, i) => {
      latLngToVec3(m.lat, m.lng, GLOBE_RADIUS * 1.01, tmpVec);
      dummy.position.copy(tmpVec);
      // Orient the pin to face outward from the globe surface
      dummy.lookAt(tmpVec.clone().multiplyScalar(2));
      dummy.updateMatrix();
      im.setMatrixAt(i, dummy.matrix);
      seeds[i] = Math.random();
    });
    im.instanceMatrix.needsUpdate = true;
    im.geometry.setAttribute('aSeed', new THREE.InstancedBufferAttribute(seeds, 1));

    return { instancedMesh: im, seeds };
  }, [missionaries, pinGeo, pinUniforms]);

  // Pin mat ref — we set it via the instancedMesh's material
  // (the ref above lets the per-frame update poke uOpacity uniformly)
  useMemo(() => {
    const mat = instancedMesh.material as THREE.ShaderMaterial;
    pinMatRef.current = mat;
    return null;
  }, [instancedMesh]);

  useFrame((state) => {
    const p = sceneRef.current.progress;
    const inT = smoothstep(VISIBLE_RANGE[0] - 0.02, VISIBLE_RANGE[0] + 0.08, p);
    const outT = 1 - smoothstep(VISIBLE_RANGE[1] - 0.08, VISIBLE_RANGE[1] + 0.02, p);
    const opacity = Math.max(0, Math.min(inT, outT));

    if (globeMatRef.current) {
      globeMatRef.current.uniforms.uOpacity.value = opacity;
    }
    if (pinMatRef.current) {
      pinMatRef.current.uniforms.uOpacity.value = opacity;
      pinMatRef.current.uniforms.uTime.value = state.clock.elapsedTime;
    }
    if (globeGroupRef.current) {
      // Slow continuous rotation — 1 full turn per ROTATION_SECONDS
      globeGroupRef.current.rotation.y =
        (state.clock.elapsedTime * Math.PI * 2) / ROTATION_SECONDS;
    }
  });

  // Position the globe BEHIND the Bible — visible when camera rises in Scene 6.
  // The CameraRig keyframe for Scene 6 lifts the camera up + back so the
  // globe enters frame from below the Bible.
  return (
    <group position={[0, -2.6, -1.8]}>
      <group ref={globeGroupRef}>
        <mesh geometry={globeGeo} renderOrder={1}>
          <shaderMaterial
            ref={globeMatRef}
            vertexShader={GLOBE_VERT}
            fragmentShader={GLOBE_FRAG}
            uniforms={globeUniforms}
            transparent
            depthWrite={false}
          />
        </mesh>
        <primitive object={instancedMesh} renderOrder={2} />
      </group>
    </group>
  );
}

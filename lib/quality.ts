/*
 * Adaptive quality tier detection.
 *
 * Per system doc Pattern (Cloud Castles approach): detect GPU class via
 * WEBGL_debug_renderer_info, then select rendering tier:
 *
 *   high   — full Tier 3 (HDRI, dust motes, ribbon physics, post-FX)
 *   medium — drop dust motes, simplify ribbon physics, lower-poly Bible, lighter post-FX
 *   low    — static-page fallback (no anchor animation; sections stack as editorial cards)
 *
 * Detection runs once on first client mount. Result is cached and exposed via
 * useQualityTier hook. User can manually override via Settings (Phase 5).
 *
 * Touches window — only call from useEffect or event handlers.
 */

export type QualityTier = 'high' | 'medium' | 'low';

interface DetectionResult {
  tier: QualityTier;
  reason: string;
  rendererString: string | null;
}

// Heuristics:
// 1. prefers-reduced-motion → low (hard rule, regardless of GPU)
// 2. Save-Data hint → low
// 3. Mobile + < 4GB memory → medium at best
// 4. GPU string matches known weak class → low or medium
// 5. Otherwise → high
const WEAK_GPU_PATTERNS = [
  /mali-?[0-9]{3}/i,
  /adreno (3[0-9]{2}|4[0-2][0-9])/i, // Adreno 3xx and lower 4xx
  /powervr.*g6[0-9]{3}/i,
  /intel.*hd graphics (3000|4000|4400)/i,
  /llvmpipe/i,
  /swiftshader/i,
];

const MEDIUM_GPU_PATTERNS = [
  /mali-?g[0-9]{2}/i,
  /adreno (5[0-9]{2}|6[0-2][0-9])/i,
  /intel.*iris/i,
];

export function detectQualityTier(): DetectionResult {
  if (typeof window === 'undefined') {
    return { tier: 'medium', reason: 'ssr', rendererString: null };
  }

  // Hard accessibility gate
  try {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return { tier: 'low', reason: 'prefers-reduced-motion', rendererString: null };
    }
  } catch {
    // matchMedia missing — proceed
  }

  // Save-Data hint
  const conn = (navigator as Navigator & {
    connection?: { saveData?: boolean; effectiveType?: string };
  }).connection;
  if (conn?.saveData) {
    return { tier: 'low', reason: 'save-data', rendererString: null };
  }
  if (conn?.effectiveType === '2g' || conn?.effectiveType === 'slow-2g') {
    return { tier: 'low', reason: 'slow-network', rendererString: null };
  }

  // Device-memory hint (mobile + low memory)
  const deviceMem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const isMobile = /mobile|android|iphone|ipad/i.test(navigator.userAgent);
  if (deviceMem !== undefined && deviceMem < 4 && isMobile) {
    return { tier: 'low', reason: `low-memory-${deviceMem}gb`, rendererString: null };
  }

  // GPU detection via debug renderer info
  let renderer: string | null = null;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (gl) {
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      if (ext) {
        renderer = String(gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || '');
      }
    }
  } catch {
    // GPU detection failed — default to medium on mobile, high on desktop
  }

  if (renderer) {
    for (const p of WEAK_GPU_PATTERNS) {
      if (p.test(renderer)) {
        return { tier: 'low', reason: 'weak-gpu', rendererString: renderer };
      }
    }
    for (const p of MEDIUM_GPU_PATTERNS) {
      if (p.test(renderer)) {
        return { tier: 'medium', reason: 'medium-gpu', rendererString: renderer };
      }
    }
  }

  // Fall through: mobile defaults to medium; desktop to high.
  if (isMobile) {
    return { tier: 'medium', reason: 'mobile-default', rendererString: renderer };
  }
  return { tier: 'high', reason: 'desktop-default', rendererString: renderer };
}

// Single-call cache — first detection wins
let cached: DetectionResult | null = null;

export function getQualityTier(): DetectionResult {
  if (cached) return cached;
  cached = detectQualityTier();
  return cached;
}

export function overrideQualityTier(tier: QualityTier) {
  cached = { tier, reason: 'user-override', rendererString: cached?.rendererString ?? null };
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem('gbc-quality-tier-override', tier);
    } catch {
      // storage disabled — fine, override applies for this session only
    }
  }
}

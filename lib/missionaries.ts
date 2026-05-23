/*
 * Missionaries loader + coordinate augmentation for the Scene 6 globe.
 *
 * Reads /content/missionaries/missionaries.ts (ported from v1 — 24 entries
 * with public-safe schema: no home addresses, no children's names, no
 * personal phones).
 *
 * Augments each entry with lat/lng for the globe via a hand-curated lookup
 * table keyed by `location`. For locations not in the table, falls back to
 * a region centroid (USA / Europe / Africa / etc.) so the pin still appears.
 *
 * Server-side only.
 */

import { missionaries as RAW_MISSIONARIES, type Missionary as RawMissionary } from '@/content/missionaries/missionaries';

export interface MissionaryWithCoords extends RawMissionary {
  lat: number;
  lng: number;
  /** True when coords are an exact city match; false when fell back to region centroid */
  exactCoords: boolean;
}

// Hand-curated lat/lng for the actual locations in the v1 dataset.
// Privacy-conscious: only public-known coordinates (city centers, mission
// agency cities, university campus cities). No personal residences.
const CITY_COORDS: Record<string, [number, number]> = {
  // Local — Dayton + East Tennessee
  'dayton, tn': [35.4998, -85.0102],
  'dayton + spring city, tn': [35.4998, -85.0102],
  'rockwood, tn (camp ozone)': [35.8676, -84.6849],
  'cleveland, tn': [35.1595, -84.8766],
  'chattanooga, tn': [35.0456, -85.3097],
  'knoxville, tn': [35.9606, -83.9207],
  'spring city, tn': [35.6856, -84.8593],

  // Domestic — other US states
  'orlando, fl': [28.5384, -81.3789],
  'memphis, tn': [35.1495, -90.049],
  'chicago, il': [41.8781, -87.6298],
  'denver, co': [39.7392, -104.9903],
  'dallas, tx': [32.7767, -96.797],
  'pittsburgh, pa': [40.4406, -79.9959],
  'virginia beach, va': [36.8529, -75.978],
  'colorado springs, co': [38.8339, -104.8214],
  'asheville, nc': [35.5951, -82.5515],
  'raleigh, nc': [35.7796, -78.6382],

  // International
  'taiwan': [23.6978, 120.9605],
  'dayton, tn → taiwan': [23.6978, 120.9605],
  'thailand': [15.87, 100.9925],
  'bangkok, thailand': [13.7563, 100.5018],
  'chiang mai, thailand': [18.7883, 98.9853],
  'mozambique': [-18.6657, 35.5296],
  'maputo, mozambique': [-25.9692, 32.5732],
  'beira, mozambique': [-19.8437, 34.8389],
  'albania': [41.1533, 20.1683],
  'tirana, albania': [41.3275, 19.8187],
  'spain': [40.4637, -3.7492],
  'madrid, spain': [40.4168, -3.7038],
  'barcelona, spain': [41.3851, 2.1734],
  'germany': [51.1657, 10.4515],
  'berlin, germany': [52.52, 13.405],
  'ukraine': [48.3794, 31.1656],
  'kyiv, ukraine': [50.4501, 30.5234],
  'mexico': [23.6345, -102.5528],
  'mexico city, mexico': [19.4326, -99.1332],
  'brazil': [-14.235, -51.9253],
  'são paulo, brazil': [-23.5505, -46.6333],
  'kenya': [-0.0236, 37.9062],
  'nairobi, kenya': [-1.2864, 36.8172],
  'south africa': [-30.5595, 22.9375],
  'cape town, south africa': [-33.9249, 18.4241],
  'uk': [55.3781, -3.436],
  'london, uk': [51.5074, -0.1278],
  'philippines': [12.8797, 121.774],
  'manila, philippines': [14.5995, 120.9842],
  'japan': [36.2048, 138.2529],
  'tokyo, japan': [35.6762, 139.6503],
  'south korea': [35.9078, 127.7669],
  'india': [20.5937, 78.9629],
  'haiti': [18.9712, -72.2852],
  'port-au-prince, haiti': [18.5944, -72.3074],
  'dominican republic': [18.7357, -70.1627],
};

// Region fallbacks for locations not in the city table
const REGION_FALLBACK: Record<string, [number, number]> = {
  local: [35.4998, -85.0102],          // Dayton, TN
  domestic: [39.8283, -98.5795],       // Geographic center of USA
  international: [0, 0],                // Equator/prime meridian — uncalibrated
};

function lookup(location: string, region: string): { coords: [number, number]; exact: boolean } {
  const key = location.toLowerCase().trim();
  if (CITY_COORDS[key]) return { coords: CITY_COORDS[key], exact: true };
  // Try partial matches — e.g. "Dayton, TN → Taiwan" matches "taiwan"
  for (const [k, v] of Object.entries(CITY_COORDS)) {
    if (key.includes(k) || k.includes(key)) {
      return { coords: v, exact: true };
    }
  }
  const fallback = REGION_FALLBACK[region] ?? REGION_FALLBACK.international;
  return { coords: fallback, exact: false };
}

export function loadMissionariesForGlobe(): MissionaryWithCoords[] {
  return RAW_MISSIONARIES.map((m) => {
    const { coords, exact } = lookup(m.location, m.region);
    return { ...m, lat: coords[0], lng: coords[1], exactCoords: exact };
  });
}

export function getMissionaryCount(): number {
  return RAW_MISSIONARIES.length;
}

export { RAW_MISSIONARIES as ALL_MISSIONARIES };
export type { RawMissionary as Missionary };

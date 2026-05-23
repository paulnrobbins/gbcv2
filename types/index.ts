/*
 * Shared types across the app.
 */

import type { QualityTier } from '@/lib/quality';

export type { QualityTier };

// Planning Center iCal event shape (post-parse, pre-render)
export interface CalendarEvent {
  uid: string;
  summary: string;
  description?: string;
  location?: string;
  start: Date;
  end: Date;
  url?: string;
}

// YouTube video shape (from Data API)
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
  duration?: string; // ISO 8601
}

// Missionary record (from /content/missionaries)
export interface Missionary {
  slug: string;
  surname: string;
  firstNames?: string;
  fieldCountry: string;
  fieldRegion?: string;
  agency?: string;
  focus?: string;
  agencyAddress?: string; // preferred over personal address for public site
  agencyEmail?: string;
  bioMd?: string;
  // Lat/lng for Scene 6 globe pin placement
  lat?: number;
  lng?: number;
  // Privacy flag — if true, suppress surname + use first names only
  sensitiveLocation?: boolean;
}

// Ministry category — matches v1 schema (lowercase, hyphenated)
export type MinistryCategory = 'kids' | 'youth' | 'young-adults' | 'adults';

// Ministry record (from /content/ministries/ministries.ts).
// Extended category 'care' = life-stage care ministries (GriefShare, Moms4Moms).
export interface Ministry {
  slug: string;
  title: string;
  category: MinistryCategory | 'care';
  shortDescription: string;
  fullDescription: string;
  meetingTime?: string;
  location?: string;
  ageRange?: string;
  contact?: {
    name?: string;
    email?: string;
    phone?: string;
  };
  season?: string;
}

// Grace Group record (from /content/grace-groups)
export interface GraceGroup {
  slug: string;
  leaderName: string;
  meetingNight?: string;
  generalLocation?: string;
  photoPath?: string;
  blurb?: string;
}

// Belief (Statement of Faith) — for the scrollytell
export interface Belief {
  order: number;
  title: string;
  body: string;
  scriptureRefs: string[];
}

// Scripture record for Scene 3 weekly rotation
export interface ScriptureEntry {
  ref: string;
  text: string;
  translation?: string;
  weekOf?: string; // ISO date
}

/*
 * YouTube Data API v3 client — sermons + live detection.
 *
 * Server-side only. Reads YOUTUBE_API_KEY (server env) and
 * NEXT_PUBLIC_YOUTUBE_CHANNEL_ID (the GBC channel UCLtcNDdjDaSVqI-UJ9AF4KA).
 *
 * Three calls used:
 *   1. fetchRecentSermons(n) — pulls the most recent N videos from the channel's
 *      uploads playlist. ISR cached for 30 minutes.
 *   2. fetchLatestSermon()   — convenience; first of fetchRecentSermons(1).
 *   3. fetchIsLive()         — search.list?eventType=live; returns the live
 *      video id or null. ISR cached for 2 minutes during service hours.
 *
 * Failure is silent — empty array / null on quota errors, missing key, or
 * network failure. The page renders the "no sermon available right now"
 * placeholder, which is also what shows in dev without an API key.
 */

import type { YouTubeVideo } from '@/types';

const API_BASE = 'https://www.googleapis.com/youtube/v3';
const SERMONS_REVALIDATE = 1800; // 30 minutes
const LIVE_REVALIDATE = 120;     // 2 minutes

interface ApiVideoSnippet {
  title: string;
  description: string;
  publishedAt: string;
  thumbnails?: { medium?: { url: string }; high?: { url: string }; maxres?: { url: string } };
  resourceId?: { videoId: string };
}

interface ApiPlaylistItem {
  snippet: ApiVideoSnippet;
}

interface ApiPlaylistResponse {
  items?: ApiPlaylistItem[];
}

interface ApiSearchItem {
  id: { videoId: string };
  snippet: ApiVideoSnippet;
}

interface ApiSearchResponse {
  items?: ApiSearchItem[];
}

interface ApiChannelResponse {
  items?: Array<{ contentDetails?: { relatedPlaylists?: { uploads?: string } } }>;
}

function getKey(): string | null {
  const k = process.env.YOUTUBE_API_KEY;
  return k && k.length > 0 ? k : null;
}

function getChannelId(): string | null {
  const id = process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL_ID;
  return id && id.length > 0 ? id : null;
}

// Cache the uploads playlist id across requests in the same Node process
let cachedUploadsId: string | null = null;
let cachedUploadsAt: number = 0;
const UPLOADS_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h

async function fetchUploadsPlaylistId(): Promise<string | null> {
  const now = Date.now();
  if (cachedUploadsId && now - cachedUploadsAt < UPLOADS_CACHE_TTL_MS) {
    return cachedUploadsId;
  }
  const key = getKey();
  const channelId = getChannelId();
  if (!key || !channelId) return null;

  try {
    const url = `${API_BASE}/channels?part=contentDetails&id=${channelId}&key=${key}`;
    const res = await fetch(url, { next: { revalidate: 60 * 60 * 24 } });
    if (!res.ok) return null;
    const data = (await res.json()) as ApiChannelResponse;
    const uploads = data.items?.[0]?.contentDetails?.relatedPlaylists?.uploads ?? null;
    if (uploads) {
      cachedUploadsId = uploads;
      cachedUploadsAt = now;
    }
    return uploads;
  } catch {
    return null;
  }
}

/**
 * Most recent uploads from the GBC channel.
 * Phase 4a uses this in Scene 3 (latest sermon embed) + /sermons archive (Phase 4c).
 */
export async function fetchRecentSermons(limit: number = 12): Promise<YouTubeVideo[]> {
  const key = getKey();
  if (!key) return [];

  const uploadsId = await fetchUploadsPlaylistId();
  if (!uploadsId) return [];

  try {
    const url =
      `${API_BASE}/playlistItems?part=snippet&maxResults=${Math.min(limit, 50)}` +
      `&playlistId=${uploadsId}&key=${key}`;
    const res = await fetch(url, { next: { revalidate: SERMONS_REVALIDATE } });
    if (!res.ok) return [];
    const data = (await res.json()) as ApiPlaylistResponse;
    const items = data.items ?? [];

    return items
      .map((it) => {
        const sn = it.snippet;
        const videoId = sn.resourceId?.videoId;
        if (!videoId) return null;
        const thumb =
          sn.thumbnails?.maxres?.url ??
          sn.thumbnails?.high?.url ??
          sn.thumbnails?.medium?.url ??
          '';
        return {
          id: videoId,
          title: sn.title,
          description: sn.description,
          publishedAt: sn.publishedAt,
          thumbnailUrl: thumb,
        } satisfies YouTubeVideo;
      })
      .filter((v): v is YouTubeVideo => v !== null);
  } catch {
    return [];
  }
}

export async function fetchLatestSermon(): Promise<YouTubeVideo | null> {
  const [first] = await fetchRecentSermons(1);
  return first ?? null;
}

/**
 * Returns the live video id if the channel is currently live-streaming,
 * otherwise null. Cached for 2 minutes so quota isn't burned during long visits.
 */
export async function fetchIsLive(): Promise<string | null> {
  const key = getKey();
  const channelId = getChannelId();
  if (!key || !channelId) return null;

  try {
    const url =
      `${API_BASE}/search?part=snippet&channelId=${channelId}` +
      `&type=video&eventType=live&maxResults=1&key=${key}`;
    const res = await fetch(url, { next: { revalidate: LIVE_REVALIDATE } });
    if (!res.ok) return null;
    const data = (await res.json()) as ApiSearchResponse;
    return data.items?.[0]?.id.videoId ?? null;
  } catch {
    return null;
  }
}

export const YOUTUBE_SERMONS_REVALIDATE = SERMONS_REVALIDATE;
export const YOUTUBE_LIVE_REVALIDATE = LIVE_REVALIDATE;

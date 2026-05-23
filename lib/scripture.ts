/*
 * Scripture loader.
 *
 * Single source of truth: /content/scripture/current.json
 * Paul edits the JSON each week (or batches a quarter at a time), pushes,
 * Vercel auto-redeploys with the new scripture in Scene 3.
 *
 * Server-side only.
 */

import fs from 'node:fs/promises';
import path from 'node:path';

export interface CurrentScripture {
  weekOf: string;
  ref: string;
  text: string;
  translation: string;
  sermonSeriesTitle: string;
  sermonSeriesSubtitle: string;
}

const FALLBACK: CurrentScripture = {
  weekOf: '',
  ref: 'Ephesians 2:8-9',
  text: 'For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast.',
  translation: 'ESV',
  sermonSeriesTitle: 'Walking by Faith',
  sermonSeriesSubtitle: 'A series in Hebrews 11',
};

export async function loadCurrentScripture(): Promise<CurrentScripture> {
  try {
    const file = path.join(process.cwd(), 'content', 'scripture', 'current.json');
    const raw = await fs.readFile(file, 'utf-8');
    const parsed = JSON.parse(raw) as Partial<CurrentScripture>;
    return { ...FALLBACK, ...parsed };
  } catch {
    return FALLBACK;
  }
}

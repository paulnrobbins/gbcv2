/*
 * Quality tier hook.
 *
 * Returns the detected GPU/network quality tier. Detection happens once on
 * first effect; subsequent renders return the cached value. localStorage
 * override is respected if set.
 */
'use client';

import { useEffect, useState } from 'react';
import { getQualityTier, type QualityTier } from '@/lib/quality';

const STORAGE_KEY = 'gbc-quality-tier-override';

export function useQualityTier(): QualityTier {
  // Always start with 'medium' so SSR and first client render match.
  // Real tier comes in after first effect.
  const [tier, setTier] = useState<QualityTier>('medium');

  useEffect(() => {
    let override: QualityTier | null = null;
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === 'high' || stored === 'medium' || stored === 'low') {
        override = stored;
      }
    } catch {
      // storage disabled — fine
    }
    if (override) {
      setTier(override);
    } else {
      setTier(getQualityTier().tier);
    }
  }, []);

  return tier;
}

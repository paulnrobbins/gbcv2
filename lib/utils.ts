import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Standard class-merge helper — Tailwind-aware
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Service-time text helper — used in Hero, Footer, /visit, /contact
export const SERVICE_TIMES = {
  sundaySchoolLabel: 'Sunday School (all ages)',
  sundaySchoolTime: '9:15 – 10:15 AM',
  worshipLabel: 'Worship Service',
  worshipTime: '10:30 AM',
  day: 'Sunday',
};

export const CHURCH_INFO = {
  name: 'Grace Bible Church',
  cityState: 'Dayton, Tennessee',
  address: '2809 Old Washington Hwy, Dayton, TN 37321',
  addressShort: '2809 Old Washington Hwy',
  phone: '423-775-5460',
  phoneTel: '+14237755460',
  email: 'office@gbcdayton.org',
  tagline: 'LOVE God, LOVE People, IMPACT the World',
  youtubeChannelUrl: 'https://www.youtube.com/channel/UCLtcNDdjDaSVqI-UJ9AF4KA',
  facebookUrl: 'https://www.facebook.com/Grace-Bible-Church-Dayton-326049520973/',
  giveUrl: 'https://gracebibledayton.churchcenter.com/unproxy/giving',
  mapsUrl:
    'https://www.google.com/maps/place/2809+Old+Washington+Hwy,+Dayton,+TN+37321/@35.5059004,-84.9710667,17z',
  accessibilityNote:
    'Assisted listening devices are available in the lobby. ASL interpretation can be requested for any service.',
};

export function formatEventDate(d: Date): string {
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}

export function formatEventTime(d: Date): string {
  return d.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
}

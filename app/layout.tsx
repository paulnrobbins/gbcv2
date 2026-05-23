/*
 * Root layout.
 *
 * Mounts the global font CSS variables (Newsreader, Inter Tight, Cormorant
 * Garamond Italic) via next/font/google — self-hosts the woff2 files into
 * the Next build, no FOUT, no network call to fonts.googleapis.com.
 *
 * Wraps every page in the provider tree:
 *   • LenisProvider          smooth scroll
 *   • AudioProvider          sound layer (default muted)
 *
 * Mounts visible-from-frame-1 chrome:
 *   • Nav, MuteToggle        page-margin layout
 *   • ErrorCatcher           visible production error surfacer
 *
 * Per Bug Audit: next/font/google is used (NOT next/font/local) — no
 * dependency on physical files in public/fonts/.
 */
import type { Metadata, Viewport } from 'next';
import { Newsreader, Inter_Tight, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { AudioProvider } from '@/components/providers/AudioProvider';
import { Nav } from '@/components/layout/Nav';
import { MuteToggle } from '@/components/layout/MuteToggle';
import { ErrorCatcher } from '@/components/ui/ErrorCatcher';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { CHURCH_INFO } from '@/lib/utils';

// Display: Newsreader — editorial gravitas, optical-size variable
const fontDisplay = Newsreader({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['300', '400', '500'],
  display: 'swap',
});

// Body: Inter Tight — flagged for Phase 5 review (Inter blacklist adjacency)
const fontBody = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '500', '600'],
  display: 'swap',
});

// Scripture italic — sparing use only
const fontScripture = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-scripture',
  weight: ['400', '500'],
  style: ['italic'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://gbcdayton.org'),
  title: {
    default: `${CHURCH_INFO.name} — ${CHURCH_INFO.cityState}`,
    template: `%s — ${CHURCH_INFO.name}`,
  },
  description:
    'Grace Bible Church in Dayton, Tennessee. Sunday worship at 10:30 AM. Sunday School at 9:15 AM for all ages. Love God. Love people. Impact the world.',
  openGraph: {
    title: `${CHURCH_INFO.name} — ${CHURCH_INFO.cityState}`,
    description:
      'Sunday worship at 10:30 AM in Dayton, Tennessee. You are welcome here.',
    type: 'website',
    locale: 'en_US',
    url: 'https://gbcdayton.org',
    siteName: CHURCH_INFO.name,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${CHURCH_INFO.name} — ${CHURCH_INFO.cityState}`,
    description: 'Sunday worship at 10:30 AM in Dayton, Tennessee.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#F4ECDC',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontScripture.variable}`}
    >
      <body>
        <LenisProvider>
          <AudioProvider>
            <Nav />
            <MuteToggle />
            {children}
            <CustomCursor />
            <ErrorCatcher />
          </AudioProvider>
        </LenisProvider>
      </body>
    </html>
  );
}

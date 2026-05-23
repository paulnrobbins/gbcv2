/*
 * Favicon — generated at build time via next/og.
 *
 * 32×32 ink-on-gilt monogram. Same approach as the OG image — no file
 * path to maintain, no risk of a 404 on Vercel.
 *
 * Bug Audit prevention: covers the "favicon exists" gate without needing
 * a /public/favicon.ico to ship.
 */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 32, height: 32 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#C8964A',
          color: '#1A1410',
          fontSize: 22,
          fontWeight: 600,
          fontFamily: 'Georgia, serif',
          letterSpacing: '-0.04em',
        }}
      >
        g
      </div>
    ),
    { ...size }
  );
}

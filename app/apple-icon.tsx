/*
 * Apple touch icon — 180×180 monogram, larger version of the favicon.
 * Generated so iOS adds-to-home-screen gets a proper icon.
 */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
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
          fontSize: 130,
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

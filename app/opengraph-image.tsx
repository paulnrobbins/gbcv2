/*
 * Open Graph image — generated at build time via next/og.
 *
 * Renders the hero composition as a static 1200×630 PNG that Next.js
 * serves at /opengraph-image when any link is shared on Twitter, Facebook,
 * iMessage, Slack, etc.
 *
 * Bug Audit Failure Mode prevention: this approach generates the OG image
 * from code, so there's no file path that can 404 — the route always exists.
 *
 * Design: warm-cream background, oversized Newsreader-style display type
 * (we use a serif fallback since next/og requires a font file fetch and
 * we want zero remote dependencies at OG generation time), gilt accent,
 * service times + city as the editorial caption.
 */
import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Grace Bible Church — Dayton, Tennessee. Sunday worship at 10:30 AM.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BONE = '#F4ECDC';
const INK = '#1A1410';
const GILT = '#C8964A';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: BONE,
          padding: '80px 96px',
          fontFamily: 'Georgia, serif',
          color: INK,
        }}
      >
        {/* Top eyebrow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px',
          fontSize: '20px',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: '#0006',
        }}>
          <span>Dayton, Tennessee</span>
          <span style={{
            display: 'inline-block',
            width: '40px',
            height: '1px',
            background: GILT,
          }} />
          <span>Sundays at 10:30 AM</span>
        </div>

        {/* Hero title */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
        }}>
          <div style={{
            display: 'flex',
            fontSize: '180px',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            color: INK,
          }}>
            Grace Bible
          </div>
          <div style={{
            display: 'flex',
            fontSize: '180px',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            fontWeight: 400,
            color: INK,
          }}>
            Church.
          </div>
        </div>

        {/* Bottom caption */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
        }}>
          <div style={{
            display: 'flex',
            fontSize: '24px',
            letterSpacing: '0.04em',
            color: '#0008',
            maxWidth: '520px',
            lineHeight: 1.4,
          }}>
            LOVE God. LOVE People. IMPACT the World.
          </div>
          <div style={{
            display: 'flex',
            fontSize: '20px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: GILT,
          }}>
            gbcdayton.org
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

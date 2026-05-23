/*
 * Visible runtime error surfacer.
 *
 * Mounted on every page. Catches window-level errors and unhandled promise
 * rejections, then renders them in the DOM in a gilt-bordered panel.
 *
 * The difference between this and React's error boundaries: this catches
 * errors that happen OUTSIDE the React tree (Three.js / Lenis / Howler /
 * GSAP internal failures), which would otherwise produce the useless
 * "Application error: a client-side exception has occurred" in Vercel prod.
 *
 * Pattern lifted from Part 6 of the system doc.
 */
'use client';

import { useEffect, useState } from 'react';

const MAX_ERRORS = 5;

export function ErrorCatcher() {
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    const onError = (e: ErrorEvent) => {
      const msg = `${e.message}\n  at ${e.filename}:${e.lineno}:${e.colno}`;
      setErrors((prev) => (prev.length < MAX_ERRORS ? [...prev, msg] : prev));
      // Mirror to console for devs with DevTools open
      console.error('[ErrorCatcher]', e.error || e.message);
    };
    const onReject = (e: PromiseRejectionEvent) => {
      const reason = e.reason as { message?: string } | undefined;
      const msg = `Unhandled promise: ${reason?.message ?? String(e.reason)}`;
      setErrors((prev) => (prev.length < MAX_ERRORS ? [...prev, msg] : prev));
      console.error('[ErrorCatcher]', e.reason);
    };
    window.addEventListener('error', onError);
    window.addEventListener('unhandledrejection', onReject);
    return () => {
      window.removeEventListener('error', onError);
      window.removeEventListener('unhandledrejection', onReject);
    };
  }, []);

  if (errors.length === 0) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      style={{
        position: 'fixed',
        bottom: '6rem',
        left: '1rem',
        right: '1rem',
        maxWidth: '40rem',
        margin: '0 auto',
        padding: '1rem 1.25rem',
        background: 'rgba(26, 20, 16, 0.96)',
        border: '1px solid #C8964A',
        color: '#F4ECDC',
        zIndex: 9999,
        fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
        fontSize: '12px',
        lineHeight: 1.5,
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        borderRadius: '2px',
      }}
    >
      <strong style={{ color: '#C8964A', fontFamily: 'inherit' }}>Runtime error</strong>
      {errors.map((e, i) => (
        <div key={i} style={{ marginTop: '0.6rem' }}>{e}</div>
      ))}
    </div>
  );
}

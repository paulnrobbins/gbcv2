import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx,mdx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  theme: {
    extend: {
      // Color tokens map 1:1 to CSS variables in styles/tokens.css
      // Use class form (bg-bone, text-ink, text-gilt) — never raw hex
      colors: {
        bone: 'var(--bone)',
        ink: 'var(--ink)',
        gilt: 'var(--gilt)',
        // Tonal variants for layered surfaces (never used as a 4th brand color)
        'ink-soft': 'var(--ink-soft)',
        'bone-warm': 'var(--bone-warm)',
        'gilt-deep': 'var(--gilt-deep)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
        scripture: ['var(--font-scripture)', 'Georgia', 'serif'],
      },
      fontSize: {
        // Editorial scale: hero display goes oversized per Pillar 1
        'display-2xl': ['clamp(4rem, 12vw, 10rem)', { lineHeight: '0.95', letterSpacing: '-0.02em' }],
        'display-xl': ['clamp(3rem, 8vw, 6rem)', { lineHeight: '1.0', letterSpacing: '-0.015em' }],
        'display-lg': ['clamp(2.25rem, 5vw, 4rem)', { lineHeight: '1.05', letterSpacing: '-0.01em' }],
        'display-md': ['clamp(1.75rem, 3.5vw, 2.75rem)', { lineHeight: '1.1' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6' }],
        'body': ['1rem', { lineHeight: '1.65' }],
        'caption': ['0.8125rem', { lineHeight: '1.5', letterSpacing: '0.04em' }],
      },
      spacing: {
        // Scene-to-scene macro whitespace (Pillar 4 — 30-50% of content height)
        'scene': '40vh',
        'scene-tight': '24vh',
      },
      transitionTimingFunction: {
        // Cinematic camera easing — never ease-in-out default
        'editorial': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'gilt': 'cubic-bezier(0.45, 0, 0.15, 1)',
      },
    },
  },
  plugins: [],
};

export default config;

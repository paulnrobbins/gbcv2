# Grace Bible Church Dayton — v2

A Tier 3 Inhabitable World rebuild of gbcdayton.org. The visitor walks through the open page of a 3D Bible; each section is a turned page; scripture rises as gilded type.

Reference: see `grace-bible-church-v2-brief.md` in this folder for the full Phase 1 Foundation Brief (anchor object, scroll score, asset plan, file structure, all locked decisions).

## Tech stack

- **Next.js 14** (App Router)
- **React Three Fiber + drei + postprocessing** for the 3D Bible world
- **GSAP + ScrollTrigger** for scene choreography (ScrollTrigger registered at module top per Bug Audit Failure Mode #13)
- **Lenis** for smooth scroll
- **Howler.js** for sound layer (default muted; obvious toggle from frame 1)
- **Tailwind** with strict 2-color + 1-accent design tokens (Bone / Ink / Gilt)
- **Newsreader + Inter Tight + Cormorant Garamond Italic** via `next/font/google`
- **Markdown-driven content** (no CMS) — Paul edits files in `/content`, pushes, Vercel auto-redeploys

## Local development

```bash
npm install
cp .env.example .env.local   # fill in keys
npm run dev                  # localhost:3000
```

Required env vars: `YOUTUBE_API_KEY` (server-side), `PLANNING_CENTER_ICAL_URL`. See `.env.example`.

## Build verification

```bash
npm run type-check
npm run lint
npm run build
```

All three must exit 0 before any deploy. The Pre-Push Bug Audit (Part 6 of the system doc) runs at end of Phase 5.

## Folder structure

```
app/                   Next.js App Router routes
components/
├── sections/          Homepage scenes (one per scroll page)
├── three/             R3F primitives (Canvas, Bible, light, postFX)
├── layout/            Nav, Footer, MuteToggle, AccessibilityNote
├── ui/                ErrorCatcher, WorldErrorBoundary, Loader, Button, primitives
└── providers/         LenisProvider, AudioProvider
lib/                   gsap (with ScrollTrigger at module top), lenis, audio, quality, content, utils
hooks/                 useMounted (hydration safety), useReducedMotion, useQualityTier, useMuted
styles/                tokens.css (CSS variables for Bone / Ink / Gilt + type scale)
content/               Markdown content Paul edits
public/                Static assets (fonts, photos, audio, models, HDRIs, og)
```

## Editing content (post-launch)

All site content lives in `/content` as `.mdx` or `.ts` files. To update:

1. Edit the relevant file in `/content`
2. `git commit && git push`
3. Vercel auto-deploys

Detailed editing instructions ship in `MAINTENANCE.md` at Phase 5.

## Status

| Phase | Status |
|---|---|
| 1 — Foundation brief | Complete |
| 2 — Scaffolding & design tokens | **In progress** |
| 3 — Hero + Bible anchor + loading theater | Pending |
| 4a — Homepage scenes 3–7 + APIs | Pending |
| 4b — Subpages: Beliefs, Ministries, Grace Groups | Pending |
| 4c — Subpages: Sermons, Live, Calendar, Missions, About | Pending |
| 5 — Polish, mobile, performance, bug audit, handoff | Pending |

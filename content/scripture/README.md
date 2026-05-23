# Weekly scripture

Edit `current.json` each week to rotate the scripture displayed in Scene 3 of the homepage.

## Schema

```json
{
  "weekOf": "2026-05-17",                 // ISO date for the week this verse goes live (informational)
  "ref": "Ephesians 2:8-9",               // Reference, displayed as caption beneath the quote
  "text": "For by grace you have been...", // The verse text itself
  "translation": "ESV",                   // Translation abbreviation
  "sermonSeriesTitle": "Walking by Faith",
  "sermonSeriesSubtitle": "A series in Hebrews 11"
}
```

## To update

1. Edit `current.json` with the new week's verse and (if needed) the series info.
2. `git commit -m "scripture: week of 2026-05-24"` and push.
3. Vercel auto-redeploys within ~60 seconds. The page rebuilds every 10 minutes via ISR even without a deploy, so changes that hit `main` go live on the next revalidation regardless.

## Notes

- Keep the verse text in straight ASCII quotes — the page wraps it in proper smart quotes automatically.
- Reference format follows your usual citation style (e.g. `Romans 8:28`, `1 Corinthians 13:4-7`, `Psalm 23`).
- Translation goes in the small caption next to the reference — keep it short (ESV, NIV, KJV, NASB, etc.).
- The 3D gilded scripture in the Canvas uses this same text, so changes show up there too.

## Future: scripture history

If you want to keep a record of past weeks' verses (for a /scripture-archive page or analytics on which verses got reused), drop them as dated JSON files in this folder (`2026-05-17.json`, `2026-05-24.json`, etc.) — that schema is ready in Phase 5+ when you want it.

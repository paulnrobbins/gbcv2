# Grace Bible Church v2 — Phase 1 Foundation Brief
*Tier 3 Inhabitable World rebuild. Canonical reference for all subsequent phases.*

---

## Confirmation Recital

1. **Three Foundations.** Purpose (3D must BE the brand or carry the brand). Restraint (80% still / 20% moves). Performance (60fps mid-range mobile or it's failed).
2. **Anchor Object.** "The Living Page" — a 3D Bible whose interior page-space IS the inhabited world. Each section is a turned page; the visitor walks the corridor of the open Bible. The book is the architecture. Literal to the brand (Grace *Bible* Church; first core value Teach the Word) and unprecedented in church-site work.
3. **Failure mode being watched.** Effect Stacking. With seven scenes, ambient atmosphere, dust motes, ribbon physics, scripture gilding, sound design, and reactive environment, the temptation is to over-decorate. Rule: only the **current page's** scripture or photo is allowed to be loud. Everything else is still or slow ambient drift. The 80/20 motion rule from Part 1 is non-negotiable.
4. **Phase Closeout Block.** Will appear at the end of every phase response with full WHAT'S DONE / FILES PRODUCED / CURRENT PROJECT STATE / NEXT PHASE / TO CONTINUE / TO RESUME IN FRESH CHAT sections.
5. **Skill Discovery Protocol.** Run. No changes since the doc was last updated. Confirmed available: `3d-web-experience`, `frontend-design`, `theme-factory`, `algorithmic-art`, `web-artifacts-builder`, `canvas-design`, `pdf`, `docx`, `xlsx`, `pptx`. No new skills require integration into this build's stack.
6. **Mode identification.** Remake Mode. Source: gbcdayton.org (Clover Sites template, audited). Previous Tier 1/2 build exists at `Websites/grace-bible-church/` — used as content inventory and decisions reference, not as source code; new build is a clean architectural reset.
7. **Bug Audit commitment.** Pre-Push Bug Audit (Part 6) runs before any "ready to deploy" claim. Specific failure mode being watched on THIS project given the stack: **Failure Mode #13 (GSAP ScrollTrigger race)** — the 7-scene page-turn choreography depends on tight ScrollTrigger sequencing, and the master `BibleScene` component will import ScrollTrigger synchronously while providers register it. Plugin registration goes at module top in `lib/gsap.ts`, never lazy-imported. Also watching **Failure Mode #4** (drei `<Environment files>` with missing HDRI) and **#1** (`document` access in render bodies) given the heavy R3F surface.
8. **File Structure Protocol.** Followed. Next.js 14 App Router conventions, `app/` for routes, `components/sections/` for homepage scenes, `components/three/` for R3F primitives, `lib/` for utilities, `content/` for markdown sources, `public/` for static assets. No flat dumping. Section-coupled 3D pieces (e.g. `HeroBibleScene.tsx`) live next to their consumer, not in `three/`.
9. **Anti-AI-Tell rules.** Followed. No auto-numbered section labels (no `01 — WELCOME`). No "label + explanation" pairs. No filler microcopy ("Below you'll find…"). No generic CTAs — "Plan a Visit", "Watch this Sunday's sermon", "Find a Grace Group", "Pray for our missionaries", "Send a connection card" replace any "Learn More" / "Get Started" instinct. No three-feature grid in identical cards. Mirror test applied to every headline.
10. **Experience Tier.** **Tier 3 — Inhabitable World.** Reasoning: Paul explicitly requested Tier 3 elevation of an existing Tier 1/2 brief; the church's character (small, multi-generational, scholarly, mission-minded) carries enough emotional weight to justify an inhabitable atmosphere over a polished page; the Bible-as-architecture concept only delivers its full payoff at Tier 3 because the visitor must actually *walk through* the book. All eight World-Building Patterns activated: Atmospheric Foundation, Ambient Life, Cinematic Camera, Spatial Navigation, Sound Design, Loading as Theater, Reactive Environment, Environmental Storytelling.
11. **Asset Readiness Check.** **HDRIs:** sourcing from Poly Haven CC0 — target search: "church interior", "stained glass", "warm window light"; Paul may run Nano Banana Pro manually if Poly Haven's options don't hit the warm-amber tone. **PBR materials:** AmbientCG CC0 — leather (Bible cover), paper (page surface), wood (implied pulpit), gold leaf (gilt). **Real photography:** 9 GBC archive photos confirmed at `public/photos/church/` in original build folder — will carry over. Additional photos and staff headshots noted as pending (per original brief; not blocking Phase 2). **Sound:** Freesound CC0 — page-turn foley, room tone, organ pedal note; Paul may run Suno manually for a custom ambient bed if needed. **3D models:** procedural Three.js geometry for prototype Bible; Paul will run Hyper3D/Rodin manually for the production-quality leather Bible cover when commissioned. Asset ceiling: **achievable** at Tier 3 with free CC0 + manual paid runs for hero Bible model and optional custom HDRI.
12. **Humanizer Pass commitment.** All copy passes through `humanizer.md` rules. Specific watch on THIS project: **copula avoidance** ("serves as" / "stands as" / "represents") given the ministry-site temptation toward formal-sounding prose; **undue emphasis on significance** ("a pivotal moment", "deeply rooted", "lasting impact") given the church context's gravity; **em dash overuse** given recent pattern in the original brief; **rule of three / parallelism overuse** given the tagline already uses it ("LOVE God, LOVE People, IMPACT the World") and the temptation to mirror it everywhere.
13. **Font choice commitment.** Per Paul's instruction, original lock holds: **Newsreader (Google Fonts) for display** — editorial gravitas, designed for editorial use, free; **Inter Tight (Google Fonts) for body** — modern, technical, readable, free. **Acknowledgement of blacklist proximity:** Inter Tight is a different family from Inter and not technically on the Pillar 1 blacklist, but it's adjacent. Flagged for Phase 5 polish gate — if it reads generic in production, propose swap to Geist or Manrope as one-token replacement. **Not using on this project:** Fraunces (used recently on adjacent build per pattern check; would create typographic family resemblance), Inter (blacklist), Roboto (blacklist), Space Grotesk (blacklist). Tiempos Text Italic as the scripture italic for callouts; Cormorant Garamond Italic as the free fallback. Variable font preferred where Newsreader supports it.
14. **Complexity-vs-Vision match commitment.** Vision is Tier 3 maximalist (inhabitable world, eight world-building patterns active, seven choreographed scroll scenes, sound design as a real layer). Implementation must match: extensive ScrollTrigger orchestration, multiple synchronized motion layers (Bible page-turn + ambient dust + ribbon physics + camera breath + scripture gilding), HDR environment lighting, ACES Filmic tone mapping, custom shaders for the gold-leaf scripture, Howler.js spatial audio, adaptive quality via GPU detection. Will NOT under-build (hero + three sections + footer would fail the tier). Will NOT over-build (no shader for the sake of shader — every effect serves a scene's emotional beat).

Recital ends.

---

## Project Metadata

| Field | Value |
|---|---|
| **Project name** | Grace Bible Church v2 (gbc-dayton-tier3) |
| **Source URL** | gbcdayton.org (current Clover Sites template) |
| **Target stack** | Next.js 14 (App Router) + React Three Fiber + drei + Lenis + GSAP/ScrollTrigger + Tailwind + Howler.js |
| **Deployment** | Self-Deploy by Paul (Kingdom Digital Services umbrella; Vercel + GitHub) |
| **CMS** | Markdown-driven (Mode 2 from system doc); content lives in `/content` as `.mdx` and `.ts`; Paul edits, pushes, Vercel auto-redeploys |
| **Calendar source** | Planning Center iCal feed (carried from original brief) |
| **Donation link** | `https://gracebibledayton.churchcenter.com/unproxy/giving` (carried from original brief) |
| **Mobile traffic** | 65–75% (multi-generational audience confirmed) — mobile-first design with strict Lighthouse mobile ≥ 80 target |
| **Build scope** | Production-ready Tier 3 |
| **Sacred cows** | `gbc` black-circle logo unchanged; tagline "LOVE God, LOVE People, IMPACT the World" unchanged; service times verbatim; address verbatim; assisted-listening-device note treated as a moment (not a footer asterisk) |
| **Build mode** | Phased (5 phases, with Phase 4 likely split into 4a/4b/4c for the subpages) |
| **Mode** | Remake (Tier 3 elevation of existing v1 build; same content; new architecture) |
| **Audience** | Primary: visitors feeling out the church's vibe (often first-time church-shoppers; multi-generational). Secondary: current congregants using the site as weekly resource. |
| **YouTube channel** | `UCLtcNDdjDaSVqI-UJ9AF4KA` |
| **Service times** | Sunday 9:15–10:15 AM Sunday School (all ages); 10:30 AM Worship Service |
| **Address** | 2809 Old Washington Hwy, Dayton, TN 37321 |
| **Phone** | 423-775-5460 |
| **Office email** | office@gbcdayton.org |
| **Tagline** | "LOVE God, LOVE People, IMPACT the World" |
| **Outputs folder** | `Websites/grace-bible-church-v2/` |

---

## Live Site Audit (Source: gbcdayton.org)

**What it does:** Brochure-site for a small Tennessee Baptist church. Primary calls-to-action: connection card submission, give, find a Grace Group, see what to expect.

**What it has:** Sunday service times in plain text, YouTube live link, assisted-listening-device note as a parenthetical, navigation across About / What to Expect / Calendar / Ministries (GraceKids, Youth, Parent Resources, Adults, Women's Bible Studies, GriefShare, Moms4Moms) / Listen-Watch / Next Steps / Give, Facebook link in footer, single Google Maps link for directions, embedded Clover Sites template.

**What it's missing:** Any visual differentiation from other Clover-template churches; broken homepage tiles (`Type content here...` placeholders rendering as-is); no hero photography of the actual church; no real sermon player on the homepage; no real-time event display from Planning Center; no on-brand 404 / OG image / favicon; mobile experience is reflow rather than designed-for-mobile; accessibility is functional but unremarkable; no atmosphere, no story, no voice beyond functional information delivery.

**Brand DNA visible from the surface:** Warm-amber stained-glass implied (small Baptist sanctuary); multi-generational audience signaled by "all ages" Sunday School + GriefShare + Moms4Moms + Youth; mission-minded (dedicated Missions sub-page); inherently scholarly (Statement of Faith page); gracious tone (the tagline + the assisted-listening note).

**Audit verdict:** The current site is functional and reverent in spirit but invisible as a brand artifact. The Tier 3 rebuild is justified — there's nothing about the existing site that needs preserving structurally, and everything about it that fails the differentiation test.

---

## Vision (Inherited from Original Brief + Tier 3 Elevation)

| Dimension | Locked value |
|---|---|
| **The feeling** | Welcome + Reverence (carried) — now amplified by atmospheric inhabitation: the visitor should feel they *walked into* a sacred space, not browsed a page |
| **The audience** | Visitor scanning the vibe + current congregant using as weekly resource (carried) |
| **The personality** | Steady. Scholarly. Gracious. (carried) |
| **Bold dial** | Push the envelope (carried) — Tier 3 expression: the push is in the *book-as-world* concept and the *restraint of execution*, not in the volume of effects |
| **Tier** | **3 — Inhabitable World** (elevation from original Tier 1/2) |
| **Emotional outcome** | A visitor closes the site (or the cover, in our scene 7) and remembers the feeling of having been inside something quiet, considered, and unmistakably *this* church. The cognitive label they reach for is not "modern church site" — it's "I walked into a place." |

---

## The Concept (Locked)

### Anchor Object: "The Living Page"

A 3D Bible that the visitor inhabits. The Bible never appears on a desk or in space — the visitor is *inside* its open-page-corridor as the architecture. Each scroll-triggered page-turn is a section transition; each new page is a new "room." Scripture rises from each page as 3D gilded type. The Bible never leaves the scene; it IS the scene. At the bottom, the cover closes and the visitor exits.

**Cinematic expansion of all seven scenes:** documented in the Scroll Score section below.

**Why this anchor (locked from v1, intact for v2):**
- Literal to the brand (Grace **Bible** Church; first core value: Teach the Word)
- Differentiating — no church site in the category has built the page interior as an inhabited 3D space
- Scholarly — editorial framing of scripture, not decorative
- Reverent — slow page turns, warm light, no aggressive motion
- Gracious — the welcome reveal is gentle (cover opens *toward* visitor)

**What it does NOT do (rule, not preference):**
- No particles swarming the Bible or the scripture
- No glitch on the gilded type
- No aggressive zoom on the cover
- No animated lighting flares
- No competing 3D moments — the Bible is the *only* place 3D is loud
- No literal modeled GBC sanctuary (per Paul's call: "implied only — the page IS the architecture")

### Aesthetic Direction: "Editorial Reverence" (carried)

Cinematic. Editorial typography. Warm cream + ink + amber-gold. Photos treated with unifying warmth. One bold 3D anchor that earns the entire site's experience.

**Reference energy (not copy):** the editorial weight of a fine theological journal married to the spatial choreography of Cloud Castles (Hello Monday) and Le Jardin Extraordinaire (PHA5E). Lando Norris-tier restraint applied to a small-town church's warmth.

### Color Lock (carried from v1, unchanged)

| Role | Token | Hex | Notes |
|---|---|---|---|
| Primary surface (light) | `--bone` | `#F4ECDC` | Warm cream. Default background for light scenes. Matches natural church light. |
| Primary ink | `--ink` | `#1A1410` | Deep warm-black. Text and structural elements; default background for dark/hero scenes. Slightly warmer than pure black — evokes ink on a page. |
| Accent | `--gilt` | `#C8964A` | Stained-glass amber/gold. The ONE high-energy color. Used for scripture text reveals, primary CTAs, interactive states, hero accents. Never decorative. |

2 dominant + 1 accent. Strict.

### Type Pair (carried from v1, unchanged + flagged)

| Role | Font | Source | Notes |
|---|---|---|---|
| Display | **Newsreader** | Google Fonts (free) | Editorial gravitas; designed for editorial use; supports multiple weights; not on Pillar 1 blacklist |
| Body | **Inter Tight** | Google Fonts (free) | Modern technical sans; readable; **flagged for Phase 5 polish review** — adjacent to Inter blacklist, may swap to Geist or Manrope if reads generic in production |
| Scripture italic (callouts) | **Cormorant Garamond Italic** | Google Fonts (free) | Classic editorial italic; sparing use only |

**Upgrade path documented (not active for build):** PP Editorial New + Söhne + Tiempos Text Italic if Paul ever wants premium licensing (~$450 one-time).

### Watching For (Primary Failure Mode)

**Effect Stacking.** Every Tier 3 pattern is active. Without discipline this becomes a Christmas tree. Rule: at any given moment, ONE element is loud (current page's scripture OR current page's photo OR active CTA hover). Everything else is **still** or **slow ambient drift** (light shift, dust motes, camera breath at 1°, ribbon sway). Maximum motion budget per frame: 20% of screen area.

**Secondary watch:** Mobile afterthought. Multi-generational audience including older members. Mobile reduced-quality variant required, not optional. GPU detection drives auto-tier selection (`high` / `medium` / `low` rendering paths). `prefers-reduced-motion` triggers a static-page fallback where the Bible doesn't animate but every scene's content is still presented in editorial layout.

**Tertiary watch (per Failure Mode #13 / GSAP ScrollTrigger race):** ScrollTrigger plugin registration must happen at module-evaluation time in `lib/gsap.ts`, NOT lazy-loaded inside an async provider. Scene components that import GSAP will fire `useEffect` before any async dynamic import resolves, which causes ScrollTrigger to throw "Missing plugin?" warnings and ultimately crash on `ev is not a function`. This is the production-only crash from the Awakening Adventures build. Building defensively from day one.

---

## Scroll Score — Homepage (7 Scenes, Tier 3 calibrated)

Each scene has: 3D state, content state, motion state, sound state, user goal. All seven exist on a single long-scroll page; page-turns are the section transitions.

| # | Scene | 3D state | Content | Motion | Sound | User goal |
|---|---|---|---|---|---|---|
| 1 | **Threshold** | Visitor stands on open Bible's left page; right page extends as corridor into deep space; warm overhead stained-glass light shafts; dust motes drift in beams; deckled page edge runs to soft falloff | Hero: editorial display **"Grace Bible Church"** rising from page surface as embossed type; service times set in page margin as editorial captions; CTA **Plan a Visit** in gilt | 1° camera breath idle; ambient dust drift; light shafts subtly pulse with morning advance | Ambient bed: wood-built sanctuary room tone, distant cicadas of Tennessee summer evening, faint sustained piano note far away. Mute toggle top-right. | Feel reverence immediately; understand this is GBC |
| 2 | **The Welcome** | Page turn 1: camera dollies forward through arcing page; new page settles; right-margin Billboard photo (real GBC pew, warm grain) parallax-anchors | Display headline **"You are welcome here."** (pulled verbatim from sign outside actual building) | Page-turn animation (1.2s ease-out); photo parallax depth-of-field shift on entry | Page-turn foley (real leaf-of-paper sound, dry, no reverb tail); acoustic shift to register new space | Feel welcomed; place the church socially |
| 3 | **The Word** | Page turn 2; current week's scripture rises off page as 3D embossed type; **gold-leaf shimmer animates left-to-right** across each letter; type casts real shadow on page; YouTube embed of latest sermon in left margin framed in leather binding | Scripture text (display weight); sermon series title below (italic Cormorant); embed of latest sermon | Scripture gild animation triggered by scroll progress, NOT autoplay; depth-of-field shifts to focus the scripture on enter | Organ pedal note enters and sustains through Scenes 3–6 (never grows louder, just present) | See what's being taught; click into the sermon if interested |
| 4 | **The Family** | Page turn 3; page surface expands wider; three GBC archive Billboards (congregation, kids, worship) at varying depths above page | Three photos captioned with three Core Values: **Teach the Word. Care for each other. Worship the Lord.** Editorial display weight | Slow lateral camera dolly past photos right-to-left; DOF shifts photo-to-photo | Once-only: distant child's laugh from "back of room", ~7s into scene, almost missable — this is Ambient Life | See the community; recognize multi-generational warmth |
| 5 | **The Week** | Page turn 4; bookmark ribbons hang from page edge — three embroidered with next Planning Center events (name, date, one detail line) | Three event ribbons (live data from Planning Center iCal feed) + single CTA ribbon **Full calendar** | Ribbons sway from implied draft (1° rotation oscillation); hover lifts a ribbon, casts shadow on page | Faint sound of fabric moving on hover | See what's happening; click into calendar if interested |
| 6 | **The Mission** | Page turn 5; page surface dissolves; camera pulls back/up; reveals Bible sitting on slow-rotating low-poly world map carved into the page itself (1 rotation per 90s); 23 golden pin-lights pulse softly at irregular intervals | Display **"We send people. Here's where they are."** + count of missionaries + Core Value **Share the Gospel.** CTA **Our missionaries** | Globe rotation; pin-lights flicker like real candles; no UI motion competing | Organ pedal note resolves up to higher sustain — only musical movement in the experience | See global reach; understand mission is real and current |
| 7 | **The Invitation** | Camera returns to Scene 1 framing; bookmark ribbon settles on closed cover | Display **"Come and see."** Service times. Address with embedded map (styled in page-paper palette, not Google Maps screenshot). Accessibility note as quietly proud detail in matching display weight. Connection card CTA **Send a connection card** in gilt. Footer information appears as if printed on the ribbon. | Cover-close animation (4s reverse of opening); final lighting falloff | Ambient bed fades to silence over final 3s | Take next step (visit, connect, give, contact) |

**Spine of the entire scroll: the Bible's state.** The 6 page-turns are the 6 section transitions. The visitor's mental model is "I am walking through the book" — not "I am scrolling through a page."

---

## Site Architecture

Same routes as v1 (carried — every functional element of the original site survives). Tier 3 elevation is in the *experience* of each page, not in the IA.

| Route | Purpose | Source of truth | Tier 3 treatment |
|---|---|---|---|
| `/` | 7-scene immersive homepage (above) | Markdown + Planning Center iCal + YouTube Data API | Full Inhabitable World |
| `/visit` | What to expect for first-time visitors | `content/pages/visit.mdx` | Page treated as a single inhabited scene: visitor walks into the sanctuary threshold; expectations appear as captions in the air |
| `/about/beliefs` | Statement of Faith | `content/pages/beliefs.mdx` | Per-belief scrollytell — each belief is its own *page turn* in a smaller scoped Bible scene; scripture refs gild in below |
| `/about/leadership` | Staff (6 people) | `content/pages/leadership.mdx` | Circle-crop headshots arranged on a page-spread; names + titles + emails; no bios per Paul's direction |
| `/about/mission` | Vision/mission + elder-led governance narrative (no names) | `content/pages/mission.mdx` | Single editorial scroll page; subtle ambient light only; no full anchor Bible |
| `/about/values` | Four Core Values expanded | `content/pages/values.mdx` | Four scenes, each value gets its own page turn |
| `/ministries` | Filterable directory (Adult / Young Adult / Youth / Kids + GriefShare / Moms4Moms / Women's / Parent Resources per current site) | `content/ministries/*.mdx` | Filter chips in gilt; each ministry card is a small bookmark-ribbon |
| `/ministries/[slug]` | Each ministry detail | `content/ministries/*.mdx` | Single page-spread per ministry |
| `/grace-groups` | 5 group leader cards + Contact Pastor Dave CTA | `content/grace-groups/grace-groups-source.md` | Card grid with warm-grain photo treatment; no form (per Paul) |
| `/calendar` | Planning Center iCal parsed, rendered in site design system | iCal feed | Calendar styled as a leather-bound appointment book; events as embroidered ribbons |
| `/sermons` | Sermon archive (YouTube as CMS) | YouTube Data API | Grid of sermon "pages" — each card is a page edge with the date and title in editorial type |
| `/live` | Livestream + auto-detect live state | YouTube Data API | When live: full-bleed sermon stream framed in leather binding; when not live: countdown to next service in editorial type |
| `/missions` | 23 missionaries, filterable (region / agency / focus) | `content/missionaries/missionaries-source.md` | Globe-as-page from Scene 6 carries here; selecting a pin opens missionary detail |
| `/next-steps` | Connection card / volunteer / membership / give shortcuts | `content/pages/next-steps.mdx` | Page-spread with four bookmark ribbons (one per next step) |
| `/give` | External bounce to Church Center | external URL | Single-button page with the gilt CTA; one-line invitation in editorial type |
| `/contact` | Office + map + accessibility note | `content/pages/contact.mdx` | Page-spread with address embossed; accessibility detail treated as feature, not footer |
| `/accessibility` *(optional)* | Detailed accessibility info | hardcoded | Same treatment as `/contact` |

---

## Better-Solution Audit

Recommendations that improve on the original brief AND on the current live site. Paul accepts/rejects/modifies each before Phase 2.

1. **Loading IS theater (new for Tier 3).** The original brief had no loading state. Tier 3 mandate: loader is art-directed in the site's aesthetic and ends with a transition INTO the world (not a hard cut). Specific: black screen → choral swell + warm light beam ignites on closed Bible cover → gold-leaf edge resolves line-by-line as real progress indicator → cover opens toward visitor as transition. ~2.5–4.0s total depending on asset load. **Recommend: accept (Tier 3 non-negotiable).**

2. **Accessibility note as a moment (carried from v1).** Same recommendation: lift the assisted-listening / ASL detail out of footnote into Scene 7 with the same craft as everything else. Quiet pride, visual manifestation of "Care for each other." **Recommend: accept.**

3. **Statement of Faith as scrollytell (carried from v1).** Each of the 14 beliefs is its own page-turn within a scoped Bible scene; scripture refs gild in below. Mobile reads as vertical stack of editorial-treated beliefs. **Recommend: accept.**

4. **Ministries: one filterable directory + bookmark-ribbon cards (carried + Tier 3 calibrated).** Original v1 plan was a filterable directory; v2 elevates the cards to be small embroidered bookmark ribbons that visually echo the homepage's Scene 5 ribbons. Mobile collapses to a stacked list. **Recommend: accept.**

5. **Grace Groups: keep card-grid + warm-grain treatment + Pastor Dave CTA (carried from v1, no form per Paul).** No change. **Recommend: accept.**

6. **Core Values: line-icons in Gilt accent (carried from v1, replaces current pink/blue/teal/lime graphic).** Same call. **Recommend: accept.**

7. **Sermons via YouTube Data API (carried from v1).** YouTube is the source of truth. Display in archive grid; each sermon is a "page" card. Future: layer Sanity for tagging if GBC ever wants it. **Recommend: accept.**

8. **Planning Center is single calendar source (carried from v1).** Server-side iCal parse; homepage Scene 5 ribbons + `/calendar` page both read same feed. **Recommend: accept.**

9. **New for Tier 3: Sound layer with obvious mute toggle in first 1.5 seconds.** Default state: muted (visitor must opt in). Mute toggle appears top-right, visible against any scene background, in the gilt accent. Click-to-enable. Per system Pattern 5: ambient bed + organ pedal + page-turn foley + scripture gild chime + once-per-scene detail sounds (cicadas, child's laugh, ribbon fabric sway). Audio respects `prefers-reduced-motion` → audio also defaults off. **Recommend: accept (Tier 3 non-negotiable).**

10. **New for Tier 3: Adaptive quality via GPU detection.** On first load, `WEBGL_debug_renderer_info` (per Cloud Castles pattern) selects `high` / `medium` / `low` rendering paths. `high` = full Tier 3; `medium` = drop dust motes + simplify ribbon physics + lower-poly Bible; `low` = static-page fallback (no anchor animation; sections present in editorial layout; site is still usable on a 5-year-old Android). Visitor can manually override via settings toggle in footer. **Recommend: accept (Tier 3 non-negotiable).**

11. **New for Tier 3: `prefers-reduced-motion` fallback is a real designed experience, not a degraded one.** When triggered: no page turns, no scripture gilding, no ambient drift, no sound, no camera breath. Instead: each "scene" becomes a static editorial card stacked vertically, with the same typography, the same color lock, the same photo treatment, the same content. Visitor with vestibular sensitivity gets the *content* in its proper editorial weight. **Recommend: accept (Tier 3 + accessibility non-negotiable).**

12. **New for Tier 3: ErrorCatcher + WorldErrorBoundary mounted from Phase 2.** Per Part 6 Production Failure Catalog — the visible error catcher (Tier 3 styled, gilt border) lives in `components/ui/ErrorCatcher.tsx` and mounts on every page. WorldErrorBoundary wraps every R3F component that loads an asset (`<Canvas>`, `<Environment>`, `useGLTF`, `useTexture`, audio). Production crashes become actionable, not generic. **Recommend: accept (Bug Audit non-negotiable).**

---

## Asset Plan (CC0 Free + Manual Paid Runs)

### HDRIs (Atmospheric Foundation)
- **Primary need:** warm stained-glass overhead light for Scenes 1–7
- **Source:** Poly Haven (CC0). Search terms: "church", "stained glass", "warm window", "interior dawn"
- **Candidate HDRIs to evaluate:** `kiara_1_dawn`, `clarens_midday`, `dreifaltigkeit_chapel`, `pretville_cinema`
- **If none hit the warm-amber tone exactly:** Paul runs **Nano Banana Pro** manually with prompt: *"32-bit panoramic HDR environment, interior of small wooden American Baptist church sanctuary at golden-hour morning, three stained-glass windows casting warm amber and red light beams onto wooden pews, dust motes visible, no people, no signage, 8k equirectangular"*

### PBR Materials (AmbientCG CC0)
- **Leather (Bible cover):** `Leather032`, `Leather040`
- **Paper (page surface):** `Paper003`, `Paper005` — warm-cream-tinted for `--bone` match
- **Gold leaf (scripture gild):** `Metal032` or procedural shader (preferred — keeps file size down)
- **Wood (implied pulpit/floor):** `Wood068`, `WoodFloor046`

### 3D Models
- **Bible (prototype, Phase 3):** procedural Three.js geometry — box with rounded corners for cover, planes for pages, animated UV-based page-turn shader. Total file size: 0 (procedural).
- **Bible (production, post-launch):** Paul runs **Hyper3D / Rodin** manually with prompt + reference photo of a leather King James Bible; outputs GLB → cleanup in Blender → `gltf-transform optimize` → drop into `public/models/bible-hero.glb` at < 2MB.
- **World map (Scene 6):** low-poly procedural sphere with continent geometry from `three-globe` library or simple latitude-clipped sphere; pin-lights as instanced meshes.

### Sound (Freesound CC0)
- **Ambient bed:** wood-built sanctuary room tone (~30s loop)
- **Cicadas:** distant Tennessee summer (~2 min ambient, low-volume)
- **Piano sustain:** single low piano note with long natural decay
- **Page-turn foley:** real leaf-of-paper sound, dry, no reverb tail (multiple variants for variation)
- **Organ pedal:** sustained low note (~45s loop, fades into Scene 3, resolves in Scene 6)
- **Child's laugh:** distant, single instance for Scene 4 detail
- **Ribbon fabric sway:** soft fabric movement for Scene 5 hover
- **All audio runs through Howler.js** with positional pan where appropriate; obvious mute toggle in `--gilt` color, top-right, visible from Scene 1.

### Photography
- **Existing:** 9 photos at `Websites/grace-bible-church/public/photos/church/` (GBC-0085, 0089, 0140, 0167, 0297, 0301, 0322, 0551, 0577) — will copy into v2's `public/photos/church/`
- **Grace Groups:** 5 leader photos at `Websites/grace-bible-church/public/grace-groups/` — will copy
- **Still needed (per original brief, not blocking Phase 2):** staff headshots (6 circle-crop), additional missionary photos at higher resolution

---

## File Structure (Will Be Built in Phase 2)

```
grace-bible-church-v2/
├── README.md                          (this brief + dev setup)
├── grace-bible-church-v2-brief.md     (this document)
├── package.json
├── tsconfig.json
├── next.config.js                     (3D-specific transpile rules)
├── tailwind.config.ts
├── postcss.config.js
├── .env.example
├── .gitignore
├── app/
│   ├── layout.tsx                     (root, font loading, providers)
│   ├── page.tsx                       (7-scene immersive homepage)
│   ├── globals.css                    (CSS variables, base resets)
│   ├── opengraph-image.tsx            (generated OG with hero composition)
│   ├── icon.tsx                       (generated favicon)
│   ├── not-found.tsx                  (404 inside Bible-as-architecture)
│   ├── visit/page.tsx
│   ├── about/
│   │   ├── beliefs/page.tsx           (scrollytell Statement of Faith)
│   │   ├── leadership/page.tsx
│   │   ├── mission/page.tsx
│   │   └── values/page.tsx
│   ├── ministries/
│   │   ├── page.tsx                   (filterable directory)
│   │   └── [slug]/page.tsx
│   ├── grace-groups/page.tsx
│   ├── calendar/page.tsx
│   ├── sermons/page.tsx
│   ├── live/page.tsx
│   ├── missions/page.tsx
│   ├── next-steps/page.tsx
│   ├── give/page.tsx
│   ├── contact/page.tsx
│   └── accessibility/page.tsx         (optional)
├── components/
│   ├── sections/                      (homepage scenes — each owns its 3D coupling)
│   │   ├── Threshold.tsx              (Scene 1)
│   │   ├── TheWelcome.tsx             (Scene 2)
│   │   ├── TheWord.tsx                (Scene 3)
│   │   ├── TheFamily.tsx              (Scene 4)
│   │   ├── TheWeek.tsx                (Scene 5)
│   │   ├── TheMission.tsx             (Scene 6)
│   │   └── TheInvitation.tsx          (Scene 7)
│   ├── three/                         (reusable R3F primitives)
│   │   ├── BibleWorld.tsx             (master Canvas + scene controller)
│   │   ├── Bible.tsx                  (the 3D Bible geometry)
│   │   ├── Page.tsx                   (individual page mesh + turn animation)
│   │   ├── ScriptureType.tsx          (3D gilded scripture text)
│   │   ├── StainedGlassLight.tsx      (overhead light shafts + dust)
│   │   ├── BookmarkRibbon.tsx         (interactive event ribbons)
│   │   ├── GlobeMap.tsx               (Scene 6 world map)
│   │   ├── PostFX.tsx                 (ACES Filmic + bloom + warm LUT)
│   │   └── AdaptiveQuality.tsx        (GPU detection + quality tier)
│   ├── layout/
│   │   ├── Nav.tsx                    (minimal, page-margin treatment)
│   │   ├── Footer.tsx                 (bookmark-ribbon styled)
│   │   ├── MuteToggle.tsx             (top-right gilt button)
│   │   └── AccessibilityNote.tsx      (the Scene 7 quietly-proud component)
│   ├── ui/
│   │   ├── ErrorCatcher.tsx           (visible error surfacer; Tier 3 styled)
│   │   ├── WorldErrorBoundary.tsx     (wraps R3F asset loaders)
│   │   ├── Loader.tsx                 (loading-as-theater)
│   │   ├── Button.tsx                 (gilt CTA primitive)
│   │   ├── RibbonCard.tsx             (used across ministries / events / sermons)
│   │   └── PhotoBillboard.tsx         (the photo-in-3D pattern)
│   └── providers/
│       ├── LenisProvider.tsx
│       ├── GSAPProvider.tsx           (NOTE: ScrollTrigger registered in lib/gsap.ts, not here)
│       └── AudioProvider.tsx          (Howler context + mute state)
├── lib/
│   ├── gsap.ts                        (ScrollTrigger registration AT MODULE TOP)
│   ├── lenis.ts                       (smooth scroll setup)
│   ├── three.ts                       (helpers: ACES tone mapping, env loading)
│   ├── planningCenter.ts              (server-side iCal parser)
│   ├── youtube.ts                     (YouTube Data API client)
│   ├── content.ts                     (MDX loader + frontmatter parser)
│   ├── audio.ts                       (Howler setup, sound registry)
│   ├── quality.ts                     (GPU detection, tier selection)
│   └── utils.ts                       (cn, format helpers)
├── hooks/
│   ├── useScrollProgress.ts
│   ├── useReducedMotion.ts
│   ├── useYoutubeLive.ts
│   ├── useResponsive.ts
│   ├── useQualityTier.ts
│   ├── useMuted.ts
│   └── useMounted.ts                  (hydration safety gate)
├── styles/
│   └── tokens.css                     (--bone, --ink, --gilt + type scale)
├── types/
│   └── index.ts
├── content/                           (markdown content — Paul edits)
│   ├── pages/
│   ├── ministries/
│   ├── grace-groups/
│   ├── missionaries/
│   └── scripture/                     (weekly scripture for Scene 3, JSON)
├── public/
│   ├── fonts/                         (Newsreader + Inter Tight WOFF2 self-hosted as backup)
│   ├── models/                        (procedural for prototype; production GLB later)
│   ├── hdri/                          (Poly Haven HDR; uploaded to Vercel Blob if > 2MB)
│   ├── audio/                         (Freesound CC0 + custom organ pedal)
│   ├── photos/
│   │   ├── church/                    (9 GBC archive photos, carried from v1)
│   │   ├── grace-groups/              (5 leader photos, carried from v1)
│   │   ├── missionaries/              (pending re-export)
│   │   └── staff/                     (pending circle-crops)
│   ├── og/                            (Open Graph generated)
│   └── favicon/
└── (no sanity/ directory — markdown-driven)
```

**Approximate file count by phase end:** ~70 files total. Phase 2 produces ~20 (scaffolding); Phase 3 produces ~8 (hero + Bible); Phase 4a/4b/4c each produce ~10–15 (subpages); Phase 5 produces ~8 (polish + docs).

---

## Phased Build Plan

| Phase | Scope | Approx files | Auto-advance? |
|---|---|---|---|
| **1 — Foundation** *(this brief)* | Recital, audit, concept, scroll score, asset plan, file structure, Better-Solution audit | This file | Requires Paul sign-off before Phase 2 |
| **2 — Scaffolding & Design Tokens** | Project shell, Tailwind/CSS variables, Newsreader+Inter Tight loading, Lenis+GSAP+R3F base, AudioProvider, AdaptiveQuality, MuteToggle, ErrorCatcher, WorldErrorBoundary, empty section placeholders, layout chrome (Nav + Footer), `lib/content.ts`, `lib/gsap.ts` with ScrollTrigger registered at module top, route shells | ~20 | Auto |
| **3 — Hero + Bible Anchor + Loading Theater** | `BibleWorld.tsx` Canvas, procedural `Bible.tsx` + `Page.tsx`, `StainedGlassLight.tsx` (HDRI + ACES + dust), `ScriptureType.tsx` (gilded shader), Loader as theater, Scenes 1+2 (Threshold + Welcome) wired to scroll | ~10 | Auto |
| **4a — Homepage Scenes 3–7 + APIs** | Scenes 3–7, Planning Center events fetcher, YouTube embed, BookmarkRibbon physics, GlobeMap (Scene 6) | ~12 | Auto |
| **4b — Subpages: Beliefs, Ministries, Grace Groups** | Scrollytell Statement of Faith; filterable ministries directory + detail; Grace Groups card grid | ~10 | Auto |
| **4c — Subpages: Sermons, Live, Calendar, Missions, About** | YouTube-as-CMS sermon archive; live page; calendar page; missions globe-detail; leadership/mission/values | ~12 | Auto |
| **5 — Polish, Mobile, Performance, Bug Audit** | Custom cursor, mobile reduced-quality variant, prefers-reduced-motion fallback experience, 404 (inside Bible-architecture), OG image generation, favicon, full Quality Gates + Bug Audit run, README polish, QUALITY-GATES.md. **Per the hard rule in the system doc — no DEPLOYMENT.md, no MAINTENANCE.md, no CLIENT-HANDOFF.md generated.** | ~8 | Stops at end |

**Asset pause points (will pause for Paul):**
- After Phase 3 if Paul wants to run Hyper3D for production Bible model
- After Phase 4a if Poly Haven HDRIs don't hit the tone and Nano Banana run is needed
- After Phase 4a if Paul wants Suno-generated custom ambient bed
- After Phase 5 before any deploy recommendation (Bug Audit will gate)

---

## Content Inventory (Carried from v1)

### Locked content (we have it from v1):
- Statement of Faith (14 belief points with scripture refs)
- Four Core Values + descriptions
- Full ministries text (Adult, Young Adult, Youth, Kids, Women's, GriefShare, Moms4Moms, Parent Resources)
- Staff names + titles + emails (6 people)
- Service times, address, phone, email, tagline (verified live: matches gbcdayton.org)
- 9 professional photos of church life (will copy from v1)
- 5 Grace Group leader photos (will copy from v1)
- 23 missionaries content
- Grace Groups content

### Still needed (not blocking Phase 2):
- Staff circle-crop headshots
- High-resolution missionary photos
- Confirmation of Grace Groups photo-to-name mapping

### Privacy flags (deferred to deployment per v1 brief):
- Missionary home addresses → suppress, use agency address
- Children's birthdays/full names → suppress for public site
- Sensitive-location missionaries (Albania, Thailand, Mozambique) → first names only / agency address per agency security protocol
- Personal phones → omit, route through church office

---

## Quality Gates Reference (Checked at Phase 5)

Per Part 5 of the system doc, the final build must pass ALL of:

**Concept Gate:** ✓ One anchor (Living Page Bible), ✓ one direction (Editorial Reverence), ✓ one emotional outcome (Welcome + Reverence inside a sacred space)

**Design Gate:** 2-color discipline (Bone + Ink + Gilt) ✓ locked; not on AI-slop blacklist ✓; not on Pillar 1 font blacklist (Newsreader + Inter Tight + Cormorant Garamond Italic) ✓ — Inter Tight flagged for review; complexity matches Tier 3 ✓; macro whitespace ≥ 30% per section TBD at Phase 5; asymmetry/grid-breaking TBD; one hero per scene ✓

**Anti-AI-Tell Gate:** Zero auto-section-numbers ✓; no label+explanation pairs ✓; no filler microcopy ✓; specific brand-toned CTAs (Plan a Visit, Watch this Sunday's sermon, Find a Grace Group, Pray for our missionaries, Send a connection card, Our missionaries, Full calendar) ✓; no identical three-feature grid; no stock phrases; mirror test applied to every headline TBD at Phase 5

**3D Gate:** 3D serves purpose (Bible IS brand) ✓; no floating-shape syndrome ✓; one signature scroll moment per scene ✓; background motion slow ✓; real photos integrated via Billboard pattern ✓

**World-Building Gate (Tier 2 + Tier 3):** All five required + Tier 3 four required — Atmospheric Foundation, Ambient Life, Cinematic Camera, Reactive Environment, Loading as Theater, Spatial Navigation, Sound Design, Environmental Storytelling, Adaptive Quality — ALL in scope

**Asset Foundation Gate (Tier 2 + Tier 3):** HDRI loaded, PBR materials on hero, real photography integrated, sound design with mute toggle, 3D model quality matches tier, asset gaps disclosed (production Bible model is procedural in v1 ship; Hyper3D upgrade documented)

**Functional Gate:** Every original-site page has a home ✓; Planning Center events work; YouTube live auto-detects; service times findable in ≤ 5s; conversion goal (connection card / give / visit) reachable ≤ 3 interactions

**Performance Gate:** FCP < 2s mobile target; Lighthouse ≥ 80 mobile / ≥ 90 desktop; all GLB models < 2MB; lazy-load 3D; loading state present; `prefers-reduced-motion` respected with static fallback; tested on real phone before deploy

**Polish Gate:** Custom cursor on interactive zones; subtle grain on dark sections; one signature micro-interaction (gilt magnetic CTAs); favicon + OG + 404 on-brand; type kerning manually checked on display headings; no placeholder copy

---

## Deployment Plan (Confirmed at Phase 6 — Same as v1)

- **Self-Deploy** (Paul manages under Kingdom Digital Services)
- Domain `gbcdayton.org` → DNS update from Clover Sites to Vercel at launch
- Vercel: Paul's existing account
- GitHub: Paul's existing
- Markdown content only (no Sanity / CMS)
- Planning Center iCal: public URL, no token
- YouTube Data API key: Paul provisions in Google Cloud, server-side env var
- Donations: external bounce to Church Center URL
- HDRIs and audio > 2MB: upload to Vercel Blob (or Cloudflare R2); `NEXT_PUBLIC_ASSET_CDN` env var
- **No `DEPLOYMENT.md`, `MAINTENANCE.md`, or `CLIENT-HANDOFF.md`** — Paul owns deploy + post-launch maintenance workflows directly; the system doc's hard rule prohibits these files

**Estimated recurring cost:** ~$15/year (domain) + Vercel Blob (~$0–5/mo depending on asset weight). Everything else free at this scale.

---

## Resume Protocol

If a future conversation needs to resume this build, the resume prompt should reference:
- This brief file: `grace-bible-church-v2-brief.md`
- The system doc: `immersive-3d-system.md`
- The humanizer doc: `humanizer.md`
- All v2 project code files produced to date

**Decisions in this brief are LOCKED.** Do not re-litigate the anchor object (Living Page), color lock (Bone/Ink/Gilt), type pair (Newsreader/Inter Tight — pending Phase 5 review), scroll score (7 scenes), or experience tier (Tier 3) in subsequent phases unless Paul explicitly requests a change.

---

═══════════════════════════════════════════════════
PHASE 1 COMPLETE — RESUME INSTRUCTIONS
═══════════════════════════════════════════════════

WHAT'S DONE THIS PHASE:
  • Confirmation Recital (14 items) delivered
  • Live site audit of gbcdayton.org completed
  • Vision inherited from v1 + Tier 3 elevation documented
  • Anchor object "The Living Page" locked at Tier 3 scope
  • Color lock + type pair confirmed (Inter Tight flagged for Phase 5 review)
  • 7-scene scroll score written with full atmospheric + sound + content state per scene
  • Site architecture mapped (15 routes, every v1 route survives)
  • Better-Solution audit: 12 recommendations (8 carried from v1, 4 new for Tier 3)
  • Asset plan written (CC0 free + manual paid runs documented)
  • File structure planned (~70 files across 5 phases)
  • Quality Gates referenced for Phase 5
  • Deployment plan carried from v1
  • Project folder created at Websites/grace-bible-church-v2/

FILES PRODUCED THIS PHASE:
  • grace-bible-church-v2/grace-bible-church-v2-brief.md — this document

CURRENT PROJECT STATE:
  grace-bible-church-v2/
  └── grace-bible-church-v2-brief.md     ← Phase 1 Foundation, COMPLETE

PROPOSED FOLDER STRUCTURE FOR PHASE 2:
  grace-bible-church-v2/
  ├── README.md                          ← TO BUILD Phase 2
  ├── grace-bible-church-v2-brief.md     ← COMPLETE
  ├── package.json                       ← TO BUILD Phase 2
  ├── tsconfig.json                      ← TO BUILD Phase 2
  ├── next.config.js                     ← TO BUILD Phase 2
  ├── tailwind.config.ts                 ← TO BUILD Phase 2
  ├── postcss.config.js                  ← TO BUILD Phase 2
  ├── .env.example                       ← TO BUILD Phase 2
  ├── .gitignore                         ← TO BUILD Phase 2
  ├── app/
  │   ├── layout.tsx                     ← TO BUILD Phase 2
  │   ├── page.tsx                       ← TO BUILD Phase 2 (empty section placeholders)
  │   ├── globals.css                    ← TO BUILD Phase 2
  │   └── [route shells for all 15 routes]
  ├── components/
  │   ├── sections/ (empty placeholders)
  │   ├── three/ (empty placeholders)
  │   ├── layout/Nav.tsx + Footer.tsx + MuteToggle.tsx
  │   ├── ui/ErrorCatcher.tsx + WorldErrorBoundary.tsx + Loader.tsx (stubs)
  │   └── providers/LenisProvider.tsx + AudioProvider.tsx
  ├── lib/
  │   ├── gsap.ts (ScrollTrigger registered at module top)
  │   ├── lenis.ts, content.ts, audio.ts, quality.ts, utils.ts
  ├── hooks/ (useMounted, useReducedMotion, useQualityTier, useMuted)
  ├── styles/tokens.css
  └── types/index.ts

NEXT PHASE: Phase 2 — Scaffolding & Design Tokens
  What it covers: Build the project shell — package.json with full dependency list, Next.js 14 App Router setup with proper R3F transpile config, Tailwind config with `--bone` / `--ink` / `--gilt` tokens, Newsreader + Inter Tight loading via `next/font/google`, global CSS variables, Lenis + GSAP module setup (ScrollTrigger registered at module top per Failure Mode #13), R3F Canvas wrapper via `next/dynamic` with `ssr: false`, AudioProvider with Howler context, AdaptiveQuality with GPU detection, MuteToggle visible from first frame, ErrorCatcher mounted on every page, WorldErrorBoundary primitive ready to wrap asset loaders, all 15 route shells with empty section placeholders, Nav + Footer + AccessibilityNote layout chrome.

TO CONTINUE IN THIS CHAT:
  Just say: "Run Phase 2" (or "Looks good, proceed", "Go", etc.)

TO RESUME IN A FRESH CHAT (recommended if this one feels heavy):

  STEP 1 — Open a new conversation in Claude.

  STEP 2 — Upload these files as attachments (not pasted into the prompt):
    REQUIRED:
      • immersive-3d-system.md          (the system doc)
      • humanizer.md                    (companion)
      • grace-bible-church-v2-brief.md  (this brief)

  STEP 3 — Paste this exact prompt:

  ───────────────────────────────────────────────
  Resuming Grace Bible Church v2 at Phase 2.

  Mode: Remake Mode (Tier 3 elevation of existing v1 build)
  Anchor object: The Living Page — 3D Bible as inhabited architecture
  Aesthetic direction: Editorial Reverence
  Color lock: --bone #F4ECDC / --ink #1A1410 / --gilt #C8964A
  Type pair: Newsreader (display) + Inter Tight (body) + Cormorant Garamond Italic (scripture callouts) — Inter Tight flagged for Phase 5 review
  Tier: 3 — Inhabitable World

  COMPLETED PHASES:
    ✓ Phase 1 — Foundation brief saved

  CURRENT FOLDER STRUCTURE (place uploaded files here):

  grace-bible-church-v2/
  └── grace-bible-church-v2-brief.md     ← uploaded, complete

  KEY DECISIONS ALREADY MADE (do not re-litigate):
    • Anchor object is The Living Page (Bible as inhabited architecture)
    • Tier 3 with all 8 World-Building Patterns active
    • Bone/Ink/Gilt color lock (no expansion)
    • Newsreader + Inter Tight + Cormorant Garamond Italic
    • 7-scene homepage scroll score
    • 15 routes total, all carried from v1
    • Markdown-driven CMS (no Sanity)
    • Self-Deploy by Paul on Vercel
    • Default sound state: muted; obvious mute toggle visible from Scene 1
    • Adaptive quality via GPU detection (high/medium/low tiers)
    • Loading IS theater (gold-leaf edge resolves as progress indicator)
    • prefers-reduced-motion produces a real designed static experience, not a degraded one
    • ErrorCatcher + WorldErrorBoundary mounted from Phase 2 (per Bug Audit Failure Mode #4, #13)
    • ScrollTrigger registered at module top in lib/gsap.ts (not lazy-loaded — Failure Mode #13)
    • Free CC0 assets only for prototype; Paul runs Hyper3D / Nano Banana / Suno manually for production upgrades when needed

  NEXT: Run Phase 2 — Scaffolding & Design Tokens.
    Per the brief, this phase should produce:
    • Full Next.js 14 App Router project shell
    • All design tokens, fonts, providers, layout chrome wired up
    • All 15 route shells with empty section placeholders
    • ErrorCatcher + WorldErrorBoundary + MuteToggle visible from frame 1
    • Lenis + GSAP (with ScrollTrigger registered at module top) + R3F base
    • ~20 files in proper folder structure

  Run the Confirmation Recital first, then proceed.
  ───────────────────────────────────────────────

═══════════════════════════════════════════════════

*End of Phase 1 Foundation Brief.*

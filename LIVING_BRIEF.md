# LIVING_BRIEF.md

*Per-project state document. Read at session start; append to at session end.*

---

## 1. Project Identity

**Product:** Ideacamp — the marketing site for a productized design studio at ideacamp.co, selling fixed-scope, fixed-price design engagements (design-system audits, token pipelines, foundation sprints, 0→1 product work). The design system underpins this site and its planned expansion (e.g. case-study detail pages).

**Audience:** Two audiences at once — (1) the site's *visitors*: seed/pre-seed founders who skim and buy certainty, agency/consultancy principals evaluating white-label/overflow, and design/product leaders with a specific systems problem; and (2) the *inspector*: a design-systems engineer who will read the source and judge its rigor. The system must satisfy both — buy-in-three-minutes clarity and inspect-and-nod craft.

**Density:** Content-sparse (marketing, skim-to-convert), with pockets of structured density in the offer spec cards (timeline / client-time / meetings / price).

**Theme:** Light only. (Dark can be added later via a tonal-shift layer without rearchitecting; the token structure will not preclude it.)

**Stance:** Expressive-leaning (~65% toward expressive), disciplined by systematic structure. Rationale: the studio's product *is* systematic design craft, so the site earns its personality (bright categorical palette, display type, playful shape accents) on top of a visibly rigorous foundation (semantic tokens, consistent rhythm, restrained neutrals). Neither pole alone serves both audiences.

**Technology:** Vanilla HTML + CSS custom properties. No framework, no CSS-in-JS, no component library (no React/Tailwind/shadcn). Tokens: Style Dictionary v5, DTCG JSON source compiled to CSS custom properties. Hosting: Vercel static + one Node serverless function (`api/intake.js`). Phase 4's Tailwind/shadcn defaults are explicitly **adapted to vanilla CSS custom properties**.

---

## 2. Key Decisions

**Color:** OKLCH commitment **Level 3 — Full Palette** (approved Step 2). Two-tier: primitive ramps (generated from existing brand colors via Sistema generator + contrast checker in Step 4) → semantic roles. Approved direction:
- Primary: blue `#2540E8` (OKLCH L48.3% C0.250 H267° — electric violet-blue, not generic SaaS blue). on-primary = near-white `#FEFDFF` (7.05:1).
- Secondary: pink `#FF4D8D` (H3°); on-secondary = ink (5.50:1).
- Semantic: success mint `#17C89A`, warning yellow `#FFC22E`, error coral `#FF5A3C` — all with **dark ink on-text** (signature: white fails AA on these brights).
- Surfaces (violet temperature, H285–301°): surface `#F7F6FB`, surface-raised `#FDFCFF`, surface-overlay `#FEFDFF` — replaces the banned pure-white paper. Neutrals: on-surface ink `#1A1830`, on-surface-muted `#56556E` (6.69:1), border `#E7E4F0`, night `#191735`.
- Categorical accent set (decorative/sectioning/data, non-semantic): blue, pink, yellow, mint, coral, lilac `#9B6DFF`.
- **DONE (Step 4):** 7 primitive ramps (blue/pink/yellow/mint/coral/lilac/neutral, 19 stops each) generated via Sistema `/api/palette` from the brand seeds → `tokens/src/color.primitives.json`. 30 semantic roles alias primitives via DTCG references → `tokens/src/color.json`. Seeds land at blue-650, pink-400, yellow-200, mint-300, coral-400, lilac-450, neutral-900. All 14 `on-*` / focus pairs re-verified via `/api/contrast` (WCAG 2.2 AA). Architecture: Step-Scale primitives (Model 2) → semantic roles.

**Typography:** Approved (Step 2). Three families, distinct registers: **Bricolage Grotesque** display/headings (700–800, tracking −0.02 to −0.035em), **Geist** body/UI (400–600, lh 1.55–1.6), **Nunito** micro-labels/eyebrows (500–700, uppercase, +0.10–0.12em). Range 11.5px→~100px, weight 400→800. Code role: monospace fallback stack. **DONE (Step 5):** `tokens/src/typography.json` — 10 roles (display, heading-lg/md/sm, body-lg/md/sm, label, caption, code) on a Major-Third (1.25) base-16 scale with an expressive responsive display step. Each role varies family/weight/line-height/tracking, not size alone. Legibility constraints verified (body lh ≥1.5, heading 1.1–1.3, display 1.0). display + heading-lg use clamp() for fluid sizing.

**Spacing:** 4px base. **DONE (Step 7):** `tokens/src/spacing.json` — mixed-density scale: content-sparse generous large stops (64/80/96/128) + fine component-internal stops (4/8/12/16/20/24/32) added for the offer cards; 12 stops total, keyed by ×4 multiplier. Semantic aliases: page-gutter=32px (space-8), section-gap=80px (space-20), component-gap=24px (space-6).

**Shape:** Approved (Step 2): **friendly-to-rounded, tiered** — chips/badges 8px (sm), buttons & inputs 12px (md), cards 18px (lg), large cards/modals 22px (xl), avatars/pills full. Deliberately non-uniform. Elevation: violet-tinted ink shadows (never pure black), 3 levels. **DONE (Step 6):** `tokens/src/shape.json` — radius none/sm8/md12/lg18/xl22/full (non-uniform, component-mapped in $descriptions); border-width sm1/md2/focus3; shadow sm/md/lg as two-layer DTCG shadow arrays, violet-tinted ink (rgba(26,24,48,…)). No side-stripe accents (separation via border+radius+elevation). NOTE for Step 8: shadow values are DTCG arrays → SD config needs a custom shadow serializer.

**Motion:** [to be determined — not yet in campaign scope; existing site uses subtle rise/drift/marquee]

**Tokens:** Style Dictionary v5 (5.5.0) — DTCG JSON source compiled to CSS custom properties. Two-tier: primitive ramps + semantic tokens that reference them. **DONE (Step 8):** `style-dictionary.config.mjs` (custom transform chain = `css` group minus `size/rem`, so px + clamp() pass through; built-in `shadow/css/shorthand` serializes the DTCG shadow arrays; `outputReferences:true` emits the primitive→semantic aliasing). `npm run tokens` → `styles/tokens/tokens.css` = **241 custom properties**. Verified via `token-check.html` (computed values read live, all match intent).

---

## 3. Current State

**Token files (source):** `tokens/src/color.primitives.json` (7 ramps × 19 + paper), `color.json` (30 semantic), `typography.json` (10 roles), `shape.json` (radius/border-width/shadow), `spacing.json` (12 stops + 3 layout aliases). **Compiled:** `styles/tokens/tokens.css` (241 custom properties) via `npm run tokens`. Legacy ad-hoc inline custom properties in `index.html` still to be superseded by the compiled tokens (Step 9).

**Components implemented (Step 9, approved):** Vanilla CSS component layer in `styles/` consuming compiled tokens (no hardcoded colors). Partials: button.css (Button + variants/sizes/icon), form.css (Input/Textarea/Select/Checkbox/Radio/Switch/FormField), feedback.css (Badge, Alert), overlay.css (Dialog/Popover/Tooltip — native elements), surface.css (Card default/interactive/night, Separator). `styles/base.css` (reset, focus ring, reduced-motion, type utilities). `styles/index.css` = barrel entry (@imports tokens → base → components). Preview: `component-preview.html`.

**Components stubbed:** None.

**Page examples:** `page-example-1.html` (case-study detail), `page-example-2.html` (client workspace). **Docs site:** `docs/index.html` (single-page gallery, links live `styles/index.css`).

**Production site migration (DONE):** `index.html` now links `/styles/index.css` and is driven by the compiled tokens — its legacy palette variables (`--paper`, `--ink`, `--accent`, brights, etc.) are aliased onto semantic tokens, page ground = `surface`, card/nav/form = `surface-raised`, hover shadows use `--shadow-md/lg`, and the intake form controls consume the component `.field` styles. No hardcoded palette hexes remain in the inline `<style>`.

**Known gaps / follow-ons:** Dark theme (deferred). Section-tint backgrounds (#E4F6EF, #FFF6DC, etc.) remain bespoke literals — could become accent-container tokens later. Buttons/cards still use inline styles (token-driven via the aliased vars) rather than the `.btn`/`.card` classes — a deeper markup refactor if desired. Component set could grow (tabs, toast, breadcrumb) as needs arise.

---

## 4. Open Questions

- [ ] Dark mode trigger mechanism — N/A for launch (light only); revisit if dark is added.
- [x] Component count estimate — small (<20).
- [x] OKLCH commitment level — resolved: Level 3, Full Palette.
- [x] Sharp↔rounded placement — resolved: friendly-to-rounded, tiered 8/12/18/22 + full.

---

## 5. Decision Log

*2026-07-11 — Context established — Formalize the existing Ideacamp marketing-site visual language into a proper two-tier token system: primitive ramps generated from the existing brand colors (via Sistema generator + contrast checker) plus semantic tokens mapping onto them, reproducing the current look on precisely aligned foundations. Light only. WCAG 2.2 AA. Stack: vanilla HTML/CSS custom properties, no framework/component library; Style Dictionary v5 (DTCG → CSS custom properties); Vercel. Stance: expressive-leaning, disciplined by structure. Density: content-sparse with structured offer cards.*

*2026-07-11 — Visual language established (style-preview.html approved) — Commitment Level 3 (Full Palette). Primary blue #2540E8 (H267°); secondary pink #FF4D8D; semantic mint/yellow/coral with dark-ink on-text signature; violet-tinted off-white surfaces (#F7F6FB / #FDFCFF / #FEFDFF) replacing pure white. Typographic character: Bricolage Grotesque (display) / Geist (body) / Nunito (labels), weight 400–800. Radius personality: friendly-to-rounded, tiered 8/12/18/22 + full. Elevation: violet-tinted ink shadows, 3 levels.*

*2026-07-11 — FIX: stylesheet path regression from the migration — The migration linked the design system with an ABSOLUTE path (`/styles/index.css`), which resolves to the filesystem/domain root: it worked when served over HTTP from root but silently failed over file:// (and any non-root base), so all token-driven colors vanished (white logo mark, white buttons, monochrome page) while literal-hex styles survived. Changed to a RELATIVE path (`styles/index.css`); also converted other absolute local paths to relative (index favicon; page-example nav/CTA links). Verified full page renders correctly over file://. The @import chain inside index.css works fine over file:// — the absolute path was the sole cause. Rule of thumb for this static repo: use relative asset paths so pages work opened directly and when deployed.*

*2026-07-11 — index.html migrated to token foundations — Linked /styles/index.css; bridged legacy palette vars → semantic tokens; page ground = surface (#FAFAFB), cards/nav/form = surface-raised (#FEFDFF); hover shadows → --shadow-md/lg; focus → component :focus-visible ring; 6 intake form controls now consume component .field (fixed select double-arrow from the class-name collision). Verified: hero, offers, proof, FAQ, and intake form all render correctly and slightly more aligned (electric #243EE8 primary, violet-ink #201D39, tinted off-white ground). No hardcoded palette hexes left in the inline style block.*

*2026-07-11 — Bootstrap campaign complete — Phase 1: context + LIVING_BRIEF. Phase 2: style-preview.html (approved), DESIGN.md. Phase 3: two-tier DTCG token system (5 source files) compiled via Style Dictionary v5 to 241 CSS custom properties, verified with token-check.html. Phase 4: vanilla CSS component layer (styles/) approved via component-preview.html, two page examples, docs/index.html gallery. Light theme, WCAG 2.2 AA throughout. Primary follow-on: migrate index.html to consume the token/component layer.*

*2026-07-11 — Page examples generated (approved) — page-example-1.html (case-study detail, editorial) and page-example-2.html (client project workspace, app-like with table/stat cards/forms/overlays). Both link the real styles/index.css (authentic system consumption) with token-only page layout CSS; responsive to 768px. Surfaced + fixed a base-layer bug: added [hidden]{display:none!important} so the attribute wins over component display rules.*

*2026-07-11 — Core component set scaffolded (approved) — Vanilla CSS component layer (adapted from Tailwind/shadcn default, since stack is framework-free). styles/{base,index}.css + components/{button,form,feedback,overlay,surface}.css, all token-driven (verified no hardcoded colors). Native <dialog>/[popover] for a11y. Consistent 3px focus ring (6.87:1), 44px targets, dark-on-bright fills, tiered radii. component-preview.html reviewed and approved.*

*2026-07-11 — Style Dictionary configured and compiled — style-dictionary.config.mjs (SD 5.5.0). Custom transform chain (css group minus size/rem) keeps px + clamp() verbatim; shadow arrays serialized via built-in shadow/css/shorthand; outputReferences shows primitive→semantic aliasing. Compiled 241 CSS custom properties → styles/tokens/tokens.css. token-check.html generated and verified (live computed values match intent: 30 semantic + 134 primitive colors, 10 type roles, 6 radius, 3 shadow, 12 space + 3 layout aliases, 3 border widths). npm script "tokens" added.*

*2026-07-11 — Spacing tokens generated — tokens/src/spacing.json. 4px base, mixed-density scale (12 stops): content-sparse large stops 64/80/96/128 for layout + fine 4/8/12/16/20/24/32 for component internals. Aliases: page-gutter 32px, section-gap 80px, component-gap 24px. Also updates DESIGN.md's provisional spacing.*

*2026-07-11 — Shape tokens generated — tokens/src/shape.json. Radius tiered non-uniform (0/8/12/18/22/9999) with component mapping; buttons at md(12) not pill. Border-width sm/md/focus (1/2/3px). Elevation: 3 two-layer violet-tinted ink shadows (never pure black). Side-stripe ban respected. Shadow arrays flagged for a custom SD serializer in Step 8.*

*2026-07-11 — Type scale generated — tokens/src/typography.json, 10 roles on a Major-Third (1.25) base-16 modular scale + responsive editorial display (clamp 44→100px). Families: Bricolage Grotesque (display/headings), Geist (body), Nunito (label/caption, uppercase), monospace (code). Each role differentiated by family/weight/line-height/tracking; all legibility constraints met.*

*2026-07-11 — Color scheme generated — Step-Scale architecture (Model 2). 7 primitive ramps generated from brand seeds via Sistema /api/palette (blue/pink/yellow/mint/coral/lilac/neutral, 19 stops each) in color.primitives.json; 30 semantic roles (21 required + border-strong, night, on-night, 6 categorical accents) aliasing primitives in color.json. Light only. Commitment Level 3. Primary = blue-650 #243EE8. All on-* + focus pairs verified WCAG 2.2 AA via /api/contrast. Dark-ink-on-bright confirmed (white fails on mint/coral/pink). Surfaces = violet-tinted neutral-50 / paper, no pure white.*

*2026-07-11 — DESIGN.md generated — Full spec-compliant DESIGN.md (YAML front matter + 8 ordered sections). 29 semantic color tokens, 8 type roles, tiered radius, provisional component aliases. Three-tier token architecture documented (primitives → semantic → component; components consume semantic only). Provisional values marked [TBD — Step 7]: spacing scale tier + semantic layout aliases (front matter holds a placeholder balanced scale). Color hexes reflect approved direction; primitive ramps generated in Step 4 may nudge stops to ramp values.*

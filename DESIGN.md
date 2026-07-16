---
version: alpha
name: Ideacamp Design System
description: >-
  Visual language for Ideacamp — a productized design studio. A Swiss/editorial
  structural backbone carrying a Neo-Memphis expressive palette. Light theme,
  WCAG 2.2 AA, OKLCH commitment Level 3 (Full Palette).

# ---------------------------------------------------------------------------
# COLORS — semantic roles (Tier 2). Values reflect the approved style-preview.
# Primitive ramps (Tier 1) are generated in Step 4 and may nudge these stops to
# land on ramp values; semantic role assignments below are stable.
# ---------------------------------------------------------------------------
colors:
  # brand
  primary: "#2540E8"
  on-primary: "#FEFDFF"
  primary-container: "#EDF0FF"
  on-primary-container: "#0F1C7A"
  secondary: "#FF4D8D"
  on-secondary: "#1A1830"
  secondary-container: "#FFE3EE"
  on-secondary-container: "#1A1830"
  # surfaces & neutrals (violet temperature, H 285–301°)
  surface: "#F7F6FB"
  surface-raised: "#FDFCFF"
  surface-overlay: "#FEFDFF"
  on-surface: "#1A1830"
  on-surface-muted: "#56556E"
  border: "#E7E4F0"
  border-strong: "#D9D6E6"
  border-focus: "#2540E8"
  night: "#191735"
  # semantic (dark-ink-on-bright signature)
  error: "#FF5A3C"
  on-error: "#1A1830"
  success: "#17C89A"
  on-success: "#1A1830"
  warning: "#FFC22E"
  on-warning: "#1A1830"
  # categorical accents (decorative / sectioning / data — not semantic)
  accent-blue: "#2540E8"
  accent-pink: "#FF4D8D"
  accent-yellow: "#FFC22E"
  accent-mint: "#17C89A"
  accent-coral: "#FF5A3C"
  accent-lilac: "#9B6DFF"

# ---------------------------------------------------------------------------
# TYPOGRAPHY — role-based scale. fontSize is the desktop target; display and
# heading-lg scale responsively via clamp() (see Typography section).
# ---------------------------------------------------------------------------
typography:
  display:
    fontFamily: Bricolage Grotesque
    fontSize: 72px
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: -0.035em
  heading-lg:
    fontFamily: Bricolage Grotesque
    fontSize: 40px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -0.025em
  heading-sm:
    fontFamily: Bricolage Grotesque
    fontSize: 22px
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Geist
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  body-sm:
    fontFamily: Geist
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: 0em
  label:
    fontFamily: Nunito
    fontSize: 12.5px
    fontWeight: 600
    lineHeight: 1.4
    letterSpacing: 0.12em
  caption:
    fontFamily: Nunito
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0.02em
  code:
    fontFamily: ui-monospace, Geist Mono, monospace
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em

# ---------------------------------------------------------------------------
# ROUNDED — friendly-to-rounded, tiered (deliberately non-uniform).
# ---------------------------------------------------------------------------
rounded:
  none: 0px
  sm: 8px
  md: 12px
  lg: 18px
  xl: 22px
  full: 9999px

# ---------------------------------------------------------------------------
# SPACING — 4px base. Mixed-density scale (Step 7): content-sparse large stops
# for layout + fine stops for component internals. Keyed by ×4 multiplier.
# Aliases: page-gutter=space.8 (32px), section-gap=space.20 (80px),
# component-gap=space.6 (24px).
# ---------------------------------------------------------------------------
spacing:
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "5": 20px
  "6": 24px
  "8": 32px
  "12": 48px
  "16": 64px
  "20": 80px
  "24": 96px
  "32": 128px

# ---------------------------------------------------------------------------
# COMPONENTS — Tier 3 aliases. Reference semantic tokens only, never primitives.
# ---------------------------------------------------------------------------
components:
  button:
    background: "{colors.primary}"
    color: "{colors.on-primary}"
    radius: "{rounded.md}"
    padding-y: "{spacing.3}"
    padding-x: "{spacing.5}"
  button-secondary:
    background: "{colors.secondary}"
    color: "{colors.on-secondary}"
    radius: "{rounded.md}"
  button-outline:
    background: transparent
    color: "{colors.on-surface}"
    border-color: "{colors.border-strong}"
    radius: "{rounded.md}"
  input:
    background: "{colors.surface-raised}"
    color: "{colors.on-surface}"
    border-color: "{colors.border-strong}"
    radius: "{rounded.md}"
    focus-ring: "{colors.border-focus}"
  card:
    background: "{colors.surface-raised}"
    border-color: "{colors.border}"
    radius: "{rounded.lg}"
  badge:
    radius: "{rounded.sm}"
    font: label
  dialog:
    background: "{colors.surface-overlay}"
    radius: "{rounded.xl}"
---

# Ideacamp Design System

## Overview

Ideacamp is the marketing site for a productized design studio that sells fixed-scope, fixed-price design engagements. The system serves two audiences at once: busy founders who must understand the model and buy in under three minutes, and design-systems engineers who will read the source and judge its rigor. It must be immediately legible **and** survive inspection.

**Stance:** expressive-leaning (~65% toward expressive), disciplined by structure. The studio's product is systematic design craft, so the site earns its personality on top of a visibly rigorous foundation.

**Aesthetic synthesis:** a **Swiss / International Typographic** structural backbone (grid, numbered sections, typographic hierarchy, mono-flavored labels) carrying a **Neo-Memphis / Post-Digital** expressive skin (a bright categorical palette used as *meaning*, playful geometric shape accents, a marquee), with an **Editorial / Magazine** voice (oversized display type, 400↔800 weight contrast).

**Color commitment:** OKLCH **Level 3 — Full Palette**. Color is a primary design element; the categorical palette is load-bearing brand, not decoration. Theme: **light only** (structure does not preclude a later dark tonal-shift layer). Accessibility floor: **WCAG 2.2 AA**.

## Colors

Colors are organized in three tiers. **Primitive ramps** (Tier 1, `color-blue-500`-style, generated in Step 4) hold raw values. **Semantic roles** (Tier 2, the front-matter `colors` block) encode intent and form the stable public API. **Component tokens** (Tier 3) alias semantic roles per component. **Components consume semantic tokens only — never primitives.**

- **Primary** is an electric violet-blue (`#2540E8`, OKLCH L48.3% C0.250 **H267°**) — deliberately not the generic 220–240° SaaS blue. It carries actions, links, and the focus ring.
- **Secondary** is pink (`#FF4D8D`), chosen for strong contrast against the blue and to avoid colliding with any semantic hue.
- **Surfaces** are violet-tinted off-whites (`#F7F6FB` page, `#FDFCFF` cards, `#FEFDFF` overlays) — pure white (`#FFFFFF`) is banned as a surface token. Neutrals share one violet temperature (H 285–301°), so the ramp is never a flat gray.
- **Dark-ink-on-bright signature:** every bright fill (secondary, success, warning, error, categorical accents) pairs with dark ink text. White text fails AA on mint (2.15:1), coral (3.10:1), and pink (3.14:1), so dark-on-bright is both an accessibility requirement and a brand signature.
- **Categorical accents** (blue, pink, yellow, mint, coral, lilac) are a documented decorative/sectioning/data set — they are *not* semantic roles and must not stand in for success/warning/error.

**Verified pairings (WCAG 2.2 AA):** on-surface 16.0:1 · on-surface-muted 6.69:1 · on-primary 5.97:1 (primary = mint-600 green as of 2026-07-15; was blue-650 7.05:1) · primary-as-link/focus vs surface 5.81:1 (≥3:1 UI) · on-secondary 5.50:1 · on-success 8.02:1 · on-warning 10.7:1 · on-error 5.57:1 · on-primary-container 12.6:1. Every `on-*` pair is re-verified through the Sistema contrast API in Step 4.

## Typography

Three families, each with a distinct register and job — not three interchangeable sans-serifs:

- **Bricolage Grotesque** — display and headings (700–800). Expressive grotesque with tight tracking (−0.02 to −0.035em) and strong weight contrast; carries the editorial voice.
- **Geist** — body and UI (400–600). Neutral, highly legible; line height 1.55–1.6 for prose.
- **Nunito** — micro-labels, eyebrows, captions (500–700, uppercase, +0.10–0.12em). Rounded humanist warmth at small sizes where the grotesque would feel cold.
- **code** — a monospace fallback stack for token/code specimens.

**Responsive display:** `display` and `heading-lg` scale with the viewport via `clamp()` — `display` ≈ `clamp(44px, 7vw, 100px)`, `heading-lg` ≈ `clamp(32px, 3.6vw, 48px)`. The front-matter `fontSize` records the desktop target.

**Legibility constraints (non-negotiable):** body line height ≥ 1.5; heading line height 1.1–1.3; display 0.98–1.0; letter spacing negative on large sizes, positive on small label/caption sizes.

## Layout

- **Base unit:** 4px. All spacing derives from it.
- **Container:** content max-width **1200px**, centered, with a horizontal page gutter.
- **Rhythm:** major page sections separated by a large vertical gap (`section-gap` = 80px); components within a group by a small gap (`component-gap` = 24px); page containers padded by `page-gutter` = 32px.
- **Density:** content-sparse at the layout level (generous section gaps), tighter inside structured components (the offer spec cards) — the scale carries both fine (4–32px) and generous (48–128px) stops to serve this mixed density.

## Elevation & Depth

Surfaces are **flat** — depth comes from restrained, **violet-tinted ink shadows** (derived from `#1A1830`), never pure-black `rgba(0,0,0,…)`. Three levels:

- `shadow-sm` — `0 1px 2px rgba(26,24,48,.06), 0 1px 3px rgba(26,24,48,.05)` — cards at rest.
- `shadow-md` — `0 6px 16px rgba(26,24,48,.08), 0 2px 4px rgba(26,24,48,.05)` — raised / hover.
- `shadow-lg` — `0 16px 40px rgba(26,24,48,.12), 0 4px 10px rgba(26,24,48,.06)` — overlays / modals.

No neumorphism, no glassmorphism, no inner shadows. Elevation is used sparingly; borders do most of the separation work on the light surface.

## Shapes

Radius is **tiered, not uniform** — a hierarchy signals component weight:

| Component type | Radius token | Value |
|---|---|---|
| Chips / badges | `rounded.sm` | 8px |
| Buttons | `rounded.md` | 12px |
| Inputs / form fields | `rounded.md` | 12px |
| Cards | `rounded.lg` | 18px |
| Modals / dialogs | `rounded.xl` | 22px |
| Tooltips | `rounded.sm` | 8px |
| Avatars / pills / marquee | `rounded.full` | 9999px |

Buttons sit at 12px rounded-rectangle (a deliberate move away from full-radius pills). Nothing above `xl` except intentionally circular elements.

## Components

Every component references **semantic tokens** (Tier 2) or its own **component tokens** (Tier 3) that alias them — never primitives. This keeps the palette swappable without touching component code.

**Required states for every interactive component:** default, hover, focus-visible, active, disabled. The **focus indicator** is a 3px `border-focus` ring at 2px offset and must meet ≥3:1 against the surface (verified 6.56:1). **Touch targets** for interactive elements are ≥44×44px.

Core set (built in Step 9): Button (+ IconButton), Input/Textarea, Select/Combobox, Checkbox/Radio/Switch, Badge, Card, Dialog, Popover, Tooltip, Separator. Built in vanilla HTML + CSS custom properties (no framework), consuming the compiled token CSS.

## Do's and Don'ts

**Do**
- Use dark ink text on every bright fill (secondary/semantic/accent).
- Keep working surfaces quiet (off-white, tinted) so the categorical palette reads as deliberate.
- Vary radius by component weight; keep buttons at 12px.
- Use categorical accents for sectioning, data, and decoration — with meaning, not at random.
- Reference semantic tokens from component code.

**Don't**
- Don't use pure white (`#FFFFFF`) or pure black (`#000000`) as surface/text tokens.
- Don't introduce a medium 220–240° blue, `#FAFAFA`/`#F8F9FA` gray surfaces, or a hue-less gray ramp.
- Don't apply one uniform radius to everything, or revert buttons to full-radius pills.
- Don't put white text on mint, coral, pink, or yellow fills (fails AA).
- Don't use a categorical accent as a semantic signal (e.g., mint to mean "success" outside the defined `success` role).
- Don't add opacity-derived containers (`rgba(primary, 0.1)`); use the defined container tokens.

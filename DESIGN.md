---
name: "*maki"
description: "Il tuo taccuino digitale per il sushi all you can eat."
colors:
  salmon: "#F07868"
  salmon-light: "#FEF0EE"
  nori: "#2C372D"
  rice: "#F4F0E2"
  background: "#F4F0E2"
  foreground: "#2C372D"
  card: "#FDFAF0"
  primary: "#F07868"
  primary-foreground: "#FFFFFF"
  secondary: "#E6E2D3"
  secondary-foreground: "#2C372D"
  muted: "#E6E2D3"
  muted-foreground: "#7A8878"
  destructive: "#D94F3D"
  destructive-foreground: "#FFFFFF"
  border: "#D8D4C4"
  ring: "#F07868"
  background-dark: "#141714"
  foreground-dark: "#EDE9D8"
  card-dark: "#1C221C"
  nori-dark: "#A0BEA2"
typography:
  display:
    fontFamily: "Fraunces Variable, ui-serif, Georgia, serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Fraunces Variable, ui-serif, Georgia, serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: "normal"
  body:
    fontFamily: "DM Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
  label:
    fontFamily: "DM Sans Variable, ui-sans-serif, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: "normal"
rounded:
  sm: "0.5rem"
  md: "0.75rem"
  lg: "1rem"
  xl: "0.75rem"
  pill: "9999px"
  blob: "2rem"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.salmon}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.pill}"
    padding: "0 1.25rem"
    height: "2.5rem"
  button-primary-hover:
    backgroundColor: "{colors.salmon}"
    textColor: "{colors.primary-foreground}"
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.pill}"
  button-ghost:
    backgroundColor: "{colors.muted}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.md}"
  badge:
    backgroundColor: "{colors.salmon}"
    textColor: "{colors.primary-foreground}"
    rounded: "{rounded.pill}"
    height: "1.25rem"
    padding: "0.125rem 0.5rem"
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.foreground}"
    rounded: "{rounded.blob}"
    padding: "1rem"
  input:
    backgroundColor: "transparent"
    textColor: "{colors.foreground}"
    rounded: "{rounded.lg}"
    height: "2rem"
    padding: "0.25rem 0.625rem"
---

# Design System: *maki

## 1. Overview

**Creative North Star: "The Warm Izakaya"**

*maki feels like the cozy glow of a neighborhood sushi counter rendered in software. The whole system runs on three committed brand colors — **nori** green ink, **salmon** accent, and a warm **rice** ground — so that opening the app at the table feels like sitting down at a familiar spot, not booting a utility. Everything is soft-edged and hand-kept: generous pill rounding, diffuse ambient shadows, a Fraunces serif that gives every heading a characterful, almost handwritten warmth. The interface is intimate and tactile, built to be glanced at and tapped one-handed while chopsticks are in the other hand.

This is a **product** surface that never forgets it serves a meal, not a dashboard. Personality lives entirely in type, color, and the satisfying physics of its components — the salmon thumbs-up that lights up when you'd reorder a dish, the gentle press-down on every button, the haptic tick. It refuses the cold of a **generic SaaS dashboard** (no gray card-grids, no chart chrome), the noise of an **aggressive food-delivery app** (no neon CTAs, discount banners, or upsells — nothing is being sold), the joylessness of a **sterile enterprise UI**, and the clutter of a **template restaurant menu site**. Warmth is non-negotiable; clutter is forbidden.

Density stays low and breathable. The app is mobile-first, lives full-bleed on a phone, and uses a first-class dark mode that swaps the rice ground for a deep nori near-black so the warmth survives a dim restaurant.

**Key Characteristics:**
- Three-color committed palette: nori ink, salmon accent, rice ground
- Pill-and-blob rounding — almost nothing is sharp-cornered
- Soft ambient elevation; surfaces rest gently lifted
- Fraunces serif headings over DM Sans body — warmth from the type pairing
- Tactile, haptic, one-handed; defers to the meal
- Dark mode as a first-class peer, not an afterthought

## 2. Colors

A committed three-color brand system — warm rice ground, deep nori ink, salmon accent — kept deliberately small so the app reads as one warm room.

### Primary
- **Salmon** (`#F07868`): The single accent. Primary CTAs (the pill "Aggiungi" buttons), the active state of the like-toggle and segmented tabs, focus rings, links on hover. This is the one warm voice in the room — reserved for action and current selection, never for decoration. **Salmon Light** (`#FEF0EE`) is its faint tint backdrop in light mode; in dark mode it becomes a deep `#3A1E1A` ember.

### Secondary
- **Rice** (`#F4F0E2`): The warm body ground in light mode — the tablecloth everything sits on. Carried as `background`. In dark mode it inverts to the foreground ink (`#EDE9D8`).
- **Secondary / Muted Sand** (`#E6E2D3`): The second neutral layer for ghost buttons, the segmented-tab track, quieter chips, and footer bars — a half-step warmer-darker than the card surface.

### Neutral
- **Nori** (`#2C372D`): The primary ink. All foreground text, headings, the PWA theme-color. A deep desaturated green that reads almost-black but stays warm. In dark mode the *named* nori token lifts to a soft sage (`#A0BEA2`) for accented headings.
- **Card / Crema** (`#FDFAF0`): The raised surface — one notch lighter and creamier than the rice ground, so cards float off the tablecloth without a hard border.
- **Muted Sage** (`#7A8878`): Secondary text, captions, menu numbers, placeholder text. A desaturated green-gray, never a cold neutral gray.
- **Border Oat** (`#D8D4C4`): Hairline borders and input strokes; mostly replaced by translucent `ring-1 ring-foreground/10` on cards.

### Tertiary
- **Destructive Clay** (`#D94F3D`): Delete and error states only. Always served at low opacity as a tinted background (`bg-destructive/10`) with clay text — never a full-saturation red block.

### Named Rules
**The One Warm Voice Rule.** Salmon is the only accent and appears on ≤10% of any screen — one CTA, one active toggle, one focus ring at a time. Its rarity is what makes a reorder feel like a small celebration. Two salmon elements competing for attention means one is wrong.

**The No Cold Gray Rule.** There is no neutral gray in this system. Every "gray" is a desaturated green or warm sand pulled toward nori or rice. A cold `#888` anywhere is a bug.

## 3. Typography

**Display Font:** Fraunces Variable (with ui-serif, Georgia, serif)
**Body Font:** DM Sans Variable (with ui-sans-serif, system-ui, sans-serif)

**Character:** A high-contrast pairing on the classic serif-plus-sans axis. Fraunces is a soft, "old-style" serif with optical-size warmth and gentle wedge serifs — it gives every heading a hand-kept, characterful voice (the brand's `*maki` wordmark lives here). DM Sans is a clean, slightly rounded geometric sans that keeps body copy, labels, and data quiet and legible at phone sizes. The contrast between them is the point; never let the body font creep into headings or vice versa.

### Hierarchy
- **Display** (Fraunces, 700, `text-3xl` / 1.875rem, tight leading): The wordmark and top-level screen titles ("*maki", restaurant name). Always `text-nori`.
- **Headline** (Fraunces, 500–700, `text-xl`–`text-2xl` / 1.25–1.5rem): Dialog titles ("Aggiungi Piatto"), empty-state headings, restaurant cards. The workhorse serif size.
- **Title** (DM Sans, 500, `text-base` / 1rem): Card titles, list-item dish names — kept in the sans for scannability in dense lists.
- **Body** (DM Sans, 400, `text-sm` / 0.875rem, 1.5 leading): Default running text and descriptions. Prose caps at 65–75ch; the app is narrow so this rarely binds.
- **Label** (DM Sans, 500, `text-xs` / 0.75rem): Menu numbers, badge text, captions, helper text. Note: inputs use `text-base` (16px) on mobile to prevent iOS zoom, dropping to `text-sm` at `md`.

### Named Rules
**The Serif-Heads-Only Rule.** Fraunces is for headings and the wordmark exclusively. Buttons, labels, inputs, data, and badges are always DM Sans. A display serif inside a button or a table cell is forbidden — it reads as decoration, not voice.

## 4. Elevation

Soft ambient lift. Surfaces are not flat — they rest gently raised off the rice ground with wide, very-low-opacity diffuse shadows, the way a dish sits on a tablecloth. Depth is atmospheric, never structural or hard. Hover and press deepen the lift smoothly; nothing snaps. Cards lean on a translucent `ring-1 ring-foreground/10` instead of a hard border so the edge stays soft. Sticky headers and tab bars use `backdrop-blur-md` over a translucent ground to float content beneath them.

### Shadow Vocabulary
- **Rest** (`box-shadow: 0 2px 12px rgba(0,0,0,0.04)`): Default resting card lift. Barely-there; you feel it more than see it.
- **Hover** (`box-shadow: 0 8px 24px rgba(0,0,0,0.06)`): Cards on hover/focus — the dish lifts toward you.
- **Inset toggle** (`box-shadow: 0 2px 8px rgba(0,0,0,0.06)`): The raised "selected" chip in the like-toggle and the active segmented tab, lifting off their track.
- **Track** (`shadow-inner`): The recessed segmented-tab container the active pill sits inside.
- **Dialog** (`shadow-xl`): Modals and the lightbox — the one place a deeper shadow is allowed, to separate from the backdrop.

### Named Rules
**The Diffuse-And-Warm Rule.** Shadows are always wide-radius and ≤6% opacity. A tight, dark drop-shadow (the 2014-app default) is forbidden — if it looks like a hard edge instead of a soft glow, the blur is too small and the opacity too high. Press states deepen the lift; they never add a harsh outline.

## 5. Components

Soft, rounded, tactile. Every interactive surface has generous rounding, a gentle press-down (`active:scale` or `active:translate-y-px`), and — on key actions — a haptic tick. The vocabulary stays consistent screen to screen.

### Buttons
- **Shape:** Pill by default for primary actions (`rounded-full`); the base UI button uses `rounded-lg` (1rem) for inline/toolbar use.
- **Primary:** Salmon ground, white text, semibold. The headline CTA is a tall pill (`h-14 rounded-full` full-width, or `h-10 px-5` inline). Hover dims to `bg-salmon/90`; press scales to `0.97–0.98`.
- **Hover / Focus:** All transitions `transition-all`. Focus-visible shows a 3px salmon ring at 50% (`ring-ring/50`) plus a solid ring border. Active nudges down 1px or scales slightly.
- **Outline:** Transparent/background ground, oat border, hover fills to muted sand. Used for secondary table actions.
- **Ghost:** No ground at rest; hover fills muted sand. Used for icon and low-emphasis actions.
- **Destructive:** Never a solid red. `bg-destructive/10` clay tint with clay text, deepening to `/20` on hover.

### Chips / Badges
- **Style:** Fully rounded (`rounded-4xl`), `h-5`, salmon-on-white by default. Variants: `secondary` (sand), `outline` (oat border), `destructive` (clay tint), `ghost`.
- **Use:** Menu numbers, dish status ("in arrivo"), counts. Small, quiet, single-purpose.

### Cards
- **Corner Style:** Soft blob rounding — restaurant cards go to `rounded-[2rem]`; the base card is `rounded-xl` (0.75rem).
- **Background:** Crema card surface (`#FDFAF0`), one notch off the rice ground.
- **Shadow Strategy:** Rest lift (`0 2px 12px /0.04`) deepening to hover lift (`0 8px 24px /0.06`); see Elevation. Press scales to `0.98`.
- **Border:** No hard border — a translucent `ring-1 ring-foreground/10` keeps the edge soft. Footers use a faint top border over `bg-muted/50`.
- **Internal Padding:** `1rem` (`p-4`), tightening to `0.75rem` at `size=sm`.

### Inputs / Fields
- **Style:** Transparent ground, oat border, `rounded-lg`, `h-8`. Body text at 16px on mobile (anti-zoom), 14px on desktop.
- **Focus:** Border shifts to salmon ring + 3px `ring-ring/50` glow. No layout shift.
- **Error / Disabled:** `aria-invalid` shows a clay border + clay ring. Disabled drops to 50% opacity with a faint input fill.

### Navigation
- **Style:** No persistent chrome. A sticky top header (restaurant name in Fraunces) over `backdrop-blur-md`, plus a sticky **segmented control** (Tabs) below it for "Al tavolo" / "Storico". Active tab lifts to a crema pill with salmon text and inset shadow inside a recessed sand track. Mobile is the primary target; desktop just centers the same column.

### The Like / Dislike Toggle (signature)
The heart of the product's "memory." Two round 32px buttons sharing a track: thumbs-up and thumbs-down. At rest both are muted sage at 60% opacity. Selecting "liked" lifts a crema chip with **salmon** icon and inset shadow; "disliked" lifts the same chip with **nori** icon. Exactly one or zero is active. Selection fires a haptic tick. This is where past votes surface at the moment of decision — never bury it in a separate view.

## 6. Do's and Don'ts

### Do:
- **Do** keep salmon to ≤10% of any screen — one CTA, one active toggle, one focus ring (The One Warm Voice Rule).
- **Do** pull every neutral toward nori or rice. Sage-grays and warm sands only; a cold `#888` is a bug (The No Cold Gray Rule).
- **Do** use Fraunces for headings and the wordmark exclusively; DM Sans for everything operable (The Serif-Heads-Only Rule).
- **Do** round generously — pills for actions, `rounded-[2rem]` blobs for feature cards, `rounded-4xl` for badges.
- **Do** keep shadows wide and ≤6% opacity; deepen lift on hover/press (The Diffuse-And-Warm Rule).
- **Do** give key actions a press state (`active:scale`/`translate-y-px`) and a haptic tick. The app should feel physical.
- **Do** treat dark mode as a peer: deep nori near-black ground (`#141714`), warm rice text — verify both themes on every change.
- **Do** surface past votes where the decision is made, not in a separate screen.

### Don't:
- **Don't** build a **generic SaaS dashboard** — no gray card-grids, chart widgets, or admin chrome. This is a notebook, not an analytics panel.
- **Don't** adopt **aggressive food-delivery app** energy — no neon CTAs, discount banners, upsells, or push-y patterns. Nothing is being sold.
- **Don't** ship a **sterile enterprise UI** — no Material-by-default, heavy chrome, or joyless dense forms. Warmth is non-negotiable.
- **Don't** clutter like a **template restaurant menu site** — no stock-photo soup, no busy layouts. Scanning stays effortless.
- **Don't** use a second accent color or two salmon elements competing on one screen.
- **Don't** use tight, dark drop-shadows or hard borders — if it looks like a 2014 app, the blur is too small and the opacity too high.
- **Don't** put a display serif inside a button, label, input, or data cell.
- **Don't** use `border-left`/`border-right` >1px as a colored accent stripe, gradient text, or decorative glassmorphism (blur is for sticky-header legibility only).

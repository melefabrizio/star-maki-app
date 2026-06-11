# Product

## Register

product

## Users

People at an all-you-can-eat sushi restaurant, mid-meal, phone in one hand,
chopsticks in the other. They're juggling a paper menu, trying to remember what
they already ordered, what's still coming to the table, and what they loved (or
regretted) last time. The context is noisy, social, and time-pressured — they
need to glance, tap, and look back up. No accounts, no setup: open the PWA and
go. It's a personal digital notebook, used repeatedly at the same handful of
local spots.

## Product Purpose

*maki ("star maki") solves the "Chi ha ordinato questi?" problem at sushi
all-you-can-eat: tracking what's been ordered, what's arrived, and what's worth
reordering next time. Each restaurant keeps its own memory — a catalog of dishes
(name + optional menu number), a live in-progress order with arrival tracking,
and post-visit votes (reorder / avoid). Success is a returning diner who opens
the app at the table and immediately knows where to start, never loses count,
and builds a personal taste map of each place over time. Offline-first, installable,
zero friction.

## Brand Personality

Warm, playful, crafted. *maki feels like a friendly companion at the table, not
a tool — the Fraunces serif gives it a handmade, characterful voice; the salmon
and nori palette carries the cozy warmth of a neighborhood izakaya. Tone is
casual and Italian-familiar (it speaks to you, never at you), with small moments
of delight, but it always defers to the meal: quick to read, quick to tap,
quick to put down. Personality lives in the type, color, and micro-interactions —
never in clutter or noise.

## Anti-references

- **Generic SaaS dashboard** — cold gray card-grids, chart widgets, corporate
  admin chrome. This is a personal notebook, not an analytics panel.
- **Aggressive food-delivery app** — no neon CTAs, discount banners, upsells, or
  push-y Deliveroo/JustEat energy. Nothing is being sold here.
- **Sterile enterprise UI** — no Material-Design-by-default, heavy chrome, or
  dense joyless forms. Warmth is non-negotiable.
- **Cluttered restaurant menu site** — no stock-photo soup, no busy template
  layouts. Scanning must stay effortless.

## Design Principles

- **Defer to the meal.** The diner's attention belongs at the table, not the
  screen. Every interaction should be glanceable and one-tap. Speed and clarity
  beat completeness.
- **Warmth without noise.** Personality comes from type, color, and craft — never
  from decoration, clutter, or volume. Quiet can still be characterful.
- **Memory is the magic.** The product's value is remembering for you. Surface
  past votes and history exactly where a decision is being made, not buried in a
  separate view.
- **Thumb-first, table-tested.** Designed for one hand, in low light, in a noisy
  room. Touch targets, contrast, and hierarchy assume real conditions, not a
  desk.
- **Honest utility.** No accounts, no dark patterns, no selling. The app earns
  trust by doing one job exceptionally and staying out of the way.

## Accessibility & Inclusion

Best-effort, no formal WCAG target committed. Practical priorities given the
mobile-at-the-table context: legible contrast for both light and dark themes
(dark mode is already first-class), comfortable thumb-reach touch targets,
honoring `prefers-reduced-motion` for the app's animations, and clear visual
state for ordered / arrived / voted items so status is never ambiguous at a
glance.

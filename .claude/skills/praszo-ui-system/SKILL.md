---
name: praszo-ui-system
description: Design-system, content and code-quality rules for the Praszo site (tokens, typography tiers, shared UI components, data-driven copy, no hardcoding). Use before adding or changing any page, section, component, style or copy in src/.
---

# Praszo UI system and code standards

Changes extend the existing system. If something seems to need a one-off value, first look for the token,
class, component or data field that already covers it. Add a new one only when nothing fits, and add it at the
source (token or data file), not inline.

## Content: data, not JSX

- Copy lives in `src/data/`: `company.ts` (contact, routes, `demoCta`), `navigation.ts`, `home.ts`,
  `products.ts` (typed `Product`, `getProduct`, `productList`), `product-sections.ts`, `workflow.ts`,
  `showcases.ts`, `pages/*` (footer pages). Components receive data. They don't embed strings or lists.
- Copy comes only from praszo.com or material the user supplied. Don't invent stats, testimonials, clients or
  features, and don't build fake forms. Every "Book a demo" uses `demoCta` (it goes to `/contact`).
- Screens and visuals are typed `Visual` entries (`image` with alt and caption, or a `mockup` id resolved through
  the mockup registry). Images are static imports from `src/assets/`, so width, height and blur come for free.

## Styling: tokens and tiers

- Colours, radii, shadows, easings and header height come from `src/app/tokens.css` through Tailwind theme
  names (`bg-surface`, `text-ink-2`, `border-line`, `bg-brand`, `text-brand-strong`, `bg-product-soft`,
  `text-product-deep`, `rounded-card`, …). Never hardcode a hex or rgba value in a component.
- Product colour comes from the cascade: a `data-product` ancestor sets `--product`. Shared components use
  `product` tokens and never branch on the slug for colour.
- Light and dark scenes: set `data-theme="dark"|"light"` on the section; tokens re-map. Use the `dark:`
  variant only for genuine exceptions.
- Typography uses the tier classes in `globals.css`: `display-hero`, `display-xl`, `display-lg`, `display-md`,
  `display-sm`, `heading`, `lede`, `copy`, `label`, plus the `Eyebrow` component. Don't use ad hoc
  `text-[..px] font-.. tracking-..` combinations for text roles a tier already covers.
- Surfaces are flat: no borders, no box-shadows on cards, mockups or screenshots, unless the user asks.
  Mockups default to light mode.
- Merge classes with `cn()` from `@/lib/cn`.

## Components to reuse

`Button`/`buttonClasses` (internal, external, mailto and tel links handled), `Container`, `SectionHeader`,
`Eyebrow`, `Badge`, `EditorialItem`, `Icon name="…"` (never call `getIcon()` in render), `ProductGlyph`,
`ProductLockup`, `ProductLinks`, `SocialIcon`, `Logo`. Motion primitives are listed in the `praszo-motion` skill.

## Next 16 and React 19 specifics

- Read `node_modules/next/dist/docs/` before using any Next API (this Next differs from training data).
  Context7 MCP covers other libraries.
- Server Components by default. Add `"use client"` only for interactivity or motion, and keep it at the leaf.
- `cacheComponents` is on: no `export const dynamic`/`revalidate`, and no `new Date()` in render. Routes stay
  mounted (Activity), so ids are unique per route (slug-prefixed).
- Metadata comes from `buildMetadata()` (`src/lib/metadata.ts`). Structured data goes through `jsonLd()`.
- The React Compiler is on. Don't add manual `useMemo`/`useCallback` for render cost, and don't define
  components inside components.
- `next/image`: always pass `sizes`. Hero images use `loading="eager"` with `fetchPriority="high"`
  (`priority` is deprecated).

## Accessibility baseline

One `h1` per page, ordered headings, `aria-labelledby` on sections, real `<button>`/`<a>`, visible focus,
`alt` on every image (empty only for decoration), reduced-motion fallbacks (see `praszo-motion`), at least
44px touch targets, and no horizontal overflow at 390px.

## Definition of done

1. `npx tsc --noEmit`, `npm run lint`, then a clean build (`rm -rf .next/cache/turbopack && npm run build`).
2. Browser check with the `playwright-testing` skill at 1440 and 390, with no console errors.
3. Report what changed, what was verified and what wasn't. Never claim "production-ready" from a green build alone.
   Don't commit unless asked.

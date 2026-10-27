# Praszo corporate website

> Full implementation guide for agents and developers (packages, motion architecture, every section and its animation, rules, QA, audit findings): [`docs/implementation-guide.md`](docs/implementation-guide.md).

Marketing site for [Praszo](https://praszo.com) — on-premise practice management tools for audit firms — built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis and `motion/react`.

## Routes

| Route | Page |
| --- | --- |
| `/` | Corporate homepage: hero, trusted-by logos, platform pillars, product ecosystem, audit workflow tour, Why Praszo, segments, testimonials, FAQ, CTA |
| `/practice` | Praszo Practice — practice management |
| `/verifi` | Praszo Verifi — AI financial statement validation |
| `/match` | Praszo Match — AI purchase vouching |
| `/docs` | Praszo Docs — on-premise document management |
| `/contact` | Contact details and demo requests (phone, email, address) |

Every route has its own metadata, canonical URL and generated Open Graph image (`opengraph-image.tsx`). `sitemap.xml` and `robots.txt` are generated from `src/data/company.ts`.

## Editing content

All copy lives in `src/data/`:

- `company.ts` — company details, contact information, social links, navigation, routes.
- `products.ts` — the four products (hero, highlights, spotlights, feature sections, workflow, audience, FAQ, CTA). Each product page in `src/app/<slug>/page.tsx` composes shared sections from `src/components/product/` and adds product-specific ones.
- `home.ts` — homepage copy, client logos, testimonials, FAQ.

Images are static imports from `src/assets/` (brand marks, client logos, product screenshots). Hand-built UI mockups live in `src/components/mockups/`. Each product has an animated service mockup (`src/components/mockups/{kanban-board,verifi-validator,match-engine,docs-pipeline}.tsx`, registered in `product-showcases.tsx`, content in `src/data/kanban.ts` and `src/data/showcases.ts`). The homepage hero (`src/components/sections/hero-showcase.tsx`) rotates through all four with the product icons as tabs; each product hero shows its own mockup and the real screenshots follow in a `HorizontalScroll` rail (`src/components/product/product-preview.tsx`): the hero capture, every spotlight capture and any `screens` listed on the product, each sized from its own aspect ratio to one shared height (`.screen-rail`); a product with a single capture falls back to the full-width layout. Both heroes render through `HeroShell` (`src/components/sections/hero-shell.tsx`): a viewport-height grid whose giant title row is pinned to the bottom edge (always visible without scrolling) while the lede and the mockup share the space above it. The mockup sits in a `.fit-box`/`.fit-frame` pair (`src/app/globals.css`): on phones the frame is free-form and takes every pixel left between the lede and the headline; from 640px up its height is capped to a 720:520 window and centred in the slack (the homepage uses `.fit-box-end` so its caption row stays attached). Hero CTAs are compact below 640px so both fit on one row. Mockup boards use `grid-rows-[minmax(0,1fr)]` plus clipped lists so they never grow past the window body, and `WindowFrame` is the positioned clipping container, so Flip-animated cards cannot escape it. Mockups share one surface rule (`MockupShell`): the window body is a flat `bg-elevated` desk, everything on it is a borderless `bg-bg` card, state is shown by a background tint (`bg-product-soft`) rather than a border, and a card only gets a shadow while it is lifted. Boards animate with transform-only GSAP Flip (`scale: true`, `absolute: true`) and finish any in-flight tween on cleanup. Note that `bg-product-soft` is mixed per element in `@theme inline`, so it follows the nearest `--product` override. In the heroes the mockups render dark by default and a sun/moon toggle in the window bar switches them to light; the theme is local (`MockupThemeProvider` in `src/components/mockups/mockup-theme.tsx` sets `data-theme` plus `data-theme-local` on the hero frame, and `ThemeObserver` ignores `data-theme-local`, so the page chrome is unaffected). Mockups pause when hidden and are static under reduced motion; `ProductIconNav` (`src/components/ui/product-icon-nav.tsx`) is a reusable product menu with a GSAP sliding highlight and tooltips that routes to each product overview and, in the hero, acts as tabs for that loop.


### First-load splash

Every full page load opens on a screen in the Praszo icon color. That screen is the mark itself: a vector traced from `src/assets/brand/praszo-mark.png`, scaled up around a point inside its solid wedge so it covers the viewport. Once the page and fonts have loaded, GSAP contracts it into the "Z" (revealing the site around it), starts Lenis and the hero entrance, and settles the mark onto the header logo. Under reduced motion the coral screen simply fades. An inline boot script in `src/app/layout.tsx` (from `src/lib/splash.ts`) sets `<html data-splash>` before first paint; client-side navigation never replays it, and visitors without JS never see it. The overlay lives in `src/components/layout/splash.tsx`; header marks it can land on carry `data-logo-mark`.

## Development

```bash
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_SITE_URL to the public origin
npm run dev
npm run lint
npm run build && npm start
```

`NEXT_PUBLIC_SITE_URL` drives `metadataBase`, canonical URLs, the sitemap and robots.txt.

## Design system

The visual language borrows from editorial "type as graphic" sites: giant Manrope display titles (`.display-xl/-lg/-hero/-md/-sm` in `src/app/globals.css`) that overlap the content below them, a fixed 100×150px grid texture with a thin teal→coral brand bar, and alternating light/dark **scenes**. A section opts into the dark scene with `data-theme="dark"`; the token set in `src/app/tokens.css` flips automatically and `ThemeObserver` mirrors the scene crossing the viewport middle onto `<html>`, so the floating pill nav and the background crossfade with it. Praszo's brand colors stay the primaries: teal for actions, coral for the mark, one color per product.

Reusable motion primitives live in `src/components/motion/`: `useScene` (sticky, scroll-scrubbed step scenes used by the product ecosystem, the workflow tour and product spotlights), `WordReveal` (statements that light up word by word), `HorizontalScroll` (see below) and the GSAP `RevealHeading`/`RevealGroup` helpers. Every scene renders a stacked fallback for mobile, reduced motion and no-JS.

### Horizontal scroll carousel

`HorizontalScroll` (`src/components/motion/horizontal-scroll.tsx`) pins a section and translates its card track horizontally as the visitor scrolls vertically. The travel distance is measured from the track (`scrollWidth - viewport width`), so scrolling maps 1:1 to movement, reverses naturally and releases the pin at both ends. It reuses the single Lenis instance and GSAP ticker from `SmoothScroll` (ScrollTrigger is already bound to Lenis), adds no wheel listeners, re-measures on resize and image load, and reverts the pin on unmount. Below 768px and under reduced motion the same markup becomes a native horizontal scroll region with scroll snapping. Content stays outside the component: pass any cards as children (wrap them in `HorizontalCard` so keyboard focus scrolls them into view) and an optional `header`. It powers Why Praszo, the testimonials and the single-group feature rails on product pages.

## Motion

GSAP plugins are registered once in `src/components/motion/gsap.ts`. Every animation runs inside `useGSAP` with a scope so it cleans up and re-initialises when Next.js preserves a route in the background. Reduced-motion preferences disable the entrance timelines, the workflow tour (which falls back to a stacked layout) and the logo marquee.

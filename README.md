# Praszo corporate website

Marketing site for [Praszo](https://praszo.com) — on-premise practice management tools for audit firms — built with Next.js 16 (App Router, Cache Components), React 19, Tailwind CSS v4, GSAP + ScrollTrigger, Lenis and `motion/react`.

## Routes

| Route | Page |
| --- | --- |
| `/` | Corporate homepage: hero, trusted-by logos, platform pillars, product ecosystem, audit workflow tour, Why Praszo, segments, testimonials, FAQ, CTA |
| `/practice` | Praszo Practice — practice management |
| `/verifi` | Praszo Verifi — AI financial statement validation |
| `/match` | Praszo Match — AI purchase vouching |
| `/modifi` | Praszo Modifi — engagement letter automation |
| `/docs` | Praszo Docs — on-premise document management |
| `/contact` | Contact details and demo requests (phone, email, address) |

Every route has its own metadata, canonical URL and generated Open Graph image (`opengraph-image.tsx`). `sitemap.xml` and `robots.txt` are generated from `src/data/company.ts`.

## Editing content

All copy lives in `src/data/`:

- `company.ts` — company details, contact information, social links, navigation, routes.
- `products.ts` — the five products (hero, highlights, spotlights, feature sections, workflow, audience, FAQ, CTA). Each product page in `src/app/<slug>/page.tsx` composes shared sections from `src/components/product/` and adds product-specific ones.
- `home.ts` — homepage copy, client logos, testimonials, FAQ.

Images are static imports from `src/assets/` (brand marks, client logos, product screenshots). Hand-built UI mockups live in `src/components/mockups/`. Each product has an animated service mockup (`src/components/mockups/{kanban-board,verifi-validator,match-engine,modifi-flow,docs-pipeline}.tsx`, registered in `product-showcases.tsx`, content in `src/data/kanban.ts` and `src/data/showcases.ts`). The homepage hero (`src/components/sections/hero-showcase.tsx`) rotates through all five with the product icons as tabs; each product hero shows its own mockup and the real screenshot follows in a preview section. Both heroes render through `HeroShell` (`src/components/sections/hero-shell.tsx`): a viewport-height grid whose giant title row is pinned to the bottom edge (always visible without scrolling) while the lede and the mockup share the space above it. The mockup sits in a `.fit-box`/`.fit-frame` pair (`src/app/globals.css`): on phones the frame is free-form and takes every pixel left between the lede and the headline; from 640px up its height is capped to a 720:520 window and centred in the slack (the homepage uses `.fit-box-end` so its caption row stays attached). Hero CTAs are compact below 640px so both fit on one row. Mockup boards use `grid-rows-[minmax(0,1fr)]` plus clipped lists so they never grow past the window body, and `WindowFrame` is the positioned clipping container, so Flip-animated cards cannot escape it. Mockups pause when hidden and are static under reduced motion; `ProductIconNav` (`src/components/ui/product-icon-nav.tsx`) is a reusable product menu with a GSAP sliding highlight and tooltips that routes to each product overview and, in the hero, acts as tabs for that loop.

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

Reusable motion primitives live in `src/components/motion/`: `useScene` (sticky, scroll-scrubbed step scenes used by the product ecosystem, the workflow tour and product spotlights), `WordReveal` (statements that light up word by word), `HorizontalScroll` (see below), `Tilt` (pointer-following 3D tilt on hero visuals) and the GSAP `RevealHeading`/`RevealGroup` helpers. Every scene renders a stacked fallback for mobile, reduced motion and no-JS.

### Horizontal scroll carousel

`HorizontalScroll` (`src/components/motion/horizontal-scroll.tsx`) pins a section and translates its card track horizontally as the visitor scrolls vertically. The travel distance is measured from the track (`scrollWidth - viewport width`), so scrolling maps 1:1 to movement, reverses naturally and releases the pin at both ends. It reuses the single Lenis instance and GSAP ticker from `SmoothScroll` (ScrollTrigger is already bound to Lenis), adds no wheel listeners, re-measures on resize and image load, and reverts the pin on unmount. Below 768px and under reduced motion the same markup becomes a native horizontal scroll region with scroll snapping. Content stays outside the component: pass any cards as children (wrap them in `HorizontalCard` so keyboard focus scrolls them into view) and an optional `header`. It powers Why Praszo, the testimonials and the single-group feature rails on product pages.

## Motion

GSAP plugins are registered once in `src/components/motion/gsap.ts`. Every animation runs inside `useGSAP` with a scope so it cleans up and re-initialises when Next.js preserves a route in the background. Reduced-motion preferences disable the entrance timelines, the workflow tour (which falls back to a stacked layout) and the logo marquee.

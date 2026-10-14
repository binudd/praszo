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

Images are static imports from `src/assets/` (brand marks, client logos, product screenshots). Hand-built UI mockups live in `src/components/mockups/`.

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

Reusable motion primitives live in `src/components/motion/`: `useScene` (sticky, scroll-scrubbed step scenes used by the product ecosystem, the workflow tour and product spotlights), `WordReveal` (statements that light up word by word), `DragRail` (draggable card rails), `Tilt` (pointer-following 3D tilt on hero visuals) and the GSAP `RevealHeading`/`RevealGroup` helpers. Every scene renders a stacked fallback for mobile, reduced motion and no-JS.

## Motion

GSAP plugins are registered once in `src/components/motion/gsap.ts`. Every animation runs inside `useGSAP` with a scope so it cleans up and re-initialises when Next.js preserves a route in the background. Reduced-motion preferences disable the entrance timelines, the workflow tour (which falls back to a stacked layout) and the logo marquee.

# Praszo website: implementation guide

Audience: an AI agent or developer about to change this codebase. Read this before touching sections or animation. It describes the site as built on 2026-10-14 (commit `2244071`), how every animated part works, which package owns which job, and the rules that keep it stable.

---

## 1. What this is

The corporate site for **Praszo** (praszo.com), an on-premise practice-management suite for audit firms. Five products, each with its own landing page:

| Route | Page | Product color |
|---|---|---|
| `/` | Corporate homepage | Brand coral `#f46a4a` (logo) |
| `/practice` | Praszo Practice (practice management, the core engine) | `#5539d9` |
| `/verifi` | Praszo Verifi (AI financial statement validation) | `#17b978` |
| `/match` | Praszo Match (AI purchase vouching, 3-way matching) | `#fb9528` |
| `/modifi` | Praszo Modifi (engagement letter automation) | `#2874ff` |
| `/docs` | Praszo Docs (on-premise document management) | `#d72d2d` |
| `/contact` | Contact and "Book a demo" | Brand coral |

About, Solutions, Insights and Privacy link out to praszo.com. Every "Book a demo" goes to `/contact` (the header button is the site's persistent one, visible at every width; hero sections show only their secondary action), which offers `tel:` and a pre-filled `mailto:pms@praszo.com`. There is no form backend.

**Content rules (do not break):**
- All copy comes from praszo.com, typos fixed, meaning unchanged. Everything lives in `src/data/`.
- No invented claims or numeric marketing stats (no "100%", "90%+", "10,000+").
- Pricing on praszo.com is chatbot-template residue. Never copy it.
- No fake forms.

The design language is modeled on sports.withgoogle.com/teamusa. It uses giant display type, alternating light and dark scenes, sticky scroll scenes, scrubbed reveals and pinned horizontal rails, all in Praszo's own palette and the Manrope font.

---

## 2. Stack and packages

| Package | Version | Job in this site | Where it is used | Rules |
|---|---|---|---|---|
| `next` | 16.4.0 | App Router, static prerender of all 7 routes, `next/image`, `next/og` | everywhere | **Not the Next you know.** Read `node_modules/next/dist/docs/` before writing Next code (see AGENTS.md). `cacheComponents: true`, `reactCompiler: true`, `partialPrefetching: true` in `next.config.ts`. |
| `react` / `react-dom` | 19.3.0 | UI, `<Activity>` route preservation | everywhere | The React Compiler lint is on. See §11. |
| `gsap` | ^3.15 | **All scroll and timeline animation.** Plugins: ScrollTrigger, Flip, MotionPathPlugin | `src/components/motion/*`, sections, mockups, splash | Import only from `@/components/motion/gsap`, never from `gsap` directly. That file registers plugins once. |
| `@gsap/react` | ^2.1 | `useGSAP({ scope })` hook for automatic cleanup | every GSAP component | Every GSAP effect must live inside `useGSAP` or an effect with cleanup. |
| `lenis` | ^1.3.26 | Smooth scrolling. It drives ScrollTrigger. | `src/components/motion/smooth-scroll.tsx` only | One instance, ticked by `gsap.ticker`. Use `getLenis()` and `scrollToTarget()`. Never create a second instance or call `window.scrollTo` for in-page jumps. |
| `motion` (motion/react) | ^14 | Small UI micro-interactions only: nav follower pill, menus, back-to-top, `useReducedMotion` | `site-header`, `products-menu`, `back-to-top`, `hero-entrance` (hook only) | Do not use it for scroll-linked animation. That is GSAP's job. |
| `@radix-ui/react-dialog` | ^1.2 | Mobile menu sheet (focus trap, Escape, aria) | `layout/mobile-menu.tsx` | |
| `@radix-ui/react-visually-hidden` | ^1.2 | Dialog title for screen readers | `layout/mobile-menu.tsx` | |
| `@radix-ui/react-slot` | ^1.4 | `asChild` on `Button` | `ui/button.tsx` | |
| `lucide-react` | ^1.53 | Icons | many | Render dynamic icons with `<Icon name="…" />` (`ui/icon.tsx`) only. Brand icons are missing in lucide, so `ui/social-icons.tsx` uses inline SVG. |
| `tailwindcss` v4 + `@tailwindcss/turbopack` | ^4 | Styling, CSS-first config | `src/app/globals.css`, `tokens.css` | No `tailwind.config`. Theme mapping lives in `@theme inline`. |
| `clsx` + `tailwind-merge` | | `cn()` in `src/lib/cn.ts` | everywhere | |
| `babel-plugin-react-compiler` | 1.0 | Auto-memoization | build | |

Scripts: `npm run dev`, `npm run build`, `npm run start`, `npm run lint`. Type-check with `npx tsc --noEmit`. If `LayoutProps` goes missing, run `npx next typegen`.

---

## 3. Next 16 behaviors that shape the code

1. **Routes stay mounted.** With `cacheComponents`, client-navigated routes are kept in React `<Activity>` (hidden with `display:none`, up to 3). Consequences:
   - **Duplicate ids.** Ids repeat across hidden routes. Product section ids are prefixed with the slug (`verifi-features`). Anchors resolve through `findVisible(selector)` in `smooth-scroll.tsx`.
   - **Re-runs.** Effects re-run on hide and show, so every animation must clean up (`useGSAP` scope, `gsap.matchMedia().revert()`, kill tweens and restore DOM).
   - **Played state.** The hero entrance remembers played routes in a module `Set`, so a re-shown route does not replay.
   - **Refresh timing.** `ScrollTrigger.refresh()` runs on every pathname change, and again 700 ms later once the route settles.
2. **Metadata merges shallowly.** Use `buildMetadata()` (`src/lib/metadata.ts`), which builds canonical, Open Graph and Twitter per route.
3. **Images.**
   - `next/image` `priority` is deprecated. Use `loading="eager"` plus `fetchPriority="high"`.
   - Always pass `sizes`.
   - Static imports give width, height and blur.
4. **OG images.** Use `ImageResponse` from `next/og`. `src/lib/og.tsx` renders all route OG images with the Manrope WOFF files from `src/assets/fonts`.
5. **No `new Date()` in render or sitemap.** `contentLastModified` in `data/company.ts` is a fixed string.

---

## 4. Repository map

```
src/
  app/
    layout.tsx            Root: fonts, JSON-LD, boot script, Splash, ambient layers, SmoothScroll, header/footer
    page.tsx              Homepage composition
    <slug>/page.tsx       Product pages (practice, verifi, match, modifi, docs) + opengraph-image.tsx each
    contact/page.tsx      Contact page
    globals.css           Theme mapping, type scale, all custom CSS classes (see §6)
    tokens.css            Design tokens (light + [data-theme="dark"])
    robots.ts, sitemap.ts, not-found.tsx, icon.png, apple-icon.png
  assets/  brand/ (mark PNG + 5 product SVG glyphs), clients/ (6 logos), products/ (screenshots), fonts/ (OG)
  data/
    company.ts            Contact, socials, nav, external links, demoCta, demoMailto, routes
    home.ts               All homepage copy (hero, ecosystem, why, segments + `art`, testimonials, faq, cta)
    products.ts           Typed Product model and the five products (copy, visuals, screens, spotlights, features, faq)
    product-sections.ts   Per-product in-page menu (ids must match rendered section ids)
    workflow.ts           The 6 audit workflow steps (home workflow tour)
    kanban.ts             Practice board mockup content and move script
    showcases.ts          Verifi/Match/Modifi/Docs mockup content
  lib/
    motion.ts             EASE, ANCHOR_OFFSET=0, prefersReducedMotion(), isFinePointer()
    splash.ts             Splash boot script, SPLASH_EVENT, splashActive(), onSplashDone()
    metadata.ts, og.tsx, json-ld.ts, fonts.ts, icons.ts, cn.ts
  components/
    motion/       gsap.ts, smooth-scroll.tsx, use-scene.ts, horizontal-scroll.tsx, reveal.tsx, word-reveal.tsx,
                  hero-entrance.ts, hero-scroll.ts, hero-title.tsx, 
    layout/       site-header, products-menu, mobile-menu, site-footer, splash, theme-observer, background-grid,
                  pointer-field, back-to-top, skip-link, nav-styles
    sections/     Homepage sections + shared hero-shell, hero-showcase, statement, faq-section, final-cta
    product/      Product page sections and helpers
    mockups/      Animated product mockups + window chrome + static mockups + registry
    ui/           button, badge, card, container, eyebrow, icon, logo, product-glyph, product-lockup,
                  product-icon-nav, section-header, social-icons
```

---

## 5. Data layer

The data layer drives the pages, and content edits should rarely need component changes.

- **`Product`** (in `data/products.ts`) has these fields:
  - **Identity and color:** `slug`, `name`, `fullName`, `color`, `colorDeep`, `category`, `tagline`, `summary`.
  - **Workflow and SEO:** `workflowStep` (order and label in the 6-step workflow) and `meta` (SEO).
  - **Hero:** `hero` (eyebrow, headline, description, `visual`).
  - **Section content:** `highlights?`, `problem?`, `spotlights[]`, `screens?`, `featureSections[]`, `comparison?`, `workflow?`, `audience?`, `faq[]`, `cta`.
- **`Visual`** is either `{ kind: "image", src, alt, frame? }` or `{ kind: "mockup", id }`. Mockup ids resolve through `components/mockups/registry.tsx` (static mockups: `docs-repository`, `verifi-report`, `match-three-way`).
- **`screens?`** holds extra captures for the screenshot rail after the hero. The rail always starts with `hero.visual` and then every spotlight visual, with duplicates dropped. Practice uses five real app captures.
- **Product color scoping.**
  - `ProductPage` sets `--product` and `--product-deep` inline on `<main data-product>`.
  - Anything inside uses `bg-product`, `text-product-deep` and `bg-product-soft`.
  - `bg-product-soft` is mixed **per element** in `@theme inline` (`color-mix(in srgb, var(--product) 10%, var(--bg))`), so it follows the nearest override. Never define product tints on `:root`. A root-resolved variable ignores overrides.
- **`home.segments.items[].image`** (`{ src, alt }`) is the photo for each firm size. Both are free under the Unsplash License; sources are noted beside their imports in `data/home.ts` (assets in `src/assets/segments/`, cropped 3:2, 1200×800).

---

## 6. Design system

### Tokens (`src/app/tokens.css`)
- **Neutrals:** `--bg`, `--surface`, `--elevated`, `--ink`, `--ink-2`, `--ink-3`, `--line`, `--line-strong`.
- **Brand:** the logo coral is the primary color. `--brand #f46a4a` (exact logo color: fills, rules, icons, large display text; 3.0:1 on white), `--brand-strong` (#b04c35 light / #ff8a70 dark: **all small brand text**, 5.3:1 on white), `--brand-hover`, `--brand-soft`, `--brand-ink` (white on coral fills, matching the product buttons; the user's choice, 3.0:1, below AA for normal text), hover darkens to `--brand-hover`. `--accent #f55d48` stays for warning flags in mockups. Use `text-brand` only for icons or text ≥24px; use `text-brand-strong` for anything smaller.
- **Product:** `--product`, `--product-deep`, `--product-soft` (defaults to brand).
- **Radii:** `--radius-sm .75rem`, `--radius-card 1.5rem`, `--radius-panel 2rem`, `--radius-media 3rem`.
- **Shadows:** `--shadow-card`, `--shadow-float`, `--shadow-stage` (big layered stage shadow), `--shadow-menu`.
- **Menu glass:** `--menu-bg` plus `--shadow-menu`. Menus have no borders by design.
- **Easing:** `--ease-out`, `--ease-expo`, `--ease-nav`. GSAP default `EASE = "power3.out"` (`lib/motion.ts`).
- **Header height:** `--header-h: 4.5rem` (used for hero and scene top padding).
- **Dark scene:** `[data-theme="dark"]` redefines the whole token set, so any subtree with that attribute restyles itself. Tailwind `dark:` is a custom variant that matches `[data-theme="dark"]` ancestors.

### Theme and scene switching
- **Dark sections.** A section opts into the dark scene with `data-theme="dark"`. Current dark sections are the home Statement, the WorkflowTour, the product feature rails (HorizontalScroll `theme="dark"`) and FinalCta.
- **`ThemeObserver`** mirrors whichever `[data-theme]` crosses the viewport middle onto `<html data-theme>`. The fixed background, brand bar and nav glass crossfade with it.
- **Local dark areas.** These must carry `data-theme-local`, or they will flip the page header. The hero mockup frame does this (see §9.6).

### Typography
- **Font.** Manrope through `next/font` (`lib/fonts.ts`) as `--font-manrope`. Body weight is 500.
- **Display scale** (in `@layer components`): `.display-xl`, `.display-lg` (homepage hero and big section titles), `.display-hero` (product hero), `.display-md`, `.display-sm`, `.heading` (item titles in rails, lists and dense grids, 19→24px), plus `.lede` (intro and short bodies), `.copy` (running text and lists, 16→18px) and `.label` (uppercase tracking: index numbers, kicker lines, compact links). Avoid one-off `text-[Npx]` sizes in sections; pick a tier.
- **Kickers.** `Eyebrow` (`ui/eyebrow.tsx`) has no dot. It carries a hand-drawn pen underline, the same loose stroke as the Modifi signature, as an inline SVG (`.eyebrow-scribble`). The stroke draws on hover of the kicker or its parent block (kicker + title + intro) via `stroke-dashoffset` with `pathLength=1`, CSS only, and retracts faster on leave. Touch screens (`hover: none`) show it drawn. Do not add `vector-effect: non-scaling-stroke`: Chrome then measures dashes in screen pixels and the stroke stops partway. The SVG needs an explicit width, because an absolutely positioned SVG ignores `left` + `right`.
- **Layer rule.** Base typography sits in `@layer base`. Unlayered CSS beats Tailwind utilities, which broke `truncate` once, so keep custom rules layered or class-scoped.

### Surfaces
- **No content cards.** Titled items never sit on a card surface. They use `EditorialItem` (`ui/editorial-item.tsx`): hairline top rule, `label` row (index and/or icon), `display-sm` + `lede` for sets of 2–3 (`size="display"`) or `heading` + `copy` for rails and lists (`size="heading"`). Used by pillars, highlights, audience, feature groups, both card rails and the contact details. Product link grids use `ProductLinks` (`ui/product-links.tsx`): rule, glyph, `heading`, one line of `copy`, hover to brand. The old `ui/card.tsx` was removed. Surfaces remain only for UI depictions (mockups, screenshots, the product posters), menus and buttons.
- **Menus.** `.menu-surface` (header nav pill and menu button; flat, no shadow) and `.menu-panel` (dropdowns; keeps `--shadow-menu` because it floats over content) are glass. Blur is emitted via `@apply backdrop-blur-xl backdrop-saturate-150`, because Lightning CSS drops the unprefixed property from hand-written rules.
- **Mockups** follow the contrast rule: flat `bg-elevated` desk, borderless `bg-bg` cards, state shown by a tint (`bg-product-soft`), shadow only while lifted. **No inner borders.**
- **Ecosystem posters** must reach AA (4.5:1) for every text layer: white on the product colour when it passes (Practice 7.06, Docs 4.88), else white on `colorDeep` when that passes (Modifi #1f5fd6, 5.73), else ink on the product colour (Verifi 7.29, Match 8.34). Text is full opacity; the badge uses `bg-black/15` (white text) or `bg-black/10` (ink).

### Layout utilities
- **`Container`** has one width, `--container-wide` (86rem), with the same gutters as the header, so the logo, every section and the footer share one left and right edge. The old narrow `--container-site` and the `wide` prop were removed. For a narrow reading column, constrain the content inside the container (e.g. `max-w-3xl`), never the container itself.
- **`.fit-box` / `.fit-frame`.** The hero visual box fills its area. Below 640px the frame is free-form. From 640px it is capped to a 720:520 window and centered (`.fit-box-end` bottom-aligns it for the home caption row).
- **`.screen-rail`.** Screenshot rail cards share a height `--screen-h`, capped so a pinned rail fits the viewport, and take their width from their aspect ratio.

### Ambient fixed layers (`layout.tsx` order, bottom to top)
1. `.background-grid` (z 0). A 100×150px grid texture, light and dark layers crossfading with the theme.
2. `.pointer-field` (z 1). A soft radial glow following `--mx` and `--my`, set by `PointerField` on fine pointers only.
3. `main` (z 10), then the header (fixed, transparent, pointer-events only on its children).
4. `.splash` (z 200). The first-load splash.

---

## 7. Motion architecture

### 7.1 One loop: Lenis drives GSAP
`SmoothScroll` (in `layout.tsx`) creates the single Lenis instance:

```ts
new Lenis({ anchors: { offset: 0 }, respectReducedMotion: true,
  prevent: (node) => node.closest("[data-lenis-prevent], [role='dialog']") })
lenis.on("scroll", ScrollTrigger.update)          // every ScrollTrigger reads Lenis' smoothed scroll
gsap.ticker.add((t) => lenis.raf(t * 1000))       // Lenis runs on GSAP's ticker: one RAF loop
gsap.ticker.lagSmoothing(0)
```

- **Anchors.** Lenis subtracts `scroll-margin-top` and `scroll-padding-top` itself, so `ANCHOR_OFFSET = 0` and `html { scroll-padding-top: 6rem }`.
- **Pause and resume.** Use `holdScroll(reason)` and `releaseScroll(reason)` from `smooth-scroll.tsx`. Lenis stays stopped while any reason holds it, so one owner can never restart scrolling another still needs stopped. SmoothScroll itself holds `"splash"` until `SPLASH_EVENT`; the mobile menu holds `"mobile-menu"` while open. (The old `lenis:stop`/`lenis:start` window events were removed: the menu fired `lenis:start` on mount, which restarted Lenis under the splash.)
- **QA hook.** A build with `NEXT_PUBLIC_QA_HOOKS=1` exposes `window.__praszoQA` (`gsap`, `ScrollTrigger`, `getLenis`, Lenis created/destroyed counts) for headless checks. The condition is inlined at build time, so normal builds contain none of it.
- **In-page jumps.** `scrollToTarget(target)` accepts a selector, element or number, resolves visible elements and uses Lenis.
- **Theme flips.** `html` transitions only `background-color`. Never transition `color` (or any inherited property) on `html` or `body`: every descendant then re-resolves its colour each frame, which cost about 820 ms of style work per scene flip (now about 75 ms).
- **No native scroll listeners for scroll-driven UI.** ThemeObserver, the header scroll spy and BackToTop each use ScrollTriggers (`onToggle`), so they run only when a threshold is crossed, never measure every section per frame, and never set React state per scroll event. Declare the trigger array before calling `ScrollTrigger.create`: `onToggle` can fire synchronously during creation (an earlier version read it in its temporal dead zone and crashed `/verifi` on direct load). Use `refreshPriority: -1` for observers so they measure after pinned sections.
- **Scrollable regions.** Inner scroll areas that must not be hijacked carry `data-lenis-prevent`, for example the native horizontal rail on mobile.

**Consequence:** any ScrollTrigger animation with `scrub: true` is automatically smooth, because Lenis already eases the scroll. Use `scrub: true` (no lag) for pinned or 1:1 motion. Use small numbers (0.4 to 0.6) for "soft" step scenes.

### 7.2 GSAP registration
`src/components/motion/gsap.ts` registers `useGSAP`, `ScrollTrigger`, `MotionPathPlugin` and `Flip` once, and sets `ScrollTrigger.config({ ignoreMobileResize: true })`. Always import `{ gsap, ScrollTrigger, Flip, useGSAP }` from there.

### 7.3 Reduced motion and no-JS
- **Checking.** Use `prefersReducedMotion()` in effects. Add `gsap.matchMedia("… and (prefers-reduced-motion: no-preference)")` for desktop-only effects.
- **Fallback layout.** Every scene and rail renders a static fallback that is the default DOM. The animated version is opted into with a class added by JS (`.is-ready`, `.is-pinned`).
- **No JS.** A `<noscript>` style in `layout.tsx` reveals hero targets and scene stacks and hides the splash.

### 7.4 First-load sequence (timeline)
1. **Boot script** (inline, first in `<body>`, from `lib/splash.ts`) sets `<html data-splash="on">` before first paint, on every full load. Client navigation never replays it.
2. **Splash** (`layout/splash.tsx`). Timings: minimum 0.6 s, contraction 1.05 s, settle 0.7 s (about 2.8 s total on a fast load; was 3.5 s). A 7 s watchdog always hands the site over. React Strict Mode safe: the effect cleanup only finalises if no remount follows within 50 ms (before, development showed the splash for about 0.4 s). Under reduced motion it waits only for fonts and fades in 0.25 s (about 0.45 s total). The screen is the Praszo mark as a vector, traced from `praszo-mark.png` as two polygons in coral `#f46a4a`.
   - **Cover.** The mark is scaled up around a point inside its solid wedge, so it covers the viewport. A CSS fallback paints solid coral until JS places it.
   - **Wait.** It waits for `window.load` plus `document.fonts.ready`, with a minimum of 0.9 s and a maximum of 4 s.
   - **Contract.** GSAP contracts the shape into a 96px "Z" (1.25 s `expo.inOut`). It is driven by one proxy object `{x, y, fx, fy, s}` and an SVG `transform` written in `onUpdate`.
   - **Start site.** Near the end of the contraction it calls `startSite()`: `data-splash="landing"`, `lenis.start()` and dispatches `SPLASH_EVENT`.
   - **Land.** The mark glides onto the visible `header [data-logo-mark]` (0.85 s `power3.inOut`). Then `data-splash="landed"` reveals the real logo, the copy fades and the state becomes `"done"`.
   - **Edge cases.** With no header mark visible (product pages on phones), it shrinks and fades in the center. Under reduced motion the coral simply fades.
   - **CSS states.** `on` locks scroll and hides header marks. `landing` keeps marks hidden while the page is interactive. `landed` and `done` show them.
3. **Hero entrance** (`motion/hero-entrance.ts`). Its timeline is created `paused: splashActive()` and plays on `onSplashDone()`. Order:
   - Eyebrow fades.
   - **Title words** (`[data-hero="word"]` from `HeroTitle`) rise from per-word masks: `yPercent 115→0`, `rotate 7→0`, `blur 12px→0`, `opacity 0→1`, 1.15 s `expo.out`, stagger 0.075. Note the explicit `y: 0` in both states, because GSAP otherwise reads the CSS gating `translateY(110%)` as pixels and leaves words offset.
   - Copy, then the hero's secondary action ("See the workflow" / "See the features").
   - Visual (`y 28→0`, `scale .985→1`, `clearProps: transform`).
   - When it finishes, the root gets `.is-ready`, and the CSS gating (`[data-entrance]:not(.is-ready) [data-hero]{opacity:0}`) releases.
4. **Hero scroll depth** (`motion/hero-scroll.ts`). A scrubbed timeline (`top top` to `bottom top`, `scrub: true`) on wrapper elements `[data-hero-depth]`:
   - **Title** `yPercent 55, scale .9, opacity 0`.
   - **Lede** `y 90, opacity 0`.
   - **Visual** `y -70, scale .94`.
   - Separate wrappers keep the entrance (`[data-hero]`) and scroll (`[data-hero-depth]`) transforms from colliding.

### 7.5 Motion primitives catalogue

| Primitive | File | Trigger and engine | What it does | Fallback |
|---|---|---|---|---|
| `useScene(rootRef, { count, onUpdate, media, scrub })` | `motion/use-scene.ts` | ScrollTrigger on `[data-scene-track]` (`top top` to `bottom bottom`), `scrub 0.6`, desktop `(min-width:1024px)` | Sticky step scene. Calls `onUpdate(progress, t, index, set)`, where `set` is a change-only setter (`createSceneSetter()`) scoped to this activation: it writes only properties whose value changed, and parked items are not rewritten every frame, where `t` is a fractional step. Adds `.scene.is-ready`, which shows track and stage and hides `.scene-stack`. Helpers: `stepOpacity(t, i, fade)` and `applySceneItems(stage, t, index)` (crossfade `[data-scene-item]`, toggles `[data-scene-tab]` `.is-current`). | `.scene-stack` static layout |
| `HorizontalScroll` / `HorizontalCard` | `motion/horizontal-scroll.tsx` | `pinMedia` `(min-width:1024px) and (hover:hover) and (pointer:fine)` and no reduced motion (touch tablets and phones get the native rail): pins the section with `pinType: "transform"` (the fixed/static swap scored about 2.0 CLS per rail; transform pinning measures 0.015 and stays within 0.3 px while pinned), tweens the track `x` by its overflow, `scrub: true`, `invalidateOnRefresh`. A ResizeObserver refreshes only when `track.scrollWidth` changes. Keyboard focus scrolls the card into view via Lenis. | Pinned horizontal carousel driven by vertical scroll | Native horizontal scroll (`data-lenis-prevent`); pinned stage padding and gap tighten below 820px viewport height so header and rail fit; proximity snapping only below 640px (on tablets it pulled short drags back to the start); `scroll-padding-inline` keeps cards on the page gutter |
| `RevealHeading` | `motion/reveal.tsx` | `once`, `top 90%` | Masked line rise (`y 110%→0`) | none needed |
| `RevealBlock` | same | `once`, `top 90%` | Fade-up 18px | |
| `RevealGroup` (+ `data-reveal` children) | same | `once`, `top 85%`, stagger 0.08 | Staggered fade-up of children | |
| `WordReveal` | `motion/word-reveal.tsx` | ScrollTrigger `scrub 0.4` on the nearest `[data-reveal-track]` ancestor (else the text). Found from the DOM, not a ref: a parent ref is still null when the child layout effect runs, which once made the Statement reveal snap on in one step. | Words gain `.is-on` progressively; highlight phrases get the brand color | `.is-static` shows all |
| `ClipReveal` | `product/clip-reveal.tsx` | `once`, `top 82%` | `clip-path inset(10% 6%) → inset(0)` plus scale | |
| `HeroTitle` | `motion/hero-title.tsx` | (entrance) | Splits a title into per-word masks, keeps hyphenated words whole, colors one `highlight` word, keeps an `sr-only` full title | |
| `useHeroEntrance` / `useHeroScroll` | `motion/hero-entrance.ts`, `hero-scroll.ts` | see §7.4 | | `.is-static` |
| `useOnScreen(ref)` | `motion/use-on-screen.ts` | IntersectionObserver | Pauses the hero mockup loops and the 7 s rotation while the hero is off screen | |
| `useHeaderReveal(ref, { delta, topOffset, duration, resetKey })` | `motion/use-header-reveal.ts` | One ScrollTrigger (`start 0`, `end "max"`) fed by Lenis; GSAP `yPercent` tween with `overwrite` | Hides the site header on scroll down (`yPercent -100`, `power2.in`), reveals it on scroll up (`power3.out`, 0.38 s). Defaults: 8 px run before reacting, always shown within 96 px of the top, overscroll clamped, 350 ms settle window after mount or route change. Never hides while any header trigger has `aria-expanded="true"` (Products menu, mobile drawer) or keyboard focus is inside; focus entering a hidden header reveals it. Sets `data-header-hidden`. | Reduced motion: instant hide and show |
| `ProductIconNav` | `ui/product-icon-nav.tsx` | `gsap.to` indicator | Sliding highlight behind hovered or focused product glyph, tooltips, links | |
| `PointerField` | `layout/pointer-field.tsx` | rAF-throttled pointermove | Updates `--mx` and `--my` for the ambient glow | off for coarse pointers and reduced motion |
| Logo marquee | CSS `.marquee` | CSS keyframes 42 s, pauses on hover | Client logos scroll | duplicates hidden, static under reduced motion |
| Nav follower | `site-header.tsx` | motion `layoutId="nav-follower"` spring | Pill highlight slides between nav items | |
| Products menu, back-to-top | motion `AnimatePresence` | | Fade and slide in and out | |
| Mobile menu | Radix Dialog + CSS `sheet-in` keyframes | | Slide-in sheet, focus trap; stops Lenis while open | |

---

## 8. Pages and sections

### 8.1 Homepage (`src/app/page.tsx`), top to bottom

| # | Section | Component | Animation |
|---|---|---|---|
| 1 | **Hero**: "Run it on Praszo." | `CorporateHero` → `HeroShell` + `HeroShowcase` | **Layout.** 100svh grid: title row at the top (below a header gap), then lede and CTAs on the left with the visual on the right (5/7 columns at lg). **Entrance.** Splash hand-off, word entrance (§7.4), scroll depth. **Visual.** Rotates the five product mockups every 7 s, and hovering or focusing a product icon holds one. Only the visible mockup animates (`paused` prop, `inert` on the others). The caption row shows the product lockup, label and `ProductIconNav`. **Theme.** Dark by default with a local light toggle (§9.6). |
| 2 | Trusted by | `TrustedBy` | CSS marquee of 6 grayscale client logos |
| 3 | Statement (dark) | `Statement` | Sticky 100svh stage over a 190svh track, with `WordReveal` scrubbed `top top` to `bottom bottom`. "cannot risk data exposure" is highlighted. Glass chips and a dot-field backdrop. |
| 4 | Platform pillars: "Praszo OS. One platform." | `PlatformPillars` | `RevealHeading` lines, then three editorial columns (no card surface) under the giant title: hairline top rule, `label` index with icon, `display-sm` title, `lede` body, staggered by `RevealGroup` |
| 5 | Five specialized engines (`#products`) | `ProductEcosystem` | `useScene`, 5 steps, 520svh track. Left: product name list (current one expanded). Center: stacked **poster cards filled with the product color** fan in and out (`x d*70`, `rotate d*7`, `scale`). Right: step badge, summary and link crossfade. Clicking a name jumps to its step. **Entrance** (scrubbed from track `top 92%` to `top top`, ending exactly where the scene starts): the deck rises 160px, untilts from -9° and scales up from 0.84; the first poster's preview slides up inside it; the names stagger in from the left; the copy column rises. It only animates `[data-eco-deck]`, `[data-poster-preview]`, tab rows and `[data-eco-copy]`, which the scene never writes. Mobile: grid of posters. |
| 6 | The complete audit firm workflow (`#workflow`, dark) | `WorkflowTour` + `mockups/workflow-canvas.tsx` | Custom ScrollTrigger scene, 440svh, `scrub 0.6`, 6 steps. The SVG layers crossfade (`[data-layer]`), strokes draw (`strokeDashoffset`), a dot travels the pipeline via **MotionPathPlugin**, copy and chips crossfade, step tabs track progress, and a progress line scales. |
| 7 | Why Praszo (`#why-praszo`) | `WhyPraszo` | `HorizontalScroll` rail with a `WordReveal` intro and `RevealHeading` |
| 8 | Who it is for: "Built for firms that cannot risk data exposure" | `Segments` (photos from `src/assets/segments/`) | `useScene`, 2 steps, `count*130+40` svh. One persistent frame with no surface (hairline top rule, progress rule at the bottom, content on the page grid; it still clips content moving in and out). Each step holds for most of its slice. Inside a `SWITCH = 0.32` window the outgoing content leaves in reading order (photo tilts and shrinks, copy rises 42px, points slide left 64px, stagger 0.07). Then the incoming content builds in from below and the right, with no overlap. A progress rule fills along the frame bottom, and tabs jump to settled points. Type matches the pillars: `display-sm` title, `label` subtitle in brand coral (`brand-strong`), `copy` body, numbered points (`label` index, `copy` text) between hairline rules, and a `label` link. Each firm size shows a **photo** (glass towers for larger firms, a mid-rise office for mid-sized firms) in a 3:2 rounded frame that tilts and shrinks with the content. |
| 9 | Testimonials | `Testimonials` | `HorizontalScroll` rail of 4 quotes |
| 10 | FAQ (`#faq`) | `FaqSection` | Native `<details>` accordion, plus FAQPage JSON-LD |
| 11 | Final CTA (dark) | `FinalCta` | `RevealHeading` plus `RevealBlock` |

### 8.2 Product pages (`src/app/<slug>/page.tsx`)
Every page is wrapped by `ProductPage`, which provides the product color scope, SoftwareApplication JSON-LD and `RelatedProducts` at the end. The header switches to the product lockup and that product's section menu (§9). Pages compose shared sections in this order (✓ = used):

| Section | Component | Animation | Practice | Verifi | Match | Modifi | Docs |
|---|---|---|---|---|---|---|---|
| Hero (`<slug>-overview`) | `ProductHero` → `HeroShell` + `ProductShowcase` | Same shell as home: product mockup, word entrance, scroll depth, step pill linking to the home workflow | ✓ | ✓ | ✓ | ✓ | ✓ |
| Screenshot rail (`<slug>-preview`) | `ProductPreview` | `HorizontalScroll` of framed captures (`WindowFrame` chrome, one shared height). Falls back to one full-width `ClipReveal` image when only one capture exists (Docs). | ✓ (5 screens) | ✓ | ✓ | ✓ | single |
| Highlights | `ProductHighlights` | `RevealGroup` | | | ✓ | | ✓ |
| Problem statement | `ProductProblem` → `Statement` | Scrubbed word reveal with pain-point chips | ✓ | ✓ | | | |
| Spotlights (`<slug>-spotlights`) | `ProductSpotlights` | `useScene` (`count*110+40` svh). Tabs, copy crossfade, visual cards slide and scale. Mobile: alternating rows with `ClipReveal`. | | ✓ | ✓ | ✓ | |
| Feature section(s) (`<slug>-<sectionId>`) | `ProductFeatureGrid` | A single group renders as a **dark `HorizontalScroll` rail** of icon cards. Multiple groups render as an editorial grouped grid with `RevealGroup`. | ✓ ×2 | ✓ | ✓ | ✓ | ✓ |
| Mobile app (`practice-mobile`) | `PracticeMobileSection` | `RevealBlock` and `ClipReveal` phone capture | ✓ | | | | |
| Impact before and after (`modifi-impact`) | `ProductComparison` | `RevealGroup` | | | | ✓ | |
| Workflow (`<slug>-workflow`) | `ProductWorkflow` | Numbered steps plus a connector line scrubbed `scaleX` (`scrub 0.5`) | | ✓ | ✓ | ✓ | ✓ |
| Audience (`<slug>-audience`) | `ProductAudience` | `RevealGroup` | ✓ | ✓ | ✓ | ✓ | ✓ |
| FAQ (`<slug>-faq`) | `FaqSection tone="product"` | `<details>` + JSON-LD | ✓ | ✓ | ✓ | ✓ | ✓ |
| CTA | `ProductCta` → `FinalCta` | Dark closing scene | ✓ | ✓ | ✓ | ✓ | ✓ |
| Related products | `RelatedProducts` (in `ProductPage`) | static | ✓ | ✓ | ✓ | ✓ | ✓ |

`data/product-sections.ts` lists the in-page menu per product. Its ids must equal the rendered ids above. All currently match.

### 8.3 Contact (`/contact`)
Static hero with `mailto:` and `tel:` buttons, three contact cards (`RevealGroup`), and a product quick-link grid. No form.

---

## 9. Components worth knowing in depth

### 9.1 `HeroShell` (`sections/hero-shell.tsx`)
- **Contract.** A 100svh section (`min-h-[36rem]`). The grid is `auto` (title row, padded `--header-h + 2.5rem`, or `+ clamp(1.5rem, 7svh, 4rem)` at lg), then `minmax(0,1fr)` for lede and visual.
- **Guarantee.** The giant title is always visible without scrolling, and the visual shrinks first.
- **Breakpoints.** On phones the lede stacks above a free-form visual. At lg, lede and visual sit side by side (5/7 columns).
- **Depth wrappers.** It owns the `[data-hero-depth]` wrappers and calls `useHeroScroll`.
- **Product hero typography.** `display-hero lg:max-w-[24ch] lg:text-[min(5.9rem,6.2vw,9.5svh)]`, and the lede is clamped to 4 lines at lg.
- **Before changing the hero**, re-run the hero-fit check (§12) at 1440×900, 1366×768, 1280×720, 1024×768, 834×1194, 390×844 and 360×780.

### 9.2 Animated product mockups (`components/mockups/`)
All five share `MockupShell`: a `WindowFrame` (dots, title pill, optional `action` slot) plus a meta-chip toolbar on an `bg-elevated` desk. They take `{ paused?, className? }`, and pausing holds the loop. All are static under reduced motion.

| Mockup | Product | Engine | Loop |
|---|---|---|---|
| `KanbanBoard` | Practice | **GSAP Flip**, transform-only (`absolute`, `scale: true`, `prune`) | 3 columns (2 on phones). Cards lift (`scale 1.02` + `data-lift` shadow), fly to the top of the target column, counts update, then the moves replay in reverse. In-flight animation is finished on cleanup. |
| `VerifiValidator` | Verifi | GSAP timeline `repeat -1` | Checks go pending, then running, then pass or flag. A score ring and counter tween. |
| `MatchEngine` | Match | GSAP timeline | For each register row, SVG links draw to Invoice, PO and GRN, and results stamp. |
| `ModifiFlow` | Modifi | GSAP timeline | Placeholders fill, approval stepper advances, signature path draws, "Signed" pops |
| `DocsPipeline` | Docs | **GSAP Flip** plus a scan sweep | Files move from intake to processing (OCR sweep, tags), then route to Finance or Legal, then reset |

`product-showcases.tsx` maps each slug to its component and caption label. `HeroShowcase` (home) stacks all five, and `ProductShowcase` (product hero) renders one.

### 9.3 `WindowFrame`
- **Structure.** Browser chrome (`relative isolate overflow-hidden rounded-card`, `bg-surface` bar) wraps every mockup and every rail screenshot. The `relative isolate` makes it the clipping container, so absolutely positioned Flip cards cannot escape it.
- **Hero frames.** These have no shadow (`shadow-none` in `MockupShell`).

### 9.4 Header (`layout/site-header.tsx`)
- **Scroll direction.** `useHeaderReveal(headerRef, { resetKey: pathname })` slides the whole header away while scrolling down and back on scroll up (see §7.5). It only moves the transform, so nothing below shifts, and the hidden header sits fully above the viewport, so it cannot intercept clicks.
- **Shell.** The header is fixed, transparent and `pointer-events-none`; only its children take events. It holds the logo (or product lockup), the pill nav (`menu-surface`, motion follower) and the CTA.
- **Product pages.** The pill shows "⟨mark⟩ Home", the product's section links and a right-aligned Products mega menu.
- **Scroll spy.** It is position-based: the last section whose top is above 40% of the viewport wins, and the check is rAF-throttled. It deliberately does not use IntersectionObserver, which failed for tall and pinned sections.
- **Products menu.** It opens on hover intent and by click or keyboard, and closes on Escape, outside click or route change.
- **Mobile menu.** A Radix sheet with "On this page" links (explicit close before jumping), other products and the CTA.

### 9.5 Screenshot rail (`product/product-preview.tsx`)
`screensFor(product)` collects the hero visual, then the spotlight visuals, then `product.screens`, dropping duplicates.
- Each card is a `WindowFrame` titled "Praszo ⟨screen⟩".
- Its body is `h-[var(--screen-h)]` with `object-cover object-top`, and the card width comes from the aspect ratio.
- Captions show the number, title and a description clamped to 2 lines.

### 9.6 Local mockup theme (`mockups/mockup-theme.tsx`)
- **Scope.** `MockupThemeProvider` (in `HeroShowcase` and `ProductShowcase`) holds `"dark" | "light"`, dark by default.
- **Applying it.** The hero `figure.fit-frame` gets `data-theme={theme} data-theme-local`. Tokens flip inside it, and `ThemeObserver` ignores it (`[data-theme]:not([data-theme-local])`).
- **Toggle.** `MockupThemeToggle` renders in each window bar via `WindowFrame action` and returns nothing outside a provider. One state covers all five rotating home mockups.
- **Dark-mode tags.** In dark mode, product tags use `dark:text-product` for contrast.
- **Persistence.** None. Each load starts dark.

---

## 10. SEO and metadata
- **Per-route metadata.** `buildMetadata({ title, description, path })` on every page gives a unique title and description, canonical, Open Graph and Twitter.
- **Structured data.** Organization JSON-LD in `layout.tsx`, SoftwareApplication per product (`ProductPage`) and FAQPage (`FaqSection`).
- **OG images.** Route-level `opengraph-image.tsx` files call `renderOg()`.
- **Crawl files.** `sitemap.ts` covers the 7 routes with a fixed `lastModified`. `robots.ts` is the default.
- **Icons.** `icon.png` and `apple-icon.png` come from the Praszo mark.

---

## 11. Rules and recipes for agents

**Hard rules**
1. Import GSAP only from `@/components/motion/gsap`. Wrap every animation in `useGSAP({ scope })` or `gsap.matchMedia()` and clean up (kill tweens and triggers, restore moved DOM, `clearProps`).
2. Never add a second smooth-scroll or RAF loop. Scroll-linked motion is ScrollTrigger on Lenis. Use `scrollToTarget()` for jumps.
3. Every scroll scene needs a static fallback (`.scene-stack`, native rail) for mobile, reduced motion and no-JS. The animated layout is opted into by JS.
4. Keep entrance targets (`[data-hero]`) and scroll targets (`[data-hero-depth]`, scene items) on different elements. GSAP tweens on the same property of the same element fight.
5. When tweening from a CSS-gated transform, set `y: 0` (or `x`) explicitly, or GSAP converts the CSS offset to pixels and keeps it.
6. Product section ids are `${slug}-${name}`, and `data/product-sections.ts` must list the same ids.
7. React Compiler lint:
   - Never create components during render. Use `<Icon name>`, not `getIcon()`.
   - No synchronous `setState` in effects. Derive the value, or defer it to rAF or an event.
8. Scene `onUpdate` writes go through the provided `set` (change-only). Plain `gsap.set` every frame on parked items re-invalidates style for their subtree.
9. Pin horizontal rails with `pinType: "transform"`. Hold Lenis with `holdScroll`/`releaseScroll`, never `lenis.start()` directly.
10. Never transition inherited properties (`color`) on `html`/`body`.
11. Looping visuals accept `paused` and are paused off screen (`useOnScreen`).
12. Implicit grid tracks must be `minmax(0,1fr)` (or `grid-cols-1`). An `auto` track grows to nowrap text and causes horizontal page overflow at 360px.
13. Tints that depend on `--product` must be mixed per element, never on `:root`.
14. Any local dark area must carry `data-theme-local`. Header marks the splash may land on must carry `data-logo-mark`.
15. Content stays sourced from praszo.com, with no stats, pricing or fake forms.

**Recipes**
- **New sticky step section.** Markup is `section.scene` > `[data-scene-track]` (height in svh) > `[data-scene-stage].scene-stage` with `[data-scene-item]` and `[data-scene-tab]`, plus a `.scene-stack` fallback. Drive it with `useScene(rootRef, { count, onUpdate })`. For holds and crossfade windows, copy the `SWITCH` mapping from `segments.tsx`.
- **New horizontal rail.** Use `<HorizontalScroll label header theme?>` with `<HorizontalCard className="w-[…]">` children. Cards need explicit widths.
- **New animated mockup.** Build it on `MockupShell`, accept `paused`, run a GSAP timeline or Flip inside `useGSAP`, and register it in `product-showcases.tsx`. Use tokens only, no borders, and tint for state.
- **New product capture.** Resize to about 2000px wide with `sharp`, add it to `src/assets/products/`, then add `{ title, visual }` to `product.screens`.

---

## 12. Verification and QA

- **Gates.** `npm run lint`, `npx tsc --noEmit` and `npm run build` must all pass. All 7 routes must prerender static.
- **Browser QA.** Use headless Chrome via the DevTools Protocol (Node 22 `WebSocket` scripts). Run `npx next start -p 3100`, and never touch the developer's own server on port 3000. Checks used so far:
  - **Hero fit:** title visible, frame inside viewport, section equals the viewport height, `overflowX = 0` across the 7 sizes in §9.1. Wait about 5 s for the splash and entrance before measuring.
  - **Page overflow** at 390 and 360px on every route.
  - **Scene scrubbing:** step to fractions of the track, then assert tab state, item opacities and no clipping.
  - **Carousel:** pin start and end, release, re-entry and fit (`stageH ≤ vh`).
  - **Frame timing:** rAF deltas while animating; the target is about 16.7 ms average with none over 25 ms.
  - **Splash:** sample `data-splash` over time and screenshot each phase.
  - **Reduced motion:** run with `Emulation.setEmulatedMedia` `prefers-reduced-motion: reduce`.
- **Screenshots.** Clip coordinates in `Page.captureScreenshot` are page coordinates, not viewport coordinates.

---

## 13. Audit findings and remediation (2026-10-14)

Measured on a `NEXT_PUBLIC_QA_HOOKS=1` production build served by `next start`, headless Chrome, homepage wheel-scrolled top to bottom (120 px steps every 16 ms). Desktop is 1440×900 unthrottled; mobile is 390×844 with 4× CPU throttle. Lab numbers, not field data.

| Metric | Before | After |
|---|---|---|
| Desktop CLS during scroll | 3.997 | 0.010 |
| Desktop style recalculation | 5,206 ms | 535 ms |
| Desktop script time | 1,892 ms | 272 ms |
| Desktop avg / p99 frame | 21.4 / 50 ms | 16.7 / 16.8 ms |
| Desktop frames over 33 ms / long tasks | 50 / 12 | 0 / 0 |
| Mobile 4× style / layout | 6,653 / 604 ms | 1,940 / 16 ms |
| Mobile 4× long tasks (count, total) | 53, 5,472 ms | 5, 459 ms |
| Page scrolled behind splash by wheel | about 2,360 px | 0 |
| Splash done (desktop) | 3.51 s | 2.79 s |
| Splash done (reduced motion) | 1.95 s | 0.46 s |
| Splash in dev (Strict Mode) | ended at 0.4 s | full sequence |

**Fixed**
- Lenis restarted under the splash by the mobile menu's mount effect; replaced with keyed scroll holds.
- Splash killed by Strict Mode cleanup in development; outro scheduling hardened; 7 s watchdog.
- Theme-flip style storm from inherited `color` transitions on `html`/`body`.
- Pinned-rail CLS (transform pinning).
- Scroll scenes rewriting unchanged styles each frame (change-only setter).
- Hero mockups animating while off screen (paused via `useOnScreen`).
- Modifi poster contrast (4.17 → 5.73) and poster text opacity/badge contrast on all products.
- Modifi document-hub capture contained its own browser chrome; cropped to the app area (`modifi-hub.png`, 1496×940) and flagged `frame: "browser"`.
- Phone rails loaded scrolled 20 px (first card flush to the screen edge); snap now respects the gutter.
- Removed `getIcon`, `showcaseAspect`; `productForPath` no longer exported. Kept `productOrder`, `buttonClasses` and the data-model types (used internally; part of the typed data API). README `Tilt` reference removed.

**Verified unchanged / healthy**
- 21 client navigations: ScrollTrigger counts identical per route every round, one Lenis instance, no console errors, history back works.
- All 7 routes at 1440 and 390: no console errors, failed requests, broken images or horizontal overflow; one h1, description, canonical and OG image each.

- **Route change during wheel momentum.** Clicking a link while Lenis was still easing landed the next page mid-scroll, because Lenis kept animating toward the old target. A `useLayoutEffect` on pathname in `smooth-scroll.tsx` now stops (resets) Lenis before Next applies the new route's scroll, then re-applies the scroll holds.

- **Stale build cache.** One CSS edit was not picked up by `next build` until `.next/cache/turbopack` was cleared. If a style change does not show after a build, clear that folder and rebuild.

**Remaining risks**
- Verifi (#0f8f5c, 4.11:1) and Match (#c4640a, 4.06:1) deep shades with white text, used by product buttons and `text-product-deep` on white, are below 4.5:1 for normal text. Needs a brand decision on darker deep shades.
- No unit, component or browser test suite exists in the repo; QA is scripted headless Chrome.
- Lighthouse and field Core Web Vitals not measured here.

---
name: praszo-motion
description: GSAP + ScrollTrigger + Lenis conventions for the Praszo site. Use before writing or changing any animation, scroll effect, pinned/sticky scene, carousel, hero entrance, header behaviour or anything that imports from src/components/motion.
---

# Motion on the Praszo site (GSAP, ScrollTrigger, Flip, Lenis)

The project already has a motion layer. Build on it: reuse a primitive before writing a new tween, and
never start a second scroll loop.

For GSAP or Lenis API details, use the Context7 MCP server (`resolve-library-id`, then `query-docs`)
instead of relying on memory. The installed versions are in `package.json`.

## Next 16 runs here with routes kept alive

`cacheComponents` keeps up to 3 visited routes mounted, hidden inside React `<Activity>`. So:

- Every animation lives in `useGSAP(fn, { scope: ref })` or an effect that cleans up. It must survive
  hide → show → re-run without stacking tweens or triggers.
- Section ids are unique per route (prefix them with the product slug, e.g. `verifi-features`). Find
  elements with `findVisible()` (`smooth-scroll.tsx`), never a bare `document.querySelector`.
- Anything one-shot (a hero entrance) remembers that it already played; `useHeroEntrance` keeps a module-level set of
  keys for this.
- A layout-level component (header, menus) must never write styles onto page DOM. The page segment may
  hydrate later, which gives a hydration mismatch. Each side animates only its own elements and they coordinate
  through shared constants or events (`SUBNAV_HANDOVER`, `HEADER_EVENT`).

## Imports and the single loop

- Import GSAP only from `@/components/motion/gsap` (`gsap`, `ScrollTrigger`, `Flip`, `useGSAP`).
  Plugins are registered there once. If you need a new plugin, register it in that file.
- `SmoothScroll` owns the one Lenis instance: Lenis runs on `gsap.ticker`, and `lenis.on("scroll", ScrollTrigger.update)`.
  Never create another Lenis instance, `requestAnimationFrame` loop, or wheel/scroll listener for animation.
  Read scroll position from a ScrollTrigger.
- Programmatic scrolling goes through `scrollToTarget()`, `scrollToSection()` or `scrollToSceneStep()`.
  Stop and start scrolling with `holdScroll(reason)` / `releaseScroll(reason)`, never `lenis.stop()` directly.
- Shared values: `EASE`, `prefersReducedMotion()`, `isFinePointer()` and `ANCHOR_OFFSET` from `@/lib/motion`.
  CSS easings come from tokens (`--ease-out`, `--ease-expo`, `--ease-nav`).

## Primitives (reuse first)

| Need | Use |
|---|---|
| Heading or block reveal | `RevealHeading`, `RevealBlock`, `RevealGroup` (`reveal.tsx`) |
| Scroll-scrubbed word highlight | `WordReveal` |
| Hero entrance and parallax depth | `useHeroEntrance(ref, key)` + `data-hero="eyebrow\|headline\|copy\|cta\|visual"`, `useHeroScroll` |
| Sticky multi-step scene | `useScene` + `applySceneItems` / `scrollToSceneStep`, markup `.scene` → `[data-scene-track]` → `[data-scene-stage]` → `[data-scene-item]`/`[data-scene-tab]`, fallback in `.scene-stack` |
| Pinned horizontal rail | `HorizontalScroll` + `HorizontalCard` |
| Header hide/show | `useHeaderReveal`; listen for `HEADER_EVENT` |
| Active-section tracking and nav pill | `useSectionSpy`, `useNavFollower` |
| Pause off-screen loops | `useOnScreen(ref)` |

## ScrollTrigger rules learned the hard way

- Declare any trigger arrays before `ScrollTrigger.create()`; callbacks can fire during creation.
- Pins use `pinType: "transform"` (Lenis moves the page). Keep the pinned stage within `100svh`.
- When percent tweens (`xPercent`/`yPercent`) are combined with transforms, also set `x: 0, y: 0`, otherwise leftover
  pixel offsets appear.
- Use `scrub: true` where the pin releases at the end (lag makes content slide past the release). Use a
  numeric scrub only for unpinned effects. Don't use `anticipatePin`.
- Per-frame updates go through `createSceneSetter()` so only changed values are written.
- Coalesce `ScrollTrigger.refresh()` with `requestAnimationFrame` and run it only after a real size change. `SmoothScroll` already refreshes
  after each navigation.
- Never leave `data-lenis-prevent` on an element that is pinned or scrubbed.
- For a parent–child relationship at layout-effect time, find the ancestor with `closest("[data-…]")`, not a parent ref,
  which may still be null when the child's effect runs.

## Responsive and reduced motion

- Wrap motion in `gsap.matchMedia()` with explicit conditions (e.g. `(min-width: 1024px) and
  (prefers-reduced-motion: no-preference)`) and return `mm.revert()`.
- Every scroll scene keeps a stacked, readable fallback in the DOM for phones, touch, reduced motion and no JS. The
  active layout is chosen with classes (`.is-ready` / `.is-static`), not by removing content.
- Pin only on wide, fine-pointer screens (`HorizontalScroll` default `pinMedia`). Phones get a native swipe.
- Animate only `transform` and `opacity`, and avoid layout properties per frame.

## Verify

Use the `playwright-testing` skill. Scroll through `__praszoQA.getLenis()`. Check start, middle, end and back,
`scrollWidth - innerWidth === 0`, no console errors, and that a route you navigate back to (Activity) has no duplicated
triggers (`__praszoQA.ScrollTrigger.getAll().length` is stable across navigations).

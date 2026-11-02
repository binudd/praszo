---
name: playwright-testing
description: Browser-test the Praszo site with the Playwright MCP server (mcp__playwright__*). Use when asked to test, QA, screenshot, or verify a page, layout, animation, header/menu behaviour, or responsive view in a real browser.
---

# Playwright testing for the Praszo site

The project registers the Playwright MCP server in `.mcp.json` (`@playwright/mcp`, isolated profile,
1440x900 viewport, artefacts in `.playwright-mcp/`, which git ignores). Its tools are `mcp__playwright__*`.

## Server rules

- Never use or restart the user's dev server on port 3000. Port 3100 belongs to another project.
- Test a production build on its own port:
  ```sh
  rm -rf .next/cache/turbopack
  NEXT_PUBLIC_QA_HOOKS=1 npx next build && npx next start -p 3110
  ```
  Run `next start` in the background and stop it afterwards with `pkill -f "next start -p 3110"`.
- `NEXT_PUBLIC_QA_HOOKS=1` exposes `window.__praszoQA` (`getLenis`, `ScrollTrigger`); see
  `src/components/motion/smooth-scroll.tsx`. Without that flag the hook isn't present.

## Routes

`/`, `/practice`, `/verifi`, `/match`, `/docs`, `/contact`, plus the footer pages in `src/app/`.

## How to test

1. `browser_navigate` to `http://localhost:3110/<route>`; check `browser_console_messages` for errors
   (hydration mismatches especially).
2. Check desktop (1440x900) and phone (`browser_resize` to 390x844). On phones, look for horizontal
   overflow with `browser_evaluate`:
   `() => document.documentElement.scrollWidth - innerWidth`. It should be 0.
3. Scroll through Lenis, not `window.scrollTo`, so ScrollTrigger scenes update:
   `() => window.__praszoQA.getLenis().scrollTo(<y>, { immediate: true })`. Wait a frame, then check or take a screenshot.
4. Pinned scenes and the horizontal rail fall back to stacked layouts below 768px or under reduced motion.
   Check both paths when you change motion code.
5. Header theme: `document.querySelector("header").dataset.theme` should match the scene behind it.
6. Use `browser_snapshot` (accessibility tree) for structure and text. Use `browser_take_screenshot` only for
   visual checks.

## Reporting

Report only what you actually observed: route, viewport, steps, and the console or measurement output.
Don't call a page production-ready just because the build passes.

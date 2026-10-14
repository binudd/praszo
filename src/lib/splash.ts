/**
 * First-load splash state, shared between the splash overlay and anything that
 * should wait for it (the hero entrance). The inline script in the root layout
 * sets <html data-splash="on"> before first paint on every full page load
 * (client-side navigation keeps the layout mounted, so it never replays).
 * Without JS the attribute is never set and the splash stays hidden. The
 * splash sets "done" when it finishes.
 */
export const SPLASH_EVENT = "praszo:splash-done";

/** Runs before first paint (inlined in <body>); keep it tiny and dependency-free. */
export const splashBootScript = `document.documentElement.setAttribute("data-splash","on");`;

export function splashActive() {
  return typeof document !== "undefined" && document.documentElement.dataset.splash === "on";
}

/** Calls `callback` once the splash has finished (immediately if it is not showing). Returns a cleanup. */
export function onSplashDone(callback: () => void) {
  if (!splashActive()) {
    callback();
    return () => {};
  }
  const handler = () => callback();
  window.addEventListener(SPLASH_EVENT, handler, { once: true });
  return () => window.removeEventListener(SPLASH_EVENT, handler);
}

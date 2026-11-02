"use client";

import { Moon, Sun } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

export type MockupTheme = "dark" | "light";

type Value = { theme: MockupTheme; toggle: () => void };

const MockupThemeContext = createContext<Value | null>(null);

/**
 * Local theme for the hero's animated mockups only. Light by default (dark is
 * optional); the toggle lives in each mockup's window bar. Apply the theme with
 * `data-theme={theme} data-theme-local` on the element that wraps the
 * mockups: the token set flips inside it, and ThemeObserver ignores it so the
 * page chrome stays light.
 */
export function MockupThemeProvider({ children }: { children: (theme: MockupTheme) => ReactNode }) {
  const [theme, setTheme] = useState<MockupTheme>("light");
  const toggle = useCallback(() => setTheme((value) => (value === "dark" ? "light" : "dark")), []);
  const value = useMemo(() => ({ theme, toggle }), [theme, toggle]);
  return <MockupThemeContext.Provider value={value}>{children(theme)}</MockupThemeContext.Provider>;
}

/** Sun/moon switch for a mockup window bar. Renders nothing outside a MockupThemeProvider. */
export function MockupThemeToggle() {
  const context = useContext(MockupThemeContext);
  if (!context) return null;
  const dark = context.theme === "dark";
  return (
    <button
      type="button"
      onClick={context.toggle}
      aria-pressed={!dark}
      aria-label={dark ? "Show the preview in light mode" : "Show the preview in dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
      className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-bg text-ink-3 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
    >
      {dark ? <Sun size={13} aria-hidden /> : <Moon size={13} aria-hidden />}
    </button>
  );
}

/**
 * How mockups are presented: "window" (browser-style frame, the default, used by the homepage
 * showcase) or "bare" (no frame and no border: the UI sits on a soft, edge-faded background; used by
 * the product heroes). Set by the showcase that renders the mockup, read by MockupShell.
 */
export type MockupFrame = "window" | "bare";
const MockupFrameContext = createContext<MockupFrame>("window");
export const MockupFrameProvider = MockupFrameContext.Provider;
export function useMockupFrame() {
  return useContext(MockupFrameContext);
}

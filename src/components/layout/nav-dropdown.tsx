"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState, type ReactNode } from "react";

import { navLinkClass } from "@/components/layout/nav-styles";
import type { NavItem } from "@/data/navigation";
import { cn } from "@/lib/cn";
import { isFinePointer } from "@/lib/motion";

type Props = {
  label: ReactNode;
  /** Replaces the default nav-link look of the trigger (e.g. the product section menu). */
  buttonClassName?: string;
  /** Accessible name when the label is not plain text. */
  ariaLabel?: string;
  /** "center" under the trigger (default) or "start" (left-aligned, for triggers near the left edge). */
  align?: "center" | "start";
  /** Marks the trigger current (aria-current), so the nav pill highlights it. */
  current?: boolean;
  /** Panel width (capped at the viewport minus the page gutters). */
  width?: string;
  children: (close: () => void) => ReactNode;
};

/**
 * Disclosure menu for the global header: hover intent on fine pointers, click and keyboard
 * everywhere, Escape returns focus to the trigger, outside clicks and route changes close it.
 * The panel stays mounted (CSS transition in and out) and is inert while closed. It is centred under
 * the nav pill (its positioned ancestor) with a viewport-relative width, so it fits from 1024px up.
 */
export function NavDropdown({
  label,
  buttonClassName,
  ariaLabel,
  align = "center",
  current,
  width = "52rem",
  children,
}: Props) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const timer = useRef<number | null>(null);
  const panelId = useId();
  const [lastPath, setLastPath] = useState(pathname);

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  const clearTimer = () => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  };
  const onEnter = () => {
    if (!isFinePointer()) return;
    clearTimer();
    timer.current = window.setTimeout(() => setOpen(true), 70);
  };
  const onLeave = () => {
    if (!isFinePointer()) return;
    clearTimer();
    timer.current = window.setTimeout(() => setOpen(false), 160);
  };
  const close = () => setOpen(false);

  return (
    <div ref={rootRef} onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={current || undefined}
        aria-label={ariaLabel}
        className={buttonClassName ?? cn(navLinkClass, open && "text-ink")}
        onClick={() => setOpen((value) => !value)}
      >
        {label}
        <ChevronDown size={16} aria-hidden className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>
      <div
        id={panelId}
        inert={!open}
        style={{ width: `min(${width}, calc(100vw - 2.5rem))` }}
        className={cn(
          "menu-panel absolute top-full z-50 mt-3 rounded-panel p-2 transition-[opacity,translate,scale,visibility] duration-200 ease-out motion-reduce:transition-none",
          align === "start" ? "left-0 origin-top-left" : "left-1/2 origin-top -translate-x-1/2",
          open
            ? "visible translate-y-0 scale-100 opacity-100"
            : "pointer-events-none invisible translate-y-2 scale-[0.98] opacity-0",
        )}
      >
        {children(close)}
      </div>
    </div>
  );
}

/** A simple list panel (Solutions, Resources): title + one line each. */
export function LinkMenu({ label, items }: { label: string; items: ReadonlyArray<NavItem> }) {
  const pathname = usePathname();
  const current = items.some((item) => item.href === pathname);
  return (
    <NavDropdown label={label} current={current} width="34rem">
      {(close) => (
        <ul className="grid gap-1 sm:grid-cols-2">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={close}
                aria-current={item.href === pathname ? "page" : undefined}
                className="block rounded-[1rem] p-3 transition-colors hover:bg-bg focus-visible:bg-bg aria-[current]:bg-bg"
              >
                <span className="block text-[15px] font-bold text-ink">{item.label}</span>
                {item.description ? (
                  <span className="mt-1 block text-[13px] leading-snug text-ink-2">{item.description}</span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </NavDropdown>
  );
}

"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";

import { navLinkClass } from "@/components/layout/nav-styles";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { productList } from "@/data/products";
import { cn } from "@/lib/cn";
import { isFinePointer } from "@/lib/motion";

/** Disclosure-style Products menu: hover intent on fine pointers, click/keyboard everywhere. */
export function ProductsMenu({ align = "start" }: { align?: "start" | "end" }) {
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

  const current = productList.some((product) => pathname === `/${product.slug}`);

  return (
    <div ref={rootRef} className="relative" onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <button
        ref={buttonRef}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        aria-current={current || undefined}
        className={cn(navLinkClass, open && "text-ink")}
        onClick={() => setOpen((value) => !value)}
      >
        Products
        <ChevronDown size={16} className={cn("transition-transform duration-200", open && "rotate-180")} />
      </button>
      {/* Always mounted, so it can transition out (CSS, no animation library); inert while closed. */}
      <div
        id={panelId}
        inert={!open}
        className={cn(
          "menu-panel absolute top-full z-50 mt-3 w-[min(41rem,calc(100vw-2.5rem))] rounded-panel p-2 transition-[opacity,translate,scale,visibility] duration-200 ease-out motion-reduce:transition-none",
          align === "end" ? "right-0 origin-top-right" : "left-0 origin-top-left",
          open ? "visible translate-y-0 scale-100 opacity-100" : "pointer-events-none invisible translate-y-2 scale-[0.98] opacity-0",
        )}
      >
            <ul className="grid grid-cols-2 gap-1">
              {productList.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/${product.slug}`}
                    className="flex items-start gap-3 rounded-[1rem] p-3 transition-colors hover:bg-bg focus-visible:bg-bg"
                    onClick={() => setOpen(false)}
                  >
                    <ProductGlyph slug={product.slug} size={40} className="mt-0.5" />
                    <span className="min-w-0">
                      <span className="block text-[11px] font-semibold tracking-[0.02em] text-ink-3">Praszo</span>
                      <span className="block text-[15px] font-bold text-ink">{product.name}</span>
                      <span className="mt-1 block text-[13px] leading-snug text-ink-2">{product.tagline}</span>
                    </span>
                  </Link>
                </li>
              ))}
              <li className="col-span-2">
                <Link
                  href="/#workflow"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-4 rounded-[1rem] bg-bg/60 px-4 py-3 text-sm text-ink-2 transition-colors hover:bg-bg"
                >
                  <span>Each product works on its own. Together they form one operating cycle.</span>
                  <span className="shrink-0 font-semibold text-brand-strong">See the workflow →</span>
                </Link>
              </li>
            </ul>
      </div>
    </div>
  );
}

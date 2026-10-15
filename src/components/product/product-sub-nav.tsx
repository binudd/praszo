"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";

import { NavDropdown } from "@/components/layout/nav-dropdown";
import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { HEADER_EVENT } from "@/components/motion/use-header-reveal";
import { useNavFollower } from "@/components/motion/use-nav-follower";
import { useSectionSpy } from "@/components/motion/use-section-spy";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { productSections } from "@/data/product-sections";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

/** Gap between the stuck menu and whatever is above it (the header, or the viewport edge). */
const GAP = 12;

/**
 * Product section navigation under the product hero (Workspace product-page pattern), in two states:
 *   at rest  a floating pill of the page's sections, in the page flow under the hero;
 *   stuck    once scrolled to, it becomes a compact dropdown (product icon · current section · chevron)
 *            pinned below the header (or at the top while the header is hidden), listing the sections.
 * "Stuck" comes from an IntersectionObserver on a sentinel just above the menu, and the sticky offset
 * follows the global header (HEADER_EVENT from useHeaderReveal) with a CSS `top` transition, so there
 * is no scroll listener of its own. The inactive state is inert. Section tracking: useSectionSpy.
 */
export function ProductSubNav({ product }: { product: Product }) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const [top, setTop] = useState(GAP);
  const [stuck, setStuck] = useState(false);
  const sections = productSections[product.slug];
  const active = useSectionSpy(
    barRef,
    sections.map((section) => section.id),
    { keepLast: true },
  );
  const current = sections.find((section) => section.id === active) ?? sections[0];
  useNavFollower(listRef, pillRef, `${active ?? ""}|${stuck}`);

  // Sticky offset: under the header while it shows, at the top while it is hidden.
  useEffect(() => {
    const apply = (hidden: boolean) => {
      const header = document.querySelector<HTMLElement>("header.site-header");
      const below = header ? header.offsetTop + header.offsetHeight : 0;
      setTop((hidden ? 0 : below) + GAP);
    };
    apply(document.querySelector<HTMLElement>("header.site-header")?.dataset.headerHidden === "true");
    const onHeader = (event: Event) => apply(Boolean((event as CustomEvent<{ hidden: boolean }>).detail?.hidden));
    window.addEventListener(HEADER_EVENT, onHeader);
    return () => window.removeEventListener(HEADER_EVENT, onHeader);
  }, []);

  // Stuck = the sentinel right above the menu has scrolled past the sticky line.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting && entry.boundingClientRect.top < top + 1),
      { rootMargin: `-${top + 1}px 0px 0px 0px`, threshold: 0 },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [top]);

  // Keep the current tab visible in the scrolling strip (scrolls the strip only, never the page).
  useEffect(() => {
    const list = listRef.current;
    const tab = active ? list?.querySelector<HTMLElement>(`[data-section="${CSS.escape(active)}"]`) : null;
    if (stuck || !list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: tab.offsetLeft - list.clientWidth / 2 + tab.offsetWidth / 2,
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [active, stuck]);

  const jump = (event: MouseEvent<HTMLAnchorElement>, id: string, index: number) => {
    event.preventDefault();
    const bar = barRef.current;
    const node = bar?.closest("main")?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);
    if (!node || !bar) return;
    history.replaceState(null, "", `#${id}`);
    // The first section is the hero: go to the very top. Otherwise land just below the stuck menu.
    if (index === 0) scrollToTarget(0);
    else scrollToTarget(node, -(56 + GAP * 2));
  };

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-px" />
      <div
        ref={barRef}
        data-product-subnav
        data-stuck={stuck || undefined}
        style={{ top }}
        className="sticky z-40 -mt-px grid grid-cols-[minmax(0,1fr)] justify-items-center px-5 transition-[top] duration-[380ms] ease-[var(--ease-out)] motion-reduce:transition-none md:px-8 [&>*]:col-start-1 [&>*]:row-start-1"
      >
        {/* At rest: the section pill. */}
        <nav
          aria-label={`${product.fullName} sections`}
          inert={stuck}
          className={cn(
            "menu-panel max-w-full rounded-full p-1.5 transition-[opacity,scale] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none",
            stuck ? "pointer-events-none scale-95 opacity-0" : "scale-100 opacity-100",
          )}
        >
          <ul
            ref={listRef}
            className="relative isolate flex items-center gap-0.5 overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <span
              ref={pillRef}
              aria-hidden
              className="absolute top-0 left-0 -z-10 rounded-full bg-bg opacity-0 dark:bg-surface"
            />
            {sections.map((section, index) => (
              <li key={section.id} className="shrink-0">
                <a
                  href={`#${section.id}`}
                  data-section={section.id}
                  aria-current={active === section.id ? "location" : undefined}
                  onClick={(event) => jump(event, section.id, index)}
                  className={cn(
                    "inline-flex h-10 items-center rounded-full px-4 text-[15px] font-semibold whitespace-nowrap transition-colors duration-300 md:h-11 md:px-5 md:text-base",
                    active === section.id ? "text-ink" : "text-ink-3 hover:text-ink",
                  )}
                >
                  {section.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Stuck: a compact dropdown with the product icon and the current section. */}
        <div
          inert={!stuck}
          className={cn(
            "relative transition-[opacity,scale] duration-300 ease-[var(--ease-out)] motion-reduce:transition-none",
            stuck ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
          )}
        >
          <NavDropdown
            ariaLabel={`${product.fullName} sections, current: ${current.label}`}
            width="17rem"
            buttonClassName="menu-panel inline-flex h-14 items-center gap-3 rounded-full py-2 pr-4 pl-2 text-[15px] font-semibold text-ink"
            label={
              <>
                <ProductGlyph slug={product.slug} size={36} />
                <span className="flex flex-col items-start leading-tight">
                  <span className="text-[11px] font-semibold text-ink-3">{product.fullName}</span>
                  <span>{current.label}</span>
                </span>
              </>
            }
          >
            {(close) => (
              <ul className="flex flex-col gap-0.5">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      aria-current={active === section.id ? "location" : undefined}
                      onClick={(event) => {
                        close();
                        jump(event, section.id, index);
                      }}
                      className="flex items-center justify-between gap-3 rounded-[0.9rem] px-3 py-2.5 text-[15px] font-semibold text-ink-2 transition-colors hover:bg-bg hover:text-ink aria-[current]:bg-bg aria-[current]:text-ink"
                    >
                      {section.label}
                      {active === section.id ? <span aria-hidden className="h-2 w-2 rounded-full bg-product" /> : null}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </NavDropdown>
        </div>
      </div>
    </>
  );
}

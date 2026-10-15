"use client";

import { useRef, type MouseEvent } from "react";

import { useNavFollower } from "@/components/motion/use-nav-follower";
import { scrollToSection, useSectionSpy } from "@/components/motion/use-section-spy";
import { productSections } from "@/data/product-sections";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";

/**
 * Product section tabs as a floating pill directly under the product hero (Workspace product-page
 * pattern). In the page flow, not sticky: once it scrolls away, the global header carries the same
 * sections as a compact menu next to the logo (layout/product-section-menu.tsx), which watches this
 * element ([data-product-subnav]). The current tab gets the header's GSAP pill highlight; on small
 * screens the strip scrolls horizontally.
 */
export function ProductSubNav({ product }: { product: Product }) {
  const barRef = useRef<HTMLDivElement | null>(null);
  const listRef = useRef<HTMLUListElement | null>(null);
  const pillRef = useRef<HTMLSpanElement | null>(null);
  const sections = productSections[product.slug];
  const active = useSectionSpy(
    barRef,
    sections.map((section) => section.id),
  );
  useNavFollower(listRef, pillRef, active ?? "");

  const jump = (event: MouseEvent<HTMLAnchorElement>, id: string, index: number) => {
    event.preventDefault();
    scrollToSection(id, index);
  };

  return (
    <div ref={barRef} data-product-subnav className="relative z-10 flex justify-center px-5 md:px-8">
      <nav aria-label={`${product.fullName} sections`} className="menu-panel max-w-full rounded-full p-1.5">
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
    </div>
  );
}

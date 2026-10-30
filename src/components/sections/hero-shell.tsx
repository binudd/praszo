"use client";

import type { ReactNode, RefObject } from "react";

import { useHeroScroll } from "@/components/motion/hero-scroll";

import { Container } from "@/components/ui/container";

type Props = {
  id?: string;
  labelledBy: string;
  rootRef: RefObject<HTMLElement | null>;
  /** Eyebrow, lede and CTAs. */
  lede: ReactNode;
  /** The showcase; receives the remaining height of the viewport. */
  visual: ReactNode;
  /** The giant title (rendered at the bottom). */
  title: ReactNode;
  /** Optional element to the right of the title on large screens. */
  aside?: ReactNode;
};

/**
 * Viewport-height hero: a flexible content area (lede + visual) fills the space
 * under the header and the large title is anchored to the bottom. The title is
 * always visible without scrolling; the content row shrinks before the title
 * does. The title stays first in the DOM (reading order) and is placed in the
 * bottom row by the grid.
 */
export function HeroShell({ id, labelledBy, rootRef, lede, visual, title, aside }: Props) {
  useHeroScroll(rootRef);
  return (
    <section
      ref={rootRef}
      id={id}
      data-entrance
      aria-labelledby={labelledBy}
      className="relative h-[100svh] min-h-[36rem] overflow-hidden"
    >
      <Container
        className="grid h-full grid-cols-1 grid-rows-[minmax(0,1fr)_auto] gap-y-6 pt-[calc(var(--header-h)+1.5rem)] pb-6 md:gap-y-8 md:pb-8 lg:pt-[calc(var(--header-h)+clamp(1rem,4svh,2.5rem))]"
      >
        <div data-hero-depth="title" className="row-start-2 flex flex-col gap-4 will-change-transform lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          {title}
          {aside ? <div className="hidden shrink-0 lg:block">{aside}</div> : null}
        </div>
        <div className="row-start-1 grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-5 lg:grid-cols-12 lg:grid-rows-none lg:items-center lg:gap-12">
          <div data-hero-depth="lede" className="min-w-0 lg:col-span-5">
            {lede}
          </div>
          <div data-hero="visual" className="relative h-full min-h-0 lg:col-span-7">
            <div data-hero-depth="visual" className="h-full will-change-transform">
              {visual}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

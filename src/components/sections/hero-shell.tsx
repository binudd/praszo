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
  /** The giant title (rendered at the top). */
  title: ReactNode;
  /** Optional element to the right of the title on large screens. */
  aside?: ReactNode;
};

/**
 * Viewport-height hero: the large title sits at the top, below a band of
 * white space under the header, and a flexible content area (lede + visual)
 * fills the rest. The title is always visible without scrolling; the content
 * row shrinks before the title does.
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
        className="grid h-full grid-cols-1 grid-rows-[auto_minmax(0,1fr)] gap-y-6 pt-[calc(var(--header-h)+2.5rem)] pb-6 md:gap-y-10 md:pb-8 lg:pt-[calc(var(--header-h)+clamp(1.5rem,7svh,4rem))]"
      >
        <div data-hero-depth="title" className="flex flex-col gap-4 will-change-transform lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          {title}
          {aside ? <div className="hidden shrink-0 lg:block">{aside}</div> : null}
        </div>
        <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-5 lg:grid-cols-12 lg:grid-rows-none lg:items-center lg:gap-12">
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

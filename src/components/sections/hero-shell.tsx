import type { ReactNode, RefObject } from "react";

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
 * Viewport-height hero: a flexible content area (lede + visual) above a title
 * row that stays at the bottom edge, so the large headline is always visible
 * without scrolling. Rows shrink before the title does.
 */
export function HeroShell({ id, labelledBy, rootRef, lede, visual, title, aside }: Props) {
  return (
    <section
      ref={rootRef}
      id={id}
      data-entrance
      aria-labelledby={labelledBy}
      className="relative h-[100svh] min-h-[36rem] overflow-hidden"
    >
      <Container wide className="grid h-full grid-cols-1 grid-rows-[minmax(0,1fr)_auto] gap-y-5 pt-[5.75rem] pb-5 md:gap-y-8 md:pb-8 lg:pt-28">
        <div className="grid min-h-0 grid-rows-[auto_minmax(0,1fr)] gap-5 lg:grid-cols-12 lg:grid-rows-none lg:items-center lg:gap-12">
          <div className="min-w-0 lg:col-span-5">{lede}</div>
          <div data-hero="visual" className="relative h-full min-h-0 lg:col-span-7">
            {visual}
          </div>
        </div>
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          {title}
          {aside ? <div className="hidden lg:block">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}

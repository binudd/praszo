"use client";

import type { CSSProperties, FocusEvent, ReactNode } from "react";
import { useRef } from "react";

import { gsap, ScrollTrigger, useGSAP } from "@/components/motion/gsap";
import { scrollToTarget } from "@/components/motion/smooth-scroll";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

type Props = {
  /** Cards. Each child should carry its own width (e.g. `w-[min(24rem,80vw)]`). */
  children: ReactNode;
  /** Content pinned above the track (eyebrow, title, lede). */
  header?: ReactNode;
  /** Content shown after the track inside the pinned stage (e.g. a caption). */
  footer?: ReactNode;
  /** Accessible name for the scrolling region. */
  label: string;
  id?: string;
  theme?: "dark" | "light";
  /** Media query under which the section is pinned and scrubbed; below it the track scrolls natively. */
  pinMedia?: string;
  /** Left inset of the track so the first card aligns with the page container. */
  inset?: string;
  gapClassName?: string;
  className?: string;
};

const DEFAULT_INSET = "max(1.25rem, calc((100vw - 86rem) / 2 + 2.5rem))";

/**
 * Pinned horizontal carousel driven by vertical scrolling.
 *
 * Desktop/tablet: the section pins and GSAP scrubs the track horizontally by
 * exactly its overflow width, so scroll speed maps 1:1 to travel, reverses
 * naturally and releases the pin at either end. It reuses the Lenis instance
 * and GSAP ticker configured in SmoothScroll (ScrollTrigger.update is already
 * bound to Lenis), so there is no second animation loop and no wheel listener.
 *
 * Mobile and reduced motion: the track is a native horizontal scroll region.
 */
export function HorizontalScroll({
  children,
  header,
  footer,
  label,
  id,
  theme,
  pinMedia = "(min-width: 768px)",
  inset = DEFAULT_INSET,
  gapClassName = "gap-4 md:gap-5",
  className,
}: Props) {
  const rootRef = useRef<HTMLElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!root || !viewport || !track) return;

      if (prefersReducedMotion()) {
        root.classList.add("is-static");
        return () => root.classList.remove("is-static");
      }

      const mm = gsap.matchMedia();

      mm.add(`${pinMedia} and (prefers-reduced-motion: no-preference)`, () => {
        root.classList.add("is-pinned");
        viewport.scrollLeft = 0;

        // Travel = how much of the track is hidden to the right of the viewport.
        const distance = () => Math.max(0, track.scrollWidth - viewport.clientWidth);

        const tween = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.4,
            invalidateOnRefresh: true,
            onRefresh: (self) => {
              triggerRef.current = self;
            },
          },
        });
        triggerRef.current = tween.scrollTrigger ?? null;

        return () => {
          triggerRef.current = null;
          root.classList.remove("is-pinned");
          gsap.set(track, { clearProps: "transform" });
        };
      });

      // Re-measure when the track's size changes (fonts, images, responsive reflow).
      const resize = new ResizeObserver(() => ScrollTrigger.refresh());
      resize.observe(track);
      const images = Array.from(track.querySelectorAll("img"));
      const onLoad = () => ScrollTrigger.refresh();
      images.forEach((img) => {
        if (!img.complete) img.addEventListener("load", onLoad, { once: true });
      });

      return () => {
        resize.disconnect();
        images.forEach((img) => img.removeEventListener("load", onLoad));
        mm.revert();
      };
    },
    { scope: rootRef, dependencies: [pinMedia] },
  );

  /** Keyboard users: bring a focused card into view by scrolling the page to its position. */
  const onFocus = (event: FocusEvent<HTMLDivElement>) => {
    const trigger = triggerRef.current;
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!trigger || !track || !viewport) return;
    const card = (event.target as HTMLElement).closest<HTMLElement>("[data-card]");
    if (!card) return;
    const distance = Math.max(1, track.scrollWidth - viewport.clientWidth);
    const target = Math.min(distance, Math.max(0, card.offsetLeft - viewport.clientWidth * 0.15));
    scrollToTarget(trigger.start + (target / distance) * (trigger.end - trigger.start));
  };

  return (
    <section
      ref={rootRef}
      id={id}
      data-theme={theme}
      aria-label={label}
      className={cn("hscroll relative", className)}
      style={{ "--hscroll-inset": inset } as CSSProperties}
    >
      <div className="hscroll-stage">
        {header ? <div className="hscroll-header">{header}</div> : null}
        <div
          ref={viewportRef}
          className="hscroll-viewport"
          data-lenis-prevent
          tabIndex={0}
          role="region"
          aria-label={label}
          onFocus={onFocus}
        >
          <div ref={trackRef} className={cn("hscroll-track", gapClassName)}>
            {children}
            <div aria-hidden className="hscroll-end" />
          </div>
        </div>
        {footer ? <div className="hscroll-footer">{footer}</div> : null}
      </div>
    </section>
  );
}

/** Convenience wrapper that marks a card for keyboard scroll-into-view. */
export function HorizontalCard({ className, children, ...props }: { className?: string; children: ReactNode } & Record<string, unknown>) {
  return (
    <div data-card className={cn("hscroll-card", className)} {...props}>
      {children}
    </div>
  );
}

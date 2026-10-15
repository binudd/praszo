"use client";

import Image from "next/image";
import { useRef } from "react";

import { gsap, useGSAP } from "@/components/motion/gsap";
import type { TeamMember } from "@/data/pages/about";
import { cn } from "@/lib/cn";

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("");
}

/*
 * Hand-drawn loop round the panel, in the same pen style as the Eyebrow underline: a loose rounded
 * rectangle that starts top-left, goes once round and overshoots its start. Drawn in a 100 × 97.5 box,
 * the overlay's fixed aspect (it spans the panel plus a small margin), so the stroke scales evenly.
 * See .team-scribble in globals.css.
 */
const FRAME_PATH =
  "M6 3.6C30 1.9 62 2.7 92 3.2C97.4 3.4 98.6 7 98.4 12C97.9 38 98.8 66 97.6 88C97.3 94.2 94 95.6 88 95.2C62 94.6 36 96.2 9 94.8C3.6 94.5 1.8 91 2 85C2.6 60 1.4 34 2.3 10C2.6 4.6 5 2.6 11 2.2C20 1.8 26 2.9 33 2.4";

/**
 * Team portraits as cut-outs. Each transparent PNG stands in front of a panel that starts 22% down
 * the frame, so the head breaks out of it.
 *
 * Motion (GSAP ScrollTrigger on the shared Lenis loop, scrubbed; reduced motion skips it all):
 *   enter  the panel wipes up and the figure rises out of it;
 *   after  the figure keeps a light parallax while the card crosses the viewport.
 * Hover (hover-capable devices): the pen loop draws round the panel, behind the figure so the head
 * overlaps it, and the figure lifts from its base. On touch screens the loop draws as the card enters.
 * Scroll transforms sit on [data-team-figure], inside a fixed clipping layer (so the rounded base stays
 * put while the figure moves); the hover scale sits on the inner image wrapper, so the two never collide.
 */
export function TeamGrid({ members }: { members: ReadonlyArray<TeamMember> }) {
  const rootRef = useRef<HTMLUListElement | null>(null);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add({ motion: "(prefers-reduced-motion: no-preference)", touch: "(hover: none)" }, (context) => {
        const { motion, touch } = context.conditions as { motion: boolean; touch: boolean };
        if (!motion) return;
        root.querySelectorAll<HTMLElement>("[data-team-card]").forEach((card) => {
          const panel = card.querySelector("[data-team-panel]");
          const figure = card.querySelector("[data-team-figure]");
          const caption = card.querySelector("[data-team-caption]");
          const loop = card.querySelector(".team-scribble path");

          const enter = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: card, start: "top 95%", end: "top 45%", scrub: 0.8, invalidateOnRefresh: true },
          });
          if (panel) {
            enter.fromTo(
              panel,
              { clipPath: "inset(100% 0% 0% 0% round 1.5rem)" },
              { clipPath: "inset(0% 0% 0% 0% round 1.5rem)", ease: "power2.out" },
              0,
            );
          }
          // Explicit y: 0 in every from/to: otherwise GSAP reads the other timeline's percentage offset
          // as a fixed pixel y when the second timeline is created, and the figure stays shifted.
          if (figure) {
            enter.fromTo(
              figure,
              { y: 0, yPercent: 28, opacity: 0 },
              { y: 0, yPercent: 0, opacity: 1, ease: "power3.out" },
              0.1,
            );
          }
          if (caption) {
            enter.fromTo(caption, { y: 18, opacity: 0 }, { y: 0, opacity: 1, ease: "power2.out", duration: 0.6 }, 0.4);
          }
          // No hover on touch screens: draw the loop as part of the entrance instead.
          if (touch && loop) {
            enter.fromTo(loop, { strokeDashoffset: 1 }, { strokeDashoffset: 0, ease: "power1.inOut", duration: 0.7 }, 0.3);
          }

          const drift = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: card, start: "top 45%", end: "bottom top", scrub: 0.8, invalidateOnRefresh: true },
          });
          if (figure) drift.fromTo(figure, { y: 0, yPercent: 0 }, { y: 0, yPercent: -5 }, 0);
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <ul ref={rootRef} className="grid grid-cols-2 gap-x-4 gap-y-14 sm:gap-x-6 md:gap-x-8 lg:grid-cols-4">
      {members.map((member, index) => (
        <li key={member.name} data-team-card className={cn("group", index % 2 === 1 && "lg:mt-16")}>
          <div className="relative aspect-[4/5]">
            {/* Panel: the ground the figure stands on. */}
            <div data-team-panel className="absolute inset-x-0 top-[22%] bottom-0 rounded-card bg-elevated" />

            {/* Pen loop round the panel, between panel and figure so the head overlaps it. */}
            <svg
              aria-hidden
              focusable="false"
              viewBox="0 0 100 97.5"
              preserveAspectRatio="none"
              className="team-scribble absolute top-[20%] -bottom-[2.5%] -left-[3%] w-[106%] text-brand"
            >
              <path pathLength={1} d={FRAME_PATH} />
            </svg>

            {/* Figure: full frame, clipped only along the panel's rounded base so the head can break out above. */}
            <div className="absolute inset-0 [clip-path:inset(-40%_0%_0%_0%_round_0_0_1.5rem_1.5rem)]">
              <div data-team-figure className="absolute inset-0">
                {member.photo ? (
                  <div className="relative h-full w-full origin-bottom transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-[1.04]">
                    <Image
                      src={member.photo}
                      alt={`Portrait of ${member.name}`}
                      fill
                      sizes="(min-width: 1024px) 22vw, 46vw"
                      className="object-contain object-bottom"
                    />
                  </div>
                ) : (
                  <span
                    aria-hidden
                    className="display-md absolute inset-x-0 top-[22%] bottom-0 flex items-center justify-center text-brand-strong"
                  >
                    {initials(member.name)}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div data-team-caption className="mt-5 border-t border-line-strong pt-4">
            <p className="label text-ink-3 tabular-nums">{String(index + 1).padStart(2, "0")}</p>
            <h3 className="heading mt-2 text-ink">{member.name}</h3>
            <p className="label mt-2 text-ink-3">{member.role}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

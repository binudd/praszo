"use client";

import type { ReactNode } from "react";

import { MockupThemeToggle, useMockupFrame } from "@/components/mockups/mockup-theme";
import { WindowFrame } from "@/components/mockups/window-frame";
import { cn } from "@/lib/cn";

/**
 * Shared chrome for the animated product mockups. The window body is a flat "desk" (`bg-elevated`,
 * washed with the product colour at the top) and everything on it is a borderless card, so the UI
 * reads through contrast alone. The window dots use the status tokens and a pulsing "Live" chip ends
 * the meta row.
 *
 * It also renders the shared effects overlay ([data-fx], driven by mockup-fx.ts): a labelled
 * collaborator cursor, a click ripple and a toast. Children get the remaining height and should clip
 * their own overflow.
 */
export function MockupShell({
  title,
  meta,
  cursorName = "JL",
  toastAt = "left",
  children,
  className,
}: {
  title: string;
  meta: ReadonlyArray<string>;
  /** Initials on the collaborator cursor. */
  cursorName?: string;
  /** Corner for the toast: pick the one this layout leaves empty, so it never covers a result. */
  toastAt?: "left" | "right";
  children: ReactNode;
  className?: string;
}) {
  const frame = useMockupFrame();
  const live = (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-product-soft px-2 py-0.5 text-[10px] font-bold text-product-deep dark:text-product">
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-ping rounded-full bg-product opacity-60 motion-reduce:hidden" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-product" />
      </span>
      Live
    </span>
  );
  const fx = (
    // Effects overlay (mockup-fx.ts). Decorative: the cursor and toast restate what the UI shows.
    <div data-fx aria-hidden className="pointer-events-none absolute inset-0 z-30 overflow-hidden">
      <span
        data-fx-ripple
        className="absolute top-0 left-0 -mt-3 -ml-3 block h-6 w-6 rounded-full border-2 border-product opacity-0"
      />
      <span data-fx-cursor className="absolute top-0 left-0 flex items-start opacity-0">
        <svg viewBox="0 0 16 18" className="h-4 w-4 -translate-x-[2px] -translate-y-[1px]">
          <path
            d="M1.5 1.5 14 8.2 8.6 9.6 6 15.6Z"
            fill="var(--product)"
            stroke="var(--bg)"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
        <span className="mt-3 -ml-0.5 rounded-full bg-product px-1.5 py-px text-[9px] font-bold text-product-ink">
          {cursorName}
        </span>
      </span>
      <div
        className={cn("absolute inset-x-0 bottom-3 flex px-3", toastAt === "right" ? "justify-end" : "justify-start")}
      >
        <p
          data-fx-toast
          data-tone="product"
          className="group inline-flex max-w-full items-center gap-1.5 truncate rounded-full bg-ink px-3 py-1.5 text-[10px] font-semibold text-bg opacity-0 dark:group-data-[frame=bare]/shell:bg-elevated dark:group-data-[frame=bare]/shell:text-ink"
        >
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-product group-data-[tone=accent]:bg-accent group-data-[tone=success]:bg-success" />
          <span data-fx-toast-text className="truncate" />
        </p>
      </div>
    </div>
  );

  if (frame === "bare") {
    // No window frame, no border, no box: a soft product-tinted wash that fades out at every edge
    // (a mask on the background layer only, so the UI itself stays crisp). In dark mode the dark cards
    // already stand out on the light page, so the wash is only a faint product glow (no dark fill), and
    // the toast becomes a dark pill so it stays visible on the light page. The title becomes the first
    // chip and the theme toggle ends the chip row.
    return (
      <div data-frame="bare" className={cn("group/shell relative isolate flex h-full flex-col", className)}>
        <div
          aria-hidden
          className="absolute -inset-x-3 -inset-y-1 -z-10 bg-elevated bg-[radial-gradient(ellipse_at_30%_0%,color-mix(in_srgb,var(--product)_14%,transparent),transparent_60%)] dark:bg-transparent dark:bg-[radial-gradient(ellipse_at_50%_45%,color-mix(in_srgb,var(--product)_16%,transparent),transparent_70%)] [mask-image:radial-gradient(ellipse_closest-side_at_50%_50%,#000_72%,transparent)] sm:-inset-8 lg:-inset-10"
        />
        <ul className="flex shrink-0 flex-wrap items-center gap-1.5 px-3 pt-3">
          <li className="rounded-full bg-bg px-2.5 py-0.5 text-[10px] font-bold text-ink">{title}</li>
          {meta.map((item) => (
            <li key={item} className="rounded-full bg-bg px-2 py-0.5 text-[10px] font-semibold text-ink-2">
              {item}
            </li>
          ))}
          <li className="ml-auto flex items-center gap-1.5">
            {live}
            <MockupThemeToggle />
          </li>
        </ul>
        <div className="relative min-h-0 flex-1">{children}</div>
        {fx}
      </div>
    );
  }

  return (
    <WindowFrame title={title} dots="color" action={<MockupThemeToggle />} className={cn("h-full", className)}>
      <div className="relative flex h-full flex-col bg-elevated bg-[linear-gradient(180deg,color-mix(in_srgb,var(--product)_10%,transparent),transparent_42%)]">
        {meta.length ? (
          <ul className="flex shrink-0 flex-wrap items-center gap-1.5 px-3 pt-3">
            {meta.map((item) => (
              <li key={item} className="rounded-full bg-bg px-2 py-0.5 text-[10px] font-semibold text-ink-2">
                {item}
              </li>
            ))}
            <li className="ml-auto">{live}</li>
          </ul>
        ) : null}
        <div className="min-h-0 flex-1">{children}</div>
        {fx}
      </div>
    </WindowFrame>
  );
}

export type MockupProps = { paused?: boolean; className?: string };

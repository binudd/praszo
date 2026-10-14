"use client";

import type { ComponentProps, PointerEvent as ReactPointerEvent } from "react";
import { useRef } from "react";

import { cn } from "@/lib/cn";

/** Horizontal rail: native scroll, trackpad friendly, drag-to-scroll with a fine pointer. */
export function DragRail({ className, children, onClickCapture, ...props }: ComponentProps<"div">) {
  const ref = useRef<HTMLDivElement | null>(null);
  const state = useRef({ down: false, startX: 0, startLeft: 0, moved: false });

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    state.current = { down: true, startX: event.clientX, startLeft: ref.current.scrollLeft, moved: false };
    ref.current.setPointerCapture(event.pointerId);
    ref.current.classList.add("is-dragging");
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!state.current.down || !ref.current) return;
    const delta = event.clientX - state.current.startX;
    if (Math.abs(delta) > 4) state.current.moved = true;
    ref.current.scrollLeft = state.current.startLeft - delta;
  };

  const release = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!state.current.down || !ref.current) return;
    state.current.down = false;
    ref.current.releasePointerCapture(event.pointerId);
    ref.current.classList.remove("is-dragging");
  };

  return (
    <div
      ref={ref}
      data-lenis-prevent
      tabIndex={0}
      className={cn("rail", className)}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={release}
      onPointerCancel={release}
      onClickCapture={(event) => {
        // Swallow the click that ends a drag so cards are not activated by accident.
        if (state.current.moved) {
          event.preventDefault();
          event.stopPropagation();
          state.current.moved = false;
          return;
        }
        onClickCapture?.(event);
      }}
      {...props}
    >
      {children}
    </div>
  );
}

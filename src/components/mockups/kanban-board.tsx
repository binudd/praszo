"use client";

import { Clock } from "lucide-react";
import { useEffect, useRef, type CSSProperties } from "react";

import { MockupShell, type MockupProps } from "@/components/mockups/mockup-shell";
import { Flip, gsap, useGSAP } from "@/components/motion/gsap";
import { kanban, type KanbanCard } from "@/data/kanban";
import { products } from "@/data/products";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

const HOLD = 1.8;
/** Transform-only Flip: `scale` avoids width/height tweens, `absolute` lets the card cross clipped columns. */
const FLIP = { duration: 0.85, ease: "power3.inOut", absolute: true, scale: true, prune: true } as const;

function Card({ card }: { card: KanbanCard }) {
  const product = card.tag ? products[card.tag] : null;
  return (
    <li
      data-card={card.id}
      className="rounded-sm bg-bg p-2.5 transition-shadow duration-300 data-[lift]:shadow-float"
      style={product ? ({ "--product": product.color, "--product-deep": product.colorDeep } as CSSProperties) : undefined}
    >
      <p className="text-[11px] leading-snug font-semibold text-ink">{card.title}</p>
      <div className="mt-2 flex items-center justify-between gap-2">
        <span className="flex min-w-0 items-center gap-1.5 text-[10px] text-ink-3">
          <span className="inline-flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-elevated text-[8px] font-bold text-ink-2">
            {card.assignee}
          </span>
          <span className="truncate">{card.due}</span>
          {card.hours ? (
            <span className="inline-flex shrink-0 items-center gap-0.5">
              <Clock size={9} aria-hidden /> {card.hours}
            </span>
          ) : null}
        </span>
        {product ? (
          <span className="shrink-0 rounded-full bg-product-soft px-1.5 py-0.5 text-[8px] font-bold tracking-[0.06em] text-product-deep dark:text-product uppercase">
            {product.name}
          </span>
        ) : null}
      </div>
    </li>
  );
}

/**
 * Praszo Practice engagement board. Tasks glide between columns in a loop
 * (forward through the moves, then back) using GSAP Flip, so the layout
 * reflows smoothly and never jumps. A moved card lands at the top of its new
 * column, so it stays visible however short the frame is. Static under
 * reduced motion.
 */
export function KanbanBoard({ paused, className }: MockupProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(Boolean(paused));

  useEffect(() => {
    pausedRef.current = Boolean(paused);
  }, [paused]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;

      const cards = () => Array.from(root.querySelectorAll<HTMLElement>("[data-card]"));
      const columnList = (id: string) => root.querySelector<HTMLElement>(`[data-column="${id}"] [data-cards]`);
      const updateCounts = () => {
        root.querySelectorAll<HTMLElement>("[data-column]").forEach((column) => {
          const count = column.querySelector<HTMLElement>("[data-count]");
          if (count) count.textContent = String(column.querySelectorAll("[data-card]").length);
        });
      };
      // DOM order is preserved by the Map, so replaying it restores the original board.
      const origin = new Map(cards().map((card) => [card, card.parentElement as HTMLElement]));

      let alive = true;
      let active: gsap.core.Animation | null = null;
      const wait = (seconds: number) =>
        new Promise<void>((resolve) => {
          gsap.delayedCall(seconds, () => resolve());
        });
      const untilResumed = async () => {
        while (alive && pausedRef.current) await wait(0.25);
      };
      const play = (animation: gsap.core.Animation) => {
        active = animation;
        return animation.then(() => {
          if (active === animation) active = null;
        });
      };

      const move = async (cardId: string, columnId: string) => {
        const card = root.querySelector<HTMLElement>(`[data-card="${cardId}"]`);
        const list = columnList(columnId);
        if (!card || !list || list.offsetParent === null) return;
        card.dataset.lift = "";
        await play(gsap.to(card, { scale: 1.02, duration: 0.2, ease: "power2.out" }));
        if (!alive) return;
        const state = Flip.getState(cards());
        list.insertBefore(card, list.firstChild);
        updateCounts();
        await play(Flip.from(state, FLIP));
        if (!alive) return;
        await play(gsap.to(card, { scale: 1, duration: 0.25, ease: "power2.out", clearProps: "transform" }));
        delete card.dataset.lift;
      };

      const run = async () => {
        await wait(1.2);
        while (alive) {
          const back: { card: string; to: string }[] = [];
          for (const step of kanban.moves) {
            if (!alive) return;
            await untilResumed();
            const card = root.querySelector<HTMLElement>(`[data-card="${step.card}"]`);
            const from = card?.closest<HTMLElement>("[data-column]")?.dataset.column;
            if (from) back.unshift({ card: step.card, to: from });
            await move(step.card, step.to);
            await wait(HOLD);
          }
          for (const step of back) {
            if (!alive) return;
            await untilResumed();
            await move(step.card, step.to);
            await wait(HOLD);
          }
        }
      };
      void run();

      return () => {
        alive = false;
        // Finish any in-flight animation so Flip restores the styles it set, then reset the board.
        active?.progress(1).kill();
        const all = cards();
        gsap.set(all, { clearProps: "transform" });
        all.forEach((card) => delete card.dataset.lift);
        origin.forEach((parent, card) => parent.appendChild(card));
        updateCounts();
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={className}>
      <MockupShell title={kanban.engagement} meta={kanban.meta}>
        <div className="grid h-full min-h-0 grid-cols-2 grid-rows-[minmax(0,1fr)] gap-3 p-3 sm:grid-cols-3">
          {kanban.columns.map((column, index) => (
            <section
              key={column.id}
              data-column={column.id}
              aria-label={column.title}
              className={cn("flex min-h-0 flex-col", index >= 2 && "hidden sm:flex")}
            >
              <header className="flex items-center justify-between px-1 pb-2">
                <h3 className="label text-[9px] text-ink-3">{column.title}</h3>
                <span data-count className="rounded-full bg-bg px-1.5 text-[9px] font-bold text-ink-2 tabular-nums">
                  {column.cards.length}
                </span>
              </header>
              <ul data-cards className="flex min-h-0 flex-col gap-2 overflow-hidden">
                {column.cards.map((card) => (
                  <Card key={card.id} card={card} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </MockupShell>
    </div>
  );
}

"use client";

import { FileText, Scale, Wallet } from "lucide-react";
import { useEffect, useRef } from "react";

import { MockupShell, type MockupProps } from "@/components/mockups/mockup-shell";
import { Flip, gsap, useGSAP } from "@/components/motion/gsap";
import { docsShowcase as data } from "@/data/showcases";
import { prefersReducedMotion } from "@/lib/motion";

/** Praszo Docs: files arrive, get OCR-scanned and tagged, then route to Finance or Legal. */
export function DocsPipeline({ paused, className }: MockupProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const pausedRef = useRef(Boolean(paused));

  useEffect(() => {
    pausedRef.current = Boolean(paused);
  }, [paused]);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      const files = () => Array.from(root.querySelectorAll<HTMLElement>("[data-file]"));
      const lane = (id: string) => root.querySelector<HTMLElement>(`[data-lane="${id}"] [data-items]`);
      const origin = new Map(files().map((file) => [file, file.parentElement as HTMLElement]));
      const scan = root.querySelector<HTMLElement>("[data-scan]");

      if (prefersReducedMotion()) {
        files().forEach((file) => (file.dataset.state = "tagged"));
        return;
      }

      let alive = true;
      const wait = (seconds: number) =>
        new Promise<void>((resolve) => {
          gsap.delayedCall(seconds, () => resolve());
        });
      const untilResumed = async () => {
        while (alive && pausedRef.current) await wait(0.25);
      };
      const flipTo = async (file: HTMLElement, laneId: string) => {
        const target = lane(laneId);
        if (!target) return;
        const state = Flip.getState(files());
        target.appendChild(file);
        await Flip.from(state, { duration: 0.7, ease: "power2.inOut", absolute: true, nested: true, prune: true });
      };

      const run = async () => {
        await wait(0.8);
        while (alive) {
          for (const item of data.files) {
            if (!alive) return;
            await untilResumed();
            const file = root.querySelector<HTMLElement>(`[data-file="${item.id}"]`);
            if (!file) continue;
            file.dataset.state = "raw";
            await flipTo(file, "processing");
            if (!alive) return;
            if (scan) {
              gsap.set(scan, { opacity: 1, yPercent: -100 });
              await gsap.to(scan, { yPercent: 400, duration: 0.9, ease: "power1.inOut" });
              gsap.set(scan, { opacity: 0 });
            }
            file.dataset.state = "tagged";
            await wait(0.9);
            if (!alive) return;
            await untilResumed();
            await flipTo(file, item.route.toLowerCase());
            await wait(0.6);
          }
          await wait(1.4);
          if (!alive) return;
          const state = Flip.getState(files());
          files().forEach((file) => {
            file.dataset.state = "raw";
            origin.get(file)?.appendChild(file);
          });
          await Flip.from(state, { duration: 0.6, ease: "power2.inOut", absolute: true, nested: true, prune: true });
          await wait(0.6);
        }
      };
      void run();

      return () => {
        alive = false;
        origin.forEach((parent, file) => parent.appendChild(file));
      };
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className={className}>
      <MockupShell title={data.title} meta={data.meta}>
        <div className="grid h-full min-h-0 grid-cols-3 grid-rows-[minmax(0,1fr)] gap-2 p-2.5">
          <section data-lane="intake" aria-label={data.lanes[0]} className="flex min-h-0 flex-col rounded-sm border border-line bg-surface p-2">
            <h3 className="label px-0.5 pb-2 text-[9px] text-ink-3">{data.lanes[0]}</h3>
            <ul data-items className="flex min-h-0 flex-col gap-1.5 overflow-hidden">
              {data.files.map((file) => (
                <li
                  key={file.id}
                  data-file={file.id}
                  data-state="raw"
                  className="group rounded-sm border border-line bg-bg p-2 will-change-transform"
                >
                  <p className="flex items-center gap-1.5 text-[10px] font-semibold text-ink">
                    <FileText size={11} className="shrink-0 text-product" aria-hidden />
                    <span className="truncate">{file.name}</span>
                  </p>
                  <p className="mt-1.5 hidden flex-wrap gap-1 group-data-[state=tagged]:flex">
                    <span className="rounded-full bg-product-soft px-1.5 py-0.5 text-[8px] font-bold text-product-deep">{file.type}</span>
                    <span className="rounded-full bg-elevated px-1.5 py-0.5 text-[8px] font-bold text-ink-2">{file.correspondent}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
          <section data-lane="processing" aria-label={data.lanes[1]} className="relative flex min-h-0 flex-col overflow-hidden rounded-sm border border-product/40 bg-product-soft/40 p-2">
            <h3 className="label px-0.5 pb-2 text-[9px] text-product-deep">{data.lanes[1]}</h3>
            <ul data-items className="relative flex min-h-0 flex-col gap-1.5" />
            <span data-scan aria-hidden className="pointer-events-none absolute inset-x-2 top-8 h-6 rounded bg-gradient-to-b from-transparent via-product/30 to-transparent opacity-0" />
          </section>
          <section aria-label={data.lanes[2]} className="flex min-h-0 flex-col gap-2">
            <div data-lane="finance" className="flex min-h-0 flex-1 flex-col rounded-sm border border-line bg-surface p-2">
              <h3 className="label flex items-center gap-1 px-0.5 pb-2 text-[9px] text-ink-3">
                <Wallet size={10} aria-hidden /> Finance
              </h3>
              <ul data-items className="flex min-h-0 flex-col gap-1.5 overflow-hidden" />
            </div>
            <div data-lane="legal" className="flex min-h-0 flex-1 flex-col rounded-sm border border-line bg-surface p-2">
              <h3 className="label flex items-center gap-1 px-0.5 pb-2 text-[9px] text-ink-3">
                <Scale size={10} aria-hidden /> Legal
              </h3>
              <ul data-items className="flex min-h-0 flex-col gap-1.5 overflow-hidden" />
            </div>
          </section>
        </div>
      </MockupShell>
    </div>
  );
}

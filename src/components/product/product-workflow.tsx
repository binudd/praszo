"use client";

import { useRef } from "react";

import { gsap, useGSAP } from "@/components/motion/gsap";
import { RevealGroup } from "@/components/motion/reveal";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import type { Product } from "@/data/products";
import { cn } from "@/lib/cn";
import { prefersReducedMotion } from "@/lib/motion";

const columnClasses: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

export function ProductWorkflow({ product }: { product: Product }) {
  const rootRef = useRef<HTMLElement | null>(null);
  const workflow = product.workflow;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || prefersReducedMotion()) return;
      const line = root.querySelector("[data-process-line]");
      if (!line) return;
      gsap.fromTo(
        line,
        { scaleX: 0 },
        { scaleX: 1, ease: "none", scrollTrigger: { trigger: root, start: "top 70%", end: "bottom 70%", scrub: 0.5 } },
      );
    },
    { scope: rootRef },
  );

  if (!workflow) return null;
  const id = `${product.slug}-workflow`;
  const columns = columnClasses[workflow.steps.length] ?? "lg:grid-cols-5";

  return (
    <section ref={rootRef} id={id} aria-labelledby={`${id}-title`} className="border-t border-line py-24 md:py-32">
      <Container wide>
        <SectionHeader eyebrow="How it works" title={workflow.title} description={workflow.description} tone="product" size="lg" titleId={`${id}-title`} />
        <div className="relative mt-16">
          <div className="absolute top-[2.9rem] right-0 left-0 hidden h-px bg-line lg:block" aria-hidden>
            <span data-process-line className="block h-full w-full origin-left scale-x-0 bg-product" />
          </div>
          <RevealGroup>
            <ol className={cn("grid gap-10 lg:gap-6", columns)}>
              {workflow.steps.map((step, index) => (
                <li key={step.title} data-reveal className="relative flex gap-5 lg:block">
                  <span className="display-sm relative z-10 inline-flex h-[5.8rem] shrink-0 items-center bg-bg pr-3 text-product-deep tabular-nums lg:h-auto lg:pr-4">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="lg:mt-6">
                    <h3 className="heading text-ink">{step.title}</h3>
                    <p className="copy mt-2">{step.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </RevealGroup>
        </div>
      </Container>
    </section>
  );
}

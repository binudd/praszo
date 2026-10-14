import Image from "next/image";

import { mockups } from "@/components/mockups/registry";
import { WindowFrame } from "@/components/mockups/window-frame";
import type { Visual } from "@/data/products";
import { cn } from "@/lib/cn";

type Props = {
  visual: Visual;
  /** LCP image: eager + high fetch priority. */
  eager?: boolean;
  sizes?: string;
  className?: string;
};

export function ProductVisual({ visual, eager, sizes, className }: Props) {
  if (visual.kind === "mockup") {
    const Mockup = mockups[visual.id];
    return (
      <figure className={className} role="img" aria-label={visual.alt}>
        <Mockup />
      </figure>
    );
  }

  const image = (
    <Image
      src={visual.src}
      alt={visual.alt}
      sizes={sizes ?? "(min-width: 1024px) 55vw, 100vw"}
      placeholder="blur"
      {...(eager ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
      className="h-auto w-full"
    />
  );

  if (visual.frame === "browser") {
    return <WindowFrame className={className}>{image}</WindowFrame>;
  }

  return <div className={cn("overflow-hidden rounded-card", className)}>{image}</div>;
}

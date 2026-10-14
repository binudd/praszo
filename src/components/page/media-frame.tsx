import Image from "next/image";

import type { PageImage } from "@/data/pages/types";
import { cn } from "@/lib/cn";

/** A photo in the site's media radius. Used as a hero aside; above the fold, so it loads eagerly. */
export function MediaFrame({ image, priority = false, className }: { image: PageImage; priority?: boolean; className?: string }) {
  return (
    <div className={cn("overflow-hidden rounded-media bg-elevated", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        placeholder="blur"
        sizes="(min-width: 1024px) 45vw, 100vw"
        loading={priority ? "eager" : undefined}
        fetchPriority={priority ? "high" : undefined}
        className="aspect-[4/3] h-auto w-full object-cover"
      />
    </div>
  );
}

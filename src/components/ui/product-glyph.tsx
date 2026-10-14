import Image from "next/image";

import glyphDocs from "@/assets/brand/docs.svg";
import glyphMatch from "@/assets/brand/match.svg";
import glyphModifi from "@/assets/brand/modifi.svg";
import glyphPractice from "@/assets/brand/practice.svg";
import glyphVerifi from "@/assets/brand/verifi.svg";
import type { ProductSlug } from "@/data/products";
import { cn } from "@/lib/cn";

/** Product glyphs supplied as SVG in src/assets/brand. */
const glyphs = {
  practice: glyphPractice,
  verifi: glyphVerifi,
  match: glyphMatch,
  modifi: glyphModifi,
  docs: glyphDocs,
};

export function ProductGlyph({
  slug,
  size = 40,
  className,
}: {
  slug: ProductSlug;
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src={glyphs[slug]}
      alt=""
      aria-hidden
      width={size}
      height={size}
      unoptimized
      className={cn("shrink-0 overflow-hidden rounded-[22%]", className)}
    />
  );
}

import type { StaticImageData } from "next/image";

import type { IconName } from "@/lib/icons";

/** Shared content shapes for the company pages (About, solutions, Insights, legal). */

export type PageMeta = { title: string; description: string };

export type PageHeroContent = {
  eyebrow: string;
  title: string;
  description: string;
  /** Title tier: "md" for long titles (see PageHero). */
  size?: "lg" | "md";
};

export type FeatureItem = { title: string; body: string; icon: IconName };

export type PageImage = { src: StaticImageData; alt: string };

export type ClosingCta = {
  /** Small kicker above the headline. */
  kicker: string;
  title: string;
  body: string;
  bullets?: ReadonlyArray<string>;
};

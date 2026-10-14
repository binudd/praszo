import type { ComponentType } from "react";

import { DocsPipeline } from "@/components/mockups/docs-pipeline";
import { KanbanBoard } from "@/components/mockups/kanban-board";
import { MatchEngine } from "@/components/mockups/match-engine";
import type { MockupProps } from "@/components/mockups/mockup-shell";
import { ModifiFlow } from "@/components/mockups/modifi-flow";
import { VerifiValidator } from "@/components/mockups/verifi-validator";
import type { ProductSlug } from "@/data/products";

/** One animated service mockup per product, with a short descriptor for captions. */
export const productShowcases: Record<ProductSlug, { component: ComponentType<MockupProps>; label: string }> = {
  practice: { component: KanbanBoard, label: "Engagement board" },
  verifi: { component: VerifiValidator, label: "Statement validation" },
  match: { component: MatchEngine, label: "Three-way matching" },
  modifi: { component: ModifiFlow, label: "Engagement letter lifecycle" },
  docs: { component: DocsPipeline, label: "Document pipeline" },
};

/** Shared frame sizing: taller on phones, 720:520 from the small breakpoint up. */
export const showcaseAspect = "aspect-[4/5] sm:aspect-[720/520]";

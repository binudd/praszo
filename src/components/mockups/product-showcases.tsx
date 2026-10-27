import type { ComponentType } from "react";

import { DocsPipeline } from "@/components/mockups/docs-pipeline";
import { KanbanBoard } from "@/components/mockups/kanban-board";
import { MatchEngine } from "@/components/mockups/match-engine";
import type { MockupProps } from "@/components/mockups/mockup-shell";
import { VerifiValidator } from "@/components/mockups/verifi-validator";
import type { ProductSlug } from "@/data/products";

/** One animated service mockup per product, with a short descriptor for captions. */
export const productShowcases: Record<ProductSlug, { component: ComponentType<MockupProps>; label: string }> = {
  practice: { component: KanbanBoard, label: "Engagement board" },
  verifi: { component: VerifiValidator, label: "Statement validation" },
  match: { component: MatchEngine, label: "Three-way matching" },
  docs: { component: DocsPipeline, label: "Document pipeline" },
};

import type { ComponentType } from "react";

import { DocsRepository } from "@/components/mockups/docs-repository";
import { MatchThreeWay } from "@/components/mockups/match-three-way";
import { VerifiReport } from "@/components/mockups/verifi-report";
import type { MockupId } from "@/data/products";

export const mockups: Record<MockupId, ComponentType> = {
  "docs-repository": DocsRepository,
  "verifi-report": VerifiReport,
  "match-three-way": MatchThreeWay,
};

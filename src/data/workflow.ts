import { home } from "@/data/home";
import { workflowProducts, type Product } from "@/data/products";

export type WorkflowStep = {
  id: string;
  index: number;
  label: string;
  body: string;
  product?: Product;
  badge?: string;
};

/** The six-step audit workflow: client raw data, then one step per Praszo product in workflow order. */
export const workflowSteps: WorkflowStep[] = [
  {
    id: "raw-data",
    index: 0,
    label: home.workflow.start.label,
    body: home.workflow.start.body,
    badge: home.workflow.start.badge,
  },
  ...workflowProducts.map((product, index) => ({
    id: product.slug,
    index: index + 1,
    label: product.workflowStep.label,
    body: product.workflowStep.body,
    product,
  })),
];

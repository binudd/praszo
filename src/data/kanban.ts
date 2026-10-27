import type { ProductSlug } from "@/data/products";

export type KanbanCard = {
  id: string;
  title: string;
  assignee: string;
  due: string;
  hours?: string;
  /** Which Praszo product the task is backed by, shown as a small tag. */
  tag?: ProductSlug;
};

export type KanbanColumn = { id: string; title: string; cards: KanbanCard[] };

/** A task moved from its current column to `to`; moves play forward, then in reverse. */
export type KanbanMove = { card: string; to: string };

/** Illustrative engagement board for the Praszo Practice hero: three stages, two on phones. */
export const kanban = {
  engagement: "OSCH Audit: FY2025",
  meta: ["Due Mar 31", "142 / 200 h", "Budget 72%"],
  columns: [
    {
      id: "planning",
      title: "Planning",
      cards: [
        { id: "risk-memo", title: "Risk assessment memo", assignee: "JL", due: "Mar 4", hours: "6h" },
        { id: "doc-request", title: "Document request list", assignee: "AS", due: "Mar 6", hours: "2h", tag: "docs" },
        { id: "tb-tieout", title: "Trial balance tie-out", assignee: "AS", due: "Mar 8", hours: "4h", tag: "verifi" },
      ],
    },
    {
      id: "fieldwork",
      title: "Fieldwork",
      cards: [
        { id: "bank-conf", title: "Bank confirmations", assignee: "MR", due: "Mar 12", hours: "3h" },
        { id: "vouching", title: "Purchase vouching", assignee: "AS", due: "Mar 14", hours: "9h", tag: "match" },
        { id: "cutoff", title: "Revenue cut-off testing", assignee: "JL", due: "Mar 15", hours: "7h" },
      ],
    },
    {
      id: "review",
      title: "Review",
      cards: [
        { id: "rep-letter", title: "Management rep letter", assignee: "MR", due: "Mar 20", hours: "2h" },
        { id: "disclosures", title: "Disclosure checklist", assignee: "JL", due: "Mar 22", hours: "5h", tag: "verifi" },
      ],
    },
  ] satisfies KanbanColumn[],
  moves: [
    { card: "tb-tieout", to: "fieldwork" },
    { card: "vouching", to: "review" },
    { card: "doc-request", to: "fieldwork" },
  ] satisfies KanbanMove[],
} as const;

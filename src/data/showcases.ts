/** Illustrative content for the animated product mockups (hero showcases). */

export const verifiShowcase = {
  title: "FY23 Consolidated Statements",
  meta: ["Balance Sheet", "P&L", "Cash Flow", "Notes"],
  scoreLabel: "Overall verification score",
  checks: [
    { id: "bs-notes", label: "Balance Sheet ↔ Notes", detail: "42 line items cross-checked", result: "pass", score: 34 },
    { id: "pl", label: "P&L recalculation", detail: "Totals and sub-totals", result: "pass", score: 58 },
    { id: "cf", label: "Cash flow ties to balance sheet", detail: "Opening and closing cash", result: "pass", score: 76 },
    { id: "py", label: "Prior-year comparatives", detail: "Opening balances", result: "pass", score: 90 },
    { id: "disc", label: "Disclosure checklist", detail: "1 disclosure missing", result: "flag", score: 98 },
  ],
} as const;

export const matchShowcase = {
  title: "Purchase register · Q1 FY25",
  meta: ["3-way match", "Line level"],
  documents: ["Invoice", "Purchase order", "Goods receipt"],
  rows: [
    { id: "r1", vendor: "TechPro Solutions", ref: "INV-2024-0002", amount: "4,250.00", results: ["match", "partial", "match"] },
    { id: "r2", vendor: "Northwind Supplies", ref: "INV-2024-0017", amount: "1,180.00", results: ["match", "match", "match"] },
    { id: "r3", vendor: "Globex Logistics", ref: "INV-2024-0021", amount: "9,640.00", results: ["match", "match", "partial"] },
    { id: "r4", vendor: "Initech Services", ref: "INV-2024-0025", amount: "2,075.00", results: ["match", "match", "match"] },
  ],
} as const;

export const modifiShowcase = {
  title: "Engagement letter · Acme Holdings",
  meta: ["Template v4", "2 approvers"],
  fields: [
    { id: "client", placeholder: "{{client.name}}", value: "Acme Holdings Ltd" },
    { id: "period", placeholder: "{{period}}", value: "FY2025" },
    { id: "fee", placeholder: "{{fee}}", value: "AED 48,000" },
  ],
  clause: "Protected clause · locked",
  steps: ["Draft", "Review", "Approved", "Signed"],
} as const;

export const docsShowcase = {
  title: "Repository",
  meta: ["On-premise", "OCR active"],
  lanes: ["Intake", "Processing", "Routed"],
  files: [
    { id: "f1", name: "Invoice_TechPro_0442.pdf", type: "Invoice", correspondent: "TechPro", route: "Finance" },
    { id: "f2", name: "Lease_Agreement_2025.pdf", type: "Contract", correspondent: "Northwind", route: "Legal" },
    { id: "f3", name: "Bank_Statement_Mar.pdf", type: "Statement", correspondent: "ENBD", route: "Finance" },
  ],
} as const;

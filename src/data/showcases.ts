/** Illustrative content for the animated product mockups (hero showcases). */

export const verifiShowcase = {
  title: "FY25 Financial Statements · Draft v3",
  meta: ["Annual", "Listed entity"],
  scoreLabel: "Overall verification score",
  checks: [
    { id: "math", label: "Math checks", detail: "Casting and cross-casting", result: "pass", score: 41 },
    { id: "notes", label: "Note reconciliation", detail: "Statements agreed to notes", result: "pass", score: 68 },
    { id: "py", label: "Prior year tie-in", detail: "Comparatives match last year's report", result: "pass", score: 88 },
    { id: "draft", label: "Draft revision compare", detail: "1 numerical edit since v2", result: "flag", score: 97 },
  ],
} as const;

export const matchShowcase = {
  title: "Purchase sample · FY25 audit",
  meta: ["3-way match", "Line level"],
  documents: ["Sample", "PO", "GRN"],
  rows: [
    { id: "r1", vendor: "TechPro Solutions", ref: "INV-2024-0002", amount: "4,250.00", results: ["match", "partial", "match"] },
    { id: "r2", vendor: "Northwind Supplies", ref: "INV-2024-0017", amount: "1,180.00", results: ["match", "match", "match"] },
    { id: "r3", vendor: "Globex Logistics", ref: "INV-2024-0021", amount: "9,640.00", results: ["match", "match", "partial"] },
    { id: "r4", vendor: "Initech Services", ref: "INV-2024-0025", amount: "2,075.00", results: ["match", "match", "match"] },
  ],
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

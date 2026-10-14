import { ArrowRight, Inbox, Mail, ScanText, Scale, Tags, Upload, Wallet } from "lucide-react";

import { WindowFrame } from "@/components/mockups/window-frame";

const intake = [
  { label: "Drag & drop", icon: Upload },
  { label: "Bulk upload", icon: Inbox },
  { label: "Email integration", icon: Mail },
];

/** Illustrative Praszo Docs flow: intake → OCR + classification → routing. */
export function DocsRepository() {
  return (
    <WindowFrame title="praszo-docs / repository">
      <div className="grid gap-4 bg-white p-4 sm:p-5 lg:grid-cols-[1fr_1.35fr_1fr]">
        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-[10px] font-bold tracking-[0.14em] text-ink-3 uppercase">Intake</p>
          <ul className="mt-3 space-y-2">
            {intake.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2.5 rounded-lg border border-line bg-white px-3 py-2.5 text-[12px] font-semibold text-ink"
              >
                <item.icon size={15} className="text-product" aria-hidden />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-product/30 bg-product-soft/50 p-4">
          <div className="flex items-center justify-between">
            <p className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] text-product-deep uppercase">
              <ScanText size={12} aria-hidden /> OCR + classification
            </p>
            <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-bold text-ink-2">On-premise</span>
          </div>
          <div className="mt-3 rounded-lg border border-line bg-white p-3">
            <div className="space-y-1.5" aria-hidden>
              <div className="h-2 w-3/5 rounded bg-elevated" />
              <div className="h-2 w-full rounded bg-elevated" />
              <div className="h-2 w-4/5 rounded bg-product/25" />
              <div className="h-2 w-full rounded bg-elevated" />
              <div className="h-2 w-2/5 rounded bg-product/25" />
            </div>
            <p className="mt-3 font-mono text-[11px] font-semibold text-ink">Invoice_TechPro_0442.pdf</p>
            <p className="text-[11px] text-ink-3">Searchable text layer indexed</p>
          </div>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {["Type: Invoice", "Correspondent: TechPro", "Tag: FY25", "Version 2"].map((tag) => (
              <li
                key={tag}
                className="inline-flex items-center gap-1 rounded-full border border-line bg-white px-2 py-0.5 text-[10px] font-semibold text-ink-2"
              >
                <Tags size={10} aria-hidden /> {tag}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-xl border border-line bg-surface p-4">
          <p className="text-[10px] font-bold tracking-[0.14em] text-ink-3 uppercase">Routed to</p>
          <ul className="mt-3 space-y-2">
            <li className="flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2.5 text-[12px] font-semibold text-ink">
              <span className="flex items-center gap-2">
                <Wallet size={15} className="text-product" aria-hidden /> Finance
              </span>
              <ArrowRight size={14} className="text-ink-3" aria-hidden />
            </li>
            <li className="flex items-center justify-between rounded-lg border border-line bg-white px-3 py-2.5 text-[12px] font-semibold text-ink">
              <span className="flex items-center gap-2">
                <Scale size={15} className="text-product" aria-hidden /> Legal
              </span>
              <ArrowRight size={14} className="text-ink-3" aria-hidden />
            </li>
          </ul>
          <div className="mt-4 rounded-lg border border-line bg-white p-3 text-[11px] text-ink-2">
            <p className="flex justify-between">
              <span>Who can view</span>
              <span className="font-semibold text-ink">Audit team</span>
            </p>
            <p className="mt-1 flex justify-between">
              <span>Audit trail</span>
              <span className="font-semibold text-success">Recorded</span>
            </p>
          </div>
        </div>
      </div>
    </WindowFrame>
  );
}

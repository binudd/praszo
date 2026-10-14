import { CircleCheck, FileSpreadsheet, FileText, Sparkles } from "lucide-react";

/** Sample AI validation report, mirroring the example published on the Verifi page. */
export function VerifiReport() {
  return (
    <div className="grid gap-4 rounded-[1.25rem] border border-line bg-white p-4 shadow-float sm:grid-cols-[1fr_1.15fr] sm:p-5">
      <div className="rounded-xl border border-line bg-surface p-4">
        <p className="text-[10px] font-bold tracking-[0.14em] text-ink-3 uppercase">Financial documents</p>
        <ul className="mt-3 space-y-3">
          <li className="flex items-start gap-3 rounded-lg border border-line bg-white p-3">
            <FileText size={18} className="mt-0.5 shrink-0 text-accent" aria-hidden />
            <span className="min-w-0">
              <span className="block truncate font-mono text-[12px] font-semibold text-ink">
                FY23_Consolidated_Statements.pdf
              </span>
              <span className="block text-[11px] text-ink-3">Balance Sheet, P&amp;L, Cash Flow, Notes</span>
            </span>
          </li>
          <li className="flex items-start gap-3 rounded-lg border border-line bg-white p-3">
            <FileSpreadsheet size={18} className="mt-0.5 shrink-0 text-success" aria-hidden />
            <span className="min-w-0">
              <span className="block truncate font-mono text-[12px] font-semibold text-ink">
                Trial_Balance_Draft_v2.xlsx
              </span>
              <span className="block text-[11px] text-ink-3">Mapped and reconciled</span>
            </span>
          </li>
        </ul>
      </div>

      <div className="rounded-xl border border-product/30 bg-product-soft/60 p-4">
        <div className="flex items-center justify-between">
          <p className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-[0.14em] text-product-deep uppercase">
            <Sparkles size={12} aria-hidden /> AI validation report
          </p>
          <span className="rounded-full bg-success px-2.5 py-0.5 text-[11px] font-bold text-white">Pass</span>
        </div>
        <ul className="mt-3 space-y-3">
          <li className="rounded-lg border border-line bg-white p-3">
            <p className="flex items-center gap-2 text-[13px] font-bold text-ink">
              <CircleCheck size={15} className="text-success" aria-hidden /> Balance Sheet ↔ Notes
            </p>
            <p className="mt-1 pl-6 text-[12px] text-ink-2">Cross-checked 42 line items. 100% match.</p>
          </li>
          <li className="rounded-lg border border-line bg-white p-3">
            <p className="flex items-center gap-2 text-[13px] font-bold text-ink">
              <CircleCheck size={15} className="text-success" aria-hidden /> P&amp;L recalculation
            </p>
            <p className="mt-1 pl-6 text-[12px] text-ink-2">Totals recalculated. No discrepancies found.</p>
          </li>
        </ul>
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-ink-3">
            <span>Confidence score</span>
            <span className="font-bold text-ink">98</span>
          </div>
          <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-white">
            <div className="h-full w-[98%] rounded-full bg-product" />
          </div>
        </div>
      </div>
    </div>
  );
}

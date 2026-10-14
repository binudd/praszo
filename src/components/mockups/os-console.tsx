import { BadgeCheck, CircleAlert, CircleCheck, FileSpreadsheet, FileText, Signature } from "lucide-react";

import { WindowFrame } from "@/components/mockups/window-frame";
import { ProductGlyph } from "@/components/ui/product-glyph";
import { productList } from "@/data/products";

const docs = [
  { name: "Trial_Balance_v2.xlsx", icon: FileSpreadsheet },
  { name: "Board_Minutes.pdf", icon: FileText },
  { name: "Risk_Matrix.docx", icon: FileText },
];

/**
 * Illustrative "Praszo OS" console for the corporate hero. The sample figures
 * mirror the dashboard mockup published on praszo.com.
 */
export function OsConsole() {
  return (
    <div className="relative">
      <WindowFrame title="praszo-os / engagements / OSCH Audit FY2025" className="relative z-10">
        <div className="grid grid-cols-[3.25rem_1fr] sm:grid-cols-[3.75rem_1fr]">
          <aside className="flex flex-col items-center gap-3 border-r border-line bg-surface py-4" aria-hidden>
            {productList.map((product) => (
              <span key={product.slug} className="rounded-[26%] p-1 first:bg-white first:shadow-card">
                <ProductGlyph slug={product.slug} size={26} />
              </span>
            ))}
          </aside>

          <div className="grid gap-2.5 p-3">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-white px-4 py-2.5">
              <div>
                <p className="text-[10px] font-bold tracking-[0.14em] text-ink-3 uppercase">Active engagement</p>
                <p className="mt-1 text-[15px] font-bold text-ink">OSCH Audit: FY2025</p>
              </div>
              <div className="text-right text-[11px] text-ink-3">
                <p>Due Mar 31</p>
                <p className="font-mono">#2025-09</p>
              </div>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-3">
              <div className="rounded-xl border border-line bg-white p-3">
                <p className="text-[10px] font-bold tracking-[0.12em] text-ink-3 uppercase">Budget consumed</p>
                <p className="mt-1.5 text-xl font-extrabold text-ink">72%</p>
                <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-elevated">
                  <div className="h-full w-[72%] rounded-full bg-brand" />
                </div>
              </div>
              <div className="rounded-xl border border-line bg-white p-3">
                <p className="text-[10px] font-bold tracking-[0.12em] text-ink-3 uppercase">Billable hours</p>
                <p className="mt-1.5 text-xl font-extrabold text-ink">
                  142<span className="text-base font-semibold text-ink-3"> / 200</span>
                </p>
                <p className="mt-2 text-[11px] font-semibold text-success">Efficiency: High</p>
              </div>
              <div className="rounded-xl border border-line bg-white p-3">
                <p className="text-[10px] font-bold tracking-[0.12em] text-ink-3 uppercase">WIP amount</p>
                <p className="mt-1.5 text-xl font-extrabold text-ink">$18,240</p>
                <p className="mt-2 text-[11px] text-ink-3">Unbilled, ready to invoice</p>
              </div>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold tracking-[0.12em] text-ink-3 uppercase">AI checks</p>
                  <ProductGlyph slug="verifi" size={18} />
                </div>
                <ul className="mt-2.5 space-y-1.5 text-[12px] text-ink-2">
                  <li className="flex items-center gap-2">
                    <CircleCheck size={14} className="text-success" aria-hidden /> Cross-checks: passed
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleCheck size={14} className="text-success" aria-hidden /> Ratios within variance
                  </li>
                  <li className="flex items-center gap-2">
                    <CircleAlert size={14} className="text-accent" aria-hidden /> 1 disclosure missing
                  </li>
                </ul>
              </div>
              <div className="rounded-xl border border-line bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold tracking-[0.12em] text-ink-3 uppercase">Invoices matched</p>
                  <ProductGlyph slug="match" size={18} />
                </div>
                <p className="mt-1.5 text-xl font-extrabold text-ink">842</p>
                <p className="mt-1 text-[11px] text-ink-3">3 pending review</p>
              </div>
            </div>

            <div className="grid gap-2.5 sm:grid-cols-2">
              <div className="rounded-xl border border-line bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold tracking-[0.12em] text-ink-3 uppercase">Documents</p>
                  <ProductGlyph slug="docs" size={18} />
                </div>
                <ul className="mt-2.5 space-y-1.5 text-[12px] text-ink-2">
                  {docs.map((doc) => (
                    <li key={doc.name} className="flex items-center gap-2">
                      <doc.icon size={14} className="text-ink-3" aria-hidden />
                      <span className="truncate font-mono text-[11px]">{doc.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-line bg-white p-3">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold tracking-[0.12em] text-ink-3 uppercase">Letters</p>
                  <ProductGlyph slug="modifi" size={18} />
                </div>
                <ul className="mt-2.5 space-y-1.5 text-[12px] text-ink-2">
                  <li className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      <Signature size={14} className="text-ink-3" aria-hidden /> Engagement letter
                    </span>
                    <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">Signed</span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <span className="flex items-center gap-2">
                      <Signature size={14} className="text-ink-3" aria-hidden /> Mgmt rep letter
                    </span>
                    <span className="rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-bold text-accent">Pending</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </WindowFrame>

      <div
        data-hero-float
        className="glass absolute -top-5 right-4 z-20 hidden items-center gap-3 rounded-2xl px-4 py-3 shadow-float md:flex"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#17b978]/12 text-[#0f8f5c]">
          <BadgeCheck size={18} aria-hidden />
        </span>
        <span>
          <span className="block text-[10px] font-bold tracking-[0.12em] text-ink-3 uppercase">AI Verifi score</span>
          <span className="block text-lg font-extrabold leading-tight text-ink">98</span>
        </span>
      </div>
      <div
        data-hero-float
        className="glass absolute -bottom-6 -left-3 z-20 hidden items-center gap-3 rounded-2xl px-4 py-3 shadow-float md:flex lg:-left-8"
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-soft text-brand">
          <CircleCheck size={18} aria-hidden />
        </span>
        <span>
          <span className="block text-[10px] font-bold tracking-[0.12em] text-ink-3 uppercase">Review-ready</span>
          <span className="block text-sm font-bold leading-tight text-ink">Approval logs in place</span>
        </span>
      </div>
    </div>
  );
}

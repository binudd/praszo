import { CircleAlert, CircleCheck, FileText } from "lucide-react";

const fields = [
  { field: "Vendor", invoice: "TechPro Solutions Inc.", po: "TechPro Solutions Inc.", grn: "TechPro Solutions Inc.", status: "match" },
  { field: "Reference", invoice: "INV-2024-0002", po: "PO-2024-0002", grn: "GRN-2024-0002", status: "match" },
  { field: "Quantity", invoice: "120", po: "120", grn: "120", status: "match" },
  { field: "Tax amount", invoice: "4,250.00", po: "4,180.00", grn: "—", status: "partial" },
] as const;

/** Illustrative three-way match of a purchase register row against its evidence. */
export function MatchThreeWay() {
  return (
    <div className="rounded-[1.25rem] border border-line bg-white p-4 shadow-float sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold tracking-[0.14em] text-ink-3 uppercase">Verification engine</p>
          <p className="mt-1 text-[15px] font-bold text-ink">INV-2024-0002 ↔ PO-2024-0002 ↔ GRN-2024-0002</p>
        </div>
        <span className="inline-flex items-center gap-2 rounded-full border border-product/30 bg-product-soft px-3 py-1 text-[11px] font-bold text-product-deep">
          Overall match 85% · Partial
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2" aria-hidden>
        {["Invoice", "Purchase order", "Goods receipt"].map((doc) => (
          <div key={doc} className="flex items-center gap-2 rounded-lg border border-line bg-surface px-3 py-2 text-[11px] font-semibold text-ink-2">
            <FileText size={14} className="text-product" />
            <span className="truncate">{doc}</span>
          </div>
        ))}
      </div>

      <table className="mt-3 w-full text-left text-[12px]">
        <thead>
          <tr className="border-b border-line text-[10px] tracking-[0.12em] text-ink-3 uppercase">
            <th className="py-2 pr-2 font-bold">Field</th>
            <th className="py-2 pr-2 font-bold">Invoice</th>
            <th className="hidden py-2 pr-2 font-bold sm:table-cell">PO</th>
            <th className="hidden py-2 pr-2 font-bold md:table-cell">GRN</th>
            <th className="py-2 text-right font-bold">Status</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((row) => (
            <tr key={row.field} className="border-b border-line/70 last:border-0">
              <td className="py-2.5 pr-2 font-semibold text-ink">{row.field}</td>
              <td className="py-2.5 pr-2 text-ink-2">{row.invoice}</td>
              <td className="hidden py-2.5 pr-2 text-ink-2 sm:table-cell">{row.po}</td>
              <td className="hidden py-2.5 pr-2 text-ink-2 md:table-cell">{row.grn}</td>
              <td className="py-2.5 text-right">
                {row.status === "match" ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-bold text-success">
                    <CircleCheck size={12} aria-hidden /> Match
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-product-soft px-2 py-0.5 text-[10px] font-bold text-product-deep">
                    <CircleAlert size={12} aria-hidden /> Partial
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="mt-3 text-[11px] text-ink-3">
        Tax difference within the defined threshold. Remark added for reviewer sign-off.
      </p>
    </div>
  );
}

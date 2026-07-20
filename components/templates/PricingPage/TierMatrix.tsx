import { Check, Minus } from "lucide-react";
import Eyebrow from "@/components/elements/Eyebrow";
import { TIERS } from "@/lib/config/pricing";

/** Cell value: true renders a check, false renders a muted minus, a string
 *  renders verbatim. */
type Cell = boolean | string;
type MatrixRow = { label: string; free: Cell; standard: Cell; vip: Cell; boundary?: boolean };

const ROWS: MatrixRow[] = [
  { label: "Full-catalog ordering at fixed pricing", free: true, standard: true, vip: true },
  { label: "100% white-label delivery, full commercial rights", free: true, standard: true, vip: true },
  {
    label: "Discount on every order",
    free: false,
    standard: `${Math.round(TIERS.standard.discount * 100)}%`,
    vip: `${Math.round(TIERS.vip.discount * 100)}%`,
  },
  { label: "Dedicated account manager", free: false, standard: true, vip: true },
  { label: "First response", free: "4 hrs", standard: "2 hrs", vip: "1 hr" },
  { label: "Direct Slack or WhatsApp line", free: false, standard: true, vip: true },
  { label: "Front of queue, reserved capacity", free: false, standard: false, vip: true },
  {
    label: "We speak to your clients under your brand",
    free: false,
    standard: false,
    vip: true,
    boundary: true,
  },
];

function CellView({ value, boundary }: { value: Cell; boundary?: boolean }) {
  if (value === true) {
    return (
      <Check
        size={18}
        strokeWidth={3}
        className={`mx-auto ${boundary ? "text-brand" : "text-brand"}`}
        aria-label="Included"
      />
    );
  }
  if (value === false) {
    return <Minus size={16} className="mx-auto text-foreground/25" aria-label="Not included" />;
  }
  return <span className="font-mono text-[13px] font-semibold text-foreground">{value}</span>;
}

/** The comparison matrix: where completeness lives so the tier cards can stay
 *  down to one benefit each. The Standard column carries a subtle emerald lift
 *  (presence without a "most popular" sticker) and the VIP boundary row, the
 *  program's real moat, is visually flagged. */
export default function TierMatrix() {
  return (
    <section id="gw-pricing-matrix" className="relative isolate bg-background">
      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow text="Compare tiers" />
          <h2 className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight text-foreground sm:text-4xl">
            Everything each tier includes.
          </h2>
          <p className="mt-5 text-base text-muted sm:text-lg">
            The cards name the relationship. This is the full picture, in plain
            terms, so nothing is left to guess.
          </p>
        </div>

        <div className="mt-14 overflow-x-auto">
          <table className="w-full min-w-160 border-collapse overflow-hidden rounded-2xl border border-border">
            <thead>
              <tr className="bg-surface">
                <th className="px-5 py-4 text-left font-label text-[11px] font-semibold uppercase tracking-widest text-muted">
                  What you get
                </th>
                <th className="px-5 py-4 text-center font-label text-[11px] font-semibold uppercase tracking-widest text-foreground">
                  Free
                </th>
                <th className="border-x border-brand/20 bg-brand/5 px-5 py-4 text-center font-label text-[11px] font-semibold uppercase tracking-widest text-foreground">
                  Standard
                </th>
                <th className="px-5 py-4 text-center font-label text-[11px] font-semibold uppercase tracking-widest text-foreground">
                  VIP
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr
                  key={row.label}
                  className={`border-t border-border ${row.boundary ? "bg-brand/5" : ""}`}
                >
                  <td
                    className={`px-5 py-3.5 text-sm ${
                      row.boundary ? "font-semibold text-foreground" : "text-foreground/80"
                    }`}
                  >
                    {row.label}
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <CellView value={row.free} />
                  </td>
                  <td className="border-x border-brand/20 bg-brand/5 px-5 py-3.5 text-center">
                    <CellView value={row.standard} boundary={row.boundary} />
                  </td>
                  <td className="px-5 py-3.5 text-center">
                    <CellView value={row.vip} boundary={row.boundary} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

import { Check, X } from "lucide-react";
import SectionHeader from "@/components/elements/SectionHeader";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getComparison } from "@/lib/content";

function Cell({
  value,
  accent = false,
}: {
  value: boolean | string;
  accent?: boolean;
}) {
  if (typeof value === "boolean") {
    return value ? (
      <span
        className={`inline-flex h-7 w-7 items-center justify-center rounded-full ${
          accent
            ? "bg-brand/20 text-brand"
            : "bg-white/10 text-white/40"
        }`}
      >
        <Check size={14} strokeWidth={2.5} />
      </span>
    ) : (
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-red-500/10 text-red-400">
        <X size={14} strokeWidth={2} />
      </span>
    );
  }
  return (
    <span className={accent ? "font-semibold text-brand" : "text-white/45"}>
      {value}
    </span>
  );
}

export default async function Comparison({ noPaddingTop }: { noPaddingTop?: boolean }) {
  const data = await getComparison();

  return (
    <section
      id={data.id}
      aria-labelledby={`${data.id}-headline`}
      className="relative isolate overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_80%_70%_at_50%_30%,#000_20%,transparent_85%)]" />

      <div className={`container-1200 relative ${noPaddingTop ? "pb-24 pt-0 sm:pb-32 lg:pb-40" : "py-24 sm:py-32 lg:py-40"}`}>
        <ScrollFadeIn delay={0.1}>
          <SectionHeader
            eyebrow={data.eyebrow}
            headline={data.headline.parts}
            headlineId={`${data.id}-headline`}
            sub={data.sub}
            align="center"
            headlineClassName="mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl"
            highlightClassName="bg-gradient-to-br from-brand to-[#059669] bg-clip-text text-transparent"
            underlineHighlight={false}
          />
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.3}>
          {/* Dark table */}
          <div className="mt-16 overflow-hidden rounded-2xl border border-white/10 bg-foreground shadow-2xl shadow-black/20">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="w-[28%] px-6 py-5 text-left text-xs font-semibold uppercase tracking-[0.14em] text-white/30">
                      Feature
                    </th>
                    <th className="w-[18%] border-x border-brand/25 bg-brand/10 px-6 py-5 text-center">
                      <span className="inline-flex items-center rounded-full bg-brand px-3 py-1 text-xs font-bold text-white">
                        growX
                      </span>
                    </th>
                    <th className="w-[18%] px-6 py-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/30">
                      In-House Hire
                    </th>
                    <th className="w-[18%] px-6 py-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/30">
                      Traditional Agency
                    </th>
                    <th className="w-[18%] px-6 py-5 text-center text-xs font-semibold uppercase tracking-[0.14em] text-white/30">
                      Upwork / Fiverr
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.rows.map((row, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-white/[0.06] last:border-0 transition-colors hover:bg-white/[0.03]"
                    >
                      <td className="px-6 py-4 font-medium text-white/70">
                        {row.feature}
                      </td>
                      <td className="border-x border-brand/15 bg-brand/[0.06] px-6 py-4 text-center">
                        <Cell value={row.scalify} accent />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Cell value={row.inHouse} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Cell value={row.traditional} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <Cell value={row.marketplace} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.5}>
          <div className="mx-auto mt-10 max-w-2xl rounded-2xl border border-border bg-background/70 p-8 text-center backdrop-blur-sm">
            <p className="text-sm font-semibold text-brand">The verdict</p>
            <p className="mt-3 text-lg font-semibold text-foreground">
              growX gives you the speed, quality, and cost-efficiency of a 50-person agency, without the overhead.
            </p>
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}

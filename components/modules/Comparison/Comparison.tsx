import { Check, X } from "lucide-react";
import Headline from "@/components/elements/Headline";
import { getComparison } from "@/lib/content";

export default async function Comparison({ noPaddingTop }: { noPaddingTop?: boolean }) {
  const data = await getComparison();

  return (
    <section
      id={data.id}
      aria-labelledby={`${data.id}-headline`}
      className="relative isolate overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_80%_70%_at_50%_30%,#000_20%,transparent_85%)]" />

      <div className={`container-1200 relative ${noPaddingTop ? "pt-0 pb-24 sm:pb-32 lg:pb-40" : "py-24 sm:py-32 lg:py-40"}`}>
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-brand">{data.eyebrow}</p>
          <Headline
            id={`${data.id}-headline`}
            parts={data.headline.parts}
            as="h2"
            className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl"
            highlightClassName="bg-gradient-to-br from-brand to-[#059669] bg-clip-text text-transparent"
            underlineHighlight={false}
          />
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted">{data.sub}</p>
        </div>

        <div className="mx-auto mt-16 max-w-6xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-4 text-left font-semibold text-foreground">Feature</th>
                <th className="px-4 py-4 text-center font-semibold text-brand">growX</th>
                <th className="px-4 py-4 text-center font-semibold text-foreground">Hire In-House</th>
                <th className="px-4 py-4 text-center font-semibold text-foreground">Traditional Agency</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {data.rows.map((row, idx) => (
                <tr key={idx} className="hover:bg-background/40 transition">
                  <td className="px-4 py-4 font-medium text-foreground">{row.feature}</td>
                  <td className="px-4 py-4 text-center">
                    {typeof row.scalify === "boolean" ? (
                      row.scalify ? (
                        <Check size={20} className="mx-auto text-brand" />
                      ) : (
                        <X size={20} className="mx-auto text-muted" />
                      )
                    ) : (
                      <span className="text-foreground">{row.scalify}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center text-muted">
                    {typeof row.inHouse === "boolean" ? (
                      row.inHouse ? (
                        <Check size={20} className="mx-auto text-muted" />
                      ) : (
                        <X size={20} className="mx-auto text-muted" />
                      )
                    ) : (
                      <span>{row.inHouse}</span>
                    )}
                  </td>
                  <td className="px-4 py-4 text-center text-muted">
                    {typeof row.traditional === "boolean" ? (
                      row.traditional ? (
                        <Check size={20} className="mx-auto text-muted" />
                      ) : (
                        <X size={20} className="mx-auto text-muted" />
                      )
                    ) : (
                      <span>{row.traditional}</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mx-auto mt-12 max-w-2xl rounded-2xl border border-border bg-background/70 p-8 text-center backdrop-blur-sm">
          <p className="text-sm font-semibold text-brand">The verdict</p>
          <p className="mt-3 text-lg font-semibold text-foreground">
            growX gives you the speed, quality, and cost-efficiency of a 50-person agency, without the overhead.
          </p>
        </div>
      </div>
    </section>
  );
}

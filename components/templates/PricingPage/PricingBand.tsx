import { Check } from "lucide-react";

export type BandItem = { label: string; sub?: string };

/** A thin horizontal band of fixed truths. Used twice on the pricing page: as
 *  the reframe strip under the hero (dark) that kills the three instinctive
 *  objections before they form, and again as the guarantees band lower down
 *  (light). One component, two placements, data passed in. */
export default function PricingBand({
  items,
  dark = false,
  withChecks = false,
}: {
  items: BandItem[];
  dark?: boolean;
  withChecks?: boolean;
}) {
  return (
    <section
      className={
        dark
          ? "border-b border-white/10 bg-foreground text-background"
          : "border-y border-border bg-background text-foreground"
      }
    >
      <div className="container-1200 py-8 sm:py-10">
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-3 sm:gap-4">
          {items.map((item) => (
            <li
              key={item.label}
              className="flex flex-col items-center gap-1 text-center sm:flex-row sm:items-start sm:gap-3 sm:text-left"
            >
              {withChecks && (
                <span
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${
                    dark ? "bg-brand/20" : "bg-brand/10"
                  }`}
                >
                  <Check size={12} strokeWidth={3} className="text-brand" aria-hidden="true" />
                </span>
              )}
              <span>
                <span className="block text-sm font-semibold tracking-tight sm:text-[15px]">
                  {item.label}
                </span>
                {item.sub && (
                  <span
                    className={`mt-0.5 block text-xs leading-relaxed ${
                      dark ? "text-white/55" : "text-muted"
                    }`}
                  >
                    {item.sub}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

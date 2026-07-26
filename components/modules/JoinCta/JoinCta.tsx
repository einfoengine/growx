import { Check } from "lucide-react";
import ModuleTitle from "@/components/elements/ModuleTitle";
import PlanButton from "@/components/modules/Pricing/PlanButton";

const REASONS = [
  "Founding-partner pricing before public rates settle",
  "Every deliverable ships 100% white-label",
  "Fixed prices with clear SLAs, never a quote",
  "Cancel anytime, no lock-in, no card to start",
];

/** Closing section: the reasons not to wait, plus the free-signup handoff. */
export default function JoinCta({ moduleTitle, noPaddingTop }: { moduleTitle?: string; noPaddingTop?: boolean } = {}) {
  return (
    <section
      id="gw-pricing-join"
      data-nav-theme="dark" data-dark-surface
      className="relative isolate overflow-hidden bg-foreground text-background"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-130 w-[760px] -translate-x-1/2 rounded-full bg-(--brand-soft) blur-[140px]" />
      </div>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-size-[64px_64px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000,transparent_85%)]"
      />

      <div className={`container-1200 text-center ${noPaddingTop ? "pb-24 pt-0 sm:pb-28 lg:pb-32" : "py-24 sm:py-28 lg:py-32"}`}>
        {moduleTitle && <ModuleTitle id="gw-join-cta-module-title">{moduleTitle}</ModuleTitle>}

        <ul className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-3 text-left sm:grid-cols-2">
          {REASONS.map((r) => (
            <li key={r} className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand/20">
                <Check size={12} strokeWidth={3} className="text-brand" aria-hidden="true" />
              </span>
              <span className="text-sm text-white/85">{r}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <PlanButton label="Join free" planKey="free" id="gw-plan-button-free-join" className="btn btn-brand" />
          <PlanButton label="Book a call" href="#book" className="btn btn-secondary-dark" />
        </div>
      </div>
    </section>
  );
}

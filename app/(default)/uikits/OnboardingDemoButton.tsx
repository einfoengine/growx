"use client";

/** Fires the same window event the pricing PlanButtons use, so the globally
 *  mounted OnboardingModal opens. Client-only because it dispatches on click. */
export default function OnboardingDemoButton() {
  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("open-onboarding", { detail: { plan: "free" } }),
        )
      }
      className="inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-black transition-colors hover:bg-brand-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
    >
      Open onboarding modal
    </button>
  );
}

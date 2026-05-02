"use client";

export default function PricingCTA({
  planKey,
  label,
  highlighted,
}: {
  planKey: string;
  label: string;
  highlighted?: boolean;
}) {
  function open() {
    window.dispatchEvent(
      new CustomEvent("open-onboarding", { detail: { plan: planKey } })
    );
  }

  return (
    <button
      type="button"
      onClick={open}
      className={`mt-8 w-full rounded-full py-3 text-center text-sm font-medium transition ${
        highlighted
          ? "bg-brand text-background hover:bg-brand/90"
          : "border border-border text-foreground hover:border-foreground/20 hover:bg-black/5"
      }`}
    >
      {label}
    </button>
  );
}

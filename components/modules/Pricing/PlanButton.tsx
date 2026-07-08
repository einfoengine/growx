"use client";

import Link from "next/link";

type Props = {
  label: string;
  className: string;
  /** Opens the onboarding modal for this plan key (free | standard | vip). */
  planKey?: string;
  /** Renders a link instead (e.g. "#book" to open the booking modal). */
  href?: string;
};

/** Pricing CTA. Fires the shared `open-onboarding` event for plan sign-ups, or
 *  renders a link (used for the VIP "book a call" flow via #book). */
export default function PlanButton({ label, className, planKey, href }: Props) {
  if (href) {
    return (
      <Link href={href} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={() =>
        window.dispatchEvent(
          new CustomEvent("open-onboarding", { detail: { plan: planKey } }),
        )
      }
      className={className}
    >
      {label}
    </button>
  );
}

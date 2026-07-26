"use client";

import Link from "next/link";

type Props = {
  label: string;
  className: string;
  /** Opens the onboarding modal for this plan key (free | standard | vip). */
  planKey?: string;
  /** Renders a link instead (e.g. "#book" to open the booking modal). */
  href?: string;
  /** Explicit DOM id. Falls back to one derived from planKey/href/label —
   *  callers can override to keep ids unique when several buttons share a plan. */
  id?: string;
};

/** Pricing CTA. Fires the shared `open-onboarding` event for plan sign-ups, or
 *  renders a link (used for the VIP "book a call" flow via #book). */
export default function PlanButton({ label, className, planKey, href, id }: Props) {
  const rootId =
    id ??
    `gw-plan-button-${(planKey ?? href ?? label)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")}`;

  if (href) {
    return (
      <Link href={href} id={rootId} className={className}>
        {label}
      </Link>
    );
  }

  return (
    <button
      type="button"
      id={rootId}
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

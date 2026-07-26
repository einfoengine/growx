"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Check, X } from "lucide-react";
import { useModalA11y } from "@/lib/hooks/useModalA11y";
import pricingData from "@/data/modules/pricing.json";

type PlanShape = {
  name: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
};

/** Condensed feature lines for the modal — deliberately shorter than the full
 *  list on the pricing cards, since this is a confirmation step and not the
 *  place to re-sell the tier. Keyed by tier name, lowercased. */
const PLAN_HIGHLIGHTS: Record<string, string[]> = {
  free: [
    "One-click portal ordering",
    "Standard fixed pricing",
    "100% white-label, full rights",
    "First response in 4 business hours",
    "Partner resource library",
  ],
  standard: [
    "Everything in Free",
    "Dedicated account manager",
    "10% partner discount",
    "2-hour response, priority queue",
    "White-label sales enablement kit",
  ],
  vip: [
    "Everything in Standard",
    "White-label client project manager",
    "15% partner discount",
    "1-hour response, front of queue",
    "Guaranteed monthly capacity",
  ],
};

/** Names and prices come from data/modules/pricing.json — the same source the
 *  pricing cards read — so a tier can never be renamed or repriced on the cards
 *  while this modal keeps quoting the old value. */
const PLANS: Record<string, PlanShape> = Object.fromEntries(
  pricingData.tiers.map((tier) => {
    const key = tier.name.toLowerCase();
    return [
      key,
      {
        name: tier.name,
        price: `${tier.price} / mo`,
        description: tier.description,
        features: PLAN_HIGHLIGHTS[key] ?? tier.features,
        badge: "highlighted" in tier && tier.highlighted ? "Most Popular" : undefined,
      },
    ];
  }),
);

const FIELD_CLASS =
  "w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors focus:border-brand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text";

/** Visual asterisk for sighted users; screen readers get real words instead. */
function RequiredMark() {
  return (
    <>
      <span aria-hidden="true" className="text-brand">*</span>
      <span className="sr-only">(required)</span>
    </>
  );
}

type PlanData = (typeof PLANS)[string];

type OnboardingEventDetail = {
  plan?: string;
  customPlan?: PlanData;
  /** Optional order context (e.g. the checkout cart summary) carried into the
   *  email fallback so nothing the visitor assembled is lost. */
  context?: string;
};

/** "unavailable" is the honest end state: there's no intake backend to submit to. */
type FormState = "idle" | "unavailable";

export default function OnboardingModal() {
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");
  // What the visitor typed (plus any order context from checkout), preserved
  // so the email fallback carries it — never make them retype their answers.
  const [intake, setIntake] = useState<Record<string, string>>({});

  // Escape, Tab trap, focus move/restore and the body scroll lock all live here.
  const panelRef = useModalA11y<HTMLDivElement>({
    open: plan !== null,
    onClose: close,
  });

  // Listen for the custom event fired by PricingCTA buttons and the pricing calculator
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<OnboardingEventDetail>).detail;
      const resolved = detail?.customPlan ?? (detail?.plan ? PLANS[detail.plan] : null);
      if (resolved) {
        setPlan(resolved);
        setFormState("idle");
        setIntake(detail?.context ? { context: detail.context } : {});
      }
    };
    window.addEventListener("open-onboarding", handler);
    return () => window.removeEventListener("open-onboarding", handler);
  }, []);

  function close() {
    setPlan(null);
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: POST the intake form to a real endpoint here, then surface a genuine
    // confirmation. Until one exists there is nothing to submit to, so point the
    // user at an inbox a human actually reads instead of faking a receipt.
    // The typed answers are captured so the email fallback carries them.
    const fd = new FormData(e.currentTarget);
    const typed: Record<string, string> = {};
    fd.forEach((v, k) => {
      if (typeof v === "string" && v.trim()) typed[k] = v.trim();
    });
    setIntake((prev) => ({ ...prev, ...typed }));
    setFormState("unavailable");
  };

  return (
    <AnimatePresence>
      {plan && (
        <div id="gw-onboarding-modal" className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-modal-title"
            tabIndex={-1}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="relative z-10 w-full max-w-2xl max-h-[90dvh] overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl focus:outline-none"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-black/5 hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text"
            >
              <X size={18} />
            </button>

            {formState === "unavailable" ? (
              <UnavailableState plan={plan} intake={intake} onClose={close} />
            ) : (
              <>
                {/* Plan header */}
                <div className="border-b border-border px-8 py-6">
                  <div className="flex items-start gap-6">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                          {plan.name} Plan
                        </span>
                        {plan.badge && (
                          <span className="rounded-full bg-gradient-brand px-2.5 py-0.5 text-xs font-semibold text-black">
                            {plan.badge}
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
                        {plan.price}
                      </p>
                      <p className="mt-0.5 text-sm text-muted">{plan.description}</p>
                    </div>
                    <ul className="hidden sm:flex flex-col gap-1.5">
                      {plan.features.map((f) => (
                        <li key={f} className="flex items-center gap-1.5 text-xs text-muted">
                          <Check size={11} className="text-brand shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Intake form */}
                <form onSubmit={handleSubmit} className="space-y-5 px-8 py-7">
                  <div>
                    <h2
                      id="onboarding-modal-title"
                      className="text-lg font-semibold text-foreground"
                    >
                      Let&apos;s get you set up
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      Tell us what you need and we&apos;ll take it from there.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="onboarding-name" className="text-xs font-medium text-foreground">
                        Full Name <RequiredMark />
                      </label>
                      <input required type="text" id="onboarding-name" name="name" placeholder="Jane Smith"
                        className={FIELD_CLASS}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="onboarding-email" className="text-xs font-medium text-foreground">
                        Email Address <RequiredMark />
                      </label>
                      <input required type="email" id="onboarding-email" name="email" placeholder="jane@youragency.com"
                        className={FIELD_CLASS}
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label htmlFor="onboarding-company" className="text-xs font-medium text-foreground">
                        Agency / Company <RequiredMark />
                      </label>
                      <input required type="text" id="onboarding-company" name="company" placeholder="Apex Digital"
                        className={FIELD_CLASS}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="onboarding-phone" className="text-xs font-medium text-foreground">
                        Phone Number
                      </label>
                      <input type="tel" id="onboarding-phone" name="phone" placeholder="+1 (555) 000-0000"
                        className={FIELD_CLASS}
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor="onboarding-handoff" className="text-xs font-medium text-foreground">
                      What do you most want to hand off?
                    </label>
                    <textarea rows={3} id="onboarding-handoff" name="handoff"
                      placeholder="e.g. We have 3 website builds queued and need them delivered within 6 weeks..."
                      className={`${FIELD_CLASS} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-xl bg-gradient-brand px-4 py-3.5 text-sm font-semibold text-black transition-all hover:brightness-110 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text"
                  >
                    Continue to scheduling
                  </button>

                  <p className="text-center text-xs text-muted">
                    No payment required now. Your account is set up on a short
                    onboarding call.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * Post-submit step: routes the signup into the LIVE booking calendar (the
 * `#book` link is caught by BookingModal's global listener, which opens the
 * embedded HighLevel calendar) — so the flow ends in a real CRM booking, not a
 * dead end. Email stays as the fallback for people who hate calendars.
 * TODO(launch): once the portal is live, submit paid tiers straight to
 * PORTAL_SIGNUP_URL (lib/config/conversion.ts) instead of the call.
 */
function UnavailableState({
  plan,
  intake,
  onClose,
}: {
  plan: (typeof PLANS)[string];
  intake: Record<string, string>;
  onClose: () => void;
}) {
  // The email fallback carries everything the visitor already typed, so
  // choosing email over the calendar never means starting over.
  const LABELS: Record<string, string> = {
    name: "Name",
    email: "Email",
    company: "Agency / Company",
    phone: "Phone",
    handoff: "What they want to hand off",
    context: "Order draft",
  };
  const bodyLines = [
    `Plan: ${plan.name}`,
    ...Object.entries(intake)
      .filter(([k]) => LABELS[k])
      .map(([k, v]) => `${LABELS[k]}: ${v}`),
  ];
  const mailtoHref = `mailto:hi@growx.studio?subject=${encodeURIComponent(
    `${plan.name} plan enquiry`,
  )}&body=${encodeURIComponent(bodyLines.join("\n"))}`;

  return (
    <div
      role="status"
      className="flex flex-col items-center gap-5 px-8 py-14 text-center"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
        <Calendar size={28} className="text-brand-text" aria-hidden="true" />
      </div>
      <div>
        <h2 id="onboarding-modal-title" className="text-2xl font-semibold text-foreground">
          One step left: pick your onboarding time
        </h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          Lock in a 30-minute call with our founding team and mention the{" "}
          {plan.name} plan. We set up your account on the call, so you leave
          with everything running.
        </p>
      </div>
      <a
        href="#book"
        onClick={onClose}
        className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-7 py-3 text-sm font-semibold text-black transition-[filter] hover:brightness-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text"
      >
        <Calendar size={16} aria-hidden="true" />
        Book your onboarding call
      </a>
      <p className="text-xs text-muted">
        Prefer email?{" "}
        <a
          href={mailtoHref}
          className="font-medium text-brand-text underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-text"
        >
          hi@growx.studio
        </a>{" "}
        reaches the same team.
      </p>
    </div>
  );
}

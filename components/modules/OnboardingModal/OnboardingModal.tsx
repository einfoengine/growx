"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X } from "lucide-react";

const PLANS: Record<string, {
  name: string;
  price: string;
  description: string;
  features: string[];
  badge?: string;
}> = {
  starter: {
    name: "Starter",
    price: "$2,500 / mo",
    description: "Perfect for agencies getting started with outsourcing.",
    features: [
      "1–3 projects per month",
      "Website design (basic)",
      "SEO audit & recommendations",
      "Monthly check-in calls",
      "Unlimited revisions",
    ],
  },
  pro: {
    name: "Pro",
    price: "$6,500 / mo",
    description: "Our most popular option for scaling agencies.",
    features: [
      "4–8 projects per month",
      "Full website design & development",
      "SEO + content strategy",
      "Weekly calls + Slack support",
      "Priority scheduling",
    ],
    badge: "Most Popular",
  },
};

type PlanData = (typeof PLANS)[string];

type OnboardingEventDetail = {
  plan?: string;
  customPlan?: PlanData;
};

type FormState = "idle" | "submitting" | "success";

export default function OnboardingModal() {
  const [plan, setPlan] = useState<PlanData | null>(null);
  const [formState, setFormState] = useState<FormState>("idle");

  // Listen for the custom event fired by PricingCTA buttons and the pricing calculator
  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent<OnboardingEventDetail>).detail;
      const resolved = detail?.customPlan ?? (detail?.plan ? PLANS[detail.plan] : null);
      if (resolved) {
        setPlan(resolved);
        setFormState("idle");
        document.body.style.overflow = "hidden";
      }
    };
    window.addEventListener("open-onboarding", handler);
    return () => window.removeEventListener("open-onboarding", handler);
  }, []);

  // Close on Escape
  useEffect(() => {
    if (!plan) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") close(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [plan]);

  function close() {
    setPlan(null);
    document.body.style.overflow = "unset";
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    // Replace with real API call
    setTimeout(() => setFormState("success"), 1200);
  };

  return (
    <AnimatePresence>
      {plan && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6">
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
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="relative z-10 w-full max-w-2xl max-h-[90dvh] overflow-y-auto rounded-2xl border border-border bg-background shadow-2xl"
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full text-muted hover:bg-black/5 hover:text-foreground transition-colors"
            >
              <X size={18} />
            </button>

            {formState === "success" ? (
              <SuccessState plan={plan} onClose={close} />
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
                          <span className="rounded-full bg-brand px-2.5 py-0.5 text-xs font-semibold text-black">
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
                    <h2 className="text-lg font-semibold text-foreground">
                      Let&apos;s get you set up
                    </h2>
                    <p className="mt-1 text-sm text-muted">
                      Fill in your details and our team will reach out within 4 hours to kick things off.
                    </p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">
                        Full Name <span className="text-brand">*</span>
                      </label>
                      <input required type="text" placeholder="Jane Smith"
                        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">
                        Email Address <span className="text-brand">*</span>
                      </label>
                      <input required type="email" placeholder="jane@youragency.com"
                        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">
                        Agency / Company <span className="text-brand">*</span>
                      </label>
                      <input required type="text" placeholder="Apex Digital"
                        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-medium text-foreground">
                        Phone Number
                      </label>
                      <input type="tel" placeholder="+1 (555) 000-0000"
                        className="w-full rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-foreground">
                      What do you most want to hand off?
                    </label>
                    <textarea rows={3}
                      placeholder="e.g. We have 3 website builds queued and need them delivered within 6 weeks…"
                      className="w-full resize-none rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="w-full rounded-xl bg-brand px-4 py-3.5 text-sm font-semibold text-black transition-all hover:bg-[#059669] hover:scale-[1.01] disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {formState === "submitting" ? "Sending…" : `Place Order — ${plan.name}`}
                  </button>

                  <p className="text-center text-xs text-muted">
                    No payment required now. Our team will contact you within 4 hours to confirm and set up your workspace.
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

function SuccessState({
  plan,
  onClose,
}: {
  plan: (typeof PLANS)[string];
  onClose: () => void;
}) {
  return (
    <div className="flex flex-col items-center gap-5 px-8 py-14 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-brand/10">
        <Check size={28} className="text-brand" />
      </div>
      <div>
        <h2 className="text-2xl font-semibold text-foreground">You&apos;re on the list!</h2>
        <p className="mx-auto mt-2 max-w-sm text-sm text-muted">
          We&apos;ve received your {plan.name} plan request. Expect a message from our team
          within 4 hours to confirm your workspace and kick off your first project.
        </p>
      </div>
      <div className="w-full rounded-xl border border-border bg-surface px-6 py-4 text-left">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-brand">
          What happens next
        </p>
        <ol className="space-y-2.5">
          {[
            "Our team reviews your submission and confirms fit",
            "You receive a workspace invite and onboarding doc",
            "First project kicks off within 48 hours",
          ].map((step, i) => (
            <li key={i} className="flex items-start gap-3 text-sm text-muted">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </div>
      <button
        onClick={onClose}
        className="rounded-full border border-border px-6 py-2.5 text-sm font-medium text-foreground transition hover:bg-surface"
      >
        Close
      </button>
    </div>
  );
}

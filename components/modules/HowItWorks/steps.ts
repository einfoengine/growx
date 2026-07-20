/** The four-step "how it works" story, shared by the home-page HowItWorks
 *  timeline and the hero's HowItWorksModal so the two can never drift.
 *
 *  Sequenced to the real partner journey: call first (accounts are activated
 *  on the onboarding call while the portal signup is pre-launch), then
 *  membership, then per-project orders, then white-label delivery tracked in
 *  the portal. */
export type HowItWorksStep = { n: string; title: string; desc: string };

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    n: "01",
    title: "Book a partner call",
    desc: "30 minutes with our founding team. We map what you are fulfilling today, where it hurts, and set up your partner account on the call.",
  },
  {
    n: "02",
    title: "Pick your membership",
    desc: "Free, Standard, or VIP. The membership buys the team and your standing discount. The work itself is always ordered per project.",
  },
  {
    n: "03",
    title: "Order at fixed prices",
    desc: "Pick a service from the catalog. Fixed scope, fixed price, clear SLA. No back-and-forth quotes, ever.",
  },
  {
    n: "04",
    title: "We deliver under your brand",
    desc: "Our in-house team produces it while you track every order and its status in your portal. Your client only ever sees you.",
  },
];

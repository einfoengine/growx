/** The four-step "how it works" story, shared by the home-page HowItWorks
 *  timeline and the hero's HowItWorksModal so the two can never drift. */
export type HowItWorksStep = { n: string; title: string; desc: string };

export const HOW_IT_WORKS_STEPS: HowItWorksStep[] = [
  {
    n: "01",
    title: "Join free",
    desc: "Create your free partner account. Full portal access to the entire catalog, no commitment and no card.",
  },
  {
    n: "02",
    title: "Order in one click",
    desc: "Pick a service from the catalog. Fixed scope, fixed price, clear SLA. No back-and-forth quotes.",
  },
  {
    n: "03",
    title: "We produce",
    desc: "Our in-house team builds it to spec. Track every order in the portal, or let your account manager drive it.",
  },
  {
    n: "04",
    title: "Deliver under your brand",
    desc: "Every deliverable ships 100% white-label with full commercial rights. Your client only ever sees you.",
  },
];

import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import Eyebrow from "@/components/elements/Eyebrow";

type Step = { n: string; title: string; desc: string };

const STEPS: Step[] = [
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

export default function HowItWorks() {
  return (
    <section
      id="gw-mod-how-it-works"
      aria-labelledby="how-it-works-headline"
      data-nav-theme="dark"
      className="relative isolate overflow-hidden bg-foreground text-background"
    >
      {/* Soft brand glow. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-72 w-300 max-w-none -translate-x-1/2 bg-brand/8 blur-[130px]"
      />

      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        {/* Header */}
        <ScrollFadeIn delay={0.1}>
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow text="How it works" />
          <h2
            id="how-it-works-headline"
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            From one-click order to shipped.
          </h2>
          <p className="mt-5 text-base text-white/70 sm:text-lg">
            No quotes to chase, no vendors to manage. A productized workflow built
            for agencies juggling multiple client timelines.
          </p>
        </div>
        </ScrollFadeIn>

        {/* Steps */}
        <ScrollFadeIn delay={0.2}>
        <ol className="relative mt-16 grid gap-y-12 lg:mt-20 lg:grid-cols-4 lg:gap-x-8">
          {/* Connector line through the number badges (desktop). */}
          <div
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-8 hidden h-px bg-white/15 lg:block"
          />
          {STEPS.map((step) => (
            <li
              key={step.n}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex h-16 w-16 items-center justify-center border border-brand/40 bg-foreground text-2xl font-bold text-brand">
                {step.n}
              </div>
              <h3 className="mt-6 text-xl font-bold tracking-tight">
                {step.title}
              </h3>
              <p className="mt-2.5 max-w-xs text-sm leading-relaxed text-white/70 sm:text-base">
                {step.desc}
              </p>
            </li>
          ))}
        </ol>
        </ScrollFadeIn>
      </div>
    </section>
  );
}

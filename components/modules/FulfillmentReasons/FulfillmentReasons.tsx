import { ArrowUpRight, X } from "lucide-react";

type Reason = {
  n: string;
  title: string;
  desc: string;
  points: string[];
};

/** The four ways fulfillment quietly caps agency growth — the problem growX
 *  removes. Each is a flip card: front states the reason, back reveals the
 *  day-to-day cost. (Condensed from five — the freelancer and margin problems
 *  are the same freelancer/vendor patchwork, so they're merged.) */
const REASONS: Reason[] = [
  {
    n: "01",
    title: "Capacity, not demand",
    desc: "You win work faster than you can deliver it. Fulfillment, not sales, is what caps how big you get.",
    points: [
      "Turning away clients you could easily close",
      "Rushed delivery churning the clients you have",
      "No way to scale past your team's ceiling",
    ],
  },
  {
    n: "02",
    title: "The freelancer tax",
    desc: "Unreliable contractors and creeping costs eat your margin — and every freelancer is a crack in your white-label promise.",
    points: [
      "Quality and turnaround you can never predict",
      "Unpredictable vendor costs shrinking every job",
      "Hours lost managing a patchwork of contractors",
    ],
  },
  {
    n: "03",
    title: "A menu you can't fulfill",
    desc: "Clients ask for SEO, video, funnels, a CRM build. You say no, or scramble to learn it overnight.",
    points: [
      "Losing accounts to full-service agencies",
      "Leaving upsell revenue on the table",
      "Learning a new skill just to ship one project",
    ],
  },
  {
    n: "04",
    title: "Fulfillment eats the founder",
    desc: "Sales, delivery, client comms, ops — all on you. Something is about to break, and it's usually you.",
    points: [
      "80-hour weeks just to keep the lights on",
      "Zero time left to actually grow the business",
      "Burnout from wearing every hat you own",
    ],
  },
];

export default function FulfillmentReasons() {
  return (
    <section
      id="gw-mod-fulfillment-reasons"
      aria-labelledby="fulfillment-reasons-headline"
      data-nav-theme="dark"
      className="relative isolate overflow-hidden bg-foreground text-background"
    >
      {/* Soft brand glow to break up the dark field. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-72 w-[1200px] max-w-none -translate-x-1/2 bg-brand/8 blur-[130px]"
      />

      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow text-brand">Grow limitless</p>
          <h2
            id="fulfillment-reasons-headline"
            className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl"
          >
            Fulfillment is no longer a challenge
          </h2>
          <p className="mt-5 text-base text-white/70 sm:text-lg">
            Four reasons fulfillment quietly caps how big you can get — hover a
            card to see what each one costs you.
          </p>
        </div>

        <ul className="mx-auto mt-16 grid max-w-5xl gap-5 sm:grid-cols-2">
          {REASONS.map((reason) => (
            <li
              key={reason.n}
              tabIndex={0}
              aria-label={`Reason ${reason.n}: ${reason.title}`}
              className="group h-72 [perspective:1400px] focus:outline-none"
            >
              {/* Flip track — rotates on hover or keyboard focus. */}
              <div className="relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:transform-[rotateY(180deg)] group-focus-within:transform-[rotateY(180deg)]">
                {/* Front */}
                <div className="absolute inset-0 flex flex-col justify-between border border-white/10 bg-white/[0.04] p-8 [backface-visibility:hidden]">
                  <span className="font-label text-sm font-bold tracking-[0.2em] text-brand/70">
                    Reason {reason.n}
                  </span>
                  <div>
                    <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
                      {reason.title}
                    </h3>
                    <p className="mt-3 text-sm text-white/70 sm:text-base">
                      {reason.desc}
                    </p>
                  </div>
                  <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-white/40">
                    What it costs you
                    <ArrowUpRight size={14} />
                  </span>
                </div>

                {/* Back */}
                <div className="absolute inset-0 flex flex-col justify-center border border-brand/30 bg-brand/[0.06] p-8 [backface-visibility:hidden] transform-[rotateY(180deg)]">
                  <span className="font-label text-sm font-bold tracking-[0.2em] text-brand/70">
                    What it costs you
                  </span>
                  <ul className="mt-5 space-y-3">
                    {reason.points.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <X
                          size={16}
                          strokeWidth={3}
                          className="mt-0.5 shrink-0 text-rose-400/70"
                        />
                        <span className="text-sm text-white/75 sm:text-base">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

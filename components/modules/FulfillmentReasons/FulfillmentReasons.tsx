import ReasonCard, { type Reason } from "./ReasonCard";

/** The four ways fulfillment quietly caps agency growth — the problem growX
 *  removes. Each card tilts in 3D, its image zooms, and the copy pushes up to
 *  reveal the day-to-day cost. (Condensed from five — the freelancer and margin
 *  problems are the same freelancer/vendor patchwork, so they're merged.) */
const REASONS: Reason[] = [
  {
    n: "01",
    title: "Capacity, not demand",
    desc: "You win work faster than you can deliver it. Fulfillment, not sales, is what caps how big you get.",
    image: "/assets/gw-mod-fulfillment-reasons/1.png",
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
    image: "/assets/gw-mod-fulfillment-reasons/2.png",
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
    image: "/assets/gw-mod-fulfillment-reasons/3.png",
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
    image: "/assets/gw-mod-fulfillment-reasons/4.png",
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
      {/* Ambient section background video, darkened so content stays legible. */}
      <video
        aria-hidden="true"
        autoPlay
        loop
        muted
        playsInline
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
        src="/assets/gw-mod-fulfillment-reasons/299638.mov"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-foreground/80"
      />

      {/* Soft brand glow to break up the dark field. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-72 w-300 max-w-none -translate-x-1/2 bg-brand/8 blur-[130px]"
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
            <ReasonCard key={reason.n} reason={reason} />
          ))}
        </ul>
      </div>
    </section>
  );
}

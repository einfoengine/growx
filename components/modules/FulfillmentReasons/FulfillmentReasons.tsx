"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Check } from "lucide-react";
import {
  useActiveWhenVisible,
  useMediaQuery,
  usePrefersReducedMotion,
} from "@/lib/hooks/useActiveWhenVisible";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import Eyebrow from "@/components/elements/Eyebrow";

type Reason = {
  n: string;
  title: string;
  desc: string;
  image: string;
  points: string[];
};

/** The four ways fulfillment quietly caps agency growth — the problem growX
 *  removes. Presented as a pinned horizontal walk-through: the section holds
 *  the screen while scroll slides the numbered cards in one after another,
 *  with a progress bar tracking the run. (Condensed from five — the
 *  freelancer and margin problems are the same freelancer/vendor patchwork,
 *  so they're merged.) */
const REASONS: Reason[] = [
  {
    n: "01",
    title: "Capacity, not demand",
    desc: "You win work faster than you can deliver it. Fulfillment, not sales, is what caps how big you get.",
    image: "/assets/gw-mod-fulfillment-reasons/1.webp",
    points: [
      "Turning away clients you could easily close",
      "Rushed delivery churning the clients you have",
      "No way to scale past your team's ceiling",
    ],
  },
  {
    n: "02",
    title: "The freelancer tax",
    desc: "Unreliable contractors and creeping costs eat your margin, and every freelancer is a crack in your white-label promise.",
    image: "/assets/gw-mod-fulfillment-reasons/2.webp",
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
    image: "/assets/gw-mod-fulfillment-reasons/3.webp",
    points: [
      "Losing accounts to full-service agencies",
      "Leaving upsell revenue on the table",
      "Learning a new skill just to ship one project",
    ],
  },
  {
    n: "04",
    title: "Fulfillment eats the founder",
    desc: "Sales, delivery, client comms, ops. All on you. Something is about to break, and it's usually you.",
    image: "/assets/gw-mod-fulfillment-reasons/4.webp",
    points: [
      "80-hour weeks just to keep the lights on",
      "Zero time left to actually grow the business",
      "Burnout from wearing every hat you own",
    ],
  },
];

function ReasonSlide({ reason }: { reason: Reason }) {
  return (
    <article
      aria-labelledby={`fulfillment-reason-${reason.n}-title`}
      className="relative flex w-[min(85vw,540px)] shrink-0 flex-col overflow-hidden rounded-3xl border border-white/10 p-7 sm:p-9"
    >
      {/* The reason's image works as the card's dimmed backdrop, with a scrim
          keeping the copy legible over it. */}
      <Image
        src={reason.image}
        alt=""
        fill
        sizes="540px"
        className="-z-20 object-cover opacity-20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-foreground/90 via-foreground/55 to-foreground/25"
      />

      {/* Decorative oversized numeral — the card's index, not content. */}
      <span
        aria-hidden="true"
        className="block text-6xl font-extrabold leading-none tracking-tight text-white sm:text-7xl"
      >
        {reason.n}
      </span>
      <h3
        id={`fulfillment-reason-${reason.n}-title`}
        className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl"
      >
        {reason.title}
      </h3>
      <p className="mt-3 text-base text-white/70 sm:text-lg">{reason.desc}</p>
      <ul className="mt-8 space-y-2.5">
        {reason.points.map((point) => (
          <li key={point} className="flex items-start gap-2.5 text-sm sm:text-base">
            <Check
              size={16}
              strokeWidth={3}
              aria-hidden="true"
              className="mt-1 shrink-0 text-brand"
            />
            <span className="text-white/80">{point}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

type Geom = {
  travel: number;
  windowWidth: number;
  cardWidth: number;
  stride: number;
};

/** One card in the pinned row, revealed by its real position: it fades, rises,
 *  and scales up as its left edge slides in from the right window edge, so the
 *  entrance stays locked to the horizontal scroll rather than a timer. */
function PinnedCard({
  reason,
  index,
  progress,
  geom,
}: {
  reason: Reason;
  index: number;
  progress: MotionValue<number>;
  geom: Geom;
}) {
  const { travel, windowWidth, cardWidth, stride } = geom;
  // Symmetric visibility across a card's whole pass. `enter` keys to the right
  // window edge (fades in as the card slides in); `exit` keys to the left
  // window edge (fades out the same way as it slides off). The card is only
  // fully shown when both are satisfied, so entrance and departure mirror.
  // Before geometry is measured, treat as fully shown.
  const fraction = (p: number) => {
    if (travel <= 0 || windowWidth <= 0 || cardWidth <= 0) return 1;
    const screenLeft = index * stride - p * travel;
    const span = cardWidth * 0.7;
    const enter = (windowWidth - screenLeft) / span;
    const exit = (span + screenLeft) / span;
    return Math.min(1, Math.max(0, Math.min(enter, exit)));
  };
  const opacity = useTransform(progress, (p) => 0.15 + 0.85 * fraction(p));
  const scale = useTransform(progress, (p) => 0.9 + 0.1 * fraction(p));
  const y = useTransform(progress, (p) => (1 - fraction(p)) * 48);

  return (
    <motion.div style={{ opacity, scale, y }} className="shrink-0">
      <ReasonSlide reason={reason} />
    </motion.div>
  );
}

/** Desktop pinned stage. Lives in its own component so it only MOUNTS when
 *  the pinned branch renders: framer's useScroll binds its target ref once on
 *  mount, so setting it up in the parent (which first renders the mobile
 *  branch while the media query hydrates) left it tracking a null target and
 *  the slide never mapped to the runway. */
function PinnedReasons({
  background,
  header,
}: {
  background: React.ReactNode;
  header: React.ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null); // tall scroll runway
  const rowRef = useRef<HTMLDivElement>(null); // horizontal card row
  const [geom, setGeom] = useState<Geom>({
    travel: 0,
    windowWidth: 0,
    cardWidth: 0,
    stride: 0,
  });

  // Slide distance = the row's hidden overflow (measured on the row itself so
  // the container padding is already accounted for). Card width + gap give
  // each card's position, used for its scroll-linked reveal.
  useEffect(() => {
    const measure = () => {
      const row = rowRef.current;
      if (!row) return;
      const first = row.children[0] as HTMLElement | undefined;
      const cardWidth = first?.offsetWidth ?? 0;
      const gap = 24; // gap-6
      setGeom({
        travel: Math.max(0, row.scrollWidth - row.clientWidth),
        windowWidth: row.clientWidth,
        cardWidth,
        stride: cardWidth + gap,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  // Transform-only slide: layout never changes, so nothing below the section
  // shifts while scrolling (see the header-flicker fix in HeroVideoPerspective).
  const x = useTransform(scrollYProgress, [0, 1], [0, -geom.travel]);

  return (
    // Runway = one viewport plus the horizontal distance, so scroll and
    // slide move 1:1 from the first card to the last.
    <div
      ref={trackRef}
      className="relative"
      style={{ height: `calc(100vh + ${geom.travel}px)` }}
    >
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        {background}
        <div className="container-1200 w-full">{header}</div>
        {/* Padded container defines the content edges; the inner div does the
            clipping so the row starts and clips at the padded content edge
            (not the padding box), keeping cards inside the container. */}
        <div className="container-1200 mt-12 w-full">
          <div className="overflow-hidden">
            <motion.div ref={rowRef} style={{ x }} className="flex gap-6">
              {REASONS.map((reason, i) => (
                <PinnedCard
                  key={reason.n}
                  reason={reason}
                  index={i}
                  progress={scrollYProgress}
                  geom={geom}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FulfillmentReasons() {
  const videoRef = useRef<HTMLVideoElement>(null);
  // Only decode while the section is actually on-screen and the tab is active.
  const active = useActiveWhenVisible(videoRef);

  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduceMotion = usePrefersReducedMotion();
  // The pin is desktop-only geometry; reduced-motion users get the plain flow.
  const pinned = isDesktop && !reduceMotion;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (active) {
      // Autoplay can reject (e.g. Low Power Mode); it's decorative, so ignore.
      void video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, [active]);

  // Shared background: ambient video, darkening overlay, brand glow.
  const background = (
    <>
      <video
        ref={videoRef}
        aria-hidden="true"
        loop
        muted
        playsInline
        preload="none"
        poster="/assets/gw-mod-fulfillment-reasons/amb-poster.webp"
        className="pointer-events-none absolute inset-0 -z-20 h-full w-full object-cover"
      >
        <source src="/assets/gw-mod-fulfillment-reasons/amb.webm" type="video/webm" />
        <source src="/assets/gw-mod-fulfillment-reasons/amb.mp4" type="video/mp4" />
      </video>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-foreground/80"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-72 w-300 max-w-none -translate-x-1/2 bg-brand/8 blur-[130px]"
      />
    </>
  );

  const header = (
    <ScrollFadeIn delay={0.1}>
      <div className="mx-auto max-w-3xl text-center">
        <Eyebrow text="The real bottleneck" />
        {/* Problem framing (the signature hook) followed by the one-line
            resolution turn, so nobody leaves the headline without the answer. */}
        <h2
          id="fulfillment-reasons-headline"
          className="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
        >
          Fulfillment eats the founders.
        </h2>
        <p className="mt-4 text-lg font-semibold text-gradient-brand sm:text-xl">
          We take it off your plate and make it the reason you thrive.
        </p>
        <p className="mt-4 text-base text-white/70 sm:text-lg">
          Now sale more, close more, grow more.
        </p>
      </div>
    </ScrollFadeIn>
  );

  return (
    <section
      id="gw-mod-fulfillment-reasons"
      aria-labelledby="fulfillment-reasons-headline"
      data-nav-theme="dark"
      className="relative isolate overflow-clip bg-foreground text-background"
    >
      {pinned ? (
        <PinnedReasons background={background} header={header} />
      ) : (
        // Mobile / reduced motion: plain vertical flow of the same cards.
        <div className="relative py-24 sm:py-28 lg:py-32">
          {background}
          <div className="container-1200">
            {header}
            <div className="mt-14 flex flex-col items-center gap-6">
              {REASONS.map((reason, i) => (
                <ScrollFadeIn key={reason.n} delay={0.1 + i * 0.05}>
                  <ReasonSlide reason={reason} />
                </ScrollFadeIn>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

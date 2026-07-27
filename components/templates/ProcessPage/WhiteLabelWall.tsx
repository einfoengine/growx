"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useMediaQuery, usePrefersReducedMotion } from "@/lib/hooks/useActiveWhenVisible";
import SectionHeader from "@/components/elements/SectionHeader";
import Button from "@/components/elements/Button";

type Promise = { id: string; title: string; description: string };

type Props = {
  eyebrow: string;
  headline: string;
  sub: string;
  promises: Promise[];
};

// Dark, on-brand imagery for the full-bleed cards (robots = the invisible
// team, then atmospheric brand scenes). White copy sits over a bottom scrim;
// the top of each image stays clear.
const IMAGES = [
  "/assets/hero/scene-robots.webp",
  "/assets/gw-mod-fulfillment-reasons/3.webp",
  "/assets/gw-mod-fulfillment-reasons/2.webp",
  "/assets/hero/scene.webp",
  "/assets/gw-mod-fulfillment-reasons/4.webp",
  "/assets/hero/scene-lab.webp",
];

function Card({
  promise,
  image,
  priority,
}: {
  promise: Promise;
  image: string;
  priority?: boolean;
}) {
  return (
    <article className="relative h-full w-full overflow-hidden rounded-2xl border border-white/10 shadow-lg">
      <Image
        src={image}
        alt=""
        fill
        priority={priority}
        sizes="(min-width: 1024px) 380px, (min-width: 640px) 45vw, 90vw"
        className="object-cover"
      />
      {/* Clear at the top, deepening to black only across the bottom so the
          white copy stays legible without hiding the image. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-black from-12% via-black/55 via-35% to-transparent to-70%"
      />
      <div className="absolute inset-x-0 bottom-0 p-7">
        <h3 className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
          {promise.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-white/80 sm:text-[15px]">
          {promise.description}
        </p>
      </div>
    </article>
  );
}

/** Desktop: the section pins and the cards travel horizontally (right to left)
 *  as you scroll — no vertical sliding. Mobile/reduced-motion fall back to a
 *  plain grid. */
export default function WhiteLabelWall({ eyebrow, headline, sub, promises }: Props) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const reduce = usePrefersReducedMotion();
  const pinned = isDesktop && !reduce;

  const header = (
    <div className="max-w-2xl">
      <SectionHeader
        eyebrow={eyebrow}
        headlineText={headline}
        headlineClassName="mt-4 text-3xl font-bold leading-[1.2] tracking-tight text-foreground sm:text-4xl"
        sub={sub}
        subClassName="mt-4 text-base leading-relaxed text-muted"
      />
      <Button
        label="Become a partner"
        href="/become-a-partner"
        icon={<ArrowRight size={15} />}
        className="mt-7"
      />
    </div>
  );

  if (!pinned) {
    return (
      <section id="gw-process-white-label" className="bg-background">
        <div className="container-1200 py-20 sm:py-24">
          {header}
          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {promises.map((p, i) => (
              <div key={p.id} className="h-96">
                <Card promise={p} image={IMAGES[i % IMAGES.length]} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return <PinnedWall header={header} promises={promises} />;
}

type Geom = { travel: number; windowWidth: number; cardWidth: number; stride: number };

/** One card in the pinned row, revealed by its real on-screen position: it
 *  fades, rises and scales up as it slides in from the right window edge, then
 *  eases back out as it leaves on the left — so the reveal tracks the scroll
 *  rather than a fixed timer. */
function PinnedCard({
  promise,
  image,
  index,
  progress,
  geom,
  priority,
}: {
  promise: Promise;
  image: string;
  index: number;
  progress: MotionValue<number>;
  geom: Geom;
  priority?: boolean;
}) {
  const { travel, windowWidth, cardWidth, stride } = geom;
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
  const y = useTransform(progress, (p) => (1 - fraction(p)) * 44);

  return (
    <motion.div
      style={{ opacity, scale, y }}
      className="h-[clamp(18rem,52vh,26rem)] w-[min(88vw,520px)] shrink-0"
    >
      <Card promise={promise} image={image} priority={priority} />
    </motion.div>
  );
}

function PinnedWall({
  header,
  promises,
}: {
  header: React.ReactNode;
  promises: Promise[];
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [geom, setGeom] = useState<Geom>({
    travel: 0,
    windowWidth: 0,
    cardWidth: 0,
    stride: 0,
  });

  // Measure the slide distance (row's hidden overflow) plus per-card geometry
  // used for the reveal. Remeasured on resize.
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
  const x = useTransform(scrollYProgress, [0, 1], [0, -geom.travel]);

  return (
    <section id="gw-process-white-label" className="bg-background">
      {/* Runway = one viewport plus the horizontal travel, so vertical scroll
          maps 1:1 to the row sliding left. */}
      <div
        ref={trackRef}
        className="relative"
        style={{ height: `calc(100vh + ${geom.travel}px)` }}
      >
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden pt-20">
          <div className="container-1200 w-full">{header}</div>
          <div className="container-1200 mt-10 w-full">
            {/* Inner clip starts/ends at the padded content edge. */}
            <div className="overflow-hidden">
              <motion.div ref={rowRef} style={{ x }} className="flex gap-6">
                {promises.map((p, i) => (
                  <PinnedCard
                    key={p.id}
                    promise={p}
                    image={IMAGES[i % IMAGES.length]}
                    index={i}
                    progress={scrollYProgress}
                    geom={geom}
                    priority={i === 0}
                  />
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

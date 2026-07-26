"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Typewriter from "@/components/elements/Typewriter";
import Headline from "@/components/elements/Headline";
import ModuleTitle from "@/components/elements/ModuleTitle";
import HeroHeadlineWords from "@/components/modules/Hero/HeroHeadlineWords";
import Button from "@/components/elements/Button";
import { HERO_LAYOUT, type HeroVariant } from "@/components/modules/Hero/hero-variants";
import type { HeroContent } from "@/lib/content/types";

type HeroAnimatedContentProps = {
  data: HeroContent;
  variant?: HeroVariant;
  moduleTitle?: string;
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.85,
      ease: "easeOut",
    },
  },
};

const ctaVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function HeroAnimatedContent({
  data,
  variant = "home",
  moduleTitle,
}: HeroAnimatedContentProps) {
  const L = HERO_LAYOUT[variant];
  const isHome = variant === "home";
  const hasStats = data.stats.length > 0;

  // Scroll-scrubbed split: as the hero scrolls out, the headline half drifts
  // up while the CTA half drifts down — the copy pulls apart on the way out
  // and reassembles on the way back (scrubbing is bidirectional for free).
  // Entrance animations (variants) are unaffected — these are style
  // transforms on two wrapper groups, multiplied on top.
  const splitRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: splitRef,
    offset: ["start start", "end start"],
  });
  const yTop = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const yBottom = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const splitOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <motion.div
      ref={splitRef}
      id="gw-hero-animated-content"
      className={isHome ? "mx-auto w-full" : L.shell}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={isHome ? "text-center" : "mx-auto text-center"}>
        {moduleTitle && (
          <ModuleTitle id="gw-hero-module-title">{moduleTitle}</ModuleTitle>
        )}
        {/* ── Split group A: eyebrow + headline (+tagline) drift UP on exit ── */}
        <motion.div
          style={{
            y: reduceMotion ? 0 : yTop,
            opacity: reduceMotion ? 1 : splitOpacity,
          }}
        >
        {/* The cycled words are the three partnership tiers by name (The Vendor /
            The Team Member / The Department), so the eyebrow links to them —
            `eyebrow.href` had been carried in the data but never wired up. */}
        <motion.p
          id={`${data.id}-eyebrow`}
          className={
            isHome
              ? "hero-eyebrow"
              : "font-label text-xs font-semibold uppercase tracking-[0.18em] text-background/70 sm:text-sm"
          }
          variants={itemVariants}
        >
          {/* Home: pill badge with a brand status dot. Inner pages keep the
              plain kicker. */}
          <Link
            href={data.eyebrow.href}
            className={
              isHome
                ? "inline-flex items-center gap-2.5 rounded-full bg-white/10 px-4 py-2 transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
                : "inline-flex items-baseline gap-1.5 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
            }
          >
            {isHome && (
              <span
                aria-hidden="true"
                className="h-2.5 w-2.5 shrink-0 rounded-full bg-gradient-brand"
              />
            )}
            <span className="inline-flex items-baseline gap-1.5">
              {data.eyebrow.label}{" "}
              <Typewriter
                words={["vendor", "team member", "department"]}
                className="text-brand"
              />
            </span>
          </Link>
        </motion.p>

        {/* Home headline rises word by word out of clipped wrappers; inner
            pages keep the block reveal from the shared Headline element. */}
        {isHome ? (
          <HeroHeadlineWords
            id={`${data.id}-headline`}
            parts={data.headline.parts}
            className={`${L.headline} text-balance`}
            highlightClassName="text-gradient-brand-rotate"
          />
        ) : (
          <motion.div variants={itemVariants}>
            <Headline
              id={`${data.id}-headline`}
              parts={data.headline.parts}
              as="h1"
              className={L.headline}
              highlightClassName="text-gradient-brand"
              underlineHighlight={false}
            />
          </motion.div>
        )}

        {data.tagline && !isHome && (
          <motion.p
            id={`${data.id}-tagline`}
            className={`${L.tagline} font-label`}
            variants={itemVariants}
          >
            {data.tagline}
          </motion.p>
        )}

        </motion.div>

        {/* ── Split group B: sub + CTAs + stats drift DOWN on exit ── */}
        <motion.div
          style={{
            y: reduceMotion ? 0 : yBottom,
            opacity: reduceMotion ? 1 : splitOpacity,
          }}
        >
        {/* The plain-English explanation of the business. Both variants show it:
            a visitor who only reads the headline still needs to learn what growX
            actually does. */}
        <motion.p id={`${data.id}-sub`} className={L.sub} variants={itemVariants}>
          {data.sub}
        </motion.p>

        <motion.div
          id={`${data.id}-ctas`}
          className={L.ctas}
          variants={containerVariants}
        >
          {data.ctas.map((cta) => {
            const isPrimary = cta.variant === "primary";
            return (
              <motion.div key={cta.id} variants={ctaVariants}>
                <Button
                  id={cta.id}
                  label={cta.label}
                  href={cta.href}
                  variant={isPrimary ? "primary" : "secondary"}
                  darkBg
                  icon={<ArrowRight size={isPrimary ? 16 : 14} />}
                  className={isPrimary ? "shadow-sm hover:shadow-[0_0_28px_rgba(16,185,129,0.35)]" : ""}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Expectation-setter under the CTAs: what clicking actually costs
            the visitor (30 minutes, no pressure) — lowers the ask. */}
        {data.ctaNote && (
          <motion.p
            id={`${data.id}-cta-note`}
            className="mt-3 text-xs text-white/50"
            variants={statVariants}
          >
            {data.ctaNote}
          </motion.p>
        )}

        {/* Proof bar. Sits under the CTA so the last thing read before acting is
            evidence, not another claim. Rendered on every variant including
            home — the first screen must carry proof, not just claims. */}
        {hasStats && (
          <motion.ul id={`${data.id}-stats`} className={L.stats} variants={containerVariants}>
            {data.stats.map((stat) => (
              <motion.li key={stat.id} id={stat.id} variants={statVariants}>
                <span className="hero-stat">
                  <Check size={14} strokeWidth={3} className="shrink-0 text-brand" />
                  {stat.label}
                </span>
              </motion.li>
            ))}
          </motion.ul>
        )}
        </motion.div>
      </div>
    </motion.div>
  );
}

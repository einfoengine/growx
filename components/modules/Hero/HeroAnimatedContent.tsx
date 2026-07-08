"use client";

import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import Typewriter from "@/components/elements/Typewriter";
import Headline from "@/components/elements/Headline";
import Button from "@/components/elements/Button";
import { HERO_LAYOUT, type HeroVariant } from "@/components/modules/Hero/hero-variants";
import type { HeroContent } from "@/lib/content/types";

type HeroAnimatedContentProps = {
  data: HeroContent;
  variant?: HeroVariant;
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

const pointVariants = {
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
}: HeroAnimatedContentProps) {
  const L = HERO_LAYOUT[variant];
  const isHome = variant === "home";
  const hasPoints = isHome && !!data.points && data.points.length > 0;

  return (
    <motion.div
      className={isHome ? "mx-auto w-full max-w-2xl" : L.shell}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className={isHome ? "text-center" : "mx-auto text-center"}>
        <motion.p
          id={`${data.id}-eyebrow`}
          className={
            isHome
              ? "hero-eyebrow"
              : "font-label text-base font-bold tracking-tight text-foreground/70 sm:text-lg"
          }
          variants={itemVariants}
        >
          {data.eyebrow.label}{" "}
          <Typewriter
            words={["vendor", "team member", "department"]}
            className="text-brand"
          />
        </motion.p>

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

        {data.tagline && (
          <motion.p
            id={`${data.id}-tagline`}
            className={`${L.tagline} font-label`}
            variants={itemVariants}
          >
            {data.tagline}
          </motion.p>
        )}

        {/* Inner variant keeps the descriptive sub; the home hero uses the
            checkmark points below instead to avoid repeating the same copy. */}
        {!hasPoints && (
          <motion.p id={`${data.id}-sub`} className={L.sub} variants={itemVariants}>
            {data.sub}
          </motion.p>
        )}

        {hasPoints && (
          <motion.ul
            id={`${data.id}-points`}
            className="mt-7 flex flex-wrap items-center justify-center gap-x-6 gap-y-2.5"
            variants={containerVariants}
          >
            {data.points!.map((point, i) => (
              <motion.li
                key={i}
                className="flex items-center gap-2"
                variants={pointVariants}
              >
                <Check size={16} strokeWidth={3} className="shrink-0 text-brand" />
                <span className="hero-point">{point}</span>
              </motion.li>
            ))}
          </motion.ul>
        )}

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
                  icon={<ArrowRight size={isPrimary ? 16 : 14} />}
                  className={isPrimary ? "shadow-sm hover:shadow-[0_0_28px_rgba(16,185,129,0.35)]" : ""}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}

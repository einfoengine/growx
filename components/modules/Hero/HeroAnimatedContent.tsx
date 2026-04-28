"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Headline from "@/components/elements/Headline";
import type { HeroContent } from "@/lib/content/types";

type HeroAnimatedContentProps = {
  data: HeroContent;
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

const statsVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

export default function HeroAnimatedContent({ data }: HeroAnimatedContentProps) {
  return (
    <motion.div
      className="container-1200 relative pt-24 pb-24 sm:pt-32 sm:pb-28 lg:pt-40 lg:pb-36"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mx-auto text-center">
        <motion.div variants={itemVariants}>
          <Link
            id={`${data.id}-eyebrow`}
            href={data.eyebrow.href}
            className="group inline-flex items-center gap-2 rounded-full border border-border bg-background/80 px-4 py-1.5 text-xs font-medium text-foreground/80 backdrop-blur-md transition hover:border-brand/30 hover:bg-brand/4 hover:text-foreground"
          >
            <span aria-hidden="true" className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand" />
            </span>
            <span>{data.eyebrow.label}</span>
            <ArrowRight
              size={12}
              className="opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:opacity-90"
            />
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Headline
            id={`${data.id}-headline`}
            parts={data.headline.parts}
            as="h1"
            className="mt-7 text-5xl font-semibold leading-none tracking-tight text-foreground sm:text-6xl lg:text-7xl xl:text-8xl"
            highlightClassName="bg-gradient-to-br from-brand to-[#059669] bg-clip-text text-transparent"
            underlineHighlight={false}
          />
        </motion.div>

        {data.tagline && (
          <motion.p
            id={`${data.id}-tagline`}
            className="mt-6 text-base font-semibold tracking-tight text-foreground/90 sm:text-lg"
            variants={itemVariants}
          >
            {data.tagline}
          </motion.p>
        )}

        <motion.p
          id={`${data.id}-sub`}
          className="mx-auto mt-3 max-w-xl text-pretty text-sm text-muted sm:text-base"
          variants={itemVariants}
        >
          {data.sub}
        </motion.p>

        <motion.div
          id={`${data.id}-ctas`}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
          variants={containerVariants}
        >
          {data.ctas.map((cta) => {
            const isPrimary = cta.variant === "primary";
            const className = isPrimary
              ? "group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background shadow-sm transition hover:opacity-90 hover:shadow-[0_0_28px_rgba(16,185,129,0.35)]"
              : "group inline-flex items-center gap-2 rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground/80 transition hover:border-foreground/20 hover:bg-black/5 hover:text-foreground";
            return (
              <motion.div key={cta.id} variants={ctaVariants}>
                <Link id={cta.id} href={cta.href} className={className}>
                  {cta.label}
                  <ArrowRight
                    size={isPrimary ? 16 : 14}
                    className="transition-transform group-hover:translate-x-0.5"
                  />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          id={`${data.id}-stats`}
          className="mt-10 grid grid-cols-2 gap-2.5 sm:grid-cols-4"
          variants={containerVariants}
        >
          {data.stats.map((s) => (
            <motion.div
              key={s.id}
              id={s.id}
              className="flex items-center gap-2 rounded-xl border border-border bg-background/70 px-3.5 py-3 backdrop-blur-sm"
              variants={statsVariants}
            >
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand"
              />
              <span className="text-[11px] font-medium text-foreground/80 sm:text-xs">
                {s.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

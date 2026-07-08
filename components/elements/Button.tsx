"use client";

import Link from "next/link";
import { useRef, type MouseEvent, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = {
  /** Button label text. */
  label: string;
  /** Visual style. Default: "primary". */
  variant?: ButtonVariant;
  /** Renders as a Next.js Link when provided. */
  href?: string;
  /** Click handler - renders as a <button> element. */
  onClick?: () => void;
  /** Icon element rendered alongside the label. */
  icon?: ReactNode;
  /** Side the icon appears on. Default: "right". */
  iconPosition?: "left" | "right";
  /** Switches to the dark-background color scheme. */
  darkBg?: boolean;
  /** Stretches to fill its container width. */
  fullWidth?: boolean;
  /** Disables interaction and dims the button. */
  disabled?: boolean;
  /** HTML button type - only applies when no href is given. Default: "button". */
  type?: "button" | "submit" | "reset";
  /** Escape hatch for one-off style overrides. */
  className?: string;
  id?: string;
};

// Visual styling lives in the element library (app/styles/components.css).
// This just maps each variant to its `.btn-*` class. `group` is kept on the
// element (in `cls` below) because it drives the icon's group-hover nudge -
// behaviour, not styling.
const VARIANT: Record<ButtonVariant, { light: string; dark: string }> = {
  primary: { light: "btn-primary", dark: "btn-primary-dark" },
  secondary: { light: "btn-secondary", dark: "btn-secondary-dark" },
  ghost: { light: "btn-ghost", dark: "btn-ghost" },
};

// Magnetic pull config (à la Aceternity's magnetic-button).
const SPRING = { stiffness: 200, damping: 16, mass: 0.3 };
const STRENGTH = 0.45;
const MAX_DISTANCE = 48;

export default function Button({
  label,
  variant = "primary",
  href,
  onClick,
  icon,
  iconPosition = "right",
  darkBg = false,
  fullWidth = false,
  disabled = false,
  type = "button",
  className = "",
  id,
}: ButtonProps) {
  const cls = [
    "group btn",
    VARIANT[variant][darkBg ? "dark" : "light"],
    fullWidth ? "w-full" : "",
    disabled ? "cursor-not-allowed opacity-60" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const iconEl = icon ? (
    <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
      {icon}
    </span>
  ) : null;

  const content = (
    <>
      {iconPosition === "left" && iconEl}
      {label}
      {iconPosition === "right" && iconEl}
    </>
  );

  const inner =
    href && !disabled ? (
      <Link id={id} href={href} className={cls}>
        {content}
      </Link>
    ) : (
      <button id={id} type={type} onClick={onClick} disabled={disabled} className={cls}>
        {content}
      </button>
    );

  // ── Magnetic wrapper - the button drifts toward the cursor, springs back ──
  const wrapRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  if (disabled) return inner;

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    let dx = (e.clientX - (r.left + r.width / 2)) * STRENGTH;
    let dy = (e.clientY - (r.top + r.height / 2)) * STRENGTH;
    const dist = Math.hypot(dx, dy);
    if (dist > MAX_DISTANCE) {
      const k = MAX_DISTANCE / dist;
      dx *= k;
      dy *= k;
    }
    x.set(dx);
    y.set(dy);
  };
  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={wrapRef}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={fullWidth ? "block w-full" : "inline-block"}
    >
      {inner}
    </motion.div>
  );
}

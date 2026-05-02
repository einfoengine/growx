"use client";

import Link from "next/link";
import type { ReactNode } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = {
  /** Button label text. */
  label: string;
  /** Visual style. Default: "primary". */
  variant?: ButtonVariant;
  /** Renders as a Next.js Link when provided. */
  href?: string;
  /** Click handler — renders as a <button> element. */
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
  /** HTML button type — only applies when no href is given. Default: "button". */
  type?: "button" | "submit" | "reset";
  /** Escape hatch for one-off style overrides. */
  className?: string;
  id?: string;
};

const BASE =
  "group inline-flex items-center gap-2 rounded-full font-medium transition";

const STYLES: Record<ButtonVariant, { light: string; dark: string }> = {
  primary: {
    light: "bg-foreground px-6 py-3 text-sm text-background hover:opacity-90",
    dark: "bg-background px-6 py-3 text-sm text-foreground hover:opacity-90",
  },
  secondary: {
    light:
      "border border-border px-5 py-3 text-sm text-foreground/80 hover:border-foreground/30 hover:text-foreground",
    dark: "border border-white/15 px-5 py-3 text-sm text-white/80 hover:border-white/30 hover:text-white",
  },
  ghost: {
    light: "text-sm text-brand hover:text-brand/80",
    dark: "text-sm text-brand hover:text-brand/80",
  },
};

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
  const variantClass = STYLES[variant][darkBg ? "dark" : "light"];
  const cls = [
    BASE,
    variantClass,
    fullWidth ? "w-full justify-center" : "",
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

  if (href && !disabled) {
    return (
      <Link id={id} href={href} className={cls}>
        {content}
      </Link>
    );
  }

  return (
    <button id={id} type={type} onClick={onClick} disabled={disabled} className={cls}>
      {content}
    </button>
  );
}

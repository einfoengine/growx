"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "light" | "dark";
const STORAGE_KEY = "growx-theme";

/** Notify anything listening (e.g. the header) that the theme changed. The
 *  native `storage` event only fires across tabs, so we dispatch our own. */
export const THEME_EVENT = "growx-themechange";

/**
 * Light/dark theme switch. Flips `<html data-theme>`, persists the choice, and
 * broadcasts a `growx-themechange` event so client components that read the
 * theme (HeaderShell) can react without a full reload.
 *
 * Icon-only glass button, matching the cart / portal / partner controls: shows
 * a sun while in dark mode (click → go light) and a moon while in light mode.
 * The no-flash bootstrap lives in <ThemeScript>; this only handles interaction.
 */
export default function ThemeToggle({ className }: { className?: string }) {
  // Start undefined until mounted so SSR and the first client render agree
  // (the real value is only known from the DOM the bootstrap script set).
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const current = (document.documentElement.dataset.theme as Theme) || "dark";
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage may be unavailable (private mode) — the attribute still flips */
    }
    setTheme(next);
    window.dispatchEvent(new CustomEvent(THEME_EVENT, { detail: next }));
  };

  const isLight = theme === "light";
  const cls =
    className ??
    "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/50 text-foreground/80 backdrop-blur-md transition-colors hover:bg-background/80 hover:text-foreground";

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={
        theme === null
          ? "Toggle theme"
          : isLight
            ? "Switch to dark theme"
            : "Switch to light theme"
      }
      title="Toggle theme"
      className={cls}
    >
      {/* Sun shows in dark mode; Moon in light mode. Before mount (theme null)
          the sun renders as a stable default so there's no layout shift. */}
      {isLight ? (
        <Moon size={18} aria-hidden="true" />
      ) : (
        <Sun size={18} aria-hidden="true" />
      )}
    </button>
  );
}

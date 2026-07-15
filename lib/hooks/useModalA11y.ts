"use client";

import { useEffect, useRef, type RefObject } from "react";

/**
 * Everything a user can Tab to inside a modal panel. Mirrors the selector in
 * ServiceDetailModal (the reference implementation) plus the form controls the
 * booking/onboarding dialogs are built from.
 */
const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "textarea:not([disabled])",
  "video",
  '[tabindex]:not([tabindex="-1"])',
].join(",");

type UseModalA11yOptions = {
  /** Whether the dialog is currently open. */
  open: boolean;
  /** Called on Escape. Read via a ref, so an inline arrow is fine. */
  onClose: () => void;
  /** Set false if the dialog closes on Escape by some other means. */
  closeOnEscape?: boolean;
  /** Set false to opt out of the body scroll lock. */
  lockScroll?: boolean;
};

/**
 * Shared dialog behaviour, extracted from `ServiceDetailModal`:
 *
 * - focuses the first control when `open` flips to true;
 * - traps Tab / Shift+Tab inside the panel;
 * - closes on Escape;
 * - restores focus to whatever was focused before the dialog opened;
 * - locks body scroll while open, without clobbering a pre-existing lock.
 *
 * Returns a ref to attach to the dialog panel — the element carrying
 * `role="dialog"`, `aria-modal="true"` and `tabIndex={-1}`.
 *
 *     const panelRef = useModalA11y<HTMLDivElement>({ open, onClose: close });
 *     <div ref={panelRef} role="dialog" aria-modal="true" aria-labelledby="…" tabIndex={-1}>
 *
 * The scroll lock uses `position: fixed` rather than `overflow: hidden`, which
 * iOS Safari ignores on `<body>`. It restores both the previous inline styles
 * and the scroll offset on release.
 */
export function useModalA11y<T extends HTMLElement>({
  open,
  onClose,
  closeOnEscape = true,
  lockScroll = true,
}: UseModalA11yOptions): RefObject<T | null> {
  const panelRef = useRef<T>(null);

  // Latest onClose, read via a ref so the focus/keydown effect depends only on
  // `open` and never re-runs (yanking focus) on unrelated re-renders.
  const onCloseRef = useRef(onClose);
  useEffect(() => {
    onCloseRef.current = onClose;
  });

  // The control that opened the dialog, so focus can go back where it started.
  const triggerRef = useRef<HTMLElement | null>(null);

  // Focus the first control on open, trap Tab within the panel, close on
  // Escape, and restore focus to the trigger on close.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    triggerRef.current = document.activeElement as HTMLElement | null;

    const getFocusable = () => panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);

    // Focus the first focusable control (not the tabIndex=-1 container) so the
    // very first Shift+Tab wraps to the end instead of escaping the dialog.
    (getFocusable()[0] ?? panel).focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (closeOnEscape && e.key === "Escape") {
        onCloseRef.current();
        return;
      }
      if (e.key !== "Tab") return;
      const focusable = getFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const activeEl = document.activeElement;
      const outside = !panel.contains(activeEl);
      if (e.shiftKey && (activeEl === first || outside)) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && (activeEl === last || outside)) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      // No-op if the trigger has since left the DOM (e.g. it lived in a modal
      // that handed off to this one).
      triggerRef.current?.focus?.();
      triggerRef.current = null;
    };
  }, [open, closeOnEscape]);

  // Lock body scroll while open. `overflow: hidden` on <body> is a no-op in iOS
  // Safari, so pin the body instead and put the scroll offset back on release.
  useEffect(() => {
    if (!open || !lockScroll) return;
    const body = document.body;
    const scrollY = window.scrollY;
    const prev = {
      position: body.style.position,
      top: body.style.top,
      width: body.style.width,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.width = "100%";

    return () => {
      // Restore whatever was there before rather than hard-coding a value, so a
      // lock owned by another component survives this one closing.
      body.style.position = prev.position;
      body.style.top = prev.top;
      body.style.width = prev.width;
      window.scrollTo(0, scrollY);
    };
  }, [open, lockScroll]);

  return panelRef;
}

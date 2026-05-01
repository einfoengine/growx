"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import type { CTA, Link as LinkType } from "@/lib/content";

type MobileMenuProps = {
  id?: string;
  nav: LinkType[];
  cta: CTA;
};

export default function MobileMenu({
  id = "mod-header-mobile",
  nav,
  cta,
}: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function closeAll() {
    setOpen(false);
    setExpandedId(null);
  }

  const panel = (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeAll}
            className="fixed inset-0 z-55 bg-black/40 backdrop-blur-sm lg:hidden"
          />

          {/* Off-canvas drawer */}
          <motion.div
            key="drawer"
            ref={menuRef}
            id={`${id}-panel`}
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", duration: 0.4, bounce: 0 }}
            className="fixed inset-y-0 right-0 z-60 flex w-full max-w-xs flex-col bg-white shadow-2xl lg:hidden"
          >
            {/* Drawer header: logo + close */}
            <div className="flex h-16 shrink-0 items-center justify-between border-b border-black/8 px-5">
              <Link href="/" onClick={closeAll} aria-label="growX.studio home" className="inline-flex items-center">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/assets/growX-black-logo.svg" alt="growX.studio" width={120} height={28} />
              </Link>
              <button
                type="button"
                aria-label="Close menu"
                onClick={closeAll}
                className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-gray-500 transition-colors hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 overflow-y-auto px-5 py-4">
              <ul className="flex flex-col divide-y divide-gray-100">
                {nav.map((item) =>
                  item.children ? (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() =>
                          setExpandedId((v) => (v === item.id ? null : item.id))
                        }
                        className="flex w-full items-center justify-between py-4 text-base font-medium text-gray-900"
                      >
                        {item.label}
                        <ChevronDown
                          size={16}
                          className={`text-gray-400 transition-transform duration-200 ${
                            expandedId === item.id ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence initial={false}>
                        {expandedId === item.id && (
                          <motion.ul
                            key="children"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mb-3 flex flex-col gap-0.5">
                              {item.children.map((child) => (
                                <li key={child.id}>
                                  <Link
                                    id={`${child.id}-mobile`}
                                    href={child.href}
                                    onClick={closeAll}
                                    className="block rounded-xl px-4 py-2.5 text-sm text-gray-600 transition-colors hover:bg-gray-50 hover:text-gray-900"
                                  >
                                    {child.label}
                                  </Link>
                                </li>
                              ))}
                            </div>
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </li>
                  ) : (
                    <li key={item.id}>
                      <Link
                        id={`${item.id}-mobile`}
                        href={item.href}
                        onClick={closeAll}
                        className="block py-4 text-base font-medium text-gray-900"
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </nav>

            {/* CTA pinned at bottom */}
            <div className="shrink-0 border-t border-black/8 px-5 py-5">
              <Link
                id={`${cta.id}-mobile`}
                href={cta.href}
                onClick={closeAll}
                className="inline-flex w-full items-center justify-center rounded-full bg-gray-900 px-6 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                {cta.label}
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div id={id} className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-foreground transition-colors hover:bg-white/10"
      >
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={22} />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Menu size={22} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {mounted && createPortal(panel, document.body)}
    </div>
  );
}

"use client";

import { ChevronDown, Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  function closeAll() {
    setOpen(false);
    setExpandedId(null);
  }

  return (
    <div id={id} className="lg:hidden">
      <button
        type="button"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls={`${id}-panel`}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground hover:bg-black/5"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div
          id={`${id}-panel`}
          role="dialog"
          aria-modal="true"
          className="fixed inset-x-0 top-16 bottom-0 z-40 bg-background border-t border-border overflow-y-auto"
        >
          <nav className="container-1200 py-6">
            <ul className="flex flex-col divide-y divide-border">
              {nav.map((item) =>
                item.children ? (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId((v) => (v === item.id ? null : item.id))
                      }
                      className="flex w-full items-center justify-between py-4 text-base font-medium text-foreground"
                    >
                      {item.label}
                      <ChevronDown
                        size={16}
                        className={`transition-transform duration-200 ${expandedId === item.id ? "rotate-180" : ""}`}
                      />
                    </button>

                    {expandedId === item.id && (
                      <ul className="mb-2 flex flex-col gap-0.5">
                        {item.children.map((child) => (
                          <li key={child.id}>
                            <Link
                              id={`${child.id}-mobile`}
                              href={child.href}
                              onClick={closeAll}
                              className="block rounded-lg px-3 py-2.5 text-sm text-foreground/70 hover:bg-surface hover:text-foreground transition-colors"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ) : (
                  <li key={item.id}>
                    <Link
                      id={`${item.id}-mobile`}
                      href={item.href}
                      onClick={closeAll}
                      className="block py-4 text-base font-medium text-foreground"
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
            <Link
              id={`${cta.id}-mobile`}
              href={cta.href}
              onClick={closeAll}
              className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background"
            >
              {cta.label}
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}

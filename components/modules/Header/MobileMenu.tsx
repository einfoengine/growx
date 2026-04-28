"use client";

import { Menu, X } from "lucide-react";
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

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

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
              {nav.map((item) => (
                <li key={item.id}>
                  <Link
                    id={`${item.id}-mobile`}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 text-base font-medium text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              id={`${cta.id}-mobile`}
              href={cta.href}
              onClick={() => setOpen(false)}
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

"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/lib/cart/useCart";

/** Header cart control. Shows the live item count and links to /checkout.
 *  Matches the nav-link colors so it adapts to the header's light/dark theme. */
export default function CartIcon({ className }: { className?: string }) {
  const { count } = useCart();

  return (
    <Link
      href="/checkout"
      aria-label={count > 0 ? `Cart, ${count} item${count === 1 ? "" : "s"}` : "Cart, empty"}
      className={`relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/50 text-foreground/80 backdrop-blur-md transition-colors hover:bg-background/80 hover:text-foreground ${
        className ?? ""
      }`}
    >
      <ShoppingCart size={19} aria-hidden="true" />
      {count > 0 && (
        <span className="absolute right-0.5 top-0.5 grid h-4.5 min-w-4.5 place-items-center rounded-full bg-gradient-brand px-1 text-[10px] font-bold leading-none text-black">
          {count}
        </span>
      )}
    </Link>
  );
}

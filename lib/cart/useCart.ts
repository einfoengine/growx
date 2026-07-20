"use client";

import { useSyncExternalStore } from "react";
import type { TierKey } from "@/lib/config/pricing";
import {
  subscribeCart,
  getCartSnapshot,
  getCartServerSnapshot,
  setPlan,
  addService,
  removeService,
  clearCart,
} from "./cart-store";

/** Reactive view of the cart plus its mutators. Any client component can call
 *  this; they all share the one module-level store. */
export function useCart() {
  const cart = useSyncExternalStore(subscribeCart, getCartSnapshot, getCartServerSnapshot);
  const count = cart.services.length + (cart.plan ? 1 : 0);

  return {
    plan: cart.plan,
    services: cart.services,
    count,
    hasService: (slug: string) => cart.services.includes(slug),
    setPlan: (plan: TierKey | null) => setPlan(plan),
    addService,
    removeService,
    clear: clearCart,
  };
}

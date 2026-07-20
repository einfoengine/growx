import type { TierKey } from "@/lib/config/pricing";

/** The cart holds at most one subscription plan plus any number of unique
 *  services. It lives in a module-level external store (read via
 *  useSyncExternalStore) rather than a context provider, so any client
 *  component can read or mutate it without wrapping the tree, and there is no
 *  setState-in-effect to hydrate it. Persisted to localStorage and synced
 *  across tabs. */
export type CartState = { plan: TierKey | null; services: string[] };

const KEY = "gx-cart-v1";
const EMPTY: CartState = { plan: null, services: [] };

let cart: CartState = EMPTY;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(cart));
  } catch {
    // Storage can throw in private mode; the in-memory cart still works.
  }
}

// Hydrate once, on the client, before the first snapshot is read.
if (typeof window !== "undefined") {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw) cart = JSON.parse(raw) as CartState;
  } catch {
    cart = EMPTY;
  }
  window.addEventListener("storage", (e) => {
    if (e.key !== KEY) return;
    try {
      cart = e.newValue ? (JSON.parse(e.newValue) as CartState) : EMPTY;
    } catch {
      cart = EMPTY;
    }
    emit();
  });
}

export function subscribeCart(cb: () => void) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

// getSnapshot must return a stable reference between renders: `cart` only
// changes identity on mutation, so this is safe for useSyncExternalStore.
export const getCartSnapshot = () => cart;
export const getCartServerSnapshot = () => EMPTY;

export function setPlan(plan: TierKey | null) {
  cart = { ...cart, plan };
  persist();
  emit();
}

export function addService(slug: string) {
  if (cart.services.includes(slug)) return;
  cart = { ...cart, services: [...cart.services, slug] };
  persist();
  emit();
}

export function removeService(slug: string) {
  cart = { ...cart, services: cart.services.filter((s) => s !== slug) };
  persist();
  emit();
}

export function clearCart() {
  cart = EMPTY;
  persist();
  emit();
}

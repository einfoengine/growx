"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  AlertTriangle, Bot, Check, ChevronDown, Code, ExternalLink, Funnel,
  Minus, Pencil, PenTool, Plus, Search, Share2,
  ShoppingCart, Target, Trash2, X,
} from "lucide-react";
import type { ComponentType } from "react";
import type { PricingPageContent, ServicePageContent, ServiceIcon } from "@/lib/content";

type Props = {
  pageData: PricingPageContent;
  services: ServicePageContent[];
};

type IconProps = { size?: number; className?: string };

type CartDeliverable = { id: string; title: string; description: string };

type CartItem = {
  cartId: string;
  slug: string;
  serviceName: string;
  qty: number;
  unit: string;
  unitLabel: string;
  unitPrice: number;
  durationId: string;
  durationLabel: string;
  durationValue: number;
  billing: "one-off" | "monthly";
  discountPct: number;
  rushPct: number;
  total: number;
  perMonth: number;
  notes: string;
  deliverables: CartDeliverable[];
};

type InlineEditState = { qty: number; durationId: string; notes: string };

const ICON_MAP: Record<ServiceIcon, ComponentType<IconProps>> = {
  code: Code, search: Search, bot: Bot,
  "pen-tool": PenTool, "share-2": Share2, funnel: Funnel, target: Target,
};

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function computePrice(
  cfg: PricingPageContent["services"][number],
  qty: number,
  durationId: string
) {
  const dur = cfg.durations.find((d) => d.id === durationId) ?? cfg.durations[1] ?? cfg.durations[0];
  if (!dur) return { total: 0, perMonth: 0, discountPct: 0, rushPct: 0, dur: cfg.durations[0] };
  const base = cfg.unitPrice * qty;
  const sub = cfg.billing === "monthly" ? base * dur.value : base;
  const total = sub * dur.multiplier;
  const perMonth = cfg.billing === "monthly" ? total / dur.value : 0;
  const discountPct = dur.multiplier < 1 ? Math.round((1 - dur.multiplier) * 100) : 0;
  const rushPct = dur.multiplier > 1 ? Math.round((dur.multiplier - 1) * 100) : 0;
  return { total, perMonth, discountPct, rushPct, dur };
}

export default function PricingCalculator({ pageData, services }: Props) {
  /* ── Configurator state ─────────────────────────────── */
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);
  const [qty, setQty] = useState(1);
  const [durationId, setDurationId] = useState<string>("");
  const [notes, setNotes] = useState("");
  const [addedFeedback, setAddedFeedback] = useState(false);

  /* ── Cart state ─────────────────────────────────────── */
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [expandedCartIds, setExpandedCartIds] = useState<Set<string>>(new Set());
  const [inlineEditCartId, setInlineEditCartId] = useState<string | null>(null);
  const [inlineEditState, setInlineEditState] = useState<InlineEditState | null>(null);

  /* ── Leave-confirmation state ───────────────────────── */
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveHref, setLeaveHref] = useState<string | null>(null);
  const confirmedLeaveRef = useRef(false);

  /* ── Refs for scrolling ─────────────────────────────── */
  const cartRef = useRef<HTMLDivElement>(null);

  /* ── Derived configurator values ────────────────────── */
  const config = useMemo(
    () => pageData.services.find((s) => s.slug === selectedSlug) ?? null,
    [selectedSlug, pageData.services]
  );
  const service = useMemo(
    () => services.find((s) => s.slug === selectedSlug) ?? null,
    [selectedSlug, services]
  );
  const duration = useMemo(
    () => config?.durations.find((d) => d.id === durationId) ?? config?.durations[1] ?? config?.durations[0] ?? null,
    [config, durationId]
  );
  const safeQty = config ? Math.min(Math.max(qty, config.minQty), config.maxQty) : qty;

  const { total, perMonth, discountPct, rushPct } = useMemo(() => {
    if (!config || !duration) return { total: 0, perMonth: 0, discountPct: 0, rushPct: 0 };
    return computePrice(config, safeQty, duration.id);
  }, [config, duration, safeQty]);

  /* ── Leave-page protection ──────────────────────────── */
  const hasCart = cartItems.length > 0;

  useEffect(() => {
    if (!hasCart) return;

    // Browser close / hard refresh
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (confirmedLeaveRef.current) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBeforeUnload);

    // Next.js soft-navigation link clicks
    const onLinkClick = (e: MouseEvent) => {
      if (confirmedLeaveRef.current) return;
      const anchor = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href || href.startsWith("#")) return;
      // External links: let browser handle naturally
      if (anchor.hostname && anchor.hostname !== window.location.hostname) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      setLeaveHref(href);
      setShowLeaveModal(true);
    };
    document.addEventListener("click", onLinkClick, true);

    return () => {
      window.removeEventListener("beforeunload", onBeforeUnload);
      document.removeEventListener("click", onLinkClick, true);
    };
  }, [hasCart]);

  function confirmLeave() {
    confirmedLeaveRef.current = true;
    setShowLeaveModal(false);
    if (leaveHref) window.location.assign(leaveHref);
  }

  function dismissLeave() {
    setShowLeaveModal(false);
    setLeaveHref(null);
  }

  /* ── Configurator actions ───────────────────────────── */
  function selectService(slug: string) {
    const cfg = pageData.services.find((s) => s.slug === slug);
    if (!cfg) return;
    setSelectedSlug(slug);
    setQty(cfg.minQty);
    setDurationId(cfg.durations[1]?.id ?? cfg.durations[0]?.id ?? "");
    setNotes("");
  }

  function addToCart() {
    if (!config || !service || !duration) return;
    const item: CartItem = {
      cartId: `${Date.now()}-${config.slug}`,
      slug: config.slug,
      serviceName: service.name,
      qty: safeQty,
      unit: config.unit,
      unitLabel: config.unitLabel,
      unitPrice: config.unitPrice,
      durationId: duration.id,
      durationLabel: duration.label,
      durationValue: duration.value,
      billing: config.billing,
      discountPct,
      rushPct,
      total,
      perMonth,
      notes: notes.trim(),
      deliverables: service.deliverables.map((d) => ({ id: d.id, title: d.title, description: d.description })),
    };
    setCartItems((prev) => [...prev, item]);
    setNotes("");
    setAddedFeedback(true);
    setTimeout(() => {
      setAddedFeedback(false);
      cartRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 800);
  }

  /* ── Cart actions ───────────────────────────────────── */
  function removeFromCart(cartId: string) {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
    setExpandedCartIds((prev) => { const n = new Set(prev); n.delete(cartId); return n; });
    if (inlineEditCartId === cartId) { setInlineEditCartId(null); setInlineEditState(null); }
  }

  function toggleExpand(cartId: string) {
    if (inlineEditCartId === cartId) return; // editing takes over
    setExpandedCartIds((prev) => {
      const n = new Set(prev);
      n.has(cartId) ? n.delete(cartId) : n.add(cartId);
      return n;
    });
  }

  function startInlineEdit(item: CartItem) {
    setExpandedCartIds((prev) => { const n = new Set(prev); n.delete(item.cartId); return n; });
    setInlineEditCartId(item.cartId);
    setInlineEditState({ qty: item.qty, durationId: item.durationId, notes: item.notes });
  }

  function cancelInlineEdit() {
    setInlineEditCartId(null);
    setInlineEditState(null);
  }

  const saveInlineEdit = useCallback(() => {
    if (!inlineEditCartId || !inlineEditState) return;
    const item = cartItems.find((i) => i.cartId === inlineEditCartId);
    if (!item) return;
    const cfg = pageData.services.find((s) => s.slug === item.slug);
    if (!cfg) return;
    const safeQ = Math.min(Math.max(inlineEditState.qty, cfg.minQty), cfg.maxQty);
    const { total, perMonth, discountPct, rushPct, dur } = computePrice(cfg, safeQ, inlineEditState.durationId);
    setCartItems((prev) =>
      prev.map((i) =>
        i.cartId !== inlineEditCartId ? i : {
          ...i,
          qty: safeQ,
          durationId: dur.id,
          durationLabel: dur.label,
          durationValue: dur.value,
          discountPct,
          rushPct,
          total,
          perMonth,
          notes: inlineEditState.notes.trim(),
        }
      )
    );
    setInlineEditCartId(null);
    setInlineEditState(null);
  }, [inlineEditCartId, inlineEditState, cartItems, pageData.services]);

  /* ── Order totals ───────────────────────────────────── */
  const oneOffTotal = cartItems.filter((i) => i.billing === "one-off").reduce((s, i) => s + i.total, 0);
  const monthlyTotal = cartItems.filter((i) => i.billing === "monthly").reduce((s, i) => s + i.perMonth, 0);

  function placeOrder() {
    if (!hasCart) return;
    let priceDisplay =
      monthlyTotal > 0 && oneOffTotal > 0 ? `${fmt(monthlyTotal)}/mo + ${fmt(oneOffTotal)} one-off`
      : monthlyTotal > 0 ? `${fmt(monthlyTotal)}/mo`
      : fmt(oneOffTotal);
    window.dispatchEvent(new CustomEvent("open-onboarding", {
      detail: {
        customPlan: {
          name: `Custom Package — ${cartItems.length} service${cartItems.length > 1 ? "s" : ""}`,
          price: priceDisplay,
          description: cartItems.map((i) => i.serviceName).join(" · "),
          features: cartItems.map((i) => `${i.serviceName}: ${i.qty} ${i.qty === 1 ? i.unit : i.unitLabel.toLowerCase()} · ${i.durationLabel}`),
        },
      },
    }));
  }

  const inCartSlugs = new Set(cartItems.map((i) => i.slug));

  /* ── Render ─────────────────────────────────────────── */
  return (
    <>
      <section id="pricing-calculator" className="bg-background">
        <div className="container-1200 py-16 sm:py-20">

          {/* ── Step 1: Service selector ──────────────────── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Step 1</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Choose a service
            </h2>
            <p className="mt-1 text-sm text-muted">Select one to configure — you can add multiple services to your order.</p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {pageData.services.map((cfg) => {
                const svc = services.find((s) => s.slug === cfg.slug);
                const Icon = ICON_MAP[cfg.icon];
                const active = selectedSlug === cfg.slug;
                const inCart = inCartSlugs.has(cfg.slug);
                return (
                  <button
                    key={cfg.slug}
                    type="button"
                    onClick={() => selectService(cfg.slug)}
                    className={`relative flex flex-col items-center gap-3 rounded-2xl border p-5 text-center transition-all duration-200 ${
                      active ? "border-brand bg-surface shadow-[0_0_20px_rgba(16,185,129,0.08)]"
                             : "border-border bg-background hover:border-brand/40 hover:bg-surface"
                    }`}
                  >
                    {inCart && (
                      <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand">
                        <Check size={10} className="text-black" strokeWidth={3} />
                      </span>
                    )}
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl transition-colors ${active ? "bg-brand/15 text-brand" : "bg-surface text-foreground/50"}`}>
                      <Icon size={18} />
                    </span>
                    <span className={`text-xs font-semibold leading-tight ${active ? "text-foreground" : "text-muted"}`}>
                      {svc?.name ?? cfg.slug}
                    </span>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${cfg.billing === "one-off" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-emerald-700"}`}>
                      {cfg.billing === "one-off" ? "One-off" : "Retainer"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Steps 2–4 + price card ──────────────────── */}
          {config && service && duration && (
            <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
              <div className="space-y-10">

                {/* Step 2: Quantity */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Step 2</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    How many {config.unitLabel.toLowerCase()}?
                  </h2>
                  <p className="mt-1 text-sm text-muted">{fmt(config.unitPrice)} per {config.unit}</p>
                  <div className="mt-5 flex items-center gap-4">
                    <button type="button" onClick={() => setQty((q) => Math.max(config.minQty, q - config.qtyStep))} disabled={safeQty <= config.minQty} className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-surface disabled:opacity-40"><Minus size={14} /></button>
                    <div className="flex-1">
                      <input type="range" min={config.minQty} max={config.maxQty} step={config.qtyStep} value={safeQty} onChange={(e) => setQty(Number(e.target.value))} className="w-full accent-brand" />
                      <div className="mt-1 flex justify-between text-[10px] text-muted">
                        <span>{config.minQty}</span>
                        <span className="font-semibold text-foreground">{safeQty} {safeQty === 1 ? config.unit : config.unitLabel.toLowerCase()}</span>
                        <span>{config.maxQty}</span>
                      </div>
                    </div>
                    <button type="button" onClick={() => setQty((q) => Math.min(config.maxQty, q + config.qtyStep))} disabled={safeQty >= config.maxQty} className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-surface disabled:opacity-40"><Plus size={14} /></button>
                  </div>
                </div>

                {/* Step 3: Duration */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Step 3</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                    {config.billing === "one-off" ? "Delivery timeline" : "Commitment length"}
                  </h2>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {config.durations.map((d) => (
                      <button key={d.id} type="button" onClick={() => setDurationId(d.id)} className={`rounded-full px-4 py-2 text-sm font-medium transition ${duration.id === d.id ? "bg-foreground text-background" : "border border-border text-foreground/70 hover:border-foreground/30 hover:text-foreground"}`}>
                        {d.label}
                        {d.multiplier < 1 && <span className={`ml-1.5 text-xs ${duration.id === d.id ? "text-brand" : "text-emerald-600"}`}>−{Math.round((1 - d.multiplier) * 100)}%</span>}
                        {d.multiplier > 1 && <span className={`ml-1.5 text-xs ${duration.id === d.id ? "text-amber-300" : "text-amber-600"}`}>+{Math.round((d.multiplier - 1) * 100)}%</span>}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 4: Notes */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Step 4</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">Any notes for this service?</h2>
                  <p className="mt-1 text-sm text-muted">Optional — specific requirements, preferred tools, target audience, deadlines, or anything else we should know.</p>
                  <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} placeholder={`e.g. "Mobile-first, Webflow preferred, deadline end of month…"`} className="mt-4 w-full resize-none rounded-xl border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted transition-colors focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand" />
                </div>

                {/* Deliverables */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">What&apos;s included</p>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">{service.name} deliverables</h2>
                  <p className="mt-1 text-sm text-muted">{service.tagline}</p>
                  <ul className="mt-5 space-y-3">
                    {service.deliverables.map((d) => (
                      <li key={d.id} className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10"><Check size={11} className="text-brand" /></span>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{d.title}</p>
                          <p className="mt-0.5 text-xs leading-relaxed text-muted">{d.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Link href={`/services/${service.slug}`} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-brand transition hover:text-brand/80">
                    View full service page <ExternalLink size={13} />
                  </Link>
                </div>
              </div>

              {/* Sticky price card */}
              <div className="lg:sticky lg:top-24">
                <div className="rounded-2xl border border-border bg-surface p-6">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Your estimate</p>
                  <p className="mt-2 text-lg font-semibold text-foreground">{service.name}</p>
                  <div className="mt-5 space-y-2 border-t border-border pt-4 text-sm">
                    <div className="flex justify-between text-muted"><span>{safeQty} {safeQty === 1 ? config.unit : config.unitLabel.toLowerCase()}</span><span>{fmt(config.unitPrice)} each</span></div>
                    {config.billing === "monthly" && <div className="flex justify-between text-muted"><span>Duration</span><span>× {duration.value} months</span></div>}
                    {discountPct > 0 && <div className="flex justify-between text-emerald-600"><span>Commitment discount</span><span>−{discountPct}%</span></div>}
                    {rushPct > 0 && <div className="flex justify-between text-amber-600"><span>Rush premium</span><span>+{rushPct}%</span></div>}
                  </div>
                  <div className="mt-4 rounded-xl bg-background p-4">
                    {config.billing === "monthly" ? (
                      <>
                        <div className="flex items-baseline justify-between"><span className="text-sm text-muted">Per month</span><span className="text-2xl font-bold tracking-tight text-foreground">{fmt(perMonth)}</span></div>
                        <div className="mt-1 flex items-baseline justify-between"><span className="text-xs text-muted">Total commitment</span><span className="text-sm font-semibold text-muted">{fmt(total)}</span></div>
                      </>
                    ) : (
                      <div className="flex items-baseline justify-between"><span className="text-sm text-muted">Project total</span><span className="text-2xl font-bold tracking-tight text-foreground">{fmt(total)}</span></div>
                    )}
                  </div>
                  <button type="button" onClick={addToCart} className={`mt-5 w-full rounded-full px-6 py-3 text-sm font-medium transition ${addedFeedback ? "bg-brand text-black" : "bg-foreground text-background hover:opacity-90"}`}>
                    {addedFeedback ? "✓ Added to order" : `Add to Order${cartItems.length > 0 ? ` (${cartItems.length})` : ""}`}
                  </button>
                  <Link href="#book" className="mt-2 block w-full rounded-full border border-border px-5 py-3 text-center text-sm font-medium text-foreground/70 transition hover:border-foreground/30 hover:text-foreground">
                    Book a Discovery Call
                  </Link>
                  <p className="mt-4 text-center text-xs leading-relaxed text-muted">No payment now. We&apos;ll confirm and send a proposal within 24 hours.</p>
                </div>
              </div>
            </div>
          )}

          {/* Placeholder */}
          {!selectedSlug && !hasCart && (
            <div className="mt-14 flex flex-col items-center rounded-2xl border border-dashed border-border py-16 text-center">
              <p className="text-sm font-medium text-foreground">Select a service above to configure your package</p>
              <p className="mt-1 text-sm text-muted">Pricing updates instantly — add multiple services to build a combined order</p>
            </div>
          )}

          {/* ── Order summary ────────────────────────────────── */}
          {hasCart && (
            <div ref={cartRef} className="mt-16 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                  <ShoppingCart size={15} />
                </span>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Order summary
                  <span className="ml-2 text-lg font-normal text-muted">({cartItems.length} {cartItems.length === 1 ? "service" : "services"})</span>
                </h2>
              </div>

              <div className="mt-6 space-y-3">
                {cartItems.map((item) => {
                  const cfg = pageData.services.find((s) => s.slug === item.slug);
                  const Icon = cfg ? ICON_MAP[cfg.icon] : Code;
                  const isExpanded = expandedCartIds.has(item.cartId);
                  const isInlineEditing = inlineEditCartId === item.cartId;

                  /* Inline edit live price preview */
                  const inlinePrice = isInlineEditing && inlineEditState && cfg
                    ? computePrice(cfg, Math.min(Math.max(inlineEditState.qty, cfg.minQty), cfg.maxQty), inlineEditState.durationId)
                    : null;

                  return (
                    <div key={item.cartId} className="overflow-hidden rounded-2xl border border-border bg-surface">

                      {/* ── Item header (always visible) ── */}
                      <div className="flex items-start gap-4 p-5">
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand/10 text-brand">
                          <Icon size={16} />
                        </span>

                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-foreground">{item.serviceName}</p>
                          <p className="mt-0.5 text-sm text-muted">
                            {item.qty} {item.qty === 1 ? item.unit : item.unitLabel.toLowerCase()}
                            {" · "}{item.durationLabel}
                            {" · "}
                            <span className={`font-medium ${item.billing === "one-off" ? "text-amber-600" : "text-emerald-600"}`}>
                              {item.billing === "one-off" ? "One-off" : "Retainer"}
                            </span>
                          </p>
                        </div>

                        {/* Price + action buttons */}
                        <div className="flex shrink-0 items-center gap-2">
                          {!isInlineEditing && (
                            <div className="text-right mr-1">
                              {item.billing === "monthly" ? (
                                <>
                                  <p className="text-base font-bold tracking-tight text-foreground">{fmt(item.perMonth)}<span className="text-xs font-normal text-muted">/mo</span></p>
                                  <p className="text-xs text-muted">{fmt(item.total)} total</p>
                                </>
                              ) : (
                                <p className="text-base font-bold tracking-tight text-foreground">{fmt(item.total)}</p>
                              )}
                            </div>
                          )}

                          {/* Expand details toggle */}
                          <button
                            type="button"
                            onClick={() => toggleExpand(item.cartId)}
                            disabled={isInlineEditing}
                            aria-label={isExpanded ? "Collapse details" : "Show details"}
                            title={isExpanded ? "Hide details" : "Show details"}
                            className={`flex h-8 w-8 items-center justify-center rounded-full border border-border transition hover:bg-background hover:text-foreground ${isInlineEditing ? "opacity-30 cursor-not-allowed" : "text-muted"}`}
                          >
                            <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                          </button>

                          {/* Inline edit toggle */}
                          <button
                            type="button"
                            onClick={() => isInlineEditing ? cancelInlineEdit() : startInlineEdit(item)}
                            aria-label={isInlineEditing ? "Cancel edit" : "Edit this service"}
                            title={isInlineEditing ? "Cancel edit" : "Edit"}
                            className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${isInlineEditing ? "border-brand bg-brand/10 text-brand" : "border-border text-muted hover:bg-background hover:text-foreground"}`}
                          >
                            {isInlineEditing ? <X size={13} /> : <Pencil size={13} />}
                          </button>

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.cartId)}
                            aria-label={`Remove ${item.serviceName}`}
                            title="Remove from order"
                            className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-red-50 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* ── Inline edit panel ── */}
                      {isInlineEditing && inlineEditState && cfg && inlinePrice && (
                        <div className="border-t border-border bg-background px-5 pb-6 pt-5">
                          <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand">Editing — {item.serviceName}</p>

                          <div className="grid gap-6 sm:grid-cols-2">
                            {/* Quantity */}
                            <div>
                              <p className="text-sm font-medium text-foreground">Quantity</p>
                              <p className="text-xs text-muted">{fmt(cfg.unitPrice)} per {cfg.unit}</p>
                              <div className="mt-3 flex items-center gap-3">
                                <button type="button" onClick={() => setInlineEditState((s) => s ? { ...s, qty: Math.max(cfg.minQty, s.qty - cfg.qtyStep) } : s)} disabled={inlineEditState.qty <= cfg.minQty} className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-surface disabled:opacity-40"><Minus size={13} /></button>
                                <div className="flex-1">
                                  <input type="range" min={cfg.minQty} max={cfg.maxQty} step={cfg.qtyStep} value={Math.min(Math.max(inlineEditState.qty, cfg.minQty), cfg.maxQty)} onChange={(e) => setInlineEditState((s) => s ? { ...s, qty: Number(e.target.value) } : s)} className="w-full accent-brand" />
                                  <p className="mt-1 text-center text-xs font-semibold text-foreground">
                                    {Math.min(Math.max(inlineEditState.qty, cfg.minQty), cfg.maxQty)} {inlineEditState.qty === 1 ? cfg.unit : cfg.unitLabel.toLowerCase()}
                                  </p>
                                </div>
                                <button type="button" onClick={() => setInlineEditState((s) => s ? { ...s, qty: Math.min(cfg.maxQty, s.qty + cfg.qtyStep) } : s)} disabled={inlineEditState.qty >= cfg.maxQty} className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-surface disabled:opacity-40"><Plus size={13} /></button>
                              </div>
                            </div>

                            {/* Duration */}
                            <div>
                              <p className="text-sm font-medium text-foreground">{cfg.billing === "one-off" ? "Timeline" : "Commitment"}</p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {cfg.durations.map((d) => {
                                  const active = inlineEditState.durationId === d.id;
                                  return (
                                    <button key={d.id} type="button" onClick={() => setInlineEditState((s) => s ? { ...s, durationId: d.id } : s)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${active ? "bg-foreground text-background" : "border border-border text-foreground/70 hover:border-foreground/30 hover:text-foreground"}`}>
                                      {d.label}
                                      {d.multiplier < 1 && <span className={`ml-1 text-[10px] ${active ? "text-brand" : "text-emerald-600"}`}>−{Math.round((1 - d.multiplier) * 100)}%</span>}
                                      {d.multiplier > 1 && <span className={`ml-1 text-[10px] ${active ? "text-amber-300" : "text-amber-600"}`}>+{Math.round((d.multiplier - 1) * 100)}%</span>}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>

                          {/* Notes */}
                          <div className="mt-5">
                            <p className="text-sm font-medium text-foreground">Notes</p>
                            <textarea
                              value={inlineEditState.notes}
                              onChange={(e) => setInlineEditState((s) => s ? { ...s, notes: e.target.value } : s)}
                              rows={2}
                              placeholder="Any specific requirements or changes…"
                              className="mt-2 w-full resize-none rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                            />
                          </div>

                          {/* Live price preview + save/cancel */}
                          <div className="mt-5 flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-xs text-muted">Updated estimate</p>
                              {cfg.billing === "monthly" ? (
                                <p className="text-xl font-bold tracking-tight text-foreground">
                                  {fmt(inlinePrice.perMonth)}<span className="text-sm font-normal text-muted">/mo</span>
                                  <span className="ml-2 text-sm font-normal text-muted">({fmt(inlinePrice.total)} total)</span>
                                </p>
                              ) : (
                                <p className="text-xl font-bold tracking-tight text-foreground">{fmt(inlinePrice.total)}</p>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <button type="button" onClick={saveInlineEdit} className="rounded-full bg-brand px-5 py-2 text-sm font-semibold text-black transition hover:bg-brand/90">
                                Save changes
                              </button>
                              <button type="button" onClick={cancelInlineEdit} className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground/70 transition hover:border-foreground/30 hover:text-foreground">
                                Cancel
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ── Expanded details panel ── */}
                      {isExpanded && !isInlineEditing && (
                        <div className="border-t border-border bg-background px-5 pb-6 pt-5">
                          <div className="grid gap-6 sm:grid-cols-2">

                            {/* Price breakdown */}
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Price breakdown</p>
                              <div className="mt-3 space-y-1.5 text-sm">
                                <div className="flex justify-between">
                                  <span className="text-muted">{item.qty} {item.qty === 1 ? item.unit : item.unitLabel.toLowerCase()} × {fmt(item.unitPrice)}</span>
                                  <span className="font-medium text-foreground">{fmt(item.qty * item.unitPrice)}</span>
                                </div>
                                {item.billing === "monthly" && (
                                  <div className="flex justify-between">
                                    <span className="text-muted">× {item.durationValue} months</span>
                                    <span className="font-medium text-foreground">{fmt(item.qty * item.unitPrice * item.durationValue)}</span>
                                  </div>
                                )}
                                {item.discountPct > 0 && (
                                  <div className="flex justify-between text-emerald-600">
                                    <span>Discount −{item.discountPct}%</span>
                                    <span>−{fmt(item.qty * item.unitPrice * (item.billing === "monthly" ? item.durationValue : 1) * (item.discountPct / 100))}</span>
                                  </div>
                                )}
                                {item.rushPct > 0 && (
                                  <div className="flex justify-between text-amber-600">
                                    <span>Rush premium +{item.rushPct}%</span>
                                    <span>+{fmt(item.qty * item.unitPrice * (item.billing === "monthly" ? item.durationValue : 1) * (item.rushPct / 100))}</span>
                                  </div>
                                )}
                                <div className="flex justify-between border-t border-border pt-1.5 font-semibold text-foreground">
                                  <span>{item.billing === "monthly" ? "Total commitment" : "Project total"}</span>
                                  <span>{fmt(item.total)}</span>
                                </div>
                                {item.billing === "monthly" && (
                                  <div className="flex justify-between text-muted">
                                    <span>Per month</span>
                                    <span className="font-semibold text-foreground">{fmt(item.perMonth)}/mo</span>
                                  </div>
                                )}
                              </div>
                              {item.notes && (
                                <div className="mt-4">
                                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Notes</p>
                                  <p className="mt-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm leading-relaxed text-muted">{item.notes}</p>
                                </div>
                              )}
                            </div>

                            {/* Deliverables */}
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                                What&apos;s included ({item.deliverables.length} deliverables)
                              </p>
                              <ul className="mt-3 space-y-2.5">
                                {item.deliverables.map((d) => (
                                  <li key={d.id} className="flex items-start gap-2.5">
                                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand/10">
                                      <Check size={9} className="text-brand" strokeWidth={3} />
                                    </span>
                                    <div>
                                      <p className="text-xs font-semibold text-foreground">{d.title}</p>
                                      <p className="mt-0.5 text-xs leading-relaxed text-muted">{d.description}</p>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Totals + place order */}
              <div className="mt-5 rounded-2xl border border-border bg-foreground p-6 text-background">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Total</p>
                <div className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm">
                  {oneOffTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-white/60">One-off projects</span>
                      <span className="font-semibold text-white">{fmt(oneOffTotal)}</span>
                    </div>
                  )}
                  {monthlyTotal > 0 && (
                    <div className="flex justify-between">
                      <span className="text-white/60">Monthly retainers</span>
                      <span className="font-semibold text-white">{fmt(monthlyTotal)}<span className="font-normal text-white/60">/mo</span></span>
                    </div>
                  )}
                  {oneOffTotal > 0 && monthlyTotal > 0 && (
                    <p className="pt-1 text-xs text-white/40">One-off and retainer services are billed separately.</p>
                  )}
                </div>
                <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                  <button type="button" onClick={placeOrder} className="flex-1 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-black transition hover:bg-brand/90">
                    Place Order — {cartItems.length} service{cartItems.length > 1 ? "s" : ""}
                  </button>
                  <button type="button" onClick={() => setCartItems([])} className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/30 hover:text-white">
                    <X size={13} /> Clear order
                  </button>
                </div>
                <p className="mt-4 text-center text-xs text-white/40">
                  No payment required now. Your order goes directly to our team — proposal within 24 hours.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Leave-page confirmation modal ──────────────────── */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={dismissLeave}
          />
          {/* Modal */}
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
              <AlertTriangle size={22} className="text-amber-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">
              You have an unsaved order
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              You&apos;ve configured {cartItems.length} service{cartItems.length > 1 ? "s" : ""} but haven&apos;t placed your order yet. If you leave now, your cart will be lost.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                onClick={dismissLeave}
                className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90"
              >
                Stay & complete order
              </button>
              <button
                type="button"
                onClick={confirmLeave}
                className="w-full rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground/60 transition hover:border-foreground/30 hover:text-foreground"
              >
                Leave anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

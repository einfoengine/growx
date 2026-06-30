"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  AlertTriangle, Bot, Check, ChevronDown, Clapperboard, Code, ExternalLink,
  Film, Funnel, Headset, Minus, Pencil, PenTool, Plus, Search, Share2,
  ShoppingCart, Target, Terminal, Trash2, UserPlus, X,
} from "lucide-react";
import type { ComponentType } from "react";
import type {
  PricingPageContent, PricingConfigField,
  ServicePageContent, ServiceIcon,
} from "@/lib/content";

type Props = { pageData: PricingPageContent; services: ServicePageContent[] };
type IconProps = { size?: number; className?: string };
type ServiceCfgValues = Record<string, string | string[] | number>;
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
  serviceConfig: ServiceCfgValues;
  deliverables: CartDeliverable[];
};

type InlineEditState = {
  qty: number;
  durationId: string;
  notes: string;
  serviceConfig: ServiceCfgValues;
};

const ICON_MAP: Record<ServiceIcon, ComponentType<IconProps>> = {
  code: Code, search: Search, bot: Bot,
  "pen-tool": PenTool, "share-2": Share2, funnel: Funnel, target: Target,
  clapperboard: Clapperboard, film: Film, "user-plus": UserPlus,
  headset: Headset, terminal: Terminal,
};

function fmt(n: number) {
  return "$" + Math.round(n).toLocaleString("en-US");
}

function computePrice(
  cfg: PricingPageContent["services"][number],
  qty: number,
  durationId: string
) {
  const dur =
    cfg.durations.find((d) => d.id === durationId) ??
    cfg.durations[1] ??
    cfg.durations[0];
  if (!dur) return { total: 0, perMonth: 0, discountPct: 0, rushPct: 0, dur: cfg.durations[0] };
  const base = cfg.unitPrice * qty;
  const sub = cfg.billing === "monthly" ? base * dur.value : base;
  const total = sub * dur.multiplier;
  const perMonth = cfg.billing === "monthly" ? total / dur.value : 0;
  const discountPct = dur.multiplier < 1 ? Math.round((1 - dur.multiplier) * 100) : 0;
  const rushPct = dur.multiplier > 1 ? Math.round((dur.multiplier - 1) * 100) : 0;
  return { total, perMonth, discountPct, rushPct, dur };
}

/* ── Renders a single config field ─────────────────────── */
function ConfigField({
  field,
  value,
  onChange,
}: {
  field: PricingConfigField;
  value: string | string[] | number | undefined;
  onChange: (v: string | string[] | number) => void;
}) {
  if (field.type === "select") {
    const selected = (value as string) ?? "";
    return (
      <div>
        <p className="text-sm font-medium text-foreground">{field.label}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {field.options?.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => onChange(opt)}
              className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                selected === opt
                  ? "bg-foreground text-background"
                  : "border border-border text-foreground/70 hover:border-foreground/30 hover:text-foreground"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (field.type === "multiselect") {
    const selected = (value as string[]) ?? [];
    return (
      <div>
        <p className="text-sm font-medium text-foreground">{field.label}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {field.options?.map((opt) => {
            const active = selected.includes(opt);
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(
                    active ? selected.filter((v) => v !== opt) : [...selected, opt]
                  );
                }}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-foreground text-background"
                    : "border border-border text-foreground/70 hover:border-foreground/30 hover:text-foreground"
                }`}
              >
                {active && <Check size={9} strokeWidth={3} />}
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (field.type === "number") {
    const min = field.min ?? 1;
    const max = field.max ?? 10;
    const step = field.step ?? 1;
    const val = (value as number) ?? min;
    return (
      <div>
        <p className="text-sm font-medium text-foreground">{field.label}</p>
        <div className="mt-3 flex items-center gap-3">
          <button
            type="button"
            onClick={() => onChange(Math.max(min, val - step))}
            disabled={val <= min}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-surface disabled:opacity-40"
          >
            <Minus size={13} />
          </button>
          <div className="flex-1">
            <input
              type="range"
              min={min}
              max={max}
              step={step}
              value={val}
              onChange={(e) => onChange(Number(e.target.value))}
              className="w-full accent-brand"
            />
            <div className="mt-1 flex justify-between text-[10px] text-muted">
              <span>{min}</span>
              <span className="font-semibold text-foreground">{val}</span>
              <span>{max}</span>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChange(Math.min(max, val + step))}
            disabled={val >= max}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-surface disabled:opacity-40"
          >
            <Plus size={13} />
          </button>
        </div>
      </div>
    );
  }

  return null;
}

/* ── Formats a service config value for display ─────────── */
function fmtConfigValue(v: string | string[] | number | undefined): string {
  if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) return "-";
  if (Array.isArray(v)) return v.join(", ");
  return String(v);
}

export default function PricingCalculator({ pageData, services }: Props) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [expandedCartIds, setExpandedCartIds] = useState<Set<string>>(new Set());
  const [inlineEditCartId, setInlineEditCartId] = useState<string | null>(null);
  const [inlineEditState, setInlineEditState] = useState<InlineEditState | null>(null);

  /* ── Leave-confirmation ──────────────────────────────── */
  const [showLeaveModal, setShowLeaveModal] = useState(false);
  const [leaveHref, setLeaveHref] = useState<string | null>(null);
  const confirmedLeaveRef = useRef(false);

  const summaryRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const hasCart = cartItems.length > 0;

  useEffect(() => {
    if (!hasCart) return;
    const onBeforeUnload = (e: BeforeUnloadEvent) => {
      if (confirmedLeaveRef.current) return;
      e.preventDefault();
      e.returnValue = "";
    };
    const onLinkClick = (e: MouseEvent) => {
      if (confirmedLeaveRef.current) return;
      const anchor = (e.target as HTMLElement).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      if (!href || href.startsWith("#")) return;
      if (anchor.hostname && anchor.hostname !== window.location.hostname) return;
      e.preventDefault();
      e.stopImmediatePropagation();
      setLeaveHref(href);
      setShowLeaveModal(true);
    };
    window.addEventListener("beforeunload", onBeforeUnload);
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

  /* ── Add service → immediately to order ─────────────── */
  function addService(slug: string) {
    const cfg = pageData.services.find((s) => s.slug === slug);
    const svc = services.find((s) => s.slug === slug);
    if (!cfg || !svc) return;

    const defaultDur = cfg.durations[1] ?? cfg.durations[0];
    const { total, perMonth, discountPct, rushPct, dur } = computePrice(cfg, cfg.minQty, defaultDur.id);

    const cartId = `${Date.now()}-${cfg.slug}`;
    const newItem: CartItem = {
      cartId,
      slug: cfg.slug,
      serviceName: svc.name,
      qty: cfg.minQty,
      unit: cfg.unit,
      unitLabel: cfg.unitLabel,
      unitPrice: cfg.unitPrice,
      durationId: dur.id,
      durationLabel: dur.label,
      durationValue: dur.value,
      billing: cfg.billing,
      discountPct,
      rushPct,
      total,
      perMonth,
      notes: "",
      serviceConfig: {},
      deliverables: svc.deliverables.map((d) => ({
        id: d.id,
        title: d.title,
        description: d.description,
      })),
    };

    setCartItems((prev) => [...prev, newItem]);
    setInlineEditCartId(cartId);
    setInlineEditState({ qty: cfg.minQty, durationId: dur.id, notes: "", serviceConfig: {} });

    setTimeout(() => {
      if (!hasCart) {
        summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        itemRefs.current[cartId]?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 60);
  }

  /* ── Cart mutations ──────────────────────────────────── */
  function removeFromCart(cartId: string) {
    setCartItems((prev) => prev.filter((i) => i.cartId !== cartId));
    setExpandedCartIds((prev) => { const n = new Set(prev); n.delete(cartId); return n; });
    if (inlineEditCartId === cartId) { setInlineEditCartId(null); setInlineEditState(null); }
  }

  function toggleExpand(cartId: string) {
    if (inlineEditCartId === cartId) return;
    setExpandedCartIds((prev) => {
      const n = new Set(prev);
      n.has(cartId) ? n.delete(cartId) : n.add(cartId);
      return n;
    });
  }

  function startInlineEdit(item: CartItem) {
    setExpandedCartIds((prev) => { const n = new Set(prev); n.delete(item.cartId); return n; });
    setInlineEditCartId(item.cartId);
    setInlineEditState({
      qty: item.qty,
      durationId: item.durationId,
      notes: item.notes,
      serviceConfig: { ...(item.serviceConfig ?? {}) },
    });
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
          ...i, qty: safeQ,
          durationId: dur.id, durationLabel: dur.label, durationValue: dur.value,
          discountPct, rushPct, total, perMonth,
          notes: inlineEditState.notes.trim(),
          serviceConfig: inlineEditState.serviceConfig,
        }
      )
    );
    setInlineEditCartId(null);
    setInlineEditState(null);
  }, [inlineEditCartId, inlineEditState, cartItems, pageData.services]);

  /* ── Inline edit helpers ─────────────────────────────── */
  function setConfigField(fieldId: string, value: string | string[] | number) {
    setInlineEditState((s) =>
      s ? { ...s, serviceConfig: { ...s.serviceConfig, [fieldId]: value } } : s
    );
  }

  /* ── Totals + order ──────────────────────────────────── */
  const oneOffTotal = cartItems.filter((i) => i.billing === "one-off").reduce((s, i) => s + i.total, 0);
  const monthlyTotal = cartItems.filter((i) => i.billing === "monthly").reduce((s, i) => s + i.perMonth, 0);

  function placeOrder() {
    if (!hasCart) return;
    const priceDisplay =
      monthlyTotal > 0 && oneOffTotal > 0 ? `${fmt(monthlyTotal)}/mo + ${fmt(oneOffTotal)} one-off`
      : monthlyTotal > 0 ? `${fmt(monthlyTotal)}/mo`
      : fmt(oneOffTotal);

    window.dispatchEvent(new CustomEvent("open-onboarding", {
      detail: {
        customPlan: {
          name: `Custom Package - ${cartItems.length} service${cartItems.length > 1 ? "s" : ""}`,
          price: priceDisplay,
          description: cartItems.map((i) => i.serviceName).join(" · "),
          features: cartItems.map((i) => {
            const cfgSummary = Object.entries(i.serviceConfig ?? {})
              .filter(([, v]) => Array.isArray(v) ? (v as string[]).length > 0 : v !== "" && v !== undefined)
              .map(([, v]) => Array.isArray(v) ? (v as string[]).join(", ") : String(v))
              .join(" · ");
            return `${i.serviceName}: ${i.qty} ${i.qty === 1 ? i.unit : i.unitLabel.toLowerCase()} · ${i.durationLabel}${cfgSummary ? ` - ${cfgSummary}` : ""}`;
          }),
        },
      },
    }));
  }

  const cartCountBySlug = useMemo(() => {
    const counts: Record<string, number> = {};
    cartItems.forEach((i) => { counts[i.slug] = (counts[i.slug] ?? 0) + 1; });
    return counts;
  }, [cartItems]);

  /* ── Render ──────────────────────────────────────────── */
  return (
    <>
      <section id="gw-pricing-calculator" className="bg-background">
        <div className="container-1200 py-16 sm:py-20">

          {/* ── Service cards ──────────────────────────── */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">Select services</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              What would you like to order?
            </h2>
            <p className="mt-1 text-sm text-muted">
              Click a service to add it - configure the details in the order summary below.
            </p>

            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
              {pageData.services.map((cfg) => {
                const svc = services.find((s) => s.slug === cfg.slug);
                const Icon = ICON_MAP[cfg.icon];
                const count = cartCountBySlug[cfg.slug] ?? 0;
                return (
                  <button
                    key={cfg.slug}
                    type="button"
                    onClick={() => addService(cfg.slug)}
                    className="group relative flex flex-col items-center gap-3 rounded-2xl border border-border bg-background p-5 text-center transition-all duration-200 hover:border-brand/40 hover:bg-surface hover:shadow-[0_0_20px_rgba(16,185,129,0.06)]"
                  >
                    {count > 0 ? (
                      <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-brand text-[10px] font-bold text-black">
                        {count}
                      </span>
                    ) : (
                      <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border border-border bg-background text-muted opacity-0 transition-opacity group-hover:opacity-100">
                        <Plus size={10} />
                      </span>
                    )}
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-foreground/50 transition-colors group-hover:bg-brand/15 group-hover:text-brand">
                      <Icon size={18} />
                    </span>
                    <span className="text-xs font-semibold leading-tight text-muted group-hover:text-foreground">
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

          {/* Empty state */}
          {!hasCart && (
            <div className="mt-10 flex flex-col items-center rounded-2xl border border-dashed border-border py-14 text-center">
              <ShoppingCart size={28} className="text-muted/40" />
              <p className="mt-4 text-sm font-medium text-foreground">Your order is empty</p>
              <p className="mt-1 text-sm text-muted">Click any service above to add it - configure details right here</p>
            </div>
          )}

          {/* ── Order summary ───────────────────────────── */}
          {hasCart && (
            <div ref={summaryRef} className="mt-12 scroll-mt-24">
              <div className="flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground text-background">
                  <ShoppingCart size={15} />
                </span>
                <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                  Order summary
                  <span className="ml-2 text-lg font-normal text-muted">
                    ({cartItems.length} {cartItems.length === 1 ? "service" : "services"})
                  </span>
                </h2>
              </div>

              <div className="mt-6 space-y-3">
                {cartItems.map((item) => {
                  const cfg = pageData.services.find((s) => s.slug === item.slug);
                  const Icon = cfg ? ICON_MAP[cfg.icon] : Code;
                  const isExpanded = expandedCartIds.has(item.cartId);
                  const isEditing = inlineEditCartId === item.cartId;
                  const inlinePrice = isEditing && inlineEditState && cfg
                    ? computePrice(cfg, Math.min(Math.max(inlineEditState.qty, cfg.minQty), cfg.maxQty), inlineEditState.durationId)
                    : null;

                  /* Duration slider index for inline edit */
                  const durIdx = cfg ? Math.max(0, cfg.durations.findIndex((d) => d.id === inlineEditState?.durationId)) : 0;
                  const selectedDur = cfg?.durations[durIdx];

                  return (
                    <div
                      key={item.cartId}
                      ref={(el) => { itemRefs.current[item.cartId] = el; }}
                      className={`overflow-hidden rounded-2xl border bg-surface transition-all ${isEditing ? "border-brand/40 shadow-[0_0_24px_rgba(16,185,129,0.07)]" : "border-border"}`}
                    >
                      {/* ── Header ── */}
                      <div className="flex items-start gap-4 p-5">
                        <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-colors ${isEditing ? "bg-brand/15 text-brand" : "bg-brand/10 text-brand"}`}>
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

                        <div className="flex shrink-0 items-center gap-2">
                          {!isEditing && (
                            <div className="mr-1 text-right">
                              {item.billing === "monthly" ? (
                                <>
                                  <p className="text-base font-bold tracking-tight text-foreground">
                                    {fmt(item.perMonth)}<span className="text-xs font-normal text-muted">/mo</span>
                                  </p>
                                  <p className="text-xs text-muted">{fmt(item.total)} total</p>
                                </>
                              ) : (
                                <p className="text-base font-bold tracking-tight text-foreground">{fmt(item.total)}</p>
                              )}
                            </div>
                          )}

                          {/* Expand */}
                          <button type="button" onClick={() => toggleExpand(item.cartId)} disabled={isEditing} aria-label={isExpanded ? "Collapse" : "Show details"} title={isExpanded ? "Hide details" : "Show details"} className={`flex h-8 w-8 items-center justify-center rounded-full border border-border transition hover:bg-background hover:text-foreground ${isEditing ? "cursor-not-allowed opacity-30" : "text-muted"}`}>
                            <ChevronDown size={14} className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`} />
                          </button>
                          {/* Edit / cancel */}
                          <button type="button" onClick={() => isEditing ? cancelInlineEdit() : startInlineEdit(item)} aria-label={isEditing ? "Cancel" : "Edit"} title={isEditing ? "Cancel edit" : "Edit"} className={`flex h-8 w-8 items-center justify-center rounded-full border transition ${isEditing ? "border-brand bg-brand/10 text-brand" : "border-border text-muted hover:bg-background hover:text-foreground"}`}>
                            {isEditing ? <X size={13} /> : <Pencil size={13} />}
                          </button>
                          {/* Remove */}
                          <button type="button" onClick={() => removeFromCart(item.cartId)} aria-label="Remove" title="Remove" className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition hover:bg-red-50 hover:text-red-500">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      {/* ── Inline edit panel ── */}
                      {isEditing && inlineEditState && cfg && inlinePrice && selectedDur && (
                        <div className="border-t border-brand/20 bg-background px-5 pb-6 pt-6">

                          {/* ── TOP: sliders (left) + deliverables (right) ── */}
                          <div className="grid gap-8 lg:grid-cols-2">

                            {/* LEFT - all sliders */}
                            <div className="space-y-6">
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Scope</p>

                              {/* Quantity */}
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  Quantity
                                  <span className="ml-2 text-xs font-normal text-muted">{fmt(cfg.unitPrice)} per {cfg.unit}</span>
                                </p>
                                <div className="mt-3 flex items-center gap-3">
                                  <button type="button" onClick={() => setInlineEditState((s) => s ? { ...s, qty: Math.max(cfg.minQty, s.qty - cfg.qtyStep) } : s)} disabled={inlineEditState.qty <= cfg.minQty} className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-surface disabled:opacity-40">
                                    <Minus size={13} />
                                  </button>
                                  <div className="flex-1">
                                    <input type="range" min={cfg.minQty} max={cfg.maxQty} step={cfg.qtyStep} value={Math.min(Math.max(inlineEditState.qty, cfg.minQty), cfg.maxQty)} onChange={(e) => setInlineEditState((s) => s ? { ...s, qty: Number(e.target.value) } : s)} className="w-full accent-brand" />
                                    <div className="mt-1 flex justify-between text-[10px] text-muted">
                                      <span>{cfg.minQty}</span>
                                      <span className="font-semibold text-foreground">
                                        {Math.min(Math.max(inlineEditState.qty, cfg.minQty), cfg.maxQty)}{" "}
                                        {inlineEditState.qty === 1 ? cfg.unit : cfg.unitLabel.toLowerCase()}
                                      </span>
                                      <span>{cfg.maxQty}</span>
                                    </div>
                                  </div>
                                  <button type="button" onClick={() => setInlineEditState((s) => s ? { ...s, qty: Math.min(cfg.maxQty, s.qty + cfg.qtyStep) } : s)} disabled={inlineEditState.qty >= cfg.maxQty} className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-surface disabled:opacity-40">
                                    <Plus size={13} />
                                  </button>
                                </div>
                              </div>

                              {/* Duration */}
                              <div>
                                <p className="text-sm font-medium text-foreground">
                                  {cfg.billing === "one-off" ? "Delivery timeline" : "Commitment length"}
                                </p>
                                <div className="mt-3 flex items-center gap-3">
                                  <button type="button" onClick={() => { const i = Math.max(0, durIdx - 1); setInlineEditState((s) => s ? { ...s, durationId: cfg.durations[i].id } : s); }} disabled={durIdx === 0} className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-surface disabled:opacity-40">
                                    <Minus size={13} />
                                  </button>
                                  <div className="flex-1">
                                    <input type="range" min={0} max={cfg.durations.length - 1} step={1} value={durIdx} onChange={(e) => { const i = Number(e.target.value); setInlineEditState((s) => s ? { ...s, durationId: cfg.durations[i].id } : s); }} className="w-full accent-brand" />
                                    <div className="mt-1 flex justify-between text-[10px] text-muted">
                                      <span>{cfg.durations[0].label.split(" - ")[0]}</span>
                                      <span className="text-center font-semibold text-foreground">
                                        {selectedDur.label}
                                        {selectedDur.multiplier < 1 && <span className="ml-1 text-emerald-600">−{Math.round((1 - selectedDur.multiplier) * 100)}%</span>}
                                        {selectedDur.multiplier > 1 && <span className="ml-1 text-amber-600">+{Math.round((selectedDur.multiplier - 1) * 100)}%</span>}
                                      </span>
                                      <span>{cfg.durations[cfg.durations.length - 1].label.split(" - ")[0]}</span>
                                    </div>
                                  </div>
                                  <button type="button" onClick={() => { const i = Math.min(cfg.durations.length - 1, durIdx + 1); setInlineEditState((s) => s ? { ...s, durationId: cfg.durations[i].id } : s); }} disabled={durIdx === cfg.durations.length - 1} className="flex h-9 w-9 items-center justify-center rounded-full border border-border transition hover:bg-surface disabled:opacity-40">
                                    <Plus size={13} />
                                  </button>
                                </div>
                              </div>

                              {/* Number-type config fields (also sliders) */}
                              {cfg.configFields?.filter((f) => f.type === "number").map((field) => (
                                <ConfigField
                                  key={field.id}
                                  field={field}
                                  value={inlineEditState.serviceConfig[field.id]}
                                  onChange={(v) => setConfigField(field.id, v)}
                                />
                              ))}
                            </div>

                            {/* RIGHT - what's included */}
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                                What&apos;s included ({item.deliverables.length})
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
                              <Link href={`/services/${item.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brand transition hover:text-brand/80">
                                View full service page <ExternalLink size={11} />
                              </Link>
                            </div>
                          </div>

                          {/* ── BOTTOM: select/multiselect options + notes + price ── */}
                          <div className="mt-8 space-y-6 border-t border-border pt-6">

                            {/* Select + multiselect config fields */}
                            {cfg.configFields && cfg.configFields.filter((f) => f.type !== "number").length > 0 && (
                              <div>
                                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.14em] text-brand">
                                  Service options
                                </p>
                                <div className="grid gap-5 sm:grid-cols-2">
                                  {cfg.configFields.filter((f) => f.type !== "number").map((field) => (
                                    <div
                                      key={field.id}
                                      className={field.type === "multiselect" ? "sm:col-span-2" : ""}
                                    >
                                      <ConfigField
                                        field={field}
                                        value={inlineEditState.serviceConfig[field.id]}
                                        onChange={(v) => setConfigField(field.id, v)}
                                      />
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Notes */}
                            <div>
                              <p className="text-sm font-medium text-foreground">
                                Additional notes
                                <span className="ml-2 text-xs font-normal text-muted">optional</span>
                              </p>
                              <textarea
                                value={inlineEditState.notes}
                                onChange={(e) => setInlineEditState((s) => s ? { ...s, notes: e.target.value } : s)}
                                rows={2}
                                placeholder="Anything else we should know - deadlines, brand guidelines, references, access details…"
                                className="mt-2 w-full resize-none rounded-xl border border-border bg-surface px-4 py-2.5 text-sm text-foreground placeholder:text-muted transition-colors focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
                              />
                            </div>

                            {/* Price preview + Save / Cancel */}
                            <div className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between">
                              <div>
                                <p className="text-xs text-muted">Estimate</p>
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
                                  Save
                                </button>
                                <button type="button" onClick={cancelInlineEdit} className="rounded-full border border-border px-5 py-2 text-sm font-medium text-foreground/70 transition hover:border-foreground/30 hover:text-foreground">
                                  Cancel
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* ── Expanded details ── */}
                      {isExpanded && !isEditing && (
                        <div className="border-t border-border bg-background px-5 pb-6 pt-5">
                          <div className="grid gap-6 sm:grid-cols-2">

                            {/* Left: price breakdown + notes + config summary */}
                            <div className="space-y-5">
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
                                      <span>Rush +{item.rushPct}%</span>
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
                              </div>

                              {/* Service config summary */}
                              {cfg?.configFields && cfg.configFields.some((f) => (item.serviceConfig ?? {})[f.id] !== undefined) && (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Configuration</p>
                                  <dl className="mt-2 space-y-1.5">
                                    {cfg.configFields.map((f) => {
                                      const v = (item.serviceConfig ?? {})[f.id];
                                      if (v === undefined || v === "" || (Array.isArray(v) && v.length === 0)) return null;
                                      return (
                                        <div key={f.id} className="flex gap-2 text-xs">
                                          <dt className="shrink-0 font-medium text-foreground">{f.label}:</dt>
                                          <dd className="text-muted">{fmtConfigValue(v)}</dd>
                                        </div>
                                      );
                                    })}
                                  </dl>
                                </div>
                              )}

                              {/* Notes */}
                              {item.notes && (
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-brand">Notes</p>
                                  <p className="mt-2 rounded-lg border border-border bg-surface px-3 py-2.5 text-sm leading-relaxed text-muted">{item.notes}</p>
                                </div>
                              )}
                            </div>

                            {/* Right: deliverables */}
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
                              <Link href={`/services/${item.slug}`} className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-brand transition hover:text-brand/80">
                                View full service page <ExternalLink size={11} />
                              </Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Totals + Place Order */}
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
                    Place Order - {cartItems.length} service{cartItems.length > 1 ? "s" : ""}
                  </button>
                  <button type="button" onClick={() => setCartItems([])} className="flex items-center justify-center gap-1.5 rounded-full border border-white/15 px-5 py-3 text-sm font-medium text-white/70 transition hover:border-white/30 hover:text-white">
                    <X size={13} /> Clear order
                  </button>
                </div>
                <p className="mt-4 text-center text-xs text-white/40">
                  No payment required now - proposal arrives within 24 hours.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── Leave modal ─────────────────────────────────── */}
      {showLeaveModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setShowLeaveModal(false)} />
          <div className="relative z-10 w-full max-w-sm rounded-2xl border border-border bg-background p-6 shadow-2xl">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
              <AlertTriangle size={22} className="text-amber-500" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-foreground">Unsaved order</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              You have {cartItems.length} service{cartItems.length > 1 ? "s" : ""} in your order that haven&apos;t been placed. If you leave, your cart will be lost.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button type="button" onClick={() => setShowLeaveModal(false)} className="w-full rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition hover:opacity-90">
                Stay &amp; complete order
              </button>
              <button type="button" onClick={confirmLeave} className="w-full rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground/60 transition hover:border-foreground/30 hover:text-foreground">
                Leave anyway
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

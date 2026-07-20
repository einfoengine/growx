import Link from "next/link";
import {
  ArrowRight,
  ChevronDown,
  Clapperboard,
  Code,
  Film,
  Funnel,
  PenTool,
  Search,
  Share2,
  Target,
  Terminal,
  type LucideIcon,
} from "lucide-react";
import type { Link as NavLink, ServicesContent, ServiceIcon } from "@/lib/content";

/** Only the icons the nine real service pages use. Keeping this local (rather
 *  than importing the Services module's larger map) keeps the header lean. */
const ICON_BY_KEY: Partial<Record<ServiceIcon, LucideIcon>> = {
  code: Code,
  search: Search,
  target: Target,
  "pen-tool": PenTool,
  "share-2": Share2,
  funnel: Funnel,
  clapperboard: Clapperboard,
  film: Film,
  terminal: Terminal,
};

type Props = {
  /** The Services nav item (must have `children`). */
  item: NavLink;
  /** Home services module — supplies each card's icon + blurb, matched by href. */
  services: ServicesContent;
};

/**
 * Desktop mega menu for the Services nav item: a grid of service cards instead
 * of a plain link list.
 *
 * Kept CSS-only (hover + focus-within), like the dropdown it replaces — the
 * header is a server component, so this stays server-rendered with the child
 * links reachable by keyboard. `invisible` is what holds the cards out of the
 * tab order, so both reveal conditions (hover for pointers, focus-within for
 * keyboards) must clear it or the sub-pages become keyboard-unreachable.
 */
export default function ServicesMegaMenu({ item, services }: Props) {
  const cardByHref = new Map(services.cards.map((c) => [c.href, c]));

  // A child is a "card" if the home catalog describes it; the rest (e.g.
  // "All services") fall through to the footer row as plain links.
  const children = item.children ?? [];
  const cards = children.filter((c) => cardByHref.has(c.href));
  const extras = children.filter((c) => !cardByHref.has(c.href));

  return (
    <li className="relative group">
      <Link
        id={item.id}
        href={item.href}
        aria-haspopup="true"
        aria-controls={`${item.id}-mega`}
        className="inline-flex items-center gap-1 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
      >
        {item.label}
        <ChevronDown
          size={14}
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:rotate-180 group-focus-within:rotate-180"
        />
      </Link>

      <div
        id={`${item.id}-mega`}
        className="invisible absolute left-1/2 top-full z-50 w-screen max-w-2xl -translate-x-1/2 pt-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100"
      >
        <div className="overflow-hidden rounded-2xl border border-border bg-background shadow-xl shadow-black/10">
          <div className="grid gap-1 p-2 sm:grid-cols-2">
            {cards.map((child) => {
              const card = cardByHref.get(child.href)!;
              const Icon = ICON_BY_KEY[card.icon];
              return (
                <Link
                  key={child.id}
                  id={child.id}
                  href={child.href}
                  className="group/card flex gap-3 rounded-xl p-3 transition-colors hover:bg-surface focus-visible:bg-surface focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-brand"
                >
                  <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface text-brand transition-colors group-hover/card:border-brand/40 group-hover/card:bg-brand/10">
                    {Icon ? <Icon size={17} aria-hidden="true" /> : null}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
                      {child.label}
                      <ArrowRight
                        size={13}
                        aria-hidden="true"
                        className="-translate-x-1 opacity-0 transition-all group-hover/card:translate-x-0 group-hover/card:opacity-100"
                      />
                    </span>
                    <span className="mt-0.5 line-clamp-2 text-xs leading-relaxed text-muted">
                      {card.blurb}
                    </span>
                  </span>
                </Link>
              );
            })}
          </div>

          {extras.length > 0 && (
            <div className="flex items-center justify-between gap-4 border-t border-border bg-surface/50 px-5 py-3.5">
              <p className="text-xs text-muted">
                Every service, fixed pricing, in the full catalog.
              </p>
              <div className="flex shrink-0 items-center gap-4">
                {extras.map((extra) => (
                  <Link
                    key={extra.id}
                    id={extra.id}
                    href={extra.href}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {extra.label}
                    <ArrowRight size={13} aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </li>
  );
}

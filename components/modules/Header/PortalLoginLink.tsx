import { UserRound } from "lucide-react";
import { PORTAL_LOGIN_URL } from "@/lib/config/conversion";

/** Client-portal control ("My Portal"). Opens app.growx.studio in a new tab.
 *  The URL is a launch placeholder (null) until provided; while null the
 *  control still renders in place but stays inert, so it never points at a
 *  dead link.
 *
 *  Two shapes:
 *  - `iconOnly` (desktop header): a glass, bordered icon button matching the
 *    cart control — an open-door glyph, no label.
 *  - default (mobile drawer): the icon + "My Portal" label, styled via
 *    `className`. */
export default function PortalLoginLink({
  className,
  iconOnly = false,
}: {
  className?: string;
  iconOnly?: boolean;
}) {
  if (iconOnly) {
    const glass =
      "relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background/50 text-foreground/80 backdrop-blur-md transition-colors hover:bg-background/80 hover:text-foreground";

    // Small dot marks the pre-launch "coming soon" state without any label.
    const soonDot = (
      <span className="absolute right-1 top-1 h-1.5 w-1.5 rounded-full bg-gradient-brand" />
    );

    if (!PORTAL_LOGIN_URL) {
      return (
        <span
          className={`${glass} cursor-default opacity-70 ${className ?? ""}`}
          role="link"
          aria-disabled="true"
          aria-label="My Portal — coming soon"
          title="My Portal — coming soon"
        >
          <UserRound size={19} aria-hidden="true" />
          {soonDot}
        </span>
      );
    }

    return (
      <a
        href={PORTAL_LOGIN_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={`${glass} ${className ?? ""}`}
        aria-label="My Portal"
        title="My Portal"
      >
        <UserRound size={19} aria-hidden="true" />
      </a>
    );
  }

  const cls =
    className ??
    "inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground";

  const content = (
    <>
      <UserRound size={15} aria-hidden="true" />
      My Portal
    </>
  );

  if (!PORTAL_LOGIN_URL) {
    // Pre-launch: visibly labeled, not a silent dead control. A tooltip-only
    // disabled state reads as broken, especially on touch devices.
    return (
      <span className={`${cls} cursor-default opacity-70`} aria-disabled="true">
        {content}
        <span className="rounded-full bg-brand/10 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand">
          Soon
        </span>
      </span>
    );
  }

  return (
    <a href={PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer" className={cls}>
      {content}
    </a>
  );
}

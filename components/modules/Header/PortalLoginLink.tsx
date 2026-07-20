import { LayoutDashboard } from "lucide-react";
import { PORTAL_LOGIN_URL } from "@/lib/config/conversion";

/** Client-portal control ("My Portal"). Opens app.growx.studio in a new tab.
 *  The URL is a launch placeholder (null) until provided; while null the
 *  control still renders in place but stays inert, so it never points at a
 *  dead link. */
export default function PortalLoginLink({ className }: { className?: string }) {
  const cls =
    className ??
    "inline-flex items-center gap-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground";

  const content = (
    <>
      <LayoutDashboard size={15} aria-hidden="true" />
      My Portal
    </>
  );

  if (!PORTAL_LOGIN_URL) {
    return (
      <span className={cls} aria-disabled="true" title="Client portal opens at launch">
        {content}
      </span>
    );
  }

  return (
    <a href={PORTAL_LOGIN_URL} target="_blank" rel="noopener noreferrer" className={cls}>
      {content}
    </a>
  );
}

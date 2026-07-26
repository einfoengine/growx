import type { ReactNode } from "react";

/** Optional single-line title that labels/describes a module. A module renders
 *  it only when its `moduleTitle` prop is set, so it is off by default and
 *  fully non-breaking. Inherits the section's text colour so it adapts to both
 *  light and dark modules; centered, with room below before the content.
 *
 *  This is distinct from the SectionTitle module (eyebrow + headline + sub that
 *  introduces a whole section) — a module title is one line that names one module. */
export default function ModuleTitle({
  children,
  id,
  className = "",
}: {
  children: ReactNode;
  /** Optional DOM id — pass one per usage to keep it unique. */
  id?: string;
  className?: string;
}) {
  return (
    <h2
      id={id}
      className={`mb-8 text-center text-xl font-semibold tracking-tight sm:text-2xl ${className}`}
    >
      {children}
    </h2>
  );
}

import type { HeadlinePart } from "@/lib/content";
import SectionHeader from "@/components/elements/SectionHeader";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";

export type SectionTitleProps = {
  id?: string;
  eyebrow?: string;
  /** Main title. Mark the highlighted "span" part with { type: "highlight" }. */
  headline: HeadlinePart[];
  /** Short description under the title. */
  sub?: string;
  /** Text alignment. Defaults to centered. */
  align?: "center" | "left" | "right";
  /** Extra classes on the heading wrapper. */
  className?: string;
};

const ALIGN: Record<NonNullable<SectionTitleProps["align"]>, { text: string; margin: string }> = {
  center: { text: "text-center", margin: "mx-auto" },
  left: { text: "text-left", margin: "" },
  right: { text: "text-right", margin: "ml-auto" },
};

/** Section heading (eyebrow + gradient headline + short description). Sets NO
 *  background of its own and has NO container/padding — render it as the FIRST
 *  child inside a section's own container, where it inherits that section's
 *  background and text colour and always fits. Alignment is configurable. It is
 *  the title itself, so it takes no moduleTitle. */
export default function SectionTitle({
  id,
  eyebrow,
  headline,
  sub,
  align = "center",
  className = "",
}: SectionTitleProps) {
  const a = ALIGN[align];
  return (
    <div id={id} className={`mb-10 max-w-3xl sm:mb-12 ${a.text} ${a.margin} ${className}`.trim()}>
      <ScrollFadeIn delay={0.1}>
        <SectionHeader
          eyebrow={eyebrow}
          headline={headline}
          sub={sub}
          align="left"
          highlightClassName="text-gradient-brand"
          headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
          subClassName="mt-5 text-base opacity-70 sm:text-lg"
        />
      </ScrollFadeIn>
    </div>
  );
}

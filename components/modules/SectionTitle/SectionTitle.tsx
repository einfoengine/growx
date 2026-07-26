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
  /** Extra classes on the full-width outer wrapper. The module sets NO
   *  background of its own and inherits the surrounding text colour, so it fits
   *  into whatever section it is placed in — pass a background here (or wrap it)
   *  only when the surrounding context needs one. */
  className?: string;
};

const ALIGN: Record<NonNullable<SectionTitleProps["align"]>, { text: string; margin: string }> = {
  center: { text: "text-center", margin: "mx-auto" },
  left: { text: "text-left", margin: "" },
  right: { text: "text-right", margin: "ml-auto" },
};

/** Background-less section-introduction block: eyebrow + gradient headline +
 *  short description. It sets no background and inherits the surrounding text
 *  colour, so it fits into whatever section it is used in. Alignment is
 *  configurable. Unlike other modules it takes no `moduleTitle` — it *is* the title. */
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
    <div id={id} className={`relative ${className}`.trim()}>
      <div className="container-1200 px-6 py-16 sm:py-20">
        <ScrollFadeIn delay={0.1}>
          <div className={`max-w-3xl ${a.text} ${a.margin}`.trim()}>
            <SectionHeader
              eyebrow={eyebrow}
              headline={headline}
              sub={sub}
              align="left"
              highlightClassName="text-gradient-brand"
              headlineClassName="mt-4 text-3xl font-bold leading-[1.15] tracking-tight sm:text-4xl md:text-5xl"
              subClassName="mt-5 text-base opacity-70 sm:text-lg"
            />
          </div>
        </ScrollFadeIn>
      </div>
    </div>
  );
}

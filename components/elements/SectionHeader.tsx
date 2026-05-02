import type { HeadlinePart } from "@/lib/content";
import Eyebrow from "./Eyebrow";
import Headline from "./Headline";

type SectionHeaderProps = {
  eyebrow?: string;
  headline: HeadlinePart[];
  headlineId?: string;
  as?: "h1" | "h2" | "h3";
  sub?: string;
  align?: "center" | "left";
  maxWidth?: string;
  headlineClassName?: string;
  subClassName?: string;
  highlightClassName?: string;
  underlineHighlight?: boolean;
  className?: string;
};

export default function SectionHeader({
  eyebrow,
  headline,
  headlineId,
  as = "h2",
  sub,
  align = "left",
  maxWidth = "max-w-3xl",
  headlineClassName = "mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl",
  subClassName,
  highlightClassName,
  underlineHighlight,
  className = "",
}: SectionHeaderProps) {
  const centered = align === "center";
  const wrapperClass = centered
    ? `mx-auto ${maxWidth} text-center ${className}`.trim()
    : className;
  const defaultSubClass = centered
    ? "mx-auto mt-4 max-w-2xl text-base text-muted"
    : "mt-4 text-base text-muted";

  return (
    <div className={wrapperClass}>
      {eyebrow && <Eyebrow text={eyebrow} />}
      <Headline
        id={headlineId}
        parts={headline}
        as={as}
        className={headlineClassName}
        highlightClassName={highlightClassName}
        underlineHighlight={underlineHighlight}
      />
      {sub && <p className={subClassName ?? defaultSubClass}>{sub}</p>}
    </div>
  );
}

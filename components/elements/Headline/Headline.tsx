import type { HeadlinePart } from "@/lib/content";
import CanvasText from "@/components/elements/CanvasText";

type HeadlineProps = {
  id?: string;
  parts: HeadlinePart[];
  as?: "h1" | "h2" | "h3";
  className?: string;
  underlineHighlight?: boolean;
  highlightClassName?: string;
};

export default function Headline({
  id,
  parts,
  as = "h2",
  className = "",
}: HeadlineProps) {
  const Tag = as;
  const text = parts.map((p) => p.value).join("");

  return (
    <Tag id={id} className={`whitespace-pre-line text-balance ${className}`}>
      {/* Real heading text for accessibility + SEO */}
      <span className="sr-only">{text}</span>
      {/* Visible heading — highlight parts get the animated canvas effect */}
      <span aria-hidden="true">
        {parts.map((part, i) =>
          part.type === "text" ? (
            <span key={i}>{part.value}</span>
          ) : (
            <span key={i} className="text-brand">
              <CanvasText text={part.value} />
            </span>
          ),
        )}
      </span>
    </Tag>
  );
}

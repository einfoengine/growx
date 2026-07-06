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

  // Parts render inline in the heading: plain text parts are real text; each
  // highlight part carries its own real (invisible) text plus the canvas
  // overlay, so the heading is fully accessible with no duplicated copy.
  return (
    <Tag id={id} className={`whitespace-pre-line text-balance ${className}`}>
      {parts.map((part, i) =>
        part.type === "text" ? (
          <span key={i}>{part.value}</span>
        ) : (
          <span key={i} className="text-brand">
            <CanvasText text={part.value} />
          </span>
        ),
      )}
    </Tag>
  );
}

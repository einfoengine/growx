import type { HeadlinePart } from "@/lib/content";

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
  highlightClassName = "text-brand",
}: HeadlineProps) {
  const Tag = as;

  // Highlighted words render as plain (statically styled) text via
  // highlightClassName - typically the brand gradient.
  return (
    <Tag id={id} className={`whitespace-pre-line text-balance ${className}`}>
      {parts.map((part, i) =>
        part.type === "text" ? (
          <span key={i}>{part.value}</span>
        ) : (
          <span key={i} className={highlightClassName}>
            {part.value}
          </span>
        ),
      )}
    </Tag>
  );
}

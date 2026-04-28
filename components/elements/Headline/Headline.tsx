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
  underlineHighlight = true,
  highlightClassName,
}: HeadlineProps) {
  const Tag = as;
  const hlClass = highlightClassName ?? "text-brand";

  return (
    <Tag id={id} className={`whitespace-pre-line text-balance ${className}`}>
      {parts.map((part, i) => {
        if (part.type === "text") {
          return <span key={i}>{part.value}</span>;
        }
        return (
          <span key={i} className={`relative inline-block ${hlClass}`}>
            {part.value}
            {underlineHighlight && !highlightClassName && (
              <span
                aria-hidden="true"
                className="absolute -bottom-1 left-0 right-0 h-1.5 rounded-full bg-(--brand-soft)"
              />
            )}
          </span>
        );
      })}
    </Tag>
  );
}

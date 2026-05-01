import Link from "next/link";

type LogoProps = {
  id?: string;
  href?: string;
  tone?: "light" | "dark";
  width?: number;
  className?: string;
  eager?: boolean;
};

const SRC_BY_TONE = {
  dark: "/assets/growX-black-logo.svg",
  light: "/assets/growX-logo.svg",
} as const;

const NATURAL_WIDTH = 441;
const NATURAL_HEIGHT = 104;

export default function Logo({
  id = "el-logo",
  href = "/",
  tone = "dark",
  width = 140,
  className = "",
  eager = false,
}: LogoProps) {
  const height = Math.round((width / NATURAL_WIDTH) * NATURAL_HEIGHT);

  return (
    <Link
      id={id}
      href={href}
      aria-label="growX.studio home"
      className={`inline-flex items-center outline-none focus:outline-none focus-visible:ring-0 ${className}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={SRC_BY_TONE[tone]}
        alt="growX.studio"
        width={width}
        height={height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={eager ? "high" : "auto"}
      />
    </Link>
  );
}

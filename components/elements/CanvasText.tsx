"use client";

import { useEffect, useRef, useState } from "react";

/** Light shimmer palette — lines read as motion over the solid brand color. */
const DEFAULT_COLORS = [
  "#6ee7b7",
  "#a7f3d0",
  "#5eead4",
  "#34d399",
  "#d1fae5",
  "#2dd4bf",
];

type Props = {
  text: string;
  /** Applied to the wrapper; inherits font-size/weight/align from the heading. */
  className?: string;
  colors?: string[];
  animationDuration?: number;
  lineWidth?: number;
  lineGap?: number;
  curveIntensity?: number;
};

/** Aceternity-style "Canvas Text": animated colored wavy lines clipped to the
 *  shape of the text. Supports word-wrap / multi-line and text alignment, and
 *  pauses while off-screen. */
export default function CanvasText({
  text,
  className = "",
  colors = DEFAULT_COLORS,
  animationDuration = 6,
  lineWidth = 1.5,
  lineGap = 7,
  curveIntensity = 34,
}: Props) {
  const measureRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dims, setDims] = useState({ w: 0, h: 0 });
  const [font, setFont] = useState("");
  const [color, setColor] = useState("#0a0a0a");
  const [align, setAlign] = useState<"left" | "center" | "right">("left");

  // ── Measure box, font, color and alignment from the (hidden) real text ───
  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      const w = Math.ceil(rect.width);
      const h = Math.ceil(rect.height);
      setDims((d) => (d.w === w && d.h === h ? d : { w, h }));
      const f = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
      setFont((prev) => (prev === f ? prev : f));
      setColor((prev) => (prev === cs.color ? prev : cs.color));
      const ta =
        cs.textAlign === "center"
          ? "center"
          : cs.textAlign === "right" || cs.textAlign === "end"
            ? "right"
            : "left";
      setAlign((prev) => (prev === ta ? prev : ta));
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [text]);

  // ── Animate ──────────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !font || dims.w === 0 || dims.h === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = dims.w * dpr;
    canvas.height = dims.h * dpr;

    // Word-wrap to the measured width using the heading font.
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.font = font;
    const words = text.split(/\s+/).filter(Boolean);
    const lines: string[] = [];
    let cur = "";
    for (const word of words) {
      const test = cur ? `${cur} ${word}` : word;
      if (ctx.measureText(test).width > dims.w && cur) {
        lines.push(cur);
        cur = word;
      } else {
        cur = test;
      }
    }
    if (cur) lines.push(cur);
    const lineHeight = lines.length > 1 ? dims.h / lines.length : dims.h;

    const lineX = (lw: number) =>
      align === "center"
        ? (dims.w - lw) / 2
        : align === "right"
          ? dims.w - lw
          : 0;

    const numLines = Math.floor(dims.h / lineGap) + 4;
    let raf = 0;
    let start = 0;
    let visible = true;

    const draw = (t: number) => {
      if (!start) start = t;
      const phase = ((t - start) / 1000 / animationDuration) * Math.PI * 2;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, dims.w, dims.h);

      // 1) Solid text in its real color, baseline-aligned to match the flow.
      ctx.globalCompositeOperation = "source-over";
      ctx.font = font;
      ctx.textBaseline = "alphabetic";
      ctx.fillStyle = color;
      lines.forEach((line, i) => {
        const m = ctx.measureText(line);
        const ascent = m.actualBoundingBoxAscent || lineHeight * 0.72;
        const descent = m.actualBoundingBoxDescent || lineHeight * 0.2;
        const baseY = lineHeight * i + (lineHeight + ascent - descent) / 2;
        ctx.fillText(line, lineX(m.width), baseY);
      });

      // 2) Colored wavy lines, drawn only over the text.
      ctx.globalCompositeOperation = "source-atop";
      for (let i = 0; i < numLines; i++) {
        const y = i * lineGap;
        const c1 = Math.sin(phase + i * 0.18) * curveIntensity;
        const c2 = Math.sin(phase + 0.6 + i * 0.18) * curveIntensity * 0.6;
        ctx.strokeStyle = colors[i % colors.length];
        ctx.lineWidth = lineWidth;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.bezierCurveTo(dims.w * 0.33, y + c1, dims.w * 0.66, y + c2, dims.w, y);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        const nowVisible = entry.isIntersecting;
        if (nowVisible && !visible) {
          start = 0;
          raf = requestAnimationFrame(draw);
        } else if (!nowVisible && visible) {
          cancelAnimationFrame(raf);
        }
        visible = nowVisible;
      },
      { rootMargin: "100px" },
    );
    io.observe(canvas);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, [text, font, color, dims, align, colors, animationDuration, lineWidth, lineGap, curveIntensity]);

  return (
    <span className={`relative inline-block align-baseline ${className}`}>
      <span ref={measureRef} aria-hidden="true" className="invisible inline-block">
        {text}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ width: dims.w || "auto", height: dims.h || "auto" }}
      />
    </span>
  );
}

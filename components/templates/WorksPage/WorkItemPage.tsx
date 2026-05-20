import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Clock, Star } from "lucide-react";
import type { PortfolioItem } from "@/lib/content";
import Button from "@/components/elements/Button";

type Props = { item: PortfolioItem };

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < rating ? "fill-brand text-brand" : "fill-border text-border"}
            strokeWidth={0}
          />
        ))}
      </div>
      <span className="text-sm font-semibold text-foreground">{rating}.0</span>
      <span className="text-sm text-muted">/ 5 — {rating === 5 ? "Outstanding" : rating === 4 ? "Excellent" : "Great"}</span>
    </div>
  );
}

export default function WorkItemPage({ item }: Props) {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section id="gw-work-hero" className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 -top-24 h-80 w-175 -translate-x-1/2 rounded-full bg-brand/8 blur-[100px]"
        />

        <div className="container-1200 pb-12 pt-12 sm:pb-16 sm:pt-16">
          {/* Breadcrumb */}
          <Link
            href="/works"
            className="inline-flex items-center gap-1.5 text-xs text-muted transition hover:text-foreground"
          >
            <ArrowLeft size={13} />
            All work
          </Link>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Left: metadata */}
            <div>
              <span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-foreground/80">
                {item.tag}
              </span>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
                {item.title}
              </h1>

              <p className="mt-3 text-lg font-medium text-brand">{item.client}</p>

              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                {item.description}
              </p>

              {/* Stats strip */}
              <div className="mt-8 flex flex-wrap items-center gap-6 border-t border-border pt-6">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Clock size={14} className="shrink-0 text-brand" />
                  <span className="font-medium text-foreground">{item.duration}</span>
                  <span>delivery</span>
                </div>
                <StarRating rating={item.rating} />
              </div>
            </div>

            {/* Right: cover image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl border border-border bg-surface">
              <Image
                src={item.image}
                alt={item.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Problem & Overview ───────────────────────────────── */}
      <section id="gw-work-problem" className="bg-surface">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                The Problem
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                What we were solving
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">{item.problem}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                What We Built
              </p>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Our approach
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted">{item.description}</p>

              {/* Technologies */}
              <div className="mt-8">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Technologies & Tools
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-foreground/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Media Gallery ────────────────────────────────────── */}
      {item.media.length > 0 && (
        <section id="gw-work-media" className="bg-background">
          <div className="container-1200 py-20 sm:py-24 lg:py-28">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Project Media
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              From the work
            </h2>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {item.media.map((m, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl border border-border bg-surface ${
                    i === 0 ? "sm:col-span-2 lg:col-span-2" : ""
                  }`}
                >
                  {m.type === "video" ? (
                    <video
                      src={m.src}
                      className="w-full"
                      controls
                      playsInline
                      preload="metadata"
                    />
                  ) : (
                    <div className={`relative w-full ${i === 0 ? "aspect-video" : "aspect-4/3"}`}>
                      <Image
                        src={m.src}
                        alt={m.alt ?? item.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Client Rating ────────────────────────────────────── */}
      <section id="gw-work-rating" className="bg-surface">
        <div className="container-1200 py-20 sm:py-24">
          <div className="mx-auto max-w-2xl rounded-2xl border border-border bg-background p-10 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              Client Feedback
            </p>
            <div className="mt-5 flex items-center justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={28}
                  className={i < item.rating ? "fill-brand text-brand" : "fill-border text-border"}
                  strokeWidth={0}
                />
              ))}
            </div>
            <p className="mt-3 text-4xl font-bold tracking-tight text-foreground">
              {item.rating}.0 <span className="text-lg font-normal text-muted">/ 5</span>
            </p>
            <p className="mt-2 text-base font-semibold text-foreground">{item.client}</p>
            <p className="mt-1 text-sm text-muted">{item.tag} · {item.duration} engagement</p>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section id="gw-work-cta" className="relative overflow-hidden bg-background">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -z-10 left-1/2 top-0 h-72 w-150 -translate-x-1/2 rounded-full bg-brand/8 blur-[90px]"
        />
        <div className="container-1200 py-24 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Start your project
          </p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
            Want work like this?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base text-muted">
            Bring the brief. We'll bring the team, the creative direction, and a proposal in 24 hours.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button label="Book a Discovery Call" href="#book" icon={<ArrowRight size={15} />} />
            <Button label="View all work" href="/works" variant="secondary" />
          </div>
        </div>
      </section>
    </>
  );
}

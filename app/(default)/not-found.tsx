import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function NotFound() {
  return (
    <section id="gw-not-found" className="relative flex min-h-[calc(100dvh-4rem)] items-center overflow-hidden bg-background">
      {/* Glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-1/2 top-1/2 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/6 blur-[120px]"
      />

      <div className="container-1200 py-24 text-center">
        {/* Large 404 */}
        <p className="font-mono text-[8rem] font-bold leading-none tracking-tight text-foreground/6 select-none sm:text-[12rem] lg:text-[16rem]">
          404
        </p>

        {/* Text — overlaid via negative margin */}
        <div className="-mt-8 sm:-mt-12 lg:-mt-16">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
            Page not found
          </p>
          <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Nothing to see here.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-base text-muted">
            The page you&apos;re looking for doesn&apos;t exist or has been moved. Head back home or book a call — we&apos;re always here.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-sm font-medium text-foreground transition hover:border-foreground/30 hover:bg-surface"
            >
              <ArrowLeft size={15} className="transition-transform group-hover:-translate-x-0.5" />
              Back to home
            </Link>
            <Link
              href="#book"
              className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              Book a Discovery Call
              <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

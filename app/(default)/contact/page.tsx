import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import { getSite } from "@/lib/content";
import Eyebrow from "@/components/elements/Eyebrow";
import InnerHeroBackdrop from "@/components/modules/Hero/InnerHeroBackdrop";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to the growX team about white-label fulfillment for your agency. Email us directly and we'll come back to you within one business day.",
};

export default async function ContactRoute() {
  const site = await getSite();

  return (
    <>
      {/* ── Hero (dark, emerald-lit — same family as the home hero) ────── */}
      <section
        id="gw-contact-hero"
        data-nav-theme="dark" data-dark-surface
        className="relative isolate overflow-hidden bg-foreground text-background"
      >
        <InnerHeroBackdrop />
        <div className="container-1200 pb-14 pt-24 text-center sm:pb-16 sm:pt-28 lg:pt-30">
          <div className="mx-auto max-w-2xl">
            <Eyebrow text="Contact" />
            <h1 className="mt-4 text-4xl font-bold leading-[1.15] tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s talk about your fulfillment.
            </h1>
            <p className="mt-5 text-base text-white/70 sm:text-lg">
              Tell us what you sell and where delivery is hurting. We&apos;ll come
              back to you within one business day with a straight answer on
              whether we&apos;re a fit.
            </p>
          </div>
        </div>
      </section>

      {/* ── Contact methods ──────────────────────────────────── */}
      <section id="gw-contact" className="bg-background">
        <div className="container-1200 py-20 sm:py-24 lg:py-28">
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
          <div className="flex flex-col border border-border bg-surface p-8">
            <Mail size={20} className="text-brand" aria-hidden="true" />
            <h2 className="mt-4 text-xl font-bold tracking-tight text-foreground">
              Email us
            </h2>
            <p className="mt-2 text-sm text-muted">
              The fastest way to reach the team. Goes straight to a human, not a
              queue.
            </p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-(--brand-text) transition-colors hover:text-foreground"
            >
              {site.email}
              <ArrowRight size={15} aria-hidden="true" />
            </a>
          </div>

          <div className="flex flex-col border border-border bg-surface p-8">
            <h2 className="text-xl font-bold tracking-tight text-foreground">
              Ready to start?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Browse the partnership tiers and pick the one that matches how much
              of fulfillment you want off your plate.
            </p>
            <Link
              href="/pricing"
              className="mt-6 inline-flex items-center gap-2 self-start text-sm font-semibold text-(--brand-text) transition-colors hover:text-foreground"
            >
              See pricing
              <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-10 max-w-4xl">
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border pt-8 text-sm text-muted">
            <span>Follow along:</span>
            {site.social.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="font-medium text-foreground transition-colors hover:text-(--brand-text)"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>
        </div>
      </section>
    </>
  );
}

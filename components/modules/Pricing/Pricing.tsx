import Link from "next/link";
import { Check } from "lucide-react";
import PricingCTA from "./PricingCTA";
import SectionHeader from "@/components/elements/SectionHeader";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getPricing } from "@/lib/content";

export default async function Pricing({ noPaddingTop }: { noPaddingTop?: boolean }) {
  const data = await getPricing();

  return (
    <section
      id={`gw-${data.id}`}
      aria-labelledby={`${data.id}-headline`}
      className="relative isolate overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_80%_70%_at_50%_30%,#000_20%,transparent_85%)]" />

      <div className={`container-1200 relative ${noPaddingTop ? "pt-0 pb-24 sm:pb-32 lg:pb-40" : "py-24 sm:py-32 lg:py-40"}`}>
        <ScrollFadeIn delay={0.1}>
          <SectionHeader
            eyebrow={data.eyebrow}
            headline={data.headline.parts}
            headlineId={`${data.id}-headline`}
            sub={data.sub}
            align="center"
            headlineClassName="mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl"
            highlightClassName="bg-gradient-to-br from-brand to-[#059669] bg-clip-text text-transparent"
            underlineHighlight={false}
          />
        </ScrollFadeIn>

        <div className="mx-auto mt-16 grid max-w-7xl grid-cols-1 gap-8 lg:grid-cols-3">
          {data.tiers.map((tier, idx) => (
            <ScrollFadeIn key={tier.id} delay={0.1 + (idx * 0.1)}>
              <div
                className={`h-full relative flex flex-col rounded-2xl border p-8 backdrop-blur-sm transition ${
                  tier.highlighted
                    ? "border-brand bg-background/90 shadow-[0_0_40px_rgba(16,185,129,0.1)]"
                    : "border-border bg-background/70"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-background">
                      Most Popular
                    </span>
                  </div>
                )}
  
                <h3 className="text-xl font-semibold text-foreground">{tier.name}</h3>
                <p className="mt-2 text-sm text-muted">{tier.description}</p>
  
                <div className="mt-6">
                  <p className="text-4xl font-bold text-foreground">{tier.price}</p>
                  {tier.price !== "Custom" && (
                    <p className="text-xs text-muted">/month</p>
                  )}
                </div>
  
                {tier.cta.href.startsWith("#onboard-") ? (
                  <PricingCTA
                    planKey={tier.cta.href.replace("#onboard-", "")}
                    label={tier.cta.label}
                    highlighted={tier.highlighted}
                  />
                ) : (
                  <Link
                    href={tier.cta.href}
                    className={`mt-8 block rounded-full py-3 text-center text-sm font-medium transition ${
                      tier.highlighted
                        ? "bg-brand text-background hover:bg-brand/90"
                        : "border border-border text-foreground hover:border-foreground/20 hover:bg-black/5"
                    }`}
                  >
                    {tier.cta.label}
                  </Link>
                )}
  
                <div className="mt-8 space-y-4 border-t border-border pt-8">
                  {tier.features.map((feature, featureIdx) => (
                    <div key={featureIdx} className="flex items-start gap-3">
                      <Check size={18} className="mt-0.5 shrink-0 text-brand" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollFadeIn>
          ))}
        </div>

        <p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted">
          All plans include unlimited revisions, dedicated support, and a satisfaction guarantee. Not sure which plan is right for you?{" "}
          <Link href="#book" className="font-semibold text-brand hover:text-brand/80">
            Let's talk.
          </Link>
        </p>
      </div>
    </section>
  );
}

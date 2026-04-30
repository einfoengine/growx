import { Plus } from "lucide-react";
import Headline from "@/components/elements/Headline";
import ScrollFadeIn from "@/components/elements/ScrollFadeIn";
import { getFaq } from "@/lib/content";

export default async function Faq() {
  const data = await getFaq();

  return (
    <section
      id={data.id}
      aria-labelledby={`${data.id}-headline`}
      className="relative bg-surface"
    >
      <div className="container-1200 py-24 sm:py-28 lg:py-32">
        <ScrollFadeIn delay={0.1}>
          <div
            id={`${data.id}-intro`}
            className="grid gap-10 lg:grid-cols-12 lg:items-end"
          >
            <div className="lg:col-span-7">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-brand">
                {data.eyebrow}
              </p>
              <Headline
                id={`${data.id}-headline`}
                parts={data.headline.parts}
                as="h2"
                className="mt-4 text-4xl font-semibold tracking-tight text-foreground sm:text-5xl lg:text-6xl"
              />
            </div>
            <p className="text-base text-muted lg:col-span-5 lg:max-w-md">
              {data.sub}
            </p>
          </div>
        </ScrollFadeIn>

        <ScrollFadeIn delay={0.3}>
          <div
            id={`${data.id}-list`}
            className="mt-12 overflow-hidden rounded-3xl border border-border bg-background"
          >
            {data.items.map((item, i) => (
              <details
                key={item.id}
                id={item.id}
                className={`group ${i > 0 ? "border-t border-border" : ""}`}
              >
                <summary className="flex cursor-pointer list-none items-start justify-between gap-6 px-6 py-5 text-left text-base font-medium text-foreground transition-colors hover:bg-surface sm:px-8 sm:py-6 sm:text-lg [&::-webkit-details-marker]:hidden">
                  <span>{item.question}</span>
                  <span
                    aria-hidden="true"
                    className="mt-1 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-(--brand-soft) text-brand transition-transform group-open:rotate-45"
                  >
                    <Plus size={14} />
                  </span>
                </summary>
                <div className="px-6 pb-6 sm:px-8 sm:pb-7">
                  <p className="max-w-3xl text-sm leading-relaxed text-muted sm:text-base">
                    {item.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </ScrollFadeIn>
      </div>
    </section>
  );
}

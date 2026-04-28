import Headline from "@/components/elements/Headline";
import { getTestimonials } from "@/lib/content";

export default async function Testimonials() {
  const data = await getTestimonials();

  return (
    <section
      id={data.id}
      aria-labelledby={`${data.id}-headline`}
      className="relative isolate overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_right,rgba(10,10,10,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(10,10,10,0.05)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_80%_70%_at_50%_30%,#000_20%,transparent_85%)]" />

      <div className="container-1200 relative py-24 sm:py-32 lg:py-40">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold text-brand">{data.eyebrow}</p>
          <Headline
            id={`${data.id}-headline`}
            parts={data.headline.parts}
            as="h2"
            className="mt-3 text-4xl font-semibold leading-tight tracking-tight text-foreground sm:text-5xl"
            highlightClassName="bg-gradient-to-br from-brand to-[#059669] bg-clip-text text-transparent"
            underlineHighlight={false}
          />
          <p className="mx-auto mt-4 max-w-2xl text-base text-muted">{data.sub}</p>
        </div>

        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {data.testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col rounded-2xl border border-border bg-background/70 p-8 backdrop-blur-sm"
            >
              <div className="flex items-start gap-1">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-lg text-brand">
                    ★
                  </span>
                ))}
              </div>
              <p className="mt-6 text-base leading-relaxed text-foreground">{testimonial.quote}</p>
              <div className="mt-8 flex items-center gap-4 border-t border-border pt-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand/10">
                  <span className="text-sm font-bold text-brand">{testimonial.name[0]}</span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-xs text-muted">
                    {testimonial.title} · {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

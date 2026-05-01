import Eyebrow from "@/components/elements/Eyebrow";
import { ArrowRight } from "lucide-react";

export default function Newsletter() {
  return (
    <section className="relative overflow-hidden bg-background py-24 sm:py-32">
      <div className="container-1200">
        <div className="relative overflow-hidden rounded-[3rem] bg-surface border border-border px-6 py-20 sm:px-16 sm:py-24 text-center">
          {/* Background glows */}
          <div className="absolute -top-24 left-1/2 -z-10 h-64 w-64 -translate-x-1/2 rounded-full bg-brand/20 blur-[100px]" />
          <div className="absolute -bottom-24 right-0 -z-10 h-64 w-64 rounded-full bg-(--brand-soft) blur-[100px]" />
          
          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center">
            <Eyebrow text="Newsletter" />
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              Get growth strategies delivered straight to your inbox.
            </h2>
            <p className="mt-4 text-base text-muted sm:text-lg">
              Join 10,000+ founders and marketers receiving our weekly newsletter on scaling digital agencies.
            </p>
            
            <form className="mt-10 flex w-full flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full min-w-0 flex-auto rounded-full border border-border bg-background px-5 py-3.5 text-base text-foreground placeholder:text-muted focus:border-brand focus:outline-none focus:ring-1 focus:ring-brand"
              />
              <button
                type="submit"
                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-black transition-all hover:bg-[#059669] hover:scale-105"
              >
                Subscribe <ArrowRight size={16} />
              </button>
            </form>
            <p className="mt-4 text-xs text-muted">We care about your data. Read our Privacy Policy.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

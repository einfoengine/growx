import Comparison from "@/components/modules/Comparison";
import Faq from "@/components/modules/Faq";
import Hero from "@/components/modules/Hero";
import LogoMarquee from "@/components/modules/LogoMarquee";
import PainPoints from "@/components/modules/PainPoints";
import Pricing from "@/components/modules/Pricing";
import Process from "@/components/modules/Process";
import Services from "@/components/modules/Services";
import PortfolioCarousel from "@/components/modules/PortfolioCarousel/PortfolioCarousel";
import TextMarquee from "@/components/modules/TextMarquee/TextMarquee";
import Testimonials from "@/components/modules/Testimonials";
import BlogSection from "@/components/modules/BlogSection/BlogSection";
import Newsletter from "@/components/modules/Newsletter/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <PainPoints />
      <Services />
      <Process />
      <PortfolioCarousel />
      <TextMarquee />
      <Testimonials />
      {/* Pricing pins while Comparison scrolls up and overlaps it */}
      <div className="relative">
        <div className="sticky top-0">
          <Pricing noPaddingBottom />
        </div>
        <div className="relative z-10 shadow-[0_-24px_48px_-12px_rgba(0,0,0,0.12)]">
          <Comparison />
        </div>
      </div>
      <BlogSection />
      <Faq />
      <Newsletter />
    </>
  );
}

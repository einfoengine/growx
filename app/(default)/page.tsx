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
      <Process />
      <Services />
      <PortfolioCarousel />
      <TextMarquee />
      <Testimonials />
      <Pricing noPaddingTop />
      <Comparison />
      <BlogSection />
      <Faq />
      <Newsletter />
    </>
  );
}

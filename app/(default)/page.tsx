import Comparison from "@/components/modules/Comparison";
import CtaBanner from "@/components/modules/CtaBanner";
import Faq from "@/components/modules/Faq";
import Hero from "@/components/modules/Hero";
import LogoMarquee from "@/components/modules/LogoMarquee";
import PainPoints from "@/components/modules/PainPoints";
import Pricing from "@/components/modules/Pricing";
import Process from "@/components/modules/Process";
import Services from "@/components/modules/Services";
import Testimonials from "@/components/modules/Testimonials";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <PainPoints />
      <Services />
      <Testimonials />
      <Pricing />
      <Comparison />
      <Process />
      {/* <GrowthCalculator /> */}
      <Faq />
      <CtaBanner />
    </>
  );
}

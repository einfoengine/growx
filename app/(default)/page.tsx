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
import ScrollReveal from "@/components/elements/ScrollReveal";
import BlogSection from "@/components/modules/BlogSection/BlogSection";
import Newsletter from "@/components/modules/Newsletter/Newsletter";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollReveal><LogoMarquee /></ScrollReveal>
      <PainPoints />
      <ScrollReveal><Services /></ScrollReveal>
      <ScrollReveal><PortfolioCarousel /></ScrollReveal>
      <TextMarquee />
      <ScrollReveal><Testimonials /></ScrollReveal>
      <ScrollReveal><Pricing noPaddingTop /></ScrollReveal>
      <ScrollReveal><Comparison noPaddingTop /></ScrollReveal>
      <ScrollReveal><Process noPaddingTop /></ScrollReveal>
      <ScrollReveal><BlogSection /></ScrollReveal>
      <ScrollReveal><Faq /></ScrollReveal>
      <ScrollReveal><Newsletter /></ScrollReveal>
    </>
  );
}

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
import ScrollReveal from "@/components/elements/ScrollReveal";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ScrollReveal><LogoMarquee /></ScrollReveal>
      <ScrollReveal><PainPoints /></ScrollReveal>
      <ScrollReveal><Services /></ScrollReveal>
      <ScrollReveal><Testimonials /></ScrollReveal>
      <ScrollReveal><Pricing noPaddingTop /></ScrollReveal>
      <ScrollReveal><Comparison noPaddingTop /></ScrollReveal>
      <ScrollReveal><Process noPaddingTop /></ScrollReveal>
      <ScrollReveal><Faq /></ScrollReveal>
      <ScrollReveal><CtaBanner /></ScrollReveal>
    </>
  );
}

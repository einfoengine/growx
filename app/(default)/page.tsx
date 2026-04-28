import CtaBanner from "@/components/modules/CtaBanner";
import Faq from "@/components/modules/Faq";
import Hero from "@/components/modules/Hero";
import LogoMarquee from "@/components/modules/LogoMarquee";
import PainPoints from "@/components/modules/PainPoints";
import Process from "@/components/modules/Process";
import Services from "@/components/modules/Services";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <PainPoints />
      <Services />
      <Process />
      <Faq />
      <CtaBanner />
    </>
  );
}

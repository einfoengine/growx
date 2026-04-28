import siteData from "@/data/site.json";
import headerData from "@/data/modules/header.json";
import footerData from "@/data/modules/footer.json";
import heroHomeData from "@/data/modules/hero-home.json";
import logoMarqueeData from "@/data/modules/logo-marquee.json";
import servicesData from "@/data/modules/services.json";
import processData from "@/data/modules/process.json";
import ctaBannerData from "@/data/modules/cta-banner.json";
import painPointsData from "@/data/modules/pain-points.json";
import faqData from "@/data/modules/faq.json";
import type {
  CtaBannerContent,
  FaqContent,
  FooterContent,
  HeaderContent,
  HeroContent,
  LogoMarqueeContent,
  PageSlug,
  PainPointsContent,
  ProcessContent,
  ServicesContent,
  Site,
} from "./types";

const HERO_BY_PAGE: Record<PageSlug, HeroContent> = {
  home: heroHomeData as HeroContent,
};

export async function getSite(): Promise<Site> {
  return siteData as Site;
}

export async function getHeader(): Promise<HeaderContent> {
  return headerData as HeaderContent;
}

export async function getFooter(): Promise<FooterContent> {
  return footerData as FooterContent;
}

export async function getHero(page: PageSlug): Promise<HeroContent> {
  return HERO_BY_PAGE[page];
}

export async function getLogoMarquee(): Promise<LogoMarqueeContent> {
  return logoMarqueeData as LogoMarqueeContent;
}

export async function getServices(): Promise<ServicesContent> {
  return servicesData as ServicesContent;
}

export async function getProcess(): Promise<ProcessContent> {
  return processData as ProcessContent;
}

export async function getCtaBanner(): Promise<CtaBannerContent> {
  return ctaBannerData as CtaBannerContent;
}

export async function getPainPoints(): Promise<PainPointsContent> {
  return painPointsData as PainPointsContent;
}

export async function getFaq(): Promise<FaqContent> {
  return faqData as FaqContent;
}

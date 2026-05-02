import aboutData from "@/data/modules/about.json";
import processPageData from "@/data/pages/process.json";
import caseStudyNovaSaasData from "@/data/case-studies/novasaas-seo.json";
import caseStudyMeridianData from "@/data/case-studies/meridian-ppc.json";
import caseStudyStyleSphereData from "@/data/case-studies/stylesphere-social.json";
import caseStudyApexData from "@/data/case-studies/apex-web.json";
import serviceWebsiteData from "@/data/services/website.json";
import serviceSeoAeoData from "@/data/services/seo-aeo.json";
import servicePpcData from "@/data/services/ppc.json";
import serviceContentData from "@/data/services/content.json";
import serviceSocialData from "@/data/services/social.json";
import serviceFunnelsData from "@/data/services/funnels.json";
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
import testimonialsData from "@/data/modules/testimonials.json";
import pricingData from "@/data/modules/pricing.json";
import comparisonData from "@/data/modules/comparison.json";
import growthCalculatorData from "@/data/modules/growth-calculator.json";
import portfolioData from "@/data/modules/portfolio.json";
import type {
  AboutContent,
  CaseStudy,
  ProcessPageContent,
  ServicePageContent,
  ComparisonContent,
  CtaBannerContent,
  FaqContent,
  FooterContent,
  GrowthCalculatorContent,
  HeaderContent,
  HeroContent,
  LogoMarqueeContent,
  PageSlug,
  PainPointsContent,
  PortfolioContent,
  PortfolioItem,
  PricingContent,
  ProcessContent,
  ServicesContent,
  Site,
  TestimonialsContent,
} from "./types";

const HERO_BY_PAGE: Record<PageSlug, HeroContent> = {
  home: heroHomeData as HeroContent,
};

export async function getAbout(): Promise<AboutContent> {
  return aboutData as AboutContent;
}

export async function getProcessPage(): Promise<ProcessPageContent> {
  return processPageData as ProcessPageContent;
}

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

export async function getTestimonials(): Promise<TestimonialsContent> {
  return testimonialsData as TestimonialsContent;
}

export async function getPricing(): Promise<PricingContent> {
  return pricingData as PricingContent;
}

export async function getComparison(): Promise<ComparisonContent> {
  return comparisonData as ComparisonContent;
}

export async function getGrowthCalculator(): Promise<GrowthCalculatorContent> {
  return growthCalculatorData as GrowthCalculatorContent;
}

export async function getPortfolio(): Promise<PortfolioContent> {
  return portfolioData as PortfolioContent;
}

export const WORK_ITEM_SLUGS = (portfolioData as PortfolioContent).items.map(
  (item) => item.slug
);

export async function getWorkItem(slug: string): Promise<PortfolioItem | null> {
  return (
    (portfolioData as PortfolioContent).items.find((item) => item.slug === slug) ?? null
  );
}

const SERVICE_PAGES: Record<string, ServicePageContent> = {
  website: serviceWebsiteData as ServicePageContent,
  "seo-aeo": serviceSeoAeoData as ServicePageContent,
  ppc: servicePpcData as ServicePageContent,
  content: serviceContentData as ServicePageContent,
  social: serviceSocialData as ServicePageContent,
  funnels: serviceFunnelsData as ServicePageContent,
};

export const SERVICE_SLUGS = Object.keys(SERVICE_PAGES);

export async function getServicePage(slug: string): Promise<ServicePageContent | null> {
  return SERVICE_PAGES[slug] ?? null;
}

const CASE_STUDIES: Record<string, CaseStudy> = {
  "novasaas-seo": caseStudyNovaSaasData as CaseStudy,
  "meridian-ppc": caseStudyMeridianData as CaseStudy,
  "stylesphere-social": caseStudyStyleSphereData as CaseStudy,
  "apex-web": caseStudyApexData as CaseStudy,
};

export const CASE_STUDY_SLUGS = Object.keys(CASE_STUDIES);

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return Object.values(CASE_STUDIES);
}

export async function getCaseStudy(slug: string): Promise<CaseStudy | null> {
  return CASE_STUDIES[slug] ?? null;
}

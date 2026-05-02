export type Link = {
  id: string;
  label: string;
  href: string;
  children?: Link[];
};

export type SocialIcon = "linkedin" | "instagram" | "facebook" | "youtube";

export type SocialLink = {
  id: string;
  label: string;
  href: string;
  icon: SocialIcon;
};

export type Site = {
  name: string;
  legalName: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  social: SocialLink[];
};

export type CTA = Link & {
  variant?: "primary" | "secondary" | "ghost";
};

export type HeaderContent = {
  id: string;
  nav: Link[];
  cta: CTA;
};

export type FooterColumn = {
  id: string;
  title: string;
  links: Link[];
};

export type FooterContent = {
  id: string;
  brandBlurb: string;
  columns: FooterColumn[];
  legal: Link[];
};

export type HeadlinePart =
  | { type: "text"; value: string }
  | { type: "highlight"; value: string };

export type HeroStat = {
  id: string;
  label: string;
};

export type HeroRating = {
  value: number;
  label: string;
  outOf: number;
};

export type HeroContent = {
  id: string;
  eyebrow: { label: string; href: string };
  headline: { parts: HeadlinePart[] };
  tagline?: string;
  sub: string;
  ctas: CTA[];
  rating?: HeroRating;
  stats: HeroStat[];
};

export type ServiceIcon =
  | "code"
  | "search"
  | "bot"
  | "pen-tool"
  | "share-2"
  | "funnel"
  | "target";

export type ServiceCard = {
  id: string;
  title: string;
  blurb: string;
  href: string;
  icon: ServiceIcon;
};

export type ServicesContent = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  cards: ServiceCard[];
};

export type ProcessStep = {
  id: string;
  number: string;
  title: string;
  blurb: string;
};

export type ProcessContent = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  steps: ProcessStep[];
};

export type LogoMarqueeContent = {
  id: string;
  label: string;
  items: string[];
};

export type CtaBannerContent = {
  id: string;
  eyebrow?: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  ctas: CTA[];
};

export type PainIcon =
  | "triangle-alert"
  | "user-x"
  | "layers"
  | "trending-down"
  | "clock";

export type PainCard = {
  id: string;
  title: string;
  blurb: string;
  icon: PainIcon;
  points?: string[];
};

export type PainPointsContent = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  cards: PainCard[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type FaqContent = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  items: FaqItem[];
};

export type Testimonial = {
  id: string;
  name: string;
  title: string;
  company: string;
  quote: string;
  metric?: string;
  metricLabel?: string;
  image?: string;
};

export type TestimonialsContent = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  testimonials: Testimonial[];
};

export type PricingTier = {
  id: string;
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: CTA;
  highlighted?: boolean;
};

export type PricingContent = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  tiers: PricingTier[];
};

export type ComparisonRow = {
  feature: string;
  scalify: boolean | string;
  inHouse: boolean | string;
  traditional: boolean | string;
  marketplace: boolean | string;
};

export type ComparisonContent = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  rows: ComparisonRow[];
};

export type GrowthCalculatorContent = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  description: string;
  cta: CTA;
};

export type ServiceDeliverable = {
  id: string;
  title: string;
  description: string;
};

export type ServicePricingModel = "one-off" | "retainer" | "both";

export type ServicePageContent = {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  pricingModel: ServicePricingModel;
  deliverables: ServiceDeliverable[];
  whyUs: ServiceDeliverable[];
  faq: FaqItem[];
};

export type PageSlug = "home";

export type PortfolioCategory = "web" | "social" | "video";

export type PortfolioMedia = {
  type: "image" | "video";
  src: string;
  alt?: string;
};

export type PortfolioItem = {
  id: string;
  slug: string;
  title: string;
  client: string;
  tag: string;
  image: string;
  category: PortfolioCategory;
  featured?: boolean;
  description: string;
  problem: string;
  technologies: string[];
  duration: string;
  rating: number;
  media: PortfolioMedia[];
};

export type PortfolioContent = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  categories: { key: PortfolioCategory; label: string }[];
  items: PortfolioItem[];
};

export type AboutStat = {
  id: string;
  value: string;
  label: string;
};

export type AboutValue = {
  id: string;
  title: string;
  description: string;
};

export type AboutPillar = {
  id: string;
  label: string;
};

export type FounderExperience = {
  id: string;
  role: string;
  company: string;
  period: string;
};

export type FounderSocial = {
  platform: "linkedin" | "twitter" | "instagram";
  url: string;
};

export type Founder = {
  id: string;
  name: string;
  role: string;
  bio: string;
  qualifications: string[];
  experience: FounderExperience[];
  socials: FounderSocial[];
  image?: string;
  initials: string;
  avatarColor: string;
};

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  bio: string;
  image?: string;
  initials: string;
  avatarColor: string;
};

export type AboutContent = {
  id: string;
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
  };
  mission: {
    eyebrow: string;
    headline: string;
    body: string;
  };
  founders: Founder[];
  team: TeamMember[];
  values: AboutValue[];
  stats: AboutStat[];
  approach: {
    eyebrow: string;
    headline: string;
    body: string;
    pillars: AboutPillar[];
  };
  featuredTestimonial: {
    quote: string;
    author: string;
    title: string;
    metric: string;
    metricLabel: string;
  };
};

export type CaseStudyResult = {
  id: string;
  value: string;
  label: string;
};

export type CaseStudyTestimonial = {
  quote: string;
  author: string;
  title: string;
};

export type CaseStudy = {
  id: string;
  slug: string;
  client: string;
  industry: string;
  service: string;
  serviceSlug: string;
  duration: string;
  tagline: string;
  description: string;
  challenge: string;
  solution: string;
  results: CaseStudyResult[];
  testimonial?: CaseStudyTestimonial;
  services: string[];
};

export type ProcessJourneyStep = {
  id: string;
  title: string;
  body: string;
};

export type ProcessJourneyPhase = {
  id: string;
  number: string;
  label: string;
  title: string;
  description: string;
  steps: ProcessJourneyStep[];
};

export type ProcessChannel = {
  id: string;
  name: string;
  description: string;
};

export type ProcessCadenceItem = {
  id: string;
  period: string;
  action: string;
};

export type ProcessPromise = {
  id: string;
  title: string;
  description: string;
};

export type ProcessFaqItem = {
  id: string;
  question: string;
  answer: string;
};

export type ProcessPageContent = {
  id: string;
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
  };
  journey: {
    eyebrow: string;
    headline: string;
    sub: string;
    phases: ProcessJourneyPhase[];
  };
  communication: {
    eyebrow: string;
    headline: string;
    sub: string;
    channels: ProcessChannel[];
    cadence: ProcessCadenceItem[];
  };
  whiteLabel: {
    eyebrow: string;
    headline: string;
    sub: string;
    promises: ProcessPromise[];
  };
  faq: ProcessFaqItem[];
};

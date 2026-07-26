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
  /** Expectation-setting microcopy under the primary CTA (home hero). */
  ctaNote?: string;
  rating?: HeroRating;
  stats: HeroStat[];
};

export type Testimonial = {
  id: string;
  name: string;
  title: string;
  company: string;
  /** Headline number for the card, e.g. "3x" or "10 days". */
  metric: string;
  metricLabel: string;
  quote: string;
};

export type TestimonialsContent = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  testimonials: Testimonial[];
};

export type ServiceIcon =
  | "code"
  | "search"
  | "bot"
  | "pen-tool"
  | "share-2"
  | "funnel"
  | "target"
  | "clapperboard"
  | "film"
  | "user-plus"
  | "headset"
  | "terminal";

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

export type NewsletterContent = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  /** Email input placeholder. */
  placeholder: string;
  /** Submit button label. */
  cta: string;
  /** Fine-print reassurance shown under the form. */
  disclaimer: string;
  /** Optional line of social proof (e.g. subscriber count). */
  socialProof?: string;
  /** Short benefit chips shown beneath the form. */
  perks?: string[];
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

export type PricingTier = {
  id: string;
  name: string;
  /** The rung this tier maps to, e.g. "The Vendor". */
  persona?: string;
  price: string;
  description: string;
  features: string[];
  cta: CTA;
  highlighted?: boolean;
};

/** One rung of the Vendor -> Team member -> Department partnership ladder. */
export type PricingLadderRung = {
  id: string;
  tier: string;
  name: string;
  description: string;
};

export type PricingContent = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  /** One line separating the membership fee from per-project service pricing. */
  clarifier?: string;
  ladder?: PricingLadderRung[];
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

export type ServiceDeliverable = {
  id: string;
  title: string;
  description: string;
};

export type ServicePricingModel = "one-off" | "retainer" | "both";

/** Copy for the transparent rate-card + margin-calculator section of a rich
 *  service landing page. Copy ONLY — the numbers ($/unit, durations) come from
 *  data/pages/pricing.json via getServicePricingConfig, so this page, /pricing,
 *  and checkout can never drift apart. */
export type ServiceLandingPricing = {
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  /** Markup presets for the margin calculator, e.g. [1.5, 2, 3]. */
  markupOptions: number[];
  defaultMarkup: number;
  /** Risk-reversal bullets rendered under the calculator. */
  guarantees: ServiceDeliverable[];
  /** Soft alternative for the not-ready (e.g. the free-portal line). */
  note?: string;
};

/** Optional rich-landing content: its presence on a service JSON switches the
 *  route from the shared classic layout to the high-converting rich layout.
 *  Every block is optional so a service can adopt the rich page piecemeal. */
export type ServiceLandingFeatureGroup = {
  id: string;
  title: string;
  /** Icon key rendered as the group's black sticker chip. */
  icon:
    | "palette" | "code" | "gauge" | "shield" | "wrench" | "headset"
    | "search" | "bot" | "link-2" | "bar-chart-3";
  items: string[];
};

export type ServiceLandingContent = {
  hero?: { stats?: HeroStat[]; ctaNote?: string; secondaryCta?: CTA };
  /** VSL under the hero (same treatment as the home hero's video). */
  vsl?: { videoId: string };
  /** Platforms/tools scrolled in the marquee band under the hero. */
  platforms?: string[];
  pains?: PainPointsContent;
  /** The complete feature list: design, stack, performance, security,
   *  maintenance, support — grouped checklists. */
  features?: {
    eyebrow: string;
    headline: { parts: HeadlinePart[] };
    sub: string;
    groups: ServiceLandingFeatureGroup[];
  };
  work?: {
    category: PortfolioCategory;
    eyebrow: string;
    headline: { parts: HeadlinePart[] };
    sub: string;
  };
  pricing?: ServiceLandingPricing;
  /** Header over the whyUs trio + comparison table. */
  differentiators?: {
    eyebrow: string;
    headline: { parts: HeadlinePart[] };
    sub: string;
  };
  /** Appended to the base faq list. */
  faqExtra?: FaqItem[];
};

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
  /** Presence switches the route to the rich landing layout. */
  landing?: ServiceLandingContent;
};

export type WebinarAgendaItem = {
  id: string;
  title: string;
  description: string;
};

export type WebinarPageContent = {
  id: string;
  /** ISO 8601 with timezone offset, e.g. "2026-07-22T12:00:00-04:00". Drives the countdown. */
  startsAt: string;
  /** Human-readable date/time, e.g. "July 22, 2026 at 12:00 PM EST". */
  dateLabel: string;
  /** Duration/format line, e.g. "60 minutes, live on Zoom". */
  durationLabel: string;
  hero: {
    eyebrow: string;
    headline: { parts: HeadlinePart[] };
    sub: string;
  };
  /** "What you'll learn" agenda points. */
  agenda: WebinarAgendaItem[];
  /** "Who this is for" lines. */
  audience: string[];
  host: {
    name: string;
    role: string;
    bio: string;
    initials: string;
  };
  faq: FaqItem[];
};

export type PageSlug = "home";

export type PricingDuration = {
  id: string;
  label: string;
  /** Weeks for one-off services, months for retainer services. */
  value: number;
  /** Price multiplier: <1 = discount, 1 = standard, >1 = rush premium. */
  multiplier: number;
};

export type PricingConfigField = {
  id: string;
  label: string;
  /** select = single choice; multiselect = multiple; number = slider */
  type: "select" | "multiselect" | "number";
  options?: string[];
  min?: number;
  max?: number;
  step?: number;
};

export type PricingServiceConfig = {
  slug: string;
  icon: ServiceIcon;
  unitPrice: number;
  unit: string;
  unitLabel: string;
  minQty: number;
  maxQty: number;
  qtyStep: number;
  billing: "one-off" | "monthly";
  durations: PricingDuration[];
  configFields?: PricingConfigField[];
};

export type PricingPageContent = {
  id: string;
  hero: {
    eyebrow: string;
    headline: { parts: HeadlinePart[] };
    sub: string;
  };
  services: PricingServiceConfig[];
  note: string;
  faq: FaqContent;
  closingCta: CtaBannerContent;
};

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
  featuredTestimonial?: {
    quote: string;
    author: string;
    title: string;
    metric: string;
    metricLabel: string;
  };
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

/** One item in the "what we need from you" and "quality & revisions" sections.
 *  `icon` is a key resolved to a lucide icon in the ProcessPage template. */
export type ProcessInfoItem = {
  id: string;
  icon: string;
  title: string;
  description: string;
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
  /** The buyer's own (minimal) involvement — answers "how much of my time?" */
  yourPart: {
    eyebrow: string;
    headline: string;
    sub: string;
    steps: ProcessInfoItem[];
  };
  /** Execution risk-reversal: QA, revisions, approval control, and remedy. */
  quality: {
    eyebrow: string;
    headline: string;
    sub: string;
    items: ProcessInfoItem[];
  };
  whiteLabel: {
    eyebrow: string;
    headline: string;
    sub: string;
    promises: ProcessPromise[];
  };
  /** Reuses the shared FAQ module — same component as the home page. */
  faq: FaqContent;
};

/** A single rendered block within a blog article body. */
export type BlogBlock =
  | { type: "heading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; cite?: string };

export type BlogAuthor = {
  name: string;
  role: string;
  initials: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  /** One-sentence hook shown on cards and the index. */
  excerpt: string;
  /** Standfirst/subtitle shown under the title on the article page. */
  deck: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  readMinutes: number;
  author: BlogAuthor;
  /** Cover image path under /public. */
  cover: string;
  coverAlt: string;
  tags: string[];
  keyTakeaways: string[];
  /** Pins the post to the large slot in the homepage section + index. */
  featured?: boolean;
  body: BlogBlock[];
};

export type BlogContent = {
  id: string;
  eyebrow: string;
  headline: { parts: HeadlinePart[] };
  sub: string;
  posts: BlogPost[];
};

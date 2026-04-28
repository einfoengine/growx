export type Link = {
  id: string;
  label: string;
  href: string;
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
  | "funnel";

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

export type PageSlug = "home";

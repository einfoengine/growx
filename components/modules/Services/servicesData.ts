import type { ComponentType } from "react";
import {
  Clapperboard,
  Code,
  Film,
  Funnel,
  Globe,
  Headset,
  MessageSquare,
  PenTool,
  Search,
  Settings2,
  Share2,
  Sparkles,
  Target,
  Terminal,
  TrendingUp,
  UserPlus,
  Video,
} from "lucide-react";

export type IconProps = { size?: number; className?: string };

/** One entry in a service's modal media gallery. Supports images and videos;
 *  add `{ type: "video", src, poster }` entries to `media` to show clips. */
export type ServiceMedia = {
  type: "image" | "video";
  src: string;
  /** Poster frame for videos (also used as the thumbnail). */
  poster?: string;
  alt?: string;
};

export type ServiceHighlight = { title: string; body: string };

export type Service = {
  n: string;
  title: string;
  /** One-line summary shown on the card. */
  desc: string;
  Icon: ComponentType<IconProps>;
  /** Card media tile; also the gallery fallback when `media` is empty. */
  image?: string;
  /** Deliverables checklist — the card shows the first few, the modal shows all. */
  checklist: string[];
  /** Longer description shown in the detail modal. */
  long: string;
  /** Optional "Why growX" points shown in the modal. */
  highlights?: ServiceHighlight[];
  /** Modal gallery. Falls back to a single `image` entry when omitted. */
  media?: ServiceMedia[];
};

export type Group = {
  label: string;
  Icon: ComponentType<IconProps>;
  services: Service[];
};

export const GROUPS: Group[] = [
  {
    label: "Web & Funnels",
    Icon: Globe,
    services: [
      {
        n: "S01",
        title: "Website Design & Development",
        desc: "Full sites, redesigns, landing pages",
        Icon: Code,
        image: "/assets/services/s01.jpg",
        checklist: [
          "Custom website design",
          "Responsive development",
          "SEO foundation",
          "CMS integration",
          "Performance optimization",
          "Cross-browser QA",
          "Launch support",
          "Handoff documentation",
        ],
        long: "We design and develop conversion-optimized websites for your clients from scratch: mobile responsive, SEO-ready, and shipped on time. Every build is custom Figma-to-code work with a clean SEO structure, sub-2s load times, and thorough cross-browser QA before anything leaves our hands. Your brand sits on every delivery while our team handles every pixel, so your client never knows we exist.",
        highlights: [
          { title: "Fast without cutting corners", body: "Most projects ship in 2 to 4 weeks with quality intact, because we've done this enough times to move fast and right." },
          { title: "Invisible to your client", body: "White-label by default: your logo, your email, your Slack. Your client never knows we exist, exactly as it should be." },
          { title: "Scope-locked delivery", body: "The quoted price is the final price, with no surprise hours or scope-creep invoices, because we scope tightly upfront." },
        ],
      },
      {
        n: "S02",
        title: "Funnel Building",
        desc: "High-converting funnels and automations",
        Icon: Funnel,
        image: "/assets/services/s02.jpg",
        checklist: [
          "Funnel strategy & mapping",
          "Conversion landing pages",
          "Thank-you & confirmation pages",
          "Form & CRM integration",
          "Email automation flows",
          "Conversion tracking setup",
          "Pre-launch QA & go-live",
        ],
        long: "We design, build, and launch complete lead-generation funnels for your clients under your brand, from strategy and landing pages through CRM integration, email automation, and conversion tracking. Every build starts with offer positioning and funnel mapping, then ships fully QA'd and live. Platform-flexible and scoped to whatever stack your client already runs.",
        highlights: [
          { title: "Platform-flexible builds", body: "GoHighLevel, Webflow, ClickFunnels, Systeme.io, or custom — we build in whatever your client's stack requires instead of forcing a tool that doesn't fit." },
          { title: "Strategy before build", body: "We scope the offer, audience, and conversion goal before writing a line, because funnels built on clear strategy convert and ones built on assumptions don't." },
          { title: "Fast delivery, full QA", body: "Most funnels go live in 1 to 3 weeks off a repeatable process, and we run real leads through every step before launch." },
        ],
      },
    ],
  },
  {
    label: "Traffic & Visibility",
    Icon: TrendingUp,
    services: [
      {
        n: "S03",
        title: "SEO & AEO",
        desc: "Search and answer-engine optimization",
        Icon: Search,
        image: "/assets/services/s03.jpg",
        checklist: [
          "Intent-mapped keyword strategy",
          "On-page optimization",
          "Technical SEO fixes",
          "White-hat link building",
          "AI-answer (AEO) optimization",
          "Schema & entity markup",
          "Client-ready monthly reports",
        ],
        long: "Traditional SEO and Answer Engine Optimization in a single retainer, delivered 100% under your brand. We rank your clients in Google while positioning them as the source AI tools like ChatGPT, Perplexity, and Google AI Overviews cite — then hand you clean, client-ready reports that prove the value. It's a compounding, forward-ready service that grows your MRR month over month.",
        highlights: [
          { title: "SEO and AEO in one team", body: "Most agencies do one or the other — we cover both, because search is splitting between traditional engines and AI answers." },
          { title: "A retainer that compounds", body: "We build month over month instead of shipping one-off audits, so results stack up and your client's renewals stay locked in." },
          { title: "Reports clients actually trust", body: "Clean, white-label reporting explains what moved, why, and what's next — so your client sees the value and keeps paying." },
        ],
      },
      {
        n: "S04",
        title: "Media Buying & PPC",
        desc: "Meta, Google, paid acquisition",
        Icon: Target,
        image: "/assets/services/s04.jpg",
        checklist: [
          "Revenue-goal campaign strategy",
          "Platform-ready ad creative",
          "Full campaign setup",
          "Precision audience targeting",
          "Retargeting & lookalikes",
          "Weekly optimization",
          "White-labeled reporting",
        ],
        long: "We run Google, Meta, and beyond for your clients — fully managed, performance-focused, and reported in a way that makes you look like the expert. Every campaign starts with a clear revenue goal, then we build the account structure, creative, and tracking to hit it. Your client gets conversions and ROAS they can bank on; you get monthly reports in your brand, ready to send.",
        highlights: [
          { title: "Revenue, not vanity metrics", body: "We optimize for conversions and cost-per-acquisition, not impressions and click-through rates that don't pay your client's rent." },
          { title: "Platform-flexible by design", body: "Google, Meta, LinkedIn, TikTok — wherever your client's audience lives. We never push a channel just because it's our preferred tool." },
          { title: "No markup on ad spend", body: "Our fee is for management alone. Every dollar of your client's budget goes to the platform, never into our margin." },
        ],
      },
    ],
  },
  {
    label: "Content & Social",
    Icon: MessageSquare,
    services: [
      {
        n: "S05",
        title: "Content & Copywriting",
        desc: "Web copy, blogs, email, ads",
        Icon: PenTool,
        image: "/assets/services/s05.jpg",
        checklist: [
          "SEO blog posts",
          "Landing page copy",
          "Email sequences",
          "Ad copy variants",
          "Website page copy",
          "Brand voice matching",
          "Voice reference doc",
          "Two revision rounds",
        ],
        long: "Blog posts, landing pages, email sequences, and ad copy — SEO-informed, written to produce business outcomes, and delivered 100% under your brand. We absorb each client's tone before writing a single word, so the output reads like they wrote it themselves. Every engagement includes two revision rounds and a reusable voice reference doc your client can keep.",
        highlights: [
          { title: "SEO built in, not bolted on", body: "Every piece is written to keyword intent from the brief up, so it ranks instead of just reading well." },
          { title: "Voice matching that holds up", body: "A discovery brief and tone audit let us match each client's voice close enough that they read it back to you." },
          { title: "Fast, predictable delivery", body: "Most pieces turn around in 3 to 5 business days, with fixed monthly dates for retainer partners." },
        ],
      },
      {
        n: "S06",
        title: "Social Media Management",
        desc: "Full-channel posting and engagement",
        Icon: Share2,
        image: "/assets/services/s06.jpg",
        checklist: [
          "Monthly content calendar",
          "On-brand platform graphics",
          "Platform-native captions",
          "Scheduling & publishing",
          "Multi-platform management",
          "Monthly performance report",
        ],
        long: "A fully managed social retainer delivered under your brand: monthly content calendars, on-brand graphics, native captions, and optimized scheduling across LinkedIn, Instagram, Facebook, Twitter/X, and TikTok. Your client stays consistently active and on-brand while you approve the plan once a month and spend zero hours on production. Every post is client-approved before it goes live, and each month closes with a white-labelled performance report you can forward as your own.",
        highlights: [
          { title: "Completely hands-off for you", body: "You approve the calendar once a month and we handle design, copy, scheduling, and reporting — your bandwidth stays free." },
          { title: "Retainer revenue that compounds", body: "Every client needs social every month, making it a natural, predictable retainer that grows your MRR." },
          { title: "Platform-native execution", body: "We never just repost everywhere — each platform gets content built for its format, audience, and algorithm." },
        ],
      },
    ],
  },
  {
    label: "Video",
    Icon: Video,
    services: [
      {
        n: "S07",
        title: "Animated Video Production",
        desc: "Explainers, demos, promos",
        Icon: Clapperboard,
        image: "/assets/services/s07.jpg",
        checklist: [
          "Animated explainer videos",
          "Product demo animations",
          "Scripts & storyboards",
          "Custom motion graphics",
          "Voiceover & sound design",
          "On-brand visual style",
          "Multi-platform cutdowns",
        ],
        long: "Give your clients broadcast-quality animated videos — explainers, product demos, launch promos, and social spots — produced end to end by our motion team and shipped 100% under your brand. You hand off the brief; we handle script, storyboard, design, animation, voiceover, and sound, then deliver a finished cut you present as your own. Every frame is styled to your client's brand and exported for every platform they run on, source files included.",
        highlights: [
          { title: "One team, full production", body: "Script, storyboard, design, animation, voiceover, and sound are all handled in-house, so you brief once and receive a finished video." },
          { title: "Styled to their brand", body: "Every video matches your client's colors, fonts, and tone, and ships without a trace of growX anywhere on it." },
          { title: "Ready for every platform", body: "One production comes back as landscape, square, and vertical cutdowns sized for the web, ads, and social feeds." },
        ],
      },
      {
        n: "S08",
        title: "Video Editing",
        desc: "Long-form and short-form editing",
        Icon: Film,
        image: "/assets/services/s08.jpg",
        checklist: [
          "Short-form social cuts",
          "Long-form video edits",
          "Captions & subtitles",
          "Color grading & correction",
          "Audio mixing & cleanup",
          "Motion graphics & titles",
          "Multi-platform export versions",
          "Licensed music & SFX",
        ],
        long: "Send us raw footage from any shoot, screen recording, webinar, or podcast, and we return publish-ready video cut for the exact platform it's headed to. Every edit ships with captions, clean audio, color, and on-brand graphics, exported in the aspect ratios each channel needs. It's delivered under your agency's name with revision rounds built in, so your client only ever sees your brand.",
        highlights: [
          { title: "Edited to keep viewers watching", body: "Our editors build hooks, tighten pacing, and cut the dead air so videos hold attention and drive action." },
          { title: "One upload, every aspect ratio", body: "Send footage once and get back 16:9, 9:16, and 1:1 versions, so a single shoot feeds YouTube, Reels, Shorts, and TikTok." },
          { title: "Delivered 100% under your brand", body: "No watermarks, no logos, no trace of us — you receive the finished exports and source files to hand off as your own." },
        ],
      },
    ],
  },
  {
    label: "HighLevel Operations",
    Icon: Settings2,
    services: [
      {
        n: "S09",
        title: "HighLevel Client Onboarding",
        desc: "Done-for-you client setup",
        Icon: UserPlus,
        image: "/assets/services/s09.jpg",
        checklist: [
          "Ready-to-use sub-account",
          "White-labeled dashboard",
          "Connected calendars & channels",
          "Verified email & SMS sending",
          "Contacts & data migrated",
          "CRM pipelines live",
          "Core automations activated",
          "Guided platform walkthrough",
        ],
        long: "growX takes every new client from an empty HighLevel sub-account to a fully configured, on-brand system, built end-to-end under your agency's name. We handle the account setup, channel connections, deliverability, data migration, and core automations, then hand your client a guided walkthrough of their new platform. You look like you run a full onboarding department, while we stay completely invisible.",
        highlights: [
          { title: "HighLevel is our home turf", body: "A team that builds sub-accounts every day catches the deliverability and automation gaps that trip up generalists." },
          { title: "Invisible under your brand", body: "Every dashboard, domain, and walkthrough carries your logo, so onboarding feels like it came from your in-house team." },
          { title: "Launch-ready on a clock", body: "Fixed scope and clear SLAs move each client from empty account to live system on a predictable timeline." },
        ],
      },
      {
        n: "S10",
        title: "HighLevel Admin Support",
        desc: "Ongoing platform administration",
        Icon: Headset,
        image: "/assets/services/s10.jpg",
        checklist: [
          "Workflow builds & fixes",
          "Calendar & booking upkeep",
          "Pipeline stage management",
          "Support ticket resolution",
          "Contact list hygiene",
          "Automation & campaign edits",
          "Monthly account health report",
        ],
        long: "Ongoing, day-to-day administration of your clients' HighLevel accounts, run entirely under your brand. We handle the workflow tweaks, calendar and pipeline upkeep, data cleanups, and support requests that pile up after launch — so accounts stay healthy and clients stay happy without pulling you off billable work. You get a dependable back office; your client only ever sees your logo.",
        highlights: [
          { title: "HighLevel specialists, not generalists", body: "Our team lives inside the platform every day, so fixes land fast and best practices are baked in." },
          { title: "Predictable SLAs on every request", body: "Each ticket is triaged and resolved within a fixed window you can confidently promise your clients." },
          { title: "Invisible under your brand", body: "Every login, reply, and report carries your name — your client never knows growX is behind it." },
        ],
      },
      {
        n: "S11",
        title: "Custom HighLevel Development",
        desc: "Custom builds and integrations",
        Icon: Terminal,
        image: "/assets/services/s11.jpg",
        checklist: [
          "Custom API integrations",
          "Third-party app connections",
          "Advanced workflow automation",
          "Webhook & data sync",
          "Custom dashboards & reporting",
          "Reusable snapshot builds",
          "QA-tested deployment",
          "Build documentation & handoff",
        ],
        long: "When off-the-shelf HighLevel hits a wall, our developers build past it — wiring up custom API integrations, engineering multi-branch automations, and connecting the third-party tools the client's business actually runs on. Every build is QA-tested, documented, and deployed 100% under your brand. You hand the client a platform that works exactly how they need, and they never see us.",
        highlights: [
          { title: "HighLevel specialists, not generalists", body: "Developers who live in the platform daily and know its API, rate limits, and workarounds cold." },
          { title: "Built to survive updates", body: "Clean, documented builds that hold up when HighLevel ships changes, so nothing breaks silently." },
          { title: "Invisible under your brand", body: "Every integration, automation, and handoff ships white-label, so the win is always yours." },
        ],
      },
    ],
  },
  {
    label: "And Beyond",
    Icon: Sparkles,
    services: [
      {
        n: "S12",
        title: "Expanding Catalog",
        desc: "Everything an agency needs, added on demand",
        Icon: Sparkles,
        image: "/assets/services/s12.jpg",
        checklist: [
          "AI automation builds",
          "Chatbot & AI agents",
          "Podcast & audio production",
          "E-commerce store builds",
          "Analytics dashboards",
          "Branding & identity kits",
          "Custom scoped projects",
        ],
        long: "growX is built to grow with you. Beyond the core catalog, we take on the new and emerging services your clients keep asking for — AI automation, chatbots, e-commerce, podcasts, dashboards, and whatever comes next — scoped, built, and delivered 100% under your brand. When a request lands outside your current offering, it becomes a new line on your menu instead of a referral to a competitor.",
        highlights: [
          { title: "Say yes to every brief", body: "When a client asks for something new, you win the work instead of turning it away — we scope and build it under your brand." },
          { title: "New capabilities, no new hires", body: "Every emerging service is delivered by a vetted team you never have to recruit, train, or keep on payroll." },
          { title: "One partner, one white-label invoice", body: "As your menu expands, it all stays under a single relationship with fixed pricing and clear SLAs." },
        ],
      },
    ],
  },
];

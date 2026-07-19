import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/templates/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How growX collects, uses, and protects the personal information you share with us.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    heading: "Who we are",
    body: [
      "growX is a white-label fulfillment partner for agencies. This policy explains what personal information we collect through growx.studio and our partner portal, how we use it, and the rights you have over it.",
      "For any privacy question, or to exercise your rights, email us at hi@growx.studio.",
    ],
  },
  {
    id: "what-we-collect",
    heading: "Information we collect",
    body: [
      "Information you give us directly when you book a call, register interest, sign up as a partner, or contact us:",
      "- Your name, work email, and phone or messaging handle.",
      "- Your agency name and website.",
      "- Anything you tell us about the work you need fulfilled.",
      "Information collected automatically when you browse the site:",
      "- Device, browser, and usage data such as pages viewed and referring links.",
      "- Cookie and similar identifiers, only where you have accepted them (see Cookies below).",
    ],
  },
  {
    id: "how-we-use",
    heading: "How we use your information",
    body: [
      "- To respond to your enquiries and schedule calls.",
      "- To set up and deliver partnership services you request.",
      "- To operate, secure, and improve the website and portal.",
      "- With your consent, to measure marketing performance and show you relevant content across other platforms.",
    ],
  },
  {
    id: "cookies",
    heading: "Cookies and tracking",
    body: [
      "The site uses essential cookies that keep it working, and, only after you accept them, analytics and marketing cookies (such as Google Analytics and the Meta pixel) that help us understand what works and reach you with relevant content.",
      "No analytics or marketing tracking runs until you accept it in our cookie banner. You can change your choice at any time by clearing the site's stored preference in your browser.",
    ],
  },
  {
    id: "sharing",
    heading: "How we share information",
    body: [
      "We do not sell your personal information. We share it only with the service providers that help us run the business, under agreements that limit their use of it, including:",
      "- Our CRM and communications platform, which stores your contact details and our correspondence.",
      "- Analytics and advertising providers, where you have accepted the relevant cookies.",
      "We may also disclose information where required by law.",
    ],
  },
  {
    id: "retention",
    heading: "How long we keep it",
    body: [
      "We keep your information for as long as needed to provide our services and to meet legal, accounting, or reporting obligations, then delete or anonymize it.",
    ],
  },
  {
    id: "rights",
    heading: "Your rights",
    body: [
      "Depending on where you live, you may have the right to access, correct, delete, or receive a copy of your personal information, and to object to or restrict certain processing.",
      "To exercise any of these, email hi@growx.studio and we will respond within the timeframe required by applicable law.",
    ],
  },
  {
    id: "transfers",
    heading: "International transfers",
    body: [
      "growX serves partners in the US, Canada, the UK, and Australia, and our team and providers may process your information in other countries. Where required, we rely on appropriate safeguards for those transfers.",
    ],
  },
  {
    id: "security",
    heading: "Security",
    body: [
      "We take reasonable technical and organizational measures to protect your information. No method of transmission or storage is completely secure, so we cannot guarantee absolute security.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to this policy",
    body: [
      "We may update this policy as our services and the law evolve. Material changes will be reflected here with a new update date.",
    ],
  },
];

export default function PrivacyRoute() {
  return (
    <LegalPage
      eyebrow="Privacy"
      title="Privacy Policy"
      updated="Last updated July 2026"
      intro="Your trust is the product. This policy is a plain-English account of what we collect, why, and the control you keep over it."
      sections={SECTIONS}
    />
  );
}

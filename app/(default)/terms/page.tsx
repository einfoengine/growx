import type { Metadata } from "next";
import LegalPage, { type LegalSection } from "@/components/templates/LegalPage";

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern your use of the growX website and partner portal.",
};

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    heading: "Acceptance of these terms",
    body: [
      "By using growx.studio or the growX partner portal, you agree to these terms. If you do not agree, please do not use the site or the portal.",
    ],
  },
  {
    id: "the-service",
    heading: "What growX provides",
    body: [
      "growX is a white-label fulfillment partner for agencies. Through the portal, partners order productized services that our in-house team delivers under the partner's brand. This site markets those services and lets you book a call or sign up.",
      "The specific scope, pricing, SLAs, and commercial rights for any work are set out in the portal and in your partnership agreement, which govern in the event of any conflict with these terms.",
    ],
  },
  {
    id: "eligibility",
    heading: "Who may use it",
    body: [
      "growX is a service for businesses. By signing up you confirm you are using it for your agency or business and are authorized to enter into these terms.",
    ],
  },
  {
    id: "accounts",
    heading: "Partner accounts",
    body: [
      "You are responsible for the activity under your account and for keeping your login credentials secure. Tell us promptly if you believe your account has been used without your authorization.",
    ],
  },
  {
    id: "fees",
    heading: "Membership and service fees",
    body: [
      "Partnership membership tiers are billed as described on our pricing page. Individual services are ordered and paid per project at the prices shown in the portal. Taxes may apply. Fees are non-refundable except where required by law or expressly stated in your partnership agreement.",
    ],
  },
  {
    id: "acceptable-use",
    heading: "Acceptable use",
    body: [
      "You agree not to misuse the site or portal, including by attempting to disrupt them, access them without authorization, or use them for unlawful purposes or to infringe others' rights.",
    ],
  },
  {
    id: "white-label",
    heading: "White-label delivery and intellectual property",
    body: [
      "Deliverables are produced under your brand. On full payment, the commercial rights to a deliverable transfer to you as set out in your partnership agreement, so you can present and resell the work as your own.",
      "The growX name, brand, site, and portal, and their underlying content and software, remain our property. Nothing here grants you rights to them beyond using the service as intended.",
    ],
  },
  {
    id: "warranty",
    heading: "Disclaimers",
    body: [
      "The site and portal are provided on an \"as is\" and \"as available\" basis. We work hard to keep them accurate and available but do not warrant that they will be uninterrupted or error-free.",
    ],
  },
  {
    id: "liability",
    heading: "Limitation of liability",
    body: [
      "To the fullest extent permitted by law, growX is not liable for indirect, incidental, or consequential damages arising from your use of the site or portal. Our total liability for any claim is limited as set out in your partnership agreement.",
    ],
  },
  {
    id: "termination",
    heading: "Termination",
    body: [
      "You may stop using the service at any time. We may suspend or end access if these terms are breached. Provisions that by their nature should survive termination will do so.",
    ],
  },
  {
    id: "governing-law",
    heading: "Governing law",
    body: [
      "These terms are governed by the laws of the jurisdiction in which growX is established, without regard to its conflict-of-laws rules.",
    ],
  },
  {
    id: "changes",
    heading: "Changes to these terms",
    body: [
      "We may update these terms as the service evolves. Continued use after an update means you accept the revised terms.",
    ],
  },
];

export default function TermsRoute() {
  return (
    <LegalPage
      eyebrow="Terms"
      title="Terms of Use"
      updated="Last updated July 2026"
      intro="The straightforward terms that govern your use of the growX website and partner portal."
      sections={SECTIONS}
    />
  );
}

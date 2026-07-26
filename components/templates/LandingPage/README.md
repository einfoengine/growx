# Service Landing Page Standard

`/services/[slug]` renders **LandingPageRich** when the service JSON carries a
`landing` block, else **LandingPageClassic**. Upgrading a service to the rich
page is *pure data* — add the block, no code.

The rich layout mirrors the HOME page's section order and design system.
Every section is a home component fed with service data; the only bespoke
module is `ServicePricing` (rate card + margin calculator).

## Section order (= home order) and grounds

| # | Section | Component | Data source | Ground |
|---|---------|-----------|-------------|--------|
| 1 | Hero: tagline headline, 4 proof stats, ctaNote, `#book` + in-page secondary CTA | `Hero` variant `inner` | base fields + `landing.hero` | dark |
| 2 | VSL in the hero band | `HeroVideoPerspective`+`HeroVideo` | `landing.vsl.videoId` | dark |
| 3 | Platform marquee | `PartnerMarquee items` | `landing.platforms[]` | black band |
| 4 | What's included (solution FIRST, then pain — home order) | `ServicesCatalog data` | `deliverables[]` | white |
| 5 | The reselling problems (4 cards, dot points, parallax backdrop) | `GrowthPillars data` | `landing.pains` | surface |
| 6 | Full feature list (6 checklist groups: design / stack / perf / security / maintenance / support) | `GrowthPillars data` (no backdrop, check points) | `landing.features` | white |
| 7 | Work samples (omit if no portfolio category exists) | `Portfolio category/header` | `landing.work` | surface |
| 8 | Money: rate card + margin calculator + guarantees + tier-discount footnote | `ServicePricing` | `landing.pricing` + `getServicePricingConfig(slug)` — **prices only ever come from data/pages/pricing.json** | white |
| 9 | How it works | `ProcessJourney` | — | surface |
| 10 | Testimonials | `Testimonials` | — | white |
| 11 | Logo wall | `TrustedBy` | — | surface |
| 12 | Brand lineage | `SisterBrands` | — | white |
| 13 | Membership packages + free-join | `PricingPlans` | — | surface |
| 14 | WhyUs trio (numbered cards) + comparison table | `GrowthPillars data` + `Comparison noPaddingTop` | `whyUs[]` + `landing.differentiators` | white |
| 15 | FAQ (base + landing extras) | `Faq data` | `faq[]` + `landing.faqExtra` | surface |
| — | Close: the footer's global `CtaBanner` — never add a second close | — | — | black |

Rules: keep the white/surface alternation seamless (tone props exist on
`GrowthPillars`/`Portfolio`/`Services` for this); dark accents stay black in
both themes (no `data-dark-surface` on contrast bands); every headline
highlights one phrase with `text-gradient-brand`; every CTA books via `#book`
(global BookingModal).

**Section headings render INSIDE the module they introduce**, passed via that
module's `title` prop: `<Faq data={faqData} title={<SectionTitle … />} />`.
`SectionTitle` has **no background** and no container/padding — it renders as
the first child of the module's own container, inheriting that section's surface
and text colour, so it always fits. No `className` background and no
`noPaddingTop` are needed. `align` (`center` default / `left` / `right`) sets
text alignment. Sections that still render their own inline headers: the hero
and the page-specific `SectionHeader` blocks.

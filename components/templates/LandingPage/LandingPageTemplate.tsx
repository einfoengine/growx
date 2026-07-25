import LandingPageClassic from "./LandingPageClassic";
import LandingPageRich from "./LandingPageRich";
import type { ServicePageContent } from "@/lib/content";

type Props = { data: ServicePageContent };

/** Dispatcher for the /services/[slug] route. A service whose JSON carries a
 *  `landing` block gets the rich, high-converting layout; the rest render the
 *  shared classic layout unchanged. Upgrading another service later is purely
 *  a data change — add its `landing` block, no code required. */
export default async function LandingPageTemplate({ data }: Props) {
  return data.landing ? (
    <LandingPageRich data={data} />
  ) : (
    <LandingPageClassic data={data} />
  );
}

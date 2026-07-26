import type { ReactNode } from "react";
import { getProcess } from "@/lib/content";
import ProcessJourneyClient from "./ProcessJourneyClient";

/** Process / partnership lifecycle. Reuses the shared process content
 *  (getProcess) so the steps match the rest of the site; the per-step
 *  illustrations live in StepArt.tsx (same art language as GrowthPillars). */
export default async function ProcessJourney({
  moduleTitle,
  title,
}: { moduleTitle?: string; title?: ReactNode } = {}) {
  const data = await getProcess();
  return <ProcessJourneyClient data={data} moduleTitle={moduleTitle} title={title} />;
}

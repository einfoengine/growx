import ProcessReveal from "./ProcessReveal";
import { getProcess } from "@/lib/content";

export default async function Process({
  moduleTitle,
}: { moduleTitle?: string } = {}) {
  const data = await getProcess();
  return <ProcessReveal data={data} moduleTitle={moduleTitle} />;
}

import ProcessReveal from "./ProcessReveal";
import { getProcess } from "@/lib/content";

export default async function Process() {
  const data = await getProcess();
  return <ProcessReveal data={data} />;
}

import { getGrowthCalculator } from "@/lib/content";
import GrowthCalculatorClient from "./GrowthCalculatorClient";

export default async function GrowthCalculator() {
  const data = await getGrowthCalculator();

  return <GrowthCalculatorClient data={data} />;
}

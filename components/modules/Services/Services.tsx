import ServicesSticky from "./ServicesSticky";
import { getServices } from "@/lib/content";
import type { ServicesContent } from "@/lib/content";

export default async function Services({ data }: { data?: ServicesContent } = {}) {
  const servicesData = data ?? (await getServices());
  return <ServicesSticky data={servicesData} />;
}

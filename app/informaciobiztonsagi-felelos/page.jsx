import ServicePage, { serviceMetadata } from "@/components/service-page/ServicePage";

export function generateMetadata() {
  return serviceMetadata("ibf");
}

export default function IbfPage() {
  return <ServicePage pageKey="ibf" />;
}

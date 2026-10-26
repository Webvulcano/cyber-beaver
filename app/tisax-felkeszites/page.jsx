import ServicePage, { serviceMetadata } from "@/components/service-page/ServicePage";

export function generateMetadata() {
  return serviceMetadata("tisax");
}

export default function TisaxPage() {
  return <ServicePage pageKey="tisax" />;
}

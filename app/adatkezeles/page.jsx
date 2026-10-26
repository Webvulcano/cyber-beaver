import LegalPage from "@/components/legal/LegalPage";

export const metadata = {
  title: "Adatkezelési tájékoztató | Cyber Beaver",
  alternates: { canonical: "/adatkezeles" },
};

export default function AdatkezelesPage() {
  return <LegalPage name="adatkezeles" />;
}

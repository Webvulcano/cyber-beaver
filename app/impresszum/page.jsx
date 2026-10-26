import LegalPage from "@/components/legal/LegalPage";

export const metadata = {
  title: "Impresszum | Cyber Beaver",
  alternates: { canonical: "/impresszum" },
};

export default function ImpresszumPage() {
  return <LegalPage name="impresszum" />;
}

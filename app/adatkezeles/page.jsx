import LegalPage from "@/components/legal/LegalPage";

export const metadata = {
  title: "Adatkezelési tájékoztató | Cyber Beaver",
  alternates: { canonical: "/adatkezeles" },
  // Jogi oldal: ne legyen találat, de a Google bejárja (robots.txt NE tiltsa), sitemapben sincs.
  robots: { index: false, follow: true },
};

export default function AdatkezelesPage() {
  return <LegalPage name="adatkezeles" />;
}

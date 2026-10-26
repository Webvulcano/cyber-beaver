import LegalPage from "@/components/legal/LegalPage";

export const metadata = {
  title: "Impresszum | Cyber Beaver",
  alternates: { canonical: "/impresszum" },
  // Jogi oldal: ne legyen találat, de a Google bejárja (robots.txt NE tiltsa), sitemapben sincs.
  robots: { index: false, follow: true },
};

export default function ImpresszumPage() {
  return <LegalPage name="impresszum" />;
}

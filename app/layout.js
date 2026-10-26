import { Figtree } from "next/font/google";
import SiteAnalytics from "@/components/analytics/SiteAnalytics";
import CmsBridge from "@/components/cms/CmsBridge";
import { getCms } from "@/lib/cms";
import { SITE_URL } from "@/content/site";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
});

// Title + description az Ügyfél Adminból (Google-megjelenés szekció).
export async function generateMetadata() {
  const cms = await getCms();
  return {
    // Abszolút URL-ek (canonical, OG) alapja. Canonical oldalanként, hogy az aloldalak ne örököljék a "/"-t.
    metadataBase: new URL(SITE_URL),
    title: cms.text("home.seo.title"),
    description: cms.text("home.seo.description"),
  };
}

export default function RootLayout({ children }) {
  return (
    <html lang="hu" className={`${figtree.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <CmsBridge />
        <SiteAnalytics />
      </body>
    </html>
  );
}

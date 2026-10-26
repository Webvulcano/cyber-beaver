import { Figtree } from "next/font/google";
import SiteAnalytics from "@/components/analytics/SiteAnalytics";
import CmsBridge from "@/components/cms/CmsBridge";
import { getCms } from "@/lib/cms";
import "./globals.css";

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin", "latin-ext"],
});

// Title + description az Ügyfél Adminból (Google-megjelenés szekció).
export async function generateMetadata() {
  const cms = await getCms();
  return {
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

import Hero from "@/components/hero/Hero";
import LogoTicker from "@/components/partners/LogoTicker";
import About from "@/components/about/About";
import Services from "@/components/services/Services";
import References from "@/components/references/References";
import Footer from "@/components/footer/Footer";
import StructuredData from "@/components/seo/StructuredData";

export const metadata = {
  alternates: { canonical: "/" },
};

export default function Home() {
  return (
    <>
      <StructuredData />
      <main className="flex-1">
        <Hero />
        <LogoTicker />
        <About />
        <Services />
        <References />
      </main>
      <Footer />
    </>
  );
}

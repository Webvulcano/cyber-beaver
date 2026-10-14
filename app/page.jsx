import Hero from "@/components/hero/Hero";
import LogoTicker from "@/components/partners/LogoTicker";
import Services from "@/components/services/Services";
import References from "@/components/references/References";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <LogoTicker />
      <Services />
      <References />
    </main>
  );
}

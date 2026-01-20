// app/page.tsx
import Navbar from "@/components/layout/Navbar";
import HeroB2B from "@/components/sections/HeroB2B";
import ProductMatrix from "@/components/sections/ProductMatrix";
import FeatureGrid from "@/components/sections/FeatureGrid";
import TrustSection from "@/components/sections/TrustSection";
import ExecutionFlow from "@/components/sections/ExecutionFlow"; 
import SuccessStories from "@/components/sections/SuccessStories";
import FoundersVision from "@/components/sections/FoundersVision";
import MethodologySection from "@/components/sections/MethodologySection";
import TabbedServices from "@/components/sections/TabbedServices";
import LLMServicesSection from "@/components/sections/LLMServicesSection";
import TrustAndArticles from "@/components/sections/TrustAndArticles";
import FaqSection from "@/components/sections/FaqSection";
import Footer from "@/components/sections/Footer";

export default function B2BHome() {
  return (
    <main className="min-h-screen bg-[#020617] selection:bg-blue-500/30">
      <Navbar portal="B2B" />
      <HeroB2B />
      <ProductMatrix />
      <FeatureGrid />
      <TrustSection />
      <ExecutionFlow /> 
      <SuccessStories />
      <FoundersVision />
      <MethodologySection />
      <TabbedServices />
      <LLMServicesSection />
      <TrustAndArticles />
      <FaqSection />
      <Footer />
    </main>
  );
}
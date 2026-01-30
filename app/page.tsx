import dynamic from 'next/dynamic';
import Navbar from "@/components/layout/Navbar";
import HeroB2B from "@/components/sections/HeroB2B";
import { Analytics } from "@vercel/analytics/next"; 

const B2BPricingSection = dynamic(() => import("@/components/sections/B2BPricingSection"));
const FeatureGrid = dynamic(() => import("@/components/sections/FeatureGrid"));
const CompanyJourney = dynamic(() => import("@/components/sections/CompanyJourney"));
const TrustSection = dynamic(() => import("@/components/sections/TrustSection"));
const ExecutionFlow = dynamic(() => import("@/components/sections/ExecutionFlow"));
const B2BProductTabs = dynamic(() => import("@/components/sections/B2BProductTabs"));
const SuccessStories = dynamic(() => import("@/components/sections/SuccessStories"));
const FoundersVision = dynamic(() => import("@/components/sections/FoundersVision"));
const MethodologySection = dynamic(() => import("@/components/sections/MethodologySection"));
const TabbedServices = dynamic(() => import("@/components/sections/TabbedServices"));
const LLMServicesSection = dynamic(() => import("@/components/sections/LLMServicesSection"));
const TrustAndArticles = dynamic(() => import("@/components/sections/TrustAndArticles"));
const FaqSection = dynamic(() => import("@/components/sections/FaqSection"));
const LiveTrafficSection = dynamic(() => import("@/components/sections/LiveTrafficSection"));
const Footer = dynamic(() => import("@/components/sections/Footer"));

export default function B2BHome() {
  return (
    <main className="min-h-screen bg-[#020617] selection:bg-blue-500/30">
      <Navbar />
      <HeroB2B />
      <B2BPricingSection />
      <FeatureGrid />
      <CompanyJourney />
      <TrustSection />
      <ExecutionFlow /> 
      <B2BProductTabs />
      <SuccessStories />
      <FoundersVision />
      <MethodologySection />
      <TabbedServices />
      <LLMServicesSection />
      <TrustAndArticles />
      <FaqSection />
      <LiveTrafficSection />
      <Footer />
      <Analytics /> 
    </main>
  );
}
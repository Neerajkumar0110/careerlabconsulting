import dynamic from 'next/dynamic';
import Navbar from "@/components/product/Navbar";
import HeroProducts from "@/components/product/HeroProducts";
import { Analytics } from "@vercel/analytics/next"; 
import Image from 'next/image';

const ProductSection = dynamic(() => import("@/components/product/ProductsSection"));
const PricingSection = dynamic(() => import("@/components/product/B2BPricingSection"));
const FeatureGrid = dynamic(() => import("@/components/product/FeatureGrid"));
const CompanyJourney = dynamic(() => import("@/components/product/CompanyJourney"));
const TrustSection = dynamic(() => import("@/components/product/TrustSection"));
const ExecutionFlow = dynamic(() => import("@/components/product/ExecutionFlow"));
const SuccessStories = dynamic(() => import("@/components/product/SuccessStories"));
const FoundersVision = dynamic(() => import("@/components/product/FoundersVision"));
const MethodologySection = dynamic(() => import("@/components/product/MethodologySection"));
const TrustAndArticles = dynamic(() => import("@/components/product/TrustAndArticles"));
const FaqSection = dynamic(() => import("@/components/product/FaqSection"));
const LiveTrafficSection = dynamic(() => import("@/components/product/LiveTrafficSection"));
const Footer = dynamic(() => import("@/components/product/Footer"));

export default function B2BHome() {
  return (
    <main className="min-h-screen bg-[#020617] selection:bg-blue-500/30">
      <Navbar />
      <HeroProducts />
      <Analytics />
      <ProductSection />
      <PricingSection />
      <FeatureGrid />
      <CompanyJourney />
      <TrustSection />
      <ExecutionFlow />       
      <SuccessStories />
      <FoundersVision />
      <MethodologySection />
      <TrustAndArticles />
      <FaqSection />
      <LiveTrafficSection />
      <Footer />
      <Analytics /> 
    </main>
  );
}
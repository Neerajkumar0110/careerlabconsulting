import dynamic from 'next/dynamic';
import Image from 'next/image';
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
const GlobalB2BSection = dynamic(() => import("@/components/sections/GlobalB2BSection"));
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
      <section className="py-12 px-6 bg-[#03081a]">
                          <div className="max-w-7xl mx-auto">
                            <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8">
                              <div className="text-left">
                                <h2 className="text-2xl md:text-3xl font-black uppercase text-white mb-2">
                                  Global Learner <span className="text-blue-500">Community</span>
                                </h2>
                                <p className="text-slate-400 text-sm md:text-base max-w-lg">
                                  Join thousands of aspiring AI Engineers from 30+ countries building the future together.
                                </p>
                              </div>
                              <div className="flex -space-x-4">
                                {[1,2,3,4].map((_,i) => (
                                  <div key={i} className="w-10 h-10 rounded-full border-2 border-[#03081a] bg-slate-800 overflow-hidden relative">
                                      <Image 
                                        src={`https://randomuser.me/api/portraits/thumb/men/${i+20}.jpg`} 
                                        alt="Student" 
                                        fill
                                        sizes="40px"
                                        className="object-cover"
                                      />
                                  </div>
                                ))}
                                <div className="w-10 h-10 rounded-full border-2 border-[#03081a] bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                                  +2k
                                </div>
                              </div>
                            </div>
                            <GlobalB2BSection />
                          </div>
              </section>
      <LiveTrafficSection />
      <Footer />
      <Analytics /> 
    </main>
  );
}
'use client';

import React, { useState } from 'react';
import { 
  Check, Zap, Crown, Building2, 
  Calendar, Rocket, ArrowRight, 
  Phone, MessageCircle
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import ScheduleMeetingModal from './ScheduleMeetingModal'; 

const CONTACT_INFO = {
  whatsapp: "918700236923",
  email: "info@careerlabconsulting.com"
};

type PricingCategory = 'Single Product' | 'Combo' | 'All-in-One';

interface PricingTier {
  name: string;
  price: string;
  rawPrice?: number;
  features: string[];
  icon: any;
  isEnterprise?: boolean;
  description: string;
}

const CATEGORIES: Record<PricingCategory, PricingTier[]> = {
  'Single Product': [
    { name: 'Starter', price: '₹25,000', rawPrice: 2500000, icon: Rocket, description: 'Perfect for small teams starting their journey.', features: ['1 Core Module', 'Email Support', 'Basic Analytics', 'Single User Access'] },
    { name: 'Growth', price: '₹50,000', rawPrice: 5000000, icon: Zap, description: 'Scaling tools for growing businesses.', features: ['3 Core Modules', 'Priority Support', 'Advanced Analytics', '5 User Access'] },
    { name: 'Advanced', price: '₹1,00,000', rawPrice: 10000000, icon: Crown, description: 'The power of full modular control.', features: ['All Core Modules', '24/7 Support', 'Custom Reporting', 'Unlimited Users'] },
    { name: 'Enterprise', price: 'Custom', isEnterprise: true, icon: Building2, description: 'Custom infrastructure for big players.', features: ['Dedicated Infra', 'SLA Guarantee', 'Custom Workflows', 'On-Premise Option'] },
  ],
  'Combo': [
    { name: 'Starter', price: '₹50,000', rawPrice: 5000000, icon: Rocket, description: 'Bundled essentials for startups.', features: ['2 Product Suite', 'Shared Data Lake', 'Basic Automations', 'Standard Security'] },
    { name: 'Growth', price: '₹1,00,000', rawPrice: 10000000, icon: Zap, description: 'Full synergy across your business.', features: ['4 Product Suite', 'Unified Dashboard', 'Advance Automations', 'Audit Logs'] },
    { name: 'Advanced', price: '₹2,00,000', rawPrice: 20000000, icon: Crown, description: 'Intelligence-driven enterprise suite.', features: ['Complete Product Suite', 'AI Insights', 'Custom Integrations', 'White-labeling'] },
    { name: 'Enterprise', price: 'Custom', isEnterprise: true, icon: Building2, description: 'Maximum scale, zero compromise.', features: ['Unlimited Users', 'Data Sovereignty', 'Custom Development', 'VIP Support'] },
  ],
  'All-in-One': [
    { name: 'Starter', price: '₹10,00,000', rawPrice: 100000000, icon: Rocket, description: 'Total ecosystem access for regions.', features: ['Full Ecosystem Access', 'Enterprise Security', 'Regional Hosting', 'Training Portal'] },
    { name: 'Growth', price: '₹15,00,000', rawPrice: 150000000, icon: Zap, description: 'The ultimate scaling powerhouse.', features: ['Scaling Infrastructure', 'Global CDN', 'AI Operations Pack', '24/7 Dedicated Ops'] },
    { name: 'Advanced', price: '₹25,00,000', rawPrice: 250000000, icon: Crown, description: 'The pinnacle of B2B SaaS tech.', features: ['Unlimited Scaling', 'Custom LLM Training', 'Full Source Audit', 'Infinite API calls'] },
    { name: 'Enterprise', price: 'Custom', isEnterprise: true, icon: Building2, description: 'Bespoke government-grade tech.', features: ['Gov-Grade Security', 'On-Premise Option', 'Bespoke AI Solutions', 'Lifetime Updates'] },
  ]
};

export default function B2BPricingSection() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<PricingCategory>('Single Product');
  const [isMeetingModalOpen, setIsMeetingModalOpen] = useState(false);
  const [selectedPlanForBooking, setSelectedPlanForBooking] = useState<{category: string, tier: string} | null>(null);

  const openBooking = (tierName: string) => {
    setSelectedPlanForBooking({ category: activeTab, tier: tierName });
    setIsMeetingModalOpen(true);
  };

  const openWhatsApp = () => {
    const message = `Hi, I am interested in the Enterprise Plan (${activeTab}). Can we talk?`;
    window.open(`https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Redirect to Checkout Page
  const handleGetStarted = (tier: PricingTier) => {
    if (!tier.rawPrice) return;
    const params = new URLSearchParams({
      plan: tier.name,
      category: activeTab,
      price: tier.price,
      amount: tier.rawPrice.toString() // amount in paise
    });
    router.push(`/checkout?${params.toString()}`);
  };

  return (
    <section className="relative py-24 bg-[#020617] text-white overflow-hidden" id="pricing">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="animate-fade-in-up">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
              Flexible <span className="text-blue-500">Pricing</span>
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto text-lg mb-10">
              Scale your business infrastructure with our modular SaaS solutions. No hidden fees.
            </p>
          </div>
          
          <div className="inline-flex p-1.5 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl mb-12">
            {(Object.keys(CATEGORIES) as PricingCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`relative px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-300 ${
                  activeTab === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/25' : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CATEGORIES[activeTab].map((tier) => (
              <div 
                key={`${activeTab}-${tier.name}`}
                className={`group relative p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col hover:-translate-y-2 ${
                  tier.name === 'Growth' 
                    ? 'bg-blue-600/5 border-blue-500/50 scale-100 lg:scale-105 shadow-[0_20px_50px_rgba(37,99,235,0.15)] z-20' 
                    : 'bg-white/[0.02] border-white/10 hover:border-white/30 hover:shadow-xl'
                }`}
              >
                {tier.name === 'Growth' && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-500 text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-xl">
                    Recommended
                  </div>
                )}

                <div className="mb-6 flex justify-between items-start">
                  <div className={`p-3 rounded-2xl ${tier.name === 'Growth' ? 'bg-blue-500 text-white' : 'bg-white/5 text-blue-400'}`}>
                    <tier.icon size={28} />
                  </div>
                </div>

                <h3 className="text-2xl font-black uppercase mb-1">{tier.name}</h3>
                <p className="text-slate-500 text-xs mb-6 line-clamp-2 h-8">{tier.description}</p>
                
                <div className="mb-8">
                  <div className="text-4xl font-bold text-white tracking-tight">{tier.price}</div>
                  {!tier.isEnterprise && <div className="text-slate-500 text-xs mt-1 uppercase tracking-widest">Single License</div>}
                </div>
                
                <div className="space-y-4 mb-10 flex-1">
                  {tier.features.map((f) => (
                    <div key={f} className="flex items-start gap-3 text-sm text-slate-300">
                      <div className="mt-1 bg-blue-500/20 p-0.5 rounded-full">
                        <Check className="w-3 h-3 text-blue-500" />
                      </div>
                      {f}
                    </div>
                  ))}
                </div>

                {tier.isEnterprise ? (
                    <div className="flex flex-col gap-3">
                        <button 
                            onClick={openWhatsApp}
                            className="w-full py-3 rounded-2xl font-black uppercase tracking-wider text-[11px] bg-white text-black hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
                        >
                            <MessageCircle className="w-4 h-4" /> Contact Sales
                        </button>
                        
                        <button 
                            onClick={() => openBooking(tier.name)}
                            className="w-full py-3 rounded-2xl font-black uppercase tracking-wider text-[11px] bg-white/5 border border-white/10 hover:bg-white/10 transition-all flex items-center justify-center gap-2 text-slate-300"
                        >
                            <Calendar className="w-4 h-4" /> Book Calendar
                        </button>
                    </div>
                ) : (
                    <button 
                      onClick={() => handleGetStarted(tier)}
                      className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.15em] text-[11px] transition-all flex items-center justify-center gap-3 active:scale-[0.95] ${
                        tier.name === 'Growth' 
                          ? 'bg-blue-600 hover:bg-blue-500 text-white' 
                          : 'bg-white text-black hover:bg-slate-200'
                      }`}
                    >
                        <Rocket className="w-4 h-4" /> Get Started <ArrowRight className="w-3 h-3" />
                    </button>
                )}
              </div>
            ))}
        </div>

        <div className="mt-20 p-8 rounded-[3rem] bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
              <Phone className="text-blue-400" />
            </div>
            <div>
              <h4 className="font-bold text-lg">Prefer to talk directly?</h4>
              <p className="text-slate-400 text-sm">Call us at <span className="text-white font-semibold">+91 870023 6923</span> or book a consultation.</p>
            </div>
          </div>
          <button 
            onClick={() => openBooking('Custom Architecture')}
            className="px-8 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-bold transition-all text-sm flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            Book Consultation
          </button>
        </div>
      </div>

      <ScheduleMeetingModal 
        isOpen={isMeetingModalOpen} 
        onClose={() => setIsMeetingModalOpen(false)} 
        planInfo={selectedPlanForBooking}
      />
    </section>
  );
}
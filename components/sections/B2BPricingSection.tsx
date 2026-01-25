'use client';

import React, { useState } from 'react';
import { 
  Check, Zap, Crown, Building2, 
  Calendar, Loader2, ShieldCheck, Rocket
} from 'lucide-react';
import Script from 'next/script';
import ScheduleMeetingModal from './ScheduleMeetingModal'; 

type PricingCategory = 'Single Product' | 'Combo' | 'All-in-One';

interface PricingTier {
  name: string;
  price: string;
  rawPrice?: number;
  features: string[];
  icon: any;
  isEnterprise?: boolean;
}

const CATEGORIES: Record<PricingCategory, PricingTier[]> = {
  'Single Product': [
    { name: 'Starter', price: '₹25,000', rawPrice: 2500000, icon: Rocket, features: ['1 Core Module', 'Email Support', 'Basic Analytics'] },
    { name: 'Growth', price: '₹50,000', rawPrice: 5000000, icon: Zap, features: ['3 Core Modules', 'Priority Support', 'Advanced Analytics'] },
    { name: 'Advanced', price: '₹1,00,000', rawPrice: 10000000, icon: Crown, features: ['All Core Modules', '24/7 Support', 'Custom Reporting'] },
    { name: 'Enterprise', price: 'Custom', isEnterprise: true, icon: Building2, features: ['Dedicated Infrastructure', 'SLA Guarantee', 'Custom Workflows'] },
  ],
  'Combo': [
    { name: 'Starter', price: '₹50,000', rawPrice: 5000000, icon: Rocket, features: ['2 Product Suite', 'Shared Data Lake', 'Basic Automations'] },
    { name: 'Growth', price: '₹1,00,000', rawPrice: 10000000, icon: Zap, features: ['4 Product Suite', 'Unified Dashboard', 'Advance Automations'] },
    { name: 'Advanced', price: '₹2,00,000', rawPrice: 20000000, icon: Crown, features: ['Complete Product Suite', 'AI Insights', 'Custom Integrations'] },
    { name: 'Enterprise', price: 'Custom', isEnterprise: true, icon: Building2, features: ['Unlimited Users', 'Data Sovereignty', 'Custom Development'] },
  ],
  'All-in-One': [
    { name: 'Starter', price: '₹10,00,000', rawPrice: 100000000, icon: Rocket, features: ['Full Ecosystem Access', 'Enterprise Security', 'Regional Hosting'] },
    { name: 'Growth', price: '₹15,00,000', rawPrice: 150000000, icon: Zap, features: ['Scaling Infrastructure', 'Global CDN', 'AI Operations Pack'] },
    { name: 'Advanced', price: '₹25,00,000', rawPrice: 250000000, icon: Crown, features: ['Unlimited Scaling', 'Custom LLM Training', 'Full Source Audit'] },
    { name: 'Enterprise', price: 'Custom', isEnterprise: true, icon: Building2, features: ['Government Grade Security', 'On-Premise Option', 'Bespoke AI Solutions'] },
  ]
};

export default function B2BPricingSection() {
  const [activeTab, setActiveTab] = useState<PricingCategory>('Single Product');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const handlePayment = (tier: PricingTier) => {
    if (!tier.rawPrice) return;
    setLoading(tier.name);
    
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, 
      amount: tier.rawPrice,
      currency: "INR",
      name: "CareerLab B2B",
      description: `${tier.name} - ${activeTab} Plan`,
      handler: (response: any) => {
        window.open(`https://wa.me/918700236923?text=B2B_Payment_Success_ID_${response.razorpay_payment_id}`, '_blank');
        setLoading(null);
      },
      theme: { color: "#3b82f6" },
    };

    if ((window as any).Razorpay) {
      new (window as any).Razorpay(options).open();
    } else {
      alert("Razorpay SDK is loading, please try again in a moment.");
    }
    setLoading(null);
  };

  return (
    <section className="py-24 bg-[#020617] text-white">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter capitalise mb-6">
            SaaS <span className="text-blue-500">Solutions Eco-System</span>
          </h2>
          
          <div className="inline-flex p-1 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
            {(Object.keys(CATEGORIES) as PricingCategory[]).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 ${
                  activeTab === cat ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES[activeTab].map((tier) => (
            <div 
              key={tier.name}
              className={`relative p-8 rounded-[2.5rem] border transition-all duration-500 flex flex-col ${
                tier.name === 'Growth' ? 'bg-blue-600/10 border-blue-500/50 scale-105 z-10' : 'bg-white/[0.02] border-white/10'
              }`}
            >
              <tier.icon className={`w-12 h-12 mb-6 ${tier.name === 'Growth' ? 'text-blue-400' : 'text-slate-500'}`} />
              <h3 className="text-2xl font-black uppercase mb-1">{tier.name}</h3>
              <div className="text-3xl font-bold mb-6 text-blue-400">{tier.price}</div>
              
              <div className="space-y-4 mb-8 flex-1">
                {tier.features.map((f) => (
                  <div key={f} className="flex items-center gap-3 text-sm text-slate-400">
                    <Check className="w-4 h-4 text-blue-500" /> {f}
                  </div>
                ))}
              </div>

              {tier.isEnterprise ? (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="w-full py-4 rounded-xl bg-white text-black font-bold uppercase tracking-widest text-[10px] hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
                >
                  <Calendar className="w-4 h-4" /> Book Appointment
                </button>
              ) : (
                <button 
                  onClick={() => handlePayment(tier)}
                  disabled={loading === tier.name}
                  className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold uppercase tracking-widest text-[10px] hover:bg-blue-500 transition-all flex items-center justify-center gap-2"
                >
                  {loading === tier.name ? <Loader2 className="animate-spin" /> : <ShieldCheck className="w-4 h-4" />} Get Started
                </button>
              )}
            </div>
          ))}
        </div>

        <ScheduleMeetingModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
        />
      </div>
    </section>
  );
}
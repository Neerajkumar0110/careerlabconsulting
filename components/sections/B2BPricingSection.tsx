'use client';

import React, { useState } from 'react';
import { 
  Check, Zap, Crown, Building2, Send, 
  Calendar, MessageSquare, Mail, Phone,
  Loader2, ShieldCheck, Rocket, Briefcase
} from 'lucide-react';
import Script from 'next/script';

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
    { name: 'Starter', price: '₹25,000', rawPrice: 2500000, icon: Rocket, features: ['1 Core Module', 'Email Support', 'Basic Analytics', 'Standard Integration'] },
    { name: 'Growth', price: '₹50,000', rawPrice: 5000000, icon: Zap, features: ['3 Core Modules', 'Priority Support', 'Advanced Analytics', 'API Access'] },
    { name: 'Advanced', price: '₹1,00,000', rawPrice: 10000000, icon: Crown, features: ['All Core Modules', '24/7 Support', 'Custom Reporting', 'White-labeling'] },
    { name: 'Enterprise', price: 'Custom', isEnterprise: true, icon: Building2, features: ['Dedicated Infrastructure', 'SLA Guarantee', 'On-site Training', 'Custom Workflows'] },
  ],
  'Combo': [
    { name: 'Starter', price: '₹50,000', rawPrice: 5000000, icon: Rocket, features: ['2 Product Suite', 'Shared Data Lake', 'Basic Automations', 'Standard Support'] },
    { name: 'Growth', price: '₹1,00,000', rawPrice: 10000000, icon: Zap, features: ['4 Product Suite', 'Unified Dashboard', 'Advance Automations', 'Dedicated Account Manager'] },
    { name: 'Advanced', price: '₹2,00,000', rawPrice: 20000000, icon: Crown, features: ['Complete Product Suite', 'AI Insights', 'Custom Integrations', 'Priority Roadmap'] },
    { name: 'Enterprise', price: 'Custom', isEnterprise: true, icon: Building2, features: ['Unlimited Users', 'Data Sovereignty', 'Security Audit Support', 'Custom Development'] },
  ],
  'All-in-One': [
    { name: 'Starter', price: '₹10,00,000', rawPrice: 100000000, icon: Rocket, features: ['Full Ecosystem Access', 'Enterprise Security', 'Regional Hosting', 'Admin Panels'] },
    { name: 'Growth', price: '₹15,00,000', rawPrice: 150000000, icon: Zap, features: ['Scaling Infrastructure', 'Global CDN', 'AI Operations Pack', 'Multilingual Support'] },
    { name: 'Advanced', price: '₹25,00,000', rawPrice: 250000000, icon: Crown, features: ['Unlimited Ecosystem Scaling', 'Custom LLM Training', 'Full Source Audit', 'Executive Support'] },
    { name: 'Enterprise', price: 'Custom', isEnterprise: true, icon: Building2, features: ['Government Grade Security', 'On-Premise Option', 'Bespoke AI Solutions', 'Global Deployment'] },
  ]
};

export default function B2BPricingSection() {
  const [activeTab, setActiveTab] = useState<PricingCategory>('Single Product');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<string | null>(null);

  const contactDetails = {
    email: 'info@careerlabconsulting.com',
    whatsapp: '+918700236923',
    ownerPhone: '918700236923'
  };

  const handlePayment = (tier: PricingTier) => {
    if (!tier.rawPrice) return;
    setLoading(tier.name);
    
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: tier.rawPrice,
      currency: "INR",
      name: "InternX B2B",
      description: `${tier.name} - ${activeTab} Plan`,
      handler: (response: any) => {
        const waMsg = `*B2B Payment Confirmation*%0A*Plan:* ${tier.name} (${activeTab})%0A*Amount:* ${tier.price}%0A*ID:* ${response.razorpay_payment_id}`;
        window.open(`https://wa.me/${contactDetails.ownerPhone}?text=${waMsg}`, '_blank');
        setLoading(null);
      },
      theme: { color: "#3b82f6" },
    };

    if ((window as any).Razorpay) {
      new (window as any).Razorpay(options).open();
    } else {
      alert("Razorpay SDK Loading...");
    }
    setLoading(null);
  };

  return (
    <section className="py-24 bg-[#020617] text-white overflow-hidden">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6">
            B2B <span className="text-blue-500">Solutions</span>
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
              <div className="text-3xl font-bold mb-6 text-blue-400">{tier.price} <span className="text-sm text-slate-500 font-normal italic">/mo</span></div>
              
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

        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="bg-[#0f172a] border border-white/10 w-full max-w-lg rounded-[2rem] p-8 relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white">✕</button>
              
              <h3 className="text-3xl font-black uppercase mb-2">Enterprise Inquiry</h3>
              <p className="text-slate-400 text-sm mb-8">Schedule a high-level meeting with our strategy team.</p>

              <form className="space-y-4" action={`https://formspree.io/f/YOUR_ID`} method="POST">
                <input type="text" name="name" placeholder="FULL NAME" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-blue-500 outline-none" />
                <div className="grid grid-cols-2 gap-4">
                    <input type="email" name="email" placeholder="WORK EMAIL" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-blue-500 outline-none" />
                    <input type="tel" name="phone" placeholder="PHONE" required className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-blue-500 outline-none" />
                </div>
                <textarea name="query" placeholder="TELL US ABOUT YOUR REQUIREMENTS" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-blue-500 outline-none"></textarea>
                
                <button type="submit" className="w-full py-4 bg-blue-600 rounded-xl font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" /> Submit Request
                </button>
              </form>

              <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                <a href={`mailto:${contactDetails.email}`} className="flex items-center gap-3 text-[10px] font-bold text-slate-400 hover:text-blue-400 uppercase tracking-widest">
                  <Mail className="w-4 h-4" /> Email Us
                </a>
                <a href={`https://wa.me/${contactDetails.ownerPhone}`} className="flex items-center gap-3 text-[10px] font-bold text-slate-400 hover:text-green-400 uppercase tracking-widest">
                  <MessageSquare className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
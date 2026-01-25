'use client';

import React, { useState } from 'react';
import { 
  Check, Zap, Crown, Terminal, ShieldCheck, Sparkles, 
  Loader2, CreditCard, X, TrendingUp 
} from 'lucide-react';
import Script from 'next/script';

interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id?: string;
  razorpay_signature?: string;
}

interface Tier {
  id: string;
  name: string;
  duration: string;
  priceINR: string;
  rawAmount: number;
  emiAmount: number;
  emiText: string;
  description: string;
  targetCTC: string;
  features: string[];
  highlight: boolean;
  icon: any; 
}

declare global {
  interface Window {
    Razorpay: any;
  }
}

const partners = [
  { name: "HDFC", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/HDFC_Bank_Logo.svg/960px-HDFC_Bank_Logo.svg.png" },
  { name: "ICICI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/3840px-ICICI_Bank_Logo.svg.png" },
  { name: "Bajaj Finance", logo: "https://i.logos-download.com/104038/25954-og-3eb91e8f96281f00288cb76528c38928.png/Bajaj_Finserv_Logo_og.png" },
  { name: "Propel", logo: "https://niuonline.edu.in/wp-content/uploads/2025/08/Propelld-Blue-Logo-3-2-1024x177.webp" },
  { name: "ShopSe", logo: "https://framerusercontent.com/images/rmJzwShQEM78IdCVmymj1i9K7M.svg?width=1343&height=300" }
];

const tiers: Tier[] = [
  {
    id: "plan-foundation",
    name: "Foundation",
    duration: "6 Months",
    priceINR: "₹99,999",
    rawAmount: 9999900,
    emiAmount: 520800, 
    emiText: "EMI starts from: 5208 INR",
    description: "Build your first AI career asset with ResumeNFT visibility.",
    targetCTC: "Avg CTC: ₹10-12 LPA",
    features: [
      "Real Startup Agentic AI Projects",
      "ResumeNFT + GitHub Portfolio",
      "Python & Prompt Engineering Basics",
      "1 Verified Internship Certificate",
      "GPT & LangChain Starter Projects",
      "HireX Job Network Access"
    ],
    highlight: false,
    icon: Terminal
  },
  {
    id: "plan-elite",
    name: "Elite",
    duration: "12 Months",
    priceINR: "₹2,49,999",
    rawAmount: 24999900,
    emiAmount: 520800, 
    emiText: "EMI starts from: 5208 INR",
    description: "Top-tier program for international roles with legal job.",
    targetCTC: "Avg CTC: ₹30-50 LPA",
    features: [
      "100% Legal Job (Signed)",
      "Weekly 1-on-1 Expert Mentoring",
      "3+ Global Showcase Projects",
      "3 Premium Bonus Internships",
      "Advanced Agentic AI Workflows",
      "Germany/Remote Role Specialization"
    ],
    highlight: true,
    icon: Crown
  }
];

export default function PricingSection() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const ownerPhone = "918700236923";

  const handlePaymentSuccess = async (response: RazorpayResponse, tier: Tier, type: string) => {
    const amountPaid = type === 'EMI Plan' ? "₹5,208 (EMI Start)" : tier.priceINR;
    const waMessage = `*New Enrollment Confirmation*%0A%0A*Plan:* ${tier.name}%0A*Type:* ${type}%0A*Amount:* ${amountPaid}%0A*Payment ID:* ${response.razorpay_payment_id}`;
    const whatsappUrl = `https://wa.me/${ownerPhone}?text=${waMessage}`;

    try {
      await fetch('/api/send-confirmation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          planName: tier.name, 
          amount: amountPaid, 
          paymentId: response.razorpay_payment_id, 
          type: type 
        }),
      });
      window.open(whatsappUrl, '_blank');
    } catch (err) { 
      console.error(err); 
    }
  };

  const makePayment = async (tier: Tier, paymentType: 'Full' | 'EMI') => {
    const actionId = `${tier.id}-${paymentType}`;
    setLoadingId(actionId);
    
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: paymentType === 'EMI' ? tier.emiAmount : tier.rawAmount,
      currency: "INR",
      name: "InternX AI",
      description: paymentType === 'EMI' ? `EMI - ${tier.name}` : `Full - ${tier.name}`,
      handler: (res: RazorpayResponse) => handlePaymentSuccess(res, tier, paymentType === 'Full' ? 'Full Payment' : 'EMI Plan'),
      theme: { color: paymentType === 'Full' ? "#3b82f6" : "#10b981" },
    };
    
    if (window.Razorpay) {
      new window.Razorpay(options).open();
    } else {
      alert("Razorpay SDK not loaded. Please check your internet.");
    }
    setLoadingId(null);
  };

  return (
    <section className="py-20 md:py-32 bg-[#020617] text-white font-sans overflow-hidden">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Enrollment Portal</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Choose Your <span className="italic text-slate-500 font-serif lowercase">Evolution</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-32">
          {tiers.map((tier) => (
            <div key={tier.id} className={`relative p-8 md:p-12 rounded-[3rem] border flex flex-col transition-all duration-500 ${tier.highlight ? 'bg-[#0a1229] border-blue-500 shadow-2xl shadow-blue-500/20 md:scale-105 z-20' : 'bg-white/[0.02] border-white/10'}`}>
              <div className="mb-8">
                <tier.icon className={`w-14 h-14 mb-8 ${tier.highlight ? 'text-blue-400' : 'text-slate-500'}`} />
                <h3 className="text-4xl font-black uppercase mb-2">{tier.name}</h3>
                <p className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-6">{tier.duration} Program</p>
                
                <div className="flex flex-col gap-1">
                  <span className="text-6xl font-black tracking-tighter">{tier.priceINR}</span>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mt-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 text-sm font-bold uppercase">{tier.targetCTC}</span>
                  </div>
                  
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mt-2">
                    <span className="text-green-400 text-sm font-bold flex items-center gap-2 italic mb-3">
                      <Zap className="w-4 h-4 fill-green-400" /> {tier.emiText}
                    </span>
                    <div className="border-t border-green-500/10 pt-4">
                        <div className="grid grid-cols-5 gap-3 items-center opacity-80 hover:opacity-100 transition-all duration-500">
                           {partners.map((p) => (
                             <img 
                               key={p.name} 
                               src={p.logo} 
                               alt={p.name} 
                               title={p.name} 
                               className="h-5 w-auto object-contain mx-auto bg-white p-1 rounded-sm" 
                             />
                           ))}
                        </div>
                        <p className="text-[7px] uppercase font-black tracking-[0.2em] text-center text-slate-600 mt-4 italic">No-Cost EMI Approved Partners</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-12 flex-1 border-t border-white/5 pt-8">
                {tier.features.map((feature) => (
                  <div key={feature} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                    <span className="text-slate-300 text-sm font-medium leading-relaxed">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4 mt-auto">
                <button 
                  onClick={() => makePayment(tier, 'Full')} 
                  disabled={!!loadingId} 
                  className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 disabled:opacity-50"
                >
                  {loadingId === `${tier.id}-Full` ? <Loader2 className="animate-spin w-4 h-4" /> : <CreditCard className="w-4 h-4" />} Full Payment
                </button>
                <button 
                  onClick={() => makePayment(tier, 'EMI')} 
                  disabled={!!loadingId} 
                  className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all bg-white/5 hover:bg-white/10 border border-white/20 text-white group disabled:opacity-50"
                >
                  {loadingId === `${tier.id}-EMI` ? <Loader2 className="animate-spin w-4 h-4" /> : <Zap className="w-4 h-4 text-green-400 group-hover:scale-125 transition-transform" />} Pay via EMI (Monthly)
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 border-t border-white/10 pt-20">
          <div className="text-center mb-12">
            <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">InternX Learning <span className="text-slate-500 italic font-serif">vs</span> Traditional Learning</h3>
            <p className="text-slate-400 text-sm italic font-medium tracking-wide uppercase">Breaking the theory-based education cycle.</p>
          </div>
          <div className="overflow-x-auto rounded-[2.5rem] border border-white/10 bg-white/[0.01] backdrop-blur-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/10 bg-white/5">
                  <th className="p-6 text-[10px] uppercase font-black text-slate-500">Benchmark Metric</th>
                  <th className="p-6 text-[10px] uppercase font-black text-blue-400 tracking-widest underline decoration-2 underline-offset-8">InternX Learning</th>
                  <th className="p-6 text-[10px] uppercase font-black text-slate-500">Traditional Learning</th>
                </tr>
              </thead>
              <tbody className="text-sm font-medium">
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-slate-300">Core Curriculum</td>
                  <td className="p-6 text-blue-400 italic">Agentic AI & LLM Workflows</td>
                  <td className="p-6 text-slate-500">Full-Stack / Legacy Data Science</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-slate-300">Project Quality</td>
                  <td className="p-6 text-blue-400 flex items-center gap-2"><Check size={14} /> Live Global Startup Assets</td>
                  <td className="p-6 text-slate-600 flex items-center gap-2"><X size={14} /> Dummy Capstones / Local CMS</td>
                </tr>
                <tr className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-slate-300">Verification System</td>
                  <td className="p-6 text-blue-400 flex items-center gap-2"><Check size={14} /> ResumeNFT (On-Chain Proof)</td>
                  <td className="p-6 text-slate-600 flex items-center gap-2"><X size={14} /> Basic Paper/PDF Certificates</td>
                </tr>
                <tr className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-slate-300">Career Accountability</td>
                  <td className="p-6 text-blue-400 flex items-center gap-2"><Check size={14} /> Legal Signed Job Guarantee</td>
                  <td className="p-6 text-slate-600 flex items-center gap-2"><X size={14} /> Soft "Placement Assistance"</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-20 flex justify-center">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 italic">InternX-AI Secure SSL | PCI-DSS Compliant Gateway</span>
            </div>
        </div>
      </div>
    </section>
  );
}
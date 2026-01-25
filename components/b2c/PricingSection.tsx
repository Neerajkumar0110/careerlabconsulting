'use client';

import React, { useState } from 'react';
import { Check, Zap, Crown, Terminal, ShieldCheck, Sparkles, Loader2, LucideIcon, CreditCard } from 'lucide-react';
import Script from 'next/script';

interface Tier {
  id: string;
  name: string;
  duration: string;
  priceINR: string;
  rawAmount: number; 
  emiAmount: number; 
  emiText: string;
  description: string;
  features: string[];
  highlight: boolean;
  icon: LucideIcon;
}

const tiers: Tier[] = [
  {
    id: "plan-foundation",
    name: "Foundation",
    duration: "6 Months",
    priceINR: "₹99,999",
    rawAmount: 9999900,
    emiAmount: 520800, 
    emiText: "EMI starts from: 5208 INR",
    description: "Build a rock-solid foundation in AI development.",
    features: ["6 Months Intensive Training", "Real-world AI Projects", "Placement Support", "Certification"],
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
    description: "Master-level engineering with guaranteed global standards.",
    features: ["12 Months Advanced Curriculum", "Job Guarantee Program", "1-on-1 Global Mentorship", "Avg CTC: ₹30-50 LPA"],
    highlight: true,
    icon: Crown
  }
];

export default function PricingSection() {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const ownerPhone = "918700236923";

  const handlePaymentSuccess = async (response: any, tier: Tier, type: string) => {
    const amountPaid = type === 'EMI Plan' ? "₹5,208 (EMI Start)" : tier.priceINR;
    const waMessage = `*New Enrollment Confirmation*%0A%0A*Plan:* ${tier.name}%0A*Type:* ${type}%0A*Amount:* ${amountPaid}%0A*Payment ID:* ${response.razorpay_payment_id}%0A%0A_Verification Required._`;
    const whatsappUrl = `https://wa.me/${ownerPhone}?text=${waMessage}`;

    try {
      await fetch('/api/send-email', {
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
      alert(`Success! Payment ID: ${response.razorpay_payment_id}. Enrollment details sent to owner.`);
    } catch (err) {
      console.error("Notification Error:", err);
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
      description: paymentType === 'EMI' 
        ? `${tier.name} - Monthly EMI Subscription` 
        : `${tier.name} - Full Course Enrollment`,
      image: "https://your-website.com/logo.png", 
      handler: function (response: any) {
        handlePaymentSuccess(response, tier, paymentType === 'Full' ? 'Full Payment' : 'EMI Plan');
      },
      prefill: {
        name: "", 
        email: "",
        contact: ""
      },
      theme: {
        color: paymentType === 'Full' ? "#3b82f6" : "#10b981", 
      },
    };

    const paymentObject = new (window as any).Razorpay(options);
    paymentObject.open();
    setLoadingId(null);
  };

  return (
    <section className="py-20 md:py-32 bg-[#020617] text-white overflow-hidden relative font-sans">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="lazyOnload" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Enrollment Portal</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Choose Your <span className="italic text-slate-500 font-serif lowercase">Evolution</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {tiers.map((tier) => (
            <div key={tier.id} className={`relative p-8 md:p-12 rounded-[3rem] border flex flex-col transition-all duration-500 ${tier.highlight ? 'bg-[#0a1229] border-blue-500 shadow-2xl shadow-blue-500/20 md:scale-105 z-20' : 'bg-white/[0.02] border-white/10'}`}>
              
              <div className="mb-8">
                <tier.icon className={`w-14 h-14 mb-8 ${tier.highlight ? 'text-blue-400' : 'text-slate-500'}`} />
                <h3 className="text-4xl font-black uppercase mb-2">{tier.name}</h3>
                <p className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-6">{tier.duration} Program</p>
                
                <div className="flex flex-col gap-1">
                    <span className="text-6xl font-black tracking-tighter">{tier.priceINR}</span>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-3 mt-3">
                      <span className="text-green-400 text-sm font-bold flex items-center gap-2">
                        <Zap className="w-4 h-4 fill-green-400" /> {tier.emiText}
                      </span>
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
                  className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-lg active:scale-95 disabled:opacity-50"
                >
                  {loadingId === `${tier.id}-Full` ? <Loader2 className="animate-spin w-4 h-4" /> : <CreditCard className="w-4 h-4" />}
                  Full Payment
                </button>

                <button 
                  onClick={() => makePayment(tier, 'EMI')}
                  disabled={!!loadingId}
                  className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all bg-white/5 hover:bg-white/10 border border-white/20 text-white active:scale-95 disabled:opacity-50 shadow-inner"
                >
                  {loadingId === `${tier.id}-EMI` ? <Loader2 className="animate-spin w-4 h-4" /> : <Zap className="w-4 h-4 text-green-400" />}
                  Pay via EMI (Monthly)
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
            <div className="flex items-center gap-8 opacity-30 grayscale">
                <span className="text-[10px] font-bold tracking-widest uppercase italic">Cards</span>
                <span className="text-[10px] font-bold tracking-widest uppercase italic">NetBanking</span>
                <span className="text-[10px] font-bold tracking-widest uppercase italic">UPI</span>
                <span className="text-[10px] font-bold tracking-widest uppercase italic">EMI</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/5 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 italic">InternX-AI Secure SSL Encryption</span>
            </div>
        </div>
      </div>
    </section>
  );
}
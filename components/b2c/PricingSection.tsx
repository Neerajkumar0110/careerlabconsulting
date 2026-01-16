'use client';

import React from 'react';
import { Check, Zap, Crown, Terminal, ShieldCheck, Sparkles } from 'lucide-react';

const tiers = [
  {
    name: "Neural Lite",
    price: "₹4,999",
    description: "Perfect for students starting their deployment journey.",
    features: ["LMS Cloud Access", "Basic Neural Projects", "Community Support", "Digital Certificate"],
    cta: "Start Protocol",
    highlight: false,
    icon: Terminal
  },
  {
    name: "Industry Pro",
    price: "₹12,999",
    description: "High-octane training with direct industry mentorship.",
    features: ["Everything in Lite", "1:1 Industry Navigator", "Live Code Reviews", "Placement Assistance", "Soul-bound NFT Certificate"],
    cta: "Allocate Access",
    highlight: true,
    icon: Crown
  }
];

export default function PricingSection() {
  return (
    <section className="py-20 md:py-32 bg-[#020617] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-[300px] md:w-[600px] h-[300px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span className="text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">Pricing Protocols</span>
          </div>
          <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight">
            CHOOSE YOUR <br className="md:hidden" /> <span className="italic text-slate-500">ACCESS LEVEL</span>
          </h2>
          <p className="text-slate-400 text-sm md:text-lg px-4 md:px-0">
            Flexible tiers designed for every stage of your engineering evolution.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-8 max-w-5xl mx-auto">
          {tiers.map((tier, i) => (
            <div 
              key={i} 
              className={`relative group p-7 md:p-12 rounded-[2.5rem] md:rounded-[3rem] border transition-all duration-500 flex flex-col ${
                tier.highlight 
                ? 'bg-[#0a1229] border-blue-500/50 shadow-[0_0_40px_-10px_rgba(59,130,246,0.3)] scale-[1.02] md:scale-105 z-20' 
                : 'bg-white/[0.02] border-white/10 hover:border-white/20 z-10'
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 bg-blue-500 rounded-full text-[9px] md:text-[10px] font-black text-white uppercase tracking-widest shadow-lg shadow-blue-500/40 whitespace-nowrap">
                  Most Deployed
                </div>
              )}

              <div className="mb-8">
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 ${
                  tier.highlight ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-400'
                }`}>
                  <tier.icon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <h3 className="text-xl md:text-2xl font-black text-white mb-2">{tier.name}</h3>
                <p className="text-slate-500 text-xs md:text-sm leading-relaxed mb-6 h-auto md:h-10">
                  {tier.description}
                </p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl md:text-5xl font-black text-white tracking-tighter">
                    {tier.price}
                  </span>
                  <span className="text-slate-500 text-[10px] md:text-sm font-bold uppercase tracking-widest">
                    / Cohort
                  </span>
                </div>
              </div>

              {/* Feature List */}
              <div className="space-y-4 mb-10 flex-1">
                {tier.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      tier.highlight ? 'bg-blue-500/20 text-blue-400' : 'bg-white/5 text-slate-600'
                    }`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span className="text-slate-300 text-xs md:text-sm font-medium leading-tight">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button className={`w-full py-4 md:py-5 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] transition-all transform active:scale-95 ${
                tier.highlight 
                ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-600/20' 
                : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
              }`}>
                {tier.cta}
              </button>
            </div>
          ))}
        </div>

        {/* Security Trust Bar */}
        <div className="mt-16 md:mt-24 flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 opacity-40">
           <div className="flex items-center gap-2 text-white">
              <ShieldCheck className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-center">
                Secure 256-bit Encryption
              </span>
           </div>
           <div className="hidden md:block w-1 h-1 bg-white/20 rounded-full" />
           <div className="flex items-center gap-2 text-white">
              <Zap className="w-4 h-4 md:w-5 md:h-5" />
              <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-center">
                Instant Deployment Access
              </span>
           </div>
        </div>
      </div>
    </section>
  );
}
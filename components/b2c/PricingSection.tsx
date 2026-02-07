'use client';

import React, { useState, useEffect } from 'react';
import { 
  Check, Zap, Crown, Terminal, ShieldCheck, Sparkles, 
  TrendingUp, Calendar, CreditCard, Globe 
} from 'lucide-react';
import { useRouter } from 'next/navigation';

const partners = [
  { name: "HDFC", logo: "https://cdn.worldvectorlogo.com/logos/hdfc-bank-logo.svg" },
  { name: "ICICI", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/ICICI_Bank_Logo.svg/3840px-ICICI_Bank_Logo.svg.png" },
  { name: "Bajaj Finance", logo: "https://brandlogos.net/wp-content/uploads/2021/10/Bajaj-Finance-logo-.png" },
  { name: "Propel", logo: "https://niuonline.edu.in/wp-content/uploads/2025/08/Propelld-Blue-Logo-3-2-1024x177.webp" },
  { name: "ShopSe", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBNp2z8bJCidU0Z4TCfjF4JARJkY4Gh1_5Qw&s" }
];

interface Tier {
  id: string;
  name: string;
  duration: string;
  priceDisplay: string; 
  rawAmountINR: number; 
  rawAmountUSD: number; 
  emiAmount: number; 
  emiText: string;
  description: string;
  targetCTC: string;
  features: string[];
  highlight: boolean;
  icon: any; 
}

export default function PricingSection() {
  const router = useRouter();
  const [countryCode, setCountryCode] = useState<string>('IN'); 
  const [isInternational, setIsInternational] = useState<boolean>(false);

  useEffect(() => {
    const checkLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/');
        const data = await response.json();
        if (data && data.country_code) {
          setCountryCode(data.country_code);
          if (data.country_code !== 'IN') {
            setIsInternational(true);
          }
        }
      } catch (error) {
        console.error("Failed to detect location, defaulting to INR", error);
      }
    };
    checkLocation();
  }, []);

  const tiers: Tier[] = [
    {
      id: "plan-foundation",
      name: "Foundation",
      duration: "6 Months",
      priceDisplay: isInternational ? "$1,999" : "₹1,49,999", 
      rawAmountINR: 14999900, 
      rawAmountUSD: 199900, 
      emiAmount: 520800, 
      emiText: isInternational ? "Flexible installments available" : "EMI starts from: 5208 INR",
      description: "Build your first AI career asset with ResumeNFT visibility.",
      targetCTC: isInternational ? "Avg Salary: $40k-$60k" : "Avg CTC: ₹10-12 LPA",
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
      priceDisplay: isInternational ? "$3,499" : "₹2,49,999", 
      rawAmountINR: 24999900,
      rawAmountUSD: 349900,
      emiAmount: 520800, 
      emiText: isInternational ? "Flexible installments available" : "EMI starts from: 5208 INR",
      description: "Top-tier program for international roles with legal job.",
      targetCTC: isInternational ? "Avg Salary: $80k-$120k" : "Avg CTC: ₹30-50 LPA",
      features: [
        "100% Legal Job (Signed Contract)",
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

  const handleRegister = (tier: Tier) => {
    const params = new URLSearchParams({
        planId: tier.id,
        planName: tier.name,
        priceDisplay: tier.priceDisplay,
        rawAmountINR: tier.rawAmountINR.toString(),
        rawAmountUSD: tier.rawAmountUSD.toString(),
        intl: isInternational ? 'true' : 'false'
    });
    router.push(`/checkout/b2c?${params.toString()}`);
  };

  const handleBookDemo = () => {
      router.push('/book-demo');
  };

  return (
    <section className="py-20 md:py-32 bg-[#020617] text-white font-sans relative">
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <header className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <Sparkles className="w-3 h-3 text-blue-400" />
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Enrollment Portal</span>
          </div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter uppercase leading-none">
            Choose Your <span className="italic text-slate-500 font-serif lowercase">Evolution</span>
          </h2>
          <div className="mt-4 flex justify-center">
             <div className="flex items-center gap-2 text-xs font-bold text-slate-500 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                <Globe className="w-3 h-3" />
                {isInternational ? `International Pricing (${countryCode})` : `India Pricing (${countryCode})`}
             </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl mx-auto mb-32">
          {tiers.map((tier) => (
            <article key={tier.id} className={`relative p-8 md:p-12 rounded-[3rem] border flex flex-col transition-all duration-500 ${tier.highlight ? 'bg-[#0a1229] border-blue-500 shadow-2xl shadow-blue-500/20 md:scale-105 z-20' : 'bg-white/[0.02] border-white/10'}`}>
              <div className="mb-8">
                <tier.icon className={`w-14 h-14 mb-8 ${tier.highlight ? 'text-blue-400' : 'text-slate-500'}`} />
                <h3 className="text-4xl font-black uppercase mb-2">{tier.name}</h3>
                <p className="text-blue-400 font-bold text-sm tracking-widest uppercase mb-6">{tier.duration} Program</p>
                
                <div className="flex flex-col gap-1">
                  <span className="text-6xl font-black tracking-tighter">{tier.priceDisplay}</span>
                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-3 mt-3 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-blue-400" />
                    <span className="text-blue-300 text-sm font-bold uppercase">{tier.targetCTC}</span>
                  </div>
                  
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mt-2">
                    <span className="text-green-400 text-sm font-bold flex items-center gap-2 italic mb-3">
                      <Zap className="w-4 h-4 fill-green-400" /> {tier.emiText}
                    </span>
                    {!isInternational && (
                        <div className="border-t border-green-500/10 pt-4">
                            <div className="grid grid-cols-5 gap-3 items-center opacity-80 hover:opacity-100 transition-all duration-500">
                            {partners.map((p) => (
                                <img key={p.name} src={p.logo} alt={p.name} className="h-5 w-auto object-contain mx-auto bg-white p-1 rounded-sm" loading="lazy" />
                            ))}
                            </div>
                            <p className="text-[7px] uppercase font-black tracking-[0.2em] text-center text-slate-600 mt-4 italic">No-Cost EMI Approved Partners</p>
                        </div>
                    )}
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
                  onClick={() => handleRegister(tier)} 
                  className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/20 cursor-pointer relative z-30"
                >
                  <CreditCard className="w-4 h-4" /> Register Now
                </button>
                
                <button 
                  onClick={handleBookDemo} 
                  className="w-full py-5 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all bg-white/5 hover:bg-white/10 border border-white/20 text-white group cursor-pointer relative z-30"
                >
                  <Calendar className="w-4 h-4 text-green-400 group-hover:scale-125 transition-transform" /> Book Your Demo
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-center gap-6">
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 border border-white/10 shadow-2xl backdrop-blur-md">
                <ShieldCheck className="w-4 h-4 text-blue-500" />
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 italic">InternX-AI Secure SSL | PCI-DSS Compliant Gateway</span>
            </div>
        </div>
      </div>
    </section>
  );
}
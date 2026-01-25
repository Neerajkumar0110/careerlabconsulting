'use client';

import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  MessageSquare, 
  Languages, 
  BarChart3, 
  Infinity,
  ArrowRight 
} from 'lucide-react';

const features = [
  {
    title: "Real-time Intelligence",
    desc: "AI agents that process data and make decisions in under 30ms.",
    icon: <Zap className="w-6 h-6" />,
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    title: "Enterprise Security",
    desc: "Military-grade encryption with SOC2 Type II compliance standards.",
    icon: <ShieldCheck className="w-6 h-6" />,
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    title: "Omnichannel Support",
    desc: "Seamless integration across WhatsApp, Web, Voice, and Email.",
    icon: <MessageSquare className="w-6 h-6" />,
    gradient: "from-purple-400 to-pink-600",
  },
  {
    title: "Global Language Support",
    desc: "Communicate fluently in over 95+ regional and global languages.",
    icon: <Languages className="w-6 h-6" />,
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    title: "Predictive Analytics",
    desc: "Forecasting business trends using advanced neural networks.",
    icon: <BarChart3 className="w-6 h-6" />,
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    title: "Infinite Scalability",
    desc: "Handle 1 to 1,000,000 concurrent sessions without latency.",
    icon: <Infinity className="w-6 h-6" />,
    gradient: "from-red-400 to-rose-600",
  }
];

export default function FeatureGrid() {
  return (
    <section className="py-15 md:py-22 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-bold tracking-widest text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
            Next-Gen Infrastructure
          </span>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
            Scale Your Business <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
              Without the Limits
            </span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            Standard LLMs aren't enough for scale. Our proprietary architecture is built for companies that demand <span className="text-white font-medium">99.9% accuracy.</span>
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-blue-500/50 transition-all duration-300 hover:-translate-y-2"
            >
              {/* Subtle Card Glow on Hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl"></div>

              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6 shadow-lg shadow-blue-500/10`}>
                <div className="w-full h-full bg-[#020617] rounded-[14px] flex items-center justify-center text-white">
                  {feature.icon}
                </div>
              </div>
              
              <h4 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                {feature.title}
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300">
                {feature.desc}
              </p>
              
              {/* Interactive link - Psychological trigger for "More Info" */}
              <div className="mt-6 flex items-center text-xs font-bold text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 cursor-pointer">
                LEARN MORE <ArrowRight className="ml-2 w-3 h-3" />
              </div>
            </div>
          ))}
        </div>

        {/* Profit/Conversion Driver (CTA) */}
        <div className="mt-20 p-8 md:p-12 rounded-[2rem] bg-gradient-to-r from-blue-600 to-indigo-700 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-blue-900/20">
            <div className="text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Ready to automate your growth?</h3>
                <p className="text-blue-100 opacity-80">Join 500+ enterprises optimizing their operations today.</p>
            </div>
            <button className="whitespace-nowrap px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl hover:bg-slate-100 transition-colors shadow-xl active:scale-95 transition-transform">
                Start Free Trial
            </button>
        </div>
      </div>
    </section>
  );
}
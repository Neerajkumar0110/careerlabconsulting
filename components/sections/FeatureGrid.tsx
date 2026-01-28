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
    desc: "AI agents that process enterprise data and make decisions in under 30ms for maximum efficiency.",
    icon: Zap,
    gradient: "from-yellow-400 to-orange-500",
  },
  {
    title: "Enterprise Security",
    desc: "Military-grade encryption with SOC2 Type II compliance standards ensuring data privacy.",
    icon: ShieldCheck,
    gradient: "from-blue-400 to-indigo-600",
  },
  {
    title: "Omnichannel Support",
    desc: "Seamless AI integration across WhatsApp, Web, Voice, and Email platforms.",
    icon: MessageSquare,
    gradient: "from-purple-400 to-pink-600",
  },
  {
    title: "Global Language Support",
    desc: "Communicate fluently in over 95+ regional and global languages with native accuracy.",
    icon: Languages,
    gradient: "from-emerald-400 to-teal-600",
  },
  {
    title: "Predictive Analytics",
    desc: "Forecasting business trends using advanced neural networks and historical data points.",
    icon: BarChart3,
    gradient: "from-cyan-400 to-blue-600",
  },
  {
    title: "Infinite Scalability",
    desc: "Handle 1 to 1,000,000 concurrent sessions without latency or performance drops.",
    icon: Infinity,
    gradient: "from-red-400 to-rose-600",
  }
];

export default function FeatureGrid() {
  return (
    <section 
      className="py-20 md:py-32 bg-[#020617] relative overflow-hidden" 
      id="features"
      aria-labelledby="features-title"
    >
      <div 
        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" 
        aria-hidden="true"
      />
      
      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <header>
            <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] text-blue-400 uppercase bg-blue-500/10 border border-blue-500/20 rounded-full">
              Next-Gen AI Infrastructure
            </span>
            <h2 
              id="features-title"
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]"
            >
              Scale Your Business <br />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-indigo-400">
                Without the Limits
              </span>
            </h2>
          </header>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
            Standard LLMs aren&apos;t enough for scale. Our proprietary architecture is built for companies that demand <strong className="text-white font-semibold">99.9% accuracy</strong> and global reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => (
            <article 
              key={i} 
              className="group relative p-8 rounded-3xl bg-slate-900/30 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" aria-hidden="true" />

              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6 shadow-lg shadow-black/20`}>
                <div className="w-full h-full bg-[#020617] rounded-[14px] flex items-center justify-center text-white">
                  <feature.icon className="w-6 h-6" strokeWidth={1.5} />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-3 tracking-tight">
                {feature.title}
              </h3>
              <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                {feature.desc}
              </p>
              
              <div className="mt-6 flex items-center text-[10px] font-black tracking-widest text-blue-400 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 uppercase">
                <span className="cursor-pointer">Learn More</span> 
                <ArrowRight className="ml-2 w-3.5 h-3.5" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-20 p-8 md:p-14 rounded-[2.5rem] bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />
            
            <div className="text-center md:text-left relative z-10">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">
                  Ready to automate your growth?
                </h3>
                <p className="text-blue-100/80 text-lg">
                  Join 500+ enterprises building the future of work today.
                </p>
            </div>
            
            <button 
              aria-label="Start your free enterprise trial"
              className="relative z-10 whitespace-nowrap px-12 py-5 bg-white text-blue-700 font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-blue-50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all active:scale-95"
            >
                Start Free Trial
            </button>
        </div>
      </div>
    </section>
  );
}
'use client';

import React from 'react';
import { 
  Zap, 
  ShieldCheck, 
  MessageSquare, 
  Languages, 
  BarChart3, 
  Infinity 
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
    <section className="py-20 md:py-32 bg-[#020617] relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[600px] h-[300px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="text-blue-500 font-mono text-xs md:text-sm tracking-[0.3em] uppercase mb-4">
            Core_Capabilities
          </h2>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight">
            Engineered for <span className="text-slate-500">Performance</span>
          </h3>
          <p className="text-slate-400 text-base md:text-lg">
            Our AI infrastructure is built on proprietary neural architectures that outperform standard LLMs in business logic execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, i) => (
            <div 
              key={i} 
              className="group p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:bg-slate-900/60"
            >
              <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6 group-hover:scale-110 transition-transform duration-500`}>
                <div className="w-full h-full bg-[#020617] rounded-[14px] flex items-center justify-center text-white">
                  {feature.icon}
                </div>
              </div>
              <h4 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
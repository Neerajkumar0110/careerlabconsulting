'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  MousePointer2, Settings2, Cpu, Rocket, 
  ChevronRight, ArrowRight, CheckCircle2, 
  TrendingUp, Zap, ShieldCheck 
} from 'lucide-react';

const steps = [
  {
    id: "01",
    title: "Discovery & Context",
    desc: "Business data aur requirements analyze karke AI agent ka blueprint taiyar hota hai.",
    icon: <MousePointer2 className="w-5 h-5" />,
    color: "from-blue-600 to-cyan-400",
    benefit: "Eliminates Guesswork"
  },
  {
    id: "02",
    title: "Neural Training",
    desc: "Agent ko aapke specific knowledge base par train kiya jata hai high accuracy ke liye.",
    icon: <Settings2 className="w-5 h-5" />,
    color: "from-indigo-600 to-purple-400",
    benefit: "99% Accuracy"
  },
  {
    id: "03",
    title: "Integration",
    desc: "AI modules ko aapke existing CRM aur ERP tools ke saath connect kiya jata hai.",
    icon: <Cpu className="w-5 h-5" />,
    color: "from-cyan-600 to-blue-400",
    benefit: "Zero Downtime"
  },
  {
    id: "04",
    title: "Autonomous Launch",
    desc: "Aapka workforce live ho jata hai, jo 24/7 bina human intervention ke perform karta hai.",
    icon: <Rocket className="w-5 h-5" />,
    color: "from-emerald-600 to-teal-400",
    benefit: "Instant ROI"
  }
];

export default function ExecutionFlow() {
  return (
    <section className="py-20 md:py-32 bg-[#020617] relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-[10%] left-[5%] w-[400px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-[10%] right-[5%] w-[400px] h-[400px] bg-indigo-600/5 blur-[120px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header with Profit/Value Indicators */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 text-blue-500 font-mono text-xs tracking-[0.3em] uppercase mb-4"
            >
              <span className="w-8 h-[1px] bg-blue-500"></span>
              Strategic Framework
            </motion.div>
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-7xl font-black text-white leading-[1.05] tracking-tighter"
            >
              Transforming Data into <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400">Digital Assets.</span>
            </motion.h3>
          </div>
          
          {/* Profit Section for Owner (Trust Metrics) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="hidden md:flex flex-col gap-4 bg-white/[0.03] p-6 rounded-3xl border border-white/5 backdrop-blur-md"
          >
            <div className="flex items-center gap-4">
              <div className="p-2 bg-emerald-500/20 rounded-lg"><TrendingUp className="text-emerald-400 w-5 h-5" /></div>
              <div>
                <p className="text-white font-bold">40% Cost Reduction</p>
                <p className="text-slate-500 text-xs">Average enterprise saving</p>
              </div>
            </div>
            <div className="flex items-center gap-4 border-t border-white/5 pt-4">
              <div className="p-2 bg-blue-500/20 rounded-lg"><Zap className="text-blue-400 w-5 h-5" /></div>
              <div>
                <p className="text-white font-bold">24/7 Availability</p>
                <p className="text-slate-500 text-xs">No human overheads</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Responsive Grid: Swiper-like feel on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="group relative"
            >
              <div className="h-full relative p-8 rounded-[2.5rem] bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 group-hover:border-blue-500/40 transition-all duration-500">
                
                {/* Profit/Benefit Badge */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded-md flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> {step.benefit}
                  </span>
                </div>

                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.color} p-[1px] mb-8 shadow-2xl`}>
                  <div className="w-full h-full bg-[#020617] rounded-[15px] flex items-center justify-center text-white">
                    {step.icon}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-blue-500/60 font-bold">{step.id}</span>
                    <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                      {step.title}
                    </h4>
                  </div>
                  <p className="text-slate-400 text-sm leading-relaxed min-h-[60px]">
                    {step.desc}
                  </p>
                </div>

                {/* Mobile Interaction Indicator */}
                <div className="mt-6 flex items-center justify-between">
                   <div className="h-[2px] w-8 bg-blue-500/20 group-hover:w-12 transition-all group-hover:bg-blue-500"></div>
                   <ArrowRight className="w-5 h-5 text-white/10 group-hover:text-blue-500 transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
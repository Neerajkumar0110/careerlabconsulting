'use client';

import React from 'react';
import { MousePointer2, Settings2, Cpu, Rocket, ChevronRight, ArrowRight } from 'lucide-react';

const steps = [
  {
    id: "01",
    title: "Discovery & Context",
    desc: "Business data aur requirements analyze karke AI agent ka blueprint taiyar hota hai.",
    icon: <MousePointer2 className="w-5 h-5" />,
    color: "from-blue-600 to-cyan-400",
    glow: "rgba(59, 130, 246, 0.5)"
  },
  {
    id: "02",
    title: "Neural Training",
    desc: "Agent ko aapke specific knowledge base par train kiya jata hai high accuracy ke liye.",
    icon: <Settings2 className="w-5 h-5" />,
    color: "from-indigo-600 to-purple-400",
    glow: "rgba(99, 102, 241, 0.5)"
  },
  {
    id: "03",
    title: "Integration",
    desc: "AI modules ko aapke existing CRM aur ERP tools ke saath connect kiya jata hai.",
    icon: <Cpu className="w-5 h-5" />,
    color: "from-cyan-600 to-blue-400",
    glow: "rgba(6, 182, 212, 0.5)"
  },
  {
    id: "04",
    title: "Autonomous Launch",
    desc: "Aapka workforce live ho jata hai, jo 24/7 bina human intervention ke perform karta hai.",
    icon: <Rocket className="w-5 h-5" />,
    color: "from-emerald-600 to-teal-400",
    glow: "rgba(16, 185, 129, 0.5)"
  }
];

export default function ExecutionFlow() {
  return (
    <section className="py-20 md:py-32 bg-[#020617] relative overflow-hidden">
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-indigo-600/10 blur-[120px] rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="max-w-4xl mb-16 md:mb-24">
          <h2 className="text-blue-500 font-mono text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 font-bold">
            // The_Process
          </h2>
          <h3 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tighter">
            Precision <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 text-slate-800" style={{WebkitTextStroke: '1px rgba(255,255,255,0.1)'}}>Engineering.</span><br />
            <span className="text-white">Seamless Deployment.</span>
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative group">
              {idx !== steps.length - 1 && (
                <div className="hidden lg:block absolute top-[15%] left-[80%] w-full h-[1px] bg-gradient-to-r from-blue-500/50 to-transparent z-0"></div>
              )}

              <div className="h-full relative p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 group-hover:bg-white/[0.04] group-hover:border-blue-500/30 transition-all duration-500 backdrop-blur-md overflow-hidden">
                
                <div className="flex justify-between items-start mb-10">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${step.color} p-[1px]`}>
                    <div className="w-full h-full bg-[#020617] rounded-[15px] flex items-center justify-center text-white">
                      {step.icon}
                    </div>
                  </div>
                  <span className="text-3xl font-mono font-black text-white/5 group-hover:text-blue-500/20 transition-colors">
                    {step.id}
                  </span>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                    {step.title}
                  </h4>
                  <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">
                    {step.desc}
                  </p>
                </div>

                <div className="mt-6 flex lg:hidden">
                   <ArrowRight className="w-4 h-4 text-blue-500 animate-pulse" />
                </div>

                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/10 blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 md:mt-24 relative rounded-[2rem] md:rounded-[3rem] p-1px bg-gradient-to-r from-blue-500/20 via-transparent to-indigo-500/20 p-[1px]">
          <div className="bg-[#050914] rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-center md:text-left">
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-4">
                Limited Availability
              </div>
              <h4 className="text-2xl md:text-4xl font-black text-white mb-2">Automate your first workflow.</h4>
              <p className="text-slate-500">Free technical consultation for enterprises (14 slots left this month).</p>
            </div>
            
            <button className="w-full md:w-auto px-8 py-4 bg-white text-black font-black rounded-2xl flex items-center justify-center gap-2 hover:bg-blue-500 hover:text-white transition-all active:scale-95 shadow-2xl shadow-white/5">
              Start Your Pilot
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
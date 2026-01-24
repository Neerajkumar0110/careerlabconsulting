"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Zap, 
  ShieldCheck, 
  BrainCircuit, 
  Scale, 
  BarChart, 
  SearchCode, 
  ArrowRight,
  Database,
  Crosshair,
  Binary
} from 'lucide-react';

const ModelValidation = () => {
  const validationpillars = [
    {
      title: "Bias & Fairness Audit",
      desc: "Detecting and mitigating algorithmic bias to ensure your AI models treat all demographic groups equitably.",
      icon: <Scale />,
      img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Robustness Testing",
      desc: "Simulating adversarial attacks and out-of-distribution data to test the stability of model predictions.",
      icon: <ShieldCheck />,
      img: "https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(99,102,241,0.12)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 backdrop-blur-xl">
              <BrainCircuit size={14} className="text-indigo-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200">AI Trust & Safety Node</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Model <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 italic font-black">Validation.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Ensure your intelligence is accurate, ethical, and reliable. We provide deep-tech validation for LLMs, Computer Vision, and Predictive Algorithms.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-indigo-600/20"
            >
              Request Model Audit <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full animate-pulse"></div>
            <div className="relative p-8 bg-slate-950/80 border border-white/10 rounded-[3rem] backdrop-blur-3xl">
               <div className="flex justify-between items-center mb-10">
                  <span className="text-xs font-mono uppercase tracking-widest text-indigo-400 italic">Validation_Matrix_Live</span>
                  <div className="flex gap-2">
                     <div className="h-2 w-2 rounded-full bg-indigo-500"></div>
                     <div className="h-2 w-2 rounded-full bg-cyan-500"></div>
                  </div>
               </div>
               
               <div className="space-y-6">
                  {[
                    { label: "Precision", val: "99.2%", width: "w-[99.2%]" },
                    { label: "F1 Score", val: "0.984", width: "w-[98.4%]" },
                    { label: "Drift Detect", val: "Low", width: "w-[15%]", color: "bg-cyan-500" }
                  ].map((metric, i) => (
                    <div key={i}>
                       <div className="flex justify-between text-[10px] uppercase font-bold text-slate-500 mb-2">
                          <span>{metric.label}</span>
                          <span>{metric.val}</span>
                       </div>
                       <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className={`h-full ${metric.color || 'bg-indigo-500'} ${metric.width} rounded-full`}></div>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">The Validation Framework</h2>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Data Quality", val: "Cleaned", icon: <Database /> },
              { label: "Bias Check", val: "Mitigated", icon: <Scale /> },
              { label: "Drift Sync", val: "Active", icon: <Zap /> },
              { label: "Audit Log", val: "Immutable", icon: <Binary /> }
            ].map((stat, i) => (
              <div key={i} className="group p-6">
                <div className="text-indigo-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                <h4 className="text-2xl font-black italic mb-1">{stat.val}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {validationpillars.map((pillar, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 hover:border-indigo-500/30 transition-all">
              <img src={pillar.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                <div className="mb-6 p-4 bg-indigo-500/10 rounded-2xl w-fit text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  {React.cloneElement(pillar.icon as React.ReactElement, { size: 30 } as any)}
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4">{pillar.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{pillar.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-400">
                  <Crosshair size={14} /> Verification Certified
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-indigo-900/20 to-slate-950 border border-indigo-500/20 text-center relative overflow-hidden">
          <div className="relative z-10">
             <BarChart className="mx-auto text-indigo-500 mb-8" size={48} />
             <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-10 leading-none">
               Validate Your <br /> <span className="text-indigo-500">Intelligence.</span>
             </h2>
             <p className="text-slate-400 mb-12 max-w-lg mx-auto italic font-light">"An unvalidated model is a business risk. Secure your AI outputs with mathematical rigor."</p>
             <button 
               onClick={() => window.location.href = '/contact'}
               className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all"
             >
               Start Validation Audit
             </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ModelValidation;
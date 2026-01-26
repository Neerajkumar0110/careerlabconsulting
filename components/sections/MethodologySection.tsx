'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const MethodologySection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const steps = [
    { number: '1', title: 'Strategic alignment and planning' },
    { number: '2', title: 'Proof of Value' },
    { number: '3', title: 'Process augmentation' },
  ];

  return (
    <section className="relative py-16 md:py-32 px-4 md:px-12 bg-[#020617] overflow-hidden">
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-72 h-72 bg-blue-600/10 rounded-full blur-[120px] -z-10 animate-pulse will-change-[opacity,transform]" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/4 right-0 w-64 h-64 bg-indigo-600/10 rounded-full blur-[100px] -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          
          <div className="w-full lg:w-1/2 space-y-10 text-center lg:text-left">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-[0.2em] mb-2 mx-auto lg:mx-0">
                <Sparkles size={14} /> Our Process
              </div>
              <h2 className="text-5xl sm:text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter">
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">TriStorm</span> <br className="hidden md:block" />
                methodology
              </h2>
              
              <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                After 30+ AI implementations, we identified the patterns that separate 
                <span className="text-white"> successful leaders</span> from failed experiments. Experience works for you.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6 justify-center lg:justify-start">
              <button 
                type="button"
                className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-blue-500/50 flex items-center gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Explore Methodology
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <a href="#case-studies" className="text-slate-500 hover:text-white font-bold tracking-widest text-xs uppercase border-b-2 border-transparent hover:border-blue-500 transition-all py-1">
                View Case Studies
              </a>
            </div>

            <dl className="flex flex-row justify-center lg:justify-start gap-12 pt-12 border-t border-white/5">
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-red-500 to-transparent" />
                <dd className="text-4xl md:text-6xl font-black text-white">30+</dd>
                <dt className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-2">Agents Live</dt>
              </div>
              <div className="relative pl-6">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 to-transparent" />
                <dd className="text-4xl md:text-6xl font-black text-white">5x</dd>
                <dt className="text-[10px] uppercase tracking-widest text-slate-500 font-bold mt-2">Avg. ROI</dt>
              </div>
            </dl>
          </div>

          <div className="w-full lg:w-1/2 relative space-y-6 md:space-y-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative flex items-center justify-center lg:justify-end w-full group"
                style={{ 
                  transform: isMounted ? `translateX(calc(var(--step-offset) * ${index}))` : 'none',
                  ['--step-offset' as any]: '-30px'
                }}
              >
                {index !== steps.length - 1 && (
                  <div className="hidden lg:block absolute right-[50%] top-full w-px h-10 bg-gradient-to-b from-blue-500/50 to-transparent" />
                )}

                <span className="absolute -left-4 lg:-left-20 text-8xl md:text-[12rem] font-black text-white/5 select-none transition-all duration-700 group-hover:text-blue-500/10 pointer-events-none italic">
                  0{step.number}
                </span>
                
                <div className="relative z-10 w-full max-w-md transform skew-x-0 lg:-skew-x-12 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl transition-all duration-500 group-hover:border-blue-500/50 group-hover:bg-slate-800/60 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <h3 className="text-xl md:text-3xl font-bold text-white transform skew-x-0 lg:skew-x-12 tracking-tight text-center lg:text-left leading-tight">
                    {step.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default MethodologySection;
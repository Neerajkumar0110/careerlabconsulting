'use client';

import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

const HowItWorksSection = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const steps = [
    { number: '1', title: 'Integrate AI into your existing systems' },
    { number: '2', title: 'Configure modules and define roles' },
    { number: '3', title: 'Autonomous execution with real-time intelligence' },
  ];

  return (
    <section className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-8 md:px-12 bg-[#020617] overflow-hidden">
      <div 
        className="absolute top-1/2 left-0 -translate-y-1/2 w-64 sm:w-72 h-64 sm:h-72 bg-blue-600/10 rounded-full blur-[100px] -z-10 animate-pulse" 
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/4 right-0 w-52 sm:w-64 h-52 sm:h-64 bg-indigo-600/10 rounded-full blur-[80px] -z-10" 
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-20 items-start">

          {/* Left Content */}
          <div className="w-full lg:w-1/2 space-y-10 md:mt-12 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-2 mx-auto lg:mx-0">
              <Sparkles size={14} /> How It Works
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-none tracking-tight">
              The <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Autonomous Flow</span> <br className="hidden md:block" />
              in 3 Steps
            </h2>

            <p className="text-slate-400 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 font-medium">
              Deploy your AI workforce seamlessly. Plug, configure, and let it execute tasks autonomously, while gaining real-time intelligence. Three simple steps to full automation.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 justify-center lg:justify-start">
              <button 
                type="button"
                className="group relative px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-blue-500/50 flex items-center gap-2 sm:gap-3 overflow-hidden"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Explore Process
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>

              <a href="#demo" className="text-slate-500 hover:text-white font-bold tracking-widest text-[9px] sm:text-xs uppercase border-b-2 border-transparent hover:border-blue-500 transition-all py-1">
                Watch Demo
              </a>
            </div>
          </div>

          {/* Right Steps */}
          <div className="w-full lg:w-1/2 relative space-y-6 sm:space-y-8 md:space-y-10">
            {steps.map((step, index) => (
              <div 
                key={index}
                className="relative flex items-center justify-center lg:justify-end w-full"
              >
                {index !== steps.length - 1 && (
                  <div className="hidden lg:block absolute right-[50%] top-full w-px h-8 sm:h-10 bg-gradient-to-b from-blue-500/50 to-transparent" />
                )}

                <span className="absolute -left-3 sm:-left-6 lg:-left-20 text-5xl sm:text-7xl md:text-8xl lg:text-[12rem] font-black text-white/5 select-none italic pointer-events-none">
                  0{step.number}
                </span>

                <div className="relative z-10 w-full max-w-sm sm:max-w-md transform skew-x-0 lg:-skew-x-12 bg-slate-900/40 backdrop-blur-xl border border-white/10 p-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl transition-all duration-500 hover:border-blue-500/50 hover:bg-slate-800/60 overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-blue-500/10 rounded-full blur-3xl opacity-0 hover:opacity-100 transition-opacity" />
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white transform skew-x-0 lg:skew-x-12 tracking-tight text-center lg:text-left leading-tight">
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

export default HowItWorksSection;

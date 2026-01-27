'use client';

import React from 'react';
import { 
  Globe2, Users2, Building2, 
  Clock, Award, Zap 
} from 'lucide-react';

const impactStats = [
  { label: 'Countries', value: '27+', icon: Globe2, color: 'text-blue-400', glow: 'group-hover:shadow-[0_0_25px_rgba(96,165,250,0.4)]' },
  { label: 'Internx Batches', value: '103+', icon: Zap, color: 'text-amber-400', glow: 'group-hover:shadow-[0_0_25px_rgba(251,191,36,0.4)]' },
  { label: 'Global Corporate Partners', value: '260+', icon: Building2, color: 'text-emerald-400', glow: 'group-hover:shadow-[0_0_25px_rgba(52,211,153,0.4)]' },
  { label: 'Internx Trained Students', value: '15000+', icon: Users2, color: 'text-purple-400', glow: 'group-hover:shadow-[0_0_25px_rgba(192,132,252,0.4)]' },
  { label: 'Training Hours Completed', value: '1+ Million', icon: Clock, color: 'text-cyan-400', glow: 'group-hover:shadow-[0_0_25px_rgba(34,211,238,0.4)]' },
  { label: 'Industry Trainers', value: '718+', icon: Award, color: 'text-rose-400', glow: 'group-hover:shadow-[0_0_25px_rgba(251,113,133,0.4)]' },
];

export default function GlobalImpactSection() {
  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden min-h-screen flex items-center">
      
      {/* --- Background Image Implementation --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://bostoninstituteofanalytics.b-cdn.net/wp-content/uploads/2023/12/video-placeholder.webp"
          alt="Background"
          className="w-full h-full object-cover opacity-40"
        />
        {/* Layered Gradient for Dark Theme Consistency */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-[#020617]/80 to-[#020617]" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 w-full">
        
        {/* Header Section - Centered */}
        <div className="text-center flex flex-col items-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-xl">
            <Globe2 className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">Global Footprint</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6 leading-[1] max-w-4xl">
            Global Leader in <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 italic">
              Professional
            </span> Training
          </h2>
          
          <div className="flex items-center justify-center gap-2">
            <div className="h-[2px] w-12 bg-blue-600 rounded-full" />
            <div className="w-2.5 h-2.5 bg-blue-400 rotate-45 shadow-[0_0_10px_rgba(96,165,250,0.8)]" />
            <div className="h-[2px] w-12 bg-blue-600 rounded-full" />
          </div>
        </div>

        {/* Stats Grid - Centered Alignment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {impactStats.map((stat, index) => (
            <div 
              key={index} 
              className="group relative p-10 rounded-[3rem] bg-[#0f172a]/40 border border-white/5 hover:border-blue-500/40 transition-all duration-500 backdrop-blur-xl flex flex-col items-center text-center justify-center min-h-[300px]"
            >
              {/* Internal Hover Glow */}
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 rounded-[3rem] transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col items-center space-y-6 w-full">
                {/* Fixed Icon Container */}
                <div className={`w-20 h-20 rounded-3xl bg-white/[0.03] border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-2 ${stat.glow}`}>
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
                
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-black text-white tracking-tighter tabular-nums leading-none">
                    {stat.value}
                  </div>
                  <div className="text-xs font-black text-slate-400 uppercase tracking-[0.25em] leading-relaxed max-w-[200px] group-hover:text-white transition-colors duration-300">
                    {stat.label}
                  </div>
                </div>
              </div>

              {/* Minimal Accent Lines */}
              <div className="absolute bottom-6 w-8 h-[2px] bg-blue-500/20 group-hover:w-16 group-hover:bg-blue-500 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 blur-[150px] -mr-64 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-600/10 blur-[150px] -ml-64 pointer-events-none" />
    </section>
  );
}
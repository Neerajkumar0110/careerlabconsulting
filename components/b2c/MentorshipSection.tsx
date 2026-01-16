'use client';

import React from 'react';
import { MessageSquare, Briefcase, Zap, ShieldCheck, Globe } from 'lucide-react';

const partners = [
  { 
    name: "Google", 
    logo: "https://www.vectorlogo.zone/logos/google/google-ar21.svg" 
  },
  { 
    name: "Microsoft", 
    logo: "https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg" 
  },
  { 
    name: "AWS", 
    logo: "https://www.vectorlogo.zone/logos/amazon_aws/amazon_aws-ar21.svg" 
  },
  { 
    name: "NVIDIA", 
    logo: "https://www.vectorlogo.zone/logos/nvidia/nvidia-ar21.svg" 
  },
];

const mentors = [
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=100&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=100&auto=format&fit=crop"
];

export default function MentorshipSection() {
  return (
    <section className="py-16 md:py-24 bg-[#020617] relative overflow-hidden">
      {/* Background Glow - Adjusted for mobile to prevent overflow/distraction */}
      <div className="absolute bottom-0 right-0 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-blue-600/5 blur-[80px] md:blur-[120px] rounded-full translate-x-1/2 translate-y-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* --- LEFT: VISUAL STACK (Bento Grid) --- */}
          {/* Mobile Order: Shows AFTER text (Order 2), Desktop: Shows LEFT (Order 1) */}
          <div className="order-2 lg:order-1 relative">
            <div className="grid grid-cols-2 gap-3 md:gap-6">
              
              {/* Column 1 */}
              <div className="space-y-3 md:space-y-6 pt-8 md:pt-12">
                {/* Card 1 */}
                <div className="bg-[#0a0f1d] border border-white/5 p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-xl hover:border-blue-500/30 transition-colors group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-500/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                    <MessageSquare className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                  </div>
                  <h4 className="text-white font-bold mb-1 md:mb-2 text-xs md:text-sm uppercase tracking-tight">1-on-1 Debugging</h4>
                  <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed">Direct access to senior neural engineers.</p>
                </div>
                
                {/* Card 2 */}
                <div className="bg-[#0a0f1d] border border-white/5 p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-xl hover:border-emerald-500/30 transition-colors group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-emerald-500/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                    <Briefcase className="w-5 h-5 md:w-6 md:h-6 text-emerald-400" />
                  </div>
                  <h4 className="text-white font-bold mb-1 md:mb-2 text-xs md:text-sm uppercase tracking-tight">Hiring Network</h4>
                  <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed">Fast-track to 200+ global partners.</p>
                </div>
              </div>

              {/* Column 2 */}
              <div className="space-y-3 md:space-y-6">
                {/* Big Stats Card */}
                <div className="bg-gradient-to-br from-blue-600/20 to-indigo-900/10 border border-blue-500/20 p-5 md:p-8 rounded-2xl md:rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-3 md:p-5">
                    <Zap className="w-4 h-4 md:w-5 md:h-5 text-blue-400 animate-pulse" />
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black text-white mb-1 tracking-tighter">98%</h3>
                  <p className="text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Placement Rate</p>
                  
                  <div className="mt-6 md:mt-8 flex -space-x-2 md:-space-x-3">
                    {mentors.map((src, i) => (
                      <div key={i} className="relative w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#020617] overflow-hidden bg-slate-800">
                         <img 
                          src={src} 
                          className="w-full h-full object-cover" 
                          alt="Mentor" 
                          loading="lazy"
                        />
                      </div>
                    ))}
                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-[#020617] bg-blue-600 flex items-center justify-center text-[9px] md:text-[10px] font-bold text-white">
                      +12
                    </div>
                  </div>
                </div>

                {/* Card 3 */}
                <div className="bg-[#0a0f1d] border border-white/5 p-4 md:p-6 rounded-2xl md:rounded-[2rem] shadow-xl hover:border-purple-500/30 transition-colors group">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-500/10 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                    <Globe className="w-5 h-5 md:w-6 md:h-6 text-purple-400" />
                  </div>
                  <h4 className="text-white font-bold mb-1 md:mb-2 text-xs md:text-sm uppercase tracking-tight">Global Standards</h4>
                  <p className="text-slate-500 text-[10px] md:text-xs leading-relaxed">Silicon Valley aligned protocols.</p>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: TEXT CONTENT --- */}
          {/* Mobile Order: Shows FIRST (Order 1), Desktop: Shows RIGHT (Order 2) */}
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-emerald-500 text-[10px] font-black uppercase tracking-widest">Industry Navigator Program</span>
            </div>

            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-[1.1] uppercase">
              NOT JUST A COURSE. <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400">
                A CAREER UPGRADE.
              </span>
            </h2>
            
            <p className="text-slate-400 text-base md:text-lg mb-8 leading-relaxed max-w-xl">
              Every InternX student is paired with a dedicated <span className="text-white font-semibold">Industry Navigator</span>. We don't just teach you how to build; we show you how to dominate the AI job market.
            </p>

            <div className="space-y-3 md:space-y-4 mb-10 md:mb-12">
              {[
                "Weekly live sync-ups with CTOs & Lead Architects",
                "Personalized GitHub portfolio optimization",
                "Mock interviews with FAANG engineers",
                "Exclusive access to 'Under-the-radar' job board"
              ].map((item, idx) => (
                <div key={idx} className="flex items-start md:items-center gap-3 md:gap-4 text-slate-300 group">
                  <div className="flex-shrink-0 w-5 h-5 md:w-6 md:h-6 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:bg-blue-500 group-hover:text-white transition-all mt-0.5 md:mt-0">
                    <ShieldCheck className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  </div>
                  <span className="text-sm font-medium tracking-tight">{item}</span>
                </div>
              ))}
            </div>

            {/* Hiring Partners Strip */}
            <div className="pt-6 md:pt-8 border-t border-white/5">
              <p className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em] mb-6 md:mb-8">Our Alumni Work At</p>
              <div className="flex flex-wrap gap-x-6 gap-y-4 md:gap-x-10 md:gap-y-6 items-center">
                {partners.map((p) => (
                  <img 
                    key={p.name} 
                    src={p.logo} 
                    alt={p.name} 
                    className="h-5 md:h-7 w-auto opacity-40 brightness-0 invert hover:opacity-100 hover:brightness-100 hover:invert-0 transition-all duration-500 cursor-help" 
                    title={p.name}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
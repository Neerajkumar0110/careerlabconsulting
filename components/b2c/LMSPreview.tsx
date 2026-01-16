'use client';

import React from 'react';
import { Layout, Cpu, Globe, Shield, Cloud, Zap, CheckCircle, Activity, Lock } from 'lucide-react';

const stats = [
  { label: 'Neural Training', value: '85%', icon: Cpu, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Project Nodes', value: '12 Active', icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Security Clearance', value: 'Lvl 4', icon: Shield, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

export default function LMSPreview() {
  return (
    <section className="py-16 md:py-32 bg-[#020617] border-t border-white/5 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[400px] bg-blue-600/5 blur-[80px] md:blur-[120px] rounded-full z-0" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
          
          {/* --- LEFT CONTENT --- */}
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Zap className="w-3 h-3 text-blue-400 fill-blue-400" />
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Internal Infrastructure</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter leading-tight">
              HYBRID <span className="italic text-slate-500">INTELLIGENCE</span> <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                LEARNING ECOSYSTEM
              </span>
            </h2>
            
            <p className="text-slate-400 text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-xl">
              Don't settle for static videos. Enter a live deployment environment where your code meets neural protocols. Our LMS is a <span className="text-white font-bold">real-time command center</span> for your internship.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="group p-4 md:p-5 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all duration-500 flex sm:block items-center sm:items-start gap-4 sm:gap-0">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center sm:mb-4 group-hover:scale-110 transition-transform flex-shrink-0`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div>
                    <div className="text-xl md:text-2xl font-black text-white mb-1 tracking-tight">{stat.value}</div>
                    <div className="text-[9px] md:text-[10px] text-slate-500 uppercase font-black tracking-[0.15em]">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* --- RIGHT: THE UPGRADED DASHBOARD UI --- */}
          <div className="relative group order-1 lg:order-2 mb-8 lg:mb-0">
            {/* Outer Glow */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-cyan-500/20 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-80 transition duration-1000"></div>
            
            {/* Main Window */}
            <div className="relative bg-[#0a0f1d] border border-white/10 rounded-3xl md:rounded-[2.5rem] p-3 md:p-5 shadow-2xl backdrop-blur-sm overflow-hidden">
              
              {/* Browser Header */}
              <div className="flex items-center gap-2 mb-4 px-2 md:px-4 py-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-red-500/20" />
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-amber-500/20" />
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-emerald-500/20" />
                </div>
                <div className="mx-auto bg-white/5 px-3 md:px-4 py-1 rounded-lg text-[8px] md:text-[9px] text-slate-500 font-medium truncate max-w-[150px] md:max-w-none">
                  internx-terminal.cloud/session-042
                </div>
              </div>

              <div className="flex gap-3 md:gap-6 min-h-[300px] md:min-h-[450px]">
                {/* Sidebar Mockup */}
                <div className="w-10 md:w-20 bg-white/[0.03] rounded-2xl md:rounded-3xl flex flex-col items-center py-4 md:py-8 gap-6 md:gap-8 border border-white/5 flex-shrink-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-500/20">
                    <Activity className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </div>
                  <div className="space-y-4 md:space-y-6 flex flex-col items-center">
                    <Layout className="w-4 h-4 md:w-5 md:h-5 text-blue-400" />
                    <Cloud className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                    <Shield className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                    <Lock className="w-4 h-4 md:w-5 md:h-5 text-slate-600" />
                  </div>
                </div>

                {/* Content Area Mockup */}
                <div className="flex-1 space-y-4 md:space-y-6 pt-2 md:pt-4 overflow-hidden">
                  {/* Top Bar */}
                  <div className="flex justify-between items-center pr-2 md:pr-4">
                    <div className="h-3 md:h-4 w-20 md:w-32 bg-white/10 rounded-full" />
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="w-5 h-5 md:w-7 md:h-7 rounded-full border-2 border-[#0a0f1d] bg-slate-800" />
                      ))}
                    </div>
                  </div>

                  {/* Visual Grid - Stacks on Mobile */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    {/* Card 1 */}
                    <div className="h-32 md:h-52 bg-gradient-to-br from-blue-600/10 via-blue-600/5 to-transparent border border-blue-500/20 rounded-2xl md:rounded-[2rem] p-4 md:p-6 relative overflow-hidden group/card">
                       <div className="absolute top-0 right-0 p-3 md:p-4">
                          <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-blue-500 animate-ping" />
                       </div>
                       <div className="h-full flex flex-col justify-between">
                          <div className="space-y-2">
                             <div className="h-1.5 md:h-2 w-10 md:w-12 bg-blue-500/40 rounded-full" />
                             <div className="h-2 md:h-3 w-16 md:w-24 bg-white/10 rounded-full" />
                          </div>
                          <div className="w-full h-8 md:h-12 bg-blue-500/10 rounded-lg md:rounded-xl border border-blue-500/20 flex items-center justify-center">
                             <CheckCircle className="w-3 h-3 md:w-4 md:h-4 text-blue-400" />
                          </div>
                       </div>
                    </div>
                    
                    {/* Card 2 */}
                    <div className="hidden sm:block h-32 md:h-52 bg-white/[0.03] border border-white/5 rounded-2xl md:rounded-[2rem] p-4 md:p-6">
                        <div className="space-y-3 md:space-y-4">
                           <div className="h-2 w-16 bg-white/10 rounded-full" />
                           <div className="space-y-2">
                              <div className="h-1.5 w-full bg-white/5 rounded-full" />
                              <div className="h-1.5 w-full bg-white/5 rounded-full" />
                              <div className="h-1.5 w-2/3 bg-white/5 rounded-full" />
                           </div>
                        </div>
                    </div>
                  </div>

                  {/* Bottom Activity Bar */}
                  <div className="p-3 md:p-4 bg-white/[0.02] border border-white/5 rounded-xl md:rounded-2xl flex items-center justify-between mr-2 md:mr-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500" />
                      <span className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-tighter">System Pulse Stable</span>
                    </div>
                    <div className="h-1 md:h-1.5 w-12 md:w-20 bg-blue-500/20 rounded-full overflow-hidden">
                       <div className="h-full w-2/3 bg-blue-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Status Pill - Adjusted Position for Mobile */}
            <div className="absolute -top-4 right-2 md:-top-6 md:-right-4 bg-[#1e293b] border border-white/10 px-3 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl shadow-2xl flex items-center gap-2 md:gap-3 animate-bounce duration-[5000ms] z-20">
               <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                  <Activity className="w-3 h-3 md:w-4 md:h-4 text-emerald-400" />
               </div>
               <div>
                  <div className="text-[7px] md:text-[8px] text-slate-500 font-bold uppercase">Uptime</div>
                  <div className="text-[10px] md:text-xs font-black text-white italic">99.9%</div>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import React from 'react';
import { ArrowRight, Play, Target, Award, CheckCircle2, Sparkles } from 'lucide-react';

export default function B2CHero() {
  return (
    <section className="relative min-h-screen pt-28 pb-12 md:pt-36 md:pb-20 overflow-hidden bg-[#020617] flex items-center">
      
      {/* --- BACKGROUND DYNAMICS --- */}
      <div className="absolute inset-0 z-0">
        {/* Animated Gradient Blobs */}
        <div className="absolute top-[-10%] right-[-10%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-600/20 blur-[100px] md:blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-cyan-500/10 blur-[100px] md:blur-[150px] rounded-full" />
        
        {/* Grid Overlay for Tech feel */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* --- LEFT SIDE: TEXT CONTENT --- */}
          <div className="w-full lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Next Cohort: Jan 2026</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
            </div>

            <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tighter">
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40">BEYOND</span> <br/> 
              <span className="relative inline-block italic text-blue-400">
                LEARNING.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none"><path d="M1 9.5C50.5 3.5 150.5 1.5 299 9.5" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/></svg>
              </span> <br/>
              DEPLOYMENT.
            </h1>

            <p className="text-slate-400 text-base md:text-xl mb-10 max-w-md leading-relaxed font-medium">
              Don't just watch tutorials. Deploy <span className="text-white font-bold underline decoration-blue-500/50">Autonomous Agents</span> and <span className="text-white font-bold underline decoration-cyan-500/50">Neural Protocols</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <button className="relative px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(37,99,235,0.4)] flex items-center justify-center gap-3 group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                Enter LMS <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-10 py-5 bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/10 rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-3 backdrop-blur-md">
                <Play className="w-4 h-4 fill-white" /> Watch Demo
              </button>
            </div>
          </div>

          {/* --- RIGHT SIDE: THE DASHBOARD --- */}
          <div className="w-full lg:col-span-7 relative order-2 mt-12 lg:mt-0 flex justify-center lg:justify-end">
            
            {/* Background Glow for Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-600/10 blur-[80px] -z-10" />

            {/* Main Dashboard Card */}
            <div className="w-full max-w-[640px] relative z-20 bg-[#0a0f1d]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-5 md:p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.6)]">
              
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-4">
                  <div className="relative group">
                    <img 
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop" 
                      alt="Candidate" 
                      className="w-14 h-14 md:w-16 md:h-16 rounded-2xl object-cover border-2 border-blue-500/50 group-hover:border-blue-400 transition-colors"
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-4 border-[#0a0f1d] rounded-full"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-base md:text-xl tracking-tight">Agent Workspace</h3>
                    <div className="flex items-center gap-2">
                      <div className="h-1 w-8 bg-blue-500 rounded-full" />
                      <p className="text-slate-500 text-[9px] font-black uppercase tracking-widest">L3 Verified Node</p>
                    </div>
                  </div>
                </div>
                <div className="hidden sm:flex gap-1.5 bg-white/5 p-2 rounded-xl">
                   <div className="w-1.5 h-1.5 rounded-full bg-red-500/50"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-amber-500/50"></div>
                   <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/50"></div>
                </div>
              </div>

              {/* Grid Content */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Module 1 */}
                <div className="group bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-6 hover:bg-white/[0.04] hover:border-blue-500/30 transition-all duration-500">
                   <div className="flex justify-between items-start mb-8">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                        <Target className="w-6 h-6" />
                      </div>
                      <span className="text-[9px] font-black text-blue-400 bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20">ACTIVE</span>
                   </div>
                   <h4 className="text-white font-bold text-base md:text-lg mb-4 leading-tight">Neural Agent<br/>Deployment</h4>
                   <div className="space-y-3">
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full w-[65%] bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full group-hover:w-[70%] transition-all duration-1000" />
                      </div>
                      <div className="flex justify-between text-[10px] font-bold">
                        <span className="text-slate-500">EFFICIENCY</span>
                        <span className="text-blue-400">65%</span>
                      </div>
                   </div>
                </div>

                {/* Module 2 */}
                <div className="bg-gradient-to-br from-emerald-500/10 to-transparent border border-emerald-500/20 rounded-[2.5rem] p-6 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-4">
                      <CheckCircle2 className="text-emerald-500 w-6 h-6 opacity-50 group-hover:opacity-100 transition-opacity" />
                   </div>
                   <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-8">
                      <Award className="w-6 h-6" />
                   </div>
                   <h4 className="text-white font-bold text-base md:text-lg mb-1">Web3 Audit</h4>
                   <p className="text-slate-500 text-[10px] mb-6 font-bold uppercase tracking-wider">NFT Credentials Ready</p>
                   <button className="w-full py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-[10px] font-black text-emerald-400 uppercase tracking-widest hover:bg-emerald-500 hover:text-white transition-all">
                     Claim Asset
                   </button>
                </div>
              </div>

              {/* Stats Footer */}
              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between px-2">
                 {[
                   { val: '1.2k', label: 'RANK', color: 'text-white' },
                   { val: 'A+', label: 'SCORE', color: 'text-blue-500' },
                   { val: '24d', label: 'STREAK', color: 'text-emerald-500' }
                 ].map((stat, i) => (
                   <React.Fragment key={i}>
                     <div className="text-center">
                        <div className={`text-xl md:text-2xl font-black tracking-tighter ${stat.color}`}>{stat.val}</div>
                        <div className="text-[8px] text-slate-500 font-black uppercase tracking-widest mt-1">{stat.label}</div>
                     </div>
                     {i < 2 && <div className="w-px h-8 bg-white/10" />}
                   </React.Fragment>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
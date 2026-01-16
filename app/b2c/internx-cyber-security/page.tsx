'use client';

import React from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { ShieldCheck, Lock, Zap, Terminal, ShieldAlert, Cpu, Fingerprint, Radar, Target, Eye } from 'lucide-react';

export default function InternXCyberSecurity() {
  const securityModules = [
    { icon: <Lock className="w-5 h-5" />, title: "Vulnerability Assessment", status: "Secure", color: "text-blue-400" },
    { icon: <ShieldAlert className="w-5 h-5" />, title: "Penetration Testing", status: "Scanning", color: "text-blue-500" },
    { icon: <Fingerprint className="w-5 h-5" />, title: "Identity Governance", status: "Active", color: "text-blue-400" },
    { icon: <Radar className="w-5 h-5" />, title: "Cloud Security Posture", status: "Protected", color: "text-blue-600" },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <B2CHeader />

      {/* --- HERO SECTION: CYBER COMMAND --- */}
      <section className="relative pt-32 pb-20 lg:pt-52 lg:pb-32 px-6">
        {/* Deep Blue Glows */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-xl">
                <Target className="w-3 h-3 text-blue-400 animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">
                  Defensive Layer 01 Activated
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                Cyber <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-700 italic">Defense</span>
              </h1>
              
              <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                Shielding the digital frontier. Master advanced penetration testing, encryption, and real-time threat mitigation with our military-grade curriculum.
              </p>
              
              <div className="flex flex-wrap gap-5">
                <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3 group">
                  Deploy Shield <ShieldCheck className="w-5 h-5 group-hover:scale-110 transition-transform" />
                </button>
                <button className="px-10 py-5 border border-white/10 hover:bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest transition-all">
                  Lab Access
                </button>
              </div>
            </div>

            {/* Visual Center: Security Command HUD */}
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full group-hover:bg-blue-500/30 transition-all duration-700" />
              <div className="relative bg-[#0a1229]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-blue-500/50" />
                    <div className="w-3 h-3 rounded-full bg-blue-500/30" />
                  </div>
                  <Terminal className="w-5 h-5 text-blue-500 opacity-50" />
                </div>

                <div className="space-y-5">
                  {securityModules.map((m, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-blue-500/40 transition-all group/item">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 bg-blue-500/10 rounded-xl ${m.color}`}>
                          {m.icon}
                        </div>
                        <span className="text-[11px] font-black uppercase tracking-wider text-slate-200">{m.title}</span>
                      </div>
                      <span className="text-[9px] font-mono text-blue-400 bg-blue-500/10 px-3 py-1 rounded-lg border border-blue-500/20 animate-pulse">
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BENTO GRID: SECURITY CORE --- */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="p-10 bg-[#0a1229]/50 border border-white/5 rounded-[3rem] hover:border-blue-500/30 transition-all group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Eye className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase italic">Zero-Trust Architecture</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">Implementing strict identity verification for every user and device attempting to access network resources.</p>
            </div>

            <div className="p-10 bg-blue-600 rounded-[3rem] shadow-2xl shadow-blue-600/30 group hover:-translate-y-2 transition-all">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                <Zap className="w-7 h-7 text-white fill-current" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase italic text-white">Offensive Hacking</h3>
              <p className="text-blue-100 text-sm leading-relaxed font-medium">Learn to think like a hacker. Penetrate complex systems to identify flaws before malicious actors do.</p>
            </div>

            <div className="p-10 bg-[#0a1229]/50 border border-white/5 rounded-[3rem] hover:border-blue-500/30 transition-all group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                <Cpu className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-2xl font-black mb-4 uppercase italic text-white">AI-Driven Defense</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">Leveraging machine learning to predict and block cyber threats in real-time with autonomous response.</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
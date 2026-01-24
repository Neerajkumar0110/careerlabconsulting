"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  ShieldCheck, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Package, 
  ArrowRight,
  Coffee,
  LineChart,
  HardDrive,
  LifeBuoy
} from 'lucide-react';

const BronzeTierPage = () => {
  const essentials = [
    {
      title: "Critical Security Patches",
      desc: "Hum ensure karte hain ki aapke core libraries aur OS hamesha vulnerabilities se safe rahein.",
      icon: <ShieldCheck className="text-orange-400" />
    },
    {
      title: "99.5% Uptime Monitoring",
      desc: "Standard monitoring setup jo aapko downtime ke baare mein turant alert karta hai.",
      icon: <Zap className="text-orange-400" />
    },
    {
      title: "Next Business Day Support",
      desc: "Email support with a guaranteed 24-hour response time for all your queries.",
      icon: <Clock className="text-orange-400" />
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-orange-900/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,_rgba(251,146,60,0.05)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8 backdrop-blur-xl">
              <Package size={14} className="text-orange-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-200">The Lean Support Model</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Bronze <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-orange-500 to-amber-700 italic font-black">Essentials.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Low volume but high importance? Hamara Bronze Tier un teams ke liye hai jo professional maintenance chahti hain on a lean budget. No fluff, just the essentials.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-orange-700 hover:bg-orange-600 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-orange-900/20"
            >
              Get Essential Coverage <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-orange-500/5 blur-3xl rounded-full"></div>
            <div className="relative p-10 bg-slate-900/50 border border-white/5 rounded-[3rem] backdrop-blur-3xl">
               <div className="space-y-6">
                  <div className="flex items-center gap-4 text-orange-400">
                    <Coffee size={24} />
                    <span className="text-[10px] font-mono uppercase tracking-[0.4em]">Starter_Module_Active</span>
                  </div>
                  <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Dev Hours</span>
                        <span className="text-lg font-black italic">10 hrs/mo</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-orange-600 w-1/4"></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>      
      
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {essentials.map((item, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-900/30 border border-white/5 hover:border-orange-500/30 transition-all">
                <div className="mb-6 bg-orange-500/10 w-fit p-4 rounded-2xl group-hover:bg-orange-500 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h4 className="text-xl font-black uppercase italic mb-3 tracking-tighter">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <LineChart className="mx-auto text-orange-500/50 mb-8" size={48} />
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-12">Scaling is <span className="text-orange-500">Inevitable.</span></h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 opacity-60 grayscale hover:grayscale-0 transition-all">
            <div className="px-8 py-4 bg-orange-900/20 border border-orange-500/30 rounded-full text-[10px] font-black tracking-widest uppercase text-orange-400">Bronze</div>
            <ArrowRight className="hidden md:block" />
            <div className="px-8 py-4 bg-slate-800 border border-white/10 rounded-full text-[10px] font-black tracking-widest uppercase text-slate-500">Silver</div>
            <ArrowRight className="hidden md:block" />
            <div className="px-8 py-4 bg-slate-800 border border-white/10 rounded-full text-[10px] font-black tracking-widest uppercase text-slate-500">Gold</div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-orange-900/5">
        <div className="max-w-4xl mx-auto text-center">
          <LifeBuoy className="mx-auto text-orange-600 mb-8 animate-spin-slow" size={48} />
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-8 leading-none">
            Don't Leave It <br /> To <span className="text-orange-600">Chance.</span>
          </h2>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto italic font-light">"Choti team ka matlab ye nahi ki support chota ho. Get professional coverage today."</p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="bg-orange-700 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-orange-900/40"
          >
            Claim Bronze Access
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BronzeTierPage;
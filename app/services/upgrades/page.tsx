"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  ArrowUpCircle, 
  Layers, 
  Zap, 
  ShieldCheck, 
  Cpu, 
  ArrowRight,
  Database,
  Code2,
  RefreshCw,
  TrendingUp
} from 'lucide-react';

const UpgradesPage = () => {
  const upgradeServices = [
    {
      title: "Legacy Modernization",
      desc: "Old monolithic systems ko modern microservices architecture mein convert karna bina aapke business ko disrupt kiye.",
      icon: <Layers />,
      img: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Tech Stack Migration",
      desc: "Outdated frameworks se latest, faster aur secure stacks (jaise Next.js, Go, ya Rust) par migration.",
      icon: <RefreshCw />,
      img: "https://images.pexels.com/photos/546819/pexels-photo-546819.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-amber-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(245,158,11,0.08)_0%,_transparent_60%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 backdrop-blur-xl">
              <ArrowUpCircle size={14} className="text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200">Modernization Engine</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Evolve Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500 italic font-black">Core Tech.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Technical debt aapke business ki growth rok raha hai. Hum aapke purane software ko modern, scalable, aur lightning-fast assets mein upgrade karte hain.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-amber-600 hover:bg-amber-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-amber-600/20"
            >
              Audit Your Stack <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-amber-500/10 blur-3xl rounded-full"></div>
            <div className="relative p-8 bg-slate-950 border border-white/10 rounded-[3rem] overflow-hidden">
               <div className="flex justify-between items-center mb-10">
                  <div className="space-y-1">
                    <p className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">Upgrade_In_Progress</p>
                    <p className="text-xs text-slate-500 font-bold italic">v2.4.0 → v5.0.0 (LTS)</p>
                  </div>
                  <TrendingUp className="text-amber-500" />
               </div>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="p-3 bg-white/5 rounded-xl border border-white/10 opacity-40"><Code2 size={20} /></div>
                     <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                     <div className="p-3 bg-amber-500 rounded-xl shadow-lg shadow-amber-500/20"><Zap size={20} className="text-white" /></div>
                  </div>
                  
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                     <div className="flex justify-between text-[10px] font-mono mb-2">
                        <span className="text-slate-500">OPTIMIZING_LATENCY</span>
                        <span className="text-amber-400">DONE</span>
                     </div>
                     <div className="h-1.5 w-full bg-white/10 rounded-full">
                        <div className="h-full bg-amber-500 w-[92%]"></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { label: "Performance Boost", val: "300%", icon: <Zap />, desc: "Average speed increase after migration." },
              { label: "Cost Reduction", val: "45%", icon: <Database />, desc: "Lower infrastructure and maintenance costs." },
              { label: "Security Score", val: "A+", icon: <ShieldCheck />, desc: "Latest encryption and patch compliance." }
            ].map((stat, i) => (
              <div key={i} className="text-center md:text-left space-y-4 p-6 hover:bg-white/[0.02] rounded-3xl transition-all">
                <div className="text-amber-500">{stat.icon}</div>
                <h4 className="text-3xl font-black italic uppercase">{stat.val}</h4>
                <p className="text-sm font-bold text-slate-200">{stat.label}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {upgradeServices.map((service, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 hover:border-amber-500/30 transition-all duration-500">
              <img src={service.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                <div className="mb-6 p-4 bg-amber-500/10 rounded-2xl w-fit text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-all">
                  {React.cloneElement(service.icon as React.ReactElement, { size: 30 } as any)}
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{service.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{service.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-500">
                  <Cpu size={14} /> Future-Ready Migration
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-amber-600 to-orange-600 text-center relative overflow-hidden shadow-2xl shadow-amber-600/20">
          <div className="absolute top-0 right-0 p-12 opacity-10"><RefreshCw size={300} /></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">Don't Get Left <br /> <span className="text-amber-200">Behind.</span></h2>
            <p className="text-amber-50 text-lg mb-12 max-w-xl mx-auto font-light">Legacy code is a liability. It's time to upgrade to the future of technology.</p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all"
            >
              Start Your Migration
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default UpgradesPage;
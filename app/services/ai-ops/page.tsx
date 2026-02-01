"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Activity, 
  CloudLightning, 
  ShieldAlert, 
  BrainCircuit, 
  BarChart3, 
  ArrowRight,
  ServerCrash,
  Infinity,
  Microchip,
  Globe
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const AIOpsPage = () => {
  const features = [
    {
      title: "Predictive Maintenance",
      desc: "AI-driven anomaly detection jo server failures ko hone se pehle hi identify aur fix kar deta hai.",
      icon: ServerCrash,
      img: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Automated Incident Response",
      desc: "L1/L2 support tasks ko automate karein smart bots ke sath jo complex infrastructure issues resolve karte hain.",
      icon: ShieldAlert,
      img: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-purple-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(168,85,247,0.1)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 backdrop-blur-xl">
              <Infinity size={14} className="text-purple-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-200">Autonomous Operations Layer</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              AIOps <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 italic font-black">Evolution.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Transform your IT operations from reactive to proactive. Hum AI ka use karte hain aapke cloud infrastructure ko monitor, manage aur self-heal karne ke liye.
            </p>
            <Link 
              href="/contact"
              className="bg-purple-600 hover:bg-purple-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-purple-600/20"
            >
              Deploy AI Agent <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-purple-500/10 blur-3xl rounded-full"></div>
            <div className="relative p-8 bg-slate-950/80 border border-white/10 rounded-[3rem] backdrop-blur-2xl">
               <div className="flex justify-between items-center mb-8">
                  <div className="flex gap-2">
                     <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                     <span className="text-[10px] font-mono text-purple-400 tracking-widest uppercase">Autonomous_Control_v4</span>
                  </div>
                  <Activity size={18} className="text-purple-500" />
               </div>
               
               <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                     <p className="text-[9px] text-slate-500 uppercase font-bold">MTTR Reduction</p>
                     <p className="text-2xl font-black text-purple-400">-74%</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                     <p className="text-[9px] text-slate-500 uppercase font-bold">Uptime Status</p>
                     <p className="text-2xl font-black text-emerald-400">99.999%</p>
                  </div>
               </div>

               <div className="space-y-3">
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-purple-500 w-[85%]"></div>
                  </div>
                  <p className="text-[10px] font-mono text-slate-500 tracking-tight">Processing 1.2 Million events per second...</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-20 italic text-center">The AIOps Pipeline</h2>
          <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
             {[
               { label: "Data Ingestion", icon: <Globe />, val: "Multi-Cloud" },
               { label: "Pattern Discovery", icon: <BrainCircuit />, val: "ML-Driven" },
               { label: "Self-Healing", icon: <CloudLightning />, val: "Automated" },
               { label: "Cost Optimization", icon: <BarChart3 />, val: "Dynamic" }
             ].map((item, i) => (
               <div key={i} className="text-center group p-6 hover:bg-white/[0.02] rounded-3xl transition-all">
                  <div className="text-purple-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h4 className="text-lg font-black italic mb-1 uppercase tracking-tight">{item.val}</h4>
                  <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{item.label}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 hover:border-purple-500/30 transition-all duration-500">
              <Image 
                src={feature.img} 
                alt={feature.title}
                fill
                className="object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                <div className="mb-6 p-4 bg-purple-500/10 rounded-2xl w-fit text-purple-400 group-hover:bg-purple-600 group-hover:text-white transition-all">
                  {React.createElement(feature.icon, { size: 30 })}
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{feature.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{feature.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-purple-400">
                  <Microchip size={14} /> Neural-Ops Certified
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-purple-600/20 via-slate-900/40 to-slate-950 border border-purple-500/20 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-10 leading-[0.85]">
              Stop Firefighting. <br /> Start <span className="text-purple-500">Automating.</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto font-light leading-relaxed">Infrastructure manage karne ka naya tareeka yahan hai. Get rid of operational manual labor with AI.</p>
            <Link 
              href="/contact"
              className="inline-block bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all"
            >
              Get Free Ops Audit
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AIOpsPage;
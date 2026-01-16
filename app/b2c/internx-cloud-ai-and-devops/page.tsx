'use client';

import React from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { Cloud, Infinity, Terminal, Layers, ShieldCheck, Cpu, ArrowRight, Server, Globe, Box, Command } from 'lucide-react';

export default function InternXCloudDevOps() {
  const features = [
    { icon: <Terminal className="w-6 h-6" />, title: "Infrastructure as Code", desc: "Automate stacks with Terraform & Ansible for rapid scaling." },
    { icon: <ShieldCheck className="w-6 h-6" />, title: "DevSecOps", desc: "Integrated security scanning at every stage of the CI/CD pipeline." },
    { icon: <Infinity className="w-6 h-6" />, title: "Continuous Delivery", desc: "Zero-downtime deployment protocols for non-stop availability." },
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-blue-600/30 overflow-x-hidden">
      <B2CHeader />

      {/* --- HERO SECTION: MODERN & RESPONSIVE --- */}
      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-4 md:px-6">
        {/* Futuristic Background Blur */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center lg:text-left flex flex-col lg:flex-row items-center justify-between gap-16">
          <div className="w-full lg:w-[60%] space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-2xl">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-400">Cloud Infrastructure v3.0</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-[ -0.05em] leading-[0.85] uppercase">
              Cloud <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-200 to-white italic">
                Efficiency
              </span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed">
              Master the engine of modern business. We provide high-performance automated pipelines and decentralized cloud fabric for the AI era.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 pt-4">
              <button className="w-full sm:w-auto px-10 py-5 bg-white text-black hover:bg-blue-600 hover:text-white rounded-2xl font-black uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-3 group">
                Provision <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto px-10 py-5 border border-white/10 hover:bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest transition-all">
                Tech Stack
              </button>
            </div>
          </div>

          {/* Abstract Tech Visual */}
          <div className="w-full lg:w-[35%] relative aspect-square hidden md:flex items-center justify-center">
             <div className="absolute inset-0 bg-blue-500/5 rounded-full border border-white/5 animate-pulse" />
             <div className="relative p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] rotate-3 hover:rotate-0 transition-transform duration-700">
                <Command className="w-32 h-32 text-blue-500 opacity-50 mb-4" />
                <div className="h-2 w-20 bg-blue-600 rounded-full" />
             </div>
             <Box className="absolute bottom-10 left-0 w-16 h-16 text-white/10 animate-bounce" />
          </div>
        </div>
      </section>

      {/* --- BENTO GRID: MOBILE OPTIMIZED --- */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-8">
            
            {/* Massive Status Card */}
            <div className="md:col-span-8 p-10 md:p-14 bg-gradient-to-br from-[#0a0a0a] to-[#030303] border border-white/5 rounded-[3rem] flex flex-col justify-between group hover:border-blue-500/50 transition-all duration-500 min-h-[400px]">
              <div className="flex justify-between items-start">
                <div className="p-5 bg-blue-600/10 rounded-3xl text-blue-500 group-hover:scale-110 transition-transform">
                  <Server className="w-10 h-10" />
                </div>
                <div className="text-[10px] font-mono text-blue-400 bg-blue-400/10 px-4 py-2 rounded-full border border-blue-400/20 uppercase tracking-widest">
                  System.status: Optimized
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-3xl md:text-5xl font-black uppercase italic leading-none">Scalable<br/>Neural Clusters</h3>
                <p className="text-slate-500 max-w-md text-sm md:text-lg">Dynamic resource allocation powered by AI-driven predictive analytics.</p>
              </div>
            </div>

            {/* Accent Card */}
            <div className="md:col-span-4 p-10 bg-blue-600 rounded-[3rem] flex flex-col justify-between min-h-[400px] shadow-[0_0_50px_rgba(37,99,235,0.2)] hover:scale-[0.98] transition-transform">
               <Layers className="w-12 h-12 text-white" />
               <div className="space-y-4">
                  <h3 className="text-4xl font-black text-white uppercase italic leading-none">Hybrid<br/>Delivery</h3>
                  <p className="text-blue-100/70 text-sm font-bold uppercase tracking-widest">Global Edge Nodes</p>
               </div>
            </div>

            {/* Feature Triplets - Responsive Flex */}
            {features.map((item, i) => (
              <div key={i} className="md:col-span-4 p-10 bg-[#080808] border border-white/5 rounded-[2.5rem] hover:bg-blue-600/5 transition-all group">
                <div className="text-blue-500 mb-8 p-4 bg-white/5 w-fit rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {item.icon}
                </div>
                <h4 className="text-xl font-black uppercase mb-4 text-white italic">{item.title}</h4>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* --- CTA: HIGH CONTRAST --- */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto bg-white rounded-[4rem] p-12 md:p-24 text-center text-black relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Globe className="w-64 h-64" />
          </div>
          <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8 leading-none italic">
            Ready to build <br/> the future?
          </h2>
          <p className="text-black/60 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-bold">
            Join the most advanced Cloud & DevOps ecosystem in the world.
          </p>
          <button className="px-14 py-6 bg-black text-white rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-blue-600 transition-all active:scale-95 shadow-2xl">
            Start Deployment Now
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
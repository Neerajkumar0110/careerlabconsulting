'use client';

import React from 'react';
import Image from 'next/image'; 
import { Phone, Award, CheckCircle2, ArrowRight } from 'lucide-react';

const driveToImage = (url: string): string => {
  if (!url || !url.includes('drive.google.com')) return url;
  const id = url.match(/[-\w]{25,}/);
  return id ? `https://lh3.googleusercontent.com/d/${id[0]}` : url;
};

const FoundersVision = () => {
  return (
    <section className="relative py-24 px-6 md:px-12 bg-transparent overflow-hidden" style={{ contain: 'layout' }}>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10 hidden md:block"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        
        <div className="relative w-full lg:w-1/2 group">
          <div className="relative z-10 rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-[1.01]">
            <Image
              src={driveToImage("https://drive.google.com/file/d/12KxHfzJBYIbBQ6DR_asSTQoYRMRxcxr7/view?usp=drive_link")}
              alt="Career Lab Consulting Founder's Vision"
              width={800}
              height={1000}
              className="w-full h-[450px] md:h-[550px] object-cover brightness-[0.8] transition-all duration-700 group-hover:brightness-100"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
          </div>
          
          <div className="absolute -top-6 -left-4 z-20 bg-[#0f172a]/80 backdrop-blur-xl p-5 rounded-2xl border border-white/20 shadow-2xl flex items-center gap-4 animate-bounce-slow">
            <div className="bg-blue-500/20 p-2 rounded-full text-blue-400 ring-4 ring-blue-500/10" aria-hidden="true">
              <Award size={28} />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-blue-300 font-bold">Innovation</p>
              <p className="text-sm font-bold text-white">Leaders 2026</p>
            </div>
          </div>

          <div className="absolute -bottom-8 -right-4 z-20 bg-slate-900/90 backdrop-blur-2xl text-white p-6 rounded-[1.5rem] border border-blue-500/30 shadow-xl max-w-[240px]">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={18} className="text-emerald-400" aria-hidden="true" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400">Verified Stack</span>
            </div>
            <p className="text-sm font-semibold leading-snug">Powering the first unified Autonomous AI Ecosystem.</p>
          </div>
        </div>

        <div className="w-full lg:w-1/2 space-y-10">
          <header className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span>
              <span className="text-blue-400 font-bold tracking-[0.2em] text-xs uppercase font-mono">Founder's Vision</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl font-black text-white leading-[1.1] tracking-tight">
              "Powering the future of the Autonomous Enterprise through a unified, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400">24/7 </span> AI Infrastructure"
            </h2>
          </header>
          
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500/50 rounded-full"></div>
            <div className="pl-8 space-y-4">
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed">
                At <strong className="text-white font-bold">Career Lab Consulting</strong>, we are engineering the future of the <span className="text-blue-400 font-medium">Autonomous Enterprise</span>.
              </p>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                Our mission is to provide a unified AI Infrastructure that runs your entire business—operations, sales, and support—24/7 on one intelligent layer. We don't just build tools; we build the <strong className="text-slate-200">Autonomous Ecosystem</strong> that empowers global scale.
              </p>
            </div>
          </div>

          <div className="pt-6 space-y-8">
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="group flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-5 rounded-2xl font-bold transition-all shadow-lg hover:shadow-blue-500/40">
                Explore AI Product Suite
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
              </button>
              
              <a 
                href="tel:+918700236923" 
                className="group flex items-center justify-center gap-3 px-8 py-5 border border-white/10 hover:border-blue-500/40 bg-white/5 rounded-2xl font-bold text-white transition-all"
              >
                <Phone size={20} className="group-hover:rotate-12 transition-transform text-blue-400" />
                <span className="text-lg">+91 870023 6923</span>
              </a>
            </div>
            
            <div className="flex items-center gap-4 text-slate-400 bg-white/[0.03] w-fit px-5 py-3 rounded-xl border border-white/5">
              <div className="flex -space-x-2" aria-hidden="true">
                {['M', 'C', 'L'].map((char, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full border-2 border-slate-900 flex items-center justify-center text-[10px] font-black ${i === 0 ? 'bg-blue-600 text-white' : 'bg-slate-800 text-blue-400'}`}>
                    {char}
                  </div>
                ))}
              </div>
              <p className="text-xs md:text-sm font-medium">
                <span className="text-emerald-400 font-bold uppercase text-[10px] block">Ecosystem Status</span>
                Deploying 9 Unified AI Modules for 2026-27
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoundersVision;
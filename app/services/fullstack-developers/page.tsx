"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Code2, 
  Layers, 
  Database, 
  Globe, 
  Zap, 
  ArrowRight,
  Monitor,
  Server,
  Infinity,
  Puzzle
} from 'lucide-react';

const FullstackDevelopersPage = () => {
  const stacks = [
    {
      title: "Modern JS Ecosystem",
      desc: "Next.js, React, aur Node.js ke saath high-performance applications jo SEO aur speed ke liye optimized hain.",
      icon: <Monitor />,
      img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Scalable Backend & DBs",
      desc: "Robust API development using Python, Go, or Rust paired with PostgreSQL, MongoDB, or Redis architecture.",
      icon: <Server />,
      img: "https://images.pexels.com/photos/1181359/pexels-photo-1181359.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-violet-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(139,92,246,0.1)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8 backdrop-blur-xl">
              <Infinity size={14} className="text-violet-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-200">Full-Cycle Engineering</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Code <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-500 italic font-black">Without Limits.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Frontend ki aesthetics se lekar Backend ki scalability tak—hamare Fullstack developers single-handedly poora product build karne ki shamta rakhte hain.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-violet-600 hover:bg-violet-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-violet-600/20"
            >
              Hire Fullstack Talent <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-violet-500/10 blur-3xl rounded-full"></div>
            <div className="relative p-10 bg-slate-950 border border-white/10 rounded-[3rem] overflow-hidden">
               <div className="flex justify-between items-center mb-12">
                  <span className="text-[10px] font-mono text-violet-400 uppercase tracking-widest italic font-bold">Architecture_Vertical_Stack</span>
                  <div className="flex gap-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-violet-500"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-fuchsia-500"></div>
                  </div>
               </div>
               
               <div className="space-y-8 relative">
                  <div className="p-4 bg-white/5 rounded-2xl border-l-4 border-fuchsia-500 transform -rotate-1 hover:rotate-0 transition-transform cursor-default">
                     <div className="flex items-center gap-3">
                        <Monitor size={18} className="text-fuchsia-400" />
                        <span className="text-xs font-black uppercase italic">Client Layer (React/Next)</span>
                     </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border-l-4 border-violet-500 transform rotate-1 hover:rotate-0 transition-transform cursor-default">
                     <div className="flex items-center gap-3">
                        <Zap size={18} className="text-violet-400" />
                        <span className="text-xs font-black uppercase italic">Logic Layer (Node/Go)</span>
                     </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border-l-4 border-blue-500 transform -rotate-1 hover:rotate-0 transition-transform cursor-default">
                     <div className="flex items-center gap-3">
                        <Database size={18} className="text-blue-400" />
                        <span className="text-xs font-black uppercase italic">Data Layer (Postgres/Redis)</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
            {[
              { label: "Modern Frontend", icon: <Globe />, val: "UX-Focused" },
              { label: "API Design", icon: <Layers />, val: "REST/GraphQL" },
              { label: "Database", icon: <Database />, val: "Architecture" },
              { label: "Deployment", icon: <Zap />, val: "CI/CD Ready" }
            ].map((stat, i) => (
              <div key={i} className="text-center group p-6 rounded-3xl hover:bg-white/[0.02] transition-all">
                <div className="text-violet-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                <h4 className="text-lg font-black italic mb-1 uppercase tracking-tight">{stat.val}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {stacks.map((stack, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 hover:border-violet-500/30 transition-all duration-500">
              <img src={stack.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                <div className="mb-6 p-4 bg-violet-500/10 rounded-2xl w-fit text-violet-400 group-hover:bg-violet-600 group-hover:text-white transition-all">
                  {React.cloneElement(stack.icon as React.ReactElement, { size: 30 } as any)}
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{stack.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{stack.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-violet-400">
                  <Puzzle size={14} /> Full System Ownership
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-violet-600 to-indigo-900 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10"><Code2 size={300} /></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              Bridge The <br /> <span className="text-violet-200">Gap.</span>
            </h2>
            <p className="text-violet-100 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
              Don't hire two people for one job. Hire experts who understand the entire technical journey.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl"
            >
              Consult with a Lead Dev
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FullstackDevelopersPage;
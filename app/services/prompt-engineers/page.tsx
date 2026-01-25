"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  MessageSquareCode, 
  Terminal, 
  Sparkles, 
  Settings2, 
  Repeat, 
  ArrowRight,
  ShieldCheck,
  Brain,
  Quote,
  Command
} from 'lucide-react';
import type { Icon } from 'lucide-react';

const PromptEngineeringPage = () => {

  const promptSpecialties: {
    title: string;
    desc: string;
    icon: React.ReactElement<any, typeof Icon>;
    img: string;
  }[] = [
    {
      title: "RAG & Context Optimization",
      desc: "Engineering complex prompts that utilize Retrieval-Augmented Generation to ground AI responses in your private data.",
      icon: <Brain />,
      img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Chain-of-Thought Logic",
      desc: "Designing multi-step reasoning prompts that reduce hallucination and solve complex logical problems with 99% accuracy.",
      icon: <Repeat />,
      img: "https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-emerald-500/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(16,185,129,0.1)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-xl">
              <Command size={14} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200">System Instruction Experts</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Speak To <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-500 italic font-black">The Machine.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              AI outputs are only as good as their inputs. Our Prompt Engineers master the syntax and psychology required to extract maximum performance from LLMs.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-emerald-600/20"
            >
              Hire Prompt Experts <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full"></div>
            <div className="relative bg-[#0a0f1e] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
              <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-red-500"></div>
                <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                <span className="ml-4 text-[10px] font-mono text-slate-500 uppercase tracking-widest">Compiler_Active</span>
              </div>
              <div className="p-8 font-mono text-sm space-y-4">
                <p className="text-emerald-400 italic"># System Prompt v4.2</p>
                <p className="text-slate-300">
                  <span className="text-emerald-500">SET</span> ROLE = "Expert_FinOps_Analyst"<br />
                  <span className="text-emerald-500">ENFORCE</span> Chain_of_Thought = True<br />
                  <span className="text-emerald-500">RESTRICT</span> Hallucination_Threshold &lt; 0.01
                </p>
                <div className="h-px bg-white/5 my-4"></div>
                <div className="flex gap-3">
                  <Sparkles size={16} className="text-emerald-500 shrink-0" />
                  <p className="text-slate-500 italic">Optimizing token density and output structure...</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">The Refinement Loop</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Instruction Design", icon: <Terminal />, val: "Linguistic" },
              { label: "Few-Shot Learning", icon: <MessageSquareCode />, val: "Example-Driven" },
              { label: "Parameter Tuning", icon: <Settings2 />, val: "Temp/Top-P" },
              { label: "Safety Alignment", icon: <ShieldCheck />, val: "Bias-Free" }
            ].map((stat, i) => (
              <div key={i} className="text-center group p-6 rounded-3xl hover:bg-white/[0.02] transition-all">
                <div className="text-emerald-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                <h4 className="text-lg font-black italic mb-1 uppercase tracking-tight">{stat.val}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {promptSpecialties.map((spec, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 hover:border-emerald-500/30 transition-all duration-500">
              <img src={spec.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                <div className="mb-6 p-4 bg-emerald-500/10 rounded-2xl w-fit text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                  {React.cloneElement(spec.icon, { size: 30 })}
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{spec.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{spec.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-400">
                  <Quote size={14} /> Token Efficiency Guaranteed
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-emerald-950/40 to-slate-950 border border-emerald-500/20 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-10 leading-none">
              Control the <br /> <span className="text-emerald-500 italic">Conversation.</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto font-light leading-relaxed">Stop wasting tokens on generic responses. Unlock the true potential of your LLM with surgical prompt engineering.</p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-emerald-600/30"
            >
              Get a Prompt Audit
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PromptEngineeringPage;
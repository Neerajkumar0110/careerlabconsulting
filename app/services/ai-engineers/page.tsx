"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  BrainCircuit, 
  Cpu, 
  Code2, 
  Network, 
  Bot, 
  ArrowRight,
  Database,
  SearchCode,
  Sparkles,
  Zap
} from 'lucide-react';

const AIEngineersPage = () => {
  const specializations = [
    {
      title: "LLM Customization",
      desc: "Fine-tuning models like GPT-4, Llama 3, and Claude for your specific business context and private data.",
      icon: <Bot />,
      img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Computer Vision",
      desc: "Deploying production-ready models for object detection, facial recognition, and medical imaging analysis.",
      icon: <SearchCode />,
      img: "https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-500/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(34,211,238,0.1)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-xl">
              <BrainCircuit size={14} className="text-cyan-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-200">Elite Neural Engineering</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Hire AI <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500 italic font-black">Architects.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Build the future with engineers who don't just use AI—they build it. From RAG pipelines to autonomous agents, hire the top 1% of ML talent.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-cyan-600/20"
            >
              Assemble Your AI Team <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-violet-500/10 blur-3xl rounded-full animate-pulse"></div>
            <div className="relative p-10 bg-slate-950/80 border border-white/10 rounded-[3rem] backdrop-blur-3xl">
               <div className="flex justify-between items-center mb-10">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest italic">Model_Inference_Stream</span>
                  <div className="flex gap-2">
                     <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-ping"></div>
                     <div className="h-1.5 w-1.5 rounded-full bg-violet-500"></div>
                  </div>
               </div>
               <div className="space-y-4">
                  {[1, 2, 3].map((_, i) => (
                    <div key={i} className="h-3 bg-white/5 rounded-full overflow-hidden">
                       <div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full" style={{ width: `${Math.random() * 60 + 40}%` }}></div>
                    </div>
                  ))}
               </div>
               <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="bg-cyan-500/5 p-4 rounded-2xl border border-cyan-500/10">
                     <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Latency</p>
                     <p className="text-xl font-black text-cyan-400 font-mono">24ms</p>
                  </div>
                  <div className="bg-violet-500/5 p-4 rounded-2xl border border-violet-500/10">
                     <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Accuracy</p>
                     <p className="text-xl font-black text-violet-400 font-mono">99.2%</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">Core AI Competencies</h2>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "TensorFlow/PyTorch", icon: <Cpu />, val: "Deep Learning" },
              { label: "OpenAI/Anthropic", icon: <Sparkles />, val: "LLM Expert" },
              { label: "Pinecone/Milvus", icon: <Database />, val: "Vector DBs" },
              { label: "LangChain/AutoGPT", icon: <Zap />, val: "AI Agents" }
            ].map((stat, i) => (
              <div key={i} className="text-center group p-6 hover:bg-white/[0.02] rounded-3xl transition-all">
                <div className="text-cyan-400 mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                <h4 className="text-lg font-black italic mb-1 uppercase tracking-tight">{stat.val}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {specializations.map((spec, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 hover:border-cyan-500/30 transition-all duration-500">
              <img src={spec.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                <div className="mb-6 p-4 bg-cyan-500/10 rounded-2xl w-fit text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                  {React.cloneElement(spec.icon as React.ReactElement, { size: 30 } as any)}
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{spec.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{spec.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-400">
                  <Network size={14} /> Neural-Architecture Ready
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-cyan-950 to-slate-950 border border-cyan-500/20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 h-96 w-96 bg-cyan-500/10 blur-[100px] rounded-full"></div>
          <div className="relative z-10">
            <Code2 className="mx-auto text-cyan-500 mb-8" size={48} />
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-10 leading-none">
              The Code <br /> Of <span className="text-cyan-500">Intelligence.</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto font-light italic">"AI implement karna mushkil nahi hai, use scale aur optimize karna asli challenge hai. Hire the best."</p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-white/10"
            >
              Consult with AI Experts
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AIEngineersPage;
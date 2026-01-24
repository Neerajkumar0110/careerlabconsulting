"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Database, 
  Search, 
  FileSearch, 
  Layers, 
  Cpu, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Network,
  Share2
} from 'lucide-react';

const RAGSpecialistsPage = () => {
  const ragWorkflows = [
    {
      title: "Vector Database Architecture",
      desc: "Pinecone, Weaviate, aur Milvus ke sath high-performance retrieval systems jo millions of documents ko milliseconds mein search karte hain.",
      icon: <Network />,
      img: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Hybrid Search Systems",
      desc: "Combining Semantic search with Keyword search (BM25) for 100% accuracy in document retrieval and citation.",
      icon: <Search />,
      img: "https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-lime-500/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(132,204,22,0.1)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-lime-500/10 border border-lime-500/20 mb-8 backdrop-blur-xl">
              <Database size={14} className="text-lime-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lime-200">Retrieval Augmented Intelligence</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Chat With <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-500 italic font-black text-shadow-sm">Your Data.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Generic AI halls ko khatam kijiye. Hamare RAG specialists aapke private data ko LLMs se connect karte hain, jisse milti hai accurate, cited, aur secure intelligence.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-lime-600 hover:bg-lime-500 text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-lime-600/20"
            >
              Build My RAG Pipeline <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-lime-500/10 blur-3xl rounded-full animate-pulse"></div>
            <div className="relative p-8 bg-slate-950 border border-white/10 rounded-[3rem] backdrop-blur-3xl overflow-hidden">
               <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                  <div className="flex gap-2 items-center">
                    <Share2 className="text-lime-500" size={18} />
                    <span className="text-[10px] font-mono font-bold text-slate-400 tracking-tighter uppercase">Knowledge_Sync_v1</span>
                  </div>
                  <div className="h-2 w-2 rounded-full bg-lime-500 animate-ping"></div>
               </div>
               
               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10"><FileSearch className="text-lime-500" /></div>
                     <div className="flex-1 h-px bg-gradient-to-r from-lime-500/50 to-transparent"></div>
                     <div className="text-[10px] font-mono text-slate-500 uppercase">Embedding</div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center border border-white/10"><Database className="text-emerald-500" /></div>
                     <div className="flex-1 h-px bg-gradient-to-r from-emerald-500/50 to-transparent"></div>
                     <div className="text-[10px] font-mono text-slate-500 uppercase">Vector Storage</div>
                  </div>
                  <div className="flex items-center gap-4">
                     <div className="w-12 h-12 bg-lime-500 rounded-xl flex items-center justify-center shadow-lg shadow-lime-500/20"><Cpu className="text-black" /></div>
                     <div className="flex-1 h-px bg-gradient-to-r from-white/20 to-transparent"></div>
                     <div className="text-[10px] font-mono text-slate-500 uppercase">LLM Synthesis</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Latency", icon: <Zap />, val: "< 200ms" },
              { label: "Data Security", icon: <ShieldCheck />, val: "SOC2 Ready" },
              { label: "Scalability", icon: <Layers />, val: "1B+ Chunks" },
              { label: "Architecture", icon: <Network />, val: "Multi-Index" }
            ].map((stat, i) => (
              <div key={i} className="text-center group p-6 rounded-3xl hover:bg-white/[0.02] transition-all">
                <div className="text-lime-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                <h4 className="text-lg font-black italic mb-1 uppercase tracking-tight">{stat.val}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {ragWorkflows.map((workflow, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 hover:border-lime-500/30 transition-all duration-500">
              <img src={workflow.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                <div className="mb-6 p-4 bg-lime-500/10 rounded-2xl w-fit text-lime-400 group-hover:bg-lime-600 group-hover:text-black transition-all">
                  {React.cloneElement(workflow.icon as React.ReactElement, { size: 30 } as any)}
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{workflow.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{workflow.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-lime-400">
                  <Database size={14} /> Knowledge Retrieval Optimization
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-lime-900/20 to-slate-950 border border-lime-500/20 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              Intelligence <br /> Meets <span className="text-lime-500 italic">Context.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
              Unlock the trapped knowledge within your enterprise. Our RAG systems make your technical manuals, legal docs, and internal wikis conversational.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-white/10"
            >
              Start Your Data Sync
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default RAGSpecialistsPage;
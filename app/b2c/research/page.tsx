'use client';

import React from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import Image from 'next/image';
import { FileText, Search, Database, Share2, ArrowRight, Microscope, Zap, MessageCircle } from 'lucide-react';
import Link from 'next/link';

const researchPapers = [
  {
    id: "RES-2025-01",
    title: "Autonomous Agent Swarms in Decentralized Finance",
    author: "Dr. Elena Vance & InternX Lab",
    category: "AI & Web3",
    image: "https://images.unsplash.com/photo-1650796700555-46f6cf0fddf3?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    date: "Jan 2025"
  },
  {
    id: "RES-2024-09",
    title: "Neural Security Protocols for Quantum Resistance",
    author: "InternX Research Council",
    category: "Cyber Security",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1000&auto=format&fit=crop",
    date: "Dec 2024"
  },
  {
    id: "RES-2024-04",
    title: "Scalable Layer-3 Architectures for AI Training",
    author: "InternX Blockchain Wing",
    category: "Blockchain",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1000&auto=format&fit=crop",
    date: "Oct 2024"
  }
];

export default function Research() {
  const whatsappNumber = "+919810984968";

  return (
    <main className="min-h-screen bg-black text-white selection:bg-blue-600/30 overflow-x-hidden">
      <B2CHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-4 border-b border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="p-3 bg-blue-600/10 rounded-2xl mb-6 text-blue-500 border border-blue-500/20">
            <Microscope size={32} />
          </div>
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-8 leading-[0.85]">
            THE <span className="text-blue-600">INTEL</span> ARCHIVE
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl font-medium">
            Advancing the boundaries of technology through rigorous academic research and industrial deployment.
          </p>
        </div>
      </section>

      {/* --- SEARCH & FILTERS (Visual Only) --- */}
      <section className="py-8 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
            <input 
              type="text" 
              placeholder="Search papers by keywords..." 
              className="w-full bg-black border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-blue-500 outline-none transition-all font-bold uppercase tracking-widest"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
            {['All', 'AI', 'Cyber', 'Web3'].map(tag => (
              <button key={tag} className="px-6 py-2 rounded-full border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- RESEARCH PAPERS GRID --- */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {researchPapers.map((paper, i) => (
              <div key={i} className="group relative flex flex-col md:flex-row gap-6 p-6 bg-[#080808] border border-white/5 rounded-[2.5rem] hover:border-blue-500/40 transition-all duration-500">
                {/* Paper Image */}
                <div className="relative w-full md:w-56 h-56 md:h-auto rounded-3xl overflow-hidden shrink-0">
                  <Image 
                    src={paper.image} 
                    alt={paper.title}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  />
                  <div className="absolute top-4 left-4 p-2 bg-black/60 backdrop-blur-md rounded-lg text-blue-400">
                    <Zap size={16} fill="currentColor" />
                  </div>
                </div>

                {/* Paper Content */}
                <div className="flex flex-col justify-between py-2">
                  <div>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{paper.id}</span>
                    <h3 className="text-xl md:text-2xl font-black uppercase italic mt-2 leading-tight group-hover:text-blue-400 transition-colors">
                      {paper.title}
                    </h3>
                    <p className="text-slate-500 text-xs mt-4 font-bold uppercase tracking-wide">Author: {paper.author}</p>
                    <div className="flex items-center gap-4 mt-6">
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                        <Database size={12} /> Data Intensive
                      </div>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase">
                        <Share2 size={12} /> Open Access
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-4">
                    <button className="flex-1 px-6 py-3 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                      Read Paper <FileText size={14} />
                    </button>
                    <button className="p-3 border border-white/10 rounded-xl hover:bg-white/5">
                      <Share2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- COLLABORATION BANNER --- */}
      <section className="pb-32 px-4">
        <div className="max-w-7xl mx-auto relative rounded-[3rem] overflow-hidden group">
          <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-blue-600/20 transition-all duration-700" />
          <div className="relative p-12 md:p-24 border border-white/5 flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="text-center md:text-left">
              <h2 className="text-4xl md:text-6xl font-black uppercase italic mb-4 tracking-tighter">Submit Your <br/>Research</h2>
              <p className="text-slate-400 max-w-md font-medium">Looking to publish your work in AI, Blockchain, or Cyber Security? Collaborate with InternX Labs.</p>
            </div>
            <Link 
              href={`https://wa.me/${whatsappNumber}`}
              className="px-12 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all shadow-2xl"
            >
              Contact Lab <ArrowRight size={20} className="inline ml-2" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
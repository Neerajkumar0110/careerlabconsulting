'use client';

import React, { useState } from 'react';
import { 
  Server, ChevronRight, Search, Menu, X, Terminal, 
  Cpu, Database, Box, Shield, Activity, GitBranch, Layout,
  Globe // Added missing import here
} from 'lucide-react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';

// --- DYNAMIC CONTENT DATA ---
const DOC_SECTIONS = [
  {
    title: "Getting Started",
    items: ["Architecture Overview", "Tech Stack", "Deployment Flow"]
  },
  {
    title: "System Design",
    items: ["Microservices", "Database Schema", "Caching Strategy"]
  },
  {
    title: "Security",
    items: ["Auth & IAM", "Data Encryption"]
  }
];

const CONTENT_MAP: Record<string, any> = {
  "Architecture Overview": {
    description: "Our system follows a decoupled event-driven architecture designed for massive scale and reliability.",
    stats: [
      { label: "Throughput", value: "10k+ req/sec", icon: Activity },
      { label: "Availability", value: "99.99%", icon: Shield }
    ],
    diagramType: "High-Level Architecture"
  },
  "Tech Stack": {
    description: "We use a modern, type-safe stack to ensure developer velocity and production stability.",
    stats: [
      { label: "Frontend", value: "Next.js 14", icon: Layout },
      { label: "Backend", value: "Go / Node.js", icon: Terminal }
    ],
    diagramType: "Full Tech Stack"
  },
  "Database Schema": {
    description: "Highly optimized relational schema with JSONB support for flexible metadata storage.",
    stats: [
      { label: "Primary DB", value: "PostgreSQL", icon: Database },
      { label: "Cache", value: "Redis v7", icon: Box }
    ],
    diagramType: "Entity Relationship"
  }
};

// --- MINI DIAGRAM COMPONENT ---
const ArchitectureDiagram = ({ type }: { type: string }) => {
  return (
    <div className="w-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 my-8 overflow-hidden relative group">
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
        <GitBranch size={100} />
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-6 py-12">
        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 shadow-lg shadow-emerald-500/10">
            <Globe size={32} />
          </div>
          <span className="text-[9px] font-black uppercase text-slate-500">Edge Layer</span>
        </div>
        
        <div className="h-px w-12 bg-emerald-500/30 hidden md:block" />
        <div className="w-px h-12 bg-emerald-500/30 md:hidden" />

        <div className="flex flex-col items-center gap-2">
          <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/10 flex items-center justify-center text-white scale-110">
            <Server size={40} />
          </div>
          <span className="text-[9px] font-black uppercase text-emerald-500">API Gateway</span>
        </div>

        <div className="h-px w-12 bg-emerald-500/30 hidden md:block" />
        <div className="w-px h-12 bg-emerald-500/30 md:hidden" />

        <div className="flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400">
            <Database size={32} />
          </div>
          <span className="text-[9px] font-black uppercase text-slate-500">Data Store</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-emerald-500/50 italic">
          Dynamic Flow Visualizer: {type}
        </p>
      </div>
    </div>
  );
};

export default function InfrastructureDocs() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Architecture Overview");

  const currentContent = CONTENT_MAP[activeTab] || CONTENT_MAP["Architecture Overview"];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-300 selection:bg-emerald-500/30">
      <B2CHeader />

      {/* --- HERO --- */}
      <section className="pt-32 pb-12 px-6 border-b border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-500">
              <Server size={20} />
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500">Infra Protocol</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white italic uppercase tracking-tighter">
            System <span className="text-slate-500">Architecture</span>
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row">
        
        {/* --- MOBILE NAV --- */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden flex items-center justify-between p-6 bg-white/5 border-b border-white/10"
        >
          <span className="text-xs font-black uppercase tracking-widest text-emerald-500">{activeTab}</span>
          {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* --- SIDEBAR --- */}
        <aside className={`
          ${isSidebarOpen ? 'block' : 'hidden'} 
          md:block w-full md:w-80 border-r border-white/5 p-8 sticky top-24 h-fit md:h-[calc(100vh-100px)] bg-[#020617] z-40
        `}>
          <nav className="space-y-10">
            {DOC_SECTIONS.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 mb-4">{section.title}</h4>
                <div className="space-y-1">
                  {section.items.map(item => (
                    <button 
                      key={item}
                      onClick={() => { setActiveTab(item); setIsSidebarOpen(false); }}
                      className={`w-full text-left px-4 py-3 rounded-xl text-[11px] font-black uppercase tracking-tighter transition-all flex items-center justify-between group ${activeTab === item ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}
                    >
                      {item}
                      <ChevronRight size={14} className={activeTab === item ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        {/* --- CONTENT --- */}
        <article className="flex-1 p-8 md:p-16">
          <div className="max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="flex items-center gap-2 text-emerald-500 mb-6 font-black uppercase text-[10px] tracking-widest">
              <Terminal size={14} /> Core / {activeTab}
            </div>

            <h2 className="text-4xl font-black text-white uppercase italic mb-6 leading-none">
              {activeTab}
            </h2>

            <p className="text-xl text-slate-400 font-medium italic leading-relaxed mb-10">
              {currentContent.description}
            </p>

            {/* Dynamic Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
              {currentContent.stats.map((stat: any, i: number) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-6 flex items-center gap-4">
                  <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500">
                    <stat.icon size={24} />
                  </div>
                  <div>
                    <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{stat.label}</p>
                    <p className="text-lg font-black text-white italic">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Shared Component Diagram */}
            <ArchitectureDiagram type={currentContent.diagramType} />

            <div className="space-y-8 mt-12">
              <h3 className="text-2xl font-black text-white uppercase italic">Technical Specifications</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="p-8 bg-black/40 border border-white/5 rounded-[2rem] space-y-4">
                  <div className="flex items-center gap-2 text-emerald-500 text-[10px] font-black uppercase">
                    <Cpu size={16} /> Compute Cluster
                  </div>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    Nodes are deployed across 3 availability zones (AZs) using a globally distributed control plane. 
                    Traffic is routed via Anycast IP for minimal handover latency.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </article>
      </div>

      <Footer />
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </main>
  );
}
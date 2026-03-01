// app/hirex/talent-nodes/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  Network, Users, Zap, Globe, Cpu, Database, 
  Layers, Code2, BrainCircuit, Activity, 
  ChevronRight, ArrowUpRight, Share2, Server
} from 'lucide-react';

const TALENT_CLUSTERS = [
  {
    id: "node-frontend-core",
    name: "Frontend UI/UX Core",
    tech: ["React.js", "Next.js", "Tailwind", "TypeScript"],
    activeDevs: "12.4k",
    avgLogic: "86%",
    status: "Highly Active",
    icon: Code2,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
  },
  {
    id: "node-backend-dist",
    name: "Distributed Backend",
    tech: ["Node.js", "Go", "TiDB", "Redis"],
    activeDevs: "8.2k",
    avgLogic: "91%",
    status: "Stable",
    icon: Server,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]"
  },
  {
    id: "node-ai-generative",
    name: "Generative AI & LLM",
    tech: ["Python", "Gemini API", "PyTorch", "LangChain"],
    activeDevs: "4.1k",
    avgLogic: "94%",
    status: "Surging Demand",
    icon: BrainCircuit,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
  },
  {
    id: "node-cloud-infra",
    name: "Cloud & DevOps",
    tech: ["AWS", "Docker", "Kubernetes", "Terraform"],
    activeDevs: "6.5k",
    avgLogic: "89%",
    status: "Active",
    icon: Layers,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]"
  }
];

export default function TalentNodesPage() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-cyan-500/30 font-sans">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full md:w-[900px] h-[500px] md:h-[900px] bg-blue-600/5 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-full md:w-[700px] h-[400px] md:h-[700px] bg-cyan-600/5 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
        <div className="absolute left-1/3 top-0 w-px h-full bg-gradient-to-b from-transparent via-purple-500/20 to-transparent" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-40 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <Network className="w-3.5 h-3.5 md:w-4 md:h-4 animate-pulse" /> Distributed Talent Clusters
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-tight">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Talent Nodes</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Access hyper-verified candidate clusters mapped by artificial intelligence. Instantly connect your enterprise pipeline to specific engineering nodes.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            {[
              { title: "Total Verified Nodes", value: "31.2k", icon: Users, color: "text-blue-400" },
              { title: "Active Connections", value: "8,402", icon: Share2, color: "text-cyan-400" },
              { title: "AI Sync Latency", value: "14ms", icon: Activity, color: "text-emerald-400" },
              { title: "Global Pods", value: "12", icon: Globe, color: "text-purple-400" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-2xl md:rounded-[2rem] flex flex-col items-center justify-center text-center shadow-lg transition-transform hover:-translate-y-1">
                <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color} mb-3`} />
                <h3 className="text-2xl md:text-3xl font-black text-white">{stat.value}</h3>
                <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-500 mt-1">{stat.title}</p>
              </div>
            ))}
          </div>

          {/* Active Nodes Grid */}
          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Database className="w-5 h-5 text-slate-400" /> Active Infrastructure Nodes
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
              {TALENT_CLUSTERS.map((node) => (
                <div 
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  className={`group relative bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2rem] transition-all duration-300 hover:-translate-y-2 hover:border-white/20 cursor-pointer ${node.glow} overflow-hidden`}
                >
                  {/* Dynamic background glow based on hover */}
                  <div className={`absolute top-0 right-0 w-32 h-32 ${node.bg} blur-3xl rounded-full transition-opacity duration-500 ${activeNode === node.id ? 'opacity-100' : 'opacity-0'}`} />

                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${node.bg} border ${node.border} flex items-center justify-center shrink-0`}>
                        <node.icon className={`w-6 h-6 md:w-7 md:h-7 ${node.color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-white transition-colors">{node.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="relative flex h-2 w-2">
                            {node.status === "Surging Demand" && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${node.status === "Stable" ? "bg-emerald-500" : node.status === "Surging Demand" ? "bg-orange-500" : "bg-blue-500"}`}></span>
                          </span>
                          <span className="text-[10px] md:text-xs font-mono text-slate-400 uppercase tracking-wider">{node.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <div className="bg-black/40 border border-white/5 px-3 py-2 rounded-xl text-center">
                        <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">Devs</p>
                        <p className="text-sm font-black text-white">{node.activeDevs}</p>
                      </div>
                      <div className="bg-black/40 border border-white/5 px-3 py-2 rounded-xl text-center">
                        <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider">AI Avg</p>
                        <p className={`text-sm font-black ${node.color}`}>{node.avgLogic}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10">
                    <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Indexed Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {node.tech.map(t => (
                        <span key={t} className="px-3 py-1.5 bg-white/[0.03] border border-white/10 text-slate-300 text-[11px] md:text-xs font-medium rounded-lg group-hover:bg-white/[0.08] transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex items-center justify-between relative z-10">
                    <span className="text-xs font-medium text-slate-500">ID: {node.id}</span>
                    <button className={`inline-flex items-center gap-1.5 text-sm font-bold ${node.color} hover:text-white transition-colors`}>
                      Sync with Node <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visualization / Connect CTA Area */}
          <div className="mt-16 md:mt-24 bg-gradient-to-r from-slate-900 to-[#0b0f1f] border border-white/10 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 text-center shadow-2xl relative overflow-hidden flex flex-col items-center justify-center">
            
            {/* Abstract Node Visual */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
               <div className="w-[300px] h-[300px] rounded-full border border-cyan-500/30 absolute animate-[spin_10s_linear_infinite]" />
               <div className="w-[450px] h-[450px] rounded-full border border-blue-500/20 absolute animate-[spin_15s_linear_infinite_reverse]" />
               <div className="w-[600px] h-[600px] rounded-full border border-purple-500/10 absolute animate-[spin_20s_linear_infinite]" />
            </div>

            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-cyan-500/20 border border-cyan-500/40 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                <Cpu className="w-8 h-8 text-cyan-400" />
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
                Initialize <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Custom Sourcing</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-lg mb-8 leading-relaxed">
                Need a specialized cluster? Our autonomous AI agent can scan, verify, and map a completely new talent node based on your exact enterprise requirements.
              </p>
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2">
                  <Zap className="w-5 h-5" /> Deploy AI Recruiter
                </button>
                <button className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2">
                   View Node API <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
            
          </div>

        </div>
      </div>

      <Footer />

    </main>
  );
}
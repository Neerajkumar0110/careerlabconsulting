// app/hirex/talent-nodes/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  Network, Users, Zap, Globe, Cpu, Database, 
  Layers, Code2, BrainCircuit, Activity, 
  ChevronRight, ArrowUpRight, Share2, Server,
  GitBranch, CheckCircle2, ShieldCheck, Blocks,
  MessageSquare, Star,
  Link,
  Building2
} from 'lucide-react';

const ADMIN_WHATSAPP = "918700236923";

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

const EMERGING_CLUSTERS = [
  { name: "Spatial Computing", tech: "VisionOS, Unity, Three.js", color: "text-pink-400", bg: "bg-pink-500/10" },
  { name: "Quantum Algorithms", tech: "Qiskit, Cirq, Python", color: "text-indigo-400", bg: "bg-indigo-500/10" },
  { name: "Web3 Infrastructure", tech: "Rust, Solidity, Ethereum", color: "text-orange-400", bg: "bg-orange-500/10" }
];

export default function TalentNodesPage() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const handleRequestNode = (nodeName: string) => {
    const text = encodeURIComponent(`Hi, I'm interested in syncing our enterprise pipeline with the *${nodeName}* talent node on HireX.`);
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${text}`, '_blank');
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-cyan-500/30 font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full md:w-[900px] h-[500px] md:h-[900px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-full md:w-[700px] h-[400px] md:h-[700px] bg-cyan-600/10 blur-[150px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-2/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* HEADER SECTION */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <Network className="w-3.5 h-3.5 md:w-4 md:h-4 animate-pulse" /> Distributed Talent Clusters
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Talent Nodes</span>
            </h1>
            <p className="text-base md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Access hyper-verified candidate clusters mapped by artificial intelligence. Instantly connect your enterprise pipeline to specific engineering domains.
            </p>
          </div>

          {/* STATS GRID */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-28 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
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

          {/* NEW SECTION 1: The Node Verification Protocol */}
          <section className="mb-20 md:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Verification Protocol</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">How raw talent is filtered, tested, and mapped to a specialized node.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-purple-500/20 -translate-y-1/2 z-0"></div>
              
              {[
                { title: "Skill Ingestion", desc: "AI scans GitHub and previous projects to identify core competencies.", icon: GitBranch, color: "blue" },
                { title: "Autonomous Testing", desc: "Candidate is routed to a dynamic AI sandbox tailored to their specific domain.", icon: BrainCircuit, color: "cyan" },
                { title: "Node Assignment", desc: "Upon passing the threshold, the candidate is locked into a searchable talent node.", icon: Blocks, color: "purple" }
              ].map((step, i) => (
                <div key={i} className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-3xl p-8 text-center relative z-10 hover:-translate-y-2 transition-transform duration-300">
                  <div className={`w-16 h-16 mx-auto bg-${step.color}-500/10 rounded-2xl border border-${step.color}-500/30 flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(var(--tw-colors-${step.color}-500),0.2)]`}>
                    <step.icon className={`w-8 h-8 text-${step.color}-400`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">Step 0{i+1}: {step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ACTIVE NODES GRID (Existing feature, styled up) */}
          <div className="mb-20 md:mb-28">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <Database className="w-6 h-6 md:w-8 md:h-8 text-cyan-400" /> Active Infrastructure Nodes
                </h2>
                <p className="text-slate-400 text-sm md:text-base">Tap into pre-vetted, production-ready engineering clusters.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {TALENT_CLUSTERS.map((node) => (
                <div 
                  key={node.id}
                  onMouseEnter={() => setActiveNode(node.id)}
                  onMouseLeave={() => setActiveNode(null)}
                  className={`group relative bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-6 md:p-8 rounded-[2rem] transition-all duration-300 hover:-translate-y-1 hover:border-white/20 cursor-pointer ${node.glow} overflow-hidden`}
                >
                  <div className={`absolute top-0 right-0 w-48 h-48 ${node.bg} blur-[80px] rounded-full transition-opacity duration-500 ${activeNode === node.id ? 'opacity-100' : 'opacity-0'}`} />

                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8 relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl ${node.bg} border ${node.border} flex items-center justify-center shrink-0`}>
                        <node.icon className={`w-7 h-7 md:w-8 md:h-8 ${node.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors">{node.name}</h3>
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="relative flex h-2 w-2">
                            {node.status === "Surging Demand" && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />}
                            <span className={`relative inline-flex rounded-full h-2 w-2 ${node.status === "Stable" ? "bg-emerald-500" : node.status === "Surging Demand" ? "bg-orange-500" : "bg-blue-500"}`}></span>
                          </span>
                          <span className="text-[10px] md:text-xs font-mono text-slate-400 uppercase tracking-wider">{node.status}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <div className="bg-black/40 border border-white/5 px-3 md:px-4 py-2 md:py-3 rounded-xl text-center">
                        <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Devs</p>
                        <p className="text-sm md:text-base font-black text-white">{node.activeDevs}</p>
                      </div>
                      <div className="bg-black/40 border border-white/5 px-3 md:px-4 py-2 md:py-3 rounded-xl text-center">
                        <p className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">AI Avg</p>
                        <p className={`text-sm md:text-base font-black ${node.color}`}>{node.avgLogic}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 relative z-10">
                    <p className="text-[10px] md:text-xs uppercase font-bold text-slate-500 tracking-wider">Indexed Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {node.tech.map(t => (
                        <span key={t} className="px-3 py-1.5 bg-white/[0.03] border border-white/10 text-slate-300 text-[11px] md:text-xs font-medium rounded-lg group-hover:bg-white/[0.08] transition-colors">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                    <span className="text-xs font-medium text-slate-500">Node ID: {node.id}</span>
                    <button 
                      onClick={() => handleRequestNode(node.name)}
                      className={`w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-sm font-bold ${node.color} hover:text-white transition-all`}
                    >
                      Sync Pipeline <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NEW SECTION 2: Deep Dive (Zero-Noise Sourcing) */}
          <section className="mb-20 md:mb-28">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden flex flex-col lg:flex-row items-center gap-12 shadow-2xl">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-6">
                  <ShieldCheck className="w-4 h-4" /> Enterprise Grade
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Zero-Noise Sourcing. <br/>Pure Technical Signal.</h2>
                <p className="text-slate-400 mb-8 leading-relaxed text-base md:text-lg">
                  Every candidate inside a Talent Node has already passed our grueling autonomous evaluations. Skip the resume screening and connect directly with verified engineers.
                </p>
                <ul className="space-y-5">
                  <li className="flex items-center gap-4 text-slate-300 font-medium">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-blue-400" />
                    </div>
                    Pre-evaluated System Design capabilities
                  </li>
                  <li className="flex items-center gap-4 text-slate-300 font-medium">
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-purple-400" />
                    </div>
                    Verified GitHub impact and clean-code scores
                  </li>
                  <li className="flex items-center gap-4 text-slate-300 font-medium">
                    <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    </div>
                    Identity-blind, unbiased technical metrics
                  </li>
                </ul>
              </div>
              <div className="lg:w-1/2 w-full">
                <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden border border-white/10 group shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                  <div className="absolute inset-0 bg-blue-900/20 mix-blend-overlay group-hover:bg-transparent transition-colors duration-500 z-10"></div>
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Cyber Security Network"
                    className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  {/* Floating Stat Card inside Image */}
                  <div className="absolute bottom-6 left-6 z-20 bg-black/60 backdrop-blur-md border border-white/10 p-4 rounded-2xl">
                    <p className="text-[10px] text-emerald-400 font-mono uppercase tracking-wider mb-1">Signal-to-Noise Ratio</p>
                    <p className="text-2xl font-black text-white">99.8%</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* NEW SECTION 3: Emerging Clusters */}
          <section className="mb-20 md:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Initializing Next-Gen Nodes</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Our AI is currently mapping and evaluating talent in emerging technology sectors. Reserve early access.</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {EMERGING_CLUSTERS.map((cluster, i) => (
                <div key={i} className={`bg-slate-900/40 border border-white/5 p-6 md:p-8 rounded-3xl text-center relative overflow-hidden group`}>
                  <div className="absolute top-4 right-4 flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-slate-500"></span>
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">Syncing</span>
                  </div>
                  
                  <div className={`w-14 h-14 mx-auto rounded-full ${cluster.bg} flex items-center justify-center mb-6`}>
                    <Activity className={`w-6 h-6 ${cluster.color}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{cluster.name}</h3>
                  <p className="text-xs text-slate-400 font-mono bg-black/30 py-2 rounded-lg border border-white/5">{cluster.tech}</p>
                </div>
              ))}
            </div>
          </section>

          {/* NEW SECTION 4: Enterprise Trust */}
          <section className="mb-20 md:mb-28 text-center">
            <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-8">Powering pipelines for industry leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-8 sm:gap-16 opacity-50 grayscale">
              <div className="flex items-center gap-2 font-black text-xl text-white"><Zap className="text-blue-400"/> TechFlow</div>
              <div className="flex items-center gap-2 font-black text-xl text-white"><Server className="text-emerald-400"/> NexusNet</div>
              <div className="flex items-center gap-2 font-black text-xl text-white"><ShieldCheck className="text-purple-400"/> SecureAI</div>
              <div className="flex items-center gap-2 font-black text-xl text-white"><Building2 className="text-cyan-400"/> CloudCore</div>
            </div>
          </section>

          <section>
            <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-[2.5rem] p-8 md:p-16 text-center shadow-[0_0_50px_rgba(34,211,238,0.15)] relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
              
              <div className="relative z-10 max-w-3xl mx-auto">
                <div className="w-20 h-20 bg-cyan-500/20 border border-cyan-500/40 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_30px_rgba(34,211,238,0.3)]">
                  <Cpu className="w-10 h-10 text-cyan-400" />
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Deploy a <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Custom Node</span>
                </h2>
                <p className="text-slate-300 text-base md:text-lg mb-10 leading-relaxed">
                  Need a specialized team? Define your exact tech stack, seniority, and grading rubrics. Our AI will automatically verify and pool matching candidates into a private node for your enterprise.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => handleRequestNode("Custom Bespoke")}
                    className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-black rounded-2xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] flex items-center justify-center gap-3 hover:-translate-y-1"
                  >
                    <MessageSquare className="w-5 h-5" /> Request via WhatsApp
                  </button>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>

      <Footer />

    </main>
  );
}
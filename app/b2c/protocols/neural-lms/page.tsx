'use client';

import React, { useState, useEffect } from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { 
  Cpu, 
  Brain, 
  Bot, 
  Zap, 
  ShieldAlert, 
  Network, 
  Activity,
  ChevronRight,
  Terminal,
  Search,
  Sparkles
} from 'lucide-react';

export default function NeuralLMS() {
  const [aiStatus, setAiStatus] = useState('ANALYZING_COGNITIVE_LOAD');
  const [progress, setProgress] = useState(0);

  // AI Processing Simulation Effect
  useEffect(() => {
    const statuses = ['MAPPING_SKILL_GRAPH', 'OPTIMIZING_CONTENT_NODES', 'NEURAL_SYNC_ACTIVE', 'ANALYZING_COGNITIVE_LOAD'];
    const interval = setInterval(() => {
      setAiStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      setProgress(Math.floor(Math.random() * 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <B2CHeader />

      {/* --- HERO SECTION: THE AI BRAIN --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
              <Bot className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Autonomous AI Agent Protocol v2.0</span>
            </div>

            <h1 className="text-5xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8] mb-4">
              NEURAL <span className="text-blue-600">LMS</span>
            </h1>
            
            <p className="text-slate-400 text-base md:text-xl max-w-3xl mx-auto font-medium leading-relaxed">
              Experience an Autonomous Learning Engine that evolves with your brain. Powered by Gemini-1.5-Pro to personalize every micro-module.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button className="px-8 py-4 bg-blue-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]">
                Initialize Neural Sync
              </button>
              <button className="px-8 py-4 border border-white/10 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all">
                View Documentation
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- AUTONOMOUS STATUS DASHBOARD --- */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto bg-[#050814] border border-white/5 rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Network size={200} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            {/* Left: AI Terminal */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                  <Terminal size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-black uppercase italic">AI Autonomous Agent</h3>
                  <p className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase">● System Operational</p>
                </div>
              </div>

              <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-[11px] md:text-sm text-blue-400/80 space-y-2">
                <p className="flex gap-2"><span>{'>'}</span> <span className="text-slate-500 italic">Initializing Gemini-v1.5 API...</span></p>
                <p className="flex gap-2"><span>{'>'}</span> <span>Fetching cognitive weights for user_session_882</span></p>
                <p className="flex gap-2 text-white"><span>{'>'}</span> <span className="animate-pulse">STATUS: {aiStatus}</span></p>
                <div className="w-full bg-white/5 h-1.5 rounded-full mt-4 overflow-hidden">
                   <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                 {[
                   { label: 'Neural Nodes', val: '1.2M+', icon: <Network size={14}/> },
                   { label: 'Latency', val: '42ms', icon: <Zap size={14}/> },
                   { label: 'Cognitive IQ', val: '148', icon: <Brain size={14}/> }
                 ].map((stat, i) => (
                   <div key={i} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5">
                      <div className="text-slate-500 mb-1">{stat.icon}</div>
                      <div className="text-lg font-black">{stat.val}</div>
                      <div className="text-[8px] text-slate-500 uppercase font-bold tracking-widest">{stat.label}</div>
                   </div>
                 ))}
              </div>
            </div>

            {/* Right: AI "Thought" Cards */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
              <div className="p-6 bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20 rounded-[2rem] hover:scale-[1.02] transition-transform">
                <Sparkles className="text-blue-500 mb-4" size={24} />
                <h4 className="text-lg font-black uppercase italic mb-2">Self-Evolving Modules</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">The Agent identifies your weak areas in Web3/AI and auto-generates custom practice labs to fill the gap.</p>
              </div>
              <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:scale-[1.02] transition-transform">
                <Search className="text-slate-400 mb-4" size={24} />
                <h4 className="text-lg font-black uppercase italic mb-2">Real-time Research</h4>
                <p className="text-xs text-slate-400 leading-relaxed font-medium">Auto-scrapes the latest ArXiv papers to ensure your learning is never more than 24 hours behind industry tech.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURE SECTION: BENTO GRID --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
         <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="md:col-span-2 bg-white/[0.03] border border-white/5 p-8 rounded-[3rem] min-h-[300px] flex flex-col justify-between group">
               <Cpu size={40} className="text-blue-600 group-hover:rotate-12 transition-transform" />
               <div>
                  <h3 className="text-3xl font-black uppercase italic mb-4">Autonomous <br /> Grade Engine</h3>
                  <p className="text-sm text-slate-500 font-medium">Your code is analyzed for logic, efficiency, and security by a fleet of AI reviewers.</p>
               </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[3rem] flex flex-col items-center text-center justify-center">
               <Activity className="text-emerald-500 mb-4 animate-bounce" />
               <h3 className="text-xl font-black uppercase italic">Live Sync</h3>
               <p className="text-[10px] text-slate-400 mt-2">Connecting your neural state to the global ledger.</p>
            </div>
            <div className="bg-blue-600 p-8 rounded-[3rem] flex flex-col justify-between text-white">
               <div className="flex justify-between items-start">
                  <ShieldAlert size={32} />
                  <ChevronRight size={20} />
               </div>
               <h3 className="text-xl font-black uppercase italic">Anti-Cheat <br /> Protocol</h3>
            </div>
         </div>
      </section>

      <Footer />
    </main>
  );
}
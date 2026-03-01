// app/hirex/global-sync/page.tsx

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  Globe, RefreshCw, Database, Server, 
  Link as LinkIcon, Activity, Zap, CheckCircle2, 
  Terminal, Webhook, ArrowRight, ShieldCheck,
  Layers, MessageSquare, Briefcase
} from 'lucide-react';

const INTEGRATIONS = [
  {
    id: "int-workday",
    name: "Workday Enterprise",
    category: "HRIS",
    status: "Synced",
    latency: "12ms",
    icon: Database,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30"
  },
  {
    id: "int-greenhouse",
    name: "Greenhouse",
    category: "ATS Gateway",
    status: "Active Webhook",
    latency: "8ms",
    icon: Layers,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30"
  },
  {
    id: "int-slack",
    name: "Slack Connect",
    category: "Communications",
    status: "Real-time",
    latency: "4ms",
    icon: MessageSquare,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30"
  },
  {
    id: "int-tidb",
    name: "TiDB Serverless",
    category: "Global State",
    status: "Primary Core",
    latency: "2ms",
    icon: Server,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30"
  }
];

const SYNC_LOGS = [
  { time: "00:00:01", action: "PUSH", target: "Greenhouse API", payload: "Candidate HX-9921 360° Report", status: "200 OK" },
  { time: "00:00:04", action: "PULL", target: "Workday HRIS", payload: "New Role Req: S-Tier Architect", status: "200 OK" },
  { time: "00:00:08", action: "SYNC", target: "TiDB US-East", payload: "Neural Ledger Ledger State", status: "Replicated" },
  { time: "00:00:12", action: "ALERT", target: "Slack (#hiring)", payload: "Sneha Iyer Fast-Tracked (97%)", status: "Delivered" },
  { time: "00:00:15", action: "PUSH", target: "Lever ATS", payload: "AI Interview Transcript Hash", status: "201 Created" }
];

export default function GlobalSyncPage() {
  const [activeLog, setActiveLog] = useState(0);

  // Simulate live log scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLog((prev) => (prev + 1) % SYNC_LOGS.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30 font-sans">
      
      {/* Immersive Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-1/3 w-[600px] md:w-[900px] h-[500px] md:h-[900px] bg-blue-600/5 blur-[120px] rounded-full -translate-y-1/4" />
        <div className="absolute bottom-0 left-1/3 w-[500px] md:w-[700px] h-[400px] md:h-[700px] bg-emerald-600/5 blur-[120px] rounded-full translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <RefreshCw className="w-3.5 h-3.5 md:w-4 md:h-4 animate-spin-slow" /> Cross-Platform Telemetry
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Data Sync</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              HireX doesn't live in a silo. Instantly synchronize AI assessment scores, candidate neural ledgers, and job requisitions directly with your existing enterprise ATS and HRIS infrastructure.
            </p>
          </div>

          {/* Integration Radar/Visualizer */}
          <div className="relative w-full max-w-4xl mx-auto mb-16 md:mb-24 h-[300px] md:h-[400px] flex items-center justify-center animate-in zoom-in duration-700">
            {/* Center Core */}
            <div className="relative z-20 w-24 h-24 md:w-32 md:h-32 bg-slate-900 border border-blue-500/50 rounded-3xl flex items-center justify-center shadow-[0_0_50px_rgba(59,130,246,0.3)]">
              <Zap className="w-10 h-10 md:w-14 md:h-14 text-blue-400" />
            </div>

            {/* Pulsing Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[200px] md:w-[300px] h-[200px] md:h-[300px] border border-blue-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
              <div className="absolute w-[300px] md:w-[500px] h-[300px] md:h-[500px] border border-emerald-500/10 rounded-full" />
              <div className="absolute w-[400px] md:w-[700px] h-[400px] md:h-[700px] border border-purple-500/5 rounded-full" />
            </div>

            {/* Orbiting Satellites (Simulated via positioning) */}
            <div className="absolute top-10 left-10 md:top-20 md:left-20 bg-slate-900/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-3">
              <Briefcase className="w-5 h-5 text-emerald-400" />
              <span className="text-xs font-bold hidden md:block">ATS System</span>
            </div>
            <div className="absolute bottom-10 right-10 md:bottom-20 md:right-20 bg-slate-900/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-purple-400" />
              <span className="text-xs font-bold hidden md:block">Slack/Teams</span>
            </div>
            <div className="absolute top-1/2 right-4 md:right-10 -translate-y-1/2 bg-slate-900/80 backdrop-blur-md border border-white/10 p-3 rounded-2xl flex items-center gap-3">
              <Database className="w-5 h-5 text-blue-400" />
              <span className="text-xs font-bold hidden md:block">HRIS Core</span>
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Active Integration Nodes */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <Webhook className="text-blue-400 w-6 h-6" /> Integration Gateways
                </h2>
                <span className="text-xs font-mono bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Live
                </span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {INTEGRATIONS.map((int) => (
                  <div key={int.id} className={`bg-slate-900/40 backdrop-blur-md border border-white/10 p-5 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:${int.border} group`}>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-xl ${int.bg} border border-white/5 flex items-center justify-center`}>
                        <int.icon className={`w-6 h-6 ${int.color}`} />
                      </div>
                      <div className="text-right">
                        <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-1">Latency</p>
                        <p className="text-xs font-bold text-white font-mono">{int.latency}</p>
                      </div>
                    </div>
                    <h3 className="font-bold text-lg text-white mb-1 group-hover:text-blue-300 transition-colors">{int.name}</h3>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/5">
                      <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{int.category}</span>
                      <span className={`text-[10px] font-bold px-2 py-1 rounded-md bg-white/5 ${int.color}`}>
                        {int.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Live Terminal Feed */}
            <div className="lg:col-span-5">
              <div className="bg-[#0b0f1f]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col h-full min-h-[400px] overflow-hidden lg:sticky lg:top-32">
                
                <div className="bg-black/60 px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Terminal className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-mono text-slate-300 uppercase tracking-widest">Global_Webhooks.log</span>
                  </div>
                  <LinkIcon className="w-4 h-4 text-emerald-500" />
                </div>

                <div className="p-5 space-y-4 font-mono text-xs md:text-sm">
                  {SYNC_LOGS.map((log, idx) => (
                    <div 
                      key={idx} 
                      className={`flex flex-col gap-1.5 p-3 rounded-lg border transition-all duration-500 ${
                        idx === activeLog 
                        ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' 
                        : 'bg-transparent border-transparent opacity-50'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] md:text-xs">
                        <span className="text-slate-500">[{log.time}]</span>
                        <span className={`${log.action === 'PUSH' ? 'text-purple-400' : log.action === 'PULL' ? 'text-blue-400' : log.action === 'ALERT' ? 'text-yellow-400' : 'text-emerald-400'}`}>
                          {log.action}
                        </span>
                      </div>
                      <p className="text-slate-300">
                        <span className="text-slate-500 mr-2">&gt;</span>
                        {log.target}: <span className="text-white">{log.payload}</span>
                      </p>
                      <p className={`text-[10px] text-right mt-1 ${log.status.includes('20') || log.status === 'Delivered' || log.status === 'Replicated' ? 'text-emerald-500' : 'text-slate-500'}`}>
                        {log.status}
                      </p>
                    </div>
                  ))}
                </div>

              </div>
            </div>

          </div>

          {/* Enterprise Connect CTA */}
          <div className="mt-16 md:mt-24 max-w-5xl mx-auto p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-blue-900/40 to-slate-900/60 border border-blue-500/20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500/20 text-blue-400 rounded-xl mb-4 border border-blue-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Connect Your Infrastructure</h3>
              <p className="text-slate-400 text-sm md:text-base max-w-md">
                Generate API keys to establish a secure, two-way sync with your enterprise systems. Full documentation available.
              </p>
            </div>

            <div className="relative z-10 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2">
                Generate Keys <Zap className="w-4 h-4" />
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2">
                View API Docs <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>

      <Footer />

      <style jsx global>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </main>
  );
}
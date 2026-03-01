// app/hirex/neural-ledger/page.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Search, ShieldAlert, CheckCircle2, 
  Cpu, Database, Lock, Activity, Zap, Terminal, 
  Globe, BrainCircuit, Loader2, Server, Eye, Fingerprint, History
} from 'lucide-react';

interface LedgerLog {
  id: string;
  hash: string;
  timestamp: string;
  type: "AI_EVALUATION" | "SECURITY_PROTOCOL" | "MATRIX_GENERATION";
  candidate: string;
  role: string;
  action: string;
  status: "success" | "warning" | "critical";
  score: number | null;
  aiNotes: string;
}

const GENESIS_LOGS: LedgerLog[] = [
  {
    id: "NL-GENESIS-01",
    hash: "0x0000000000000000",
    timestamp: new Date().toLocaleTimeString(),
    type: "MATRIX_GENERATION",
    candidate: "System Core",
    role: "Infrastructure",
    action: "HireX Neural Ledger Initialized. Awaiting AI connections.",
    status: "success",
    score: null,
    aiNotes: "System booted securely. Distributed SQL and Gemini 2.5 Flash API connected. Encrypted tunnel established."
  }
];

export default function NeuralLedgerPage() {
  const [logs, setLogs] = useState<LedgerLog[]>(GENESIS_LOGS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const logsEndRef = useRef<HTMLDivElement>(null);

  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const generateAILog = async () => {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      alert("Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env file!");
      return;
    }

    setIsGenerating(true);
    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-flash",
        generationConfig: { responseMimeType: "application/json" }
      });

      const prompt = `You are the core AI engine of HireX, an autonomous technical hiring platform. 
      Generate a single, highly detailed, realistic audit log entry for a hypothetical candidate.
      
      Return ONLY a valid JSON object with the following exact keys:
      {
        "candidate": "Realistic Indian Full Name",
        "role": "Modern tech role (e.g., Node.js Architect)",
        "type": "Choose one: AI_EVALUATION, SECURITY_PROTOCOL, or MATRIX_GENERATION",
        "action": "A short 1-sentence technical summary",
        "status": "Choose one: success, warning, or critical",
        "score": "A number between 50 and 99 (or null if it's a security warning)",
        "aiNotes": "A 1-sentence technical observation."
      }`;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      const rawData = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());

      const newLog: LedgerLog = {
        id: `NL-${Math.floor(Math.random() * 90000) + 10000}-${rawData.type.charAt(0)}`,
        hash: `0x${Math.random().toString(16).substring(2, 10)}...${Math.random().toString(16).substring(2, 6)}`,
        timestamp: new Date().toLocaleTimeString(),
        ...rawData
      };

      setLogs(prev => [...prev, newLog]);

    } catch (error) {
      console.error("AI Generation Error:", error);
      alert("Failed to generate log from Gemini. Check console.");
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredLogs = logs.filter(log => 
    log.candidate.toLowerCase().includes(searchQuery.toLowerCase()) || 
    log.hash.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'success': return { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" };
      case 'warning': return { icon: ShieldAlert, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20" };
      case 'critical': return { icon: Lock, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20" };
      default: return { icon: Activity, color: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" };
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-purple-500/30 font-sans">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-purple-600/5 blur-[100px] md:blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-cyan-600/5 blur-[100px] md:blur-[150px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-40 pb-16 md:pt-36 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <Eye className="w-3.5 h-3.5 md:w-4 md:h-4 animate-pulse" /> Live Audit Trail
            </div>
            <h1 className="text-3xl md:text-6xl lg:text-7xl font-black tracking-tight mb-4 leading-tight">
              Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">Ledger</span>
            </h1>
            <p className="text-sm md:text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Cryptographically secure, real-time transparency powered by <span className="text-white font-semibold">Gemini 2.5 Flash</span>. Monitor every AI decision and security flag instantly.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start">
            
            <div className="lg:col-span-4 space-y-4 md:space-y-6 lg:sticky lg:top-28">
              
              <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -right-6 -top-6 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <h2 className="text-lg md:text-xl font-bold mb-2 flex items-center gap-2">
                  <Cpu className="w-5 h-5 text-purple-400" /> AI Engine Control
                </h2>
                <p className="text-xs md:text-sm text-slate-400 mb-6 leading-relaxed">
                  Initialize the Gemini model to simulate a real-time candidate evaluation log on the blockchain.
                </p>
                
                <button 
                  onClick={generateAILog}
                  disabled={isGenerating}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-3.5 md:py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <><Loader2 className="w-4 h-4 md:w-5 md:h-5 animate-spin" /> Simulating...</>
                  ) : (
                    <><Zap className="w-4 h-4 md:w-5 md:h-5" /> Generate Live Log</>
                  )}
                </button>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-2 gap-3 md:gap-4">
                <div className="bg-slate-900/40 border border-white/5 p-4 md:p-5 rounded-2xl flex flex-col justify-center">
                  <Activity className="w-4 h-4 md:w-5 md:h-5 text-emerald-400 mb-2" />
                  <p className="text-xl md:text-2xl font-black text-white">{logs.length}</p>
                  <p className="text-[9px] md:text-[10px] uppercase text-slate-500 font-bold tracking-widest mt-1">Total Blocks</p>
                </div>
                <div className="bg-slate-900/40 border border-white/5 p-4 md:p-5 rounded-2xl flex flex-col justify-center">
                  <Server className="w-4 h-4 md:w-5 md:h-5 text-cyan-400 mb-2" />
                  <p className="text-xl md:text-2xl font-black text-white">42<span className="text-sm font-medium text-slate-500 ml-0.5">ms</span></p>
                  <p className="text-[9px] md:text-[10px] uppercase text-slate-500 font-bold tracking-widest mt-1">API Latency</p>
                </div>
              </div>

              {/* Search */}
              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search hashes..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-black/40 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-xs md:text-sm text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-600"
                />
              </div>

            </div>

            {/* Right Side: The Live Ledger Terminal */}
            <div className="lg:col-span-8 bg-[#0b0f1f]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col h-[600px] md:h-[750px] overflow-hidden">
              
              {/* Terminal Header */}
              <div className="bg-black/60 px-4 md:px-6 py-3 md:py-4 border-b border-white/10 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-red-500/50" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/50" />
                  </div>
                  <span className="text-[10px] md:text-xs font-mono text-slate-400 ml-2 uppercase tracking-widest">Live_Terminal_Stream</span>
                </div>
                <div className="flex items-center gap-2 px-2 py-1 bg-red-500/10 rounded-md border border-red-500/20">
                  <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[9px] md:text-[10px] font-mono text-red-400 uppercase font-bold tracking-widest">Rec</span>
                </div>
              </div>

              {/* Log Feed */}
              <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 md:space-y-5 custom-scrollbar">
                {filteredLogs.length === 0 ? (
                   <div className="flex flex-col items-center justify-center h-full text-slate-500">
                      <Search className="w-8 h-8 mb-2 opacity-50" />
                      <p className="text-sm">No neural blocks found.</p>
                   </div>
                ) : (
                  filteredLogs.map((log) => {
                    const config = getStatusConfig(log.status);
                    return (
                      <div 
                        key={log.id} 
                        className={`group bg-black/40 border border-white/5 hover:border-white/10 p-4 md:p-6 rounded-[1.5rem] transition-all duration-300 animate-in slide-in-from-bottom-4 relative overflow-hidden`}
                      >
                        {/* Status Glow Line */}
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${config.bg} opacity-50 group-hover:opacity-100 transition-opacity`} />

                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                          
                          {/* Left: Hash & Meta */}
                          <div className="flex items-start gap-3 md:gap-4">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl ${config.bg} border ${config.border} flex items-center justify-center shrink-0`}>
                              <config.icon className={`w-5 h-5 md:w-6 md:h-6 ${config.color}`} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[9px] md:text-[10px] font-mono text-slate-500 flex items-center gap-1">
                                  <History className="w-3 h-3" /> {log.timestamp}
                                </span>
                                <span className={`text-[8px] md:text-[9px] px-2 py-0.5 rounded border font-mono tracking-wider uppercase ${config.bg} ${config.color} ${config.border}`}>
                                  {log.type}
                                </span>
                              </div>
                              <p className="text-xs md:text-sm font-mono text-purple-300 group-hover:text-purple-200 transition-colors flex items-center gap-1.5">
                                <Fingerprint className="w-3 h-3 opacity-50" /> {log.hash}
                              </p>
                            </div>
                          </div>

                          {/* Right: Score/Status */}
                          <div className="flex justify-between md:justify-end items-center md:items-start gap-3 w-full md:w-auto border-t border-white/5 pt-3 md:pt-0 md:border-none">
                             <p className="text-[10px] font-mono text-slate-600 block md:hidden">ID: {log.id}</p>
                            {log.score !== null ? (
                              <div className="flex flex-col items-end">
                                <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">AI Score</span>
                                <span className="text-xl md:text-2xl font-black text-white leading-none">{log.score}</span>
                              </div>
                            ) : (
                              <div className="flex flex-col items-end">
                                <span className="text-[9px] uppercase font-bold text-slate-500 tracking-wider mb-0.5">Flag Level</span>
                                <span className={`text-sm md:text-base font-black uppercase ${config.color} leading-none`}>{log.status}</span>
                              </div>
                            )}
                          </div>

                        </div>

                        {/* Mid: Event Details */}
                        <div className="grid md:grid-cols-2 gap-4 md:gap-6 bg-white/[0.02] rounded-xl p-3 md:p-4 mb-4 border border-white/5">
                          <div>
                            <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Target Subject</p>
                            <p className="text-sm font-bold text-white leading-snug">{log.candidate}</p>
                            <p className="text-xs text-slate-400">{log.role}</p>
                          </div>
                          <div>
                            <p className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Event Action</p>
                            <p className="text-sm text-slate-200 leading-snug">{log.action}</p>
                          </div>
                        </div>

                        {/* Bottom: AI Notes */}
                        <div className="flex items-start gap-2.5">
                          <BrainCircuit className="w-4 h-4 md:w-5 md:h-5 text-purple-400 shrink-0 mt-0.5" />
                          <p className="text-[11px] md:text-xs text-slate-400 font-mono leading-relaxed">
                            <span className="text-purple-400 font-bold">Neural_Note: </span> 
                            {log.aiNotes}
                          </p>
                        </div>

                      </div>
                    );
                  })
                )}
                <div ref={logsEndRef} className="h-4" />
              </div>

            </div>

          </div>
        </div>
      </div>

      <Footer />

      {/* Scoped CSS for Terminal Scrollbar */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(0,0,0,0.3);
          border-left: 1px solid rgba(255,255,255,0.05);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(168, 85, 247, 0.4);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(168, 85, 247, 0.8);
        }
      `}</style>
    </main>
  );
}
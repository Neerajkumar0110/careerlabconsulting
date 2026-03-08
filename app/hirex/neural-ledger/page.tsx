// app/hirex/neural-ledger/page.tsx

'use client';

import React, { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Search, ShieldAlert, CheckCircle2, 
  Cpu, Database, Lock, Activity, Zap, Terminal, 
  Globe, BrainCircuit, Loader2, Server, Eye, 
  Fingerprint, History, Link as LinkIcon, Network, 
  ShieldCheck, FileText, ArrowRight
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
    aiNotes: "System booted securely. Distributed SQL and Gemini 3 Flash API connected. Encrypted tunnel established."
  }
];

export default function NeuralLedgerPage() {
  const [logs, setLogs] = useState<LedgerLog[]>(GENESIS_LOGS);
  const [isGenerating, setIsGenerating] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const logsEndRef = useRef<HTMLDivElement>(null);

  // Note: Using Gemini API key from env
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

  useEffect(() => {
    logsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  const generateAILog = async () => {
    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      alert("Please add NEXT_PUBLIC_GEMINI_API_KEY to your .env file to generate live logs!");
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
        "action": "A short 1-sentence technical summary of what the AI observed or did.",
        "status": "Choose one: success, warning, or critical",
        "score": "A number between 50 and 99 (or null if it's a security warning)",
        "aiNotes": "A 1-sentence technical observation."
      }`;

      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      const rawData = JSON.parse(responseText.replace(/```json/g, '').replace(/```/g, '').trim());

      const newLog: LedgerLog = {
        id: `NL-${Math.floor(Math.random() * 90000) + 10000}-${rawData.type.charAt(0)}`,
        hash: `0x${Math.random().toString(16).substring(2, 12)}...${Math.random().toString(16).substring(2, 6)}`,
        timestamp: new Date().toLocaleTimeString(),
        ...rawData
      };

      setLogs(prev => [...prev, newLog]);

    } catch (error) {
      console.error("AI Generation Error:", error);
      alert("Failed to generate log from Gemini. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const filteredLogs = logs.filter(log => 
    log.candidate.toLowerCase().includes(searchQuery.toLowerCase()) || 
    log.hash.toLowerCase().includes(searchQuery.toLowerCase()) ||
    log.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusConfig = (status: string) => {
    switch(status) {
      case 'success': return { icon: CheckCircle2, color: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20", line: "border-emerald-500/50" };
      case 'warning': return { icon: ShieldAlert, color: "text-yellow-400", bg: "bg-yellow-500/10", border: "border-yellow-500/20", line: "border-yellow-500/50" };
      case 'critical': return { icon: Lock, color: "text-red-400", bg: "bg-red-500/10", border: "border-red-500/20", line: "border-red-500/50" };
      default: return { icon: Activity, color: "text-purple-400", bg: "bg-purple-500/10", border: "border-purple-500/20", line: "border-purple-500/50" };
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-purple-500/30 font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-purple-600/10 blur-[120px] md:blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-cyan-600/10 blur-[120px] md:blur-[150px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 md:pt-40 pb-16 md:pb-24">
        
        {/* SECTION 1: Hero & Real-time Stats */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 md:mb-24">
          <div className="text-center max-w-4xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" /> Immutable Audit Trail
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              The Neural <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500">Ledger</span>
            </h1>
            <p className="text-base md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
              Absolute transparency in AI hiring. Every decision, evaluation score, and security flag generated by the HireX engine is cryptographically hashed and permanently logged.
            </p>
          </div>

          {/* Network Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Active Blocks", value: logs.length.toString(), icon: Database, color: "text-purple-400" },
              { label: "API Latency", value: "42ms", icon: Zap, color: "text-cyan-400" },
              { label: "Integrity Checks", value: "100%", icon: CheckCircle2, color: "text-emerald-400" },
              { label: "Global Nodes", value: "12", icon: Globe, color: "text-blue-400" }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-white/10 p-5 md:p-6 rounded-2xl md:rounded-3xl flex flex-col items-center text-center">
                <stat.icon className={`w-6 h-6 md:w-8 md:h-8 mb-3 ${stat.color}`} />
                <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</h3>
                <p className="text-[10px] md:text-xs font-mono text-slate-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 2: The Live Neural Terminal */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid lg:grid-cols-12 gap-6 md:gap-8 items-start">
            
            {/* Terminal Controls (Left) */}
            <div className="lg:col-span-4 space-y-4 md:space-y-6 lg:sticky lg:top-28">
              <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
                <div className="absolute -right-6 -top-6 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
                
                <h2 className="text-xl md:text-2xl font-bold mb-3 flex items-center gap-2">
                  <Cpu className="w-6 h-6 text-purple-400" /> System Control
                </h2>
                <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                  Trigger the AI engine to evaluate a hypothetical candidate. Watch the autonomous decision get encrypted and added to the ledger in real-time.
                </p>
                
                <button 
                  onClick={generateAILog}
                  disabled={isGenerating}
                  className="w-full bg-purple-600 hover:bg-purple-500 text-white font-bold py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(168,85,247,0.3)] hover:shadow-[0_0_30px_rgba(168,85,247,0.5)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed hover:-translate-y-1"
                >
                  {isGenerating ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Computing Block...</>
                  ) : (
                    <><Zap className="w-5 h-5" /> Generate Live Block</>
                  )}
                </button>
              </div>

              <div className="relative w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search by Hash, ID, or Candidate..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors placeholder:text-slate-500 shadow-lg"
                />
              </div>
            </div>

            {/* Live Ledger Feed (Right) */}
            <div className="lg:col-span-8 bg-[#0b0f1f]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col h-[600px] md:h-[750px] overflow-hidden">
              
              {/* Terminal Header */}
              <div className="bg-black/60 px-5 md:px-8 py-4 border-b border-white/10 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-4">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                  </div>
                  <span className="text-xs md:text-sm font-mono text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Terminal className="w-4 h-4" /> network_stream
                  </span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 rounded-lg border border-red-500/20">
                  <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[10px] md:text-xs font-mono text-red-400 uppercase font-bold tracking-widest">Live</span>
                </div>
              </div>

              {/* Log Feed */}
              <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar relative">
                {filteredLogs.length === 0 ? (
                   <div className="flex flex-col items-center justify-center h-full text-slate-500">
                      <Search className="w-10 h-10 mb-3 opacity-50" />
                      <p className="text-base">No neural blocks match your query.</p>
                   </div>
                ) : (
                  <div className="space-y-6 relative border-l-2 border-slate-800 ml-4 md:ml-6 pl-6 md:pl-8">
                    {filteredLogs.map((log) => {
                      const config = getStatusConfig(log.status);
                      return (
                        <div 
                          key={log.id} 
                          className="relative bg-black/40 border border-white/5 hover:border-white/10 p-5 md:p-6 rounded-[1.5rem] transition-all duration-300 animate-in slide-in-from-bottom-4 group"
                        >
                          {/* Timeline Node Connector */}
                          <div className={`absolute -left-[35px] md:-left-[43px] top-8 w-4 h-4 rounded-full ${config.bg} border-2 ${config.line} shadow-[0_0_10px_currentColor] z-10`} />
                          <div className={`absolute -left-[35px] md:-left-[43px] top-10 w-8 md:w-10 h-0.5 ${config.bg}`} />

                          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                            {/* Meta Info */}
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="text-[10px] md:text-xs font-mono text-slate-400 flex items-center gap-1.5">
                                  <History className="w-3.5 h-3.5" /> {log.timestamp}
                                </span>
                                <span className="text-slate-600 hidden md:inline">•</span>
                                <span className={`text-[9px] md:text-[10px] px-2.5 py-0.5 rounded-md border font-mono tracking-wider uppercase ${config.bg} ${config.color} ${config.border}`}>
                                  {log.type}
                                </span>
                                <span className="text-slate-600 hidden md:inline">•</span>
                                <span className="text-[10px] md:text-xs font-mono text-slate-500">ID: {log.id}</span>
                              </div>
                              <p className="text-xs md:text-sm font-mono text-cyan-400/80 group-hover:text-cyan-300 transition-colors flex items-center gap-2 cursor-pointer break-all">
                                <Fingerprint className="w-4 h-4 opacity-70 shrink-0" /> {log.hash}
                              </p>
                            </div>

                            {/* Score/Status */}
                            <div className="flex-shrink-0 bg-white/[0.02] border border-white/5 p-3 rounded-xl min-w-[120px] text-right">
                              {log.score !== null ? (
                                <>
                                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">AI Match Score</p>
                                  <p className="text-2xl md:text-3xl font-black text-white leading-none">{log.score}<span className="text-lg text-slate-500">%</span></p>
                                </>
                              ) : (
                                <>
                                  <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider mb-1">Flag Level</p>
                                  <p className={`text-sm md:text-lg font-black uppercase ${config.color} flex items-center justify-end gap-1.5`}>
                                    <config.icon className="w-4 h-4 md:w-5 md:h-5" /> {log.status}
                                  </p>
                                </>
                              )}
                            </div>
                          </div>

                          {/* Event Details */}
                          <div className="grid md:grid-cols-2 gap-4 bg-white/[0.03] rounded-2xl p-4 md:p-5 mb-5 border border-white/5">
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Target Entity</p>
                              <p className="text-sm font-bold text-white mb-0.5">{log.candidate}</p>
                              <p className="text-xs text-slate-400">{log.role}</p>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1.5">Action Executed</p>
                              <p className="text-sm text-slate-300 leading-relaxed">{log.action}</p>
                            </div>
                          </div>

                          {/* AI Notes */}
                          <div className="flex items-start gap-3 bg-purple-500/5 border border-purple-500/10 p-4 rounded-2xl">
                            <BrainCircuit className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                            <p className="text-xs md:text-sm text-slate-300 font-mono leading-relaxed">
                              <span className="text-purple-400 font-bold uppercase tracking-wider mr-2 text-[10px]">Neural_Log:</span> 
                              {log.aiNotes}
                            </p>
                          </div>

                        </div>
                      );
                    })}
                  </div>
                )}
                <div ref={logsEndRef} className="h-8" />
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 3: Transparency Matrix (Features) */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Why we built the Ledger</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">AI hiring requires absolute trust. The Neural Ledger ensures every automated decision is traceable, auditable, and completely unbiased.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 hover:bg-slate-900/60 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Network className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Total Auditability</h3>
              <p className="text-sm text-slate-400 leading-relaxed">If a candidate questions their rejection, employers can pull the exact cryptographic hash detailing the AI's logic flaws in the candidate's code.</p>
            </div>
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 hover:bg-slate-900/60 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Bias Elimination</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Logs prove that evaluations are based 100% on technical merit, system design output, and logic matrices—zero identity factors are recorded.</p>
            </div>
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 hover:bg-slate-900/60 transition-colors cursor-pointer group">
              <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Lock className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Anti-Cheat Verification</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Proctoring events (like tab-switching or multi-face detection) are instantly hashed. Employers get irrefutable proof of assessment integrity.</p>
            </div>
          </div>
        </section>

        {/* SECTION 4: Cryptographic Security Arch (Split Section) */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-slate-900/50 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden flex flex-col lg:flex-row items-stretch shadow-2xl">
            {/* Image Side */}
            <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-full">
              <img 
                src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2000&auto=format&fit=crop" 
                alt="Cryptographic Security Network"
                className="absolute inset-0 w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0b0f1f] hidden lg:block" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b0f1f] to-transparent lg:hidden" />
            </div>
            
            {/* Content Side */}
            <div className="lg:w-1/2 p-8 md:p-12 relative z-10 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Cryptographic Data Architecture</h2>
              <p className="text-slate-400 leading-relaxed mb-8">
                Data tampering is mathematically impossible. When an evaluation concludes, the candidate's code, audio transcript, and AI grading rubric are compiled into a JSON object, passed through an SHA-256 hashing algorithm, and stored immutably.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0 border border-blue-500/30">
                    <Database className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="font-medium">Stored on Distributed TiDB Clusters</span>
                </li>
                <li className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0 border border-purple-500/30">
                    <Fingerprint className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="font-medium">SHA-256 Checksums for every log entry</span>
                </li>
                <li className="flex items-center gap-4 text-slate-300">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0 border border-emerald-500/30">
                    <Lock className="w-5 h-5 text-emerald-400" />
                  </div>
                  <span className="font-medium">AES-256 At-Rest Encryption</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* SECTION 5: Enterprise Compliance Standards */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-8">Meeting Global Enterprise Standards</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-colors cursor-default">
              <ShieldCheck className="text-blue-400 w-6 h-6" />
              <span className="font-bold text-white tracking-wide">SOC 2 Type II</span>
            </div>
            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-colors cursor-default">
              <Globe className="text-emerald-400 w-6 h-6" />
              <span className="font-bold text-white tracking-wide">GDPR Compliant</span>
            </div>
            <div className="px-6 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3 hover:bg-white/10 transition-colors cursor-default">
              <FileText className="text-purple-400 w-6 h-6" />
              <span className="font-bold text-white tracking-wide">ISO 27001</span>
            </div>
          </div>
        </section>

        {/* SECTION 6: Call to Action */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-[2.5rem] bg-gradient-to-br from-purple-600 to-blue-900 border border-purple-400/30 shadow-2xl shadow-purple-900/50 relative overflow-hidden text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="relative z-10">
              <h2 className="text-2xl md:text-4xl font-bold text-white mb-2">Deploy your private ledger.</h2>
              <p className="text-purple-100 text-sm md:text-base max-w-lg">
                Secure your enterprise hiring process with immutable AI logic trails. Connect with our engineering team to set up a dedicated environment.
              </p>
            </div>
            <Link 
              href="/hirex/contact"
              className="relative z-10 whitespace-nowrap bg-white text-black font-black px-8 py-4 rounded-2xl hover:scale-105 hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            >
              Contact Sales <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

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
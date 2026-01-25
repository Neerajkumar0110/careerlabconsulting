'use client';

import React, { useState, useEffect, useRef } from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { 
  Cpu, Brain, Bot, Zap, ShieldAlert, Network, Activity,
  ChevronRight, Terminal, Search, Sparkles, X, Fingerprint, 
  FileCode, Send, User, Loader2, CheckCircle2
} from 'lucide-react';

// Career Lab Consulting Knowledge Base for AI
const CLC_KNOWLEDGE = {
  "cognitive pathing": "Our AI maps your current skills against industry benchmarks to create a custom path in Full-Stack AI & Web3.",
  "skill-to-earn ledger": "Every project you complete on Career Lab LMS is recorded on a private ledger, verifiable by our 500+ hiring partners.",
  "neural grading": "Get instant, industry-grade feedback on your code logic and architecture within seconds of submission.",
  "placement protocol": "Access a network of 500+ global tech partners with automated interview scheduling based on your LMS performance."
};

export default function NeuralLMS() {
  const [activeModal, setActiveModal] = useState<'sync' | 'docs' | null>(null);
  const [selectedProtocol, setSelectedProtocol] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Neural Handshake successful. I am your Career Lab Agent. How can I help you accelerate your tech career today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [progress, setProgress] = useState(0);
  const [aiStatus, setAiStatus] = useState('ANALYZING_COGNITIVE_LOAD');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll for Chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Dashboard Status Simulation
  useEffect(() => {
    const statuses = ['MAPPING_SKILL_GRAPH', 'OPTIMIZING_CONTENT_NODES', 'NEURAL_SYNC_ACTIVE'];
    const interval = setInterval(() => {
      setAiStatus(statuses[Math.floor(Math.random() * statuses.length)]);
      setProgress(Math.floor(Math.random() * 100));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.toLowerCase();
    setMessages(prev => [...prev, { role: 'user', text: input }]);
    setInput('');
    setIsTyping(true);

    // Career Lab Logic Based Responses
    setTimeout(() => {
      setIsTyping(false);
      let aiResponse = "That is a great question! At Career Lab Consulting, we ensure our Neural LMS prepares you for exactly that. Would you like to see how our curriculum maps to high-paying roles?";
      
      if (userMsg.includes('placement') || userMsg.includes('job') || userMsg.includes('salary')) {
        aiResponse = "Career Lab Consulting has a stellar 94% placement record. Our LMS tracks your 'Job-Readiness Score' so you only interview when you're guaranteed to succeed!";
      } else if (userMsg.includes('ai') || userMsg.includes('web3') || userMsg.includes('tech')) {
        aiResponse = "Our Neural LMS is built for 2026 standards, covering Generative AI, LLMs, and Web3 Architecture. You'll be learning what the top 1% of engineers use.";
      } else if (userMsg.includes('fee') || userMsg.includes('cost') || userMsg.includes('price')) {
        aiResponse = "We offer various flexible plans, including Income Share Agreements (ISA). You focus on learning; we'll handle the career transition!";
      } else if (userMsg.includes('lms') || userMsg.includes('how it works')) {
        aiResponse = "The Career Lab LMS is an autonomous engine. It identifies your weak spots and generates custom labs to fix them automatically. It's like having a 1-on-1 mentor 24/7.";
      }

      setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
    }, 1200);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <B2CHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full animate-pulse" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="flex flex-col items-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
              <Bot className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Career Lab Autonomous Node</span>
            </div>
            <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8]">
              NEURAL <span className="text-blue-600">LMS</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              The proprietary high-performance learning engine of Career Lab Consulting.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button onClick={() => setActiveModal('sync')} className="px-10 py-5 bg-blue-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2">
                <Fingerprint size={18} /> Initialize Neural Sync
              </button>
              <button onClick={() => setActiveModal('docs')} className="px-10 py-5 border border-white/10 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all flex items-center gap-2">
                <FileCode size={18} /> System Protocols
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATUS DASHBOARD --- */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto bg-[#050814] border border-white/5 rounded-[2.5rem] p-6 md:p-10 relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
            <div className="lg:col-span-7 space-y-6">
                <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                      <Terminal size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase italic">CLC-Protocol-v2.4</h3>
                      <div className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase flex items-center gap-1">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" /> Sync Active
                      </div>
                    </div>
                </div>
                <div className="bg-black/50 border border-white/10 rounded-2xl p-6 font-mono text-blue-400/80 space-y-2">
                    <p className="flex gap-2 text-[11px]"><span>{'>'}</span> <span>Accessing Career Lab Cloud Ledger...</span></p>
                    <p className="flex gap-2 text-white text-[11px]"><span>{'>'}</span> <span className="animate-pulse">STATUS: {aiStatus}</span></p>
                    <div className="w-full bg-white/5 h-1 rounded-full mt-4 overflow-hidden">
                        <div className="bg-blue-600 h-full transition-all duration-1000" style={{ width: `${progress}%` }} />
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- POPUP MODAL --- */}
      {activeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl" onClick={() => {setActiveModal(null); setSelectedProtocol(null);}} />
          
          <div className="relative w-full max-w-2xl bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <button onClick={() => {setActiveModal(null); setSelectedProtocol(null);}} className="absolute top-6 right-6 p-2 z-50 hover:bg-white/10 rounded-full transition-all text-white">
              <X size={20} />
            </button>

            {/* NEURAL AGENT SYNC */}
            {activeModal === 'sync' && (
              <div className="flex flex-col h-[600px]">
                <div className="p-8 border-b border-white/5 bg-blue-600/5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center"><Brain className="text-white" size={24} /></div>
                  <div>
                    <h3 className="text-xl font-black uppercase italic">Career Lab Agent</h3>
                    <div className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-2">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> Connection Stable
                    </div>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar bg-black/20">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-white/10' : 'bg-blue-600/20 text-blue-500'}`}>
                          {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                        </div>
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white font-bold' : 'bg-white/[0.03] border border-white/5 text-slate-300'}`}>
                          {msg.text}
                        </div>
                      </div>
                    </div>
                  ))}
                  {isTyping && (
                    <div className="flex items-center gap-2 text-blue-500 p-4">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Agent processing...</span>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>
                <form onSubmit={handleSendMessage} className="p-6 border-t border-white/5 bg-black/40">
                  <div className="relative">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask about syllabus, jobs, or AI modules..." className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm text-white focus:outline-none focus:border-blue-600" />
                    <button type="submit" className="absolute right-2 top-2 bottom-2 w-10 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center text-white transition-all"><Send size={16} /></button>
                  </div>
                </form>
              </div>
            )}

            {/* SYSTEM PROTOCOLS */}
            {activeModal === 'docs' && (
              <div className="p-10">
                <h3 className="text-3xl font-black uppercase italic mb-8 flex items-center gap-3">
                  <FileCode className="text-blue-600" /> System Protocols
                </h3>
                <div className="grid gap-4">
                  {Object.keys(CLC_KNOWLEDGE).map((key, i) => (
                    <div key={i} className="group">
                      <button 
                        onClick={() => setSelectedProtocol(selectedProtocol === key ? null : key)}
                        className="w-full p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/50 transition-all flex justify-between items-center group"
                      >
                        <span className="text-sm font-black uppercase text-blue-400 group-hover:text-white transition-colors">{key}</span>
                        <ChevronRight className={`transition-transform duration-300 ${selectedProtocol === key ? 'rotate-90 text-white' : 'text-slate-600'}`} />
                      </button>
                      {selectedProtocol === key && (
                        <div className="p-6 text-xs text-slate-400 leading-relaxed animate-in slide-in-from-top-2 duration-300">
                          <div className="flex items-start gap-3 bg-blue-600/5 p-4 rounded-2xl border border-blue-500/10">
                            <CheckCircle2 className="text-emerald-500 mt-0.5 shrink-0" size={16} />
                            <span>{CLC_KNOWLEDGE[key as keyof typeof CLC_KNOWLEDGE]}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
'use client';

import React, { useState, useEffect, useRef } from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { 
  Cpu, Brain, Bot, Zap, ShieldAlert, Network, Activity,
  ChevronRight, Terminal, Search, Sparkles, X, Fingerprint, 
  FileCode, Send, User, Loader2
} from 'lucide-react';

export default function NeuralLMS() {
  const [activeModal, setActiveModal] = useState<'sync' | 'docs' | null>(null);
  const [isChatting, setIsChatting] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Neural Handshake successful. I am your Autonomous Learning Agent. What is your primary engineering goal?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking & response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        role: 'ai', 
        text: `Analysis complete for: "${userMsg}". Optimizing your neural path for Full-Stack AI development. Ready to begin?` 
      }]);
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans">
      <B2CHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="flex flex-col items-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-md">
              <Bot className="w-4 h-4 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Autonomous Protocol Active</span>
            </div>

            <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8]">
              NEURAL <span className="text-blue-600">LMS</span>
            </h1>
            
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium">
              The world's first AI-driven learning engine that builds itself around your brain.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <button 
                onClick={() => setActiveModal('sync')}
                className="px-10 py-5 bg-blue-600 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all shadow-xl shadow-blue-600/20 flex items-center gap-2"
              >
                <Fingerprint size={18} /> Initialize Neural Sync
              </button>
              <button 
                onClick={() => setActiveModal('docs')}
                className="px-10 py-5 border border-white/10 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-white/5 transition-all flex items-center gap-2"
              >
                <FileCode size={18} /> View Docs
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- POPUP MODAL --- */}
      {activeModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl" onClick={() => setActiveModal(null)} />
          
          <div className="relative w-full max-w-2xl bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            <button 
              onClick={() => setActiveModal(null)}
              className="absolute top-6 right-6 p-2 z-50 hover:bg-white/10 rounded-full transition-all"
            >
              <X size={20} />
            </button>

            {/* NEURAL SYNC CHAT INTERFACE */}
            {activeModal === 'sync' && (
              <div className="flex flex-col h-[600px] md:h-[700px]">
                {/* Chat Header */}
                <div className="p-8 border-b border-white/5 bg-blue-600/5">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center animate-pulse">
                      <Brain className="text-white" size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black uppercase italic tracking-tight">Neural Agent</h3>
                      <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest flex items-center gap-1">
                         <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" /> Real-time Sync Active
                      </p>
                    </div>
                  </div>
                </div>

                {/* Message Area */}
                <div className="flex-1 overflow-y-auto p-8 space-y-6 no-scrollbar">
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
                    <div className="flex justify-start">
                      <div className="bg-white/[0.03] border border-white/5 p-4 rounded-2xl flex items-center gap-2 text-slate-500">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-[10px] font-black uppercase tracking-widest">Agent Thinking...</span>
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {/* Input Area */}
                <form onSubmit={handleSendMessage} className="p-6 border-t border-white/5 bg-black/20">
                  <div className="relative">
                    <input 
                      type="text" 
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Type your goals (e.g. Master Generative AI)..."
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-blue-600 transition-all pr-14"
                    />
                    <button 
                      type="submit"
                      className="absolute right-2 top-2 bottom-2 w-10 bg-blue-600 hover:bg-blue-500 rounded-xl flex items-center justify-center transition-all"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                  <p className="text-center text-[8px] text-slate-600 mt-4 uppercase font-bold tracking-[0.2em]">
                    Powered by Gemini 1.5 Pro • Career Lab Consulting
                  </p>
                </form>
              </div>
            )}

            {/* DOCUMENTATION MODAL (Static) */}
            {activeModal === 'docs' && (
              <div className="p-10">
                <h3 className="text-3xl font-black uppercase italic mb-8 flex items-center gap-3">
                  <FileCode className="text-blue-500" /> System Protocols
                </h3>
                <div className="grid gap-4">
                  {['Cognitive Pathing', 'Skill-to-Earn Ledger', 'Neural Grading'].map((item, i) => (
                    <div key={i} className="p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-blue-500/50 transition-all cursor-pointer group flex justify-between items-center">
                      <div>
                        <h4 className="text-sm font-black uppercase text-blue-400 mb-1">{item}</h4>
                        <p className="text-[10px] text-slate-500 uppercase tracking-tighter">Protocol v1.0.{i+1} active</p>
                      </div>
                      <ChevronRight className="group-hover:translate-x-1 transition-transform" />
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
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Layout, Cpu, Globe, Shield, Zap, CheckCircle, 
  Activity, Terminal, Code2, Lock, Eye, Send, Sparkles, Bot, Loader2
} from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

const stats = [
  { label: 'Neural Training', value: '85%', icon: Cpu, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Project Nodes', value: '12 Active', icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Security Clearance', value: 'Lvl 4', icon: Shield, color: 'text-purple-500', bg: 'bg-purple-500/10' },
];

export default function LMSPreview() {
  const [activeView, setActiveView] = useState('ai');
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Neural connection established. I am Manee 2.5 Flash. How can I assist your deployment today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;

    const newMessages = [...messages, { role: 'user', content: userInput }];
    setMessages(newMessages);
    setUserInput('');
    setIsTyping(true);

    try {
      const result = await model.generateContent(userInput);
      const response = await result.response;
      setMessages([...newMessages, { role: 'assistant', content: response.text() }]);
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: "Error: Connection to Neural Node lost. Check API Key." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="py-12 md:py-32 bg-[#020617] border-t border-white/5 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[400px] bg-blue-600/5 blur-[80px] md:blur-[120px] rounded-full z-0" />

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-center">
          
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
              <Zap className="w-3 h-3 text-blue-400 fill-blue-400" />
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Autonomous Infrastructure</span>
            </div>
            
            <h2 className="text-3xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-tight uppercase">
              Manee Powered <br className="hidden md:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">
                Learning Ecosystem
              </span>
            </h2>
            
            <p className="text-slate-400 text-sm md:text-lg mb-8 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Interactive LMS with <span className="text-white font-bold">Manee 2.5 Flash</span> integration. 
              Real-time code analysis, autonomous debugging, and neural learning protocols.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="group p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-blue-500/30 transition-all duration-500 flex items-center lg:block gap-4">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center lg:mb-4 group-hover:scale-110 transition-transform`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="text-xl md:text-2xl font-black text-white tracking-tight">{stat.value}</div>
                    <div className="text-[9px] text-slate-500 uppercase font-black tracking-widest">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group order-1 lg:order-2">
            <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            
            <div className="relative bg-[#0a0f1d] border border-white/10 rounded-2xl md:rounded-[2.5rem] p-2 md:p-4 shadow-2xl backdrop-blur-md overflow-hidden min-h-[550px] flex flex-col">
              
              <div className="flex items-center gap-2 mb-3 px-4 py-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-amber-500/40" />
                  <div className="w-2 md:w-2.5 h-2 md:h-2.5 rounded-full bg-emerald-500/40" />
                </div>
                <div className="mx-auto bg-white/5 px-4 py-1 rounded-lg text-[9px] text-slate-500 font-mono truncate max-w-[150px] md:max-w-none">
                  autonomous.manee.ai/session_v2.5_flash
                </div>
              </div>

              <div className="flex gap-2 md:gap-4 flex-1">
                <div className="w-12 md:w-16 bg-white/[0.03] rounded-xl md:rounded-3xl flex flex-col items-center py-6 gap-6 border border-white/5">
                  {[
                    { id: 'ai', icon: Bot },
                    { id: 'terminal', icon: Terminal },
                    { id: 'code', icon: Code2 },
                    { id: 'security', icon: Shield }
                  ].map((item) => (
                    <button 
                      key={item.id}
                      onClick={() => setActiveView(item.id)}
                      className={`w-8 h-8 md:w-10 md:h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                        activeView === item.id 
                        ? 'bg-blue-600 shadow-lg shadow-blue-600/40 text-white scale-110' 
                        : 'text-slate-500 hover:text-blue-400'
                      }`}
                    >
                      <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                    </button>
                  ))}
                </div>

                <div className="flex-1 flex flex-col space-y-4 pr-1 md:pr-2 overflow-hidden">
                  {activeView === 'ai' && (
                    <div className="flex flex-col h-full animate-in fade-in slide-in-from-right-4 duration-500">
                      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-hide">
                        {messages.map((msg, i) => (
                          <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] p-3 rounded-2xl text-[11px] font-mono leading-relaxed ${
                              msg.role === 'user' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-white/5 border border-white/10 text-slate-300'
                            }`}>
                              {msg.content}
                            </div>
                          </div>
                        ))}
                        {isTyping && (
                          <div className="flex justify-start">
                            <div className="bg-white/5 border border-white/10 p-3 rounded-2xl animate-pulse">
                              <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                            </div>
                          </div>
                        )}
                      </div>

                      <form onSubmit={handleSendMessage} className="relative mb-2">
                        <input 
                          value={userInput}
                          onChange={(e) => setUserInput(e.target.value)}
                          placeholder="Ask Manee to debug code..."
                          className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-[11px] text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                        />
                        <button type="submit" className="absolute right-2 top-2 p-1.5 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">
                          <Send className="w-3.5 h-3.5 text-white" />
                        </button>
                      </form>
                    </div>
                  )}

                  {activeView === 'terminal' && (
                    <div className="h-full bg-black/60 border border-white/10 rounded-2xl p-4 font-mono text-emerald-400 text-[10px] space-y-2 animate-in fade-in zoom-in-95">
                      <div className="flex items-center gap-2 opacity-50 mb-4 border-b border-white/5 pb-2">
                        <Terminal className="w-3 h-3" /> System Shell v2.5
                      </div>
                      <div>$ manee --analyze current-project</div>
                      <div className="text-slate-400 italic">{`> Scanning neural nodes...`}</div>
                      <div className="text-white font-bold">● STATUS: AUTONOMOUS_READY</div>
                      <div className="text-blue-400">√ Llama-V3 Weights Sync Complete</div>
                    </div>
                  )}

                  {activeView === 'code' && (
                    <div className="h-full bg-[#050505] border border-white/10 rounded-2xl p-4 font-mono text-[10px] animate-in slide-in-from-bottom-4">
                      <div className="flex justify-between mb-4 border-b border-white/5 pb-2 text-slate-500">
                        <span>manee_agent.py</span>
                        <Sparkles className="w-3 h-3 text-cyan-400" />
                      </div>
                      <div className="text-blue-400">def <span className="text-white">autonomous_fix</span>():</div>
                      <div className="pl-4 text-slate-500"># Manee 2.5 Logic here</div>
                      <div className="pl-4 text-emerald-400">return model.generate(prompt)</div>
                    </div>
                  )}
                  
                </div>
              </div>

              <div className="p-3 md:p-4 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center justify-between mt-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                  <span className="text-[8px] md:text-[9px] text-slate-400 font-mono">MANEE_FLASH_2.5: ACTIVE</span>
                </div>
                <div className="flex items-center gap-4">
                   <div className="text-[8px] font-mono text-slate-500 uppercase">Latency: 12ms</div>
                   <div className="h-1.5 w-24 bg-blue-500/10 rounded-full overflow-hidden">
                      <div className="h-full w-3/4 bg-blue-500 animate-pulse" />
                   </div>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-2 md:-top-6 md:-right-4 bg-[#1e293b] border border-white/10 px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce duration-[5000ms] z-20">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center"><Activity className="w-4 h-4 text-emerald-400" /></div>
                <div><div className="text-[8px] text-slate-500 font-bold uppercase">AI Uptime</div><div className="text-xs font-black text-white italic">100% AUTONOMOUS</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
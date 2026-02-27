// app/manee/page.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { Send, Loader2, Sparkles, User, Bot, Settings, History, Trash2, Cpu, X } from "lucide-react";

// Image render karne ke liye helper function
const renderMessage = (content: string) => {
  // Regex to detect Markdown images: ![alt](url)
  const parts = content.split(/(!\[.*?\]\(.*?\))/g);
  
  return parts.map((part, i) => {
    const imgMatch = part.match(/!\[(.*?)\]\((.*?)\)/);
    if (imgMatch) {
      return (
        <img 
          key={i} 
          src={imgMatch[2]} 
          alt={imgMatch[1]} 
          className="w-full max-w-2xl rounded-2xl mt-4 mb-2 shadow-2xl border border-white/10 object-cover bg-black/50 min-h-[200px]" 
        />
      );
    }
    return <span key={i} className="whitespace-pre-wrap">{part}</span>;
  });
};

export default function ManeeOS() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{ role: 'user' | 'ai', content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeModal, setActiveModal] = useState<'history' | 'core' | 'system' | null>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userPrompt = input;
    setInput('');
    setIsLoading(true);
    setMessages(prev => [...prev, { role: 'user', content: userPrompt }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', content: data.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Neural Link Error: Uplink Failed." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 font-sans flex flex-col relative">
      <Navbar />
      
      <div className="flex-grow max-w-[1500px] w-full mx-auto pt-24 pb-8 px-4 md:px-10 flex flex-col">
        <div className="flex flex-col lg:flex-row gap-6 h-full lg:h-[82vh]">
          
          <aside className="hidden lg:flex flex-col w-24 bg-white/[0.02] border border-white/10 rounded-[2.5rem] py-8 items-center justify-between backdrop-blur-3xl shadow-2xl z-10">
            <div className="flex flex-col gap-8 w-full items-center">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)] mb-4">
                <Sparkles size={24} className="text-white" />
              </div>
              <SidebarIcon icon={<History size={22} />} label="History" onClick={() => setActiveModal('history')} />
              <SidebarIcon icon={<Cpu size={22} />} label="Core" onClick={() => setActiveModal('core')} />
            </div>
            <div className="flex flex-col gap-6 w-full items-center">
              <SidebarIcon icon={<Trash2 size={22} />} label="Clear" onClick={() => setMessages([])} danger />
              <SidebarIcon icon={<Settings size={22} />} label="System" onClick={() => setActiveModal('system')} />
            </div>
          </aside>

          <div className="flex-grow flex flex-col bg-[#03081a]/60 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden relative min-h-[600px]">
            
            <header className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
                <div>
                  <h1 className="text-xl font-black tracking-widest uppercase italic leading-none">Manee <span className="text-blue-500">OS</span></h1>
                  <p className="text-[10px] text-slate-500 font-bold tracking-[0.3em] uppercase mt-1">Intelligence Uplink: Active</p>
                </div>
              </div>
              <div className="hidden sm:block px-5 py-2 bg-blue-600/10 border border-blue-500/30 rounded-full text-[10px] font-black text-blue-400 tracking-[0.2em] uppercase">
                Manee 3 Flash V1.0
              </div>
            </header>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 md:p-12 space-y-10 custom-scrollbar scroll-smooth">
              <AnimatePresence mode="popLayout">
                {messages.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} className="h-full flex flex-col items-center justify-center text-center py-20">
                    <Sparkles size={60} className="mb-6 text-blue-500 animate-pulse" />
                    <p className="text-sm font-black tracking-[0.5em] uppercase">Awaiting Command Input</p>
                  </motion.div>
                )}
                
                {messages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={`flex gap-4 md:gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                      msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-900 border border-white/10'
                    }`}>
                      {msg.role === 'user' ? <User size={20} /> : <Bot size={20} className="text-blue-400" />}
                    </div>
                    
                    <div className={`relative max-w-[85%] md:max-w-[75%] p-5 md:p-6 rounded-3xl text-[15px] md:text-[16px] leading-relaxed ${
                      msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/20' 
                      : 'bg-white/[0.03] border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md'
                    }`}>
                      {/* Yahan par renderMessage function ko call kiya hai */}
                      <div className="w-full break-words">
                        {renderMessage(msg.content)}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={22} /></div>
                  <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl rounded-tl-none flex gap-2 items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                  </div>
                </div>
              )}
            </div>

            <footer className="p-6 md:p-10 bg-gradient-to-t from-black/40 to-transparent">
              <div className="max-w-4xl mx-auto flex gap-3 md:gap-4">
                <div className="relative flex-grow group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Initialize Manee Command..."
                    className="relative w-full bg-[#03081a]/90 border border-white/10 rounded-2xl py-4 md:py-5 px-6 md:px-8 focus:outline-none focus:border-blue-500/50 transition-all text-white text-base md:text-lg shadow-2xl placeholder:text-slate-700"
                  />
                </div>
                <button 
                  onClick={handleSend} 
                  disabled={isLoading || !input.trim()} 
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:opacity-50 p-5 md:p-6 rounded-2xl shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center min-w-[60px]"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={24} /> : <Send size={24} />}
                </button>
              </div>
            </footer>
          </div>
        </div>
      </div>
      <Footer />

      <AnimatePresence>
        {activeModal && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[500] bg-black/60 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              className="bg-[#0f172a] border border-white/10 rounded-3xl p-8 w-full max-w-md shadow-2xl relative"
            >
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-6 right-6 text-slate-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>

              {activeModal === 'history' && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-3"><History className="text-blue-500"/> Neural History</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-sm text-slate-400 text-center italic">
                      No previous uplink sessions found in local memory.
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'core' && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-3"><Cpu className="text-blue-500"/> Core Diagnostics</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-slate-400">Status</span>
                      <span className="text-green-400 font-bold uppercase text-sm tracking-widest">Active</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-slate-400">Latency</span>
                      <span className="text-white font-mono">24ms</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-slate-400">Engine</span>
                      <span className="text-blue-400 font-bold text-sm">MANEE-3-FLASH</span>
                    </div>
                  </div>
                </div>
              )}

              {activeModal === 'system' && (
                <div>
                  <h2 className="text-xl font-bold mb-6 flex items-center gap-3"><Settings className="text-blue-500"/> System Settings</h2>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5">
                      <span className="text-slate-400">Theme</span>
                      <span className="text-white text-sm">Dark Matter</span>
                    </div>
                    <button 
                      onClick={() => {
                        setMessages([]);
                        setActiveModal(null);
                      }} 
                      className="w-full mt-4 p-4 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl border border-red-500/20 transition-all font-bold"
                    >
                      Purge Memory Bank (Clear Chat)
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

// 100% Fixed Portal-Based SidebarIcon
function SidebarIcon({ icon, label, onClick, danger = false }: any) {
  const [isHovered, setIsHovered] = useState(false);
  const iconRef = useRef<HTMLButtonElement>(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateTooltipPosition = () => {
    if (iconRef.current) {
      const rect = iconRef.current.getBoundingClientRect();
      setTooltipPos({
        top: rect.top + rect.height / 2, 
        left: rect.left + rect.width + 15, 
      });
    }
  };

  return (
    <>
      <button 
        ref={iconRef}
        onClick={onClick}
        onMouseEnter={() => {
          updateTooltipPosition();
          setIsHovered(true);
        }}
        onMouseLeave={() => setIsHovered(false)}
        className={`relative group p-4 rounded-2xl transition-all flex items-center justify-center w-14 h-14 ${
          danger ? 'text-slate-500 hover:text-red-400 hover:bg-red-500/10' : 'text-slate-500 hover:text-white hover:bg-white/5'
        }`}
      >
        {icon}
      </button>

      {mounted && isHovered && createPortal(
        <div 
          className="fixed pointer-events-none transition-all duration-150 z-[9999]"
          style={{
            top: `${tooltipPos.top}px`,
            left: `${tooltipPos.left}px`,
            transform: 'translateY(-50%)', 
          }}
        >
          <div className="bg-[#0f172a] border border-white/10 text-[10px] px-3.5 py-1.5 rounded-lg uppercase tracking-[0.2em] font-bold text-white whitespace-nowrap shadow-2xl backdrop-blur-sm">
            {label}
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 bg-[#0f172a] border-l border-b border-white/10 rotate-45" />
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
// app/manee/page.tsx

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { Send, Loader2, Sparkles, User, Bot, Mic, MicOff, Settings, History, Trash2, Cpu } from "lucide-react";

export default function ManeeOS() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleListening = () => {
    if (!('webkitSpeechRecognition' in window) && !('speechRecognition' in window)) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).speechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    if (!isListening) {
      recognition.start();
      setIsListening(true);
    } else {
      recognition.stop();
      setIsListening(false);
    }

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
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
      if (!res.ok) throw new Error(data.error);
      setMessages(prev => [...prev, { role: 'ai', content: data.text }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'ai', content: "Manee Neural Engine: Connection interrupted. Please re-establish uplink." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => setMessages([]);

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden font-sans">
      <Navbar />
      
      <div className="max-w-[1400px] mx-auto pt-28 pb-12 px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-6 h-[82vh]">
          
          <aside className="hidden lg:flex flex-col w-20 bg-white/[0.02] border border-white/10 rounded-[2rem] p-4 items-center justify-between backdrop-blur-xl shadow-2xl">
            <div className="flex flex-col gap-8 mt-4">
              <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                <Sparkles size={24} className="text-white" />
              </div>
              <button className="p-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all group relative">
                <History size={22} />
                <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all bg-slate-800 text-[10px] px-2 py-1 rounded border border-white/10 uppercase tracking-widest whitespace-nowrap">History</span>
              </button>
              <button className="p-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all group relative">
                <Cpu size={22} />
                <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all bg-slate-800 text-[10px] px-2 py-1 rounded border border-white/10 uppercase tracking-widest whitespace-nowrap">Core</span>
              </button>
            </div>
            <div className="flex flex-col gap-6 mb-4">
              <button onClick={clearChat} className="p-3 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-xl transition-all group relative">
                <Trash2 size={22} />
                <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all bg-red-900/50 text-[10px] px-2 py-1 rounded border border-red-500/20 uppercase tracking-widest whitespace-nowrap">Clear</span>
              </button>
              <button className="p-3 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all group relative">
                <Settings size={22} />
                <span className="absolute left-16 scale-0 group-hover:scale-100 transition-all bg-slate-800 text-[10px] px-2 py-1 rounded border border-white/10 uppercase tracking-widest whitespace-nowrap">System</span>
              </button>
            </div>
          </aside>

          <div className="flex-grow relative flex flex-col bg-[#03081a]/60 border border-white/10 rounded-[2.5rem] backdrop-blur-3xl shadow-[0_0_80px_rgba(0,0,0,0.5)] overflow-hidden">
            
            <header className="flex items-center justify-between px-10 py-6 border-b border-white/5 bg-white/[0.01]">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <div>
                  <h1 className="text-xl font-black tracking-widest uppercase italic">Manee <span className="text-blue-500">OS</span></h1>
                  <p className="text-[10px] text-slate-500 font-bold tracking-[0.3em] uppercase">Intelligence Uplink: Active</p>
                </div>
              </div>
              <div className="px-5 py-2 bg-blue-600/10 border border-blue-500/30 rounded-full text-[10px] font-black text-blue-400 tracking-[0.2em] uppercase">
                Manee 3 Flash V1.0
              </div>
            </header>

            {/* Neural Feed */}
            <div ref={scrollRef} className="flex-grow overflow-y-auto p-8 md:p-12 space-y-10 custom-scrollbar scroll-smooth">
              <AnimatePresence mode="popLayout">
                {messages.length === 0 && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} className="h-full flex flex-col items-center justify-center text-center">
                    <Sparkles size={60} className="mb-6 text-blue-500 animate-pulse" />
                    <p className="text-sm font-black tracking-[0.5em] uppercase">Awaiting Command Input</p>
                  </motion.div>
                )}
                
                {messages.map((msg, i) => (
                  <motion.div 
                    initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    key={i} 
                    className={`flex gap-6 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                  >
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg ${
                      msg.role === 'user' ? 'bg-blue-600' : 'bg-slate-900 border border-white/10'
                    }`}>
                      {msg.role === 'user' ? <User size={22} /> : <Bot size={22} className="text-blue-400" />}
                    </div>
                    
                    <div className={`relative max-w-[85%] md:max-w-[70%] p-6 rounded-3xl text-[16px] leading-relaxed transition-all ${
                      msg.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-tr-none shadow-blue-500/20 font-medium' 
                      : 'bg-white/[0.03] border border-white/10 text-slate-200 rounded-tl-none backdrop-blur-md'
                    }`}>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {isLoading && (
                <div className="flex gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center"><Loader2 className="animate-spin text-blue-500" size={22} /></div>
                  <div className="bg-white/[0.03] border border-white/10 p-6 rounded-3xl rounded-tl-none flex gap-2 items-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-duration:0.8s]" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.2s]" />
                    <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-duration:0.8s] [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            <footer className="p-10 bg-gradient-to-t from-black/40 to-transparent">
              <div className="max-w-4xl mx-auto flex gap-4">
                <div className="relative flex-grow group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Initialize Manee Intelligence Command..."
                    className="relative w-full bg-[#03081a]/90 border border-white/10 rounded-2xl py-5 px-8 pr-16 focus:outline-none focus:border-blue-500/50 transition-all text-white text-lg shadow-2xl placeholder:text-slate-700"
                  />
                  <button 
                    onClick={toggleListening}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-xl transition-all ${
                      isListening ? 'bg-red-500 text-white shadow-[0_0_20px_rgba(239,68,68,0.4)]' : 'text-slate-500 hover:text-blue-500'
                    }`}
                  >
                    {isListening ? <MicOff size={24} /> : <Mic size={24} />}
                  </button>
                </div>
                <button 
                  onClick={handleSend} 
                  disabled={isLoading || !input.trim()} 
                  className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:opacity-50 p-6 rounded-2xl shadow-xl shadow-blue-900/20 active:scale-95 transition-all flex items-center justify-center min-w-[70px]"
                >
                  {isLoading ? <Loader2 className="animate-spin" size={28} /> : <Send size={28} />}
                </button>
              </div>
              <p className="text-center text-[9px] text-slate-600 mt-6 uppercase font-black tracking-[0.5em]">
                Neural Architecture Powered by <span className="text-blue-900 italic">Manee</span>
              </p>
            </footer>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
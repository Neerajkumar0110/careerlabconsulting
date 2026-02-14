'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, Globe, Shield, Zap, Terminal, Send, Sparkles, Loader2, Crown, Timer, Wifi, Rocket 
} from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRouter } from 'next/navigation';

// --- Configuration ---
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

const stats = [
  { label: 'Neural Training', value: '85%', icon: Cpu, color: 'text-cyan-400', bg: 'bg-cyan-500/10' },
  { label: 'Project Nodes', value: '12 Active', icon: Globe, color: 'text-purple-400', bg: 'bg-purple-500/10' },
  { label: 'Security Clearance', value: 'Lvl 4', icon: Shield, color: 'text-amber-400', bg: 'bg-amber-500/10' },
];

export default function LMSPreview() {
  const router = useRouter();
  const [userInput, setUserInput] = useState('');
  const [hasShowedPricing, setHasShowedPricing] = useState(false);
  const [timeLeft, setTimeLeft] = useState('23:59:59');
  
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Neural connection established. I am Manee 2.5 Flash. How can I assist your deployment today?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Timer Logic
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);
      const diff = endOfDay.getTime() - now.getTime();
      
      const hours = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
      const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
      const secs = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');
      setTimeLeft(`${hours}:${mins}:${secs}`);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto Scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, hasShowedPricing, isTyping]);

  const handleRegister = (plan: any) => {
    const originalAmount = plan.rawAmount;
    const discount = originalAmount * 0.10;
    const finalAmount = originalAmount - discount;

    const params = new URLSearchParams({
        planId: plan.id,
        planName: plan.name,
        priceDisplay: plan.price,
        rawAmountINR: finalAmount.toString(), 
        originalAmountINR: originalAmount.toString(),
        isEarlyBird: 'true',
        intl: 'false'
    });
    router.push(`/checkout/b2c?${params.toString()}`);
  };

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
      
      if (!hasShowedPricing) {
        setTimeout(() => setHasShowedPricing(true), 1000);
      }
    } catch (error) {
      setMessages([...newMessages, { role: 'assistant', content: "Error: Connection to Neural Node lost. Check API Key." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <section className="py-12 md:py-32 bg-[#000000] border-t border-white/5 relative overflow-hidden min-h-[900px] flex items-center group">
      
      {/* --- LIVING SPACE ENVIRONMENT --- */}
      
      {/* 1. Deep Void Base */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#02010a] via-[#050508] to-[#02010a] z-0" />

      {/* 2. Rotating Galaxy / Nebula Band */}
      {/* This creates the slow rotating purple gas effect */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] opacity-30 z-0 mix-blend-screen pointer-events-none animate-[spin_120s_linear_infinite]">
         <div className="w-full h-full bg-[conic-gradient(from_0deg_at_50%_50%,_#000000_0deg,_#1e1b4b_60deg,_#4c1d95_120deg,_#000000_180deg,_#1e1b4b_240deg,_#5b21b6_300deg,_#000000_360deg)] blur-[100px] opacity-40"></div>
      </div>

      {/* 3. Moving Star Fields (Parallax Effect) */}
      
      {/* Distant Stars - Slowest Move */}
      <div className="absolute inset-0 z-0 animate-[pan_60s_linear_infinite]">
         <div className="absolute inset-0 opacity-60" 
              style={{ 
                  backgroundImage: 'radial-gradient(white 0.5px, transparent 0.5px), radial-gradient(rgba(255,255,255,0.5) 0.5px, transparent 0.5px)', 
                  backgroundSize: '30px 30px, 70px 70px',
                  backgroundPosition: '0 0, 15px 15px'
              }} 
         />
      </div>
      
      {/* Mid-Range Stars - Medium Speed */}
      <div className="absolute inset-0 z-0 animate-[pan_40s_linear_infinite] mix-blend-screen">
         <div className="absolute inset-0 opacity-80" 
              style={{ 
                  backgroundImage: 'radial-gradient(white 1px, transparent 1px)', 
                  backgroundSize: '150px 150px',
                  backgroundPosition: '40px 60px'
              }} 
         />
      </div>

      {/* 4. THE LIVING SUN (Radioactive & Rotating) */}
      <div className="absolute -top-[150px] left-1/2 -translate-x-1/2 z-0 pointer-events-none scale-110">
         
         {/* Core: Intense Pulse */}
         <div className="w-[280px] h-[280px] bg-white rounded-full blur-[40px] absolute top-10 left-1/2 -translate-x-1/2 z-20 animate-pulse" />
         
         {/* Inner Corona: Rotating Plasma */}
         <div className="w-[500px] h-[500px] bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full blur-[80px] absolute -top-[80px] left-1/2 -translate-x-1/2 opacity-80 z-10 mix-blend-screen animate-[spin_20s_linear_infinite]" />
         
         {/* Outer Flare: Slow Breathing Haze */}
         <div className="w-[900px] h-[600px] bg-orange-700 rounded-full blur-[120px] absolute -top-[200px] left-1/2 -translate-x-1/2 opacity-50 z-0 mix-blend-screen animate-pulse" style={{ animationDuration: '4s' }} />
         
         {/* Cinematic Lens Flare */}
         <div className="w-[150vw] h-[2px] bg-blue-300 blur-[3px] absolute top-[140px] left-1/2 -translate-x-1/2 opacity-20 mix-blend-color-dodge animate-pulse" style={{ animationDuration: '8s' }} />
      </div>

      {/* 5. Floating Cosmic Dust/Gas (Foreground) */}
      <div className="absolute bottom-0 w-full h-[500px] bg-gradient-to-t from-blue-900/10 via-transparent to-transparent z-0 animate-pulse" style={{ animationDuration: '10s' }} />

      {/* ---------------------------------- */}

      {/* Custom Keyframe for Moving Backgrounds */}
      <style jsx global>{`
        @keyframes pan {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50px); } /* Simulates spaceship moving forward */
        }
      `}</style>

      <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-24 items-center">
          
          {/* Left Content */}
          <div className="order-2 lg:order-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md shadow-[0_0_15px_rgba(255,165,0,0.3)] hover:shadow-[0_0_25px_rgba(255,165,0,0.5)] transition-shadow">
              <Rocket className="w-3 h-3 text-orange-400 fill-orange-400 animate-bounce" />
              <span className="text-orange-100 text-[10px] font-black uppercase tracking-[0.2em]">Mission Control Ready</span>
            </div>
            
            <h2 className="text-4xl md:text-7xl font-black text-white mb-6 tracking-tighter leading-[0.9] uppercase drop-shadow-2xl">
              Manee <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-400">AI</span><br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-amber-200 to-orange-300 animate-pulse" style={{ animationDuration: '3s' }}>
                Ecosystem
              </span>
            </h2>
            
            <p className="text-slate-300 text-sm md:text-xl mb-10 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light mix-blend-plus-lighter">
              Deploy your career into orbit with <span className="text-white font-bold">Manee 2.5 Flash</span>. 
              Real-time code analysis and autonomous debugging in a zero-gravity environment.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4">
              {stats.map((stat) => (
                <div key={stat.label} className="group p-4 rounded-2xl bg-black/40 border border-white/10 hover:border-orange-500/50 transition-all duration-500 flex items-center lg:block gap-4 backdrop-blur-xl">
                  <div className={`w-10 h-10 ${stat.bg} rounded-xl flex items-center justify-center lg:mb-4 group-hover:scale-110 transition-transform shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                  <div className="text-left">
                    <div className="text-xl md:text-2xl font-black text-white tracking-tight">{stat.value}</div>
                    <div className="text-[9px] text-slate-400 uppercase font-black tracking-widest">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Chat Interface */}
          <div className="relative group order-1 lg:order-2 perspective-1000">
            {/* Holographic Glow behind container - Animated */}
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-purple-600 rounded-[2.6rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 animate-pulse"></div>
            
            {/* Glass Container */}
            <div className="relative bg-[#050505]/80 border border-white/10 rounded-2xl md:rounded-[2.5rem] p-2 md:p-4 shadow-2xl backdrop-blur-2xl overflow-hidden h-[600px] flex flex-col ring-1 ring-white/5">
              
              {/* Header */}
              <div className="flex items-center justify-between mb-3 px-4 py-3 border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)] animate-pulse" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)] animate-pulse delay-75" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse delay-150" />
                </div>
                
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5 shadow-inner">
                   <Wifi className="w-3 h-3 text-emerald-400 animate-pulse" />
                   <span className="text-[10px] text-slate-300 font-mono tracking-wide">SAT-LINK: ACTIVE</span>
                </div>
              </div>

              {/* Chat Body */}
              <div className="flex-1 flex flex-col space-y-4 overflow-hidden px-2 relative">
                  {/* Subtle Grid overlay inside chat */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

                  <div className="flex flex-col h-full animate-in fade-in duration-500 relative z-10">
                    
                    {/* Early Bird Banner */}
                    <div className="bg-gradient-to-r from-blue-900/40 to-blue-800/40 border border-blue-500/30 p-3 mb-2 rounded-xl flex items-center justify-between shadow-lg backdrop-blur-md">
                        <div className="flex items-center gap-2">
                          <div className="relative">
                             <div className="absolute inset-0 bg-blue-400 blur-sm rounded-full animate-ping opacity-50"></div>
                             <Timer className="w-3.5 h-3.5 text-blue-300 relative z-10" />
                          </div>
                          <span className="text-[10px] font-bold text-blue-200 uppercase tracking-wide">Offer Ends In:</span>
                        </div>
                        <span className="text-[11px] font-mono text-white bg-black/50 border border-blue-500/50 px-2 py-0.5 rounded shadow-inner">{timeLeft}</span>
                    </div>

                    {/* Chat Messages */}
                    <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-hide p-2">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-medium leading-relaxed shadow-lg backdrop-blur-md transition-all hover:scale-[1.01] ${
                            msg.role === 'user' 
                              ? 'bg-blue-600 text-white rounded-br-none shadow-blue-900/20' 
                              : 'bg-[#1a1b26]/90 border border-white/10 text-slate-300 rounded-bl-none shadow-black/40'
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      ))}

                      {/* Pricing Cards */}
                      {hasShowedPricing && (
                        <div className="animate-in slide-in-from-bottom-4 duration-700 space-y-3 pt-2">
                          <div className="flex items-center gap-2 px-1">
                              <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin-slow" />
                              <span className="text-[10px] font-bold text-yellow-400 uppercase tracking-wide">Trajectory Options</span>
                          </div>
                          <div className="grid grid-cols-1 gap-2.5">
                            {[
                              { id: 'plan-foundation', name: 'Foundation', price: '₹1,20,000', rawAmount: 12000000, icon: Terminal, ctc: '6-12 LPA' },
                              { id: 'plan-elite', name: 'Elite', price: '₹2,00,000', rawAmount: 20000000, icon: Crown, ctc: '10-26 LPA' }
                            ].map((plan) => (
                              <div key={plan.id} className="bg-gradient-to-r from-white/5 to-white/[0.02] border border-white/10 p-3.5 rounded-xl flex items-center justify-between group hover:border-orange-500/40 hover:from-orange-900/10 hover:to-transparent transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-black/40 border border-white/5 flex items-center justify-center text-blue-400 group-hover:text-orange-400 transition-colors">
                                     <plan.icon className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider group-hover:text-orange-200">{plan.name}</div>
                                    <div className="text-lg font-bold text-white leading-tight">{plan.price}</div>
                                    <div className="text-[9px] text-emerald-400 font-bold uppercase mt-0.5">Avg Package: {plan.ctc}</div>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => handleRegister(plan)}
                                  className="px-4 py-2 bg-white text-black rounded-lg text-[10px] font-bold uppercase tracking-wide hover:bg-orange-400 hover:text-white transition-all shadow-lg"
                                >
                                  Launch
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-[#1a1b26]/80 border border-white/10 p-3 rounded-2xl rounded-bl-none backdrop-blur-md">
                            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Input Area */}
                    <form onSubmit={handleSendMessage} className="relative mb-1">
                      <input 
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Initialize command..."
                        className="w-full bg-black/40 border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-orange-500/50 focus:bg-black/60 transition-all backdrop-blur-md font-mono"
                      />
                      <button type="submit" className="absolute right-2 top-2 p-1.5 bg-orange-600 rounded-lg hover:bg-orange-500 transition-colors shadow-lg shadow-orange-900/20">
                        <Send className="w-3.5 h-3.5 text-white" />
                      </button>
                    </form>
                  </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-2 mt-2 flex items-center justify-between border-t border-white/5 bg-black/20">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] text-slate-500 font-mono uppercase tracking-widest">ENCRYPTION: MILITARY GRADE</span>
                </div>
                <div className="text-[9px] font-mono text-slate-600 uppercase">Manee v2.5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
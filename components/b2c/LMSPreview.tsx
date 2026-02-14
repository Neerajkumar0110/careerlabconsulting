'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Cpu, Globe, Shield, Zap, Terminal, Send, Sparkles, Loader2, Crown, Timer, Wifi 
} from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useRouter } from 'next/navigation';

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" }); 

const stats = [
  { label: 'Neural Training', value: '85%', icon: Cpu, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { label: 'Project Nodes', value: '12 Active', icon: Globe, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
  { label: 'Security Clearance', value: 'Lvl 4', icon: Shield, color: 'text-purple-500', bg: 'bg-purple-500/10' },
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
              Real-time code analysis and autonomous debugging.
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
            <div className="relative bg-[#0a0f1d] border border-white/10 rounded-2xl md:rounded-[2.5rem] p-2 md:p-4 shadow-2xl backdrop-blur-md overflow-hidden h-[600px] flex flex-col">
              
              <div className="flex items-center justify-between mb-3 px-4 py-2 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/40" />
                </div>
                
                <div className="flex items-center gap-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
                   <Wifi className="w-3 h-3 text-emerald-500" />
                   <span className="text-[10px] text-slate-400 font-mono">autonomous.manee.ai</span>
                </div>
              </div>

              <div className="flex-1 flex flex-col space-y-4 overflow-hidden px-2">
                  <div className="flex flex-col h-full animate-in fade-in duration-500">
                    
                    <div className="bg-blue-500/10 border border-blue-500/20 p-2.5 mb-2 rounded-xl flex items-center justify-between shadow-lg shadow-blue-900/10">
                        <div className="flex items-center gap-2">
                          <Timer className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wide">Early Bird: 10% OFF Active</span>
                        </div>
                        <span className="text-[10px] font-mono text-white bg-blue-600/80 border border-blue-500 px-2 py-0.5 rounded-md shadow-sm">{timeLeft}</span>
                    </div>

                    <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-hide p-2">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-medium leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                              ? 'bg-blue-600 text-white rounded-br-none' 
                              : 'bg-white/5 border border-white/10 text-slate-300 rounded-bl-none'
                          }`}>
                            {msg.content}
                          </div>
                        </div>
                      ))}

                      {hasShowedPricing && (
                        <div className="animate-in slide-in-from-bottom-4 duration-700 space-y-3 pt-2">
                          <div className="flex items-center gap-2 px-1">
                              <Sparkles className="w-3.5 h-3.5 text-yellow-500" />
                              <span className="text-[10px] font-bold text-yellow-500 uppercase tracking-wide">AI Recommended Plans</span>
                          </div>
                          <div className="grid grid-cols-1 gap-2.5">
                            {[
                              { id: 'plan-foundation', name: 'Foundation', price: '₹1,20,000', rawAmount: 12000000, icon: Terminal, ctc: '6-12 LPA' },
                              { id: 'plan-elite', name: 'Elite', price: '₹2,00,000', rawAmount: 20000000, icon: Crown, ctc: '10-26 LPA' }
                            ].map((plan) => (
                              <div key={plan.id} className="bg-white/5 border border-white/10 p-3.5 rounded-xl flex items-center justify-between group hover:border-blue-500/40 hover:bg-white/[0.07] transition-all cursor-pointer">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400">
                                     <plan.icon className="w-5 h-5" />
                                  </div>
                                  <div>
                                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{plan.name}</div>
                                    <div className="text-lg font-bold text-white leading-tight">{plan.price}</div>
                                    <div className="text-[9px] text-emerald-400 font-bold uppercase mt-0.5">Avg Package: {plan.ctc}</div>
                                  </div>
                                </div>
                                <button 
                                  onClick={() => handleRegister(plan)}
                                  className="px-4 py-2 bg-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wide text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20"
                                >
                                  Select
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-bl-none">
                            <Loader2 className="w-4 h-4 text-blue-400 animate-spin" />
                          </div>
                        </div>
                      )}
                    </div>

                    <form onSubmit={handleSendMessage} className="relative mb-1">
                      <input 
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Ask Manee to analyze your career path..."
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500/50 focus:bg-white/[0.07] transition-all"
                      />
                      <button type="submit" className="absolute right-2 top-2 p-1.5 bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors">
                        <Send className="w-3.5 h-3.5 text-white" />
                      </button>
                    </form>
                  </div>
              </div>

              <div className="px-4 py-2 mt-2 flex items-center justify-between border-t border-white/5">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9px] text-slate-400 font-mono uppercase tracking-widest">SYSTEM: ONLINE</span>
                </div>
                <div className="text-[9px] font-mono text-slate-600 uppercase">Encrypted v2.5</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
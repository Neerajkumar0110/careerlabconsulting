"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, X, MessageSquare, Flame, Minus, Info, UserCheck } from "lucide-react";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash", 
  systemInstruction: `You are Manee AI, the Senior Career Counselor at Career Lab Consulting (https://www.careerlabconsulting.com/). 
  Your expertise is in Industry-ready skills, AI-powered Neural LMS, and global career outcomes. 
  
  CORE RULES:
  1. AUTONOMOUS GUIDANCE: Proactively guide users through career transitions, skill gap analysis, and the benefits of the Neural LMS.
  2. NO DUMMY DATA: Never invent specific course fees. If asked about pricing, confirm the 10% Early Bird Discount is active and suggest a counselor call for a formal quote.
  3. PROFESSIONALISM: Maintain a tone like a top-tier UpGrad counselor—encouraging, data-driven, and structured.
  4. FORMATTING: Use bold text, bullet points, and clear headers to make responses easy to read.`
});

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { 
      role: "bot", 
      text: "### Welcome to Career Lab Consulting. \n\nI am **Manee**, your Career Advisor. I have automatically applied a **10% Early Bird Discount** to your profile. \n\nHow can I autonomously assist you in reaching your career goals today?" 
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
    const checkStatus = () => {
      const hasPaid = localStorage.getItem("manee_has_paid");
      if (hasPaid === "true") return;

      const lastVisit = localStorage.getItem("manee_last_visit");
      const now = new Date().getTime();
      
      if (lastVisit && (now - parseInt(lastVisit) < 86400000)) {
        setIsOpen(true);
      } else {
        setTimeout(() => setShowOffer(true), 3000);
      }
      localStorage.setItem("manee_last_visit", now.toString());
    };
    checkStatus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input;
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        })),
      });

      const result = await chat.sendMessage(userMessage);
      const botText = result.response.text();
      setMessages(prev => [...prev, { role: "bot", text: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "I'm experiencing a high volume of inquiries. Please hold on or reach us at info@careerlabconsulting.com." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-[999999] flex flex-col items-end pointer-events-none font-sans">
      
      {showOffer && !isOpen && (
        <div className="bg-[#b31f24] text-white p-5 rounded-2xl shadow-2xl w-80 mb-4 animate-bounce-gentle pointer-events-auto relative border border-white/20">
          <button onClick={() => setShowOffer(false)} className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full transition-colors"><X size={14} /></button>
          <div className="flex items-center gap-2 mb-2">
             <Flame size={18} className="text-yellow-400" fill="currentColor" />
             <span className="font-black text-[10px] uppercase tracking-[0.2em]">Priority Counselor</span>
          </div>
          <p className="text-[13px] font-bold leading-tight">Your 10% Early Bird Discount is active. Let's discuss your career growth. ✨</p>
        </div>
      )}

      {isOpen ? (
        <div className="w-[370px] md:w-[420px] h-[600px] md:h-[700px] bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden border border-slate-200 pointer-events-auto">
          
          <div className="bg-[#b31f24] p-6 text-white relative">
            <div className="absolute top-4 right-4 flex gap-4">
              <button onClick={() => setIsOpen(false)} className="hover:scale-110 transition-transform"><Minus size={22} /></button>
              <button onClick={() => setIsOpen(false)} className="hover:scale-110 transition-transform"><X size={22} /></button>
            </div>
            
            <div className="space-y-5">
              <div>
                <h3 className="text-2xl font-black tracking-tighter">Manee AI</h3>
                <p className="text-[10px] uppercase font-bold tracking-[0.3em] opacity-60">Career Lab Consulting</p>
              </div>
              
              <div className="bg-black/20 border border-white/10 rounded-2xl p-4 flex items-center gap-4 backdrop-blur-sm">
                <div className="relative">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-[#b31f24] font-black shadow-lg">CL</div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#b31f24] rounded-full"></div>
                </div>
                <div>
                  <p className="text-xs font-bold flex items-center gap-1.5"><UserCheck size={14} className="text-green-400" /> Counselor Online</p>
                  <p className="text-[10px] opacity-70 leading-tight italic">Analyzing Career Trajectories...</p>
                </div>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fcfdfe] scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                  msg.role === "user" 
                    ? "bg-[#1e1e1e] text-white rounded-tr-none shadow-md" 
                    : "bg-white text-slate-800 rounded-tl-none border border-slate-100 prose prose-sm font-medium"
                }`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex items-center gap-2 px-2">
                <div className="flex gap-1.5">
                  <div className="w-1.5 h-1.5 bg-[#b31f24] rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-[#b31f24] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-[#b31f24] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-100">
             <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-1.5 focus-within:border-[#b31f24]/20 transition-all shadow-inner">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask a question or share your goal..."
                  className="flex-1 bg-transparent py-3 text-sm outline-none text-slate-800 font-medium placeholder:text-slate-400"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-[#b31f24] text-white p-2.5 rounded-xl disabled:opacity-30 hover:shadow-xl hover:shadow-[#b31f24]/20 transition-all active:scale-90 shadow-md"
                >
                  <Send size={18} />
                </button>
             </div>
             <div className="flex items-center justify-center gap-2 mt-5 opacity-40">
                <Info size={12} />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Manee Autonomous Advisor v2.2</span>
             </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-[#b31f24] rounded-full flex items-center justify-center shadow-[0_25px_50px_-12px_rgba(179,31,36,0.6)] hover:scale-110 active:scale-95 transition-all pointer-events-auto relative group"
        >
          <div className="absolute inset-0 rounded-full bg-[#b31f24] animate-ping opacity-20 group-hover:hidden" />
          <MessageSquare className="text-white" size={32} />
          <div className="absolute top-2 right-2 bg-green-500 w-5 h-5 rounded-full border-4 border-[#b31f24]"></div>
        </button>
      )}

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
        .animate-bounce-gentle { animation: bounce-gentle 4s ease-in-out infinite; }
      `}</style>
    </div>,
    document.body
  );
}
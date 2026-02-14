"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, X, MessageSquare, Flame, CheckCircle2 } from "lucide-react";
import ReactMarkdown from "react-markdown"; 

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash", 
  systemInstruction: "You are Manee AI from Career Lab Consulting. Use professional formatting with bullet points and bold text. Always mention that a 10% Early Bird discount is automatically applied for new users."
});

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "### Welcome to Career Lab Consulting! \n\nI am **Manee AI**. I noticed you're exploring your future—I've automatically applied a **10% Early Bird Discount** to your account! 🚀\n\nHow can I help you today?" }
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
      const twentyFourHours = 24 * 60 * 60 * 1000;

      if (lastVisit && (now - parseInt(lastVisit) < twentyFourHours)) {
        setIsOpen(true);
      } else {
        setTimeout(() => setShowOffer(true), 3000);
      }
      
      localStorage.setItem("manee_last_visit", now.toString());
    };

    checkStatus();
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
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
      const response = await result.response;
      let botText = response.text();

      if (userMessage.toLowerCase().includes("price") || userMessage.toLowerCase().includes("cost")) {
        botText += "\n\n### 💎 Special Pricing (10% Discount Applied)\n* **Standard Plan:** ₹14,999  \n* **Pro Plan:** ₹24,999 \n\nWould you like to proceed to payment?";
      }

      setMessages(prev => [...prev, { role: "bot", text: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "**Manee AI:** Connection is a bit slow. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-[999999] flex flex-col items-end pointer-events-none">
      {showOffer && !isOpen && (
        <div className="bg-white text-gray-800 p-4 rounded-2xl shadow-2xl border border-blue-100 w-72 mb-4 animate-bounce-gentle pointer-events-auto relative border-l-4 border-l-green-500">
          <button 
            onClick={() => setShowOffer(false)}
            className="absolute -top-2 -right-2 bg-slate-800 text-white rounded-full w-6 h-6 flex items-center justify-center"
          >
            <X size={12} />
          </button>
          <div className="flex gap-3">
            <div className="bg-orange-100 p-2 rounded-full h-fit text-orange-600"><Flame size={20} /></div>
            <div>
              <h4 className="font-bold text-sm text-slate-900">Discount Activated!</h4>
              <p className="text-xs text-slate-500">Your **10% OFF** is waiting in the chat. Click to see pricing.</p>
            </div>
          </div>
        </div>
      )}

      {isOpen ? (
        <div className="w-[350px] md:w-[420px] h-[550px] md:h-[650px] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden border border-slate-200 pointer-events-auto">
          <div className="bg-[#020617] p-5 flex justify-between items-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-blue-600/10 blur-xl"></div>
            <div className="flex items-center gap-3 z-10">
              <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-2xl flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">M</div>
              <div>
                <h3 className="text-white font-bold text-sm">Manee AI</h3>
                <div className="flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] text-slate-400 font-medium">Always Active</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors z-10"><X size={20} /></button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-6 bg-[#f8fafc]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl shadow-sm ${
                  msg.role === "user" 
                    ? "bg-blue-600 text-white rounded-tr-none" 
                    : "bg-white text-slate-800 border border-slate-100 rounded-tl-none prose prose-sm prose-slate"
                }`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
               <div className="flex items-center gap-2 text-blue-500 text-[10px] font-bold uppercase tracking-widest pl-2">
                 <span className="animate-bounce">.</span><span className="animate-bounce delay-75">.</span><span className="animate-bounce delay-150">.</span>
                 Manee is thinking
               </div>
            )}
          </div>

          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex gap-2 bg-slate-100 p-1.5 rounded-2xl items-center">
              <input 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about courses, pricing..."
                className="flex-1 bg-transparent border-none px-4 py-2 text-sm focus:ring-0 outline-none text-slate-900"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isLoading}
                className="bg-blue-600 text-white p-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#020617] rounded-full flex items-center justify-center shadow-[0_15px_40px_rgba(37,99,235,0.4)] border-4 border-blue-600/20 hover:scale-110 transition-all pointer-events-auto group relative"
        >
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-[#020617] animate-pulse">1</div>
          <MessageSquare className="text-white group-hover:rotate-12 transition-transform" size={28} />
        </button>
      )}

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-gentle { animation: bounce-gentle 2.5s ease-in-out infinite; }
      `}</style>
    </div>,
    document.body
  );
}
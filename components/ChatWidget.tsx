"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, X, MessageSquare, Flame, Minus, Info } from "lucide-react";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ 
  model: "gemini-2.5-flash", 
  systemInstruction: "You are Manee AI, a professional career counselor from Career Lab Consulting. Your tone should be encouraging and professional like UpGrad counselors. Always keep answers structured. Mention the 10% auto-applied discount if pricing is asked."
});

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([
    { role: "bot", text: "Hey! Welcome to **Career Lab Consulting**! \n\nI am Manee, your personal career counselor. How can I help you upskill today?" }
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

  const handleSendMessage = async (customMsg?: string) => {
    const msgToSend = customMsg || input;
    if (!msgToSend.trim() || isLoading) return;

    setMessages(prev => [...prev, { role: "user", text: msgToSend }]);
    setInput("");
    setIsLoading(true);

    try {
      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        })),
      });

      const result = await chat.sendMessage(msgToSend);
      const response = await result.response;
      let botText = response.text();

      if (msgToSend.toLowerCase().includes("pricing") || msgToSend.toLowerCase().includes("program")) {
        botText += "\n\n**Special Early Bird Pricing (10% Off Applied):**\n* Standard: ₹13,499\n* Pro: ₹22,499";
      }

      setMessages(prev => [...prev, { role: "bot", text: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "Sorry, our counselors are currently busy. Please try again." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickOptions = [
    "I am looking for career growth",
    "Learn about programs",
    "I am just exploring"
  ];

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-[999999] flex flex-col items-end pointer-events-none font-sans">
      {showOffer && !isOpen && (
        <div className="bg-[#e01e26] text-white p-4 rounded-xl shadow-2xl w-72 mb-4 animate-bounce-gentle pointer-events-auto relative">
          <button onClick={() => setShowOffer(false)} className="absolute top-2 right-2 opacity-70 hover:opacity-100"><X size={14} /></button>
          <div className="flex items-center gap-2 mb-1">
             <Flame size={16} fill="white" />
             <span className="font-bold text-sm italic underline">DISCOUNT ACTIVE</span>
          </div>
          <p className="text-xs font-medium">10% Early Bird Discount has been applied to your profile! 🚀</p>
        </div>
      )}

      {isOpen ? (
        <div className="w-[360px] md:w-[400px] h-[580px] md:h-[650px] bg-[#f4f7f9] rounded-2xl shadow-[0_10px_40px_rgba(0,0,0,0.2)] flex flex-col overflow-hidden border border-slate-200 pointer-events-auto">
          <div className="bg-[#b31f24] p-4 text-white">
            <div className="flex justify-between items-start mb-4">
              <div className="flex flex-col">
                <span className="text-[10px] font-bold uppercase tracking-widest opacity-80">Career Lab</span>
                <h3 className="text-lg font-bold leading-none">Manee AI</h3>
              </div>
              <div className="flex gap-3">
                <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100"><Minus size={20} /></button>
                <button onClick={() => setIsOpen(false)} className="opacity-70 hover:opacity-100"><X size={20} /></button>
              </div>
            </div>
            <div className="bg-white/10 rounded-lg p-3 flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-[#b31f24] font-black text-xl shadow-inner">CL</div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-[#b31f24] rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold">We are online!</span>
                <span className="text-[10px] opacity-80">Our career experts are here to help.</span>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-xl shadow-sm ${
                  msg.role === "user" 
                    ? "bg-[#2d2d2d] text-white rounded-tr-none" 
                    : "bg-white text-slate-800 rounded-tl-none border border-slate-100 prose prose-sm"
                }`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            
            {!isLoading && messages.length < 3 && (
              <div className="flex flex-col gap-2 pt-2">
                {quickOptions.map((opt, i) => (
                  <button 
                    key={i}
                    onClick={() => handleSendMessage(opt)}
                    className="bg-white border border-slate-300 hover:border-[#b31f24] hover:text-[#b31f24] text-slate-700 text-xs font-bold py-2 px-4 rounded-lg transition-all text-left shadow-sm"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}

            {isLoading && <div className="text-[10px] font-bold text-slate-400 animate-pulse uppercase tracking-widest">Counselor is typing...</div>}
          </div>

          <div className="p-3 bg-white border-t border-slate-200">
             <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-1 focus-within:border-blue-400 transition-colors">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Type your query here..."
                  className="flex-1 bg-transparent py-2 text-sm outline-none text-slate-800"
                />
                <button 
                  onClick={() => handleSendMessage()}
                  disabled={isLoading}
                  className="text-[#b31f24] disabled:opacity-30 hover:scale-110 transition-transform"
                >
                  <Send size={20} />
                </button>
             </div>
             <p className="text-[9px] text-center text-slate-400 mt-2 flex items-center justify-center gap-1">
               <Info size={10} /> Powered by Manee Intelligence
             </p>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 bg-[#b31f24] rounded-full flex items-center justify-center shadow-2xl hover:scale-105 active:scale-95 transition-all pointer-events-auto relative group"
        >
          <div className="absolute inset-0 rounded-full bg-[#b31f24] animate-ping opacity-20" />
          <MessageSquare className="text-white" size={28} />
          <div className="absolute -top-1 -right-1 bg-green-500 w-5 h-5 rounded-full border-4 border-white"></div>
        </button>
      )}

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-8px); }
        }
        .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
      `}</style>
    </div>,
    document.body
  );
}
"use client";

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, X, MessageSquare, Flame, Minus, Info, UserCheck, Volume2, VolumeX } from "lucide-react";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ 
  model: "gemini-1.5-flash", 
  systemInstruction: `You are Manee, a friendly Indian female career counselor at Career Lab Consulting. 
  Your tone is warm, professional, and empathetic. 
  If you know the user's name, greet them personally. 
  Strictly follow Career Lab Consulting context: Neural LMS, Mentorship, and Industry Skills.
  Do not invent pricing. Confirm 10% discount is applied.`
});

export default function ChatWidget() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [userName, setUserName] = useState("Scholar"); 
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const speak = (text: string) => {
    if (!isVoiceEnabled || typeof window === "undefined") return;
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text.replace(/[#*]/g, ''));
    utterance.lang = 'en-IN'; 
    utterance.rate = 1.0;
    utterance.pitch = 1.1; 
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    setMounted(true);
    
    const storedName = localStorage.getItem("user_display_name");
    if (storedName) setUserName(storedName);

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

    const welcomeText = `### Namaste ${storedName || 'Scholar'}! \n\nI am **Manee**, your career counselor. I've activated a **10% discount** for you. How can I help you upskill today?`;
    setMessages([{ role: "bot", text: welcomeText }]);
    
    checkStatus();
  }, []);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (isOpen && lastMessage?.role === "bot") {
      speak(lastMessage.text);
    }
  }, [messages, isOpen]);

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const chat = model.startChat({
        history: messages.map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        })),
      });

      const result = await chat.sendMessage(userMsg);
      const botText = result.response.text();
      setMessages(prev => [...prev, { role: "bot", text: botText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "I'm having a small technical glitch. Please try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-[999999] flex flex-col items-end pointer-events-none font-sans">
      
      {showOffer && !isOpen && (
        <div className="bg-[#b31f24] text-white p-5 rounded-2xl shadow-2xl w-80 mb-4 animate-bounce-gentle pointer-events-auto relative">
          <button onClick={() => setShowOffer(false)} className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full"><X size={14} /></button>
          <p className="text-[13px] font-bold">Namaste! Your 10% Early Bird Discount is active. Let's talk career! 🌸</p>
        </div>
      )}

      {isOpen ? (
        <div className="w-[370px] md:w-[420px] h-[600px] md:h-[700px] bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden border border-slate-200 pointer-events-auto">
          <div className="bg-[#b31f24] p-6 text-white relative">
            <div className="absolute top-4 right-4 flex gap-3">
              <button onClick={() => setIsVoiceEnabled(!isVoiceEnabled)} className="p-1 hover:bg-white/10 rounded-full">
                {isVoiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
              <button onClick={() => setIsOpen(false)}><Minus size={22} /></button>
              <button onClick={() => setIsOpen(false)}><X size={22} /></button>
            </div>
            
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-slate-200">
                    <img 
                      src="https://img.freepik.com/free-photo/smiling-indian-businesswoman-working-laptop-office_231208-2735.jpg" 
                      alt="Manee AI Counselor"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#b31f24] rounded-full"></div>
                </div>
                <div>
                  <h3 className="text-xl font-black">Manee AI</h3>
                  <p className="text-[10px] uppercase font-bold tracking-widest opacity-70">Expert Career Counselor</p>
                  <p className="text-[10px] text-green-300 font-bold mt-1 flex items-center gap-1">
                    <UserCheck size={10} /> Personalized for {userName}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#fcfdfe] scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] p-4 rounded-2xl text-[14px] leading-relaxed shadow-sm ${
                  msg.role === "user" 
                    ? "bg-[#1e1e1e] text-white rounded-tr-none" 
                    : "bg-white text-slate-800 rounded-tl-none border border-slate-100 prose prose-sm font-medium"
                }`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && <div className="p-2 animate-pulse text-[#b31f24] font-bold text-xs">Manee is thinking...</div>}
          </div>

          <div className="p-6 bg-white border-t border-slate-100">
             <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-1.5 focus-within:border-[#b31f24]/20 transition-all">
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder="Ask me anything..."
                  className="flex-1 bg-transparent py-3 text-sm outline-none text-slate-800 font-medium"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-[#b31f24] text-white p-2.5 rounded-xl hover:scale-105 active:scale-95 transition-all"
                >
                  <Send size={18} />
                </button>
             </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-[#b31f24] rounded-full p-1 shadow-2xl hover:scale-110 transition-all pointer-events-auto relative group overflow-hidden"
        >
          <img 
            src="https://img.freepik.com/free-photo/smiling-indian-businesswoman-working-laptop-office_231208-2735.jpg" 
            className="w-full h-full object-cover rounded-full grayscale-[20%] group-hover:grayscale-0"
            alt="Chat"
          />
          <div className="absolute top-2 right-2 bg-green-500 w-4 h-4 rounded-full border-2 border-[#b31f24]"></div>
        </button>
      )}

      <style jsx>{`
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        .animate-bounce-gentle { animation: bounce-gentle 4s ease-in-out infinite; }
      `}</style>
    </div>,
    document.body
  );
}
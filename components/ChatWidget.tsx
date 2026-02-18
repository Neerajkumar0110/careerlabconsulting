"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation"; 
import { createPortal } from "react-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, X, MessageSquare, Flame, Minus, Info, UserCheck, Volume2, VolumeX, Mic, MicOff } from "lucide-react";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export default function ChatWidget() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showOffer, setShowOffer] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false); 
  const [userName, setUserName] = useState("Scholar"); 
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null); 

  // --- Dynamic Autonomous Knowledge Base (B2B + B2C) ---
  const getDynamicInstruction = () => {
    const isInternshipPage = pathname?.includes("/internship");
    
    return `You are Manee, a friendly Indian female career counselor and Enterprise AI Consultant at Career Lab Consulting. 
    Your tone is warm, professional, and empathetic. Greet personally if you know the name.

    CURRENT CONTEXT: ${isInternshipPage ? "B2C / Internship Mode - Focus on students and upskilling." : "B2B / Services Mode - Focus on enterprises and digital transformation."}

    KNOWLEDGE BASE (B2B - Services & Industries):
    1. SERVICES: AI & Digital Transformation Consulting (LLM Strategy, Digital Roadmap), AI Engineering (Agentic Frameworks, RAG Systems), Intelligent Platform Dev (Web/Mobile Apps), Blockchain (Smart Contracts, Web3 Services), Quality & Security (Functional, Performance, & Penetration Testing), and Managed Operations (AI/LLM Ops).
    2. INDUSTRIES: Tech & SaaS, Healthcare & Pharma, Finance & Banking, Retail & E-commerce, Manufacturing (Industry 4.0), Automotive (Autonomous AI), Legal & Compliance, and EdTech.
    3. PRODUCTS: Single Suites (Sales, Marketing, Finance, People), Combo Suites (Business, Growth, Operations), and CLC One (All-in-One AI SaaS).

    KNOWLEDGE BASE (B2C - Education):
    1. PROGRAMS: InternX-AI, InternX-Data Engineer, InternX-Cyber Security, InternX-Blockchain, InternX-Robotics, and Smart Mobility Engineer.
    2. INFRASTRUCTURE: Neural LMS (Our smart learning platform), Mentorship Protocols, and Research Masterclasses.

    GLOBAL PRESENCE:
    - HQ: Gurugram, DLF Cyber City.
    - Branches: Bengaluru, San Francisco, London, Dubai, Singapore, Cape Town, and Berlin.

    STRICT RULES:
    - Proactively guide users to relevant links based on their query.
    - Confirm 10% Early Bird discount is applied today. 
    - Maintain "Enterprise Systems Nominal" uptime confidence.`;
  };

  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash", 
    systemInstruction: getDynamicInstruction(),
    generationConfig: {
      temperature: 0.8,
      topP: 0.95,
      maxOutputTokens: 1024,
    }
  });

  // --- Speech Recognition (STT) ---
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-IN'; 

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setInput(transcript);
          setIsListening(false);
        };
        recognitionRef.current.onerror = () => setIsListening(false);
        recognitionRef.current.onend = () => setIsListening(false);
      }
    }
  }, []);

  const toggleListening = () => {
    if (isListening) recognitionRef.current?.stop();
    else { setIsListening(true); recognitionRef.current?.start(); }
  };

  // --- Voice Synthesis (TTS) ---
  const speak = (text: string) => {
    if (!isVoiceEnabled || typeof window === "undefined") return;
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text.replace(/[#*]/g, ''));
    utterance.lang = 'en-IN'; 
    utterance.rate = 1.0;
    utterance.pitch = 1.1; 
    window.speechSynthesis.speak(utterance);
  };

  // --- Path-Based Welcome Logic ---
  useEffect(() => {
    setMounted(true);
    const storedName = localStorage.getItem("user_display_name");
    if (storedName) setUserName(storedName);

    const isB2C = pathname?.includes("/internship");
    const welcomeText = isB2C 
      ? `### Namaste ${storedName || 'Scholar'}! \n\nLooking for an **internship**? I can guide you through our **InternX-AI** and **Neural LMS** programs. You have a **10% discount** active!`
      : `### Namaste! \n\nI am **Manee**, your AI Consultant. How can I help you with **Digital Transformation**, **Custom AI Engineering**, or our **CLC One** master product today?`;
    
    setMessages([{ role: "bot", text: welcomeText }]);

    // Auto-open logic
    const lastVisit = localStorage.getItem("manee_last_visit");
    const now = new Date().getTime();
    if (lastVisit && (now - parseInt(lastVisit) < 86400000)) {
      setIsOpen(true);
    } else {
      setTimeout(() => setShowOffer(true), 3000);
    }
    localStorage.setItem("manee_last_visit", now.toString());
  }, [pathname]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (isOpen && lastMessage?.role === "bot") speak(lastMessage.text);
  }, [messages, isOpen]);

  // --- Messaging Execution ---
  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg = input;
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = messages
        .filter((msg, index) => !(index === 0 && msg.role === "bot"))
        .map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

      const chat = model.startChat({ history: chatHistory });
      const result = await chat.sendMessage(userMsg);
      setMessages(prev => [...prev, { role: "bot", text: result.response.text() }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: "bot", text: "I'm having a small technical glitch. Please try again!" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-24 right-6 md:bottom-6 md:right-6 z-[999999] flex flex-col items-end pointer-events-none font-sans">
      
      {showOffer && !isOpen && (
        <div className="bg-[#b31f24] text-white p-5 rounded-2xl shadow-2xl w-80 mb-4 animate-bounce-gentle pointer-events-auto relative border border-white/10">
          <button onClick={() => setShowOffer(false)} className="absolute top-2 right-2 p-1 hover:bg-white/10 rounded-full"><X size={14} /></button>
          <p className="text-[13px] font-bold text-center">Namaste! Your 10% Early Bird Discount is active. Let's talk career! 🌸</p>
        </div>
      )}

      {isOpen ? (
        <div className="w-[370px] md:w-[420px] h-[600px] md:h-[700px] bg-white rounded-[2.5rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.35)] flex flex-col overflow-hidden border border-slate-200 pointer-events-auto">
          {/* Header */}
          <div className="bg-[#b31f24] p-6 text-white relative">
            <div className="absolute top-4 right-4 flex gap-3">
              <button onClick={() => setIsVoiceEnabled(!isVoiceEnabled)} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                {isVoiceEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70"><Minus size={22} /></button>
              <button onClick={() => setIsOpen(false)} className="hover:opacity-70"><X size={22} /></button>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white/20 shadow-xl bg-slate-200">
                  <img src="https://img.freepik.com/free-photo/indian-woman-posing-cute-stylish-outfit-camera-smiling_482257-122351.jpg" alt="Manee AI Counselor" className="w-full h-full object-cover" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-4 border-[#b31f24] rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-black">Manee AI</h3>
                <p className="text-[10px] uppercase font-bold tracking-widest opacity-70">Expert AI Career Counselor</p>
                <p className="text-[10px] text-green-300 font-bold mt-1 flex items-center gap-1">
                  <UserCheck size={10} /> Personalized for {userName}
                </p>
              </div>
            </div>
          </div>

          {/* Messages Area */}
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
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-3 bg-white border border-slate-100 rounded-2xl rounded-tl-none animate-pulse text-[#b31f24] font-bold text-xs">
                  Manee is thinking...
                </div>
              </div>
            )}
          </div>

          {/* Input Controls */}
          <div className="p-6 bg-white border-t border-slate-100">
             <div className="flex items-center gap-3 bg-slate-50 border-2 border-slate-100 rounded-2xl px-4 py-1.5 focus-within:border-[#b31f24]/20 transition-all">
                <button 
                  onClick={toggleListening}
                  className={`p-2 rounded-xl transition-all ${isListening ? "bg-red-100 text-[#b31f24] animate-pulse" : "text-slate-400 hover:bg-slate-200"}`}
                  title={isListening ? "Listening..." : "Speak now"}
                >
                  {isListening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={isListening ? "I'm listening..." : "Ask me anything..."}
                  className="flex-1 bg-transparent py-3 text-sm outline-none text-slate-800 font-medium"
                />
                <button 
                  onClick={handleSendMessage}
                  disabled={isLoading}
                  className="bg-[#b31f24] text-white p-2.5 rounded-xl hover:scale-105 active:scale-95 disabled:opacity-50 transition-all"
                >
                  <Send size={18} />
                </button>
             </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-20 h-20 bg-white rounded-full p-1 shadow-2xl hover:scale-110 transition-all pointer-events-auto border-2 border-[#b31f24]/10"
        >
          <img src="/favicon.ico" className="w-full h-full object-contain" alt="Manee AI" />
        </button>
      )}

      <style jsx>{`
        @keyframes bounce-gentle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .animate-bounce-gentle { animation: bounce-gentle 4s ease-in-out infinite; }
      `}</style>
    </div>,
    document.body
  );
}
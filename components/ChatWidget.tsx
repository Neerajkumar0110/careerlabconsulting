// components/ChatWidget.tsx

"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname, useRouter } from "next/navigation"; 
import { createPortal } from "react-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, X, MessageSquare, Flame, Minus, Info, UserCheck, Volume2, VolumeX, Mic, MicOff, CreditCard, Briefcase } from "lucide-react";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export default function ChatWidget() {
  const pathname = usePathname();
  const router = useRouter();
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

  const getDynamicInstruction = () => {
    const isInternshipPage = pathname?.includes("/internship");
    const isHireXPage = pathname?.includes("/hirex");
    const isFreelanceXPage = pathname?.includes("/freelancex");
    
    let modeContext = "B2B / Services Mode - Focus on enterprises and digital transformation.";
    if (isInternshipPage) modeContext = "B2C / Internship Mode - Focus on students, career growth, and upskilling.";
    if (isHireXPage) modeContext = "HireX Mode - Focus on AI-driven Recruitment and Autonomous Hiring.";
    if (isFreelanceXPage) modeContext = "FreelanceX Mode - Focus on Global Freelancing, High-Ticket Client Acquisition, and AI Portfolio Building.";

    return `You are Manee, a friendly Indian female career counselor and Enterprise AI Consultant at Career Lab Consulting. 
    Your tone is warm, professional, and empathetic. Greet personally if you know the name.

    CURRENT CONTEXT: ${modeContext}

    ${isFreelanceXPage ? `
    KNOWLEDGE BASE (FreelanceX):
    1. SOLUTIONS: High-Ticket Client Pitching, Global Freelance Network, AI-Powered Portfolio (ResumeNFT).
    2. KEY SERVICES: Upwork/Fiverr Optimization, Personal Branding for Developers, Tax & Legal for Freelancers.
    3. TARGET: Helping tech professionals earn in USD ($) from global markets.
    ` : ""}

    ${isInternshipPage ? `
    PRICING PLANS (B2C - InternX-AI):
    1. FOUNDATION PLAN (6 Months): ₹1,20,000 (India) / $1,499 (Intl). Avg CTC ₹6-12 LPA.
    2. ELITE PLAN (12 Months): ₹2,00,000 (India) / $2,699 (Intl). Avg CTC ₹10-26 LPA. 100% Legal Contract.
    ` : ""}

    KNOWLEDGE BASE (General): 
    - AI & Digital Transformation, Agentic Frameworks, Web/Mobile Apps, Blockchain.
    - Global Presence: HQ in Gurugram. Branches in Bengaluru, SF, London, Dubai, Singapore.

    STRICT RULES:
    - ${isInternshipPage ? "MANDATORY: Mention 10% Early Bird discount." : "DO NOT mention discounts."}
    - ${isFreelanceXPage ? "Focus on helping the user build a global freelance career asset." : ""}
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

  const speak = (text: string) => {
    if (!isVoiceEnabled || typeof window === "undefined") {
      window.speechSynthesis.cancel();
      return;
    }
    window.speechSynthesis.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text.replace(/[#*]/g, ''));
    utterance.lang = 'en-IN'; 
    utterance.rate = 1.0;
    utterance.pitch = 1.1; 
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoice = () => {
    const newState = !isVoiceEnabled;
    setIsVoiceEnabled(newState);
    if (!newState && typeof window !== "undefined") {
      window.speechSynthesis.cancel();
    }
  };

  useEffect(() => {
    setMounted(true);
    const storedName = localStorage.getItem("user_display_name");
    if (storedName) setUserName(storedName);

    const isB2C = pathname?.includes("/internship");
    const isHireX = pathname?.includes("/hirex");
    const isFreelanceX = pathname?.includes("/freelancex");

    let welcomeText = `### Namaste! \n\nI am **Manee**, your AI Consultant. How can I help you today?`;

    if (isB2C) {
      welcomeText = `### Namaste ${storedName || 'Scholar'}! \n\nLooking for an **internship**? I can guide you through our **Foundation** and **Elite** plans. \n\n**Special Offer:** A 10% Early Bird discount is active!`;
    } else if (isHireX) {
      welcomeText = `### Namaste! \n\nWelcome to **HireX**. I am your **Autonomous Recruitment Bot**. How can I automate your hiring process today?`;
    } else if (isFreelanceX) {
      welcomeText = `### Namaste! \n\nWelcome to **FreelanceX**. I am your **Freelance Strategy Consultant**. Ready to acquire **high-ticket global clients** and earn in **USD**? How can I help?`;
    }
    
    setMessages([{ role: "bot", text: welcomeText }]);

    if (isB2C || isFreelanceX) {
        const lastVisit = localStorage.getItem("manee_last_visit");
        const now = new Date().getTime();
        if (lastVisit && (now - parseInt(lastVisit) < 86400000)) {
          setIsOpen(true);
        } else {
          setTimeout(() => setShowOffer(true), 3000);
        }
        localStorage.setItem("manee_last_visit", now.toString());
    } else {
        setShowOffer(false); 
    }
  }, [pathname]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (isOpen && lastMessage?.role === "bot") speak(lastMessage.text);
  }, [messages, isOpen, isVoiceEnabled]);

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
    <div className="fixed bottom-4 right-4 z-[999999] flex flex-col items-end pointer-events-none font-sans">
      
      {showOffer && !isOpen && (pathname?.includes("/internship") || pathname?.includes("/freelancex")) && (
        <div className="bg-[#b31f24] text-white p-2.5 rounded-lg shadow-lg w-48 mb-3 animate-bounce-gentle pointer-events-auto relative border border-white/10">
          <button onClick={() => setShowOffer(false)} className="absolute top-1 right-1 p-0.5 hover:bg-white/10 rounded-full"><X size={8} /></button>
          <p className="text-[10px] font-bold text-center">
            {pathname?.includes("/freelancex") ? "Global Career Growth Active! 🚀" : "Scholarship + 10% Off! 🌸"}
          </p>
        </div>
      )}

      {isOpen ? (
        <div className="w-[290px] md:w-[320px] h-[460px] md:h-[530px] bg-white rounded-[1.8rem] shadow-[0_20px_50px_rgba(0,0,0,0.25)] flex flex-col overflow-hidden border border-slate-200 pointer-events-auto">
          <div className="bg-[#b31f24] p-3 text-white relative">
            <div className="absolute top-3 right-3 flex gap-1.5">
              <button onClick={toggleVoice} className="p-1 hover:bg-white/10 rounded-full transition-colors">
                {isVoiceEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
              </button>
              <button onClick={() => setIsOpen(false)} className="p-0.5 hover:opacity-70"><Minus size={18} /></button>
              <button onClick={() => setIsOpen(false)} className="p-0.5 hover:opacity-70"><X size={18} /></button>
            </div>
            
            <div className="flex items-center gap-2.5">
              <div className="relative">
                <div className="w-9 h-9 rounded-lg overflow-hidden border-2 border-white/20 shadow-lg bg-white p-0.5">
                  <img src="https://cdn-icons-png.flaticon.com/512/18355/18355220.png" alt="Manee AI" className="w-full h-full object-contain" />
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-[#b31f24] rounded-full"></div>
              </div>
              <div>
                <h3 className="text-sm font-black leading-tight">Manee AI</h3>
                <p className="text-[7px] uppercase font-bold tracking-widest opacity-70">Expert AI Consultant</p>
                <p className="text-[7px] text-green-300 font-bold flex items-center gap-1">
                  <UserCheck size={7} /> Personalized
                </p>
              </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-3.5 space-y-3.5 bg-[#fcfdfe] scroll-smooth">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[90%] p-2.5 rounded-xl text-[11px] leading-relaxed shadow-sm ${
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
                <div className="p-1.5 bg-white border border-slate-100 rounded-lg rounded-tl-none animate-pulse text-[#b31f24] font-bold text-[9px]">
                  Manee is thinking...
                </div>
              </div>
            )}
          </div>

          {(pathname?.includes("/internship") || pathname?.includes("/freelancex")) && (
              <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
                {pathname?.includes("/freelancex") ? (
                  <>
                    <button onClick={() => setInput("How to get global clients?")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-600 hover:border-[#b31f24] transition-all flex items-center gap-1">
                      <Briefcase size={10} /> Global Clients
                    </button>
                    <button onClick={() => setInput("What is ResumeNFT?")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-600 hover:border-[#b31f24] transition-all flex items-center gap-1">
                      <Info size={10} /> ResumeNFT
                    </button>
                  </>
                ) : (
                  <>
                    <button onClick={() => setInput("Tell me about the Foundation Plan")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-600 hover:border-[#b31f24] transition-all flex items-center gap-1">
                      <Info size={10} /> Foundation Plan
                    </button>
                    <button onClick={() => setInput("Tell me about the Elite Plan")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-600 hover:border-[#b31f24] transition-all flex items-center gap-1">
                      <Flame size={10} /> Elite Plan
                    </button>
                  </>
                )}
              </div>
          )}

          <div className="p-3 bg-white border-t border-slate-100">
             <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2 py-0.5 focus-within:border-[#b31f24]/20 transition-all">
                <button onClick={toggleListening} className={`p-1.5 rounded-lg transition-all ${isListening ? "bg-red-100 text-[#b31f24] animate-pulse" : "text-slate-400 hover:bg-slate-200"}`}>
                  {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                </button>
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={isListening ? "Listening..." : "Type here..."}
                  className="flex-1 bg-transparent py-2 text-[10px] outline-none text-slate-800 font-medium"
                />
                <button onClick={handleSendMessage} disabled={isLoading} className="bg-[#b31f24] text-white p-1.5 rounded-lg hover:scale-105 transition-all">
                  <Send size={12} />
                </button>
             </div>
          </div>
        </div>
      ) : (
        <button onClick={() => setIsOpen(true)} className="w-12 h-12 bg-white rounded-full p-2 shadow-2xl hover:scale-110 transition-all pointer-events-auto border-2 border-[#b31f24]/10">
          <img src="https://cdn-icons-png.flaticon.com/512/18355/18355220.png" className="w-full h-full object-contain" alt="Manee AI" />
        </button>
      )}

      <style jsx>{`
        @keyframes bounce-gentle { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        .animate-bounce-gentle { animation: bounce-gentle 4s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>,
    document.body
  );
}
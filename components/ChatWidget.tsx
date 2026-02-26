// components/ChatWidget.tsx

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation"; 
import { createPortal } from "react-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  Send, X, MessageSquare, Flame, Minus, Info, 
  UserCheck, Volume2, VolumeX, Mic, MicOff, 
  Briefcase, PhoneCall, Video as VideoIcon, Play, Sparkles, Trophy 
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");

export default function ChatWidget() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showVideoIntro, setShowVideoIntro] = useState(false); 
  const [showOffer, setShowOffer] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false); 
  const [userName, setUserName] = useState("Scholar"); 
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null); 
  const activeRecognitionRef = useRef<any>(null); 
  const currentInputRef = useRef(""); 
  const messagesRef = useRef(messages); 
  const isLoadingRef = useRef(isLoading);

  useEffect(() => { messagesRef.current = messages; }, [messages]);
  useEffect(() => { isLoadingRef.current = isLoading; }, [isLoading]);

  const getDynamicInstruction = () => {
    const isInternshipPage = pathname?.includes("/internship");
    const isHireXPage = pathname?.includes("/hirex");
    const isFreelanceXPage = pathname?.includes("/freelancex");
    const isAptitudePage = pathname?.includes("/aptitude-test");
    
    let modeContext = "B2B / Services Mode - Digital transformation and enterprise AI solutions.";
    if (isInternshipPage) modeContext = "Internship Mode - Guiding students to take the 'Scholarship Test' for career growth.";
    if (isHireXPage) modeContext = "HireX Mode - Focus on AI Recruitment, outbound calling engines, and the 'Aptitude Assessment'.";
    if (isFreelanceXPage) modeContext = "FreelanceX Mode - Focus on global high-ticket client acquisition and earning in USD.";
    if (isAptitudePage) modeContext = "Assessment Mode - Helping the candidate stay focused and calm during the hiring test.";

    return `You are Manee, an Autonomous Indian Professional Female AI Agent at Career Lab Consulting.
    Tone: 30-year-old corporate consultant, highly professional, fluent in Hinglish (Hindi + English).
    
    AUTONOMOUS BRAIN:
    - If user asks for help/jobs, say: "Main aapki madad kar sakti hoon. Aap hamara assessment start karein?"
    - Explain Outbound Sales AI: 1 Lakh calls/day with real human-level voice.
    - If student asks about internship: Guide them to the 'Scholarship Test'.

    STRICT RULES:
    - Sound natural and mature. Use Hinglish: "Zaroor! Main zaroor help karungi."
    - NO Markdown formatting (no **, #). The voice engine needs clean text.
    - Focus: ${modeContext}`;
  };

  const triggerSend = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoadingRef.current) return;
    
    const userMsg = messageText.trim();
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setInput("");
    setIsLoading(true);

    try {
      const model = genAI.getGenerativeModel({ 
        model: "gemini-2.5-pro",
        systemInstruction: getDynamicInstruction()
      });

      const chatHistory = messagesRef.current
        .filter((msg, index) => !(index === 0 && msg.role === "bot"))
        .map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

      const chat = model.startChat({ history: chatHistory });
      const result = await chat.sendMessage(userMsg);
      setMessages(prev => [...prev, { role: "bot", text: result.response.text() }]);
    } catch (error: any) {
      console.error("Manee AI Error:", error);
      // 🚀 QUOTA/429 HANDLING: Professional Fallback
      setMessages(prev => [...prev, { role: "bot", text: "Maaf kijiyega, abhi bahut saare users mujhse baat kar rahe hain. Kya main aapko Assessment link bhejoon?" }]);
    } finally {
      setIsLoading(false);
    }
  }, [pathname]);

  const toggleListening = async () => {
    if (isListening) {
      if (activeRecognitionRef.current) activeRecognitionRef.current.stop();
      setIsListening(false);
      return;
    }
    window.speechSynthesis.cancel();
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Browser speech recognition support nahi karta.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; 
    recognition.interimResults = true; 
    recognition.lang = 'hi-IN'; 

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      let currentText = event.results[0][0].transcript;
      setInput(currentText);
      currentInputRef.current = currentText; 
    };

    recognition.onend = () => {
      setIsListening(false);
      if (currentInputRef.current.trim().length > 0) {
        triggerSend(currentInputRef.current);
        currentInputRef.current = ""; 
      }
    };
    activeRecognitionRef.current = recognition;
    recognition.start();
  };

  const speak = (text: string) => {
    if (!isVoiceEnabled || typeof window === "undefined" || showVideoIntro) {
      window.speechSynthesis.cancel();
      return;
    }
    window.speechSynthesis.cancel(); 
    const cleanText = text.replace(/[*#_`]/g, '').replace(/\n/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    const voices = window.speechSynthesis.getVoices();
    // Optimized for Natural Indian Accents
    let selectedVoice = voices.find(v => v.name.includes("Google हिन्दी") || v.name.includes("Neerja") || v.lang === "en-IN");
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.lang = 'en-IN';
    utterance.rate = 1.0;
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoice = () => {
    const newState = !isVoiceEnabled;
    setIsVoiceEnabled(newState);
    if (!newState) window.speechSynthesis.cancel();
  };

  const openChatWithIntro = () => {
    setIsOpen(true);
    setShowVideoIntro(true);
  };

  useEffect(() => {
    setMounted(true);
    const storedName = localStorage.getItem("user_display_name");
    if (storedName) setUserName(storedName);

    const isB2C = pathname?.includes("/internship");
    const isHireX = pathname?.includes("/hirex");
    const isFreelanceX = pathname?.includes("/freelancex");

    let welcomeText = `Namaste! I am Manee, your Autonomous AI Consultant. Main aapki digital transformation mein kaise madad kar sakti hoon?`;
    if (isB2C) welcomeText = `Namaste ${storedName || 'Scholar'}! Career guidance chahiye? Hamara scholarship test abhi live hai!`;
    else if (isHireX) welcomeText = `Namaste! Welcome to HireX. Humara AI engine hiring ko 100% autonomous bana sakta hai. Details jaanni hain?`;
    else if (isFreelanceX) welcomeText = `Namaste! Welcome to FreelanceX. Dollar ($) mein earn karna shuru karein?`;
    
    setMessages([{ role: "bot", text: welcomeText }]);
    setTimeout(() => setShowOffer(true), 5000);
  }, [pathname]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (isOpen && !showVideoIntro && lastMessage?.role === "bot") speak(lastMessage.text);
  }, [messages, isOpen, isVoiceEnabled, showVideoIntro]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed bottom-4 right-4 z-[999999] flex flex-col items-end pointer-events-none font-sans text-slate-900">
      
      {/* 🌸 Autonomous Offer Notification */}
      {showOffer && !isOpen && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="bg-gradient-to-r from-[#b31f24] to-rose-600 text-white p-3 rounded-2xl shadow-2xl w-56 mb-4 pointer-events-auto relative border border-white/20"
        >
          <button onClick={() => setShowOffer(false)} className="absolute -top-2 -left-2 bg-black text-white rounded-full p-1 border border-white/20"><X size={10} /></button>
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-lg"><Sparkles size={14} className="text-yellow-300" /></div>
            <p className="text-[10px] font-bold leading-tight">Manee: Limited hiring slots for top scorers are open! 🌸</p>
          </div>
        </motion.div>
      )}

      {isOpen ? (
        <motion.div 
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-[320px] md:w-[380px] h-[550px] md:h-[620px] bg-white rounded-[2.5rem] shadow-[0_25px_60px_rgba(0,0,0,0.4)] flex flex-col overflow-hidden border border-slate-200 pointer-events-auto relative"
        >
          {showVideoIntro && (
            <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center">
                <video 
                    ref={videoRef} autoPlay playsInline onEnded={() => setShowVideoIntro(false)}
                    className="w-full h-full object-cover"
                >
                    <source src="https://www.youtube.com/watch?v=whqLvigQWoE&t=61s" type="video/mp4" /> 
                </video>
                <button 
                    onClick={() => setShowVideoIntro(false)}
                    className="absolute top-6 right-6 bg-black/40 backdrop-blur-xl text-white text-[10px] px-4 py-2 rounded-full border border-white/20 hover:bg-black/60 transition-all flex items-center gap-1"
                >
                    Skip Intro <X size={12}/>
                </button>
            </div>
          )}

          <div className="bg-gradient-to-b from-[#b31f24] to-[#8c181c] p-5 text-white shadow-lg">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-12 h-12 rounded-2xl overflow-hidden border-2 border-white/30 shadow-xl bg-white p-0.5">
                            <img src="https://cdn-icons-png.flaticon.com/512/18355/18355220.png" alt="Manee" className="w-full h-full object-contain" />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#b31f24] rounded-full animate-pulse"></div>
                    </div>
                    <div>
                        <h3 className="text-[15px] font-black tracking-tight">Manee AI</h3>
                        <p className="text-[8px] uppercase font-black tracking-[0.15em] text-rose-200">Autonomous Enterprise Agent</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={toggleVoice} className="p-2 hover:bg-white/10 rounded-xl transition-all">
                      {isVoiceEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                    </button>
                    <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-xl transition-all"><Minus size={20} /></button>
                </div>
            </div>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-5 space-y-5 bg-[#f8f9fb] custom-scrollbar">
            {messages.map((msg, i) => (
              <motion.div initial={{ opacity: 0, x: msg.role === "user" ? 20 : -20 }} animate={{ opacity: 1, x: 0 }} key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] p-4 rounded-[1.5rem] text-[13px] leading-relaxed shadow-sm ${
                  msg.role === "user" ? "bg-black text-white rounded-tr-none" : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
                }`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </motion.div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 bg-white border border-slate-100 rounded-2xl rounded-tl-none animate-pulse text-[#b31f24] font-black text-[10px] tracking-widest uppercase">Manee is thinking...</div>
              </div>
            )}
          </div>

          <div className="px-4 py-3 bg-white border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
                <button onClick={() => triggerSend("Start My Assessment")} className="whitespace-nowrap px-4 py-2 bg-blue-50 border border-blue-100 rounded-full text-[10px] font-black text-blue-600 hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2">
                  <Trophy size={12} /> Start Assessment
                </button>
                <button onClick={() => triggerSend("How does AI Voice Demo work?")} className="whitespace-nowrap px-4 py-2 bg-rose-50 border border-rose-100 rounded-full text-[10px] font-black text-[#b31f24] hover:bg-[#b31f24] hover:text-white transition-all flex items-center gap-2">
                  <PhoneCall size={12} /> AI Voice Demo
                </button>
          </div>

          <div className="p-5 bg-white border-t border-slate-100">
             <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-[1.5rem] px-4 py-1.5 focus-within:border-[#b31f24]/40 focus-within:bg-white transition-all shadow-inner">
                <button onClick={toggleListening} className={`p-2 rounded-xl transition-all ${isListening ? "bg-red-500 text-white animate-pulse shadow-lg shadow-red-500/30" : "text-slate-400 hover:text-slate-600"}`}>
                  {isListening ? <MicOff size={18} /> : <Mic size={18} />}
                </button>
                <input 
                  value={input} onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && triggerSend(input)}
                  placeholder={isListening ? "Listening..." : "Poochiye, main yahan hoon..."}
                  className="flex-1 bg-transparent py-3 text-[13px] outline-none text-slate-800 font-medium placeholder:text-slate-400"
                />
                <button onClick={() => triggerSend(input)} disabled={isLoading || !input.trim()} className="bg-[#b31f24] text-white p-2.5 rounded-2xl hover:scale-105 transition-all shadow-lg shadow-red-500/20 disabled:opacity-30">
                  <Send size={16} />
                </button>
             </div>
          </div>
        </motion.div>
      ) : (
        <button 
            onClick={openChatWithIntro} 
            className="w-20 h-20 bg-white rounded-3xl p-3 shadow-[0_15px_40px_rgba(0,0,0,0.2)] hover:scale-110 transition-all pointer-events-auto border-2 border-slate-100 relative group overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#b31f24]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <img src="https://cdn-icons-png.flaticon.com/512/18355/18355220.png" className="w-full h-full object-contain relative z-10" alt="Manee AI" />
          <div className="absolute top-1 right-1 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-[9px] text-white font-black animate-bounce border-2 border-white shadow-lg">1</div>
          <div className="absolute inset-0 rounded-3xl border-2 border-[#b31f24]/20 animate-ping opacity-20"></div>
        </button>
      )}

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>,
    document.body
  );
}
// components/ChatWidget.tsx

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation"; 
import { createPortal } from "react-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, X, MessageSquare, Flame, Minus, Info, UserCheck, Volume2, VolumeX, Mic, MicOff, Briefcase, PhoneCall, Video as VideoIcon, Play } from "lucide-react";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "");

export default function ChatWidget() {
  const pathname = usePathname();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showVideoIntro, setShowVideoIntro] = useState(false); // New state for AI Video
  const [showOffer, setShowOffer] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false); 
  const [userName, setUserName] = useState("Scholar"); 
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "bot"; text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null); // Ref for Video Player
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
    
    let modeContext = "B2B / Services Mode - Focus on enterprises and digital transformation.";
    if (isInternshipPage) modeContext = "B2C / Internship Mode - Focus on students, career growth, and upskilling.";
    if (isHireXPage) modeContext = "HireX Mode - Focus on AI-driven Recruitment and Autonomous Hiring.";
    if (isFreelanceXPage) modeContext = "FreelanceX Mode - Focus on Global Freelancing, High-Ticket Client Acquisition, and AI Portfolio Building.";

    return `You are Manee, an Indian Professional Female AI Agent, Enterprise AI Consultant, and Career Counselor at Career Lab Consulting.
    Your tone is highly professional, warm, and mature. You speak like a 30-year-old corporate expert.
    You comfortably speak in a natural, highly fluent mix of English and Hinglish (e.g., "Yes, bilkul! Main isme aapki madad kar sakti hoon."). 

    YOUR CORE AI CAPABILITIES:
    1. Outbound Sales Voice AI: Real Human-Level Voice training, native Indian/Hinglish accents, capable of 1 Lakh+ Outbound Sales Calls autonomously.
    2. Video Content Generation: Autonomous 5-minute video content creation for marketing and training.

    CURRENT CONTEXT: ${modeContext}

    STRICT RULES:
    - You must sound like a mature Indian professional female.
    - Keep responses concise and impactful so they sound natural when spoken out loud.
    - No markdown formatting like asterisks (**) or hashtags (#) in your text, keep it clean for the text-to-speech engine.`;
  };

  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.0-flash", 
    systemInstruction: getDynamicInstruction(),
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      maxOutputTokens: 1024,
    }
  });

  const triggerSend = useCallback(async (messageText: string) => {
    if (!messageText.trim() || isLoadingRef.current) return;
    
    setMessages(prev => [...prev, { role: "user", text: messageText }]);
    setInput("");
    setIsLoading(true);

    try {
      const chatHistory = messagesRef.current
        .filter((msg, index) => !(index === 0 && msg.role === "bot"))
        .map(m => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

      const chat = model.startChat({ history: chatHistory });
      const result = await chat.sendMessage(messageText);
      setMessages(prev => [...prev, { role: "bot", text: result.response.text() }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "bot", text: "Maaf kijiyega, mujhe ek technical error aa raha hai. Kya aap phir se try kar sakte hain?" }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const toggleListening = async () => {
    if (isListening) {
      if (activeRecognitionRef.current) {
        activeRecognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    window.speechSynthesis.cancel();
    setInput("");
    currentInputRef.current = "";

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      alert("Please Microphone access allow karein.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

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

    recognition.onerror = () => setIsListening(false);
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
    let selectedVoice = voices.find(v => v.name.includes("Google हिन्दी") || v.name.includes("Neerja"));
    if (selectedVoice) utterance.voice = selectedVoice;
    utterance.lang = 'en-IN';
    utterance.rate = 0.95;
    window.speechSynthesis.speak(utterance);
  };

  const toggleVoice = () => {
    const newState = !isVoiceEnabled;
    setIsVoiceEnabled(newState);
    if (!newState) window.speechSynthesis.cancel();
  };

  // Function to handle opening chat with video logic
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

    let welcomeText = `Namaste! I am Manee, your AI Consultant. Main aapki digital transformation mein kaise madad kar sakti hoon?`;
    if (isB2C) welcomeText = `Namaste ${storedName || 'Scholar'}! Internship ke liye guide karun?`;
    else if (isHireX) welcomeText = `Namaste! Welcome to HireX. Main Manee hoon. 1 Lakh outbound calls karni ho ya training videos, I am ready!`;
    else if (isFreelanceX) welcomeText = `Namaste! Welcome to FreelanceX. USD mein earn karna shuru karein?`;
    
    setMessages([{ role: "bot", text: welcomeText }]);
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
    <div className="fixed bottom-4 right-4 z-[999999] flex flex-col items-end pointer-events-none font-sans">
      
      {/* Dynamic Offer Notification */}
      {showOffer && !isOpen && (pathname?.includes("/internship") || pathname?.includes("/freelancex")) && (
        <div className="bg-[#b31f24] text-white p-2.5 rounded-lg shadow-lg w-48 mb-3 animate-bounce-gentle pointer-events-auto relative border border-white/10">
          <button onClick={() => setShowOffer(false)} className="absolute top-1 right-1 p-0.5 hover:bg-white/10 rounded-full"><X size={8} /></button>
          <p className="text-[10px] font-bold text-center">Scholarship + 10% Off! 🌸</p>
        </div>
      )}

      {isOpen ? (
        <div className="w-[300px] md:w-[350px] h-[500px] md:h-[580px] bg-white rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col overflow-hidden border border-slate-200 pointer-events-auto relative">
          
          {showVideoIntro && (
            <div className="absolute inset-0 z-[100] bg-black flex flex-col items-center justify-center">
                <video 
                    ref={videoRef}
                    autoPlay 
                    playsInline
                    onEnded={() => setShowVideoIntro(false)}
                    className="w-full h-full object-cover"
                >
                    <source src="/ai-intro-video.mp4" type="video/mp4" /> 
                </video>
                
                <button 
                    onClick={() => setShowVideoIntro(false)}
                    className="absolute top-4 right-4 bg-white/20 backdrop-blur-md text-white text-[10px] px-3 py-1.5 rounded-full border border-white/30 hover:bg-white/40 transition-all flex items-center gap-1"
                >
                    Skip Intro <X size={10}/>
                </button>

                {/* Video Info Label */}
                <div className="absolute bottom-6 left-0 right-0 text-center">
                    <p className="text-white/80 text-[10px] font-medium tracking-widest uppercase">Manee AI Avatar Introduction</p>
                </div>
            </div>
          )}

          {/* HEADER */}
          <div className="bg-[#b31f24] p-4 text-white">
            <div className="flex justify-between items-start mb-1">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-white/20 shadow-lg bg-white p-0.5">
                            <img src="https://cdn-icons-png.flaticon.com/512/18355/18355220.png" alt="Manee AI" className="w-full h-full object-contain" />
                        </div>
                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 border-2 border-[#b31f24] rounded-full"></div>
                    </div>
                    <div>
                        <h3 className="text-sm font-black">Manee AI</h3>
                        <p className="text-[7px] uppercase font-bold tracking-widest opacity-70">Enterprise Voice & Video Agent</p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <button onClick={toggleVoice} className="p-1 hover:bg-white/10 rounded-full">{isVoiceEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}</button>
                    <button onClick={() => setIsOpen(false)}><X size={20} /></button>
                </div>
            </div>
          </div>

          {/* MESSAGES */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fcfdfe]">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[85%] p-3 rounded-2xl text-[12px] shadow-sm ${
                  msg.role === "user" ? "bg-black text-white rounded-tr-none" : "bg-white text-slate-800 rounded-tl-none border border-slate-100"
                }`}>
                  <ReactMarkdown>{msg.text}</ReactMarkdown>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="p-2 bg-white border border-slate-100 rounded-xl rounded-tl-none animate-pulse text-[#b31f24] font-bold text-[10px]">Manee is typing...</div>
              </div>
            )}
          </div>

          {/* QUICK SUGGESTIONS */}
          <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
                <button onClick={() => triggerSend("How to get global clients?")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-600 hover:border-[#b31f24] flex items-center gap-1">
                  <Briefcase size={10} /> Global Clients
                </button>
                <button onClick={() => triggerSend("Tell me about AI Voice Calling")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-600 hover:border-[#b31f24] flex items-center gap-1">
                  <PhoneCall size={10} /> AI Voice
                </button>
          </div>

          {/* INPUT BAR */}
          <div className="p-4 bg-white border-t border-slate-100">
             <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-3 py-1 focus-within:border-[#b31f24]/30 transition-all">
                <button onClick={toggleListening} className={`p-1.5 rounded-lg ${isListening ? "bg-red-100 text-[#b31f24] animate-pulse" : "text-slate-400"}`}>
                  {isListening ? <MicOff size={16} /> : <Mic size={16} />}
                </button>
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && triggerSend(input)}
                  placeholder={isListening ? "Listening..." : "Type here..."}
                  className="flex-1 bg-transparent py-2 text-xs outline-none text-slate-800 font-medium"
                />
                <button onClick={() => triggerSend(input)} disabled={isLoading} className="bg-[#b31f24] text-white p-2 rounded-xl hover:scale-105 transition-all">
                  <Send size={14} />
                </button>
             </div>
          </div>
        </div>
      ) : (
        /* CLOSED STATE ICON */
        <button 
            onClick={openChatWithIntro} 
            className="w-16 h-16 bg-white rounded-full p-2.5 shadow-2xl hover:scale-110 transition-all pointer-events-auto border-2 border-[#b31f24]/10 relative group"
        >
          <div className="absolute -top-10 right-0 bg-white text-slate-800 text-[10px] font-bold py-1 px-3 rounded-full shadow-lg border border-slate-100 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            Talk to Manee AI 🌸
          </div>
          <img src="https://cdn-icons-png.flaticon.com/512/18355/18355220.png" className="w-full h-full object-contain" alt="Manee AI" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[8px] text-white font-bold animate-pulse border-2 border-white">1</div>
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
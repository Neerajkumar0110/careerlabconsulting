// components/ChatWidget.tsx

"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation"; 
import { createPortal } from "react-dom";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Send, X, MessageSquare, Flame, Minus, Info, UserCheck, Volume2, VolumeX, Mic, MicOff, Briefcase, PhoneCall, Video } from "lucide-react";
import ReactMarkdown from "react-markdown";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || "");

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
    model: "gemini-2.5-flash", 
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

  // 🎤 THE KICKSTART HACK: Forces Chrome to ask for permissions properly
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

    // 🔥 FORCE CHROME PERMISSION POPUP 🔥
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      // Stop the stream immediately, we only needed Chrome to grant the permission!
      stream.getTracks().forEach(track => track.stop());
    } catch (err) {
      console.warn("UserMedia Permission Denied:", err);
      alert("Please URL bar ke left side wale 'Settings/Tune' icon par click karein aur Microphone ko 'Allow' karein.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser. Please use Chrome.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false; 
    recognition.interimResults = true; 
    recognition.lang = 'hi-IN'; 

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let interimTranscript = '';
      let finalTranscript = '';

      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }

      const currentText = finalTranscript || interimTranscript;
      setInput(currentText);
      currentInputRef.current = currentText; 
    };

    recognition.onerror = (event: any) => {
      setIsListening(false);
      console.warn("Speech Error:", event.error);
    };

    recognition.onend = () => {
      setIsListening(false);
      if (currentInputRef.current.trim().length > 0) {
        triggerSend(currentInputRef.current);
        currentInputRef.current = ""; 
      }
    };

    activeRecognitionRef.current = recognition;

    try {
      recognition.start();
    } catch (e) {
      console.warn("Could not start mic:", e);
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if (!isVoiceEnabled || typeof window === "undefined") {
      window.speechSynthesis.cancel();
      return;
    }
    window.speechSynthesis.cancel(); 
    
    const cleanText = text.replace(/[*#_`]/g, '').replace(/\n/g, ' ');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    
    const voices = window.speechSynthesis.getVoices();
    const preferredVoices = [
      "Google हिन्दी",                        
      "Microsoft Neerja Online (Natural)",  
      "Microsoft Neerja",                   
      "Veena",                              
      "Google UK English Female"            
    ];

    let selectedVoice = null;
    for (const voiceName of preferredVoices) {
      selectedVoice = voices.find(v => v.name.includes(voiceName));
      if (selectedVoice) break;
    }

    if (!selectedVoice) {
      selectedVoice = voices.find(v => v.lang.includes('IN') && (v.name.includes('Female') || v.name.includes('female')));
    }
    
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }

    utterance.lang = 'en-IN';
    utterance.rate = 0.95;  
    utterance.pitch = 0.85; 
    
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

    let welcomeText = `Namaste! I am Manee, your AI Consultant. Main aapki digital transformation mein kaise madad kar sakti hoon?`;

    if (isB2C) welcomeText = `Namaste ${storedName || 'Scholar'}! Looking for an internship? Main aapko hamare plans ke baare mein guide kar sakti hoon.`;
    else if (isHireX) welcomeText = `Namaste! Welcome to HireX. I am Manee. I can seamlessly execute 1 Lakh outbound calls or auto-create training videos. Kaise help karun aaj?`;
    else if (isFreelanceX) welcomeText = `Namaste! Welcome to FreelanceX. Ready to acquire high-ticket global clients aur USD mein earn karna shuru karein? Let's strategize!`;
    
    setMessages([{ role: "bot", text: welcomeText }]);

    if (typeof window !== "undefined") {
      window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
    }
  }, [pathname]);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
    if (isOpen && lastMessage?.role === "bot") speak(lastMessage.text);
  }, [messages, isOpen, isVoiceEnabled]);

  const handleSendMessage = () => {
    triggerSend(input);
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
                <p className="text-[7px] uppercase font-bold tracking-widest opacity-70">Voice & Video AI Agent</p>
                <p className="text-[7px] text-green-300 font-bold flex items-center gap-1">
                  <UserCheck size={7} /> Native Hinglish
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
                  Manee is typing/thinking...
                </div>
              </div>
            )}
          </div>

          <div className="px-3 py-2 bg-slate-50 border-t border-slate-100 flex gap-2 overflow-x-auto no-scrollbar">
            {pathname?.includes("/freelancex") ? (
              <>
                <button onClick={() => triggerSend("How to get global clients?")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-600 hover:border-[#b31f24] transition-all flex items-center gap-1">
                  <Briefcase size={10} /> Global Clients
                </button>
                <button onClick={() => triggerSend("What is ResumeNFT?")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-600 hover:border-[#b31f24] transition-all flex items-center gap-1">
                  <Info size={10} /> ResumeNFT
                </button>
              </>
            ) : pathname?.includes("/hirex") ? (
              <>
                <button onClick={() => triggerSend("Can you make 1 Lakh outbound sales calls?")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-600 hover:border-[#b31f24] transition-all flex items-center gap-1">
                  <PhoneCall size={10} /> Outbound Calls
                </button>
                <button onClick={() => triggerSend("Can you generate a 5-min training video?")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-600 hover:border-[#b31f24] transition-all flex items-center gap-1">
                  <Video size={10} /> AI Video Creation
                </button>
              </>
            ) : (
              <>
                <button onClick={() => triggerSend("Tell me about your Outbound Voice capability")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-600 hover:border-[#b31f24] transition-all flex items-center gap-1">
                  <PhoneCall size={10} /> AI Voice Calling
                </button>
                <button onClick={() => triggerSend("Tell me about the Foundation Plan")} className="whitespace-nowrap px-3 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-bold text-slate-600 hover:border-[#b31f24] transition-all flex items-center gap-1">
                  <Info size={10} /> Foundation Plan
                </button>
              </>
            )}
          </div>

          <div className="p-3 bg-white border-t border-slate-100">
             <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-xl px-2 py-0.5 focus-within:border-[#b31f24]/20 transition-all">
                <button 
                  onClick={toggleListening} 
                  className={`p-1.5 rounded-lg transition-all ${isListening ? "bg-red-100 text-[#b31f24] animate-pulse scale-110" : "text-slate-400 hover:bg-slate-200"}`}
                  title="Click to speak"
                >
                  {isListening ? <MicOff size={14} /> : <Mic size={14} />}
                </button>
                <input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  placeholder={isListening ? "Listening... Speak now" : "Type here..."}
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
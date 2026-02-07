'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, AlertCircle, Loader2, Sparkles, User } from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

export default function AIAutonomousClass() {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(true);
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState([
    { role: 'ai', content: 'Namaste! Main aapka AI Instructor hoon. Aaj hum "EXPLORE FREE MASTER CLASSES" series mein Career Growth ke secrets seekhenge. Kya aap shuru karne ke liye taiyar hain?' }
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recognitionRef = useRef<any>(null);

  // Gemini Setup
  const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY || "");
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Note: Use 1.5-flash as 2.5 is not public in all regions yet

  // 1. AI Ki Awaaz (Text to Speech)
  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'hi-IN';
      utterance.rate = 1.1;
      utterance.onend = () => startListening(); // Bolne ke baad sunna shuru kare
      window.speechSynthesis.speak(utterance);
    }
  };

  // 2. User Ki Baatein Sunna (Speech Recognition)
  const startListening = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition && !isMuted) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'hi-IN';
      
      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setMessages(prev => [...prev, { role: 'user', content: transcript }]);
        getAIResponse(transcript);
      };

      try { recognitionRef.current.start(); } catch (e) {}
    }
  };

  // 3. Gemini Response Logic
  const getAIResponse = async (userText: string) => {
    setIsAiThinking(true);
    try {
      const prompt = `Context: This is a Live Master Class session about "EXPLORE FREE MASTER CLASSES". 
      You are the instructor. Respond to: "${userText}" in Hinglish. Keep it engaging and professional.`;
      
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();
      
      setMessages(prev => [...prev, { role: 'ai', content: responseText }]);
      speak(responseText);
    } catch (err) {
      console.error("Gemini Error:", err);
    } finally {
      setIsAiThinking(false);
    }
  };

  // 4. Initial Setup & Permissions
  useEffect(() => {
    async function initSession() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { width: 1280, height: 720 }, 
          audio: true 
        });
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setError(null);
        
        // Auto-start the lesson
        setTimeout(() => speak(messages[0].content), 1000);
      } catch (err: any) {
        setError("Camera/Mic Permission Denied. Please enable it in browser settings (click the lock icon in URL bar).");
      }
    }

    initSession();
    return () => {
      streamRef.current?.getTracks().forEach(t => t.stop());
      window.speechSynthesis.cancel();
      if (recognitionRef.current) recognitionRef.current.stop();
    };
  }, []);

  return (
    <div className="h-[100dvh] bg-[#02040a] text-white flex flex-col overflow-hidden font-sans">
      {/* Dynamic Header */}
      <header className="p-4 flex justify-between items-center bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping absolute" />
            <div className="w-3 h-3 bg-red-600 rounded-full relative" />
          </div>
          <span className="font-black tracking-tighter text-sm md:text-lg">MASTERCLASS: LIVE</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
          <Sparkles size={14} className="text-blue-400" />
          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Gemini 2.0 AI Mode</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col lg:flex-row p-2 md:p-4 gap-4 overflow-hidden">
        
        {/* Left: AI Content/Video Area */}
        <div className="flex-[1.5] relative rounded-[24px] md:rounded-[40px] overflow-hidden bg-gradient-to-br from-blue-950/20 to-black border border-white/10 shadow-2xl min-h-[300px]">
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            {/* AI Avatar Animation */}
            <div className={`relative mb-8 transition-all duration-700 ${isAiThinking ? 'scale-110' : 'scale-100'}`}>
              <div className="absolute inset-0 bg-blue-500 rounded-full blur-[60px] opacity-20 animate-pulse" />
              <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-2 border-white/10 flex items-center justify-center relative z-10 bg-black/40 backdrop-blur-3xl">
                <div className={`w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-indigo-500 border-l-transparent ${isAiThinking ? 'animate-spin' : 'animate-[spin_10s_linear_infinite]'}`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 md:w-20 md:h-20 bg-gradient-to-tr from-blue-600 to-indigo-600 rounded-full shadow-[0_0_30px_rgba(37,99,235,0.5)]" />
                </div>
              </div>
            </div>
            
            <h2 className="text-2xl md:text-3xl font-black mb-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/50">
              {isAiThinking ? 'Processing Intelligence...' : 'Career Masterclass'}
            </h2>
            <p className="text-blue-400/80 font-medium text-sm md:text-base px-4">
              Lesson 1: Industrial Career Secrets & AI Integration
            </p>
          </div>

          {/* Student PIP Window (Optimized for Mobile) */}
          <div className="absolute bottom-4 right-4 w-32 h-44 md:w-48 md:h-64 bg-black rounded-2xl md:rounded-[24px] border-2 border-white/20 overflow-hidden shadow-2xl z-20">
            <video ref={videoRef} autoPlay muted playsInline className="w-full h-full object-cover scale-x-[-1]" />
            {!isVideoOn && (
              <div className="absolute inset-0 bg-slate-900 flex flex-col items-center justify-center gap-2">
                <User size={32} className="text-white/20" />
                <span className="text-[10px] text-white/40 font-bold uppercase">Video Off</span>
              </div>
            )}
          </div>

          {/* Error Handler */}
          {error && (
            <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-8 text-center">
              <div className="max-w-md space-y-4">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto border border-red-500/40">
                  <AlertCircle className="text-red-500" size={32} />
                </div>
                <h3 className="text-xl font-bold">Permissions Required</h3>
                <p className="text-white/60 text-sm leading-relaxed">{error}</p>
                <button onClick={() => window.location.reload()} className="bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-blue-500 hover:text-white transition-all">
                  Try Enabling Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Right: Transcript/Chat Section */}
        <div className="flex-1 bg-white/[0.03] backdrop-blur-2xl rounded-[24px] md:rounded-[40px] border border-white/10 flex flex-col overflow-hidden max-h-[400px] lg:max-h-full">
          <div className="p-5 border-b border-white/10 flex justify-between items-center bg-white/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Live Discussion</span>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,1)]" />
              <span className="text-[10px] font-bold text-green-500">CONNECTED</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-4 scroll-smooth scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'ai' ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-[85%] p-4 rounded-[20px] text-sm leading-relaxed shadow-xl ${
                  m.role === 'ai' 
                  ? 'bg-blue-600 text-white rounded-tl-none font-medium' 
                  : 'bg-white/10 text-white/90 rounded-tr-none border border-white/10 backdrop-blur-md'
                }`}>
                  {m.content}
                </div>
              </div>
            ))}
            {isAiThinking && (
              <div className="flex gap-2 items-center bg-white/5 w-fit p-3 rounded-2xl animate-pulse">
                <Loader2 size={16} className="animate-spin text-blue-500" />
                <span className="text-xs font-bold text-white/40 italic">AI is drafting notes...</span>
              </div>
            )}
          </div>

          {/* Modern Controls */}
          <div className="p-6 bg-black/40 border-t border-white/5 flex flex-wrap justify-center items-center gap-3 md:gap-6">
            <button onClick={() => {
              const tracks = streamRef.current?.getAudioTracks();
              if(tracks) tracks[0].enabled = isMuted;
              setIsMuted(!isMuted);
            }} className={`p-4 md:p-5 rounded-2xl transition-all active:scale-95 ${isMuted ? 'bg-red-500' : 'bg-white/5 hover:bg-white/10'}`}>
              {isMuted ? <MicOff size={22} /> : <Mic size={22} />}
            </button>
            
            <button onClick={() => setIsVideoOn(!isVideoOn)} className={`p-4 md:p-5 rounded-2xl transition-all active:scale-95 ${!isVideoOn ? 'bg-red-500' : 'bg-white/5 hover:bg-white/10'}`}>
              {!isVideoOn ? <VideoOff size={22} /> : <Video size={22} />}
            </button>

            <button onClick={() => window.location.href = '/'} className="bg-red-600 hover:bg-red-700 text-white px-8 md:px-12 h-14 md:h-16 rounded-2xl flex items-center gap-3 font-black text-xs md:text-sm uppercase tracking-widest transition-all shadow-lg shadow-red-600/20 active:scale-95">
              <PhoneOff size={20} className="hidden sm:block" /> Leave Class
            </button>
          </div>
        </div>
      </main>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
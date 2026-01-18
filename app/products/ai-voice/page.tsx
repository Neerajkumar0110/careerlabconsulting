'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, MicOff, Volume2, Bot, Sparkles, MessageCircle, Phone, Building2, Users } from 'lucide-react';
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/sections/Footer";
import { GoogleGenerativeAI } from "@google/generative-ai";

const CLC_CONTEXT = `
You are the Official AI Career Expert for Career Lab Consulting (CLC) Pvt Ltd.
Address: 5th Floor, Cyber Green Part-1, DLF Building No-2, Sector 25, Gurugram, Haryana 122002.
B2C Services: Software Testing, Cloud Computing, Data Science, InternX-AI (₹1,00,000).
B2B Services: Corporate Training, Bulk Talent Acquisition, Campus Recruitment.
WhatsApp/Call: +91 8700236923.
Tone: Professional and concise. Keep answers strictly under 25 words.
`;

export default function AIVoicePage() {
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [status, setStatus] = useState('Idle');
  const [genderFilter, setGenderFilter] = useState<'male' | 'female'>('female');

  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);

  const contactNumber = "+918700236923";

  useEffect(() => {
    const SpeechRecognition = typeof window !== 'undefined' && ((window as any).SpeechRecognition || (window as any).webkitSpeechRecognition);
    
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false; 
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-IN';

      recognitionRef.current.onstart = () => { setIsListening(true); setStatus('Listening...'); };
      recognitionRef.current.onresult = (event: any) => {
        const current = event.results[event.results.length - 1];
        const text = current[0].transcript;
        setTranscript(text);
        if (current.isFinal) { processWithAI(text); recognitionRef.current.stop(); }
      };
      recognitionRef.current.onerror = (event: any) => {
        setIsListening(false);
        setStatus(event.error === 'no-speech' ? 'No speech detected.' : 'Error: ' + event.error);
      };
      recognitionRef.current.onend = () => { setIsListening(false); setStatus((prev) => (prev === 'Listening...' ? 'Idle' : prev)); };
    }

    if (typeof window !== 'undefined') synthRef.current = window.speechSynthesis;
    return () => { if (synthRef.current) synthRef.current.cancel(); };
  }, []);

  const processWithAI = async (userInput: string) => {
    if (!userInput.trim()) return;
    setStatus('Thinking...');
    try {
      const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
      if (!apiKey) return setStatus("API Key Missing");
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });
      const result = await model.generateContent(`${CLC_CONTEXT}\nUser: ${userInput}\nResponse:`);
      const text = result.response.text();
      setAiResponse(text);
      speak(text);
    } catch (error) { setStatus('AI Error. Try again.'); }
  };

  const speak = (text: string) => {
    if (!synthRef.current) return;
    synthRef.current.cancel(); 
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = synthRef.current.getVoices();
    utterance.voice = voices.find(v => genderFilter === 'female' ? v.name.includes('India') : v.name.includes('David')) || voices[0];
    utterance.onstart = () => { setIsSpeaking(true); setStatus('Speaking...'); };
    utterance.onend = () => { setIsSpeaking(false); setStatus('Idle'); };
    synthRef.current.speak(utterance);
  };

  const toggleMic = () => {
    if (isListening) recognitionRef.current?.stop();
    else {
      setTranscript(''); setAiResponse('');
      if (synthRef.current) synthRef.current.cancel();
      try { recognitionRef.current?.start(); } catch (e) { console.error(e); }
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <Navbar portal="B2B" />
      
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-10 pb-10">
        
        <div className="mb-8 text-center animate-fade-in">
            <span className="bg-blue-600/20 text-blue-400 text-[10px] px-3 py-1 rounded-full border border-blue-600/30 font-bold tracking-tighter">B2B & CORPORATE SOLUTIONS AVAILABLE</span>
        </div>

        <div className="flex bg-slate-900 border border-white/10 p-1 rounded-full mb-12">
          {['female', 'male'].map((v) => (
            <button key={v} onClick={() => setGenderFilter(v as any)}
              className={`px-8 py-2 rounded-full text-[10px] font-bold uppercase transition-all ${genderFilter === v ? 'bg-blue-600 shadow-lg' : 'text-slate-400 hover:text-white'}`}>
              {v} Voice
            </button>
          ))}
        </div>

        <div className="relative flex items-center justify-center">
          <motion.div animate={isListening || isSpeaking ? { scale: [1, 1.25, 1], opacity: [0.2, 0.5, 0.2] } : {}}
            transition={{ duration: 1.5, repeat: Infinity }}
            className={`absolute w-80 h-80 rounded-full blur-[80px] ${isListening ? 'bg-blue-500/40' : isSpeaking ? 'bg-purple-600/40' : 'bg-transparent'}`}
          />
          <div className="relative w-64 h-64 bg-slate-900/80 border border-white/10 rounded-full flex flex-col items-center justify-center p-6 text-center backdrop-blur-md">
            <div className={`mb-4 p-4 rounded-2xl ${isListening ? 'bg-blue-600' : 'bg-white/5'}`}>
              {isSpeaking ? <Volume2 className="animate-pulse" /> : <Bot size={32} className={isListening ? 'text-white' : 'text-blue-400'} />}
            </div>
            <h3 className="text-blue-500 font-bold text-[10px] tracking-widest uppercase mb-2">{status}</h3>
            <p className="text-xs text-slate-400 italic min-h-[3em]">{transcript || "Ask about Careers or B2B Training"}</p>
          </div>
        </div>

        <div className="mt-12 flex items-center gap-6">
            <a href={`tel:${contactNumber}`} className="p-4 rounded-full bg-slate-800 border border-white/10 hover:bg-slate-700 transition-all">
                <Phone size={20} className="text-blue-400" />
            </a>
            <button onClick={toggleMic} className={`p-10 rounded-full transition-all relative ${isListening ? 'bg-red-500' : 'bg-blue-600 shadow-2xl shadow-blue-500/30'}`}>
                {isListening ? <MicOff size={32} /> : <Mic size={32} />}
                {isListening && <span className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-75"></span>}
            </button>
            <a href={`https://wa.me/${contactNumber.replace('+', '')}`} target="_blank" className="p-4 rounded-full bg-slate-800 border border-white/10 hover:bg-slate-700 transition-all">
                <MessageCircle size={20} className="text-green-400" />
            </a>
        </div>

        <AnimatePresence>
          {aiResponse && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="mt-10 p-6 bg-white/5 border border-white/10 rounded-3xl max-w-md text-center backdrop-blur-xl">
              <p className="text-slate-200 italic text-sm mb-4">"{aiResponse}"</p>
              <div className="flex justify-center gap-3">
                <a href={`https://wa.me/${contactNumber.replace('+', '')}`} className="text-[10px] font-bold bg-green-600/20 text-green-400 px-4 py-2 rounded-full border border-green-600/30 flex items-center gap-2">
                    <MessageCircle size={12} /> Connect on WhatsApp
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4">
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                <Building2 className="text-blue-500 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <h4 className="text-sm font-bold mb-1">Corporate Training</h4>
                <p className="text-[11px] text-slate-400">Customized technology workshops for your engineering teams.</p>
            </div>
            <div className="p-5 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all group">
                <Users className="text-purple-500 mb-3 group-hover:scale-110 transition-transform" size={24} />
                <h4 className="text-sm font-bold mb-1">B2B Hiring</h4>
                <p className="text-[11px] text-slate-400">Get access to our top 1% pre-vetted tech talent pool.</p>
            </div>
        </div>
      </main>

      <Footer />

      <a href={`https://wa.me/${contactNumber.replace('+', '')}`} target="_blank" 
         className="fixed bottom-8 right-8 bg-green-600 p-4 rounded-full shadow-2xl hover:scale-110 transition-all z-50">
          <MessageCircle size={28} />
      </a>
    </div>
  );
}
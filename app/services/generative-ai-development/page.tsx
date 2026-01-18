'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BrainCircuit, 
  Sparkles, 
  Zap, 
  Layers, 
  ArrowRight,
  Play,
  X,
  CheckCircle2,
  MessageSquare,
  Send,
  Bot,
  Loader2,
  TrendingUp,
  Users,
  ShieldCheck,
  MousePointer2
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

const aiServices = [
  {
    title: "Custom LLM Development",
    desc: "Proprietary models trained on your data, ensuring total privacy and industry-specific intelligence.",
    icon: <BrainCircuit className="text-purple-400" />,
    stats: "99.9% Accuracy"
  },
  {
    title: "AI Agent Workflows",
    desc: "Autonomous agents that handle support, research, and operations while you sleep.",
    icon: <Zap className="text-blue-400" />,
    stats: "24/7 Automation"
  },
  {
    title: "Enterprise RAG Solutions",
    desc: "Connect your entire knowledge base to a private AI for instant, cited information retrieval.",
    icon: <Layers className="text-emerald-400" />,
    stats: "Zero Hallucination"
  }
];

export default function GenerativeAIDevelopment() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar portal="B2B" />

      <div className="fixed inset-0 overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[150px] rounded-full" />
      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="relative w-full max-w-6xl aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              <button onClick={() => setIsVideoOpen(false)} className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md transition-all"><X size={24} /></button>
              <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-white/10 mb-8 backdrop-blur-md">
              <Sparkles size={16} className="text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Identity 2.0 • AI Innovation</span>
            </div>
            <h1 className="text-5xl md:text-8xl font-black mb-8 leading-[0.9] tracking-tighter">
              Build Your <br/> 
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent italic">Digital Intelligence.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl leading-relaxed">
              We engineer secure, private, and high-performance Generative AI infrastructures for the world&apos;s most ambitious teams.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="group relative px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)] flex items-center justify-center gap-3 overflow-hidden">
                <span className="relative z-10">Launch AI Agent</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </button>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-white/10 transition-all backdrop-blur-md"
              >
                <Play size={20} fill="currentColor" /> Watch System Demo
              </button>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotate: 2 }} 
            animate={{ opacity: 1, scale: 1, rotate: 0 }} 
            className="relative"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden border border-white/10 bg-slate-900 group">
              <img 
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1280" 
                className="w-full aspect-[4/5] object-cover opacity-50 group-hover:scale-110 transition-transform duration-[3s]" 
                alt="AI Hub" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
              
              <motion.div 
                animate={{ y: [0, -10, 0] }} transition={{ repeat: Infinity, duration: 4 }}
                className="absolute top-10 left-10 p-6 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 hidden md:block"
              >
                <div className="flex items-center gap-3 mb-2 text-emerald-400">
                  <TrendingUp size={20} />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Optimization</span>
                </div>
                <p className="text-4xl font-black text-white">+114%</p>
                <p className="text-[10px] text-slate-500 font-bold mt-1">Operational Speed</p>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 5 }}
                className="absolute bottom-10 right-10 p-6 bg-blue-600 rounded-[2.5rem] shadow-2xl hidden md:block"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                  <span className="text-[10px] font-black uppercase tracking-widest">Global Node</span>
                </div>
                <p className="text-3xl font-black">2.4 TB/s</p>
                <p className="text-[10px] text-white/70 font-bold">Data Processing</p>
              </motion.div>
            </div>
            <div className="absolute -inset-10 bg-blue-500/20 blur-[120px] -z-10 rounded-full animate-pulse" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter">Beyond Automation. <br/>Pure Intelligence.</h2>
              <p className="text-slate-500 text-lg">We don&apos;t just build bots; we build digital ecosystems that learn and evolve.</p>
            </div>
            <div className="flex gap-4">
               <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center min-w-[120px]">
                 <p className="text-2xl font-black text-blue-400">100+</p>
                 <p className="text-[10px] uppercase font-bold text-slate-600">Models Deployed</p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {aiServices.map((s, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className="group p-10 rounded-[3rem] bg-gradient-to-b from-white/5 to-transparent border border-white/5 hover:border-blue-500/30 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity translate-x-4 -translate-y-4">
                  {React.cloneElement(s.icon as React.ReactElement<{ size?: number }>, { size: 120 })}
                </div>
                <div className="w-16 h-16 rounded-[1.5rem] bg-white/5 flex items-center justify-center mb-8 group-hover:bg-blue-600 transition-colors duration-500">
                  {s.icon}
                </div>
                <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-[10px] font-black text-blue-400 mb-4 tracking-tighter uppercase">
                   {s.stats}
                </div>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{s.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">{s.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-500 uppercase tracking-widest">
                  <ShieldCheck size={14} className="text-emerald-500" /> Enterprise Secured
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <p className="text-center text-slate-600 text-[10px] font-black uppercase tracking-[0.4em] mb-12">Empowering Industry Leaders</p>
          <div className="flex gap-20 justify-center items-center opacity-30 grayscale hover:grayscale-0 transition-all duration-700">
             {['QUANTUM', 'NEXUS-AI', 'TEK-CORE', 'SYNC-LAB'].map((logo, i) => (
               <div key={i} className="text-2xl md:text-3xl font-black italic tracking-tighter">{logo}</div>
             ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
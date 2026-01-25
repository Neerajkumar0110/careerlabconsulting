'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Play, Target, Award, CheckCircle2, 
  Sparkles, X, MapPin, Cpu, Zap, Activity,
  Globe, Code, MessageSquare, ShieldCheck
} from 'lucide-react';

const OWNER_PHONE = "918700236923";

interface Student {
  name: string;
  batch: string;
  country: string;
  id: string;
  img: string;
  progress: string;
  rank: string;
  score: string;
  skill: string;
  projects: string;
  uptime: string;
}

const students: Student[] = [
  { 
    name: "Aryan Sharma", 
    batch: "Advanced AI", 
    country: "India", 
    id: "IX-2026-IN-1024", 
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200", 
    progress: "88%", 
    rank: "#42", 
    score: "A+",
    skill: "LLM Orchestration",
    projects: "7 Active Nodes",
    uptime: "99.8%"
  },
  { 
    name: "Sarah Jenkins", 
    batch: "Neural Ops", 
    country: "USA", 
    id: "IX-2026-US-8821", 
    img: "https://images.unsplash.com/photo-1610462679603-785caa71c4b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTJ8fFNhcmFoJTIwSmVua2luc3xlbnwwfHwwfHx8MA%3D%3D", 
    progress: "94%", 
    rank: "#12", 
    score: "S",
    skill: "Model Quantization",
    projects: "12 Edge Deployments",
    uptime: "100%"
  },
  { 
    name: "Omar Al-Zayed", 
    batch: "Agentic Systems", 
    country: "Dubai", 
    id: "IX-2026-DXB-4402", 
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=200", 
    progress: "76%", 
    rank: "#108", 
    score: "B+",
    skill: "Autonomous Logic",
    projects: "4 Logic Chains",
    uptime: "98.2%"
  }
];

export default function B2CHero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Student | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!selectedProfile) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % students.length);
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [selectedProfile]);

  const activeStudent = students[index];

  const handleWhatsAppConnect = (studentName = "the cohort") => {
    const message = encodeURIComponent(`Hi, I'm interested in the Jan 2026 Cohort. I just saw ${studentName}'s profile on the dashboard.`);
    window.open(`https://wa.me/${OWNER_PHONE}?text=${message}`, '_blank');
  };

  return (
    <section className="relative min-h-screen pt-20 pb-12 md:pt-10 md:pb-20 overflow-hidden bg-[#020617] flex items-center">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] right-[-10%] w-[400px] md:w-[800px] h-[400px] md:h-[800px] bg-blue-600/15 blur-[100px] md:blur-[150px] rounded-full animate-pulse" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-6 relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 items-center">
          
          <div className="w-full lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-1">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/[0.03] border border-white/10 mb-8 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.2em]">Next Cohort: Jan 2026</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white leading-[0.95] mb-8 tracking-tighter">
              BEYOND <br/> 
              <span className="relative inline-block italic text-blue-400">
                LEARNING.
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none"><path d="M1 9.5C50.5 3.5 150.5 1.5 299 9.5" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/></svg>
              </span> <br/>
              DEPLOYMENT.
            </h1>

            <p className="text-slate-400 text-base md:text-xl mb-10 max-w-md font-medium leading-relaxed">
              Don't just watch tutorials. Join a network of <span className="text-white font-bold underline decoration-blue-500/50">Elite Engineers</span> deploying autonomous systems.
            </p>

            <div className="flex flex-col sm:flex-row gap-5 w-full sm:w-auto">
              <button 
                onClick={() => handleWhatsAppConnect()}
                className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all hover:scale-105 shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3"
              >
                Ready to Connect? <ArrowRight size={16} />
              </button>
              <button onClick={() => setIsVideoOpen(true)} className="px-10 py-5 bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/10 rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-3 backdrop-blur-md">
                <Play className="w-4 h-4 fill-white" /> Watch Demo
              </button>
            </div>
          </div>

          <div className="w-full lg:col-span-6 flex justify-center order-2">
            <AnimatePresence mode="wait">
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="w-full max-w-[420px] bg-[#0a0f1d]/80 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 shadow-2xl relative"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
                    <span className="text-blue-400 text-[9px] font-black uppercase tracking-tighter">ENROLLMENT: {activeStudent.id}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <Activity size={10} className="text-emerald-500 animate-pulse" />
                    <span className="text-emerald-500 text-[9px] font-black uppercase">Active Node</span>
                  </div>
                </div>

                <div className="flex items-center gap-5 mb-8">
                  <div className="relative">
                    <img src={activeStudent.img} className="w-20 h-20 rounded-3xl object-cover border-2 border-blue-500/30 shadow-lg" alt="" />
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 p-1.5 rounded-xl border-4 border-[#0a0f1d]">
                      <Zap size={14} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-black text-2xl tracking-tight">{activeStudent.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={12} className="text-slate-500" />
                      <p className="text-slate-400 text-xs font-bold uppercase">{activeStudent.country}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8 p-4 bg-blue-600/5 border border-blue-500/10 rounded-2xl flex items-center gap-4">
                  <div className="p-2 bg-blue-600/20 rounded-xl"><Cpu className="text-blue-400 w-5 h-5" /></div>
                  <div className="text-left">
                    <p className="text-[9px] text-blue-400 font-black uppercase tracking-widest">Specialized Skill</p>
                    <p className="text-white font-bold text-sm">{activeStudent.skill}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 text-left">
                    <Target className="w-5 h-5 text-blue-400 mb-2" />
                    <p className="text-slate-500 text-[9px] font-black uppercase mb-1">Success Rate</p>
                    <p className="text-white font-black text-2xl">{activeStudent.progress}</p>
                  </div>
                  <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-5 text-left">
                    <Award className="w-5 h-5 text-emerald-400 mb-2" />
                    <p className="text-slate-500 text-[9px] font-black uppercase mb-1">Global Grade</p>
                    <p className="text-white font-black text-2xl">{activeStudent.score}</p>
                  </div>
                </div>

                <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                   <div className="text-left">
                      <div className="text-blue-500 font-black text-3xl tracking-tighter">{activeStudent.rank}</div>
                      <div className="text-[9px] text-slate-500 font-black uppercase tracking-widest">Global Rank</div>
                   </div>
                   <button 
                    onClick={() => setSelectedProfile(activeStudent)}
                    className="px-6 py-3 bg-white text-black text-[10px] font-black uppercase rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-lg"
                   >
                     View Profile
                   </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProfile && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelectedProfile(null)}
              className="absolute inset-0 bg-[#020617]/95 backdrop-blur-md" 
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 30 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 30 }}
              className="relative w-full max-w-2xl bg-[#0a0f1d] border border-white/10 rounded-[3rem] overflow-hidden shadow-[0_0_100px_rgba(37,99,235,0.2)]"
            >
              <button onClick={() => setSelectedProfile(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white z-20 p-2 bg-white/5 rounded-full transition-colors"><X /></button>
              
              <div className="p-8 md:p-12 text-left">
                <div className="flex flex-col md:flex-row gap-8 items-start mb-10">
                  <img src={selectedProfile.img} className="w-32 h-32 rounded-[2.5rem] border-4 border-blue-600/20 object-cover shadow-2xl" alt="" />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <h2 className="text-3xl font-black text-white">{selectedProfile.name}</h2>
                       <ShieldCheck size={22} className="text-blue-500" />
                    </div>
                    <p className="text-blue-400 font-bold uppercase text-[10px] tracking-[0.2em] mb-4">LMS Verified Specialist • {selectedProfile.batch}</p>
                    <div className="flex flex-wrap gap-2">
                      {["Python", "PyTorch", "GCP", selectedProfile.skill].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-400 text-[9px] font-bold uppercase tracking-wider">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
                  <div className="bg-[#0f172a] p-5 rounded-3xl border border-white/5 text-center">
                    <Globe size={20} className="text-blue-500 mx-auto mb-2" />
                    <p className="text-slate-500 text-[8px] font-black uppercase">Node Uptime</p>
                    <p className="text-white font-black text-xl">{selectedProfile.uptime}</p>
                  </div>
                  <div className="bg-[#0f172a] p-5 rounded-3xl border border-white/5 text-center">
                    <Code size={20} className="text-purple-500 mx-auto mb-2" />
                    <p className="text-slate-500 text-[8px] font-black uppercase">Total Nodes</p>
                    <p className="text-white font-black text-xl">{selectedProfile.projects}</p>
                  </div>
                  <div className="bg-[#0f172a] p-5 rounded-3xl border border-white/5 text-center">
                    <CheckCircle2 size={20} className="text-emerald-500 mx-auto mb-2" />
                    <p className="text-slate-500 text-[8px] font-black uppercase">LMS Status</p>
                    <p className="text-white font-black text-[10px] mt-1 uppercase">Certified</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button onClick={() => handleWhatsAppConnect(selectedProfile.name)} className="flex-1 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg">
                    <MessageSquare size={16} /> Connect with Mentor
                  </button>
                  <button onClick={() => setSelectedProfile(null)} className="px-8 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black uppercase text-xs tracking-widest border border-white/10 transition-all">
                    Dismiss Node
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsVideoOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <button onClick={() => setIsVideoOpen(false)} className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"><X size={24} /></button>
              <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1" className="w-full h-full border-none" allow="autoplay" allowFullScreen />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
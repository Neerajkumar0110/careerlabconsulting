'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowRight, Play, Target, Award, CheckCircle2, 
  Sparkles, X, MapPin, Cpu, Zap, Activity,
  Globe, Code, MessageSquare, ShieldCheck, Hash, TrendingUp
} from 'lucide-react';

const OWNER_PHONE = "918700236923";

interface Student {
  name: string;
  batch: string;
  batchNumber: string; 
  country: string;
  id: string;
  progress: string;
  rank: string;
  score: string;
  performanceScore: string; 
  skill: string;
  projects: string;
  uptime: string;
  img: string;
}

export default function B2CHero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Student | null>(null);
  const [index, setIndex] = useState(0);

  const countryList = [
    "USA", "Singapore", "Italy", "Germany", "Qatar", "Israel", "Iran", "Mexico", 
    "Canada", "Kazakhstan", "Brazil", "Argentina", "Ethiopia", "Egypt", "India", 
    "Indonesia", "Australia", "New Zealand", "Cuba", "France", "Norway", "Spain", 
    "Nepal", "Sri Lanka", "Dubai", "Oman", "Cape Town"
  ];

  const students: Student[] = useMemo(() => {
    const names = ["Aryan Sharma", "Priya Patel", "Ishaan Verma", "Liam Smith", "Chen Wei", "Sofia Rossi", "Lukas Meyer", "Zaid Ahmed", "Noa Cohen", "Mateo Garcia", "Emily Chen", "Alik Khan", "Thiago Silva", "Enzo Perez", "Abebe Bikila", "Omar Farooq", "Budi Santoso", "Jack Wilson", "Oliver Brown", "Diego Diaz", "Hugo Petit", "Magnus Bakke", "Carlos Ruiz", "Aarav Gupta", "Dilshan Perera", "Zayed Al-Maktoum", "Said Al-Busaidi", "Thabo Mbeki"];
    
    const skills = ["LLM Orchestration", "Neural Ops", "Model Quantization", "Agentic Systems", "Autonomous Logic", "Edge AI", "Computer Vision"];

    return countryList.map((country, i) => {
      const name = names[i % names.length];
      const skill = skills[i % skills.length];
      const countryCode = country.slice(0, 2).toUpperCase();
      
      // Professional young adult headshots ke liye specific IDs ka use
      const imageId = (i % 50) + 10; 
      
      return {
        name: name,
        batch: skill,
        batchNumber: `CLC/25-26/${1016 + i}`,
        country: country,
        id: `IX-2026-${countryCode}-${1024 + (i * 7)}`,
        // Updated Image URL: Young, professional looking avatars
        img: `https://i.pravatar.cc/300?img=${imageId}`, 
        progress: `${85 + (i % 12)}%`,
        rank: `#${i + 1}`,
        performanceScore: (90 + (i % 9.5)).toFixed(1),
        score: i % 4 === 0 ? "S" : "A+",
        skill: skill,
        projects: `${5 + (i % 10)} Active Nodes`,
        uptime: i % 5 === 0 ? "100%" : "99.8%"
      };
    });
  }, [countryList]);

  useEffect(() => {
    if (!selectedProfile && !isVideoOpen) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % students.length);
      }, 6000); 
      return () => clearInterval(timer);
    }
  }, [selectedProfile, isVideoOpen, students.length]);

  const activeStudent = students[index];

  const handleWhatsAppConnect = useCallback((studentName = "the cohort") => {
    const message = encodeURIComponent(`Hi, I'm interested in the Jan 2026 Cohort. I just saw ${studentName}'s profile on the dashboard.`);
    window.open(`https://wa.me/${OWNER_PHONE}?text=${message}`, '_blank');
  }, []);

  return (
    <section className="relative min-h-screen pt-24 pb-12 md:pt-10 md:pb-20 overflow-hidden bg-[#020617] flex items-center">
      
      {/* Background Effects */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] right-[-5%] w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-blue-600/10 blur-[80px] md:blur-[150px] rounded-full animate-pulse will-change-transform" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-6 relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 md:gap-12 items-center">
          
          {/* Content Left */}
          <div className="w-full lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 md:mb-8 backdrop-blur-md">
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span className="text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Global Network: {students.length} Countries</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
            </div>

            <h1 className="text-[2.5rem] leading-[1] sm:text-6xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter uppercase">
              BEYOND <br/> 
              <span className="relative inline-block italic text-blue-400">
                LEARNING.
                <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                    <path d="M1 9.5C50.5 3.5 150.5 1.5 299 9.5" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span> <br/>
              DEPLOYMENT.
            </h1>

            <p className="text-slate-400 text-base md:text-xl mb-8 md:mb-10 max-w-md font-medium leading-relaxed">
              Don't just watch tutorials. Join a global network of <span className="text-white font-bold underline decoration-blue-500/50">Elite Engineers</span> from {students.length} countries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => handleWhatsAppConnect()}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest transition-all hover:scale-105 shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3"
              >
                Enroll for Jan 2026 <ArrowRight size={16} />
              </button>
              <button onClick={() => setIsVideoOpen(true)} className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/10 rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest transition-all flex items-center justify-center gap-3 backdrop-blur-md">
                <Play className="w-4 h-4 fill-white" /> Watch Demo
              </button>
            </div>
          </div>

          {/* Student Card Right */}
          <div className="w-full lg:col-span-6 flex justify-center order-2 mt-4 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="w-full max-w-[480px] bg-[#0a0f1d]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 shadow-2xl relative"
              >
                <div className="flex items-center justify-between mb-6 md:mb-8">
                  <div className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg">
                    <span className="text-blue-400 text-[8px] md:text-[10px] font-black uppercase tracking-tighter">ID: {activeStudent.id}</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                    <Activity size={10} className="text-emerald-500 animate-pulse" />
                    <span className="text-emerald-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.1em]">Live Profile</span>
                  </div>
                </div>

                <div className="flex items-center gap-4 md:gap-5 mb-6 md:mb-8">
                  <div className="relative shrink-0">
                    <img 
                      src={activeStudent.img} 
                      alt={activeStudent.name}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-2xl md:rounded-3xl object-cover border-2 border-blue-500/30 shadow-lg"
                    />
                    <div className="absolute -bottom-1 -right-1 md:-bottom-2 md:-right-2 bg-blue-600 p-1 md:p-1.5 rounded-lg md:rounded-xl border-4 border-[#0a0f1d]">
                      <Zap size={12} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="text-white font-black text-2xl md:text-3xl tracking-tight truncate">{activeStudent.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <MapPin size={12} className="text-blue-500" />
                      <p className="text-slate-400 text-[10px] font-bold uppercase">{activeStudent.country}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-6 md:mb-8 p-3 md:p-4 bg-blue-600/5 border border-blue-500/10 rounded-xl md:rounded-2xl flex items-center gap-3 md:gap-4">
                  <div className="p-2 bg-blue-600/20 rounded-lg md:rounded-xl"><Cpu className="text-blue-400 w-4 h-4 md:w-5 md:h-5" /></div>
                  <div className="text-left">
                    <p className="text-[8px] md:text-[9px] text-blue-400 font-black uppercase tracking-widest">Specialized Skill</p>
                    <p className="text-white font-bold text-sm md:text-base truncate">{activeStudent.skill}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 md:gap-4 mb-6 md:mb-8">
                  {[
                    { label: "Success", val: activeStudent.progress, icon: Target, color: "text-blue-400" },
                    { label: "Perf.", val: activeStudent.performanceScore, icon: TrendingUp, color: "text-purple-400" },
                    { label: "Grade", val: activeStudent.score, icon: Award, color: "text-emerald-400" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl p-3 md:p-4 text-left">
                      <stat.icon className={`w-4 h-4 md:w-5 md:h-5 ${stat.color} mb-2`} />
                      <p className="text-slate-400 text-[8px] md:text-[11px] font-bold uppercase mb-0.5 md:mb-1">{stat.label}</p>
                      <p className="text-white font-black text-sm md:text-xl">{stat.val}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex gap-4 md:gap-6 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="text-left">
                        <div className="text-blue-500 font-black text-lg md:text-xl tracking-tighter">{activeStudent.rank}</div>
                        <div className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest">Rank</div>
                      </div>
                      <div className="text-left border-l border-white/10 pl-4 md:pl-6">
                        <div className="text-white font-black text-lg md:text-xl tracking-tighter max-w-[300px] md:max-w-none">CLC/24-25/{activeStudent.batchNumber.split('/').pop()}</div>
                        <div className="text-[8px] md:text-[10px] text-slate-500 font-bold uppercase tracking-widest">Batch</div>
                      </div>
                    </div>
                    <button 
                     onClick={() => setSelectedProfile(activeStudent)}
                     className="w-full sm:w-auto px-5 py-3 bg-white text-black text-[9px] md:text-[10px] font-black uppercase rounded-xl md:rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-lg shadow-white/5 active:scale-95"
                    >
                      View Profile
                    </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Profile Detail Overlay */}
      <AnimatePresence>
        {selectedProfile && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProfile(null)} className="absolute inset-0 bg-[#020617]/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-2xl bg-[#0a0f1d] border border-white/10 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
              <button onClick={() => setSelectedProfile(null)} className="absolute top-4 right-4 md:top-6 md:right-6 text-slate-500 hover:text-white z-20 p-2 bg-white/5 rounded-full"><X size={20}/></button>
              
              <div className="p-6 md:p-12 text-left">
                <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start mb-8 md:mb-10 text-center md:text-left">
                  <img src={selectedProfile.img} alt="" className="w-24 h-24 md:w-32 md:h-32 rounded-[2rem] md:rounded-[2.5rem] border-4 border-blue-600/20 object-cover shadow-2xl" />
                  <div className="flex-1">
                    <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                        <h2 className="text-2xl md:text-3xl font-black text-white">{selectedProfile.name}</h2>
                        <ShieldCheck size={22} className="text-blue-500" />
                    </div>
                    <p className="text-blue-400 font-bold uppercase text-[9px] tracking-[0.2em] mb-4">{selectedProfile.country} • {selectedProfile.batch}</p>
                    <div className="flex flex-wrap justify-center md:justify-start gap-2">
                      {["Python", "PyTorch", "GCP", "Agentic AI"].map(tag => (
                        <span key={tag} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-400 text-[8px] font-bold uppercase">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
                  <div className="bg-[#0f172a] p-3 md:p-4 rounded-2xl border border-white/5 text-center">
                    <Globe size={18} className="text-blue-500 mx-auto mb-1.5" />
                    <p className="text-slate-500 text-[7px] md:text-[8px] font-bold uppercase">Uptime</p>
                    <p className="text-white font-black text-[10px] md:text-xs">{selectedProfile.uptime}</p>
                  </div>
                  <div className="bg-[#0f172a] p-3 md:p-4 rounded-2xl border border-white/5 text-center">
                    <Code size={18} className="text-purple-500 mx-auto mb-1.5" />
                    <p className="text-slate-500 text-[7px] md:text-[8px] font-bold uppercase">Nodes</p>
                    <p className="text-white font-black text-[10px] md:text-xs">{selectedProfile.projects.split(' ')[0]}</p>
                  </div>
                  <div className="bg-[#0f172a] p-3 md:p-4 rounded-2xl border border-white/5 text-center">
                    <Hash size={18} className="text-emerald-500 mx-auto mb-1.5" />
                    <p className="text-slate-500 text-[7px] md:text-[8px] font-bold uppercase">Batch</p>
                    <p className="text-white font-black text-[9px] mt-1 uppercase">{selectedProfile.batchNumber.split('/').pop()}</p>
                  </div>
                  <div className="bg-[#0f172a] p-3 md:p-4 rounded-2xl border border-white/5 text-center">
                    <CheckCircle2 size={18} className="text-blue-400 mx-auto mb-1.5" />
                    <p className="text-slate-500 text-[7px] md:text-[8px] font-bold uppercase">Status</p>
                    <p className="text-white font-black text-[9px] mt-1 uppercase">Live</p>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button onClick={() => handleWhatsAppConnect(selectedProfile.name)} className="flex-1 py-4 md:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl md:rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all flex items-center justify-center gap-3 shadow-lg">
                    <MessageSquare size={16} /> Connect Mentor
                  </button>
                  <button onClick={() => setSelectedProfile(null)} className="px-6 py-4 md:py-5 bg-white/5 hover:bg-white/10 text-white rounded-xl md:rounded-2xl font-black uppercase text-[10px] tracking-widest border border-white/10 transition-all">
                    Dismiss
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Modal */}
      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 md:p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsVideoOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-4xl aspect-video bg-black rounded-xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <button onClick={() => setIsVideoOpen(false)} className="absolute top-2 right-2 md:top-4 md:right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors"><X size={20} /></button>
              <video 
                src="https://videocdn.cdnpk.net/videos/d7067aab-16b0-52cf-b5fe-751c8972c83b/horizontal/previews/clear/large.mp4?token=exp=1769429678~hmac=50280c42222c84ec8fe71b2d910c3c7a35620e5fafba70cd047dcbe949862280" 
                className="w-full h-full object-cover" 
                autoPlay 
                controls
                playsInline
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
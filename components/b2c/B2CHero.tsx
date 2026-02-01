'use client';

import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { 
  ArrowRight, Play, Target, Award, CheckCircle2, 
  Sparkles, X, MapPin, Cpu, Zap, Activity,
  Globe, Code, MessageSquare, ShieldCheck, Hash, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

const SpaceBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); 
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number; o: number }[] = [];
    const numStars = 400;
    const speed = 2;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width - canvas.width / 2,
          y: Math.random() * canvas.height - canvas.height / 2,
          z: Math.random() * canvas.width,
          o: Math.random(),
        });
      }
    };

    const draw = () => {
      ctx.fillStyle = '#020617';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      ctx.fillStyle = 'white'; 
      
      stars.forEach((star) => {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = canvas.width;
          star.x = Math.random() * canvas.width - canvas.width / 2;
          star.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const x = (star.x / star.z) * cx + cx;
        const y = (star.y / star.z) * cy + cy;
        const r = (1 - star.z / canvas.width) * 2;

        if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
            ctx.beginPath();
            ctx.globalAlpha = 1 - star.z / canvas.width;
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }
      });
      ctx.globalAlpha = 1.0; 

      animationFrameId = requestAnimationFrame(draw);
    };

    setup();
    draw();
    window.addEventListener('resize', setup);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', setup);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/20 blur-[150px] rounded-full will-change-transform" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-600/20 blur-[150px] rounded-full will-change-transform" />
    </div>
  );
};

export default function B2CHero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<Student | null>(null);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const students: Student[] = useMemo(() => {
    const cohortData = [
      { 
        name: "Aryan Sharma", 
        country: "India", 
        imgId: 11,
        customImg: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?q=80&w=300&auto=format&fit=crop" 
      },
      { name: "Liam Smith", country: "USA", imgId: 12 },
      { name: "Lukas Meyer", country: "Germany", imgId: 14 },
      { name: "Sofia Rossi", country: "Italy", imgId: 16 },
      { name: "Chen Wei", country: "Singapore", imgId: 20 },
      { name: "Abebe Bikila", country: "Ethiopia", imgId: 24 },
      { name: "Zaid Ahmed", country: "Dubai", imgId: 27 },
      { name: "Emily Chen", country: "Canada", imgId: 32 },
      { name: "Mateo Garcia", country: "Mexico", imgId: 35 },
      { name: "Priya Patel", country: "UK", imgId: 38 },
      { name: "Budi Santoso", country: "Indonesia", imgId: 42 },
      { name: "Ishaan Verma", country: "India", imgId: 44 }
    ];
    
    const skills = ["LLM Orchestration", "Neural Ops", "Model Quantization", "Agentic Systems", "Autonomous Logic", "Edge AI", "Computer Vision"];

    return cohortData.map((data, i) => {
      const skill = skills[i % skills.length];
      const countryCode = data.country.slice(0, 2).toUpperCase();
      
      return {
        name: data.name,
        batch: skill,
        batchNumber: `CLC/24-25/${1016 + i}`,
        country: data.country,
        id: `IX-2026-${countryCode}-${1024 + (i * 7)}`,
        img: (data as any).customImg ? (data as any).customImg : `https://i.pravatar.cc/300?img=${data.imgId}`, 
        progress: `${87 + (i % 8)}%`,
        rank: `#${i + 7}`,
        performanceScore: (94 + (i % 5.5)).toFixed(1),
        score: i % 3 === 0 ? "S" : "A+",
        skill: skill,
        projects: `${5 + (i % 10)} Active Nodes`,
        uptime: "99.9%"
      };
    });
  }, []);

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
    const message = encodeURIComponent(`Hi, I'm interested in the Elite Engineers Cohort. I just saw ${studentName}'s profile on the dashboard.`);
    window.open(`https://wa.me/${OWNER_PHONE}?text=${message}`, '_blank');
  }, []);

  return (
    <section className="relative min-h-screen pt-24 pb-12 md:pt-10 md:pb-20 overflow-hidden bg-[#020617] flex items-center" aria-label="Hero Section">
      
      <SpaceBackground />

      <div className="max-w-[1400px] mx-auto px-5 md:px-6 relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 md:gap-12 items-center">
          
          <div className="w-full lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left order-1">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 rounded-2xl bg-white/[0.03] border border-white/10 mb-6 md:mb-8 backdrop-blur-md"
            >
              <Sparkles className="w-3 h-3 text-blue-400" />
              <span className="text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">Live from Hyper-Space</span>
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-1" />
            </motion.div>

            <h1 className="text-[2.5rem] leading-[1] sm:text-6xl md:text-8xl font-black text-white mb-6 md:mb-8 tracking-tighter uppercase">
              BEYOND <br/> 
              <span className="relative inline-block italic text-blue-400">
                LEARNING.
                <svg className="absolute -bottom-1 md:-bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none" aria-hidden="true">
                    <path d="M1 9.5C50.5 3.5 150.5 1.5 299 9.5" stroke="#3b82f6" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span> <br/>
              DEPLOYMENT.
            </h1>

            <p className="text-slate-400 text-base md:text-xl mb-8 md:mb-10 max-w-md font-medium leading-relaxed">
              Experience the future of engineering. Join a global network of <span className="text-white font-bold underline decoration-blue-500/50">Elite Minds</span> across 27 countries.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => handleWhatsAppConnect()}
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest transition-all hover:scale-105 shadow-[0_0_30px_-5px_rgba(37,99,235,0.5)] flex items-center justify-center gap-3"
                aria-label="Join the mission on WhatsApp"
              >
                Join the Mission <ArrowRight size={16} />
              </button>
              <button 
                onClick={() => setIsVideoOpen(true)} 
                className="w-full sm:w-auto px-8 md:px-10 py-4 md:py-5 bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/10 rounded-2xl font-black uppercase text-[10px] md:text-xs tracking-widest transition-all flex items-center justify-center gap-3 backdrop-blur-md"
                aria-label="Watch demo video"
              >
                <Play className="w-4 h-4 fill-white" /> Launch Demo
              </button>
            </div>
          </div>

          <div className="w-full lg:col-span-6 flex justify-center order-2 mt-4 md:mt-0">
            <AnimatePresence mode="wait">
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8, rotateY: 20 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 1.1, rotateY: -20 }}
                transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
                className="w-full max-w-[480px] bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[2.5rem] md:rounded-[3.5rem] p-6 md:p-10 shadow-[0_0_80px_-15px_rgba(59,130,246,0.3)] relative overflow-hidden will-change-transform"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="px-1 pt-0 pb-1 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                    <span className="text-blue-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest">NAV-ID: {activeStudent.id}</span>
                  </div>
                  <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-emerald-500 text-[9px] font-black uppercase tracking-[0.15em]">Signal: Strong</span>
                  </div>
                </div>

                <div className="flex items-center gap-5 md:gap-7 mb-10">
                  <div className="relative shrink-0 w-20 h-20 md:w-24 md:h-24">
                    <div className="relative w-full h-full rounded-3xl md:rounded-[2rem] overflow-hidden border-2 border-white/20 shadow-2xl">
                      <Image 
                        src={activeStudent.img} 
                        alt={activeStudent.name}
                        fill
                        priority
                        className="object-cover"
                        sizes="(max-width: 768px) 80px, 96px"
                      />
                    </div>
                    <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-xl border-4 border-[#0a0f1d] z-10">
                      <Zap size={14} className="text-white fill-white" />
                    </div>
                  </div>
                  <div className="flex-1 text-left">
                    <h3 className="text-white font-black text-3xl md:text-4xl tracking-tighter mb-1">{activeStudent.name}</h3>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-blue-500" />
                      <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{activeStudent.country}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-8 p-4 md:p-5 bg-white/[0.03] border border-white/5 rounded-2xl md:rounded-3xl flex items-center gap-4">
                  <div className="p-3 bg-blue-600/20 rounded-2xl"><Cpu className="text-blue-400 w-5 h-5 md:w-6 md:h-6" /></div>
                  <div className="text-left">
                    <p className="text-[9px] text-blue-400 font-black uppercase tracking-[0.2em] mb-0.5">Specialized Module</p>
                    <p className="text-white font-bold text-base md:text-lg">{activeStudent.skill}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10">
                  {[
                    { label: "Stability", val: activeStudent.progress, icon: Target, color: "text-blue-400" },
                    { label: "Thrust", val: activeStudent.performanceScore, icon: TrendingUp, color: "text-purple-400" },
                    { label: "Class", val: activeStudent.score, icon: Award, color: "text-emerald-400" }
                  ].map((stat, i) => (
                    <div key={i} className="bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-[2rem] p-4 text-left">
                      <stat.icon className={`w-5 h-5 ${stat.color} mb-3`} />
                      <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">{stat.label}</p>
                      <p className="text-white font-black text-xl md:text-2xl">{stat.val}</p>
                    </div>
                  ))}
                </div>

                <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div className="flex gap-8 w-full sm:w-auto justify-between sm:justify-start">
                      <div className="text-left">
                        <div className="text-blue-500 font-black text-2xl tracking-tighter">#{index + 15}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Orbital Rank</div>
                      </div>
                      <div className="text-left border-l border-white/10 pl-8">
                        <div className="text-white font-black text-sx tracking-tighter">CLC/24-25/{activeStudent.batchNumber.split('/').pop()}</div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Batch Number</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedProfile(activeStudent)}
                      className="w-full sm:w-auto px-8 py-4 bg-white text-black text-[11px] font-black uppercase rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-xl active:scale-95"
                    >
                      Profile Details
                    </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {mounted && createPortal(
        <>
          <AnimatePresence>
            {selectedProfile && (
              <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProfile(null)} className="absolute inset-0 bg-[#020617]/98 backdrop-blur-xl" />
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-2xl bg-[#0a0f1d] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
                  <button onClick={() => setSelectedProfile(null)} className="absolute top-6 right-6 text-slate-500 hover:text-white z-20 p-2 bg-white/5 rounded-full" aria-label="Close Profile"><X size={24}/></button>
                  
                  <div className="p-8 md:p-14 text-left">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-start mb-12 text-center md:text-left">
                      <div className="relative w-32 h-32 shrink-0">
                        <Image 
                          src={selectedProfile.img} 
                          alt={selectedProfile.name} 
                          fill
                          className="rounded-[2.5rem] border-4 border-blue-600/20 object-cover shadow-2xl"
                          sizes="128px"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-center md:justify-start gap-3 mb-3">
                            <h2 className="text-3xl md:text-4xl font-black text-white">{selectedProfile.name}</h2>
                            <ShieldCheck size={28} className="text-blue-500" />
                        </div>
                        <p className="text-blue-400 font-bold uppercase text-xs tracking-[0.2em] mb-6">{selectedProfile.country} • {selectedProfile.batch}</p>
                        <div className="flex flex-wrap justify-center md:justify-start gap-2">
                          {["Python", "PyTorch", "GCP", "Agentic AI", "TensorFlow"].map(tag => (
                            <span key={tag} className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-xl text-slate-400 text-[10px] font-bold uppercase tracking-widest">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                      {[
                        { icon: Globe, label: "Uptime", val: selectedProfile.uptime, color: "text-blue-500" },
                        { icon: Code, label: "Nodes", val: selectedProfile.projects.split(' ')[0], color: "text-purple-500" },
                        { icon: Hash, label: "Batch", val: selectedProfile.batchNumber.split('/').pop(), color: "text-emerald-500" },
                        { icon: CheckCircle2, label: "Status", val: "LIVE", color: "text-blue-400" }
                      ].map((item, idx) => (
                        <div key={idx} className="bg-[#0f172a] p-5 rounded-3xl border border-white/5 text-center">
                          <item.icon size={22} className={`${item.color} mx-auto mb-2`} />
                          <p className="text-slate-500 text-[9px] font-bold uppercase mb-1">{item.label}</p>
                          <p className="text-white font-black text-sm uppercase">{item.val}</p>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <button onClick={() => handleWhatsAppConnect(selectedProfile.name)} className="flex-1 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase text-xs tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl">
                        <MessageSquare size={20} /> Open Communication
                      </button>
                      <button onClick={() => setSelectedProfile(null)} className="px-10 py-5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black uppercase text-xs tracking-widest border border-white/10 transition-all">
                        Dismiss
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {isVideoOpen && (
              <div className="fixed inset-0 z-[120] flex items-center justify-center p-2 md:p-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsVideoOpen(false)} className="absolute inset-0 bg-black/98 backdrop-blur-2xl" />
                <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-5xl aspect-video bg-black rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                  <button onClick={() => setIsVideoOpen(false)} className="absolute top-6 right-6 z-10 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors backdrop-blur-md" aria-label="Close Video"><X size={24} /></button>
                  <iframe 
                    width="100%" 
                    height="100%" 
                    src="https://www.youtube.com/embed/IWFJ_IWr6kg?autoplay=1" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    allowFullScreen
                  ></iframe>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </>,
        document.body
      )}
    </section>
  );
}
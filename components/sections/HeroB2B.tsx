'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import Image from 'next/image'; 
import { motion, AnimatePresence } from 'framer-motion';
import { X, User, Building2, Briefcase, Mail, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export default function HeroB2B() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', role: '', email: '' });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });

  const OWNER_PHONE = "918700236923";
  
  const avatars = useMemo(() => [
    "1560250097-0b93528c311a", 
    "1494790108377-be9c29b29330", 
    "1507003211169-0a1dd7228f2d", 
    "1599566150163-29194dcaad36"
  ], []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*Strategy Call Request*%0A*Name:* ${formData.name}%0A*Company:* ${formData.company}%0A*Role:* ${formData.role}%0A*Email:* ${formData.email}`;
    window.open(`https://wa.me/${OWNER_PHONE}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false }); 
    if (!ctx) return;

    let animationFrameId: number;
    let stars: { x: number; y: number; z: number; px: number; py: number }[] = [];
    const numStars = 400; 
    const speed = 0.8;

    const setup = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: numStars }, () => ({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * canvas.width,
        px: 0, py: 0
      }));
    };

    const draw = () => {
      ctx.fillStyle = '#020617'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2 + (mousePos.current.x * 0.05);
      const cy = canvas.height / 2 + (mousePos.current.y * 0.05);
      ctx.translate(cx, cy);

      stars.forEach((s) => {
        s.z -= speed;
        if (s.z <= 0) {
          s.z = canvas.width;
          s.x = Math.random() * canvas.width - canvas.width / 2;
          s.y = Math.random() * canvas.height - canvas.height / 2;
        }

        const x = (s.x / s.z) * canvas.width;
        const y = (s.y / s.z) * canvas.width;
        const radius = Math.max(0, (1 - s.z / canvas.width) * 2);
        const alpha = 1 - s.z / canvas.width;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${alpha})`;
        ctx.fill();
      });

      ctx.setTransform(1, 0, 0, 1, 0, 0); 
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
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-4 overflow-hidden bg-[#020617]">
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true" />
      
      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] via-transparent to-[#020617]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-6xl mx-auto text-center"
      >
        <header className="flex flex-col items-center">
          <motion.div className="mb-8 inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
            <div className="flex -space-x-2">
              {avatars.map((id, i) => (
                <div key={i} className="relative w-8 h-8 rounded-full border-2 border-[#020617] overflow-hidden">
                  <Image 
                    src={`https://images.unsplash.com/photo-${id}?w=64&h=64&fit=crop`} 
                    alt="Career Lab Consulting Partner"
                    fill
                    sizes="32px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
            <div className="h-4 w-px bg-white/20" />
            <p className="text-blue-200 text-[10px] md:text-xs font-bold tracking-widest uppercase flex items-center gap-2">
              <Sparkles size={14} className="text-blue-400" />
              The Future of Work is Autonomous
            </p>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-[8rem] font-black text-white mb-8 tracking-tighter leading-[0.85]">
            Command Your <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-blue-200 to-blue-500">
              AI Empire
            </span>
          </h1>
        </header>

        <p className="max-w-2xl mx-auto text-slate-300 text-lg md:text-xl mb-12 leading-relaxed px-4">
          Deploy custom AI workforces that <strong>execute tasks</strong> autonomously. 
          Reduce overhead by 70% and scale your business without increasing headcount.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <motion.button 
            onClick={() => window.open(`https://wa.me/${OWNER_PHONE}?text=I want to deploy AI Agents.`, '_blank')}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group w-full sm:w-auto px-10 py-5 bg-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
          >
            <span>Deploy My AI Workforce</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
          
          <button 
            onClick={() => setIsModalOpen(true)}
            className="w-full sm:w-auto px-10 py-5 bg-white/5 border border-white/10 text-white font-bold rounded-2xl hover:bg-white/10 transition-all"
          >
            Watch Demo
          </button>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-center gap-6 text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck size={18} className="text-blue-500/50"/> 
            <span className="text-[10px] font-bold uppercase tracking-widest">Enterprise Secure AI</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles size={18} className="text-blue-500/50"/> 
            <span className="text-[10px] font-bold uppercase tracking-widest">Autonomous Agents</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#020617]/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-[2.5rem] p-8 md:p-12"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white">
                <X size={24} />
              </button>
              <h2 className="text-3xl font-bold text-white mb-2">Scale Your Vision</h2>
              <p className="text-slate-400 mb-8">Book your 1-on-1 AI strategy session.</p>
              
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input required type="text" placeholder="Full Name" className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none transition-all" onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input required type="text" placeholder="Company" className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none transition-all" onChange={(e) => setFormData({...formData, company: e.target.value})} />
                </div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                  <input required type="email" placeholder="Work Email" className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none transition-all" onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl mt-4 transition-all uppercase tracking-widest text-sm">
                  Reserve Call
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
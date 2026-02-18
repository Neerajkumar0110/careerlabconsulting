'use client';

import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import Image from 'next/image'; 
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Play } from 'lucide-react';

const DEMO_VIDEO_URL = "https://www.youtube.com/watch?v=IWFJ_IWr6kg";

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

export default function HeroB2B() {
  const OWNER_PHONE = "918700236923";
  
  const avatars = useMemo(() => [
    { src: "https://img.freepik.com/free-photo/writing-dairy-note-coffee-shop-concept-as-memory-life-woman-coffee-shop-smiling-woman-making-notes-notepad_1153-8262.jpg", name: "Indian Expert 1" }, 
    { src: "https://img.freepik.com/free-photo/expressive-young-woman-posing-studio_176474-66741.jpg", name: "Indian Expert 2" }, 
    { src: "https://img.freepik.com/free-photo/woman-trendy-summer-sundress_158538-16608.jpg", name: "Indian Expert 3" }, 
    { src: "https://img.freepik.com/free-photo/portrait-woman-working-dried-flowers-shop_23-2151362120.jpg", name: "Indian Expert 4" }
  ], []);

  const handleDeploy = useCallback(() => {
    window.open(`https://wa.me/${OWNER_PHONE}?text=I want to deploy AI Agents.`, '_blank');
  }, []);

  const handleWatchDemo = () => {
    window.open(DEMO_VIDEO_URL, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-30 pb-20 px-4 overflow-hidden bg-[#020617]">
      <SpaceBackground />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        className="relative z-10 w-full max-w-6xl mx-auto text-center mt-10 md:mt-0"
      >
        <div className="flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex items-center gap-4 px-5 py-2.5 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
          >
            <div className="flex -space-x-4">
              {avatars.map((avatar, i) => (
                <div key={i} className="relative w-10 h-10 md:w-12 md:h-12 rounded-full border-2 border-[#020617] overflow-hidden bg-slate-800">
                  <Image 
                    src={avatar.src} 
                    alt={avatar.name}
                    fill
                    sizes="48px"
                    className="object-cover"
                    priority={i < 2}
                  />
                </div>
              ))}
            </div>

            <div className="h-6 w-px bg-white/20 mx-1" />
            <p className="text-blue-400 text-[10px] md:text-[9px] font-black tracking-[0.15em] uppercase flex items-center gap-2">
              <Sparkles size={14} className="animate-pulse" />
              The Future of Work is Autonomous
            </p>
          </motion.div>

          <h1 className="text-5xl sm:text-5xl md:text-7xl font-black text-white mb-8 tracking-tighter leading-[0.85] uppercase">
            Command Your <br /> 
            <span className="relative inline-block italic text-blue-400">
              AI Empire
              <svg className="absolute -bottom-2 md:-bottom-4 left-0 w-full" viewBox="0 0 300 12" fill="none">
                <path d="M1 9.5C50.5 3.5 150.5 1.5 299 9.5" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round"/>
              </svg>
            </span>
          </h1>
        </div>

        <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-1xl mb-12 leading-relaxed px-4 font-medium">
          Deploy custom AI workforces that <span className="text-white font-bold underline decoration-blue-500/50">execute tasks</span> autonomously. 
          Reduce overhead by 70% and scale instantly.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <button 
            onClick={handleDeploy}
            className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl flex items-center justify-center gap-3 shadow-[0_0_40px_-10px_rgba(37,99,235,0.6)] transition-all hover:scale-105 active:scale-95"
          >
            Deploy AI Workforce <ArrowRight size={18} />
          </button>
          
          <button 
            onClick={handleWatchDemo}
            className="w-full sm:w-auto px-10 py-5 bg-white/[0.03] border border-white/10 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-md active:scale-95"
          >
            <Play className="w-4 h-4 fill-white" /> Watch Demo
          </button>
        </div>
      </motion.div>
    </section>
  );
}
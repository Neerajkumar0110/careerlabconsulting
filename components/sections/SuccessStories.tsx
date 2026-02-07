'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, ArrowUpRight, X } from 'lucide-react';

const OWNER_PHONE = "918700236923";

const stories = [
  {
    id: 1,
    title: "AI-Powered Recruitment for Growth",
    description: "Career Lab Consulting implemented an advanced filtering system for our corporate partners, streamlining the talent acquisition process and reducing hiring time by half.",
    metric1: { value: "45%", label: "reduction in hiring cost" },
    metric2: { value: "98.2%", label: "client satisfaction rate" },
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=800&q=80",
    videoUrl: "https://www.youtube.com/shorts/pJnxRMXCMdk?feature=share" 
  },
  {
    id: 2,
    title: "Automated Sales Funnel for Tech Firms",
    description: "We deployed intelligent agents that handle initial outreach and lead qualification, allowing sales teams to focus only on closing high-value deals.",
    metric1: { value: "120%", label: "increase in lead volume" },
    metric2: { value: "3.5x", label: "ROI in first quarter" },
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80",
    videoUrl: "https://www.youtube.com/shorts/_NIWQjjMvfw?feature=share"
  }
];

export default function SuccessStories() {
  const [current, setCurrent] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsVideoOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const nextSlide = () => {
    setIsVideoOpen(false); 
    setCurrent((prev) => (prev === stories.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setIsVideoOpen(false);
    setCurrent((prev) => (prev === 0 ? stories.length - 1 : prev - 1));
  };

  return (
    <section className="bg-[#020617] py-20 px-4 sm:px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-blue-500 font-bold tracking-widest uppercase text-xs mb-3 flex items-center gap-2">
              <span className="w-8 h-[1px] bg-blue-500"></span>
              Success Stories
            </h3>
            <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
              Real Impact, <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent italic">Measured.</span>
            </h2>
          </motion.div>
          
          <div className="flex items-center gap-4 sm:gap-6 bg-white/5 p-2 rounded-full border border-white/10 self-start md:self-auto">
            <button onClick={prevSlide} className="p-3 rounded-full hover:bg-white/10 text-white transition-all active:scale-90">
              <ChevronLeft size={22} />
            </button>
            <div className="text-white font-mono text-sm tracking-tighter">
              <span className="text-blue-500">0{current + 1}</span> / 0{stories.length}
            </div>
            <button onClick={nextSlide} className="p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all shadow-lg shadow-blue-600/30 active:scale-90">
              <ChevronRight size={22} />
            </button>
          </div>
        </div>

        <div className="relative bg-gradient-to-br from-white/[0.03] to-transparent border border-white/10 rounded-[2rem] sm:rounded-[3rem] overflow-hidden backdrop-blur-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 lg:grid-cols-2"
            >
              <div className="p-8 sm:p-12 md:p-16 flex flex-col justify-center">
                <h2 className="text-2xl sm:text-4xl font-bold text-white mb-6 leading-snug">
                  {stories[current].title}
                </h2>
                <p className="text-slate-400 text-base sm:text-lg mb-8 leading-relaxed">
                  {stories[current].description}
                </p>

                <div className="grid grid-cols-2 gap-6 py-8 border-y border-white/10 mb-8">
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-black text-white">{stories[current].metric1.value}</div>
                    <div className="text-[10px] sm:text-xs text-blue-400 uppercase font-bold tracking-widest">{stories[current].metric1.label}</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-black text-white">{stories[current].metric2.value}</div>
                    <div className="text-[10px] sm:text-xs text-blue-400 uppercase font-bold tracking-widest">{stories[current].metric2.label}</div>
                  </div>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.open(`https://wa.me/${OWNER_PHONE}?text=I am interested in the ${stories[current].title} case study`, '_blank')}
                  className="group relative inline-flex items-center justify-between gap-4 px-8 py-4 bg-white text-black font-bold rounded-2xl transition-all hover:bg-blue-50 w-fit"
                >
                  <span className="flex items-center gap-2">
                    Read Case Study
                    <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </span>
                </motion.button>
              </div>

              <div className="relative min-h-[350px] lg:h-auto group overflow-hidden cursor-pointer" onClick={() => setIsVideoOpen(true)}>
                <img 
                  src={stories[current].image} 
                  alt="Case Study" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="relative w-20 h-20 sm:w-28 sm:h-28 flex items-center justify-center"
                  >
                    <div className="absolute inset-0 bg-blue-600/40 blur-2xl rounded-full animate-pulse" />
                    <div className="relative w-full h-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2.5rem] flex items-center justify-center transition-all hover:bg-white/20">
                        <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-2xl flex items-center justify-center shadow-2xl">
                           <Play fill="#020617" className="text-[#020617] ml-1 sm:size-8" />
                        </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setIsVideoOpen(false)}
              className="absolute inset-0 bg-black/95 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10 z-10"
            >
              <button 
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-500 text-white rounded-full transition-colors backdrop-blur-md"
              >
                <X size={24} />
              </button>
              
              <video 
                key={stories[current].videoUrl} 
                className="w-full h-full object-contain"
                controls
                autoPlay
                playsInline
              >
                <source src={stories[current].videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
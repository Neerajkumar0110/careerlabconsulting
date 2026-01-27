'use client';

import React, { useState, useMemo, useRef } from 'react';
import { Play, Star, ArrowRight, Download, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Internship {
  title: string;
  id: string;
  videoId: string;
  image: string;
}

const allInternships: Record<string, Internship[]> = {
  "AI & Data": [
    { title: "InternX-AI Developer", id: "ai-dev", videoId: "whqLvigQWoE", image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800" },
    { title: "InternX-Data Engineer", id: "data-eng", videoId: "kriafQfqGZE", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800" },
    { title: "InternX-AI Quality & Safety Engineer", id: "ai-safety", videoId: "vViMFjvVT9E", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800" },
  ],
  "Cloud & Infra": [
    { title: "InternX-Cloud & AI Engineer", id: "cloud-ai", videoId: "kriafQfqGZE", image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800" },
  ],
  "Cybersecurity": [
    { title: "InternX-Cyber Security Expert", id: "cyber-exp", videoId: "vViMFjvVT9E", image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800" },
  ],
  "Web3 & Blockchain": [
    { title: "InternX-Blockchain Developer", id: "eth-dev", videoId: "qOVAbKKSH10", image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800" },
  ],
  "Product & Growth": [
    { title: "InternX-AI Product Manager", id: "ai-pm", videoId: "4XO3g7Rfamk", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=800" },
    { title: "InternX-AI Marketing Specialist", id: "ai-mkt", videoId: "whqLvigQWoE", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800" },
  ],
  "Industry-Specific AI": [
    { title: "InternX-FinTech AI Specialist", id: "fintech-ai", videoId: "qOVAbKKSH10", image: "https://media.istockphoto.com/id/2185214215/photo/businessman-using-ai-technology-with-business-operations-automation-systems-to-help-make.webp?a=1&b=1&s=612x612&w=0&k=20&c=1pAq5ww9tjjKySiiuPSZk71N8fDsN_GvwkKmZ3ssAA8=" },
    { title: "InternX-HealthTech AI Specialist", id: "health-ai", videoId: "vViMFjvVT9E", image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&q=80&w=800" },
  ],
  "Robotics & IoT": [
    { title: "InternX-Robotics Engineer", id: "robot-eng", videoId: "kriafQfqGZE", image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800" },
    { title: "InternX-AI & IoT Engineer", id: "iot-eng", videoId: "whqLvigQWoE", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" },
    { title: "InternX-Drone & Automation Engineer", id: "drone-eng", videoId: "4XO3g7Rfamk", image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=800" },
  ],
  "Future Tech": [
    { title: "InternX-Humanoid Robotics Engineer", id: "humanoid", videoId: "vViMFjvVT9E", image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=800" },
    { title: "InternX-Smart Mobility Engineer", id: "mobility", videoId: "kriafQfqGZE", image: "https://media.istockphoto.com/id/1637506537/photo/multiracial-tachnicial-engineer-training-with-robot-arm.webp?a=1&b=1&s=612x612&w=0&k=20&c=XXV_xLuijifwyHFnxTBfWORRKNBCMLtcdtBmATZsRww=" },
    { title: "InternX-XR & AI Developer", id: "xr-ai", videoId: "4XO3g7Rfamk", image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc07d?auto=format&fit=crop&q=80&w=800" },
  ]
};

const ALL_TAB = "All Internships";

export default function CourseGrid() {
  const [activeTab, setActiveTab] = useState<string>(ALL_TAB);
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
  
  const tabs = useMemo(() => [ALL_TAB, ...Object.keys(allInternships)], []);

  const displayedCourses = useMemo(() => {
    if (activeTab === ALL_TAB) {
      return Object.values(allInternships).flat();
    }
    return allInternships[activeTab] || [];
  }, [activeTab]);

  // Click handler that also centers the clicked tab
  const handleTabClick = (tab: string, e: React.MouseEvent) => {
    setActiveTab(tab);
    (e.currentTarget as HTMLElement).scrollIntoView({
      behavior: 'smooth',
      inline: 'center',
      block: 'nearest'
    });
  };

  return (
    <section className="py-16 md:py-28 bg-[#020617] relative overflow-hidden text-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Header --- */}
        <header className="text-center mb-12 md:mb-20">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tighter uppercase leading-[0.9]">
            Explore All <span className="text-blue-500 italic">InternX Programs</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base font-medium uppercase tracking-[0.2em]">
            Industry-leading certifications for the next generation of tech pioneers.
          </p>
        </header>

        {/* --- Hand-Slide Optimized Tabs --- */}
        <nav className="relative mb-12 group">
          <div 
            className="flex items-center overflow-x-auto no-scrollbar gap-3 pb-6 touch-pan-x cursor-grab active:cursor-grabbing snap-x snap-mandatory"
            style={{ WebkitOverflowScrolling: 'touch' }} // Smooth momentum on iOS
          >
            {tabs.map((tab) => (
              <button 
                key={tab} 
                onClick={(e) => handleTabClick(tab, e)}
                aria-pressed={activeTab === tab}
                className={`flex-shrink-0 px-6 py-3 rounded-full text-[11px] font-black uppercase tracking-widest transition-all duration-300 border snap-start ${
                  activeTab === tab 
                  ? 'bg-blue-600 text-white border-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)] scale-105' 
                  : 'border-white/10 text-slate-500 hover:border-white/30 hover:bg-white/5'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          
          {/* Subtle Indicators for Scroll (Mobile Only) */}
          <div className="absolute right-0 top-0 bottom-6 w-16 bg-gradient-to-l from-[#020617] to-transparent pointer-events-none md:hidden" />
          <div className="absolute left-0 top-0 bottom-6 w-16 bg-gradient-to-r from-[#020617] to-transparent pointer-events-none md:hidden" />
        </nav>

        {/* --- Responsive Grid --- */}
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10"
        >
          <AnimatePresence mode="popLayout">
            {displayedCourses.map((course) => (
              <motion.article 
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={course.id} 
                className="group bg-[#0a1229] border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-blue-500/30 transition-all duration-500 flex flex-col"
              >
                {/* Thumbnail */}
                <div 
                  className="relative aspect-video w-full overflow-hidden cursor-pointer"
                  onClick={() => setSelectedVideo(course.videoId)}
                >
                  <img 
                    src={course.image} 
                    alt={course.title}
                    width={800}
                    height={450}
                    loading="lazy" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a1229] via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-blue-600/90 rounded-full flex items-center justify-center text-white backdrop-blur-md group-hover:scale-110 transition-all shadow-xl">
                      <Play className="w-6 h-6 fill-current translate-x-0.5" />
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-black text-white mb-6 leading-tight italic uppercase min-h-[3.5rem]">
                    {course.title}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Access</span>
                      <span className="text-xs font-black text-slate-200">Lifetime</span>
                    </div>
                    <div className="flex flex-col gap-1 items-end">
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Rating</span>
                      <span className="flex items-center gap-1 text-xs font-black text-yellow-500">
                        <Star className="w-3 h-3 fill-current" /> 4.9
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto flex gap-3">
                    <button className="flex-1 py-4 border border-white/10 rounded-2xl text-[10px] font-black uppercase text-slate-300 hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                      <Download className="w-4 h-4" /> Brochure
                    </button>
                    <button className="flex-1 py-4 bg-blue-600 hover:bg-blue-500 rounded-2xl text-[10px] font-black uppercase text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20">
                      Enroll <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* --- Video Lightbox --- */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-2xl bg-black/90"
          >
            <div className="absolute inset-0" onClick={() => setSelectedVideo(null)} />
            <motion.div 
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              className="relative w-full max-w-5xl aspect-video bg-black rounded-3xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <button 
                onClick={() => setSelectedVideo(null)}
                className="absolute top-4 right-4 z-20 p-3 bg-black/60 hover:bg-red-500 rounded-full text-white transition-all"
              >
                <X className="w-6 h-6" />
              </button>
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1`}
                title="Video Preview"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { 
          -ms-overflow-style: none; 
          scrollbar-width: none; 
          scroll-snap-type: x mandatory;
        }
      `}</style>
    </section>
  );
}
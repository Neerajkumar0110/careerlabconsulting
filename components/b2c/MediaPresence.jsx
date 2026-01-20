'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const mediaNews = [
  { id: 1, title: "CLC Tops InternX Training Rankings:", source: "BW BUSINESSWORLD", desc: "Recognized as a leader in Online Training Space." },
  { id: 2, title: "107th Training 119th AI Agents Opens in India.", source: "THE TIMES OF INDIA", desc: "Strengthening nationwide presence for analytics education." },
  { id: 3, title: "Footprint Expands to Middle East", source: "Hindustan Times", desc: "New Dubai Center to launch by August 2023." },
  { id: 4, title: "Curriculum Ranked Most Industry-Relevant", source: "The Print", desc: "IAF ranking testament to CLC's understanding of market demands." },
  { id: 5, title: "Global Recognition in Intenships", source: "Business Standard", desc: "CLC recognized for world-class professional training modules." }
];

export default function MediaPresence() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const offset = clientWidth > 768 ? 400 : 320; 
      const scrollTo = direction === 'left' ? scrollLeft - offset : scrollLeft + offset;
      
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 px-4 bg-[#02040a] min-h-fit">
      <div className="max-w-7xl mx-auto">
        
        <div className="flex items-end justify-between mb-12">
          <div className="space-y-2">
            <p className="text-blue-500 font-bold text-xs uppercase tracking-[0.3em]">Recognition</p>
            <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-none">
              OUR MEDIA <br/> 
              <span className="text-slate-600/80">PRESENCE</span>
            </h3>
          </div>
          
          <div className="hidden md:flex gap-3">
            <button 
              onClick={() => scroll('left')}
              className="p-4 rounded-full border border-white/10 text-white hover:bg-white/5 transition-all active:scale-95"
            >
              <ChevronLeft size={24}/>
            </button>
            <button 
              onClick={() => scroll('right')}
              className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 active:scale-95"
            >
              <ChevronRight size={24}/>
            </button>
          </div>
        </div>

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-12 no-scrollbar snap-x snap-mandatory touch-pan-x"
          style={{ scrollBehavior: 'smooth' }}
        >
          {mediaNews.map((news) => (
            <motion.div 
              key={news.id} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="min-w-[280px] sm:min-w-[320px] md:min-w-[400px] snap-center bg-white p-8 md:p-10 rounded-[40px] flex flex-col justify-between h-[320px] md:h-[350px] shadow-2xl relative overflow-hidden group"
            >
              {/* Card Content */}
              <div className="relative z-10">
                <Quote className="text-blue-600/10 mb-6 group-hover:text-blue-600/20 transition-colors" size={48} />
                <p className="text-slate-700 font-bold text-lg md:text-xl leading-snug line-clamp-4">
                  "{news.title}: {news.desc}"
                </p>
              </div>
              
              {/* Card Footer */}
              <div className="pt-6 border-t border-slate-100 relative z-10">
                 <p className="text-black font-black text-xs md:text-sm tracking-tighter uppercase italic opacity-80 group-hover:opacity-100 transition-opacity">
                   {news.source}
                 </p>
              </div>

              {/* Decorative background element */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-blue-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>

        {/* Mobile Swipe Hint */}
        <div className="md:hidden flex flex-col items-center gap-2 mt-4">
           <div className="w-12 h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div 
                animate={{ x: [-20, 20] }} 
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="w-6 h-full bg-blue-500 rounded-full" 
              />
           </div>
           <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">Swipe to explore</p>
        </div>

      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </section>
  );
}
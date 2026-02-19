"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  Star, CheckCircle, Quote, Users, ShieldCheck,
  Globe, Zap, BarChart3, ChevronLeft, ChevronRight, 
  Briefcase, Languages, ExternalLink
} from "lucide-react";
import { useRef, useEffect, useState } from "react";

const REVIEWS = [
  { 
    id: 1, 
    name: "Daniel Cruz", 
    role: "Lead AI Architect", 
    content: "The quality of vetted freelancers here is unmatched. We integrated their workflow in weeks.", 
    rating: 5, 
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    projectsDelivered: 24,
    languages: ["English", "Spanish"],
    skills: ["LLMs", "PyTorch"],
    rate: "$85"
  },
  { 
    id: 2, 
    name: "Sarah Jenkins", 
    role: "Product Strategist", 
    content: "Secure escrow and transparent milestone tracking. It's the gold standard for remote tech talent.", 
    rating: 5, 
    avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150",
    projectsDelivered: 42,
    languages: ["English", "French"],
    skills: ["Product", "Growth"],
    rate: "$95"
  },
  { 
    id: 3, 
    name: "Aarav Mehta", 
    role: "Full-Stack Engineer", 
    content: "The dispute resolution gave us the confidence to scale our global engineering team rapidly.", 
    rating: 4.9, 
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
    projectsDelivered: 17,
    languages: ["English", "Hindi"],
    skills: ["Next.js", "Go"],
    rate: "$65"
  },
  { 
    id: 4, 
    name: "Elena Rodriguez", 
    role: "Senior UX Designer", 
    content: "High-ticket projects and a very intuitive interface. Best platform for top 1% designers.", 
    rating: 4.8, 
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    projectsDelivered: 31,
    languages: ["English", "Portuguese"],
    skills: ["Figma", "SaaS"],
    rate: "$75"
  },
];

const STATS = [
  { label: "Active Clients", value: "12k+", icon: Users, color: "text-blue-400" },
  { label: "Success Rate", value: "99.8%", icon: ShieldCheck, color: "text-emerald-400" },
  { label: "Global Reach", value: "150+", icon: Globe, color: "text-purple-400" },
];

export default function PremiumReviewSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current && !isHovered) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        const maxScroll = scrollWidth - clientWidth;
        const nextScroll = scrollLeft >= maxScroll - 10 ? 0 : scrollLeft + 350;
        
        scrollRef.current.scrollTo({ left: nextScroll, behavior: "smooth" });
      }
    }, 4000);
    return () => clearInterval(interval);
  }, [isHovered]);

  const manualScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const offset = direction === "left" ? -350 : 350;
      scrollRef.current.scrollTo({ left: scrollLeft + offset, behavior: "smooth" });
    }
  };

  return (
    <div className="relative bg-[#050505] py-32 px-6 overflow-hidden selection:bg-indigo-500/30">
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/10 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-20">
          <div className="max-w-2xl space-y-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <Zap size={14} className="text-yellow-400 fill-yellow-400" />
              <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">The Elite Network</span>
            </motion.div>
            
            <h2 className="text-6xl lg:text-8xl font-bold text-white tracking-tight leading-[0.85]">
              Built for <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-cyan-400">
                Performance.
              </span>
            </h2>
            
            <p className="text-gray-400 text-lg max-w-md">
              Join the 12,000+ companies scaling faster with our vetted expert protocol.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 border-l border-white/10 pl-8">
            {STATS.map((stat, i) => (
              <div key={i} className="space-y-1">
                <div className={`flex items-center gap-2 ${stat.color}`}>
                  <stat.icon size={18} />
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                </div>
                <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mb-8">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-[0.3em]">Verified Professionals</h3>
            <div className="flex gap-3">
              <button onClick={() => manualScroll("left")} className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-indigo-600 transition-all">
                <ChevronLeft size={20} />
              </button>
              <button onClick={() => manualScroll("right")} className="p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-indigo-600 transition-all">
                <ChevronRight size={20} />
              </button>
            </div>
        </div>

        <div
          ref={scrollRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-12 transition-all"
        >
          {REVIEWS.map((review) => (
            <motion.div
              key={review.id}
              whileHover={{ y: -10 }}
              className="min-w-[380px] snap-center bg-white/[0.03] border border-white/10 rounded-[2.5rem] p-10 relative group backdrop-blur-sm"
            >
              <Quote className="absolute top-10 right-10 text-white/5" size={80} />

              <div className="relative z-10 space-y-8">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="absolute -inset-1 bg-gradient-to-tr from-indigo-500 to-cyan-500 rounded-full blur opacity-30 group-hover:opacity-100 transition duration-500" />
                    <img 
                      src={review.avatar} 
                      alt={review.name} 
                      className="relative w-16 h-16 rounded-full object-cover border-2 border-[#050505]" 
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white">{review.name}</h4>
                    <p className="text-xs text-indigo-400 font-semibold">{review.role}</p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed text-lg font-light">
                  "{review.content}"
                </p>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Briefcase size={14} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{review.projectsDelivered} Tasks</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <Languages size={14} />
                    <span className="text-[11px] font-bold uppercase tracking-wider">{review.languages[0]}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-white font-bold text-xl">{review.rate}<span className="text-xs text-gray-500">/hr</span></span>
                    <div className="flex gap-0.5 text-yellow-500 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <motion.button 
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-colors"
                  >
                    View Profile <ExternalLink size={14} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Medal, Star, Zap, Globe, Target, 
  ArrowUpRight, ShieldCheck, ChevronRight, CheckCircle2,
  Code2, Database, LayoutTemplate, Cpu, Users, Mail, X, Loader2
} from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const CATEGORIES = ["Global Elite", "AI Architects", "Frontend", "Backend & Cloud"];

// Enhanced data with categories for functional filtering
const LEADERBOARD_DATA = [
  { rank: 1, category: "AI Architects", name: "Alex Chen", role: "AI Systems Architect", score: "9,985", sprint: 42, country: "US", avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Legend", color: "text-yellow-400", border: "border-yellow-400/50", bg: "bg-yellow-400/10" },
  { rank: 2, category: "Frontend", name: "Sarah Jenkins", role: "Full Stack Lead", score: "9,840", sprint: 38, country: "UK", avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Grandmaster", color: "text-slate-300", border: "border-slate-300/50", bg: "bg-slate-300/10" },
  { rank: 3, category: "Backend & Cloud", name: "Kenji Sato", role: "Rust Blockchain Eng.", score: "9,720", sprint: 31, country: "JP", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Grandmaster", color: "text-orange-400", border: "border-orange-400/50", bg: "bg-orange-400/10" },
  { rank: 4, category: "Frontend", name: "Priya Sharma", role: "UI/UX Visionary", score: "9,650", sprint: 29, country: "IN", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Master" },
  { rank: 5, category: "Backend & Cloud", name: "Marcus Doe", role: "DevOps & Cloud", score: "9,500", sprint: 45, country: "DE", avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Master" },
  { rank: 6, category: "Backend & Cloud", name: "Elena Rostova", role: "Backend Lead", score: "9,420", sprint: 22, country: "RU", avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Diamond" },
  { rank: 7, category: "AI Architects", name: "David Kim", role: "Machine Learning Eng.", score: "9,310", sprint: 19, country: "KR", avatar: "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Diamond" },
  { rank: 8, category: "Frontend", name: "Aisha Patel", role: "Frontend Developer", score: "9,250", sprint: 15, country: "IN", avatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Diamond" },
  { rank: 9, category: "AI Architects", name: "Michael Chang", role: "Data Scientist", score: "9,100", sprint: 14, country: "SG", avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Diamond" },
  { rank: 10, category: "Backend & Cloud", name: "Omar Farooq", role: "AWS Architect", score: "9,050", sprint: 12, country: "AE", avatar: "https://images.pexels.com/photos/1212984/pexels-photo-1212984.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Gold" },
];

export default function LeaderboardPage() {
  const [activeCategory, setActiveCategory] = useState("Global Elite");
  const [visibleCount, setVisibleCount] = useState(5); // For Load More functionality
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  // FILTER LOGIC
  const getFilteredData = () => {
    if (activeCategory === "Global Elite") return LEADERBOARD_DATA;
    return LEADERBOARD_DATA.filter(user => user.category === activeCategory);
  };

  const filteredData = getFilteredData();
  // Ensure we always have top 3 for the podium from the filtered data
  const topThree = filteredData.slice(0, 3);
  const remainingList = filteredData.slice(3);
  const visibleRemainingList = remainingList.slice(0, visibleCount);

  // LOAD MORE LOGIC
  const loadMore = () => {
    setVisibleCount(prev => prev + 5);
  };

  // TAB CLICK LOGIC
  const handleTabChange = (cat: string) => {
    setActiveCategory(cat);
    setVisibleCount(5); // Reset visible count on filter change
  };

  // WHATSAPP SUBMISSION LOGIC
  const handleAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const ownerPhone = "918700236923";
      const message = `*🚀 New Assessment Initialization Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Specialization:* ${formData.role}`;
      window.open(`https://wa.me/${ownerPhone}?text=${message}`, '_blank');
      
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 relative">
        {/* Ambient Backgrounds */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 md:space-y-24">
          
          {/* Header Section */}
          <div className="text-center space-y-6 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
              <Trophy size={14} className="text-yellow-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Hall of Fame</span>
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight">
              Global <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Leaderboard.</span>
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed">
              The top 1% of digital architects. Ranked by our autonomous AI based on code quality, sprint velocity, and technical precision.
            </motion.p>
          </div>

          {/* Filters (FIXED) */}
          <div className="flex justify-center">
            <div className="flex p-1.5 bg-white/5 rounded-2xl border border-white/10 overflow-x-auto no-scrollbar w-full max-w-fit">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => handleTabChange(cat)}
                  className={`px-5 py-3 md:px-8 md:py-3.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/30' : 'text-slate-500 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* TOP 3 PODIUM - Responsive Grid (FIXED Z-INDEX) */}
          <div className="pt-10">
            {topThree.length >= 3 ? (
              <>
                {/* Desktop Layout (2 - 1 - 3) */}
                <div className="hidden lg:flex justify-center items-end gap-6 h-[400px]">
                  
                  {/* Rank 2 */}
                  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="w-1/3 max-w-[300px]">
                    <div className={`relative p-8 rounded-[2.5rem] bg-[#0a0f1d] border ${topThree[1].border || 'border-slate-300/50'} flex flex-col items-center text-center shadow-2xl mt-10`}>
                      <div className="absolute -top-6 w-12 h-12 rounded-full bg-[#0a0f1d] border border-white/10 flex items-center justify-center font-black text-xl text-slate-300 z-20">2</div>
                      <img src={topThree[1].avatar} className="w-24 h-24 rounded-full object-cover border-4 border-slate-300/30 mb-4" alt="Rank 2" />
                      <h3 className="text-xl font-bold text-white line-clamp-1">{topThree[1].name}</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">{topThree[1].role}</p>
                      <div className={`px-4 py-1.5 rounded-full ${topThree[1].bg || 'bg-slate-300/10'} ${topThree[1].color || 'text-slate-300'} text-xs font-black tracking-widest mb-6`}>{topThree[1].score} IQ</div>
                      <div className="flex gap-4 text-slate-400 text-[10px] font-bold uppercase">
                        <span>{topThree[1].sprint} Sprints</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Rank 1 */}
                  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="w-1/3 max-w-[340px] z-10">
                    <div className={`relative p-10 rounded-[3rem] bg-[#0a0f1d] border-2 ${topThree[0].border || 'border-yellow-400/50'} flex flex-col items-center text-center shadow-[0_0_50px_rgba(250,204,21,0.15)] transform -translate-y-8 mt-12`}>
                      {/* FIXED Z-INDEX: Added z-20 to ensure it stays above the border */}
                      <div className="absolute -top-10 w-20 h-20 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 flex items-center justify-center shadow-xl z-20">
                        <Trophy className="text-[#020617]" size={32} />
                      </div>
                      <img src={topThree[0].avatar} className="w-32 h-32 rounded-full object-cover border-4 border-yellow-400/50 mb-4 mt-2" alt="Rank 1" />
                      <h3 className="text-2xl font-black text-white line-clamp-1">{topThree[0].name}</h3>
                      <p className="text-xs font-black uppercase tracking-widest text-yellow-500/80 mb-4">{topThree[0].role}</p>
                      <div className={`px-6 py-2 rounded-full ${topThree[0].bg || 'bg-yellow-400/10'} ${topThree[0].color || 'text-yellow-400'} text-sm font-black tracking-widest mb-6 border border-yellow-400/20`}>{topThree[0].score} IQ</div>
                      <div className="flex gap-4 text-slate-400 text-xs font-bold uppercase">
                        <span><Zap size={14} className="inline text-yellow-500 mr-1"/> {topThree[0].sprint} Sprints</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* Rank 3 */}
                  <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="w-1/3 max-w-[300px]">
                    <div className={`relative p-8 rounded-[2.5rem] bg-[#0a0f1d] border ${topThree[2].border || 'border-orange-400/50'} flex flex-col items-center text-center shadow-2xl mt-10`}>
                      <div className="absolute -top-6 w-12 h-12 rounded-full bg-[#0a0f1d] border border-white/10 flex items-center justify-center font-black text-xl text-orange-400 z-20">3</div>
                      <img src={topThree[2].avatar} className="w-24 h-24 rounded-full object-cover border-4 border-orange-400/30 mb-4" alt="Rank 3" />
                      <h3 className="text-xl font-bold text-white line-clamp-1">{topThree[2].name}</h3>
                      <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-4">{topThree[2].role}</p>
                      <div className={`px-4 py-1.5 rounded-full ${topThree[2].bg || 'bg-orange-400/10'} ${topThree[2].color || 'text-orange-400'} text-xs font-black tracking-widest mb-6`}>{topThree[2].score} IQ</div>
                      <div className="flex gap-4 text-slate-400 text-[10px] font-bold uppercase">
                        <span>{topThree[2].sprint} Sprints</span>
                      </div>
                    </div>
                  </motion.div>

                </div>

                {/* Mobile Layout (Stacked 1, 2, 3) */}
                <div className="flex lg:hidden flex-col gap-6">
                  {/* Rank 1 */}
                  <div className={`relative p-8 rounded-[2.5rem] bg-[#0a0f1d] border-2 ${topThree[0].border || 'border-yellow-400/50'} flex flex-col items-center text-center shadow-[0_0_30px_rgba(250,204,21,0.1)] mt-12`}>
                    <div className="absolute -top-8 w-16 h-16 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 flex items-center justify-center shadow-xl z-20">
                      <Trophy className="text-[#020617]" size={28} />
                    </div>
                    <img src={topThree[0].avatar} className="w-24 h-24 rounded-full object-cover border-4 border-yellow-400/50 mb-4 mt-2" alt="Rank 1" />
                    <h3 className="text-2xl font-black text-white">{topThree[0].name}</h3>
                    <p className="text-[10px] font-black uppercase tracking-widest text-yellow-500/80 mb-3">{topThree[0].role}</p>
                    <div className={`px-5 py-1.5 rounded-full ${topThree[0].bg || 'bg-yellow-400/10'} ${topThree[0].color || 'text-yellow-400'} text-xs font-black tracking-widest mb-4`}>{topThree[0].score} IQ</div>
                  </div>

                  {/* Ranks 2 & 3 Mobile Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {[topThree[1], topThree[2]].map((user, idx) => (
                      <div key={idx} className={`relative p-6 rounded-3xl bg-[#0a0f1d] border ${user.border || 'border-slate-500'} flex flex-col items-center text-center mt-6`}>
                        <div className={`absolute -top-5 w-10 h-10 rounded-full bg-[#0a0f1d] border border-white/10 flex items-center justify-center font-black text-lg z-20 ${idx === 0 ? 'text-slate-300' : 'text-orange-400'}`}>{idx + 2}</div>
                        <img src={user.avatar} className={`w-16 h-16 rounded-full object-cover border-2 mb-3 mt-2 ${idx === 0 ? 'border-slate-300/30' : 'border-orange-400/30'}`} alt={`Rank ${idx + 2}`} />
                        <h3 className="text-sm font-bold text-white line-clamp-1">{user.name}</h3>
                        <div className={`mt-3 px-3 py-1 rounded-full ${user.bg || 'bg-slate-500/10'} ${user.color || 'text-white'} text-[10px] font-black tracking-widest`}>{user.score}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="text-center py-10 text-slate-500">Not enough data in this category.</div>
            )}
          </div>

          {/* LIST VIEW for Rank 4+ */}
          <div className="bg-[#0a0f1d]/40 border border-white/5 rounded-[2rem] md:rounded-[3rem] p-4 md:p-10 backdrop-blur-xl">
            <div className="flex items-center justify-between px-4 mb-6 md:mb-8 border-b border-white/5 pb-4">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Global Ranking</span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Score / Sprints</span>
            </div>

            <div className="space-y-3 md:space-y-4">
              <AnimatePresence>
                {visibleRemainingList.map((user, i) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.05 }}
                    key={`${user.name}-${user.rank}`} 
                    className="flex items-center justify-between p-4 md:p-6 bg-white/[0.02] border border-white/5 hover:border-white/20 hover:bg-white/[0.04] rounded-2xl md:rounded-3xl transition-all group"
                  >
                    <div className="flex items-center gap-4 md:gap-6">
                      <span className="text-sm md:text-xl font-black text-slate-600 w-6 text-center">{user.rank}</span>
                      <img src={user.avatar} className="w-10 h-10 md:w-14 md:h-14 rounded-xl object-cover border border-white/10 group-hover:scale-105 transition-transform" alt={user.name} />
                      <div>
                        <h4 className="text-sm md:text-lg font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">
                          {user.name} <CheckCircle2 size={14} className="text-emerald-500 hidden md:block" />
                        </h4>
                        <p className="text-[9px] md:text-xs font-black uppercase tracking-widest text-slate-500 mt-1 line-clamp-1">{user.role}</p>
                      </div>
                    </div>

                    <div className="text-right flex flex-col md:flex-row items-end md:items-center gap-1 md:gap-8">
                      <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 tracking-widest bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                        <Target size={12} className="text-blue-400" /> {user.sprint} Sprints
                      </div>
                      <div className="text-base md:text-2xl font-black text-white">{user.score}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* LOAD MORE BUTTON (FIXED LOGIC) */}
            {visibleCount < remainingList.length && (
              <div className="mt-8 flex justify-center">
                <button 
                  onClick={loadMore}
                  className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all text-slate-300"
                >
                  Load Next Nodes
                </button>
              </div>
            )}
          </div>

          {/* CTA Box (FIXED TO OPEN POPUP) */}
          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-2xl">
            <div className="relative bg-[#020617] rounded-[1.95rem] md:rounded-[2.95rem] p-8 md:p-16 text-center space-y-8 overflow-hidden">
               <div className="absolute inset-0 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />
               <div className="relative z-10">
                 <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">Think you belong <br className="hidden md:block"/> on the leaderboard?</h2>
                 <p className="text-slate-400 text-sm md:text-lg max-w-xl mx-auto mb-8">Take the autonomous AI Assessment. Prove your technical dominance and get discovered by high-ticket global clients.</p>
                 
                 {/* Trigger Modal Instead of direct link */}
                 <button 
                    onClick={() => setIsModalOpen(true)} 
                    className="inline-flex items-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-white text-black font-black text-[10px] md:text-xs uppercase tracking-widest rounded-xl md:rounded-2xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)]"
                 >
                    Initialize Assessment <ChevronRight size={18} />
                 </button>
               </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      {/* --- ASSESSMENT REGISTRATION POPUP MODAL (FIXED) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 sm:px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative bg-[#0a0f1d] border border-white/10 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] max-w-xl w-full shadow-3xl overflow-hidden z-10">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
               <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all"><X size={20} /></button>
               
               <div className="mb-8 text-center md:text-left">
                  <span className="text-[9px] font-black uppercase text-blue-400 tracking-[0.3em] mb-2 block">Skill Validator</span>
                  <h3 className="text-2xl md:text-3xl font-black mb-2 tracking-tight leading-tight">Claim Your Rank</h3>
                  <p className="text-slate-400 text-xs italic">Submit your details to receive the autonomous AI assessment link.</p>
               </div>

               <form onSubmit={handleAssessmentSubmit} className="space-y-4 md:space-y-5">
                  <div className="relative group">
                     <Users className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                     <input required type="text" placeholder="Full Identity Name" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="relative group">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                     <input required type="email" placeholder="Professional Email" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="relative group">
                     <Code2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                     <input required type="text" placeholder="Primary Tech Stack (e.g. Next.js, Rust)" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, role: e.target.value})} />
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full py-4 md:py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] rounded-xl md:rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 mt-4 text-[10px] md:text-xs">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <>Request Audit Link <ChevronRight size={16} /></>}
                  </button>
                  <p className="text-[8px] md:text-[9px] text-center text-slate-500 uppercase tracking-widest mt-4">Link will be sent via Email & WhatsApp</p>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
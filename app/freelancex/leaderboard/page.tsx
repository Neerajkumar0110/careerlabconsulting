// app/freelancex/leaderboard/page.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Trophy, Medal, Star, Zap, Globe, Target, 
  ArrowUpRight, ShieldCheck, ChevronRight, CheckCircle2,
  Code2, Database, LayoutTemplate, Cpu, Users, Mail, X, Loader2,
  Lock, ArrowRight, Activity, TrendingUp, Sparkles, Layers,
  Fingerprint, BarChart3, Binary, ShieldAlert
} from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const CATEGORIES = ["Global Elite", "AI Architects", "Frontend", "Backend & Cloud"];

const LEADERBOARD_DATA = [
  { rank: 1, category: "AI Architects", name: "Alex Chen", role: "AI Systems Architect", score: "9,985", sprint: 42, country: "US", avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Legend", color: "text-yellow-400", border: "border-yellow-400/50", bg: "bg-yellow-400/10" },
  { rank: 2, category: "Frontend", name: "Sarah Jenkins", role: "Full Stack Lead", score: "9,840", sprint: 38, country: "UK", avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Grandmaster", color: "text-slate-300", border: "border-slate-300/50", bg: "bg-slate-300/10" },
  { rank: 3, category: "Backend & Cloud", name: "Kenji Sato", role: "Rust Blockchain Eng.", score: "9,720", sprint: 31, country: "JP", avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Grandmaster", color: "text-orange-400", border: "border-orange-400/50", bg: "bg-orange-400/10" },
  { rank: 4, category: "Frontend", name: "Priya Sharma", role: "UI/UX Visionary", score: "9,650", sprint: 29, country: "IN", avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Master" },
  { rank: 5, category: "Backend & Cloud", name: "Marcus Doe", role: "DevOps & Cloud", score: "9,500", sprint: 45, country: "DE", avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150", tier: "Master" },
];

const RECENT_NODES = [
  { name: "Elena R.", score: 9420, date: "2m ago", status: "VERIFIED" },
  { name: "David K.", score: 9310, date: "14m ago", status: "VERIFIED" },
  { name: "Aisha P.", score: 9250, date: "1h ago", status: "VERIFIED" },
];

export default function LeaderboardPage() {
  const [activeCategory, setActiveCategory] = useState("Global Elite");
  const [visibleCount, setVisibleCount] = useState(5);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: '' });

  const filteredData = activeCategory === "Global Elite" ? LEADERBOARD_DATA : LEADERBOARD_DATA.filter(user => user.category === activeCategory);
  const topThree = filteredData.slice(0, 3);
  const remainingList = filteredData.slice(3).slice(0, visibleCount);

  const handleAssessmentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const ownerPhone = "918700236923";
      const message = `*🚀 New Assessment Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Role:* ${formData.role}`;
      window.open(`https://wa.me/${ownerPhone}?text=${message}`, '_blank');
      setIsSubmitting(false);
      setIsModalOpen(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-36 pb-16 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-blue-600/5 blur-[150px] rounded-full pointer-events-none -z-0" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24 md:space-y-32">
          
          {/* --- HERO SECTION --- */}
          <section className="text-center space-y-6 max-w-4xl mx-auto pt-10 px-4">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
              <Trophy size={14} className="text-yellow-500" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">Biological Hall of Fame</span>
            </motion.div>
            <h1 className="text-4xl md:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9]">
              The Protocol <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 font-extrabold text-white">Elite.</span>
            </h1>
            <p className="text-slate-400 text-sm md:text-xl max-w-2xl mx-auto font-medium leading-relaxed px-4">
              Real-time rankings of the top 1% technical minds. Verified by autonomous AI logic and sprint execution metrics.
            </p>
          </section>

          {/* --- PODIUM SECTION (FIXED AWARD POSITION) --- */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-end max-w-6xl mx-auto px-4 pt-12">
            {topThree.length >= 3 && (
              <>
                {/* 2nd Place */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="order-2 lg:order-1 bg-[#0a0f1d] border border-white/5 p-8 rounded-[2.5rem] text-center relative group h-fit">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a0f1d] border border-white/10 flex items-center justify-center font-black text-xl text-slate-400 z-30 shadow-xl">2</div>
                  <img src={topThree[1].avatar} className="w-24 h-24 rounded-full mx-auto border-4 border-slate-500/20 mb-6 object-cover" alt="rank2" />
                  <h3 className="text-xl font-bold mb-1">{topThree[1].name}</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{topThree[1].role}</p>
                  <div className="px-6 py-2 bg-white/5 rounded-full text-xs font-black tracking-widest border border-white/5">{topThree[1].score} IQ</div>
                </motion.div>

                {/* 1st Place (Rank 1) */}
                <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} className="order-1 lg:order-2 bg-gradient-to-b from-indigo-950/40 to-blue-950/20 border border-blue-500/30 p-10 rounded-[3rem] text-center relative shadow-[0_0_60px_rgba(37,99,235,0.15)] group scale-110 mb-8 lg:mb-0">
                  <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full bg-gradient-to-b from-yellow-400 to-yellow-600 flex items-center justify-center shadow-[0_0_30px_rgba(234,179,8,0.4)] z-50">
                    <Trophy className="text-black" size={32} />
                  </div>
                  <img src={topThree[0].avatar} className="w-32 h-32 rounded-full mx-auto border-4 border-yellow-500/50 mb-6 object-cover relative z-10" alt="rank1" />
                  <h2 className="text-2xl font-black mb-1">{topThree[0].name}</h2>
                  <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.2em] mb-8">{topThree[0].role}</p>
                  <div className="px-8 py-3 bg-yellow-500 text-black rounded-full text-sm font-black tracking-widest shadow-xl">{topThree[0].score} IQ</div>
                </motion.div>

                {/* 3rd Place */}
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} className="order-3 bg-[#0a0f1d] border border-white/5 p-8 rounded-[2.5rem] text-center relative group h-fit">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-[#0a0f1d] border border-white/10 flex items-center justify-center font-black text-xl text-orange-400/80 z-30 shadow-xl">3</div>
                  <img src={topThree[2].avatar} className="w-24 h-24 rounded-full mx-auto border-4 border-orange-500/20 mb-6 object-cover" alt="rank3" />
                  <h3 className="text-xl font-bold mb-1">{topThree[2].name}</h3>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-6">{topThree[2].role}</p>
                  <div className="px-6 py-2 bg-white/5 rounded-full text-xs font-black tracking-widest border border-white/5">{topThree[2].score} IQ</div>
                </motion.div>
              </>
            )}
          </div>

          {/* --- NEW SECTION 1: AI AUDIT INTELLIGENCE --- */}
          <section className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[120px] rounded-full -z-10" />
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight uppercase">Verifiable <br/> <span className="text-indigo-400 italic">Assessment Logic.</span></h2>
                <p className="text-slate-400 text-base md:text-lg">Our autonomous neural engine evaluates every line of code across 4 core intelligence vectors to determine global ranking.</p>
                <div className="grid grid-cols-2 gap-4">
                   {[
                     { label: "Logic Consistency", val: 98, icon: Binary },
                     { label: "Security Hardening", val: 94, icon: ShieldAlert },
                     { label: "System Design", val: 91, icon: Layers },
                     { label: "Velocity Index", val: 89, icon: Activity },
                   ].map((item, i) => (
                     <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <item.icon className="text-blue-400 mb-3" size={18} />
                        <p className="text-[10px] font-black text-slate-500 uppercase mb-1">{item.label}</p>
                        <span className="text-lg font-black text-white">{item.val}%</span>
                     </div>
                   ))}
                </div>
              </div>
              <div className="relative p-6 bg-black rounded-3xl border border-white/10 font-mono text-[11px] text-slate-500 shadow-2xl">
                 <div className="flex gap-2 mb-4">
                    <div className="w-2.5 h-2.5 bg-red-500/50 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-yellow-500/50 rounded-full" />
                    <div className="w-2.5 h-2.5 bg-green-500/50 rounded-full" />
                 </div>
                 <p className="text-indigo-400">// INITIALIZING_NEURAL_AUDIT_v4.2</p>
                 <p>&gt; Analyzing Git Commit Hash: 0x9f2a...</p>
                 <p>&gt; Validating Cognitive Weight: [SUCCESS]</p>
                 <p>&gt; Cross-Referencing 31k Talent Nodes...</p>
                 <p className="text-emerald-400 animate-pulse mt-4">&gt; SUBJECT RANK: LEGEND_LEVEL_S1</p>
              </div>
            </div>
          </section>

          {/* --- NEW SECTION 2: NETWORK MILESTONE REWARDS --- */}
          <section className="space-y-12 px-4">
            <div className="text-center space-y-3">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">The Growth <span className="text-blue-400 italic">Roadmap.</span></h2>
              <p className="text-slate-500 font-medium">Elevate your node grade to unlock exclusive ecosystem perks.</p>
            </div>
            
            

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               {[
                 { rank: "Diamond+", perk: "Direct Client Access", desc: "Skip the queue. Get direct notifications for high-ticket enterprise bounties.", icon: Target },
                 { rank: "Grandmaster", perk: "Permanent Equity Share", desc: "Earn a percentage of the total ecosystem liquidity pool every quarter.", icon: Wallet },
                 { rank: "Legend", perk: "Architect Governance", desc: "Influence the protocol roadmap and vote on vetting logic updates.", icon: Cpu },
               ].map((perk, i) => (
                 <div key={i} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-all group">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                      <perk.icon className="text-indigo-400" size={24} />
                    </div>
                    <h3 className="text-lg font-black text-white mb-2">{perk.perk}</h3>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed">{perk.desc}</p>
                 </div>
               ))}
            </div>
          </section>

          {/* --- LIST VIEW --- */}
          <section className="bg-[#0a0f1d]/40 border border-white/5 rounded-[2.5rem] md:rounded-[3.5rem] p-4 md:p-10 backdrop-blur-xl max-w-6xl mx-auto">
            <div className="flex items-center justify-between px-6 mb-8 border-b border-white/5 pb-6">
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Global Network Ranking</span>
              <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Logic Efficiency</span>
            </div>

            <div className="space-y-4">
                {remainingList.map((user, i) => (
                  <div key={i} className="flex items-center justify-between p-4 md:p-6 bg-white/[0.02] border border-white/5 hover:border-blue-500/30 rounded-3xl transition-all group">
                    <div className="flex items-center gap-6">
                      <span className="text-sm md:text-lg font-black text-slate-600 w-6">{user.rank}</span>
                      <img src={user.avatar} className="w-10 h-10 md:w-14 md:h-14 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-all" alt={user.name} />
                      <div>
                        <h4 className="text-sm md:text-lg font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-2">{user.name} <CheckCircle2 size={14} className="text-emerald-500 hidden md:block" /></h4>
                        <p className="text-[9px] md:text-xs font-black uppercase tracking-widest text-slate-500 mt-1">{user.role}</p>
                      </div>
                    </div>
                    <div className="text-right flex items-center gap-8">
                      <div className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase text-slate-400 bg-white/5 px-4 py-2 rounded-xl border border-white/5">{user.sprint} Sprints</div>
                      <div className="text-lg md:text-2xl font-black text-white">{user.score}</div>
                    </div>
                  </div>
                ))}
            </div>
          </section>

          {/* --- FINAL CTA --- */}
          <section className="px-4 pb-20">
            <div className="relative rounded-[3rem] md:rounded-[4rem] overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-3xl">
               <div className="relative bg-[#020617] rounded-[2.95rem] md:rounded-[3.95rem] p-10 md:p-24 text-center space-y-8 overflow-hidden">
                  <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
                  <h2 className="text-3xl md:text-7xl font-black text-white leading-tight tracking-tighter uppercase">Initialize Your <br className="hidden md:block"/> Technical Audit.</h2>
                  <p className="text-slate-400 text-sm md:text-xl max-w-2xl mx-auto px-4">Stop bidding. Start proving. Deploy your neural hash on the global ledger and let the work find you.</p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-4">
                     <button onClick={() => setIsModalOpen(true)} className="w-full sm:w-auto px-10 md:px-16 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all text-xs shadow-2xl active:scale-95">Start Assessment</button>
                     <button className="w-full sm:w-auto px-10 md:px-16 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all text-xs">View Methodology</button>
                  </div>
               </div>
            </div>
          </section>

        </div>
      </main>

      <Footer />

      {/* --- MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 sm:px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 50 }} className="relative bg-[#0a0f1d] border border-white/10 p-8 md:p-12 rounded-[3rem] max-w-lg w-full shadow-3xl overflow-hidden z-10">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-8 right-8 p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all"><X size={24} /></button>
              <h3 className="text-2xl font-black mb-10 tracking-tight uppercase tracking-widest text-white">Initialize Protocol</h3>
              <form onSubmit={handleAssessmentSubmit} className="space-y-4">
                <input required type="text" placeholder="Identity Label (Full Name)" className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
                <input required type="email" placeholder="Professional Email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                <input required type="text" placeholder="Specialization (e.g. AI Core, Backend)" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 outline-none transition-all placeholder:text-slate-700" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} />
                <button disabled={isSubmitting} type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.3em] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 disabled:opacity-50 text-[10px] active:scale-95">
                  {isSubmitting ? <Loader2 className="animate-spin" size={20}/> : <>Request Node Access <ArrowRight size={18} /></>}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// Helper components for the new sections
function Wallet({ className, size }: { className?: string, size?: number }) {
    return (
        <svg 
            width={size || 24} 
            height={size || 24} 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={className}
        >
            <path d="M20 12V8H6a2 2 0 0 1-2-2c0-1.1.9-2 2-2h12v4"/>
            <path d="M4 6v12c0 1.1.9 2 2 2h14v-4"/>
            <path d="M18 12a2 2 0 0 0-2 2c0 1.1.9 2 2 2h4v-4h-4z"/>
        </svg>
    );
}
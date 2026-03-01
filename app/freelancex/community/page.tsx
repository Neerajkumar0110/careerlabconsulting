'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, Trophy, Gift, Calendar, 
  ArrowUpRight, MessageSquare, Star, 
  ShieldCheck, Zap, Globe, Share2, ChevronRight
} from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const LEADERBOARD = [
  { rank: 1, name: "Sarah Jenkins", role: "AI Strategist", score: 9920, avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { rank: 2, name: "Daniel Cruz", role: "Full Stack Lead", score: 9850, avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150" },
  { rank: 3, name: "Aarav Mehta", role: "UI Architect", score: 9780, avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150" },
];

const EVENTS = [
  { title: "Next.js 16 Deep Dive", date: "March 15, 2026", type: "Virtual Workshop", icon: Zap },
  { title: "Global AI Networking", date: "March 22, 2026", type: "Conference", icon: Globe },
  { title: "Freelance Mastery", date: "April 05, 2026", type: "Closed Masterclass", icon: Star },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative overflow-hidden">
        {/* Immersive Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6 lg:px-8 space-y-24">
          
          {/* Section 1: Community Hero */}
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md"
            >
              <Users size={14} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">Global Talent Network</span>
            </motion.div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
              The Protocol <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-cyan-400">Community.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
              Connect with the top 1% of technical minds. Participate in exclusive sprints, earn credentials, and scale your network.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">12.4k Active Nodes</span>
              </div>
              <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                <Globe size={14} className="text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">150+ Countries</span>
              </div>
            </div>
          </div>

          {/* Section 2: Leaderboard & Referral (Bento Grid) */}
          <div className="grid lg:grid-cols-12 gap-8">
            
            {/* Leaderboard Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:col-span-7 bg-[#0a0f1d]/60 border border-white/10 rounded-[3rem] p-8 md:p-12 backdrop-blur-2xl shadow-3xl"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-2xl font-black flex items-center gap-3 uppercase tracking-tight">
                  <Trophy className="text-yellow-500" /> Elite Leaderboard
                </h2>
                <span className="text-[10px] font-black uppercase text-slate-500 tracking-widest">Update: Hourly</span>
              </div>
              
              <div className="space-y-4">
                {LEADERBOARD.map((user, idx) => (
                  <div key={idx} className="group bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-indigo-500/30 p-6 rounded-[2rem] transition-all flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <span className={`text-xl font-black ${idx === 0 ? 'text-yellow-500' : 'text-slate-500'}`}>0{user.rank}</span>
                      <img src={user.avatar} alt={user.name} className="w-12 h-12 rounded-2xl object-cover border border-white/10" />
                      <div>
                        <h4 className="font-bold text-white group-hover:text-blue-400 transition-colors">{user.name}</h4>
                        <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{user.role}</p>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-lg font-black text-white">{user.score.toLocaleString()}</div>
                       <div className="text-[9px] font-black text-emerald-500 uppercase tracking-tighter">Verified Node</div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/10 transition-all">View Full Ranking</button>
            </motion.div>

            {/* Referral Card */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="lg:col-span-5 flex flex-col gap-8"
            >
              <div className="bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/20 rounded-[3rem] p-10 relative overflow-hidden flex-grow flex flex-col justify-center backdrop-blur-md">
                 <div className="absolute top-[-20%] right-[-20%] opacity-10"><Gift size={250} /></div>
                 <h2 className="text-3xl font-black mb-4 leading-tight">Refer & Earn <br/> <span className="text-blue-400">Exclusive Rewards.</span></h2>
                 <p className="text-slate-400 text-sm mb-8 font-medium">Grow the ecosystem. Invite elite talent and receive up to 5% commission on their first 12 months of sprints.</p>
                 <div className="space-y-4">
                    <div className="bg-[#020617]/80 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                       <code className="text-xs text-blue-400">HIREX-00X2-PROTOCOL</code>
                       <button className="p-2 hover:bg-white/5 rounded-lg text-slate-500 hover:text-white transition-all"><Share2 size={16}/></button>
                    </div>
                    <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl transition-all shadow-xl shadow-blue-900/20">Initialize Referral</button>
                 </div>
              </div>

              {/* Support Shortcut */}
              <div className="bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem] p-8 flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center">
                       <MessageSquare className="text-emerald-500" size={20} />
                    </div>
                    <div>
                       <h4 className="font-bold text-white">Community Support</h4>
                       <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Instant Response Node</p>
                    </div>
                 </div>
                 <ChevronRight className="text-slate-500" />
              </div>
            </motion.div>

          </div>

          {/* Section 3: Upcoming Events */}
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                 <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-4">Protocol <span className="text-indigo-400">Events.</span></h2>
                 <p className="text-slate-500 font-medium">Reserved sessions for verified professionals.</p>
              </div>
              <button className="px-8 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-2">
                 Calendar View <Calendar size={14} />
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {EVENTS.map((event, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ scale: 1.02 }}
                  className="bg-[#0a0f1d] border border-white/5 hover:border-indigo-500/30 rounded-[2.5rem] p-8 transition-all relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-6 text-white/5 group-hover:text-indigo-500/10 transition-colors">
                     <event.icon size={80} />
                  </div>
                  <div className="relative z-10 space-y-6">
                    <span className="px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 text-[9px] font-black uppercase tracking-widest border border-indigo-500/20">
                      {event.type}
                    </span>
                    <h3 className="text-xl font-bold leading-tight">{event.title}</h3>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                       <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{event.date}</span>
                       <button className="text-blue-400 hover:text-white transition-colors"><ArrowUpRight size={18}/></button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 4: Final CTA */}
          <div className="relative rounded-[3rem] overflow-hidden bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-600 p-[1px]">
            <div className="relative bg-[#020617] rounded-[2.95rem] p-12 md:p-24 text-center space-y-10 overflow-hidden">
               <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
               <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">Ready to integrate <br/> with the elite?</h2>
               <p className="text-slate-400 text-lg max-w-xl mx-auto">Join thousands of architects and engineers shaping the future of decentralized work.</p>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <Link href="/freelancex/signup" className="w-full sm:w-auto px-12 py-5 bg-white text-black font-black uppercase tracking-widest rounded-2xl hover:scale-105 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)]">Initialize Profile</Link>
                  <button className="w-full sm:w-auto px-12 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-white/10 transition-all">Download Manifesto</button>
               </div>
               <div className="flex items-center justify-center gap-3 pt-6">
                  <ShieldCheck className="text-blue-500" size={16} />
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Protocol X-Secure Verified Community</span>
               </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
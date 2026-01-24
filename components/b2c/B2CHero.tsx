'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, Play, Sparkles, X, 
  BookOpen, Clock, ChevronRight, 
  Layers, CheckCircle2, Layout, Video 
} from 'lucide-react';

const OWNER_PHONE = "918700236923";

export default function B2CHero() {
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  return (
    <section className="relative min-h-screen pt-10 pb-12 md:py-24 overflow-hidden bg-[#020617] flex items-center">
      
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-5%] right-[-5%] w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/10 blur-[80px] md:blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:30px_30px] md:bg-[size:40px_40px]"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 relative z-10 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          
          <div className="w-full lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-blue-400 text-[11px] font-bold uppercase tracking-[0.15em]">AI-Driven Learning</span>
            </motion.div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] md:leading-[0.95] mb-6 tracking-tighter">
              Master AI <br/>
              <span className="text-blue-500 italic">By Doing.</span>
            </h1>

            <p className="text-slate-400 text-base md:text-xl mb-10 max-w-md leading-relaxed">
              Don't just watch. Deploy. Experience the first <span className="text-white font-semibold">Active-LMS</span> for Autonomous AI development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => window.open(`https://wa.me/${OWNER_PHONE}`, '_blank')}
                className="px-8 py-4.5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20 active:scale-95"
              >
                Join Now <MessageCircle className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsVideoOpen(true)}
                className="px-8 py-4.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <Play className="w-4 h-4 fill-white" /> Demo
              </button>
            </div>
          </div>

          <div className="w-full lg:col-span-7 flex justify-center lg:justify-end mt-8 lg:mt-0">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full max-w-[640px] bg-[#0a0f1d] rounded-[2.5rem] border border-white/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.7)] overflow-hidden"
            >
              <div className="p-5 md:p-7 border-b border-white/5 bg-white/[0.01] flex justify-between items-center">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-inner">JD</div>
                  <div>
                    <h4 className="text-white font-bold text-sm md:text-base">Aryan's Workspace</h4>
                    <p className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Advanced AI Cohort</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-emerald-500 text-[10px] font-black uppercase">Live</span>
                </div>
              </div>

              <div className="p-5 md:p-8">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-8">
                  {[
                    { label: 'Progress', val: '68%', icon: Layout, color: 'text-blue-400' },
                    { label: 'Modules', val: '12/18', icon: BookOpen, color: 'text-purple-400' },
                    { label: 'Streak', val: '14 Days', icon: Clock, color: 'text-orange-400', hideOnMobile: true },
                  ].map((stat, i) => (
                    <div key={i} className={`bg-white/[0.03] border border-white/5 rounded-2xl p-4 md:p-5 ${stat.hideOnMobile ? 'hidden md:block' : ''}`}>
                      <stat.icon className={`w-4 h-4 ${stat.color} mb-3`} />
                      <div className="text-white font-black text-xl md:text-2xl mb-1">{stat.val}</div>
                      <div className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                  <div className="md:hidden bg-white/[0.03] border border-white/5 rounded-2xl p-4 flex items-center justify-between col-span-2">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-orange-400" />
                      <span className="text-slate-500 text-[10px] font-bold uppercase">Daily Streak</span>
                    </div>
                    <span className="text-white font-black">14 Days 🔥</span>
                  </div>
                </div>

                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4 px-1">
                    <h5 className="text-white text-[11px] font-black uppercase tracking-[0.2em] flex items-center gap-2">
                      <Layers className="w-4 h-4 text-blue-500" /> Active Learning
                    </h5>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/10 to-transparent border border-blue-500/20 rounded-[2rem] p-6 group hover:bg-blue-600/[0.08] transition-all cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                      <div className="flex-1">
                        <h6 className="text-white font-bold text-lg mb-1 group-hover:text-blue-400 transition-colors">Neural Multi-Agent Systems</h6>
                        <p className="text-slate-400 text-sm mb-5 leading-relaxed">Frameworks: LangGraph, AutoGPT & CrewaAI</p>
                        <div className="flex items-center gap-4">
                           <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-500 transition-all">
                             <Video className="w-3.5 h-3.5" /> Resume
                           </button>
                           <span className="text-slate-500 text-xs font-medium">42 mins left</span>
                        </div>
                      </div>
                      <div className="relative w-20 h-20 self-center md:self-auto">
                         <svg className="w-full h-full -rotate-90">
                           <circle cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                           <motion.circle 
                             cx="40" cy="40" r="34" stroke="currentColor" strokeWidth="6" fill="transparent" 
                             className="text-blue-500" 
                             strokeDasharray={213.6} 
                             initial={{ strokeDashoffset: 213.6 }}
                             animate={{ strokeDashoffset: 213.6 * (1 - 0.65) }}
                             transition={{ duration: 1.5, ease: "easeOut" }}
                           />
                         </svg>
                         <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-white font-black text-sm">65%</span>
                         </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="text-white text-[11px] font-black uppercase tracking-[0.2em] mb-4 px-1">Upcoming Tasks</h5>
                  <div className="space-y-3">
                    {[
                      { title: 'Setup Vector Database', due: 'Today', status: 'pending' },
                      { title: 'Fine-tune Llama 3 Node', due: 'Tomorrow', status: 'completed' }
                    ].map((task, i) => (
                      <div key={i} className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:border-white/10 transition-all group">
                        <div className="flex items-center gap-4">
                          <div className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors ${task.status === 'completed' ? 'bg-emerald-500/20 border-emerald-500/40' : 'bg-white/5 border-white/10 group-hover:border-blue-500/50'}`}>
                            {task.status === 'completed' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                          </div>
                          <span className={`text-sm md:text-base ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-200 font-semibold'}`}>{task.title}</span>
                        </div>
                        <span className={`text-[10px] font-black px-2 py-1 rounded-md ${task.due === 'Today' ? 'bg-orange-500/10 text-orange-500' : 'bg-white/5 text-slate-500'}`}>{task.due}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isVideoOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsVideoOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-xl" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-4xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <button onClick={() => setIsVideoOpen(false)} className="absolute top-4 right-4 z-10 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors">
                <X size={24} />
              </button>
              <iframe src="https://videocdn.cdnpk.net/videos/74dc5baf-f258-413a-a58d-c37d649610f9/horizontal/previews/clear/large.mp4?token=exp=1769272110~hmac=da8364c15cd4cec070ff1a4941f081dd8c478f40cc4bb8791e61ca433eb41626" className="w-full h-full" allow="autoplay; encrypted-media" allowFullScreen />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
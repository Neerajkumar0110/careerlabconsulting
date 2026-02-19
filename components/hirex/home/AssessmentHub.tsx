'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Database, 
  Terminal, 
  Timer, 
  ShieldCheck, 
  ChevronRight,
  BrainCircuit,
  Bot,
  Activity,
  Globe,
  Zap
} from 'lucide-react';

const LIVE_ACTIVITY = [
  { user: "User_882", skill: "SQL Mastery", score: "92%", time: "2m ago" },
  { user: "Dev_Alpha", skill: "Next.js", score: "100%", time: "5m ago" },
  { user: "AI_Prompt", skill: "Prompt Eng", score: "88%", time: "7m ago" },
];

const SKILL_TESTS = [
  { name: "SQL Mastery", questions: 10, time: "15m", icon: <Database size={18} />, color: "text-blue-400", load: 65 },
  { name: "Next.js Architecture", questions: 10, time: "20m", icon: <Terminal size={18} />, color: "text-indigo-400", load: 89 },
  { name: "AI Prompt Engineering", questions: 10, time: "12m", icon: <Bot size={18} />, color: "text-cyan-400", load: 42 },
];

export default function AssessmentHub() {
  const [activeUsers, setActiveUsers] = useState(1248);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveUsers(prev => prev + Math.floor(Math.random() * 5) - 2);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="test" className="relative py-32 bg-[#020617] overflow-hidden border-t border-white/5">
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          
          <div className="text-center lg:text-left">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
            >
              <Activity size={14} className="animate-pulse" />
              Live System Status: Optimal
            </motion.div>

            <h2 className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] uppercase italic mb-8">
              Validate <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">Neural DNA.</span>
            </h2>

            <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
               <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase">{activeUsers} Nodes Online</span>
               </div>
               <div className="px-4 py-2 bg-white/5 rounded-xl border border-white/10 flex items-center gap-3">
                  <Globe size={14} className="text-blue-400" />
                  <span className="text-[10px] font-bold text-slate-300 uppercase">Global Sync Active</span>
               </div>
            </div>

            <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed mb-12 max-w-xl">
              Our AI-orchestrated challenges analyze logic patterns in real-time. Cheat-proof, autonomous, and instantly synced to your global profile.
            </p>
            
            <div className="hidden md:block space-y-3 opacity-60 hover:opacity-100 transition-opacity">
               <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">Recent Verifications</p>
               {LIVE_ACTIVITY.map((item, i) => (
                 <div key={i} className="flex items-center gap-4 text-[11px] text-slate-500 font-mono">
                    <span className="text-blue-400">[{item.time}]</span>
                    <span className="text-white">{item.user}</span>
                    <span className="w-12 h-[1px] bg-white/10" />
                    <span>{item.skill}</span>
                    <span className="text-green-500 font-bold">{item.score}</span>
                 </div>
               ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="bg-[#0f172a]/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-6 md:p-10 shadow-2xl relative"
          >
            <div className="flex justify-between items-center mb-10">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <BrainCircuit className="text-blue-400" size={20} />
                </div>
                <div>
                  <h4 className="text-white font-black uppercase tracking-tighter text-xl italic">Test Terminal</h4>
                  <div className="flex items-center gap-2">
                    <span className="flex h-1.5 w-1.5 rounded-full bg-green-500"></span>
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Protocol v2.5.0 - Encrypted</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {SKILL_TESTS.map((test, idx) => (
                <div 
                  key={idx} 
                  className="group relative overflow-hidden p-5 bg-black/40 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all cursor-pointer"
                >
                  <div 
                    className="absolute bottom-0 left-0 h-[2px] bg-blue-500/30 transition-all duration-1000" 
                    style={{ width: `${test.load}%` }}
                  />

                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${test.color} group-hover:scale-110 transition-transform duration-500`}>
                        {test.icon}
                      </div>
                      <div>
                        <h5 className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2">
                          {test.name}
                          {idx === 1 && <span className="text-[8px] bg-blue-500 text-white px-1.5 py-0.5 rounded">HOT</span>}
                        </h5>
                        <div className="flex gap-4 mt-1">
                          <span className="flex items-center gap-1 text-[8px] font-bold text-slate-500 uppercase">
                            <Zap size={8} /> {test.questions} Questions
                          </span>
                          <span className="flex items-center gap-1 text-[8px] font-bold text-slate-500 uppercase">
                            <Timer size={8} /> {test.time}
                          </span>
                        </div>
                      </div>
                    </div>
                    <ChevronRight size={18} className="text-slate-700 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-10 group relative py-5 bg-blue-600 overflow-hidden text-white font-black uppercase text-xs tracking-[0.3em] rounded-2xl transition-all hover:bg-blue-500">
               <span className="text-[9px] md:text-[16px] relative z-10">Initialize Assessment Hub</span>
               <motion.div 
                 animate={{ x: ['-100%', '100%'] }}
                 transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full"
               />
            </button>

            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
              <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
                Engine: Manee Pro 2.5
              </span>
              <div className="flex gap-1">
                {[1,2,3,4].map(i => <div key={i} className="w-1 h-3 bg-blue-500/20 rounded-full" />)}
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
// components/hirex/home/AptitudeCTA.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  BrainCircuit, 
  Code2, 
  Briefcase, 
  ArrowRight, 
  ShieldCheck, 
  Timer,
  Terminal,
  Trophy,
  Sparkles
} from 'lucide-react';

export default function AptitudeCTA() {
  return (
    <section className="relative py-24 md:py-32 px-4 bg-[#020617] overflow-hidden border-t border-white/5 font-sans">
      
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-5 mix-blend-overlay pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Sparkles size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]">Exclusive College Hiring</span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6">
              Prove Your Skills. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-500 to-blue-500 italic">
                Get Hired Instantly.
              </span>
            </h2>

            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto lg:mx-0 mb-8 leading-relaxed font-medium">
              Bypass the traditional resume screening. Take our <strong className="text-white">AI-Proctored Technical Assessment</strong>. Top 10% scorers are directly fast-tracked to final HR interviews.
            </p>

            <Link href="/hirex/aptitude-test">
              <button className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-10 py-5 rounded-[1.5rem] text-sm font-black uppercase tracking-widest hover:bg-slate-200 transition-all shadow-[0_0_40px_rgba(168,85,247,0.3)] hover:shadow-[0_0_60px_rgba(168,85,247,0.5)] active:scale-95 overflow-hidden w-full sm:w-auto">
                <span className="relative z-10 flex items-center gap-2">
                  Start Assessment <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </Link>

            <p className="mt-5 text-xs text-slate-500 font-medium">
              * Requires a stable internet connection and webcam access.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid grid-cols-2 gap-4 mt-8 lg:mt-0"
          >
            
            <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-6 rounded-3xl backdrop-blur-sm hover:border-purple-500/30 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Timer size={20} className="text-blue-400" />
              </div>
              <h4 className="text-white font-bold text-lg mb-1">15 Mins</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Time-bound strict evaluation format.</p>
            </div>

            <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-6 rounded-3xl backdrop-blur-sm hover:border-rose-500/30 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-rose-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Code2 size={20} className="text-rose-400" />
              </div>
              <h4 className="text-white font-bold text-lg mb-1">25 Hard Qs</h4>
              <p className="text-slate-400 text-xs leading-relaxed">Advanced algorithms & system design.</p>
            </div>

            <div className="bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 p-6 rounded-3xl backdrop-blur-sm hover:border-green-500/30 transition-colors group">
              <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <ShieldCheck size={20} className="text-green-400" />
              </div>
              <h4 className="text-white font-bold text-lg mb-1">Proctored</h4>
              <p className="text-slate-400 text-xs leading-relaxed">AI tracks tab switches & focus loss.</p>
            </div>

            <div className="bg-gradient-to-br from-purple-900/40 to-transparent border border-purple-500/30 p-6 rounded-3xl backdrop-blur-sm hover:border-purple-400/50 transition-colors group relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-20 group-hover:opacity-40 transition-opacity">
                <Trophy size={40} className="text-purple-400" />
              </div>
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mb-4 relative z-10 group-hover:scale-110 transition-transform">
                <Briefcase size={20} className="text-purple-400" />
              </div>
              <h4 className="text-white font-bold text-lg mb-1 relative z-10">Direct Hire</h4>
              <p className="text-purple-200/60 text-xs leading-relaxed relative z-10">Skip round 1. Go straight to HR.</p>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
}
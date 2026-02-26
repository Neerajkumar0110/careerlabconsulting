// components/hirex/home/AptitudeCTA.tsx

'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrainCircuit, Code2, Briefcase, ArrowRight, ShieldCheck, Timer } from 'lucide-react';

export default function AptitudeCTA() {
  return (
    <section className="relative py-24 px-4 bg-[#020617] overflow-hidden border-t border-white/5 font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-b from-white/[0.04] to-transparent border border-white/10 rounded-[2rem] p-8 md:p-16 text-center backdrop-blur-md shadow-2xl"
        >
          <div className="inline-flex justify-center items-center w-16 h-16 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-8 shadow-[0_0_30px_rgba(168,85,247,0.2)]">
            <BrainCircuit size={32} />
          </div>

          <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tight mb-6">
            Ready for the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 italic">Ultimate Challenge?</span>
          </h2>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed font-medium">
            Take our AI-proctored <strong className="text-white">College Hiring Aptitude Test</strong>. Top scorers are directly fast-tracked for premium tech roles and interviews.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center gap-2 bg-[#0b0f1f] border border-white/10 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-300">
              <Timer size={16} className="text-blue-400" /> 15 Minutes
            </div>
            <div className="flex items-center gap-2 bg-[#0b0f1f] border border-white/10 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-300">
              <Code2 size={16} className="text-rose-400" /> 25 Hard Questions
            </div>
            <div className="flex items-center gap-2 bg-[#0b0f1f] border border-white/10 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-300">
              <ShieldCheck size={16} className="text-green-400" /> Strict Proctoring
            </div>
            <div className="flex items-center gap-2 bg-[#0b0f1f] border border-white/10 rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-slate-300">
              <Briefcase size={16} className="text-purple-400" /> Direct Hiring
            </div>
          </div>

          <Link href="/aptitude-test">
            <button className="group relative inline-flex items-center justify-center gap-3 bg-white text-black px-12 py-5 rounded-full text-sm font-black uppercase tracking-widest hover:bg-slate-200 transition-all shadow-[0_0_40px_rgba(255,255,255,0.2)] active:scale-95 overflow-hidden">
              <span className="relative z-10 flex items-center gap-2">
                Start Aptitude Test <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </button>
          </Link>
          
        </motion.div>
      </div>
    </section>
  );
}
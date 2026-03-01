'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, Terminal, Zap, ArrowRight, 
  Loader2, Cpu, CheckCircle2, ShieldCheck, Mail, 
  User, Phone, ChevronRight, Layers, FileCode2,
  Clock
} from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

export default function ManeeAIPage() {
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', projectScope: '' });
  const [blueprint, setBlueprint] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    try {
      const res = await fetch('/api/manee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      if (!res.ok) throw new Error("API Error");
      
      const data = await res.json();
      setBlueprint(data);

      const ownerPhone = "918700236923";
      const waMsg = `*🤖 Manee AI Lead*%0A%0A*Name:* ${formData.name}%0A*Scope:* ${formData.projectScope.substring(0, 100)}...%0A*Recommended Stack:* ${data.techStack}`;
      window.open(`https://wa.me/${ownerPhone}?text=${waMsg}`, '_blank');

      setStep(2);
    } catch (err) {
      alert("Neural connection failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/15 blur-[150px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-center"
              >
                <div className="lg:col-span-5 space-y-8 text-center lg:text-left">
                  <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-indigo-500/10 border border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.2)] mb-2 mx-auto lg:mx-0">
                    <Bot size={40} className="text-indigo-400" />
                  </motion.div>
                  
                  <div>
                    <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-tight mb-4">
                      Meet <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Manee.</span>
                    </h1>
                    <p className="text-slate-400 text-base md:text-lg font-medium leading-relaxed">
                      Your Autonomous AI Principal Architect. Describe your software idea, and Manee will instantly engineer the optimal tech stack, timeline, and deployment blueprint.
                    </p>
                  </div>

                  <div className="hidden lg:flex flex-col gap-4">
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500"><CheckCircle2 className="text-emerald-500" size={16}/> Instant Architecture Analysis</div>
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500"><CheckCircle2 className="text-emerald-500" size={16}/> AI Stack Recommendation</div>
                    <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-widest text-slate-500"><CheckCircle2 className="text-emerald-500" size={16}/> Direct to Top 1% Dev Pods</div>
                  </div>
                </div>

                <div className="lg:col-span-7">
                  <div className="bg-[#0a0f1d]/80 border border-white/10 rounded-[2rem] md:rounded-[3rem] p-6 md:p-10 backdrop-blur-2xl shadow-3xl">
                    <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-6">
                      <div className="flex items-center gap-3">
                        <Terminal size={20} className="text-indigo-500" />
                        <h3 className="text-lg font-black uppercase tracking-widest">Initialize Node</h3>
                      </div>
                      <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase rounded-full border border-emerald-500/20 flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" /> Core Online
                      </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="relative group">
                          <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
                          <input required type="text" placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, name: e.target.value})} />
                        </div>
                        <div className="relative group">
                          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
                          <input required type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, email: e.target.value})} />
                        </div>
                      </div>

                      <div className="relative group">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-indigo-400 transition-colors" size={16} />
                        <input required type="tel" placeholder="WhatsApp Number" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, phone: e.target.value})} />
                      </div>

                      <div className="relative group">
                        <textarea required rows={4} placeholder="Describe your project, app idea, or bottleneck..." className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 text-sm outline-none focus:border-indigo-500 transition-all text-white placeholder:text-slate-600 resize-none" onChange={e => setFormData({...formData, projectScope: e.target.value})} />
                      </div>

                      <button disabled={isProcessing} type="submit" className="w-full py-5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-3 mt-4 text-[10px] md:text-xs">
                        {isProcessing ? (
                          <><Loader2 className="animate-spin" size={18} /> Manee is Synthesizing...</>
                        ) : (
                          <>Generate Architecture Blueprint <Sparkles size={16} /></>
                        )}
                      </button>
                    </form>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && blueprint && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="max-w-4xl mx-auto space-y-10"
              >
                <div className="text-center space-y-4 mb-12">
                   <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 size={40} />
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black">Blueprint <span className="text-emerald-400">Generated.</span></h2>
                   <p className="text-slate-400">Manee has completed the analysis. A copy has been sent to your email.</p>
                </div>

                <div className="bg-[#0a0f1d]/80 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-12 backdrop-blur-xl shadow-3xl space-y-8">
                   
                   <div className="grid md:grid-cols-2 gap-6 border-b border-white/5 pb-8">
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                         <div className="flex items-center gap-3 mb-4 text-indigo-400">
                            <Layers size={20} /> <h4 className="font-bold text-sm uppercase tracking-widest text-white">Recommended Stack</h4>
                         </div>
                         <p className="text-slate-300 font-mono text-sm leading-relaxed">{blueprint.techStack}</p>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6">
                         <div className="flex items-center gap-3 mb-4 text-blue-400">
                            <Clock size={20} /> <h4 className="font-bold text-sm uppercase tracking-widest text-white">Estimated Timeline</h4>
                         </div>
                         <p className="text-slate-300 font-mono text-sm leading-relaxed">{blueprint.timeline}</p>
                      </div>
                   </div>

                   <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4 text-purple-400">
                         <FileCode2 size={20} /> <h4 className="font-bold text-sm uppercase tracking-widest text-white">Executive Analysis</h4>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-base italic">"{blueprint.analysis}"</p>
                   </div>

                   <div className="pt-4 flex flex-col sm:flex-row gap-4 justify-center">
                     <Link href="/freelancex/talent" className="px-10 py-5 bg-white text-black font-black uppercase tracking-widest text-[10px] md:text-xs rounded-2xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                       Deploy Node Team <ArrowRight size={16} />
                     </Link>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center justify-center gap-3 pt-12 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
             <ShieldCheck size={14} className="text-indigo-500" /> Powered by Manee Core & Autonomous AI
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
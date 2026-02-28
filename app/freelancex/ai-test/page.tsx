'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Cpu, Sparkles, CheckCircle2, Loader2, ArrowRight, 
  ShieldCheck, Mail, Target, Terminal, Fingerprint, Layers, 
  MessageSquare, ChevronRight 
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const QUESTIONS = [
  { id: 1, q: "How do you optimize a Next.js application for Core Web Vitals?", tech: "Frontend" },
  { id: 2, q: "Explain the difference between SQL and NoSQL scaling strategies.", tech: "Backend" },
  { id: 3, q: "How would you handle race conditions in a distributed system?", tech: "Architecture" }
];

const FEATURES = [
  { icon: Target, title: "Precision Vetting", desc: "AI maps your depth across 50+ frameworks." },
  { icon: Terminal, title: "Code Synthesis", desc: "Live analysis of algorithmic efficiency." },
  { icon: Fingerprint, title: "Integrity Audit", desc: "100% original response verification." }
];

export default function AITestPage() {
  const [step, setStep] = useState(1); 
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<{ score: number; summary: string } | null>(null);

  const startTest = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const submitTest = async () => {
    setIsEvaluating(true);
    try {
      const res = await fetch('/api/ai-test/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, answers })
      });
      const data = await res.json();
      setResult(data);

      const adminPhone = "918700236923";
      const waMsg = `*🚀 New AI Assessment Completed*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Score:* ${data.score}/100%0A*Summary:* ${data.summary.substring(0, 100)}...`;
      window.open(`https://wa.me/${adminPhone}?text=${waMsg}`, '_blank');

      setStep(3);
    } catch (err) {
      alert("Neural Link Interrupted. Please retry.");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-indigo-500/30">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10 px-4 sm:px-6">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-24">
                
                <div className="text-center space-y-8 max-w-4xl mx-auto">
                  <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md">
                    <Brain size={14} className="text-indigo-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Biological Intelligence Audit</span>
                  </motion.div>
                  <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                    AI Skills <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Validator.</span>
                  </h1>
                  <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                    Access high-ticket global projects by proving your technical dominance through our autonomous neural audit.
                  </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  {FEATURES.map((f, i) => (
                    <motion.div key={i} whileHover={{ y: -5 }} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:border-indigo-500/30 transition-all">
                      <f.icon className="text-indigo-400 mb-6" size={24} />
                      <h3 className="text-lg font-bold mb-3 uppercase tracking-tight">{f.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>

                <div className="bg-[#0a0f1d]/60 border border-white/10 rounded-[3rem] p-8 md:p-12 lg:p-16 backdrop-blur-2xl shadow-3xl overflow-hidden relative">
                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5 opacity-50" />
                   
                   <div className="grid lg:grid-cols-2 gap-16 items-center relative z-10">
                      <div className="space-y-6">
                         <h2 className="text-4xl font-black leading-tight tracking-tight">Ready for <span className="text-indigo-400">Calibration?</span></h2>
                         <p className="text-slate-400 leading-relaxed max-w-md">Complete your identity link to initialize the 0x99 Vetting Protocol and begin your assessment.</p>
                         <form onSubmit={startTest} className="space-y-4 pt-4 max-w-lg">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <input required type="text" placeholder="Full Identity" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600 text-sm" onChange={e => setFormData({...formData, name: e.target.value})} />
                               <input required type="email" placeholder="Secure Email" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600 text-sm" onChange={e => setFormData({...formData, email: e.target.value})} />
                            </div>
                            <input required type="tel" placeholder="WhatsApp / Phone Number" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-600 text-sm" onChange={e => setFormData({...formData, phone: e.target.value})} />
                            <button type="submit" className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center gap-3 mt-4 text-xs">
                               Initialize Link <ArrowRight size={18} />
                            </button>
                         </form>
                      </div>

                      <div className="hidden lg:block relative group h-full">
                         <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                         
                         <div className="relative h-full bg-[#020617] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
                            <img 
                              src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=format&fit=crop&q=80&w=600&h=500" 
                              alt="AI Technology Vetting Concept" 
                              className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
                            
                            <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 flex items-center gap-4">
                               <Cpu className="text-indigo-400" size={24} />
                               <div>
                                  <p className="text-white font-bold text-sm">Neural Vetting Node</p>
                                  <p className="text-slate-400 text-xs">Ready for Calibration</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-12 py-10">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8 text-center sm:text-left">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/20 rounded-2xl"><Cpu className="text-indigo-400 animate-pulse" /></div>
                    <div>
                      <h2 className="text-2xl font-bold uppercase tracking-tighter">Neural Audit</h2>
                      <p className="text-[10px] font-mono text-slate-500">USER: {formData.name.toUpperCase()}</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 font-mono text-[10px] text-slate-400">
                    LATENCY: 14MS // STATUS: LIVE
                  </div>
                </div>

                <div className="space-y-12">
                  {QUESTIONS.map((q, i) => (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={q.id} className="space-y-6">
                      <div className="flex items-start gap-4">
                        <span className="text-indigo-500 font-black text-xl">0{i + 1}</span>
                        <h3 className="text-2xl font-bold leading-tight">{q.q}</h3>
                      </div>
                      <textarea 
                        className="w-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-8 min-h-[220px] outline-none focus:border-indigo-500 focus:bg-white/[0.04] transition-all text-slate-300 text-lg leading-relaxed shadow-2xl"
                        placeholder="Synthesize your technical explanation here..."
                        onChange={e => setAnswers({...answers, [q.id]: e.target.value})}
                      />
                    </motion.div>
                  ))}
                  
                  <button 
                    disabled={isEvaluating}
                    onClick={submitTest}
                    className="w-full py-8 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black uppercase tracking-[0.3em] rounded-[2rem] flex items-center justify-center gap-4 transition-all shadow-3xl disabled:opacity-50"
                  >
                    {isEvaluating ? <><Loader2 className="animate-spin" /> Verifying Logic...</> : <>Transmit to Core <Sparkles size={20} /></>}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && result && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-12 max-w-4xl mx-auto py-10">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full" />
                  <div className="relative w-64 h-64 rounded-full border-8 border-indigo-500/10 flex items-center justify-center backdrop-blur-xl">
                    <div className="flex flex-col">
                       <div className="text-8xl font-black tracking-tighter leading-none">{result.score}</div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">Neural IQ</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="text-5xl font-black uppercase tracking-tighter">Audit <span className="text-emerald-400 font-italic">Certified.</span></h2>
                  <div className="bg-[#0a0f1d] border border-white/10 rounded-[3rem] p-10 text-left relative overflow-hidden shadow-3xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5"><ShieldCheck size={150} /></div>
                    <div className="flex items-center gap-3 mb-6">
                        <MessageSquare className="text-indigo-500" size={20} />
                        <h4 className="text-xs font-black uppercase tracking-widest text-slate-400">Executive Summary</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-xl font-medium italic">"{result.summary}"</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <Link href="/freelancex/reports" className="flex items-center gap-3 px-10 py-5 bg-white text-black rounded-2xl text-xs font-black uppercase tracking-widest hover:bg-slate-200 transition-all group">
                      Open Console <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <div className="flex items-center gap-3 px-10 py-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 font-black text-xs uppercase tracking-widest">
                       <ShieldCheck size={18}/> Verified Pro
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      <Footer />
    </div>
  );
}
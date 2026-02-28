'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Sparkles, CheckCircle2, Loader2, ArrowRight, ShieldCheck, Mail, Link } from 'lucide-react';
import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const QUESTIONS = [
  { id: 1, q: "How do you optimize a Next.js application for Core Web Vitals?", tech: "Frontend" },
  { id: 2, q: "Explain the difference between SQL and NoSQL scaling strategies.", tech: "Backend" },
  { id: 3, q: "How would you handle race conditions in a distributed system?", tech: "Architecture" }
];

export default function AITestPage() {
  const [step, setStep] = useState(1); // 1: Info, 2: Test, 3: Result
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', techStack: 'Full Stack' });
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
      setStep(3);
    } catch (err) {
      alert("Evaluation Error");
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col">
      <Navbar />

      <main className="flex-grow pt-32 pb-24 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-full bg-indigo-600/5 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto relative z-10">
          <AnimatePresence mode="wait">
            {/* Step 1: Candidate Info */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-12 text-center">
                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                    <Brain size={16} className="text-indigo-400" />
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-400">Neural Assessment V1</span>
                  </div>
                  <h1 className="text-5xl md:text-7xl font-black tracking-tight">AI Skills <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Validator.</span></h1>
                  <p className="text-slate-400 text-lg max-w-xl mx-auto">Validate your expertise and unlock the "Verified Pro" badge to get direct invites from high-ticket clients.</p>
                </div>

                <form onSubmit={startTest} className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-left space-y-6 backdrop-blur-xl">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Full Name</label>
                      <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-colors" placeholder="John Doe" onChange={e => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-2">Work Email</label>
                      <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-colors" placeholder="john@example.com" onChange={e => setFormData({...formData, email: e.target.value})} />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-5 bg-indigo-600 hover:bg-indigo-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-indigo-900/20 transition-all flex items-center justify-center gap-3">
                    Initialize Assessment <ArrowRight size={18} />
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Active Test */}
            {step === 2 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-6">
                  <div className="flex items-center gap-3">
                    <Cpu className="text-indigo-400 animate-pulse" />
                    <span className="text-sm font-bold uppercase tracking-widest">Assessment in Progress</span>
                  </div>
                  <span className="text-xs font-mono text-slate-500">Node: TR-99 // Secure Link</span>
                </div>

                <div className="space-y-12">
                  {QUESTIONS.map((q, i) => (
                    <div key={q.id} className="space-y-4">
                      <h3 className="text-xl font-bold flex gap-4">
                        <span className="text-indigo-500">{i + 1}.</span> {q.q}
                      </h3>
                      <textarea 
                        className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 min-h-[150px] outline-none focus:border-indigo-500 transition-all text-slate-300"
                        placeholder="Provide your detailed technical response..."
                        onChange={e => setAnswers({...answers, [q.id]: e.target.value})}
                      />
                    </div>
                  ))}
                  
                  <button 
                    disabled={isEvaluating}
                    onClick={submitTest}
                    className="w-full py-6 bg-emerald-600 hover:bg-emerald-500 text-white font-black uppercase tracking-widest rounded-2xl flex items-center justify-center gap-3 transition-all"
                  >
                    {isEvaluating ? <><Loader2 className="animate-spin" /> Analyzing Performance...</> : <>Submit For AI Audit <Sparkles size={18} /></>}
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Result Dashboard */}
            {step === 3 && result && (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-10">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-3xl rounded-full" />
                  <div className="relative w-48 h-48 rounded-full border-8 border-indigo-500/20 flex items-center justify-center">
                    <div className="text-6xl font-black">{result.score}</div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-4xl font-bold">Audit Report Generated</h2>
                  <div className="bg-white/5 border border-white/10 rounded-3xl p-8 text-left">
                    <p className="text-slate-300 leading-relaxed italic">"{result.summary}"</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <div className="flex items-center gap-3 px-6 py-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400">
                      <ShieldCheck /> <span className="text-xs font-bold uppercase">Profile Verified</span>
                    </div>
                    <Link href="/freelancex/reports" className="flex items-center gap-3 px-6 py-4 bg-white text-black rounded-2xl text-xs font-black uppercase hover:bg-slate-200 transition-all">
                      View Advanced Dashboard <ArrowRight size={16} />
                    </Link>
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
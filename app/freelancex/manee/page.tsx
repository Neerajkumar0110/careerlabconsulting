// app/freelancex/manee-ai/page.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, Sparkles, Terminal, Zap, ArrowRight, 
  Loader2, Cpu, CheckCircle2, ShieldCheck, Mail, 
  User, Phone, ChevronRight, Layers, FileCode2,
  Clock, Database, Lock, Workflow, BarChart3,
  Server, ShieldAlert, Lightbulb, ArrowDown
} from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

const CAPABILITIES = [
  { icon: Server, title: "Tech Stack Optimization", desc: "Manee analyzes your feature requirements and selects the most efficient, scalable tech stack, avoiding architectural debt.", color: "text-blue-400" },
  { icon: Database, title: "Database Structuring", desc: "Automatic recommendation between SQL, NoSQL, or Graph databases based on your expected data volume and query complexity.", color: "text-emerald-400" },
  { icon: ShieldAlert, title: "Vulnerability Prediction", desc: "Pre-emptive identification of security flaws in the proposed architecture before a single line of code is written.", color: "text-rose-400" },
  { icon: BarChart3, title: "Cloud Cost Forecasting", desc: "Accurate monthly AWS/GCP cost estimations based on anticipated user load and architectural choices.", color: "text-indigo-400" }
];

const PIPELINE_STEPS = [
  { num: "01", title: "Prompt Ingestion", desc: "Submit your raw idea in plain English. Manee parses the intent, constraints, and business goals." },
  { num: "02", title: "Neural Synthesis", desc: "The engine cross-references millions of successful enterprise architectures to build your custom blueprint." },
  { num: "03", title: "Pod Deployment", desc: "Manee instantly matches your new architecture with available top 1% developers ready to execute." }
];

const CASE_STUDIES = [
  {
    industry: "FinTech Platform",
    prompt: "Need a secure, high-frequency trading platform with real-time sockets and ledger immutable logs.",
    stack: "Go (Backend) + Next.js (Frontend) + PostgreSQL + Redis",
    time: "Saved 3 Weeks of Planning"
  },
  {
    industry: "AI SaaS Startup",
    prompt: "Building a heavy LLM wrapper. Needs fast streaming responses, vector DB, and secure auth.",
    stack: "Python/FastAPI + React + Pinecone + AWS ECS",
    time: "Saved 2.5 Weeks of Planning"
  }
];

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
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-indigo-600/15 blur-[150px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-24 md:space-y-32">
          
          {/* --- HERO & INTERACTION CONSOLE --- */}
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
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight mb-4">
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
                  <div className="bg-[#0a0f1d]/80 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-10 backdrop-blur-2xl shadow-3xl">
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

                      <button disabled={isProcessing} type="submit" className="w-full py-4 md:py-5 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all flex items-center justify-center gap-3 mt-4 text-[10px] md:text-xs active:scale-95 disabled:opacity-50">
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
                className="max-w-4xl mx-auto space-y-10 pt-10"
              >
                <div className="text-center space-y-4 mb-12">
                   <div className="w-20 h-20 bg-emerald-500/10 text-emerald-400 rounded-full flex items-center justify-center mx-auto border border-emerald-500/20 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                      <CheckCircle2 size={40} />
                   </div>
                   <h2 className="text-4xl md:text-6xl font-black">Blueprint <span className="text-emerald-400 italic">Generated.</span></h2>
                   <p className="text-slate-400 text-lg">Manee has completed the analysis. A copy has been sent to your email.</p>
                </div>

                <div className="bg-[#0a0f1d]/80 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 backdrop-blur-xl shadow-3xl space-y-8">
                   <div className="grid md:grid-cols-2 gap-6 border-b border-white/5 pb-8">
                      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8">
                         <div className="flex items-center gap-3 mb-4 text-indigo-400">
                            <Layers size={24} /> <h4 className="font-bold text-sm uppercase tracking-widest text-white">Recommended Stack</h4>
                         </div>
                         <p className="text-slate-300 font-mono text-sm leading-relaxed">{blueprint.techStack}</p>
                      </div>
                      <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8">
                         <div className="flex items-center gap-3 mb-4 text-blue-400">
                            <Clock size={24} /> <h4 className="font-bold text-sm uppercase tracking-widest text-white">Estimated Timeline</h4>
                         </div>
                         <p className="text-slate-300 font-mono text-sm leading-relaxed">{blueprint.timeline}</p>
                      </div>
                   </div>

                   <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-4 text-purple-400">
                         <FileCode2 size={24} /> <h4 className="font-bold text-sm uppercase tracking-widest text-white">Executive Analysis</h4>
                      </div>
                      <p className="text-slate-300 leading-relaxed text-base md:text-lg italic">"{blueprint.analysis}"</p>
                   </div>

                   <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-center">
                     <Link href="/freelancex/talent" className="px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[10px] md:text-xs rounded-2xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(255,255,255,0.2)]">
                       Deploy Node Team <ArrowRight size={16} />
                     </Link>
                   </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* --- NEW SECTION 1: COGNITIVE CAPABILITIES MATRIX --- */}
          <section className="pt-10">
             <div className="text-center space-y-4 mb-12 md:mb-16">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">Cognitive <span className="text-indigo-400 italic">Capabilities.</span></h2>
                <p className="text-slate-400 text-sm md:text-lg font-medium max-w-2xl mx-auto">What happens when you bypass human bias and let an autonomous neural engine design your infrastructure.</p>
             </div>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {CAPABILITIES.map((cap, i) => (
                  <div key={i} className="p-8 bg-[#0a0f1d] border border-white/5 rounded-[2.5rem] hover:border-indigo-500/30 transition-all group">
                     <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <cap.icon className={cap.color} size={24} />
                     </div>
                     <h3 className="text-lg font-bold text-white mb-3 leading-tight">{cap.title}</h3>
                     <p className="text-sm text-slate-400 leading-relaxed font-medium">{cap.desc}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* --- NEW SECTION 2: THE AUTONOMOUS PIPELINE --- */}
          <section className="bg-gradient-to-br from-indigo-900/10 to-transparent border border-white/5 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[1px] bg-white/10 hidden md:block pointer-events-none" />
             <div className="text-center mb-12 md:mb-20">
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">The Neural <span className="text-blue-400">Pipeline.</span></h2>
             </div>
             
             <div className="grid md:grid-cols-3 gap-12 md:gap-8 relative z-10">
                {PIPELINE_STEPS.map((step, i) => (
                  <div key={i} className="relative bg-[#020617] p-8 border border-white/10 rounded-[2.5rem] shadow-2xl group hover:-translate-y-2 transition-transform">
                     <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-blue-600 border-4 border-[#020617] flex items-center justify-center font-black text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                        {step.num}
                     </div>
                     <h4 className="text-xl font-bold text-center text-white mt-4 mb-4">{step.title}</h4>
                     <p className="text-center text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                  </div>
                ))}
             </div>
          </section>

          {/* --- NEW SECTION 3: PROVEN ARCHITECTURE BLUEPRINTS --- */}
          <section className="space-y-12">
             <div className="flex flex-col md:flex-row items-end justify-between gap-6 px-4">
                <div className="space-y-3">
                   <h2 className="text-3xl md:text-5xl font-black tracking-tight uppercase">Proven <span className="text-indigo-400">Blueprints.</span></h2>
                   <p className="text-slate-400 font-medium">Examples of architectures Manee has recently successfully synthesized.</p>
                </div>
             </div>

             <div className="grid md:grid-cols-2 gap-8">
                {CASE_STUDIES.map((study, i) => (
                  <div key={i} className="bg-[#0a0f1d] border border-white/5 rounded-[2.5rem] p-8 md:p-10 space-y-6">
                     <div className="flex items-center justify-between border-b border-white/5 pb-4">
                        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-3 py-1.5 rounded-lg">{study.industry}</span>
                        <span className="text-[9px] font-black text-emerald-400 uppercase tracking-widest flex items-center gap-2"><Clock size={12}/> {study.time}</span>
                     </div>
                     
                     <div className="space-y-2">
                        <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Client Prompt</p>
                        <p className="text-slate-300 text-sm italic border-l-2 border-slate-700 pl-4 py-1">"{study.prompt}"</p>
                     </div>

                     <div className="p-5 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <p className="text-[9px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2"><Layers size={12}/> Manee's Stack Output</p>
                        <p className="font-mono text-sm text-white font-bold">{study.stack}</p>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* --- NEW SECTION 4: MILITARY-GRADE SECURITY BANNER --- */}
          <section className="relative rounded-[3rem] overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-[#020617] border border-indigo-500/20 p-8 md:p-16 shadow-3xl text-center md:text-left">
             <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 pointer-events-none" />
             <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6">
                   <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl flex items-center justify-center mx-auto md:mx-0">
                      <Lock className="text-emerald-500" size={32} />
                   </div>
                   <h2 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">Zero-Retention <br/> <span className="text-emerald-400 italic">Data Policy.</span></h2>
                   <p className="text-slate-400 text-base md:text-lg leading-relaxed">
                     Your ideas are your intellectual property. Manee operates on a strict zero-retention policy. Prompts are analyzed in a volatile memory state and instantly purged post-synthesis.
                   </p>
                   <ul className="text-sm font-bold text-slate-300 space-y-3 pt-2 text-left w-fit mx-auto md:mx-0">
                     <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" size={16}/> SOC2 Type II Compliant Engine</li>
                     <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" size={16}/> E2E Encrypted TLS Tunnels</li>
                   </ul>
                </div>
                <div className="relative">
                   <div className="absolute inset-0 bg-emerald-500/10 blur-[100px] rounded-full" />
                   <div className="bg-black/50 border border-white/10 rounded-[2.5rem] p-8 backdrop-blur-xl relative font-mono text-[10px] sm:text-xs text-slate-500 space-y-3 shadow-2xl text-left">
                      <p className="text-blue-400">// SECURITY_PROTOCOL_LOCKED</p>
                      <p>&gt; Encrypting User Payload... [AES-256]</p>
                      <p>&gt; Synthesizing Architecture...</p>
                      <p>&gt; Wiping Volatile Memory State...</p>
                      <p className="text-emerald-500 mt-4">&gt; 0 BYTES RETAINED. IP SECURED.</p>
                   </div>
                </div>
             </div>
          </section>

          <div className="flex items-center justify-center gap-3 pt-6 text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
             <ShieldCheck size={14} className="text-indigo-500" /> Powered by Manee Core & Autonomous AI
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
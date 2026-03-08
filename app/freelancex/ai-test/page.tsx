// app/freelancex/ai-validator/page.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, Cpu, Sparkles, CheckCircle2, Loader2, ArrowRight, 
  ShieldCheck, Mail, Target, Terminal, Fingerprint, Layers, 
  MessageSquare, ChevronRight, BarChart3, Globe, Zap, Database, Lock
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

const DEPTH_METRICS = [
  { label: "Algorithmic Efficiency", value: 92, color: "bg-blue-500" },
  { label: "System Design", value: 85, color: "bg-indigo-500" },
  { label: "Security Protocols", value: 88, color: "bg-purple-500" }
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
    // Simulate API evaluation delay
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mockData = {
        score: 94,
        summary: "Candidate exhibits exceptional mastery of distributed systems and high-fidelity frontend optimization. Logic is consistent with S-Tier architectural standards."
    };
    
    setResult(mockData);
    const adminPhone = "918700236923";
    const waMsg = `*🚀 New AI Assessment Completed*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Score:* ${mockData.score}/100%0A*Summary:* ${mockData.summary.substring(0, 100)}...`;
    window.open(`https://wa.me/${adminPhone}?text=${waMsg}`, '_blank');
    setStep(3);
    setIsEvaluating(false);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-indigo-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 lg:pt-32 pb-24 relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-0" />
        
        <div className="max-w-7xl mx-auto relative z-10 px-4 sm:px-6">
          <AnimatePresence mode="wait">
            
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-24">
                
                {/* HERO SECTION */}
                <div className="text-center space-y-8 max-w-4xl mx-auto pt-10 px-4">
                  <motion.div initial={{ y: 20 }} animate={{ y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md">
                    <Brain size={14} className="text-indigo-400" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400">Autonomous Vetting Protocol</span>
                  </motion.div>
                  <h1 className="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1] md:leading-[0.9]">
                    AI Technical <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 font-extrabold">Validator.</span>
                  </h1>
                  <p className="text-slate-400 text-sm md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
                    Verify your technical rank on the global ledger. Access high-ticket projects by proving your dominance through our neural audit.
                  </p>
                </div>

                {/* FEATURE CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
                  {FEATURES.map((f, i) => (
                    <motion.div key={i} whileHover={{ y: -5 }} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 backdrop-blur-xl hover:border-indigo-500/30 transition-all group shadow-2xl">
                      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <f.icon className="text-indigo-400" size={24} />
                      </div>
                      <h3 className="text-lg font-bold mb-3 uppercase tracking-tight text-white">{f.title}</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">{f.desc}</p>
                    </motion.div>
                  ))}
                </div>

                {/* NEW SECTION 1: TECHNICAL DEPTH VISUALIZER */}
                <div className="bg-slate-900/40 border border-white/5 rounded-[3rem] p-8 md:p-16 overflow-hidden relative group">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-white leading-tight">Map Your <br/> <span className="text-blue-400">Technical Depth</span></h2>
                            <p className="text-slate-400 text-base leading-relaxed">Our AI doesn't just score you; it builds a multidimensional skill-depth profile across these core intelligence metrics.</p>
                            <div className="space-y-6 pt-4">
                                {DEPTH_METRICS.map((m, i) => (
                                    <div key={i} className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                                            <span>{m.label}</span>
                                            <span>{m.value}%</span>
                                        </div>
                                        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                            <motion.div initial={{ width: 0 }} whileInView={{ width: `${m.value}%` }} transition={{ duration: 1, delay: 0.5 }} className={`${m.color} h-full shadow-[0_0_15px_rgba(59,130,246,0.5)]`} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-[300px] md:h-[400px] flex items-center justify-center">
                            <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full animate-pulse" />
                            <Cpu size={200} className="text-white/5 absolute -rotate-12" />
                            <Brain size={120} className="text-indigo-500 animate-bounce transition-all duration-1000" style={{ animationDuration: '3s' }} />
                        </div>
                    </div>
                </div>

                {/* SIGNUP BOX */}
                <div className="bg-[#0a0f1d]/60 border border-white/10 rounded-[3rem] p-8 md:p-12 lg:p-16 backdrop-blur-2xl shadow-3xl overflow-hidden relative px-4 mx-4">
                   <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5 opacity-50" />
                   <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
                      <div className="space-y-6 text-center lg:text-left">
                         <h2 className="text-3xl md:text-5xl font-black leading-tight tracking-tighter">Initialize <span className="text-indigo-400 italic">Vetting.</span></h2>
                         <p className="text-slate-400 leading-relaxed max-w-md mx-auto lg:mx-0">Complete your network link to begin the 0x99 Vetting Protocol. Expect sub-millisecond data verification.</p>
                         <form onSubmit={startTest} className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                               <input required type="text" placeholder="Full Identity" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 text-sm" onChange={e => setFormData({...formData, name: e.target.value})} />
                               <input required type="email" placeholder="Secure Email" className="bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 text-sm" onChange={e => setFormData({...formData, email: e.target.value})} />
                            </div>
                            <input required type="tel" placeholder="WhatsApp / Phone" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-indigo-500 transition-all placeholder:text-slate-700 text-sm" onChange={e => setFormData({...formData, phone: e.target.value})} />
                            <button type="submit" className="w-full py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-2xl hover:bg-indigo-500 hover:text-white transition-all flex items-center justify-center gap-3 mt-4 text-[10px] sm:text-xs shadow-xl active:scale-95">
                               Initialize Link <ArrowRight size={18} />
                            </button>
                         </form>
                      </div>

                      <div className="hidden lg:block relative h-full">
                         <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur opacity-20" />
                         <div className="relative h-full bg-[#020617] border border-white/10 rounded-3xl overflow-hidden shadow-2xl p-8">
                            <div className="flex gap-2 mb-6">
                                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                                <div className="w-3 h-3 rounded-full bg-green-500/50" />
                            </div>
                            <div className="font-mono text-xs space-y-3 text-slate-500">
                                <p className="text-indigo-400">NETWORK_INIT: OK</p>
                                <p className="text-white">&gt; SECURE_TUNNEL_ESTABLISHED</p>
                                <p>&gt; IP_ORIGIN: 24.11.231.84</p>
                                <p>&gt; LATENCY: 14MS</p>
                                <p className="text-emerald-400 animate-pulse">&gt; WAITING_FOR_USER_INPUT...</p>
                            </div>
                         </div>
                      </div>
                   </div>
                </div>

                {/* NEW SECTION 2: GLOBAL CERTIFICATION NODES */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4">
                    {[
                        { label: "SOC2 Compliance", icon: Lock },
                        { label: "Encrypted Ledger", icon: Database },
                        { label: "Bias-Free Evaluation", icon: ScaleIcon },
                        { label: "Global Payout System", icon: Globe }
                    ].map((item, i) => (
                        <div key={i} className="flex flex-col items-center gap-4 p-6 bg-white/[0.01] border border-white/5 rounded-3xl grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all cursor-default">
                            <item.icon size={28} className="text-indigo-400" />
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{item.label}</span>
                        </div>
                    ))}
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto space-y-12 py-10 px-4">
                
                {/* NEW SECTION 3: LIVE VETTING TERMINAL */}
                <div className="bg-black/60 border border-white/10 rounded-2xl p-6 font-mono text-[10px] sm:text-xs text-slate-500 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 bg-indigo-500/10 text-indigo-400 font-black">LOG: VERIFYING</div>
                    <div className="flex flex-col gap-1">
                        <p className="text-emerald-400">SYNCING_RESPONSES_WITH_NEURAL_ENGINE...</p>
                        <p className="text-blue-400">DETECTING_LOGICAL_HALLUCINATIONS: 0</p>
                        <p className="text-white opacity-40">ENCRYPTION_LAYER: ACTIVE [AES-256]</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-b border-white/10 pb-8 text-center sm:text-left">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-indigo-500/20 rounded-2xl"><Cpu className="text-indigo-400 animate-pulse" /></div>
                    <div>
                      <h2 className="text-xl md:text-2xl font-black uppercase tracking-tighter">Neural Audit Phase</h2>
                      <p className="text-[10px] font-mono text-slate-500">SUBJECT_ID: {formData.name.toUpperCase().substring(0, 10)}...</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 font-mono text-[9px] sm:text-[10px] text-indigo-400 uppercase tracking-widest animate-pulse">
                    Biometric Pulse: Nominal
                  </div>
                </div>

                <div className="space-y-12">
                  {QUESTIONS.map((q, i) => (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }} key={q.id} className="space-y-6">
                      <div className="flex items-start gap-4">
                        <span className="text-indigo-500 font-black text-2xl">0{i + 1}</span>
                        <h3 className="text-xl md:text-2xl font-bold leading-tight tracking-tight text-white">{q.q}</h3>
                      </div>
                      <textarea 
                        className="w-full bg-white/[0.03] border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-10 min-h-[220px] outline-none focus:border-indigo-500 focus:bg-white/[0.05] transition-all text-slate-300 text-base md:text-lg leading-relaxed shadow-3xl resize-none"
                        placeholder="Synthesize your architectural explanation..."
                        onChange={e => setAnswers({...answers, [q.id]: e.target.value})}
                      />
                    </motion.div>
                  ))}
                  
                  <button 
                    disabled={isEvaluating}
                    onClick={submitTest}
                    className="w-full py-8 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-black uppercase tracking-[0.3em] rounded-[2rem] flex items-center justify-center gap-4 transition-all shadow-3xl disabled:opacity-50 text-xs sm:text-sm active:scale-[0.98]"
                  >
                    {isEvaluating ? <><Loader2 className="animate-spin" /> Vetting Logic Matrix...</> : <>Transmit to Core <Sparkles size={20} /></>}
                  </button>
                </div>
              </motion.div>
            )}

            {step === 3 && result && (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-12 max-w-4xl mx-auto py-10 px-4">
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-indigo-500/20 blur-[120px] rounded-full" />
                  <div className="relative w-56 h-56 md:w-64 md:h-64 rounded-full border-8 border-indigo-500/10 flex items-center justify-center backdrop-blur-xl bg-indigo-500/5">
                    <div className="flex flex-col">
                       <div className="text-7xl md:text-8xl font-black tracking-tighter leading-none">{result.score}</div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 mt-2">Neural Grade</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white leading-none">Vetting <br className="sm:hidden"/><span className="text-emerald-400">Certified.</span></h2>
                  <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-12 text-left relative overflow-hidden shadow-3xl">
                    <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none"><ShieldCheck size={200} /></div>
                    <div className="flex items-center gap-3 mb-6">
                        <MessageSquare className="text-indigo-500" size={24} />
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500">Validation Summary</h4>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-lg md:text-2xl font-medium italic">"{result.summary}"</p>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                    <button onClick={() => window.location.href = '/freelancex/login'} className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-200 transition-all group">
                      Open Console <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <div className="flex items-center justify-center gap-3 px-10 py-5 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 font-black text-[10px] uppercase tracking-widest">
                       <ShieldCheck size={18}/> Global Identity Active
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </main>

      <Footer />
      
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}

// Helper Components
function ScaleIcon({ size, className }: { size?: number, className?: string }) {
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
            <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
        </svg>
    );
}
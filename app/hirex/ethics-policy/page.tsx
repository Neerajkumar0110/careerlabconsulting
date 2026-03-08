// app/hirex/ethics-policy/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import { 
  Scale, HeartHandshake, Eye, UserCheck, 
  ShieldAlert, MessageSquare, Gavel, 
  CheckCircle2, X, Send, ArrowRight,
  BrainCircuit, AlertCircle, ScanFace,
  History, ShieldCheck, Globe, Zap, FileText,
  UserX, Search, Lock
} from 'lucide-react';

const ADMIN_WHATSAPP = "918700236923";

const ETHICS_PILLARS = [
  {
    title: "Zero-Bias Architecture",
    desc: "Our engine strips all demographic identifiers before evaluation. Candidates are scored purely on logic, code quality, and system design.",
    icon: Scale,
    color: "text-sky-400",
    bg: "bg-sky-500/10",
    border: "border-sky-500/30"
  },
  {
    title: "Explainable AI (XAI)",
    desc: "We do not believe in 'black box' hiring. Every technical score is accompanied by a transparent, human-readable breakdown of reasoning.",
    icon: Eye,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30"
  },
  {
    title: "Human-in-the-Loop",
    desc: "HireX acts as a screener, but final hiring ALWAYS rests with a human. We augment HR teams; we do not replace human judgment.",
    icon: UserCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30"
  },
  {
    title: "Continuous Auditing",
    desc: "Our neural networks undergo rigorous third-party audits to detect and mitigate any emerging biases in evaluation matrices.",
    icon: ShieldAlert,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30"
  }
];

export default function EthicsPolicyPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', category: 'Algorithm Bias Concern', message: '' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*HireX AI Ethics Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Category:* ${formData.category}%0A*Message:* ${formData.message}%0A%0A_Requesting ethics board review._`;
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  const handleDocumentationRedirect = () => {
    window.location.href = "/hirex/documentation";
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-sky-500/30 font-sans">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[500px] md:w-[900px] h-[500px] bg-sky-600/10 blur-[150px] rounded-full -translate-x-1/4" />
        <div className="absolute bottom-0 right-0 w-[400px] md:w-[700px] h-[400px] bg-violet-600/10 blur-[120px] rounded-full translate-x-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-28 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(14,165,233,0.2)]">
              <HeartHandshake className="w-3.5 h-3.5 md:w-4 md:h-4" /> Responsible AI Deployment
            </div>
            <h1 className="text-4xl md:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight">
              Democratizing Opportunity
            </h1>
            <p className="text-base md:text-[14px] text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Technology should elevate potential, not automate inequality. Read our core manifesto on how we ensure fairness, transparency, and human dignity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-sky-600 hover:bg-sky-500 text-[#020617] font-black rounded-xl transition-all shadow-[0_0_20px_rgba(14,165,233,0.4)] flex items-center justify-center gap-2"
              >
                Report Algorithm Bias <ShieldAlert className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* SECTION 2: AI Fairness Metrics (NEW) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32 text-center">
            {[
              { label: "Identity Blind", value: "100%", icon: UserX, color: "text-sky-400" },
              { label: "Pedigree Bias", value: "Zero", icon: Search, color: "text-violet-400" },
              { label: "Score Disputes", value: "< 0.1%", icon: Gavel, color: "text-emerald-400" },
              { label: "Data Safety", value: "E2EE", icon: Lock, color: "text-cyan-400" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[2rem] hover:border-sky-500/30 transition-all shadow-xl">
                <stat.icon className={`w-6 h-6 md:w-8 md:h-8 ${stat.color} mb-4 mx-auto`} />
                <h3 className="text-2xl md:text-4xl font-black text-white mb-1">{stat.value}</h3>
                <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* SECTION 3: The 4 Ethics Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20 md:mb-32">
            {ETHICS_PILLARS.map((pillar, idx) => (
              <div key={idx} className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 hover:bg-slate-900/70 transition-all group overflow-hidden relative shadow-2xl">
                <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${pillar.bg} blur-3xl rounded-full opacity-40 group-hover:opacity-100 transition-opacity`} />
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${pillar.bg} border ${pillar.border} flex items-center justify-center mb-6 relative z-10 shadow-lg`}>
                  <pillar.icon className={`w-6 h-6 md:w-7 md:h-7 ${pillar.color}`} />
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 relative z-10">{pillar.title}</h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed relative z-10">{pillar.desc}</p>
              </div>
            ))}
          </div>

          {/* SECTION 4: Explainable Architecture (Split View) */}
          <div className="bg-[#0b0f1f]/80 backdrop-blur-2xl border border-sky-500/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 mb-20 md:mb-32 shadow-[0_0_50px_rgba(14,165,233,0.1)] overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">XAI: Explainable <br/>Intelligence</h2>
                <p className="text-slate-400 leading-relaxed mb-8 text-base md:text-lg">
                  Every decision HireX makes is accompanied by a technical transcript. We visualize the exact logical operators and system design choices that led to a score.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "Transparency Reports", desc: "Available for both candidates and employers for every session.", icon: FileText },
                    { title: "Sovereign Logic", desc: "Our models are strictly confined to technical documentation, preventing social drift.", icon: BrainCircuit },
                    { title: "Auditability", desc: "External researchers can request access to our non-identifiable datasets.", icon: History }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 mt-1 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-sky-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-base">{item.title}</h4>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative group flex items-center justify-center">
                <div className="absolute -inset-1 bg-gradient-to-r from-sky-500 to-violet-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center">
                  {/* Premium Abstract Visual instead of map */}
                  <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=1965&auto=format&fit=crop')] bg-cover opacity-40 grayscale group-hover:grayscale-0 transition-all duration-700" />
                  <div className="relative z-10 text-center">
                    <ShieldCheck className="w-16 h-16 text-sky-400 mx-auto mb-4 animate-pulse" />
                    <span className="bg-sky-500/10 border border-sky-500/30 px-6 py-2 rounded-full text-sky-300 font-mono text-xs tracking-widest shadow-xl uppercase">Ethics_Guard_Active</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: Trust Standards & Global Compliance */}
          <div className="text-center mb-20 md:mb-32">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-10">Aligned with Global Integrity Frameworks</p>
            <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="flex flex-col items-center gap-3">
                 <Globe className="w-10 h-10 text-white" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest">IEEE 7000</span>
               </div>
               <div className="flex flex-col items-center gap-3">
                 <ShieldCheck className="w-10 h-10 text-white" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest">EU AI Act</span>
               </div>
               <div className="flex flex-col items-center gap-3">
                 <HeartHandshake className="w-10 h-10 text-white" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest">Trustworthy AI</span>
               </div>
               <div className="flex flex-col items-center gap-3">
                 <FileText className="w-10 h-10 text-white" />
                 <span className="text-[10px] font-bold text-white uppercase tracking-widest">ISO 42001</span>
               </div>
            </div>
          </div>

          {/* SECTION 6: Bespoke Ethics Audit CTA */}
          <div className="max-w-5xl mx-auto p-8 md:p-14 rounded-[2rem] md:rounded-[3.5rem] bg-gradient-to-br from-slate-900 to-[#0b0f1f] border border-sky-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">Request an <br className="hidden sm:block"/> Independent Audit</h2>
              <p className="text-sky-100 text-sm md:text-lg leading-relaxed mb-4">
                We believe in total accountability. Corporate partners and ethics researchers can request a deep-dive audit into our fairness methodology.
              </p>
              <button 
                onClick={handleDocumentationRedirect}
                className="text-sky-400 font-bold text-sm flex items-center gap-1 hover:text-sky-300 transition-colors"
              >
                View Transparency Documentation <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 w-full md:w-auto px-10 py-5 bg-white hover:bg-sky-400 text-[#020617] font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(14,165,233,0.3)] flex items-center justify-center gap-3 group"
            >
              Contact Ethics Board <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-sky-500/30 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(14,165,233,0.2)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10 shadow-lg">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-sky-500/20 blur-3xl rounded-full" />
              
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 bg-sky-500/10 text-sky-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-sky-500/20 shadow-xl">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">AI Ethics Board</h3>
                <p className="text-slate-400 text-sm mt-1">Submit your concern securely</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    required type="text" placeholder="Your Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-sky-500 outline-none w-full placeholder:text-slate-600 transition-all"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    required type="email" placeholder="Your Email"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-sky-500 outline-none w-full placeholder:text-slate-600 transition-all"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <select 
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:border-sky-500 outline-none w-full appearance-none transition-all cursor-pointer"
                  value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}
                >
                  <option value="Algorithm Bias Concern" className="bg-slate-900 text-white">Algorithm Bias Concern</option>
                  <option value="Research & Audit Request" className="bg-slate-900 text-white">Research & Audit Request</option>
                  <option value="Candidate Score Dispute" className="bg-slate-900 text-white">Candidate Score Dispute</option>
                </select>

                <textarea 
                  required placeholder="Please provide technical details or specific event context..."
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-sky-500 outline-none w-full resize-none placeholder:text-slate-600 h-32"
                  value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                />
                
                <button 
                  type="submit"
                  className="w-full bg-sky-600 hover:bg-sky-500 text-[#020617] font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 mt-6"
                >
                  Confirm & Send Request <Send className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-6 border-t border-white/5 pt-4 leading-relaxed">
                  SECURE_LINE: DPO_OFFICE (+91 870023 6923)
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
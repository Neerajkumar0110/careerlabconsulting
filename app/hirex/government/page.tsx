// app/hirex/government/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  Landmark, ShieldCheck, Scale, Server, 
  Users, ArrowRight, CheckCircle2, X, 
  Building, Send, Lock, FileText, 
  Network, Database, Globe, Fingerprint, Shield
} from 'lucide-react';

const GOVERNMENT_FEATURES = [
  {
    title: "Air-Gapped & Sovereign Deployments",
    desc: "Host the HireX autonomous AI engine entirely on your sovereign government cloud or on-premise servers. Zero data leaves your national borders.",
    icon: Server,
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "border-indigo-500/30",
    colSpan: "lg:col-span-2"
  },
  {
    title: "Zero-Bias Architecture",
    desc: "Ensure absolute fairness in public hiring. Our AI evaluates pure technical logic, entirely blind to demographic identifiers.",
    icon: Scale,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30",
    colSpan: "lg:col-span-1"
  },
  {
    title: "FOIA/RTI Compliant Ledgers",
    desc: "Every AI decision is logged onto an immutable Neural Ledger, providing perfect auditable transparency for public record requests.",
    icon: FileText,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    colSpan: "lg:col-span-1"
  },
  {
    title: "National-Scale Concurrency",
    desc: "Process millions of citizen applications simultaneously without server crashes. Replace leaky paper-based exams with secure digital proctoring.",
    icon: Users,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    colSpan: "lg:col-span-2"
  }
];

export default function GovernmentPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', agency: '', role: '' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "918700236923";
    const message = `*HireX Public Sector Inquiry*%0A%0A*Name:* ${formData.name}%0A*Official Email:* ${formData.email}%0A*Agency/Department:* ${formData.agency}%0A*Designation:* ${formData.role}%0A%0A_We are requesting a secure architecture review for government deployment._`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', agency: '', role: '' });
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-indigo-500/30 font-sans">
      
      {/* Authoritative Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[900px] h-[500px] md:h-[800px] bg-indigo-600/10 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-slate-600/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
              <Landmark className="w-3.5 h-3.5 md:w-4 md:h-4" /> Public Sector & Defense
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Sovereign AI for <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-cyan-400">Public Service</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Modernize national mass-hiring infrastructure. Execute zero-bias, cryptographically secure technical assessments at citizen-scale without compromising state data sovereignty.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] flex items-center justify-center gap-2"
              >
                Request Architecture Review <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Defense & State Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
            {[
              { label: "Data Residency", value: "100% Local", icon: Database },
              { label: "Concurrency", value: "1M+ Citizens", icon: Network },
              { label: "Evaluation Bias", value: "Eliminated", icon: Scale },
              { label: "Security Standard", value: "Military-Grade", icon: ShieldCheck }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center flex flex-col items-center hover:border-indigo-500/30 transition-colors">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-indigo-400 mb-4" />
                <h3 className="text-2xl md:text-4xl font-black text-white mb-1">{stat.value}</h3>
                <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bento Grid Features for Government */}
          <div className="mb-20 md:mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Infrastructure Built for the State</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">From central defense agencies to state-level public service commissions, HireX provides an uncompromisable layer of trust and efficiency.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {GOVERNMENT_FEATURES.map((feat, idx) => (
                <div key={idx} className={`${feat.colSpan} bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 hover:border-white/20 transition-all duration-300 group overflow-hidden relative shadow-2xl`}>
                  <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${feat.bg} blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${feat.bg} border ${feat.border} flex items-center justify-center mb-6 relative z-10 shadow-lg`}>
                    <feat.icon className={`w-6 h-6 md:w-7 md:h-7 ${feat.color}`} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 relative z-10">{feat.title}</h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed relative z-10 max-w-md">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Extreme Security / Anti-Cheat Section (FIXED IMAGE) */}
          <div className="bg-[#0b0f1f]/80 backdrop-blur-2xl border border-indigo-500/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 mb-20 md:mb-32 shadow-[0_0_50px_rgba(99,102,241,0.1)] overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Eradicate Examination Fraud</h2>
                <p className="text-slate-400 leading-relaxed mb-8 text-base md:text-lg">
                  Paper leaks and proxy candidates plague traditional public exams. HireX deploys military-grade digital countermeasures to ensure absolute assessment integrity.
                </p>
                <div className="space-y-4">
                  {[
                    "Biometric Identity Verification",
                    "Real-time Browser Lockdown & Tab-tracking",
                    "Dynamic, Non-Repeating Assessment Matrices",
                    "AI-driven keystroke & logic anomaly detection"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-indigo-400" />
                      </div>
                      <span className="text-sm md:text-base text-slate-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* PREMIUM TECH IMAGE REPLACING BROKEN COMPONENT */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-cyan-500 rounded-[2rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative aspect-video lg:aspect-square bg-slate-900 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Cyber Security Defense"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                  
                  {/* Status Overlay */}
                  <div className="relative z-10 text-center">
                    <div className="w-20 h-20 bg-indigo-500/20 backdrop-blur-md rounded-full border border-indigo-500/50 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(99,102,241,0.4)] animate-pulse">
                      <Lock className="w-10 h-10 text-indigo-400" />
                    </div>
                    <div className="bg-indigo-500/10 border border-indigo-500/30 px-6 py-2.5 rounded-full text-indigo-300 font-mono text-xs md:text-sm tracking-[0.2em] shadow-lg">
                      SYSTEM SECURED
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FINAL CTA SECTION */}
          <div className="max-w-5xl mx-auto p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-indigo-700 to-slate-900 border border-indigo-500/20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Protect National Interests</h2>
              <p className="text-indigo-100 text-sm md:text-lg leading-relaxed">
                Connect with our cleared technical architects to discuss air-gapped sovereign deployments and high-security compliance protocols.
              </p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 w-full md:w-auto px-8 py-4 bg-white text-indigo-900 font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2 group"
            >
              Initiate Secure Comms 
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      {/* GOVERNMENT SALES MODAL (WhatsApp Integration) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-indigo-500/30 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(99,102,241,0.2)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10 shadow-lg">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-indigo-500/20 blur-3xl rounded-full" />
              
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 bg-indigo-500/10 text-indigo-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-indigo-500/20 shadow-xl">
                  <Landmark className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Secure Inquiry Portal</h3>
                <p className="text-slate-400 text-sm mt-1">Authorized access only. Routed to public sector team.</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="relative">
                  <input 
                    required type="text" placeholder="Official Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-indigo-500 outline-none w-full placeholder:text-slate-600 transition-all"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <input 
                    required type="email" placeholder="Gov/Mil Email Address"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-indigo-500 outline-none w-full placeholder:text-slate-600 transition-all"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Building className="absolute left-4 top-4 w-4 h-4 text-slate-600" />
                  <input 
                    required type="text" placeholder="Agency / Department Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white focus:border-indigo-500 outline-none w-full placeholder:text-slate-600 transition-all"
                    value={formData.agency} onChange={e => setFormData({...formData, agency: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <input 
                    required type="text" placeholder="Your Designation/Rank"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-indigo-500 outline-none w-full placeholder:text-slate-600 transition-all"
                    value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/40 mt-6 active:scale-95"
                >
                  Send Encrypted Request <Send className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-6 border-t border-white/5 pt-4">
                  Secure Link: +91 870023 6923
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
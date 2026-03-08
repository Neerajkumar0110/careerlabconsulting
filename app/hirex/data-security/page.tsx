// app/hirex/data-security/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  ShieldCheck, Lock, Key, Database, 
  Server, Fingerprint, EyeOff, FileCode2,
  CheckCircle2, X, Send, ArrowRight, Shield,
  Activity, Network, Globe, LockKeyhole
} from 'lucide-react';

const ADMIN_WHATSAPP = "918700236923";

const SECURITY_PILLARS = [
  {
    title: "Zero-Trust Architecture",
    desc: "Every request, whether from an internal microservice or an external ATS API, is explicitly authenticated and authorized.",
    icon: EyeOff,
    colSpan: "lg:col-span-2",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30"
  },
  {
    title: "AES-256 Encryption",
    desc: "All candidate PII, codebase logs, and AI neural hashes are encrypted at rest and in transit.",
    icon: Key,
    colSpan: "lg:col-span-1",
    color: "text-teal-400",
    bg: "bg-teal-500/10",
    border: "border-teal-500/30"
  },
  {
    title: "Data Residency",
    desc: "Deploy localized TiDB instances to ensure data never leaves your sovereign borders (EU, US, IND).",
    icon: Database,
    colSpan: "lg:col-span-1",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30"
  },
  {
    title: "Automated Threat Defense",
    desc: "The Gemini AI engine continuously monitors session logs for IP anomalies, mirroring, and DDOS patterns.",
    icon: Shield,
    colSpan: "lg:col-span-2",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30"
  }
];

export default function DataSecurityPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', requirement: 'Request Security Whitepaper' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*HireX Security Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Company:* ${formData.company}%0A*Request:* ${formData.requirement}%0A%0A_Requesting compliance review._`;
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-emerald-500/30 font-sans">
      
      {/* Dynamic Crypto-Backdrop */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[900px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[700px] h-[400px] bg-teal-600/10 blur-[120px] rounded-full -translate-x-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* SECTION 1: Authoritative Hero */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" /> Enterprise-Grade Protocols
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Uncompromisable <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Data Defense</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Built for high-stakes hiring. We treat your corporate technical matrices and candidate PII as sovereign assets, protected by cryptographic neural logging.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 group"
              >
                Access Compliance Vault <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* SECTION 2: Live Security Telemetry */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
            {[
              { label: "Threats Mitigated", value: "24.1k+", icon: Shield, color: "text-emerald-400" },
              { label: "Encryption Uptime", value: "100%", icon: Activity, color: "text-teal-400" },
              { label: "Neural Audit Trail", value: "Immutable", icon: Fingerprint, color: "text-cyan-400" },
              { label: "Global Compliance", value: "Certified", icon: Globe, color: "text-blue-400" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center flex flex-col items-center hover:border-emerald-500/30 transition-all duration-300">
                <stat.icon className={`w-6 h-6 md:w-8 md:h-8 mb-4 ${stat.color}`} />
                <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</h3>
                <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* SECTION 3: The Cyber Bento Grid */}
          <div className="mb-20 md:mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Advanced Protection Matrix</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Enterprise infrastructure engineered for absolute data integrity across every layer.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {SECURITY_PILLARS.map((feat, idx) => (
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

          {/* SECTION 4: Cryptographic Proof (Split Section) */}
          <div className="bg-[#0b0f1f]/80 backdrop-blur-2xl border border-emerald-500/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 mb-20 md:mb-32 shadow-[0_0_50px_rgba(16,185,129,0.1)] overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center">
                  <img 
                    src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                    alt="Cyber Network Infrastructure"
                    className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
                  />
                  <div className="relative z-10 text-center">
                    <LockKeyhole className="w-16 h-16 text-emerald-400 mx-auto mb-4 animate-pulse" />
                    <span className="bg-emerald-500/10 border border-emerald-500/30 px-6 py-2 rounded-full text-emerald-300 font-mono text-xs tracking-widest">INFRA_SECURED</span>
                  </div>
                </div>
              </div>
              
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">Data Residency <br/> & Sovereignty</h2>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                  HireX leverages localized TiDB serverless clusters to guarantee that sensitive hiring data never leaves your preferred jurisdiction.
                </p>
                <div className="space-y-4">
                  {[
                    "Sovereign Cloud Deployment (EU, US, Asia)",
                    "PII Data Anonymization on Ingestion",
                    "Automated Right-to-be-Forgotten Execution",
                    "Dedicated Security Isolated Environments"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <span className="text-sm md:text-base text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: Trust Badge & Contact Hub */}
          <div className="max-w-5xl mx-auto p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-slate-900 via-[#0b0f1f] to-emerald-950/20 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Validate Our Security.</h2>
              <p className="text-emerald-100 text-sm md:text-lg">
                Request access to our latest SOC2 Type II reports, penetration testing summaries, and architectural deep-dives.
              </p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 w-full md:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black rounded-2xl hover:scale-105 transition-all shadow-[0_10px_40px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 group"
            >
              Contact Security Lead <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

        </div>
      </div>

      <Footer />

      {/* WHATSAPP MODAL POPUP */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-emerald-500/30 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
              
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20 shadow-xl">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Enterprise InfoSec Portal</h3>
                <p className="text-slate-400 text-sm mt-1">Direct encrypted link to our compliance team.</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    required type="text" placeholder="Full Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-emerald-500 outline-none w-full transition-all"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    required type="email" placeholder="Official Email"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-emerald-500 outline-none w-full transition-all"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Server className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                  <input 
                    required type="text" placeholder="Organization Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white focus:border-emerald-500 outline-none w-full transition-all"
                    value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <select 
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:border-emerald-500 outline-none w-full appearance-none transition-all"
                  value={formData.requirement} onChange={e => setFormData({...formData, requirement: e.target.value})}
                >
                  <option value="Request Security Whitepaper" className="bg-slate-900">Request Security Whitepaper</option>
                  <option value="SOC2 / ISO Certifications" className="bg-slate-900">Request SOC2 / ISO Certifications</option>
                  <option value="Penetration Test Reports" className="bg-slate-900">Penetration Test Reports</option>
                </select>
                
                <button 
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95"
                >
                  Confirm Request & Connect <Send className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-6 border-t border-white/5 pt-4">
                  Secured Transmission: +91 870023 6923
                </p>
              </form>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
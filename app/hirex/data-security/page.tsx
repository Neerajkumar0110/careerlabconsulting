// app/hirex/data-security/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  ShieldCheck, Lock, Key, Database, 
  Server, Fingerprint, EyeOff, FileCode2,
  CheckCircle2, X, Send, ArrowRight, Shield,
  Activity, Network
} from 'lucide-react';

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
    title: "Automated Threat Neutralization",
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
    const phoneNumber = "918700236923";
    const message = `*HireX Security & Compliance Inquiry*%0A%0A*Name:* ${formData.name}%0A*Official Email:* ${formData.email}%0A*Company:* ${formData.company}%0A*Request:* ${formData.requirement}%0A%0A_Please connect me with your compliance engineering team._`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', company: '', requirement: 'Request Security Whitepaper' });
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-emerald-500/30 font-sans">
      
      {/* Cryptographic Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[900px] h-[500px] md:h-[900px] bg-emerald-600/10 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-teal-600/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
              <ShieldCheck className="w-3.5 h-3.5 md:w-4 md:h-4" /> Enterprise Data Protection
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Uncompromisable <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Security</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              HireX treats candidate data and corporate technical matrices as highly classified assets. Built on a zero-trust foundation with cryptographic neural logging.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(16,185,129,0.4)] flex items-center justify-center gap-2"
              >
                Review Compliance Docs <FileCode2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Real-time Security Telemetry */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
            {[
              { label: "Threats Blocked Today", value: "1,402", icon: Shield },
              { label: "System Uptime", value: "100%", icon: Activity },
              { label: "Encryption Standard", value: "AES-256", icon: Fingerprint },
              { label: "Compliance Audits", value: "Continuous", icon: Network }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center flex flex-col items-center hover:border-emerald-500/30 transition-colors">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-emerald-400 mb-4" />
                <h3 className="text-2xl md:text-4xl font-black text-white mb-1">{stat.value}</h3>
                <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bento Grid: Security Features */}
          <div className="mb-20 md:mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Fort Knox of Hiring Tech</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">We've engineered out every vulnerability. From application layers to distributed databases, your data is locked down.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {SECURITY_PILLARS.map((feat, idx) => (
                <div key={idx} className={`${feat.colSpan} bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 hover:border-white/20 transition-all duration-300 group overflow-hidden relative`}>
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

          {/* Compliance Checklist Matrix */}
          <div className="bg-[#0b0f1f]/80 backdrop-blur-2xl border border-emerald-500/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 mb-20 md:mb-32 shadow-[0_0_50px_rgba(16,185,129,0.1)]">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1 relative aspect-square md:aspect-auto md:h-[400px] flex items-center justify-center bg-black/40 border border-white/5 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="relative z-10 text-center">
                  <Lock className="w-16 h-16 text-emerald-400 mx-auto mb-6" />
                  <div className="bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 rounded-full text-emerald-300 font-mono text-sm tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" /> COMPLIANCE_VERIFIED
                  </div>
                </div>
                {/* Simulated Radar Rings */}
                <div className="absolute w-[200px] h-[200px] border border-emerald-500/20 rounded-full animate-ping" style={{ animationDuration: '3s' }} />
                <div className="absolute w-[350px] h-[350px] border border-teal-500/10 rounded-full" />
              </div>
              
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl md:text-5xl font-black mb-6">Global Regulatory Standards</h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  HireX is engineered to automatically comply with global tech and privacy regulations out of the box. No manual configuration required.
                </p>
                <div className="space-y-6">
                  {[
                    { label: "SOC 2 Type II", desc: "Rigorous annual audits for security, availability, and confidentiality." },
                    { label: "GDPR & CCPA", desc: "Strict adherence to data subject rights and automated erasure protocols." },
                    { label: "ISO/IEC 27001", desc: "Certified information security management system (ISMS)." },
                    { label: "PII Auto-Redaction", desc: "Gemini AI instantly strips personal identifiers from code submissions." }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 mt-1 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-white font-bold">{item.label}</h4>
                        <p className="text-sm text-slate-400">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="max-w-5xl mx-auto p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-emerald-800 to-slate-900 border border-emerald-500/20 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            <div className="absolute -right-20 -top-20 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-3xl font-black text-white mb-4">Validate our infrastructure.</h2>
              <p className="text-emerald-100 text-sm md:text-lg">
                Connect with our InfoSec team to review penetration testing reports, compliance certificates, and architecture whitepapers.
              </p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 w-full md:w-auto px-8 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2"
            >
              Contact CISO Team <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* SECURITY SALES MODAL (WhatsApp Integration) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-emerald-500/30 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full" />
              
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Security & Compliance Hub</h3>
                <p className="text-slate-400 text-sm mt-1">Direct encrypted line to InfoSec</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input 
                      required type="text" placeholder="Full Name / Title"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none w-full"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      required type="email" placeholder="Corporate Email"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none w-full"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <Server className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                  <input 
                    required type="text" placeholder="Organization Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm focus:border-emerald-500 outline-none w-full"
                    value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>

                <div className="relative">
                  <select 
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:border-emerald-500 outline-none w-full appearance-none"
                    value={formData.requirement} onChange={e => setFormData({...formData, requirement: e.target.value})}
                  >
                    <option value="Request Security Whitepaper" className="bg-slate-900">Request Security Whitepaper</option>
                    <option value="SOC2 / ISO Certifications" className="bg-slate-900">Request SOC2 / ISO Certifications</option>
                    <option value="Penetration Test Reports" className="bg-slate-900">Penetration Test Reports</option>
                    <option value="Custom Data Residency Demo" className="bg-slate-900">Custom Data Residency Demo</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/40 mt-6"
                >
                  Request Secure Access <Send className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-4">Transmitting to: +91 870023 6923</p>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
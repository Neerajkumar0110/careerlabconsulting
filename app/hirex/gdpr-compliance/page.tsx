// app/hirex/gdpr-compliance/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import { 
  ShieldCheck, UserCheck, Database, FileKey, 
  Trash2, RefreshCw, FileSearch, Globe, 
  CheckCircle2, X, Send, ArrowRight, 
  Scale, Fingerprint, Lock, EyeOff, ShieldAlert,
  FileText, History, ClipboardCheck
} from 'lucide-react';

const ADMIN_WHATSAPP = "918700236923";

const CANDIDATE_RIGHTS = [
  {
    title: "Right to Erasure",
    desc: "Candidates can request complete deletion of their profile, Neural Ledger, and AI interview transcripts at any time.",
    icon: Trash2,
    color: "text-red-400",
    bg: "bg-red-500/10",
    border: "border-red-500/30"
  },
  {
    title: "Data Portability",
    desc: "Users can export their complete AI assessment scores and technical matrices in machine-readable JSON or PDF formats.",
    icon: FileKey,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30"
  },
  {
    title: "Right to Access",
    desc: "Total transparency. Candidates can view the exact logic and criteria the AI engine used to calculate their scores.",
    icon: FileSearch,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30"
  },
  {
    title: "Right to Rectification",
    desc: "Easily update or correct profile information, GitHub links, and work history before or after an AI evaluation.",
    icon: RefreshCw,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/30"
  }
];

export default function GDPRCompliancePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Candidate / User', requestType: 'Data Export Request' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*HireX Privacy/GDPR Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Role:* ${formData.role}%0A*Request Type:* ${formData.requestType}%0A%0A_Requesting formal data handling review._`;
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${message}`, '_blank');
    setIsModalOpen(false);
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-cyan-500/30 font-sans">
      
      {/* Privacy/Trust Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[900px] h-[500px] md:h-[900px] bg-cyan-600/10 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-blue-600/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-20" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* SECTION 1: Authoritative Header */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <Scale className="w-3.5 h-3.5 md:w-4 md:h-4" /> EU Privacy Standards
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Privacy by <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Default Design</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              HireX autonomous hiring infrastructure complies fully with the GDPR, giving candidates absolute control over their digital footprint and technical identity.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-[#020617] font-black rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 group"
              >
                Submit Privacy Request <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* SECTION 2: Key Privacy Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
            {[
              { label: "Data Residency", value: "EU & IND", icon: Globe },
              { label: "Right to Erasure", value: "Instant", icon: History },
              { label: "Consent Logic", value: "Active", icon: UserCheck },
              { label: "Data Audits", value: "Monthly", icon: ClipboardCheck }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center flex flex-col items-center hover:border-cyan-500/30 transition-all duration-300 shadow-xl">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mb-4" />
                <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{stat.value}</h3>
                <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* SECTION 3: Candidate Rights Grid */}
          <div className="mb-20 md:mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Candidate Empowerment</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Automated tools to exercise your legal data rights without manual HR intervention.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CANDIDATE_RIGHTS.map((right, idx) => (
                <div key={idx} className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 hover:border-white/20 transition-all duration-300 group overflow-hidden relative shadow-2xl">
                  <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${right.bg} blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl ${right.bg} border ${right.border} flex items-center justify-center shrink-0 shadow-lg`}>
                      <right.icon className={`w-7 h-7 ${right.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{right.title}</h3>
                      <p className="text-slate-400 text-sm md:text-base leading-relaxed">{right.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#0b0f1f]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 mb-20 md:mb-32 shadow-[0_0_50px_rgba(34,211,238,0.1)] overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-black mb-6 leading-tight text-white">How We Process Your Data</h2>
                <p className="text-slate-400 leading-relaxed mb-8 text-base md:text-[14px]">
                  HireX utilizes a non-identifiable ingestion layer. When you submit code or take an AI assessment, your PII is separated from your technical output.
                </p>
                <div className="space-y-6">
                  {[
                    { title: "Redaction Layer", desc: "Automated stripping of names and locations from technical code reviews.", icon: EyeOff },
                    { title: "Neural Ledger Storage", desc: "Technical scores are cryptographically hashed on a decentralized TiDB cluster.", icon: Fingerprint },
                    { title: "Localized Shredding", desc: "Instant data deletion across all backup nodes upon candidate request.", icon: Trash2 }
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-8 h-8 mt-1 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                        <item.icon className="w-4 h-4 text-cyan-400" />
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
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                <div className="relative aspect-video w-full rounded-3xl overflow-hidden border border-white/10 bg-slate-900 flex items-center justify-center">
                  <img 
                    src="https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041839.jpg?t=st=1772971610~exp=1772975210~hmac=df6b1e031576414c6bf151631b49ed52eae31f9c1188271c55acc1dbad016ea5&w=1480" 
                    alt="GDPR Privacy Shield"
                    className="absolute w-full h-full object-cover transition-all duration-700"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5: Social Proof & Compliance Badges */}
          <div className="text-center mb-20 md:mb-32">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-[0.2em] mb-10">Compliance & Security Standards</p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
               <div className="flex flex-col items-center gap-2">
                 <Lock className="w-8 h-8 text-white" />
                 <span className="text-[10px] font-bold text-white uppercase">SOC 2 Type II</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <ShieldAlert className="w-8 h-8 text-white" />
                 <span className="text-[10px] font-bold text-white uppercase">GDPR Ready</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <FileText className="w-8 h-8 text-white" />
                 <span className="text-[10px] font-bold text-white uppercase">ISO 27001</span>
               </div>
               <div className="flex flex-col items-center gap-2">
                 <Globe className="w-8 h-8 text-white" />
                 <span className="text-[10px] font-bold text-white uppercase">CCPA Compliant</span>
               </div>
            </div>
          </div>

          {/* DPO Call to Action Banner */}
          <div className="max-w-5xl mx-auto p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-slate-900 to-[#0b0f1f] border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4">Exercise Your Privacy.</h2>
              <p className="text-cyan-100 text-sm md:text-lg leading-relaxed">
                Whether you need a full data export or are requesting complete erasure from the Neural Ledger, our DPO is ready to assist.
              </p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 w-full md:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-[#020617] font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(34,211,238,0.3)] flex items-center justify-center gap-2"
            >
              Initialize Privacy Request <Send className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* DPO / PRIVACY REQUEST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-cyan-500/30 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.2)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full" />
              
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyan-500/20 shadow-xl">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Data Protection Office</h3>
                <p className="text-slate-400 text-sm mt-1">Submit your request securely</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input 
                    required type="text" placeholder="Full Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-cyan-500 outline-none w-full placeholder:text-slate-600 transition-all"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                  <input 
                    required type="email" placeholder="Your Email"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white focus:border-cyan-500 outline-none w-full placeholder:text-slate-600 transition-all"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                
                <select 
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:border-cyan-500 outline-none w-full appearance-none transition-all"
                  value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                >
                  <option value="Candidate / User" className="bg-slate-900 text-white">I am a Candidate</option>
                  <option value="Enterprise / Employer" className="bg-slate-900 text-white">I am an Employer</option>
                  <option value="Legal Agent" className="bg-slate-900 text-white">I am a Legal Agent</option>
                </select>

                <select 
                  className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:border-cyan-500 outline-none w-full appearance-none transition-all"
                  value={formData.requestType} onChange={e => setFormData({...formData, requestType: e.target.value})}
                >
                  <option value="Data Export Request" className="bg-slate-900 text-white">Request Data Export (Portability)</option>
                  <option value="Account Deletion Request" className="bg-slate-900 text-white">Request Account Deletion (Erasure)</option>
                  <option value="General Privacy Inquiry" className="bg-slate-900 text-white">General Privacy Inquiry</option>
                </select>
                
                <button 
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-[#020617] font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 mt-6"
                >
                  Submit Secure Request <Send className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-6 border-t border-white/5 pt-4 leading-relaxed">
                  Destination: DPO_OFFICE_IND (+91 870023 6923)
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
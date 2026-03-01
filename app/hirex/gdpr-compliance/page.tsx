// app/hirex/gdpr-compliance/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  ShieldCheck, UserCheck, Database, FileKey, 
  Trash2, RefreshCw, FileSearch, Globe, 
  CheckCircle2, X, Send, ArrowRight, 
  Scale, Fingerprint, Lock
} from 'lucide-react';

const CANDIDATE_RIGHTS = [
  {
    title: "Right to Erasure",
    desc: "Candidates can request complete deletion of their profile, Neural Ledger, and AI interview transcripts at any time with a single click.",
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
    desc: "Total transparency. Candidates can view the exact logic and criteria the Gemini AI engine used to calculate their scores.",
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
  const [formData, setFormData] = useState({ name: '', email: '', role: '', requestType: 'Data Export Request' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "918700236923";
    const message = `*HireX DPO / Privacy Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Role:* ${formData.role}%0A*Request Type:* ${formData.requestType}%0A%0A_Please route this to the Data Protection Officer._`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', role: '', requestType: 'Data Export Request' });
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

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(34,211,238,0.2)]">
              <Scale className="w-3.5 h-3.5 md:w-4 md:h-4" /> EU Privacy Standards
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              GDPR <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">Compliance</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Privacy by design. HireX autonomous hiring infrastructure complies fully with the General Data Protection Regulation, giving candidates total control over their data.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2"
              >
                Contact DPO <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Privacy Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
            {[
              { label: "Data Residency", value: "EU & IND", icon: Globe },
              { label: "Data Retention", value: "Custom", icon: Database },
              { label: "Consent Config", value: "Opt-In", icon: UserCheck },
              { label: "Encryption", value: "E2EE", icon: Lock }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center flex flex-col items-center hover:border-cyan-500/30 transition-colors">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-cyan-400 mb-4" />
                <h3 className="text-2xl md:text-4xl font-black text-white mb-1">{stat.value}</h3>
                <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Candidate Rights Grid */}
          <div className="mb-20 md:mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Empowering Candidate Rights</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">We build tools that make it effortless for candidates to exercise their legal data privacy rights without requiring manual HR intervention.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CANDIDATE_RIGHTS.map((right, idx) => (
                <div key={idx} className="bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 hover:border-white/20 transition-all duration-300 group overflow-hidden relative">
                  <div className={`absolute -right-10 -bottom-10 w-40 h-40 ${right.bg} blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <div className="flex flex-col sm:flex-row items-start gap-6 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl ${right.bg} border ${right.border} flex items-center justify-center shrink-0`}>
                      <right.icon className={`w-7 h-7 ${right.color}`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{right.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{right.desc}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Engineering Privacy Section */}
          <div className="bg-[#0b0f1f]/80 backdrop-blur-2xl border border-cyan-500/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 mb-20 md:mb-32 shadow-[0_0_50px_rgba(34,211,238,0.1)]">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-6">Privacy Engineered into the Core</h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  Compliance isn't just an afterthought. From how we configure the Gemini API to where our TiDB databases live, HireX is architected to protect PII by default.
                </p>
                <ul className="space-y-6">
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center shrink-0">
                      <Fingerprint className="w-4 h-4 text-cyan-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">AI PII Redaction</h4>
                      <p className="text-sm text-slate-400">All code submissions and chat transcripts are stripped of personal identifiers before being processed by the AI engine.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Database className="w-4 h-4 text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Localized Server Clusters</h4>
                      <p className="text-sm text-slate-400">Enterprise clients can opt to restrict all candidate data storage exclusively to EU-based (Frankfurt) server nodes.</p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">Vendor Vetting</h4>
                      <p className="text-sm text-slate-400">Every third-party integration (from ATS webhooks to SMS gateways) is strictly bound by Standard Contractual Clauses (SCCs).</p>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="relative aspect-square md:aspect-auto md:h-[450px] flex items-center justify-center bg-black/40 border border-white/5 rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                <div className="relative z-10 text-center">
                  <ShieldCheck className="w-20 h-20 text-cyan-400 mx-auto mb-6 animate-pulse" />
                  <div className="bg-cyan-500/10 border border-cyan-500/30 px-6 py-3 rounded-full text-cyan-300 font-mono text-sm tracking-widest">
                    GDPR_READY_STATE
                  </div>
                </div>
                {/* Data Flow Circles */}
                <div className="absolute w-[250px] h-[250px] border-2 border-dashed border-cyan-500/20 rounded-full animate-[spin_10s_linear_infinite]" />
                <div className="absolute w-[350px] h-[350px] border border-blue-500/10 rounded-full" />
              </div>
            </div>
          </div>

          {/* DPO Call to Action Banner */}
          <div className="max-w-5xl mx-auto p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-cyan-900 to-[#0b0f1f] border border-cyan-500/30 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-2xl md:text-4xl font-black text-white mb-4">Submit a Privacy Request</h2>
              <p className="text-cyan-100 text-sm md:text-base leading-relaxed">
                Whether you are a candidate requesting data erasure, or an enterprise auditing our DPA, connect directly with our Data Protection Officer.
              </p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 w-full md:w-auto px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(34,211,238,0.2)] flex items-center justify-center gap-2"
            >
              Contact DPO <Scale className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* DPO / PRIVACY REQUEST MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-cyan-500/30 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(34,211,238,0.15)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-cyan-500/20 blur-3xl rounded-full" />
              
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 bg-cyan-500/10 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-cyan-500/20">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Data Protection Office</h3>
                <p className="text-slate-400 text-sm mt-1">Submit your GDPR request directly</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input 
                      required type="text" placeholder="Your Name"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-500 outline-none w-full"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      required type="email" placeholder="Your Email"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-cyan-500 outline-none w-full"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <select 
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:border-cyan-500 outline-none w-full appearance-none"
                    value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}
                  >
                    <option value="Candidate / User" className="bg-slate-900">I am a Candidate</option>
                    <option value="Enterprise / Employer" className="bg-slate-900">I am an Employer</option>
                    <option value="Auditor / Legal" className="bg-slate-900">I am an Auditor / Legal</option>
                  </select>
                </div>

                <div className="relative">
                  <select 
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:border-cyan-500 outline-none w-full appearance-none"
                    value={formData.requestType} onChange={e => setFormData({...formData, requestType: e.target.value})}
                  >
                    <option value="Data Export Request" className="bg-slate-900">Data Export (Portability)</option>
                    <option value="Account Deletion Request" className="bg-slate-900">Account Deletion (Erasure)</option>
                    <option value="Data Processing Agreement (DPA)" className="bg-slate-900">Request DPA Copy</option>
                    <option value="General Privacy Inquiry" className="bg-slate-900">General Privacy Inquiry</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-900/40 mt-6"
                >
                  Submit Privacy Request <Send className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-4">Routed securely to DPO: +91 870023 6923</p>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
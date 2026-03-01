// app/hirex/enterprise/page.tsx

'use client';

import React, { Activity, useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  Building2, ShieldCheck, Zap, Globe, 
  Cpu, Lock, Server, Users, ArrowRight, 
  CheckCircle2, X, Briefcase, Mail, Send,
  BarChart4, Layers, Fingerprint
} from 'lucide-react';

const ENTERPRISE_FEATURES = [
  {
    title: "Dedicated Neural Clusters",
    desc: "Deploy private instances of our Gemini 2.5 Flash engine trained exclusively on your company's proprietary tech stack and coding guidelines.",
    icon: Cpu,
    colSpan: "lg:col-span-2",
    bg: "bg-blue-500/10",
    color: "text-blue-400",
    border: "border-blue-500/30"
  },
  {
    title: "SAML SSO & RBAC",
    desc: "Enterprise-grade access control with Okta, Azure AD, and custom SAML integrations.",
    icon: Lock,
    colSpan: "lg:col-span-1",
    bg: "bg-purple-500/10",
    color: "text-purple-400",
    border: "border-purple-500/30"
  },
  {
    title: "White-labeled Portals",
    desc: "Candidates experience your brand end-to-end. Custom domains, logos, and tailored AI voices.",
    icon: Globe,
    colSpan: "lg:col-span-1",
    bg: "bg-emerald-500/10",
    color: "text-emerald-400",
    border: "border-emerald-500/30"
  },
  {
    title: "99.99% SLA Guarantee",
    desc: "Backed by TiDB Cloud distributed architecture, ensuring zero downtime during massive global hiring drives.",
    icon: Server,
    colSpan: "lg:col-span-2",
    bg: "bg-cyan-500/10",
    color: "text-cyan-400",
    border: "border-cyan-500/30"
  }
];

export default function EnterprisePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', size: '500-1000' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "918700236923";
    const message = `*HireX Enterprise Inquiry*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Company:* ${formData.company}%0A*Company Size:* ${formData.size} employees%0A%0A_We are interested in upgrading to the Enterprise tier._`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', company: '', size: '500-1000' });
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30 font-sans">
      
      {/* Premium Dark Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full md:w-[900px] h-[500px] md:h-[900px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-full md:w-[700px] h-[400px] md:h-[700px] bg-indigo-600/10 blur-[150px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4" /> Designed for Scale
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              HireX <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Enterprise</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Deploy dedicated autonomous AI agents tailored to your corporate tech stack. Unmatched security, unlimited scaling, and deep ATS integrations for global organizations.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center justify-center gap-2"
              >
                Contact Enterprise Sales <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
            {[
              { label: "Concurrent Tests", value: "100k+", icon: Users },
              { label: "Data Encryption", value: "AES-256", icon: Fingerprint },
              { label: "Global Latency", value: "< 50ms", icon: Zap },
              { label: "Uptime SLA", value: "99.99%", icon: Activity }
            ].map((stat: any, idx) => (
              <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center flex flex-col items-center">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-blue-400 mb-4" />
                <h3 className="text-2xl md:text-4xl font-black text-white mb-1">{stat.value}</h3>
                <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bento Grid Features */}
          <div className="mb-20 md:mb-32">
            <h2 className="text-2xl md:text-4xl font-bold text-center mb-12">Built for Corporate Infrastructure</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {ENTERPRISE_FEATURES.map((feat, idx) => (
                <div key={idx} className={`${feat.colSpan} bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-10 hover:border-white/20 transition-all duration-300 group overflow-hidden relative`}>
                  <div className={`absolute -right-10 -top-10 w-40 h-40 ${feat.bg} blur-3xl rounded-full opacity-50 group-hover:opacity-100 transition-opacity`} />
                  <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl ${feat.bg} border ${feat.border} flex items-center justify-center mb-6 relative z-10`}>
                    <feat.icon className={`w-6 h-6 md:w-7 md:h-7 ${feat.color}`} />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 relative z-10">{feat.title}</h3>
                  <p className="text-slate-400 text-sm md:text-base leading-relaxed relative z-10 max-w-md">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Security Section */}
          <div className="bg-[#0b0f1f]/80 backdrop-blur-2xl border border-blue-500/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 mb-20 md:mb-32 shadow-[0_0_50px_rgba(37,99,235,0.1)]">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6">
                  <ShieldCheck className="w-4 h-4" /> Bank-Grade Security
                </div>
                <h2 className="text-3xl md:text-5xl font-black mb-6">Compliance at the Core</h2>
                <p className="text-slate-400 leading-relaxed mb-8">
                  We understand that candidate data is highly sensitive. HireX Enterprise is built to meet the strictest global data protection regulations, ensuring your hiring pipeline remains fully compliant.
                </p>
                <div className="space-y-4">
                  {[
                    "GDPR & CCPA Compliant Data Processing",
                    "SOC 2 Type II Certified Infrastructure",
                    "Automated PII Redaction in Code Playbacks",
                    "End-to-End Encryption (Data in Transit & Rest)"
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
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center justify-center aspect-square">
                  <Lock className="w-10 h-10 text-slate-300 mb-3" />
                  <span className="font-bold text-white tracking-widest">SOC 2</span>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center justify-center aspect-square">
                  <Globe className="w-10 h-10 text-slate-300 mb-3" />
                  <span className="font-bold text-white tracking-widest">GDPR</span>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center justify-center aspect-square">
                  <Layers className="w-10 h-10 text-slate-300 mb-3" />
                  <span className="font-bold text-white tracking-widest">CCPA</span>
                </div>
                <div className="bg-black/40 border border-white/5 p-6 rounded-2xl text-center flex flex-col items-center justify-center aspect-square">
                  <ShieldCheck className="w-10 h-10 text-slate-300 mb-3" />
                  <span className="font-bold text-white tracking-widest">ISO 27001</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="max-w-5xl mx-auto p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-700 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Upgrade your hiring engine.</h2>
              <p className="text-blue-100 text-sm md:text-lg">
                Join industry leaders who have cut their time-to-hire by 70% while improving technical quality using HireX Enterprise.
              </p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 w-full md:w-auto px-8 py-4 bg-white text-blue-700 font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2"
            >
              Book a Demo <ArrowRight className="w-5 h-5" />
            </button>
          </div>

        </div>
      </div>

      {/* ENTERPRISE SALES MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-blue-500/30 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(37,99,235,0.2)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
              
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-blue-500/20">
                  <Building2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Enterprise Access</h3>
                <p className="text-slate-400 text-sm mt-1">Connect with our architects via WhatsApp</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input 
                      required type="text" placeholder="Full Name"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-blue-500 outline-none w-full"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      required type="email" placeholder="Work Email"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-blue-500 outline-none w-full"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <input 
                    required type="text" placeholder="Company Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-blue-500 outline-none w-full"
                    value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>

                <div className="relative">
                  <select 
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:border-blue-500 outline-none w-full appearance-none"
                    value={formData.size} onChange={e => setFormData({...formData, size: e.target.value})}
                  >
                    <option value="100-500" className="bg-slate-900">100 - 500 Employees</option>
                    <option value="500-1000" className="bg-slate-900">500 - 1,000 Employees</option>
                    <option value="1000-5000" className="bg-slate-900">1,000 - 5,000 Employees</option>
                    <option value="5000+" className="bg-slate-900">5,000+ Employees</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/40 mt-6"
                >
                  Request Architecture Demo <Send className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-4">Routed to: +91 870023 6923</p>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
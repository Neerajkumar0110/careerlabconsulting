// app/hirex/startups/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  Rocket, Zap, Code2, Target, 
  ArrowRight, Users, CheckCircle2, 
  X, Briefcase, Mail, Send, Timer,
  TerminalSquare, Sparkles, Building
} from 'lucide-react';

const STARTUP_FEATURES = [
  {
    title: "Zero-Touch Tech Screens",
    desc: "Founders shouldn't spend weekends doing technical interviews. Our AI assesses coding, logic, and system design asynchronously.",
    icon: Timer,
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    colSpan: "lg:col-span-2"
  },
  {
    title: "Access the 90th Percentile",
    desc: "Instantly tap into pre-verified 'Talent Nodes' containing top-tier developers who have already passed rigorous AI logic gates.",
    icon: Target,
    color: "text-fuchsia-400",
    bg: "bg-fuchsia-500/10",
    border: "border-fuchsia-500/30",
    colSpan: "lg:col-span-1"
  },
  {
    title: "Startup-Friendly Economics",
    desc: "Agile pay-per-hire or flexible subscription models designed to keep your burn rate low while you scale your engineering pod.",
    icon: Zap,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    colSpan: "lg:col-span-1"
  },
  {
    title: "Beat FAANG to Top Talent",
    desc: "Make offers in 48 hours. By automating the technical vetting phase, you can close high-leverage candidates before big tech even schedules a recruiter screen.",
    icon: Rocket,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    colSpan: "lg:col-span-2"
  }
];

export default function StartupsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', funding: 'Bootstrapped / Pre-Seed' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "918700236923";
    const message = `*HireX Startup Accelerator Request*%0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Startup:* ${formData.company}%0A*Stage:* ${formData.funding}%0A%0A_We need to scale our engineering team fast._`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', company: '', funding: 'Bootstrapped / Pre-Seed' });
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-violet-500/30 font-sans">
      
      {/* Hyper-Growth Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-violet-600/10 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-fuchsia-600/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
              <Rocket className="w-3.5 h-3.5 md:w-4 md:h-4" /> Startup Accelerator Program
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Hire 10x Engineers at <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400">Hyper-Speed</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Stop burning engineering cycles on technical interviews. Let our autonomous AI vet your early hires, so founders can focus on building the product.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-violet-600 hover:bg-violet-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(139,92,246,0.4)] flex items-center justify-center gap-2"
              >
                Scale Your Team <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Startup Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-20 md:mb-32">
            {[
              { label: "Engineering Hours Saved", value: "120+ hrs/mo", desc: "per open technical role" },
              { label: "Time-to-Offer", value: "< 48 Hours", desc: "beat competing startups" },
              { label: "Bad Hire Rate", value: "0%", desc: "verified by Neural Ledgers" }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center flex flex-col items-center hover:border-violet-500/30 transition-colors">
                <h3 className="text-2xl md:text-4xl font-black text-white mb-2">{stat.value}</h3>
                <p className="text-sm font-bold text-violet-400 mb-1">{stat.label}</p>
                <p className="text-[10px] md:text-xs text-slate-500 uppercase tracking-widest">{stat.desc}</p>
              </div>
            ))}
          </div>

          {/* Bento Grid Features for Startups */}
          <div className="mb-20 md:mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Ultimate Growth Hack</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Traditional recruiting is broken for early-stage companies. HireX gives you the technical vetting power of a 500-person enterprise.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {STARTUP_FEATURES.map((feat, idx) => (
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

          {/* Founders vs HireX Comparison */}
          <div className="bg-[#0b0f1f]/80 backdrop-blur-2xl border border-violet-500/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 mb-20 md:mb-32 shadow-[0_0_50px_rgba(139,92,246,0.1)]">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-12">Traditional Hiring vs HireX</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              {/* Bad Way */}
              <div className="bg-red-500/5 border border-red-500/10 rounded-3xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-300">The Old Way</h3>
                </div>
                <ul className="space-y-4 text-sm text-slate-400">
                  <li className="flex items-start gap-3"><span className="text-red-500 mt-1">✗</span> CTO spends 20+ hours reviewing take-home assignments.</li>
                  <li className="flex items-start gap-3"><span className="text-red-500 mt-1">✗</span> Relying on biased keyword matching from cheap ATS tools.</li>
                  <li className="flex items-start gap-3"><span className="text-red-500 mt-1">✗</span> Candidates get poached while waiting for a technical interview slot.</li>
                  <li className="flex items-start gap-3"><span className="text-red-500 mt-1">✗</span> High risk of hiring someone who struggles to scale architecture.</li>
                </ul>
              </div>

              {/* HireX Way */}
              <div className="bg-violet-500/10 border border-violet-500/30 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500" />
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-violet-500/20 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-violet-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">The HireX Advantage</h3>
                </div>
                <ul className="space-y-4 text-sm text-slate-200">
                  <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">✓</span> Gemini 2.5 AI conducts rigorous technical interviews autonomously.</li>
                  <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">✓</span> Receive a 360° Neural Ledger grading candidate logic and speed.</li>
                  <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">✓</span> Make data-driven job offers in 48 hours or less.</li>
                  <li className="flex items-start gap-3"><span className="text-violet-400 mt-1">✓</span> Founders get their time back to focus entirely on building.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA Banner */}
          <div className="max-w-5xl mx-auto p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-violet-600 to-fuchsia-700 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Build your dream team today.</h2>
              <p className="text-violet-100 text-sm md:text-lg">
                Special pricing available for Seed and Series A startups. Let's automate your technical hiring pipeline.
              </p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 w-full md:w-auto px-8 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2"
            >
              Get Startup Access <Zap className="w-5 h-5 fill-violet-700" />
            </button>
          </div>

        </div>
      </div>

      {/* STARTUP SALES MODAL (WhatsApp Integration) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-violet-500/30 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(139,92,246,0.2)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-violet-500/20 blur-3xl rounded-full" />
              
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 bg-violet-500/10 text-violet-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-violet-500/20">
                  <Rocket className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Startup Accelerator</h3>
                <p className="text-slate-400 text-sm mt-1">Connect directly with our founding team.</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input 
                      required type="text" placeholder="Founder/Recruiter Name"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-violet-500 outline-none w-full"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      required type="email" placeholder="Work Email"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-violet-500 outline-none w-full"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <Building className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                  <input 
                    required type="text" placeholder="Startup Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm focus:border-violet-500 outline-none w-full"
                    value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>

                <div className="relative">
                  <select 
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:border-violet-500 outline-none w-full appearance-none"
                    value={formData.funding} onChange={e => setFormData({...formData, funding: e.target.value})}
                  >
                    <option value="Bootstrapped / Pre-Seed" className="bg-slate-900">Bootstrapped / Pre-Seed</option>
                    <option value="Seed Stage" className="bg-slate-900">Seed Stage</option>
                    <option value="Series A/B" className="bg-slate-900">Series A / B</option>
                    <option value="Growth Stage" className="bg-slate-900">Growth Stage</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-violet-900/40 mt-6"
                >
                  Send Request via WhatsApp <Send className="w-4 h-4" />
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
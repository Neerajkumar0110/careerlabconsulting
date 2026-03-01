// app/hirex/academic/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  GraduationCap, Award, TrendingUp, 
  ScrollText, Users, ArrowRight, 
  CheckCircle2, X, Building, Mail, Send,
  BrainCircuit, ShieldCheck, LineChart, Library
} from 'lucide-react';

const ACADEMIC_FEATURES = [
  {
    title: "Pre-Placement AI Screening",
    desc: "Prepare students for the real world. Our Gemini 2.5 engine conducts mock technical interviews identical to what top-tier enterprises use.",
    icon: BrainCircuit,
    color: "text-rose-400",
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    colSpan: "lg:col-span-2"
  },
  {
    title: "Global Benchmarking",
    desc: "See exactly how your curriculum stacks up against live industry demand and enterprise S-Tier standards.",
    icon: LineChart,
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    colSpan: "lg:col-span-1"
  },
  {
    title: "Immutable Credentials",
    desc: "Graduates receive a cryptographic 'Neural Hash' of their skills, providing employers with 100% verifiable proof of competency.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    colSpan: "lg:col-span-1"
  },
  {
    title: "Automate Campus Drives",
    desc: "Stop coordinating massive physical coding tests. Process thousands of students concurrently with zero-bias, AI-proctored remote assessments.",
    icon: Users,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    colSpan: "lg:col-span-2"
  }
];

export default function AcademicPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', university: '', cohortSize: '500-1000' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "918700236923";
    const message = `*HireX Academic Partnership*%0A%0A*Name/Role:* ${formData.name}%0A*Email:* ${formData.email}%0A*Institution:* ${formData.university}%0A*Cohort Size:* ${formData.cohortSize} students%0A%0A_We are interested in modernizing our campus placements._`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
    setFormData({ name: '', email: '', university: '', cohortSize: '500-1000' });
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-rose-500/30 font-sans">
      
      {/* Institutional Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] md:w-[900px] h-[500px] md:h-[900px] bg-rose-600/10 blur-[150px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] md:w-[700px] h-[400px] md:h-[700px] bg-amber-600/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] opacity-30" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 md:mb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6 shadow-[0_0_20px_rgba(225,29,72,0.2)]">
              <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4" /> University & Bootcamp Partners
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-tight">
              Elevate Campus <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-amber-400">Placements</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-10">
              Bridge the gap between academia and industry. Equip your students with AI-verified technical credentials that top tech enterprises trust.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(225,29,72,0.4)] flex items-center justify-center gap-2"
              >
                Partner with HireX <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Academic Impact Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-20 md:mb-32">
            {[
              { label: "Placement Velocity", value: "3x Faster", icon: TrendingUp },
              { label: "Concurrent Exams", value: "Unlimited", icon: Users },
              { label: "Industry Match", value: "98%", icon: Award },
              { label: "Grading Bias", value: "Zero", icon: ShieldCheck }
            ].map((stat, idx) => (
              <div key={idx} className="bg-slate-900/40 backdrop-blur-md border border-white/10 p-6 md:p-8 rounded-2xl md:rounded-[2rem] text-center flex flex-col items-center hover:border-rose-500/30 transition-colors">
                <stat.icon className="w-6 h-6 md:w-8 md:h-8 text-rose-400 mb-4" />
                <h3 className="text-2xl md:text-4xl font-black text-white mb-1">{stat.value}</h3>
                <p className="text-[10px] md:text-xs uppercase font-bold tracking-widest text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Bento Grid Features for Academia */}
          <div className="mb-20 md:mb-32">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">A Modern Placement Infrastructure</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Replace outdated mass-testing platforms with an adaptive AI engine that evaluates actual engineering capability, not just memorization.</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {ACADEMIC_FEATURES.map((feat, idx) => (
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

          {/* Workflow/Timeline Section */}
          <div className="bg-[#0b0f1f]/80 backdrop-blur-2xl border border-rose-500/20 rounded-[2rem] md:rounded-[3rem] p-8 md:p-16 mb-20 md:mb-32 shadow-[0_0_50px_rgba(225,29,72,0.1)]">
            <h2 className="text-3xl md:text-4xl font-black text-center mb-16">The HireX Academic Pipeline</h2>
            
            <div className="grid md:grid-cols-4 gap-8 relative">
              {/* Connecting Line for Desktop */}
              <div className="hidden md:block absolute top-6 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-rose-500/50 via-amber-500/50 to-emerald-500/50 z-0" />
              
              {[
                { step: "01", title: "Cohort Ingestion", desc: "Upload student batches. HireX automatically provisions secure AI assessment links." },
                { step: "02", title: "AI Evaluation", desc: "Students take proctored coding and logic tests mapped to live industry stacks." },
                { step: "03", title: "Dean's Dashboard", desc: "Professors review aggregate cohort data to identify curriculum skill gaps." },
                { step: "04", title: "Enterprise Matching", desc: "Top-scoring students are instantly flagged to our enterprise partner network." }
              ].map((item, idx) => (
                <div key={idx} className="relative z-10 flex flex-col items-center text-center">
                  <div className="w-12 h-12 bg-[#020617] border-2 border-rose-500 rounded-full flex items-center justify-center text-rose-400 font-black mb-6 shadow-[0_0_15px_rgba(225,29,72,0.3)]">
                    {item.step}
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Banner */}
          <div className="max-w-5xl mx-auto p-8 md:p-14 rounded-[2rem] md:rounded-[3rem] bg-gradient-to-br from-rose-600 to-orange-600 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="relative z-10 text-center md:text-left max-w-xl">
              <h2 className="text-3xl md:text-3xl font-black text-white mb-4">Empower your next graduating class.</h2>
              <p className="text-rose-100 text-sm md:text-lg">
                Join forward-thinking universities that use AI to guarantee their students are 100% industry-ready.
              </p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 w-full md:w-auto px-8 py-4 bg-white text-black font-black rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(0,0,0,0.3)] flex items-center justify-center gap-2"
            >
              Request Campus Demo <Library className="w-5 h-5 text-rose-700" />
            </button>
          </div>

        </div>
      </div>

      {/* ACADEMIC SALES MODAL (WhatsApp Integration) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-rose-500/30 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(225,29,72,0.2)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full z-10">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10 relative">
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-rose-500/20 blur-3xl rounded-full" />
              
              <div className="mb-8 text-center relative z-10">
                <div className="w-16 h-16 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-rose-500/20">
                  <GraduationCap className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Academic Partnership</h3>
                <p className="text-slate-400 text-sm mt-1">Connect with our institutional coordinators.</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <input 
                      required type="text" placeholder="Your Name / Title"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-rose-500 outline-none w-full"
                      value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="relative">
                    <input 
                      required type="email" placeholder="Official Email"
                      className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm focus:border-rose-500 outline-none w-full"
                      value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <Building className="absolute left-4 top-4 w-4 h-4 text-slate-500" />
                  <input 
                    required type="text" placeholder="University / Bootcamp Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm focus:border-rose-500 outline-none w-full"
                    value={formData.university} onChange={e => setFormData({...formData, university: e.target.value})}
                  />
                </div>

                <div className="relative">
                  <select 
                    className="bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-slate-300 focus:border-rose-500 outline-none w-full appearance-none"
                    value={formData.cohortSize} onChange={e => setFormData({...formData, cohortSize: e.target.value})}
                  >
                    <option value="< 100" className="bg-slate-900">Less than 100 students</option>
                    <option value="100-500" className="bg-slate-900">100 - 500 students</option>
                    <option value="500-1000" className="bg-slate-900">500 - 1,000 students</option>
                    <option value="1000+" className="bg-slate-900">1,000+ students</option>
                  </select>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-rose-600 hover:bg-rose-500 text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-rose-900/40 mt-6"
                >
                  Initiate Partnership <Send className="w-4 h-4" />
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
// app/freelancex/ai-employers/page.tsx

'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, BrainCircuit, Timer, ShieldCheck, 
  ArrowRight, 
  Cpu, X, Loader2, 
  FileSearch, Rocket
} from 'lucide-react';
import Image from 'next/image';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer'; 

const HIRING_BENEFITS = [
  {
    icon: Timer,
    title: "48-Hour Deployment",
    desc: "Stop waiting weeks for candidates. Our AI matches you with available, pre-vetted experts ready to start immediately.",
    color: "text-blue-400"
  },
  {
    icon: BrainCircuit,
    title: "AI-Powered Vetting",
    desc: "Every developer has passed rigorous live-coding, architecture, and communication assessments evaluated by our neural engine.",
    color: "text-purple-400"
  },
  {
    icon: ShieldCheck,
    title: "Zero-Risk Contracts",
    desc: "Pay only when milestones are met. Our smart escrow system protects your budget and intellectual property.",
    color: "text-emerald-400"
  },
  {
    icon: Building2,
    title: "Enterprise Scalability",
    desc: "Whether you need a single Next.js expert or an entire autonomous full-stack pod, we scale with your product roadmap.",
    color: "text-cyan-400"
  }
];

const TRUSTED_LOGOS = [
  { name: "Microsoft", src: "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg" },
  { name: "Google", src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
  { name: "Amazon", src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
  { name: "IBM", src: "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg" },
  { name: "Intel", src: "https://pngimg.com/d/intel_PNG11.png" }
];

const HIRE_STEPS = [
  { step: "01", title: "Project Ingestion", desc: "Submit your tech stack and roadmap requirements.", icon: FileSearch },
  { step: "02", title: "Neural Matching", desc: "AI scans 31,000+ vetted nodes for the perfect logic fit.", icon: Cpu },
  { step: "03", title: "Instant Activation", desc: "Deploy your expert directly into your Slack or GitHub.", icon: Rocket }
];

export default function AIEmployersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [interestSource, setInterestSource] = useState("");
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", talentNeeded: "Full Stack Engineer", description: "" });

  const openModal = (source: string) => {
    setInterestSource(source);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const adminWhatsAppNumber = "918700236923"; 
      const message = `*Enterprise Inquiry: ${interestSource}* %0A%0A*Name:* ${formData.name}%0A*Email:* ${formData.email}%0A*Phone:* ${formData.phone}%0A*Looking For:* ${formData.talentNeeded}%0A*Details:* ${formData.description}`;
      window.open(`https://wa.me/${adminWhatsAppNumber}?text=${message}`, '_blank');
      setFormData({ name: "", email: "", phone: "", talentNeeded: "Full Stack Engineer", description: "" });
      setIsModalOpen(false);
    } catch (error) {
      alert("Error submitting form.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#020617] text-white selection:bg-blue-500/30 font-sans overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 lg:pt-36 pb-24 relative">
        <div className="absolute top-0 right-0 w-[300px] sm:w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full -z-10" />
        <div className="absolute top-1/3 left-0 w-[300px] sm:w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-10 mb-24 lg:mb-36">
            <div className="space-y-6 md:space-y-8 text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20">
                <Cpu size={14} className="text-blue-400" />
                <span className="text-[10px] sm:text-[11px] font-black text-blue-400 uppercase tracking-widest">Enterprise Hiring Protocol</span>
              </motion.div>
              
              <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.1]">
                Hire the Top 1% <br className="hidden lg:block"/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-cyan-400"> Without the Wait.</span>
              </motion.h1>
              
              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-400 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Bypass traditional recruiting. Access a curated pool of elite technical talent, verified by AI and ready to ship in 48 hours.
              </motion.p>
              
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row gap-4 pt-4 justify-center lg:justify-start">
                <button onClick={() => openModal("Post Project Hero")} className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all shadow-[0_0_30px_rgba(37,99,235,0.3)]">Post a Project</button>
                <button onClick={() => openModal("Book Demo Hero")} className="px-8 py-4 bg-white/5 border border-white/10 text-white hover:bg-white/10 font-black text-xs uppercase tracking-[0.2em] rounded-full transition-all">Book a Demo</button>
              </motion.div>
            </div>

            {/* AI Match Mockup Card */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }} className="relative mx-auto w-full max-w-sm sm:max-w-md lg:max-w-full">
              <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-[2.5rem] -z-10" />
              <div className="bg-[#0a0f1d]/90 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /><span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">AI Match Identified</span></div>
                  <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-[10px] font-black border border-blue-500/30 uppercase tracking-tighter">S-Tier Grade</span>
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 flex items-center justify-center font-black text-2xl text-blue-400">AC</div>
                  <div><h3 className="text-white font-bold text-lg">Alex Chen</h3><p className="text-blue-400 text-sm font-medium">Senior Full-Stack Architect</p></div>
                </div>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between text-[11px] font-black uppercase text-slate-500 tracking-widest"><span>Logic Score</span><span>98%</span></div>
                  <div className="w-full bg-white/5 h-2 rounded-full overflow-hidden"><motion.div initial={{ width: 0 }} animate={{ width: "98%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="bg-gradient-to-r from-blue-600 to-cyan-400 h-full shadow-[0_0_15px_#3b82f6]" /></div>
                </div>
                <button onClick={() => openModal("Deploy Alex Chen")} className="group w-full py-4 bg-white text-black font-black text-[10px] uppercase tracking-[0.2em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2">
                    Deploy to Sprint <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* SECTION: GENUINE BRAND LOGOS */}
          <div className="border-y border-white/5 py-12 mb-24 overflow-hidden">
            <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-[0.3em] mb-10">Trusted by Global Infrastructure Leaders</p>
            <div className="flex flex-wrap justify-center items-center gap-10 sm:gap-20 px-4">
              {TRUSTED_LOGOS.map((logo, i) => (
                <div key={i} className="relative h-8 w-28 sm:w-36 transition-all duration-500 filter grayscale hover:grayscale-0 opacity-40 hover:opacity-100 cursor-default">
                  <Image src={logo.src} alt={logo.name} fill className="object-contain" priority />
                </div>
              ))}
            </div>
          </div>

          {/* New Section: Autonomous Hiring Lifecycle */}
          <section className="mb-24 lg:mb-36">
            <div className="text-center max-w-3xl mx-auto mb-16 px-4">
              <h2 className="text-3xl sm:text-5xl font-black text-white mb-6 tracking-tight leading-tight">The Autonomous <br className="hidden sm:block"/> Hiring Lifecycle</h2>
              <p className="text-slate-400 font-medium text-sm sm:text-base">Bypass recruiters. Our system automates the friction of talent acquisition through verifiable logic matching.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {HIRE_STEPS.map((step, i) => (
                <div key={i} className="relative group p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-all hover:border-blue-500/20">
                  <span className="text-6xl font-black text-white/[0.03] absolute top-6 right-8 group-hover:text-blue-500/10 transition-colors">{step.step}</span>
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform">
                    <step.icon size={28} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{step.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed font-medium">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Modern Hiring Stack Grid */}
          <section className="mb-24 lg:mb-36 px-4">
            <div className="text-center mb-16"><h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">The Modern Hiring Stack</h2></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {HIRING_BENEFITS.map((b, i) => (
                <div key={i} className="p-8 sm:p-12 bg-slate-900/40 border border-white/5 rounded-[3rem] hover:border-blue-500/30 transition-all group">
                  <div className="mb-6 p-4 bg-white/5 rounded-2xl w-fit group-hover:bg-blue-500/10 transition-colors">
                    <b.icon className={`${b.color} transition-transform group-hover:scale-110`} size={32} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">{b.title}</h3>
                  <p className="text-slate-400 text-sm sm:text-base leading-relaxed font-medium">{b.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Final Banner */}
          <div className="relative rounded-[2.5rem] sm:rounded-[4rem] overflow-hidden group shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-indigo-700 to-blue-900" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
            <div className="relative z-10 p-12 sm:p-24 text-center">
              <h2 className="text-3xl sm:text-6xl font-black text-white mb-8 leading-tight tracking-tighter">Scale Your Technical <br className="hidden sm:block"/> Workforce Today</h2>
              <div className="flex flex-col sm:flex-row gap-5 justify-center">
                <button onClick={() => openModal("CTA Start Hiring")} className="px-10 py-5 bg-white text-blue-600 font-black uppercase text-xs tracking-[0.2em] rounded-full hover:scale-105 transition-transform shadow-2xl active:scale-95">Start Hiring Now</button>
                <button onClick={() => openModal("CTA Sales")} className="px-10 py-5 bg-transparent border-2 border-white/40 text-white font-black uppercase text-xs tracking-[0.2em] rounded-full hover:bg-white/10 transition-colors active:scale-95">Talk to Sales</button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ opacity: 0, y: 50, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 50, scale: 0.9 }} className="relative w-full max-w-lg bg-[#0a0f1d] border border-white/10 rounded-[3rem] p-8 sm:p-10 shadow-3xl overflow-hidden">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 text-slate-500 hover:text-white p-2 rounded-full transition-colors"><X size={24} /></button>
              <h3 className="text-2xl font-black text-white mb-2 tracking-tight uppercase tracking-widest">Enterprise Connect</h3>
              <p className="text-slate-500 text-xs font-bold uppercase mb-8">Source: <span className="text-blue-400">{interestSource}</span></p>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input required type="text" placeholder="Full Name" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 outline-none" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <input required type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 outline-none" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
                <input required type="tel" placeholder="Phone / WhatsApp" className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 outline-none" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 appearance-none cursor-pointer" value={formData.talentNeeded} onChange={(e) => setFormData({...formData, talentNeeded: e.target.value})}>
                  <option value="Full Stack Engineer" className="bg-[#0a0f1d]">Full Stack Engineer</option>
                  <option value="AI / ML Architect" className="bg-[#0a0f1d]">AI / ML Architect</option>
                  <option value="Cloud / DevOps" className="bg-[#0a0f1d]">Cloud / DevOps</option>
                </select>
                <textarea required placeholder="Project Details or Roadmap requirements..." rows={3} className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-sm text-white focus:border-blue-500 resize-none" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} />
                <button disabled={isSubmitting} type="submit" className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-5 rounded-2xl flex justify-center items-center gap-2 text-[10px] uppercase tracking-[0.3em] disabled:opacity-50 shadow-xl">{isSubmitting ? <Loader2 className="animate-spin" /> : "Request Secure Sync"}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
'use client';

import React from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import PricingSection from '@/components/b2c/PricingSection';
import { 
  Bot, Cpu, Zap, Shield, Rocket, Terminal, ChevronRight, 
  Activity, Globe, Code, Layers, BarChart3, 
  CheckCircle2, ArrowRight, Star, GraduationCap, 
  Network, Briefcase, FileCheck, Coins, Database, Search
} from 'lucide-react';

export default function InternXAI() {
  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 font-sans">
      <B2CHeader />

      {/* --- HERO SECTION: MESH GRADIENT --- */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-6 overflow-hidden">
        {/* Animated Background Mesh */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
        
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-2xl">
            <Activity className="w-3 h-3 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400">
              Next Batch: Sat & Sun @ 11 AM IST
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-[110px] font-black mb-6 tracking-tighter leading-[0.85] uppercase">
            Build. Prove.<br/>
            <span className="text-blue-600">Get Hired.</span>
          </h1>
          
          <p className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed font-light italic">
            "Don't just learn AI. Prove it. InternX gives you real projects, real proof, and real jobs."
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button className="group relative px-12 py-5 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest transition-all hover:bg-blue-500 hover:shadow-[0_0_40px_-10px_rgba(59,130,246,0.5)] active:scale-95 flex items-center gap-3">
              Enroll Now <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </button>
            <button className="px-10 py-5 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 rounded-2xl font-bold uppercase tracking-widest transition-all">
              The Ecosystem
            </button>
          </div>
        </div>
      </section>

      {/* --- GLOBAL IMPACT STATS (Brochure Page 2) --- */}
      <section className="py-20 bg-black/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { label: 'Learners Trained', val: '1200+', icon: GraduationCap },
              { label: 'Projects Delivered', val: '3500+', icon: Code },
              { label: 'Hiring Partners', val: '120+', icon: Network },
              { label: 'Job Conversion', val: '88%', icon: Briefcase },
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 rounded-[2rem] bg-white/[0.02] border border-white/10 hover:bg-white/[0.04] transition-colors">
                <stat.icon className="w-8 h-8 text-blue-500 mb-4" />
                <div className="text-4xl font-black text-white mb-1">{stat.val}</div>
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PROJECT TRACKS: STARTUP PROJECTS (Brochure Page 7) --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-4 tracking-tighter">Choose Your Track</h2>
            <p className="text-slate-500 uppercase text-xs font-bold tracking-[0.3em]">Real Startup Projects — Verifiable via GitHub</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'FinTech', desc: 'AI Sales Campaign Automation & Intelligent Lead Bots.', icon: Coins },
              { title: 'EdTech', desc: 'Automated Curriculum Mapping & AI Content Generators.', icon: Layers },
              { title: 'HealthTech', desc: 'Patient Query Resolution Assistants with Secure LLMs.', icon: Activity },
              { title: 'E-commerce', desc: 'Customer Persona Segmenter & Behavioral AI Agents.', icon: Zap },
              { title: 'HRTech', desc: 'Automated JD Analyzer & Verified CV Screener Agents.', icon: Shield },
              { title: 'NLP/LLM', desc: 'PromptOps Testing & Multi-Model Evaluation Toolkits.', icon: Cpu },
            ].map((track, i) => (
              <div key={i} className="group p-10 rounded-[3rem] bg-[#0a0a0a] border border-white/5 hover:border-blue-500/50 transition-all duration-500">
                <track.icon className="w-12 h-12 mb-8 text-blue-500 group-hover:scale-110 group-hover:rotate-3 transition-transform" />
                <h3 className="text-2xl font-black uppercase mb-3">{track.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{track.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- 6-STEP CAREER ROADMAP (Brochure Page 8) --- */}
      <section className="py-24 bg-black/40 relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-6xl font-black text-center mb-24 uppercase tracking-tighter">6-Step Career Roadmap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-16 gap-y-20 relative">
            {[
              { step: '01', title: 'Matching', desc: 'Role matching based on background & goals.', icon: Search },
              { step: '02', title: 'Foundation', desc: 'Python, OpenAI, & LangChain fundamentals.', icon: Terminal },
              { step: '03', title: 'Mentorship', desc: 'Weekly check-ins with Project Incharges.', icon: Star },
              { step: '04', title: 'Build & Deploy', desc: 'Full-scale Agentic AI development & GitHub push.', icon: Rocket },
              { step: '05', title: 'ResumeNFT', desc: 'Verified blockchain credentials minted.', icon: FileCheck },
              { step: '06', title: 'HireX Access', desc: 'Placement support & Global hiring engine.', icon: Globe },
            ].map((item, i) => (
              <div key={i} className="relative group">
                <div className="mb-8 flex items-center gap-6">
                  <div className="w-16 h-16 rounded-[1.5rem] bg-blue-600/10 border border-blue-600/20 flex items-center justify-center text-blue-500 font-black">
                    <item.icon className="w-8 h-8" />
                  </div>
                  <span className="text-4xl font-black text-white/10 group-hover:text-blue-600/20 transition-colors uppercase">{item.step}</span>
                </div>
                <h3 className="text-2xl font-black uppercase mb-4 tracking-tight group-hover:text-blue-500 transition-colors">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TECH STACK (Brochure Page 11) --- */}
      <section className="py-24 bg-[#050505] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-black uppercase mb-20 tracking-[0.2em] text-white/50">Tools You Will Master</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 items-center justify-center opacity-60">
            {[
              { name: 'Python', icon: Code },
              { name: 'OpenAI', icon: Cpu },
              { name: 'LangChain', icon: Database },
              { name: 'GitHub', icon: Terminal },
              { name: 'Zapier', icon: Zap },
              { name: 'Make.com', icon: Activity },
            ].map((tool) => (
              <div key={tool.name} className="flex flex-col items-center gap-5 hover:opacity-100 transition-opacity">
                <tool.icon className="w-12 h-12 text-white" />
                <span className="text-[10px] font-black uppercase tracking-widest">{tool.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- PRICING SECTION --- */}
      <div id="enroll">
        <PricingSection />
      </div>

      {/* --- ELITE GUARANTEE (Brochure Page 25) --- */}
      <section className="py-20 bg-blue-600 relative overflow-hidden">
        <div className="absolute top-[-20%] right-[-10%] opacity-10">
          <Shield className="w-[500px] h-[500px] text-white" />
        </div>
        <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="text-center lg:text-left max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-4 tracking-tighter italic">Legal Job Guarantee</h2>
            <p className="text-blue-100 text-lg font-medium leading-relaxed">
              Elite Plan learners receive a 100% job placement guarantee backed by a signed legal contract. We don't just teach—we ensure you get hired.
            </p>
          </div>
          <button className="whitespace-nowrap px-12 py-6 bg-white text-blue-600 rounded-2xl font-black uppercase tracking-widest text-xs hover:scale-105 active:scale-95 shadow-2xl transition-all flex items-center gap-3">
            View Elite Contract <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
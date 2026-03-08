// app/hirex/hiring-insights/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  BarChart3, TrendingUp, Map, PieChart, Zap, Globe, 
  ChevronRight, Sparkles, 
  X, User, Building2, Send, Cpu, Layers, Target, Activity,
  BrainCircuit,
  Server
} from 'lucide-react';

export default function HiringInsightsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', company: '', domain: '' });

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const phoneNumber = "918700236923";
    const message = `*HireX Market Intelligence Request*%0A%0A*Name:* ${formData.name}%0A*Company:* ${formData.company}%0A*Domain:* ${formData.domain}%0A%0A_Please share the deep-dive market report._`;
    
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    setIsModalOpen(false);
    setFormData({ name: '', company: '', domain: '' });
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-emerald-500/30">
      
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-600/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        
        {/* HEADER SECTION */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16 md:mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6">
            <Sparkles className="w-4 h-4" /> Live Intelligence Engine
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
            Talent <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">Insights 360</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto">
            Real-time analytics extracted from thousands of autonomous AI interviews across the Indian tech ecosystem. Discover salary drifts, skill scarcities, and hiring patterns.
          </p>
        </section>

        {/* NEW SECTION 1: Live Platform Stats */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              { label: "Data Points Analyzed", value: "2.4M+", icon: Activity, color: "text-blue-400" },
              { label: "Avg Offer Velocity", value: "48 Hrs", icon: Zap, color: "text-yellow-400" },
              { label: "Active Enterprise Orgs", value: "150+", icon: Building2, color: "text-purple-400" },
              { label: "Accuracy vs Human", value: "99.2%", icon: Target, color: "text-emerald-400" }
            ].map((stat, i) => (
              <div key={i} className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 text-center hover:bg-slate-900/60 transition-colors">
                <stat.icon className={`w-8 h-8 mx-auto mb-4 ${stat.color}`} />
                <h4 className="text-2xl sm:text-3xl font-black text-white mb-1">{stat.value}</h4>
                <p className="text-[10px] sm:text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* NEW SECTION 2: Tech Stack Demand Tracker */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-6 sm:p-10 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="flex flex-col md:flex-row items-end justify-between gap-6 mb-10 relative z-10">
              <div>
                <h2 className="text-2xl md:text-4xl font-bold text-white mb-2 flex items-center gap-3">
                  <BarChart3 className="text-blue-400 w-8 h-8" /> Skill Demand Matrix
                </h2>
                <p className="text-slate-400 text-sm md:text-base">YoY growth in hiring volume based on core framework requirements.</p>
              </div>
              <div className="px-4 py-2 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg text-xs font-bold uppercase tracking-wider">
                Q1 2026 Data
              </div>
            </div>

            <div className="space-y-6 relative z-10">
              {[
                { tech: "Generative AI & LLMOps", growth: "+142%", width: "95%", color: "bg-blue-500" },
                { tech: "Distributed SQL (TiDB)", growth: "+88%", width: "80%", color: "bg-cyan-500" },
                { tech: "Next.js & React Server Components", growth: "+65%", width: "65%", color: "bg-purple-500" },
                { legacy: true, tech: "Legacy PHP / LAMP Stack", growth: "-12%", width: "20%", color: "bg-red-500" }
              ].map((skill, i) => (
                <div key={i}>
                  <div className="flex justify-between items-end mb-2">
                    <span className="text-sm sm:text-base font-bold text-white">{skill.tech}</span>
                    <span className={`text-sm font-mono font-bold ${skill.legacy ? 'text-red-400' : 'text-emerald-400'}`}>{skill.growth}</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                    <div className={`h-full rounded-full ${skill.color} shadow-[0_0_10px_rgba(255,255,255,0.2)]`} style={{ width: skill.width }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">2026 Salary Benchmarks</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Verified CTC data extracted from successfully closed enterprise offers on the HireX platform.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              { role: "Senior AI Engineer", exp: "4-7 Years", range: "₹45L - ₹85L", icon: BrainCircuit, color: "emerald" },
              { role: "Full Stack Lead", exp: "5-8 Years", range: "₹35L - ₹55L", icon: Layers, color: "blue" },
              { role: "Cloud / DevOps Architect", exp: "6-10 Years", range: "₹40L - ₹75L", icon: Server, color: "purple" }
            ].map((tier, i) => (
              <div key={i} className={`bg-slate-900/40 border border-white/10 rounded-[2rem] p-8 text-center hover:border-${tier.color}-500/30 hover:bg-slate-900/60 transition-all duration-300 group`}>
                <div className={`w-16 h-16 mx-auto bg-${tier.color}-500/10 rounded-2xl flex items-center justify-center border border-${tier.color}-500/20 mb-6 group-hover:scale-110 transition-transform`}>
                  <tier.icon className={`w-8 h-8 text-${tier.color}-400`} />
                </div>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-bold mb-2">{tier.exp}</p>
                <h3 className="text-xl font-bold text-white mb-4">{tier.role}</h3>
                <div className="text-2xl sm:text-3xl font-black font-mono text-white bg-white/5 py-3 rounded-xl border border-white/5">
                  {tier.range}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* NEW SECTION 4: The Talent Heatmap */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="bg-gradient-to-br from-blue-900/20 to-slate-900/60 border border-white/10 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center gap-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
            
            <div className="lg:w-1/2 relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
                <Map className="w-4 h-4" /> Geography Data
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">Where is the talent migrating?</h2>
              <p className="text-slate-400 text-base md:text-lg leading-relaxed mb-8">
                With hybrid work normalizing, hiring hubs are shifting. Bangalore remains the apex for Core AI, while Pune and Delhi-NCR are capturing massive Enterprise SaaS workloads.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <h4 className="text-white font-bold mb-1">Bangalore</h4>
                  <p className="text-xs text-emerald-400">42% of AI Roles</p>
                </div>
                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <h4 className="text-white font-bold mb-1">Delhi-NCR</h4>
                  <p className="text-xs text-blue-400">28% of FinTech Roles</p>
                </div>
                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <h4 className="text-white font-bold mb-1">Pune</h4>
                  <p className="text-xs text-purple-400">18% of Cloud/DevOps</p>
                </div>
                <div className="bg-black/30 p-4 rounded-xl border border-white/5">
                  <h4 className="text-white font-bold mb-1">Remote</h4>
                  <p className="text-xs text-yellow-400">12% Cross-domain</p>
                </div>
              </div>
            </div>

            <div className="lg:w-1/2 w-full relative z-10 flex justify-center">
              <div className="w-full max-w-sm aspect-square bg-blue-500/5 rounded-full border border-blue-500/20 flex items-center justify-center relative shadow-[0_0_100px_rgba(59,130,246,0.1)]">
                <Globe className="w-32 h-32 text-blue-400/50 animate-[spin_60s_linear_infinite]" />
                {/* Decorative Map Pins */}
                <div className="absolute top-1/4 right-1/4 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_#34d399] animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-blue-400 rounded-full shadow-[0_0_15px_#60a5fa] animate-pulse"></div>
                <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-purple-400 rounded-full shadow-[0_0_15px_#c084fc] animate-pulse"></div>
              </div>
            </div>

          </div>
        </section>

        {/* NEW SECTION 5: AI Market Predictions */}
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Future Projections</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">What our models indicate for the next 18 months in tech hiring.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors">
              <div className="w-12 h-12 bg-red-500/10 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp className="w-6 h-6 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Death of the Whiteboard</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                85% of enterprise companies will shift from leetcode-style whiteboard interviews to autonomous, logic-based AI sandboxes by late 2026.
              </p>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 hover:bg-white/[0.04] transition-colors">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center mb-6">
                <Cpu className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">The "AI-First" Developer</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Engineers who can leverage APIs (like Gemini, OpenAI) and build autonomous agents will command a 40% salary premium over traditional CRUD developers.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 6: Call to Action (Opens Modal) */}
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="p-8 md:p-12 rounded-[2.5rem] bg-emerald-600 flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-emerald-900/40 relative overflow-hidden text-center md:text-left">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 blur-3xl rounded-full" />
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold mb-2 text-white">Need deeper custom insights?</h3>
              <p className="text-emerald-100 text-sm md:text-base max-w-md">Request a tailored intelligence report specifically for your industry vertical and tech stack.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 whitespace-nowrap w-full md:w-auto px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-slate-100 transition-all flex items-center justify-center gap-2 shadow-xl hover:scale-105 duration-300"
            >
               Request Full Report <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </section>

      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-emerald-500/30 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10">
              <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <PieChart className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">Request Intelligence</h3>
                <p className="text-slate-400 text-sm mt-1">Submit details to connect via WhatsApp</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-4 text-slate-500 w-4 h-4" />
                  <input 
                    required type="text" placeholder="Your Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white focus:border-emerald-500 outline-none w-full transition-colors"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-4 top-4 text-slate-500 w-4 h-4" />
                  <input 
                    required type="text" placeholder="Company Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white focus:border-emerald-500 outline-none w-full transition-colors"
                    value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Zap className="absolute left-4 top-4 text-slate-500 w-4 h-4" />
                  <input 
                    required type="text" placeholder="Tech Domain (e.g. AI, Backend)"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm text-white focus:border-emerald-500 outline-none w-full transition-colors"
                    value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})}
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/40 mt-6 hover:shadow-xl"
                >
                  Send to Analyst <Send className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-4">Direct Comm-Link: +91 870023 6923</p>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
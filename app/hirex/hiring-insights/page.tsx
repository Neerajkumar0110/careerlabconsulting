// app/hirex/hiring-insights/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  BarChart3, 
  TrendingUp, 
  Map, 
  PieChart, 
  Zap, 
  Globe, 
  DollarSign, 
  ArrowUpRight, 
  Search,
  Briefcase,
  ChevronRight,
  Sparkles,
  X,
  User,
  Building2,
  Send
} from 'lucide-react';

const INSIGHT_TABS = [
  { id: 'market', label: 'Market Trends', icon: TrendingUp },
  { id: 'salary', label: 'Salary Benchmarks', icon: DollarSign },
  { id: 'heatmap', label: 'Talent Heatmap', icon: Map },
  { id: 'skills', label: 'Demand Matrix', icon: BarChart3 },
];

export default function HiringInsightsPage() {
  const [activeTab, setActiveTab] = useState('market');

  // Popup & Form States
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
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-full md:w-[600px] h-[400px] bg-emerald-600/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4" /> Live Intelligence Engine
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              Talent <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">Insights 360</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Real-time analytics on the Indian tech ecosystem. Analyze salary drifts, skill scarcities, and autonomous hiring patterns.
            </p>
          </div>

          {/* Premium Tab Navigation */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-1 p-1 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-x-auto no-scrollbar touch-pan-x">
              {INSIGHT_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-1 justify-center ${
                    activeTab === tab.id 
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4 shrink-0" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="max-w-6xl mx-auto min-h-[500px]">
            
            {activeTab === 'market' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { title: "AI/ML Engineering", growth: "+42%", desc: "Autonomous agent developers are in critical demand." },
                  { title: "Distributed SQL", growth: "+28%", desc: "TiDB and CockroachDB experts seeing rapid traction." },
                  { title: "Next.js 15+ Core", growth: "+35%", desc: "Shift towards RSC-first architecture in Enterprise." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900/40 border border-white/10 rounded-[2rem] p-8 hover:border-emerald-500/30 transition-all group">
                    <div className="flex justify-between items-start mb-6">
                       <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-400">
                          <TrendingUp className="w-5 h-5" />
                       </div>
                       <span className="text-emerald-400 font-bold text-sm bg-emerald-500/5 px-2 py-1 rounded-lg flex items-center gap-1">
                         {item.growth} <ArrowUpRight className="w-3 h-3" />
                       </span>
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{item.title}</h4>
                    <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'salary' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
                <h3 className="text-2xl md:text-3xl font-bold mb-8">2026 Salary Projections (India)</h3>
                <div className="space-y-6">
                  {[
                    { role: "Senior AI Engineer", range: "₹45L - ₹85L", grade: "S-Tier" },
                    { role: "Full Stack Lead (Next.js)", range: "₹35L - ₹55L", grade: "A-Tier" },
                    { role: "Cloud Architect", range: "₹40L - ₹75L", grade: "S-Tier" },
                    { role: "DevOps Specialist", range: "₹25L - ₹45L", grade: "B-Tier" }
                  ].map((s, i) => (
                    <div key={i} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-2xl bg-white/[0.02] border border-white/5 gap-4">
                      <div>
                        <h4 className="text-white font-bold text-lg">{s.role}</h4>
                        <p className="text-slate-500 text-xs uppercase tracking-widest font-mono">Platform Grade: {s.grade}</p>
                      </div>
                      <div className="text-2xl font-black text-emerald-400 font-mono">{s.range}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'heatmap' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center flex flex-col items-center">
                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mb-8 border border-blue-500/20">
                  <Globe className="text-blue-400 w-10 h-10 animate-pulse" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Regional Talent Density</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Bangalore remains the hub for Core AI, while Delhi-NCR is leading in Enterprise SaaS and FinTech modernization projects.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                   {["Bangalore", "Delhi-NCR", "Hyderabad", "Pune"].map(city => (
                     <div key={city} className="p-4 rounded-xl bg-white/5 border border-white/5 font-bold text-slate-300">{city}</div>
                   ))}
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h2 className="text-3xl font-bold">The Scarcity Matrix</h2>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      Skills with high demand but low qualified candidate density. These roles currently move 3x faster through the HireX pipeline.
                    </p>
                    <div className="space-y-4">
                      {["Vector Database Indexing", "Next.js Parallel Routing", "Distributed SQL Tuning", "LLM Fine-tuning"].map(skill => (
                        <div key={skill} className="flex items-center gap-3 text-slate-300">
                          <Zap className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="font-medium">{skill}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="p-8 rounded-[2rem] bg-gradient-to-br from-emerald-600/10 to-blue-600/10 border border-white/10 text-center">
                    <PieChart className="w-16 h-16 text-emerald-400/50 mx-auto mb-6" />
                    <h4 className="text-xl font-bold mb-2">Hiring Velocity</h4>
                    <p className="text-slate-400 text-sm mb-6">AI-verified candidates are 60% more likely to be fast-tracked.</p>
                    <button className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg shadow-emerald-900/20">Access Full Report</button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Call to Action - FIXED BUTTON TEXT & POPUP */}
          <div className="mt-20 max-w-4xl mx-auto p-8 rounded-[2rem] bg-emerald-600 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-emerald-900/40 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-xl md:text-2xl font-bold mb-1">Get custom market intelligence?</h3>
              <p className="text-emerald-100 text-sm">Request a deep-dive report for your specific technical domain.</p>
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="relative z-10 whitespace-nowrap px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-emerald-50 transition-all flex items-center gap-2 shadow-xl hover:scale-105"
            >
               Request Report <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>

      {/* WHATSAPP POPUP MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-emerald-500/30 rounded-[2.5rem] overflow-hidden shadow-[0_0_50px_rgba(16,185,129,0.2)]">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors bg-white/5 rounded-full">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8 md:p-10">
              <div className="mb-8 text-center">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-emerald-500/20">
                  <Briefcase className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Request Intelligence</h3>
                <p className="text-slate-400 text-sm mt-1">Submit details to connect via WhatsApp</p>
              </div>

              <form onSubmit={handleWhatsAppSubmit} className="space-y-4">
                <div className="relative">
                  <User className="absolute left-4 top-4 text-slate-500 w-4 h-4" />
                  <input 
                    required type="text" placeholder="Your Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm focus:border-emerald-500 outline-none w-full"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Building2 className="absolute left-4 top-4 text-slate-500 w-4 h-4" />
                  <input 
                    required type="text" placeholder="Company Name"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm focus:border-emerald-500 outline-none w-full"
                    value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                  />
                </div>
                <div className="relative">
                  <Zap className="absolute left-4 top-4 text-slate-500 w-4 h-4" />
                  <input 
                    required type="text" placeholder="Tech Domain (e.g. AI, Backend)"
                    className="bg-white/5 border border-white/10 rounded-xl p-4 pl-12 text-sm focus:border-emerald-500 outline-none w-full"
                    value={formData.domain} onChange={e => setFormData({...formData, domain: e.target.value})}
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/40 mt-6"
                >
                  Send to Owner <Send className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 uppercase tracking-widest font-mono mt-4">Destination: +91 870023 6923</p>
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
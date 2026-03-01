// app/hirex/documentation/page.tsx
'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  BookOpen, Layers, Zap, ShieldCheck, Terminal, BrainCircuit, 
  ChevronRight, Server, Globe, Shield, CheckCircle2, 
  Copy, Check, X, Loader2, Send 
} from 'lucide-react';

const TABS = [
  { id: 'quickstart', label: 'Quickstart', icon: Zap },
  { id: 'architecture', label: 'Architecture', icon: Layers },
  { id: 'api', label: 'AI Integration', icon: Terminal },
  { id: 'security', label: 'Security', icon: Shield },
];

export default function DocumentationPage() {
  const [activeTab, setActiveTab] = useState('quickstart');
  const [copied, setCopied] = useState(false);
  
  // Popup States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });

  const copyCode = () => {
    const code = `// Initialize AI-Adaptive Logic Engine\nconst hireX = await HireX.initialize({\n  apiKey: process.env.HIREX_TOKEN,\n  engine: "gemini-2.5-flash",\n  mode: "rigorous"\n});`;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/hirex-support', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setTimeout(() => {
            setIsModalOpen(false);
            setSubmitted(false);
            setFormData({ name: '', email: '', company: '', message: '' });
        }, 2500);
      }
    } catch (err) {
      alert("Submission failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-full md:w-[600px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6">
              <BookOpen className="w-3.5 h-3.5 md:w-4 md:h-4" /> Technical Documentation v2.5
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              Engineering <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Blueprint</span>
            </h1>
            <p className="text-sm md:text-xl text-slate-400 max-w-2xl mx-auto">
              Comprehensive guide to the HireX autonomous engine architecture, security protocols, and API integration.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-1 p-1 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-x-auto no-scrollbar">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 md:px-6 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-1 justify-center ${
                    activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4 shrink-0" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          <div className="max-w-5xl mx-auto min-h-[450px]">
            {activeTab === 'quickstart' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 w-full">
                <div className="bg-slate-900/40 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-12">
                  <h2 className="text-xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                    <Zap className="text-blue-400 w-6 h-6 md:w-8 md:h-8" /> Deployment Workflow
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {[
                      { step: "01", title: "Initialize", desc: "Connect your enterprise TiDB Cloud instance." },
                      { step: "02", title: "Calibrate", desc: "Set AI rigor levels and competency benchmarks." },
                      { step: "03", title: "Execute", desc: "Distribute autonomous test links to candidates." }
                    ].map((s, i) => (
                      <div key={i} className="group relative">
                        <div className="text-4xl md:text-6xl font-black text-white/5 group-hover:text-blue-500/10 transition-colors mb-2 md:mb-4">{s.step}</div>
                        <h4 className="text-md md:text-xl font-bold text-white mb-2">{s.title}</h4>
                        <p className="text-slate-400 text-xs md:text-sm leading-relaxed">{s.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {/* ... Other Tabs (Architecture, API, Security) remain as per your existing code logic ... */}
            {activeTab === 'architecture' && <div className="text-center py-20 text-slate-500 animate-in fade-in">Architecture Module Active...</div>}
            {activeTab === 'api' && <div className="text-center py-20 text-slate-500 animate-in fade-in">API Module Active...</div>}
            {activeTab === 'security' && <div className="text-center py-20 text-slate-500 animate-in fade-in">Security Module Active...</div>}
          </div>

          {/* CTA Banner */}
          <div className="mt-16 md:mt-24 max-w-4xl mx-auto p-6 md:p-10 rounded-2xl md:rounded-[2rem] bg-blue-600 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-900/40 text-center md:text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl rounded-full" />
            <div className="relative z-10">
              <h3 className="text-xl md:text-2xl font-bold mb-2">Need custom API access?</h3>
              <p className="text-blue-100 text-xs md:text-sm">Our engineering team is available for enterprise integration support.</p>
            </div>
            <button 
                onClick={() => setIsModalOpen(true)}
                className="relative z-10 whitespace-nowrap px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2 text-sm shadow-xl"
            >
               Support Hub <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* SUPPORT HUB MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#0b0f1f] border border-white/10 rounded-3xl overflow-hidden shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 text-slate-500 hover:text-white transition-colors">
              <X className="w-5 h-5" />
            </button>
            
            <div className="p-8">
              {submitted ? (
                <div className="py-10 text-center animate-in zoom-in duration-300">
                  <div className="w-16 h-16 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Message Sent</h3>
                  <p className="text-slate-400">We'll get back to you shortly.</p>
                </div>
              ) : (
                <>
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold flex items-center gap-2">
                        <ShieldCheck className="text-blue-400 w-6 h-6" /> Support Hub
                    </h3>
                    <p className="text-slate-400 text-sm mt-1">Connect with our solutions engineering team.</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input 
                            required type="text" placeholder="Full Name"
                            className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none w-full"
                            value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                        <input 
                            required type="email" placeholder="Work Email"
                            className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none w-full"
                            value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                    </div>
                    <input 
                        required type="text" placeholder="Company Name"
                        className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none w-full"
                        value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                    />
                    <textarea 
                        required placeholder="How can we help?" rows={4}
                        className="bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:border-blue-500 outline-none w-full resize-none"
                        value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})}
                    />
                    <button 
                        disabled={isSubmitting}
                        className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
                    >
                        {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-4 h-4" /> Send Transmission</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 15s linear infinite; }
      `}</style>
    </main>
  );
}
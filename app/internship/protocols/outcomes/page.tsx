'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { 
  TrendingUp, Target, Zap, ArrowUpRight, Globe, Briefcase,
  Trophy, PieChart, X, Download, MessageSquare, Lock, CheckCircle2, Brain, KeySquare, ShieldCheck
} from 'lucide-react';

export default function CareerOutcomes() {
  const [currentSalary, setCurrentSalary] = useState(6);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  
  const projectedSalary = currentSalary * 2.8;

  // --- CONFIGURATION ---
  const OWNER_WHATSAPP = "919810984968"; // Aapka Number
  const SECRET_CODE = "CLC-2026"; // Code jo aap user ko doge

  // --- LOGIC: WHATSAPP MESSAGE (UPDATED) ---
  const handleWhatsAppRequest = () => {
    // Message ab bilkul clear hai "Request Code" ke liye
    const msg = `Hello Career Lab Team 👋\n\n` +
      `I want to download my Verified Career Roadmap.\n` +
      `My Current Salary: ${currentSalary} LPA\n` +
      `Projected Target: ${projectedSalary.toFixed(1)} LPA\n\n` +
      `*PLEASE SEND ME THE ACCESS CODE* to unlock the PDF download.`;
      
    window.open(`https://wa.me/${OWNER_WHATSAPP}?text=${encodeURIComponent(msg)}`, '_blank');
  };

  const checkCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.toUpperCase();
    setVerificationCode(val);
    if (val === SECRET_CODE) {
      setIsVerified(true);
    }
  };

  const handleDownload = () => {
    // Replace with actual PDF path
    const pdfUrl = "/roadmaps/ai-career-roadmap.pdf";
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = `Career_Lab_Roadmap_${projectedSalary.toFixed(1)}LPA.pdf`;
    link.click();
  };

  const successMetrics = [
    { label: "Avg Salary Hike", val: "180%", icon: <TrendingUp className="text-emerald-500" /> },
    { label: "Placement Rate", val: "94%", icon: <Target className="text-blue-500" /> },
    { label: "Partner Companies", val: "500+", icon: <Briefcase className="text-purple-500" /> },
    { label: "Highest Package", val: "72 LPA", icon: <Trophy className="text-amber-500" /> },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-emerald-500/30 overflow-x-hidden font-sans">
      <B2CHeader />

      {/* --- HERO SECTION --- */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-emerald-600/10 blur-[150px] rounded-full" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-md">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">ROI Analytics Engine</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.8]">
                CAREER <span className="text-emerald-500">OUTCOMES</span>
              </h1>
              <p className="text-slate-400 text-lg md:text-xl font-medium max-w-xl">
                We engineer high-performance career pivots. See the statistical impact of Career Lab.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {successMetrics.map((stat, i) => (
                  <div key={i} className="p-6 rounded-[2rem] bg-white/[0.02] border border-white/5 group hover:border-emerald-500/30 transition-all">
                    <div className="mb-4">{stat.icon}</div>
                    <div className="text-3xl font-black mb-1">{stat.val}</div>
                    <div className="text-[10px] text-slate-500 uppercase font-black tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* --- SALARY MULTIPLIER CALCULATOR --- */}
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 blur-[80px] rounded-full" />
              <div className="relative bg-[#0a0f1d] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
                <h3 className="text-2xl font-black uppercase italic mb-10 flex items-center gap-3">
                  <PieChart className="text-emerald-500" /> Salary Multiplier
                </h3>
                <div className="space-y-12">
                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <span className="text-xs font-black uppercase tracking-widest text-slate-500">Current Salary</span>
                      <span className="text-2xl font-black text-white">{currentSalary} LPA</span>
                    </div>
                    <input 
                      type="range" min="3" max="30" value={currentSalary}
                      onChange={(e) => setCurrentSalary(parseInt(e.target.value))}
                      className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                    />
                  </div>
                  <div className="pt-8 border-t border-white/5">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-500 mb-2">Projected CLC Outcome</div>
                    <div className="text-6xl md:text-7xl font-black italic tracking-tighter text-white">
                      {projectedSalary.toFixed(1)} <span className="text-2xl">LPA</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsPopupOpen(true)}
                    className="w-full py-5 bg-emerald-600 hover:bg-white hover:text-black transition-all rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-emerald-600/20"
                  >
                    Get Verified Roadmap <ArrowUpRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- VERIFICATION POPUP (MODAL) --- */}
      {mounted && isPopupOpen && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-[#020617]/95 backdrop-blur-xl" onClick={() => setIsPopupOpen(false)} />
          <div className="relative w-full max-w-lg bg-[#0a0f1d] border border-emerald-500/20 rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
            
            {/* Close Button */}
            <button onClick={() => setIsPopupOpen(false)} className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors">
              <X size={20} />
            </button>

            <div className="p-8 md:p-10 space-y-6">
              {/* Header */}
              <div className="text-center">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors ${isVerified ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-500'}`}>
                  {isVerified ? <CheckCircle2 size={32} /> : <ShieldCheck size={32} />}
                </div>
                <h3 className="text-2xl font-black uppercase italic tracking-tighter">
                  {isVerified ? "Access Granted" : "Roadmap Verification"}
                </h3>
                <p className="text-slate-400 text-xs mt-2 font-medium">
                  {isVerified ? "Download ready for your device." : `Secure download for ${projectedSalary.toFixed(1)} LPA projection.`}
                </p>
              </div>

              {/* Logic: Verified vs Unverified */}
              {!isVerified ? (
                <div className="space-y-5">
                  {/* Step 1: WhatsApp Button */}
                  <button 
                    onClick={handleWhatsAppRequest}
                    className="w-full py-4 bg-emerald-600/10 border border-emerald-500/50 hover:bg-emerald-600 hover:text-white transition-all rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center justify-center gap-3 text-emerald-400"
                  >
                    <MessageSquare size={16} /> Request Access Code (WhatsApp)
                  </button>

                  {/* Step 2: Input Field */}
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-500 transition-colors">
                      <KeySquare size={18} />
                    </div>
                    <input 
                      type="text"
                      placeholder="ENTER ACCESS CODE HERE"
                      value={verificationCode}
                      onChange={checkCode}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-xs font-black tracking-widest focus:border-emerald-500/50 focus:bg-white/10 outline-none transition-all placeholder:text-slate-600"
                    />
                  </div>
                  <p className="text-[9px] text-center text-slate-600 font-bold uppercase tracking-wider">
                    Enter the code received on WhatsApp to unlock
                  </p>
                </div>
              ) : (
                /* Step 3: Download Button (Unlocked) */
                <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2">
                  <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-xl text-center">
                    <p className="text-emerald-400 text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2">
                      <CheckCircle2 size={14} /> Code Verified Successfully
                    </p>
                  </div>
                  <button 
                    onClick={handleDownload}
                    className="w-full py-5 bg-white text-black hover:bg-emerald-400 hover:text-black transition-all rounded-xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-white/10"
                  >
                    <Download size={18} /> Download Verified PDF
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      , document.body)}

      {/* --- OUTCOME CARDS --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Global Mobility", desc: "12% secured O-1/H1-B roles.", icon: <Globe className="text-blue-500" /> },
            { title: "Web3 Mastery", desc: "Grants from Ethereum Foundation.", icon: <Zap className="text-amber-500" /> },
            { title: "AI Specialist", desc: "Average AI salary: 24 LPA.", icon: <Brain className="text-emerald-500" /> }
          ].map((card, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] border border-white/5 bg-gradient-to-b from-white/[0.03] to-transparent group hover:border-emerald-500/20 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {card.icon}
              </div>
              <h3 className="text-xl font-black uppercase italic mb-3">{card.title}</h3>
              <p className="text-slate-500 text-sm font-medium leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
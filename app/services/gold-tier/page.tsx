"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Trophy, 
  Zap, 
  Crown, 
  CheckCircle2, 
  BarChart3, 
  ArrowRight,
  ShieldCheck,
  Users,
  MessageSquare,
  Cpu
} from 'lucide-react';
import Link from 'next/link';

const GoldTierPage = () => {
  const goldBenefits = [
    {
      title: "Priority Engineering",
      desc: "Dedicated 100 hours/month. Aapki requests backlog mein nahi, seedhe execution queue mein jati hain.",
      icon: <Cpu className="text-amber-400" />
    },
    {
      title: "1-Hour Critical Response",
      desc: "Emergency situations ke liye hamara response time 1 ghante se bhi kam hai. 24/7/365 coverage.",
      icon: <Zap className="text-amber-400" />
    },
    {
      title: "Dedicated Lead Architect",
      desc: "Ek senior architect jo aapke long-term technical roadmap aur scaling strategy ko lead karega.",
      icon: <Users className="text-amber-400" />
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-amber-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(245,158,11,0.12)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-8 backdrop-blur-xl">
              <Crown size={14} className="text-amber-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200">High-Performance Tier</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Gold <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-500 to-amber-600 italic font-black">Velocity.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Uptime is revenue. Gold Tier aapko wahi reliability aur speed deta hai jo industry leaders demand karte hain. Scaling without the friction.
            </p>
            <Link 
              href="/contact"
              className="bg-gradient-to-r from-amber-600 to-yellow-500 hover:scale-105 text-black px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-amber-500/20"
            >
              Secure Gold Access <ArrowRight size={16} />
            </Link>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-amber-500/10 blur-3xl rounded-full"></div>
            <div className="relative p-1 bg-gradient-to-br from-amber-400/40 to-transparent rounded-[3rem]">
              <div className="bg-slate-950 p-10 rounded-[2.8rem] border border-white/5">
                <div className="flex justify-between items-center mb-10">
                   <div className="h-8 w-8 bg-amber-500/20 rounded-full flex items-center justify-center">
                      <Trophy size={16} className="text-amber-500" />
                   </div>
                   <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest">SLA_Tier: Priority_1</span>
                </div>
                <div className="space-y-6">
                   <div className="bg-white/5 p-4 rounded-2xl border border-white/5">
                      <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Queue Placement</p>
                      <p className="text-xl font-black text-amber-400 italic">TOP OF STACK</p>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl">
                         <p className="text-[9px] text-slate-500 uppercase font-bold">Uptime SLA</p>
                         <p className="text-lg font-black italic">99.99%</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl">
                         <p className="text-[9px] text-slate-500 uppercase font-bold">Response</p>
                         <p className="text-lg font-black italic">&lt; 60m</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic text-center">Standard vs Gold Benchmark</h2>
          <div className="mt-24 grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Direct Slack Access", icon: <MessageSquare />, val: "Enabled" },
              { label: "Security Audits", icon: <ShieldCheck />, val: "Bi-Weekly" },
              { label: "Dev Hours", icon: <BarChart3 />, val: "100 hrs+" },
              { label: "Review Meetings", icon: <Users />, val: "Weekly" }
            ].map((stat, i) => (
              <div key={i} className="text-center group p-6 rounded-3xl hover:bg-white/[0.02] transition-all">
                <div className="text-amber-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                <h4 className="text-lg font-black italic mb-1 uppercase tracking-tight">{stat.val}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {goldBenefits.map((benefit, i) => (
            <div key={i} className="group p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-amber-500/30 transition-all text-center md:text-left">
              <div className="mb-6 bg-amber-500/10 w-fit p-4 rounded-2xl mx-auto md:mx-0 group-hover:bg-amber-500 group-hover:text-black transition-all">
                {benefit.icon}
              </div>
              <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tighter">{benefit.title}</h3>
              <p className="text-slate-400 font-light leading-relaxed text-sm">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-amber-600/20 via-slate-900/50 to-slate-950 border border-amber-500/20 text-center relative overflow-hidden shadow-2xl">
          <div className="relative z-10">
            <Crown className="mx-auto text-amber-500 mb-8" size={60} />
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-10 leading-[0.85]">
              Elite Support <br /> For <span className="text-amber-500">Industry Leaders.</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto italic font-light">"Gold Tier isn't just a package; it's a technical partnership designed to win."</p>
            <Link 
              href="/contact"
              className="inline-block bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-white/10"
            >
              Apply for Gold Tier
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default GoldTierPage;
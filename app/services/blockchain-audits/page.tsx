"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  ShieldAlert, 
  Terminal, 
  FileCheck, 
  SearchCode, 
  Lock, 
  ChevronRight, 
  Bug, 
  Eye,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const BlockchainAudits = () => {
  const auditPhases = [
    { title: "Static Analysis", desc: "Automated scanning of codebase for known vulnerabilities like reentrancy and integer overflow.", icon: SearchCode },
    { title: "Manual Review", desc: "Line-by-line inspection by senior security researchers to detect logical flaws.", icon: Eye },
    { title: "Formal Verification", desc: "Mathematical proving of contract behavior against intended specifications.", icon: FileCheck },
    { title: "Reporting & Fixes", desc: "Comprehensive PDF report with severity rankings and re-audit of applied patches.", icon: ShieldCheck }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(37,99,235,0.1)_0%,_transparent_70%)] -z-10"></div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 italic">Audit Protocol Active</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Smart Contract <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-500 italic font-black">Security Audit.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Eliminate critical vulnerabilities before deployment. Our team of security researchers provides deep-layer audits for Solidity, Rust, and Move-based protocols.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={() => window.location.href = '/contact'}
                className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-blue-600/20"
              >
                Request Quote <ArrowRight size={16} />
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-950 border border-white/10 rounded-[2rem] p-6 font-mono text-sm overflow-hidden">
               <div className="flex gap-2 mb-4 border-b border-white/5 pb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/40"></div>
               </div>
               <div className="space-y-1 text-slate-500">
                 <p><span className="text-blue-400">function</span> <span className="text-emerald-400">withdraw</span>(uint _amount) <span className="text-blue-400">public</span> &#123;</p>
                 <p className="pl-4 text-red-400/80 bg-red-500/5 line-through">require(balances[msg.sender] &gt;= _amount);</p>
                 <p className="pl-4 text-emerald-400 bg-emerald-500/5">// Optimized for Reentrancy protection</p>
                 <p className="pl-4">uint bal = balances[msg.sender];</p>
                 <p className="pl-4">balances[msg.sender] -= _amount;</p>
                 <p className="pl-4 text-blue-400">(bool success, ) = msg.sender.call&#123;value: _amount&#125;("");</p>
                 <p>&#125;</p>
               </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
           {[
             { label: "High Severity", val: "0", color: "text-red-500" },
             { label: "Medium Severity", val: "0", color: "text-yellow-500" },
             { label: "Gas Optimizations", val: "14", color: "text-blue-500" },
             { label: "Informational", val: "3", color: "text-slate-500" }
           ].map((stat, i) => (
             <div key={i} className="text-center">
                <p className={`text-4xl md:text-5xl font-black italic mb-2 ${stat.color}`}>{stat.val}</p>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">{stat.label}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-20">
            <div>
               <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-4 italic">The Methodology</h2>
               <h3 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter">Rigorous. Deep. <br /> <span className="text-slate-500">Immutable.</span></h3>
            </div>
            <p className="max-w-sm text-slate-500 text-sm font-light">We follow a dual-track auditing process combining automated symbolic execution with manual adversarial testing.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6">
            {auditPhases.map((phase, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-900/20 border border-white/5 hover:border-blue-500/20 transition-all flex gap-8">
                <div className="p-4 bg-white/5 rounded-2xl h-fit text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {React.createElement(phase.icon, { size: 28 })}
                </div>
                <div>
                   <h4 className="text-xl font-black uppercase italic mb-3 tracking-tight">{phase.title}</h4>
                   <p className="text-slate-500 text-sm leading-relaxed font-light group-hover:text-slate-300 transition-colors">{phase.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-gradient-to-b from-transparent to-blue-900/10">
        <div className="max-w-4xl mx-auto text-center">
          <Bug className="mx-auto text-red-500 mb-8 animate-bounce" size={48} />
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-10 leading-none">
            Don't Get <span className="text-red-500">Exploited.</span>
          </h2>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto italic tracking-wide font-light">"A single reentrancy flaw can empty a pool in blocks. Secure your protocol today."</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
               onClick={() => window.location.href = '/contact'}
               className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all"
            >
              Start Secure Audit
            </button>
            <button className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
              View Sample Report
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlockchainAudits;
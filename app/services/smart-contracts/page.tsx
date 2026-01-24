"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Code2, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Repeat, 
  ArrowRight,
  Database,
  Trophy,
  Activity,
  Layers,
  Terminal
} from 'lucide-react';

const SmartContractsPage = () => {
  const stats = [
    { label: "Lines of Code Audited", value: "2.5M+" },
    { label: "Protocol TVL Secured", value: "$450M+" },
    { label: "Mainnet Deployments", value: "120+" },
    { label: "Gas Efficiency Gain", value: "35%" },
  ];

  const capabilities = [
    {
      title: "Solidity & Rust Engineering",
      desc: "High-performance contract development for EVM-based chains and Solana's high-throughput architecture.",
      icon: <Code2 />,
      img: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Automated Liquidity Logic",
      desc: "Architecting AMMs, flash loan execution, and sophisticated yield-farming strategies.",
      icon: <Activity />,
      img: "https://images.pexels.com/photos/6770610/pexels-photo-6770610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(37,99,235,0.12)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          <div className="w-full lg:w-3/5 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
              <Terminal size={14} className="text-blue-400" />
              <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-blue-200">Execution Layer v2.0</span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter uppercase leading-[0.9] mb-8">
              Code is Law. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 italic">Smart Contracts.</span>
            </h1>
            <p className="max-w-2xl mx-auto lg:mx-0 text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-10">
              Industrial-grade smart contract architecture for the decentralized economy. We build immutable, gas-optimized, and secure logic that powers global DeFi and RWA protocols.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button onClick={() => window.location.href = '/contact'} className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all transform hover:scale-105">
                Start Deployment <ArrowRight size={16} />
              </button>
              <button className="w-full sm:w-auto bg-white/5 border border-white/10 hover:bg-white/10 px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all">
                View GitHub
              </button>
            </div>
          </div>

          <div className="w-full lg:w-2/5 relative">
            <div className="relative z-10 rounded-[3rem] border border-white/10 bg-slate-900/50 backdrop-blur-2xl p-2 shadow-2xl">
              <img 
                src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Cyberpunk Tech" 
                className="rounded-[2.5rem] grayscale hover:grayscale-0 transition-all duration-700 object-cover h-[400px] w-full"
              />
              <div className="absolute -bottom-6 -right-6 md:-right-12 bg-blue-600 p-6 md:p-8 rounded-[2rem] shadow-xl">
                 <ShieldCheck size={40} className="text-white mb-2" />
                 <p className="text-[10px] font-black uppercase tracking-widest opacity-80">Security Grade</p>
                 <p className="text-2xl font-black italic">MIL-SPEC</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto bg-white/[0.02] border border-white/5 rounded-[2.5rem] md:rounded-full p-8 md:px-16 md:py-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-4 text-center">
            {stats.map((stat, i) => (
              <div key={i} className="space-y-1">
                <h4 className="text-3xl md:text-4xl font-black text-blue-500 tracking-tighter italic">{stat.value}</h4>
                <p className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <h2 className="text-xs font-black text-blue-500 uppercase tracking-[0.4em] mb-4">Our Expertise</h2>
              <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter">Engineered for <br /> <span className="text-slate-500">Unstoppable Logic.</span></h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {capabilities.map((cap, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[3rem] border border-white/5 bg-slate-900/40 hover:border-blue-500/30 transition-all duration-500">
                <div className="aspect-video overflow-hidden">
                  <img src={cap.img} alt={cap.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000 opacity-50" />
                </div>
                <div className="p-8 md:p-12">
                  <div className="mb-6 text-blue-500">{cap.icon}</div>
                  <h4 className="text-2xl font-black uppercase italic mb-4">{cap.title}</h4>
                  <p className="text-slate-400 font-light leading-relaxed mb-6">{cap.desc}</p>
                  <div className="h-px w-full bg-gradient-to-r from-blue-500/50 to-transparent mb-6"></div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Available for Mainnet</span>
                    <ArrowRight className="text-blue-500 group-hover:translate-x-2 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-blue-600/5 border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-xs font-black text-slate-500 uppercase tracking-[0.5em] mb-12">Production Stack</h2>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 items-center opacity-40">
            <img src="https://cryptologos.cc/logos/ethereum-eth-logo.png" className="h-8 md:h-12 grayscale brightness-200" alt="ETH" />
            <img src="https://cryptologos.cc/logos/solana-sol-logo.png" className="h-8 md:h-12 grayscale brightness-200" alt="SOL" />
            <img src="https://cryptologos.cc/logos/polygon-matic-logo.png" className="h-8 md:h-12 grayscale brightness-200" alt="Polygon" />
            <img src="https://cryptologos.cc/logos/avalanche-avax-logo.png" className="h-8 md:h-12 grayscale brightness-200" alt="AVAX" />
            <span className="text-xl font-black italic tracking-tighter">FOUNDRY</span>
            <span className="text-xl font-black italic tracking-tighter">HARDHAT</span>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600/20 via-slate-900/50 to-slate-950 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full"></div>
          <div className="relative z-10">
            <Trophy size={48} className="text-blue-500 mx-auto mb-8" />
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              Ready to <br /><span className="text-blue-500 underline underline-offset-8 decoration-white/10">Build the Future?</span>
            </h2>
            <p className="max-w-lg mx-auto text-slate-400 text-lg mb-12">
              Our architects are ready to transform your whitepaper into immutable production-grade code.
            </p>
            <button onClick={() => window.location.href = '/contact'} className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl">
              Book Architecture Call
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SmartContractsPage;
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Coins, 
  Landmark, 
  ShieldCheck, 
  BarChart3, 
  PieChart, 
  RefreshCcw, 
  ArrowRight,
  GanttChartSquare,
  Scale,
  Gem
} from 'lucide-react';

const TokenizationPage = () => {
  const tokenizationFlow = [
    { title: "Asset Valuation", desc: "Legal and financial audit of the underlying physical or digital asset.", icon: <Scale /> },
    { title: "Smart Contract Creation", desc: "Coding the logic for fractional ownership and automated dividends.", icon: <GanttChartSquare /> },
    { title: "Token Issuance", desc: "Minting security tokens on compliant protocols (ERC-3643 / ERC-1400).", icon: <Coins /> },
    { title: "Secondary Liquidity", desc: "Integration with decentralized exchanges for 24/7 trading.", icon: <RefreshCcw /> }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(59,130,246,0.1)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-xl">
            <Gem size={14} className="text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">Asset Liquidity Protocol</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase mb-10">
            Fractional <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-blue-500 to-indigo-700 italic">Tokenization.</span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-12">
            Unlock the value of illiquid assets. We convert Real Estate, IP, and Private Equity into compliant, tradeable digital tokens.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all">
              Launch Asset Node <ArrowRight size={16} />
            </button>
            <button className="bg-white/5 border border-white/10 hover:bg-white/10 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all">
              Download Framework
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="p-8 md:p-16 rounded-[3rem] bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter mb-8">Why Tokenize?</h2>
            <ul className="space-y-8">
              {[
                { t: "Global Capital Access", d: "Reach investors worldwide without geographic boundaries.", i: <Landmark /> },
                { t: "Automated Compliance", d: "KYC/AML checks baked directly into the smart contract.", i: <ShieldCheck /> },
                { t: "Lower Entry Barriers", d: "Fractionalize a $100M building into $100 investment units.", i: <PieChart /> }
              ].map((item, idx) => (
                <li key={idx} className="flex gap-6 group">
                  <div className="text-blue-500 group-hover:scale-110 transition-transform">{item.i}</div>
                  <div>
                    <h4 className="font-bold text-lg uppercase italic">{item.t}</h4>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative aspect-square rounded-[3rem] overflow-hidden border border-white/5 grayscale hover:grayscale-0 transition-all duration-1000">
             <img 
               src="https://images.pexels.com/photos/7567443/pexels-photo-7567443.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
               alt="Digital Finance" 
               className="w-full h-full object-cover opacity-50"
             />
             <div className="absolute inset-0 bg-gradient-to-t from-[#020617] to-transparent"></div>
             <div className="absolute bottom-12 left-12 right-12">
                <div className="p-6 rounded-3xl bg-black/60 backdrop-blur-xl border border-white/10">
                   <div className="flex justify-between items-center mb-4">
                      <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Live_Mint_Tracker</span>
                      <span className="text-[10px] text-emerald-500 font-mono">● Active</span>
                   </div>
                   <div className="space-y-2">
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-500 w-2/3 animate-pulse"></div>
                      </div>
                      <p className="text-[10px] text-slate-500 font-mono italic">AssetID: RWA-7729 | 67% Fractionalized</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-20 italic">The Tokenization Workflow</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tokenizationFlow.map((step, i) => (
              <div key={i} className="relative p-8 rounded-3xl bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all">
                <div className="text-blue-500 mb-6 font-mono text-3xl">0{i+1}</div>
                <div className="mb-6 p-3 bg-blue-500/10 rounded-xl w-fit text-blue-400">{step.icon}</div>
                <h3 className="text-xl font-bold uppercase italic mb-3">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <BarChart3 className="mx-auto text-blue-500 mb-8" size={48} />
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-10 leading-none">
            Turn Equity <br /> Into <span className="text-blue-600">Liquidity.</span>
          </h2>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto">Ready to tokenize your portfolio? Our legal and technical team is ready to deploy your asset node.</p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all"
          >
            Start Valuation
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TokenizationPage;
'use client';

import React from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { Globe, Cpu, Zap, Shield, Link as LinkIcon, Layers, ArrowUpRight, Coins, Repeat, Share2, Hexagon } from 'lucide-react';

export default function InternXWeb3() {
  const web3Pillars = [
    { icon: <Coins className="w-6 h-6" />, title: "Tokenomics", desc: "Design sustainable economy models for decentralized protocols." },
    { icon: <Repeat className="w-6 h-6" />, title: "DEX Protocol", desc: "Building automated market makers and liquidity pools." },
    { icon: <Shield className="w-6 h-6" />, title: "DAO Governance", desc: "Community-driven decision making via smart voting systems." },
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-blue-600/30 overflow-x-hidden">
      <B2CHeader />

      {/* --- HERO SECTION: SPLIT LAYOUT --- */}
      <section className="relative pt-32 pb-16 md:pt-48 md:pb-32 px-4 md:px-6">
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-full max-w-[600px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none opacity-60" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 md:gap-20">
            
            {/* LEFT CONTENT: TEXT & CTA */}
            <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-3xl mx-auto lg:mx-0">
                <LinkIcon className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-300">Web 3.0 Protocol Live</span>
              </div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-[-0.05em] leading-[0.9] uppercase">
                OWN THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-300 to-indigo-400 italic font-black">INTERNET</span>
              </h1>

              <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Build decentralized applications that are permissionless, trustless, and fully owned by the community.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
                <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 group">
                  Enter Metaverse <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-10 py-5 border border-white/10 hover:bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest transition-all">
                  Ecosystem
                </button>
              </div>
            </div>

            {/* RIGHT CONTENT: THE VISUAL ELEMENT (FIXED EMPTY SPACE) */}
            <div className="w-full lg:w-1/2 relative flex justify-center items-center">
              <div className="relative w-full max-w-[500px] aspect-square flex items-center justify-center">
                {/* Rotating Hexagon Background */}
                <div className="absolute inset-0 border border-blue-500/10 rounded-[4rem] rotate-6 animate-pulse" />
                <div className="absolute inset-10 border border-white/5 rounded-[3rem] -rotate-3" />
                
                {/* Floating Web3 Cards */}
                <div className="relative z-10 space-y-4 w-full px-6">
                  <div className="bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl translate-x-4 md:translate-x-8 hover:-translate-y-1 transition-transform shadow-2xl">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400"><Share2 className="w-5 h-5" /></div>
                      <span className="text-xs font-black uppercase tracking-widest">Smart_Contract.sol</span>
                    </div>
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full w-[80%] bg-blue-600" />
                    </div>
                  </div>

                  <div className="bg-blue-600 p-6 rounded-3xl -translate-x-4 md:-translate-x-8 hover:-translate-y-1 transition-transform shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
                    <div className="flex justify-between items-center text-white">
                      <span className="font-black italic text-xl uppercase tracking-tighter">Live Nodes</span>
                      <Hexagon className="w-6 h-6 animate-spin-slow" />
                    </div>
                    <div className="mt-4 text-4xl font-black tracking-tighter">12,842</div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BENTO GRID SECTION --- */}
      <section className="py-20 px-4 md:px-6 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          
          <div className="md:col-span-8 p-10 bg-[#050505] border border-white/5 rounded-[3rem] group hover:border-blue-500/30 transition-all min-h-[350px] relative overflow-hidden">
             <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe className="w-64 h-64 text-white" />
             </div>
             <div className="relative z-10">
                <Layers className="w-12 h-12 text-blue-500 mb-8" />
                <h3 className="text-3xl md:text-5xl font-black uppercase italic mb-4">Permissionless</h3>
                <p className="text-slate-500 text-lg max-w-sm">No gatekeepers. Just pure code execution on a global scale.</p>
             </div>
          </div>

          <div className="md:col-span-4 p-10 bg-gradient-to-br from-indigo-700 to-blue-800 rounded-[3rem] flex flex-col justify-between shadow-2xl">
             <Zap className="w-12 h-12 text-white fill-current animate-pulse" />
             <h3 className="text-3xl font-black text-white uppercase italic">Fast<br/>Finality</h3>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
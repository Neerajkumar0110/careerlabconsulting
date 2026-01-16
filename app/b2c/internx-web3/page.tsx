'use client';

import React from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { Link as LinkIcon, ArrowUpRight, Coins, Repeat, Shield, Globe, Layers, Hexagon, Activity } from 'lucide-react';

export default function InternXWeb3() {
  const web3Pillars = [
    { icon: <Coins />, title: "Tokenomics", desc: "Design sustainable economy models for protocols." },
    { icon: <Repeat />, title: "DEX Protocol", desc: "Building automated market makers & liquidity pools." },
    { icon: <Shield />, title: "DAO Governance", desc: "Community-driven decision making via smart voting." },
  ];

  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-blue-600/30 overflow-x-hidden font-sans">
      <B2CHeader />

      {/* --- HERO SECTION: BALANCED LAYOUT --- */}
      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-4 md:px-6">
        {/* Glow behind text */}
        <div className="absolute top-0 left-0 w-full max-w-[500px] h-[500px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none opacity-50" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            
            {/* LEFT: CONTENT (Responsive Text) */}
            <div className="w-full lg:w-[55%] text-center lg:text-left space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-3xl mx-auto lg:mx-0">
                <LinkIcon className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.25em] text-blue-300">Web 3.0 Protocol Live</span>
              </div>

              <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-[-0.05em] leading-[0.9] uppercase">
                OWN THE <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-blue-300 to-indigo-400 italic">INTERNET</span>
              </h1>

              <p className="text-slate-400 text-lg md:text-xl max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed">
                Build decentralized applications that are permissionless, trustless, and fully owned by the community.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <button className="w-full sm:w-auto px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 group">
                  Enter Metaverse <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-10 py-5 border border-white/10 hover:bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest transition-all">
                  Ecosystem
                </button>
              </div>
            </div>

            {/* RIGHT: DYNAMIC VISUAL (Fills the gap) */}
            <div className="w-full lg:w-[45%] relative hidden md:flex justify-center items-center">
              <div className="relative w-full max-w-[450px] aspect-square">
                {/* Background Shapes */}
                <div className="absolute inset-0 border border-blue-500/10 rounded-[4rem] rotate-12 animate-pulse" />
                <div className="absolute inset-4 border border-white/5 rounded-[3.5rem] -rotate-6" />
                
                {/* Floating Stats Card 1 */}
                <div className="absolute top-10 -left-10 bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-2xl z-20 hover:-translate-y-2 transition-transform duration-500">
                  <div className="flex items-center gap-3 mb-4">
                    <Activity className="w-5 h-5 text-blue-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-50">Network Load</span>
                  </div>
                  <div className="text-3xl font-black tracking-tighter">98.2%</div>
                </div>

                {/* Floating Node Card 2 */}
                <div className="absolute bottom-10 -right-4 bg-blue-600 p-8 rounded-[2.5rem] shadow-[0_20px_60px_rgba(37,99,235,0.4)] z-30 group cursor-default">
                  <div className="flex justify-between items-start gap-12 text-white">
                    <span className="font-black italic text-2xl uppercase tracking-tighter">Live<br/>Nodes</span>
                    <Hexagon className="w-8 h-8 animate-spin-slow" />
                  </div>
                  <div className="mt-6 text-5xl font-black tracking-tighter text-white">24.8K</div>
                </div>

                {/* Center Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                   <Globe className="w-32 h-32 text-blue-500/20 animate-pulse" />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- BENTO FEATURES --- */}
      <section className="py-20 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 p-10 bg-[#050505] border border-white/5 rounded-[3rem] group hover:border-blue-500/30 transition-all min-h-[350px] relative overflow-hidden flex flex-col justify-between">
             <div className="absolute right-0 bottom-0 opacity-5 group-hover:opacity-10 transition-opacity">
                <Globe className="w-64 h-64 text-white" />
             </div>
             <Layers className="w-12 h-12 text-blue-500 mb-8" />
             <div>
                <h3 className="text-3xl md:text-5xl font-black uppercase italic mb-4 leading-none">Permissionless<br/>Protocol</h3>
                <p className="text-slate-500 text-lg max-w-sm">No gatekeepers. Just pure code execution on a global scale.</p>
             </div>
          </div>

          <div className="md:col-span-4 p-10 bg-gradient-to-br from-indigo-700 to-blue-800 rounded-[3rem] flex flex-col justify-between shadow-2xl group hover:scale-[0.98] transition-transform">
             <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
               <Activity className="w-8 h-8 text-white animate-pulse" />
             </div>
             <h3 className="text-3xl font-black text-white uppercase italic leading-tight">Hyper<br/>Speed L2</h3>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
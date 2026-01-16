'use client';

import React from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { Box, Layers, Share2, Shield, Rocket, Database, Code, Globe, Link as LinkIcon, Activity } from 'lucide-react';

export default function InternXBlockchain() {
  const ledgerSteps = [
    { icon: <Code className="w-5 h-5" />, title: "Smart Contracts", status: "Verified", info: "Solidity / Rust" },
    { icon: <Database className="w-5 h-5" />, title: "Node Validation", status: "Syncing", info: "P2P Network" },
    { icon: <Layers className="w-5 h-5" />, title: "Tokenomics", status: "Active", info: "ERC-20 / SPL" },
    { icon: <Share2 className="w-5 h-5" />, title: "dApp Protocol", status: "Deployed", info: "Web3 Stack" },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 overflow-x-hidden">
      <B2CHeader />

      {/* --- HERO SECTION: DECENTRALIZED HUB --- */}
      <section className="relative pt-32 pb-20 lg:pt-52 lg:pb-32 px-6">
        {/* Blockchain Floating Elements (Pseudo-background) */}
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-blue-600/10 blur-[120px] rounded-full pointer-events-none animate-pulse" />
        <div className="absolute bottom-10 left-[5%] w-72 h-72 bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div className="text-left space-y-8 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-500/30 bg-blue-500/10 backdrop-blur-xl">
                <Activity className="w-3 h-3 text-blue-400" />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-300">
                  Mainnet Connection: Stable
                </span>
              </div>
              
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase">
                Block<span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600 italic">chain</span><br/>
                Systems
              </h1>
              
              <p className="text-slate-400 text-lg md:text-xl max-w-xl leading-relaxed font-medium">
                The future is decentralized. Master the architecture of trust through distributed ledgers, cryptographically secure smart contracts, and Web3 infrastructure.
              </p>
              
              <div className="flex flex-wrap gap-5 pt-4">
                <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 flex items-center gap-3 group">
                  Start Building <Rocket className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                <button className="px-10 py-5 border border-white/10 hover:bg-white/5 text-white rounded-2xl font-black uppercase tracking-widest transition-all flex items-center gap-2">
                  Whitepaper <LinkIcon className="w-4 h-4 text-slate-500" />
                </button>
              </div>
            </div>

            {/* Visual Center: Block Ledger HUD */}
            <div className="relative group order-1 lg:order-2">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-purple-600/20 blur-2xl rounded-[3rem] opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative bg-[#0a1229]/90 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-8 md:p-10 overflow-hidden shadow-2xl">
                <div className="flex items-center justify-between mb-8">
                  <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Live_Ledger_Feed</span>
                  <div className="flex gap-1">
                    {[1,2,3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-blue-500/40" />)}
                  </div>
                </div>

                <div className="space-y-4">
                  {ledgerSteps.map((step, i) => (
                    <div key={i} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl hover:border-blue-500/40 transition-all group/item">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 group-hover/item:scale-110 transition-transform">
                          {step.icon}
                        </div>
                        <div>
                          <div className="text-[11px] font-black uppercase tracking-wider text-slate-200">{step.title}</div>
                          <div className="text-[9px] font-bold text-slate-500 uppercase">{step.info}</div>
                        </div>
                      </div>
                      <span className="text-[8px] font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded border border-blue-500/20">
                        {step.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- CORE PILLARS: BENTO STYLE --- */}
      <section className="py-24 px-6 relative border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Pillar 1 */}
            <div className="p-10 bg-[#0a1229]/40 border border-white/5 rounded-[3rem] hover:border-blue-500/30 transition-all group relative overflow-hidden">
               <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Shield className="w-40 h-40 text-blue-500" />
               </div>
               <h3 className="text-2xl font-black mb-4 uppercase italic">Immutable Security</h3>
               <p className="text-slate-500 text-sm leading-relaxed font-medium">Leverage the power of cryptographic hashing to ensure that data once written can never be altered or deleted.</p>
            </div>

            {/* Pillar 2 - Highlighted */}
            <div className="p-10 bg-blue-600 rounded-[3rem] shadow-2xl shadow-blue-600/30 group hover:-translate-y-2 transition-all">
               <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-8">
                  <Globe className="w-7 h-7 text-white" />
               </div>
               <h3 className="text-2xl font-black mb-4 uppercase italic text-white">Consensus Protocols</h3>
               <p className="text-blue-100 text-sm leading-relaxed font-medium">Master PoW, PoS, and Directed Acyclic Graphs (DAGs) to build scalable and efficient distributed networks.</p>
            </div>

            {/* Pillar 3 */}
            <div className="p-10 bg-[#0a1229]/40 border border-white/5 rounded-[3rem] hover:border-blue-500/30 transition-all group relative overflow-hidden">
               <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Box className="w-40 h-40 text-blue-500" />
               </div>
               <h3 className="text-2xl font-black mb-4 uppercase italic text-white">Hyperledger & EVM</h3>
               <p className="text-slate-500 text-sm leading-relaxed font-medium">Build enterprise-grade private blockchains or public dApps compatible with the Ethereum Virtual Machine.</p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
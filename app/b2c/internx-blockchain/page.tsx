'use client';

import React from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import { Box, ArrowRight, Cpu, Layers, Link as LinkIcon, Lock, Globe, Database, Zap } from 'lucide-react';

export default function InternXBlockchain() {
  return (
    <main className="min-h-screen bg-[#000000] text-white selection:bg-blue-500/30">
      <B2CHeader />

      <section className="relative pt-40 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-8 rounded-full border border-blue-500/20 bg-blue-500/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Mainnet v4.0 Active</span>
          </div>

          <h1 className="text-4xl md:text-9xl font-black tracking-tighter leading-none mb-8">
            DECENTRALIZED<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/40 italic">FUTURE</span>
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 font-medium">
            Building the infrastructure for the next generation of the web. 
            Secure, scalable, and fully transparent blockchain solutions.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black uppercase tracking-widest transition-all flex items-center justify-center gap-3">
              Explore Network <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-12 py-5 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-2xl font-black uppercase tracking-widest transition-all">
              Documentation
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-12 bg-gradient-to-br from-[#0a0a0a] to-[#050505] border border-white/5 rounded-[3rem] flex flex-col justify-between h-[400px] group hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-start">
                <div className="p-4 bg-blue-500/10 rounded-2xl">
                  <Layers className="w-8 h-8 text-blue-500" />
                </div>
                <span className="text-4xl font-black text-white/10 uppercase">01</span>
              </div>
              <div>
                <h3 className="text-2xl font-black mb-4 uppercase italic leading-none">Smart Ledger<br/>Architecture</h3>
                <p className="text-slate-500 max-w-sm">Optimized for high-throughput and low-latency global transactions.</p>
              </div>
            </div>

            <div className="p-12 bg-blue-600 rounded-[3rem] flex flex-col justify-between h-[400px] shadow-[0_20px_50px_rgba(37,99,235,0.2)]">
               <Zap className="w-12 h-12 text-white fill-current" />
               <div>
                  <h3 className="text-3xl font-black text-white uppercase italic leading-none mb-4">Real-time<br/>Consensus</h3>
                  <div className="h-1.5 w-16 bg-white/40 rounded-full" />
               </div>
            </div>

            <div className="p-10 bg-[#080808] border border-white/5 rounded-[3rem] group hover:bg-blue-900/10 transition-colors">
               <Lock className="w-10 h-10 text-blue-500 mb-6" />
               <h4 className="text-xl font-black uppercase mb-3">Immutable</h4>
               <p className="text-slate-500 text-sm leading-relaxed">Cryptographic security that guarantees data remains unchanged forever.</p>
            </div>

            <div className="p-10 bg-[#080808] border border-white/5 rounded-[3rem] group hover:bg-blue-900/10 transition-colors">
               <Database className="w-10 h-10 text-blue-500 mb-6" />
               <h4 className="text-xl font-black uppercase mb-3">Nodes</h4>
               <p className="text-slate-500 text-sm leading-relaxed">Distributed network nodes ensuring 100% uptime and global reach.</p>
            </div>

            <div className="p-10 bg-[#080808] border border-white/5 rounded-[3rem] group hover:bg-blue-900/10 transition-colors">
               <Globe className="w-10 h-10 text-blue-500 mb-6" />
               <h4 className="text-xl font-black uppercase mb-3">Protocol</h4>
               <p className="text-slate-500 text-sm leading-relaxed">Open-source protocols built for cross-chain interoperability.</p>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#030303]">
        <div className="max-w-5xl mx-auto border border-white/10 rounded-[4rem] p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8 italic">Ready to build?</h2>
          <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            Join thousands of developers building the next generation of dApps on InternX-Blockchain.
          </p>
          <button className="px-12 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest hover:scale-105 transition-transform">
            Start Development
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
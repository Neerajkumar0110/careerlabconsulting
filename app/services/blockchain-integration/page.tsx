"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Link2, 
  Cpu, 
  Settings, 
  Zap, 
  ShieldCheck, 
  Network, 
  ArrowRight,
  Database,
  Share2,
  Box
} from 'lucide-react';

const BlockchainIntegration = () => {
  const integrationPoints = [
    {
      title: "Legacy ERP Migration",
      desc: "Connecting SAP, Oracle, and Microsoft Dynamics to private ledgers for real-time supply chain transparency.",
      icon: <Database />,
      img: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Oracle & Data Feeds",
      desc: "Integrating Chainlink and Pyth network nodes to bring off-chain real-world data into your smart contracts.",
      icon: <Network />,
      img: "https://images.pexels.com/photos/5980860/pexels-photo-5980860.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(37,99,235,0.1)_0%,_transparent_50%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-xl">
              <Share2 size={14} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">Middleware Architecture</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Seamless <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 italic">Integration.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Hum aapke existing business infrastructure ko blockchain protocols se connect karte hain. No data silos, only unified decentralization.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-blue-600/20"
            >
              Bridge Your Systems <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group">
            <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full"></div>
            <div className="relative p-12 bg-slate-900/40 border border-white/10 rounded-[4rem] backdrop-blur-3xl overflow-hidden">
               <div className="flex justify-between items-center mb-12">
                  <div className="p-4 bg-blue-600 rounded-2xl"><Box className="text-white" /></div>
                  <div className="flex-1 h-px bg-gradient-to-r from-blue-600 to-transparent mx-4 border-dashed border-t border-white/20"></div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10"><Cpu className="text-slate-400" /></div>
               </div>
               <div className="space-y-4">
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-1/3 animate-pulse"></div>
                  </div>
                  <div className="h-2 w-2/3 bg-white/5 rounded-full"></div>
                  <p className="text-[10px] font-mono text-slate-500 mt-4 uppercase tracking-widest">Status: Syncing_Mainnet_Nodes...</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">Integration Topology</h2>
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5">
              <Zap className="text-blue-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold uppercase italic">Real-time Sync</h4>
              <p className="text-slate-500 text-sm mt-2">Bi-directional data flow between SQL/NoSQL and On-chain states.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5">
              <ShieldCheck className="text-blue-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold uppercase italic">Secure Auth</h4>
              <p className="text-slate-500 text-sm mt-2">OAuth2 and JWT integration for wallet-based enterprise access.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-900/40 border border-white/5">
              <Settings className="text-blue-500 mx-auto mb-4" />
              <h4 className="text-xl font-bold uppercase italic">Custom SDKs</h4>
              <p className="text-slate-500 text-sm mt-2">Bespoke libraries built in Python, Go, or Node.js for your dev team.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {integrationPoints.map((point, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 hover:border-blue-500/30 transition-all">
              <img src={point.img} className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative p-12 md:p-16 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent">
                <div className="mb-6 text-blue-500">{point.icon}</div>
                <h3 className="text-2xl font-black uppercase italic mb-4">{point.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{point.desc}</p>
                <button className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-white transition-colors flex items-center gap-2">
                  View Implementation <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-blue-600 text-center relative overflow-hidden shadow-2xl shadow-blue-600/20">
          <div className="absolute top-0 right-0 p-12 opacity-10"><Link2 size={300} /></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">Bridge the <br /> Technology Gap.</h2>
            <p className="text-blue-100 text-lg mb-12 max-w-xl mx-auto font-medium">Ready to integrate decentralized power into your existing business logic?</p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all"
            >
              Get Architecture Brief
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlockchainIntegration;
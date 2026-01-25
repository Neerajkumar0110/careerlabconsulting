import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Blocks, 
  Cpu, 
  ShieldAlert, 
  Globe, 
  Zap, 
  Layers, 
  ArrowRight,
  Code2,
  LineChart
} from 'lucide-react';

const BlockchainIndustryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px] -z-10"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-8 backdrop-blur-md">
            <Blocks className="w-4 h-4 text-purple-400" />
            <span className="text-purple-400 text-xs font-bold uppercase tracking-widest">Web3 & Decentralized Intelligence</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            NEURAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-500 italic">
              PROTOCOLS
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            The future of the ledger is intelligent. We build AI agents that secure 
            smart contracts, optimize multi-chain liquidity, and provide 
            on-chain signal analysis for the next generation of DeFi.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-purple-600 hover:bg-purple-700 rounded-2xl font-bold transition-all shadow-xl shadow-purple-500/20 flex items-center justify-center gap-2 text-white">
              Launch Agentic Protocol <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "AI Security Audits", 
              desc: "Automated vulnerability scanning for Solidity and Rust contracts using custom-trained LLMs to detect re-entrancy and logic flaws.",
              icon: <ShieldAlert className="w-8 h-8 text-purple-400" /> 
            },
            { 
              title: "Predictive Liquidity", 
              desc: "Neural networks that forecast gas prices and DEX slippage to optimize cross-chain bridging and yield farming.",
              icon: <Zap className="w-8 h-8 text-purple-400" /> 
            },
            { 
              title: "On-Chain Agents", 
              desc: "Autonomous wallets powered by AI that execute trades based on sentiment analysis and whale movement tracking.",
              icon: <Cpu className="w-8 h-8 text-purple-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-purple-900/5 border border-white/5 hover:border-purple-500/30 transition-all">
              <div className="mb-6 p-4 bg-purple-500/10 rounded-2xl inline-block group-hover:bg-purple-600 transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative">
            <div className="absolute -inset-10 bg-purple-500/10 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#05010a] border border-purple-500/20 rounded-[3rem] p-8 shadow-2xl font-mono">
               <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                  <div className="w-2 h-2 rounded-full bg-purple-500 animate-ping"></div>
                  <span className="text-[10px] text-purple-400 uppercase tracking-widest">MEMPOOL_MONITOR_ACTIVE</span>
               </div>
               
               <div className="space-y-4">
                  <div className="flex justify-between text-xs text-gray-500">
                     <span>Contract: 0x71C...a29</span>
                     <span className="text-emerald-400">SECURE</span>
                  </div>
                  <div className="h-1 bg-white/5 rounded-full">
                     <div className="h-full bg-purple-500 w-3/4 animate-pulse"></div>
                  </div>
                  
                  <div className="mt-8 grid grid-cols-2 gap-4">
                     <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-[9px] text-gray-500 uppercase">Risk Score</p>
                        <p className="text-lg font-bold">0.02%</p>
                     </div>
                     <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-[9px] text-gray-500 uppercase">MEV Protection</p>
                        <p className="text-lg font-bold text-blue-400">SHIELDED</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-purple-500/5 rounded-xl border border-dashed border-purple-500/30">
                  <p className="text-[10px] text-purple-300 italic">
                    AI_DEBUGGER: "Found gas-optimization path. Reducing execution cost by 14.2 gwei."
                  </p>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Decentralized <br/>Reasoning</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We bridge the gap between high-performance AI and decentralized ledgers. 
              Our team develops **ZK-ML (Zero-Knowledge Machine Learning)** architectures 
              and AI-driven governance models (DAOs) that make the "Black Box" of 
              AI verifiable on-chain.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-purple-600/10 transition-all cursor-default">
                  <Globe className="text-purple-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Cross-Chain Ops</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-purple-600/10 transition-all cursor-default">
                  <Layers className="text-purple-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">ZK-Proof ML</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-purple-900/40 to-black border border-purple-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Tokenize <br/>Intelligence</h2>
            <p className="text-purple-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our Web3 engineers at DLF Cyber City are building the agents 
              that will manage the future of the internet.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-purple-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                SYNC WALLET & BUILD
              </button>
              <div className="text-purple-400 font-mono text-sm tracking-widest uppercase">Node Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlockchainIndustryPage;
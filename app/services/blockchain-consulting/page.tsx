import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  ShieldCheck, 
  Cpu, 
  Database, 
  Share2, 
  Lock, 
  Layers, 
  ArrowRight,
  Blocks,
  Link as LinkIcon,
  Zap
} from 'lucide-react';

const BlockchainConsulting = () => {
  const specializedServices = [
    {
      title: "Smart Contract Auditing",
      desc: "Formal verification of Solidity and Rust-based contracts to eliminate reentrancy attacks and logic flaws.",
      icon: <ShieldCheck className="text-blue-500" />
    },
    {
      title: "DeFi Ecosystem Design",
      desc: "Architecting liquidity protocols, automated market makers (AMMs), and yield-optimization engines.",
      icon: <Zap className="text-blue-500" />
    },
    {
      title: "Enterprise DLT Integration",
      desc: "Deploying Hyperledger and Corda for private, permissioned supply chain and financial settlement layers.",
      icon: <Layers className="text-blue-500" />
    },
    {
      title: "Tokenomics Engineering",
      desc: "Mathematical modeling of token velocity, inflation schedules, and incentive structures for long-term TVL.",
      icon: <Database className="text-blue-500" />
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 -z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(37,99,235,0.1)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <Blocks size={14} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">Web3 Infrastructure Node</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Blockchain <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600 italic">Consulting.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              We bridge the gap between legacy enterprise systems and decentralized protocols. From Layer-2 scaling to zero-knowledge proofs, we architect the trustless future.
            </p>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-blue-600/20">
              Inquire Technical Audit <ArrowRight size={16} />
            </button>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full animate-pulse"></div>
            <img 
              src="https://images.pexels.com/photos/730547/pexels-photo-730547.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
              className="relative rounded-[3rem] border border-white/10 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 shadow-2xl"
              alt="Blockchain Network"
            />
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">Core Protocol Expertise</h2>
          <div className="flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale contrast-125">
             <span className="text-2xl font-black tracking-tighter italic">ETHEREUM</span>
             <span className="text-2xl font-black tracking-tighter italic">SOLANA</span>
             <span className="text-2xl font-black tracking-tighter italic">POLYGON</span>
             <span className="text-2xl font-black tracking-tighter italic">AVALANCHE</span>
             <span className="text-2xl font-black tracking-tighter italic">HYPERLEDGER</span>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {specializedServices.map((service, i) => (
              <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all relative overflow-hidden">
                <div className="p-4 bg-white/5 rounded-2xl w-fit mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {React.cloneElement(service.icon as React.ReactElement, { size: 32 } as any)}
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4 tracking-tight">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed font-light group-hover:text-slate-300 transition-colors">
                  {service.desc}
                </p>
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                   <LinkIcon size={120} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6 bg-black/20">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-12">System Topology</h2>
          
          <p className="mt-12 text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Our typical deployment involves a modular architecture that separates data availability from execution, ensuring sub-second finality for enterprise-grade applications.
          </p>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[4rem] bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter mb-8">Ready to <br/> Decentralize?</h3>
            <p className="text-slate-400 mb-10 max-w-md">Schedule a technical discovery session to analyze your chain requirements.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-white text-black px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all">
                Book Audit
              </button>
              <button className="bg-white/5 border border-white/10 text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                Download PDF Portfolio
              </button>
            </div>
          </div>
          <div className="absolute -bottom-20 -right-20 opacity-10">
             <Share2 size={300} className="text-blue-500" />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default BlockchainConsulting;
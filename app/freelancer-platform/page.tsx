import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Zap, 
  Wallet, 
  Briefcase, 
  Search, 
  ShieldCheck, 
  Scale, 
  ArrowRight,
  Globe,
  Cpu,
  Star
} from 'lucide-react';

const FreelancerPlatformAIPage = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-lime-500/30">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(132,204,22,0.1)_0%,_transparent_60%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-lime-500/10 border border-lime-500/20 mb-8 backdrop-blur-xl">
            <Globe className="w-3.5 h-3.5 text-lime-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-lime-200">Decentralized Talent Infrastructure</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            Frictionless <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-200 via-lime-500 to-emerald-700 italic text-shadow-sm">
              Capital
            </span>
          </h1>

          <p className="max-w-3xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">
            We build the AI plumbing for the modern gig economy. From **Smart-Contract Escrows** to **Neural Project Matching**, we turn fragmented marketplaces into autonomous ecosystems of high-value work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 bg-lime-600 hover:bg-lime-500 text-black rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-2xl shadow-lime-600/30 flex items-center justify-center gap-2">
              Scale Your Marketplace <Zap className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              Developer API
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Neural Matchmaking", 
              desc: "Deep learning models that analyze codebases and design portfolios to match freelancers with projects where success is statistically certain.",
              icon: <Search className="w-8 h-8 text-lime-500" /> 
            },
            { 
              title: "Autonomous Escrow", 
              desc: "AI agents that verify project milestones and auto-release payments, reducing dispute resolution time by 90%.",
              icon: <Wallet className="w-8 h-8 text-lime-500" /> 
            },
            { 
              title: "Quality Sentinels", 
              desc: "Persistent agents that scan deliverables for plagiarism, AI-generated low-effort content, and security vulnerabilities.",
              icon: <ShieldCheck className="w-8 h-8 text-lime-500" /> 
            }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-lime-500/40 transition-all group relative overflow-hidden">
              <div className="mb-8 p-4 bg-lime-500/5 rounded-2xl inline-block group-hover:bg-lime-500 group-hover:text-black transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">Trust <br/>is <br/><span className="text-lime-500 underline decoration-white/10 underline-offset-8">Algorithmic.</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
              By integrating **Proof-of-Work AI Validators**, we eliminate the need for manual project management. The platform itself becomes the arbiter of quality.
            </p>

            <div className="space-y-4 mt-8">
               {[
                 { icon: <Scale className="text-lime-500" />, text: "AI-Mediated Dispute Resolution" },
                 { icon: <Briefcase className="text-lime-500" />, text: "Automated Tax & Compliance Filings" },
                 { icon: <Star className="text-lime-500" />, text: "Reputation Scoring via Output Analysis" }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:bg-lime-950/20 transition-all">
                    {item.icon}
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-200">{item.text}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-10 bg-lime-600/5 blur-[120px] rounded-full animate-pulse"></div>
            <div className="relative bg-[#020817] border border-lime-500/20 rounded-[3rem] p-8 md:p-12 shadow-2xl font-mono">
               <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2 text-lime-400 font-black italic text-[10px]">
                    <Cpu className="w-4 h-4" />
                    MARKET_ENGINE_v8
                  </div>
                  <div className="text-[10px] text-slate-500">TPS: 1,200+</div>
               </div>
               
               <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-lime-500/5 border border-lime-500/20">
                    <p className="text-[10px] text-lime-500 font-black mb-2 uppercase tracking-tighter italic">Matching Node Active:</p>
                    <p className="text-[11px] text-white">"Found 3 Developers in EU with Expertise in 'Rust-Lang' & 'Neural-Search'. Success Probability: 98.2%."</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex justify-between text-[10px] text-slate-500 mb-2 font-bold uppercase">
                       <span>Escrow Status</span>
                       <span className="text-lime-400">Locked</span>
                    </div>
                    <div className="h-1 w-full bg-slate-800 rounded">
                       <div className="h-full bg-lime-500 w-[65%] shadow-[0_0_10px_rgba(132,204,22,0.5)]"></div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-lime-500/[0.01]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
           {[
             { label: "Payment Latency", val: "-98%", desc: "Near-instant release" },
             { label: "Dispute Rate", val: "<0.4%", desc: "Platform average" },
             { label: "Matching Speed", val: "3.2s", desc: "Mean time to match" },
             { label: "Global Coverage", val: "140+", desc: "Countries supported" },
           ].map((stat, i) => (
             <div key={i}>
                <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.val}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-lime-400 mb-1">{stat.label}</p>
                <p className="text-[9px] text-slate-500 italic">{stat.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-lime-950/20 to-black border border-lime-500/30 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group shadow-3xl shadow-lime-500/10">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">The Future <br/>is Independent.</h2>
            <p className="text-lime-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
              Build the infrastructure for the next billion digital nomads. Our marketplace architects in Gurugram are ready to deploy.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-black px-16 py-7 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic">
                Launch Platform Hub
              </button>
              <div className="text-lime-500/50 font-mono text-[10px] tracking-[0.4em] uppercase">Marketplace Node // DLF Cyber City</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FreelancerPlatformAIPage;
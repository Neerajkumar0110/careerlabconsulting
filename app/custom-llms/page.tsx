import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  ShieldCheck, 
  Lock, 
  Database, 
  Cpu, 
  Zap, 
  ChevronRight, 
  Scale, 
  Fingerprint,
  HardDrive,
  Workflow
} from 'lucide-react';

const CustomLLMsPage = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-violet-500/30">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,_rgba(139,92,246,0.1)_0%,_transparent_50%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8 backdrop-blur-xl">
            <Lock className="w-3.5 h-3.5 text-violet-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-violet-200 text-shadow-sm">Sovereign Model Infrastructure</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            Private <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-violet-400 to-indigo-600 italic">
              Foundations
            </span>
          </h1>

          <p className="max-w-3xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">
            Stop leasing intelligence. Build it. We deploy **Custom-Weights LLMs** directly into your VPC, ensuring your proprietary data never touches a public server and your competitive advantage stays encrypted.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 bg-violet-600 hover:bg-violet-500 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-violet-600/30 flex items-center justify-center gap-2">
              Claim Your Weights <ChevronRight className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              Security Protocol
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "In-House Hosting", 
                desc: "Full deployment on your own AWS/Azure/GCP VPC or On-Premise H100 clusters. No external API calls, ever.",
                icon: <HardDrive className="w-8 h-8 text-violet-500" /> 
              },
              { 
                title: "Domain Knowledge", 
                desc: "Models trained specifically on your industry's jargon, legal standards, and internal documentation.",
                icon: <Database className="w-8 h-8 text-violet-500" /> 
              },
              { 
                title: "Bias Control", 
                desc: "Remove the 'preachy' filters of public models. We align the LLM strictly to your corporate values and safety needs.",
                icon: <Scale className="w-8 h-8 text-violet-500" /> 
              }
            ].map((feature, i) => (
              <div key={i} className="p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-violet-500/40 transition-all group">
                <div className="mb-8 p-4 bg-violet-500/5 rounded-2xl inline-block group-hover:bg-violet-600 group-hover:text-black transition-all">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">Zero <br/>Leakage <br/><span className="text-violet-500">Architecture.</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
              We leverage **Mixture-of-Experts (MoE)** and **Speculative Decoding** to ensure your custom model isn't just private—it's faster and more cost-efficient than any commercial alternative.
            </p>

            <div className="space-y-4 mt-8">
               {[
                 { icon: <ShieldCheck className="text-violet-500" />, text: "HIPAA / SOC2 / GDPR Compliant Inference" },
                 { icon: <Fingerprint className="text-violet-500" />, text: "Immutable Audit Trails for Every Token" },
                 { icon: <Zap className="text-violet-500" />, text: "Sub-100ms Latency for Edge Deployment" }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:bg-violet-950/30 transition-all">
                    {item.icon}
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-200">{item.text}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-violet-600/10 blur-[120px] rounded-full animate-pulse"></div>
            <div className="relative bg-black/60 border border-violet-500/20 rounded-[3rem] p-8 md:p-12 shadow-2xl font-mono">
               <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2 text-violet-400 font-black italic text-[10px]">
                    <Cpu className="w-4 h-4" />
                    SOVEREIGN_CORE_v1.0
                  </div>
                  <div className="text-[10px] text-slate-500">ENCRYPTION: AES-256</div>
               </div>

               <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-violet-500/5 border border-violet-500/20">
                    <p className="text-[10px] text-violet-400 uppercase font-black mb-4 tracking-tighter italic underline">Internal Knowledge Graph Connected</p>
                    <div className="space-y-2 opacity-80">
                      <div className="h-1 bg-violet-500/40 w-full rounded"></div>
                      <div className="h-1 bg-violet-500/40 w-[85%] rounded"></div>
                      <div className="h-1 bg-violet-500/40 w-[95%] rounded"></div>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[11px] text-slate-300 leading-relaxed italic">
                      "I have reviewed the internal Q3 engineering reports. The discrepancy in the thermal manifold was due to..."
                    </p>
                    <div className="mt-4 pt-4 border-t border-white/5 text-[9px] text-emerald-400 flex items-center gap-2">
                       <Workflow className="w-3 h-3" /> VERIFIED_INTERNAL_SOURCE: PROJECT_ORION_DOCS.PDF
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto overflow-hidden rounded-3xl border border-white/10">
          <table className="w-full text-left border-collapse bg-slate-900/40">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-6 text-[10px] uppercase tracking-widest text-slate-500">Feature</th>
                <th className="p-6 text-[10px] uppercase tracking-widest text-slate-500">Public LLMs</th>
                <th className="p-6 text-[10px] uppercase tracking-widest text-violet-400">Custom Foundations</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/5">
                <td className="p-6 font-bold">Data Privacy</td>
                <td className="p-6 text-slate-500">Shared/Terms-subject</td>
                <td className="p-6 text-violet-300 font-bold">100% Sovereign</td>
              </tr>
              <tr className="border-b border-white/5">
                <td className="p-6 font-bold">Domain Specificity</td>
                <td className="p-6 text-slate-500">Generalized</td>
                <td className="p-6 text-violet-300 font-bold">Industry Expert</td>
              </tr>
              <tr>
                <td className="p-6 font-bold">Long-term Cost</td>
                <td className="p-6 text-slate-500">Variable Token Fees</td>
                <td className="p-6 text-violet-300 font-bold">Fixed Infra CapEx</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-violet-950/20 to-black border border-violet-500/30 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group shadow-3xl shadow-violet-500/10">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Your Data. <br/>Your Model.</h2>
            <p className="text-violet-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Ready to take ownership? Let’s architect a model that works exclusively for your enterprise.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-violet-950 px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic">
                Initialize Build Run
              </button>
              <div className="text-violet-500/50 font-mono text-[10px] tracking-[0.4em] uppercase">Private Node Cluster // Gurugram Hub</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CustomLLMsPage;
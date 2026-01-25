import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Scale, 
  FileSearch, 
  ShieldCheck, 
  Gavel, 
  History, 
  Zap, 
  ArrowRight,
  Lock,
  SearchCode
} from 'lucide-react';

const LegalAIPage = () => {
  const legalKPIs = [
    { label: "Review Velocity", value: "1,000+", detail: "Pages per Minute" },
    { label: "Anomaly Detection", value: "99.2%", detail: "Clause Variance Accuracy" },
    { label: "Risk Mitigation", value: "40%", detail: "Reduction in Legal Spend" },
    { label: "Compliance Drift", value: "Real-time", detail: "Global Regulatory Sync" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-slate-500/5 rounded-full blur-[140px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 border border-slate-700 mb-8 backdrop-blur-md">
            <Scale className="w-4 h-4 text-amber-500" />
            <span className="text-gray-300 text-xs font-bold uppercase tracking-[0.2em]">Enterprise Legal Intelligence</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">
            JURIS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 via-amber-200 to-amber-600 italic">
              ALGORITHM
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Transform legal from a bottleneck into a competitive advantage. We deploy 
            **Private LLM Architectures** that automate document synthesis, detect 
            hidden liabilities, and ensure 100% regulatory alignment across 150+ jurisdictions.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {legalKPIs.map((kpi, i) => (
              <div key={i} className="p-6 bg-slate-900/50 border border-slate-800 rounded-3xl text-left hover:border-amber-500/20 transition-all group">
                <p className="text-3xl font-black mb-1 text-white">{kpi.value}</p>
                <p className="text-[10px] text-amber-500 uppercase font-bold tracking-widest">{kpi.label}</p>
                <p className="text-[9px] text-gray-500 italic mt-2">{kpi.detail}</p>
              </div>
            ))}
          </div>
          
          <button className="px-12 py-6 bg-amber-600 hover:bg-amber-700 rounded-2xl font-black transition-all shadow-2xl shadow-amber-500/20 flex items-center gap-3 mx-auto text-white uppercase tracking-tighter">
            Initialize Legal Audit <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Cognitive Due Diligence", 
              desc: "Analyzing thousands of M&A documents in hours. Identifying change-of-control clauses and exposure with superhuman precision.",
              icon: <FileSearch className="w-8 h-8 text-amber-500" /> 
            },
            { 
              title: "Smart CLM Automation", 
              desc: "Automated contract drafting and redlining based on your firm’s historical 'Gold Standard' and risk appetite.",
              icon: <SearchCode className="w-8 h-8 text-amber-500" /> 
            },
            { 
              title: "Regulatory Horizon", 
              desc: "AI engines that track global law changes in real-time, automatically flagging internal policies that require updates.",
              icon: <History className="w-8 h-8 text-amber-500" /> 
            }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 hover:border-amber-500/30 transition-all group">
              <div className="mb-6 p-4 bg-amber-500/5 rounded-xl inline-block group-hover:bg-amber-500 group-hover:text-black transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight text-amber-100">Zero <br/>Ambiguity</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Legal risk is often buried in the "Small Print." Our AI models perform 
              **semantic analysis** across your entire document repository, 
              connecting disparate clauses to reveal systemic risks before they 
              become litigation liabilities.
            </p>

            <div className="space-y-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <Lock className="text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-widest italic text-slate-200">On-Premise / Air-Gapped Deployment</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <ShieldCheck className="text-amber-500" />
                  <span className="text-xs font-bold uppercase tracking-widest italic text-slate-200">Privileged Data Isolation</span>
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-amber-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#0a0a0a] border border-slate-700 rounded-[3rem] p-10 shadow-2xl font-mono overflow-hidden">
               <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2 text-amber-500">
                    <Zap className="w-4 h-4 animate-pulse" />
                    <span className="text-[10px] uppercase font-black">AI_DUE_DILIGENCE_KERNEL</span>
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">SCANNING_RETAIL_MASTER_v4</div>
               </div>

               <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 relative">
                    <p className="text-[10px] text-gray-500 uppercase mb-4 italic">Semantic Clause Mapping</p>
                    <div className="space-y-3">
                      <div className="h-2 bg-slate-800 rounded-full w-full"></div>
                      <div className="h-2 bg-amber-500/40 rounded-full w-[85%] border border-amber-500/20"></div>
                      <div className="h-2 bg-slate-800 rounded-full w-[92%]"></div>
                      <div className="h-2 bg-red-500/40 rounded-full w-[60%] border border-red-500/20"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-center">
                        <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Risk Exposure</p>
                        <p className="text-xl font-black text-amber-400">Low (0.12)</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Tokens Analyzed</p>
                        <p className="text-xl font-black italic">4.2M</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-slate-900 rounded-xl border border-dashed border-slate-700 text-[9px] text-amber-100">
                  <p className="font-bold uppercase mb-1 tracking-widest text-amber-500 flex items-center gap-2">
                    <Gavel className="w-3 h-3" /> ADVISORY_OUTPUT:
                  </p>
                  <p className="italic leading-relaxed">
                    "Detected high variance in 'Force Majeure' clause relative to current case law in Delaware. Recommendation: Update to standard 2026 ESG-compliant language."
                  </p>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-slate-950 to-black border border-amber-900/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Scale Your <br/>Counsel</h2>
            <p className="text-gray-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our legal-tech architects at DLF Cyber City are engineering 
              the future of automated trust.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-amber-600 text-white px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl">
                SECURE YOUR FIRM
              </button>
              <div className="text-amber-500 font-mono text-sm tracking-widest uppercase italic">Legal AI Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LegalAIPage;
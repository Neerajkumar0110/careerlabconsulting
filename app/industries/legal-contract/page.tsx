import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  FileText, 
  PenTool, 
  GitMerge, 
  RefreshCcw, 
  FileCheck2, 
  AlertCircle, 
  ArrowRight,
  ShieldCheck,
  Target
} from 'lucide-react';

const ContractAIPage = () => {
  const clmMetrics = [
    { label: "Drafting Speed", value: "85%", detail: "Time Reduction via AI" },
    { label: "Obligation Capture", value: "100%", detail: "Automated extraction" },
    { label: "Redline Turnaround", value: "<4h", detail: "Standardized SLA" },
    { label: "Renewal Leakage", value: "0%", detail: "AI Alert System" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <FileText className="w-4 h-4 text-amber-500" />
            <span className="text-gray-400 text-xs font-bold uppercase tracking-widest italic text-amber-100">AI-Powered CLM Vertical</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-tight uppercase">
            AUTONOMOUS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-100 via-amber-400 to-zinc-500 italic">
              AGREEMENTS
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Stop losing value in the "Contract Black Hole." Our AI agents manage the 
            entire lifecycle—from **Automated Redlining** against your Playbook to 
            **Smart Obligation Tracking** that ensures vendors deliver exactly what they signed for.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {clmMetrics.map((m, i) => (
              <div key={i} className="p-6 bg-amber-950/10 border border-amber-900/20 rounded-2xl text-left backdrop-blur-sm">
                <p className="text-2xl font-black text-white">{m.value}</p>
                <p className="text-[10px] text-amber-500 uppercase font-bold tracking-widest">{m.label}</p>
                <p className="text-[9px] text-gray-500 mt-1 italic">{m.detail}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <button className="px-10 py-5 bg-white text-black hover:bg-amber-400 rounded-2xl font-bold transition-all shadow-xl flex items-center gap-2">
              Optimize My CLM <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "AI Playbook Redlining", 
              desc: "Upload your legal playbook and let our AI redline third-party paper instantly, flagging deviations from your standard risk profile.",
              icon: <PenTool className="w-8 h-8 text-amber-400" /> 
            },
            { 
              title: "Obligation Extraction", 
              desc: "Automatically convert dead PDF text into actionable tasks, deadlines, and financial milestones synced with your ERP.",
              icon: <Target className="w-8 h-8 text-amber-400" /> 
            },
            { 
              title: "Smart Renewal Alerts", 
              desc: "AI that reads 'Auto-renewal' and 'Notice periods' to alert your team 90 days out, preventing unwanted multi-year lock-ins.",
              icon: <RefreshCcw className="w-8 h-8 text-amber-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-amber-500/30 transition-all">
              <div className="mb-6 p-4 bg-amber-500/10 rounded-2xl inline-block group-hover:bg-amber-600 group-hover:text-black transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative">
            <div className="absolute -inset-10 bg-amber-600/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#050401] border border-white/10 rounded-[2rem] p-8 shadow-2xl font-mono">
               <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                  <FileCheck2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-black">Contract_Analysis_Engine_v2</span>
               </div>
               
               
               
               <div className="mt-8 space-y-4">
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                    <p className="text-[9px] text-red-500 uppercase mb-2 font-black italic">! CRITICAL_DEVIATION:</p>
                    <p className="text-[11px] text-white">"Indemnification clause (Para 14.2) exceeds corporate cap of $1M. Suggested: Replace with Standard_Cap_Clause_v1.2"</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                        <p className="text-[8px] text-gray-500 uppercase">Risk Level</p>
                        <p className="text-xl font-bold text-amber-500 italic uppercase">High Variance</p>
                     </div>
                     <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                        <p className="text-[8px] text-gray-500 uppercase">Playbook Sync</p>
                        <p className="text-xl font-bold text-emerald-400">82% MATCH</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Obligation <br/>Orchestration</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Contracts shouldn't be "Signed and Forgotten." Our AI creates a 
              dynamic data layer for every agreement, ensuring that **SLA 
              breaches** are flagged before they impact your P&L.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-amber-500/30 transition-all">
                  <GitMerge className="text-amber-500 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Multi-Party Versioning</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-amber-500/30 transition-all">
                  <ShieldCheck className="text-amber-500 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest text-amber-100">Audit-Ready History</span>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-amber-950/20 to-black border border-amber-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Master Your <br/>Commitments</h2>
            <p className="text-amber-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our legal-tech architects at DLF Cyber City are engineering the 
              immune system for your enterprise agreements.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-amber-600 text-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl uppercase italic">
                Schedule Demo
              </button>
              <div className="text-amber-500 font-mono text-sm tracking-widest uppercase">Contract Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ContractAIPage;
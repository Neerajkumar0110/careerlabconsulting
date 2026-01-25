import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  ShieldAlert, 
  Fingerprint, 
  Globe2, 
  Eye, 
  CheckSquare, 
  Lock, 
  ArrowRight,
  BarChartHorizontal,
  Zap
} from 'lucide-react';

const ComplianceAIPage = () => {
  const compMetrics = [
    { label: "Alert Precision", value: "99.7%", detail: "False Positive Reduction" },
    { label: "Regulatory Sync", value: "Real-time", detail: "Global Law Monitoring" },
    { label: "Reporting Speed", value: "12x Faster", detail: "Automated SAR Filing" },
    { label: "Policy Coverage", value: "100%", detail: "Gap Analysis Accuracy" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md">
            <ShieldAlert className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest italic">RegTech & Compliance Intelligence Vertical</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">
            REGULATORY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-100 via-emerald-400 to-teal-700 italic">
              IMMUNITY
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Compliance is no longer a reactive cost center. We deploy **Neural Compliance Engines** that predict regulatory shifts, automate high-frequency auditing, and eliminate 
            human error in AML/KYC workflows across all global jurisdictions.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {compMetrics.map((m, i) => (
              <div key={i} className="p-6 bg-emerald-950/10 border border-emerald-900/20 rounded-3xl text-left hover:bg-emerald-900/20 transition-all group">
                <p className="text-3xl font-black mb-1 text-white">{m.value}</p>
                <p className="text-[10px] text-emerald-400 uppercase font-bold tracking-widest">{m.label}</p>
                <p className="text-[9px] text-gray-500 italic mt-2">{m.detail}</p>
              </div>
            ))}
          </div>
          
          <button className="px-12 py-6 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-black transition-all shadow-2xl shadow-emerald-500/20 flex items-center gap-3 mx-auto text-white uppercase italic">
            Harden Your Infrastructure <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Neural AML/KYC", 
              desc: "Moving beyond static rules to behavior-based anomaly detection that catches sophisticated money laundering patterns in real-time.",
              icon: <Fingerprint className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "Reg-Change Tracker", 
              desc: "AI that reads 1,000+ regulatory updates daily and maps them directly to your internal policies, flagging gaps instantly.",
              icon: <Globe2 className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "ESG Data Ledger", 
              desc: "Automated collection and validation of sustainability data across your supply chain for audit-ready ESG disclosures.",
              icon: <BarChartHorizontal className="w-8 h-8 text-emerald-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 hover:border-emerald-500/30 transition-all">
              <div className="mb-6 p-4 bg-emerald-500/5 rounded-2xl inline-block group-hover:bg-emerald-500 transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative">
            <div className="absolute -inset-10 bg-emerald-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#010a05] border border-emerald-500/20 rounded-[3rem] p-10 shadow-2xl font-mono overflow-hidden">
               <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2 text-emerald-400 font-black italic">
                    <Eye className="w-4 h-4 animate-pulse" />
                    <span className="text-[10px] uppercase">Sentinel_Audit_Live</span>
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase">NODE_SECURE_ALPHA</div>
               </div>

               <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[10px] text-gray-500 uppercase mb-4 italic text-center">Cross-Border Compliance Flow</p>
                    
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/20 text-center">
                        <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Policy Alignment</p>
                        <p className="text-xl font-black text-emerald-400">99.8%</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Risk Drift</p>
                        <p className="text-xl font-black italic text-gray-300">0.02%</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-emerald-950/20 rounded-xl border border-dashed border-emerald-500/30 text-[9px] text-emerald-200">
                  <p className="font-bold uppercase mb-1 tracking-widest text-emerald-400">GUARDIAN_LOG:</p>
                  <p className="italic">"EU AI Act Article 14 update detected. Automating impact assessment for HR-Tech module. Reporting timeline: T-48h."</p>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight text-emerald-100">Absolute <br/>Vigilance</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We provide the digital "Watchdog" for your enterprise. From **Automated Audit Trails** to **Internal Communication Surveillance (NLP)**, we ensure that compliance is 
              woven into the fabric of your technical architecture, not just your manuals.
            </p>

            <div className="space-y-4">
               {[
                 { icon: <CheckSquare className="text-emerald-500" />, text: "Automated SAR & STR Filings" },
                 { icon: <Lock className="text-emerald-500" />, text: "SOC2 / GDPR Neural Safeguards" },
                 { icon: <Zap className="text-emerald-500" />, text: "Sanction List Sync (60s Latency)" }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all">
                    {item.icon}
                    <span className="text-xs font-bold uppercase tracking-widest text-emerald-50">{item.text}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5 bg-emerald-500/[0.02]">
        <ExecutionFlow />
      </div>

      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-emerald-950/40 to-black border border-emerald-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Fortify Your <br/>Operations</h2>
            <p className="text-emerald-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our RegTech specialists at DLF Cyber City are engineering the 
              ultimate shield for your global enterprise reputation.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-emerald-950 px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic">
                Get Protected
              </button>
              <div className="text-emerald-500 font-mono text-sm tracking-widest uppercase">Compliance Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ComplianceAIPage;
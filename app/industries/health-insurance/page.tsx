import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  ShieldCheck, 
  FileSearch, 
  BarChart4, 
  Users, 
  Scale, 
  Coins, 
  ArrowRight,
  ClipboardCheck,
  Zap
} from 'lucide-react';

const HealthInsuranceIndustryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Payer & Underwriting Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            AI-POWERED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-slate-400 to-indigo-600 italic">
              RISK SHIELD
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Transforming the insurance value chain. We build autonomous systems for 
            instant claims adjudication, predictive actuarial modeling, and 
            high-fidelity fraud detection for the world's leading payers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 text-white">
              Optimize Your Portfolio <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Autonomous Claims", 
              desc: "LLM-driven adjudication that processes medical codes (ICD-10/CPT) against policy terms for instant approvals.",
              icon: <ClipboardCheck className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "FWA Detection", 
              desc: "Advanced anomaly detection to identify Fraud, Waste, and Abuse patterns in billing before payments are disbursed.",
              icon: <FileSearch className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Actuarial AI", 
              desc: "Predictive modeling that analyzes population health data to forecast risk and optimize premium pricing.",
              icon: <BarChart4 className="w-8 h-8 text-blue-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-blue-900/5 border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl inline-block group-hover:bg-blue-600 transition-all">
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
            <div className="absolute -inset-10 bg-blue-600/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-6">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] text-gray-500 uppercase">Claims_Processor_L3</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold">LIVE_AUDIT</div>
               </div>

               <div className="space-y-6">
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-gray-400">Policy Match Score</span>
                     <span className="text-blue-400 font-bold">0.998</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-gray-400">Medical Necessity</span>
                     <span className="text-emerald-400 font-bold">VERIFIED</span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                     <span className="text-gray-400">Risk Adjustment Factor</span>
                     <span className="text-white font-bold">1.24 (Medium)</span>
                  </div>

                  <div className="mt-8 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[10px] text-emerald-300">
                     SYSTEM_DECISION: AUTO_APPROVE_CLAIM_ID_9921
                  </div>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Zero-Friction <br/>Payer Logic</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Manual claims review is slow and error-prone. We implement 
              **Retrieval-Augmented Generation (RAG)** frameworks that scan thousands 
              of policy pages in milliseconds to ensure every decision is 
              backed by documented evidence and regulatory compliance.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6">
               <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                  <Scale className="text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Legal Guardrails</span>
               </div>
               <div className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-all">
                  <Coins className="text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Loss Ratio Opt</span>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-slate-900/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Secure Your <br/>Operations</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our insurance-tech engineers at DLF Cyber City are ready to build 
              the next generation of automated payer infrastructure.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START PAYER AUDIT
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">Underwriting Hub: Gurugram, HR</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HealthInsuranceIndustryPage;
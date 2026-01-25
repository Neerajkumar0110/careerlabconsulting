import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  ShieldAlert, 
  Scale, 
  BarChart4, 
  AlertTriangle, 
  SearchCheck, 
  FileText, 
  ArrowRight,
  Database,
  Lock
} from 'lucide-react';

const FinanceRiskIndustryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8 backdrop-blur-md">
            <ShieldAlert className="w-4 h-4 text-orange-500" />
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Enterprise Risk & RegTech Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            SYSTEMIC <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-zinc-400 to-orange-700 italic">
              VIGILANCE
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Eliminating the blind spots in global finance. We build AI-driven 
            risk engines that perform real-time stress testing, automated 
            regulatory compliance, and predictive liquidity analysis for Tier-1 institutions.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-orange-600 hover:bg-orange-700 rounded-2xl font-bold transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 text-white">
              Secure Your Portfolio <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Predictive Stress Testing", 
              desc: "Simulating millions of black-swan scenarios using generative AI to forecast portfolio impact and capital adequacy.",
              icon: <BarChart4 className="w-8 h-8 text-orange-500" /> 
            },
            { 
              title: "Automated RegTech", 
              desc: "Mapping global financial regulations (BASEL IV, Dodd-Frank) to internal data flows for automated reporting and audit trails.",
              icon: <Scale className="w-8 h-8 text-orange-500" /> 
            },
            { 
              title: "Model Risk Mgmt (MRM)", 
              desc: "Ensuring AI governance by continuously auditing other models for bias, drift, and adversarial vulnerability.",
              icon: <SearchCheck className="w-8 h-8 text-orange-500" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-orange-950/5 border border-white/5 hover:border-orange-500/30 transition-all">
              <div className="mb-6 p-4 bg-orange-500/10 rounded-2xl inline-block group-hover:bg-orange-600 transition-all">
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
          
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 bg-orange-600/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#050201] border border-white/10 rounded-[3rem] p-8 shadow-2xl font-mono">
               <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                  <AlertTriangle className="w-4 h-4 text-orange-500" />
                  <span className="text-[10px] text-orange-400 uppercase tracking-widest">Risk_Telemetry_Stream</span>
               </div>
               
               <div className="space-y-6">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5">
                     <span className="text-[10px] text-gray-500 uppercase tracking-widest italic">Capital_Ratio</span>
                     <span className="text-xs font-bold">14.2% [HEALTHY]</span>
                  </div>
                  
                  <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                    <p className="text-[10px] text-gray-500 uppercase mb-4">Monte Carlo Simulation Progress</p>
                    <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
                       <div className="w-2/3 h-full bg-orange-500"></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-[9px] text-gray-500">VAR (99%)</p>
                        <p className="text-sm font-bold text-red-400">$2.4M</p>
                     </div>
                     <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-[9px] text-gray-500">Compliance</p>
                        <p className="text-sm font-bold text-emerald-400">PASSED</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Quantify The <br/>Unthinkable</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Risk isn't just about avoiding failure; it's about optimizing certainty. 
              Our AI engines bridge the gap between historical data and 
              future volatility, providing a clear window into systemic exposure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:bg-orange-600/10 transition-all cursor-default">
                  <Lock className="text-orange-500 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Fraud Firewall</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:bg-orange-600/10 transition-all cursor-default">
                  <FileText className="text-orange-500 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">SEC/FINRA Reporting</span>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-orange-950/20 to-black border border-orange-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Fortify Your <br/>Operations</h2>
            <p className="text-orange-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our risk-tech engineers at DLF Cyber City are building the systems 
              that prevent the next global crisis.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-orange-600 text-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl uppercase">
                Audit My Portfolio
              </button>
              <div className="text-orange-500 font-mono text-sm tracking-widest uppercase">Risk Monitoring Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FinanceRiskIndustryPage;
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Globe, 
  ShieldCheck, 
  Factory, 
  Link, 
  Zap, 
  FileText, 
  ArrowRight,
  Anchor,
  Activity
} from 'lucide-react';

const RetailSupplyPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Link className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Global Sourcing & Supply Resilience</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            RESILIENT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-500 to-indigo-700 italic">
              NETWORKS
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            AI-driven visibility from raw material to storefront. We build 
            autonomous sourcing engines that mitigate geopolitical risk, 
            optimize shipping lanes, and ensure ethical compliance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 text-white">
              Audit My Supply Chain <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Autonomous Sourcing", 
              desc: "AI agents that vet suppliers, analyze ESG ratings, and negotiate contracts based on real-time commodity pricing.",
              icon: <Factory className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Tier-N Visibility", 
              desc: "Mapping your entire supply network beyond Tier-1 to identify hidden bottlenecks and ethical risks deep in the chain.",
              icon: <Globe className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Route Optimization", 
              desc: "Predictive logistics models that re-route shipments in real-time based on port congestion, weather, and fuel costs.",
              icon: <Anchor className="w-8 h-8 text-blue-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-blue-950/5 border border-white/5 hover:border-blue-500/30 transition-all">
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
            <div className="absolute -inset-10 bg-blue-500/10 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#020410] border border-blue-500/20 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Global_Risk_Monitor</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse"></div>
                    <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse delay-75"></div>
                    <div className="w-1 h-1 rounded-full bg-blue-500 animate-pulse delay-150"></div>
                  </div>
               </div>

               <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[9px] text-gray-500 uppercase mb-3">Geopolitical Instability Index</p>
                     <p className="text-xl font-bold text-amber-400 italic">Moderate_Risk [3.4]</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <p className="text-[8px] text-gray-500 uppercase mb-1">CO2 Footprint</p>
                        <p className="text-lg font-bold text-emerald-400">-14% YoY</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[8px] text-gray-500 uppercase mb-1">Lead Time Dev.</p>
                        <p className="text-lg font-bold">±1.2 Days</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-blue-900/20 rounded-xl border border-dashed border-blue-500/30 text-[10px] text-blue-200">
                  <p className="font-bold mb-1 uppercase tracking-widest">Sourcing Engine:</p>
                  <p>"Raw material cost increase detected in Sector_7. Executing automated RFP for alternative suppliers in Brazil and Vietnam."</p>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Total Chain <br/>Intelligence</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Modern retail isn't just about selling; it's about securing. We deploy 
              **Digital Twins** of your supply chain to simulate shocks—from 
              strikes to natural disasters—ensuring you are always two steps 
              ahead of disruption.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:bg-blue-600/10 transition-all">
                  <ShieldCheck className="text-blue-400 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">ESG Verification</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:bg-blue-600/10 transition-all">
                  <FileText className="text-blue-400 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Smart Contract Audits</span>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-950/40 to-black border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Future-Proof <br/>Your Supply</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our supply chain architects at DLF Cyber City are ready to build 
              the most resilient sourcing infrastructure in the industry.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START NETWORK BUILD
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">Global Ops: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default RetailSupplyPage;
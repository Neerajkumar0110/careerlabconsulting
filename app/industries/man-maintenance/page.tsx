import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Wrench, 
  Activity, 
  ShieldAlert, 
  Settings2, 
  Clock, 
  BarChart3, 
  ArrowRight,
  Microscope,
  Database
} from 'lucide-react';

const PredictiveMaintenancePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-yellow-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-8 backdrop-blur-md">
            <Wrench className="w-4 h-4 text-yellow-500" />
            <span className="text-yellow-500 text-xs font-bold uppercase tracking-widest">Asset Reliability & PdM Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            PREDICTIVE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-yellow-500 to-zinc-500 italic">
              RESILIENCE
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Eliminate reactive repairs. We build AI-driven reliability engines that 
            listen to your machines, feel their vibrations, and predict 
            RUL (Remaining Useful Life) with surgical precision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-yellow-600 hover:bg-yellow-700 rounded-2xl font-bold transition-all shadow-xl shadow-yellow-500/20 flex items-center justify-center gap-2 text-[#020617]">
              Secure Your Assets <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Acoustic Anomaly AI", 
              desc: "Deep learning models that identify internal mechanical wear by analyzing high-frequency sound patterns invisible to human ears.",
              icon: <Activity className="w-8 h-8 text-yellow-500" /> 
            },
            { 
              title: "Digital Health Records", 
              desc: "Centralized AI ledgers that track every vibration, heat spike, and repair for every asset, creating a 'Medical History' for your machines.",
              icon: <Database className="w-8 h-8 text-yellow-500" /> 
            },
            { 
              title: "Prescriptive Insights", 
              desc: "We don't just tell you when it will break; our AI generates step-by-step repair guides and automatically orders the required parts.",
              icon: <Settings2 className="w-8 h-8 text-yellow-500" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-yellow-500/30 transition-all">
              <div className="mb-6 p-4 bg-yellow-500/10 rounded-2xl inline-block group-hover:bg-yellow-600 transition-all">
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
            <div className="absolute -inset-10 bg-yellow-600/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#050401] border border-white/10 rounded-[3rem] p-8 shadow-2xl font-mono">
               <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                  <ShieldAlert className="w-4 h-4 text-yellow-500" />
                  <span className="text-[10px] text-yellow-500 uppercase tracking-widest">Reliability_Engine_v4</span>
               </div>
               
               <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                    <p className="text-[9px] text-gray-500 uppercase mb-2 text-center">Bearing Vibration Analysis</p>
                    
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-yellow-500/5 border border-yellow-500/10">
                        <p className="text-[8px] text-gray-500 uppercase">Failure Probability</p>
                        <p className="text-xl font-bold text-red-500">8.2%</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[8px] text-gray-500 uppercase">Est. RUL</p>
                        <p className="text-xl font-bold">412 Hours</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-[#0a0801] rounded-xl border border-dashed border-yellow-500/20 text-[10px] text-yellow-200">
                  <p className="font-bold mb-1 uppercase tracking-widest">AI_PRESCRIPTION:</p>
                  <p className="italic">"Lubrication viscosity drop detected. Schedule Top-up for Pump_09 during 02:00 Window to prevent thermal expansion."</p>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Asset <br/>Intelligence</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Downtime is a data problem. By deploying **Multi-Modal AI** that correlates 
              power consumption with mechanical output, we create a high-fidelity 
              window into the soul of your infrastructure.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-yellow-500/30 transition-all">
                  <Microscope className="text-yellow-500 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Root Cause AI</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-yellow-500/30 transition-all">
                  <Clock className="text-yellow-500 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">MTBF Optimization</span>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-yellow-950/20 to-black border border-yellow-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Zero <br/>Breakdowns</h2>
            <p className="text-yellow-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our reliability engineers at DLF Cyber City are building the 
              immune system for the world's most critical assets.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-yellow-600 text-[#020617] px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl uppercase">
                Start Reliability Audit
              </button>
              <div className="text-yellow-500 font-mono text-sm tracking-widest uppercase">Reliability Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PredictiveMaintenancePage;
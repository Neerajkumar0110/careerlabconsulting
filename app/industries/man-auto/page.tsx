import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Car, 
  Cpu, 
  Orbit, 
  Zap, 
  ShieldCheck, 
  Wind, 
  ArrowRight,
  Gauge,
  Navigation
} from 'lucide-react';

const AutomotiveManufacturingPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Car className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Automotive & Mobility Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            SOFTWARE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-400 to-cyan-500 italic">
              DEFINED
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            The vehicle is the new platform. We build the AI architectures that 
            power autonomous navigation, predictive maintenance, and 
            next-gen cockpit experiences for the world's leading automakers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 text-white">
              Accelerate Innovation <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Generative Design AI", 
              desc: "Optimizing vehicle components for weight, strength, and aerodynamics using AI models that explore thousands of iterations in minutes.",
              icon: <Wind className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "ADAS & Vision Systems", 
              desc: "Training custom neural networks for object detection, lane tracking, and path planning in diverse environmental conditions.",
              icon: <Orbit className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Predictive Powertrain", 
              desc: "AI models that optimize EV battery management and internal combustion efficiency through real-time sensor fusion.",
              icon: <Zap className="w-8 h-8 text-blue-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all">
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
          
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Digital <br/>Chassis</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We specialize in the integration of hardware and intelligence. 
              Our teams build high-fidelity **Digital Twins** for crash simulations 
              and OTA (Over-the-Air) update systems that keep fleets at 
              peak performance throughout their lifecycle.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all">
                  <ShieldCheck className="text-blue-400 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">ISO 26262 Safety</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-blue-500/30 transition-all">
                  <Navigation className="text-blue-400 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Edge-SLAM Navigation</span>
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-blue-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#01040a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-blue-400" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Vehicle_OS_Telemetry</span>
                  </div>
                  <div className="text-[10px] text-cyan-400 animate-pulse uppercase tracking-[0.2em]">Connected</div>
               </div>

               <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500 uppercase mb-3">Autonomy Confidence Level</p>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-[98%]"></div>
                        </div>
                        <span className="text-xs font-bold text-blue-400">98%</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                        <p className="text-[8px] text-gray-500 uppercase mb-1">Compute Latency</p>
                        <p className="text-xl font-bold text-emerald-400">12ms</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[8px] text-gray-500 uppercase mb-1">Energy Regen</p>
                        <p className="text-xl font-bold text-blue-400">+22%</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-blue-900/10 rounded-xl border border-dashed border-blue-500/20 text-[10px] text-blue-200">
                  <p className="font-bold mb-1">FLEET_AI_DEBUG:</p>
                  <p className="italic">"Detected unusual heat signature in rear motor inverter. Re-routing torque distribution to compensate. Performance impact: 0%."</p>
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
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Drive The <br/>Standard</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our mobility engineers at DLF Cyber City are building the 
              brain for the next billion miles.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START MOBILITY BUILD
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">Mobility Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AutomotiveManufacturingPage;
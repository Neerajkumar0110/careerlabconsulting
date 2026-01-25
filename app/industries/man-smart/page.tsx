import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Settings, 
  Cpu, 
  Eye, 
  Activity, 
  Zap, 
  HardHat, 
  ArrowRight,
  Gauge,
  Construction
} from 'lucide-react';

const SmartManufacturingPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8 backdrop-blur-md">
            <Settings className="w-4 h-4 text-orange-500 animate-spin-slow" />
            <span className="text-orange-500 text-xs font-bold uppercase tracking-widest">Industry 4.0 & Smart Factory Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            AUTONOMOUS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 via-orange-400 to-zinc-500 italic">
              PRODUCTION
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            The factory of the future is self-healing. We deploy AI at the edge to 
            predict equipment failure, automate defect detection, and synchronize 
            complex assembly lines with zero-latency precision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-orange-600 hover:bg-orange-700 rounded-2xl font-bold transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 text-white">
              Optimize My Plant <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Predictive Maintenance", 
              desc: "Analyzing vibration, heat, and acoustic data to predict bearing and motor failures before they cause costly downtime.",
              icon: <Activity className="w-8 h-8 text-orange-400" /> 
            },
            { 
              title: "Computer Vision QA", 
              desc: "High-speed optical inspection systems that detect sub-millimeter defects in real-time on moving assembly lines.",
              icon: <Eye className="w-8 h-8 text-orange-400" /> 
            },
            { 
              title: "Digital Twin Ops", 
              desc: "Creating real-time virtual replicas of your production floor to simulate 'what-if' scenarios and optimize throughput.",
              icon: <Cpu className="w-8 h-8 text-orange-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-zinc-900/40 border border-white/5 hover:border-orange-500/30 transition-all">
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
          
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Edge <br/>Intelligence</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We bring AI to the machines. By deploying high-performance models 
              at the edge (NVIDIA Jetson, AWS Panorama), we enable real-time 
              decision making that doesn't rely on the cloud, ensuring 
              safety and speed on the shop floor.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-orange-500/30 transition-all">
                  <HardHat className="text-orange-500 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">Worker Safety AI</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:border-orange-500/30 transition-all">
                  <Gauge className="text-orange-500 shrink-0" />
                  <span className="text-xs font-bold uppercase tracking-widest">OEE Optimization</span>
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-orange-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#050301] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Construction className="w-4 h-4 text-orange-500" />
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Line_B42_Sensor_Array</span>
                  </div>
                  <div className="text-[10px] text-orange-500 animate-pulse">MONITORING</div>
               </div>

               <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500 uppercase mb-3 text-center">Equipment Longevity (Remaining)</p>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-orange-500 w-[68%]"></div>
                        </div>
                        <span className="text-xs font-bold">68%</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/10">
                        <p className="text-[8px] text-gray-500 uppercase mb-1">Defect Rate</p>
                        <p className="text-xl font-bold text-emerald-400">0.001%</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[8px] text-gray-500 uppercase mb-1">Energy Draw</p>
                        <p className="text-xl font-bold">-8.4%</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-[#0a0501] rounded-xl border border-dashed border-orange-500/20 text-[10px] text-orange-200">
                  <p className="font-bold mb-1">EDGE_LOG_AI:</p>
                  <p className="italic">"Anomaly detected in Motor_X. High-frequency vibration suggests potential bearing fatigue. Auto-scheduling maintenance during next shift change."</p>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-zinc-900/80 to-black border border-orange-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Engineer <br/>The Future</h2>
            <p className="text-orange-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our industrial AI engineers at DLF Cyber City are building 
              the systems that make factories think.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-orange-600 text-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START SMART BUILD
              </button>
              <div className="text-orange-400 font-mono text-sm tracking-widest uppercase">Industrial Lab: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SmartManufacturingPage;
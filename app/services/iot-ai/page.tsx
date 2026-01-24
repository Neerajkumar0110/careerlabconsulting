import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  Cpu, 
  Radio, 
  Settings, 
  Zap, 
  ShieldCheck, 
  Factory, 
  Activity, 
  ArrowRight,
  HardDrive,
  Waves
} from 'lucide-react';

const IoTAlPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md">
            <Radio className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Industrial Intelligence & Edge</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            PHYSICAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-600 italic">
              AI SYSTEMS
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Bring autonomous intelligence to the physical world. We integrate 
            AI directly into hardware, sensors, and industrial machinery to 
            enable real-time decision-making at the edge.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2">
              Connect Your Hardware <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Predictive Maintenance", 
              desc: "Algorithms that analyze vibration, heat, and sound to predict machine failure before it occurs.",
              icon: <Settings className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "Edge Computer Vision", 
              desc: "On-device visual inspection for quality control on manufacturing lines with zero latency.",
              icon: <Factory className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "Sensor Fusion AI", 
              desc: "Combining data from multiple IoT sources into a single unified neural intelligence layer.",
              icon: <Waves className="text-emerald-400 w-8 h-8" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-emerald-900/5 border border-white/5 hover:border-emerald-500/30 transition-all">
              <div className="mb-6 p-4 bg-emerald-500/10 rounded-2xl inline-block group-hover:bg-emerald-600 transition-all">
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
            <div className="absolute -inset-10 bg-emerald-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
               <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                    <span className="font-mono text-[10px] text-gray-500">REALTIME_SENSOR_DATA</span>
                  </div>
                  <HardDrive className="w-4 h-4 text-gray-600" />
               </div>

               <div className="space-y-6">
                  {[
                    { label: "Thermal Variance", val: "42.8°C", status: "Nominal" },
                    { label: "RPM Efficiency", val: "94%", status: "Optimal" },
                    { label: "Signal Latency", val: "4ms", status: "Edge_Active" }
                  ].map((row, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5 flex justify-between items-center">
                       <div>
                          <p className="text-[10px] text-gray-500 uppercase tracking-widest">{row.label}</p>
                          <p className="text-xl font-bold">{row.val}</p>
                       </div>
                       <span className="text-[10px] px-2 py-1 rounded bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
                          {row.status}
                       </span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">Intelligence <br/>at the Edge</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Cloud dependency is a bottleneck for industrial operations. We deploy 
              lightweight, optimized models directly onto ARM and RISC-V hardware 
              to ensure your systems remain intelligent even in offline environments.
            </p>
            <div className="space-y-4">
               {[
                 { t: "Custom Firmware Integration", i: <Cpu /> },
                 { t: "Zero-Latency Inference", i: <Zap /> },
                 { t: "Encrypted Hardware Handshakes", i: <ShieldCheck /> }
               ].map((point, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-emerald-500/50 transition-all cursor-default">
                    <div className="text-emerald-500">{point.i}</div>
                    <span className="font-bold">{point.t}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-emerald-900/40 to-teal-950/40 border border-emerald-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Sync the <br/>Physical World</h2>
            <p className="text-emerald-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our IoT architects at DLF Cyber City are ready to digitize your 
              industrial footprint.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-emerald-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START PROTOTYPING
              </button>
              <div className="text-emerald-400 font-mono text-sm tracking-widest uppercase">+91 870023 6923</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default IoTAlPage;
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Cpu, 
  Watch, 
  Activity, 
  Eye, 
  Zap, 
  ShieldCheck, 
  ArrowRight,
  HardDrive,
  Waves
} from 'lucide-react';

const HealthDevicesIndustryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Medical IoT & Edge AI Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            INTELLIGENT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-500 italic">
              SILICON CARE
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Intelligence at the point of care. We build low-latency, high-reliability 
            AI models for medical hardware—from wearable biosensors to 
            autonomous surgical robotics and diagnostic imaging devices.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 text-white">
              Engineer Your Device <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Surgical Computer Vision", 
              desc: "Real-time organ segmentation and tool tracking for minimally invasive robotic surgery systems.",
              icon: <Eye className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Wearable Biosignals", 
              desc: "On-device processing of ECG, SpO2, and EEG data using tinyML to detect arrhythmias and seizures instantly.",
              icon: <Watch className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Diagnostic Imaging AI", 
              desc: "Deploying deep learning models for portable ultrasound and X-ray hardware for immediate triage in remote areas.",
              icon: <Activity className="w-8 h-8 text-blue-400" /> 
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
            <div className="absolute -inset-10 bg-cyan-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex justify-between items-center mb-12">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-400" />
                    <span className="text-[10px] text-gray-500 uppercase">Edge_Inference_Core</span>
                  </div>
                  <Waves className="w-4 h-4 text-blue-500 animate-pulse" />
               </div>

               <div className="space-y-8">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500 uppercase mb-3">Neural Processing Unit (NPU) Load</p>
                     <div className="flex items-center gap-4">
                        <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-cyan-500 w-[42%]"></div>
                        </div>
                        <span className="text-xs font-bold">42%</span>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                     <div>
                        <p className="text-[10px] text-gray-500 uppercase mb-1">Inference Latency</p>
                        <p className="text-xl font-bold text-blue-400">8.4ms</p>
                     </div>
                     <div>
                        <p className="text-[10px] text-gray-500 uppercase mb-1">Power Efficiency</p>
                        <p className="text-xl font-bold text-emerald-400">Optimal</p>
                     </div>
                  </div>
               </div>

               <div className="mt-10 pt-6 border-t border-white/5">
                  <p className="text-[10px] text-gray-500">REAL-TIME_TRACER:</p>
                  <p className="text-[11px] text-blue-300 mt-2 italic">
                    "Vascular pattern recognized. Guiding tool path to bypass arterial branch..."
                  </p>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Hardened for <br/>Reliability</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Medical hardware leaves no room for error. We specialize in 
              **Model Quantization** and **Hardware Acceleration** to ensure 
              your AI runs locally on the device—eliminating cloud latency and 
              maintaining patient privacy.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                  <HardDrive className="text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">Firmware Optimized</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5">
                  <ShieldCheck className="text-blue-400" />
                  <span className="text-xs font-bold uppercase tracking-widest">ISO 13485 Ready</span>
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
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Bring Silicon <br/>To Life</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our hardware-AI engineers at DLF Cyber City are ready to build 
              the future of medical robotics and wearables.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START HARDWARE BUILD
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase tracking-widest">Sector 24, Cyber Hub, Gurugram</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HealthDevicesIndustryPage;
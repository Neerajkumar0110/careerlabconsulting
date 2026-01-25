import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Orbit, 
  Cpu, 
  Navigation2, 
  Zap, 
  ShieldCheck, 
  Eye, 
  ArrowRight,
  Route,
  Activity
} from 'lucide-react';

const AutonomousAIPage = () => {
  const avMetrics = [
    { label: "Perception Latency", value: "<8ms", status: "Critical Path" },
    { label: "Object Detection mAP", value: "94.2%", status: "Class-Leading" },
    { label: "Synthetic Training Data", value: "5PB/Mo", status: "Scale" },
    { label: "Safety Disengagements", value: "-68%", status: "YoY Progress" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-violet-600/10 rounded-full blur-[140px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 mb-8 backdrop-blur-md">
            <Orbit className="w-4 h-4 text-violet-400" />
            <span className="text-violet-400 text-xs font-bold uppercase tracking-widest">Autonomous Systems & Perception Vertical</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none uppercase">
            NEURAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-200 via-violet-400 to-indigo-600 italic">
              MOBILITY
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Building the cognitive stack for Level 4 autonomy. From real-time **Sensor Fusion** to 
            **Probabilistic Path Planning**, we deploy the AI that perceives, decides, and navigates 
            the physical world with superhuman reliability.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
            {avMetrics.map((m, i) => (
              <div key={i} className="p-4 bg-white/5 border border-white/10 rounded-2xl text-left">
                <p className="text-[10px] text-violet-400 uppercase font-bold mb-1">{m.label}</p>
                <p className="text-2xl font-black text-white">{m.value}</p>
                <p className="text-[9px] text-gray-500 font-mono tracking-tighter">{m.status}</p>
              </div>
            ))}
          </div>
          
          <div className="flex justify-center">
            <button className="px-12 py-6 bg-violet-600 hover:bg-violet-700 rounded-2xl font-black transition-all shadow-2xl shadow-violet-500/20 flex items-center gap-3 text-white">
              INITIALIZE STACK <ArrowRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Sensor Fusion vX", 
              desc: "Deep integration of Lidar, Radar, and Vision data using Transformer-based architectures for a 360° high-fidelity environmental model.",
              icon: <Eye className="w-8 h-8 text-violet-400" /> 
            },
            { 
              title: "Behavioral Prediction", 
              desc: "Predicting the intent of pedestrians and human-driven vehicles 5 seconds into the future using multi-agent reinforcement learning.",
              icon: <Route className="w-8 h-8 text-violet-400" /> 
            },
            { 
              title: "Synthetic Training", 
              desc: "Generating millions of 'edge-case' scenarios in photorealistic simulators to train models without real-world safety risks.",
              icon: <Zap className="w-8 h-8 text-violet-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-gradient-to-br from-violet-950/20 to-transparent border border-white/5 hover:border-violet-500/30 transition-all">
              <div className="mb-6">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative">
            <div className="absolute -inset-10 bg-violet-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03010a] border border-violet-500/20 rounded-[3rem] p-8 shadow-2xl font-mono">
               <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2 text-violet-400">
                    <Navigation2 className="w-4 h-4" />
                    <span className="text-[10px] uppercase font-black">NAV_KERNEL_RUNTIME</span>
                  </div>
                  <div className="text-[10px] text-emerald-400 font-bold uppercase">System_Active</div>
               </div>

               <div className="aspect-[4/3] bg-zinc-950 rounded-2xl mb-6 relative overflow-hidden border border-white/5">
                  
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#03010a_90%)]"></div>
                  <div className="absolute bottom-4 left-4 space-y-2">
                    <div className="text-[8px] flex items-center gap-2"><div className="w-2 h-2 bg-violet-500 rounded-sm"></div> OBJECT_ID: CAR_774</div>
                    <div className="text-[8px] flex items-center gap-2"><div className="w-2 h-2 bg-cyan-400 rounded-sm"></div> VELOCITY: 44 KM/H</div>
                    <div className="text-[8px] flex items-center gap-2"><div className="w-2 h-2 bg-red-500 rounded-sm"></div> BRAKE_PROB: 0.12%</div>
                  </div>
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between text-[10px] uppercase text-gray-500">
                    <span>Compute Load</span>
                    <span className="text-violet-400">72%</span>
                  </div>
                  <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-violet-500 w-[72%]"></div>
                  </div>
               </div>

               <div className="mt-6 p-4 bg-violet-950/20 rounded-xl border border-dashed border-violet-500/30 text-[9px] text-violet-200">
                  <p className="font-bold uppercase mb-1 tracking-widest">Kernel_Log:</p>
                  <p>Inference complete. Path optimized for urban intersection. Safety constraint "PED_PRIORITY" active.</p>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Infinite <br/>Scenarios</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Autonomous systems fail at the "Edge." Our AI architecture focuses on the 1% 
              of high-risk scenarios that traditional software can't handle. We use **Neural 
              Radiance Fields (NeRFs)** to recreate real-world sensor data, allowing for 
              rapid iteration of driving policies in a safe, digital environment.
            </p>

            <div className="space-y-4">
               {[
                 { icon: <ShieldCheck className="text-violet-400" />, text: "ASIL-D Standard Compliance" },
                 { icon: <Cpu className="text-violet-400" />, text: "Edge-Inference Optimization for SoC" },
                 { icon: <Activity className="text-violet-400" />, text: "Real-time Telemetry & Blackbox Logs" }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:bg-violet-600/10 transition-all">
                    <div className="shrink-0">{item.icon}</div>
                    <span className="text-xs font-bold uppercase tracking-widest text-violet-50">{item.text}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-violet-950/40 to-black border border-violet-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Scale The <br/>Autonomy</h2>
            <p className="text-violet-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Building the brain for the autonomous age. Our Gurugram Hub is 
              architecting the future of urban and industrial mobility.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-violet-950 px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl">
                START AI INTEGRATION
              </button>
              <div className="text-violet-400 font-mono text-sm tracking-widest uppercase italic">Mobility AI Center: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AutonomousAIPage;
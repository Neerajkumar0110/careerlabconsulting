import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Wifi, 
  Share2, 
  Radio, 
  Smartphone, 
  ShieldCheck, 
  CloudLightning, 
  ArrowRight,
  Zap,
  Globe
} from 'lucide-react';

const ConnectedAutoPage = () => {
  // Connectivity-Specific KPIs
  const connectivityData = [
    { label: "V2X Latency", value: "<5ms", desc: "Ultra-Reliable Low Latency" },
    { label: "Data Throughput", value: "2.4 GB/s", desc: "5G/WAVE Integration" },
    { label: "OTA Success Rate", value: "99.99%", desc: "Fail-Safe Updates" },
    { label: "Security Layer", value: "Post-Quantum", desc: "End-to-End Encryption" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(56,189,248,0.05)_0%,_transparent_50%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-md">
            <Radio className="w-4 h-4 text-cyan-400 animate-pulse" />
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest">V2X & Software-Defined Infrastructure</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-none uppercase">
            HYPER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-cyan-400 to-indigo-600 italic">
              CONNECTED
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            The vehicle is no longer an island. We build the **V2X (Vehicle-to-Everything)** architectures that turn cars into active nodes in a smart city, enabling 
            real-time traffic negotiation, remote diagnostics, and immersive in-cabin services.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {connectivityData.map((item, i) => (
              <div key={i} className="p-6 bg-cyan-950/20 border border-cyan-500/10 rounded-3xl text-left backdrop-blur-sm">
                <p className="text-[10px] text-cyan-400 uppercase font-bold mb-1">{item.label}</p>
                <p className="text-2xl font-black text-white">{item.value}</p>
                <p className="text-[9px] text-gray-500 italic mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
          
          <button className="px-12 py-6 bg-cyan-600 hover:bg-cyan-700 rounded-2xl font-black transition-all shadow-2xl shadow-cyan-500/20 flex items-center gap-3 mx-auto text-white">
            EXPLORE THE ECOSYSTEM <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "V2X Communication", 
              desc: "Deploying V2V (Vehicle-to-Vehicle) and V2I (Vehicle-to-Infrastructure) protocols for collaborative safety and platooning.",
              icon: <Share2 className="w-8 h-8 text-cyan-400" /> 
            },
            { 
              title: "Cloud-to-Car OTA", 
              desc: "Seamless, delta-based Over-The-Air update engines that refresh vehicle features without interrupting service.",
              icon: <CloudLightning className="w-8 h-8 text-cyan-400" /> 
            },
            { 
              title: "Edge-Infotainment", 
              desc: "Next-gen cockpit experiences powered by 5G edge computing, delivering low-latency AR navigation and media.",
              icon: <Smartphone className="w-8 h-8 text-cyan-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 hover:border-cyan-500/30 transition-all group">
              <div className="mb-6 p-4 bg-cyan-500/5 rounded-2xl inline-block group-hover:bg-cyan-500 group-hover:text-black transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative">
            <div className="absolute -inset-10 bg-cyan-500/10 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#010610] border border-cyan-500/20 rounded-[3rem] p-10 shadow-2xl font-mono overflow-hidden">
               <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2 text-cyan-400 font-black italic">
                    <Wifi className="w-4 h-4" />
                    <span className="text-[10px] uppercase">Network_Slicing_Active</span>
                  </div>
                  <div className="text-[10px] text-gray-500">SESSION: 0x882A_CONNECTED</div>
               </div>

               <div className="space-y-6">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/5">
                    <p className="text-[10px] text-gray-500 uppercase mb-4 text-center">City-Wide Mesh Throughput</p>
                    <div className="h-32 flex items-center justify-center">
                       
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-cyan-500/5 border border-cyan-500/20">
                        <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Latency (ms)</p>
                        <p className="text-xl font-black text-cyan-400">3.4ms</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Encryption</p>
                        <p className="text-xl font-black text-indigo-400">AES-GCM</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Software <br/>Defined</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We are moving from a hardware-first to a software-first approach. 
              Our architecture decouples hardware from software, enabling 
              **Digital Twin** monitoring and enabling the "Vehicle-as-a-Service" 
              model for global OEMs.
            </p>

            <div className="space-y-4">
               {[
                 { icon: <ShieldCheck className="text-cyan-400" />, text: "Automotive Cybersecurity (ISO 21434)" },
                 { icon: <Globe className="text-cyan-400" />, text: "Global Multi-Cloud Connectivity" },
                 { icon: <Zap className="text-cyan-400" />, text: "Edge-to-Cloud Data Pipelines" }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-500/20 transition-all">
                    {item.icon}
                    <span className="text-xs font-bold uppercase tracking-widest">{item.text}</span>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-indigo-950/40 to-black border border-cyan-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">The Pulsing <br/>Grid</h2>
            <p className="text-cyan-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our network architects at DLF Cyber City are engineering the 
              connectivity protocols that will define the smart mobility era.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-indigo-950 px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl">
                SYNC WITH THE GRID
              </button>
              <div className="text-cyan-400 font-mono text-sm tracking-widest uppercase">Connectivity Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ConnectedAutoPage;
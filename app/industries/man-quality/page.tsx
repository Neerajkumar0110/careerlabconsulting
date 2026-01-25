import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  ScanEye, 
  CheckCircle2, 
  Target, 
  Zap, 
  Microscope, 
  Search, 
  ArrowRight,
  Maximize,
  LineChart,
  ShieldCheck,
  AlertCircle,
  Activity
} from 'lucide-react';

const QualityControlIndustryPage = () => {
  const metrics = [
    { label: "Inspection Accuracy", value: "99.998%", delta: "+4.2%", positive: true },
    { label: "False Rejection Rate", value: "0.02%", delta: "-12%", positive: true },
    { label: "Line Speed Integration", value: "1,200 PPM", delta: "Stable", positive: true },
    { label: "Defect Detection Latency", value: "14ms", delta: "-2ms", positive: true },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-md">
            <ScanEye className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-xs font-bold uppercase tracking-widest italic">Industrial Vision Intelligence v4.2</span>
          </div>
          
          <h1 className="text-6xl md:text-9xl font-black mb-8 tracking-tighter leading-[0.85] uppercase">
            QUANTUM <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 via-cyan-400 to-blue-600 italic">
              PRECISION
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Move beyond statistical sampling. We enable **100% End-of-Line inspection** using Deep Learning models trained on millions of synthetic defect permutations, 
            guaranteeing Six-Sigma quality at full production velocity.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto p-2 bg-white/5 border border-white/10 rounded-[2rem] backdrop-blur-xl">
            {metrics.map((m, i) => (
              <div key={i} className="p-6 text-left border-r border-white/10 last:border-0">
                <p className="text-[10px] text-gray-500 uppercase font-bold mb-1 tracking-wider">{m.label}</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl md:text-2xl font-black text-cyan-50">{m.value}</span>
                  <span className={`text-[10px] ${m.positive ? 'text-emerald-400' : 'text-red-400'}`}>{m.delta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Sub-Pixel Metrology", 
              desc: "AI measurement engines that verify dimensional tolerances down to 0.5 microns, ensuring perfect fit-and-finish for aerospace and medical components.",
              icon: <Maximize className="w-8 h-8 text-cyan-400" />,
              stat: "99.9% Yield"
            },
            { 
              title: "Automated RCA", 
              desc: "Closed-loop feedback systems that trace surface defects back to specific upstream process drifts in real-time.",
              icon: <Search className="w-8 h-8 text-cyan-400" />,
              stat: "40% Faster RCA"
            },
            { 
              title: "Surface Anomaly AI", 
              desc: "Cognitive vision that distinguishes between harmless surface dust and critical structural fractures or micro-fissures.",
              icon: <LineChart className="w-8 h-8 text-cyan-400" />,
              stat: "0% Leakage"
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[3rem] bg-gradient-to-b from-cyan-950/20 to-transparent border border-white/5 hover:border-cyan-500/30 transition-all relative overflow-hidden">
              <div className="mb-6 p-4 bg-cyan-500/10 rounded-2xl inline-block group-hover:bg-cyan-600 group-hover:text-black transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm mb-6">{item.desc}</p>
              <div className="text-cyan-400 font-mono text-xs font-bold py-2 px-4 bg-cyan-500/5 rounded-full inline-block">
                KPI: {item.stat}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-10 bg-cyan-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#01080a] border border-cyan-500/20 rounded-[3rem] p-8 shadow-2xl font-mono">
               <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <Activity className="w-4 h-4 animate-pulse" />
                    <span className="text-[10px] uppercase tracking-widest font-black">AI_CORE_ANALYSIS: LIVE</span>
                  </div>
                  <div className="text-[10px] text-gray-500">FRAME_ID: #X99-204</div>
               </div>

               <div className="aspect-video bg-zinc-950 rounded-2xl mb-8 relative border border-white/10 overflow-hidden flex items-center justify-center">
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent pointer-events-none"></div>
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-cyan-400 animate-scan z-10"></div>
                  
                  <div className="absolute top-10 left-10 border border-red-500 p-2 bg-red-500/10 backdrop-blur-sm">
                    <p className="text-[8px] text-red-500 font-bold uppercase">Solder_Bridge_Defect</p>
                    <p className="text-[10px] text-white">Conf: 98.4%</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                     <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] text-gray-500 uppercase">Surface Variance</span>
                        <span className="text-cyan-400 text-[10px]">±0.002mm</span>
                     </div>
                     <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 w-[15%]"></div>
                     </div>
                  </div>
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/20">
                     <p className="text-[9px] text-red-400 uppercase font-bold mb-1 italic">Action Triggered</p>
                     <p className="text-sm font-bold">Auto-Reject Unit #882</p>
                  </div>
               </div>
               
               <div className="mt-6 text-[10px] text-cyan-200/50 leading-relaxed border-t border-white/5 pt-4">
                 $ ROOT_CAUSE_ENGINE: Anomalous temperature spike detected in Wave-Solder Zone 4 (+4.2°C). 
                 Correlating with defect pattern. Adjusting PLC parameters...
               </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Beyond <br/>Human Eye</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We replace unreliable manual checks with high-frequency cognitive vision. 
              Our systems integrate with your existing high-speed production lines (up to 2,000 units/min) 
              to provide a transparent, audit-ready data trail for every single product produced.
            </p>

            <div className="grid grid-cols-1 gap-4">
              {[
                { icon: <CheckCircle2 className="text-cyan-400" />, text: "Automated 21 CFR Part 11 Compliance for MedTech" },
                { icon: <Microscope className="text-cyan-400" />, text: "Multi-Spectral & X-Ray Integration" },
                { icon: <ShieldCheck className="text-cyan-400" />, text: "Edge-AI Deployment (0 Cloud Dependency)" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 group hover:bg-cyan-600/10 transition-all">
                  <div className="shrink-0">{item.icon}</div>
                  <span className="text-xs font-bold uppercase tracking-widest text-cyan-50">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5 bg-cyan-500/5">
        <ExecutionFlow />
      </div>

      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-[#0a1e26] to-black border border-cyan-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Master <br/>Your Yield</h2>
            <p className="text-cyan-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Ready to eliminate waste and protect your brand? Our Precision Lab at 
              DLF Cyber City is ready to benchmark your production line.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-cyan-500 text-black px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl shadow-cyan-500/20 flex items-center gap-3">
                DEPLOY AI INSPECTION <ArrowRight className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-4 text-cyan-400 font-mono text-sm tracking-widest uppercase">
                <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
                Certified ISO 9001 AI Integration Partner
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default QualityControlIndustryPage;
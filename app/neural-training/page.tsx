import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Zap, 
  Layers, 
  Cpu, 
  Activity, 
  ShieldAlert, 
  Search, 
  ArrowRight,
  Database,
  Terminal,
  UnfoldVertical
} from 'lucide-react';

const NeuralTrainingPage = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-amber-500/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(245,158,11,0.12)_0%,_transparent_60%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 mb-6 backdrop-blur-xl">
            <Cpu className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200">Hyper-Parameter Optimization Active</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            Neural <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-orange-700 italic">
              Distillation
            </span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">
            Generic models aren't enough for the enterprise. We forge custom weights using **LoRA, QLoRA, and Full-Parameter Tuning** to bake your proprietary domain expertise into the model's core architecture.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 bg-amber-600 hover:bg-amber-500 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-2xl shadow-amber-600/30 flex items-center justify-center gap-2">
              Start Training Run <Zap className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">
              View GPU Clusters
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { title: "Data Curation", val: "Cleanse", icon: <Database /> },
              { title: "Weight Tuning", val: "Forge", icon: <Layers /> },
              { title: "RLHF Loop", val: "Align", icon: <UnfoldVertical /> },
              { title: "Model Quantization", val: "Deploy", icon: <Zap /> },
            ].map((step, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-slate-950 border border-white/5 hover:border-amber-500/40 transition-all group text-center">
                <div className="text-amber-500/50 mb-4 group-hover:scale-110 transition-transform flex justify-center">{step.icon}</div>
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-2">Step 0{i+1}</h4>
                <p className="text-xl font-bold text-white mb-1 uppercase">{step.val}</p>
                <p className="text-[11px] text-slate-500">{step.title}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-[#010610]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative group order-2 lg:order-1">
             <div className="absolute -inset-10 bg-amber-500/5 blur-[120px] rounded-full group-hover:bg-amber-500/10 transition-colors"></div>
             <div className="relative bg-black/60 border border-amber-500/20 rounded-[3rem] p-8 md:p-12 shadow-2xl font-mono">
                <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4 text-[10px]">
                  <span className="text-amber-500 font-black tracking-widest animate-pulse">LIVE_LOSS_CONVERGENCE</span>
                  <span className="text-slate-500 uppercase">Cluster: H100_NODE_4</span>
                </div>

                <div className="mt-8 grid grid-cols-2 gap-4">
                   <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                      <p className="text-[8px] text-slate-500 uppercase font-black">Learning Rate</p>
                      <p className="text-xl font-black text-amber-500 tracking-tighter">2e-5</p>
                   </div>
                   <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <p className="text-[8px] text-slate-500 uppercase font-black">Validation Error</p>
                      <p className="text-xl font-black text-emerald-400 italic">0.0042</p>
                   </div>
                </div>

                <div className="mt-6 p-4 bg-slate-900/50 rounded-xl border border-dashed border-white/10 text-[9px] text-slate-400">
                  <span className="text-amber-500 mr-2 font-bold tracking-tighter">LOG:</span>
                  Applying Low-Rank Adaptation (LoRA) to Self-Attention layers... Memory efficient mode enabled.
                </div>
             </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">Refining <br/>The <br/><span className="text-amber-500">Synapse.</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
              We specialize in **Parameter-Efficient Fine-Tuning (PEFT)**. This allows us to deliver high-performance, specialized models that fit on consumer hardware without sacrificing the reasoning depth of foundation models.
            </p>

            <div className="space-y-4 mt-10">
               {[
                 { title: "Quantized Distillation", text: "Compressing 70B models into 8-bit or 4-bit precision with zero accuracy loss." },
                 { title: "Custom RLHF", text: "Aligning models to your corporate ethics and safety guidelines through human feedback." },
                 { title: "Vector Embeddings", text: "Training custom embedding models for industry-specific semantic search." }
               ].map((feat, idx) => (
                 <div key={idx} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-amber-500/20 transition-all cursor-default group">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 group-hover:scale-150 transition-transform"></div>
                    <div>
                       <h4 className="text-xs font-black uppercase tracking-widest text-amber-100 mb-1">{feat.title}</h4>
                       <p className="text-slate-500 text-xs leading-relaxed">{feat.text}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-amber-500/[0.01]">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <Activity className="w-12 h-12 text-amber-500/50 mx-auto mb-8" />
           <h2 className="text-3xl font-black uppercase tracking-[0.3em] text-white mb-6">Massive Scale Compute</h2>
           <p className="text-slate-500 text-sm mb-12 italic">Dedicated H100 and A100 clusters optimized for rapid iteration.</p>
           
           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Total FLOPs</p>
                <p className="text-2xl font-black text-white">420.5 Peta</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">Interconnect</p>
                <p className="text-2xl font-black text-white">NVLink 4.0</p>
              </div>
              <div className="p-6 rounded-3xl bg-slate-900/50 border border-white/5">
                <p className="text-xs font-bold text-slate-500 uppercase mb-2">SLA Uptime</p>
                <p className="text-2xl font-black text-white">99.995%</p>
              </div>
           </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-amber-950/20 to-black border border-amber-500/30 rounded-[3rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden shadow-3xl">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Own Your <br/>Intelligence</h2>
            <p className="text-amber-100/70 text-lg md:text-xl mb-12 max-w-xl mx-auto">
              Stop relying on public APIs. Train a model that is legally and technically yours.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-amber-600 text-white px-16 py-7 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic">
                Schedule Training Audit
              </button>
              <div className="text-amber-500/50 font-mono text-[10px] tracking-[0.4em] uppercase">Compute Node // Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default NeuralTrainingPage;
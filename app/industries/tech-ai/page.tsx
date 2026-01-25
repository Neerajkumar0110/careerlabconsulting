import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import { 
  Cpu, 
  Binary, 
  Boxes, 
  GitBranch, 
  Zap, 
  ArrowRight,
  Workflow,
  Microscope,
  Database
} from 'lucide-react';

const TechAIIndustryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />
      
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Microscope className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Advanced AI Engineering Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            FOR AI <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-600 italic">
              BUILDERS
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            We provide elite engineering support for AI companies. Whether you are 
            fine-tuning open-source LLMs, building multi-agent swarms, or 
            optimizing CUDA kernels, we are your technical force multiplier.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
              Accelerate Your Roadmap <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Model Fine-Tuning", 
              desc: "Specialized LoRA and QLoRA adapters for Llama-3, Mistral, and specialized domain models.",
              icon: <Binary className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Agentic Workflows", 
              desc: "Developing autonomous swarms using LangGraph and CrewAI for complex, multi-step reasoning.",
              icon: <Workflow className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Inference Optimization", 
              desc: "Quantization (GGUF/AWQ) and vLLM deployment to cut your API costs by up to 70%.",
              icon: <Zap className="w-8 h-8 text-blue-400" /> 
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
          
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 bg-blue-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 shadow-2xl">
               <div className="flex items-center gap-2 mb-8 text-[10px] font-mono text-gray-500">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  CLUSTER_LOG_01
               </div>
               
               <div className="space-y-4 font-mono text-xs">
                  <div className="text-blue-400"># Initializing Weight Optimization...</div>
                  <div className="text-gray-500 italic">[{">"}] Loading model: Nexus-Alpha-7b-v2</div>
                  <div className="text-gray-500 italic">[{">"}] Quantization level: 4-bit (AWQ)</div>
                  <div className="text-emerald-400">[{">"}] Throughput: 142 tokens/sec</div>
                  <div className="text-gray-500 italic">[{">"}] Memory Footprint: 5.4GB VRAM</div>
               </div>

               <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500">GPU UTIL</p>
                     <p className="text-xl font-bold">94%</p>
                  </div>
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500">LATENCY</p>
                     <p className="text-xl font-bold">24ms</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">Code-First <br/>Intelligence</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We speak your language—Python, Rust, CUDA, and Mojo. Our team acts as 
              an extension of your engineering unit, helping you clear your 
              backlog of high-complexity AI features and infrastructure bottlenecks.
            </p>

            <div className="space-y-6">
               {[
                 { t: "Custom Vector Retrieval (RAG)", i: <Database /> },
                 { t: "Evaluation Pipelines", i: <GitBranch /> },
                 { t: "Distributed Model Training", i: <Boxes /> }
               ].map((point, idx) => (
                 <div key={idx} className="flex items-center gap-4 group">
                    <div className="p-3 rounded-xl bg-white/5 group-hover:bg-blue-600 transition-all">
                       <div className="text-blue-400 group-hover:text-white">{point.i}</div>
                    </div>
                    <span className="font-bold text-lg">{point.t}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Ship Your <br/>Models Faster</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Collaborate with our AI engineers at DLF Cyber City to push the 
              boundaries of what your platform can do.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl uppercase">
                Sync on Slack
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">Engineer Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TechAIIndustryPage;
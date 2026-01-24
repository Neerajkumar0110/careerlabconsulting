import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  Code2, 
  Cpu, 
  Database, 
  GitBranch, 
  Layers, 
  Terminal, 
  Sparkles, 
  ArrowRight,
  Blocks
} from 'lucide-react';

const CustomAIDevelopmentPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
              <Code2 className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Full-Stack AI Engineering</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter leading-tight">
              BUILDING <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 italic">
                PROPRIETARY AI
              </span>
            </h1>
            
            <p className="max-w-xl text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
              Standard LLMs are just the beginning. We build custom-trained models, 
              fine-tuned agents, and scalable AI infrastructure tailored to your 
              specific enterprise datasets.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
                Engineer My Solution <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-[3rem] blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 overflow-hidden">
                <div className="flex items-center gap-3 mb-10 pb-4 border-b border-white/5">
                  <Terminal className="text-blue-400 w-5 h-5" />
                  <span className="text-xs font-mono text-gray-500 uppercase tracking-widest">Model_Training_Active...</span>
                </div>
                
                <div className="space-y-6">
                   <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-400">Parameter Count</span>
                      <span className="font-bold text-blue-400">70B+ Fine-Tuned</span>
                   </div>
                   <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-3/4 animate-pulse"></div>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4 pt-4">
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                         <Database className="w-5 h-5 text-blue-400 mb-2" />
                         <p className="text-[10px] text-gray-500 uppercase">Vector Database</p>
                         <p className="text-sm font-bold">Integrated</p>
                      </div>
                      <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                         <GitBranch className="w-5 h-5 text-blue-400 mb-2" />
                         <p className="text-[10px] text-gray-500 uppercase">Architecture</p>
                         <p className="text-sm font-bold">RAG-Optimized</p>
                      </div>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold italic">Specialized Vertical Build</h2>
            <p className="text-gray-500 mt-4 text-lg">From RAG pipelines to multi-agent swarms.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "RAG Architectures", desc: "Connecting LLMs to your private data sources with sub-second retrieval latency.", icon: <Layers className="text-blue-400" /> },
              { title: "Agentic Workflows", desc: "Autonomous agents that can use tools, call APIs, and perform multi-step reasoning.", icon: <Blocks className="text-blue-400" /> },
              { title: "Fine-Tuning", desc: "Training models on your industry-specific jargon, style, and domain logic.", icon: <Cpu className="text-blue-400" /> },
              { title: "AI-API Middleware", desc: "Custom bridges that connect your existing ERP/CRM systems to neural compute.", icon: <Code2 className="text-blue-400" /> },
              { title: "Edge AI", desc: "Deploying lightweight, high-performance models for on-premise or mobile environments.", icon: <Sparkles className="text-blue-400" /> },
              { title: "Vector Ops", desc: "Scalable vector database management for handling billions of embeddings.", icon: <Database className="text-blue-400" /> }
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-blue-900/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl inline-block group-hover:bg-blue-600 transition-all">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-20 bg-[#03081a]/50 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic">The Development Pipeline</h2>
        </div>
        
        <div className="mt-20">
          <ExecutionFlow />
        </div>
      </div>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase">Code Your Advantage</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our engineering team at DLF Cyber City is ready to build your 
              proprietary AI core.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START BUILDING
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest">+91 870023 6923</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CustomAIDevelopmentPage;
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Cloud, 
  Cpu, 
  Infinity, 
  Terminal, 
  Database, 
  Zap, 
  ArrowRight,
  ShieldCheck,
  Server
} from 'lucide-react';

const TechCloudIndustryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 backdrop-blur-md">
            <Cloud className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">SaaS & Infrastructure Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            AI-DRIVEN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-blue-600 italic">
              TECH STACKS
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Empowering the creators of the digital world. We help Tech & Cloud 
            companies bake AI intelligence directly into their platforms, 
            automating DevOps, optimizing cloud spend, and building AI-first features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2">
              Modernize Your Platform <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "AI-Native SaaS Features", 
              desc: "From semantic search to generative content tools, we integrate LLMs directly into your product DNA.",
              icon: <Terminal className="w-8 h-8 text-indigo-400" /> 
            },
            { 
              title: "Autonomous DevOps", 
              desc: "Self-healing infrastructure and AI-driven monitoring to predict outages before they affect your SLA.",
              icon: <Infinity className="w-8 h-8 text-indigo-400" /> 
            },
            { 
              title: "GPU Cloud Orchestration", 
              desc: "Building proprietary inference layers to help you offer AI-as-a-Service to your own customers.",
              icon: <Cpu className="w-8 h-8 text-indigo-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-indigo-900/5 border border-white/5 hover:border-indigo-500/30 transition-all">
              <div className="mb-6 p-4 bg-indigo-500/10 rounded-2xl inline-block group-hover:bg-indigo-600 transition-all">
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
            <div className="absolute -inset-10 bg-indigo-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl">
               <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                  <h3 className="text-sm font-mono text-indigo-400 tracking-widest">INFRA_ORCHESTRATOR_v4</h3>
                  <Server className="w-4 h-4 text-gray-500" />
               </div>

               <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 uppercase">Vector Database Sync</span>
                    <span className="text-[10px] px-2 py-1 bg-indigo-500/10 text-indigo-400 rounded">99.9% Match</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 uppercase">Token Cost Efficiency</span>
                    <span className="text-[10px] px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded">-34.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400 uppercase">Auto-Scaling Latency</span>
                    <span className="text-[10px] px-2 py-1 bg-blue-500/10 text-blue-400 rounded">14ms</span>
                  </div>
               </div>

               <div className="mt-8 flex justify-center">
                 <div className="w-full h-24 bg-indigo-500/5 rounded-xl border border-dashed border-indigo-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-indigo-500 animate-pulse" />
                 </div>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">Scale Your <br/>Innovation</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We specialize in deep integrations with modern cloud stacks. Whether 
              you're running on AWS, Azure, or a custom bare-metal GPU cluster, 
              we ensure your AI features are performant and cost-optimized.
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              <div className="flex items-start gap-3">
                <Database className="text-indigo-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold">Managed RAG</h4>
                  <p className="text-xs text-gray-500">Retrieval Augmented Generation at scale.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck className="text-indigo-400 shrink-0 mt-1" />
                <div>
                  <h4 className="font-bold">SOC2/HIPAA</h4>
                  <p className="text-xs text-gray-500">Security-first infrastructure.</p>
                </div>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-indigo-900/40 to-blue-950/40 border border-indigo-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Built for <br/>Scale</h2>
            <p className="text-indigo-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our cloud architects at DLF Cyber City are ready to transform 
              your SaaS into an AI powerhouse.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-indigo-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                UPGRADE YOUR STACK
              </button>
              <div className="text-indigo-400 font-mono text-sm tracking-widest uppercase">Location: Cyber Hub, Gurugram</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TechCloudIndustryPage;
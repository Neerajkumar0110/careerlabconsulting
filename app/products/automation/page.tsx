import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import ProductMatrix from '@/components/sections/ProductMatrix';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { Bot, Settings, Zap, Cpu, Network, Workflow } from 'lucide-react';

const AutomationPlatformPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Bot className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Workflow Orchestration</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            AUTOMATION <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600">
              PLATFORM
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Eliminate repetitive tasks and architectural friction. Deploy autonomous 
            agents that handle complex cross-functional workflows with zero-latency 
            and 100% precision.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20">
              Build Your Workflow
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              API Documentation
            </button>
          </div>
        </div>
      </section>

      <section className="px-6 py-12 relative">
        <div className="max-w-6xl mx-auto">
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-[#03081a] group">
            <img 
              src="https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Automation Logic" 
              className="w-full h-auto opacity-50 group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-6">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="hidden md:flex items-center gap-3 bg-blue-900/40 backdrop-blur-xl border border-blue-400/30 p-4 rounded-2xl animate-pulse">
                            <Workflow className="w-5 h-5 text-blue-400" />
                            <span className="text-xs font-mono">NODE_EXECUTION_{i}: SUCCESS</span>
                        </div>
                    ))}
                </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Agent Orchestration", 
              desc: "Deploy multiple AI agents that collaborate in real-time to solve complex enterprise problems.",
              icon: <Cpu className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Adaptive Pipelines", 
              desc: "Self-healing workflows that automatically reroute tasks based on real-time system performance.",
              icon: <Network className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Universal Connectors", 
              desc: "Native integration with your existing CRM, ERP, and legacy stacks via secure AI gateways.",
              icon: <Settings className="w-8 h-8 text-blue-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-blue-900/5 border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl inline-block group-hover:bg-blue-600 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <ProductMatrix />

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter italic">AUTO-PILOT YOUR SCALE</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our engineering team in Gurugram is ready to architect your autonomous future. 
              Schedule your technical deep-dive today.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START AUTOMATING
              </button>
              <div className="flex items-center gap-3 text-gray-400 font-mono">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span>+91 870023 6923</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AutomationPlatformPage;
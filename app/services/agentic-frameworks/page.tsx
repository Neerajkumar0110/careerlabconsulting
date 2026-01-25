import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  Bot, 
  Workflow, 
  Cpu, 
  Share2, 
  Zap, 
  ShieldAlert, 
  Settings, 
  ArrowRight,
  GitMerge
} from 'lucide-react';

const AgenticFrameworksPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_30%,#1e3a8a_0%,transparent_50%)] opacity-20 -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
              <Workflow className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Autonomous Orchestration</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              AGENTIC <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 italic">
                FRAMEWORKS
              </span>
            </h1>
            
            <p className="max-w-xl text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
              Move beyond static prompts. We build multi-agent ecosystems where 
              autonomous AI entities collaborate to solve complex, multi-step 
              business workflows without human oversight.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
                Deploy Agent Swarm <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-blue-600/10 blur-[120px] rounded-full"></div>
            <div className="relative border border-white/10 rounded-[3rem] p-10 bg-[#03081a]/80 backdrop-blur-xl overflow-hidden">
              <div className="flex justify-between items-center mb-12">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="font-mono text-[10px] text-gray-500">SYSTEM_SWARM_ACTIVE</span>
                </div>
                <Settings className="w-4 h-4 text-gray-600 animate-spin-slow" />
              </div>

              <div className="space-y-8">
                {[
                  { name: "Researcher_Agent", task: "Web Search & Data Synthesis", icon: <Share2 className="w-4 h-4" /> },
                  { name: "Analyst_Agent", task: "Numerical Validation & Logic", icon: <Cpu className="w-4 h-4" /> },
                  { name: "Executor_Agent", task: "API Call & Implementation", icon: <Zap className="w-4 h-4" /> }
                ].map((agent, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 relative z-10">
                    <div className="p-3 rounded-xl bg-blue-600/20 text-blue-400">{agent.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold">{agent.name}</h4>
                      <p className="text-[10px] text-gray-500">{agent.task}</p>
                    </div>
                    <div className="ml-auto flex gap-1">
                      <div className="w-1 h-4 bg-blue-500/40 rounded-full"></div>
                      <div className="w-1 h-4 bg-blue-500/20 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
                <div className="absolute top-[20%] left-1/2 w-px h-[60%] bg-gradient-to-b from-blue-500 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold italic">Swarm Intelligence</h2>
            <p className="text-gray-500 mt-4 text-lg">Orchestrating autonomous logic at enterprise scale.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Task Decomposition", desc: "Agents that can break down a complex 'Goal' into actionable sub-tasks autonomously.", icon: <GitMerge className="text-blue-400" /> },
              { title: "Tool Use (Function Calling)", desc: "AI entities capable of interacting with your existing software stack, databases, and APIs.", icon: <Settings className="text-blue-400" /> },
              { title: "Self-Correction", desc: "Autonomous feedback loops where 'Reviewer' agents validate and correct the work of 'Worker' agents.", icon: <ShieldAlert className="text-blue-400" /> },
              { title: "Memory Systems", desc: "Implementing long-term vector memory so agents remember past context and preferences.", icon: <Bot className="text-blue-400" /> },
              { title: "Swarm Orchestration", desc: "Managing hundreds of specialized agents working toward a single unified objective.", icon: <Workflow className="text-blue-400" /> },
              { title: "Zero-Latency Routing", desc: "Dynamic intent routing to the most qualified agent for a specific query or action.", icon: <Zap className="text-blue-400" /> }
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

      <div className="py-20 border-y border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic">Agent Interaction Protocol</h2>
        </div>
        
        <div className="mt-20">
          <ExecutionFlow />
        </div>
      </div>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Automate the <br/>Un-Automatable</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our swarm architects at DLF Cyber City are ready to design your 
              autonomous agent workforce.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START DEPLOYMENT
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

export default AgenticFrameworksPage;
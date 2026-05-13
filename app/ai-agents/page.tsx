import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Bot, 
  Cpu, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Terminal, 
  Network, 
  Search,
  ArrowRight,
  Database,
  Eye
} from 'lucide-react';

const AIAgentsPage = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(79,70,229,0.15)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-6 backdrop-blur-xl">
            <Activity className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-200">Autonomous Agentic Layer v4.0</span>
          </div>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            Digital <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-500 to-purple-600 italic">
              Workforce
            </span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">
            Deploy autonomous agents that don't just "chat"—they execute. From real-time supply chain healing to autonomous legal research, our agents operate with 99.9% reliability in high-stakes environments.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-500 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xl shadow-indigo-600/30">
              Initialize New Agent <Bot className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">
              View Agent Logs
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Cognitive Analyst", 
              desc: "Deep-research agents that perform massive-scale data synthesis, sentiment tracking, and predictive forecasting.",
              icon: <Search className="w-8 h-8 text-indigo-400" /> 
            },
            { 
              title: "Execution Sentinel", 
              desc: "Transaction-layer agents that handle API calls, smart contract executions, and database management without human intervention.",
              icon: <Zap className="w-8 h-8 text-indigo-400" /> 
            },
            { 
              title: "Security Warden", 
              desc: "Persistent guardians that monitor network health, detect anomalies, and auto-patch vulnerabilities in real-time.",
              icon: <ShieldCheck className="w-8 h-8 text-indigo-400" /> 
            }
          ].map((agent, i) => (
            <div key={i} className="group p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-indigo-500/40 transition-all relative overflow-hidden">
              <div className="mb-8 p-4 bg-indigo-500/5 rounded-2xl inline-block group-hover:bg-indigo-500 group-hover:text-black transition-all">
                {agent.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{agent.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{agent.desc}</p>
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-[10px] uppercase tracking-widest">
                Deploying to Node Alpha-9 <ArrowRight className="w-3 h-3" />
              </div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 -mr-16 -mt-16 rounded-full blur-3xl group-hover:bg-indigo-500/10 transition-colors"></div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-[#030816]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-10 bg-indigo-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-black/40 border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden">
               <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/30"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/30"></div>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500">AGENT_PROTOCOL_STACK.json</span>
               </div>

               <div className="mt-8 space-y-4 font-mono text-xs">
                  <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-indigo-200">
                    <span className="text-indigo-500 mr-2">$</span> exec agent_rethink --goal "Optimize Logistics"
                  </div>
                  <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-slate-400">
                    <p className="animate-pulse">Thinking: Analyzing current traffic latency...</p>
                    <p className="text-emerald-400 mt-2 font-bold">Success: Rerouted 400 shipments. Estimated savings: $4.2k</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">Logic <br/>Above <br/><span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-8">Code.</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
              Our agents utilize a **Recursive Planning Engine**. They decompose complex high-level goals into tactical sub-tasks, choosing their own tools and verifying their own results through multi-step reasoning.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[
                 { icon: <Database />, title: "Long-term Memory", text: "Persistent vector-storage for agent recall." },
                 { icon: <Network />, title: "Agent Swarms", text: "Multi-agent coordination for massive tasks." },
                 { icon: <Eye />, title: "Observability", text: "Full human-in-the-loop audit trails." },
                 { icon: <Terminal />, title: "Tool Integration", text: "Native 100+ API & DB integrations." }
               ].map((feat, idx) => (
                 <div key={idx} className="flex flex-col gap-3 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                    <div className="text-indigo-400">{React.cloneElement(feat.icon as React.ReactElement<any>, { width: 20, height: 20 })}</div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-indigo-100">{feat.title}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{feat.text}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-indigo-500/[0.01]">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <Cpu className="w-12 h-12 text-slate-500/50 mx-auto mb-8 animate-spin-slow" />
           <h2 className="text-3xl font-black uppercase tracking-[0.3em] text-white mb-6">Scale Your Intelligence</h2>
           <p className="text-slate-500 text-sm mb-12 italic">"One agent is an assistant. A swarm is a department."</p>
           
           <div className="flex flex-wrap justify-center gap-3">
              {['Inventory_Bot', 'Legal_Draft_Bot', 'Fraud_Sentinel', 'Customer_Joy_Agent', 'Billing_Oracle'].map((tag, i) => (
                <div key={i} className="px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400 text-[10px] font-mono font-bold hover:bg-indigo-500 hover:text-white transition-colors cursor-default">
                  {tag} :: ACTIVE
                </div>
              ))}
           </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-indigo-950/40 to-black border border-indigo-500/30 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Hire Your <br/>Last Employee</h2>
            <p className="text-indigo-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our agent architects at DLF Cyber City are building the workforce of 2030 today. Secure your node on the autonomous network.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-indigo-900 px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic">
                Initialize Swarm
              </button>
              <div className="text-indigo-400/60 font-mono text-[10px] tracking-[0.4em] uppercase">Autonomous Cluster // Gurugram Node</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AIAgentsPage;
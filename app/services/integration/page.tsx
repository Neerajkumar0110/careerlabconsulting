import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  Zap, 
  Unplug, 
  Link as LinkIcon, 
  Server, 
  Database, 
  ShieldCheck, 
  ArrowRight,
  RefreshCw,
  Cpu
} from 'lucide-react';

const AIIntegrationPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
              <Unplug className="w-4 h-4 text-blue-400" />
              <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Enterprise Connectivity</span>
            </div>
            
            <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-[0.9]">
              SEAMLESS <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-500 to-blue-600 italic">
                INTEGRATION
              </span>
            </h1>
            
            <p className="max-w-xl text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
              Intelligence is useless in isolation. We build the high-speed bridges 
              required to embed AI directly into your existing ERP, CRM, and 
              operational workflows with zero downtime.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
                Connect Your Stack <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-12 overflow-hidden shadow-2xl">
                <div className="flex justify-between items-center mb-12">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></div>
                      <span className="font-mono text-[10px] text-blue-400 uppercase tracking-widest">Pipeline_Healthy</span>
                   </div>
                   <LinkIcon className="w-5 h-5 text-gray-600" />
                </div>

                <div className="flex flex-col items-center gap-4">
                   <div className="w-full p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
                      <Server className="w-5 h-5 text-blue-400" />
                      <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-blue-500 w-[70%] animate-pulse"></div>
                      </div>
                      <span className="text-[10px] font-mono">Legacy_ERP</span>
                   </div>
                   <div className="h-8 w-px bg-gradient-to-b from-blue-500/50 to-transparent"></div>
                   <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)]">
                      <Cpu className="text-white w-8 h-8" />
                   </div>
                   <div className="h-8 w-px bg-gradient-to-t from-blue-500/50 to-transparent"></div>
                   <div className="w-full p-4 rounded-xl bg-white/5 border border-white/5 flex items-center gap-4">
                      <Database className="w-5 h-5 text-indigo-400" />
                      <div className="h-2 flex-1 bg-white/10 rounded-full overflow-hidden">
                         <div className="h-full bg-indigo-500 w-[90%] animate-pulse"></div>
                      </div>
                      <span className="text-[10px] font-mono">Vector_DB</span>
                   </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Custom API Wrappers", desc: "Developing secure, low-latency REST and GraphQL interfaces for legacy systems.", icon: <LinkIcon className="text-blue-400" /> },
              { title: "Real-time Data Sync", desc: "Bidirectional synchronization between your AI models and primary databases.", icon: <RefreshCw className="text-blue-400" /> },
              { title: "Event-Driven Hooks", desc: "Triggering AI actions automatically based on ERP or CRM state changes.", icon: <Zap className="text-blue-400" /> },
              { title: "Security Handshakes", desc: "Implementing OAuth, JWT, and custom encryption layers for AI data transit.", icon: <ShieldCheck className="text-blue-400" /> },
              { title: "Multi-Cloud Bridge", desc: "Seamlessly connecting on-premise infrastructure with private AI cloud nodes.", icon: <Server className="text-blue-400" /> },
              { title: "Auto-Healing Pipelines", desc: "Middleware that detects and resolves connection drops autonomously.", icon: <Cpu className="text-blue-400" /> }
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

      <section className="py-24 px-6 border-y border-white/5 bg-[#03081a]/30">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic">The Integration Layer</h2>
          <p className="text-gray-500 mt-4">Standardized architecture for the modern AI stack.</p>
        </div>

        <div className="mt-20">
          <ExecutionFlow />
        </div>
      </section>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Unify Your <br/>Intelligence</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our integration engineers at DLF Cyber City are ready to plug AI 
              into your core operations.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START INTEGRATION
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

export default AIIntegrationPage;
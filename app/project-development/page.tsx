import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  GitBranch, 
  Layers, 
  Code2, 
  Terminal, 
  CheckCircle2, 
  Cpu, 
  Zap, 
  ArrowRight,
  Boxes,
  TestTube2
} from 'lucide-react';

const ProjectDevelopmentPage = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-orange-500/30">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-10 -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8 backdrop-blur-xl">
            <Terminal className="w-3.5 h-3.5 text-orange-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-200">Production-Ready AI Systems</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            Build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-200 via-orange-500 to-red-700 italic">
              The Engine
            </span>
          </h1>

          <p className="max-w-3xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">
            We move beyond the sandbox. Our development squad builds scalable, resilient, and AI-native applications using a **DevOps-first** approach to neural integration. From PoC to Global Scale in weeks.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 bg-orange-600 hover:bg-orange-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-2xl shadow-orange-600/30 flex items-center justify-center gap-2">
              Start Your Sprint <GitBranch className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              Technical Stack
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { phase: "01", title: "Discovery", desc: "Feasibility audits & neural architecture design." },
            { phase: "02", title: "Rapid PoC", desc: "MVP development with core AI logic integration." },
            { phase: "03", title: "Hardening", desc: "Security audits, latency tuning, and UX polish." },
            { phase: "04", title: "Deployment", desc: "Auto-scaling CI/CD pipelines & model monitoring." },
          ].map((item, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 relative group hover:bg-slate-900 transition-colors">
              <span className="text-4xl font-black text-orange-500/20 mb-4 block group-hover:text-orange-500/40 transition-colors">{item.phase}</span>
              <h3 className="text-xl font-bold mb-2 uppercase italic">{item.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="order-2 lg:order-1 relative group">
            <div className="absolute -inset-10 bg-orange-600/5 blur-[120px] rounded-full group-hover:bg-orange-600/10 transition-colors"></div>
            <div className="relative bg-black/60 border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl font-mono">
               <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2 text-orange-400 font-black italic text-[10px]">
                    <Boxes className="w-4 h-4" />
                    SYSTEM_ARCH_v2.0
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                    <div className="w-2 h-2 rounded-full bg-orange-500/20"></div>
                  </div>
               </div>

               <div className="mt-8 grid grid-cols-3 gap-2">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full bg-orange-500 rounded-full ${i < 5 ? 'w-full' : 'w-1/2 animate-pulse'}`}></div>
                    </div>
                  ))}
               </div>
               <p className="mt-4 text-[9px] text-slate-500 uppercase tracking-widest">Building: Autonomous_Agent_Cluster</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">Code <br/>That <br/><span className="text-orange-500">Thinks.</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
              We specialize in **Full-Stack AI Engineering**. We don't just call an API; we architect the vector databases, the prompt-caching layers, and the custom middleware that makes AI feel instantaneous.
            </p>

            <div className="space-y-6 mt-10">
               {[
                 { icon: <Code2 className="text-orange-500" />, title: "Type-Safe AI Integration", text: "Enterprise-grade TypeScript & Rust implementations for model stability." },
                 { icon: <Layers className="text-orange-500" />, title: "RAG & Vector Stacks", text: "High-speed retrieval architectures using Pinecone, Milvus, or pgvector." },
                 { icon: <TestTube2 className="text-orange-500" />, title: "Automated Evaluation", text: "Strict testing for hallucinations, latency, and token efficiency." }
               ].map((feat, idx) => (
                 <div key={idx} className="flex gap-5 group">
                    <div className="mt-1 p-2 bg-white/5 rounded-xl group-hover:bg-orange-500 group-hover:text-black transition-all">
                      {feat.icon}
                    </div>
                    <div>
                       <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">{feat.title}</h4>
                       <p className="text-slate-500 text-sm leading-relaxed">{feat.text}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-orange-500/[0.01]">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
           <p className="text-center text-[10px] font-bold text-slate-500 uppercase tracking-[0.5em] mb-12 italic">Our Production Arsenal</p>
           <div className="flex flex-wrap justify-center gap-x-12 gap-y-8 opacity-40 hover:opacity-100 transition-opacity">
              {['Next.js', 'Python', 'PyTorch', 'Rust', 'Kubernetes', 'AWS', 'Supabase', 'LangChain', 'OpenAI'].map((tech, i) => (
                <span key={i} className="text-2xl font-black text-white tracking-tighter hover:text-orange-500 cursor-default transition-colors">{tech}</span>
              ))}
           </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-orange-950/20 to-black border border-orange-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">From Idea <br/>To Deployment.</h2>
            <p className="text-orange-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
              Stop waiting on technical debt. Build the future with a development partner that understands the neural frontier.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-black px-16 py-7 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic">
                Initialize Your Project
              </button>
              <div className="text-orange-500/50 font-mono text-[10px] tracking-[0.4em] uppercase">Development Node // Gurugram Hub</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default ProjectDevelopmentPage;
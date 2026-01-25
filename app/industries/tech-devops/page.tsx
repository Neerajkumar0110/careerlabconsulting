import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  Infinity, 
  Terminal, 
  Cpu, 
  Settings, 
  Activity, 
  GitMerge, 
  ArrowRight,
  ShieldCheck,
  Container
} from 'lucide-react';

const AIDevOpsPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md">
            <Infinity className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Autonomous Infrastructure & MLOps</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            INTELLIGENT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-600 italic uppercase">
              Operations
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Move from manual deployments to autonomous cycles. We build 
            self-healing CI/CD pipelines and MLOps frameworks that automate 
            model monitoring, retraining, and infrastructure scaling.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2">
              Deploy Your Pipeline <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "MLOps Lifecycle", 
              desc: "Automated model versioning, deployment, and A/B testing frameworks for seamless AI transitions.",
              icon: <GitMerge className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "GPU Cluster Mgmt", 
              desc: "Optimizing Kubernetes orchestrations for high-concurrency GPU workloads and inference servers.",
              icon: <Cpu className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "Self-Healing Infra", 
              desc: "AI-driven monitoring that detects anomalies and automatically triggers recovery protocols.",
              icon: <Settings className="w-8 h-8 text-emerald-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-emerald-900/5 border border-white/5 hover:border-emerald-500/30 transition-all">
              <div className="mb-6 p-4 bg-emerald-500/10 rounded-2xl inline-block group-hover:bg-emerald-600 transition-all">
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
            <div className="absolute -inset-10 bg-emerald-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#050101] border border-white/5 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex items-center gap-2 mb-8 border-b border-white/10 pb-4">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  <span className="text-[10px] text-emerald-500/70">DEVOPS_AGENT_STATUS: ACTIVE</span>
               </div>

               <div className="space-y-6">
                  <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded bg-emerald-500/20 flex items-center justify-center text-emerald-500 text-xs">01</div>
                     <div className="flex-1">
                        <div className="flex justify-between text-[10px] mb-1">
                           <span>Build Sequence</span>
                           <span className="text-emerald-400">SUCCESS</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-500 w-full"></div>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded bg-blue-500/20 flex items-center justify-center text-blue-500 text-xs">02</div>
                     <div className="flex-1">
                        <div className="flex justify-between text-[10px] mb-1">
                           <span>Model Quantization</span>
                           <span className="text-blue-400">IN_PROGRESS</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                           <div className="h-full bg-blue-500 w-[65%] animate-pulse"></div>
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-4">
                     <div className="w-8 h-8 rounded bg-white/5 flex items-center justify-center text-gray-500 text-xs">03</div>
                     <div className="flex-1">
                        <div className="flex justify-between text-[10px] mb-1 text-gray-600">
                           <span>Edge Deployment</span>
                           <span>PENDING</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full"></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">Scale Without <br/>the Friction</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We specialize in Infrastructure as Code (IaC) and containerization 
              specifically for AI workloads. From Terraform to Docker and 
              Kubernetes, we ensure your AI application stays online, no matter 
              how many users are querying it.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
               <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
                  <Container className="text-emerald-400" />
                  <span className="font-bold text-sm">Docker/K8s</span>
               </div>
               <div className="p-5 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-2">
                  <Activity className="text-emerald-400" />
                  <span className="font-bold text-sm">Real-time Obs</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-emerald-900/40 to-black border border-emerald-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Automate <br/>Everything</h2>
            <p className="text-emerald-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our DevOps engineers at DLF Cyber City are ready to optimize 
              your cloud infrastructure for the AI era.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-emerald-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START AUTOMATION
              </button>
              <div className="text-emerald-400 font-mono text-sm tracking-widest uppercase">Safety Location: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AIDevOpsPage;
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  Cloud, 
  Server, 
  ShieldCheck, 
  Cpu, 
  Database, 
  Activity, 
  ArrowRight,
  Globe,
  HardDrive
} from 'lucide-react';

const AICloudPlatformsPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Cloud className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Global AI Infrastructure</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            AI-OPTIMIZED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 italic">
              CLOUD STACK
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Secure, scalable, and built for heavy inference. We architect hybrid and 
            multi-cloud environments specifically tuned for large-scale AI model 
            deployment and vector workloads.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
              Provision Your Cluster <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "GPU Orchestration", 
              desc: "Automated provisioning of NVIDIA A100/H100 clusters with Kubernetes orchestration.",
              icon: <Cpu className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Hybrid Cloud AI", 
              desc: "Seamless bridging between on-premise sensitive data and scalable public cloud compute.",
              icon: <Server className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Secure Inference", 
              desc: "Private endpoints and encrypted data-in-transit for zero-trust AI architectures.",
              icon: <ShieldCheck className="w-8 h-8 text-blue-400" /> 
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
          
          <div className="relative">
            <div className="absolute -inset-10 bg-blue-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 shadow-2xl overflow-hidden group">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2">
                   <Activity className="w-4 h-4 text-blue-400" />
                   <span className="font-mono text-[10px] text-gray-500">LIVE_INFRA_METRICS</span>
                </div>
                <div className="px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] text-emerald-400 font-bold uppercase">
                  All Systems Nominal
                </div>
              </div>

              <div className="space-y-6">
                 {[
                   { label: "Compute Load (GPU-1)", val: 68 },
                   { label: "Storage Thruput (S3)", val: 42 },
                   { label: "Network Latency", val: 12 }
                 ].map((stat, i) => (
                   <div key={i} className="space-y-2">
                     <div className="flex justify-between text-[10px] font-mono uppercase text-gray-400">
                        <span>{stat.label}</span>
                        <span>{stat.val}{stat.label.includes('Latency') ? 'ms' : '%'}</span>
                     </div>
                     <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${stat.val}%` }}></div>
                     </div>
                   </div>
                 ))}
              </div>

              <div className="mt-10 grid grid-cols-3 gap-4">
                 <div className="h-20 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
                    <Globe className="w-5 h-5 text-blue-400 mb-1" />
                    <span className="text-[8px] font-mono text-gray-500 uppercase">Edge Nodes</span>
                 </div>
                 <div className="h-20 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
                    <Database className="w-5 h-5 text-blue-400 mb-1" />
                    <span className="text-[8px] font-mono text-gray-500 uppercase">Vector DB</span>
                 </div>
                 <div className="h-20 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center">
                    <HardDrive className="w-5 h-5 text-blue-400 mb-1" />
                    <span className="text-[8px] font-mono text-gray-500 uppercase">Sovereign</span>
                 </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">Engineered for <br/>Inference</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We specialize in AWS, Azure, and Google Cloud AI stacks, but we also 
              build custom **Private Cloud** solutions for enterprises with strict 
              sovereignty requirements.
            </p>
            
            <div className="space-y-4 pt-6">
               <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-blue-500/50 transition-all">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="font-bold">Auto-scaling GPU Workloads</span>
               </div>
               <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 group hover:border-blue-500/50 transition-all">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <span className="font-bold">SOC2 & GDPR Compliance Ready</span>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Your Cloud. <br/>Your Rules.</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our cloud architects at DLF Cyber City are ready to deploy your 
              next-gen AI infrastructure.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START PROVISIONING
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">+91 870023 6923</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AICloudPlatformsPage;
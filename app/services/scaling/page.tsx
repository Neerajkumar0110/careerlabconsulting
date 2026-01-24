import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Rocket, 
  Globe, 
  Zap, 
  BarChart, 
  Server, 
  Infinity, 
  ArrowRight,
  TrendingUp,
  Activity
} from 'lucide-react';

const AIScalingPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 backdrop-blur-md">
            <Rocket className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Enterprise Industrialization</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            SCALE TO <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-600 italic">
              INFINITY
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Move from a single agent to a global swarm. We provide the infrastructure, 
            GPU orchestration, and monitoring layers required to serve millions of 
            users with 99.9% uptime.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2">
              Launch Scaling Audit <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "GPU Orchestration", 
              desc: "Dynamic load balancing across H100/A100 clusters to ensure sub-second inference latency.",
              icon: <Server className="w-8 h-8 text-indigo-400" /> 
            },
            { 
              title: "Global Distribution", 
              desc: "Deploy AI nodes across 40+ regions to maintain low-latency response times for global users.",
              icon: <Globe className="w-8 h-8 text-indigo-400" /> 
            },
            { 
              title: "Elastic Concurrency", 
              desc: "Infrastructure that auto-scales based on token demand, handling sudden spikes without failure.",
              icon: <Zap className="w-8 h-8 text-indigo-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-indigo-900/5 border border-white/5 hover:border-indigo-500/30 transition-all">
              <div className="mb-6 p-4 bg-indigo-500/10 rounded-2xl inline-block group-hover:bg-indigo-600 group-hover:text-white transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative">
            <div className="absolute -inset-10 bg-indigo-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-3">
                   <Activity className="w-4 h-4 text-indigo-500 animate-pulse" />
                   <span className="font-mono text-[10px] text-gray-500">CLUSTER_HEALTH_MONITOR</span>
                </div>
                <Infinity className="text-indigo-500 w-5 h-5" />
              </div>

              <div className="space-y-8">
                <div>
                  <div className="flex justify-between text-[10px] uppercase text-gray-500 font-bold mb-2">
                    <span>Token Throughput</span>
                    <span className="text-indigo-400">1.2M / sec</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 w-[92%]"></div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] text-gray-500 uppercase">Latency</p>
                    <p className="text-2xl font-black italic text-indigo-400">140ms</p>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] text-gray-500 uppercase">Uptime</p>
                    <p className="text-2xl font-black italic text-indigo-400">99.99%</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter leading-tight">Zero-Friction <br/>Deployment</h2>
            <div className="space-y-8">
              {[
                { t: "Predictive Scaling", d: "AI that predicts token usage spikes and scales GPU resources ahead of time.", i: <TrendingUp className="text-indigo-400" /> },
                { t: "Multi-Model Routing", d: "Dynamically switch between models based on task complexity to save costs.", i: <Zap className="text-indigo-400" /> },
                { t: "Telemetry & Logs", d: "Full-stack observability to monitor agent behavior and cost per request.", i: <BarChart className="text-indigo-400" /> }
              ].map((point, idx) => (
                <div key={idx} className="flex gap-5 group">
                  <div className="mt-1 p-3 rounded-xl bg-white/5 group-hover:bg-indigo-500 group-hover:text-black transition-all">
                    {point.i}
                  </div>
                  <div>
                    <h4 className="text-xl font-bold mb-1">{point.t}</h4>
                    <p className="text-gray-400 leading-relaxed text-sm">{point.d}</p>
                  </div>
                </div>
              ))}
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
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Go Global <br/>Instantly</h2>
            <p className="text-indigo-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our infrastructure architects at DLF Cyber City are ready to take 
              your AI from pilot to production.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-indigo-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                UPGRADE STACK
              </button>
              <div className="text-indigo-400 font-mono text-sm tracking-widest uppercase">Location: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AIScalingPage;
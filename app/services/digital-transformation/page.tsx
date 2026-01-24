import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import SuccessStories from '@/components/sections/SuccessStories';
import { RefreshCcw, Cpu, Network, Cloud, ShieldCheck, ArrowRight, Activity } from 'lucide-react';

const DigitalTransformationPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <RefreshCcw className="w-4 h-4 text-blue-400 animate-spin-slow" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Legacy to AI-Native</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            DIGITAL <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 italic">
              TRANSFORMATION
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Don't just digitize—evolve. We bridge the gap between legacy infrastructure and 
            autonomous intelligence, turning technical debt into a competitive engine.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center gap-2">
              Start Your Migration <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              Modernization Roadmap
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Legacy Modernization", 
              desc: "De-risk your migration by wrapping legacy core systems in AI-ready microservices.",
              icon: <Cpu className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Cloud-Native Pivot", 
              desc: "Shift from server-bound operations to elastic, autonomous cloud architectures.",
              icon: <Cloud className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Data Re-Architecting", 
              desc: "Transform siloed databases into a unified, high-velocity data mesh.",
              icon: <Network className="w-8 h-8 text-blue-400" /> 
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

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic mb-4">The Evolution Framework</h2>
          <p className="text-gray-500">How we move your enterprise from 1.0 to 4.0.</p>
        </div>
        
        

        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center pt-12">
          <div className="relative p-10 bg-gradient-to-br from-blue-900/20 to-transparent border border-white/10 rounded-[3rem]">
            <div className="flex items-center gap-4 mb-8">
              <Activity className="text-blue-400 w-8 h-8" />
              <h3 className="text-2xl font-black italic">Migration Dashboard</h3>
            </div>
            <div className="space-y-6">
              {[
                { label: "Architecture Decoupling", val: 88 },
                { label: "API Connectivity", val: 65 },
                { label: "AI Integration Readiness", val: 42 }
              ].map((stat, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-mono uppercase text-gray-400">
                    <span>{stat.label}</span>
                    <span>{stat.val}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${stat.val}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-bold mb-6">Autonomous Foundation</h3>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
              We don't just add a layer of AI; we rebuild your foundation to be 
              **self-healing** and **self-optimizing**. Our transformation suite ensures 
              that your business processes evolve at the speed of neural compute.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <ShieldCheck className="text-blue-400 mb-2 w-5 h-5" />
                <p className="text-sm font-bold">Zero-Downtime Migration</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                <Cpu className="text-blue-400 mb-2 w-5 h-5" />
                <p className="text-sm font-bold">Legacy Refactoring</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <FeatureGrid />
      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase">Modernize at Scale</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our digital architects at DLF Cyber City are ready to map your 
              enterprise evolution.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                BOOK AUDIT
              </button>
              <div className="flex items-center gap-3 text-blue-400 font-mono text-sm tracking-widest">
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

export default DigitalTransformationPage;
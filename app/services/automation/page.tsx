import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  Zap, 
  Workflow, 
  MousePointerClick, 
  Repeat, 
  Cog, 
  Gauge, 
  ArrowRight,
  Clock,
  Layers
} from 'lucide-react';

const AIAutomationPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Efficiency Engineering</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            INTELLIGENT <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 italic">
              AUTOMATION
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Stop wasting human intelligence on repetitive tasks. We design and deploy 
            autonomous workflows that handle data entry, lead nurturing, and complex 
            operations while you sleep.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
              Automate My Business <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              See Live Demo
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Cognitive Workflows", 
                desc: "AI that makes decisions within your process chain, routing tasks based on intent and priority.",
                icon: <Workflow className="w-8 h-8 text-blue-400" /> 
              },
              { 
                title: "Robotic Process AI", 
                desc: "Legacy software automation enhanced with computer vision to interact with non-API interfaces.",
                icon: <MousePointerClick className="w-8 h-8 text-blue-400" /> 
              },
              { 
                title: "Data Pipeline Sync", 
                desc: "Autonomous moving and cleaning of data between your CRM, ERP, and Analytics dashboards.",
                icon: <Repeat className="w-8 h-8 text-blue-400" /> 
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
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative">
            <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
               <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-2">
                    <Cog className="w-5 h-5 text-blue-400 animate-spin-slow" />
                    <span className="font-mono text-sm tracking-widest text-blue-400">AUTOMATION_CORE_v2.0</span>
                  </div>
                  <Gauge className="w-5 h-5 text-gray-600" />
               </div>

               <div className="space-y-8">
                  {[
                    { label: "Active Workflows", val: "148", trend: "+12%" },
                    { label: "Hours Saved / Mo", val: "1,240", trend: "+24%" },
                    { label: "Error Rate", val: "0.02%", trend: "-80%" }
                  ].map((stat, idx) => (
                    <div key={idx} className="flex justify-between items-end border-b border-white/5 pb-4">
                      <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest">{stat.label}</p>
                        <p className="text-3xl font-black italic">{stat.val}</p>
                      </div>
                      <span className={`text-xs font-bold ${stat.trend.includes('+') ? 'text-emerald-400' : 'text-blue-400'}`}>
                        {stat.trend}
                      </span>
                    </div>
                  ))}
               </div>

               <div className="mt-10 flex gap-4">
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 w-[80%]"></div>
                  </div>
                  <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-600 w-[60%]"></div>
                  </div>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">Zero-Touch <br/>Operations</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We build "Autopilot" modes for your business. By integrating AI into 
              the core of your operational stack, we reduce human error to near-zero 
              and increase output velocity by up to **10x**.
            </p>
            <div className="space-y-6">
              {[
                { t: "Predictive Task Queuing", i: <Clock className="w-5 h-5" /> },
                { t: "Multi-Layer Process Mapping", i: <Layers className="w-5 h-5" /> },
                { t: "API-First Implementation", i: <Zap className="w-5 h-5" /> }
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-4 text-gray-200 font-bold group">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    {point.i}
                  </div>
                  {point.t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-20 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
           <h3 className="text-3xl font-bold italic">The Automation Roadmap</h3>
        </div>
        
        <div className="mt-12">
            <ExecutionFlow />
        </div>
      </div>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Scale Without <br/>Hiring</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our automation architects at DLF Cyber City are ready to build 
              your autonomous future.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START AUTOMATING
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

export default AIAutomationPage;
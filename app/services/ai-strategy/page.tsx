import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { Lightbulb, Compass, BarChart4, ShieldCheck, Microscope, Layers } from 'lucide-react';

const AIStrategyPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8">
              <span className="text-blue-400 text-xs font-bold uppercase tracking-[0.3em]">Consulting Division</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-black mb-8 leading-[1.1]">
              Architecting Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">
                AI Roadmap
              </span>
            </h1>
            
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl leading-relaxed">
              Don't just adopt AI—integrate it. We help global enterprises define, 
              validate, and deploy AI strategies that drive measurable ROI and 
              long-term competitive advantage.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20">
                Book Strategy Session
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 hover:bg-white/10 rounded-xl font-bold transition-all">
                Download Framework
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-blue-600 rounded-3xl blur opacity-20"></div>
            <div className="relative bg-[#03081a] border border-white/10 p-8 rounded-3xl">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 italic">
                <Compass className="text-blue-400" /> Strategic Maturity Model
              </h3>
              <div className="space-y-6">
                {[
                  { level: "Phase 1", label: "Readiness Assessment", width: "w-1/3" },
                  { level: "Phase 2", label: "Use-Case Prioritization", width: "w-1/2" },
                  { level: "Phase 3", label: "Pilot & Validation", width: "w-3/4" },
                  { level: "Phase 4", label: "Full-Scale Orchestration", width: "w-full" }
                ].map((phase, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-gray-500 uppercase">
                      <span>{phase.level}</span>
                      <span>{phase.label}</span>
                    </div>
                    <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <div className={`h-full bg-blue-600 rounded-full ${phase.width}`}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-bold italic">Consulting Pillars</h2>
            <p className="text-gray-500 mt-4">Structured intelligence for complex environments.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { 
                title: "Feasibility Analysis", 
                desc: "We analyze your data silos and infrastructure to determine AI readiness before you invest.",
                icon: <Microscope className="w-8 h-8 text-blue-400" /> 
              },
              { 
                title: "Ethical AI Governance", 
                desc: "Defining guardrails to ensure your AI deployments are compliant, unbiased, and secure.",
                icon: <ShieldCheck className="w-8 h-8 text-blue-400" /> 
              },
              { 
                title: "ROI Forecasting", 
                desc: "Data-driven projections of how AI implementation will impact your bottom line over 12-36 months.",
                icon: <BarChart4 className="w-8 h-8 text-blue-400" /> 
              },
              { 
                title: "Tech Stack Selection", 
                desc: "Neutral advisory on selecting LLMs, vector databases, and cloud infrastructure.",
                icon: <Layers className="w-8 h-8 text-blue-400" /> 
              },
              { 
                title: "Change Management", 
                desc: "Strategies to upskill your workforce and align organizational culture with AI adoption.",
                icon: <Lightbulb className="w-8 h-8 text-blue-400" /> 
              }
            ].map((pillar, i) => (
              <div key={i} className="p-8 rounded-3xl bg-blue-900/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                <div className="mb-6 p-3 bg-blue-500/10 rounded-xl inline-block group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {pillar.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{pillar.title}</h3>
                <p className="text-gray-500 leading-relaxed">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <SuccessStories />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic">READY TO ARCHITECT?</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Connect with our Lead Strategists at our Gurugram HQ to start your transition 
              to an AI-first organization.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START CONSULTATION
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

export default AIStrategyPage;
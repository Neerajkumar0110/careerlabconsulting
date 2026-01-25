import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Zap, 
  Layers, 
  BrainCircuit, 
  Building2, 
  BadgeCheck, 
  ArrowRight, 
  Network,
  Cpu,
  ShieldCheck,
  Maximize2
} from 'lucide-react';

const FullEducationCapabilityPage = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-white overflow-x-hidden selection:bg-cyan-500/30">
      <Navbar />
      
      <section className="relative pt-32 pb-20 md:pt-56 md:pb-40 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.1)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-md">
            <Maximize2 className="w-3.5 h-3.5 text-cyan-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-200">The Full Spectrum Intelligence</span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-[0.8] uppercase italic mb-12">
            The Integrated <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-blue-500 to-indigo-600">
              Future Academy
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-slate-400 text-lg md:text-2xl leading-relaxed font-light mb-12">
            We don't just sell tools; we engineer **Neural Academic Infrastructure**. Explore the synergy between cognitive learning systems, autonomous institutional governance, and immutable skill verification.
          </p>

          <div className="flex justify-center gap-4">
            <button className="px-12 py-6 bg-cyan-600 hover:bg-cyan-500 rounded-2xl font-black text-xl transition-all hover:scale-105 shadow-2xl shadow-cyan-600/20 uppercase italic">
              Download Full Capability Deck
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            <div className="group p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-cyan-500/30 transition-all">
              <div className="flex justify-between items-start mb-12">
                <BrainCircuit className="w-12 h-12 text-cyan-400" />
                <span className="text-[10px] font-mono text-slate-500">MODULE_01</span>
              </div>
              <h3 className="text-3xl font-bold mb-6 italic">EDU-AI: <br/>Learning Core</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Adaptive RAG-based tutoring, sentiment-aware pedagogy, and 
                personalized knowledge graphs that scale the 1-on-1 mentor experience.
              </p>
              <ul className="space-y-3 mb-10">
                {['Hyper-Personalized Content', 'Real-time Skill Gap Analysis', 'Generative Socratic Tutors'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-cyan-100">
                    <Zap className="w-3 h-3 text-cyan-500" /> {t}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between group-hover:text-cyan-400 transition-colors cursor-pointer">
                <span className="text-xs font-black uppercase">Explore Tech</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="group p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-blue-500/30 transition-all">
              <div className="flex justify-between items-start mb-12">
                <Building2 className="w-12 h-12 text-blue-400" />
                <span className="text-[10px] font-mono text-slate-500">MODULE_02</span>
              </div>
              <h3 className="text-3xl font-bold mb-6 italic">EDU-INST: <br/>Campus OS</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                The institutional operating system. Managing enrollment, 
                grant lifecycles, and zero-trust security with predictive precision.
              </p>
              <ul className="space-y-3 mb-10">
                {['Predictive Yield Models', 'Autonomous Grant Compliance', 'Secure Data Sovereignty'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-blue-100">
                    <ShieldCheck className="w-3 h-3 text-blue-500" /> {t}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between group-hover:text-blue-400 transition-colors cursor-pointer">
                <span className="text-xs font-black uppercase">Explore Governance</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

            <div className="group p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-amber-500/30 transition-all">
              <div className="flex justify-between items-start mb-12">
                <BadgeCheck className="w-12 h-12 text-amber-500" />
                <span className="text-[10px] font-mono text-slate-500">MODULE_03</span>
              </div>
              <h3 className="text-3xl font-bold mb-6 italic">EDU-CERT: <br/>Skill Tokenization</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                The "Proof of Skill" layer. Immutable credentials, fraud-proof proctoring, 
                and labor-market syllabus alignment.
              </p>
              <ul className="space-y-3 mb-10">
                {['Biometric Proctoring', 'Fraud-Proof Badging', 'Syllabus-to-Jobs Mapping'].map((t, i) => (
                  <li key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-amber-100">
                    <Zap className="w-3 h-3 text-amber-600" /> {t}
                  </li>
                ))}
              </ul>
              <div className="pt-6 border-t border-white/5 flex items-center justify-between group-hover:text-amber-500 transition-colors cursor-pointer">
                <span className="text-xs font-black uppercase">Explore Verification</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-950 border border-white/10 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-10">
              <Network size={400} />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-4xl md:text-7xl font-black mb-8 italic uppercase tracking-tighter leading-none">
                  Fully <br />
                  <span className="text-cyan-500 italic">Interconnected</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  Our ecosystem ensures that data from the **Learning Core** updates the **Campus OS** in real-time, which then triggers **Verification** upon mastery. No data silos. No manual handoffs. Just a singular, high-velocity intelligence engine.
                </p>
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-3xl font-black text-white">100%</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">Data Synergy</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-white">&lt;500ms</p>
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400">Network Latency</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                 
                 <div className="mt-8 p-6 bg-white/5 rounded-3xl border border-white/10 font-mono text-xs">
                    <div className="flex items-center gap-2 text-cyan-400 mb-4">
                      <Cpu className="w-4 h-4" />
                      <span>SYSTEM_INTEGRATION_CHECK</span>
                    </div>
                    <p className="text-slate-500 italic leading-relaxed">
                      "Cross-module bridge active. Student ID: #X992 achieved mastery in 'Neural-Link-v2'. Sending verification request to Edu-Cert. Updating Institutional Registrar."
                    </p>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl font-black uppercase italic tracking-widest text-cyan-500">The Deployment Pipeline</h2>
        </div>
        <div className="opacity-70 scale-90">
          <Layers className="mx-auto w-12 h-12 text-slate-500 mb-12" />
        </div>
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          {['Audit & Ingest', 'Infrastructure Build', 'Agent Deployment', 'Scale & Monitor'].map((step, i) => (
            <div key={i} className="text-center p-8 bg-slate-900/20 rounded-3xl border border-white/5 relative">
              <span className="absolute top-4 left-4 text-[10px] font-black text-cyan-500/30">STEP_0{i+1}</span>
              <p className="text-sm font-black uppercase tracking-widest">{step}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl md:text-8xl font-black italic tracking-tighter uppercase leading-none mb-12">
            Architect Your <br />
            <span className="text-cyan-500">Super-Campus</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            Ready to lead the academic revolution? Connect with our vertical architects to design a bespoke integration of our full capability set.
          </p>
          <div className="flex flex-col items-center gap-6">
            <button className="px-16 py-8 bg-white text-black rounded-full font-black text-2xl hover:bg-cyan-500 transition-all hover:scale-105 active:scale-95 uppercase italic shadow-3xl shadow-white/10">
              Schedule Architecture Deep-Dive
            </button>
            <div className="text-cyan-500/50 font-mono text-[10px] tracking-[0.4em] uppercase italic">Global HQ: Gurugram // Innovation Node: NYC</div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FullEducationCapabilityPage;
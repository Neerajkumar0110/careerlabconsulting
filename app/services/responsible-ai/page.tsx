import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  ShieldCheck, 
  Scale, 
  Eye, 
  Lock, 
  AlertTriangle, 
  FileSearch, 
  CheckCircle, 
  ArrowRight,
  Fingerprint
} from 'lucide-react';

const ResponsibleAIPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Ethics & Governance Framework</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            RESPONSIBLE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-blue-600 italic">
              AI SYSTEMS
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Build trust into every token. We help enterprises develop AI that is 
            unbiased, transparent, and fully compliant with global data regulations 
            while maintaining peak performance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2">
              Get an Ethics Audit <ArrowRight className="w-5 h-5" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all">
              Security Protocol
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold italic">The Integrity Core</h2>
            <p className="text-gray-500 mt-4">Ensuring your autonomous systems operate within legal and ethical boundaries.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Bias Mitigation", desc: "Rigorous testing of datasets to identify and neutralize algorithmic prejudice.", icon: <Scale className="text-blue-400" /> },
              { title: "Explainability", desc: "Opening the 'black box' so every AI decision is traceable and understandable.", icon: <Eye className="text-blue-400" /> },
              { title: "Privacy First", desc: "Advanced encryption and differential privacy to protect user identities.", icon: <Lock className="text-blue-400" /> },
              { title: "Safety Guardrails", desc: "Real-time monitoring to prevent hallucinatory or harmful model outputs.", icon: <AlertTriangle className="text-blue-400" /> }
            ].map((item, i) => (
              <div key={i} className="p-8 rounded-[2rem] bg-blue-900/5 border border-white/5 hover:border-blue-500/30 transition-all">
                <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl inline-block">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-10 bg-blue-600/10 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
               <div className="flex items-center gap-3 mb-8">
                  <Fingerprint className="text-blue-400 w-8 h-8" />
                  <span className="font-mono text-sm tracking-widest text-blue-400">COMPLIANCE_ENGINE_v4</span>
               </div>
               
               <div className="space-y-6">
                  {[
                    { label: "GDPR Alignment", status: "Verified", w: "w-full" },
                    { label: "SOC2 Security", status: "Active", w: "w-full" },
                    { label: "EU AI Act Compliance", status: "In-Progress", w: "w-3/4" }
                  ].map((row, idx) => (
                    <div key={idx} className="p-4 rounded-xl bg-white/5 border border-white/5">
                      <div className="flex justify-between mb-2">
                        <span className="text-sm font-bold">{row.label}</span>
                        <span className="text-[10px] uppercase font-bold text-blue-400">{row.status}</span>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full">
                        <div className={`h-full bg-blue-600 rounded-full ${row.w}`}></div>
                      </div>
                    </div>
                  ))}
               </div>
               
               <div className="mt-8 flex justify-center">
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 border border-emerald-500/40 rounded-lg">
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-emerald-400">SECURITY_CLEARANCE_GRANTED</span>
                  </div>
               </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">Verified Integrity</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We provide the legal and technical blueprints required to deploy AI in highly regulated sectors. 
              Our framework ensures your models are audit-ready and compliant with emerging global laws.
            </p>
            <div className="space-y-4 mb-8">
              {[
                { t: "Algorithmic Impact Assessments", i: <FileSearch className="w-5 h-5" /> },
                { t: "Continuous Safety Monitoring", i: <AlertTriangle className="w-5 h-5" /> },
                { t: "Data Lineage Tracking", i: <Fingerprint className="w-5 h-5" /> }
              ].map((point, idx) => (
                <div key={idx} className="flex items-center gap-4 text-gray-200 font-bold">
                  <div className="text-blue-500">{point.i}</div>
                  {point.t}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
           <h3 className="text-3xl font-bold italic">The Ethics Lifecycle</h3>
        </div>
        
        <div className="py-12 border-y border-white/5">
            <ExecutionFlow />
        </div>
      </div>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">SECURE YOUR LEGACY</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our ethics consultants at DLF Cyber City are ready to audit your 
              AI infrastructure.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START AUDIT
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

export default ResponsibleAIPage;
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  ShieldCheck, 
  FileText, 
  Scale, 
  Lock, 
  Globe, 
  Eye, 
  ArrowRight,
  Gavel,
  CheckCircle
} from 'lucide-react';

const AICompliancePage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Regulatory & Ethical Oversight</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            AI GOVERNANCE <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-indigo-600 italic">
              & COMPLIANCE
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Navigate the complex landscape of AI regulation with confidence. We provide 
            the framework for responsible AI deployment, ensuring your models meet 
            global legal standards and ethical mandates.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2">
              Get Compliance Ready <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Regulatory Mapping", 
              desc: "Aligning your AI systems with the EU AI Act, GDPR, HIPAA, and industry-specific regulations.",
              icon: <Scale className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "Ethical AI Audits", 
              desc: "Deep-dive assessments into model transparency, explainability, and bias mitigation protocols.",
              icon: <Eye className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "Data Sovereignty", 
              desc: "Implementing localized data residency and privacy-preserving compute (PPC) architectures.",
              icon: <Lock className="w-8 h-8 text-emerald-400" /> 
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
          
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">Global <br/>Standards</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We don't just check boxes. We build a continuous monitoring layer that 
              flags compliance risks in real-time, ensuring your AI stays within 
              legal and ethical guardrails as it evolves.
            </p>
            
            

            <div className="space-y-4 pt-8">
               {[
                 { t: "Automated Impact Assessments", i: <FileText /> },
                 { t: "Bias Detection & Reporting", i: <Gavel /> },
                 { t: "EU AI Act Risk Classification", i: <Globe /> }
               ].map((point, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-emerald-400">{point.i}</div>
                    <span className="font-bold">{point.t}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-emerald-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl">
               <div className="mb-10 flex justify-between items-center">
                  <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">Compliance_Health_Index</h3>
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></div>
               </div>

               <div className="space-y-8">
                  {[
                    { label: "Privacy Compliance", val: "100%" },
                    { label: "Ethics Alignment", val: "96%" },
                    { label: "Audit Readiness", val: "High" }
                  ].map((stat, i) => (
                    <div key={i} className="flex items-center gap-6">
                       <div className="w-12 h-12 rounded-full border-2 border-emerald-500/20 flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-emerald-500" />
                       </div>
                       <div className="flex-1">
                          <p className="text-[10px] uppercase text-gray-500 font-bold mb-1">{stat.label}</p>
                          <p className="text-xl font-black">{stat.val}</p>
                       </div>
                    </div>
                  ))}
               </div>
               
               <div className="mt-12 p-6 rounded-2xl bg-emerald-500/10 border border-emerald-500/20">
                  <p className="text-xs text-emerald-200 italic">
                    "System certified for SOC2 Type II and GDPR interoperability."
                  </p>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-emerald-900/40 to-blue-950/40 border border-emerald-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Ship with <br/>Certainty</h2>
            <p className="text-emerald-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our legal-tech engineers at DLF Cyber City are ready to secure your 
              AI roadmap against future liabilities.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-emerald-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START COMPLIANCE AUDIT
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

export default AICompliancePage;
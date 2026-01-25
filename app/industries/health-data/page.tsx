import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Database, 
  Share2, 
  Dna, 
  Lock, 
  Binary, 
  FastForward, 
  ArrowRight,
  ShieldCheck,
  Search
} from 'lucide-react';

const HealthDataIndustryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <Database className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Healthcare Interoperability & Big Data</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            LIQUID <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-emerald-400 to-indigo-500 italic">
              HEALTH DATA
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Breaking down silos without breaking compliance. We build the 
            infrastructure that turns fragmented EHR records into unified, 
            AI-ready datasets for clinical research and predictive care.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 text-white">
              Unify Your Data <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Synthetic Data Gen", 
              desc: "Creating HIPAA-compliant, privacy-preserving synthetic patient twins for model training without using real PHI.",
              icon: <Binary className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "FHIR/HL7 Integration", 
              desc: "Real-time data orchestration between disparate EHR systems using modern FHIR standards and AI mapping.",
              icon: <Share2 className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Semantic Normalization", 
              desc: "Using NLP to standardize unstructured clinician notes into structured, searchable diagnostic codes.",
              icon: <Search className="w-8 h-8 text-blue-400" /> 
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
          
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Structured <br/>Stability</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We architect healthcare data lakehouses that handle petabytes of 
              genomic and clinical information. By implementing automated data 
              governance and lineage tracking, we ensure your AI models are 
              built on a foundation of clean, verifiable truth.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4">
                  <ShieldCheck className="text-emerald-400 w-6 h-6" />
                  <span className="font-bold text-sm tracking-widest uppercase">Zero-Trust Access</span>
               </div>
               <div className="p-6 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-4">
                  <FastForward className="text-blue-400 w-6 h-6" />
                  <span className="font-bold text-sm tracking-widest uppercase">Real-time ETL</span>
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-indigo-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden font-mono">
               <div className="flex justify-between items-center mb-10 pb-6 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-blue-500" />
                    <span className="text-[10px] text-gray-500">ENCRYPTED_PIPELINE_STREAMS</span>
                  </div>
               </div>

               <div className="space-y-8">
                  {[
                    { label: "Patient Identity Resolution", val: "99.2%" },
                    { label: "FHIR v4.0 Validation", val: "ACTIVE" },
                    { label: "Anonymization Layer", val: "VERIFIED" }
                  ].map((stat, i) => (
                    <div key={i} className="relative">
                       <p className="text-[9px] text-gray-500 uppercase mb-2">{stat.label}</p>
                       <div className="flex items-center gap-4">
                          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
                             <div className="h-full bg-gradient-to-r from-blue-600 to-indigo-400 w-[85%] animate-pulse"></div>
                          </div>
                          <span className="text-xs font-bold text-blue-400">{stat.val}</span>
                       </div>
                    </div>
                  ))}
               </div>

               <div className="mt-12 p-6 rounded-xl bg-blue-500/5 border border-dashed border-blue-500/30">
                  <p className="text-[10px] text-gray-500">SYSTEM_LOG:</p>
                  <p className="text-[11px] text-emerald-400 mt-1">Successfully ingested 1.2M oncology records. PHI scrubbed and vectorized for RAG ingestion.</p>
               </div>
            </div>
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
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Architect Your <br/>Data Future</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our data engineers at DLF Cyber City are ready to build 
              the clinical infrastructure that powers tomorrow's medicine.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START DATA AUDIT
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">Network Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default HealthDataIndustryPage;
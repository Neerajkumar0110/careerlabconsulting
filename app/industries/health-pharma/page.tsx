import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Dna, 
  FlaskConical, 
  Microscope, 
  Database, 
  ShieldCheck, 
  Search, 
  ArrowRight,
  Stethoscope,
  Network
} from 'lucide-react';

const PharmaIndustryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-blue-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-md">
            <FlaskConical className="w-4 h-4 text-blue-400" />
            <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Life Sciences & R&D Vertical</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            AI DRUG <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 italic">
              DISCOVERY
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Reducing the path to market from years to months. We build 
            generative AI models for molecular design, protein folding prediction, 
            and intelligent clinical trial patient matching.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-bold transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 text-white">
              Accelerate R&D <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Molecular Design", 
              desc: "Generative models that propose novel chemical structures optimized for target binding affinity and low toxicity.",
              icon: <Dna className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Clinical Trial AI", 
              desc: "Deep learning systems that analyze EHR data to identify ideal candidates for phase II/III trials, reducing dropouts.",
              icon: <Search className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Regulatory Intelligence", 
              desc: "AI agents that automate the generation of FDA/EMA submission documentation and ensure trial compliance.",
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
          
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Biological <br/>Intelligence</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Our AI architectures integrate AlphaFold-derived insights with custom 
              proprietary datasets to predict biological interactions with over 
              94% accuracy, significantly de-risking the laboratory phase.
            </p>

            <div className="space-y-6 mt-8">
               {[
                 { t: "High-Throughput Virtual Screening", i: <Database /> },
                 { t: "Protein-Ligand Interaction Models", i: <Network /> },
                 { t: "Adverse Effect Prediction", i: <Microscope /> }
               ].map((point, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-blue-600/10 transition-all cursor-default">
                    <div className="text-blue-400">{point.i}</div>
                    <span className="font-bold">{point.t}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-blue-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl">
               <div className="mb-8 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                     <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></div>
                     <span className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">Prediction_Engine_v4.2</span>
                  </div>
                  <Stethoscope className="w-4 h-4 text-gray-700" />
               </div>

               <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500 uppercase mb-2">Target Protein Binding</p>
                     <div className="flex justify-between items-end">
                        <span className="text-2xl font-bold">0.962</span>
                        <span className="text-emerald-400 text-xs font-mono pb-1">HIGH_AFFINITY</span>
                     </div>
                     <div className="mt-2 h-1 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 w-[96%]"></div>
                     </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[10px] text-gray-500 uppercase">Toxicity Risk</p>
                        <p className="text-xl font-bold text-emerald-400">Minimal</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                        <p className="text-[10px] text-gray-500 uppercase">Solubility</p>
                        <p className="text-xl font-bold text-blue-400">Optimal</p>
                     </div>
                  </div>
               </div>
               
               <div className="mt-8 p-6 rounded-2xl bg-indigo-500/10 border border-indigo-500/20">
                  <p className="text-xs text-indigo-300 italic">
                    "Candidate molecule #8421 shows superior blood-brain barrier penetration compared to control group."
                  </p>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-900/40 to-indigo-950/40 border border-blue-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">The Future <br/>Of Life Sciences</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Collaborate with our R&D engineers at DLF Cyber City to bring 
              life-saving treatments to market faster.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START DRUG-AI BUILD
              </button>
              <div className="text-blue-400 font-mono text-sm tracking-widest uppercase">Pharma Lab Hub: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PharmaIndustryPage;
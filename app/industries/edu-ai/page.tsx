import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Library, 
  Sparkles, 
  ShieldCheck, 
  Zap, 
  GraduationCap, 
  Search, 
  ArrowUpRight,
  BrainCircuit,
  Globe,
  Database,
  BarChart3
} from 'lucide-react';

const EducationAIPage = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-50 overflow-x-hidden font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-56 md:pb-40 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(56,189,248,0.08)_0%,_transparent_70%)] -z-10"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] animate-pulse"></div>

        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">Cognitive Infrastructure 2.0</span>
            </div>

            <h1 className="text-4xl md:text-7xl lg:text-9xl font-black tracking-tight leading-[0.9] uppercase italic">
              Knowledge <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-cyan-400 to-emerald-500">
                Orchestrated
              </span>
            </h1>

            <p className="max-w-2xl text-slate-400 text-base md:text-xl leading-relaxed font-light">
              We don't just build chatbots. We engineer **Retrieval-Augmented Learning Ecosystems** that ground AI in institutional truth, eliminating hallucinations and ensuring pedagogical safety.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-4">
              <button className="group relative px-8 py-4 bg-indigo-600 rounded-xl font-bold transition-all hover:bg-indigo-500 hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-600/20 overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-2">
                  DEPLOY ACADEMIC RAG <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
              </button>
              <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-bold hover:bg-white/10 transition-all backdrop-blur-md">
                VIEW CASE STUDIES
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {[
            { label: "RAG Latency", val: "120ms", icon: <Zap /> },
            { label: "Accuracy Rate", val: "99.4%", icon: <ShieldCheck /> },
            { label: "Institutions", val: "40+", icon: <Library /> },
            { label: "Student ROI", val: "+34%", icon: <BarChart3 /> },
          ].map((s, idx) => (
            <div key={idx} className="p-4 md:p-8 bg-white/[0.02] border border-white/5 rounded-2xl md:rounded-3xl hover:border-indigo-500/30 transition-all group">
              <div className="text-indigo-400 mb-3 opacity-50 group-hover:opacity-100 transition-opacity">
                {React.cloneElement(s.icon as React.ReactElement<any>, { className: "w-5 h-5" })}
              </div>
              <p className="text-2xl md:text-4xl font-black text-white">{s.val}</p>
              <p className="text-[10px] md:text-xs uppercase tracking-widest text-slate-500 font-bold mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-[#030816]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">
              Institutional <br />
              <span className="text-indigo-500 underline decoration-indigo-500/30 underline-offset-8">Superpowers</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8 p-8 md:p-12 rounded-[2rem] bg-gradient-to-br from-indigo-900/20 to-transparent border border-indigo-500/20 relative overflow-hidden group">
              <div className="relative z-10 max-w-lg">
                <Search className="text-indigo-400 w-12 h-12 mb-6" />
                <h3 className="text-2xl md:text-4xl font-bold mb-4">Semantic Discovery Engine</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Turn static library archives into a live conversational brain. Our RAG (Retrieval-Augmented Generation) 
                  tech indexes text, video, and research data with 99% citation accuracy.
                </p>
                <div className="flex gap-2">
                  <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold">VECTOR SEARCH</span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold">CITE-CHECK</span>
                </div>
              </div>
              <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-80 h-80 border-[20px] border-indigo-500/5 rounded-full group-hover:scale-110 transition-transform duration-700"></div>
            </div>

            <div className="md:col-span-4 p-8 rounded-[2rem] bg-slate-900/50 border border-white/5 flex flex-col justify-between group">
              <GraduationCap className="text-cyan-400 w-10 h-10 group-hover:rotate-12 transition-transform" />
              <div>
                <h3 className="text-xl font-bold mb-2">Automated Pedagogy</h3>
                <p className="text-slate-500 text-sm">Real-time lesson adjustment based on cognitive load analysis.</p>
              </div>
            </div>

            <div className="md:col-span-4 p-8 rounded-[2rem] bg-slate-900/50 border border-white/5 group">
              <Globe className="text-emerald-400 w-10 h-10 mb-6" />
              <h3 className="text-xl font-bold mb-2">Global Localization</h3>
              <p className="text-slate-500 text-sm">AI that understands cultural nuances and regional academic standards.</p>
            </div>

            <div className="md:col-span-8 p-8 md:p-12 rounded-[2rem] bg-slate-900/30 border border-white/5 relative overflow-hidden group">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                  <div className="max-w-md">
                    <Database className="text-indigo-400 w-10 h-10 mb-6" />
                    <h3 className="text-2xl font-bold mb-4">Private Data Vaults</h3>
                    <p className="text-slate-400 text-sm italic">
                      "Zero-Trust infrastructure ensuring student data never leaves your internal cloud environment."
                    </p>
                  </div>
                  <div className="h-32 w-full md:w-48 bg-white/5 rounded-2xl flex items-center justify-center border border-dashed border-white/10">
                    <BrainCircuit className="text-indigo-500/50 w-12 h-12" />
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-10 bg-indigo-500/10 blur-[80px] rounded-full"></div>
            <div className="relative p-6 md:p-10 bg-slate-950 border border-indigo-500/30 rounded-[2.5rem] shadow-3xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500/50"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50"></div>
                </div>
                <span className="text-[10px] font-mono text-indigo-400 font-bold">RAG_KERNEL_SYSTEM_V4</span>
              </div>
              
              <div className="space-y-4 font-mono text-xs md:text-sm">
                <div className="p-4 bg-white/5 rounded-xl border border-white/5 text-indigo-200">
                  <span className="text-indigo-500">Query:</span> "Summarize Chapter 4 and compare with Lecture 12 notes."
                </div>
                <div className="flex justify-center py-2 animate-bounce">
                  <ArrowUpRight className="rotate-90 text-indigo-500" />
                </div>
                
                <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-indigo-100">
                  <span className="text-emerald-400 font-bold uppercase block mb-2 text-[10px]">Source Verification Active</span>
                  "In Chapter 4, the focus is on Neural Backprop... [Source: Page 142]. This correlates with Prof. Smith's lecture on October 4th..."
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter leading-none mb-8">
              Truth-First <br />
              <span className="text-indigo-500">Intelligence.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8">
              Generic AI hallucinates. Our Education-Specific AI **retrieves** before it speaks. By grounding every response in your institution's proprietary knowledge, we ensure 100% academic integrity.
            </p>
            <ul className="space-y-4">
              {[
                "SOC2 Type II & FERPA Compliant",
                "On-Premise Deployment Models",
                "Hallucination Rate < 0.2%",
                "Multi-Model Agnostic (Claude, GPT, Gemini)"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wide text-slate-200">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-indigo-600 to-indigo-800 p-12 md:p-24 text-center relative overflow-hidden shadow-3xl shadow-indigo-500/20 group">
          <div className="absolute top-0 right-0 p-8 opacity-20 rotate-12 group-hover:rotate-45 transition-transform duration-700">
            <Sparkles size={120} />
          </div>
          <h2 className="text-4xl md:text-7xl font-black text-white mb-8 uppercase italic leading-none">
            Ready to <br />
            Upgrade?
          </h2>
          <p className="text-indigo-100 text-lg md:text-xl mb-12 max-w-xl mx-auto font-medium">
            Join the elite circle of institutions transforming learning into a self-optimizing network.
          </p>
          <button className="px-12 py-6 bg-white text-indigo-900 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-xl active:scale-95">
            BOOK ARCHITECT CONSULTATION
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EducationAIPage;
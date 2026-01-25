import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  Search, 
  Database, 
  BrainCircuit, 
  MessageSquare, 
  ShieldCheck, 
  Zap, 
  ArrowRight,
  Fingerprint,
  Link as LinkIcon
} from 'lucide-react';

const LLMRAGPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 backdrop-blur-md">
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">Advanced RAG Architectures</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            PROPRIETARY <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-emerald-400 italic">
              LLM & RAG
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Eliminate hallucinations. We build Retrieval-Augmented Generation systems that 
            ground LLMs in your enterprise data, providing factually accurate, 
            context-aware responses in milliseconds.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20 flex items-center justify-center gap-2">
              Optimize Your Model <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">Your Data, <br/>Their Brain.</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Standard LLMs know the world, but they don't know your company. Our RAG 
              pipelines create a secure "Semantic Bridge" between your private PDF, 
              SQL, and Cloud data and the world's most powerful models.
            </p>
            <div className="space-y-4">
              {[
                { t: "Sub-Second Semantic Retrieval", i: <Search className="w-5 h-5 text-indigo-400" /> },
                { t: "Zero-Data Training Policy", i: <ShieldCheck className="w-5 h-5 text-indigo-400" /> },
                { t: "Multi-Source Data Ingestion", i: <LinkIcon className="w-5 h-5 text-indigo-400" /> }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  {item.i}
                  <span className="font-bold text-gray-200">{item.t}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-[4rem]"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-8 md:p-12 shadow-2xl">
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <MessageSquare className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 text-sm font-mono text-indigo-300">
                    "What was our Q3 revenue in the North region?"
                  </div>
                </div>

                <div className="flex flex-col items-center gap-2">
                  <div className="h-8 w-px bg-indigo-500/50"></div>
                  <div className="px-4 py-2 rounded-full bg-indigo-600 text-[10px] font-black tracking-widest uppercase">
                    Vector_Search_Scanning...
                  </div>
                  <div className="h-8 w-px bg-indigo-500/50"></div>
                </div>

                <div className="flex gap-4 justify-end">
                  <div className="p-4 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-sm font-bold max-w-[80%]">
                    Based on [Sales_Report_2025.pdf], Q3 North revenue was $4.2M.
                  </div>
                  <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0">
                    <BrainCircuit className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic">The RAG Stack</h2>
          <p className="text-gray-500 mt-4">We deploy the most robust infrastructure for LLM context management.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { title: "Vector Databases", desc: "Expert deployment of Pinecone, Weaviate, and Milvus for lightning-fast embeddings.", icon: <Database className="text-indigo-400" /> },
            { title: "Smart Chunking", desc: "Advanced semantic splitting of documents to ensure the LLM receives the most relevant context.", icon: <Zap className="text-indigo-400" /> },
            { title: "Hybrid Search", desc: "Combining keyword search with semantic vector search for 99.9% accuracy.", icon: <Search className="text-indigo-400" /> }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] bg-indigo-900/5 border border-white/5 hover:border-indigo-500/30 transition-all">
              <div className="mb-6 p-4 bg-indigo-500/10 rounded-2xl inline-block">{item.icon}</div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-indigo-900/40 to-blue-950/40 border border-indigo-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Fact-Check Your AI</h2>
            <p className="text-indigo-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our RAG engineers at DLF Cyber City are ready to transform your 
              company knowledge into a conversational asset.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-indigo-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START RAG AUDIT
              </button>
              <div className="text-indigo-400 font-mono text-sm tracking-widest uppercase">Location: Gurugram, HR</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default LLMRAGPage;
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Terminal, 
  Book, 
  Code2, 
  Cpu, 
  Lock, 
  Braces, 
  Copy, 
  ChevronRight,
  Blocks,
  Zap,
  Globe
} from 'lucide-react';

const DocumentationPage = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-indigo-500/30 font-mono">
      <Navbar />

      <div className="max-w-[1600px] mx-auto flex pt-24">
        
        <aside className="hidden lg:block w-80 h-[calc(100vh-6rem)] sticky top-24 border-r border-white/5 p-8 overflow-y-auto custom-scrollbar bg-[#020617]/50 backdrop-blur-md">
          <div className="mb-10">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-500 mb-6 italic underline decoration-indigo-500/30 underline-offset-8">Getting Started</h5>
            <ul className="space-y-4">
              {['Introduction', 'Architecture Overview', 'API Authentication', 'Rate Limits'].map((item) => (
                <li key={item} className="text-sm text-slate-400 hover:text-white cursor-pointer transition-all flex items-center group">
                  <ChevronRight size={12} className="mr-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-indigo-500" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-10">
            <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 mb-6 italic">Model Endpoints</h5>
            <ul className="space-y-4">
              <li className="text-[11px] text-slate-400 hover:text-white cursor-pointer flex items-center gap-2">
                <span className="bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded text-[9px] font-bold">POST</span> /v1/chat/completions
              </li>
              <li className="text-[11px] text-slate-400 hover:text-white cursor-pointer flex items-center gap-2">
                <span className="bg-blue-500/10 text-blue-500 px-1.5 py-0.5 rounded text-[9px] font-bold">POST</span> /v1/embeddings
              </li>
              <li className="text-[11px] text-slate-400 hover:text-white cursor-pointer flex items-center gap-2">
                <span className="bg-violet-500/10 text-violet-500 px-1.5 py-0.5 rounded text-[9px] font-bold">GET</span> /v1/models/weights
              </li>
            </ul>
          </div>

          <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/10">
             <p className="text-[10px] text-indigo-300 font-bold mb-2 uppercase tracking-widest">System Status</p>
             <div className="flex items-center gap-2 text-[10px] text-emerald-400">
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
               All Clusters Operational
             </div>
          </div>
        </aside>

        <article className="flex-1 px-6 md:px-12 lg:px-20 py-12 scroll-smooth">
          
          <header className="mb-16">
            <div className="flex items-center gap-4 mb-6 text-indigo-400">
              <Book size={18} />
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Developer Reference v2.4.0</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase mb-6 italic text-white">
              The <span className="text-indigo-500 underline decoration-white/10 underline-offset-12">Neural</span> SDK.
            </h1>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-3xl font-sans font-light">
              Connect your legacy enterprise systems to high-performance private LLMs. Our SDK handles the complex orchestration of vector retrieval, prompt safety, and token efficiency automatically.
            </p>
          </header>

          <section className="mb-20">
            <div className="relative aspect-video w-full rounded-[2.5rem] overflow-hidden border border-white/5 bg-slate-900/50 group">
              <img 
                src="https://images.pexels.com/photos/3861964/pexels-photo-3861964.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Neural Network Architecture" 
                className="w-full h-full object-cover opacity-30 grayscale group-hover:grayscale-0 group-hover:opacity-40 transition-all duration-1000"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                 <div className="p-4 bg-indigo-600/20 rounded-full mb-6 border border-indigo-500/30">
                    <Globe className="text-indigo-400 animate-spin-slow" />
                 </div>
                 <h4 className="text-2xl font-black uppercase italic mb-4">Distributed Inference Architecture</h4>
                 <p className="max-w-md text-slate-400 text-sm font-sans">Our global edge network reduces LLM latency by processing non-sensitive tokens at the nearest node.</p>
              </div>
            </div>
          </section>

          <section className="mb-20" id="installation">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase italic">
              <Blocks size={24} className="text-indigo-500" /> 01. Integration
            </h3>
            <p className="text-slate-400 mb-6 font-sans">Install the core library using your preferred package manager:</p>
            <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex items-center justify-between group">
              <code className="text-indigo-400 text-sm">$ npm install @gurugram-ai/core-sdk</code>
              <Copy size={16} className="text-slate-600 hover:text-white cursor-pointer transition-colors" />
            </div>
          </section>

          <section className="mb-20" id="inference">
            <h3 className="text-2xl font-black mb-8 flex items-center gap-3 uppercase italic">
              <Terminal size={24} className="text-indigo-500" /> 02. Secure Inference
            </h3>
            <div className="rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
              <div className="bg-white/5 px-6 py-3 border-b border-white/5 flex justify-between items-center">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Inference_Request.ts</span>
                <div className="flex gap-1.5">
                   <div className="w-2.5 h-2.5 rounded-full bg-red-500/20"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/20"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/20"></div>
                </div>
              </div>
              <pre className="p-8 text-sm leading-relaxed overflow-x-auto bg-[#0b0e14]">
                <code className="text-slate-300">
{`const response = await ai.chat.completions.create({
  model: "gurugram-ultra-v1",
  messages: [{ role: "user", content: "Analyze market debt." }],
  
  // Enterprise Security Layer
  security: {
    pii_redaction: true,
    adversarial_check: true
  },
  
  // Latency Optimization
  stream: true
});`}
                </code>
              </pre>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
             <div className="p-8 rounded-[2rem] bg-indigo-500/5 border border-indigo-500/10">
                <Zap className="text-indigo-500 mb-4" size={32} />
                <h4 className="font-black uppercase mb-2 italic">Sub-100ms TTFT</h4>
                <p className="text-slate-500 text-sm font-sans">Optimized speculative decoding for near-instant first token generation.</p>
             </div>
             <div className="p-8 rounded-[2rem] bg-violet-500/5 border border-violet-500/10">
                <Lock className="text-violet-500 mb-4" size={32} />
                <h4 className="font-black uppercase mb-2 italic">SOC2 Data Guard</h4>
                <p className="text-slate-500 text-sm font-sans">Automated compliance mapping for every inference call made to the model.</p>
             </div>
          </div>

          <footer className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
             <div>
               <h4 className="text-xl font-bold uppercase italic mb-2">Ready for the deep end?</h4>
               <p className="text-slate-500 text-sm font-sans">Request a production API key for enterprise deployments.</p>
             </div>
             <button className="bg-white text-black px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
               Get API Access
             </button>
          </footer>

        </article>

        <aside className="hidden xl:block w-72 h-[calc(100vh-6rem)] sticky top-24 p-8">
           <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-8 italic">Contents</h5>
           <ul className="space-y-4 text-[11px] text-slate-500 border-l border-white/5 pl-4 uppercase font-bold tracking-tighter">
             <li className="text-indigo-400 cursor-pointer">Quick Start</li>
             <li className="hover:text-white cursor-pointer transition-colors">Integration Guide</li>
             <li className="hover:text-white cursor-pointer transition-colors">Inference Parameters</li>
             <li className="hover:text-white cursor-pointer transition-colors">Error Handling</li>
             <li className="hover:text-white cursor-pointer transition-colors">SDK Roadmap</li>
           </ul>

           <div className="mt-20 p-6 rounded-3xl bg-slate-900/50 border border-white/5">
              <Braces className="text-indigo-500 mb-4" size={20} />
              <p className="text-[10px] text-slate-400 leading-relaxed font-sans mb-4">Download the postman collection for rapid testing.</p>
              <button className="text-[10px] font-black uppercase text-white underline underline-offset-4">Download .JSON</button>
           </div>
        </aside>

      </div>

      <Footer />
    </main>
  );
};

export default DocumentationPage;
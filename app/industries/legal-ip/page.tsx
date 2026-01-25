import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  Lightbulb, 
  Search, 
  ShieldCheck, 
  Zap, 
  FileText, 
  Globe, 
  ArrowRight,
  Target,
  BarChart3
} from 'lucide-react';

const IntellectualPropertyAIPage = () => {
  const ipMetrics = [
    { label: "Search Velocity", value: "5,000+", detail: "Patents Analyzed/Sec" },
    { label: "Detection Recall", value: "98.8%", detail: "Infringement Accuracy" },
    { label: "Drafting efficiency", value: "4x Faster", detail: "Claims Generation" },
    { label: "FTO Analysis", value: "Real-time", detail: "Freedom to Operate" },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[140px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-8 backdrop-blur-md">
            <Lightbulb className="w-4 h-4 text-indigo-400" />
            <span className="text-indigo-200 text-xs font-bold uppercase tracking-widest italic">IP Protection & Patent Intelligence Vertical</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none uppercase">
            Blueprinting <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-indigo-400 to-amber-600 italic">
              INTELLECT
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Protect your competitive edge at scale. We deploy **AI-powered Patent Engines** that automate the search for prior art, monitor global registries for 
            infringement, and provide deep-link semantic analysis across the world's IP databases.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto mb-16">
            {ipMetrics.map((m, i) => (
              <div key={i} className="p-6 bg-indigo-950/10 border border-indigo-900/20 rounded-3xl text-left hover:border-amber-500/30 transition-all">
                <p className="text-3xl font-black mb-1 text-white">{m.value}</p>
                <p className="text-[10px] text-indigo-400 uppercase font-bold tracking-widest">{m.label}</p>
                <p className="text-[9px] text-gray-500 italic mt-2">{m.detail}</p>
              </div>
            ))}
          </div>
          
          <button className="px-12 py-6 bg-indigo-600 hover:bg-indigo-700 rounded-2xl font-black transition-all shadow-2xl shadow-indigo-500/20 flex items-center gap-3 mx-auto text-white uppercase tracking-tighter">
            Audit Your IP Portfolio <ArrowRight className="w-6 h-6" />
          </button>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Semantic Prior Art", 
              desc: "Moving beyond keywords. Our AI understands the engineering concepts behind your invention to find relevant prior art that traditional searches miss.",
              icon: <Search className="w-8 h-8 text-indigo-400" /> 
            },
            { 
              title: "Infringement Radar", 
              desc: "Continuous monitoring of new patent filings and product launches worldwide to detect potential infringements of your IP assets in real-time.",
              icon: <Target className="w-8 h-8 text-indigo-400" /> 
            },
            { 
              title: "Smart Claim Drafting", 
              desc: "Assist your legal team in drafting robust patent claims that provide maximum protection while minimizing the risk of office action rejections.",
              icon: <FileText className="w-8 h-8 text-indigo-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[3rem] bg-zinc-900/40 border border-white/5 hover:border-indigo-500/30 transition-all">
              <div className="mb-6 p-4 bg-indigo-500/5 rounded-xl inline-block group-hover:bg-indigo-600 group-hover:text-black transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight text-indigo-200">Defensive <br/>Depth</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Patent strength is determined by the clarity of its boundaries. 
              Our AI maps your **IP Topology**, identifying "white spaces" for 
              new patent filings and fortifying existing claims against 
              validity challenges.
            </p>

            <div className="space-y-4 mt-8">
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <Globe className="text-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-widest italic text-indigo-100">WIPO / USPTO / EPO Cross-Registry Sync</span>
               </div>
               <div className="flex items-center gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <BarChart3 className="text-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-widest italic text-indigo-100">Automated Portfolio Valuation Metrics</span>
               </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-indigo-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#05030a] border border-indigo-500/20 rounded-[3rem] p-10 shadow-2xl font-mono overflow-hidden">
               <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
                  <div className="flex items-center gap-2 text-indigo-400">
                    <Zap className="w-4 h-4 animate-pulse" />
                    <span className="text-[10px] uppercase font-black">IP_LANDSCAPE_ANALYZER</span>
                  </div>
                  <div className="text-[10px] text-gray-500 uppercase">MAP_ID: #B992_TECH_SECTOR</div>
               </div>

               <div className="space-y-6">
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/5 text-center">
                    <p className="text-[10px] text-gray-500 uppercase mb-4 italic">Semantic Similarity Heatmap</p>
                    
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 rounded-xl bg-indigo-500/5 border border-indigo-500/20 text-center">
                        <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Innovation Score</p>
                        <p className="text-xl font-black text-indigo-400">High (8.4)</p>
                     </div>
                     <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-center">
                        <p className="text-[8px] text-gray-500 uppercase mb-1 font-bold">Risk Overlap</p>
                        <p className="text-xl font-black italic text-red-400">4.2%</p>
                     </div>
                  </div>
               </div>

               <div className="mt-8 p-4 bg-indigo-900/20 rounded-xl border border-dashed border-indigo-500/30 text-[9px] text-indigo-200">
                  <p className="font-bold uppercase mb-1 tracking-widest text-indigo-400">IP_ARCHITECT_LOG:</p>
                  <p className="italic">"Potential claim overlap detected with US Patent #10,482,XX. Adjusting Claim 4 language to emphasize non-obviousness in neural-feedback loops."</p>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-indigo-950/40 to-black border border-indigo-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Secure Your <br/>Legacy</h2>
            <p className="text-indigo-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our IP-tech architects at DLF Cyber City are engineering the 
              next generation of intellectual property defense.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-indigo-950 px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase">
                Fortify My Patents
              </button>
              <div className="text-indigo-400 font-mono text-sm tracking-widest uppercase italic">IP Strategy Center: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default IntellectualPropertyAIPage;
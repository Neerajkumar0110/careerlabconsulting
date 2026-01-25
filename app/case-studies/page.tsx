import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  BarChart3, 
  Globe, 
  Zap, 
  ArrowUpRight, 
  Layers, 
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const CaseStudiesPage = () => {
  const cases = [
    {
      client: "Global Logistics Corp",
      title: "Autonomous Fleet Routing Engine",
      impact: "+42% Efficiency",
      tags: ["Agentic AI", "Logistics", "Optimization"],
      image: "https://images.pexels.com/photos/1267338/pexels-photo-1267338.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      client: "FinTech NeoBank",
      title: "Self-Learning Fraud Detection",
      impact: "-88% False Positives",
      tags: ["Machine Learning", "Security", "Real-time"],
      image: "https://images.pexels.com/photos/2599244/pexels-photo-2599244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      client: "BioMed Research",
      title: "Accelerated Protein Folding LLM",
      impact: "3yr Progress in 4mo",
      tags: ["Deep Learning", "Healthcare", "Analysis"],
      image: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(37,99,235,0.1)_0%,_transparent_70%)] -z-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-xl">
            <Zap className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200 italic">Validated Impact</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] uppercase mb-12">
            Proven <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-600 to-indigo-800 italic">Deployments.</span>
          </h1>
          <p className="max-w-2xl text-slate-400 text-lg md:text-xl font-light leading-relaxed">
            Real-world results for global enterprises. We don't just build models; we architect solutions that redefine bottom lines.
          </p>
        </div>
      </section>

      <section className="pb-32 px-6">
        <div className="max-w-7xl mx-auto space-y-32">
          {cases.map((study, index) => (
            <div key={index} className="group grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className={`lg:col-span-7 relative ${index % 2 !== 0 ? 'lg:order-2' : ''}`}>
                <div className="relative aspect-[16/9] rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl">
                  <img 
                    src={study.image} 
                    alt={study.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60"></div>
                  
                  <div className="absolute bottom-8 right-8 p-6 rounded-3xl bg-blue-600 backdrop-blur-xl shadow-2xl translate-y-4 group-hover:translate-y-0 transition-transform">
                    <p className="text-[10px] font-black uppercase tracking-widest text-blue-100 mb-1">Key Impact</p>
                    <p className="text-2xl font-black italic">{study.impact}</p>
                  </div>
                </div>
              </div>

              <div className={`lg:col-span-5 ${index % 2 !== 0 ? 'lg:order-1' : ''}`}>
                <div className="space-y-6">
                  <div className="flex items-center gap-4 text-blue-500 font-mono text-xs font-bold tracking-[0.2em] uppercase">
                    <Layers size={16} /> {study.client}
                  </div>
                  <h3 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter leading-none group-hover:text-blue-500 transition-colors">
                    {study.title}
                  </h3>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {study.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-400 font-light leading-relaxed text-lg pt-4">
                    Extensive technical overhaul involving the integration of {study.tags[0]} protocols to optimize core business logic and reduce manual overhead by significant margins.
                  </p>
                  <button className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.3em] pt-8 group/btn">
                    Read Full Blueprint 
                    <div className="p-2 rounded-full bg-white/5 group-hover/btn:bg-blue-600 transition-all">
                      <ArrowUpRight size={16} />
                    </div>
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      </section>
      
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
          <div className="space-y-4">
            <BarChart3 className="text-blue-500 mx-auto md:mx-0" size={32} />
            <h4 className="text-4xl font-black italic">99.8%</h4>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Inference Reliability</p>
          </div>
          <div className="space-y-4">
            <Globe className="text-blue-500 mx-auto md:mx-0" size={32} />
            <h4 className="text-4xl font-black italic">240ms</h4>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Global Avg Latency</p>
          </div>
          <div className="space-y-4">
            <ShieldCheck className="text-blue-500 mx-auto md:mx-0" size={32} />
            <h4 className="text-4xl font-black italic">Zero</h4>
            <p className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Data Leaks Post-Inference</p>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-10 leading-none">
            Your Case Could <br /> Be <span className="text-blue-600">Next.</span>
          </h2>
          <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all">
            Schedule Discovery
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CaseStudiesPage;
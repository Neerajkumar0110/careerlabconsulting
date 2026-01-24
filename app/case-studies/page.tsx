import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  BarChart3, 
  ArrowUpRight, 
  Clock, 
  Globe2, 
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

const CaseStudiesPage = () => {
  const cases = [
    {
      title: "Global Logistics Re-Routing",
      client: "Fortune 500 Freight Corp",
      stat: "42% Cost Reduction",
      tag: "Agentic Swarms",
      desc: "Deployed a swarm of 50+ autonomous agents to manage real-time supply chain disruptions across 4 continents.",
      color: "from-blue-600/20 to-transparent",
      borderColor: "group-hover:border-blue-500/50",
      image: "https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Private Fin-LLM Deployment",
      client: "Neo-Bank Syndicate",
      stat: "99.9% Data Sovereignty",
      tag: "Custom LLMs",
      desc: "Architected a domain-specific model trained on proprietary transaction data, hosted entirely in a private VPC.",
      color: "from-violet-600/20 to-transparent",
      borderColor: "group-hover:border-violet-500/50",
      image: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Hyper-Growth SaaS Backend",
      client: "Indie Creator Unicorn",
      stat: "1.2s Response Latency",
      tag: "Project Development",
      desc: "Rebuilt a legacy Node.js backend with an AI-native Rust architecture to handle 10x user scaling.",
      color: "from-pink-600/20 to-transparent",
      borderColor: "group-hover:border-pink-500/50",
      image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-indigo-500/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(99,102,241,0.05)_0%,_transparent_60%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <CheckCircle2 className="text-emerald-400 w-4 h-4" />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400/80">Verified Neural Outcomes</span>
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase leading-[0.85] mb-10">
            Impact <br />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-500 to-blue-600">Quantified.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl font-light leading-relaxed">
            Abstract AI is easy. Production-grade AI is hard. Explore how we’ve solved critical bottlenecks for global leaders and solo visionaries.
          </p>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 gap-12">
          {cases.map((c, i) => (
            <div key={i} className={`group relative overflow-hidden rounded-[3.5rem] border border-white/5 bg-gradient-to-br ${c.color} p-6 md:p-12 transition-all duration-700 hover:scale-[1.01] ${c.borderColor}`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
                <div className="order-2 lg:order-1">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest text-indigo-300">
                      {c.tag}
                    </span>
                    <span className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">{c.client}</span>
                  </div>
                  <h3 className="text-4xl md:text-6xl font-black mb-6 uppercase italic tracking-tighter leading-none">{c.title}</h3>
                  <p className="text-slate-400 text-lg mb-10 font-light leading-relaxed">{c.desc}</p>
                  
                  <div className="flex flex-wrap gap-8 items-end">
                    <div>
                      <p className="text-4xl font-black text-white">{c.stat}</p>
                      <p className="text-[10px] uppercase font-bold text-indigo-400 tracking-[0.2em]">Efficiency Multiplier</p>
                    </div>
                    <button className="flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white/5 hover:bg-white/10 px-6 py-4 rounded-xl transition-all">
                      Case Disclosure <ExternalLink size={14} />
                    </button>
                  </div>
                </div>

                <div className="order-1 lg:order-2 relative group-hover:rotate-1 transition-transform duration-700">
                  <div className="absolute -inset-4 bg-indigo-500/10 blur-3xl rounded-full group-hover:bg-indigo-500/20"></div>
                  <div className="relative aspect-video rounded-[2rem] bg-slate-950 border border-white/10 overflow-hidden shadow-2xl">
                     <img 
                        src={c.image} 
                        alt={c.title} 
                        className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-700 grayscale hover:grayscale-0"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
            <div className="max-w-md">
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-4 italic">The Cumulative <br/><span className="text-indigo-500">Effect.</span></h2>
              <p className="text-slate-500 text-sm leading-relaxed">Real-time telemetry from across our active node network. These numbers represent the combined power of our custom-tuned LLMs.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-16">
               {[
                 { label: "Hours Saved", val: "400k+", icon: <Clock className="w-5 h-5" /> },
                 { label: "Cost Reduction", val: "62%", icon: <BarChart3 className="w-5 h-5" /> },
                 { label: "Active Nodes", val: "1.2k", icon: <Globe2 className="w-5 h-5" /> },
                 { label: "System Uptime", val: "99.9%", icon: <ShieldCheck className="w-5 h-5" /> }
               ].map((stat, idx) => (
                 <div key={idx} className="flex flex-col items-center group cursor-default">
                    <div className="text-indigo-500/50 mb-4 group-hover:text-indigo-400 transition-colors group-hover:scale-110 duration-500">{stat.icon}</div>
                    <p className="text-3xl md:text-4xl font-black text-white tracking-tighter group-hover:text-indigo-500 transition-colors">{stat.val}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">{stat.label}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-slate-900/30 border border-indigo-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group shadow-[0_0_100px_rgba(79,70,229,0.1)]">
          <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] opacity-[0.03] grayscale"></div>
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Your Success <br/>Is Next.</h2>
            <p className="text-indigo-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
              We don't just build tools; we build benchmarks. Let's design your industry's next major case study.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-black px-16 py-7 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl shadow-white/10 uppercase italic">
                Initialize Consultation
              </button>
              <div className="text-indigo-500/50 font-mono text-[10px] tracking-[0.4em] uppercase">Security Level 4 // Cyber City Hub</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CaseStudiesPage;
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Zap, 
  Rocket, 
  User, 
  Target, 
  Sparkles, 
  Cpu, 
  ArrowRight, 
  Code2, 
  Globe,
  Star
} from 'lucide-react';

const IndividualProjectsPage = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-pink-500/30">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,_rgba(219,39,119,0.1)_0%,_transparent_60%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-8 backdrop-blur-xl">
            <User className="w-3.5 h-3.5 text-pink-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-200">Force Multiplier for Creators</span>
          </div>

          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            One Person <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-pink-500 to-purple-700 italic">
              Empire
            </span>
          </h1>

          <p className="max-w-3xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">
            You have the vision; we provide the neural infrastructure. We help solo founders build AI-powered SaaS, automated content engines, and personal brand OSs that run while you sleep.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 bg-pink-600 hover:bg-pink-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 shadow-2xl shadow-pink-600/30 flex items-center justify-center gap-2">
              Launch Your Idea <Rocket className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              View Creator Stack
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "AI SaaS Launchpad", 
              desc: "From concept to deployed app in record time. We handle the LLM integration, subscription logic, and hosting so you can focus on growth.",
              icon: <Code2 className="w-8 h-8 text-pink-500" /> 
            },
            { 
              title: "Content Autonomy", 
              desc: "Custom agents that learn your voice and automate your social presence, newsletter, and video scripts across all platforms.",
              icon: <Sparkles className="w-8 h-8 text-pink-500" /> 
            },
            { 
              title: "Niche Dominance", 
              desc: "Using AI to identify market gaps and automate lead generation for your specific consulting or digital product niche.",
              icon: <Target className="w-8 h-8 text-pink-500" /> 
            }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-pink-500/40 transition-all group relative overflow-hidden">
              <div className="mb-8 p-4 bg-pink-500/5 rounded-2xl inline-block group-hover:bg-pink-500 group-hover:text-black transition-all">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 tracking-tight">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">Scale <br/>Without <br/><span className="text-pink-500">Employees.</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
              We help you build a **Human-in-the-Loop** system where AI handles 90% of the operational heavy lifting, leaving you with the creative 10%. 
            </p>

            <div className="space-y-4 mt-8">
               {[
                 { icon: <Zap className="text-pink-500" />, text: "Automated MVP Development" },
                 { icon: <Globe className="text-pink-500" />, text: "Global Distribution Infrastructure" },
                 { icon: <Star className="text-pink-500" />, text: "Personal AI Brand Twin" }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/5 hover:bg-pink-950/20 transition-all">
                    {item.icon}
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-200">{item.text}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-10 bg-pink-600/5 blur-[120px] rounded-full animate-pulse"></div>
            <div className="relative bg-[#020817] border border-pink-500/20 rounded-[3rem] p-8 md:p-12 shadow-2xl font-mono">
               <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2 text-pink-400 font-black italic text-[10px]">
                    <Cpu className="w-4 h-4" />
                    CREATOR_CORE_v1
                  </div>
                  <div className="text-[10px] text-slate-500">SOLO_MODE: ENABLED</div>
               </div>
               
               <div className="space-y-6 text-xs">
                  <div className="p-4 rounded-xl bg-pink-500/5 border border-pink-500/20">
                    <p className="text-pink-500 font-black mb-2 uppercase tracking-tighter italic">Personal Brand Analysis:</p>
                    <p className="text-white">"Analyzing audience sentiment across X and LinkedIn. Generating 7-day content cluster optimized for conversion."</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex justify-between text-slate-500 mb-2 font-bold uppercase text-[10px]">
                       <span>SaaS MRR Engine</span>
                       <span className="text-pink-400">Processing</span>
                    </div>
                    <div className="h-1 w-full bg-slate-800 rounded">
                       <div className="h-full bg-pink-500 w-[78%]"></div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-purple-950/20 to-black border border-pink-500/30 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group shadow-3xl shadow-pink-500/10">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Stop Dreaming. <br/>Start Building.</h2>
            <p className="text-pink-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
              You don't need a team of 50. You need the right agents. Let's build your AI-driven future together.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-black px-16 py-7 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic">
                Get Your Personal Audit
              </button>
              <div className="text-pink-500/50 font-mono text-[10px] tracking-[0.4em] uppercase">Individual Lab // Gurugram Hub</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default IndividualProjectsPage;
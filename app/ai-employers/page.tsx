import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Users, 
  UserPlus, 
  Target, 
  Zap, 
  BarChart3, 
  ShieldCheck, 
  Search, 
  ArrowRight,
  Fingerprint,
  HeartPulse
} from 'lucide-react';

const AIEmployersPage = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-blue-500/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(59,130,246,0.1)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6 backdrop-blur-xl">
            <Users className="w-3.5 h-3.5 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">Neural Recruitment Layer</span>
          </div>

          <h1 className="text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            Augmented <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-blue-500 to-indigo-600 italic">
              Workforce
            </span>
          </h1>

          <p className="max-w-3xl text-slate-400 text-base md:text-xl leading-relaxed mb-12 font-light">
            Stop sorting resumes. Start matching synapses. Our AI Employers suite automates the **Discovery, Vetting, and Integration** of top-tier talent using proprietary behavioral-match LLMs.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-500 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xl shadow-blue-500/30">
              Deploy Talent Agent <UserPlus className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all backdrop-blur-md">
              Employer Case Studies
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Autonomous Sourcing", 
              desc: "Hyper-targeted agents that find passive talent across GitHub, LinkedIn, and research papers based on technical depth, not keywords.",
              icon: <Search className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Cognitive Vetting", 
              desc: "Interactive technical assessments that adapt in real-time to a candidate's skill level, eliminating the 'Leetcode' bias.",
              icon: <Fingerprint className="w-8 h-8 text-blue-400" /> 
            },
            { 
              title: "Onboarding Swarms", 
              desc: "AI agents that handle legal compliance, hardware provisioning, and internal knowledge transfer in under 60 minutes.",
              icon: <Zap className="w-8 h-8 text-blue-400" /> 
            }
          ].map((card, i) => (
            <div key={i} className="group p-10 rounded-[3rem] bg-slate-900/40 border border-white/5 hover:border-blue-500/40 transition-all relative overflow-hidden">
              <div className="mb-8 p-4 bg-blue-500/5 rounded-2xl inline-block group-hover:bg-blue-500 group-hover:text-black transition-all">
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">{card.desc}</p>
              <div className="flex items-center gap-2 text-blue-400 font-bold text-[10px] uppercase tracking-widest cursor-pointer group-hover:translate-x-2 transition-transform">
                View Workflow <ArrowRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 px-6 bg-[#030816]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative group">
            <div className="absolute -inset-10 bg-blue-600/5 blur-[120px] rounded-full"></div>
            <div className="relative bg-black/60 border border-blue-500/20 rounded-[3rem] p-8 md:p-12 shadow-2xl font-mono">
               <div className="flex items-center justify-between mb-8 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2 text-blue-400 font-black italic text-[10px]">
                    <Target className="w-4 h-4" />
                    RECRUITMENT_ENGINE_v4.2
                  </div>
                  <span className="text-[10px] text-slate-500">BIAS_FILTER: ACTIVE</span>
               </div>

               <div className="mt-8 space-y-3">
                  <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400">
                    <span>Cultural Alignment</span>
                    <span className="text-blue-400">94%</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500 w-[94%]"></div>
                  </div>
                  <div className="flex justify-between text-[10px] uppercase font-bold text-slate-400 pt-2">
                    <span>Technical Proficiency</span>
                    <span className="text-emerald-400">Mastery</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 w-[88%]"></div>
                  </div>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-none text-white">Hire for <br/>Potential, <br/><span className="text-blue-500">Not History.</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed font-light">
              Our agents look beyond the PDF. By analyzing cognitive agility, technical velocity, and cultural resonance, we ensure you hire the top 0.1% of global talent—without the 6-month search cycle.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               {[
                 { icon: <ShieldCheck />, title: "Bias-Free Vetting", text: "Removing gender, age, and ethnic indicators from early-stage screening." },
                 { icon: <BarChart3 />, title: "Predictive Turnover", text: "Forecasting employee retention before you even sign the offer letter." },
                 { icon: <HeartPulse />, title: "Bio-Digital Match", text: "Matching candidates to team dynamics and manager styles." },
                 { icon: <Users />, title: "Diversity Optimizer", text: "Automatically balancing teams for maximum cognitive diversity." }
               ].map((feat, idx) => (
                 <div key={idx} className="flex flex-col gap-3 p-5 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/20 transition-all group">
                     <div className="text-blue-400 group-hover:scale-110 transition-transform">{React.cloneElement(feat.icon as React.ReactElement, { className: "w-5 h-5" } as React.Attributes)}</div>
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-100">{feat.title}</h4>
                    <p className="text-slate-500 text-[11px] leading-relaxed">{feat.text}</p>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 border-y border-white/5 bg-blue-500/[0.01]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
           {[
             { label: "Time-to-Hire", val: "-70%", desc: "Average reduction" },
             { label: "Cost-per-Hire", val: "-45%", desc: "Efficiency gain" },
             { label: "Interview ROI", val: "4.2x", desc: "Qualified leads" },
             { label: "Retention Rate", val: "92%", desc: "12-month average" },
           ].map((stat, i) => (
             <div key={i}>
                <p className="text-4xl md:text-5xl font-black text-white mb-2">{stat.val}</p>
                <p className="text-[10px] font-bold uppercase tracking-widest text-blue-400 mb-1">{stat.label}</p>
                <p className="text-[9px] text-slate-500 italic">{stat.desc}</p>
             </div>
           ))}
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-950/40 to-black border border-blue-500/30 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group shadow-3xl">
          <div className="relative z-10">
            <h2 className="text-5xl md:text-8xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Build Your <br/>Dream Team</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light">
              Our talent architects at DLF Cyber City are rewriting the rules of recruitment. Deploy your autonomous hiring squad today.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-blue-950 px-16 py-7 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic">
                Schedule Talent Audit
              </button>
              <div className="text-blue-500/50 font-mono text-[10px] tracking-[0.4em] uppercase italic">Talent Node // Gurugram Hub</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AIEmployersPage;
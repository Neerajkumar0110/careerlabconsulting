import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  HeartHandshake, 
  ShieldAlert, 
  Scale, 
  Eye, 
  Lock, 
  Zap, 
  ArrowRight,
  ClipboardCheck,
  SearchCode
} from 'lucide-react';

const AISafetyTestingPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-md">
            <HeartHandshake className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-xs font-bold uppercase tracking-widest">Alignment & Ethical Guardrails</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            ALIGNED <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-blue-500 italic">
              AI SAFETY
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Ensuring your AI remains a helpful ally. We specialize in stress-testing 
            models for behavioral alignment, toxicity mitigation, and 
            ethical decision-making frameworks.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold transition-all shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2">
              Run Safety Assessment <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Toxicity Filtering", 
              desc: "Rigorous testing of output filters to prevent the generation of hate speech, harassment, or dangerous content.",
              icon: <ShieldAlert className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "Bias Mitigation", 
              desc: "Identifying and neutralizing systemic biases in model responses to ensure fair outcomes for all users.",
              icon: <Scale className="w-8 h-8 text-emerald-400" /> 
            },
            { 
              title: "Constitutional AI", 
              desc: "Implementing secondary 'critic' models that evaluate and correct outputs based on your specific safety guidelines.",
              icon: <ClipboardCheck className="w-8 h-8 text-emerald-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-emerald-900/5 border border-white/5 hover:border-emerald-500/30 transition-all">
              <div className="mb-6 p-4 bg-emerald-500/10 rounded-2xl inline-block group-hover:bg-emerald-600 transition-all">
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
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">Behavioral <br/>Guardrails</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We deploy real-time monitoring layers that act as a "moral compass" for 
              your LLM. By using RLHF (Reinforcement Learning from Human Feedback) 
              audits, we ensure the model's goals never drift from yours.
            </p>

            <div className="space-y-4 pt-8">
               {[
                 { t: "Dynamic Content Redaction", i: <Lock /> },
                 { t: "Automated Jailbreak Testing", i: <SearchCode /> },
                 { t: "Explainability Reports", i: <Eye /> }
               ].map((point, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 group hover:border-emerald-500/50 transition-all">
                    <div className="text-emerald-400 group-hover:scale-110 transition-transform">{point.i}</div>
                    <span className="font-bold">{point.t}</span>
                 </div>
               ))}
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-10 bg-emerald-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
               <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-2">
                     <Zap className="w-4 h-4 text-emerald-400" />
                     <span className="font-mono text-[10px] text-gray-500 tracking-widest uppercase">Safety_Policy_v2.0</span>
                  </div>
                  <div className="text-[10px] font-bold text-emerald-400 font-mono">ENFORCING</div>
               </div>

               <div className="space-y-6">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Ethical Alignment</span>
                      <span className="text-emerald-400">98.4%</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[98%]"></div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-bold">
                      <span>Neutrality Bias</span>
                      <span className="text-emerald-400">Low Risk</span>
                    </div>
                    <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-[15%]"></div>
                    </div>
                  </div>

                  <div className="mt-8 p-4 rounded-xl bg-white/5 border border-dashed border-white/20">
                    <p className="text-[10px] text-gray-500 font-mono">SYSTEM_LOG:</p>
                    <p className="text-xs font-mono text-emerald-300 mt-1 italic">
                      "Unsafe prompt detected. Rerouting to Constitutional Safety Layer..."
                    </p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-emerald-900/40 to-blue-950/40 border border-emerald-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Safety by <br/>Design</h2>
            <p className="text-emerald-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our safety engineers at DLF Cyber City help brands deploy AI 
              without the risk of reputational damage.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-white text-emerald-950 px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START SAFETY AUDIT
              </button>
              <div className="text-emerald-400 font-mono text-sm tracking-widest uppercase">Sector 24, Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AISafetyTestingPage;
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  ShieldAlert, 
  CheckCircle2, 
  Terminal, 
  Search, 
  Zap, 
  Bug, 
  ArrowRight,
  TestTube2,
  AlertTriangle
} from 'lucide-react';

const AITestingPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8 backdrop-blur-md">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Model Integrity & Safety</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            AI AUDIT & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-red-600 italic">
              QA TESTING
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Don't deploy a liability. We perform rigorous stress-testing, adversarial 
            red-teaming, and hallucination audits to ensure your AI models are 
            safe, accurate, and enterprise-ready.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-red-600 hover:bg-red-700 rounded-2xl font-bold transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-2">
              Start Model Audit <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Adversarial Red Teaming", 
              desc: "Simulating attacks to bypass safety filters, ensuring your model cannot be manipulated into harmful outputs.",
              icon: <Terminal className="w-8 h-8 text-red-400" /> 
            },
            { 
              title: "Hallucination Audits", 
              desc: "Measuring factual accuracy against ground-truth data to minimize 'confidently wrong' AI responses.",
              icon: <Search className="w-8 h-8 text-red-400" /> 
            },
            { 
              title: "Bias & Fairness Testing", 
              desc: "Identifying and mitigating algorithmic bias to ensure equitable performance across all demographics.",
              icon: <CheckCircle2 className="w-8 h-8 text-red-400" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-red-900/5 border border-white/5 hover:border-red-500/30 transition-all">
              <div className="mb-6 p-4 bg-red-500/10 rounded-2xl inline-block group-hover:bg-red-600 transition-all">
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
          
          <div className="relative">
            <div className="absolute -inset-10 bg-red-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#050101] border border-red-500/20 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
               <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-2">
                    <TestTube2 className="w-5 h-5 text-red-400" />
                    <span className="font-mono text-[10px] text-red-500 uppercase tracking-widest">Stress_Test_v4.diag</span>
                  </div>
                  <Bug className="w-4 h-4 text-gray-700" />
               </div>

               <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-between">
                     <span className="text-xs font-bold text-gray-400">Jailbreak Resistance</span>
                     <span className="text-emerald-400 font-mono text-xs">99.2%</span>
                  </div>
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10 flex items-center justify-between">
                     <span className="text-xs font-bold text-gray-400">Factuality Score</span>
                     <span className="text-orange-400 font-mono text-xs">84.5%</span>
                  </div>
                  <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                     <div className="flex justify-between mb-2">
                        <span className="text-[10px] uppercase text-gray-500">Processing Safety Latency</span>
                        <span className="text-xs text-red-400 font-bold">12ms</span>
                     </div>
                     <div className="h-1 bg-white/5 rounded-full">
                        <div className="h-full bg-red-500 w-3/4"></div>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">Bulletproof <br/>Models</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              We employ a "Human-in-the-Loop" testing methodology combined with 
              autonomous evaluation swarms to break your system before your 
              customers do.
            </p>
            <div className="space-y-4">
               {[
                 { t: "Automated Regression Tests", i: <Zap className="w-5 h-5" /> },
                 { t: "Compliance Framework Mapping", i: <ShieldAlert className="w-5 h-5" /> },
                 { t: "Adversarial Prompt Libraries", i: <AlertTriangle className="w-5 h-5" /> }
               ].map((point, idx) => (
                 <div key={idx} className="flex items-center gap-4 text-gray-200 font-bold">
                    <div className="p-2 rounded-lg bg-red-500/10 text-red-400">
                      {point.i}
                    </div>
                    {point.t}
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <FeatureGrid />

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-red-950/40 to-black border border-red-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Secure Your <br/>Intelligence</h2>
            <p className="text-red-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our safety engineers at DLF Cyber City are ready to certify your 
              AI for production.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-red-600 text-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                REQUEST AUDIT
              </button>
              <div className="text-red-400 font-mono text-sm tracking-widest uppercase">Safety Hub: Gurugram, HR</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AITestingPage;
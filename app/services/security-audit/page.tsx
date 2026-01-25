import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { 
  ShieldAlert, 
  Lock, 
  Terminal, 
  Search, 
  EyeOff, 
  Fingerprint, 
  ArrowRight,
  ShieldCheck,
  Binary,
  Skull
} from 'lucide-react';

const AISecurityAuditPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8 backdrop-blur-md">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            <span className="text-red-400 text-xs font-bold uppercase tracking-widest">Offensive & Defensive AI Security</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            FORTIFY YOUR <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600 italic">
              AI BOUNDARY
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            Models are the new attack vector. We provide comprehensive security 
            audits, vulnerability assessments, and prompt injection defense to 
            protect your proprietary weights and user data.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-red-600 hover:bg-red-700 rounded-2xl font-bold transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-2">
              Request Penetration Test <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "Prompt Injection Defense", 
              desc: "Stress-testing your LLM against jailbreaking, indirect injection, and prompt leakage attacks.",
              icon: <Terminal className="w-8 h-8 text-red-500" /> 
            },
            { 
              title: "Inference Security", 
              desc: "Auditing the API endpoints and middleware to prevent model inversion and unauthorized extraction.",
              icon: <Lock className="w-8 h-8 text-red-500" /> 
            },
            { 
              title: "Data Poisoning Scans", 
              desc: "Analyzing training pipelines to ensure fine-tuning data hasn't been compromised with backdoors.",
              icon: <Skull className="w-8 h-8 text-red-500" /> 
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
            <div className="relative bg-[#050101] border border-white/5 rounded-[3rem] p-12 shadow-2xl overflow-hidden">
               <div className="flex items-center justify-between mb-12">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-red-500 animate-ping"></div>
                    <span className="font-mono text-xs text-red-500 tracking-tighter">SCANNING_VULNERABILITIES...</span>
                  </div>
                  <Binary className="w-5 h-5 text-gray-700" />
               </div>

               <div className="space-y-4">
                  {[
                    { label: "Internal Weights Access", status: "BLOCKED", color: "text-emerald-400" },
                    { label: "System Prompt Extraction", status: "INTERCEPTED", color: "text-red-400" },
                    { label: "Token Exhaustion Attack", status: "MITIGATED", color: "text-emerald-400" }
                  ].map((row, idx) => (
                    <div key={idx} className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5 font-mono text-[10px]">
                      <span className="text-gray-400">{row.label}</span>
                      <span className={`${row.color} font-bold`}>{row.status}</span>
                    </div>
                  ))}
               </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">Zero-Trust <br/>AI Framework</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Standard firewalls don't understand LLM intents. We deploy specialized 
              **AI Gateways** and **WAFs** designed to interpret and sanitize 
              prompts before they reach your core compute clusters.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-4">
               <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <EyeOff className="text-red-400 w-5 h-5" />
                  <span className="text-xs font-bold">PII Redaction</span>
               </div>
               <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center gap-3">
                  <Fingerprint className="text-red-400 w-5 h-5" />
                  <span className="text-xs font-bold">Weight Integrity</span>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-red-950/40 to-black border border-red-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Hardening Your <br/>Innovation</h2>
            <p className="text-red-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our red-teamers at DLF Cyber City are ready to find your 
              vulnerabilities before the world does.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-red-600 text-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl">
                START SECURITY AUDIT
              </button>
              <div className="text-red-400 font-mono text-sm tracking-widest uppercase tracking-widest">+91 870023 6923</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default AISecurityAuditPage;
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import SuccessStories from '@/components/sections/SuccessStories';
import { 
  ShieldAlert, 
  EyeOff, 
  Lock, 
  Radar, 
  Terminal, 
  Fingerprint, 
  ArrowRight,
  ShieldCheck,
  Zap,
  Activity
} from 'lucide-react';

const TechSecurityIndustryPage = () => {
  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-600/5 rounded-full blur-[120px] -z-10"></div>
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 mb-8 backdrop-blur-md">
            <ShieldAlert className="w-4 h-4 text-red-500" />
            <span className="text-red-500 text-xs font-bold uppercase tracking-widest">Offensive & Defensive AI Engineering</span>
          </div>
          
          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase">
            AUTONOMOUS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-zinc-400 to-red-800 italic">
              CYBER DEFENSE
            </span>
          </h1>
          
          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            The perimeter is moving. We help security companies build AI models 
            capable of real-time anomaly detection, automated incident response, 
            and proactive threat hunting across global infrastructures.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-5 bg-red-600 hover:bg-red-700 rounded-2xl font-bold transition-all shadow-xl shadow-red-500/20 flex items-center justify-center gap-2 text-white">
              Request Security Audit <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
              title: "AI Threat Hunting", 
              desc: "Deploying autonomous agents that scan logs and network traffic to identify zero-day vulnerabilities and stealth patterns.",
              icon: <Radar className="w-8 h-8 text-red-500" /> 
            },
            { 
              title: "Smart SOC Automation", 
              desc: "Automating 90% of Level 1/2 triage using LLMs that can interpret alerts, summarize threats, and suggest remediation.",
              icon: <Activity className="w-8 h-8 text-red-500" /> 
            },
            { 
              title: "Adversarial AI Defense", 
              desc: "Hardening your models against prompt injection, model inversion, and membership inference attacks.",
              icon: <Fingerprint className="w-8 h-8 text-red-500" /> 
            }
          ].map((item, i) => (
            <div key={i} className="group p-10 rounded-[2.5rem] bg-red-950/5 border border-white/5 hover:border-red-500/30 transition-all">
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
          
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 bg-red-600/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#050101] border border-white/10 rounded-3xl p-8 shadow-2xl font-mono">
               <div className="flex items-center gap-2 mb-6 text-red-500">
                  <Terminal className="w-4 h-4" />
                  <span className="text-[10px] uppercase tracking-widest">Secure_Node_Monitor: ACTIVE</span>
               </div>
               
               <div className="space-y-4">
                  <div className="p-3 rounded-lg bg-red-500/5 border border-red-500/10 flex justify-between items-center animate-pulse">
                     <span className="text-[10px] text-gray-500 tracking-tighter">ANOMALY DETECTED: IP_192.168.1.105</span>
                     <ShieldAlert className="w-3 h-3 text-red-500" />
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500">AI REMEDIATION STATUS</p>
                     <p className="text-xs text-emerald-400 mt-1">✓ PORT_ISOLATED (9ms latency)</p>
                  </div>
                  <div className="p-3 rounded-lg bg-white/5 border border-white/5">
                     <p className="text-[10px] text-gray-500">THREAT SUMMARY</p>
                     <p className="text-[11px] leading-tight mt-1">Attempted SQL Injection detected in Auth module. Agent 04 blocked source and updated WAF rules.</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter uppercase">Defend at <br/>Machine Speed</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              Human-only security teams cannot keep up with AI-powered attacks. 
              We build the countermeasures—integrating deep-learning models 
              directly into your security stack to provide a self-healing, 
              self-defending ecosystem.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
               <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <Lock className="text-red-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-sm">Zero-Trust AI</h4>
                    <p className="text-xs text-gray-500">Continuous model verification.</p>
                  </div>
               </div>
               <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                  <ShieldCheck className="text-red-500 shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-sm">Automated Compliance</h4>
                    <p className="text-xs text-gray-500">SOC2/FedRAMP mapping.</p>
                  </div>
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
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-red-950/40 to-black border border-red-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Hardening <br/>The Frontier</h2>
            <p className="text-red-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our security-focused AI engineers at DLF Cyber City are ready to 
              harden your defensive architecture.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-red-600 text-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl uppercase">
                Secure My Stack
              </button>
              <div className="text-red-500 font-mono text-sm tracking-widest uppercase">Red Team Location: Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default TechSecurityIndustryPage;
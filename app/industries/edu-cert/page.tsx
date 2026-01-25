import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Award, 
  ShieldCheck, 
  Zap, 
  Search, 
  ArrowUpRight, 
  BadgeCheck, 
  Cpu, 
  History,
  Briefcase
} from 'lucide-react';

const CertificationAIPage = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-amber-500/30">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(245,158,11,0.08)_0%,_transparent_50%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-amber-500/5 border border-amber-500/20 mb-8 backdrop-blur-xl">
            <BadgeCheck className="w-4 h-4 text-amber-500" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-amber-200">Competency Verification AI</span>
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            Immutable <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-500 to-yellow-700 italic">
              Credentials
            </span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-base md:text-xl leading-relaxed mb-12">
            Eliminating credential fraud and the "Skills Gap." We build AI engines that 
            **validate expertise**, automate proctoring, and map certifications directly 
            to real-time labor market demands.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="px-10 py-5 bg-amber-600 hover:bg-amber-700 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xl shadow-amber-600/20">
              VALIDATE REPOSITORY <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Neural Proctoring", 
                desc: "Next-gen eye-tracking and behavioral biometrics to ensure exam integrity without invading privacy.",
                icon: <Cpu className="w-8 h-8 text-amber-500" /> 
              },
              { 
                title: "Smart Syllabus Mapping", 
                desc: "AI that scrapes global job postings to ensure your certification curriculum stays relevant to 2026 industry standards.",
                icon: <Briefcase className="w-8 h-8 text-amber-500" /> 
              },
              { 
                title: "Fraud Detection", 
                desc: "Identifying AI-generated certificate forgery and credential manipulation via neural pattern matching.",
                icon: <ShieldCheck className="w-8 h-8 text-amber-500" /> 
              }
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-slate-900/40 border border-white/5 hover:border-amber-500/30 transition-all group">
                <div className="mb-6">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="relative order-2 lg:order-1">
            <div className="absolute -inset-10 bg-amber-500/5 blur-[100px] rounded-full"></div>
            <div className="relative bg-[#020817] border border-amber-500/20 rounded-[3rem] p-10 shadow-2xl font-mono">
               <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-4">
                  <div className="flex items-center gap-2 text-amber-500 font-black italic text-[10px]">
                    <Award className="w-4 h-4" />
                    CERT_VERIFICATION_KERNEL
                  </div>
                  <div className="text-[10px] text-slate-500 uppercase">Status: Secure</div>
               </div>

               <div className="mt-8 space-y-4">
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20">
                    <p className="text-[10px] text-amber-500 uppercase mb-2 font-black italic">! ANOMALY_DETECTION:</p>
                    <p className="text-[11px] text-white italic">"High similarity detected in 'Solution Architecture' response pattern. Possible synthetic generation flagged for human review."</p>
                  </div>
               </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-[0.9] text-white">The End of <br/>Resume <br/><span className="text-amber-500 font-normal underline decoration-white/20 underline-offset-8">Fiction.</span></h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              We move from "declared skills" to **demonstrated mastery**. Our AI agents analyze real-world project output, code commits, and problem-solving velocity to issue dynamic, verifiable digital badges.
            </p>

            <div className="space-y-4">
               {[
                 { icon: <Search className="text-amber-500" />, text: "Automated Competency-Gap Analysis" },
                 { icon: <History className="text-amber-500" />, text: "Dynamic Certificate Expiry Tracking" },
                 { icon: <Zap className="text-amber-500" />, text: "Real-time Skill Verification API" }
               ].map((item, idx) => (
                 <div key={idx} className="flex items-center gap-4 p-5 rounded-2xl bg-slate-900/50 border border-white/10 hover:border-amber-500/30 transition-all group">
                    {item.icon}
                    <span className="text-xs font-bold uppercase tracking-widest text-slate-200 group-hover:text-amber-100">{item.text}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-amber-950/20 to-black border border-amber-500/20 rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group">
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">Authorize <br/>The Future</h2>
            <p className="text-amber-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our certification architects at DLF Cyber City are engineering the gold standard for global competency.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="bg-amber-600 text-white px-16 py-6 rounded-2xl font-black text-2xl hover:scale-105 transition-all shadow-2xl uppercase italic">
                Get Certified
              </button>
              <div className="text-amber-500/50 font-mono text-[10px] tracking-[0.4em] uppercase">Verification Lab // Gurugram, India</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default CertificationAIPage;
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Building2, 
  ShieldCheck, 
  Database, 
  Users, 
  BarChart3, 
  ArrowRight, 
  ChevronRight,
  Globe,
  Lock,
  Zap
} from 'lucide-react';

const InstitutionalAIPage = () => {
  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 overflow-x-hidden selection:bg-blue-500/30">
      <Navbar />

      <section className="relative pt-32 pb-16 md:pt-52 md:pb-32 px-6">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
          <div className="flex items-center gap-3 px-4 py-2 rounded-full bg-blue-500/5 border border-blue-500/20 mb-8 backdrop-blur-xl animate-fade-in">
            <Building2 className="w-4 h-4 text-blue-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">Institutional Governance 4.0</span>
          </div>

          <h1 className="text-4xl md:text-7xl lg:text-9xl font-black tracking-tighter leading-[0.85] uppercase mb-10">
            The Smart <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-indigo-400 to-blue-600 italic">
              Foundation
            </span>
          </h1>

          <p className="max-w-2xl text-slate-400 text-base md:text-xl leading-relaxed mb-12">
            Architecting secure, autonomous infrastructures for global universities and districts. We integrate **Predictive Enrollment**, **Zero-Trust Security**, and **Automated Governance** into one unified campus OS.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <button className="px-10 py-5 bg-blue-600 hover:bg-blue-700 rounded-2xl font-black text-sm uppercase tracking-widest transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 shadow-2xl shadow-blue-500/20">
              Request Blueprint <ArrowRight className="w-4 h-4" />
            </button>
            <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-white/10 transition-all">
              Security Briefing
            </button>
          </div>
        </div>
      </section>

      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          
          <div className="md:col-span-8 p-8 md:p-12 rounded-[2.5rem] bg-slate-900/40 border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-8">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">Live_Campus_Intelligence</span>
              </div>
              <h3 className="text-3xl font-bold mb-4 tracking-tight text-white">Institutional <br/>Control Plane</h3>
              <p className="max-w-md text-slate-400 text-sm leading-relaxed mb-8 italic">
                "Centralizing cross-departmental data into a single source of truth for real-time decision making."
              </p>

              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Grant Utilization</p>
                  <p className="text-2xl font-black text-blue-400">92.4%</p>
                </div>
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Operational ROI</p>
                  <p className="text-2xl font-black text-emerald-400">+18%</p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-blue-600/10 rounded-full blur-[100px] group-hover:bg-blue-600/20 transition-colors duration-700"></div>
          </div>

          <div className="md:col-span-4 p-8 rounded-[2.5rem] bg-indigo-950/20 border border-indigo-500/20 flex flex-col justify-between group">
            <div className="space-y-6">
               <div className="p-4 bg-indigo-500/10 rounded-2xl w-fit">
                  <Lock className="text-indigo-400 w-6 h-6" />
               </div>
               <h3 className="text-xl font-bold text-white">Zero-Trust <br/>Campus Safety</h3>
               <p className="text-slate-400 text-sm">AI-driven perimeter defense and encrypted student data silos.</p>
            </div>
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-indigo-400 font-bold text-xs uppercase tracking-widest cursor-pointer hover:text-indigo-300 transition-colors">
              Read Security Protocol <ChevronRight className="w-4 h-4" />
            </div>
          </div>

          <div className="md:col-span-4 p-8 rounded-[2.5rem] bg-slate-900/40 border border-white/5 group">
            <Globe className="text-blue-500 w-8 h-8 mb-6 group-hover:rotate-12 transition-transform" />
            <h3 className="text-xl font-bold mb-2 text-white">Global Accreditation</h3>
            <p className="text-slate-500 text-xs uppercase font-bold tracking-widest mb-4 text-blue-400">Multi-Region Compliance</p>
            <p className="text-slate-400 text-sm">Automated data mapping for FERPA, GDPR, and Title IX audits.</p>
          </div>

          <div className="md:col-span-8 p-8 md:p-12 rounded-[2.5rem] bg-white/[0.02] border border-white/5 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <Zap className="text-amber-400 w-10 h-10 mb-6" />
              <h3 className="text-2xl font-bold mb-2 text-white">Predictive Yield Modeling</h3>
              <p className="text-slate-400 text-sm">Optimize admissions and financial aid distribution with 94% accuracy in student success forecasting.</p>
            </div>
            <div className="w-full md:w-48 aspect-video md:aspect-square bg-slate-800/50 rounded-2xl flex items-center justify-center border border-dashed border-white/10 group-hover:border-blue-500/40 transition-colors">
               <BarChart3 className="text-blue-500/50 w-12 h-12" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-4xl md:text-7xl font-black uppercase italic leading-none mb-8 text-white">
              Sovereign <br />
              <span className="text-blue-500">Governance.</span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 leading-relaxed">
              We empower institutional leadership with autonomous workflows. From high-speed procurement auditing to grant lifecycle management, our AI handles the bureaucracy so you can focus on the mission.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: <ShieldCheck className="text-blue-400" />, title: "Automated Compliance Audits", desc: "Real-time monitoring of Title IX and financial reporting." },
                { icon: <Database className="text-blue-400" />, title: "Unified Research Data Lake", desc: "Centralized, secure storage for cross-departmental IP." },
                { icon: <Users className="text-blue-400" />, title: "Faculty Workload Optimization", desc: "AI-driven scheduling and resource allocation." }
              ].map((item, i) => (
                <div key={i} className="flex gap-5 group">
                  <div className="mt-1">{item.icon}</div>
                  <div>
                    <h4 className="text-sm font-black uppercase tracking-widest text-white mb-1">{item.title}</h4>
                    <p className="text-slate-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 to-indigo-600/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 bg-slate-950 p-4">
              <div className="aspect-[4/5] md:aspect-square bg-slate-900 rounded-[2rem] flex items-center justify-center">
                 <Building2 className="w-24 h-24 text-blue-500/20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto bg-gradient-to-b from-slate-900 to-black border border-white/10 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden group shadow-3xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,_rgba(37,99,235,0.1)_0%,_transparent_50%)]"></div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-8xl font-black text-white mb-8 tracking-tighter uppercase italic leading-none">
              Modernize Your <br />
              <span className="text-blue-500">Institution</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              Our institutional architects at DLF Cyber City are ready to engineer the future of your campus. Secure, Scalable, and Autonomous.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button className="px-16 py-7 bg-white text-black rounded-2xl font-black text-xl hover:bg-blue-500 hover:text-white transition-all hover:scale-105 active:scale-95 shadow-2xl uppercase">
                Download Institutional Roadmap
              </button>
              <div className="flex items-center gap-2 text-blue-500/60 font-mono text-[10px] uppercase tracking-[0.4em]">
                Gurugram // Global Innovation Hub
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default InstitutionalAIPage;
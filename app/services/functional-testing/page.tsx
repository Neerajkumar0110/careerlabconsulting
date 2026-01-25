"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  CheckCircle2, 
  Bug, 
  FlaskConical, 
  ShieldCheck, 
  Zap, 
  Search, 
  ArrowRight,
  ClipboardCheck,
  MousePointer2,
  MonitorCheck,
  Terminal
} from 'lucide-react';

const FunctionalTesting = () => {
  const testingServices = [
    {
      title: "Unit & Integration Testing",
      desc: "Individual components aur unke interactions ko verify karna taaki production mein koi logic gap na rahe.",
      icon: <FlaskConical />,
      img: "https://images.pexels.com/photos/5473337/pexels-photo-5473337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "User Acceptance Testing (UAT)",
      desc: "Real-world scenarios ko simulate karke ensure karna ki software end-user ki expectations par khara utarta hai.",
      icon: <MousePointer2 />,
      img: "https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(16,185,129,0.08)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-8 backdrop-blur-xl">
              <CheckCircle2 size={14} className="text-emerald-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-200">QA & Precision Protocol</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Zero Error <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500 italic font-black">Assurance.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Hum software ko sirf build nahi karte, use rigorous testing se guzaarte hain. Hamari Functional Testing services ensure karti hain ki aapka application har aspect mein flawless perform kare.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-emerald-600/20"
            >
              Request QA Audit <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-emerald-500/10 blur-3xl rounded-full"></div>
            <div className="relative p-8 bg-slate-950 border border-white/10 rounded-[3rem] overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                </div>
                <span className="text-[10px] font-mono text-emerald-500">SYSTEM_STABLE_99.9%</span>
              </div>
              <div className="space-y-6">
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <span className="text-xs text-slate-500 uppercase tracking-tighter">Tests Executed</span>
                  <span className="text-3xl font-black text-emerald-400 italic">4,290</span>
                </div>
                <div className="flex justify-between items-end border-b border-white/5 pb-4">
                  <span className="text-xs text-slate-500 uppercase tracking-tighter">Bugs Resolved</span>
                  <span className="text-3xl font-black text-blue-400 italic">100%</span>
                </div>
                <div className="h-12 w-full bg-emerald-500/5 border border-emerald-500/20 rounded-xl flex items-center px-4 gap-3">
                   <Terminal size={16} className="text-emerald-500" />
                   <span className="text-[10px] font-mono text-emerald-500 animate-pulse">Running regression_suite.sh...</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center md:text-left space-y-4">
                 <Search className="text-emerald-500 mx-auto md:mx-0" size={32} />
                 <h4 className="text-xl font-black uppercase italic">Rigorous Discovery</h4>
                 <p className="text-slate-500 text-sm leading-relaxed">Har ek edge-case ko identify karna hamari priority hai.</p>
              </div>
              <div className="text-center md:text-left space-y-4">
                 <MonitorCheck className="text-emerald-500 mx-auto md:mx-0" size={32} />
                 <h4 className="text-xl font-black uppercase italic">Cross-Platform</h4>
                 <p className="text-slate-500 text-sm leading-relaxed">Web, Mobile, aur Desktop par consistent performance ki guarantee.</p>
              </div>
              <div className="text-center md:text-left space-y-4">
                 <ShieldCheck className="text-emerald-500 mx-auto md:mx-0" size={32} />
                 <h4 className="text-xl font-black uppercase italic">Regression Ready</h4>
                 <p className="text-slate-500 text-sm leading-relaxed">Har naye update ke baad automate test suits run hote hain.</p>
              </div>
           </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {testingServices.map((service, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 hover:border-emerald-500/30 transition-all">
              <img src={service.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent">
                <div className="mb-6 p-4 bg-emerald-500/10 rounded-2xl w-fit text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                  {React.cloneElement(service.icon as React.ReactElement, { size: 30 } as any)}
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4">{service.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{service.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-emerald-500">
                  <ClipboardCheck size={14} /> Certified QA Process
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 bg-emerald-600/5">
        <div className="max-w-4xl mx-auto text-center">
          <Bug className="mx-auto text-emerald-500 mb-8 animate-bounce" size={48} />
          <h2 className="text-4xl md:text-7xl font-black uppercase italic tracking-tighter mb-10 leading-none">
            Break Your Code <br /> Before <span className="text-emerald-500">Users Do.</span>
          </h2>
          <p className="text-slate-400 mb-12 max-w-lg mx-auto italic font-light">"Quality is not an act, it is a habit. Let's make your software bulletproof."</p>
          <button 
            onClick={() => window.location.href = '/contact'}
            className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-emerald-600/30"
          >
            Start Testing Cycle
          </button>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default FunctionalTesting;
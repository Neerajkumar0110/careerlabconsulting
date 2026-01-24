"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  LifeBuoy, 
  Wrench, 
  Clock, 
  ShieldCheck, 
  RefreshCcw, 
  ArrowRight,
  UserCheck,
  Zap,
  History,
  CheckCircle
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const SupportMaintenance = () => {

  const maintenanceFeatures: {
    title: string;
    desc: string;
    icon: LucideIcon;
    img: string;
  }[] = [
    {
      title: "24/7 Proactive Monitoring",
      desc: "Hum aapke systems ko round-the-clock monitor karte hain taaki bugs user tak pahunchne se pehle hi fix ho jayein.",
      icon: Clock,
      img: "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Security & OS Updates",
      desc: "Regular patches, version upgrades, aur security audits taaki aapka application hamesha updated aur secure rahe.",
      icon: ShieldCheck,
      img: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-blue-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(59,130,246,0.08)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 backdrop-blur-xl">
              <LifeBuoy size={14} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-200">Mission Critical Support</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Reliability <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 italic font-black">Guaranteed.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Aapka business kabhi nahi rukta, aur hamara support bhi nahi. We offer world-class maintenance for legacy systems, modern SaaS, and Web3 protocols.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-blue-600 hover:bg-blue-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-blue-600/20"
            >
              Get Maintenance Plan <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-blue-500/10 blur-3xl rounded-full"></div>
            <div className="relative p-8 bg-slate-900/50 border border-white/10 rounded-[3rem] backdrop-blur-3xl overflow-hidden">
               <div className="flex justify-between items-center mb-8">
                  <span className="text-[10px] font-mono text-blue-400 uppercase tracking-widest">SLA_Priority_1_Response</span>
                  <div className="flex gap-1">
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                     <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
                  </div>
               </div>
               
               <div className="space-y-4">
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                     <div className="flex justify-between items-start mb-2">
                        <p className="text-xs font-bold uppercase italic">Response Time</p>
                        <span className="text-emerald-400 text-[10px] font-mono font-bold">&lt; 15 Mins</span>
                     </div>
                     <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-full animate-pulse"></div>
                     </div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 opacity-60">
                     <p className="text-[10px] text-slate-500 uppercase font-bold mb-2">System Health Check</p>
                     <div className="flex gap-2">
                        {[1,2,3,4,5,6,7,8].map(i => (
                          <div key={i} className="h-4 flex-1 bg-blue-500/20 rounded-sm"></div>
                        ))}
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">Maintenance Framework</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { label: "Bug Tracking", icon: <Wrench />, val: "Automated" },
              { label: "SLA Response", icon: <History />, val: "Immediate" },
              { label: "Uptime Commit", icon: <Zap />, val: "99.99%" },
              { label: "Account Manager", icon: <UserCheck />, val: "Dedicated" }
            ].map((stat, i) => (
              <div key={i} className="text-center group p-6 rounded-3xl hover:bg-white/[0.02] transition-all">
                <div className="text-blue-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                <h4 className="text-lg font-black italic mb-1 uppercase">{stat.val}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {maintenanceFeatures.map((feature, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 hover:border-blue-500/30 transition-all">
              <img src={feature.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent">
                <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl w-fit text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <feature.icon size={30} />
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4">{feature.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{feature.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-400">
                  <CheckCircle size={14} /> ITIL V4 Certified
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 bg-blue-600/5">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-slate-900 border border-white/5 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 p-12 opacity-5"><RefreshCcw size={200} /></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              Prevention is <br />Better Than <span className="text-blue-500">Fixing.</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto font-light leading-relaxed">System failures cost $5,600 per minute on average. Don't be a statistic. Let's keep your software running perfectly.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <button 
                 onClick={() => window.location.href = '/contact'}
                 className="bg-blue-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all"
               >
                 Start Maintenance
               </button>
               <button className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all">
                 View SLA Terms
               </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SupportMaintenance;
"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Activity, 
  Eye, 
  Bell, 
  ShieldAlert, 
  BarChart3, 
  ArrowRight,
  MonitorCheck,
  Zap,
  Radio,
  Network
} from 'lucide-react';

const MonitoringPage = () => {
  const monitorFeatures = [
    {
      title: "Infrastructure Observability",
      desc: "Cloud, On-prem, aur Hybrid systems ki deep monitoring taaki bottlenecks ko impact se pehle resolve kiya ja sake.",
      icon: <Network />,
      img: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Real-User Monitoring (RUM)",
      desc: "Analyze kijiye ki real users aapki app ke sath kaise interact kar rahe hain aur latency kahan hit ho rahi hai.",
      icon: <Eye />,
      img: "https://images.pexels.com/photos/3182811/pexels-photo-3182811.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-cyan-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_rgba(6,182,212,0.1)_0%,_transparent_70%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-8 backdrop-blur-xl">
              <Radio size={14} className="text-cyan-400 animate-pulse" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-200">24/7 Global Surveillance</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Active <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 italic font-black">Vigilance.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Hum sirf alerts nahi bhejte, hum stability ensure karte hain. Hamara monitoring stack har layer ko scan karta hai—frontend performance se lekar backend database query logs tak.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-cyan-600 hover:bg-cyan-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-cyan-600/20"
            >
              Start Monitoring Now <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-cyan-500/10 blur-3xl rounded-full"></div>
            <div className="relative p-8 bg-slate-950/80 border border-white/10 rounded-[3rem] backdrop-blur-3xl">
               <div className="flex justify-between items-center mb-10">
                  <div className="flex items-center gap-3">
                     <MonitorCheck className="text-cyan-400" size={20} />
                     <span className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">Sys_Health: OK</span>
                  </div>
                  <div className="flex gap-1">
                     {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-bounce" style={{ animationDelay: `${i*0.2}s` }}></div>)}
                  </div>
               </div>
               
               <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                     <div>
                        <p className="text-[10px] uppercase font-bold text-slate-500">Global Uptime</p>
                        <p className="text-2xl font-black italic">99.999%</p>
                     </div>
                     <Activity className="text-cyan-500" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] uppercase font-bold text-slate-500">Alerts (24h)</p>
                        <p className="text-xl font-black italic text-yellow-500">12 Fixed</p>
                     </div>
                     <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                        <p className="text-[10px] uppercase font-bold text-slate-500">Critical</p>
                        <p className="text-xl font-black italic text-red-500">0</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-20 italic">The Surveillance Stack</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Log Analysis", icon: <BarChart3 />, val: "Real-time" },
              { label: "Smart Alerts", icon: <Bell />, val: "AI-Powered" },
              { label: "Recovery", icon: <Zap />, val: "Auto-Scale" },
              { label: "Vulnerability", icon: <ShieldAlert />, val: "Constant" }
            ].map((stat, i) => (
              <div key={i} className="text-center group p-6 hover:bg-white/[0.02] rounded-3xl transition-all">
                <div className="text-cyan-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                <h4 className="text-lg font-black italic mb-1 uppercase tracking-tight">{stat.val}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {monitorFeatures.map((feature, i) => (
            <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 hover:border-cyan-500/30 transition-all">
              <img src={feature.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
              <div className="relative p-12 md:p-16 bg-gradient-to-t from-[#020617] via-[#020617]/90 to-transparent">
                <div className="mb-6 p-4 bg-cyan-500/10 rounded-2xl w-fit text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white transition-all">
                  {React.cloneElement(feature.icon as React.ReactElement, { size: "30" } as any)}
                </div>
                <h3 className="text-2xl font-black uppercase italic mb-4">{feature.title}</h3>
                <p className="text-slate-400 font-light leading-relaxed mb-8">{feature.desc}</p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-cyan-400">
                  <ShieldAlert size={14} /> Zero-Downtime Architecture
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-32 px-6 bg-cyan-600/5">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-slate-900 border border-white/5 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-5 animate-spin-slow"><Radio size={250} /></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-[0.85]">
              Sleep Better. <br /> We're <span className="text-cyan-500 underline decoration-cyan-500/30 underline-offset-8">Watching.</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto font-light leading-relaxed">System failures don't wait for office hours. Hamara active monitoring system hamesha live rehta hai.</p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-cyan-600 text-white px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl shadow-cyan-600/30"
            >
              Get Monitoring Quote
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default MonitoringPage;
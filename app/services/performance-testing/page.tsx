"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import { 
  Zap, 
  Gauge, 
  Activity, 
  BarChart3, 
  Flame, 
  Timer, 
  ArrowRight,
  ShieldAlert,
  HardDrive,
  Cpu
} from 'lucide-react';

const PerformanceTesting = () => {
  const performanceMetrics = [
    {
      title: "Load & Stress Testing",
      desc: "Hum aapke system ko extreme traffic levels par push karte hain taaki breaking point aur recovery time ka pata chal sake.",
      icon: <Flame />,
      img: "https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    },
    {
      title: "Scalability Analysis",
      desc: "Infrastructure ki capacity check karna taaki user growth ke sath system automatically scale ho sake.",
      icon: <Gauge />,
      img: "https://images.pexels.com/photos/57007/pexels-photo-57007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 selection:bg-orange-600/30 font-sans">
      <Navbar />

      <section className="relative pt-32 pb-20 md:pt-52 md:pb-32 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_rgba(249,115,22,0.1)_0%,_transparent_60%)] -z-10"></div>
        
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 mb-8 backdrop-blur-xl">
              <Zap size={14} className="text-orange-400" />
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-200">High-Velocity Optimization</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-8">
              Peak <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 italic font-black">Performance.</span>
            </h1>
            <p className="max-w-xl text-slate-400 text-lg font-light leading-relaxed mb-10">
              Don't let slow load times kill your conversion. Hum aapke application ko optimize karte hain 100ms response times aur infinite scaling ke liye.
            </p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-orange-600 hover:bg-orange-500 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] flex items-center gap-3 transition-all shadow-xl shadow-orange-600/20"
            >
              Analyze Latency <ArrowRight size={16} />
            </button>
          </div>

          <div className="lg:w-1/2 relative group w-full">
            <div className="absolute -inset-4 bg-orange-500/10 blur-3xl rounded-full"></div>
            <div className="relative p-8 bg-slate-950 border border-white/10 rounded-[3rem] overflow-hidden">
               <div className="flex justify-between items-center mb-10">
                  <div className="flex gap-4">
                     <Activity className="text-orange-500 animate-pulse" />
                     <span className="text-xs font-mono uppercase tracking-widest text-slate-500">Real-time Load Monitoring</span>
                  </div>
                  <span className="px-3 py-1 bg-red-500/10 border border-red-500/20 rounded-full text-[10px] text-red-400 font-bold uppercase tracking-widest">Stress Level: High</span>
               </div>
               
               <div className="h-40 flex items-end gap-1 mb-6">
                  {[40, 60, 45, 90, 100, 80, 110, 130, 95, 150].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className="flex-1 bg-gradient-to-t from-orange-600 to-red-500 rounded-t-md opacity-80"></div>
                  ))}
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 rounded-2xl">
                     <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Response Time</p>
                     <p className="text-xl font-black italic">142ms</p>
                  </div>
                  <div className="bg-white/5 p-4 rounded-2xl">
                     <p className="text-[10px] uppercase text-slate-500 font-bold mb-1">Throughput</p>
                     <p className="text-xl font-black italic">8.5k req/s</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-center text-[10px] font-black uppercase tracking-[0.5em] text-slate-500 mb-16 italic">Testing Methodology</h2>
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Concurrency", val: "50k+", icon: <Cpu /> },
              { label: "Stability", val: "99.99%", icon: <ShieldAlert /> },
              { label: "Throughput", val: "1M+", icon: <HardDrive /> },
              { label: "Latency Red.", val: "60%", icon: <Timer /> }
            ].map((stat, i) => (
              <div key={i} className="text-center group">
                <div className="text-orange-500 mb-4 flex justify-center group-hover:scale-110 transition-transform">{stat.icon}</div>
                <h4 className="text-3xl font-black italic mb-1">{stat.val}</h4>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {performanceMetrics.map((service, i) => (
              <div key={i} className="group relative rounded-[3rem] overflow-hidden border border-white/5 bg-slate-900/40 hover:border-orange-500/30 transition-all">
                <img src={service.img} className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale group-hover:scale-110 transition-transform duration-1000" />
                <div className="relative p-12 bg-gradient-to-t from-[#020617] via-[#020617]/95 to-transparent">
                  <div className="mb-6 p-4 bg-orange-500/10 rounded-2xl w-fit text-orange-500 group-hover:bg-orange-500 group-hover:text-white transition-all">
                    {React.cloneElement(service.icon as React.ReactElement, { size: 30 } as any)}
                  </div>
                  <h3 className="text-2xl font-black uppercase italic mb-4">{service.title}</h3>
                  <p className="text-slate-400 font-light leading-relaxed mb-8">{service.desc}</p>
                  <BarChart3 className="text-slate-700 opacity-20 absolute top-10 right-10" size={120} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto p-12 md:p-24 rounded-[4rem] bg-gradient-to-br from-orange-600/20 via-slate-900/50 to-slate-950 border border-orange-500/20 relative overflow-hidden text-center">
          <div className="relative z-10">
            <Timer className="mx-auto text-orange-500 mb-8" size={48} />
            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter mb-8 leading-none">
              Latency Is <br /><span className="text-orange-500">The Enemy.</span>
            </h2>
            <p className="text-slate-400 mb-12 max-w-lg mx-auto">Har ek millisecond revenue par asar dalta hai. Hum optimize karenge aapka system har load level ke liye.</p>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="bg-white text-black px-12 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.3em] hover:scale-105 transition-all"
            >
              Get Performance Audit
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default PerformanceTesting;
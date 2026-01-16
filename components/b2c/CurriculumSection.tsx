'use client';

import React from 'react';
import { 
  Code2, 
  Terminal, 
  Layers, 
  Rocket, 
  ChevronRight, 
  Star,
  Cpu,
  Globe
} from 'lucide-react';

const roadmap = [
  {
    phase: "Phase 01",
    title: "Neural Foundations",
    subtitle: "Week 1-4",
    desc: "Mastering Large Language Models (LLMs) architecture and prompt engineering protocols.",
    icon: Cpu,
    color: "from-blue-600 to-indigo-600",
    tags: ["LLMs", "PyTorch", "Transformers"]
  },
  {
    phase: "Phase 02",
    title: "Autonomous Agent Ops",
    subtitle: "Week 5-8",
    desc: "Building self-correcting AI agents using AutoGPT and LangChain frameworks.",
    icon: Terminal,
    color: "from-cyan-500 to-blue-500",
    tags: ["LangChain", "Multi-Agent", "Tools"]
  },
  {
    phase: "Phase 03",
    title: "Production Deployment",
    subtitle: "Week 9-12",
    desc: "Scaling agents on InternX proprietary cloud with security and audit protocols.",
    icon: Rocket,
    color: "from-emerald-500 to-teal-500",
    tags: ["Cloud Ops", "Docker", "Security"]
  }
];

export default function DeploymentRoadmap() {
  return (
    <section className="py-24 bg-[#020617] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.05)_0,transparent_70%)]" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-4">
            <Star className="w-3 h-3 text-blue-400 fill-blue-400" />
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">The Curriculum</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase mb-6">
            Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Deployment</span> Roadmap
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            A structured path from core concepts to live production. No filler, only industry-grade deployment.
          </p>
        </div>

        {/* Roadmap Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {roadmap.map((item, index) => (
            <div key={index} className="group relative">
              {/* Card Decoration */}
              <div className={`absolute -inset-0.5 bg-gradient-to-b ${item.color} rounded-[2.5rem] opacity-0 group-hover:opacity-20 transition duration-500`} />
              
              <div className="relative h-full bg-[#0a0f1d] border border-white/5 p-8 rounded-[2.5rem] flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-start mb-8">
                  <div className={`w-14 h-14 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <span className="text-[10px] font-black text-slate-600 uppercase tracking-[0.2em]">{item.phase}</span>
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-blue-500 font-bold text-xs uppercase tracking-widest mb-4">{item.subtitle}</p>
                <p className="text-slate-400 leading-relaxed mb-8 flex-grow">
                  {item.desc}
                </p>

                {/* Skills/Tags */}
                <div className="flex flex-wrap gap-2 pt-6 border-t border-white/5">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-black text-slate-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Mobile Connector (Hidden on Desktop) */}
                {index !== roadmap.length - 1 && (
                  <div className="lg:hidden absolute -bottom-8 left-1/2 -translate-x-1/2 text-white/10">
                    <ChevronRight className="w-8 h-8 rotate-90" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Action */}
        <div className="mt-20 p-8 rounded-[3rem] bg-gradient-to-r from-blue-900/20 via-[#0a0f1d] to-transparent border border-white/5 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
               <Globe className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h4 className="text-white font-bold">Certification included on completion</h4>
              <p className="text-slate-500 text-sm italic">Verified by Industry Partners & Neural Protocols</p>
            </div>
          </div>
          <button className="px-10 py-4 bg-white text-black rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-blue-500 hover:text-white transition-all">
            Download Full Syllabus
          </button>
        </div>
      </div>
    </section>
  );
}
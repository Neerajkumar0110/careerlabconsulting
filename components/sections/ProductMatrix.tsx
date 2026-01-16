'use client';

import React from 'react';
import { 
  Bot, 
  Users, 
  GraduationCap, 
  LineChart, 
  Cpu, 
  Globe, 
  ArrowUpRight 
} from 'lucide-react';

const services = [
  { 
    id: "01",
    name: "AI CRM", 
    desc: "Voice Verser & Real-Quality Avatars for sales automation.", 
    icon: <Bot className="w-6 h-6 md:w-7 md:h-7" />, 
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "group-hover:border-blue-500/50"
  },
  { 
    id: "02",
    name: "AI HRMS", 
    desc: "Autonomous Payroll, Hiring & Onboarding Agents.", 
    icon: <Users className="w-6 h-6 md:w-7 md:h-7" />, 
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "group-hover:border-purple-500/50"
  },
  { 
    id: "03",
    name: "AI LMS", 
    desc: "360° Reports & Personalized AI Tutors Deployment.", 
    icon: <GraduationCap className="w-6 h-6 md:w-7 md:h-7" />, 
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "group-hover:border-emerald-500/50"
  },
  { 
    id: "04",
    name: "AI ERP", 
    desc: "Complete Finance, Banking & Admin Autonomy.", 
    icon: <LineChart className="w-6 h-6 md:w-7 md:h-7" />, 
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "group-hover:border-orange-500/50"
  },
  { 
    id: "05",
    name: "Freelancer Hub", 
    desc: "AI-Managed Project Development & Gig Hub.", 
    icon: <Cpu className="w-6 h-6 md:w-7 md:h-7" />, 
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "group-hover:border-cyan-500/50"
  },
  { 
    id: "06",
    name: "Job Portal", 
    desc: "Global AI-Only Career Openings & Matching.", 
    icon: <Globe className="w-6 h-6 md:w-7 md:h-7" />, 
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    border: "group-hover:border-indigo-500/50"
  }
];

export default function ProductMatrix() {
  return (
    <section className="relative py-16 md:py-24 px-4 sm:px-6 md:px-10 bg-[#030712] overflow-hidden">
      {/* Background Grid - Mobile Optimization */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:3rem_3rem] md:bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header Section - Better Alignment for Mobile */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 md:mb-16 gap-6">
          <div className="w-full">
            <span className="text-blue-500 font-mono text-[10px] md:text-xs tracking-widest uppercase mb-3 block">
              // Ecosystem_Matrix_v2.0
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-6xl font-black text-white leading-[1.1]">
              Complete <br className="hidden sm:block lg:hidden" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500">AI Suite</span>
            </h2>
          </div>
          <p className="text-slate-400 text-sm md:text-lg max-w-md leading-relaxed border-l-2 border-blue-500/30 pl-4 lg:border-l-0 lg:pl-0 lg:text-right">
            Six autonomous neural modules working together in perfect sync to automate your enterprise operations.
          </p>
        </div>

        {/* Responsive Grid System */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className={`group relative p-6 md:p-8 bg-[#0b0f1a] border border-white/5 rounded-[1.5rem] md:rounded-[2rem] hover:-translate-y-2 transition-all duration-500 ${service.border}`}
            >
              {/* Glow Effect - Subtle on Mobile */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 md:group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${service.color.replace('text-', 'from-')} to-transparent rounded-[1.5rem] md:rounded-[2rem] pointer-events-none`}></div>

              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-between items-start mb-6">
                  <div className={`p-3 md:p-4 rounded-xl md:rounded-2xl ${service.bg} ${service.color} ring-1 ring-white/5`}>
                    {service.icon}
                  </div>
                  <span className="font-mono text-slate-700 text-[10px] md:text-xs font-bold">
                    {service.id}
                  </span>
                </div>

                <div className="flex-grow">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 group-hover:text-blue-200 transition-colors">
                    {service.name}
                  </h3>
                  <p className="text-slate-400 text-xs md:text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom Action Area */}
                <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-white/5 flex items-center justify-between">
                  <span className={`text-[10px] md:text-xs font-black uppercase tracking-widest ${service.color}`}>
                    Initialize System
                  </span>
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors border border-white/5">
                    <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
'use client';

import React from 'react';
import { 
  MonitorPlay, 
  Award, 
  Users, 
  Briefcase, 
  LifeBuoy, 
  GraduationCap 
} from 'lucide-react';

const advantages = [
  {
    title: "IMMERSIVE CLASSROOM EXPERIENCE",
    desc: "With live, in-person professional training courses by industry experts, immerse yourself in a classroom experience that transcends traditional learning.",
    icon: MonitorPlay,
    color: "text-orange-500",
    glow: "group-hover:shadow-orange-500/20"
  },
  {
    title: "GLOBALLY RECOGNIZED CERTIFICATION",
    desc: "Career Lab Certification, globally recognized by leading multinational corporations, provides you an international edge with an industry-focused curriculum.",
    icon: Award,
    color: "text-red-500",
    glow: "group-hover:shadow-red-500/20"
  },
  {
    title: "HANDS-ON TRAINING BY INDUSTRY EXPERTS",
    desc: "Immerse yourself in a transformative learning experience as leading industry professionals guide you through hands-on training.",
    icon: GraduationCap,
    color: "text-orange-400",
    glow: "group-hover:shadow-orange-400/20"
  },
  {
    title: "REAL WORLD PROJECTS & CASE STUDIES",
    desc: "Navigate the complexities of rapidly evolving technology industry by tackling real-world projects and case studies.",
    icon: Briefcase,
    color: "text-blue-500",
    glow: "group-hover:shadow-blue-500/20"
  },
  {
    title: "360° DEGREE CAREER SUPPORT",
    desc: "Supercharge your career journey with personalized resume building, interview prep, and exclusive partner access.",
    icon: LifeBuoy,
    color: "text-emerald-500",
    glow: "group-hover:shadow-emerald-500/20"
  },
  {
    title: "ALUMNI STATUS",
    desc: "Attain Career Lab Alumni Status and become part of an elite community, enjoying privileged connections and lifetime access.",
    icon: Users,
    color: "text-cyan-500",
    glow: "group-hover:shadow-cyan-500/20"
  }
];

export default function AdvantagesSection() {
  return (
    <section className="relative py-20 md:py-32 bg-[#020617] overflow-hidden">
      
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full" />
        
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:64px_64px]" />
        
        <div className="absolute top-20 left-[10%] w-72 h-72 bg-purple-600/10 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-[10%] w-96 h-96 bg-blue-500/10 blur-[130px] rounded-full animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 mb-6">
            <span className="text-blue-400 text-[10px] font-black uppercase tracking-widest">Why Choose Us</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
            The <span className="text-blue-500 italic">Career Lab Consulting</span> <br className="hidden md:block" /> Advantage
          </h2>
          <div className="h-1.5 w-24 bg-gradient-to-r from-transparent via-blue-600 to-transparent mx-auto mt-6 rounded-full" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          {advantages.map((item, index) => (
            <div 
              key={index} 
              className={`group relative p-8 md:p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/5 hover:border-white/10 transition-all duration-500 flex flex-col items-center text-center lg:items-start lg:text-left backdrop-blur-sm shadow-2xl ${item.glow} hover:shadow-2xl`}
            >
              <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className={`relative mb-8 p-5 rounded-2xl bg-white/[0.05] border border-white/10 w-fit group-hover:scale-110 group-hover:bg-white/[0.08] transition-all duration-500`}>
                <item.icon className={`w-8 h-8 md:w-10 md:h-10 ${item.color} filter drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]`} />
              </div>

              <h3 className="relative text-lg md:text-xl font-bold text-white mb-4 leading-tight group-hover:text-blue-400 transition-colors">
                {item.title}
              </h3>
              
              <p className="relative text-slate-400 text-sm md:text-base leading-relaxed font-medium">
                {item.desc}
              </p>

              <div className="absolute top-6 right-8 opacity-0 group-hover:opacity-20 transition-opacity">
                 <div className="w-12 h-px bg-white" />
                 <div className="w-px h-12 bg-white absolute right-0 top-0" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
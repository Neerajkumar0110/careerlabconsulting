'use client';

import Link from 'next/link';
import React from 'react';
import { 
  CheckCircle2, 
  Star, 
  Users2, 
  ArrowUpRight, 
  Briefcase, 
  Globe2, 
  Lightbulb, 
  Trophy 
} from 'lucide-react';

const pillars = [
  {
    category: "Center of Technology and AI",
    title: "Shape the Technological Landscape",
    desc: "Embark on a journey into the future at Career Lab Consulting. We nurture minds with cutting-edge professional training in Data Science, AI, and Cybersecurity.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800",
    stats: [
      { label: "Students", value: "15000k+", icon: CheckCircle2 },
      { label: "Trainers", value: "1.5k+", icon: Star },
      { label: "Partners", value: "350+", icon: Users2 },
    ],
    accent: "from-blue-600 to-cyan-500"
  },
  {
    category: "Learning Management System",
    title: "Strategic Education Hub",
    desc: "We don't just cultivate leaders; we tailor expertise to meet the demands of a dynamic business landscape with real-world insights and adaptive learning modules.",
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&q=80&w=800",
    stats: [
      { label: "Users", value: "50k+", icon: CheckCircle2 },
      { label: "Courses", value: "120+", icon: Star },
      { label: "Uptime", value: "99.9%", icon: Users2 },
    ],
    accent: "from-purple-600 to-blue-500"
  },
  {
    category: "Corporate Excellence",
    title: "Leadership & Strategy",
    desc: "Empowering organizations through high-impact corporate training. We bridge the gap between potential and performance for Fortune 500 companies.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800",
    stats: [
      { label: "Companies", value: "200+", icon: Briefcase },
      { label: "Executives", value: "5k+", icon: Users2 },
      { label: "Growth", value: "10X", icon: Trophy },
    ],
    accent: "from-emerald-600 to-teal-500"
  },
  {
    category: "Innovation Hub",
    title: "Research & Development",
    desc: "A dedicated space for experimenting with emerging technologies. From Blockchain to Quantum Computing, we stay ahead of the curve.",
    image: "https://media.istockphoto.com/id/2148178472/photo/hispanic-programmers-collaborating-on-software-development-in-a-modern-office-setting.webp?a=1&b=1&s=612x612&w=0&k=20&c=cOn7tCfq87FzKSSp1Vn2j0b0c8Puw0eKD-GY6JKexJU=",
    stats: [
      { label: "Projects", value: "85+", icon: Lightbulb },
      { label: "Patents", value: "12", icon: CheckCircle2 },
      { label: "Experts", value: "45+", icon: Star },
    ],
    accent: "from-amber-600 to-orange-500"
  },
  {
    category: "Talent Acquisition",
    title: "Career Placement Services",
    desc: "Connecting top-tier talent with industry giants. Our recruitment drives ensure that our graduates land their dream roles instantly.",
    image: "https://media.istockphoto.com/id/2197955227/photo/humans-are-using-laptops-and-computers-to-interact-with-ai-helping-them-create-code-train-ai.webp?a=1&b=1&s=612x612&w=0&k=20&c=p8GsIZS4sS58ubkyslWk6ChVyDe5S4HDwxxznIsm-v4=",
    stats: [
      { label: "Placed", value: "12k+", icon: Briefcase },
      { label: "Avg Hike", value: "60%", icon: ArrowUpRight },
      { label: "Clients", value: "400+", icon: Users2 },
    ],
    accent: "from-pink-600 to-rose-500"
  },
  {
    category: "Global Certification",
    title: "International Partnerships",
    desc: "Validating skills on a global scale. Our certifications are recognized across borders, opening doors to international career opportunities.",
    image: "https://plus.unsplash.com/premium_photo-1664474503673-5febe9ca12b9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8SW50ZXJuYXRpb25hbCUyMFBhcnRuZXJzaGlwc3xlbnwwfHwwfHx8MA%3D%3D",
    stats: [
      { label: "Countries", value: "27+", icon: Globe2 },
      { label: "Alumni", value: "100k", icon: Users2 },
      { label: "Badges", value: "50+", icon: Star },
    ],
    accent: "from-indigo-600 to-violet-500"
  }
];

export default function PillarsSection() {
  return (
    <section className="py-16 md:py-32 bg-[#020617] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-6 relative z-10">
        
        <div className="text-center mb-16 md:mb-32">
          <span className="text-blue-500 font-bold tracking-[0.2em] md:tracking-[0.3em] uppercase text-[9px] md:text-[10px] block mb-3 animate-fade-in">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tighter leading-tight">
            Our Six Pillars of <br className="block md:hidden" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-emerald-400 italic"> Excellence</span>
          </h2>
        </div>

        <div className="space-y-24 md:space-y-40">
          {pillars.map((pillar, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col ${idx % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-10 md:gap-16 lg:gap-24`}
            >
              
              <div className="w-full lg:w-1/2 group relative">
                <div className={`absolute -inset-2 md:-inset-4 bg-gradient-to-tr ${pillar.accent} opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-700`} />
                
                <div className="relative rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl aspect-[16/10] md:aspect-[4/3] transform transition-transform duration-700 hover:scale-[1.02]">
                  <img 
                    src={pillar.image} 
                    alt={pillar.category} 
                    className="w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-1000 ease-out" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8">
                    <div className="px-3 py-1 md:px-5 md:py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-[10px] md:text-xs font-bold uppercase tracking-widest shadow-lg">
                      {pillar.category}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-1/2 space-y-6 md:space-y-8 text-center lg:text-left">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-4xl font-black text-white leading-tight tracking-tight uppercase">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-sm md:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-medium">
                    {pillar.desc}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 md:gap-6 pt-2 border-t border-white/5 mt-6">
                  {pillar.stats.map((stat, sIdx) => (
                    <div key={sIdx} className="pt-4 space-y-1 md:space-y-2 flex flex-col items-center group/stat">
                      <div className="flex items-center gap-1.5 md:gap-2 text-white">
                        <stat.icon className={`w-4 h-4 md:w-5 md:h-5 text-transparent bg-clip-text bg-gradient-to-r ${pillar.accent}`} />
                        <span className="text-lg md:text-2xl font-black">{stat.value}</span>
                      </div>
                      <p className="text-[9px] md:text-[10px] text-center text-slate-500 font-bold uppercase tracking-widest leading-none group-hover/stat:text-slate-300 transition-colors">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link href="/contact" className="w-full md:w-auto">
                    <button className={`group w-full md:w-auto flex items-center justify-center gap-3 px-8 py-4 rounded-xl md:rounded-2xl bg-gradient-to-r ${pillar.accent} text-white font-black text-[10px] md:text-xs uppercase tracking-widest hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-blue-900/20`}>
                      Know More <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

     <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[10%] -left-[10%] w-[40%] h-[20%] bg-blue-600/10 blur-[120px] rounded-full" />
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[20%] bg-purple-600/10 blur-[120px] rounded-full" />
          <div className="absolute bottom-[10%] left-[20%] w-[40%] h-[20%] bg-emerald-600/10 blur-[120px] rounded-full" />
      </div>
    </section>
  );
}
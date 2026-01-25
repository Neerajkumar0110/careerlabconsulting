'use client';

import React from 'react';
import { 
  Bot, Users, GraduationCap, LineChart, Cpu, Globe, ArrowRight, Sparkles
} from 'lucide-react';

const services = [
  { 
    id: "01",
    name: "AI CRM", 
    desc: "Close deals 3x faster with Voice Verser & Real-Quality Avatars.", 
    stat: "45% Boost in Sales",
    icon: <Bot className="w-6 h-6" />, 
    color: "from-blue-500 to-cyan-400",
    bg: "bg-blue-500/10",
  },
  { 
    id: "02",
    name: "AI HRMS", 
    desc: "Cut hiring costs by 60%. Autonomous Payroll & Onboarding.", 
    stat: "Zero Manual Entry",
    icon: <Users className="w-6 h-6" />, 
    color: "from-purple-500 to-pink-500",
    bg: "bg-purple-500/10",
  },
  { 
    id: "03",
    name: "AI LMS", 
    desc: "Train teams with 24/7 AI Tutors & detailed 360° analytics.", 
    stat: "90% Completion Rate",
    icon: <GraduationCap className="w-6 h-6" />, 
    color: "from-emerald-500 to-teal-400",
    bg: "bg-emerald-500/10",
  },
  { 
    id: "04",
    name: "AI ERP", 
    desc: "Maximum ROI with AI-driven Finance & Admin Autonomy.", 
    stat: "100% Tax Accuracy",
    icon: <LineChart className="w-6 h-6" />, 
    color: "from-orange-500 to-yellow-500",
    bg: "bg-orange-500/10",
  },
  { 
    id: "05",
    name: "Freelancer Hub", 
    desc: "Scale your dev team instantly with AI-managed project hubs.", 
    stat: "2x Faster Delivery",
    icon: <Cpu className="w-6 h-6" />, 
    color: "from-cyan-500 to-blue-400",
    bg: "bg-cyan-500/10",
  },
  { 
    id: "06",
    name: "Job Portal", 
    desc: "Find global top 1% talent using AI-matching algorithms.", 
    stat: "Global Reach",
    icon: <Globe className="w-6 h-6" />, 
    color: "from-indigo-500 to-purple-400",
    bg: "bg-indigo-500/10",
  }
];

export default function ProductMatrix() {
  return (
    <section className="relative py-20 px-4 sm:px-6 bg-[#030712] overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,#1e293b_0%,transparent_70%)] opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-6">
            <Sparkles size={14} />
            <span>ENTERPRISE GRADE AI SOLUTIONS</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Scale Smarter, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Not Harder</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Replace high overhead costs with autonomous neural modules designed to maximize your profit margins.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, idx) => (
            <div 
              key={idx} 
              className="group relative block p-[1px] rounded-[2.5rem] bg-gradient-to-b from-white/10 to-transparent hover:from-blue-500/50 transition-all duration-500 cursor-pointer"
            >
              <div className="relative h-full bg-[#0b0f1a] rounded-[2.5rem] p-8 overflow-hidden">
                <div className="flex justify-between items-center mb-8">
                  <div className={`p-3 rounded-2xl ${service.bg} text-white`}>
                    {service.icon}
                  </div>
                  <span className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-blue-600/20 text-blue-400 border border-blue-500/30 uppercase tracking-widest shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                    {service.stat}
                  </span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {service.name}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8">
                  {service.desc}
                </p>

                <div className="flex items-center gap-2 text-white font-semibold text-sm group-hover:gap-4 transition-all">
                  <span>Explore Module</span>
                  <ArrowRight size={18} className="text-blue-500" />
                </div>

                <div className={`absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`} />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-3xl bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 border border-white/5 text-center">
          <h4 className="text-white text-xl font-bold mb-2">Ready to automate your entire workflow?</h4>
          <p className="text-slate-400 mb-6 text-sm">Join 200+ companies scaling with our neural ecosystem.</p>
          <button className="bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105 active:scale-95">
            Get Started Free
          </button>
        </div>
      </div>
    </section>
  );
}
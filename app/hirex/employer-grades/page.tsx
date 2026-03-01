// app/hirex/employer-grades/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  Trophy, Star, Target, ShieldCheck, 
  Settings2, Activity, Zap, BarChart3, 
  Building2, ArrowRight, CheckCircle2,
  Link, Code2, BrainCircuit,
  MapPin, Phone, Mail 
} from 'lucide-react';

const INDUSTRY_TIERS = [
  {
    grade: "S-Tier",
    title: "Elite Engineering",
    description: "Built for FAANG-level systems, HFT (High-Frequency Trading), and core AI research.",
    color: "text-yellow-400",
    bgGlow: "bg-yellow-500/10",
    borderGlow: "border-yellow-500/30",
    shadowGlow: "shadow-[0_0_30px_rgba(250,204,21,0.15)]",
    metrics: { logic: "95+", systemDesign: "90+", execution: "Fast" },
    icon: Trophy
  },
  {
    grade: "A-Tier",
    title: "Scale-Up & Unicorn",
    description: "Ideal for Series B+ startups and enterprise platforms handling high traffic.",
    color: "text-purple-400",
    bgGlow: "bg-purple-500/10",
    borderGlow: "border-purple-500/30",
    shadowGlow: "shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    metrics: { logic: "85+", systemDesign: "80+", execution: "Optimal" },
    icon: Star
  },
  {
    grade: "B-Tier",
    title: "Enterprise Core",
    description: "Standard robust engineering for B2B SaaS, internal tooling, and legacy modernization.",
    color: "text-blue-400",
    bgGlow: "bg-blue-500/10",
    borderGlow: "border-blue-500/30",
    shadowGlow: "shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    metrics: { logic: "75+", systemDesign: "70+", execution: "Standard" },
    icon: Target
  }
];

const TOP_EMPLOYERS = [
  { name: "FinTech Global", grade: "S-Tier", logo: "FG", stack: "Node.js, Rust, AWS" },
  { name: "HealthAI Systems", grade: "A-Tier", logo: "HA", stack: "Python, Next.js, GCP" },
  { name: "Nexus Commerce", grade: "A-Tier", logo: "NC", stack: "React, Laravel, TiDB" },
  { name: "CloudWorks Inc", grade: "B-Tier", logo: "CW", stack: "Vue.js, PHP, Azure" },
];

export default function EmployerGradesPage() {
  const [techScore, setTechScore] = useState(85);
  const [logicScore, setLogicScore] = useState(80);
  const [designScore, setDesignScore] = useState(75);

  const calculateGrade = () => {
    const avg = (techScore + logicScore + designScore) / 3;
    if (avg >= 92) return { grade: "S-Tier", color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500" };
    if (avg >= 82) return { grade: "A-Tier", color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500" };
    if (avg >= 70) return { grade: "B-Tier", color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500" };
    return { grade: "C-Tier", color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500" };
  };

  const currentGrade = calculateGrade();

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 text-white bg-[#020617]">
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-6">
              <BarChart3 className="w-4 h-4" /> Hiring Benchmarks
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg mb-6">
              Standardize Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">Employer Grade</span>
            </h1>
            <p className="text-sm md:text-sl text-slate-400 leading-relaxed">
              Define the exact technical parameters your engineering team requires. Apply these benchmark grades to your candidate pipeline and let our autonomous AI filter out anyone who doesn't meet the standard.
            </p>
          </div>

          {/* Preset Tiers Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {INDUSTRY_TIERS.map((tier, idx) => (
              <div 
                key={idx} 
                className={`group relative bg-slate-900/50 backdrop-blur-xl border ${tier.borderGlow} rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 ${tier.shadowGlow} cursor-default`}
              >
                <div className={`w-14 h-14 rounded-2xl ${tier.bgGlow} border ${tier.borderGlow} flex items-center justify-center mb-6`}>
                  <tier.icon className={`w-7 h-7 ${tier.color}`} />
                </div>
                
                <h3 className={`text-2xl font-black ${tier.color} mb-2`}>{tier.grade}</h3>
                <h4 className="text-lg font-bold text-white mb-3">{tier.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed mb-6 h-16">
                  {tier.description}
                </p>

                <div className="space-y-3 pt-6 border-t border-white/10">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Logical Reasoning</span>
                    <span className="text-white font-bold">{tier.metrics.logic}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">System Design</span>
                    <span className="text-white font-bold">{tier.metrics.systemDesign}</span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-slate-500 font-medium">Execution Speed</span>
                    <span className="text-white font-bold">{tier.metrics.execution}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Benchmark Builder */}
          <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl mb-24 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              
              {/* Sliders Area */}
              <div className="space-y-10">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">Build Your Custom Grade</h2>
                  <p className="text-slate-400 text-sm">Adjust the sliders to set the minimum cutoff scores for your upcoming AI-Autonomous interviews.</p>
                </div>

                {/* Slider 1 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-wide flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-blue-400" /> Core Tech Proficiency
                    </label>
                    <span className="text-2xl font-black text-blue-400">{techScore}%</span>
                  </div>
                  <input 
                    type="range" min="50" max="100" value={techScore} 
                    onChange={(e) => setTechScore(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-wide flex items-center gap-2">
                      <BrainCircuit className="w-4 h-4 text-purple-400" /> Logic & Algorithms
                    </label>
                    <span className="text-2xl font-black text-purple-400">{logicScore}%</span>
                  </div>
                  <input 
                    type="range" min="50" max="100" value={logicScore} 
                    onChange={(e) => setLogicScore(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                  />
                </div>

                {/* Slider 3 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-sm font-bold text-slate-300 uppercase tracking-wide flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-emerald-400" /> System Design & Arch
                    </label>
                    <span className="text-2xl font-black text-emerald-400">{designScore}%</span>
                  </div>
                  <input 
                    type="range" min="50" max="100" value={designScore} 
                    onChange={(e) => setDesignScore(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

              {/* Dynamic Output Result Area */}
              <div className="bg-[#0b0f1f] border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-inner min-h-[400px]">
                <div className="text-slate-500 font-mono text-sm uppercase tracking-widest mb-6">Calculated Platform Grade</div>
                
                <div className={`w-32 h-32 rounded-full flex items-center justify-center ${currentGrade.bg} border-2 ${currentGrade.border} mb-6 shadow-[0_0_50px_rgba(currentColor,0.2)] transition-colors duration-500`}>
                  <span className={`text-5xl font-black ${currentGrade.color} transition-colors duration-500`}>
                    {currentGrade.grade.split('-')[0]}
                  </span>
                </div>
                
                <h3 className={`text-2xl font-bold ${currentGrade.color} mb-2 transition-colors duration-500`}>{currentGrade.grade} Rating</h3>
                <p className="text-slate-400 text-sm mb-8 px-4">
                  Candidates applying to your jobs will undergo AI evaluations calibrated to this strict benchmark.
                </p>

                <button className={`w-full max-w-[250px] inline-flex justify-center items-center gap-2 ${currentGrade.bg} ${currentGrade.color} border ${currentGrade.border} hover:bg-white/10 font-bold py-3.5 rounded-xl transition-all duration-300`}>
                  <ShieldCheck className="w-5 h-5" /> Apply Grade Globally
                </button>
              </div>

            </div>
          </div>

          {/* Industry Directory */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
              <Building2 className="text-blue-400" /> Leading Employers on HireX
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {TOP_EMPLOYERS.map((company, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 hover:bg-white/5 transition-colors flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center font-black text-white shadow-lg border border-white/10">
                    {company.logo}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{company.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300">
                        {company.grade}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NEW REDESIGNED: Call to Action & Contact Hub */}
          <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              
              {/* Left Side: CTA Info */}
              <div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Stop Reading Resumes. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Start Graded Hiring.</span>
                </h2>
                <p className="text-slate-400 text-lg mb-8 max-w-md leading-relaxed">
                  Deploy an autonomous AI agent that interviews, grades, and ranks candidates precisely according to your custom benchmarks.
                </p>
                <a 
                  href="/hirex/contact" 
                  className="inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
                >
                  Talk to Solutions Architect <ArrowRight className="w-5 h-5" />
                </a>
              </div>

              {/* Right Side: Contact Hub */}
              <div className="bg-[#020617]/50 border border-white/10 rounded-3xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-8">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                  <h3 className="text-xl font-bold text-white">Contact Hub</h3>
                </div>

                <div className="space-y-6">
                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 shrink-0">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Headquarters</p>
                      <p className="text-sm text-slate-400 leading-relaxed">
                        DLF Cyber City, 5th Floor, Cyber Green-2, Sec-25, Gurugram, India
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 shrink-0">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Direct Line</p>
                      <a href="tel:+918700236923" className="text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                        +91 870023 6923
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20 shrink-0">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-1">Global Inbox</p>
                      <a href="mailto:info@careerlabconsulting.com" className="text-sm text-slate-400 hover:text-purple-400 transition-colors">
                        info@careerlabconsulting.com
                      </a>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
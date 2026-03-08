// app/hirex/employer-grades/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  Trophy, Star, Target, ShieldCheck, 
  Settings2, Activity, Zap, BarChart3, 
  Building2, ArrowRight, CheckCircle2,
  Code2, BrainCircuit, MapPin, Phone, Mail, 
  Play, LineChart, Award, X, Send
} from 'lucide-react';

const ADMIN_WHATSAPP = "918700236923"; // Number without '+' for wa.me link

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

  // Form State
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formContext, setFormContext] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: ""
  });

  const calculateGrade = () => {
    const avg = (techScore + logicScore + designScore) / 3;
    if (avg >= 92) return { grade: "S-Tier", color: "text-yellow-400", bg: "bg-yellow-500/20", border: "border-yellow-500" };
    if (avg >= 82) return { grade: "A-Tier", color: "text-purple-400", bg: "bg-purple-500/20", border: "border-purple-500" };
    if (avg >= 70) return { grade: "B-Tier", color: "text-blue-400", bg: "bg-blue-500/20", border: "border-blue-500" };
    return { grade: "C-Tier", color: "text-emerald-400", bg: "bg-emerald-500/20", border: "border-emerald-500" };
  };

  const currentGrade = calculateGrade();

  // Handle Direct WhatsApp Redirect (No Form)
  const handleDirectWhatsApp = (message: string) => {
    const text = encodeURIComponent(message);
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${text}`, '_blank');
  };

  // Open Form with specific Context
  const openForm = (context: string) => {
    setFormContext(context);
    setIsFormOpen(true);
  };

  // Handle Form Submission -> Redirect to WhatsApp with Data
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*New Lead from HireX Employer Grades Page*\n\n*Name:* ${formData.name}\n*Company:* ${formData.company}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n\n*Interest/Action:* ${formContext}`;
    const text = encodeURIComponent(message);
    window.open(`https://wa.me/${ADMIN_WHATSAPP}?text=${text}`, '_blank');
    setIsFormOpen(false); // Close form after submission
    setFormData({ name: "", company: "", email: "", phone: "" }); // Reset form
  };

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 text-white bg-[#020617]">
      
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/5 relative overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
              
              {/* Hero Content (Left) */}
              <div className="max-w-2xl relative z-10 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-6">
                  <BarChart3 className="w-4 h-4" /> Hiring Benchmarks
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg mb-6 leading-tight">
                  Standardize Your <br className="hidden lg:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-400">Employer Grade</span>
                </h1>
                <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">
                  Define the exact technical parameters your engineering team requires. Apply custom benchmark grades to your pipeline and let our autonomous AI filter candidates with surgical precision.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button 
                    onClick={() => openForm("Configure Benchmarks")}
                    className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-2"
                  >
                    Configure Benchmarks <ArrowRight className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => handleDirectWhatsApp("Hi, I'd like to view a demo of the HireX Autonomous Grading Platform.")}
                    className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
                  >
                    <Play className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" /> View Demo
                  </button>
                </div>
              </div>

              {/* Hero Visual (Right) - Floating Glass Cards */}
              <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-[100px]"></div>
                
                {/* Main Card */}
                <div className="relative z-20 bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl w-full max-w-sm lg:max-w-md transform lg:translate-x-0 -translate-y-4 animate-[float_6s_ease-in-out_infinite]">
                  <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-500/20 rounded-xl border border-blue-500/30 flex items-center justify-center">
                        <Award className="w-6 h-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-white font-bold">Candidate AI Score</h3>
                        <p className="text-xs text-slate-400">Analyzed by HireX Engine</p>
                      </div>
                    </div>
                    <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2 py-1 rounded border border-emerald-500/20">Passed</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300">Logic Core</span>
                        <span className="text-white font-mono font-bold">96%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-purple-400 h-2 rounded-full w-[96%] shadow-[0_0_10px_rgba(192,132,252,0.5)]"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1.5">
                        <span className="text-slate-300">System Design</span>
                        <span className="text-white font-mono font-bold">91%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div className="bg-cyan-400 h-2 rounded-full w-[91%] shadow-[0_0_10px_rgba(34,211,238,0.5)]"></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 bg-slate-800/50 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                    <span className="text-sm text-slate-400 font-medium">Assigned Grade</span>
                    <span className="flex items-center gap-1 text-yellow-400 font-black text-lg drop-shadow-md">
                      <Trophy className="w-5 h-5" /> S-Tier
                    </span>
                  </div>
                </div>

                {/* Secondary Decorative Card (Background) */}
                <div className="absolute z-10 bg-slate-800/60 backdrop-blur-sm border border-white/5 rounded-3xl p-6 shadow-xl w-full max-w-sm lg:max-w-md transform translate-x-4 lg:-translate-x-12 translate-y-16 opacity-70 hidden sm:block animate-[float_8s_ease-in-out_infinite_reverse]">
                   <div className="flex items-center gap-4 opacity-50">
                     <div className="w-10 h-10 bg-slate-700 rounded-lg"></div>
                     <div className="space-y-2">
                       <div className="h-3 w-32 bg-slate-700 rounded"></div>
                       <div className="h-2 w-24 bg-slate-700 rounded"></div>
                     </div>
                   </div>
                   <div className="mt-6 space-y-3 opacity-50">
                     <div className="h-2 w-full bg-slate-700 rounded"></div>
                     <div className="h-2 w-4/5 bg-slate-700 rounded"></div>
                   </div>
                </div>
              </div>
              
            </div>
          </div>
        </section>

        {/* MAIN CONTENT CONTAINER */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">

          {/* Preset Tiers Section */}
          <div className="mb-20 md:mb-28">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Standard Industry Tiers</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Explore predefined technical profiles used by the world's leading tech companies to auto-filter candidates.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {INDUSTRY_TIERS.map((tier, idx) => (
                <div 
                  key={idx} 
                  className={`group relative bg-slate-900/50 backdrop-blur-xl border ${tier.borderGlow} rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 ${tier.shadowGlow} cursor-default flex flex-col h-full`}
                >
                  <div className={`w-14 h-14 rounded-2xl ${tier.bgGlow} border ${tier.borderGlow} flex items-center justify-center mb-6`}>
                    <tier.icon className={`w-7 h-7 ${tier.color}`} />
                  </div>
                  
                  <h3 className={`text-2xl font-black ${tier.color} mb-2`}>{tier.grade}</h3>
                  <h4 className="text-lg font-bold text-white mb-3">{tier.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">
                    {tier.description}
                  </p>

                  <div className="space-y-3 pt-6 border-t border-white/10 mt-auto">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium flex items-center gap-1.5"><BrainCircuit className="w-3.5 h-3.5"/> Logic</span>
                      <span className="text-white font-bold">{tier.metrics.logic}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium flex items-center gap-1.5"><Settings2 className="w-3.5 h-3.5"/> System Design</span>
                      <span className="text-white font-bold">{tier.metrics.systemDesign}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 font-medium flex items-center gap-1.5"><Zap className="w-3.5 h-3.5"/> Execution</span>
                      <span className="text-white font-bold">{tier.metrics.execution}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Benchmark Builder */}
          <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl mb-20 md:mb-28 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
              
              {/* Sliders Area */}
              <div className="space-y-8 sm:space-y-10">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">Build Custom Benchmark</h2>
                  <p className="text-slate-400 text-sm leading-relaxed">Fine-tune the sliders below to generate the exact technical baseline your specific roles demand.</p>
                </div>

                {/* Slider 1 */}
                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wide flex items-center gap-2">
                      <Code2 className="w-4 h-4 text-blue-400" /> Core Tech Proficiency
                    </label>
                    <span className="text-xl sm:text-2xl font-black text-blue-400">{techScore}%</span>
                  </div>
                  <input 
                    type="range" min="50" max="100" value={techScore} 
                    onChange={(e) => setTechScore(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wide flex items-center gap-2">
                      <BrainCircuit className="w-4 h-4 text-purple-400" /> Logic & Algorithms
                    </label>
                    <span className="text-xl sm:text-2xl font-black text-purple-400">{logicScore}%</span>
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
                    <label className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wide flex items-center gap-2">
                      <Settings2 className="w-4 h-4 text-emerald-400" /> System Design & Arch
                    </label>
                    <span className="text-xl sm:text-2xl font-black text-emerald-400">{designScore}%</span>
                  </div>
                  <input 
                    type="range" min="50" max="100" value={designScore} 
                    onChange={(e) => setDesignScore(Number(e.target.value))}
                    className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                  />
                </div>
              </div>

              {/* Dynamic Output Result Area */}
              <div className="bg-[#0b0f1f] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-inner min-h-[350px] sm:min-h-[400px]">
                <div className="text-slate-500 font-mono text-xs sm:text-sm uppercase tracking-widest mb-6">Generated Global Grade</div>
                
                <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center ${currentGrade.bg} border-2 ${currentGrade.border} mb-6 shadow-[0_0_40px_rgba(currentColor,0.2)] transition-colors duration-500`}>
                  <span className={`text-4xl sm:text-5xl font-black ${currentGrade.color} transition-colors duration-500`}>
                    {currentGrade.grade.split('-')[0]}
                  </span>
                </div>
                
                <h3 className={`text-xl sm:text-2xl font-bold ${currentGrade.color} mb-2 transition-colors duration-500`}>{currentGrade.grade} Requirement</h3>
                <p className="text-slate-400 text-xs sm:text-sm mb-8 px-2 sm:px-4 leading-relaxed">
                  Only candidates hitting this specific threshold will be recommended for the final technical interview.
                </p>

                <button 
                  onClick={() => openForm(`Apply Grade Globally (${currentGrade.grade} | Tech: ${techScore}%, Logic: ${logicScore}%, Design: ${designScore}%)`)}
                  className={`w-full max-w-[250px] inline-flex justify-center items-center gap-2 ${currentGrade.bg} ${currentGrade.color} border ${currentGrade.border} hover:bg-white/10 font-bold py-3 sm:py-3.5 rounded-xl transition-all duration-300 text-sm sm:text-base`}
                >
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" /> Apply Grade Rule
                </button>
              </div>

            </div>
          </div>

          {/* Industry Directory */}
          <div className="mb-20 md:mb-24">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 flex items-center gap-3">
              <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" /> Leading Employers on HireX
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {TOP_EMPLOYERS.map((company, idx) => (
                <div key={idx} className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 hover:bg-white/5 transition-colors flex items-center gap-4 shadow-lg hover:-translate-y-1 duration-300">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center font-black text-white shadow-inner border border-white/10 shrink-0">
                    {company.logo}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-white font-bold text-sm truncate">{company.name}</h4>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[9px] sm:text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300">
                        {company.grade}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action & Contact Hub */}
          <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
              
              {/* Left Side: CTA Info */}
              <div className="text-center lg:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight">
                  Stop Reading Resumes. <br className="hidden sm:block"/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Start Graded Hiring.</span>
                </h2>
                <p className="text-slate-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">
                  Deploy an autonomous AI agent that interviews, grades, and ranks candidates precisely according to your custom benchmarks.
                </p>
                <button 
                  onClick={() => openForm("Talk to Solutions Architect")}
                  className="inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] text-sm sm:text-base"
                >
                  Talk to Solutions Architect <ArrowRight className="w-4 h-4 sm:w-5 h-5" />
                </button>
              </div>

              {/* Right Side: Contact Hub */}
              <div className="bg-[#020617]/50 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-inner">
                <div className="flex items-center justify-center sm:justify-start gap-3 mb-6 sm:mb-8 pb-4 sm:pb-0 border-b border-white/5 sm:border-0">
                  <div className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Contact Hub</h3>
                </div>

                <div className="space-y-5 sm:space-y-6">
                  {/* Location */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
                    <div className="bg-blue-500/10 p-3 rounded-xl border border-blue-500/20 shrink-0">
                      <MapPin className="w-5 h-5 text-blue-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base">Headquarters</p>
                      <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                        DLF Cyber City, 5th Floor, Cyber Green-2, Sec-25, Gurugram, India
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
                    <div className="bg-emerald-500/10 p-3 rounded-xl border border-emerald-500/20 shrink-0">
                      <Phone className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base">Direct Line</p>
                      <a href="tel:+918700236923" className="text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-colors">
                        +91 870023 6923
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
                    <div className="bg-purple-500/10 p-3 rounded-xl border border-purple-500/20 shrink-0">
                      <Mail className="w-5 h-5 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-white font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base">Global Inbox</p>
                      <a href="mailto:info@careerlabconsulting.com" className="text-xs sm:text-sm text-slate-400 hover:text-purple-400 transition-colors break-all">
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

      {/* POPUP FORM MODAL (Z-Index 100 to stay above Navbar) */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Blur Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setIsFormOpen(false)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-300">
            {/* Top Color Accent */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
            
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">Connect with us</h3>
                  <p className="text-slate-400 text-sm">Please provide your details below. We'll redirect you to WhatsApp immediately.</p>
                </div>
                <button 
                  onClick={() => setIsFormOpen(false)}
                  className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Full Name *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. John Doe"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Company Name *</label>
                  <input 
                    required
                    type="text" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                    placeholder="e.g. TechFlow Solutions"
                    className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Email Address *</label>
                    <input 
                      required
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="john@company.com"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Phone Number *</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="+91 98765 43210"
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-white/10">
                  <button 
                    type="submit"
                    className="w-full bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] flex items-center justify-center gap-2"
                  >
                    <Send className="w-5 h-5" /> Submit & Continue to WhatsApp
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4">
                    By submitting, your details will be sent securely via WhatsApp.
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </main>
  );
}
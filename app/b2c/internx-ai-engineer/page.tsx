'use client';

import React, { useState } from 'react';
import B2CHeader from '@/components/b2c/B2CHeader';
import Footer from '@/components/b2c/Footer';
import PricingSection from '@/components/b2c/PricingSection';
import { 
  Bot, Cpu, Zap, Shield, Rocket, Terminal, ChevronDown, 
  Activity, Globe, Code, Layers, BarChart3, 
  CheckCircle2, ArrowRight, Star, GraduationCap, 
  Network, Briefcase, FileCheck, Coins, Database, Search,
  Users, Workflow, Lock, ExternalLink, Linkedin, XCircle
} from 'lucide-react';

export default function InternXAI() {
  const [activeMonth, setActiveMonth] = useState(0);

  // DATA SOURCED FROM PDF: "InternX-AI Developer - Foundation Syllabus"
  const curriculum = [
    {
      month: "Month 1: Programming & AI Foundations",
      icon: <Terminal className="w-6 h-6 text-blue-400" />,
      topics: ["Python Fundamentals & Modular Coding", "Data Structures (Lists, Dicts, Tuples)", "Debugging & Clean Coding Standards", "Git & GitHub Basics"],
      project: "Build a Python Utility & Data Automation Tool",
      outcome: "Mastering the logic before the magic."
    },
    {
      month: "Month 2: Data Handling & SQL",
      icon: <Database className="w-6 h-6 text-purple-400" />,
      topics: ["Data Lifecycle in AI Projects", "SQL (Joins, Subqueries, CRUD)", "Python + SQL Integration", "Data Cleaning Pipelines"],
      project: "Analytics-Ready Dataset Pipeline",
      outcome: "Transforming raw chaos into structured fuel for AI."
    },
    {
      month: "Month 3: Applied Math & Statistics",
      icon: <Activity className="w-6 h-6 text-emerald-400" />,
      topics: ["Mean, Median, Variance, Distributions", "Feature Scaling & Normalization", "Bias-Variance Intuition", "Data Leakage Prevention"],
      project: "Insight Generation & Analysis Tool",
      outcome: "Understanding the 'Why' behind the model predictions."
    },
    {
      month: "Month 4: Machine Learning Foundations",
      icon: <Cpu className="w-6 h-6 text-orange-400" />,
      topics: ["Supervised Learning (Regression/Classification)", "Unsupervised Learning Basics", "Model Evaluation Metrics", "Overfitting & Validation Logic"],
      project: "Predictive ML System (Lead Scoring/Demand Prediction)",
      outcome: "Building models that actually predict the future."
    },
    {
      month: "Month 5: NLP & LLMs (GenAI)",
      icon: <Bot className="w-6 h-6 text-pink-400" />,
      topics: ["Tokenization & Vector Basics", "Prompt Engineering (Practical)", "GPT APIs & LLM Workflows", "Intro to RAG (Retrieval Augmented Generation)"],
      project: "Chatbot & Content Automation Tool",
      outcome: "Harnessing the power of Generative AI for business."
    },
    {
      month: "Month 6: AI Deployment & Architecture",
      icon: <Rocket className="w-6 h-6 text-cyan-400" />,
      topics: ["High-Level AI System Architecture", "APIs using Flask/FastAPI", "Connecting ML/LLMs to Apps", "GitHub Documentation & READMEs"],
      project: "End-to-End Deployed AI Micro-service",
      outcome: "Moving from 'it runs on my machine' to 'it runs for the world'."
    }
  ];

  // DATA SOURCED FROM PDF: "Competitor Comparison"
  const comparisonData = [
    { feature: "Real Startup Projects", internx: true, bootcamps: false, courses: false },
    { feature: "ResumeNFT (Blockchain Proof)", internx: true, bootcamps: false, courses: false },
    { feature: "Public GitHub Portfolio", internx: true, bootcamps: "Optional", courses: false },
    { feature: "Live Weekend Delivery", internx: true, bootcamps: true, courses: false },
    { feature: "Elite Career Pathway", internx: true, bootcamps: false, courses: false },
    { feature: "Legal Job Guarantee (Elite)", internx: true, bootcamps: "Conditional", courses: false },
  ];

  // DATA SOURCED FROM PDF: "Industry Project Areas"
  const projectTracks = [
    { title: "FinTech", desc: "Lead scoring, fraud analysis & sales automation.", icon: <Coins /> },
    { title: "EdTech", desc: "AI tutors, content generation & learner support.", icon: <GraduationCap /> },
    { title: "HRTech", desc: "Resume screening & candidate matching systems.", icon: <Users /> },
    { title: "E-Commerce", desc: "Customer support chatbots & flow automation.", icon: <Globe /> },
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 font-sans">
      <B2CHeader />

      {/* --- SECTION 1: HERO & POSITIONING (Using PDF "Hero Section" content) --- */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/20 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 mb-8 animate-in fade-in slide-in-from-bottom-4">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-xs font-bold tracking-widest uppercase text-blue-400">Foundation → Elite Pathway</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-tight">
            Build Real Projects.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Prove Your Worth.
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed mb-10">
            A 6-month, weekend-only AI program to build real industry projects, 
            earn <strong>ResumeNFT™</strong> proof, and become eligible for Elite AI roles. 
            <span className="block mt-2 text-white/80">Recruiters care about what you've built, not just what you've watched.</span>
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center gap-2">
              <Rocket className="w-5 h-5" /> Start Foundation
            </button>
            <button className="px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all flex items-center gap-2">
              <FileCheck className="w-5 h-5" /> Check Elite Eligibility
            </button>
          </div>

          {/* Trust Badges from PDF */}
          <div className="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-60">
             <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">15,000+</span>
                <span className="text-[10px] uppercase tracking-widest">Learners Trained</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">27+</span>
                <span className="text-[10px] uppercase tracking-widest">Countries</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">3,500+</span>
                <span className="text-[10px] uppercase tracking-widest">Projects Shipped</span>
             </div>
             <div className="flex flex-col items-center">
                <span className="text-2xl font-black text-white">88%</span>
                <span className="text-[10px] uppercase tracking-widest">Hiring Conversion</span>
             </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 2: THE ECOSYSTEM (Sourced from PDF Page 3) --- */}
      <section className="py-24 px-6 bg-[#03081a] relative">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                Not Just a Course.<br />
                <span className="text-blue-500">A Complete Ecosystem.</span>
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed">
                InternX-AI operates inside the full <strong>Career Lab Consulting (CLC)</strong> ecosystem. 
                You don't just learn in a silo; you build inside a real tech environment.
              </p>
              
              <ul className="space-y-6">
                {[
                  { title: "EdTech & Learning", desc: "Foundation to Elite structured pathways.", icon: <GraduationCap /> },
                  { title: "SaaS Products", desc: "Build tools for real Sales/Marketing automation platforms.", icon: <Layers /> },
                  { title: "Service & Consulting", desc: "Work on Enterprise GenAI solutions.", icon: <Briefcase /> },
                  { title: "HireX Job Portal", desc: "Direct hiring access for top performers.", icon: <Search /> }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="mt-1 p-2 bg-blue-500/10 rounded-lg text-blue-400 h-fit">{item.icon}</div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-sm text-slate-500">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              {/* IMAGE PLACEHOLDER: Use a 3D isometric illustration of a connected tech ecosystem */}
              <div className="aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-slate-900 to-slate-800 relative group">
                <img 
                   src="https://images.pexels.com/photos/17483874/pexels-photo-17483874/free-photo-of-an-artist-s-illustration-of-artificial-intelligence-ai-this-image-represents-how-machine-learning-is-inspired-by-neuroscience-and-the-human-brain-it-was-created-by-novoto-studio-as.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                   alt="InternX AI Ecosystem" 
                   className="w-full h-full object-cover opacity-50 group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#03081a] via-transparent to-transparent"></div>
                <div className="absolute bottom-8 left-8">
                  <div className="bg-blue-600 text-xs font-bold px-3 py-1 rounded-full w-fit mb-2">CLC ECOSYSTEM</div>
                  <p className="text-white font-bold">Bridging the Skills-to-Hiring Gap</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- SECTION 3: SYLLABUS (Updated with PDF Data) --- */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Foundation Syllabus</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Weekend-Only • 6 Months • Assessed</p>
          </div>

          <div className="space-y-4">
            {curriculum.map((item, i) => (
              <div 
                key={i} 
                className={`group border rounded-3xl transition-all duration-300 overflow-hidden ${activeMonth === i ? 'bg-blue-900/10 border-blue-500/50' : 'bg-white/5 border-white/10 hover:border-white/20'}`}
              >
                <button 
                  onClick={() => setActiveMonth(i)}
                  className="w-full flex items-center justify-between p-6 md:p-8 text-left"
                >
                  <div className="flex items-center gap-6">
                    <div className={`p-3 rounded-xl ${activeMonth === i ? 'bg-blue-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                      {item.icon}
                    </div>
                    <div>
                      <span className={`text-xs font-black uppercase tracking-widest ${activeMonth === i ? 'text-blue-400' : 'text-slate-500'}`}>
                        {item.month.split(":")[0]}
                      </span>
                      <h3 className="text-lg md:text-xl font-bold uppercase tracking-tight text-white mt-1">
                        {item.month.split(":")[1]}
                      </h3>
                    </div>
                  </div>
                  <ChevronDown className={`w-6 h-6 transition-transform duration-300 ${activeMonth === i ? 'rotate-180 text-blue-500' : 'text-slate-600'}`} />
                </button>
                
                {activeMonth === i && (
                  <div className="px-6 md:px-8 pb-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2">
                    <div>
                      <h4 className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-4">Key Topics</h4>
                      <ul className="space-y-3">
                        {item.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-slate-300">
                            <CheckCircle2 className="w-4 h-4 text-blue-500 mt-0.5 shrink-0" /> {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-[#020617] rounded-2xl p-6 border border-white/10 flex flex-col justify-between">
                      <div>
                        <h4 className="text-blue-500 text-[10px] font-black uppercase tracking-widest mb-2">Industry Project</h4>
                        <p className="text-white font-bold mb-1">{item.project}</p>
                        <p className="text-slate-500 text-xs italic">"{item.outcome}"</p>
                      </div>
                      <div className="mt-4 flex items-center gap-2 text-[10px] uppercase font-bold text-slate-600">
                         <span className="w-2 h-2 rounded-full bg-green-500"></span> GitHub Repo Required
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 4: INDUSTRY PROJECTS & TRACKS (From Brochure) --- */}
      <section className="py-24 px-6 bg-blue-950/20 border-y border-white/5">
         <div className="max-w-7xl mx-auto">
            <div className="mb-12">
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4">Real Industry Tracks</h2>
               <p className="text-slate-400 max-w-2xl">
                 You don't get toy assignments. You get matched to a domain track and build projects that solve real problems.
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {projectTracks.map((track, i) => (
                  <div key={i} className="p-6 bg-[#03081a] border border-white/10 rounded-2xl hover:border-blue-500/50 transition-colors group">
                     <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                        {track.icon}
                     </div>
                     <h3 className="text-xl font-bold uppercase mb-2">{track.title}</h3>
                     <p className="text-sm text-slate-500">{track.desc}</p>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- SECTION 5: THE UNIFIED TEST (Strategic Value from PDF) --- */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
           <div className="order-2 lg:order-1">
              {/* IMAGE PLACEHOLDER: Conceptual image of a secure gateway or code test */}
              <div className="rounded-3xl overflow-hidden border border-white/10 relative">
                 <img 
                    src="https://images.pexels.com/photos/5475763/pexels-photo-5475763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
                    alt="Coding Test" 
                    className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all"
                 />
                 <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10">
                    <div className="text-xs font-bold text-red-400 flex items-center gap-2">
                       <Shield className="w-3 h-3" /> Anti-Cheat Enforced
                    </div>
                 </div>
              </div>
           </div>
           
           <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-6">
                 Foundation is the <span className="text-blue-500">Gate</span>.<br/>
                 Elite is the <span className="text-purple-500">Prize</span>.
              </h2>
              <p className="text-slate-400 mb-8">
                 We don't sell Elite directly. You earn it. The <strong>Unified Qualification Test</strong> ensures 
                 only those with real understanding pass.
              </p>
              
              <div className="space-y-4">
                 <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Lock className="w-6 h-6 text-red-400 shrink-0" />
                    <div>
                       <h4 className="font-bold">No Outsourcing / ChatGPT Copy-Paste</h4>
                       <p className="text-xs text-slate-500 mt-1">Live defense viva. If you can't explain your code, you fail.</p>
                    </div>
                 </div>
                 <div className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                    <Code className="w-6 h-6 text-green-400 shrink-0" />
                    <div>
                       <h4 className="font-bold">Build a Real App from Scratch</h4>
                       <p className="text-xs text-slate-500 mt-1">4-6 hour proctored build test. No step-by-step tutorials.</p>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* --- SECTION 6: COMPETITOR COMPARISON (Table from PDF) --- */}
      <section className="py-24 px-6 bg-[#03081a]">
         <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
               <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">Why InternX-AI?</h2>
               <p className="text-slate-400 mt-4">We focus on proof-first careers, not just certificates.</p>
            </div>

            <div className="overflow-x-auto">
               <table className="w-full border-collapse">
                  <thead>
                     <tr className="border-b border-white/10">
                        <th className="p-6 text-left text-slate-500 text-xs font-black uppercase tracking-widest">Feature</th>
                        <th className="p-6 text-center bg-blue-900/10 border-t border-x border-blue-500/30 rounded-t-xl text-blue-400 text-lg font-black uppercase">InternX-AI</th>
                        <th className="p-6 text-center text-slate-500 text-xs font-black uppercase tracking-widest">Typical Bootcamps</th>
                        <th className="p-6 text-center text-slate-500 text-xs font-black uppercase tracking-widest">Video Courses</th>
                     </tr>
                  </thead>
                  <tbody>
                     {comparisonData.map((row, i) => (
                        <tr key={i} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                           <td className="p-6 font-bold text-white">{row.feature}</td>
                           <td className="p-6 text-center bg-blue-900/5 border-x border-blue-500/10">
                              {row.internx === true ? <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto" /> : <span className="text-white font-bold">{row.internx}</span>}
                           </td>
                           <td className="p-6 text-center">
                              {row.bootcamps === true ? <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto" /> : 
                               row.bootcamps === false ? <XCircle className="w-6 h-6 text-red-500 mx-auto opacity-50" /> : 
                               <span className="text-slate-500 text-xs uppercase font-bold">{row.bootcamps}</span>}
                           </td>
                           <td className="p-6 text-center">
                              {row.courses === true ? <CheckCircle2 className="w-6 h-6 text-green-400 mx-auto" /> : 
                               <span className="w-6 h-6 block mx-auto text-red-500 opacity-50"><XCircle className="mx-auto"/></span>}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </section>

      {/* --- SECTION 7: EARNINGS LADDER (Graph Representation) --- */}
      <section className="py-24 px-6">
         <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-12">Earnings Projection</h2>
            
            <div className="relative h-64 md:h-96 flex items-end justify-center gap-2 md:gap-8 max-w-4xl mx-auto">
               {[
                  { year: "Year 0", val: "5-8 LPA", h: "h-16", color: "bg-slate-700" },
                  { year: "Year 1", val: "12-15 LPA", h: "h-32", color: "bg-blue-800" },
                  { year: "Year 2", val: "15-20 LPA", h: "h-48", color: "bg-blue-600" },
                  { year: "Year 3", val: "25-35 LPA", h: "h-64", color: "bg-blue-500" },
                  { year: "Year 5", val: "50+ LPA", h: "h-80", color: "bg-blue-400" },
               ].map((bar, i) => (
                  <div key={i} className="flex flex-col items-center gap-2 w-16 md:w-24 group">
                     <div className="text-xs md:text-sm font-bold text-white opacity-0 group-hover:opacity-100 transition-opacity mb-2">{bar.val}</div>
                     <div className={`w-full rounded-t-lg transition-all duration-1000 ${bar.h} ${bar.color}`}></div>
                     <div className="text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-500 mt-2">{bar.year}</div>
                  </div>
               ))}
            </div>
            <p className="mt-8 text-slate-500 text-sm">
               *Based on industry averages for AI/ML roles. Salaries depend on skills, performance, and market conditions.
            </p>
         </div>
      </section>

      <div id="enroll">
        <PricingSection />
      </div>
      <Footer />
    </main>
  );
}
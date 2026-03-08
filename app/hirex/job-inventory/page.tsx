// app/hirex/job-inventory/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  Search, Filter, MapPin, DollarSign, 
  Activity, Star, Zap, Terminal, Building2, 
  ChevronRight, CheckCircle2, Clock,
  ArrowRight, X, Loader2, BrainCircuit, Code2, 
  Target, Users, ShieldCheck, Mail, Phone,
  Sparkles
} from 'lucide-react';

const CATEGORIES: any[] = [];

const JOB_LISTINGS = [
  {
    id: "REQ-9901",
    title: "Principal Next.js Engineer",
    company: "FinTech Global",
    logo: "FG",
    location: "Remote (India)",
    type: "Full-Time",
    salary: "₹35L - ₹50L",
    category: "Frontend",
    requiredGrade: "S-Tier",
    matchScore: 94,
    isHot: true,
    skills: ["Next.js", "React 19", "System Design", "AWS"],
    postedAt: "2 hours ago",
    theme: { text: "text-blue-400", bg: "bg-blue-500", bgSubtle: "bg-blue-500/10", border: "border-blue-500/20", glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]" }
  },
  {
    id: "REQ-8842",
    title: "TiDB & MySQL Architect",
    company: "Nexus Commerce",
    logo: "NC",
    location: "Gurugram, Hybrid",
    type: "Full-Time",
    salary: "₹40L - ₹60L",
    category: "Database",
    requiredGrade: "A-Tier",
    matchScore: 88,
    isHot: false,
    skills: ["TiDB Cloud", "MySQL", "Distributed SQL", "Kubernetes"],
    postedAt: "5 hours ago",
    theme: { text: "text-cyan-400", bg: "bg-cyan-500", bgSubtle: "bg-cyan-500/10", border: "border-cyan-500/20", glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]" }
  },
  {
    id: "REQ-7723",
    title: "Generative AI Developer",
    company: "HealthAI Systems",
    logo: "HA",
    location: "Bengaluru, On-site",
    type: "Full-Time",
    salary: "₹45L - ₹70L",
    category: "AI & Data",
    requiredGrade: "S-Tier",
    matchScore: 97,
    isHot: true,
    skills: ["Gemini API", "LangChain", "Python", "RAG Pipelines"],
    postedAt: "1 day ago",
    theme: { text: "text-purple-400", bg: "bg-purple-500", bgSubtle: "bg-purple-500/10", border: "border-purple-500/20", glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]" }
  },
  {
    id: "REQ-6614",
    title: "Senior Node.js Backend Lead",
    company: "CloudWorks Inc",
    logo: "CW",
    location: "Pune, Hybrid",
    type: "Contract",
    salary: "$60 - $80 / hr",
    category: "Backend",
    requiredGrade: "B-Tier",
    matchScore: 82,
    isHot: false,
    skills: ["Node.js", "Socket.io", "Redis", "Microservices"],
    postedAt: "2 days ago",
    theme: { text: "text-emerald-400", bg: "bg-emerald-500", bgSubtle: "bg-emerald-500/10", border: "border-emerald-500/20", glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]" }
  }
];

export default function JobInventoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Roles");
  
  // Modal & Form States
  const [selectedJob, setSelectedJob] = useState<typeof JOB_LISTINGS[0] | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', portfolio: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error' | null, msg: string }>({ type: null, msg: '' });

  const filteredJobs = JOB_LISTINGS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All Roles" || job.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleApplyClick = (job: typeof JOB_LISTINGS[0]) => {
    setSelectedJob(job);
    setSubmitStatus({ type: null, msg: '' });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, msg: '' });

    try {
      const response = await fetch('/hirex/api/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, jobId: selectedJob?.id, jobTitle: selectedJob?.title, company: selectedJob?.company }),
      });

      if (response.ok) {
        setSubmitStatus({ type: 'success', msg: 'Application Initialized! Check your email for the AI Test link.' });
        setTimeout(() => setSelectedJob(null), 3000);
      } else {
        setSubmitStatus({ type: 'error', msg: 'Failed to initialize. Please try again.' });
      }
    } catch (error) {
      setSubmitStatus({ type: 'error', msg: 'Network error. Please check your connection.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 text-white bg-[#020617]">
      
      {/* Background Orbs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full -translate-x-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-24 sm:pt-32 pb-24">
        
        {/* SECTION 1: Hero */}
        <section className="px-4 sm:px-6 lg:px-8 mb-20 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-6">
            <Activity className="w-4 h-4" /> Live Talent Pipeline
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-white drop-shadow-lg mb-6 leading-tight">
            Autonomous <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">Job Inventory</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
            Explore highly-vetted enterprise roles. Your AI-verified skills automatically calculate your match score for each position. No resumes needed—just initialize the AI interview and get hired.
          </p>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
              <Building2 className="w-5 h-5 text-blue-400" />
              <div className="text-left">
                <p className="text-xl font-bold text-white leading-none">150+</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Active Roles</p>
              </div>
            </div>
            <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
              <Zap className="w-5 h-5 text-purple-400" />
              <div className="text-left">
                <p className="text-xl font-bold text-white leading-none">24 Hrs</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider mt-1">Avg Hire Time</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: How It Works */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24 max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-emerald-500/20 -translate-y-1/2 z-0"></div>
            
            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] text-center relative z-10 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center border border-blue-500/20 mb-6 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">1. Find Your Match</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Browse top-tier roles matched perfectly to your specific skill set and seniority.</p>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] text-center relative z-10 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center border border-purple-500/20 mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <BrainCircuit className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">2. Take AI Interview</h3>
              <p className="text-sm text-slate-400 leading-relaxed">No recruiter screens. Proceed directly to our autonomous technical evaluation.</p>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 p-8 rounded-[2rem] text-center relative z-10 hover:-translate-y-2 transition-transform duration-300">
              <div className="w-14 h-14 mx-auto bg-emerald-500/10 rounded-2xl flex items-center justify-center border border-emerald-500/20 mb-6 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">3. Direct Offer</h3>
              <p className="text-sm text-slate-400 leading-relaxed">Pass the benchmark grade and get your profile instantly sent to the hiring manager.</p>
            </div>
          </div>
        </section>

        {/* SECTION 3: Search & Filter Hub (Sticky) */}
        <section className="px-4 sm:px-6 lg:px-8 mb-10 max-w-7xl mx-auto sticky top-24 z-40">
          <div className="bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl sm:rounded-[2rem] p-3 sm:p-4 shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-4 items-center">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search roles, companies..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-xl sm:rounded-2xl pl-12 pr-4 py-3 sm:py-3.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div className="hidden md:block w-px h-10 bg-white/10"></div>
            
            <div className="w-full md:w-auto flex-grow flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pb-2 md:pb-0">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 sm:py-3 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    activeCategory === category 
                    ? 'bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]' 
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: Live Job Inventory Grid */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24 max-w-7xl mx-auto">
          {filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-white/5">
              <Terminal className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No roles found</h3>
              <p className="text-slate-400">Try adjusting your search criteria or category filter.</p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveCategory("All Roles");}}
                className="mt-6 text-blue-400 hover:text-blue-300 text-sm font-bold underline underline-offset-4"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {filteredJobs.map((job) => (
                <div 
                  key={job.id} 
                  className={`group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl sm:rounded-[2rem] p-6 sm:p-8 transition-all duration-300 hover:-translate-y-1 ${job.theme.glow} flex flex-col`}
                >
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-950 flex items-center justify-center font-black text-xl text-white shadow-xl border border-white/10 group-hover:scale-105 transition-transform">
                        {job.logo}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-200 transition-colors leading-tight">
                            {job.title}
                          </h3>
                          {job.isHot && <span className="bg-red-500/20 text-red-400 text-[10px] font-bold px-2 py-0.5 rounded border border-red-500/30 flex items-center gap-1 animate-pulse"><Zap className="w-3 h-3"/> HOT</span>}
                        </div>
                        <p className="text-sm text-slate-400 flex items-center gap-1.5"><Building2 className="w-4 h-4"/> {job.company}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end hidden sm:flex">
                      <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${job.theme.bgSubtle} ${job.theme.border} border mb-2`}>
                        <Activity className={`w-3.5 h-3.5 ${job.theme.text}`} />
                        <span className={`text-xs font-bold ${job.theme.text}`}>{job.matchScore}% Match</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 flex-grow">
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                      <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20">
                      <Star className="w-3.5 h-3.5" /> {job.requiredGrade} Req.
                    </div>
                  </div>

                  <div className="mb-6">
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold mb-3">Required Tech Stack</p>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map(skill => (
                        <span key={skill} className="px-2.5 py-1 text-[11px] font-medium text-slate-300 bg-black/40 border border-white/5 rounded-md">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 mt-auto">
                    <div className="flex w-full sm:w-auto items-center justify-between sm:justify-start gap-2 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {job.postedAt}</span>
                      <span className="sm:hidden flex items-center gap-1"><Activity className={`w-3 h-3 ${job.theme.text}`} /> <span className={job.theme.text}>{job.matchScore}% Match</span></span>
                    </div>
                    <button 
                      onClick={() => handleApplyClick(job)}
                      className={`w-full sm:w-auto inline-flex justify-center items-center gap-2 px-6 py-3 bg-white hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-all shadow-lg hover:shadow-xl`}
                    >
                      Initialize AI Apply <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* SECTION 5: Why Join HireX */}
        <section className="px-4 sm:px-6 lg:px-8 mb-24 max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/20 via-slate-900/60 to-purple-900/20 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none"></div>
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
              <div className="md:w-1/2">
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">Why Apply Through HireX?</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">Traditional hiring is broken. We replace biased resume screening with pure skill-based AI evaluation.</p>
                <ul className="space-y-4">
                  <li className="flex items-center gap-3 text-slate-300">
                    <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>Guaranteed response within 48 hours.</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <Code2 className="w-5 h-5 text-blue-400 shrink-0" />
                    <span>Evaluated solely on your code, not your pedigree.</span>
                  </li>
                  <li className="flex items-center gap-3 text-slate-300">
                    <Users className="w-5 h-5 text-purple-400 shrink-0" />
                    <span>Direct fast-track to the technical founders.</span>
                  </li>
                </ul>
              </div>
              <div className="md:w-1/2 flex justify-center w-full">
                <div className="bg-slate-950/50 backdrop-blur-md border border-white/10 p-6 rounded-3xl w-full max-w-sm text-center shadow-2xl">
                  <Sparkles className="w-10 h-10 text-yellow-400 mx-auto mb-4" />
                  <h4 className="text-white font-bold text-lg mb-2">Build Your Profile Once</h4>
                  <p className="text-sm text-slate-400">Take the core AI assessment once and use your verified grade to apply instantly to multiple top-tier companies.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="relative px-4 sm:px-6 lg:px-8 border-t border-white/5 pt-20">
          <div className="mx-auto max-w-7xl">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Need Help?</h2>
              <p className="text-slate-400">Having trouble with an AI assessment or finding the right role? Reach out to our candidate success team.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <div className="group flex flex-col items-center p-8 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl text-center hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300">
                <div className="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Location</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  DLF Cyber City, 5th Floor,<br />
                  Cyber Green-2, Sec-25,<br />
                  Gurugram, India
                </p>
              </div>

              <div className="group flex flex-col items-center p-8 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl text-center hover:-translate-y-1 hover:border-emerald-500/50 transition-all duration-300">
                <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Support Line</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  +91 870023 6923
                </p>
              </div>

              <div className="group flex flex-col items-center p-8 bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl text-center hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300">
                <div className="w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-3">Email Us</h3>
                <p className="text-slate-400 text-sm leading-relaxed break-all">
                  info@careerlabconsulting.com
                </p>
              </div>
            </div>
          </div>
        </section>

      </div>

      {/* POPUP MODAL FOR AI APPLY */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => !isSubmitting && setSelectedJob(null)}></div>
          
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl sm:rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className={`h-1.5 w-full ${selectedJob.theme.bg}`}></div>
            
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-8">
                <div className="pr-4">
                  <h2 className="text-2xl font-bold text-white mb-2">Initialize AI Assessment</h2>
                  <p className="text-sm text-slate-400 leading-relaxed">Applying for <span className="text-white font-semibold">{selectedJob.title}</span> at {selectedJob.company}</p>
                </div>
                <button onClick={() => !isSubmitting && setSelectedJob(null)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors shrink-0">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-5">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Full Name *</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all" placeholder="e.g. John Doe" />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Email Address *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">Phone Number *</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all" placeholder="+91 98765 43210" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">LinkedIn / GitHub URL *</label>
                  <input type="url" required value={formData.portfolio} onChange={(e) => setFormData({...formData, portfolio: e.target.value})} className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all" placeholder="https://..." />
                </div>

                {submitStatus.type && (
                  <div className={`p-4 rounded-xl text-sm font-medium flex items-start gap-3 ${submitStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {submitStatus.type === 'success' ? <CheckCircle2 className="w-5 h-5 shrink-0" /> : <X className="w-5 h-5 shrink-0" />}
                    {submitStatus.msg}
                  </div>
                )}

                <div className="pt-4 mt-2 border-t border-white/10">
                  <button type="submit" disabled={isSubmitting} className={`w-full flex justify-center items-center gap-2 ${selectedJob.theme.bg} hover:bg-opacity-80 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 shadow-lg`}>
                    {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin"/> Processing Secure Link...</> : 'Send to AI Evaluator'}
                  </button>
                  <p className="text-center text-[10px] text-slate-500 mt-4">By continuing, you agree to our AI evaluation terms of service.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
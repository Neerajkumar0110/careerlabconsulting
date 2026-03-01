// app/hirex/job-inventory/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  Search, Filter, MapPin, Briefcase, DollarSign, 
  Activity, Star, Zap, Terminal, Building2, 
  ChevronRight, Sparkles, CheckCircle2, Clock,
  ArrowRight, X, Loader2
} from 'lucide-react';

const CATEGORIES = ["All Roles", "Frontend", "Backend", "AI & Data", "DevOps", "Database"];

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
    theme: "blue"
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
    theme: "cyan"
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
    theme: "purple"
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
    theme: "emerald"
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
        setSubmitStatus({ type: 'success', msg: 'Application Initialized! Please check your email for the AI Test link.' });
        setTimeout(() => setSelectedJob(null), 3000); // Close modal after 3 seconds
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
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full -translate-x-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-6">
              <Activity className="w-4 h-4" /> Live Talent Pipeline
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg mb-6">
              Autonomous <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-400">Job Inventory</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Explore highly-vetted enterprise roles. Your AI-verified skills automatically calculate your match score for each position. No resumes needed—just initialize the AI interview and get hired.
            </p>
          </div>

          <div className="bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-2xl p-4 mb-12 shadow-[0_0_40px_rgba(0,0,0,0.5)] flex flex-col md:flex-row gap-4 items-center sticky top-24 z-40">
            <div className="relative w-full md:w-1/3">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search roles, companies..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/20 border border-white/5 rounded-xl pl-12 pr-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            
            <div className="hidden md:block w-px h-10 bg-white/10"></div>
            
            <div className="w-full md:w-auto flex-grow flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 md:pb-0">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className={`group relative bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-1 hover:border-${job.theme}-500/50 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] flex flex-col`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center font-black text-xl text-white shadow-lg border border-white/10 group-hover:scale-105 transition-transform">
                      {job.logo}
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-blue-300 transition-colors leading-tight">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-400">{job.company}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end">
                    <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-${job.theme}-500/10 border border-${job.theme}-500/20 mb-2`}>
                      <Zap className={`w-3.5 h-3.5 text-${job.theme}-400`} />
                      <span className={`text-xs font-bold text-${job.theme}-400`}>{job.matchScore}% Match</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 mb-6">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-slate-300 bg-white/5 px-3 py-1.5 rounded-lg border border-white/5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {job.location}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-300 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                    <DollarSign className="w-3.5 h-3.5" /> {job.salary}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-purple-300 bg-purple-500/10 px-3 py-1.5 rounded-lg border border-purple-500/20">
                    <Star className="w-3.5 h-3.5" /> {job.requiredGrade} Required
                  </div>
                </div>

                <div className="pt-5 border-t border-white/10 flex items-center justify-between mt-auto">
                  <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                    <Clock className="w-3.5 h-3.5" /> {job.postedAt}
                  </div>
                  <button 
                    onClick={() => handleApplyClick(job)}
                    className={`inline-flex items-center gap-2 px-6 py-2.5 bg-${job.theme}-600 hover:bg-${job.theme}-500 text-white font-bold rounded-xl transition-all shadow-[0_0_15px_rgba(currentColor,0.3)]`}
                  >
                    Initialize AI Apply <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* POPUP MODAL FOR AI APPLY */}
      {selectedJob && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => !isSubmitting && setSelectedJob(null)}></div>
          
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
            <div className={`h-2 w-full bg-${selectedJob.theme}-500`}></div>
            
            <div className="p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">Initialize Application</h2>
                  <p className="text-sm text-slate-400">Applying for <span className="text-white font-semibold">{selectedJob.title}</span> at {selectedJob.company}</p>
                </div>
                <button onClick={() => !isSubmitting && setSelectedJob(null)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Full Name</label>
                  <input type="text" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full mt-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="John Doe" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Email</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full mt-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="john@example.com" />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Phone</label>
                    <input type="tel" required value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className="w-full mt-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="+91 9876543210" />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">LinkedIn / Portfolio URL</label>
                  <input type="url" required value={formData.portfolio} onChange={(e) => setFormData({...formData, portfolio: e.target.value})} className="w-full mt-1 bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500" placeholder="https://linkedin.com/in/..." />
                </div>

                {submitStatus.type && (
                  <div className={`p-3 rounded-xl text-sm font-medium ${submitStatus.type === 'success' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                    {submitStatus.msg}
                  </div>
                )}

                <button type="submit" disabled={isSubmitting} className={`w-full mt-4 flex justify-center items-center gap-2 bg-${selectedJob.theme}-600 hover:bg-${selectedJob.theme}-500 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50`}>
                  {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin"/> Processing...</> : 'Send to AI Evaluator'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
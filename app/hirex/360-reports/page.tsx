// app/hirex/360-reports/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  Search, Filter, Download, UserCheck, ShieldCheck, 
  BrainCircuit, Code2, GitMerge, MessageSquare, 
  X, ChevronRight, Activity, Zap, Terminal, Users, TrendingUp, Clock,
  MapPin, Phone, Mail, PieChart, MessageCircle, ExternalLink, Blocks, Star
} from 'lucide-react';

const ADMIN_WHATSAPP = "+918700236923"; 

const CANDIDATES = [
  {
    id: "HX-IND-9921",
    name: "Pooja Mehta",
    role: "Full Stack Developer",
    location: "Bangalore, India",
    matchScore: 94,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    skills: ["React.js", "Next.js", "Node.js", "Socket.io"],
    metrics: { technical: 96, logic: 92, systemDesign: 88, communication: 95 },
    aiNotes: "Candidate demonstrates exceptional understanding of React Server Components and real-time syncing via Socket.io. Code structure is highly modular.",
    githubImpact: "High (1.2k+ contributions this year)",
    status: "Ready for Interview",
    theme: {
      text: "text-blue-400",
      bg: "bg-blue-500",
      bgSubtle: "bg-blue-500/10",
      border: "border-blue-500/20",
      glow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]",
    }
  },
  {
    id: "HX-IND-8832",
    name: "Rahul Sharma",
    role: "TiDB & MySQL Architect",
    location: "Pune, India",
    matchScore: 88,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    skills: ["TiDB Cloud", "MySQL", "Distributed Systems", "AWS"],
    metrics: { technical: 94, logic: 85, systemDesign: 90, communication: 82 },
    aiNotes: "Deep knowledge of ACID compliance and distributed SQL. Struggled slightly with one edge-case in high-concurrency simulation but recovered well.",
    githubImpact: "Medium (Custom ORM projects)",
    status: "Shortlisted",
    theme: {
      text: "text-cyan-400",
      bg: "bg-cyan-500",
      bgSubtle: "bg-cyan-500/10",
      border: "border-cyan-500/20",
      glow: "hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
    }
  },
  {
    id: "HX-IND-7745",
    name: "Sneha Iyer",
    role: "Generative AI Engineer",
    location: "Hyderabad, India",
    matchScore: 97,
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800&auto=format&fit=crop",
    skills: ["Gemini API", "Python", "RAG Pipelines", "LangChain"],
    metrics: { technical: 98, logic: 96, systemDesign: 94, communication: 98 },
    aiNotes: "Outstanding performance. Built a fully functional autonomous agent during the simulation. Excellent prompt engineering skills and handling of API rate limits.",
    githubImpact: "Very High (Active open-source AI contributor)",
    status: "Fast-Tracked",
    theme: {
      text: "text-purple-400",
      bg: "bg-purple-500",
      bgSubtle: "bg-purple-500/10",
      border: "border-purple-500/20",
      glow: "hover:shadow-[0_0_30px_rgba(168,85,247,0.15)]",
    }
  },
  {
    id: "HX-IND-6654",
    name: "Aman Gupta",
    role: "DevOps Engineer",
    location: "Delhi NCR, India",
    matchScore: 82,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
    metrics: { technical: 85, logic: 80, systemDesign: 84, communication: 80 },
    aiNotes: "Solid understanding of containerization. Deployment scripts were functional but could be optimized for faster execution. Good fundamental knowledge.",
    githubImpact: "Low (Mostly private repositories)",
    status: "Under Review",
    theme: {
      text: "text-emerald-400",
      bg: "bg-emerald-500",
      bgSubtle: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      glow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]",
    }
  }
];

export default function Reports360Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<typeof CANDIDATES[0] | null>(null);

  const filteredCandidates = CANDIDATES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openWhatsApp = (action: string) => {
    if(!selectedCandidate) return;
    const text = encodeURIComponent(`Hi, I'm interested to ${action} with candidate ${selectedCandidate.name} (${selectedCandidate.id}) for the ${selectedCandidate.role} role.`);
    window.open(`https://wa.me/${ADMIN_WHATSAPP.replace('+', '')}?text=${text}`, '_blank');
  };

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 text-white bg-[#020617]">
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <section className="relative pt-32 pb-12 z-10 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-4">
                <ShieldCheck className="w-4 h-4" /> Employer Dashboard
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
                360° <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Insights Matrix</span>
              </h1>
              <p className="mt-4 text-slate-400 text-base md:text-lg leading-relaxed">
                Deep dive into AI-generated evaluations. Review technical depth, logical reasoning, and GitHub impact before scheduling the final culture-fit round.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-3 w-full lg:w-auto">
              <div className="relative w-full sm:w-[280px]">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search candidates..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900/50 border border-white/10 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all w-full shadow-lg backdrop-blur-md placeholder:text-slate-500"
                />
              </div>
              <button className="flex items-center justify-center gap-2 bg-slate-900/50 border border-white/10 px-5 py-3.5 rounded-2xl hover:bg-white/5 transition-colors text-slate-300 hover:text-white shadow-lg backdrop-blur-md">
                <Filter className="w-4 h-4" />
                <span className="sm:hidden text-sm font-medium">Filters</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-12 z-10 border-b border-white/5 bg-slate-900/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">124</p>
                <p className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 tracking-wider mt-0.5">Total Verified</p>
              </div>
            </div>
            
            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">28</p>
                <p className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 tracking-wider mt-0.5">Fast-Tracked</p>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">89%</p>
                <p className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 tracking-wider mt-0.5">Avg Logic Score</p>
              </div>
            </div>

            <div className="bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-transform hover:-translate-y-1 duration-300">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-black text-white">12</p>
                <p className="text-[10px] sm:text-xs uppercase font-bold text-slate-500 tracking-wider mt-0.5">Pending Review</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {filteredCandidates.map((candidate) => (
              <div 
                key={candidate.id}
                onClick={() => setSelectedCandidate(candidate)}
                className={`group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer hover:-translate-y-2 transition-all duration-300 shadow-lg ${candidate.theme.glow} hover:border-white/20 flex flex-col`}
              >
                <div className="absolute top-0 right-0 p-4">
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full ${candidate.theme.bgSubtle} ${candidate.theme.border} border`}>
                    <Activity className={`w-3 h-3 ${candidate.theme.text}`} />
                    <span className={`text-[10px] font-bold ${candidate.theme.text}`}>{candidate.matchScore}% Match</span>
                  </div>
                </div>

                <div className="relative w-16 h-16 mb-5">
                  <div className={`absolute inset-0 ${candidate.theme.bg} rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                  <img src={candidate.avatar} alt={candidate.name} className="relative w-full h-full object-cover rounded-2xl border border-white/10 grayscale-[20%] group-hover:grayscale-0 transition-all shadow-xl" />
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full"></div>
                </div>

                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-blue-100 transition-colors">{candidate.name}</h3>
                <p className="text-xs text-slate-400 mb-5">{candidate.role}</p>

                <div className="flex flex-wrap gap-1.5 mb-6 flex-grow">
                  {candidate.skills.slice(0,3).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-white/5 border border-white/5 text-slate-300 text-[10px] font-medium tracking-wide rounded-lg">
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="px-2 py-1 bg-white/5 border border-white/5 text-slate-500 text-[10px] font-medium tracking-wide rounded-lg">
                      +{candidate.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between mt-auto">
                  <span className={`text-xs font-bold ${candidate.status === 'Fast-Tracked' ? 'text-purple-400' : candidate.status === 'Ready for Interview' ? 'text-blue-400' : 'text-slate-400'}`}>
                    {candidate.status}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-white" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 z-10 border-t border-white/5 bg-slate-900/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why use 360° Reports?</h2>
            <p className="text-slate-400">Comprehensive AI analysis that goes beyond basic skill matching.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 text-center hover:bg-white/[0.04] transition-colors">
              <div className="w-14 h-14 mx-auto bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20">
                <Code2 className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Deep Tech Evaluation</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Our AI Engine evaluates code modularity, best practices, and runtime performance in real-time.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 text-center hover:bg-white/[0.04] transition-colors">
              <div className="w-14 h-14 mx-auto bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                <PieChart className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Behavioral Breakdown</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Understand how candidates approach logic puzzles, edge cases, and high-pressure scenarios.</p>
            </div>
            <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-8 text-center hover:bg-white/[0.04] transition-colors">
              <div className="w-14 h-14 mx-auto bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
                <GitMerge className="w-7 h-7 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">GitHub Integration</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Automatically scan their open-source contributions to verify real-world project impact.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 z-10 border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12 bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
             <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none"></div>
             
             <div className="md:w-1/2 relative z-10">
                <h2 className="text-3xl font-bold text-white mb-4">Seamless Enterprise Integration</h2>
                <p className="text-slate-400 mb-8 leading-relaxed">Connect HireX 360° Reports directly with your existing Applicant Tracking System (ATS), Slack, or MS Teams to streamline your hiring pipeline.</p>
                <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-6 py-3 rounded-xl transition-colors font-medium">
                  View API Docs <ExternalLink className="w-4 h-4" />
                </button>
             </div>
             
             <div className="md:w-1/2 relative z-10 flex justify-center">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 border border-white/10 w-32 h-32 rounded-2xl flex flex-col items-center justify-center gap-3 backdrop-blur-sm animate-[bounce_3s_infinite]">
                    <Blocks className="w-8 h-8 text-blue-400" />
                    <span className="text-xs font-bold text-slate-300">ATS Connect</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 w-32 h-32 rounded-2xl flex flex-col items-center justify-center gap-3 backdrop-blur-sm animate-[bounce_4s_infinite] translate-y-6">
                    <MessageSquare className="w-8 h-8 text-purple-400" />
                    <span className="text-xs font-bold text-slate-300">Slack Alerts</span>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 z-10 border-t border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-12">Trusted by Technical Leads</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 text-left">
              <div className="flex gap-1 mb-4 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-slate-300 italic mb-6 leading-relaxed">"The deep AI logic evaluation saved our engineering team dozens of hours per week. We only interview candidates who are actually ready."</p>
              <div className="flex items-center gap-4">
                <img src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=200&auto=format&fit=crop" alt="Sarah Jenkins" className="w-12 h-12 rounded-full object-cover border-2 border-white/10" />
                <div>
                  <h4 className="text-sm font-bold text-white">Sarah Jenkins</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">VP of Engineering, TechFlow</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-8 text-left">
              <div className="flex gap-1 mb-4 text-yellow-400">
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
                <Star className="w-4 h-4 fill-current" />
              </div>
              <p className="text-slate-300 italic mb-6 leading-relaxed">"Having the GitHub impact perfectly summarized alongside their test scores gave us a true 360-degree view. Brilliant platform."</p>
              <div className="flex items-center gap-4">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop" alt="Raj Patel" className="w-12 h-12 rounded-full object-cover border-2 border-white/10" />
                <div>
                  <h4 className="text-sm font-bold text-white">Raj Patel</h4>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Lead Architect, InnovateAI</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 z-10 border-t border-white/5 bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-slate-400">Need support regarding candidate reports or enterprise integrations? Our team at Career Lab Consulting is here to help.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="group flex flex-col items-center p-8 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl text-center hover:-translate-y-1 hover:border-blue-500/50 transition-all duration-300">
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

            <div className="group flex flex-col items-center p-8 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl text-center hover:-translate-y-1 hover:border-emerald-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Phone</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                +91 870023 6923
              </p>
            </div>

            <div className="group flex flex-col items-center p-8 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl text-center hover:-translate-y-1 hover:border-purple-500/50 transition-all duration-300">
              <div className="w-14 h-14 bg-purple-500/10 rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <Mail className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Email</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                info@careerlabconsulting.com
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Fully Fixed & Optimized Report Modal */}
      {selectedCandidate && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 md:p-8">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedCandidate(null)}
          ></div>
          
          <div className="relative w-full max-w-5xl bg-[#0b0f1f] border border-white/10 rounded-2xl sm:rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
            
            <div className="flex-shrink-0 p-4 sm:p-6 md:p-8 border-b border-white/10 flex justify-between items-start bg-slate-900/90 backdrop-blur-xl relative z-20">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent ${selectedCandidate.theme.text} opacity-30`}></div>
              
              <div className="flex items-center gap-4 sm:gap-6 relative z-10 w-[85%] sm:w-auto">
                <img src={selectedCandidate.avatar} alt="Avatar" className="w-15 h-20 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl object-cover border border-white/20 shadow-2xl flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg sm:text-3xl font-black text-white mb-0.5 sm:mb-1 truncate">{selectedCandidate.name}</h2>
                  <p className="text-xs sm:text-sm text-slate-400 mb-1 truncate">{selectedCandidate.role}</p>
                  <p className="text-[10px] font-mono text-slate-500 hidden sm:block">{selectedCandidate.id} • {selectedCandidate.location}</p>
                </div>
              </div>

              <div className="flex items-start sm:items-center gap-4 relative z-10">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">HireX Match</p>
                  <p className={`text-3xl sm:text-4xl font-black ${selectedCandidate.theme.text}`}>{selectedCandidate.matchScore}%</p>
                </div>
                <button onClick={() => setSelectedCandidate(null)} className="p-2 sm:p-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-slate-400 hover:text-white transition-all shadow-lg">
                  <X className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            <div className={`sm:hidden flex-shrink-0 p-3 border-b border-white/10 ${selectedCandidate.theme.bgSubtle} flex justify-between items-center z-10`}>
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">Overall Match Score</span>
              <span className={`text-lg font-black ${selectedCandidate.theme.text}`}>{selectedCandidate.matchScore}%</span>
            </div>

            {/* Modal Body (Scrollable internal area) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 [&::-webkit-scrollbar]:w-1.5 sm:[&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                {[
                  { label: "Tech Proficiency", value: selectedCandidate.metrics.technical, icon: Code2, color: "text-blue-400", bg: "bg-blue-500" },
                  { label: "Logic & Problem Solving", value: selectedCandidate.metrics.logic, icon: BrainCircuit, color: "text-purple-400", bg: "bg-purple-500" },
                  { label: "System Design", value: selectedCandidate.metrics.systemDesign, icon: Terminal, color: "text-cyan-400", bg: "bg-cyan-500" },
                  { label: "Communication", value: selectedCandidate.metrics.communication, icon: MessageSquare, color: "text-emerald-400", bg: "bg-emerald-500" },
                ].map((metric, idx) => (
                  <div key={idx} className="bg-slate-900/40 border border-white/5 rounded-xl sm:rounded-2xl p-3 sm:p-5 hover:bg-slate-900/60 transition-colors">
                    <div className="flex justify-between items-start mb-3 sm:mb-4">
                      <metric.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${metric.color}`} />
                      <span className="text-base sm:text-xl font-bold text-white">{metric.value}</span>
                    </div>
                    <p className="text-[9px] sm:text-[10px] uppercase font-bold text-slate-500 mb-2 sm:mb-3 line-clamp-1">{metric.label}</p>
                    <div className="w-full h-1 sm:h-1.5 bg-black/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${metric.bg} shadow-[0_0_10px_rgba(255,255,255,0.2)] rounded-full`} 
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                  <div className="bg-slate-900/40 border border-white/5 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-yellow-400 to-orange-500 rounded-l-2xl sm:rounded-l-[2rem]"></div>
                    <div className="flex items-center gap-3 mb-4 sm:mb-5">
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-yellow-500/10 flex items-center justify-center border border-yellow-500/20">
                        <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                      </div>
                      <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">AI Analysis</h3>
                    </div>
                    <p className="text-slate-300/90 leading-relaxed text-xs sm:text-sm md:text-base font-light">
                      "{selectedCandidate.aiNotes}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="bg-slate-900/40 border border-white/5 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8">
                      <div className="flex items-center gap-3 mb-4 sm:mb-5">
                        <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">Verified Stack</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map(skill => (
                          <span key={skill} className={`px-2.5 sm:px-3 py-1 sm:py-1.5 ${selectedCandidate.theme.bgSubtle} ${selectedCandidate.theme.border} ${selectedCandidate.theme.text} border text-[10px] sm:text-xs rounded-lg sm:rounded-xl font-medium`}>
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900/40 border border-white/5 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 relative overflow-hidden group">
                      <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                        <GitMerge className="w-24 h-24 sm:w-32 sm:h-32 text-white" />
                      </div>
                      <div className="flex items-center gap-3 mb-4 sm:mb-5 relative z-10">
                        <GitMerge className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />
                        <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-300">GitHub Impact</h3>
                      </div>
                      <p className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-400 relative z-10">{selectedCandidate.githubImpact}</p>
                      <p className="text-[10px] sm:text-xs text-slate-500 mt-1.5 sm:mt-2 relative z-10">Analyzed via auto-repo scanning.</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-gradient-to-b from-blue-900/30 to-slate-900/60 border border-blue-500/20 rounded-2xl sm:rounded-[2rem] p-5 sm:p-8 text-center shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-50"></div>
                    
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-500/30 mb-4 sm:mb-5 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
                      <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" />
                    </div>
                    
                    <h3 className="text-white font-bold text-base sm:text-lg mb-1.5 sm:mb-2">Ready to move forward?</h3>
                    <p className="text-[10px] sm:text-xs text-slate-400 mb-6 sm:mb-8 leading-relaxed">Candidate is verified, currently available, and actively seeking offers.</p>
                    
                    <button 
                      onClick={() => openWhatsApp('schedule a final round')}
                      className="w-full bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(37,211,102,0.3)] hover:shadow-[0_0_30px_rgba(37,211,102,0.5)] mb-3 flex items-center justify-center gap-2 text-sm sm:text-base"
                    >
                      <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5" /> Chat on WhatsApp
                    </button>
                    <button 
                      onClick={() => openWhatsApp('extend a direct offer')}
                      className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 sm:py-3.5 rounded-xl transition-all text-sm sm:text-base"
                    >
                      Request Direct Offer
                    </button>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 bg-slate-900/80 border border-white/10 text-slate-300 hover:text-white font-semibold py-3.5 sm:py-4 rounded-xl sm:rounded-[1.5rem] transition-all hover:bg-white/10 group text-sm sm:text-base">
                    <Download className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" /> 
                    Export 360° PDF Report
                  </button>
                </div>

              </div>
            </div>
            
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
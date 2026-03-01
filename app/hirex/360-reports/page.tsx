// app/hirex/360-reports/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import { 
  Search, Filter, Download, UserCheck, ShieldCheck, 
  BrainCircuit, Code2, GitMerge, MessageSquare, 
  X, ChevronRight, Activity, Zap, Terminal, Users, TrendingUp, Clock
} from 'lucide-react';

const CANDIDATES = [
  {
    id: "HX-IND-9921",
    name: "Pooja Mehta",
    role: "Full Stack Developer",
    location: "Bangalore, India",
    matchScore: 94,
    avatar: "https://img.freepik.com/premium-photo/40-year-old-pakistani-woman-with-long-hair-showing-thumbs-up-white-background_862994-278392.jpg",
    skills: ["React.js", "Next.js", "Node.js", "Socket.io"],
    metrics: {
      technical: 96,
      logic: 92,
      systemDesign: 88,
      communication: 95
    },
    aiNotes: "Candidate demonstrates exceptional understanding of React Server Components and real-time syncing via Socket.io. Code structure is highly modular.",
    githubImpact: "High (1.2k+ contributions this year)",
    status: "Ready for Interview",
    glowColor: "shadow-blue-500/20",
    themeColor: "blue"
  },
  {
    id: "HX-IND-8832",
    name: "Rahul Sharma",
    role: "TiDB & MySQL Architect",
    location: "Pune, India",
    matchScore: 88,
    avatar: "https://img.freepik.com/free-photo/successful-handsome-man-posing_114579-79341.jpg?t=st=1772367725~exp=1772371325~hmac=317ae16b8b932ef0371010f603d93f1bf661df280c38356261fe527c8e8badab&w=1480",
    skills: ["TiDB Cloud", "MySQL", "Distributed Systems", "AWS"],
    metrics: {
      technical: 94,
      logic: 85,
      systemDesign: 90,
      communication: 82
    },
    aiNotes: "Deep knowledge of ACID compliance and distributed SQL. Struggled slightly with one edge-case in high-concurrency simulation but recovered well.",
    githubImpact: "Medium (Custom ORM projects)",
    status: "Shortlisted",
    glowColor: "shadow-cyan-500/20",
    themeColor: "cyan"
  },
  {
    id: "HX-IND-7745",
    name: "Sneha Iyer",
    role: "Generative AI Engineer",
    location: "Hyderabad, India",
    matchScore: 97,
    avatar: "https://img.freepik.com/free-photo/woman-celebrating-indian-republic-day_23-2151142577.jpg?t=st=1772367811~exp=1772371411~hmac=827b0093c9a4e7f6ebc952509c31fd84452f3d8f8e78b5ffe9822ef81110e6e9&w=1480",
    skills: ["Gemini API", "Python", "RAG Pipelines", "LangChain"],
    metrics: {
      technical: 98,
      logic: 96,
      systemDesign: 94,
      communication: 98
    },
    aiNotes: "Outstanding performance. Built a fully functional autonomous agent during the simulation. Excellent prompt engineering skills and handling of API rate limits.",
    githubImpact: "Very High (Active open-source AI contributor)",
    status: "Fast-Tracked",
    glowColor: "shadow-purple-500/20",
    themeColor: "purple"
  },
  {
    id: "HX-IND-6654",
    name: "Aman Gupta",
    role: "DevOps Engineer",
    location: "Delhi NCR, India",
    matchScore: 82,
    avatar: "https://img.freepik.com/free-photo/man-wearing-t-shirt-gesturing_23-2149393647.jpg?t=st=1772367926~exp=1772371526~hmac=6cd592ae4270e9c4cc01130e3d24f91f555528f5a819a252b071936b883c8455&w=1480",
    skills: ["Docker", "Kubernetes", "CI/CD", "Terraform"],
    metrics: {
      technical: 85,
      logic: 80,
      systemDesign: 84,
      communication: 80
    },
    aiNotes: "Solid understanding of containerization. Deployment scripts were functional but could be optimized for faster execution. Good fundamental knowledge.",
    githubImpact: "Low (Mostly private repositories)",
    status: "Under Review",
    glowColor: "shadow-emerald-500/20",
    themeColor: "emerald"
  }
];

export default function Reports360Page() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCandidate, setSelectedCandidate] = useState<typeof CANDIDATES[0] | null>(null);

  const filteredCandidates = CANDIDATES.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 text-white bg-[#020617]">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/10 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Make sure Navbar has a proper z-index in its own component, but we will beat it with z-[100] for the modal */}
      <Navbar />

      {/* Main Content Area */}
      <div className="relative z-10 pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-4">
                <ShieldCheck className="w-4 h-4" /> Employer Dashboard
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white drop-shadow-lg">
                360° <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Insights Matrix</span>
              </h1>
              <p className="mt-4 text-slate-400 max-w-2xl">
                Deep dive into AI-generated evaluations. Review technical depth, logical reasoning, and GitHub impact before scheduling the final culture-fit round.
              </p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search candidates..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900/50 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors w-full md:w-64"
                />
              </div>
              <button className="bg-slate-900/50 border border-white/10 p-2.5 rounded-xl hover:bg-white/5 transition-colors text-slate-400 hover:text-white">
                <Filter className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* NEW SECTION: Talent Pipeline Analytics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">124</p>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Total Verified</p>
              </div>
            </div>
            
            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center border border-purple-500/20">
                <Zap className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">28</p>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Fast-Tracked</p>
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
                <TrendingUp className="w-6 h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">89%</p>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Avg Logic Score</p>
              </div>
            </div>

            <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center border border-orange-500/20">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-2xl font-black text-white">12</p>
                <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">Pending Review</p>
              </div>
            </div>
          </div>

          {/* Candidates Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCandidates.map((candidate) => (
              <div 
                key={candidate.id}
                onClick={() => setSelectedCandidate(candidate)}
                className={`group relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 cursor-pointer hover:-translate-y-2 transition-all duration-300 hover:border-${candidate.themeColor}-500/30 shadow-lg hover:${candidate.glowColor}`}
              >
                <div className={`absolute top-0 right-0 p-4`}>
                  <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-${candidate.themeColor}-500/10 border border-${candidate.themeColor}-500/20`}>
                    <Activity className={`w-3 h-3 text-${candidate.themeColor}-400`} />
                    <span className={`text-[10px] font-bold text-${candidate.themeColor}-400`}>{candidate.matchScore}% Match</span>
                  </div>
                </div>

                <div className="relative w-16 h-16 mb-6">
                  <div className={`absolute inset-0 bg-${candidate.themeColor}-500 rounded-2xl blur-md opacity-20 group-hover:opacity-40 transition-opacity`}></div>
                  <img src={candidate.avatar} alt={candidate.name} className="relative w-full h-full object-cover rounded-2xl border border-white/10 grayscale-[30%] group-hover:grayscale-0 transition-all" />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-slate-900 rounded-full`}></div>
                </div>

                <h3 className="text-lg font-bold text-white mb-1">{candidate.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{candidate.role}</p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {candidate.skills.slice(0,3).map(skill => (
                    <span key={skill} className="px-2 py-1 bg-white/5 border border-white/5 text-slate-300 text-[9px] uppercase tracking-wider rounded-md">
                      {skill}
                    </span>
                  ))}
                  {candidate.skills.length > 3 && (
                    <span className="px-2 py-1 bg-white/5 border border-white/5 text-slate-500 text-[9px] uppercase tracking-wider rounded-md">
                      +{candidate.skills.length - 3}
                    </span>
                  )}
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className={`text-xs font-medium text-${candidate.status === 'Fast-Tracked' ? 'purple-400' : candidate.status === 'Ready for Interview' ? 'blue-400' : 'slate-400'}`}>
                    {candidate.status}
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Detailed Report Modal */}
      {selectedCandidate && (
        // FIX applied here: z-[100] instead of z-50 forces the modal above everything including Navbar
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300"
            onClick={() => setSelectedCandidate(null)}
          ></div>
          
          {/* Modal Content */}
          <div className="relative w-full max-w-5xl bg-[#0b0f1f] border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
            
            {/* Modal Header */}
            <div className="flex-shrink-0 p-6 border-b border-white/10 flex justify-between items-start bg-slate-900/50 backdrop-blur-xl relative overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${selectedCandidate.themeColor}-500 to-transparent opacity-50`}></div>
              
              <div className="flex items-center gap-5 relative z-10">
                <img src={selectedCandidate.avatar} alt="Avatar" className="w-16 h-16 rounded-2xl object-cover border border-white/20 shadow-xl" />
                <div>
                  <h2 className="text-2xl font-black text-white">{selectedCandidate.name}</h2>
                  <p className="text-sm text-slate-400 mb-1">{selectedCandidate.role} • {selectedCandidate.location}</p>
                  <p className="text-[10px] font-mono text-slate-500">{selectedCandidate.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 relative z-10">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] uppercase font-bold text-slate-500 mb-1">HireX Match Score</p>
                  <p className={`text-3xl font-black text-${selectedCandidate.themeColor}-400`}>{selectedCandidate.matchScore}%</p>
                </div>
                <button onClick={() => setSelectedCandidate(null)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body (Scrollable) */}
            <div className="overflow-y-auto p-6 md:p-8 space-y-8 custom-scrollbar">
              
              {/* Top Metrics Row */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { label: "Tech Proficiency", value: selectedCandidate.metrics.technical, icon: Code2, color: "blue" },
                  { label: "Logic & Problem Solving", value: selectedCandidate.metrics.logic, icon: BrainCircuit, color: "purple" },
                  { label: "System Design", value: selectedCandidate.metrics.systemDesign, icon: Terminal, color: "cyan" },
                  { label: "Communication", value: selectedCandidate.metrics.communication, icon: MessageSquare, color: "emerald" },
                ].map((metric, idx) => (
                  <div key={idx} className="bg-slate-900/60 border border-white/5 rounded-2xl p-4">
                    <div className="flex justify-between items-start mb-4">
                      <metric.icon className={`w-5 h-5 text-${metric.color}-400`} />
                      <span className="text-lg font-bold text-white">{metric.value}/100</span>
                    </div>
                    <p className="text-[10px] uppercase font-bold text-slate-500 mb-2">{metric.label}</p>
                    <div className="w-full h-1.5 bg-black/50 rounded-full overflow-hidden">
                      <div 
                        className={`h-full bg-${metric.color}-500 shadow-[0_0_10px_rgba(currentColor,0.5)]`} 
                        style={{ width: `${metric.value}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Detailed Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Left Col - AI Summary & GitHub */}
                <div className="lg:col-span-2 space-y-6">
                  
                  {/* AI Interview Notes */}
                  <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <Zap className="w-5 h-5 text-yellow-400" />
                      <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Autonomous AI Notes</h3>
                    </div>
                    <p className="text-slate-300 leading-relaxed text-sm bg-black/20 p-4 rounded-2xl border border-white/5 font-light">
                      "{selectedCandidate.aiNotes}"
                    </p>
                  </div>

                  {/* Tech Stack & Git Impact */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <Terminal className="w-5 h-5 text-slate-400" />
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">Verified Stack</h3>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {selectedCandidate.skills.map(skill => (
                          <span key={skill} className="px-3 py-1.5 bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs rounded-lg font-medium">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="bg-slate-900/40 border border-white/5 rounded-3xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <GitMerge className="w-5 h-5 text-slate-400" />
                        <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300">GitHub Impact</h3>
                      </div>
                      <p className="text-lg font-bold text-emerald-400">{selectedCandidate.githubImpact}</p>
                      <p className="text-xs text-slate-500 mt-2">Analyzed via automated repo scanning.</p>
                    </div>
                  </div>

                </div>

                {/* Right Col - Actions & Trust */}
                <div className="space-y-4">
                  <div className="bg-gradient-to-b from-blue-900/20 to-slate-900/40 border border-blue-500/20 rounded-3xl p-6 text-center">
                    <UserCheck className="w-10 h-10 text-blue-400 mx-auto mb-4" />
                    <h3 className="text-white font-bold mb-2">Ready to move forward?</h3>
                    <p className="text-xs text-slate-400 mb-6">Candidate is currently available and actively seeking offers.</p>
                    
                    <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] mb-3">
                      Schedule Final Round
                    </button>
                    <button className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold py-3 rounded-xl transition-all">
                      Extend Direct Offer
                    </button>
                  </div>

                  <button className="w-full flex items-center justify-center gap-2 bg-slate-900 border border-white/10 text-slate-300 hover:text-white font-semibold py-3.5 rounded-2xl transition-all hover:bg-white/5">
                    <Download className="w-4 h-4" /> Export 360° PDF Report
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
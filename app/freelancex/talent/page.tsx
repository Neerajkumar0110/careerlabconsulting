// app/freelancex/talent-pool/page.tsx

'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Filter, MapPin, Zap, Star, ShieldCheck, 
  Clock, CheckCircle2, ChevronRight, Briefcase, 
  Code2, Terminal, Users, X, Loader2, Mail, LayoutTemplate,
  Cpu, Binary, Layers, Activity, Globe, Rocket
} from 'lucide-react';
import Link from 'next/link';

import Navbar from '@/components/freelancex/layout/HomeNavbar';
import Footer from '@/components/freelancex/landing/Footer';

// Mock Data for Elite Talent
const TALENT_PROFILES = [
  {
    id: "N-01",
    name: "Alex Chen",
    role: "Senior AI & System Architect",
    location: "San Francisco, US",
    score: 99,
    status: "Available Now",
    rate: "$85/hr",
    skills: ["Python", "TensorFlow", "AWS", "Rust"],
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
    sprintsCompleted: 42,
    category: "AI/ML"
  },
  {
    id: "N-02",
    name: "Sarah Jenkins",
    role: "Full Stack Engineer (React/Node)",
    location: "London, UK",
    score: 98,
    status: "In Sprint",
    rate: "$65/hr",
    skills: ["Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150",
    sprintsCompleted: 38,
    category: "Full Stack"
  },
  {
    id: "N-03",
    name: "Kenji Sato",
    role: "Web3 & Blockchain Dev",
    location: "Tokyo, JP",
    score: 97,
    status: "Available Now",
    rate: "$95/hr",
    skills: ["Solidity", "Rust", "Smart Contracts", "React"],
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150",
    sprintsCompleted: 31,
    category: "Web3"
  },
  {
    id: "N-04",
    name: "Priya Sharma",
    role: "Lead UI/UX Visionary",
    location: "Bengaluru, IN",
    score: 96,
    status: "Available in 2 Days",
    rate: "$55/hr",
    skills: ["Figma", "Framer", "Design Systems", "Tailwind"],
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    sprintsCompleted: 29,
    category: "Design"
  },
  {
    id: "N-05",
    name: "Marcus Doe",
    role: "Cloud Ops & DevOps Lead",
    location: "Berlin, DE",
    score: 95,
    status: "Available Now",
    rate: "$80/hr",
    skills: ["Docker", "Kubernetes", "AWS CI/CD", "Go"],
    avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
    sprintsCompleted: 45,
    category: "DevOps"
  },
  {
    id: "N-06",
    name: "Elena Rostova",
    role: "Backend System Architect",
    location: "Remote, EU",
    score: 94,
    status: "In Sprint",
    rate: "$70/hr",
    skills: ["Java", "Microservices", "Kafka", "MongoDB"],
    avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150",
    sprintsCompleted: 22,
    category: "Backend"
  }
];

const CATEGORIES = ["All Talent", "Full Stack", "AI/ML", "Web3", "Design", "DevOps", "Backend"];

export default function TalentPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All Talent");
  
  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTalent, setSelectedTalent] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ company: '', email: '', projectDetails: '' });

  // Filtering Logic
  const filteredTalent = useMemo(() => {
    return TALENT_PROFILES.filter(talent => {
      const matchesCategory = activeCategory === "All Talent" || talent.category === activeCategory;
      const matchesSearch = talent.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            talent.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            talent.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  const handleHireClick = (talent: any) => {
    setSelectedTalent(talent);
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    setTimeout(() => {
      const ownerPhone = "918700236923";
      const message = `*🚀 New Hiring Inquiry (Talent Page)*%0A%0A*Target Node:* ${selectedTalent?.name} (${selectedTalent?.id})%0A*Role:* ${selectedTalent?.role}%0A%0A*Employer Company:* ${formData.company}%0A*Employer Email:* ${formData.email}%0A*Project Scope:* ${formData.projectDetails}`;
      window.open(`https://wa.me/${ownerPhone}?text=${message}`, '_blank');
      
      setIsSubmitting(false);
      setIsModalOpen(false);
      setFormData({ company: '', email: '', projectDetails: '' });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow pt-24 md:pt-32 pb-16 md:pb-24 relative">
        {/* Ambient Background */}
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[400px] md:h-[600px] bg-blue-600/10 blur-[150px] rounded-full pointer-events-none -z-0" />
        <div className="absolute top-1/2 left-0 w-full md:w-[600px] h-[400px] md:h-[600px] bg-indigo-600/10 blur-[150px] rounded-full pointer-events-none -z-0" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 mix-blend-soft-light pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16 md:space-y-24">
          
          {/* Header & Search Section (ORIGINAL) */}
          <div className="text-center space-y-6 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-md">
              <Zap size={12} className="text-blue-400" />
              <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-blue-400">The 1% Network</span>
            </motion.div>
            
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-tight">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Elite Talent.</span>
            </motion.h1>
            
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-slate-400 text-sm md:text-lg font-medium leading-relaxed px-4">
              Access pre-vetted engineers, architects, and designers ready to integrate into your sprints within 48 hours.
            </motion.p>
          </div>

          {/* Search Bar & Filters (ORIGINAL) */}
          <div className="space-y-6 max-w-5xl mx-auto">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-lg opacity-50 group-hover:opacity-100 transition-opacity" />
              <div className="relative bg-[#0a0f1d]/80 border border-white/10 rounded-2xl p-2 backdrop-blur-xl flex items-center">
                <div className="pl-4 text-slate-400"><Search size={20} /></div>
                <input 
                  type="text" 
                  placeholder="Search by role, skill (e.g., React, Next.js, Rust)..."
                  className="w-full bg-transparent border-none px-4 py-3 md:py-4 outline-none text-white text-sm md:text-base placeholder:text-slate-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="hidden sm:flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">
                  <Filter size={14} /> Filters
                </button>
              </div>
            </div>

            {/* Categories Scrollable Tabs */}
            <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 justify-start sm:justify-center">
              {CATEGORIES.map(cat => (
                <button 
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap shrink-0 ${activeCategory === cat ? 'bg-blue-600 text-white shadow-lg' : 'bg-[#0a0f1d]/50 border border-white/5 text-slate-400 hover:text-white hover:border-white/20'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* --- NEW SECTION 1: VETTING INTELLIGENCE CONSOLE --- */}
          <section className="bg-slate-900/40 border border-white/5 rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500" />
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight uppercase">Vetting <br className="hidden lg:block"/> <span className="text-blue-400 italic">Intelligence.</span></h2>
                <p className="text-slate-400 leading-relaxed font-medium text-sm md:text-base">Our AI doesn't just scan resumes. It audits logic consistency, code security, and architectural depth through a rigorous neural sync process.</p>
                <div className="grid grid-cols-2 gap-4 pt-4">
                  {[
                    { label: "Logic Audit", icon: Binary, val: "99.8%" },
                    { label: "Security Trace", icon: ShieldCheck, val: "Hardened" },
                    { label: "Sync Latency", icon: Activity, val: "1.2ms" },
                    { label: "Identity Hash", icon: Layers, val: "Verified" }
                  ].map((stat, i) => (
                    <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5 text-left">
                      <stat.icon size={18} className="text-blue-400 mb-2" />
                      <p className="text-[9px] md:text-[10px] font-black text-slate-500 uppercase mb-1">{stat.label}</p>
                      <span className="text-base md:text-lg font-black">{stat.val}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000" />
                <div className="relative bg-[#020617] border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl">
                  <div className="flex gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                  </div>
                  <div className="font-mono text-[10px] md:text-xs space-y-3 text-slate-500">
                    <p className="text-blue-400">// ANALYZING_CANDIDATE_NODE</p>
                    <p>&gt; Scanning Repository logic... [OK]</p>
                    <p>&gt; Verifying Architectural Depth... [S-TIER]</p>
                    <p>&gt; Cross-referencing Global Indices... [NOMINAL]</p>
                    <p className="text-emerald-400 pt-4 animate-pulse">&gt; NODE_STATUS: ELITE_VERIFIED</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Talent Grid (ORIGINAL) */}
          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredTalent.length > 0 ? (
                filteredTalent.map((talent, i) => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ delay: i * 0.05 }}
                    key={talent.id}
                    className="bg-[#0a0f1d]/60 border border-white/5 hover:border-blue-500/30 rounded-[2rem] overflow-hidden backdrop-blur-xl group transition-all flex flex-col h-full shadow-2xl"
                  >
                    <div className="p-6 md:p-8 flex-grow space-y-6">
                      
                      {/* Top Header: Match Score & Status */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${talent.status === 'Available Now' ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
                          <span className={`text-[9px] font-black uppercase tracking-widest ${talent.status === 'Available Now' ? 'text-emerald-400' : 'text-amber-400'}`}>
                            {talent.status}
                          </span>
                        </div>
                        <div className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-black tracking-widest flex items-center gap-1">
                          <Star size={10} fill="currentColor" /> {talent.score} AI Match
                        </div>
                      </div>

                      {/* Profile Info */}
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img src={talent.avatar} className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover border border-white/10 group-hover:scale-105 transition-transform" alt={talent.name} />
                          <div className="absolute -bottom-2 -right-2 bg-[#020617] rounded-full p-1 border border-white/10">
                            <ShieldCheck size={14} className="text-emerald-500" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg md:text-xl font-bold text-white leading-tight">{talent.name}</h3>
                          <p className="text-xs text-blue-400 font-medium mt-1">{talent.role}</p>
                          <div className="flex items-center gap-1 mt-2 text-slate-500 text-[10px] uppercase font-bold tracking-widest">
                            <MapPin size={10} /> {talent.location}
                          </div>
                        </div>
                      </div>

                      {/* Skills Tags */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {talent.skills.map((skill, idx) => (
                          <span key={idx} className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-[10px] font-bold text-slate-300">
                            {skill}
                          </span>
                        ))}
                      </div>

                      {/* Stats Grid */}
                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
                        <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Success Rate</p>
                          <p className="text-sm font-bold text-white flex items-center gap-1">
                            <CheckCircle2 size={12} className="text-emerald-500" /> 100%
                          </p>
                        </div>
                        <div>
                          <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Completed</p>
                          <p className="text-sm font-bold text-white flex items-center gap-1">
                            <Briefcase size={12} className="text-blue-500" /> {talent.sprintsCompleted} Sprints
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Area */}
                    <div className="p-6 md:p-8 bg-white/[0.02] border-t border-white/5 flex items-center justify-between mt-auto">
                      <div className="text-sm font-black text-white">{talent.rate}</div>
                      <button 
                        onClick={() => handleHireClick(talent)}
                        className="px-6 py-3 bg-white text-black hover:bg-blue-600 hover:text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl transition-all flex items-center gap-2"
                      >
                        Deploy Node <ChevronRight size={14} />
                      </button>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                  <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
                    <Search size={24} className="text-slate-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">No nodes found</h3>
                  <p className="text-slate-500 text-sm">Try adjusting your filters or search query.</p>
                  <button onClick={() => {setSearchQuery(''); setActiveCategory('All Talent')}} className="mt-6 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all">Clear Filters</button>
                </div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* --- NEW SECTION 2: GLOBAL AVAILABILITY GRID --- */}
          <section className="grid lg:grid-cols-3 gap-6 md:gap-8">
            <div className="lg:col-span-2 bg-[#0a0f1d] border border-white/10 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col justify-between relative overflow-hidden shadow-3xl">
              <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none"><Globe size={250} /></div>
              <div className="relative z-10 text-center md:text-left">
                <h3 className="text-2xl md:text-4xl font-black mb-4 tracking-tight uppercase">Global Presence <br className="hidden md:block"/> <span className="text-blue-400 italic">Hubs.</span></h3>
                <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-md mx-auto md:mx-0">Our talent isn't just remote; it's globally distributed across primary high-fidelity tech hubs for 24/7 project velocity.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-10 relative z-10">
                {[
                  { region: "USA", nodes: 124, progress: "80%" },
                  { region: "UK", nodes: 84, progress: "60%" },
                  { region: "INDIA", nodes: 312, progress: "95%" },
                  { region: "JAPAN", nodes: 45, progress: "40%" }
                ].map((hub, i) => (
                  <div key={i} className="space-y-2 bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{hub.region}</span>
                    <h4 className="text-xl font-black text-white">{hub.nodes} <span className="text-[9px] text-slate-500 uppercase">Nodes</span></h4>
                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mt-2">
                      <motion.div initial={{ width: 0 }} whileInView={{ width: hub.progress }} className="h-full bg-blue-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-900 rounded-[2.5rem] md:rounded-[3rem] p-8 md:p-10 flex flex-col justify-between shadow-3xl text-center md:text-left">
              <ShieldCheck size={48} className="text-white mb-6 mx-auto md:mx-0" />
              <div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight">Enterprise Grade <br/> Protection</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed mb-8">All talent engagements are protected by E2E encrypted NDAs and milestone-based secure escrow.</p>
              </div>
              <button className="w-full py-4 bg-white/10 border border-white/20 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white/20 transition-all shadow-xl">View Security Specs</button>
            </div>
          </section>

          <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border border-blue-500/20 p-8 md:p-16 text-center space-y-8 backdrop-blur-xl">
             <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none" />
             <div className="relative z-10">
               <h2 className="text-3xl md:text-5xl font-black text-white leading-tight mb-4">Can't find the exact match?</h2>
               <p className="text-slate-400 text-sm md:text-lg max-w-xl mx-auto mb-8">Let our AI matchmaker analyze your project requirements and automatically pair you with the perfect specialized node.</p>
               <button className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] md:text-xs uppercase tracking-[0.2em] rounded-xl md:rounded-2xl transition-all shadow-xl">
                 Run AI Matchmaker <Zap size={16} fill="currentColor" />
               </button>
             </div>
          </div>

        </div>
      </main>

      <Footer />

      {/* --- DEPLOYMENT MODAL (HIRE POPUP) --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center px-4 sm:px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/95 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} className="relative bg-[#0a0f1d] border border-white/10 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] max-w-xl w-full shadow-3xl overflow-hidden z-10">
               <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
               <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-6 p-2 hover:bg-white/5 rounded-full text-slate-500 hover:text-white transition-all"><X size={20} /></button>
               
               <div className="mb-8 text-center md:text-left border-b border-white/5 pb-6">
                  <span className="text-[9px] font-black uppercase text-blue-400 tracking-[0.3em] mb-2 block">Deployment Protocol</span>
                  <h3 className="text-2xl font-black mb-2 tracking-tight">Initiate Contract</h3>
                  
                  {selectedTalent ? (
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-4">
                      <img src={selectedTalent.avatar} className="w-12 h-12 rounded-full object-cover border border-white/10" alt="Talent" />
                      <div className="text-left">
                        <p className="text-sm font-bold text-white">{selectedTalent.name}</p>
                        <p className="text-[10px] font-medium text-slate-400">{selectedTalent.role} • {selectedTalent.rate}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-[10px] font-medium text-slate-400 mt-2">Enterprise Squad / General Inquiry</p>
                  )}
               </div>

               <form onSubmit={handleSubmit} className="space-y-4 md:space-y-5">
                  <div className="relative group">
                     <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                     <input required type="text" placeholder="Your Company Name" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, company: e.target.value})} />
                  </div>
                  <div className="relative group">
                     <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                     <input required type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600" onChange={e => setFormData({...formData, email: e.target.value})} />
                  </div>
                  <div className="relative group">
                     <LayoutTemplate className="absolute left-4 top-4 text-slate-600 group-focus-within:text-blue-500 transition-colors" size={16} />
                     <textarea required rows={3} placeholder="Brief Project Scope..." className="w-full bg-white/5 border border-white/10 rounded-xl md:rounded-2xl py-4 pl-12 pr-6 text-sm outline-none focus:border-blue-500 transition-all text-white placeholder:text-slate-600 resize-none" onChange={e => setFormData({...formData, projectDetails: e.target.value})} />
                  </div>

                  <button disabled={isSubmitting} type="submit" className="w-full py-4 md:py-5 bg-white hover:bg-blue-600 text-black hover:text-white font-black uppercase tracking-[0.2em] rounded-xl md:rounded-2xl shadow-xl transition-all flex items-center justify-center gap-3 mt-4 text-[10px] md:text-xs group/btn">
                    {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <>Request Secure Contract <ShieldCheck size={16} className="group-hover/btn:scale-110 transition-transform" /></>}
                  </button>
                  <p className="text-[8px] md:text-[9px] text-center text-slate-500 uppercase tracking-widest mt-4">100% Escrow Protected • Instant WhatsApp Alert</p>
               </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
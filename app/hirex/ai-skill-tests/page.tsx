// app/hirex/ai-skill-tests/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import { 
  Terminal, Database, Cloud, Layout, Cpu, Code2, 
  Search, ArrowRight, ShieldCheck, Zap, BrainCircuit, 
  Timer, BarChart, Filter, MapPin, Phone, Mail, LineChart, Award,
  Camera, Lock, Eye
} from 'lucide-react';

const CATEGORIES = ["All", "Frontend", "Backend", "DevOps", "AI/ML", "Database"];

const SKILL_TESTS = [
  {
    id: "react-next-advanced",
    title: "Next.js & React Engineering",
    category: "Frontend",
    description: "Evaluate deep knowledge of SSR, RSC (React Server Components), performance optimization, and custom hooks.",
    icon: Layout,
    color: "text-blue-400",
    bgColor: "bg-blue-500/10",
    borderColor: "group-hover:border-blue-500/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]",
    duration: "45 Mins",
    difficulty: "Hard",
    questions: 25
  },
  {
    id: "node-system-design",
    title: "Node.js & System Design",
    category: "Backend",
    description: "Test architectural patterns, microservices, Socket.io real-time syncing, and event-driven backend engineering.",
    icon: Terminal,
    color: "text-emerald-400",
    bgColor: "bg-emerald-500/10",
    borderColor: "group-hover:border-emerald-500/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]",
    duration: "60 Mins",
    difficulty: "Expert",
    questions: 30
  },
  {
    id: "tidb-mysql-architect",
    title: "TiDB Cloud & MySQL Architect",
    category: "Database",
    description: "Distributed SQL databases, query optimization, ACID compliance, and handling high-concurrency transactions.",
    icon: Database,
    color: "text-cyan-400",
    bgColor: "bg-cyan-500/10",
    borderColor: "group-hover:border-cyan-500/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]",
    duration: "40 Mins",
    difficulty: "Hard",
    questions: 20
  },
  {
    id: "ai-generative-agents",
    title: "Generative AI & LLM Integration",
    category: "AI/ML",
    description: "Implement Gemini API, prompt engineering, RAG pipelines, and autonomous agent orchestration.",
    icon: BrainCircuit,
    color: "text-purple-400",
    bgColor: "bg-purple-500/10",
    borderColor: "group-hover:border-purple-500/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]",
    duration: "50 Mins",
    difficulty: "Expert",
    questions: 25
  },
  {
    id: "aws-cloud-devops",
    title: "AWS Cloud & DevOps",
    category: "DevOps",
    description: "CI/CD pipelines, Docker, Kubernetes, serverless architecture, and infrastructure as code (IaC).",
    icon: Cloud,
    color: "text-orange-400",
    bgColor: "bg-orange-500/10",
    borderColor: "group-hover:border-orange-500/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(251,146,60,0.2)]",
    duration: "45 Mins",
    difficulty: "Medium",
    questions: 20
  },
  {
    id: "core-dsa-logic",
    title: "Advanced Data Structures & Algorithms",
    category: "Backend",
    description: "Dynamic programming, graph theory, memory allocation, and highly optimized problem-solving.",
    icon: Code2,
    color: "text-red-400",
    bgColor: "bg-red-500/10",
    borderColor: "group-hover:border-red-500/50",
    glow: "group-hover:shadow-[0_0_30px_rgba(248,113,113,0.2)]",
    duration: "90 Mins",
    difficulty: "Expert",
    questions: 15
  }
];

export default function AISkillTestsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredTests = SKILL_TESTS.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          test.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === "All" || test.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 text-white bg-[#020617]">
      
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <section className="relative pt-32 pb-16 z-10 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-6">
              <Zap className="w-4 h-4" />
              Autonomous Verification
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
              AI Adaptive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300">Skill Tests</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed mb-8">
              Select your domain. Our Generative AI will create a dynamic, one-of-a-kind evaluation environment tailored to test your true engineering depth. No static questions. No predictable patterns.
            </p>
            
            <div className="inline-flex flex-col sm:flex-row items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-5 py-3 rounded-2xl">
              <ShieldCheck className="w-5 h-5 text-emerald-500 flex-shrink-0" />
              <span className="text-sm font-medium text-emerald-200/90 text-left sm:text-center">
                All skill tests are verified by Career Lab Consulting AI Engine and sync directly with your HireX Candidate Profile.
              </span>
            </div>
          </div>

          <div className="mt-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-4 bg-slate-900/50 backdrop-blur-xl p-2 md:p-3 rounded-3xl border border-white/10 shadow-2xl">
            
            <div className="relative w-full md:w-[40%] flex items-center bg-white/5 md:bg-transparent rounded-2xl md:rounded-none">
              <Search className="absolute left-4 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search stacks e.g. 'React', 'Node.js'..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none pl-12 pr-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
            </div>
            
            <div className="hidden md:block w-px h-10 bg-white/10"></div>
            
            <div className="w-full md:w-[60%] flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 md:px-0 pb-2 md:pb-0">
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
        </div>
      </section>

      <section className="relative py-16 z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filteredTests.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-white/5">
              <Terminal className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No skill tests found</h3>
              <p className="text-slate-400">Try adjusting your search criteria or category filter.</p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveCategory("All");}}
                className="mt-6 text-blue-400 hover:text-blue-300 text-sm font-bold underline underline-offset-4"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map((test) => (
                <div 
                  key={test.id} 
                  className={`group relative flex flex-col bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 ${test.borderColor} ${test.glow} cursor-pointer`}
                >
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
                  
                  <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl ${test.bgColor} border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <test.icon className={`w-7 h-7 ${test.color}`} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                      {test.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-200 transition-colors">
                    {test.title}
                  </h3>
                  
                  <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
                    {test.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 mb-6 border-t border-b border-white/5 py-4">
                    <div className="text-center">
                      <Timer className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                      <span className="text-xs font-bold text-slate-300">{test.duration}</span>
                    </div>
                    <div className="text-center border-l border-r border-white/5">
                      <BarChart className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                      <span className="text-xs font-bold text-slate-300">{test.difficulty}</span>
                    </div>
                    <div className="text-center">
                      <Cpu className="w-4 h-4 text-slate-500 mx-auto mb-1" />
                      <span className="text-xs font-bold text-slate-300">{test.questions} Qs</span>
                    </div>
                  </div>

                  <Link 
                    href={`/hirex/aptitude-test?skill=${test.id}`}
                    className="w-full inline-flex justify-center items-center gap-2 bg-white/5 hover:bg-blue-600 border border-white/10 hover:border-blue-500 text-white font-bold py-3.5 rounded-xl transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                  >
                    Start Assessment <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="relative py-16 z-10 bg-slate-900/30 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400">Your journey to a verified candidate profile in three simple steps.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl text-center hover:bg-white/[0.04] transition-colors">
              <div className="w-12 h-12 mx-auto bg-blue-500/10 rounded-full flex items-center justify-center mb-4 border border-blue-500/20 text-blue-400 font-bold text-xl">1</div>
              <h3 className="text-lg font-bold text-white mb-2">Select Domain</h3>
              <p className="text-slate-400 text-sm">Choose the technology stack you want to be evaluated on from our extensive grid.</p>
            </div>
            <div className="relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl text-center hover:bg-white/[0.04] transition-colors">
              <div className="w-12 h-12 mx-auto bg-purple-500/10 rounded-full flex items-center justify-center mb-4 border border-purple-500/20 text-purple-400 font-bold text-xl">2</div>
              <h3 className="text-lg font-bold text-white mb-2">Take AI Assessment</h3>
              <p className="text-slate-400 text-sm">Complete dynamically generated questions tailored to scale with your skill level.</p>
            </div>
            <div className="relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl text-center hover:bg-white/[0.04] transition-colors">
              <div className="w-12 h-12 mx-auto bg-emerald-500/10 rounded-full flex items-center justify-center mb-4 border border-emerald-500/20 text-emerald-400 font-bold text-xl">3</div>
              <h3 className="text-lg font-bold text-white mb-2">Get Verified</h3>
              <p className="text-slate-400 text-sm">Earn your badge and showcase your verified technical depth to top recruiters.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 z-10 border-t border-white/5 bg-slate-900/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
               <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
                 <ShieldCheck className="w-4 h-4" />
                 Secure Environment
               </div>
               <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Enterprise-Grade <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Integrity</span></h2>
               <p className="text-slate-400 mb-8 leading-relaxed text-lg">
                 Our AI doesn't just grade tests; it ensures a fair and secure environment. Every session is monitored autonomously to guarantee the true authenticity of your skill badge.
               </p>
               <ul className="space-y-5">
                 <li className="flex items-center gap-4 text-slate-300 font-medium">
                   <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-white/5">
                     <Lock className="w-5 h-5 text-emerald-400"/>
                   </div>
                   Tab-switch & Browser Lockdown
                 </li>
                 <li className="flex items-center gap-4 text-slate-300 font-medium">
                   <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-white/5">
                     <Eye className="w-5 h-5 text-blue-400"/>
                   </div>
                   AI Behavior & Gaze Tracking
                 </li>
                 <li className="flex items-center gap-4 text-slate-300 font-medium">
                   <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-white/5">
                     <Camera className="w-5 h-5 text-purple-400"/>
                   </div>
                   Real-time Identity Verification
                 </li>
               </ul>
            </div>
            
            <div className="w-full md:w-1/2 relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
               <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                 <img
                   src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop"
                   alt="AI Proctoring Security"
                   className="absolute inset-0 w-full h-full object-cover"
                 />
                 <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[3px]"></div>
                 
                 <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                   <div className="w-20 h-20 bg-emerald-500/20 backdrop-blur-md rounded-full border border-emerald-500/50 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(16,185,129,0.4)] animate-[pulse_2s_ease-in-out_infinite]">
                     <ShieldCheck className="w-10 h-10 text-emerald-400" />
                   </div>
                   <h3 className="text-white font-bold text-2xl tracking-tight mb-3">Proctoring Active</h3>
                   <p className="text-emerald-300 text-sm font-medium bg-emerald-500/10 px-4 py-1.5 rounded-full border border-emerald-500/20">Verified by Career Lab AI Engine</p>
                 </div>
               </div>
            </div>
            
          </div>
        </div>
      </section>

      <section className="relative py-12 z-10 border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-4 border border-blue-500/20">
                <BrainCircuit className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Adaptive Scoring</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Questions automatically scale in difficulty based on your real-time performance.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-4 border border-purple-500/20">
                <LineChart className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Instant Analytics</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Receive immediate, highly-detailed feedback identifying your technical strengths.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4 border border-emerald-500/20">
                <Award className="w-6 h-6 text-emerald-400" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">Verified Profiles</h3>
              <p className="text-slate-400 text-sm leading-relaxed">Pass the assessment to earn a verifiable skill badge directly on your HireX profile.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 z-10 border-t border-white/5 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Get In Touch</h2>
            <p className="text-slate-400">Need support regarding assessments or technical issues? Our team at Career Lab Consulting is here to help.</p>
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

      <Footer />
    </main>
  );
}
// app/hirex/ai-skill-tests/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import { 
  Terminal, Database, Cloud, Layout, Cpu, Code2, 
  Search, ArrowRight, ShieldCheck, Zap, BrainCircuit, 
  Timer, BarChart, Filter
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
      
      {/* Dynamic Background */}
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
            <p className="text-lg text-slate-400 leading-relaxed">
              Select your domain. Our Generative AI will create a dynamic, one-of-a-kind evaluation environment tailored to test your true engineering depth. No static questions. No predictable patterns.
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="mt-12 max-w-4xl mx-auto flex flex-col md:flex-row gap-4 items-center bg-slate-900/50 backdrop-blur-xl p-2 rounded-2xl border border-white/10 shadow-2xl">
            <div className="relative w-full md:w-1/2 flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-slate-500" />
              <input 
                type="text" 
                placeholder="Search stacks e.g. 'React', 'Node.js'..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none pl-12 pr-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="hidden md:block w-px h-8 bg-white/10"></div>
            <div className="w-full md:w-1/2 flex items-center gap-2 overflow-x-auto no-scrollbar pl-2 pb-2 md:pb-0">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
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

      {/* Test Grid Section */}
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

      <section className="relative py-12 z-10">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="inline-flex items-center gap-3 bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-2xl">
            <ShieldCheck className="w-6 h-6 text-emerald-500" />
            <span className="text-sm font-medium text-emerald-200">
              All skill tests are verified by Career Lab Consulting AI Engine and sync directly with your HireX Candidate Profile.
            </span>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
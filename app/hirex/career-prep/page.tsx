// app/hirex/career-prep/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import { 
  Brain, Terminal, Code2, Workflow, Sparkles, 
  CheckCircle2, PlayCircle, Timer, ChevronRight,
  BookOpen, MessageSquare, Cpu, BarChart3, 
  Zap, ShieldCheck, Trophy, Flame, Play, Star,
  TrendingUp, Users, ArrowRight,
  Layers
} from 'lucide-react';

const PREP_TABS = [
  { id: 'simulations', label: 'AI Simulations', icon: Cpu },
  { id: 'logic', label: 'Logic Puzzles', icon: Brain },
  { id: 'design', label: 'System Design', icon: Workflow },
  { id: 'interview-tips', label: 'Pro Tips', icon: MessageSquare },
];

export default function CareerPrepPage() {
  const [activeTab, setActiveTab] = useState('simulations');

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-full md:w-[600px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full -translate-x-1/4 translate-y-1/4" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          
          {/* Header Section */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6">
              <Sparkles className="w-4 h-4" /> Mastering the AI Assessment
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              Career <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Prep Hub</span>
            </h1>
            <p className="text-base md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
              Our AI interviewers are rigorous. Use this hub to simulate technical environments, solve logic-gate puzzles, and prepare for high-fidelity grading.
            </p>
          </div>

          {/* Navigation Tabs - Responsive Scrollable */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-1 p-1 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-x-auto no-scrollbar touch-pan-x">
              {PREP_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-1 justify-center ${
                    activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <tab.icon className="w-4 h-4 shrink-0" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Content Sections */}
          <div className="max-w-6xl mx-auto mb-24">
            {activeTab === 'simulations' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                    <Terminal className="text-blue-400 w-8 h-8" /> Code Sandbox
                  </h2>
                  <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed">
                    Practice coding in an environment that tracks your logic patterns, speed, and clean-code standards—exactly how the HireX AI agent does.
                  </p>
                  <button className="flex w-full sm:w-auto items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                    Launch Simulator <PlayCircle className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                    <Timer className="text-emerald-400 w-8 h-8" /> Blitz Round
                  </h2>
                  <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed">
                    Short, high-pressure technical questions designed to test your immediate recall of framework internals and optimization techniques.
                  </p>
                  <button className="flex w-full sm:w-auto items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-emerald-600/20">
                    Start Blitz <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'logic' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-6 sm:p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">Logical Gate Preparation</h2>
                    <p className="text-slate-400 leading-relaxed mb-8">
                      Autonomous hiring places a heavy emphasis on your logical reasoning capacity. These exercises focus on algorithmic complexity, data flow, and edge-case management.
                    </p>
                    <div className="space-y-4">
                      {[
                        "Complexity analysis for balanced trees",
                        "Race condition detection in Node.js",
                        "Query optimization for distributed SQL",
                        "Memory management in garbage-collected stacks"
                      ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-300">
                          <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0" />
                          <span className="text-sm md:text-base">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                      <Code2 className="text-purple-400 w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Practice Matrix</h4>
                    <p className="text-slate-500 text-[10px] sm:text-xs mb-6 uppercase tracking-widest font-mono">25 Interactive Puzzles</p>
                    <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">Start Solving</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/20">
                  <Workflow className="text-blue-400 w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">Scalable System Architecture</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed text-sm sm:text-base">
                  Learn how to design systems that handle millions of requests. We cover RAG pipelines, microservices orchestration, and low-latency data syncing.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
                   <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left hover:bg-white/[0.04] transition-colors cursor-pointer">
                      <h4 className="font-bold text-white mb-2">RAG Architecture</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Vector DBs and LLM context management.</p>
                   </div>
                   <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left hover:bg-white/[0.04] transition-colors cursor-pointer">
                      <h4 className="font-bold text-white mb-2">State Syncing</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Mastering WebSockets and Redis Pub/Sub.</p>
                   </div>
                   <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left hover:bg-white/[0.04] transition-colors cursor-pointer">
                      <h4 className="font-bold text-white mb-2">Data Resilience</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">Distributed SQL and TiDB patterns.</p>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'interview-tips' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-6 sm:p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">AI Interview Pro Tips</h2>
                    <ul className="space-y-6">
                      <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                          <span className="text-blue-400 font-bold text-sm">1</span>
                        </div>
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed"><span className="text-white font-bold">Verbalize your logic:</span> AI agents track how you arrive at a solution, not just the output.</p>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                          <span className="text-purple-400 font-bold text-sm">2</span>
                        </div>
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed"><span className="text-white font-bold">Avoid Copy-Paste:</span> The engine detects high-speed code insertion. Type your logic naturally.</p>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <span className="text-emerald-400 font-bold text-sm">3</span>
                        </div>
                        <p className="text-slate-400 text-sm sm:text-base leading-relaxed"><span className="text-white font-bold">Focus on Performance:</span> AI-graders prioritize time complexity and memory usage in simulations.</p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[2rem] border border-white/10 p-8 text-center shadow-inner mt-4 lg:mt-0">
                    <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-white/40 mx-auto mb-6" />
                    <h4 className="text-xl font-bold mb-2">Candidate Playbook</h4>
                    <p className="text-slate-400 text-xs sm:text-sm mb-8 leading-relaxed">Download our detailed PDF guide on mastering autonomous hiring cycles.</p>
                    <button className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                       Download Playbook
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* NEW SECTION 1: AI Evaluation Matrix */}
          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How the AI Evaluates You</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Transparency is key. Here are the core metrics our autonomous engine tracks during your assessment.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Clean Code", desc: "Modularity, naming conventions, and adherence to DRY principles.", icon: Code2, color: "blue" },
                { title: "Algorithmic Efficiency", desc: "Optimal Big-O time and space complexity for your solutions.", icon: Zap, color: "purple" },
                { title: "Edge Case Handling", desc: "Identifying and resolving nulls, bounds, and race conditions.", icon: ShieldCheck, color: "emerald" },
                { title: "System Thinking", desc: "Ability to map out microservices, databases, and APIs clearly.", icon: Layers, color: "orange" }
              ].map((metric, i) => (
                <div key={i} className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 hover:bg-slate-900/60 transition-colors">
                  <div className={`w-12 h-12 rounded-xl bg-${metric.color}-500/10 border border-${metric.color}-500/20 flex items-center justify-center mb-5`}>
                    <metric.icon className={`w-6 h-6 text-${metric.color}-400`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{metric.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{metric.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* NEW SECTION 2: Daily Micro-Challenge */}
          <section className="mb-24">
            <div className="bg-gradient-to-r from-blue-900/30 via-slate-900 to-purple-900/30 border border-blue-500/20 rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none"></div>
              
              <div className="relative z-10 lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-[10px] font-bold uppercase tracking-wider mb-4 animate-pulse">
                  <Flame className="w-3 h-3" /> Daily Challenge
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">Optimize the Render Cycle</h2>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">
                  A React component is re-rendering 50 times a second due to a stale closure. Fix the logic using `useMemo` or `useCallback` to achieve optimal frame rates.
                </p>
                <button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-8 rounded-xl transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  Solve & Earn 50 XP
                </button>
              </div>

              <div className="relative z-10 lg:w-1/2 w-full">
                <div className="bg-[#0b0f1f] rounded-2xl border border-white/10 p-4 shadow-xl">
                  <div className="flex gap-2 mb-3 border-b border-white/5 pb-3 px-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                  </div>
                  <pre className="text-xs md:text-sm font-mono text-slate-300 overflow-x-auto p-2">
                    <code>
                      <span className="text-purple-400">export default function</span> <span className="text-blue-300">Dashboard</span>() {'{\n'}
                      {'  '}<span className="text-slate-500">// Fix the performance leak here</span>{'\n'}
                      {'  '}<span className="text-purple-400">const</span> heavyData = processData(data);{'\n\n'}
                      {'  '}<span className="text-purple-400">return</span> {'(\n'}
                      {'    '}&lt;<span className="text-emerald-400">Chart</span> data={'{heavyData}'} /&gt;{'\n'}
                      {'  );\n}'}
                    </code>
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* NEW SECTION 3: Video Masterclasses */}
          <section className="mb-24">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Video Masterclasses</h2>
                <p className="text-slate-400">Learn directly from senior engineers who built the HireX AI.</p>
              </div>
              <Link href="#" className="text-blue-400 text-sm font-bold flex items-center gap-1 hover:text-blue-300 transition-colors">
                View Library <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "Cracking System Design with AI", time: "45:20", img: "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&auto=format&fit=crop&q=60" },
                { title: "Advanced Data Structures Review", time: "32:15", img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60" },
                { title: "Prompt Engineering for Interviews", time: "28:40", img: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60" }
              ].map((video, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-white/10 group-hover:border-blue-500/50 transition-colors">
                    <img src={video.img} alt={video.title} className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <Play className="w-5 h-5 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-mono text-white">
                      {video.time}
                    </div>
                  </div>
                  <h4 className="text-white font-bold mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">{video.title}</h4>
                  <p className="text-xs text-slate-500">HireX Engineering Team</p>
                </div>
              ))}
            </div>
          </section>

          {/* NEW SECTION 4: Global Leaderboard */}
          <section className="mb-24 max-w-4xl mx-auto">
            <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none"></div>
              
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl md:text-3xl font-bold flex items-center gap-3">
                  <Trophy className="text-yellow-400 w-8 h-8" /> Top Performers This Week
                </h2>
              </div>

              <div className="space-y-4">
                {[
                  { rank: 1, name: "Arjun S.", stack: "Full Stack React", score: 98, avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60" },
                  { rank: 2, name: "Priya M.", stack: "Backend Node.js", score: 96, avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60" },
                  { rank: 3, name: "David K.", stack: "Cloud & DevOps", score: 95, avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60" },
                ].map((user, i) => (
                  <div key={i} className="flex items-center justify-between bg-white/[0.02] border border-white/5 p-4 rounded-2xl hover:bg-white/[0.05] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-8 font-black text-center ${i === 0 ? 'text-yellow-400' : i === 1 ? 'text-slate-300' : 'text-orange-400'}`}>
                        #{user.rank}
                      </div>
                      <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full object-cover border border-white/10" />
                      <div>
                        <h4 className="font-bold text-white text-sm">{user.name}</h4>
                        <p className="text-xs text-slate-500">{user.stack}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-emerald-400" />
                      <span className="font-mono font-bold text-white">{user.score}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* NEW SECTION 5: Success Stories */}
          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">Candidate Success Stories</h2>
              <p className="text-slate-400">See how preparing on HireX fast-tracked these engineers into top roles.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { quote: "The Logic Puzzles here are exactly what the AI engine asks. I felt completely prepared and bypassed the recruiter screen entirely.", name: "Rahul T.", role: "Hired at FinTech Global" },
                { quote: "Practicing in the Code Sandbox taught me to verbalize my logic via comments. That single tip boosted my match score to 94%.", name: "Ananya V.", role: "Hired at Nexus Commerce" },
                { quote: "The System Design masterclasses broke down RAG pipelines perfectly. I nailed the architect round with ease.", name: "Michael R.", role: "Hired at HealthAI" }
              ].map((story, i) => (
                <div key={i} className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl relative">
                  <div className="flex gap-1 mb-4">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic mb-6">"{story.quote}"</p>
                  <div className="mt-auto">
                    <h4 className="font-bold text-white text-sm">{story.name}</h4>
                    <p className="text-xs text-emerald-400 mt-1">{story.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Final Quick Start CTA */}
          <div className="mt-10 max-w-4xl mx-auto p-8 md:p-10 rounded-3xl bg-blue-600 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-600/20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] relative overflow-hidden">
            <div className="absolute inset-0 bg-blue-600/90 mix-blend-overlay"></div>
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-white">Feeling Prepared?</h3>
              <p className="text-blue-100 text-sm md:text-base">Jump into a live AI skill test and start matching with enterprise roles.</p>
            </div>
            <Link href="/hirex/ai-skill-tests" className="relative z-10 whitespace-nowrap px-8 py-3.5 bg-white text-blue-600 font-bold rounded-xl hover:bg-slate-100 hover:scale-105 transition-all flex items-center gap-2 shadow-xl">
               Take a Live Test <ChevronRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </div>

      <Footer />

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </main>
  );
}
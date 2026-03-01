// app/hirex/career-prep/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import Link from 'next/link';
import { 
  Brain, 
  Terminal, 
  Code2, 
  Workflow, 
  Sparkles, 
  CheckCircle2, 
  PlayCircle, 
  Timer, 
  ChevronRight,
  BookOpen,
  MessageSquare,
  Cpu
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
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[400px] bg-blue-600/5 blur-[100px] rounded-full translate-x-1/4 -translate-y-1/4" />
        <div className="absolute bottom-0 left-0 w-full md:w-[600px] h-[400px] bg-purple-600/5 blur-[100px] rounded-full -translate-x-1/4 translate-y-1/4" />
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
            <p className="text-sm md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
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
          <div className="max-w-6xl mx-auto">
            
            {activeTab === 'simulations' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors" />
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                    <Terminal className="text-blue-400 w-8 h-8" /> Code Sandbox
                  </h2>
                  <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed">
                    Practice coding in an environment that tracks your logic patterns, speed, and clean-code standards—exactly how the HireX AI agent does.
                  </p>
                  <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20">
                    Launch Simulator <PlayCircle className="w-4 h-4" />
                  </button>
                </div>

                <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                    <Timer className="text-emerald-400 w-8 h-8" /> Blitz Round
                  </h2>
                  <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed">
                    Short, high-pressure technical questions designed to test your immediate recall of framework internals and optimization techniques.
                  </p>
                  <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg shadow-emerald-600/20">
                    Start Blitz <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'logic' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                  <div className="lg:col-span-2">
                    <h2 className="text-3xl font-bold mb-6">Logical Gate Preparation</h2>
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
                          <CheckCircle2 className="w-5 h-5 text-blue-500" />
                          <span className="text-sm md:text-base">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-3xl p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 border border-purple-500/20">
                      <Code2 className="text-purple-400 w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Practice Matrix</h4>
                    <p className="text-slate-500 text-xs mb-6 uppercase tracking-widest font-mono">25 Interactive Puzzles</p>
                    <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">Start Solving</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center">
                <div className="w-20 h-20 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-8 border border-blue-500/20">
                  <Workflow className="text-blue-400 w-10 h-10" />
                </div>
                <h2 className="text-3xl font-bold mb-4">Scalable System Architecture</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                  Learn how to design systems that handle millions of requests. We cover RAG pipelines, microservices orchestration, and low-latency data syncing.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                   <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left">
                      <h4 className="font-bold text-white mb-2">RAG Architecture</h4>
                      <p className="text-xs text-slate-500">Vector DBs and LLM context management.</p>
                   </div>
                   <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left">
                      <h4 className="font-bold text-white mb-2">State Syncing</h4>
                      <p className="text-xs text-slate-500">Mastering WebSockets and Redis Pub/Sub.</p>
                   </div>
                   <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left">
                      <h4 className="font-bold text-white mb-2">Data Resilience</h4>
                      <p className="text-xs text-slate-500">Distributed SQL and TiDB patterns.</p>
                   </div>
                </div>
              </div>
            )}

            {activeTab === 'interview-tips' && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h2 className="text-3xl font-bold mb-6">AI Interview Pro Tips</h2>
                    <ul className="space-y-6">
                      <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                          <span className="text-blue-400 font-bold text-sm">1</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed"><span className="text-white font-bold">Verbalize your logic:</span> AI agents track how you arrive at a solution, not just the output.</p>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center shrink-0">
                          <span className="text-purple-400 font-bold text-sm">2</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed"><span className="text-white font-bold">Avoid Copy-Paste:</span> The engine detects high-speed code insertion. Type your logic naturally.</p>
                      </li>
                      <li className="flex gap-4">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                          <span className="text-emerald-400 font-bold text-sm">3</span>
                        </div>
                        <p className="text-slate-400 text-sm leading-relaxed"><span className="text-white font-bold">Focus on Performance:</span> AI-graders prioritize time complexity and memory usage in simulations.</p>
                      </li>
                    </ul>
                  </div>
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 rounded-[2rem] border border-white/10 p-8 text-center">
                    <BookOpen className="w-16 h-16 text-white/40 mx-auto mb-6" />
                    <h4 className="text-xl font-bold mb-2">Candidate Playbook</h4>
                    <p className="text-slate-400 text-sm mb-8">Download our detailed PDF guide on mastering autonomous hiring cycles.</p>
                    <button className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                       Download Playbook
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Quick Start Assessment Redirect */}
          <div className="mt-20 max-w-4xl mx-auto p-8 rounded-3xl bg-blue-600 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl shadow-blue-600/20">
            <div>
              <h3 className="text-xl font-bold mb-1">Feeling Ready?</h3>
              <p className="text-blue-100 text-sm">Jump into a live AI skill test and start your application.</p>
            </div>
            <Link href="/hirex/ai-skill-tests" className="whitespace-nowrap px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all flex items-center gap-2">
               Take a Test <ChevronRight className="w-4 h-4" />
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
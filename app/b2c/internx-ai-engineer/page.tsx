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
  Users, Workflow, Lock, ExternalLink, Linkedin
} from 'lucide-react';

export default function InternXAI() {
  const [activeMonth, setActiveMonth] = useState(0);

  const curriculum = [
    {
      month: "Month 1: Foundation & Agentic Thinking",
      topics: ["Python for AI", "Prompt Engineering Mastery", "LLM Architectures", "API Integrations"],
      outcome: "Build your first autonomous script."
    },
    {
      month: "Month 2: The Orchestration Layer",
      topics: ["LangChain Framework", "Vector Databases (Pinecone/Chroma)", "RAG Pipelines", "Memory Management"],
      outcome: "Deploy a custom Knowledge-Base Bot."
    },
    {
      month: "Month 3: Multi-Agent Systems",
      topics: ["CrewAI & AutoGen", "Agent Task Delegation", "Error Handling in Agents", "State Machines"],
      outcome: "Build a 'Research-to-Article' agentic team."
    },
    {
      month: "Month 4-5: Real Startup Internship",
      topics: ["Live Project Assignment", "GitHub Collaborative Workflow", "Weekly Sprint Meetings", "Testing & Optimization"],
      outcome: "Submit production-grade code to a partner repo."
    },
    {
      month: "Month 6: ResumeNFT & Placement",
      topics: ["ResumeNFT Minting", "HireX Portfolio Setup", "AI Interview Prep", "Global Hiring Access"],
      outcome: "Signed job offer or Legal Guarantee activation."
    }
  ];

  const mentors = [
    {
      name: "Dr. Arshdeep Khurana",
      role: "AI Strategy & Frameworks",
      bio: "Ex-Big4 Consultant with expertise in scaling AI operations across global markets.",
      image: "/mentors/mentor1.jpg" // Replace with actual paths
    },
    {
      name: "Saurabh Kumar",
      role: "Lead Agentic Engineer",
      bio: "Expert in LangChain & CrewAI. Built automation systems for top-tier EdTech startups.",
      image: "/mentors/mentor2.jpg"
    },
    {
      name: "Ishita Sharma",
      role: "Placement & Hiring Head",
      bio: "Connecting InternX talent with hiring partners in UAE, Germany, and India.",
      image: "/mentors/mentor3.jpg"
    }
  ];

  return (
    <main className="min-h-screen bg-[#020617] text-white selection:bg-blue-500/30 font-sans">
      <B2CHeader />

      {/* --- HERO & PREVIOUS SECTIONS UNCHANGED --- */}
      {/* (Skipping to new sections for brevity, but you should keep the previous code around them) */}

      {/* --- TECHNICAL CURRICULUM (Brochure Page 12-14) --- */}
      <section className="py-24 px-6 bg-[#03081a]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">6-Month Roadmap</h2>
            <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">From Zero to Agentic Engineer</p>
          </div>

          <div className="space-y-4">
            {curriculum.map((item, i) => (
              <div 
                key={i} 
                className={`group border rounded-3xl transition-all duration-300 ${activeMonth === i ? 'bg-blue-600/10 border-blue-500/50' : 'bg-white/5 border-white/10'}`}
              >
                <button 
                  onClick={() => setActiveMonth(i)}
                  className="w-full flex items-center justify-between p-8 text-left"
                >
                  <div className="flex items-center gap-6">
                    <span className={`text-2xl font-black ${activeMonth === i ? 'text-blue-500' : 'text-slate-600'}`}>0{i+1}</span>
                    <h3 className="text-xl font-bold uppercase tracking-tight">{item.month}</h3>
                  </div>
                  <ChevronDown className={`w-6 h-6 transition-transform ${activeMonth === i ? 'rotate-180 text-blue-500' : 'text-slate-600'}`} />
                </button>
                
                {activeMonth === i && (
                  <div className="px-8 pb-8 pt-0 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in slide-in-from-top-2">
                    <div>
                      <h4 className="text-blue-400 text-[10px] font-black uppercase tracking-widest mb-4">Core Modules</h4>
                      <ul className="space-y-2">
                        {item.topics.map((topic, idx) => (
                          <li key={idx} className="flex items-center gap-3 text-sm text-slate-300">
                            <Code className="w-4 h-4 text-blue-500" /> {topic}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-white/5 rounded-2xl p-6 border border-white/5">
                      <h4 className="text-white text-[10px] font-black uppercase tracking-widest mb-2">Milestone Outcome</h4>
                      <p className="text-blue-400 font-bold italic">"{item.outcome}"</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- MEET THE MENTORS --- */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Expert Mentors</h2>
              <p className="text-slate-400">Learn from the architects who build AI systems for global companies.</p>
            </div>
            <div className="flex gap-4">
               <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <div className="text-2xl font-black">15+</div>
                  <div className="text-[8px] text-slate-500 uppercase font-black">AI Patents</div>
               </div>
               <div className="p-4 bg-white/5 border border-white/10 rounded-2xl text-center">
                  <div className="text-2xl font-black">50+</div>
                  <div className="text-[8px] text-slate-500 uppercase font-black">Global Projects</div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {mentors.map((mentor, i) => (
              <div key={i} className="group relative overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 hover:border-blue-500/50 transition-all">
                <div className="aspect-[4/5] bg-slate-800 relative grayscale group-hover:grayscale-0 transition-all duration-500">
                  <div className="absolute inset-0 flex items-center justify-center text-slate-700">
                    <Users className="w-20 h-20" />
                  </div>
                </div>
                <div className="p-8 relative">
                  <h3 className="text-2xl font-black uppercase mb-1">{mentor.name}</h3>
                  <p className="text-blue-500 text-[10px] font-black uppercase tracking-[0.2em] mb-4">{mentor.role}</p>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">{mentor.bio}</p>
                  <a href="#" className="inline-flex items-center gap-2 text-white/50 hover:text-blue-500 transition-colors">
                    <Linkedin className="w-4 h-4" /> <span className="text-[10px] font-bold uppercase tracking-widest">LinkedIn Profile</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div id="enroll">
        <PricingSection />
      </div>
      <Footer />
    </main>
  );
}
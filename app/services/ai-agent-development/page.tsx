'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, 
  Cpu, 
  Workflow, 
  Zap, 
  Terminal, 
  Network, 
  Send, 
  X, 
  Play, 
  ArrowRight, 
  Database,
  CheckCircle2,
  Loader2,
  Settings
} from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';

const agentFeatures = [
  {
    title: "Autonomous Decision Making",
    desc: "Agents that don't just follow scripts but use reasoning to solve complex user queries.",
    icon: <Cpu className="text-blue-400" />,
    tag: "Logic-Driven"
  },
  {
    title: "Multi-Tool Integration",
    desc: "Connect your agents to Gmail, Slack, Stripe, or your internal CRM for end-to-end task execution.",
    icon: <Workflow className="text-purple-400" />,
    tag: "Action-Oriented"
  },
  {
    title: "Self-Learning Memory",
    desc: "Our agents remember past interactions and user preferences to provide personalized experiences.",
    icon: <Database className="text-emerald-400" />,
    tag: "Context-Aware"
  }
];

export default function AIAgentDevelopment() {
  return (
    <div className="min-h-screen bg-[#020617] text-white font-sans selection:bg-blue-500/30">
      <Navbar portal="B2B" />

      <section className="relative pt-32 pb-24 px-6 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-blue-600/10 blur-[150px] -z-10 rounded-full" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 mb-8">
              <Network size={14} className="text-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-400">Agentic Workflows • Enterprise Grade</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black mb-8 leading-none tracking-tight">
              Hire Your <br/>First <br/> 
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-purple-600 bg-clip-text text-transparent">AI Employee.</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl mb-12 max-w-xl leading-relaxed">
              Automate customer success, sales outreach, and technical support with AI Agents that think, act, and communicate like your best team members.
            </p>
            <div className="flex flex-col sm:flex-row gap-5">
              <button className="px-10 py-5 bg-[#2563eb] text-white font-black rounded-2xl hover:bg-blue-500 transition-all flex items-center justify-center gap-3">
                Deploy an Agent <ArrowRight size={20} />
              </button>
              <button className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-3 backdrop-blur-md">
                <Play size={20} fill="white" /> See Agents in Action
              </button>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative hidden lg:block">
            <div className="relative z-10 rounded-[3rem] overflow-hidden border border-white/10 bg-slate-900 aspect-square shadow-2xl">
              <img src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg" className="w-full h-full object-cover opacity-40" alt="AI Employee" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
              
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-6 bg-slate-950/80 backdrop-blur-xl rounded-2xl border border-white/10 text-center min-w-[200px]">
                <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Agent Status</p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
                  <p className="text-2xl font-black italic text-white">99% Active</p>
                </div>
              </div>

              <div className="absolute bottom-8 right-8 p-6 bg-[#2563eb] rounded-3xl shadow-2xl">
                <Settings className="text-white animate-spin-slow mb-3" />
                <p className="text-3xl font-black text-white tracking-tighter">2.5M+</p>
                <p className="text-[10px] font-bold text-white/70 uppercase">Tasks Completed</p>
              </div>
            </div>
            <div className="absolute -inset-10 bg-blue-500/20 blur-[100px] -z-10 rounded-full" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6 relative bg-slate-900/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">The Future of <span className="text-[#2563eb]">Autonomy.</span></h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">Our agents leverage Advanced Reasoning Models to navigate enterprise complexity.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {agentFeatures.map((f, i) => (
              <motion.div key={i} whileHover={{ y: -10 }} className="p-10 rounded-[2.5rem] bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                <div className="w-14 h-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                  {f.icon}
                </div>
                <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest bg-blue-400/10 px-3 py-1 rounded-full mb-4 inline-block">{f.tag}</span>
                <h3 className="text-2xl font-black mb-4 tracking-tight">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-black/40">
        <div className="max-w-7xl mx-auto rounded-[3rem] bg-gradient-to-br from-[#1e40af] to-[#7e22ce] p-10 md:p-20 relative overflow-hidden">
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-8 tracking-tighter">One Agent. <br/>Infinite Integrations.</h2>
              <ul className="space-y-4 text-white/90">
                <li className="flex items-center gap-3 font-bold"><CheckCircle2 className="text-emerald-400" /> Instant Tool-Calling capability</li>
                <li className="flex items-center gap-3 font-bold"><CheckCircle2 className="text-emerald-400" /> Enterprise Data Connectors</li>
                <li className="flex items-center gap-3 font-bold"><CheckCircle2 className="text-emerald-400" /> Human-in-the-loop validation</li>
              </ul>
            </div>
            <div className="bg-slate-950/60 backdrop-blur-xl border border-white/10 rounded-[2rem] p-6 font-mono text-xs">
              <div className="flex gap-2 mb-4 border-b border-white/10 pb-4">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                <span className="text-[10px] text-white/40 ml-4">Agent_Logic.js</span>
              </div>
              <pre className="text-blue-300">
                {`async function deployAgent(task) {
  const context = await fetchKnowledgeBase();
  const reasoning = await model.reason(task, context);
  
  if (reasoning.confidence > 0.92) {
    return await executeAction(reasoning.tool);
  } else {
    return await askHuman(reasoning.doubts);
  }
}`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BookOpen, GraduationCap, Code2, Brain, Headphones,
  ArrowRight, Play, Layers, BarChart3, Award, Sparkles,
  Globe, Zap, Target, ChevronRight, Monitor, Cpu
} from 'lucide-react';
import Navbar from "@/components/product/Navbar";
const Footer = dynamic(() => import("@/components/product/Footer"));
import PricingSection from '@/components/product/B2BPricingSection';
import CTAModal from '@/components/product/CTAModel';
import dynamic from 'next/dynamic';
import WhatsAppButton from '@/components/product/WhatsAppButton';

function Counter({ to, suffix = '', duration = 5000 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0; const step = to / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); } else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const FEATURES = [
  {
    icon: Globe,
    title: "Immersive AR/VR 3D Environments",
    desc: "Leave behind flat video lessons. LMS-X renders fully interactive 3D learning environments where students walk through human anatomy, assemble circuit boards, or practice surgical procedures — all from a browser.",
    accent: "#06b6d4"
  },
  {
    icon: Brain,
    title: "Adaptive AI Mentor",
    desc: "Every learner gets a personal AI tutor that analyzes their learning pace, knowledge gaps, and preferred style. It adjusts difficulty in real-time, re-explains concepts in different formats, and predicts drop-off risks before they happen.",
    accent: "#8b5cf6"
  },
  {
    icon: Code2,
    title: "Integrated Live Code Editor",
    desc: "Built-in IDE with 40+ language support, intelligent autocomplete, instant test execution, and AI code review. Students submit, run, and debug code directly inside the lesson — no external tools needed.",
    accent: "#10b981"
  },
  {
    icon: BarChart3,
    title: "Learner Analytics & Skill Mapping",
    desc: "Visualize individual and cohort progress on interactive skill maps. Track completion rates, time-on-task, quiz performance, and predicted certification outcomes. Export reports for compliance and accreditation.",
    accent: "#f59e0b"
  },
  {
    icon: Award,
    title: "Verified Credential Engine",
    desc: "Issue blockchain-verified certificates and skill badges upon course completion. Credentials are tamper-proof, shareable on LinkedIn, and verifiable by employers in real-time — adding real value to every qualification.",
    accent: "#ef4444"
  },
  {
    icon: Headphones,
    title: "AI Voice & Conversational Tutor",
    desc: "Students can have real spoken conversations with their AI tutor. Ask questions verbally, get explanations, debate concepts — like having a PhD mentor available 24/7 in any language.",
    accent: "#2563eb"
  }
];

const STATS = [
  { value: 4.8, suffix: 'x', label: 'Faster Learning', sub: 'Vs traditional LMS' },
  { value: 92, suffix: '%', label: 'Completion Rate', sub: 'Industry avg is 15%' },
  { value: 150, suffix: '+', label: 'Course Templates', sub: 'Ready to deploy' },
  { value: 1200, suffix: '+', label: 'Institutions', sub: 'Running LMS-X today' },
];

const MODULES = [
  { icon: Monitor, label: '3D Environments', color: '#06b6d4' },
  { icon: Brain, label: 'AI Mentor', color: '#8b5cf6' },
  { icon: Code2, label: 'Code Editor', color: '#10b981' },
  { icon: Award, label: 'Certifications', color: '#f59e0b' },
  { icon: BarChart3, label: 'Analytics', color: '#2563eb' },
  { icon: Headphones, label: 'Voice Tutor', color: '#ef4444' },
];

export default function LMSXPage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeModule, setActiveModule] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActiveModule(v => (v + 1) % MODULES.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <main className="bg-[#020617] min-h-screen font-sans overflow-x-hidden">
        <Navbar/>
      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 px-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-40 right-0 w-[800px] h-[600px] rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)', filter: 'blur(80px)' }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(to right, rgba(6,182,212,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 my-5 md:my-4">
                <Sparkles size={11} className="text-cyan-400" />
                <span className="text-cyan-400 text-[9px] font-black uppercase tracking-[0.3em]">Next-Gen Learning Platform</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-6xl sm:text-7xl xl:text-9xl font-black text-white leading-none tracking-wide mb-4">
                LMS
                <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-400 to-blue-500">—X</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                className="text-xl md:text-3xl font-black uppercase tracking-tight mb-6">
                <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-cyan-400 to-blue-400">Learn Deeper.</span>{' '}
                <span className="text-slate-400">Move Faster.</span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                LMS-X reimagines education with immersive AR/VR 3D environments, a personal AI mentor for every learner, and an in-browser code editor. It's the learning platform built for the next generation of professionals.
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 mb-10">
                <button onClick={() => setModalOpen(true)}
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl shadow-cyan-900/30">
                  Deploy LMS-X <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={`https://wa.me/919810984968?text=${encodeURIComponent(
                    "Hello! I'm interested in LMS-X and would like to explore module."
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366]"
                >
                  {/* Original WhatsApp Logo */}
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-whatsapp" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>

                  WhatsApp Demo
                </a>
              </motion.div>

              {/* Module pills */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                className="flex flex-wrap gap-2">
                {MODULES.map((mod, i) => (
                  <div key={mod.label}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase tracking-widest transition-all duration-500
                      ${activeModule === i ? 'scale-105 text-white' : 'border-white/10 bg-white/[0.02] text-slate-600'}`}
                    style={activeModule === i ? { borderColor: mod.color + '60', backgroundColor: mod.color + '15', color: mod.color } : {}}>
                    <mod.icon size={10} />
                    {mod.label}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* Right — Learning UI Mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <div className="bg-[#0B1121] border border-white/10 rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.12)]">
                {/* Top bar */}
                <div className="flex items-center justify-between p-4 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center">
                      <Brain size={13} className="text-cyan-400" />
                    </div>
                    <span className="text-white text-[10px] font-black">AI Mentor</span>
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse ml-1" />
                  </div>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Module 4 of 12</span>
                </div>

                {/* Course progress */}
                <div className="p-5">
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Advanced React Patterns</p>
                  <h3 className="text-white font-black text-lg mb-4 leading-tight">Context API & State Management</h3>

                  <div className="relative h-40 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 rounded-2xl border border-cyan-500/20 flex items-center justify-center mb-4 overflow-hidden">
                    <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, rgba(6,182,212,0.4), transparent 50%), radial-gradient(circle at 70% 50%, rgba(37,99,235,0.4), transparent 50%)' }} />
                    <div className="relative z-10 text-center">
                      <p className="text-cyan-400 text-[9px] font-black uppercase tracking-widest mb-2">3D Interactive Scene</p>
                      <div className="w-16 h-16 border-2 border-cyan-400/30 rounded-2xl mx-auto flex items-center justify-center">
                        <Cpu size={24} className="text-cyan-400 opacity-60" />
                      </div>
                      <p className="text-slate-500 text-[9px] mt-2">Component Lifecycle Diagram</p>
                    </div>
                  </div>

                  <div className="bg-[#0d1a2e] rounded-xl p-3 border border-cyan-900/30 font-mono text-[10px] mb-4">
                    <div className="text-slate-600 mb-1">// Practice: Implement Context Provider</div>
                    <div className="text-cyan-400">const <span className="text-white">ThemeContext</span> = createContext(<span className="text-green-400">null</span>);</div>
                    <div className="text-slate-600 animate-pulse mt-1">| ▊</div>
                  </div>

                  <div className="flex gap-3">
                    {['Completed', 'In Progress', 'Locked'].map((s, i) => (
                      <div key={s} className={`flex-1 py-2 rounded-lg text-[9px] font-black text-center uppercase tracking-wider ${
                        i === 0 ? 'bg-green-500/10 border border-green-500/20 text-green-400' :
                        i === 1 ? 'bg-cyan-500/10 border border-cyan-500/30 text-cyan-400' :
                        'bg-white/[0.02] border border-white/5 text-slate-700'}`}>
                        {s}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-white mb-2 tabular-nums">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <p className="text-slate-600 text-[10px]">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[9px] font-black tracking-[0.3em] uppercase mb-6">
              <Zap size={11} /> Learning Modules
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              Built for the Future<br />
              <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-cyan-400 to-blue-400">of Learning</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {FEATURES.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-7 rounded-3xl bg-white/[0.02] border border-white/8 hover:border-cyan-500/30 transition-all duration-500 hover:-translate-y-2">
                <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 border"
                  style={{ backgroundColor: feat.accent + '15', borderColor: feat.accent + '40' }}>
                  <feat.icon size={20} style={{ color: feat.accent }} />
                </div>
                <h2 className="text-white font-black text-base mb-3 tracking-tight">{feat.title}</h2>
                <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-[9px] font-black tracking-[0.3em] uppercase mb-8">
                The Learning Loop
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
                Personalized to every<br />
                <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-cyan-400 to-blue-400">learner's needs.</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                LMS-X starts by building a learner profile — assessing prior knowledge, learning style preferences, and career goals. From this profile, it constructs a personalized curriculum path that evolves with the learner.
              </p>
              <p className="text-slate-400 text-base leading-relaxed mb-6">
                The AI mentor delivers content in multiple modalities: interactive 3D scenes for visual learners, code challenges for kinesthetic learners, and conversational explanations for those who learn by questioning.
              </p>
              <p className="text-slate-400 text-base leading-relaxed">
                Upon completion, verified blockchain credentials are issued instantly — recognized by employers globally. The entire journey, from enrollment to certification, is streamlined, engaging, and measurably effective.
              </p>
              <WhatsAppButton
                message="Hi, I'm interested in LMS-X and would like to explore how it personalizes learning journeys and issues verified certifications."
                buttonText="Explore LMS-X"
                gradientFrom="from-cyan-500"
                gradientTo="to-blue-500"
                hoverFrom="hover:from-cyan-400"
                hoverTo="hover:to-blue-400"
                shadowColor="shadow-[0_0_40px_rgba(6,182,212,0.3)]"
                hoverShadowColor="hover:shadow-[0_0_60px_rgba(6,182,212,0.5)]"
                className="mt-8"
                />
            </div>
            <div className="space-y-4">
              {[
                { step: '01', title: 'Learner Onboarding', desc: 'Diagnostic assessment establishes baseline knowledge and builds a personalized learning profile in minutes.', color: '#06b6d4' },
                { step: '02', title: 'Adaptive Curriculum', desc: 'AI generates a custom course path selecting relevant modules, difficulty levels, and optimal pacing.', color: '#8b5cf6' },
                { step: '03', title: 'Immersive Learning', desc: '3D environments, code challenges, AI tutoring sessions, and multimedia content deliver deep understanding.', color: '#10b981' },
                { step: '04', title: 'Progress Tracking', desc: 'Continuous skill mapping and micro-assessments identify gaps and adjust the learning path dynamically.', color: '#f59e0b' },
                { step: '05', title: 'Certification', desc: 'Blockchain-verified credentials are issued upon completion and immediately shareable to professional networks.', color: '#2563eb' },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-white/15 transition-all group">
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[14px] font-black"
                    style={{ backgroundColor: step.color + '20', color: step.color, border: `1px solid ${step.color}40` }}>
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm mb-1">{step.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PricingSection />

      <section className="py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-[2.5rem] bg-gradient-to-br from-cyan-600/10 via-blue-700/10 to-indigo-800/10 border border-cyan-500/20 text-center overflow-hidden">
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full opacity-20"
              style={{ background: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                Reimagine Learning<br />
                <span className="text-transparent  bg-clip-text bg-gradient-to-r italic from-cyan-400 to-blue-400">at Your Institution</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
                Deploy LMS-X and watch completion rates, learner satisfaction, and career outcomes transform within 90 days.
              </p>
              <button onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] transition-all shadow-2xl shadow-cyan-900/40">
                Get Started <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="LMS-X" productTagline="Immersive Learning Intelligence" accentColor="#06b6d4" />
        <Footer/>
    </main>
  );
}
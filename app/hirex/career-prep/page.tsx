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
  Users, ArrowRight, Layers
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── Types ─────────────────────────────────────────────────────────────────────
interface ChecklistItem { text: string }
interface MetricCard    { title: string; desc: string; icon: string; color: string }
interface VideoItem     { title: string; time: string; img: string }
interface LeaderItem    { rank: number; name: string; stack: string; score: number; avatar: string }
interface StoryItem     { quote: string; name: string; role: string }
interface SystemDesignCard { title: string; desc: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Icon maps ─────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Code2, Zap, ShieldCheck, Layers, Brain, Terminal, Workflow, Cpu,
  BarChart3, MessageSquare, Trophy, Flame, Star, Users, ArrowRight,
};

// ── Default JSON ──────────────────────────────────────────────────────────────
const DEFAULT_CHECKLIST = JSON.stringify([
  { text: 'Complexity analysis for balanced trees' },
  { text: 'Race condition detection in Node.js' },
  { text: 'Query optimization for distributed SQL' },
  { text: 'Memory management in garbage-collected stacks' },
]);

const DEFAULT_METRICS = JSON.stringify([
  { title: 'Clean Code',            desc: 'Modularity, naming conventions, and adherence to DRY principles.',         icon: 'Code2',      color: 'blue'    },
  { title: 'Algorithmic Efficiency',desc: 'Optimal Big-O time and space complexity for your solutions.',              icon: 'Zap',        color: 'purple'  },
  { title: 'Edge Case Handling',    desc: 'Identifying and resolving nulls, bounds, and race conditions.',            icon: 'ShieldCheck',color: 'emerald' },
  { title: 'System Thinking',       desc: 'Ability to map out microservices, databases, and APIs clearly.',          icon: 'Layers',     color: 'orange'  },
]);

const DEFAULT_VIDEOS = JSON.stringify([
  { title: 'Cracking System Design with AI', time: '45:20', img: 'https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=800&auto=format&fit=crop&q=60' },
  { title: 'Advanced Data Structures Review', time: '32:15', img: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60' },
  { title: 'Prompt Engineering for Interviews', time: '28:40', img: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop&q=60' },
]);

const DEFAULT_LEADERS = JSON.stringify([
  { rank: 1, name: 'Arjun S.',  stack: 'Full Stack React',  score: 98, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=60' },
  { rank: 2, name: 'Priya M.', stack: 'Backend Node.js',   score: 96, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=60' },
  { rank: 3, name: 'David K.', stack: 'Cloud & DevOps',    score: 95, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60' },
]);

const DEFAULT_STORIES = JSON.stringify([
  { quote: 'The Logic Puzzles here are exactly what the AI engine asks. I felt completely prepared and bypassed the recruiter screen entirely.', name: 'Rahul T.',   role: 'Hired at FinTech Global'  },
  { quote: 'Practicing in the Code Sandbox taught me to verbalize my logic via comments. That single tip boosted my match score to 94%.',       name: 'Ananya V.', role: 'Hired at Nexus Commerce'  },
  { quote: 'The System Design masterclasses broke down RAG pipelines perfectly. I nailed the architect round with ease.',                       name: 'Michael R.',role: 'Hired at HealthAI'        },
]);

const DEFAULT_DESIGN_CARDS = JSON.stringify([
  { title: 'RAG Architecture', desc: 'Vector DBs and LLM context management.'     },
  { title: 'State Syncing',    desc: 'Mastering WebSockets and Redis Pub/Sub.'    },
  { title: 'Data Resilience',  desc: 'Distributed SQL and TiDB patterns.'         },
]);

const PREP_TABS = [
  { id: 'simulations',    label: 'AI Simulations',  icon: Cpu      },
  { id: 'logic',          label: 'Logic Puzzles',   icon: Brain    },
  { id: 'design',         label: 'System Design',   icon: Workflow },
  { id: 'interview-tips', label: 'Pro Tips',        icon: MessageSquare },
];

export default function CareerPrepPage() {
  const [activeTab, setActiveTab] = useState('simulations');
  const { get } = usePageContent('hirex-career-prep');

  // ── CMS values ─────────────────────────────────────────────────────────────
  // Hero
  const heroBadge        = get('hero', 'badge_text',       'Mastering the AI Assessment');
  const heroTitle        = get('hero', 'headline_plain',   'Career');
  const heroTitleAccent  = get('hero', 'headline_accent',  'Prep Hub');
  const heroBody         = get('hero', 'body_text',        'Our AI interviewers are rigorous. Use this hub to simulate technical environments, solve logic-gate puzzles, and prepare for high-fidelity grading.');
  const accentFrom       = get('hero', 'accent_from',      '#3b82f6');
  const accentTo         = get('hero', 'accent_to',        '#34d399');

  // Sandbox
  const sandboxTitle     = get('sandbox', 'title',         'Code Sandbox');
  const sandboxBody      = get('sandbox', 'body_text',     'Practice coding in an environment that tracks your logic patterns, speed, and clean-code standards—exactly how the HireX AI agent does.');
  const sandboxBtn       = get('sandbox', 'btn_label',     'Launch Simulator');
  const blitzTitle       = get('sandbox', 'blitz_title',   'Blitz Round');
  const blitzBody        = get('sandbox', 'blitz_body',    'Short, high-pressure technical questions designed to test your immediate recall of framework internals and optimization techniques.');
  const blitzBtn         = get('sandbox', 'blitz_btn',     'Start Blitz');

  // Logic
  const logicTitle       = get('logic', 'headline',        'Logical Gate Preparation');
  const logicBody        = get('logic', 'body_text',       'Autonomous hiring places a heavy emphasis on your logical reasoning capacity. These exercises focus on algorithmic complexity, data flow, and edge-case management.');
  const checklistItems   = safeParse<ChecklistItem[]>(get('logic', 'checklist_json', DEFAULT_CHECKLIST), []);
  const puzzleCount      = get('logic', 'puzzle_count',    '25 Interactive Puzzles');

  // System design
  const designTitle      = get('design', 'headline',       'Scalable System Architecture');
  const designBody       = get('design', 'body_text',      'Learn how to design systems that handle millions of requests. We cover RAG pipelines, microservices orchestration, and low-latency data syncing.');
  const designCards      = safeParse<SystemDesignCard[]>(get('design', 'cards_json', DEFAULT_DESIGN_CARDS), []);

  // Tips
  const tipsTitle        = get('tips', 'headline',         'AI Interview Pro Tips');
  const tip1             = get('tips', 'tip_1',            'Verbalize your logic: AI agents track how you arrive at a solution, not just the output.');
  const tip2             = get('tips', 'tip_2',            'Avoid Copy-Paste: The engine detects high-speed code insertion. Type your logic naturally.');
  const tip3             = get('tips', 'tip_3',            'Focus on Performance: AI-graders prioritize time complexity and memory usage in simulations.');
  const playbookTitle    = get('tips', 'playbook_title',   'Candidate Playbook');
  const playbookBody     = get('tips', 'playbook_body',    'Download our detailed PDF guide on mastering autonomous hiring cycles.');
  const playbookBtn      = get('tips', 'playbook_btn',     'Download Playbook');

  // Metrics
  const metricsTitle     = get('metrics', 'headline',      'How the AI Evaluates You');
  const metricsBody      = get('metrics', 'body_text',     'Transparency is key. Here are the core metrics our autonomous engine tracks during your assessment.');
  const metricCards      = safeParse<MetricCard[]>(get('metrics', 'cards_json', DEFAULT_METRICS), []);

  // Daily challenge
  const challengeTitle   = get('challenge', 'headline',    'Optimize the Render Cycle');
  const challengeBody    = get('challenge', 'body_text',   "A React component is re-rendering 50 times a second due to a stale closure. Fix the logic using `useMemo` or `useCallback` to achieve optimal frame rates.");
  const challengeBtn     = get('challenge', 'btn_label',   'Solve & Earn 50 XP');

  // Videos
  const videosTitle      = get('videos', 'headline',       'Video Masterclasses');
  const videosBody       = get('videos', 'body_text',      'Learn directly from senior engineers who built the HireX AI.');
  const videoItems       = safeParse<VideoItem[]>(get('videos', 'items_json', DEFAULT_VIDEOS), []);

  // Leaderboard
  const leaderTitle      = get('leaderboard', 'headline',  'Top Performers This Week');
  const leaderItems      = safeParse<LeaderItem[]>(get('leaderboard', 'items_json', DEFAULT_LEADERS), []);

  // Stories
  const storiesTitle     = get('stories', 'headline',      'Candidate Success Stories');
  const storiesBody      = get('stories', 'body_text',     'See how preparing on HireX fast-tracked these engineers into top roles.');
  const storyItems       = safeParse<StoryItem[]>(get('stories', 'items_json', DEFAULT_STORIES), []);

  // CTA
  const ctaTitle         = get('cta', 'headline',          'Feeling Prepared?');
  const ctaBody          = get('cta', 'body_text',         'Jump into a live AI skill test and start matching with enterprise roles.');
  const ctaBtn           = get('cta', 'btn_label',         'Take a Live Test');
  const ctaLink          = get('cta', 'btn_link',          '/hirex/ai-skill-tests');

  return (
    <main className="min-h-screen relative overflow-hidden bg-[#020617] text-white selection:bg-blue-500/30">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-full md:w-[800px] h-[400px]"
          style={{ background: `${accentFrom}1a`, filter: 'blur(120px)', borderRadius: '50%', transform: 'translate(25%, -25%)' }} />
        <div className="absolute bottom-0 left-0 w-full md:w-[600px] h-[400px]"
          style={{ background: `${accentTo}1a`, filter: 'blur(120px)', borderRadius: '50%', transform: 'translate(-25%, 25%)' }} />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      <div className="relative z-10 pt-28 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── HERO ─────────────────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-[10px] md:text-xs font-mono uppercase tracking-widest mb-6"
              style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33`, color: accentFrom }}>
              <Sparkles className="w-4 h-4" /> {heroBadge}
            </div>
            <h1 className="text-4xl md:text-7xl font-black tracking-tight mb-6 leading-tight">
              {heroTitle}{' '}
              <span className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}>
                {heroTitleAccent}
              </span>
            </h1>
            <p className="text-base md:text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">{heroBody}</p>
          </div>

          {/* ── TABS ─────────────────────────────────────────────────────── */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="flex items-center gap-1 p-1 bg-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-x-auto no-scrollbar touch-pan-x">
              {PREP_TABS.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl text-xs md:text-sm font-bold transition-all whitespace-nowrap flex-1 justify-center"
                  style={activeTab === tab.id
                    ? { background: accentFrom, color: '#fff', boxShadow: `0 10px 20px ${accentFrom}40` }
                    : { color: '#64748b' }}>
                  <tab.icon className="w-4 h-4 shrink-0" /> {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── TAB CONTENT ──────────────────────────────────────────────── */}
          <div className="max-w-6xl mx-auto mb-24">

            {activeTab === 'simulations' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-12 relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full group-hover:opacity-100 transition-colors pointer-events-none"
                    style={{ background: `${accentFrom}1a`, filter: 'blur(40px)' }} />
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                    <Terminal style={{ color: accentFrom }} className="w-8 h-8" /> {sandboxTitle}
                  </h2>
                  <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed">{sandboxBody}</p>
                  <button className="flex w-full sm:w-auto items-center justify-center gap-2 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
                    style={{ background: accentFrom, boxShadow: `0 10px 20px ${accentFrom}40` }}>
                    {sandboxBtn} <PlayCircle className="w-4 h-4" />
                  </button>
                </div>
                <div className="bg-slate-900/40 backdrop-blur-md border border-white/10 rounded-[2rem] p-8 md:p-12">
                  <h2 className="text-2xl md:text-3xl font-bold mb-6 flex items-center gap-3">
                    <Timer style={{ color: accentTo }} className="w-8 h-8" /> {blitzTitle}
                  </h2>
                  <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed">{blitzBody}</p>
                  <button className="flex w-full sm:w-auto items-center justify-center gap-2 text-white font-bold px-6 py-3.5 rounded-xl transition-all"
                    style={{ background: accentTo, boxShadow: `0 10px 20px ${accentTo}40` }}>
                    {blitzBtn} <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'logic' && (
              <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-6 sm:p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                  <div className="lg:col-span-2">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6">{logicTitle}</h2>
                    <p className="text-slate-400 leading-relaxed mb-8">{logicBody}</p>
                    <div className="space-y-4">
                      {checklistItems.map((item, i) => (
                        <div key={i} className="flex items-center gap-3 text-slate-300">
                          <CheckCircle2 className="w-5 h-5 shrink-0" style={{ color: accentFrom }} />
                          <span className="text-sm md:text-base">{item.text}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-black/40 border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border"
                      style={{ background: `${accentTo}1a`, borderColor: `${accentTo}33` }}>
                      <Code2 style={{ color: accentTo }} className="w-8 h-8" />
                    </div>
                    <h4 className="text-xl font-bold mb-2">Practice Matrix</h4>
                    <p className="text-slate-500 text-[10px] sm:text-xs mb-6 uppercase tracking-widest font-mono">{puzzleCount}</p>
                    <button className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 transition-colors">Start Solving</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'design' && (
              <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12 text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center mx-auto mb-8 border"
                  style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
                  <Workflow style={{ color: accentFrom }} className="w-8 h-8 sm:w-10 sm:h-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-4">{designTitle}</h2>
                <p className="text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed text-sm sm:text-base">{designBody}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 max-w-4xl mx-auto">
                  {designCards.map((card, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 text-left hover:bg-white/[0.04] transition-colors cursor-pointer">
                      <h4 className="font-bold text-white mb-2">{card.title}</h4>
                      <p className="text-xs text-slate-400 leading-relaxed">{card.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'interview-tips' && (
              <div className="bg-slate-900/60 border border-white/10 rounded-[2.5rem] p-6 sm:p-8 md:p-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">{tipsTitle}</h2>
                    <ul className="space-y-6">
                      {[
                        { num: '1', color: accentFrom, text: tip1 },
                        { num: '2', color: accentTo,   text: tip2 },
                        { num: '3', color: '#a855f7',  text: tip3 },
                      ].map((tip, i) => (
                        <li key={i} className="flex gap-4">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                            style={{ background: `${tip.color}33` }}>
                            <span className="font-bold text-sm" style={{ color: tip.color }}>{tip.num}</span>
                          </div>
                          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                            <span className="text-white font-bold">{tip.text.split(':')[0]}:</span>{tip.text.split(':').slice(1).join(':')}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-[2rem] border border-white/10 p-8 text-center shadow-inner mt-4 lg:mt-0"
                    style={{ background: `linear-gradient(to bottom right, ${accentFrom}33, ${accentTo}33)` }}>
                    <BookOpen className="w-12 h-12 sm:w-16 sm:h-16 text-white/40 mx-auto mb-6" />
                    <h4 className="text-xl font-bold mb-2">{playbookTitle}</h4>
                    <p className="text-slate-400 text-xs sm:text-sm mb-8 leading-relaxed">{playbookBody}</p>
                    <button className="w-full bg-white text-black font-bold py-3.5 rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2">
                      {playbookBtn}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ── AI EVALUATION METRICS ─────────────────────────────────────── */}
          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{metricsTitle}</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">{metricsBody}</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {metricCards.map((m, i) => {
                const Icon = ICON_MAP[m.icon] ?? Zap;
                return (
                  <div key={i} className="bg-slate-900/40 border border-white/5 rounded-3xl p-6 hover:bg-slate-900/60 transition-colors">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 border"
                      style={{ background: `${accentFrom}1a`, borderColor: `${accentFrom}33` }}>
                      <Icon className="w-6 h-6" style={{ color: accentFrom }} />
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{m.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{m.desc}</p>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ── DAILY CHALLENGE ──────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="border rounded-[2.5rem] p-8 md:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden"
              style={{ background: `linear-gradient(to right, ${accentFrom}33, #0f172a, ${accentTo}33)`, borderColor: `${accentFrom}33` }}>
              <div className="relative z-10 lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider mb-4 animate-pulse"
                  style={{ background: '#ef444433', borderColor: '#ef444433', color: '#f87171' }}>
                  <Flame className="w-3 h-3" /> Daily Challenge
                </div>
                <h2 className="text-3xl font-bold text-white mb-4">{challengeTitle}</h2>
                <p className="text-slate-300 text-sm mb-6 leading-relaxed">{challengeBody}</p>
                <button className="w-full sm:w-auto text-white font-bold py-3.5 px-8 rounded-xl transition-all"
                  style={{ background: accentFrom, boxShadow: `0 0 20px ${accentFrom}80` }}>
                  {challengeBtn}
                </button>
              </div>
              <div className="relative z-10 lg:w-1/2 w-full">
                <div className="bg-[#0b0f1f] rounded-2xl border border-white/10 p-4 shadow-xl">
                  <div className="flex gap-2 mb-3 border-b border-white/5 pb-3 px-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
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

          {/* ── VIDEO MASTERCLASSES ───────────────────────────────────────── */}
          <section className="mb-24">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{videosTitle}</h2>
                <p className="text-slate-400">{videosBody}</p>
              </div>
              <Link href="#" className="text-sm font-bold flex items-center gap-1 hover:opacity-80 transition-opacity"
                style={{ color: accentFrom }}>
                View Library <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {videoItems.map((v, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-2xl overflow-hidden mb-4 border border-white/10 group-hover:border-white/30 transition-colors">
                    <img src={v.img} alt={v.title}
                      className="w-full h-full object-cover grayscale-[40%] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/20 transition-all">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                        <Play className="w-5 h-5 text-white ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-black/80 px-2 py-1 rounded text-xs font-mono text-white">{v.time}</div>
                  </div>
                  <h4 className="text-white font-bold mb-1 group-hover:text-blue-400 transition-colors line-clamp-1">{v.title}</h4>
                  <p className="text-xs text-slate-500">HireX Engineering Team</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── LEADERBOARD ───────────────────────────────────────────────── */}
          <section className="mb-24 max-w-4xl mx-auto">
            <div className="bg-slate-900/40 border border-white/10 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: `${accentTo}0d`, filter: 'blur(100px)' }} />
              <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
                <Trophy className="text-yellow-400 w-8 h-8" /> {leaderTitle}
              </h2>
              <div className="space-y-4">
                {leaderItems.map((user, i) => (
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

          {/* ── SUCCESS STORIES ────────────────────────────────────────────── */}
          <section className="mb-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white mb-4">{storiesTitle}</h2>
              <p className="text-slate-400">{storiesBody}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {storyItems.map((s, i) => (
                <div key={i} className="bg-slate-900/40 border border-white/5 p-8 rounded-3xl">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, si) => <Star key={si} className="w-4 h-4 text-yellow-400 fill-current" />)}
                  </div>
                  <p className="text-slate-300 text-sm leading-relaxed italic mb-6">"{s.quote}"</p>
                  <h4 className="font-bold text-white text-sm">{s.name}</h4>
                  <p className="text-xs mt-1" style={{ color: accentTo }}>{s.role}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── CTA ──────────────────────────────────────────────────────── */}
          <div className="mt-10 max-w-4xl mx-auto p-8 md:p-10 rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden"
            style={{ background: accentFrom, boxShadow: `0 20px 40px ${accentFrom}40` }}>
            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-2xl font-bold mb-2 text-white">{ctaTitle}</h3>
              <p className="text-blue-100 text-sm md:text-base">{ctaBody}</p>
            </div>
            <Link href={ctaLink}
              className="relative z-10 whitespace-nowrap px-8 py-3.5 bg-white font-bold rounded-xl hover:bg-slate-100 hover:scale-105 transition-all flex items-center gap-2 shadow-xl"
              style={{ color: accentFrom }}>
              {ctaBtn} <ChevronRight className="w-5 h-5" />
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
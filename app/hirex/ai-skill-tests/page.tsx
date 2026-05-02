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
import { usePageContent } from '@/hooks/usePageContent';

const PAGE_KEY = 'hirex-skill-tests';

// ── Icon Maps ────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Layout, Terminal, Database, BrainCircuit, Cloud, Code2,
  ShieldCheck, Zap, Lock, Eye, Camera, LineChart, Award,
};

// ── Types ────────────────────────────────────────────────────────────────────
interface SkillTest {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  color: string;
  bgColor: string;
  borderColor: string;
  glow: string;
  duration: string;
  difficulty: string;
  questions: number;
}

interface HowItWorksStep {
  step: number;
  title: string;
  description: string;
  color: string;
}

interface IntegrityFeature {
  label: string;
  icon: string;
  color: string;
}

interface ContactItem {
  type: string;
  label: string;
  value: string;
  icon: string;
  color: string;
}

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Default JSON ─────────────────────────────────────────────────────────────
const DEFAULT_SKILL_TESTS = JSON.stringify([
  { id: 'react-next-advanced', title: 'Next.js & React Engineering', category: 'Frontend', description: 'Evaluate deep knowledge of SSR, RSC (React Server Components), performance optimization, and custom hooks.', icon: 'Layout', color: 'text-blue-400', bgColor: 'bg-blue-500/10', borderColor: 'group-hover:border-blue-500/50', glow: 'group-hover:shadow-[0_0_30px_rgba(96,165,250,0.2)]', duration: '45 Mins', difficulty: 'Hard', questions: 25 },
  { id: 'node-system-design', title: 'Node.js & System Design', category: 'Backend', description: 'Test architectural patterns, microservices, Socket.io real-time syncing, and event-driven backend engineering.', icon: 'Terminal', color: 'text-emerald-400', bgColor: 'bg-emerald-500/10', borderColor: 'group-hover:border-emerald-500/50', glow: 'group-hover:shadow-[0_0_30px_rgba(16,185,129,0.2)]', duration: '60 Mins', difficulty: 'Expert', questions: 30 },
  { id: 'tidb-mysql-architect', title: 'TiDB Cloud & MySQL Architect', category: 'Database', description: 'Distributed SQL databases, query optimization, ACID compliance, and handling high-concurrency transactions.', icon: 'Database', color: 'text-cyan-400', bgColor: 'bg-cyan-500/10', borderColor: 'group-hover:border-cyan-500/50', glow: 'group-hover:shadow-[0_0_30px_rgba(34,211,238,0.2)]', duration: '40 Mins', difficulty: 'Hard', questions: 20 },
  { id: 'ai-generative-agents', title: 'Generative AI & LLM Integration', category: 'AI/ML', description: 'Implement Gemini API, prompt engineering, RAG pipelines, and autonomous agent orchestration.', icon: 'BrainCircuit', color: 'text-purple-400', bgColor: 'bg-purple-500/10', borderColor: 'group-hover:border-purple-500/50', glow: 'group-hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]', duration: '50 Mins', difficulty: 'Expert', questions: 25 },
  { id: 'aws-cloud-devops', title: 'AWS Cloud & DevOps', category: 'DevOps', description: 'CI/CD pipelines, Docker, Kubernetes, serverless architecture, and infrastructure as code (IaC).', icon: 'Cloud', color: 'text-orange-400', bgColor: 'bg-orange-500/10', borderColor: 'group-hover:border-orange-500/50', glow: 'group-hover:shadow-[0_0_30px_rgba(251,146,60,0.2)]', duration: '45 Mins', difficulty: 'Medium', questions: 20 },
  { id: 'core-dsa-logic', title: 'Advanced Data Structures & Algorithms', category: 'Backend', description: 'Dynamic programming, graph theory, memory allocation, and highly optimized problem-solving.', icon: 'Code2', color: 'text-red-400', bgColor: 'bg-red-500/10', borderColor: 'group-hover:border-red-500/50', glow: 'group-hover:shadow-[0_0_30px_rgba(248,113,113,0.2)]', duration: '90 Mins', difficulty: 'Expert', questions: 15 },
]);

const DEFAULT_HOW_IT_WORKS = JSON.stringify([
  { step: 1, title: 'Select Domain', description: 'Choose the technology stack you want to be evaluated on from our extensive grid.', color: 'blue' },
  { step: 2, title: 'Take AI Assessment', description: 'Complete dynamically generated questions tailored to scale with your skill level.', color: 'purple' },
  { step: 3, title: 'Get Verified', description: 'Earn your badge and showcase your verified technical depth to top recruiters.', color: 'emerald' },
]);

const DEFAULT_INTEGRITY_FEATURES = JSON.stringify([
  { label: 'Tab-switch & Browser Lockdown', icon: 'Lock', color: 'text-emerald-400' },
  { label: 'AI Behavior & Gaze Tracking', icon: 'Eye', color: 'text-blue-400' },
  { label: 'Real-time Identity Verification', icon: 'Camera', color: 'text-purple-400' },
]);

const DEFAULT_CONTACT_ITEMS = JSON.stringify([
  { type: 'location', label: 'Location', value: 'DLF Cyber City, 5th Floor,\nCyber Green-2, Sec-25,\nGurugram, India', icon: 'MapPin', color: 'blue' },
  { type: 'phone', label: 'Phone', value: '+91 870023 6923', icon: 'Phone', color: 'emerald' },
  { type: 'email', label: 'Email', value: 'info@careerlabconsulting.com', icon: 'Mail', color: 'purple' },
]);

const DEFAULT_FEATURE_CARDS = JSON.stringify([
  { title: 'Adaptive Scoring', description: 'Questions automatically scale in difficulty based on your real-time performance.', icon: 'BrainCircuit', color: 'blue' },
  { title: 'Instant Analytics', description: 'Receive immediate, highly-detailed feedback identifying your technical strengths.', icon: 'LineChart', color: 'purple' },
  { title: 'Verified Profiles', description: 'Pass the assessment to earn a verifiable skill badge directly on your HireX profile.', icon: 'Award', color: 'emerald' },
]);

const CATEGORIES = ['All', 'Frontend', 'Backend', 'DevOps', 'Database'];

const COLOR_MAP: Record<string, string> = {
  blue: 'blue', purple: 'purple', emerald: 'emerald', cyan: 'cyan', orange: 'orange', red: 'red',
};

export default function AISkillTestsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const { get } = usePageContent(PAGE_KEY);

  // ── Hero ──────────────────────────────────────────────────────────────────
  const heroBadgeText    = get('hero', 'badge_text',    'Autonomous Verification');
  const heroHeadlinePl   = get('hero', 'headline_plain', 'AI Adaptive');
  const heroHeadlineAcc  = get('hero', 'headline_accent', 'Skill Tests');
  const heroAccentFrom   = get('hero', 'accent_from',   '#60a5fa');
  const heroAccentMid    = get('hero', 'accent_mid',    '#c084fc');
  const heroAccentTo     = get('hero', 'accent_to',     '#67e8f9');
  const heroBody         = get('hero', 'body_text',     'Select your domain. Our Generative AI will create a dynamic, one-of-a-kind evaluation environment tailored to test your true engineering depth. No static questions. No predictable patterns.');

  // ── Sections ──────────────────────────────────────────────────────────────
  const sectionHowTitle  = get('how_it_works', 'headline',   'How It Works');
  const sectionHowBody   = get('how_it_works', 'subheading', 'Your journey to a verified candidate profile in three simple steps.');
  const howItWorksItems  = safeParse<HowItWorksStep[]>(get('how_it_works', 'items_json', DEFAULT_HOW_IT_WORKS), []);

  const integrityBadge   = get('integrity', 'badge_text',     'Secure Environment');
  const integrityHeadPl  = get('integrity', 'headline_plain', 'Enterprise-Grade');
  const integrityHeadAcc = get('integrity', 'headline_accent','Integrity');
  const integrityBody    = get('integrity', 'body_text',      'Our AI doesn\'t just grade tests; it ensures a fair and secure environment. Every session is monitored autonomously to guarantee the true authenticity of your skill badge.');
  const integrityImgUrl  = get('integrity', 'image_url',      'https://img.freepik.com/free-photo/standard-quality-control-concept-m_23-2150041861.jpg?t=st=1772964478~exp=1772968078~hmac=db3a0a0099538fbc0b829d9231f54d97b94149742696167027e769b49682bf47&w=1480');
  const integrityFeats   = safeParse<IntegrityFeature[]>(get('integrity', 'features_json', DEFAULT_INTEGRITY_FEATURES), []);

  const featCardsItems   = safeParse<{ title: string; description: string; icon: string; color: string }[]>(get('feature_cards', 'items_json', DEFAULT_FEATURE_CARDS), []);
  const featCardsHeadline = get('feature_cards', 'headline', '');

  const contactHeadline  = get('contact', 'headline',   'Get In Touch');
  const contactSubhead   = get('contact', 'subheading',  'Need support regarding assessments or technical issues? Our team at Career Lab Consulting is here to help.');
  const contactItems     = safeParse<ContactItem[]>(get('contact', 'items_json', DEFAULT_CONTACT_ITEMS), []);

  const skillTests       = safeParse<SkillTest[]>(get('skill_tests', 'items_json', DEFAULT_SKILL_TESTS), []);

  const filteredTests = skillTests.filter(test => {
    const matchesSearch = test.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || test.category === activeCategory;
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

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 z-10 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-6">
              <Zap className="w-4 h-4" />
              {heroBadgeText}
            </div>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-lg">
              {heroHeadlinePl}{' '}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${heroAccentFrom}, ${heroAccentMid}, ${heroAccentTo})` }}>
                {heroHeadlineAcc}
              </span>
            </h1>
            <p className="text-lg md:text-[17px] text-slate-400 leading-relaxed mb-8">{heroBody}</p>
          </div>

          {/* Search + Filter Bar */}
          <div className="mt-12 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-4 bg-slate-900/50 backdrop-blur-xl p-2 md:p-3 rounded-3xl border border-white/10 shadow-2xl">
            <div className="relative w-full md:w-[40%] flex items-center bg-white/5 md:bg-transparent rounded-2xl md:rounded-none">
              <Search className="absolute left-4 w-5 h-5 text-slate-500" />
              <input
                type="text"
                placeholder="Search stacks e.g. 'React', 'Node.js'..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none pl-12 pr-4 py-3 text-white placeholder:text-slate-400 focus:outline-none focus:ring-0"
              />
            </div>
            <div className="hidden md:block w-px h-10 bg-white/10" />
            <div className="w-full md:w-[60%] flex items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] px-2 md:px-0 pb-2 md:pb-0">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-5 py-2.5 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${activeCategory === category
                    ? 'text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                    : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'}`}
                  style={activeCategory === category ? { background: heroAccentFrom, boxShadow: `0 0 15px ${heroAccentFrom}66` } : {}}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SKILL TEST GRID ──────────────────────────────────────────────────── */}
      <section className="relative py-16 z-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {filteredTests.length === 0 ? (
            <div className="text-center py-20 bg-slate-900/30 rounded-3xl border border-white/5">
              <Terminal className="w-16 h-16 text-slate-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No skill tests found</h3>
              <p className="text-slate-400">Try adjusting your search criteria or category filter.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
                className="mt-6 text-blue-400 hover:text-blue-300 text-sm font-bold underline underline-offset-4"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTests.map(test => {
                const Icon = ICON_MAP[test.icon] ?? Code2;
                return (
                  <div
                    key={test.id}
                    className={`group relative flex flex-col bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-8 transition-all duration-300 hover:-translate-y-2 ${test.borderColor} ${test.glow} cursor-pointer`}
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none" />
                    <div className="flex justify-between items-start mb-6">
                      <div className={`w-14 h-14 rounded-2xl ${test.bgColor} border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Icon className={`w-7 h-7 ${test.color}`} />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 bg-white/5 px-3 py-1.5 rounded-full border border-white/5">
                        {test.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-blue-200 transition-colors">{test.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">{test.description}</p>
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
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────────── */}
      <section className="relative py-16 z-10 bg-slate-900/30 border-b border-white/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{sectionHowTitle}</h2>
            <p className="text-slate-400">{sectionHowBody}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorksItems.map((step, i) => {
              const colorClass = step.color === 'purple' ? 'bg-purple-500/10 border-purple-500/20 text-purple-400' : step.color === 'emerald' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-blue-500/10 border-blue-500/20 text-blue-400';
              return (
                <div key={i} className="relative p-6 bg-white/[0.02] border border-white/5 rounded-2xl text-center hover:bg-white/[0.04] transition-colors">
                  <div className={`w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4 border font-bold text-xl ${colorClass}`}>{step.step}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── INTEGRITY ───────────────────────────────────────────────────────── */}
      <section className="relative py-16 z-10 border-t border-white/5 bg-slate-900/20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="w-full md:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono uppercase tracking-widest mb-4">
                <ShieldCheck className="w-4 h-4" />
                {integrityBadge}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                {integrityHeadPl}{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  {integrityHeadAcc}
                </span>
              </h2>
              <p className="text-slate-400 mb-8 leading-relaxed text-lg">{integrityBody}</p>
              <ul className="space-y-5">
                {integrityFeats.map((feat, i) => {
                  const Icon = ICON_MAP[feat.icon] ?? ShieldCheck;
                  const colorMap: Record<string, string> = { 'text-emerald-400': 'text-emerald-400', 'text-blue-400': 'text-blue-400', 'text-purple-400': 'text-purple-400' };
                  return (
                    <li key={i} className="flex items-center gap-4 text-slate-300 font-medium">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center border border-white/5">
                        <Icon className={`w-5 h-5 ${colorMap[feat.color] ?? 'text-white'}`} />
                      </div>
                      {feat.label}
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="w-full md:w-1/2 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000" />
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                <img src={integrityImgUrl} alt="AI Proctoring Security" className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 bg-slate-900/70 backdrop-blur-[3px]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE CARDS ───────────────────────────────────────────────────── */}
      <section className="relative py-12 z-10 border-t border-white/5 bg-white/[0.01]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featCardsItems.map((card, i) => {
              const Icon = ICON_MAP[card.icon] ?? Zap;
              const colorMap: Record<string, { bg: string; border: string; text: string }> = {
                blue:    { bg: 'bg-blue-500/10',    border: 'border-blue-500/20',    text: 'text-blue-400'    },
                purple:  { bg: 'bg-purple-500/10',  border: 'border-purple-500/20',  text: 'text-purple-400'  },
                emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
              };
              const c = colorMap[card.color] ?? colorMap['blue'];
              return (
                <div key={i} className="flex flex-col items-center text-center p-6">
                  <div className={`w-12 h-12 ${c.bg} rounded-2xl flex items-center justify-center mb-4 border ${c.border}`}>
                    <Icon className={`w-6 h-6 ${c.text}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{card.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{card.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CONTACT ─────────────────────────────────────────────────────────── */}
      <section className="relative py-16 z-10 border-t border-white/5 bg-slate-900/40">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{contactHeadline}</h2>
            <p className="text-slate-400">{contactSubhead}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {contactItems.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? MapPin;
              const colorMap: Record<string, { bg: string; hoverBorder: string; icon: string }> = {
                blue:    { bg: 'bg-blue-500/10',    hoverBorder: 'hover:border-blue-500/50',    icon: 'text-blue-400'    },
                emerald: { bg: 'bg-emerald-500/10', hoverBorder: 'hover:border-emerald-500/50', icon: 'text-emerald-400' },
                purple:  { bg: 'bg-purple-500/10',  hoverBorder: 'hover:border-purple-500/50',  icon: 'text-purple-400'  },
              };
              const c = colorMap[item.color] ?? colorMap['blue'];
              return (
                <div key={i} className={`group flex flex-col items-center p-8 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl text-center hover:-translate-y-1 ${c.hoverBorder} transition-all duration-300`}>
                  <div className={`w-14 h-14 ${c.bg} rounded-full flex items-center justify-center mb-5 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-6 h-6 ${c.icon}`} />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{item.label}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">{item.value}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
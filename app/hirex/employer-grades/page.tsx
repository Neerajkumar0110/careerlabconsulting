// app/hirex/employer-grades/page.tsx

'use client';

import React, { useState } from 'react';
import Navbar from '@/components/hirex/layout/Navbar';
import Footer from '@/components/hirex/home/Footer';
import {
  Trophy, Star, Target, ShieldCheck,
  Settings2, Activity, Zap, BarChart3,
  Building2, ArrowRight, CheckCircle2,
  Code2, BrainCircuit, MapPin, Phone, Mail,
  Play, LineChart, Award, X, Send
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const PAGE_KEY = 'hirex-employer-grades';

const ICON_MAP: Record<string, React.ElementType> = {
  Trophy, Star, Target, ShieldCheck, Settings2, Activity, Zap, BarChart3,
  Building2, ArrowRight, Code2, BrainCircuit, MapPin, Phone, Mail,
  Play, LineChart, Award, Send,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface IndustryTier {
  grade: string; title: string; description: string;
  color: string; bgGlow: string; borderGlow: string; shadowGlow: string;
  metrics: { logic: string; systemDesign: string; execution: string };
  icon: string;
}
interface TopEmployer { name: string; grade: string; logo: string; stack: string; }
interface ContactItem { type: string; label: string; value: string; icon: string; color: string; }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_INDUSTRY_TIERS = JSON.stringify([
  { grade: 'S-Tier', title: 'Elite Engineering', description: 'Built for FAANG-level systems, HFT (High-Frequency Trading), and core AI research.', color: 'text-yellow-400', bgGlow: 'bg-yellow-500/10', borderGlow: 'border-yellow-500/30', shadowGlow: 'shadow-[0_0_30px_rgba(250,204,21,0.15)]', metrics: { logic: '95+', systemDesign: '90+', execution: 'Fast' }, icon: 'Trophy' },
  { grade: 'A-Tier', title: 'Scale-Up & Unicorn', description: 'Ideal for Series B+ startups and enterprise platforms handling high traffic.', color: 'text-purple-400', bgGlow: 'bg-purple-500/10', borderGlow: 'border-purple-500/30', shadowGlow: 'shadow-[0_0_30px_rgba(168,85,247,0.15)]', metrics: { logic: '85+', systemDesign: '80+', execution: 'Optimal' }, icon: 'Star' },
  { grade: 'B-Tier', title: 'Enterprise Core', description: 'Standard robust engineering for B2B SaaS, internal tooling, and legacy modernization.', color: 'text-blue-400', bgGlow: 'bg-blue-500/10', borderGlow: 'border-blue-500/30', shadowGlow: 'shadow-[0_0_30px_rgba(59,130,246,0.15)]', metrics: { logic: '75+', systemDesign: '70+', execution: 'Standard' }, icon: 'Target' },
]);

const DEFAULT_TOP_EMPLOYERS = JSON.stringify([
  { name: 'FinTech Global',    grade: 'S-Tier', logo: 'FG', stack: 'Node.js, Rust, AWS'     },
  { name: 'HealthAI Systems',  grade: 'A-Tier', logo: 'HA', stack: 'Python, Next.js, GCP'   },
  { name: 'Nexus Commerce',    grade: 'A-Tier', logo: 'NC', stack: 'React, Laravel, TiDB'   },
  { name: 'CloudWorks Inc',    grade: 'B-Tier', logo: 'CW', stack: 'Vue.js, PHP, Azure'     },
]);

const DEFAULT_CONTACT_ITEMS = JSON.stringify([
  { type: 'location', label: 'Headquarters', value: 'DLF Cyber City, 5th Floor, Cyber Green-2, Sec-25, Gurugram, India', icon: 'MapPin', color: 'blue'    },
  { type: 'phone',    label: 'Direct Line',  value: '+91 870023 6923',                       icon: 'Phone',  color: 'emerald' },
  { type: 'email',    label: 'Global Inbox', value: 'info@careerlabconsulting.com',          icon: 'Mail',   color: 'purple'  },
]);

const colorMap: Record<string, { bg: string; hoverBorder: string; icon: string; inputFocus: string; badgeBg: string; badgeBorder: string }> = {
  blue:    { bg: 'bg-blue-500/10',    hoverBorder: 'hover:border-blue-500/50',    icon: 'text-blue-400',    inputFocus: 'focus:border-blue-500',   badgeBg: 'bg-blue-500/10',    badgeBorder: 'border-blue-500/20'    },
  purple:  { bg: 'bg-purple-500/10',  hoverBorder: 'hover:border-purple-500/50',  icon: 'text-purple-400',  inputFocus: 'focus:border-purple-500', badgeBg: 'bg-purple-500/10',  badgeBorder: 'border-purple-500/20'  },
  emerald: { bg: 'bg-emerald-500/10', hoverBorder: 'hover:border-emerald-500/50', icon: 'text-emerald-400', inputFocus: 'focus:border-emerald-500',badgeBg: 'bg-emerald-500/10', badgeBorder: 'border-emerald-500/20' },
};

export default function EmployerGradesPage() {
  const [techScore, setTechScore]     = useState(85);
  const [logicScore, setLogicScore]   = useState(80);
  const [designScore, setDesignScore] = useState(75);
  const [isFormOpen, setIsFormOpen]   = useState(false);
  const [formContext, setFormContext]  = useState('');
  const [formData, setFormData]       = useState({ name: '', company: '', email: '', phone: '' });

  const { get } = usePageContent(PAGE_KEY);

  // ── CMS values ─────────────────────────────────────────────────────────────
  const heroBadgeText    = get('hero', 'badge_text',      'Hiring Benchmarks');
  const heroHeadlinePl   = get('hero', 'headline_plain',  'Standardize Your');
  const heroHeadlineAcc  = get('hero', 'headline_accent', 'Employer Grade');
  const heroAccentFrom   = get('hero', 'accent_from',     '#60a5fa');
  const heroAccentMid    = get('hero', 'accent_mid',      '#67e8f9');
  const heroAccentTo     = get('hero', 'accent_to',       '#c084fc');
  const heroBody         = get('hero', 'body_text',       'Define the exact technical parameters your engineering team requires. Apply custom benchmark grades to your pipeline and let our autonomous AI filter candidates with surgical precision.');
  const heroBtnPrimary   = get('hero', 'btn_primary',     'Configure Benchmarks');
  const heroBtnDemo      = get('hero', 'btn_demo',        'View Demo');
  const adminWhatsapp    = get('hero', 'admin_whatsapp',  '918700236923');

  const tiersHeadline    = get('industry_tiers', 'headline',   'Standard Industry Tiers');
  const tiersSubhead     = get('industry_tiers', 'subheading', 'Explore predefined technical profiles used by the world\'s leading tech companies to auto-filter candidates.');
  const industryTiers    = safeParse<IndustryTier[]>(get('industry_tiers', 'items_json', DEFAULT_INDUSTRY_TIERS), []);

  const builderHeadline  = get('benchmark_builder', 'headline',   'Build Custom Benchmark');
  const builderSubhead   = get('benchmark_builder', 'subheading', 'Fine-tune the sliders below to generate the exact technical baseline your specific roles demand.');
  const builderLabel1    = get('benchmark_builder', 'label_tech',   'Core Tech Proficiency');
  const builderLabel2    = get('benchmark_builder', 'label_logic',  'Logic & Algorithms');
  const builderLabel3    = get('benchmark_builder', 'label_design', 'System Design & Arch');
  const builderApplyBtn  = get('benchmark_builder', 'apply_btn',   'Apply Grade Rule');

  const employersHeadline = get('employer_directory', 'headline', 'Leading Employers on HireX');
  const topEmployers      = safeParse<TopEmployer[]>(get('employer_directory', 'items_json', DEFAULT_TOP_EMPLOYERS), []);

  const ctaHeadline      = get('cta', 'headline',   'Stop Reading Resumes.');
  const ctaAccent        = get('cta', 'accent',     'Start Graded Hiring.');
  const ctaBody          = get('cta', 'body_text',  'Deploy an autonomous AI agent that interviews, grades, and ranks candidates precisely according to your custom benchmarks.');
  const ctaBtn           = get('cta', 'btn_label',  'Talk to Solutions Architect');
  const contactHubTitle  = get('cta', 'hub_title',  'Contact Hub');
  const contactItems     = safeParse<ContactItem[]>(get('cta', 'contact_items_json', DEFAULT_CONTACT_ITEMS), []);

  const modalHeadline    = get('form_modal', 'headline',    'Connect with us');
  const modalSubhead     = get('form_modal', 'subheading',  'Please provide your details below. We\'ll redirect you to WhatsApp immediately.');
  const modalBtnLabel    = get('form_modal', 'btn_label',   'Submit & Continue to WhatsApp');

  const calculateGrade = () => {
    const avg = (techScore + logicScore + designScore) / 3;
    if (avg >= 92) return { grade: 'S-Tier', color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500' };
    if (avg >= 82) return { grade: 'A-Tier', color: 'text-purple-400', bg: 'bg-purple-500/20', border: 'border-purple-500' };
    if (avg >= 70) return { grade: 'B-Tier', color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500' };
    return { grade: 'C-Tier', color: 'text-emerald-400', bg: 'bg-emerald-500/20', border: 'border-emerald-500' };
  };
  const currentGrade = calculateGrade();

  const handleDirectWhatsApp = (message: string) => {
    const text = encodeURIComponent(message);
    window.open(`https://wa.me/${adminWhatsapp}?text=${text}`, '_blank');
  };

  const openForm = (context: string) => { setFormContext(context); setIsFormOpen(true); };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*New Lead from HireX Employer Grades Page*\n\n*Name:* ${formData.name}\n*Company:* ${formData.company}\n*Email:* ${formData.email}\n*Phone:* ${formData.phone}\n\n*Interest/Action:* ${formContext}`;
    window.open(`https://wa.me/${adminWhatsapp}?text=${encodeURIComponent(message)}`, '_blank');
    setIsFormOpen(false);
    setFormData({ name: '', company: '', email: '', phone: '' });
  };

  return (
    <main className="min-h-screen relative overflow-hidden selection:bg-blue-500/30 selection:text-blue-200 text-white bg-[#020617]">

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/10 blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <Navbar />

      {/* ── HERO ────────────────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 border-b border-white/5 relative overflow-hidden z-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl relative z-10 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-widest mb-6">
                <BarChart3 className="w-4 h-4" /> {heroBadgeText}
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white drop-shadow-lg mb-6 leading-tight">
                {heroHeadlinePl}<br className="hidden lg:block" />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${heroAccentFrom}, ${heroAccentMid}, ${heroAccentTo})` }}>
                  {heroHeadlineAcc}
                </span>
              </h1>
              <p className="text-base sm:text-lg text-slate-400 leading-relaxed mb-8 max-w-xl mx-auto lg:mx-0">{heroBody}</p>
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => openForm(heroBtnPrimary)}
                  className="w-full sm:w-auto px-8 py-4 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] transition-all flex items-center justify-center gap-2"
                  style={{ background: heroAccentFrom }}
                >
                  {heroBtnPrimary} <ArrowRight className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDirectWhatsApp(`Hi, I'd like to view a demo of the HireX Autonomous Grading Platform.`)}
                  className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 group"
                >
                  <Play className="w-5 h-5 text-slate-400 group-hover:text-white transition-colors" /> {heroBtnDemo}
                </button>
              </div>
            </div>
            {/* Hero Visual */}
            <div className="relative w-full h-[400px] lg:h-[500px] flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-purple-500/20 rounded-full blur-[100px]" />
              <div className="relative z-20 bg-slate-900/70 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl w-full max-w-sm lg:max-w-md animate-[float_6s_ease-in-out_infinite]">
                <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-500/20 rounded-xl border border-blue-500/30 flex items-center justify-center">
                      <Award className="w-6 h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold">Candidate AI Score</h3>
                      <p className="text-xs text-slate-400">Analyzed by HireX Engine</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2 py-1 rounded border border-emerald-500/20">Passed</span>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-300">Logic Core</span>
                      <span className="text-white font-mono font-bold">96%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-purple-400 h-2 rounded-full w-[96%] shadow-[0_0_10px_rgba(192,132,252,0.5)]" />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="text-slate-300">System Design</span>
                      <span className="text-white font-mono font-bold">91%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="bg-cyan-400 h-2 rounded-full w-[91%] shadow-[0_0_10px_rgba(34,211,238,0.5)]" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 bg-slate-800/50 p-4 rounded-xl border border-white/5 flex items-center justify-between">
                  <span className="text-sm text-slate-400 font-medium">Assigned Grade</span>
                  <span className="flex items-center gap-1 text-yellow-400 font-black text-lg">
                    <Trophy className="w-5 h-5" /> S-Tier
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24">

        {/* ── INDUSTRY TIERS ──────────────────────────────────────────────── */}
        <div className="mb-20 md:mb-28">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">{tiersHeadline}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">{tiersSubhead}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {industryTiers.map((tier, idx) => {
              const Icon = ICON_MAP[tier.icon] ?? Trophy;
              return (
                <div key={idx} className={`group relative bg-slate-900/50 backdrop-blur-xl border ${tier.borderGlow} rounded-3xl p-6 sm:p-8 transition-all duration-300 hover:-translate-y-2 ${tier.shadowGlow} cursor-default flex flex-col h-full`}>
                  <div className={`w-14 h-14 rounded-2xl ${tier.bgGlow} border ${tier.borderGlow} flex items-center justify-center mb-6`}>
                    <Icon className={`w-7 h-7 ${tier.color}`} />
                  </div>
                  <h3 className={`text-2xl font-black ${tier.color} mb-2`}>{tier.grade}</h3>
                  <h4 className="text-lg font-bold text-white mb-3">{tier.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-grow">{tier.description}</p>
                  <div className="space-y-3 pt-6 border-t border-white/10 mt-auto">
                    {[
                      { label: 'Logic', val: tier.metrics.logic, Icon: BrainCircuit },
                      { label: 'System Design', val: tier.metrics.systemDesign, Icon: Settings2 },
                      { label: 'Execution', val: tier.metrics.execution, Icon: Zap },
                    ].map(({ label, val, Icon: Ic }) => (
                      <div key={label} className="flex justify-between items-center text-sm">
                        <span className="text-slate-500 font-medium flex items-center gap-1.5"><Ic className="w-3.5 h-3.5" /> {label}</span>
                        <span className="text-white font-bold">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── BENCHMARK BUILDER ───────────────────────────────────────────── */}
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl mb-20 md:mb-28 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[100px] rounded-full pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
            <div className="space-y-8 sm:space-y-10">
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">{builderHeadline}</h2>
                <p className="text-slate-400 text-sm leading-relaxed">{builderSubhead}</p>
              </div>
              {[
                { label: builderLabel1, score: techScore, setScore: setTechScore, color: 'text-blue-400', accent: 'accent-blue-500' },
                { label: builderLabel2, score: logicScore, setScore: setLogicScore, color: 'text-purple-400', accent: 'accent-purple-500' },
                { label: builderLabel3, score: designScore, setScore: setDesignScore, color: 'text-emerald-400', accent: 'accent-emerald-500' },
              ].map(({ label, score, setScore, color, accent }) => (
                <div key={label} className="space-y-4">
                  <div className="flex justify-between items-end">
                    <label className="text-xs sm:text-sm font-bold text-slate-300 uppercase tracking-wide">{label}</label>
                    <span className={`text-xl sm:text-2xl font-black ${color}`}>{score}%</span>
                  </div>
                  <input type="range" min="50" max="100" value={score} onChange={e => setScore(Number(e.target.value))}
                    className={`w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer ${accent}`} />
                </div>
              ))}
            </div>
            {/* Grade Output */}
            <div className="bg-[#0b0f1f] border border-white/5 rounded-3xl p-6 sm:p-8 flex flex-col items-center justify-center text-center shadow-inner min-h-[350px] sm:min-h-[400px]">
              <div className="text-slate-500 font-mono text-xs sm:text-sm uppercase tracking-widest mb-6">Generated Global Grade</div>
              <div className={`w-28 h-28 sm:w-32 sm:h-32 rounded-full flex items-center justify-center ${currentGrade.bg} border-2 ${currentGrade.border} mb-6 transition-colors duration-500`}>
                <span className={`text-4xl sm:text-5xl font-black ${currentGrade.color} transition-colors duration-500`}>
                  {currentGrade.grade.split('-')[0]}
                </span>
              </div>
              <h3 className={`text-xl sm:text-2xl font-bold ${currentGrade.color} mb-2 transition-colors duration-500`}>{currentGrade.grade} Requirement</h3>
              <p className="text-slate-400 text-xs sm:text-sm mb-8 px-2 sm:px-4 leading-relaxed">
                Only candidates hitting this specific threshold will be recommended for the final technical interview.
              </p>
              <button
                onClick={() => openForm(`Apply Grade Globally (${currentGrade.grade} | Tech: ${techScore}%, Logic: ${logicScore}%, Design: ${designScore}%)`)}
                className={`w-full max-w-[250px] inline-flex justify-center items-center gap-2 ${currentGrade.bg} ${currentGrade.color} border ${currentGrade.border} hover:bg-white/10 font-bold py-3 sm:py-3.5 rounded-xl transition-all duration-300 text-sm sm:text-base`}
              >
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5" /> {builderApplyBtn}
              </button>
            </div>
          </div>
        </div>

        {/* ── EMPLOYER DIRECTORY ──────────────────────────────────────────── */}
        <div className="mb-20 md:mb-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <Building2 className="w-6 h-6 sm:w-8 sm:h-8 text-blue-400" /> {employersHeadline}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {topEmployers.map((company, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-white/10 rounded-2xl p-5 hover:bg-white/5 transition-colors flex items-center gap-4 shadow-lg hover:-translate-y-1 duration-300">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center font-black text-white shadow-inner border border-white/10 shrink-0">
                  {company.logo}
                </div>
                <div className="min-w-0">
                  <h4 className="text-white font-bold text-sm truncate">{company.name}</h4>
                  <div className="flex items-center gap-2 mt-1.5">
                    <span className="text-[9px] sm:text-[10px] font-bold uppercase px-2 py-0.5 rounded border border-white/10 bg-white/5 text-slate-300">{company.grade}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA + CONTACT HUB ───────────────────────────────────────────── */}
        <div className="bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-8 md:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[800px] h-[600px] sm:h-[800px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12 items-center relative z-10">
            <div className="text-center lg:text-left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-4 sm:mb-6 leading-tight">
                {ctaHeadline} <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to right, ${heroAccentFrom}, ${heroAccentMid})` }}>{ctaAccent}</span>
              </h2>
              <p className="text-slate-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-md mx-auto lg:mx-0 leading-relaxed">{ctaBody}</p>
              <button
                onClick={() => openForm(ctaBtn)}
                className="inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto text-white font-bold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition-all text-sm sm:text-base"
                style={{ background: heroAccentFrom }}
              >
                {ctaBtn} <ArrowRight className="w-4 h-4 sm:w-5 h-5" />
              </button>
            </div>
            {/* Contact Hub */}
            <div className="bg-[#020617]/50 border border-white/10 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-inner">
              <div className="flex items-center justify-center sm:justify-start gap-3 mb-6 sm:mb-8 pb-4 sm:pb-0 border-b border-white/5 sm:border-0">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-white">{contactHubTitle}</h3>
              </div>
              <div className="space-y-5 sm:space-y-6">
                {contactItems.map((item, i) => {
                  const Icon = ICON_MAP[item.icon] ?? MapPin;
                  const c = colorMap[item.color] ?? colorMap['blue'];
                  return (
                    <div key={i} className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-3 sm:gap-4">
                      <div className={`${c.bg} p-3 rounded-xl border ${c.badgeBorder} shrink-0`}>
                        <Icon className={`w-5 h-5 ${c.icon}`} />
                      </div>
                      <div>
                        <p className="text-white font-semibold mb-0.5 sm:mb-1 text-sm sm:text-base">{item.label}</p>
                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">{item.value}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* ── FORM MODAL ──────────────────────────────────────────────────────── */}
      {isFormOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={() => setIsFormOpen(false)} />
          <div className="relative w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
            <div className="p-6 sm:p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">{modalHeadline}</h3>
                  <p className="text-slate-400 text-sm">{modalSubhead}</p>
                </div>
                <button onClick={() => setIsFormOpen(false)} className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-slate-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <form onSubmit={handleFormSubmit} className="space-y-4">
                {[
                  { label: 'Full Name *', key: 'name', type: 'text', placeholder: 'e.g. John Doe' },
                  { label: 'Company Name *', key: 'company', type: 'text', placeholder: 'e.g. TechFlow Solutions' },
                ].map(({ label, key, type, placeholder }) => (
                  <div key={key}>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
                    <input required type={type} placeholder={placeholder}
                      value={formData[key as keyof typeof formData]}
                      onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                      className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                    />
                  </div>
                ))}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: 'Email Address *', key: 'email', type: 'email', placeholder: 'john@company.com' },
                    { label: 'Phone Number *', key: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
                  ].map(({ label, key, type, placeholder }) => (
                    <div key={key}>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">{label}</label>
                      <input required type={type} placeholder={placeholder}
                        value={formData[key as keyof typeof formData]}
                        onChange={e => setFormData({ ...formData, [key]: e.target.value })}
                        className="w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition-all"
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-8 pt-4 border-t border-white/10">
                  <button type="submit" className="w-full bg-[#25D366] hover:bg-[#1ebd5c] text-white font-bold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" /> {modalBtnLabel}
                  </button>
                  <p className="text-center text-xs text-slate-500 mt-4">By submitting, your details will be sent securely via WhatsApp.</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx global>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
      `}</style>
    </main>
  );
}
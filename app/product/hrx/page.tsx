'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Users, Brain, Zap, Target, ArrowRight,
  Eye, Filter, MessageSquare, BarChart, CheckCircle
} from 'lucide-react';
import Navbar from "@/components/product/Navbar";
import PricingSection from '@/components/product/B2BPricingSection';
import CTAModal from '@/components/product/CTAModel';
import dynamic from 'next/dynamic';
import WhatsAppButton from '@/components/product/WhatsAppButton';
import { usePageContent } from '@/hooks/usePageContent';

const Footer = dynamic(() => import("@/components/product/Footer"));

// ─── Animated Counter ─────────────────────────────────────────────────────────
function Counter({ to, suffix = '', duration = 5000 }: { to: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, to, duration]);
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

// ─── Static visual data (not DB-driven) ───────────────────────────────────────
const FEATURE_ICONS   = [Eye, Filter, BarChart, Brain, MessageSquare, Target];
const FEATURE_ACCENTS = ['#3b82f6', '#6366f1', '#8b5cf6', '#0ea5e9', '#22d3ee', '#a855f7'];
const STEP_COLORS     = ['#3b82f6', '#6366f1', '#8b5cf6', '#0ea5e9', '#22d3ee'];

const CANDIDATE_PIPELINE = [
  { name: 'Priya Sharma',  role: 'Senior Backend Engineer', score: 94, status: 'Interview Done',  color: '#3b82f6' },
  { name: 'Rahul Mehta',   role: 'Product Manager',         score: 87, status: 'Assessment Sent', color: '#6366f1' },
  { name: 'Ananya Iyer',   role: 'Data Scientist',          score: 91, status: 'Shortlisted',     color: '#8b5cf6' },
  { name: 'Karan Bose',    role: 'DevOps Engineer',         score: 78, status: 'Screening',       color: '#0ea5e9' },
];

const SCORE_BARS = [30, 45, 60, 85, 94, 78, 55, 40, 70, 88, 92, 65];

export default function HRXPage() {
  const [modalOpen, setModalOpen] = useState(false);

  // ── Load all content from DB, with inline fallbacks ──────────────────────
  const { get, content } = usePageContent('hrx');
  const sectionVisible = (key: string) => !!content?.[key];

  // Hero
  const heroBadge   = get('hero', 'badge_text',       'AI Recruitment Intelligence');
  const heroTitle   = get('hero', 'headline',          'HR—X');
  const heroSub1    = get('hero', 'subheading_1',      'Hire Smarter. Faster.');
  const heroSub2    = get('hero', 'subheading_2',      'Without the Bias.');
  const heroBody    = get('hero', 'body',              'HR-X is your autonomous recruiting engine. AI avatars interview candidates, screening engines rank applicants, and intelligent assessments benchmark talent — so your team only meets candidates who are truly ready to hire.');
  const ctaPrimary  = get('hero', 'cta_primary',       'Start Hiring Smarter');
  const ctaWhatsApp = get('hero', 'cta_whatsapp',      'WhatsApp Demo');
  const waNumber    = get('hero', 'whatsapp_number',   '919810984968');
  const waMsg       = get('hero', 'whatsapp_msg',      "Hello! I'm interested in HR-X and would like to watch avatar interview.");
  const gradFrom    = get('hero', 'accent_color_from', '#3b82f6');
  const gradTo      = get('hero', 'accent_color_to',   '#6366f1');

  // Derived style helpers
  const gLR      = `linear-gradient(to right, ${gradFrom}, ${gradTo})`;
  const gLL      = `linear-gradient(to right, ${gradFrom}, ${gradFrom})`;
  const gText: React.CSSProperties = {
    backgroundImage: gLR,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  // Stats
  const stats = [1, 2, 3, 4].map((n) => ({
    value:  Number(get('stats', `stat_${n}_value`,  ['80', '3', '94', '500'][n - 1])),
    suffix: get('stats', `stat_${n}_suffix`, ['%', 'x', '%', '+'][n - 1]),
    label:  get('stats', `stat_${n}_label`,  ['Screening Time Saved', 'Faster Time-to-Hire', 'Interview Completion', 'Companies Hiring'][n - 1]),
    sub:    get('stats', `stat_${n}_sub`,    ['Vs. manual review', 'From JD to offer', 'Candidate satisfaction rate', 'Powered by HR-X'][n - 1]),
  }));

  // Features
  const featuresBadge  = get('features', 'section_badge',  'Recruitment Modules');
  const featuresHead   = get('features', 'headline',        'End-to-End Hiring');
  const featuresAccent = get('features', 'headline_accent', 'on Autopilot');
  const features = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    icon:   FEATURE_ICONS[i],
    accent: FEATURE_ACCENTS[i],
    title:  get('features', `feat_${n}_title`, [
      'Avatar-Powered Interviews', 'Intelligent Screening Engine', 'Candidate Ranking AI',
      'Skill Assessment Engine', 'Automated Candidate Communication', 'Bias-Free Structured Hiring',
    ][i]),
    desc: get('features', `feat_${n}_desc`, [
      'AI-driven virtual avatars conduct structured first-round interviews autonomously — 24/7, without scheduler coordination.',
      'Multi-layer resume parsing and JD-matching that goes beyond keyword matching. HR-X evaluates experience depth, skill relevance, and career trajectory.',
      'Every applicant receives a composite rank score combining skill match, interview performance, assessment results, and role-specific weighted criteria.',
      'Domain-specific assessments auto-generated from the job description — technical, cognitive, and situational. Adaptive question difficulty adjusts per candidate.',
      'Personalized outreach, interview scheduling, assessment delivery, offer letters, and rejection emails — all sent automatically at the right moment.',
      'HR-X enforces structured evaluation criteria across every candidate — eliminating inconsistent human judgment. Diversity metrics tracked in real time.',
    ][i]),
  }));

  // How It Works
  const howBadge  = get('how_it_works', 'badge',           'The HR-X Engine');
  const howHead   = get('how_it_works', 'headline',        'From job post to');
  const howAccent = get('how_it_works', 'headline_accent', 'offer letter in days.');
  const howBody1  = get('how_it_works', 'body_1',          "HR-X plugs into your ATS, job boards, and HRIS on day one. Paste your job description and HR-X instantly begins screening inbound applicants, scoring resumes, and scheduling avatar-powered interviews — no human touchpoint needed until shortlist.");
  const howBody2  = get('how_it_works', 'body_2',          'Every interview is conducted by a trained AI avatar that adapts its questioning based on the candidate\'s responses. Behavioral patterns, communication quality, and technical depth are scored in real time and added to each candidate\'s dossier.');
  const howBody3  = get('how_it_works', 'body_3',          "Your hiring team receives a ranked shortlist with interview recordings, assessment scores, and AI-generated evaluation summaries — empowering faster, more confident decisions backed by structured data.");
  const howCta    = get('how_it_works', 'cta_label',       'Explore HR-X');
  const howWaMsg  = get('how_it_works', 'whatsapp_msg',    "Hi, I'm interested in HR-X and want to explore how it can automate candidate screening and AI-led interviews for our hiring process.");
  const steps = [1, 2, 3, 4, 5].map((n, i) => ({
    step:  `0${n}`,
    color: STEP_COLORS[i],
    title: get('how_it_works', `step_${n}_title`, [
      'JD Parsing & Job Activation', 'Application Screening', 'Avatar Interview Scheduling',
      'Skill Assessment Delivery', 'Ranked Shortlist & Decision Pack',
    ][i]),
    desc: get('how_it_works', `step_${n}_desc`, [
      'Paste your job description. HR-X extracts required skills, experience benchmarks, and evaluation criteria automatically.',
      'Resumes parsed and scored against JD criteria. Unqualified applicants filtered out instantly. Top candidates advanced.',
      'Candidates receive an interview link. AI avatar conducts a 20-minute structured conversation at the candidate\'s convenience.',
      'Role-specific assessments auto-sent post-interview. Adaptive difficulty. Results benchmarked against your top performers.',
      'Hiring manager receives a ranked shortlist with scores, summaries, and recordings. Make the offer with full confidence.',
    ][i]),
  }));

  // CTA Banner
  const ctaHead   = get('cta_banner', 'headline',        'Your Recruiting Team');
  const ctaAccent = get('cta_banner', 'headline_accent', 'Just Got 10x Faster');
  const ctaSub    = get('cta_banner', 'subtext',         'Screen hundreds. Interview all. Shortlist the best. Let HR-X run your entire recruitment pipeline — end to end.');
  const ctaBtn    = get('cta_banner', 'cta_label',       'Start Hiring Smarter');

  return (
    <main className="bg-[#04050f] min-h-screen font-sans overflow-x-hidden">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      {sectionVisible('hero') && (
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 px-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px"
            style={{ background: `linear-gradient(to right, transparent, ${gradFrom}4D, transparent)` }} />
          <div className="absolute -top-32 right-0 w-[700px] h-[700px] rounded-full opacity-[0.07]"
            style={{ background: `radial-gradient(circle, ${gradTo}CC 0%, transparent 70%)`, filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: `radial-gradient(circle, ${gradFrom}99 0%, transparent 70%)`, filter: 'blur(80px)' }} />
          <div className="absolute inset-0 opacity-[0.025]"
            style={{ backgroundImage: `linear-gradient(${gradFrom}80 1px, transparent 1px), linear-gradient(90deg, ${gradFrom}80 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full my-6 md:my-4"
                style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}4D` }}>
                <Users size={11} style={{ color: gradFrom }} />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: gradFrom }}>{heroBadge}</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-6xl sm:text-7xl xl:text-9xl font-black text-white leading-none tracking-wide mb-4">
                {heroTitle.includes('—') ? (
                  <>HR<span style={gText}>—X</span></>
                ) : (
                  <span style={gText}>{heroTitle}</span>
                )}
              </motion.h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                className="text-xl md:text-3xl font-black uppercase tracking-tight mb-6">
                <span className="italic" style={gText}>{heroSub1}</span>
                <br /><span className="text-slate-400">{heroSub2}</span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                {heroBody}
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setModalOpen(true)}
                  className="group flex items-center justify-center gap-3 px-8 py-4 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all"
                  style={{ background: gLR, boxShadow: `0 8px 32px ${gradFrom}50` }}>
                  {ctaPrimary}
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMsg)}`}
                  target="_blank" rel="noopener noreferrer"
                  className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                  </svg>
                  {ctaWhatsApp}
                </a>
              </motion.div>
            </div>

            {/* Right — Candidate Pipeline Mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <div className="rounded-3xl p-6"
                style={{ background: '#080d1f', border: '1px solid rgba(255,255,255,0.1)', boxShadow: `0 0 80px ${gradFrom}1A` }}>
                <div className="flex items-center justify-between mb-5">
                  <p className="text-white font-black text-xs uppercase tracking-widest">Live Candidate Pipeline</p>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: gradFrom }} />
                    <span className="text-[9px] font-bold" style={{ color: gradFrom }}>4 Active</span>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  {CANDIDATE_PIPELINE.map((c, i) => (
                    <motion.div key={c.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)' }}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black text-white shrink-0"
                        style={{ background: `linear-gradient(135deg, ${c.color}40, ${c.color}20)`, border: `1px solid ${c.color}40` }}>
                        {c.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-[11px] font-black truncate">{c.name}</p>
                        <p className="text-slate-500 text-[9px] truncate">{c.role}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-black text-sm" style={{ color: c.color }}>{c.score}</p>
                        <p className="text-slate-600 text-[9px]">{c.status}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Score distribution */}
                <div className="p-3 rounded-2xl mb-4"
                  style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mb-2">Score Distribution</p>
                  <div className="flex items-end gap-1 h-12">
                    {SCORE_BARS.map((h, i) => (
                      <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.6 + i * 0.04, duration: 0.4 }}
                        className="flex-1 rounded-t-sm"
                        style={{ backgroundColor: i >= 8 ? gradFrom : `${gradFrom}${Math.round((0.15 + i * 0.04) * 255).toString(16).padStart(2, '0')}` }} />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  {['Run Interview', 'Send Assessment', 'Shortlist'].map((action) => (
                    <button key={action} className="flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider transition-all text-center"
                      style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}33`, color: gradFrom }}>
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      )}

      {/* ── STATS ─────────────────────────────────────────────────────────────── */}
      {sectionVisible('stats') && (
      <section className="relative py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="text-center">
                <div className="text-4xl md:text-6xl font-black text-white mb-2 tabular-nums">
                  <Counter to={stat.value} suffix={stat.suffix} />
                </div>
                <p className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em] mb-1">{stat.label}</p>
                <p className="text-slate-600 text-[10px]">{stat.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── FEATURES ──────────────────────────────────────────────────────────── */}
      {sectionVisible('features') && (
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 md:mb-20">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase mb-6"
              style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}4D`, color: gradFrom }}>
              <Brain size={11} /> {featuresBadge}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              {featuresHead}<br />
              <span className="italic" style={gText}>{featuresAccent}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {features.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group relative p-7 rounded-3xl bg-white/[0.02] border border-white/8 transition-all duration-500 hover:-translate-y-2"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${gradFrom}4D`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
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
      )}

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────────── */}
      {sectionVisible('how_it_works') && (
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12 bg-white/[0.01] border-y border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase mb-8"
                style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}4D`, color: gradFrom }}>
                {howBadge}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
                {howHead}<br />
                <span className="italic" style={gText}>{howAccent}</span>
              </h2>
              <p className="text-slate-400 text-base leading-relaxed mb-6">{howBody1}</p>
              <p className="text-slate-400 text-base leading-relaxed mb-6">{howBody2}</p>
              <p className="text-slate-400 text-base leading-relaxed">{howBody3}</p>
              <div className="mt-8">
                <WhatsAppButton
                  message={howWaMsg}
                  buttonText={howCta}
                  gradientFrom={gradFrom}
                  gradientTo={gradTo}
                  hoverFrom="hover:brightness-110"
                  hoverTo="hover:brightness-110"
                  shadowColor={`shadow-[0_0_40px_${gradFrom}4D]`}
                  hoverShadowColor={`hover:shadow-[0_0_60px_${gradFrom}80]`}
                />
              </div>
            </div>

            <div className="space-y-4">
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex gap-5 p-5 rounded-2xl bg-white/[0.02] border border-white/8 hover:border-white/15 transition-all group">
                  <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[14px] font-black"
                    style={{ backgroundColor: step.color + '20', color: step.color, border: `1px solid ${step.color}40` }}>
                    {step.step}
                  </div>
                  <div>
                    <h4 className="text-white font-black text-sm mb-1">{step.title}</h4>
                    <p className="text-slate-500 text-xs leading-relaxed group-hover:text-slate-400 transition-colors">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ── PRICING ───────────────────────────────────────────────────────────── */}
      <PricingSection />

      {/* ── CTA BANNER ────────────────────────────────────────────────────────── */}
      {sectionVisible('cta_banner') && (
      <section className="py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="relative p-12 md:p-20 rounded-[2.5rem] text-center overflow-hidden"
            style={{ background: `linear-gradient(to bottom right, ${gradFrom}1A, ${gradTo}1A)`, border: `1px solid ${gradFrom}33` }}>
            <div className="absolute -bottom-20 right-0 w-[300px] h-[300px] rounded-full opacity-20 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${gradFrom} 0%, transparent 70%)`, filter: 'blur(60px)' }} />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
                {ctaHead}<br />
                <span className="italic" style={gText}>{ctaAccent}</span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">{ctaSub}</p>
              <button onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] transition-all"
                style={{ background: gLR, boxShadow: `0 8px 40px ${gradFrom}50` }}>
                {ctaBtn}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      )}

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="HR-X" productTagline="AI Recruitment Intelligence" accentColor={gradFrom} />
      <Footer />
    </main>
  );
}
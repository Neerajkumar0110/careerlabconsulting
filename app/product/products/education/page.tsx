'use client';

import React, { useEffect, useRef, useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import ExecutionFlow from '@/components/product/ExecutionFlow';
import FeatureGrid from '@/components/product/FeatureGrid';
import SuccessStories from '@/components/product/SuccessStories';
import { GraduationCap, BookOpenCheck, Laptop, Users, Sparkles, Trophy } from 'lucide-react';
import CTAModal from '@/components/product/CTAModel';
import TrustedIntegration from '@/components/product/TrustedIntegrations';
import { usePageContent } from '@/hooks/usePageContent';

// ── Inline icons ──────────────────────────────────────────────────────────────
const GradCapIcon = ({ size = 11, className = '', style = {} }: { size?: number; className?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const SparklesIconSvg = ({ size = 12, className = '', style = {} }: { size?: number; className?: string; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
    <path d="M19 3l.8 2.2L22 6l-2.2.8L19 9l-.8-2.2L16 6l2.2-.8z" />
    <path d="M5 15l.8 2.2L8 18l-2.2.8L5 21l-.8-2.2L2 18l2.2-.8z" />
  </svg>
);
const BotIconSvg = ({ size = 14, style = {} }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><line x1="8" y1="16" x2="8" y2="16" /><line x1="16" y1="16" x2="16" y2="16" />
  </svg>
);
const LayersIconSvg = ({ size = 14, style = {} }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);
const CodeIconSvg = ({ size = 14, style = {} }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const ArrowRightIconSvg = ({ size = 13, className = '' }: { size?: number; className?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// ── Fade-in hook ──────────────────────────────────────────────────────────────
function useFadeIn() {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible] as const;
}

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_STAT_PILLS_JSON = JSON.stringify([
  { value: '50k+', label: 'Learners'   },
  { value: '200+', label: 'Courses'    },
  { value: '94%',  label: 'Completion' },
  { value: '4.9★', label: 'Rating'     },
]);

const DEFAULT_COURSES_JSON = JSON.stringify([
  { title: 'AI Fundamentals',   level: 'Foundation',   target: 92, color: '#3b82f6', icon: 'Bot'      },
  { title: 'Data Architecture', level: 'Advanced',     target: 74, color: '#6366f1', icon: 'Layers'   },
  { title: 'GenAI Operations',  level: 'Professional', target: 88, color: '#8b5cf6', icon: 'Sparkles' },
  { title: 'ML Engineering',    level: 'Expert',       target: 61, color: '#06b6d4', icon: 'Code'     },
]);

const DEFAULT_BADGES_JSON = JSON.stringify([
  { emoji: '🏆', label: 'Top Performer' },
  { emoji: '⚡', label: 'Fast Learner'  },
  { emoji: '🎯', label: 'Precision'     },
  { emoji: '🔥', label: '30-day Streak' },
  { emoji: '🌟', label: 'Expert'        },
]);

const DEFAULT_FEATURE_CARDS_JSON = JSON.stringify([
  { title: 'Adaptive Curriculum',      desc: 'AI agents that dynamically adjust course difficulty and content based on real-time learner performance.',         icon: 'BookOpenCheck' },
  { title: 'Institutional Automation', desc: 'Streamline admissions, grading, and administrative workflows with zero-latency autonomous systems.',              icon: 'Laptop'        },
  { title: 'Skill Gap Analysis',       desc: 'Predictive modeling to identify enterprise skill shortages and automatically generate targeted training.',        icon: 'Trophy'        },
]);

const DEFAULT_VALUE_PROPS_JSON = JSON.stringify([
  { title: 'AI Tutoring Agents',    desc: '24/7 autonomous mentors that provide instant feedback and complex concept clarification.',              icon: 'Sparkles'     },
  { title: 'Collaborative Labs',    desc: 'Virtual sandbox environments for team-based project development and peer review.',                    icon: 'Users'        },
  { title: 'Verified Certification', desc: 'Blockchain-backed credentials that instantly validate employee or student achievements.',            icon: 'GraduationCap' },
]);

const DEFAULT_STATS_JSON = JSON.stringify([
  { value: '50k+', label: 'Active Learners'      },
  { value: '200+', label: 'Courses'              },
  { value: '94%',  label: 'Completion Rate'      },
  { value: '4.9★', label: 'Learner Satisfaction' },
]);

// ── Icon registries ───────────────────────────────────────────────────────────
type CourseIconProps = { size?: number; style?: React.CSSProperties };
const COURSE_ICON_MAP: Record<string, React.ComponentType<CourseIconProps>> = {
  Bot:      BotIconSvg,
  Layers:   LayersIconSvg,
  Code:     CodeIconSvg,
  Sparkles: SparklesIconSvg,
};

const FEATURE_ICON_MAP: Record<string, React.ElementType> = {
  BookOpenCheck,
  Laptop,
  Trophy,
};

const VALUE_ICON_MAP: Record<string, React.ElementType> = {
  Sparkles,
  Users,
  GraduationCap,
};

const EducationLearningPage = () => {
  const [ref, visible] = useFadeIn();
  const [progress, setProgress] = useState([0, 0, 0, 0]);
  const [modalOpen, setModalOpen] = useState(false);

  const { get } = usePageContent('education-suite');

  // ── CMS values ────────────────────────────────────────────────────────────
  const accentPrimary     = get('hero', 'accent_primary',     '#6366f1');
  const accentSecondary   = get('hero', 'accent_secondary',   '#3b82f6');
  const badgeText         = get('hero', 'badge_text',         'AI-Driven Upskilling');
  const headline1         = get('hero', 'headline_1',         'EDUCATION');
  const headline2Ampersand = get('hero', 'headline_2_amp',    '&');
  const headline3         = get('hero', 'headline_3',         'LEARNING');
  const heroBody          = get('hero', 'body_text',          'The future of intellect is autonomous. AI-powered learning management systems and personalized upskilling pathways designed for modern enterprises and academic institutions.');
  const heroBtn1Label     = get('hero', 'btn_1_label',        'Deploy Learning Hub');
  const heroBtn2Label     = get('hero', 'btn_2_label',        'WhatsApp Demo');
  const whatsappNumber    = get('hero', 'whatsapp_number',    '919810984968');
  const whatsappMsg       = get('hero', 'whatsapp_message',   "Hello! I'm interested in Education Suite and would like to see a institutional demo.");
  const heroImageUrl      = get('hero', 'hero_image_url',     'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260');

  const statPillsRaw      = get('hero', 'stat_pills_json',    DEFAULT_STAT_PILLS_JSON);
  const statPills         = safeParse<{ value: string; label: string }[]>(statPillsRaw, []);

  const dashboardTitle    = get('dashboard', 'title',         'Learning Pathways');
  const dashboardSubtitle = get('dashboard', 'subtitle',      'Personalized · AI-curated');
  const dashboardBadge    = get('dashboard', 'badge_label',   'Adaptive AI');
  const aiRecommendText   = get('dashboard', 'ai_recommend',  'Advanced Prompt Engineering · starts in 2 days');
  const achievementsLabel = get('dashboard', 'achievements_label', 'Recent Achievements');

  const coursesRaw        = get('dashboard', 'courses_json',  DEFAULT_COURSES_JSON);
  const courses           = safeParse<{ title: string; level: string; target: number; color: string; icon: string }[]>(coursesRaw, []);

  const badgesRaw         = get('dashboard', 'badges_json',   DEFAULT_BADGES_JSON);
  const badges            = safeParse<{ emoji: string; label: string }[]>(badgesRaw, []);

  const featuresHeadline  = get('features', 'headline',       'Core Learning');
  const featuresAccent    = get('features', 'accent_word',    'Modules');
  const featureCardsRaw   = get('features', 'items_json',     DEFAULT_FEATURE_CARDS_JSON);
  const featureCards      = safeParse<{ title: string; desc: string; icon: string }[]>(featureCardsRaw, []);

  const valueSectionTitle = get('value', 'headline',          'Evolving Intellect');
  const valuePropsRaw     = get('value', 'items_json',        DEFAULT_VALUE_PROPS_JSON);
  const valueProps        = safeParse<{ title: string; desc: string; icon: string }[]>(valuePropsRaw, []);
  const valueSectionImage = get('value', 'image_url',         'https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1260');

  const statsRaw          = get('stats', 'items_json',        DEFAULT_STATS_JSON);
  const statsItems        = safeParse<{ value: string; label: string }[]>(statsRaw, []);

  const ctaHeadline       = get('cta', 'headline',            'FUTURE-PROOF YOUR TALENT');
  const ctaBody           = get('cta', 'body_text',           'Our educational architects in Gurugram are ready to deploy your autonomous learning network.');
  const ctaBtnLabel       = get('cta', 'btn_label',           'START UPSKILLING');
  const ctaPhone          = get('cta', 'phone',               '+91 870023 6923');

  // Animate progress bars on mount/visible
  useEffect(() => {
    if (!visible || courses.length === 0) return;
    const t = setTimeout(() => {
      courses.forEach((course, i) => {
        let v = 0;
        const interval = setInterval(() => {
          v = Math.min(v + 1, course.target);
          setProgress(p => {
            const next = [...p];
            next[i] = v;
            return next;
          });
          if (v >= course.target) clearInterval(interval);
        }, 12 + i * 4);
      });
    }, 400);
    return () => clearTimeout(t);
  }, [visible, courses.length]);

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        ref={ref as React.RefObject<HTMLElement>}
        className="relative min-h-screen flex items-center overflow-hidden bg-[#03070e] px-5 sm:px-8 lg:px-14 py-20 pt-28"
      >
        {/* Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentPrimary} 0%, transparent 70%)`, filter: 'blur(100px)', opacity: 0.1 }} />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background: `radial-gradient(circle, ${accentSecondary} 0%, transparent 70%)`, filter: 'blur(80px)', opacity: 0.08 }} />

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* LEFT */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateY(28px)', transition: 'all 0.7s ease' }}
            className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border mb-6"
              style={{ borderColor: `${accentPrimary}50`, background: `${accentPrimary}1a` }}>
              <GradCapIcon size={11} style={{ color: accentPrimary }} />
              <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: accentPrimary }}>{badgeText}</span>
            </div>

            <h1 className="font-black leading-none mb-5" style={{ fontSize: 'clamp(2.8rem, 8vw, 5.5rem)', letterSpacing: '-0.04em' }}>
              <span className="text-white">{headline1}</span>
              <br />
              <span style={{ WebkitTextStroke: `1.5px ${accentPrimary}80`, color: 'transparent' }}>{headline2Ampersand}</span>
              <span style={{ color: accentPrimary }}> {headline3}</span>
            </h1>

            <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8">{heroBody}</p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-3 mb-8">
              {statPills.map(({ value, label }) => (
                <div key={label} className="flex flex-col items-center px-3 md:px-7 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <p className="text-white font-black text-sm">{value}</p>
                  <p className="text-slate-600 text-[9px] uppercase tracking-wider">{label}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                className="group w-full flex items-center justify-center gap-2 px-7 py-4 text-white rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all"
                style={{ background: accentPrimary, boxShadow: `0 20px 40px ${accentPrimary}40` }}
                onClick={() => setModalOpen(true)}
              >
                {heroBtn1Label}
                <ArrowRightIconSvg size={13} className="group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
                {heroBtn2Label}
              </a>
            </div>
          </div>

          {/* RIGHT — Learning dashboard */}
          <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'none' : 'translateX(36px)', transition: 'all 0.8s ease 0.25s' }}>
            <div className="relative bg-[#060c1a] border border-white/[0.08] rounded-3xl p-5 md:p-7 overflow-hidden"
              style={{ boxShadow: `0 0 60px ${accentPrimary}1a` }}>
              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div>
                  <p className="text-white text-sm font-black">{dashboardTitle}</p>
                  <p className="text-slate-600 text-[9px]">{dashboardSubtitle}</p>
                </div>
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full border"
                  style={{ background: `${accentPrimary}1a`, borderColor: `${accentPrimary}40` }}>
                  <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentPrimary }} />
                  <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: accentPrimary }}>{dashboardBadge}</span>
                </div>
              </div>

              {/* Course progress cards */}
              <div className="space-y-3 mb-5">
                {courses.map((course, i) => {
                  const Icon = COURSE_ICON_MAP[course.icon] ?? BotIconSvg;
                  return (
                    <div key={course.title} className="p-3 rounded-xl"
                      style={{ background: course.color + '0a', border: `1px solid ${course.color}22` }}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                          style={{ background: course.color + '20', border: `1px solid ${course.color}40` }}>
                          <Icon size={14} style={{ color: course.color }} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-xs font-black truncate">{course.title}</p>
                          <p className="text-[9px]" style={{ color: course.color }}>{course.level}</p>
                        </div>
                        <p className="text-white text-xs font-black shrink-0">{progress[i]}%</p>
                      </div>
                      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
                        <div className="h-full rounded-full"
                          style={{ width: `${progress[i]}%`, background: `linear-gradient(90deg, ${course.color}, ${course.color}bb)`, transition: 'width 0.05s linear' }} />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Achievement badges */}
              <div className="pt-4 border-t border-white/5">
                <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-2">{achievementsLabel}</p>
                <div className="flex gap-2 flex-wrap">
                  {badges.map(({ emoji, label }) => (
                    <div key={label} className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08]">
                      <span style={{ fontSize: 11 }}>{emoji}</span>
                      <span className="text-[8px] text-slate-400 font-bold">{label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI recommendation strip */}
              <div className="mt-4 p-3 rounded-xl"
                style={{ background: `linear-gradient(135deg, ${accentPrimary}1a, ${accentSecondary}12)`, border: `1px solid ${accentPrimary}33` }}>
                <div className="flex items-center gap-2">
                  <SparklesIconSvg size={12} style={{ color: accentPrimary }} className="shrink-0" />
                  <p className="text-slate-300 text-[10px]">
                    <span className="text-white font-black">AI recommends:</span>{' '}{aiRecommendText}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-black mb-4">
            {featuresHeadline}{' '}
            <span style={{ color: accentPrimary }}>{featuresAccent}</span>
          </h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((item, i) => {
            const Icon = FEATURE_ICON_MAP[item.icon] ?? BookOpenCheck;
            return (
              <div key={i}
                className="group p-10 rounded-[2.5rem] bg-blue-900/5 border border-white/5 transition-all"
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentPrimary}50`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                  style={{ background: `${accentPrimary}1a` }}
                  onMouseEnter={e => (e.currentTarget.style.background = accentPrimary)}
                  onMouseLeave={e => (e.currentTarget.style.background = `${accentPrimary}1a`)}>
                  <Icon className="w-8 h-8" style={{ color: accentPrimary }} />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      {/* ── VALUE PROPS SECTION ───────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 group">
            <img src={valueSectionImage} alt="Digital Classroom"
              className="w-full h-auto opacity-70 group-hover:scale-110 transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
          </div>
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic tracking-tight">{valueSectionTitle}</h2>
            <div className="space-y-8">
              {valueProps.map((point, idx) => {
                const Icon = VALUE_ICON_MAP[point.icon] ?? Sparkles;
                return (
                  <div key={idx} className="flex gap-5">
                    <div className="mt-1"><Icon className="w-5 h-5" style={{ color: accentSecondary }} /></div>
                    <div>
                      <h4 className="text-xl font-bold mb-1">{point.title}</h4>
                      <p className="text-gray-400">{point.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS ────────────────────────────────────────────────────────── */}
      <section className="py-12 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {statsItems.map(({ value, label }) => (
            <div key={label}>
              <div className="text-2xl md:text-4xl font-bold mb-1" style={{ color: accentPrimary }}>{value}</div>
              <div className="text-gray-500 text-sm uppercase tracking-widest">{label}</div>
            </div>
          ))}
        </div>
      </section>

      <FeatureGrid />
      <TrustedIntegration />
      <SuccessStories />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group"
          style={{ background: `linear-gradient(to bottom right, ${accentPrimary}26, ${accentSecondary}1a)`, border: `1px solid ${accentPrimary}33` }}>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"
            style={{ background: `${accentPrimary}1a` }} />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter italic">{ctaHeadline}</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button
                className="px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ background: '#fff', color: '#0f172a' }}
                onClick={() => setModalOpen(true)}
              >
                {ctaBtnLabel}
              </button>
              <div className="flex items-center gap-3 font-mono" style={{ color: accentPrimary }}>
                <Laptop className="w-4 h-4" />
                <span>{ctaPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="Education Suite" productTagline="AI Learning Management" accentColor={accentPrimary} />
      <Footer />
    </main>
  );
};

export default EducationLearningPage;
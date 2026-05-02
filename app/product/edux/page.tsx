'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Building2, GraduationCap, Users, BarChart3,
  ArrowRight, Shield, Globe, Zap, BookOpen,
  Database, Layers, Settings, Bell
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
const MODULE_ICONS = [BookOpen, Database, Users, Bell, BarChart3, Settings];
const MODULE_COLORS = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#7c3aed', '#dc2626'];

const FEATURE_ICONS = [Layers, Users, BookOpen, Globe, BarChart3, Shield];
const FEATURE_ACCENTS = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#7c3aed', '#dc2626'];
const STEP_COLORS = ['#4f46e5', '#0891b2', '#059669', '#d97706', '#7c3aed'];

export default function EduXPage() {
  const [modalOpen, setModalOpen] = useState(false);

  // ── Load all content from DB, with inline fallbacks ──────────────────────
  const { get, content } = usePageContent('edux');
  const sectionVisible = (key: string) => !!content?.[key];

  // Hero
  const heroBadge   = get('hero', 'badge_text',       'Institutional AI Operating System');
  const heroTitle   = get('hero', 'headline',          'EduX');
  const heroSub1    = get('hero', 'subheading_1',      'One Platform.');
  const heroSub2    = get('hero', 'subheading_2',      'Every Department.');
  const heroBody    = get('hero', 'body',              "EduX is the complete AI-powered operating system for educational institutions. It unifies ERP, CRM, LMS, and communications into one seamlessly integrated platform — built specifically for schools, colleges, and universities.");
  const ctaPrimary  = get('hero', 'cta_primary',       'Get EduX Demo');
  const ctaWhatsApp = get('hero', 'cta_whatsapp',      'WhatsApp Demo');
  const waNumber    = get('hero', 'whatsapp_number',   '919810984968');
  const waMsg       = get('hero', 'whatsapp_msg',      "Hello! I'm interested in EduX and would like to see a demo.");
  const gradFrom    = get('hero', 'accent_color_from', '#4f46e5');
  const gradTo      = get('hero', 'accent_color_to',   '#3b82f6');

  // Derived style helpers
  const gLR      = `linear-gradient(to right, ${gradFrom}, ${gradTo})`;
  const gLL      = `linear-gradient(to right, ${gradFrom}, ${gradFrom})`;
  const gBR      = `linear-gradient(to bottom right, ${gradFrom}, ${gradTo})`;
  const gText: React.CSSProperties = {
    backgroundImage: gLR,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };

  // Stats
  const stats = [1, 2, 3, 4].map((n) => ({
    value:  Number(get('stats', `stat_${n}_value`,  ['800', '3.2', '68', '99.8'][n - 1])),
    suffix: get('stats', `stat_${n}_suffix`, ['+', 'M+', '%', '%'][n - 1]),
    label:  get('stats', `stat_${n}_label`,  ['Institutions', 'Students', 'Ops Cost Reduction', 'Uptime SLA'][n - 1]),
    sub:    get('stats', `stat_${n}_sub`,    ['Schools, colleges & universities', 'Active on EduX platform', 'vs. fragmented tools', 'Always-on for institutions'][n - 1]),
  }));

  // Modules (hero visual)
  const modules = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    icon:   MODULE_ICONS[i],
    color:  MODULE_COLORS[i],
    label:  get('modules', `mod_${n}_label`, ['LMS', 'ERP', 'CRM', 'Communication', 'Analytics', 'Admin OS'][i]),
    desc:   get('modules', `mod_${n}_desc`,  ['Immersive AI learning', 'Finance & operations', 'Admissions & alumni', 'Omnichannel AI', 'Institutional insights', 'Staff & operations'][i]),
  }));

  // Features
  const featuresBadge  = get('features', 'section_badge',  'Platform Capabilities');
  const featuresHead   = get('features', 'headline',        'Everything an Institution');
  const featuresAccent = get('features', 'headline_accent', 'Could Ever Need');
  const features = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    icon:   FEATURE_ICONS[i],
    accent: FEATURE_ACCENTS[i],
    title:  get('features', `feat_${n}_title`, [
      'Unified Institutional ERP', 'AI-Powered Admissions CRM', 'Integrated LMS & Attendance',
      'Omnichannel Communication Hub', 'Institutional Analytics', 'Compliance & Accreditation',
    ][i]),
    desc: get('features', `feat_${n}_desc`, [
      'Manage fees, payroll, procurement, and budgets through a single AI-powered financial command center. Automated reconciliation, GST compliance, and real-time P&L dashboards built specifically for educational institutions.',
      'From application submission to enrollment, EduX automates every admissions touchpoint. Lead scoring for prospective students, personalized follow-up sequences, counselor dashboards, and conversion analytics all in one place.',
      'Full-featured AI learning management with AR/VR course delivery, automated attendance tracking via facial recognition, timetable management, and exam scheduling — seamlessly connected to academic records.',
      'Connect with students, parents, and faculty via WhatsApp, email, SMS, and push notifications from a unified AI communication center. Automated fee reminders, event alerts, and personalized academic updates.',
      'Real-time dashboards for leadership covering enrollment trends, academic performance, financial health, and operational efficiency. Predictive models flag at-risk students and forecast enrollment 12 months ahead.',
      'Automated report generation for NAAC, UGC, AICTE, and other regulatory bodies. Document management, audit trails, and policy compliance monitoring ensure your institution is always accreditation-ready.',
    ][i]),
  }));

  // How It Works
  const howBadge  = get('how_it_works', 'badge',           'EduX Deployment');
  const howHead   = get('how_it_works', 'headline',        'From fragmented tools');
  const howAccent = get('how_it_works', 'headline_accent', 'to one unified OS.');
  const howBody1  = get('how_it_works', 'body_1',          "Most institutions run 8–15 disconnected software tools — one for fees, one for attendance, one for admissions, one for communications. EduX replaces all of them with a single unified platform.");
  const howBody2  = get('how_it_works', 'body_2',          "During onboarding, our implementation team migrates all historical data, configures workflows to match your institution's processes, and trains staff in under 2 weeks. The transition is seamless — no data loss, no downtime.");
  const howBody3  = get('how_it_works', 'body_3',          "The result: administrative staff saves 30+ hours per week. Leadership gets real-time visibility across all departments. And students experience a seamless, modern digital campus.");
  const howCta    = get('how_it_works', 'cta_label',       'Book EduX Demo');
  const howWaMsg  = get('how_it_works', 'whatsapp_msg',    "Hi, I'm interested in EduX and would like to explore it.");
  const steps = [1, 2, 3, 4, 5].map((n, i) => ({
    step:  `0${n}`,
    color: STEP_COLORS[i],
    title: get('how_it_works', `step_${n}_title`, [
      'Discovery & Data Migration', 'Workflow Configuration', 'Staff Training & Go-Live',
      'AI Automation Activation', 'Continuous Optimization',
    ][i]),
    desc: get('how_it_works', `step_${n}_desc`, [
      'Our team audits your existing tools and migrates all institutional data to the EduX platform securely.',
      "EduX is configured to match your institution's admission process, fee structure, and academic calendar.",
      'Role-based training for admissions, finance, academic, and IT teams. Go-live in under 14 days.',
      'Communication automations, lead scoring, attendance tracking, and analytics dashboards all go live simultaneously.',
      'Dedicated success manager reviews performance monthly and continuously optimizes processes for your institution.',
    ][i]),
  }));

  // CTA Banner
  const ctaHead   = get('cta_banner', 'headline',        'Transform Your');
  const ctaAccent = get('cta_banner', 'headline_accent', 'Institution Today');
  const ctaSub    = get('cta_banner', 'subtext',         "Join 800+ institutions that have unified their operations, improved student outcomes, and reduced admin costs with EduX.");
  const ctaBtn    = get('cta_banner', 'cta_label',       'Request a Demo');

  // Modules integration note
  const modNote1  = get('modules', 'note_label', 'All modules integrated');
  const modNote2  = get('modules', 'note_sub',   'Single sign-on · Shared data layer · Unified dashboard');

  return (
    <main className="bg-[#020617] min-h-screen font-sans overflow-x-hidden">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      {sectionVisible('hero') && (
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 px-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px"
            style={{ background: `linear-gradient(to right, transparent, ${gradFrom}4D, transparent)` }} />
          <div className="absolute -top-40 -right-40 w-[700px] h-[700px] rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${gradFrom}99 0%, transparent 70%)`, filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${gradTo}80 0%, transparent 70%)`, filter: 'blur(80px)' }} />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: `radial-gradient(${gradFrom} 1px, transparent 1px)`, backgroundSize: '32px 32px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* Left */}
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full my-6 md:my-4"
                style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}4D` }}>
                <Building2 size={11} style={{ color: gradFrom }} />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: gradFrom }}>
                  {heroBadge}
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl sm:text-6xl xl:text-[8rem] font-black text-white leading-none tracking-wide mb-4">
                {heroTitle.replace(/X$/, '')}
                <span style={gText}>X</span>
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl md:text-3xl font-black uppercase tracking-tight mb-6">
                <span className="text-slate-400">{heroSub1}</span>{' '}<br />
                <span className="italic" style={gText}>{heroSub2}</span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                {heroBody}
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
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

            {/* Right — Module Grid */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <div className="rounded-3xl p-6 border border-white/10"
                style={{ background: '#0B1121', boxShadow: `0 0 60px ${gradFrom}1F` }}>
                <p className="text-white font-black text-xs uppercase tracking-widest mb-5">Platform Modules</p>
                <div className="grid grid-cols-3 gap-3">
                  {modules.map((mod, i) => (
                    <motion.div key={mod.label}
                      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 + i * 0.08 }}
                      className="group flex flex-col items-center gap-2 p-4 rounded-2xl border border-white/8 bg-white/[0.02] transition-all cursor-pointer"
                      onMouseEnter={e => (e.currentTarget.style.borderColor = mod.color + '50')}
                      onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)')}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center border"
                        style={{ backgroundColor: mod.color + '15', borderColor: mod.color + '30' }}>
                        <mod.icon size={18} style={{ color: mod.color }} />
                      </div>
                      <p className="text-white font-black text-[11px] uppercase tracking-wider">{mod.label}</p>
                      <p className="text-slate-500 text-[10px] text-center leading-tight group-hover:text-slate-400 transition-colors">{mod.desc}</p>
                    </motion.div>
                  ))}
                </div>
                <div className="mt-5 p-4 rounded-2xl border"
                  style={{ background: `${gradFrom}0D`, borderColor: `${gradFrom}33` }}>
                  <p className="font-black text-[9px] uppercase tracking-widest mb-1" style={{ color: gradFrom }}>{modNote1}</p>
                  <p className="text-slate-400 text-xs">{modNote2}</p>
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
              <GraduationCap size={11} /> {featuresBadge}
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
                <div className="relative z-10">
                  <div className="w-11 h-11 rounded-2xl flex items-center justify-center mb-5 border"
                    style={{ backgroundColor: feat.accent + '15', borderColor: feat.accent + '40' }}>
                    <feat.icon size={20} style={{ color: feat.accent }} />
                  </div>
                  <h2 className="text-white font-black text-base mb-3 tracking-tight">{feat.title}</h2>
                  <p className="text-slate-500 text-sm leading-relaxed group-hover:text-slate-400 transition-colors">{feat.desc}</p>
                </div>
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
            <div className="absolute -bottom-20 -right-20 w-[300px] h-[300px] rounded-full opacity-20 pointer-events-none"
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

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="EduX" productTagline="Institutional AI Operating System" accentColor={gradFrom} />
      <Footer />
    </main>
  );
}
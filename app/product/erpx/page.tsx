'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BarChart2, DollarSign, TrendingUp, Calculator, Receipt,
  ArrowRight, Clock, Shield, Database, Zap,
  PieChart, FileText, Users, Activity, ChevronUp, RefreshCw
} from 'lucide-react';
import Navbar from "@/components/product/Navbar";
const Footer = dynamic(() => import("@/components/product/Footer"));
import PricingSection from '@/components/product/B2BPricingSection';
import CTAModal from '@/components/product/CTAModel';
import dynamic from 'next/dynamic';
import WhatsAppButton from '@/components/product/WhatsAppButton';
import { usePageContent } from '@/hooks/usePageContent';

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
const FEATURE_ICONS   = [Calculator, Users, TrendingUp, Receipt, Database, PieChart];
const FEATURE_ACCENTS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#06b6d4', '#ef4444'];
const STEP_COLORS     = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444'];

const FINANCE_METRICS = [
  { label: 'Cash Flow',    color: '#10b981' },
  { label: 'Payables',     color: '#f59e0b' },
  { label: 'Receivables',  color: '#3b82f6' },
  { label: 'Tax Liability', color: '#ef4444' },
];

const CHART_HEIGHTS = [45, 60, 38, 75, 55, 80, 70, 90, 65, 85, 72, 95];

export default function ErpXPage() {
  const [modalOpen, setModalOpen] = useState(false);

  // ── Load all content from DB, with inline fallbacks ──────────────────────
  const { get, content } = usePageContent('erpx');
  const sectionVisible = (key: string) => !!content?.[key];

  // Helper to get block value by block_key (mirrors ManeeLivePreview)
  const getBlockValue = (section: any, blockKey: string, fallback: string) => {
    const block = section?.content_blocks?.find((b: any) => b.block_key === blockKey);
    return block?.value || fallback;
  };

  // Hero
  const heroBadge   = get('hero', 'badge_text',       'AI Finance Command Center');
  const heroTitle   = get('hero', 'headline',          'ERP—X');
  const heroSub1    = get('hero', 'subheading_1',      'Finance on Autopilot.');
  const heroSub2    = get('hero', 'subheading_2',      'Always Accurate.');
  const heroBody    = get('hero', 'body',              'ERP-X is the complete AI finance command center. From payroll and procurement to tax filing and revenue forecasting — every financial process runs autonomously, accurately, and in full compliance.');
  const ctaPrimary  = get('hero', 'cta_primary',       'Automate Finance');
  const ctaWhatsApp = get('hero', 'cta_whatsapp',      'WhatsApp Demo');
  const waNumber    = get('hero', 'whatsapp_number',   '919810984968');
  const waMsg       = get('hero', 'whatsapp_msg',      "Hello! I'm interested in ERP-X and would like to see ERP-X Live.");

  // Dashboard metric values (DB-driven)
  const dashMetrics = [
    { label: 'Cash Flow',     value: get('hero', 'dash_cash_flow',     '+₹12.4L'), color: '#10b981' },
    { label: 'Payables',      value: get('hero', 'dash_payables',      '₹8.2L'),   color: '#f59e0b' },
    { label: 'Receivables',   value: get('hero', 'dash_receivables',   '₹21.8L'),  color: '#3b82f6' },
    { label: 'Tax Liability', value: get('hero', 'dash_tax_liability', '₹3.1L'),   color: '#ef4444' },
  ];

  const gradFrom = get('hero', 'accent_color_from', '#f59e0b');
  const gradTo   = get('hero', 'accent_color_to',   '#f97316');

  // Stats
  const stats = [1, 2, 3, 4].map((n) => ({
    value:  Number(get('stats', `stat_${n}_value`,  ['75', '99.7', '2', '320'][n - 1])),
    suffix: get('stats', `stat_${n}_suffix`, ['%', '%', 'hrs', '+'][n - 1]),
    label:  get('stats', `stat_${n}_label`,  ['Finance Time Saved', 'Payroll Accuracy', 'Month-End Close', 'Enterprises'][n - 1]),
    sub:    get('stats', `stat_${n}_sub`,    ['On manual processes', 'Zero errors guarantee', 'Vs. industry avg of 5 days', 'Powered by ERP-X'][n - 1]),
  }));

  // Features
  const featuresBadge  = get('features', 'section_badge',   'Financial Modules');
  const featuresHead   = get('features', 'headline',         'Complete Finance');
  const featuresAccent = get('features', 'headline_accent',  'Automation Stack');
  const features = [1, 2, 3, 4, 5, 6].map((n, i) => ({
    icon:   FEATURE_ICONS[i],
    accent: FEATURE_ACCENTS[i],
    title:  get('features', `feat_${n}_title`, [
      'Intelligent Budget Planning',
      'Automated Payroll Processing',
      'Revenue Forecasting Engine',
      'GST & Tax Management',
      'Accounts Payable & Receivable',
      'Real-Time Financial Dashboards',
    ][i]),
    desc: get('features', `feat_${n}_desc`, [
      'ERP-X analyzes historical spending, forecasts future needs, and generates department-level budget recommendations automatically. AI-assisted scenario planning lets you stress-test budgets against market conditions before committing.',
      'End-to-end payroll automation with statutory compliance — PF, ESI, TDS, professional tax, and LWF calculated and filed autonomously. Salary slips generated, disbursement initiated, and compliance reports submitted on schedule.',
      'Predictive revenue models built on your historical financials, pipeline data, market trends, and seasonal patterns. ERP-X provides 3-month, 6-month, and 12-month revenue forecasts with confidence intervals and scenario ranges.',
      'Automated GST reconciliation, GSTR-1, GSTR-3B, and annual return filings. TDS management, advance tax calculations, and income tax workings all handled autonomously with audit-ready documentation generated instantly.',
      'Automated invoice processing with 3-way PO matching. Intelligent payment scheduling to optimize cash flow. Automated dunning sequences for outstanding receivables with escalation workflows and dispute management.',
      'CFO-grade dashboards with P&L, balance sheet, cash flow, and working capital metrics updated in real-time. Drill-down from company level to department to individual transaction in seconds. Shareable board packs generated automatically.',
    ][i]),
  }));

  // How It Works
  const howBadge  = get('how_it_works', 'badge',           'The ERP-X Engine');
  const howHead   = get('how_it_works', 'headline',        'Close books in hours,');
  const howAccent = get('how_it_works', 'headline_accent', 'not days.');
  const howBody1  = get('how_it_works', 'body_1',          'ERP-X connects to your banking channels, payment gateways, procurement systems, and payroll inputs on day one. It begins learning your financial patterns — expense categories, vendor payment cycles, revenue timelines, and tax obligations.');
  const howBody2  = get('how_it_works', 'body_2',          'Month-end closing, which traditionally takes 5–8 days, is compressed to under 2 hours. ERP-X reconciles accounts, flags discrepancies, and prepares financial statements with audit-ready supporting documentation automatically.');
  const howBody3  = get('how_it_works', 'body_3',          'Every financial decision your team makes is now backed by real-time forecasts and scenario analysis, turning your finance function from a record-keeping cost center into a strategic business driver.');
  const howCta    = get('how_it_works', 'cta_label',       'Talk About ERP-X');
  const howWaMsg  = get('how_it_works', 'whatsapp_msg',    "Hi, I'm interested in ERP-X and would like to see how it can automate financial operations and reduce our month-end closing time. Can we schedule a walkthrough?");
  const steps = [1, 2, 3, 4, 5].map((n, i) => ({
    step:  `0${n}`,
    color: STEP_COLORS[i],
    title: get('how_it_works', `step_${n}_title`, [
      'Banking & System Integration',
      'Transaction Classification',
      'Compliance Automation',
      'Payroll Processing',
      'Reporting & Forecasting',
    ][i]),
    desc: get('how_it_works', `step_${n}_desc`, [
      'Connect bank accounts, payment gateways, HR payroll inputs, and procurement systems in under 48 hours.',
      'AI auto-categorizes every transaction using ML-trained models that learn your accounting chart of accounts.',
      'GST, TDS, PF, and ESI calculations run automatically. Returns are prepared and filed on the statutory deadline.',
      'Monthly payroll runs automatically on your configured date. Salary slips sent. Bank transfers initiated. Compliances filed.',
      'Real-time P&L, balance sheet, and cash flow statements. 12-month revenue and expense forecasts always up to date.',
    ][i]),
  }));

  // CTA Banner
  const ctaHead   = get('cta_banner', 'headline',        'Your Finance Team');
  const ctaAccent = get('cta_banner', 'headline_accent', 'Just Got 10x Faster');
  const ctaSub    = get('cta_banner', 'subtext',         'Automate every financial process. Close books faster. File taxes without stress. Let ERP-X run your finance engine.');
  const ctaBtn    = get('cta_banner', 'cta_label',       'Start Automating');

  return (
    <main className="bg-[#020617] min-h-screen font-sans overflow-x-hidden">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────────── */}
      {sectionVisible('hero') && (
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-20 pb-12 px-5 sm:px-8 lg:px-12">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />
          <div className="absolute -top-20 left-0 w-[600px] h-[600px] rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${gradFrom}80 0%, transparent 70%)`, filter: 'blur(80px)' }} />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-10"
            style={{ background: `radial-gradient(circle, ${gradTo}66 0%, transparent 70%)`, filter: 'blur(80px)' }} />
          <div className="absolute inset-0 opacity-[0.02]"
            style={{ backgroundImage: `radial-gradient(${gradFrom}CC 1px, transparent 1px)`, backgroundSize: '44px 44px' }} />
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full my-5 md:my-4"
                style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}4D` }}>
                <BarChart2 size={11} style={{ color: gradFrom }} />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: gradFrom }}>{heroBadge}</span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                className="text-6xl sm:text-7xl xl:text-9xl font-black text-white leading-none tracking-wide mb-4">
                {heroTitle.includes('—X')
                  ? <>{heroTitle.replace('—X', '')}<span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(to bottom right, ${gradFrom}, ${gradTo})` }}>—X</span></>
                  : heroTitle
                }
              </motion.h1>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                className="text-xl md:text-3xl font-black uppercase tracking-tight mb-6">
                <span className="text-transparent bg-clip-text italic"
                  style={{ backgroundImage: `linear-gradient(to right, ${gradFrom}, ${gradTo})` }}>
                  {heroSub1}
                </span>
                <br /><span className="text-slate-400">{heroSub2}</span>
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="text-slate-400 text-base md:text-lg leading-relaxed max-w-lg mb-10">
                {heroBody}
              </motion.p>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4">
                <button onClick={() => setModalOpen(true)}
                  className="group flex items-center justify-center gap-3 px-8 py-4 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all shadow-xl"
                  style={{ background: `linear-gradient(to right, ${gradFrom}, ${gradTo})`, boxShadow: `0 8px 32px ${gradFrom}50` }}>
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

            {/* Right — Finance Dashboard Mockup */}
            <motion.div initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.3 }}>
              <div className="bg-[#0B1121] border border-white/10 rounded-3xl p-6"
                style={{ boxShadow: `0 0 80px ${gradFrom}1A` }}>
                <div className="flex items-center justify-between mb-5">
                  <p className="text-white font-black text-xs uppercase tracking-widest">Finance Overview</p>
                  <div className="flex items-center gap-1.5 text-[9px] font-bold"
                    style={{ color: gradFrom }}>
                    <RefreshCw size={9} className="animate-spin" />
                    Syncing
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-5">
                  {dashMetrics.map((m) => (
                    <div key={m.label} className="p-3 bg-white/[0.03] rounded-xl border border-white/8">
                      <p className="text-slate-500 text-[9px] font-bold uppercase tracking-wider mb-1">{m.label}</p>
                      <p className="font-black text-lg" style={{ color: m.color }}>{m.value}</p>
                    </div>
                  ))}
                </div>

                {/* Mini bar chart */}
                <div className="h-24 bg-white/[0.02] border border-white/5 rounded-2xl mb-4 flex items-end px-4 gap-1.5 pb-3 pt-4 overflow-hidden">
                  {CHART_HEIGHTS.map((h, i) => (
                    <motion.div key={i} initial={{ height: 0 }} animate={{ height: `${h}%` }} transition={{ delay: 0.5 + i * 0.05, duration: 0.5 }}
                      className="flex-1 rounded-t-sm"
                      style={{ backgroundColor: i === 11 ? gradFrom : `${gradFrom}${Math.round(0.2 * 255 + i * 0.04 * 255).toString(16).padStart(2, '0')}` }} />
                  ))}
                </div>

                <div className="flex gap-2">
                  {['Payroll', 'GST Filing', 'Close Books'].map((action) => (
                    <button key={action}
                      className="flex-1 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-wider text-center transition-all"
                      style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}33`, color: gradFrom }}
                      onMouseEnter={e => (e.currentTarget.style.background = `${gradFrom}33`)}
                      onMouseLeave={e => (e.currentTarget.style.background = `${gradFrom}1A`)}>
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
      <section className="py-20 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
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
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase mb-6"
              style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}4D`, color: gradFrom }}>
              <DollarSign size={11} /> {featuresBadge}
            </span>
            <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
              {featuresHead}<br />
              <span className="italic"
                style={{ backgroundImage: `linear-gradient(to right, ${gradFrom}, ${gradTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                {featuresAccent}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-7">
            {features.map((feat, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="group p-7 rounded-3xl bg-white/[0.02] border border-white/8 transition-all duration-500 hover:-translate-y-2"
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
      <section className="py-24 md:py-36 px-5 sm:px-8 lg:px-12 border-y border-white/5 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[9px] font-black tracking-[0.3em] uppercase mb-8"
                style={{ background: `${gradFrom}1A`, border: `1px solid ${gradFrom}4D`, color: gradFrom }}>
                {howBadge}
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6">
                {howHead}<br />
                <span className="italic"
                  style={{ backgroundImage: `linear-gradient(to right, ${gradFrom}, ${gradTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {howAccent}
                </span>
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
                  hoverFrom="hover:from-amber-400"
                  hoverTo="hover:to-orange-400"
                  shadowColor="shadow-[0_0_40px_rgba(245,158,11,0.3)]"
                  hoverShadowColor="hover:shadow-[0_0_60px_rgba(245,158,11,0.5)]"
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
                <span className="italic"
                  style={{ backgroundImage: `linear-gradient(to right, ${gradFrom}, ${gradTo})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {ctaAccent}
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">{ctaSub}</p>
              <button onClick={() => setModalOpen(true)}
                className="group inline-flex items-center gap-3 px-12 py-5 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.25em] transition-all shadow-2xl"
                style={{ background: `linear-gradient(to right, ${gradFrom}, ${gradTo})` }}>
                {ctaBtn}
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      )}

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="ERP-X" productTagline="AI Finance Command Center" accentColor={gradFrom} />
      <Footer />
    </main>
  );
}
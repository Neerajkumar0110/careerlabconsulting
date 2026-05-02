'use client';

import Link from "next/link";
import {
  ArrowRight,
  Database,
  BarChart3,
  Cloud,
  ShieldCheck,
  Briefcase,
} from "lucide-react";
import B2CHeader from "@/components/b2c/B2CHeader";
import Footer from "@/components/b2c/Footer";
import { usePageContent } from "@/hooks/usePageContent";

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface HighlightTag  { label: string }
interface StatItem      { label: string; value: string }
interface LearnItem     { text: string }
interface WhyItem       { icon: string; title: string; desc: string }
interface ExperienceItem{ icon: string; title: string; desc: string }

// ── Icon map ──────────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Database, BarChart3, Cloud, ShieldCheck, Briefcase, ArrowRight,
};

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_HIGHLIGHTS   = JSON.stringify(["Industry Projects","Cloud & Big Data","Mentor-Led","Job-Ready"]);
const DEFAULT_STATS        = JSON.stringify([{ label:"Weeks", value:"16+" },{ label:"Hands-on Projects", value:"5+" },{ label:"Tools Covered", value:"15+" },{ label:"Career Support", value:"100%" }]);
const DEFAULT_LEARN_ITEMS  = JSON.stringify([
  { text:"Data modeling & database design" },{ text:"ETL / ELT pipelines" },{ text:"Big Data & Spark fundamentals" },
  { text:"Advanced SQL & performance tuning" },{ text:"Data warehouses & data lakes" },
  { text:"Cloud data platforms (AWS / GCP / Azure)" },{ text:"Real-time data streaming" },
  { text:"Security, governance & compliance" },{ text:"Monitoring & optimization" },{ text:"Production deployment workflows" },
]);
const DEFAULT_WHY_ITEMS    = JSON.stringify([
  { icon:"Database", title:"High-Demand Role",         desc:"Every AI, analytics, and product team depends on reliable data pipelines." },
  { icon:"BarChart3", title:"Business-Critical Impact", desc:"Your systems directly power dashboards, decisions, and predictions." },
  { icon:"Cloud",    title:"Future-Proof Career",       desc:"Cloud data engineering is one of the fastest-growing tech roles." },
]);
const DEFAULT_EXP_ITEMS    = JSON.stringify([
  { icon:"Briefcase",  title:"Real Industry Projects", desc:"Work on live datasets, real pipelines, and production scenarios." },
  { icon:"ShieldCheck",title:"Expert Mentorship",      desc:"Weekly guidance from senior data engineers & architects." },
  { icon:"ArrowRight", title:"Career Acceleration",    desc:"Resume, portfolio, mock interviews & hiring guidance." },
]);

export default function InternXDataEngineerPage() {
  const { get } = usePageContent('internx-data-engineer');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentColor     = get('hero', 'accent_color',    '#3b82f6');
  const badgeLabel      = get('hero', 'badge_label',     'InternX Program');
  const heroTitle       = get('hero', 'headline',        'Data Engineer Internship');
  const heroBody        = get('hero', 'body_text',       'Learn how modern companies design scalable data pipelines, process massive datasets, and deploy analytics-ready systems in production.');
  const applyBtnLabel   = get('hero', 'apply_btn_label', 'Apply Now');
  const applyBtnHref    = get('hero', 'apply_btn_href',  '/b2c/apply');
  const finderBtnLabel  = get('hero', 'finder_btn_label','Find My Program');
  const finderBtnHref   = get('hero', 'finder_btn_href', '/b2c/program-finder');
  const highlightTags   = safeParse<HighlightTag[]>(get('hero', 'highlight_tags_json', DEFAULT_HIGHLIGHTS), []);

  // ── Stats ─────────────────────────────────────────────────────────────────
  const statsItems      = safeParse<StatItem[]>(get('stats', 'items_json', DEFAULT_STATS), []);

  // ── Why ───────────────────────────────────────────────────────────────────
  const whyHeadline     = get('why', 'headline', 'Why Become a Data Engineer?');
  const whyItems        = safeParse<WhyItem[]>(get('why', 'items_json', DEFAULT_WHY_ITEMS), []);

  // ── Learn ─────────────────────────────────────────────────────────────────
  const learnHeadline   = get('learn', 'headline',   'What You Will Learn');
  const learnItems      = safeParse<LearnItem[]>(get('learn', 'items_json', DEFAULT_LEARN_ITEMS), []);

  // ── Experience ────────────────────────────────────────────────────────────
  const expHeadline     = get('experience', 'headline',   'Internship Experience');
  const expItems        = safeParse<ExperienceItem[]>(get('experience', 'items_json', DEFAULT_EXP_ITEMS), []);

  // ── CTA ───────────────────────────────────────────────────────────────────
  const ctaHeadline     = get('cta', 'headline',          'Ready to Become a Data Engineer?');
  const ctaBody         = get('cta', 'body_text',         'Limited seats available for the next InternX cohort.');
  const ctaApplyLabel   = get('cta', 'apply_btn_label',   'Apply Now');
  const ctaAdvisorLabel = get('cta', 'advisor_btn_label', 'Talk to Advisor');
  const ctaApplyHref    = get('cta', 'apply_btn_href',    '/b2c/apply');
  const ctaAdvisorHref  = get('cta', 'advisor_btn_href',  '/b2c/contact');

  return (
    <main className="bg-[#0a0a0a] text-white">
      <B2CHeader />

      {/* HERO */}
      <section className="relative pt-36 pb-28 overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0"
          style={{ background: `radial-gradient(circle at top, ${accentColor}2e, transparent 60%)` }}
        />
        <div className="relative max-w-[1200px] mx-auto px-6">
          <span
            className="inline-flex items-center gap-2 mb-5 px-4 py-1 rounded-full border text-xs font-bold uppercase tracking-widest"
            style={{ borderColor: `${accentColor}4d`, background: `${accentColor}1a`, color: accentColor }}
          >
            {badgeLabel}
          </span>
          <h1 className="text-4xl md:text-6xl font-black leading-tight max-w-3xl">{heroTitle}</h1>
          <p className="mt-6 text-lg text-slate-400 max-w-2xl">{heroBody}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            {highlightTags.map((tag, i) => (
              <span key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-sm text-slate-300">
                {typeof tag === 'string' ? tag : tag.label}
              </span>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link
              href={applyBtnHref}
              className="px-10 py-4 rounded-xl font-black text-xs uppercase tracking-widest flex items-center gap-2 shadow-xl transition-all hover:opacity-90"
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}4d` }}
            >
              {applyBtnLabel} <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href={finderBtnHref}
              className="border border-white/20 hover:border-white/40 px-10 py-4 rounded-xl font-bold text-xs uppercase tracking-widest transition-all"
            >
              {finderBtnLabel}
            </Link>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6 grid md:grid-cols-4 gap-8 text-center">
          {statsItems.map((s, i) => (
            <div key={i}>
              <div className="text-3xl font-black" style={{ color: accentColor }}>{s.value}</div>
              <div className="mt-2 text-sm text-slate-400 uppercase tracking-widest">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">{whyHeadline}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {whyItems.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Database;
              return (
                <div
                  key={i}
                  className="p-8 rounded-2xl border border-white/10 bg-white/5 transition"
                  style={{ ['--hover-border' as any]: `${accentColor}4d` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                >
                  <Icon className="w-7 h-7 mb-5" style={{ color: accentColor }} />
                  <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* LEARN */}
      <section className="py-28 border-b border-white/10 bg-[#0d0d0d]">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">{learnHeadline}</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {learnItems.map((item, i) => (
              <div
                key={i}
                className="p-5 rounded-xl border border-white/10 bg-white/5 transition cursor-default"
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${accentColor}4d`; e.currentTarget.style.background = `${accentColor}0d`; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)'; }}
              >
                {item.text}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section className="py-28 border-b border-white/10">
        <div className="max-w-[1200px] mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-black mb-16">{expHeadline}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {expItems.map((item, i) => {
              const Icon = ICON_MAP[item.icon] ?? Briefcase;
              return (
                <div
                  key={i}
                  className="p-8 rounded-2xl border border-white/10 bg-white/5 transition"
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)')}
                >
                  <Icon className="w-7 h-7 mb-5" style={{ color: accentColor }} />
                  <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                  <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0" style={{ background: `linear-gradient(to top right, ${accentColor}33, transparent)` }} />
        <div className="relative max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-black">{ctaHeadline}</h2>
          <p className="mt-6 text-slate-400">{ctaBody}</p>
          <div className="mt-14 flex justify-center gap-4 flex-wrap">
            <Link
              href={ctaApplyHref}
              className="px-14 py-5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl transition-all hover:opacity-90"
              style={{ background: accentColor, boxShadow: `0 20px 40px ${accentColor}66` }}
            >
              {ctaApplyLabel}
            </Link>
            <Link
              href={ctaAdvisorHref}
              className="border border-white/20 px-14 py-5 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-white/40 transition-all"
            >
              {ctaAdvisorLabel}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
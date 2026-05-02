'use client';

import Link from 'next/link';
import React from 'react';
import {
  MessageSquare, BookOpen, ArrowRight, BarChart2, Bot,
  GraduationCap, HeadphonesIcon, Scale, TrendingUp, Users,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

// ── helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare, BookOpen, BarChart2, Bot, GraduationCap,
  HeadphonesIcon, Scale, TrendingUp, Users,
};

// ── Types ─────────────────────────────────────────────────────────────────────
export interface FeatureItem {
  title: string;
  slug: string;
  desc: string;
  icon: string;
  gradient: string;
}

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURES: FeatureItem[] = [
  { title: 'Manee – Omni-Channel AI',              slug: 'manee',   desc: 'Your AI communication head. Handles calls, emails, chat, and social platforms autonomously 24/7.',                                               icon: 'MessageSquare', gradient: 'from-purple-400 to-pink-600'   },
  { title: 'CRM-X – Autonomous Growth',            slug: 'crmx',    desc: 'Automated marketing, lead scoring, content generation, and sales pipeline optimization without human supervision.',                              icon: 'TrendingUp',    gradient: 'from-yellow-400 to-orange-500' },
  { title: 'LMS-X – Immersive Learning',           slug: 'lmsx',    desc: 'AR/VR 3D learning environment with AI mentor and in-house code editor for next-gen education.',                                                  icon: 'BookOpen',      gradient: 'from-cyan-400 to-blue-600'     },
  { title: 'EduX – Institutional AI Suite',        slug: 'edux',    desc: 'Complete AI-powered ERP, CRM, LMS, and communication tools for schools, colleges, and universities.',                                            icon: 'GraduationCap', gradient: 'from-blue-400 to-indigo-600'   },
  { title: 'TwinX – Intelligent Executive AI',     slug: 'twinx',   desc: 'Role-aware AI assistant that generates business reports, analytics, and executive insights autonomously.',                                       icon: 'Bot',           gradient: 'from-emerald-400 to-teal-600'  },
  { title: 'LegalOS – Autonomous Legal Intelligence', slug: 'legalos', desc: 'Handles agreements, hiring documentation, compliance, and legal solutions without human oversight.',                                         icon: 'Scale',         gradient: 'from-red-400 to-rose-600'      },
  { title: 'ErpX – AI Finance Command',            slug: 'erpx',    desc: 'End-to-end finance automation: budget planning, payroll, revenue forecasts, and tax management autonomously.',                                   icon: 'BarChart2',     gradient: 'from-orange-400 to-yellow-500' },
  { title: 'HrX – AI Recruitment',                slug: 'hrx',     desc: 'Autonomous screening, virtual avatar interviews, skill assessment, and candidate ranking for faster hiring.',                                    icon: 'Users',         gradient: 'from-indigo-400 to-purple-500' },
  { title: 'SuppX – Autonomous Support',           slug: 'suppx',   desc: '24/7 AI support across e-commerce, healthcare, and ed-tech via calls, chats, and messages.',                                                    icon: 'HeadphonesIcon', gradient: 'from-teal-400 to-cyan-500'    },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function FeatureGrid() {
  const { get } = usePageContent('feature-grid');

  // CMS values
  const badge          = get('header', 'badge_text',      'Next-Gen AI Infrastructure');
  const headline1      = get('header', 'headline_1',      'Power Your Business');
  const headlineAccent = get('header', 'headline_accent', 'Autonomously');
  const subheading     = get('header', 'subheading',      'Integrate, deploy, and scale our autonomous AI products for communications, operations, finance, HR, and learning — all running seamlessly without supervision.');
  const accentColor    = get('header', 'accent_color',    '#3b82f6');
  const ctaHeadline    = get('cta', 'headline',           'Ready to deploy your AI ecosystem?');
  const ctaBody        = get('cta', 'body_text',          'Join 500+ enterprises running Manee, TwinX, EduX, LegalOS, and more to scale autonomously.');
  const ctaBtnLabel    = get('cta', 'btn_label',          'Start Free Trial');
  const ctaBtnHref     = get('cta', 'btn_href',           '/contact');
  const featuresRaw    = get('features', 'items_json',    JSON.stringify(DEFAULT_FEATURES));
  const features       = safeParse<FeatureItem[]>(featuresRaw, DEFAULT_FEATURES);

  return (
    <section className="py-12 md:py-20 bg-[#020617] relative overflow-hidden" id="features" aria-labelledby="features-title">
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] blur-[120px] rounded-full pointer-events-none"
        style={{ background: `${accentColor}0d` }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <span
            className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.2em] uppercase rounded-full"
            style={{ color: accentColor, background: `${accentColor}1a`, border: `1px solid ${accentColor}33` }}
          >
            {badge}
          </span>
          <h2
            id="features-title"
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight leading-[1.1]"
          >
            {headline1} <br />
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: `linear-gradient(to right, ${accentColor}, #6366f1)` }}
            >
              {headlineAccent}
            </span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl leading-relaxed">{subheading}</p>
        </div>

        {/* Feature cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon] ?? MessageSquare;
            return (
              <Link key={feature.slug} href={`/product/${feature.slug}`} className="block">
                <article className="group relative p-8 pb-5 pt-6 rounded-3xl bg-slate-900/30 border border-white/5 hover:border-blue-500/30 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full cursor-pointer"
                  style={{ '--hover-border': `${accentColor}4d` } as React.CSSProperties}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-blue-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl" />

                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${feature.gradient} p-0.5 mb-6 shadow-lg shadow-black/20`}>
                      <div className="w-full h-full bg-[#020617] rounded-[14px] flex items-center justify-center text-white">
                        <Icon className="w-6 h-6" strokeWidth={1.5} />
                      </div>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3 tracking-tight">{feature.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">{feature.desc}</p>
                  </div>

                  <div className="mt-auto pt-8 flex items-center text-[10px] font-black tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0 relative z-10"
                    style={{ color: accentColor }}
                  >
                    <span>Learn More</span>
                    <ArrowRight className="ml-2 w-3.5 h-3.5" />
                  </div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 p-8 md:p-14 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden group"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}, #4338ca)` }}
        >
          <div className="text-center md:text-left relative z-10">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 tracking-tight">{ctaHeadline}</h3>
            <p className="text-blue-100/80 text-lg">{ctaBody}</p>
          </div>
          <Link href={ctaBtnHref}>
            <button className="relative z-10 whitespace-nowrap px-12 py-5 bg-white font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-blue-50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)] transition-all active:scale-95"
              style={{ color: accentColor }}
            >
              {ctaBtnLabel}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
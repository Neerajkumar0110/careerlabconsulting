'use client';

import React, { useState } from 'react';
import {
  MessageSquare, BookOpen, ArrowRight, BarChart2, Bot,
  GraduationCap, HeadphonesIcon, Scale, TrendingUp, Users,
  Zap, Sparkles, Globe, Shield, Cpu, ShieldCheck,
  BarChart3, Bell, Database, Layers, Settings, Activity,
  Star, CheckCircle, Briefcase, Rocket, Brain, Lock,
} from 'lucide-react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import ProductCardModal from '@/components/product/ProductCardModal';
import { useRouter } from 'next/navigation';
import { usePageContent } from '@/hooks/usePageContent';

// ─── Icon registry — names stored in DB, resolved here ───────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  MessageSquare, BookOpen, BarChart2, Bot, GraduationCap,
  HeadphonesIcon, Scale, TrendingUp, Users, Zap, Sparkles,
  Globe, Shield, Cpu, ShieldCheck, BarChart3, Bell, Database,
  Layers, Settings, Activity, Star, CheckCircle, Briefcase,
  Rocket, Brain, Lock,
};

function resolveIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Zap;
}

// ─── Types for JSON-stored arrays ─────────────────────────────────────────────
interface StatItem   { value: string; label: string; icon: string }
interface ProductItem {
  title: string; slug: string; desc: string;
  gradient: string; icon: string; features: string[];
}
interface WhyItem    { title: string; desc: string; icon: string }
interface StepItem   { step: string; title: string; desc: string }
interface BulletItem { text: string }
interface TestimonialItem { quote: string; name: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ─── Default data (used as DB fallbacks) ──────────────────────────────────────
const DEFAULT_STATS: StatItem[] = [
  { value: '9+',    label: 'AI Products',       icon: 'Cpu'    },
  { value: '15+',   label: 'Industries Served',  icon: 'Globe'  },
  { value: '95%',   label: 'Automation Rate',    icon: 'Zap'    },
  { value: '99.9%', label: 'Uptime Guarantee',   icon: 'Shield' },
];

const DEFAULT_PRODUCTS: ProductItem[] = [
  { title: 'Manee – Omni-Channel AI',        slug: 'manee',   icon: 'MessageSquare', gradient: 'from-purple-400 to-pink-600',    desc: 'Your AI communication head. Handles calls, emails, chat, and social platforms autonomously 24/7.',           features: ['WhatsApp & Email Integration', 'AI Voice Automation', 'Sentiment Detection', 'Multi-platform Support'] },
  { title: 'CRM-X – Autonomous Growth',      slug: 'crmx',    icon: 'TrendingUp',    gradient: 'from-yellow-400 to-orange-500',  desc: 'Automated marketing, lead scoring, content generation, and sales pipeline optimization without human supervision.', features: ['Marketing Automation', 'Lead Scoring AI', 'Content Generation', 'Auto Funnels'] },
  { title: 'LMS-X – Immersive Learning',     slug: 'lmsx',    icon: 'BookOpen',      gradient: 'from-cyan-400 to-blue-600',      desc: 'AR/VR 3D learning environment with AI mentor and in-house code editor for next-gen education.',               features: ['AR/VR 3D Environments', 'AI Mentor System', 'Code Editor', 'Skill Analytics'] },
  { title: 'EduX – Institutional AI Suite',  slug: 'edux',    icon: 'GraduationCap', gradient: 'from-blue-400 to-indigo-600',    desc: 'Complete AI-powered ERP, CRM, LMS, and communication tools for schools, colleges, and universities.',          features: ['ERP + CRM + LMS', 'Admission Automation', 'Campus Operations', 'Student Analytics'] },
  { title: 'TwinX – Intelligent Executive',  slug: 'twinx',   icon: 'Bot',           gradient: 'from-emerald-400 to-teal-600',   desc: 'Role-aware AI assistant that generates business reports, analytics, and executive insights autonomously.',        features: ['CEO Business Reports', 'Real-Time Dashboard', 'Decision Support', 'Predictive Analytics'] },
  { title: 'LegalOS – Legal Intelligence',   slug: 'legalos', icon: 'Scale',         gradient: 'from-red-400 to-rose-600',       desc: 'Handles agreements, hiring documentation, compliance, and legal solutions without human oversight.',             features: ['Agreement Drafting', 'Risk Analysis', 'Smart Contracts', 'Compliance Tracking'] },
  { title: 'ErpX – AI Finance Command',      slug: 'erpx',    icon: 'BarChart2',     gradient: 'from-orange-400 to-yellow-500',  desc: 'End-to-end finance automation: budget planning, payroll, revenue forecasts, and tax management autonomously.',     features: ['Payroll Automation', 'Revenue Forecast', 'Tax Insights', 'Budget Planning'] },
  { title: 'HrX – AI Recruitment',           slug: 'hrx',     icon: 'Users',         gradient: 'from-indigo-400 to-purple-500',  desc: 'Autonomous screening, virtual avatar interviews, skill assessment, and candidate ranking for faster hiring.',    features: ['Avatar Interviews', 'Screening Engine', 'Ranking AI', 'Skill Assessment'] },
  { title: 'SuppX – Autonomous Support',     slug: 'suppx',   icon: 'HeadphonesIcon',gradient: 'from-teal-400 to-cyan-500',     desc: '24/7 AI support across e-commerce, healthcare, and ed-tech via calls, chats, and messages.',                    features: ['24/7 Global Agents', 'Voice + Chat', 'Ticket Resolution', 'Multi-language Support'] },
];

const DEFAULT_WHY: WhyItem[] = [
  { title: 'Fully Autonomous',   desc: 'AI agents that work 24/7 without human intervention, handling complex tasks independently',    icon: 'Zap'       },
  { title: 'Enterprise Grade',   desc: 'Built for scale with 99.9% uptime, enterprise security, and seamless integrations',            icon: 'Shield'    },
  { title: 'Rapid Deployment',   desc: 'Get started in minutes with pre-configured AI agents and intuitive dashboards',                icon: 'Cpu'       },
  { title: 'Cross-Platform',     desc: 'Unified AI infrastructure that works across all channels and touchpoints',                     icon: 'Globe'     },
  { title: 'Continuous Learning',desc: 'AI models that improve over time, adapting to your business needs automatically',             icon: 'Sparkles'  },
  { title: 'Cost Efficient',     desc: 'Reduce operational costs by up to 70% while increasing productivity exponentially',           icon: 'TrendingUp'},
];

const DEFAULT_STEPS: StepItem[] = [
  { step: '01', title: 'Connect',            desc: 'Integrate your communication channels, CRM, ERP, and workflows in minutes.'          },
  { step: '02', title: 'Train & Customize',  desc: 'AI adapts to your brand tone, workflows, and business rules automatically.'          },
  { step: '03', title: 'Automate & Scale',   desc: 'Deploy autonomous agents that operate 24/7 without supervision.'                     },
];

const DEFAULT_BULLETS: BulletItem[] = [
  { text: 'End-to-End Encryption'        },
  { text: 'Role-Based Access Control'    },
  { text: 'GDPR & SOC 2 Ready'           },
  { text: 'Secure Cloud Infrastructure'  },
];

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  { quote: 'Our operations became 3x faster after deploying their AI ecosystem.',      name: 'CEO, FinTech Startup'     },
  { quote: 'Autonomous CRM-X increased our revenue pipeline significantly.',           name: 'Marketing Director'       },
  { quote: 'We reduced support costs by 65% using SuppX AI agents.',                  name: 'E-Commerce Founder'       },
];

function createTheme(from: string, to: string) {
  return {
    gradientText: {
      backgroundImage: `linear-gradient(to right, ${from}, ${to})`,
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
    } as React.CSSProperties,

    gradientBg: `linear-gradient(to right, ${from}, ${to})`,

    softBg: `${from}40`, // low opacity
    border: `${from}60`,

    glow: `0 0 40px ${from}30`,

    // Tailwind-safe inline styles fallback
    accent: from,
    accentTo: to,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ExplorePage() {
  const router = useRouter();
  const [modalOpen, setModalOpen]   = useState(false);
  const [modalMode, setModalMode]   = useState<'form' | 'calendar' | 'select'>('select');
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const { get, content } = usePageContent('explore-more');
  const sectionVisible = (key: string) => !!content?.[key];

  // ── Hero ────────────────────────────────────────────────────────────────────
  const heroBadge    = get('hero', 'badge_text',     'Autonomous AI Ecosystem');
  const heroHead1    = get('hero', 'headline_1',     'Explore Our');
  const heroHead2    = get('hero', 'headline_2',     'AI-Powered');
  const heroHead3    = get('hero', 'headline_3',     'Solutions');
  const heroBody     = get('hero', 'body',           "Transform every department with autonomous AI agents. From communication to finance, from education to legal - we've built the complete AI infrastructure for your business.");
  const heroGradFrom = get('hero', 'accent_from',    '#60a5fa');
  const heroGradTo   = get('hero', 'accent_to',      '#a78bfa');

  // ── Stats ───────────────────────────────────────────────────────────────────
  const statsRaw  = get('stats', 'items_json', JSON.stringify(DEFAULT_STATS));
  const statsHead = get('stats', 'headline',   '');
  const stats     = safeParse<StatItem[]>(statsRaw, DEFAULT_STATS);

  // ── Products ────────────────────────────────────────────────────────────────
  const productsRaw  = get('products', 'items_json',   JSON.stringify(DEFAULT_PRODUCTS));
  const productsHead = get('products', 'headline',     'Our');
  const productsAccent = get('products', 'headline_accent', 'Products');
  const productsSub  = get('products', 'subheading',   'Comprehensive AI solutions designed to automate and optimize every aspect of your business');
  const products     = safeParse<ProductItem[]>(productsRaw, DEFAULT_PRODUCTS);

  // ── Why Choose Us ───────────────────────────────────────────────────────────
  const whyRaw    = get('why_choose_us', 'items_json',      JSON.stringify(DEFAULT_WHY));
  const whyHead   = get('why_choose_us', 'headline',        'Why Choose Our');
  const whyAccent = get('why_choose_us', 'headline_accent', 'AI Suite?');
  const whyItems  = safeParse<WhyItem[]>(whyRaw, DEFAULT_WHY);

  // ── How It Works ────────────────────────────────────────────────────────────
  const stepsRaw    = get('how_it_works', 'items_json',      JSON.stringify(DEFAULT_STEPS));
  const stepsHead   = get('how_it_works', 'headline',        'How Our AI');
  const stepsAccent = get('how_it_works', 'headline_accent', 'Works');
  const steps       = safeParse<StepItem[]>(stepsRaw, DEFAULT_STEPS);

  // ── Security ────────────────────────────────────────────────────────────────
  const secHead    = get('security', 'headline',       'Enterprise-Grade');
  const secAccent  = get('security', 'headline_accent','Security');
  const secBody    = get('security', 'body',           'Built with advanced encryption, compliance frameworks, and multi-layer protection to safeguard your data at every level.');
  const secBadge   = get('security', 'badge_value',   '99.9% Secure Operations');
  const secBadgeSub= get('security', 'badge_sub',     'Zero-trust architecture combined with continuous monitoring.');
  const bulletsRaw = get('security', 'bullets_json',  JSON.stringify(DEFAULT_BULLETS));
  const bullets    = safeParse<BulletItem[]>(bulletsRaw, DEFAULT_BULLETS);

  // ── Testimonials ────────────────────────────────────────────────────────────
  const testiRaw    = get('testimonials', 'items_json',      JSON.stringify(DEFAULT_TESTIMONIALS));
  const testiHead   = get('testimonials', 'headline',        'Trusted by');
  const testiAccent = get('testimonials', 'headline_accent', 'Industry Leaders');
  const testimonials= safeParse<TestimonialItem[]>(testiRaw, DEFAULT_TESTIMONIALS);

  // ── CTA Banner ──────────────────────────────────────────────────────────────
  const ctaHead     = get('cta_banner', 'headline',      'Ready to Transform Your Business?');
  const ctaBody     = get('cta_banner', 'body',          'Join thousands of businesses already leveraging our AI ecosystem to drive growth and efficiency');
  const ctaBtn1     = get('cta_banner', 'cta_btn_1',    'Start Free Trial');
  const ctaBtn2     = get('cta_banner', 'cta_btn_2',    'Schedule Demo');

  const ctaProduct = {
    id: 'clc-one', name: 'CLC One',
    tagline: 'All-in-One AI SaaS: All suites combined',
    features: ['AI', 'Automation', 'Enterprise'], icon: ShieldCheck,
  };

  // const gHead = `linear-gradient(to right, ${heroGradFrom}, ${heroGradTo})`;
  // const gHeadStyle: React.CSSProperties = {
  //   backgroundImage: gHead,
  //   WebkitBackgroundClip: 'text',
  //   WebkitTextFillColor: 'transparent',
  //   backgroundClip: 'text',
  // };

  const theme = createTheme(heroGradFrom, heroGradTo);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      {sectionVisible('hero') && (
      <section className="relative overflow-hidden border-b border-blue-900/20">
        <div className="absolute inset-0" 
        style={{
          background: `linear-gradient(to bottom right, ${heroGradFrom}15, transparent, ${heroGradTo}15)`
        }} />
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-700" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <div className="text-center space-y-6 sm:space-y-8">
            
            <div
              style={{
                background: `${theme.accent}15`,
                border: `1px solid ${theme.border}`,
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm"
            >
              <Sparkles className="w-4 h-4" style={{ color: theme.accent }} />
              <span className="text-sm text-blue-300" style={{ color: theme.accent }}>{heroBadge}</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              {heroHead1}<br />
              {/* <span className="italic font-extrabold" style={gHeadStyle}>{heroHead2}{' '}</span> */}
              <span style={theme.gradientText} className="italic font-extrabold">
                {heroHead2}{' '}
              </span>
              {heroHead3}
            </h1>
            <p className="max-w-3xl mx-auto text-base sm:text-lg lg:text-xl text-gray-400 px-4">
              {heroBody}
            </p>
          </div>

          {/* Stats Grid */}
          {sectionVisible('stats') && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-12 sm:mt-16 lg:mt-20">
            {stats.map((stat, idx) => {
              const Icon = resolveIcon(stat.icon);
              return (
                <div key={idx} className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
                  style={{
                    background: `linear-gradient(to right, ${heroGradFrom}30, ${heroGradTo}30)`
                  }}/>
                  <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 sm:p-6 text-center transition-all duration-300"
                   style={{ borderColor: `${theme.accent}50` }}>
                    <Icon className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-3 " style={{ color: theme.accent }} />
                    <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2">{stat.value}</div>
                    <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
          )}
        </div>
      </section>
      )}

      {/* ── PRODUCTS GRID ─────────────────────────────────────────────────── */}
      {sectionVisible('products') && (
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {productsHead}{' '}
              <span className="bg-gradient-to-r italic font-extrabold  bg-clip-text text-transparent" style={{
                backgroundImage: `linear-gradient(to right, ${theme.accent}, ${theme.accentTo})`
              }}>
                {productsAccent}
              </span>
            </h2>
            <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto px-4">{productsSub}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {products.map((product, idx) => {
              const Icon = resolveIcon(product.icon);
              return (
                <div key={idx} onClick={() => router.push(`/product/${product.slug}`)}
                  className="group relative cursor-pointer">
                  <div className={`absolute inset-0 bg-gradient-to-r ${product.gradient} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-500`} />
                  <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300 h-full flex flex-col">
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl  p-0.5 mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`} 
                      style={{
                        background: `linear-gradient(to bottom right, ${theme.accent}, ${theme.accentTo})`
                      }}>
                      <div className="w-full h-full bg-slate-900 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                      </div>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white  transition-colors" style={{ color: theme.accent }}>
                      {product.title}
                    </h3>
                    <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 flex-grow">{product.desc}</p>
                    <div className="space-y-2 mb-4 sm:mb-6">
                      {product.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-center gap-2 text-xs sm:text-sm text-gray-300">
                          <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${product.gradient}`} />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 group-hover:gap-4 transition-all text-sm sm:text-base" style={{ color: theme.accent }}>
                      <span className="font-medium">Learn More</span>
                      <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────────── */}
      {sectionVisible('why_choose_us') && (
      <section className="relative py-16 sm:py-20 lg:py-24 border-t border-blue-900/20">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {whyHead}{' '}<br />
              <span className="bg-gradient-to-r italic font-extrabold bg-clip-text text-transparent" 
              style={{
                backgroundImage: `linear-gradient(to right, ${theme.accent}, ${theme.accentTo})`
              }}>
                {whyAccent}
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whyItems.map((item, idx) => {
              const Icon = resolveIcon(item.icon);
              return (
                <div key={idx} className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 sm:p-8 hover:border-blue-500/50 transition-all duration-300">
                  <Icon className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-6 group-hover:scale-110 transition-transform" style={{ color: theme.accent }} />
                  <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-sm sm:text-base text-gray-400">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      )}

      {/* ── HOW IT WORKS ──────────────────────────────────────────────────── */}
      {sectionVisible('how_it_works') && (
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {stepsHead}{' '}
              <span className="bg-gradient-to-r bg-clip-text text-transparent italic font-extrabold" style={{
                backgroundImage: `linear-gradient(to right, ${theme.accent}, ${theme.accentTo})`
              }}>
                {stepsAccent}
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((item, idx) => (
              <div key={idx} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm hover:border-cyan-500/40 transition-all">
                <div className="text-4xl font-extrabold mb-4" style={{
                  color: theme.accent
                }}>{item.step}</div>
                <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                <p className="text-gray-400 text-sm sm:text-base">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── SECURITY ──────────────────────────────────────────────────────── */}
      {sectionVisible('security') && (
      <section className="relative py-16 sm:py-20 lg:py-24 border-t border-blue-900/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                {secHead}{' '}
                <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent italic font-extrabold">
                  {secAccent}
                </span>
              </h2>
              <p className="text-gray-400 text-base sm:text-lg mb-6">{secBody}</p>
              <ul className="space-y-3 text-gray-300 text-sm sm:text-base">
                {bullets.map((b, i) => <li key={i}>• {b.text}</li>)}
              </ul>
            </div>
            <div className="bg-slate-900/50 border border-slate-800 rounded-3xl p-10 backdrop-blur-sm">
              <div className="text-center">
                <ShieldCheck className="w-16 h-16 text-green-400 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-white mb-4">{secBadge}</h3>
                <p className="text-gray-400">{secBadgeSub}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      {sectionVisible('testimonials') && (
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/5 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
              {testiHead}{' '}
              <span className="bg-gradient-to-r  bg-clip-text text-transparent italic font-extrabold" style={{
                backgroundImage: `linear-gradient(to right, ${theme.accent}, ${theme.accentTo})`
              }}>
                {testiAccent}
              </span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="bg-slate-900/50 border rounded-2xl p-8 backdrop-blur-sm transition-all"
                style={{
                  borderColor:
                    hoveredIdx === idx ? `${theme.accent}66` : '#1e293b', // fallback = slate-800
                }}
              >
                <p className="text-gray-300 text-sm sm:text-base mb-6">"{item.quote}"</p>
                <div className="font-semibold text-sm sm:text-base" style={{ color: theme.accent }}>{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      {sectionVisible('cta_banner') && (
      <section className="relative py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative bg-gradient-to-br  rounded-3xl p-8 sm:p-12 lg:p-16 border border-blue-500/30 overflow-hidden" style={{
            background: `linear-gradient(135deg, ${theme.accent}30, ${theme.accentTo}30)`
          }}>
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />
            <div className="relative space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">{ctaHead}</h2>
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">{ctaBody}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <button onClick={() => { setModalOpen(true); setModalMode('form'); }}
                style={{
                  backgroundImage: `linear-gradient(to right, ${theme.accent}, ${theme.accentTo})`,
                  
                }}
                  className="px-6 sm:px-8 py-3 sm:py-4 hover:bg-blue-700 rounded-xl font-semibold transition-colors text-sm sm:text-base">
                  {ctaBtn1}
                </button>
                <button onClick={() => { setModalOpen(true); setModalMode('calendar'); }}
                  className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 hover:bg-white/20 rounded-xl font-semibold transition-colors border border-white/20 text-sm sm:text-base">
                  {ctaBtn2}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      )}

      <ProductCardModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        product={ctaProduct}
        defaultMode={modalMode}
      />
      <Footer />
    </div>
  );
}
'use client';

import React, { RefObject, useEffect, useRef, useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import FeatureGrid from '@/components/product/FeatureGrid';
import ExecutionFlow from '@/components/product/ExecutionFlow';
import SuccessStories from '@/components/product/SuccessStories';
import TrustedIntegration from '@/components/product/TrustedIntegrations';
import CTAModal from '@/components/product/CTAModel';
import { usePageContent } from '@/hooks/usePageContent';
import {
  PenTool, Globe, Zap, Share2, Sparkles, Layout, Globe2,
  ArrowRightIcon, CheckIcon, TrendingUp, Users, Brain,
  ShieldCheck, Star, Layers, Cpu, Database, Activity,
  Bell, MessageSquare, Settings, Lock, Rocket, BarChart3,
  Target, Mail, FileText, Code, Image, Search,
} from 'lucide-react';

// ─── Icon registry ─────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  PenTool, Globe, Zap, Share2, Sparkles, Layout, Globe2,
  TrendingUp, Users, Brain, ShieldCheck, Star, Layers,
  Cpu, Database, Activity, Bell, MessageSquare, Settings,
  Lock, Rocket, BarChart3, Target, Mail, FileText, Code,
  Image, Search,
};
function resolveIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Zap;
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface FeatureItem   { icon: string; title: string; desc: string }
interface BulletItem    { text: string }
interface StatItem      { value: string; label: string }
interface ContentTypeItem { label: string }
interface PreviewCardItem { type: string; color_key: string; lines: number[] }
interface ContentPointItem { icon: string; title: string; desc: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ─── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURES: FeatureItem[] = [
  { icon: 'Layout',  title: 'Autonomous Site Builder',  desc: 'Dynamic, SEO-optimized web architectures generated from simple natural language prompts.'         },
  { icon: 'PenTool', title: 'Enterprise Copywriting',   desc: 'AI-driven content strategies that maintain your brand voice across thousands of assets.'          },
  { icon: 'Share2',  title: 'Multi-Channel Sync',       desc: 'Deploy content instantly across web, social, and internal portals with one click.'                },
];
const DEFAULT_BULLETS: BulletItem[] = [
  { text: 'AI-generated landing pages & blogs' },
  { text: 'Brand-consistent enterprise copy'   },
  { text: 'One-click multi-channel publishing' },
];
const DEFAULT_STATS: StatItem[] = [
  { value: '4.9/5', label: 'SEO Score'  },
  { value: '2.3s',  label: 'Gen Time'   },
  { value: '94%',   label: 'Conv Rate'  },
];
const DEFAULT_CONTENT_TYPES: ContentTypeItem[] = [
  { label: 'Landing Pages'  },
  { label: 'Blog Posts'     },
  { label: 'Ad Copy'        },
  { label: 'Email Campaigns'},
  { label: 'Product Docs'   },
];
const DEFAULT_PREVIEW_CARDS: PreviewCardItem[] = [
  { type: 'Landing Page', color_key: 'from', lines: [70, 50, 85, 40]     },
  { type: 'Blog Post',    color_key: 'to',   lines: [90, 60, 75, 55, 80] },
];
const DEFAULT_CONTENT_POINTS: ContentPointItem[] = [
  { icon: 'Mail',     title: 'Automated Personalization', desc: 'Tailor copy, emails, and landing pages at the scale of millions.'          },
  { icon: 'Globe2',   title: 'Omnichannel Publishing',    desc: 'One dashboard to push content to web, social, and search simultaneously.'  },
  { icon: 'Zap',      title: 'Real-time Optimization',    desc: 'AI continuously refines headlines, CTAs, and SEO metadata for peak ROI.'   },
];

// ─── Typewriter phrases ────────────────────────────────────────────────────────
const DEFAULT_PHRASES = [
  'landing page for a SaaS startup',
  'blog post on AI trends',
  'product description that converts',
  'email campaign for launch day',
];

// ─── Fade-in hook ──────────────────────────────────────────────────────────────
function useFadeIn(): [RefObject<HTMLElement | null>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function ContentSuitePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [ref, visible] = useFadeIn();
  const [typed, setTyped] = useState('');
  const [phase, setPhase] = useState(0);
  const { get, content } = usePageContent('ai-website-&-content');
  const sectionVisible = (key: string) => !!content?.[key];

  // ── Hero ────────────────────────────────────────────────────────────────────
  const heroBadge       = get('hero', 'badge_text',      'GenAI Site Builder & Content');
  const heroHead1       = get('hero', 'headline_1',      'AI WEBSITE');
  const heroHead2       = get('hero', 'headline_2',      '&');
  const heroHead3       = get('hero', 'headline_3',      'CONTENT');
  const heroHead4       = get('hero', 'headline_4',      'SUITE');
  const heroBody        = get('hero', 'body',            'Architecting the next generation of digital presence. Deploy high-conversion websites and enterprise-grade content assets using autonomous intelligence.');
  const heroBtn1        = get('hero', 'btn_1_label',     'Launch Site Builder');
  const heroBtn2        = get('hero', 'btn_2_label',     'WhatsApp Demo');
  const heroWA          = get('hero', 'whatsapp_number', '919810984968');
  const accentFrom      = get('hero', 'accent_from',     '#3b82f6');
  const accentTo        = get('hero', 'accent_to',       '#6366f1');
  const bulletsRaw      = get('hero', 'bullets_json',    JSON.stringify(DEFAULT_BULLETS));
  const bullets         = safeParse<BulletItem[]>(bulletsRaw, DEFAULT_BULLETS);
  const phrasesRaw      = get('hero', 'phrases_json',    JSON.stringify(DEFAULT_PHRASES));
  const phrases         = safeParse<string[]>(phrasesRaw, DEFAULT_PHRASES);
  const contentTypesRaw = get('hero', 'content_types_json', JSON.stringify(DEFAULT_CONTENT_TYPES));
  const contentTypes    = safeParse<ContentTypeItem[]>(contentTypesRaw, DEFAULT_CONTENT_TYPES);

  // ── Preview Card (right-side builder preview inside hero) ───────────────────
  const previewTitle       = get('preview_card', 'title',        'AI Content Builder');
  const previewSubtitle    = get('preview_card', 'subtitle',     'SEO-Optimized · Brand-Aligned');
  const previewBadge       = get('preview_card', 'badge_text',   'Live Generation');
  const previewPromptText  = get('preview_card', 'prompt_text',  'landing page · SaaS · modern · dark theme');
  const statsRaw           = get('preview_card', 'stats_json',   JSON.stringify(DEFAULT_STATS));
  const stats              = safeParse<StatItem[]>(statsRaw, DEFAULT_STATS);
  const previewCardsRaw    = get('preview_card', 'cards_json',   JSON.stringify(DEFAULT_PREVIEW_CARDS));
  const previewCards       = safeParse<PreviewCardItem[]>(previewCardsRaw, DEFAULT_PREVIEW_CARDS);

  // ── Features ────────────────────────────────────────────────────────────────
  const featuresRaw = get('features', 'items_json', JSON.stringify(DEFAULT_FEATURES));
  const features    = safeParse<FeatureItem[]>(featuresRaw, DEFAULT_FEATURES);

  // ── Content Points Section ──────────────────────────────────────────────────
  const contentPointsHead = get('content_points', 'headline',   'Scale Content. Grow Everywhere.');
  const contentPointsImg  = get('content_points', 'image_url',  'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800');
  const contentPointsRaw  = get('content_points', 'items_json', JSON.stringify(DEFAULT_CONTENT_POINTS));
  const contentPoints     = safeParse<ContentPointItem[]>(contentPointsRaw, DEFAULT_CONTENT_POINTS);

  // ── CTA Banner ──────────────────────────────────────────────────────────────
  const ctaHead  = get('cta_banner', 'headline',  'START YOUR DIGITAL EVOLUTION');
  const ctaBody  = get('cta_banner', 'body',      'Our experts are ready to help you scale your content operations with autonomous intelligence.');
  const ctaBtn   = get('cta_banner', 'btn_label', 'GET STARTED');
  const ctaPhone = get('cta_banner', 'phone',     '+91 870023 6923');

  // ── Typewriter effect ────────────────────────────────────────────────────────
  useEffect(() => {
    if (!phrases.length) return;
    const current = phrases[phase % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;
    if (typed.length < current.length) {
      timeout = setTimeout(() => setTyped(current.slice(0, typed.length + 1)), 55);
    } else {
      timeout = setTimeout(() => { setTyped(''); setPhase(p => p + 1); }, 2000);
    }
    return () => clearTimeout(timeout);
  }, [typed, phase, phrases]);

  // ── Derived theme ────────────────────────────────────────────────────────────
  const btnShadow = `0 0 40px ${accentFrom}66`;
  const glowBg    = `radial-gradient(circle, ${accentFrom} 0%, transparent 65%)`;

  // Resolve preview card color from color_key
  function resolveCardColor(colorKey: string): string {
    if (colorKey === 'to') return accentTo;
    return accentFrom; // 'from' or anything else
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      {sectionVisible('hero') && (
        <section
          ref={ref as RefObject<HTMLElement>}
          className="relative min-h-screen flex items-center overflow-hidden bg-[#04080f] px-5 sm:px-8 lg:px-14 py-20 pt-28"
        >
          {/* Background glows */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${accentFrom}1a 0%, transparent 70%)`, filter: 'blur(60px)', opacity: 0.6 }}
          />
          <div
            className="absolute bottom-0 right-0 w-[400px] h-[400px] pointer-events-none"
            style={{ background: `radial-gradient(ellipse, ${accentTo} 0%, transparent 70%)`, filter: 'blur(80px)', opacity: 0.08 }}
          />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(${accentFrom}07 1px, transparent 1px), linear-gradient(90deg, ${accentFrom}07 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }} />

          <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div style={{ opacity: visible ? 1 : 1, transform: visible ? 'none' : 'translateY(28px)', transition: 'all 0.7s ease' }}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{ border: `1px solid ${accentFrom}4d`, background: `${accentFrom}1a` }}>
                <Sparkles className="w-3 h-3" style={{ color: accentFrom }} />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{heroBadge}</span>
              </div>

              {/* Headline */}
              <h1 className="font-black leading-[1.05] mb-6" style={{ fontSize: 'clamp(2.6rem,5.5vw,5rem)', letterSpacing: '-0.03em' }}>
                <span className="text-white">{heroHead1} <span style={{ color: accentFrom }}>{heroHead2}</span></span><br />
                <span className="text-white">{heroHead3}</span><br />
                <span style={{ WebkitTextStroke: `1.5px ${accentFrom}80`, color: 'transparent' }}>{heroHead4}</span>
              </h1>

              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8">{heroBody}</p>

              {/* Typewriter bar */}
              <div className="flex items-center gap-2 mb-3 rounded-xl px-4 py-3"
                style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${accentFrom}20` }}>
                <Sparkles className="w-3 h-3 shrink-0" style={{ color: accentFrom }} />
                <p className="text-slate-300 text-xs font-mono truncate">
                  Generate a <span style={{ color: accentFrom }}>{typed}</span>
                  <span className="animate-pulse" style={{ color: accentFrom }}>|</span>
                </p>
              </div>

              {/* Content type tags */}
              <div className="flex flex-wrap gap-2 mb-8">
                {contentTypes.map((ct, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider text-slate-400"
                    style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    {ct.label}
                  </span>
                ))}
              </div>

              {/* Bullets */}
              <div className="space-y-2.5 mb-8">
                {bullets.map((b, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                      style={{ background: `${accentFrom}33`, border: `1px solid ${accentFrom}66` }}>
                      <CheckIcon size={9} style={{ color: accentFrom }} />
                    </div>
                    <p className="text-slate-300 text-sm">{b.text}</p>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  className="group w-full flex items-center justify-center gap-2 px-7 py-4 text-white rounded-xl font-black text-[10px] tracking-[0.2em] uppercase transition-all"
                  style={{ background: accentFrom, boxShadow: btnShadow }}
                  onClick={() => setModalOpen(true)}
                >
                  {heroBtn1}
                  <ArrowRightIcon size={13} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href={`https://wa.me/${heroWA}?text=${encodeURIComponent("Hello! I'm interested in Content Suite and would like to see a demo.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="group w-full flex items-center justify-center gap-3 px-8 py-4 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366] bg-white/5 hover:bg-green-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                  </svg>
                  {heroBtn2}
                </a>
              </div>
            </div>

            {/* Right — Builder Preview */}
            {sectionVisible('preview_card') && (
              <div style={{ opacity: visible ? 1 : 1, transform: visible ? 'none' : 'translateX(36px)', transition: 'all 0.8s ease 0.25s' }}>
                <div className="relative bg-[#070d1c] border border-white/[0.08] rounded-3xl overflow-hidden"
                  style={{ boxShadow: `0 0 60px ${accentFrom}1a` }}>

                  {/* App chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-white/[0.02]">
                    <div className="flex gap-1.5">
                      {['#ff5f57', '#ffbd2e', '#28c840'].map(c => (
                        <div key={c} className="w-2 h-2 rounded-full" style={{ background: c }} />
                      ))}
                    </div>
                    <div className="flex flex-1 gap-1 mx-2 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                      {['Pages', 'Content', 'SEO', 'Publish'].map((tab, i) => (
                        <div key={tab} className="px-3 py-1 rounded-md text-[9px] font-bold uppercase tracking-wider whitespace-nowrap"
                          style={{
                            background: i === 0 ? `${accentFrom}33` : 'transparent',
                            color:      i === 0 ? accentFrom         : '#374151',
                          }}>
                          {tab}
                        </div>
                      ))}
                    </div>
                    <div className="px-2 py-1 rounded text-[8px] text-white font-black shrink-0"
                      style={{ background: accentFrom }}>
                      GENERATE
                    </div>
                  </div>

                  <div className="p-4 space-y-3">
                    {/* Card header */}
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <p className="text-white text-sm font-black">{previewTitle}</p>
                        <p className="text-slate-600 text-[9px]">{previewSubtitle}</p>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                        style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}40` }}>
                        <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentFrom }} />
                        <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: accentFrom }}>{previewBadge}</span>
                      </div>
                    </div>

                    {/* Prompt bar */}
                    <div className="flex items-center gap-2 p-3 rounded-xl"
                      style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${accentFrom}33` }}>
                      <Sparkles className="w-3 h-3 shrink-0" style={{ color: accentFrom }} />
                      <p className="text-[10px] text-slate-400 font-mono flex-1 truncate">{previewPromptText}</p>
                      <div className="px-2 py-0.5 rounded text-[8px] font-black shrink-0"
                        style={{ background: `${accentFrom}33`, color: accentFrom }}>AI</div>
                    </div>

                    {/* Content block cards */}
                    <div className="grid grid-cols-2 gap-2">
                      {previewCards.map((card, i) => {
                        const clr = resolveCardColor(card.color_key);
                        return (
                          <div key={i} className="p-3 rounded-xl border"
                            style={{ background: `${clr}08`, borderColor: `${clr}25` }}>
                            <div className="flex items-center justify-between mb-2">
                              <p className="text-[9px] font-black uppercase tracking-wider" style={{ color: clr }}>{card.type}</p>
                              <div className="w-4 h-4 rounded flex items-center justify-center" style={{ background: `${clr}20` }}>
                                <CheckIcon size={9} style={{ color: clr }} />
                              </div>
                            </div>
                            <div className="space-y-1.5">
                              {card.lines.map((w, j) => (
                                <div key={j} className="h-1.5 rounded-full"
                                  style={{ width: `${w}%`, background: j === 0 ? `${clr}60` : 'rgba(255,255,255,0.06)' }} />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Generated page skeleton */}
                    <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden">
                      <div className="h-2 flex gap-px">
                        {[40, 60, 20, 80, 30, 50, 70, 40, 90, 30].map((w, i) => (
                          <div key={i} className="h-full"
                            style={{ width: `${w * 0.8 + 5}%`, background: i % 3 === 0 ? `${accentFrom}4d` : 'rgba(255,255,255,0.04)' }} />
                        ))}
                      </div>
                      <div className="p-3 space-y-1.5">
                        <div className="h-3 w-3/4 rounded bg-white/10" />
                        <div className="h-2 w-full rounded bg-white/[0.05]" />
                        <div className="h-2 w-5/6 rounded bg-white/[0.05]" />
                        <div className="flex gap-2 mt-2">
                          <div className="h-5 w-20 rounded-lg" style={{ background: `${accentFrom}66` }} />
                          <div className="h-5 w-16 rounded-lg bg-white/[0.06]" />
                        </div>
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid gap-2 pt-2 border-t border-white/5" style={{ gridTemplateColumns: `repeat(${stats.length}, 1fr)` }}>
                      {stats.map((s, i) => (
                        <div key={i} className="text-center">
                          <p className="text-white font-black text-sm">{s.value}</p>
                          <p className="text-slate-600 text-[8px] uppercase tracking-wider">{s.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      {sectionVisible('features') && (
        <section className="py-24 px-6 bg-white/[0.01]">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((item, i) => {
              const Icon = resolveIcon(item.icon);
              return (
                <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                  style={{ background: `${accentFrom}0d` }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}>
                  <div className="mb-6 p-4 rounded-2xl inline-block transition-all"
                    style={{ background: `${accentFrom}1a`, color: accentFrom }}
                    onMouseEnter={e => { (e.currentTarget.style.background = accentFrom); (e.currentTarget.style.color = '#fff'); }}
                    onMouseLeave={e => { (e.currentTarget.style.background = `${accentFrom}1a`); (e.currentTarget.style.color = accentFrom); }}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </section>
      )}

      <div className="py-12 border-y border-white/5">
        <ExecutionFlow />
      </div>

      <TrustedIntegration />

      {/* ── CONTENT POINTS ────────────────────────────────────────────────── */}
      {sectionVisible('content_points') && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">{contentPointsHead}</h2>
              <div className="space-y-8">
                {contentPoints.map((point, idx) => {
                  const Icon = resolveIcon(point.icon);
                  return (
                    <div key={idx} className="flex gap-5">
                      <div className="mt-1"><Icon style={{ color: accentFrom }} /></div>
                      <div>
                        <h4 className="text-xl font-bold mb-1">{point.title}</h4>
                        <p className="text-gray-400">{point.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="relative rounded-[3rem] overflow-hidden border border-white/10 group">
              <img
                src={contentPointsImg}
                alt="Content Strategy"
                className="w-full h-auto opacity-70 group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
            </div>
          </div>
        </section>
      )}

      <FeatureGrid />
      <SuccessStories />

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      {sectionVisible('cta_banner') && (
        <section className="py-32 px-6">
          <div className="max-w-6xl mx-auto border rounded-[3rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
            style={{
              background: `linear-gradient(to bottom right, ${accentFrom}66, ${accentTo}40)`,
              borderColor: `${accentFrom}33`,
            }}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5 pointer-events-none" />
            <div className="relative z-10">
              <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter">{ctaHead}</h2>
              <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
              <div className="flex flex-col items-center gap-6">
                <button
                  className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                  style={{ color: accentFrom }}
                  onClick={() => setModalOpen(true)}
                >
                  {ctaBtn}
                </button>
                <div className="flex items-center gap-3 font-mono text-sm tracking-widest" style={{ color: accentFrom }}>
                  <Globe2 className="w-4 h-4" />
                  <span>{ctaPhone}</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      <CTAModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="AI Website & Content"
        productTagline="GenAI Website Builder"
        accentColor={accentFrom}
      />
      <Footer />
    </main>
  );
}
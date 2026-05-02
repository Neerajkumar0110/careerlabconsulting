'use client';

import React, { RefObject, useEffect, useRef, useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import ExecutionFlow from '@/components/product/ExecutionFlow';
import SuccessStories from '@/components/product/SuccessStories';
import FeatureGrid from '@/components/product/FeatureGrid';
import CTAModal from '@/components/product/CTAModel';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Megaphone, Rocket, BarChart3, Globe2, Target, Mail, Zap,
  ArrowRightIcon, CheckIcon, TrendingUp, Users, Brain,
  ShieldCheck, Star, Sparkles, Layers, Cpu, Database, Globe,
  Activity, Bell, MessageSquare, Settings, Lock,
} from 'lucide-react';

// ─── Icon registry ─────────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Megaphone, Rocket, BarChart3, Globe2, Target, Mail, Zap,
  TrendingUp, Users, Brain, ShieldCheck, Star, Sparkles,
  Layers, Cpu, Database, Globe, Activity, Bell, MessageSquare,
  Settings, Lock,
};
function resolveIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Zap;
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface FeatureItem  { icon: string; title: string; desc: string }
interface BulletItem   { text: string }
interface KpiItem      { value: string; label: string }
interface ChannelItem  { label: string }
interface CampaignItem { name: string; status: string; metric: string }
interface ReachItem    { icon: string; title: string; desc: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ─── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_FEATURES: FeatureItem[] = [
  { icon: 'Rocket',   title: 'AI Campaign Architect', desc: 'Deploy multi-channel campaigns that automatically adjust messaging based on real-time user behavior.'            },
  { icon: 'BarChart3',title: 'Predictive Analytics',  desc: 'Forecast ROAS and customer lifetime value (LTV) with 95% accuracy before spending a single rupee.'               },
  { icon: 'Target',   title: 'Neural Segmentation',   desc: 'Hyper-target audiences using autonomous sentiment analysis and intent-based behavioral tracking.'                 },
];
const DEFAULT_BULLETS: BulletItem[] = [
  { text: 'AI customer segmentation'        },
  { text: 'Automated omnichannel campaigns' },
  { text: 'Real-time ROI optimization'      },
];
const DEFAULT_KPIS: KpiItem[] = [
  { value: '12.8K', label: 'Leads Generated' },
  { value: '4.6x',  label: 'ROAS'            },
  { value: '92%',   label: 'Conversion Lift' },
];
const DEFAULT_CHANNELS: ChannelItem[] = [
  { label: 'Email'  },
  { label: 'Ads'    },
  { label: 'Social' },
  { label: 'Search' },
];
const DEFAULT_CAMPAIGNS: CampaignItem[] = [
  { name: 'Black Friday Ads',   status: 'Scaling',    metric: '+34% CTR'   },
  { name: 'Email Retargeting',  status: 'Optimizing', metric: '+21% Open'  },
  { name: 'Social Awareness',   status: 'Running',    metric: '+18% Reach' },
  { name: 'Search Expansion',   status: 'Learning',   metric: '+12% Leads' },
];
const DEFAULT_REACH: ReachItem[] = [
  { icon: 'Mail',   title: 'Automated Personalization', desc: 'Tailor emails, ads, and landing pages at a scale of millions.'              },
  { icon: 'Globe2', title: 'Omnichannel Sync',          desc: 'One central dashboard to rule Social, Search, and Web presence.'            },
  { icon: 'Zap',    title: 'Real-time Optimization',    desc: 'Autonomous bidding and budget allocation to maximize your ROI.'             },
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
export default function MarketingSuitePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const [ref, visible] = useFadeIn();
  const { get, content } = usePageContent('marketing-suite');
  const sectionVisible = (key: string) => !!content?.[key];

  // ── Hero ────────────────────────────────────────────────────────────────────
  const heroBadge    = get('hero', 'badge_text',    'Omnichannel Marketing');
  const heroHead1    = get('hero', 'headline_1',    'MARKETING');
  const heroHead2    = get('hero', 'headline_2',    'AUTOMATION');
  const heroHead3    = get('hero', 'headline_3',    'ENGINE');
  const heroBody     = get('hero', 'body',          'Orchestrate campaigns across every channel using AI-driven automation. Predict customer intent, personalize messaging in real time, and scale growth across ads, email, social media, and search.');
  const heroBtn1     = get('hero', 'btn_1_label',   'Scale My Growth');
  const heroBtn2     = get('hero', 'btn_2_label',   'WhatsApp Demo');
  const heroWA       = get('hero', 'whatsapp_number','919810984968');
  const accentFrom   = get('hero', 'accent_from',   '#3b82f6');
  const accentTo     = get('hero', 'accent_to',     '#6366f1');
  const bulletsRaw   = get('hero', 'bullets_json',  JSON.stringify(DEFAULT_BULLETS));
  const bullets      = safeParse<BulletItem[]>(bulletsRaw, DEFAULT_BULLETS);

  // ── Dashboard ───────────────────────────────────────────────────────────────
  const dashTitle    = get('dashboard', 'title',       'AI Campaign Engine');
  const dashSubtitle = get('dashboard', 'subtitle',    'Autonomous · Omnichannel');
  const dashBadge    = get('dashboard', 'badge_text',  'Live Optimization');
  const kpisRaw      = get('dashboard', 'kpis_json',   JSON.stringify(DEFAULT_KPIS));
  const kpis         = safeParse<KpiItem[]>(kpisRaw, DEFAULT_KPIS);
  const channelsRaw  = get('dashboard', 'channels_json', JSON.stringify(DEFAULT_CHANNELS));
  const channels     = safeParse<ChannelItem[]>(channelsRaw, DEFAULT_CHANNELS);
  const campaignsRaw = get('dashboard', 'campaigns_json', JSON.stringify(DEFAULT_CAMPAIGNS));
  const campaigns    = safeParse<CampaignItem[]>(campaignsRaw, DEFAULT_CAMPAIGNS);

  // ── Features ────────────────────────────────────────────────────────────────
  const featuresRaw = get('features', 'items_json', JSON.stringify(DEFAULT_FEATURES));
  const features    = safeParse<FeatureItem[]>(featuresRaw, DEFAULT_FEATURES);

  // ── Reach Section ───────────────────────────────────────────────────────────
  const reachHead  = get('reach', 'headline',  'Global Reach, Local Impact');
  const reachImg   = get('reach', 'image_url', 'https://images.pexels.com/photos/3182766/pexels-photo-3182766.jpeg?auto=compress&cs=tinysrgb&w=800');
  const reachRaw   = get('reach', 'items_json', JSON.stringify(DEFAULT_REACH));
  const reachItems = safeParse<ReachItem[]>(reachRaw, DEFAULT_REACH);

  // ── CTA Banner ──────────────────────────────────────────────────────────────
  const ctaHead    = get('cta_banner', 'headline',  'ACCELERATE GROWTH');
  const ctaBody    = get('cta_banner', 'body',      'Our marketing architects are ready to design your omnichannel future.');
  const ctaBtn     = get('cta_banner', 'btn_label', 'BOOK GROWTH AUDIT');
  const ctaPhone   = get('cta_banner', 'phone',     '+91 870023 6923');

  // ── Derived theme ────────────────────────────────────────────────────────────
  const gradientStyle: React.CSSProperties = {
    backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})`,
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
  };
  const btnShadow = `0 0 40px ${accentFrom}66`;
  const glowBg = `radial-gradient(circle, ${accentFrom} 0%, transparent 65%)`;

  // Spread accent colors across KPI cards using opacity steps
  const kpiColors = [accentFrom, accentTo, `${accentFrom}cc`];

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      {sectionVisible('hero') && (
        <section
          ref={ref as RefObject<HTMLElement>}
          className="relative min-h-screen flex items-center overflow-hidden bg-[#030810] px-5 sm:px-8 lg:px-14 py-20 pt-28"
        >
          {/* Background glow */}
          <div className="absolute inset-0 pointer-events-none"
            style={{ background: `radial-gradient(ellipse 60% 55% at 15% 50%, ${accentFrom}0f 0%, transparent 70%)` }} />
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
            style={{ background: glowBg, filter: 'blur(120px)', opacity: 0.07 }} />
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `linear-gradient(${accentFrom}07 1px, transparent 1px), linear-gradient(90deg, ${accentFrom}07 1px, transparent 1px)`,
            backgroundSize: '48px 48px',
          }} />

          <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left */}
            <div style={{ opacity: visible ? 1 : 1, transform: visible ? 'none' : 'translateY(30px)', transition: 'all 0.7s ease' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full mb-6"
                style={{ border: `1px solid ${accentFrom}4d`, background: `${accentFrom}1a` }}>
                <Megaphone className="w-3 h-3" style={{ color: accentFrom }} />
                <span className="text-[9px] font-black uppercase tracking-[0.3em]" style={{ color: accentFrom }}>{heroBadge}</span>
              </div>

              <h1 className="font-black leading-none mb-6" style={{ fontSize: 'clamp(2.8rem,5.5vw,4.5rem)', letterSpacing: '-0.05em' }}>
                <span className="text-white">{heroHead1}</span><br />
                <span style={{ color: accentFrom }}>{heroHead2}</span><br />
                <span style={{ WebkitTextStroke: `1.5px ${accentFrom}80`, color: 'transparent' }}>{heroHead3}</span>
              </h1>

              <p className="text-slate-400 text-base md:text-lg leading-relaxed max-w-md mb-8">{heroBody}</p>

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
                  href={`https://wa.me/${heroWA}?text=${encodeURIComponent("Hello! I'm interested in Marketing Suite and would like to see a demo.")}`}
                  target="_blank" rel="noopener noreferrer"
                  className="group w-full flex items-center justify-center gap-3 px-8 py-4 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366] bg-white/5 hover:bg-green-600"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                  </svg>
                  {heroBtn2}
                </a>
              </div>
            </div>

            {/* Right — Dashboard */}
            {sectionVisible('dashboard') && (
              <div style={{ opacity: visible ? 1 : 1, transform: visible ? 'none' : 'translateX(36px)', transition: 'all 0.8s ease 0.25s' }}>
                <div className="relative bg-[#060c1c] border border-white/[0.07] rounded-3xl overflow-hidden p-5 md:p-6"
                  style={{ boxShadow: `0 0 60px ${accentFrom}1a` }}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-white text-sm font-black">{dashTitle}</p>
                      <p className="text-slate-600 text-[9px]">{dashSubtitle}</p>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                      style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}40` }}>
                      <div className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: accentFrom }} />
                      <span className="text-[8px] font-black uppercase tracking-wider" style={{ color: accentFrom }}>{dashBadge}</span>
                    </div>
                  </div>

                  {/* KPIs */}
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {kpis.map((kpi, i) => (
                      <div key={i} className="p-2.5 rounded-xl text-center"
                        style={{ background: `${kpiColors[i % kpiColors.length]}1a`, border: `1px solid ${kpiColors[i % kpiColors.length]}40` }}>
                        <p className="text-white font-black text-sm">{kpi.value}</p>
                        <p className="text-[8px] uppercase tracking-wider" style={{ color: kpiColors[i % kpiColors.length] }}>{kpi.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Channels */}
                  <div className="mb-4 p-3 rounded-xl"
                    style={{ background: `${accentFrom}0a`, border: `1px solid ${accentFrom}1a` }}>
                    <p className="text-[9px] text-slate-600 uppercase tracking-widest mb-3">Active Channels</p>
                    <div className="flex items-center justify-between relative">
                      <div className="absolute left-4 right-4 top-4 h-px" style={{ background: `${accentFrom}33` }} />
                      {channels.map((ch, i) => {
                        const pct = i / Math.max(channels.length - 1, 1);
                        const r1 = parseInt(accentFrom.slice(1, 3), 16);
                        const g1 = parseInt(accentFrom.slice(3, 5), 16);
                        const b1 = parseInt(accentFrom.slice(5, 7), 16);
                        const r2 = parseInt(accentTo.slice(1, 3), 16);
                        const g2 = parseInt(accentTo.slice(3, 5), 16);
                        const b2 = parseInt(accentTo.slice(5, 7), 16);
                        const r  = Math.round(r1 + (r2 - r1) * pct);
                        const g  = Math.round(g1 + (g2 - g1) * pct);
                        const b  = Math.round(b1 + (b2 - b1) * pct);
                        const clr = `rgb(${r},${g},${b})`;
                        return (
                          <div key={i} className="flex flex-col items-center relative z-10">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1 animate-pulse"
                              style={{ background: `${clr}25`, border: `2px solid ${clr}`, boxShadow: `0 0 12px ${clr}40` }} />
                            <p className="text-[7px] font-black uppercase" style={{ color: clr }}>{ch.label}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Live Campaigns */}
                  <div className="space-y-2">
                    <p className="text-[9px] text-slate-600 font-black uppercase tracking-widest mb-1">Live Campaigns</p>
                    {campaigns.map((c, i) => {
                      const pct = i / Math.max(campaigns.length - 1, 1);
                      const r1 = parseInt(accentFrom.slice(1, 3), 16);
                      const g1 = parseInt(accentFrom.slice(3, 5), 16);
                      const b1 = parseInt(accentFrom.slice(5, 7), 16);
                      const r2 = parseInt(accentTo.slice(1, 3), 16);
                      const g2 = parseInt(accentTo.slice(3, 5), 16);
                      const b2 = parseInt(accentTo.slice(5, 7), 16);
                      const r  = Math.round(r1 + (r2 - r1) * pct);
                      const g  = Math.round(g1 + (g2 - g1) * pct);
                      const b  = Math.round(b1 + (b2 - b1) * pct);
                      const clr = `rgb(${r},${g},${b})`;
                      return (
                        <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl"
                          style={{ background: `${clr}0d`, border: `1px solid ${clr}30`, opacity: 1 - i * 0.15 }}>
                          <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: clr }} />
                          <div className="flex-1 min-w-0">
                            <p className="text-[9px] text-slate-300 truncate font-bold">{c.name}</p>
                            <p className="text-[8px] text-slate-600">{c.status}</p>
                          </div>
                          <p className="text-[8px] font-black shrink-0" style={{ color: clr }}>{c.metric}</p>
                        </div>
                      );
                    })}
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
                <div key={i} className="group p-10 rounded-[2.5rem] border border-white/5 hover:border-opacity-60 transition-all"
                  style={{ background: `${accentFrom}0d`, ['--hover-border' as string]: `${accentFrom}4d` }}
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

      {/* ── REACH ─────────────────────────────────────────────────────────── */}
      {sectionVisible('reach') && (
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">{reachHead}</h2>
              <div className="space-y-8">
                {reachItems.map((point, idx) => {
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
                src={reachImg}
                alt="Marketing Strategy"
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
          <div className="max-w-6xl mx-auto border rounded-[3rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden group"
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
        productName="Marketing Suite"
        productTagline="Omnichannel Automation"
        accentColor={accentFrom}
      />
      <Footer />
    </main>
  );
}
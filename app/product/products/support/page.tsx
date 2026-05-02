'use client';

import React, { useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import ExecutionFlow from '@/components/product/ExecutionFlow';
import FeatureGrid from '@/components/product/FeatureGrid';
import SuccessStories from '@/components/product/SuccessStories';
import CTAModal from '@/components/product/CTAModel';
import { usePageContent } from '@/hooks/usePageContent';
import {
  LifeBuoy, BookOpen, MessageSquare, ShieldCheck, Zap, Headphones,
  Brain, Target, BarChart3, Star, Layers, Cpu, Database, Activity,
  Bell, Settings, Lock, Rocket, TrendingUp, Globe2, Users,
} from 'lucide-react';

// ─── Icon registry ──────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  LifeBuoy, BookOpen, MessageSquare, ShieldCheck, Zap, Headphones,
  Brain, Target, BarChart3, Star, Layers, Cpu, Database, Activity,
  Bell, Settings, Lock, Rocket, TrendingUp, Globe2, Users,
};
function resolveIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Zap;
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface FeatureItem  { icon: string; title: string; desc: string }
interface StatItem     { value: string; label: string }
interface PillarItem   { icon: string; title: string; desc: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ─── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_FEATURES: FeatureItem[] = [
  { icon: 'MessageSquare', title: 'Autonomous Helpdesk',    desc: 'Neural-powered agents that resolve complex tickets by cross-referencing your entire product ecosystem.'    },
  { icon: 'BookOpen',      title: 'Self-Learning Wiki',     desc: 'A dynamic knowledge base that automatically updates itself as your product and documentation evolve.'        },
  { icon: 'Headphones',    title: 'Real-time Translation',  desc: 'Provide world-class support in 100+ languages with native-level fluency and context awareness.'             },
];
const DEFAULT_STATS: StatItem[] = [
  { value: '82%',    label: 'AI Resolution Rate' },
  { value: '14,820', label: 'Tickets Resolved'   },
  { value: '96%',    label: 'AI Accuracy'         },
];
const DEFAULT_PILLARS: PillarItem[] = [
  { icon: 'Zap',         title: 'Instant Triage',       desc: 'AI automatically categorizes and prioritizes tickets based on urgency and sentiment.'                  },
  { icon: 'ShieldCheck', title: 'Verified Accuracy',     desc: 'Every AI response is cross-checked against your internal security protocols.'                         },
  { icon: 'Headphones',  title: 'Human-in-the-Loop',     desc: 'Seamlessly transition complex cases to human experts with full AI-generated summaries.'               },
];

// ────────────────────────────────────────────────────────────────────────────
export default function SupportKnowledgePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { get, content } = usePageContent('support-knowledge');
  const sectionVisible = (key: string) => !!content?.[key];

  // ── Hero ──────────────────────────────────────────────────────────────────
  const heroBadge   = get('hero', 'badge_text',      'AI Helpdesk & Wiki');
  const heroHead1   = get('hero', 'headline_1',      'SUPPORT &');
  const heroHead2   = get('hero', 'headline_2',      'KNOWLEDGE');
  const heroBody    = get('hero', 'body',             'Transform your customer experience with autonomous resolution engines. Deploy self-learning wikis and AI helpdesks that resolve 80% of inquiries automatically.');
  const heroHighlight = get('hero', 'body_highlight', '80% of inquiries automatically');
  const heroBtn1    = get('hero', 'btn_1_label',     'Launch AI Helpdesk');
  const heroBtn2    = get('hero', 'btn_2_label',     'WhatsApp Demo');
  const heroWA      = get('hero', 'whatsapp_number', '919810984968');
  const accentFrom  = get('hero', 'accent_from',     '#3b82f6');
  const accentTo    = get('hero', 'accent_to',       '#6366f1');

  // ── Stats Card ────────────────────────────────────────────────────────────
  const statsRaw      = get('stats_card', 'stats_json',       JSON.stringify(DEFAULT_STATS));
  const stats         = safeParse<StatItem[]>(statsRaw, DEFAULT_STATS);
  const latestMsg     = get('stats_card', 'latest_resolution', 'Password reset resolved automatically using knowledge base article.');
  const latestLabel   = get('stats_card', 'latest_label',      'Latest AI Resolution');

  // ── Features ──────────────────────────────────────────────────────────────
  const featuresRaw = get('features', 'items_json', JSON.stringify(DEFAULT_FEATURES));
  const features    = safeParse<FeatureItem[]>(featuresRaw, DEFAULT_FEATURES);

  // ── Pillars section ───────────────────────────────────────────────────────
  const pillarsHead   = get('pillars', 'headline',   'Zero-Latency Resolution');
  const pillarsImgUrl = get('pillars', 'image_url',  'https://img.freepik.com/free-photo/man-working-eco-friendly-wind-power-project-with-wind-turbines_23-2148847767.jpg');
  const pillarsRaw    = get('pillars', 'items_json', JSON.stringify(DEFAULT_PILLARS));
  const pillars       = safeParse<PillarItem[]>(pillarsRaw, DEFAULT_PILLARS);

  // ── CTA Banner ────────────────────────────────────────────────────────────
  const ctaHead  = get('cta_banner', 'headline',  'SOLVE AT SCALE');
  const ctaBody  = get('cta_banner', 'body',      'Our support architects at DLF Cyber City are ready to deploy your autonomous helpdesk.');
  const ctaBtn   = get('cta_banner', 'btn_label', 'CONTACT HUB');
  const ctaPhone = get('cta_banner', 'phone',     '+91 870023 6923');

  // ── Derived styles ─────────────────────────────────────────────────────────
  const btnShadow = `0 0 40px ${accentFrom}66`;

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-28 pb-20 md:pt-32 md:pb-32 px-6 overflow-hidden">

        {/* background glow */}
        <div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[140px] -z-10"
          style={{ background: `${accentFrom}1a` }}
        />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 backdrop-blur-md"
              style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}
            >
              <LifeBuoy className="w-4 h-4" style={{ color: accentFrom }} />
              <span
                className="text-xs font-bold uppercase tracking-widest"
                style={{ color: accentFrom }}
              >
                {heroBadge}
              </span>
            </div>

            <h1
              className="font-black mb-8 tracking-tighter leading-none"
              style={{ fontSize: 'clamp(2.8rem, 6vw, 5rem)' }}
            >
              {heroHead1} <br />
              <span
                className="text-transparent bg-clip-text"
                style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}
              >
                {heroHead2}
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl leading-relaxed mb-12 max-w-xl">
              {heroBody.replace(heroHighlight, '')}
              <span className="text-white font-semibold">{heroHighlight}</span>.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="px-10 py-5 w-full rounded-2xl font-bold transition-all shadow-xl"
                style={{ background: accentFrom, boxShadow: btnShadow, color: '#fff' }}
                onClick={() => setModalOpen(true)}
              >
                {heroBtn1}
              </button>
              <a
                href={`https://wa.me/${heroWA}?text=${encodeURIComponent(
                  "Hello! I'm interested in Support Suite and would like to see a Resolution Demo."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
                </svg>
                {heroBtn2}
              </a>
            </div>
          </div>

          {/* RIGHT — Dashboard card */}
          <div className="relative">
            <div
              className="relative rounded-[2.5rem] p-10 backdrop-blur-xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: `0 0 60px ${accentFrom}26`,
              }}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">{stats[0]?.label ?? 'AI Resolution Rate'}</span>
                  <span className="font-bold" style={{ color: accentFrom }}>{stats[0]?.value ?? '82%'}</span>
                </div>
                <div className="h-3 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: stats[0]?.value ?? '82%', background: accentFrom }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  {stats.slice(1, 3).map((s, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-xl border"
                      style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                    >
                      <p className="text-xs text-gray-400">{s.label}</p>
                      <p className="text-2xl font-bold text-white">{s.value}</p>
                    </div>
                  ))}
                </div>

                <div
                  className="p-5 rounded-xl border"
                  style={{ background: 'rgba(255,255,255,0.05)', borderColor: 'rgba(255,255,255,0.1)' }}
                >
                  <p className="text-xs text-gray-400 mb-2">{latestLabel}</p>
                  <p className="text-sm text-gray-300">"{latestMsg}"</p>
                </div>
              </div>
            </div>
            <div
              className="absolute -bottom-10 -right-10 w-60 h-60 blur-[120px] rounded-full pointer-events-none"
              style={{ background: `${accentFrom}33` }}
            />
          </div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, i) => {
            const Icon = resolveIcon(item.icon);
            return (
              <div
                key={i}
                className="group p-10 rounded-[2.5rem] border transition-all"
                style={{ background: `${accentFrom}0d`, borderColor: 'rgba(255,255,255,0.05)' }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentFrom}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              >
                <div
                  className="mb-6 p-4 rounded-2xl inline-block transition-all"
                  style={{ background: `${accentFrom}1a`, color: accentFrom }}
                  onMouseEnter={e => { (e.currentTarget.style.background = accentFrom); (e.currentTarget.style.color = '#fff'); }}
                  onMouseLeave={e => { (e.currentTarget.style.background = `${accentFrom}1a`); (e.currentTarget.style.color = accentFrom); }}
                >
                  <Icon className="w-8 h-8" />
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

      {/* ── PILLARS ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 group">
            <img
              src={pillarsImgUrl}
              alt="Knowledge Navigation"
              className="w-full h-auto opacity-70 group-hover:scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 italic">{pillarsHead}</h2>
            <div className="space-y-8">
              {pillars.map((point, idx) => {
                const Icon = resolveIcon(point.icon);
                return (
                  <div key={idx} className="flex gap-5">
                    <div className="mt-1">
                      <Icon style={{ color: accentFrom }} />
                    </div>
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

      <FeatureGrid />
      <SuccessStories />

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div
          className="max-w-6xl mx-auto rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{
            background: `linear-gradient(to bottom right, ${accentFrom}40, ${accentTo}26)`,
            border: `1px solid ${accentFrom}33`,
          }}
        >
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
                <Headphones className="w-4 h-4" />
                <span>{ctaPhone}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="Support & Knowledge"
        productTagline="AI Helpdesk & Wiki"
        accentColor={accentFrom}
      />
      <Footer />
    </main>
  );
}
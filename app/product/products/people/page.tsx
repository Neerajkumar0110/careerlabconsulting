'use client';

import React, { useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import SuccessStories from '@/components/product/SuccessStories';
import ExecutionFlow from '@/components/product/ExecutionFlow';
import FeatureGrid from '@/components/product/FeatureGrid';
import CTAModal from '@/components/product/CTAModel';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Users, UserPlus, HeartHandshake, Microscope, Award,
  ShieldCheck, Zap, Brain, Target, BarChart3, Star,
  Layers, Cpu, Database, Activity, Bell, MessageSquare,
  Settings, Lock, Rocket, TrendingUp, Globe2, Headphones,
} from 'lucide-react';

// ─── Icon registry ──────────────────────────────────────────────────────────
const ICON_MAP: Record<string, React.ElementType> = {
  Users, UserPlus, HeartHandshake, Microscope, Award,
  ShieldCheck, Zap, Brain, Target, BarChart3, Star,
  Layers, Cpu, Database, Activity, Bell, MessageSquare,
  Settings, Lock, Rocket, TrendingUp, Globe2, Headphones,
};
function resolveIcon(name: string): React.ElementType {
  return ICON_MAP[name] ?? Zap;
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface FeatureItem  { icon: string; title: string; desc: string }
interface BulletItem   { text: string }
interface StatItem     { value: string; label: string }
interface PillarItem   { icon: string; title: string; desc: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ─── Defaults ─────────────────────────────────────────────────────────────────
const DEFAULT_FEATURES: FeatureItem[] = [
  { icon: 'UserPlus',      title: 'Autonomous Recruiting',  desc: 'Identify top-tier talent with AI screening that removes bias and predicts cultural fit.'            },
  { icon: 'HeartHandshake',title: 'Sentiment Analysis',     desc: 'Real-time employee engagement monitoring to reduce churn and boost workplace morale.'               },
  { icon: 'ShieldCheck',   title: 'Compliance Shield',      desc: 'Global payroll and labor law compliance automated across 150+ jurisdictions.'                       },
];
const DEFAULT_BULLETS: BulletItem[] = [
  { text: 'AI Talent Matching'       },
  { text: 'Workforce Analytics'      },
  { text: 'Global HR Automation'     },
];
const DEFAULT_STATS: StatItem[] = [
  { value: '92%',  label: 'Retention Rate'  },
  { value: '3.4x', label: 'Hiring Speed'    },
  { value: '150+', label: 'Jurisdictions'   },
];
const DEFAULT_PILLARS: PillarItem[] = [
  { icon: 'Microscope', title: 'Predictive Attrition',  desc: 'Identify high-risk churn before it happens with neural modeling.'                      },
  { icon: 'Award',      title: 'Automated L&D',         desc: "Personalized learning paths that evolve with your employee's career."                  },
  { icon: 'Users',      title: 'Global Talent Pool',    desc: 'Access a verified network of elite freelancers and experts instantly.'                 },
];

// ────────────────────────────────────────────────────────────────────────────
export default function PeopleSuitePage() {
  const [modalOpen, setModalOpen] = useState(false);
  const { get, content } = usePageContent('people-suite');
  const sectionVisible = (key: string) => !!content?.[key];

  // ── Hero ──────────────────────────────────────────────────────────────────
  const heroBadge    = get('hero', 'badge_text',       'Next-Gen HR & Talent');
  const heroHead1    = get('hero', 'headline_1',       'PEOPLE');
  const heroHead2    = get('hero', 'headline_2',       'SUITE');
  const heroBody     = get('hero', 'body',             'Architecting the future of human capital. Our AI-driven platform automates talent acquisition, enhances employee engagement, and streamlines workforce management across global organizations.');
  const heroBtn1     = get('hero', 'btn_1_label',      'Transform Your HR');
  const heroBtn2     = get('hero', 'btn_2_label',      'WhatsApp Demo');
  const heroWA       = get('hero', 'whatsapp_number',  '919810984968');
  const accentFrom   = get('hero', 'accent_from',      '#3b82f6');
  const accentTo     = get('hero', 'accent_to',        '#8b5cf6');
  const bulletsRaw   = get('hero', 'bullets_json',     JSON.stringify(DEFAULT_BULLETS));
  const bullets      = safeParse<BulletItem[]>(bulletsRaw, DEFAULT_BULLETS);

  // ── Stats Card ────────────────────────────────────────────────────────────
  const statsRaw  = get('stats_card', 'stats_json',  JSON.stringify(DEFAULT_STATS));
  const stats     = safeParse<StatItem[]>(statsRaw, DEFAULT_STATS);
  const statLabel = get('stats_card', 'label',       'Platform Overview');

  // ── Features ──────────────────────────────────────────────────────────────
  const featuresRaw = get('features', 'items_json', JSON.stringify(DEFAULT_FEATURES));
  const features    = safeParse<FeatureItem[]>(featuresRaw, DEFAULT_FEATURES);

  // ── Pillars section ───────────────────────────────────────────────────────
  const pillarsHead    = get('pillars', 'headline',   'Data-Driven Culture');
  const pillarsImgUrl  = get('pillars', 'image_url',  'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800');
  const pillarsRaw     = get('pillars', 'items_json', JSON.stringify(DEFAULT_PILLARS));
  const pillars        = safeParse<PillarItem[]>(pillarsRaw, DEFAULT_PILLARS);

  // ── CTA Banner ────────────────────────────────────────────────────────────
  const ctaHead  = get('cta_banner', 'headline',  'REDEFINE TALENT');
  const ctaBody  = get('cta_banner', 'body',      'Join leading global enterprises operating across 8 primary tech hubs with Career Lab Consulting.');
  const ctaBtn   = get('cta_banner', 'btn_label', 'CONTACT HUB');
  const ctaPhone = get('cta_banner', 'phone',     '+91 870023 6923');

  // ── Derived styles ─────────────────────────────────────────────────────────
  const btnShadow = `0 0 40px ${accentFrom}66`;

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden px-6 pt-28 pb-20 sm:pt-32 md:pt-44 md:pb-32">

        {/* Background glows */}
        <div
          className="absolute -top-20 left-1/4 w-[420px] h-[420px] rounded-full blur-[140px] -z-10"
          style={{ background: `${accentFrom}1a` }}
        />
        <div
          className="absolute top-40 right-1/4 w-[420px] h-[420px] rounded-full blur-[140px] -z-10"
          style={{ background: `${accentTo}1a` }}
        />

        {/* subtle grid */}
        <div
          className="absolute inset-0 -z-10 opacity-[0.04]"
          style={{
            backgroundImage:
              `linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />

        <div className="max-w-7xl mx-auto text-center">

          {/* badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-md mb-8"
            style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}
          >
            <span
              className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em]"
              style={{ color: accentFrom }}
            >
              {heroBadge}
            </span>
          </div>

          {/* headline */}
          <h1
            className="font-black mb-8 leading-[0.95]"
            style={{ fontSize: 'clamp(2.8rem, 8vw, 7rem)', letterSpacing: '-0.04em' }}
          >
            <span className="text-white">{heroHead1} </span>
            <span
              className="text-transparent bg-clip-text"
              style={{ backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentTo})` }}
            >
              {heroHead2}
            </span>
          </h1>

          {/* description */}
          <p className="max-w-2xl mx-auto text-gray-400 text-base sm:text-lg md:text-xl leading-relaxed mb-12">
            {heroBody}
          </p>

          {/* bullet chips */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-gray-400 mb-12">
            {bullets.map((b, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: i % 2 === 0 ? accentFrom : accentTo }} />
                {b.text}
              </div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="px-10 py-4 sm:py-5 rounded-xl sm:rounded-2xl font-bold transition-all hover:-translate-y-[2px]"
              style={{ background: accentFrom, boxShadow: btnShadow, color: '#fff' }}
              onClick={() => setModalOpen(true)}
            >
              {heroBtn1}
            </button>
            <a
              href={`https://wa.me/${heroWA}?text=${encodeURIComponent(
                "Hello! I'm interested in People Suite and would like to see a demo."
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
              </svg>
              {heroBtn2}
            </a>
          </div>
        </div>
      </section>

      {/* ── STATS CARD ────────────────────────────────────────────────────── */}
      <section className="px-6 pb-12">
        <div
          className="max-w-3xl mx-auto rounded-[2rem] p-8 border backdrop-blur-xl"
          style={{ background: `${accentFrom}08`, borderColor: `${accentFrom}20`, boxShadow: `0 0 40px ${accentFrom}0d` }}
        >
          <p className="text-xs uppercase tracking-widest mb-6 text-center" style={{ color: accentFrom }}>{statLabel}</p>
          <div className={`grid grid-cols-${stats.length} gap-6`}>
            {stats.map((s, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl font-black mb-1" style={{ color: accentFrom }}>{s.value}</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
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
              alt="Team Collaboration"
              className="w-full h-auto opacity-80 group-hover:scale-110 transition-transform duration-1000"
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
          className="max-w-6xl mx-auto rounded-[3rem] p-12 md:p-24 text-center border relative overflow-hidden"
          style={{
            background: `linear-gradient(to bottom right, ${accentFrom}40, ${accentTo}20)`,
            borderColor: `${accentFrom}20`,
          }}
        >
          <div
            className="absolute -top-24 -left-24 w-64 h-64 rounded-full blur-3xl pointer-events-none"
            style={{ background: `${accentFrom}1a` }}
          />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter">{ctaHead}</h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-6">
              <button
                className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: accentFrom }}
                onClick={() => setModalOpen(true)}
              >
                {ctaBtn}
              </button>
              <div className="font-mono text-sm tracking-widest" style={{ color: accentFrom }}>
                {ctaPhone}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTAModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        productName="People Suite"
        productTagline="Next Gen HR & Talent"
        accentColor={accentFrom}
      />
      <Footer />
    </main>
  );
}
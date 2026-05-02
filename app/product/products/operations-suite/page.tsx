'use client';

import React, { useState } from 'react';
import Navbar from '@/components/product/Navbar';
import Footer from '@/components/product/Footer';
import ExecutionFlow from '@/components/product/ExecutionFlow';
import FeatureGrid from '@/components/product/FeatureGrid';
import CTAModal from '@/components/product/CTAModel';
import TrustedIntegration from '@/components/product/TrustedIntegrations';
import { usePageContent } from '@/hooks/usePageContent';

// ── Helpers ───────────────────────────────────────────────────────────────────
function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Types ─────────────────────────────────────────────────────────────────────
interface StatItem    { label: string; value: string; }
interface FeatureCard { title: string; desc: string; image: string; }

// ── Defaults ──────────────────────────────────────────────────────────────────
const DEFAULT_STATS_JSON = JSON.stringify([
  { label: 'Efficiency Boost', value: '+300%' },
  { label: 'Precision Rate',   value: '99.9%' },
  { label: 'Operating Costs',  value: '-25%'  },
  { label: 'Uptime',           value: '99.99%'},
]);

const DEFAULT_FEATURE_CARDS_JSON = JSON.stringify([
  {
    title: 'Inventory Intelligence',
    desc:  'Predictive stock management that eliminates overstocking using proprietary AI forecasting.',
    image: 'https://images.pexels.com/photos/4481326/pexels-photo-4481326.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
  {
    title: 'Workflow Orchestration',
    desc:  'Automate cross-departmental tasks with zero-latency triggers and real-time status tracking.',
    image: 'https://images.pexels.com/photos/3183146/pexels-photo-3183146.jpeg?auto=compress&cs=tinysrgb&w=800',
  },
]);

// ── Page Component ────────────────────────────────────────────────────────────
const OperationsSuitePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const { get } = usePageContent('operations-suite');

  // ── CMS values ─────────────────────────────────────────────────────────────
  const accentColor       = get('hero', 'accent_color',       '#3b82f6');
  const accentSecondary   = get('hero', 'accent_secondary',   '#6366f1');
  const badgeText         = get('hero', 'badge_text',         'Enterprise Operations');
  const headline1         = get('hero', 'headline_1',         'Precision');
  const headline2         = get('hero', 'headline_2',         'Orchestration');
  const heroBody          = get('hero', 'body_text',          'Eliminate bottlenecks with AI-driven supply chain intelligence and automated internal workflows. Engineered for high-scale global enterprises.');
  const heroBtn1Label     = get('hero', 'btn_1_label',        'Optimize Now');
  const heroBtn2Label     = get('hero', 'btn_2_label',        'WhatsApp Demo');
  const whatsappNumber    = get('hero', 'whatsapp_number',    '919810984968');
  const whatsappMsg       = get('hero', 'whatsapp_message',   "Hello! I'm interested in Operations Suite and would like to see a System Overview.");
  const heroImageUrl      = get('hero', 'hero_image_url',     'https://images.pexels.com/photos/4481259/pexels-photo-4481259.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1');

  const statsRaw          = get('stats', 'items_json',        DEFAULT_STATS_JSON);
  const statsItems        = safeParse<StatItem[]>(statsRaw, []);

  const featuresHeadline  = get('features', 'headline',       'Operational Mastery');
  const featuresSubhead   = get('features', 'subheading',     'Next-gen tools to manage complex logistics and high-speed data.');
  const featureCardsRaw   = get('features', 'cards_json',     DEFAULT_FEATURE_CARDS_JSON);
  const featureCards      = safeParse<FeatureCard[]>(featureCardsRaw, []);

  const ctaHeadline       = get('cta', 'headline',            'AUTO-PILOT YOUR OPERATIONS');
  const ctaBody           = get('cta', 'body_text',           'Our engineering team is ready to architect your autonomous operations future. Schedule your technical deep-dive today.');
  const ctaBtnLabel       = get('cta', 'btn_label',           'GET STARTED');
  const ctaPhone          = get('cta', 'phone',               '+91 870023 6923');

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full pt-28 pb-16 md:pt-40 md:pb-32 px-6 lg:px-12">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}1a` }} />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="z-10 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border mb-6"
              style={{ background: `${accentColor}1a`, borderColor: `${accentColor}33` }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                  style={{ background: accentColor }} />
                <span className="relative inline-flex rounded-full h-2 w-2" style={{ background: accentColor }} />
              </span>
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: accentColor }}>{badgeText}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-[1.1] tracking-tight">
              {headline1} <br />
              <span style={{ background: `linear-gradient(to right, ${accentColor}, ${accentSecondary})`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                {headline2}
              </span>
            </h1>

            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed">
              {heroBody}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                className="px-10 py-4 w-full text-white font-bold rounded-2xl transition-all hover:-translate-y-1"
                style={{ background: accentColor, boxShadow: `0 0 25px ${accentColor}4d` }}
                onClick={() => setModalOpen(true)}
              >
                {heroBtn1Label}
              </button>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`}
                target="_blank" rel="noopener noreferrer"
                className="group w-full flex items-center justify-center gap-3 px-8 py-4 bg-white/5 hover:bg-green-600 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all border border-white/10 hover:border-[#25D366]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232" />
                </svg>
                {heroBtn2Label}
              </a>
            </div>
          </div>

          {/* Hero image */}
          <div className="relative group">
            <div className="absolute -inset-1 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"
              style={{ background: `linear-gradient(to right, ${accentColor}, ${accentSecondary})` }} />
            <div className="relative z-10 rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl bg-[#020617]">
              <img
                src={heroImageUrl}
                alt="Operations Intelligence"
                className="w-full h-auto object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section className="py-12 border-y border-white/5 backdrop-blur-sm"
        style={{ background: `${accentColor}0d` }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {statsItems.map((stat, i) => (
              <div key={i} className="space-y-1">
                <h3 className="text-2xl md:text-4xl font-bold text-white">{stat.value}</h3>
                <p className="text-xs md:text-sm font-medium uppercase tracking-widest" style={{ color: `${accentColor}cc` }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="py-20 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] blur-[120px] -z-10"
          style={{ background: `${accentSecondary}0d` }} />
        <ExecutionFlow />
      </div>

      <TrustedIntegration />

      {/* ── FEATURES CARDS ───────────────────────────────────────────────── */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">{featuresHeadline}</h2>
              <p className="text-gray-400">{featuresSubhead}</p>
            </div>
            <div className="hidden md:block h-[1px] flex-grow bg-white/10 mx-8 mb-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featureCards.map((card, i) => (
              <div key={i} className="group relative p-1 rounded-[2rem] overflow-hidden">
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(to bottom right, ${i === 0 ? accentColor : accentSecondary}33, transparent)` }} />
                <div className="relative bg-white/5 p-8 md:p-12 rounded-[1.9rem] border border-white/10 h-full backdrop-blur-xl">
                  <h4 className="text-2xl font-bold mb-4 transition-colors" style={{ color: undefined }}
                    onMouseEnter={e => ((e.target as HTMLElement).style.color = accentColor)}
                    onMouseLeave={e => ((e.target as HTMLElement).style.color = '')}
                  >
                    {card.title}
                  </h4>
                  <p className="text-gray-400 mb-8">{card.desc}</p>
                  <img src={card.image} className="rounded-2xl w-full h-56 object-cover border border-white/5" alt={card.title} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FeatureGrid />

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden group"
          style={{ background: `linear-gradient(to bottom right, ${accentColor}26, ${accentSecondary}1a)`, border: `1px solid ${accentColor}33` }}>
          <div className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full blur-3xl group-hover:scale-150 transition-all duration-1000"
            style={{ background: `${accentColor}1a` }} />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">{ctaHeadline}</h2>
            <p className="text-blue-100/70 text-lg mb-10 max-w-2xl mx-auto">{ctaBody}</p>
            <div className="flex flex-col items-center gap-4">
              <button
                className="px-16 py-5 rounded-full font-black text-2xl transition-all hover:scale-105 shadow-2xl"
                style={{ background: '#fff', color: '#0f172a' }}
                onClick={() => setModalOpen(true)}
              >
                {ctaBtnLabel}
              </button>
              <p className="font-mono text-sm" style={{ color: accentColor }}>{ctaPhone}</p>
            </div>
          </div>
        </div>
      </section>

      <CTAModal isOpen={modalOpen} onClose={() => setModalOpen(false)} productName="Operations Suite" productTagline="People + Finance + Inventory" accentColor={accentColor} />
      <Footer />
    </main>
  );
};

export default OperationsSuitePage;
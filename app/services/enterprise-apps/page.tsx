'use client';

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import ExecutionFlow from '@/components/sections/ExecutionFlow';
import FeatureGrid from '@/components/sections/FeatureGrid';
import { usePageContent } from '@/hooks/usePageContent';
import {
  Building2,
  ShieldCheck,
  Workflow,
  Users2,
  Lock,
  Settings2,
  ArrowRight,
  Database,
  BarChart3,
} from 'lucide-react';

// ── Icon maps ─────────────────────────────────────────────────────────────────
const SOLUTION_ICON_MAP: Record<string, React.ElementType> = {
  BarChart3,
  Database,
  Workflow,
};

// ── Types ─────────────────────────────────────────────────────────────────────
interface Solution    { title: string; desc: string; icon: string }
interface VaultRow    { label: string; status: string }
interface SecurityItem{ icon: string; title: string; desc: string }

function safeParse<T>(raw: string, fallback: T): T {
  try { return JSON.parse(raw) as T; } catch { return fallback; }
}

// ── Defaults (mirror seed file) ───────────────────────────────────────────────
const DEFAULT_SOLUTIONS = JSON.stringify([
  { title: 'AI Decision Support',      desc: 'Custom BI tools that use predictive modeling to assist C-suite and managers in real-time strategy.',                                       icon: 'BarChart3' },
  { title: 'Internal Knowledge Bases', desc: 'Proprietary RAG systems that allow employees to query HR, Legal, and Tech docs instantly.',                                              icon: 'Database'  },
  { title: 'Workflow Copilots',        desc: 'Embedded assistants for Sales, Ops, and Support teams that automate 80% of routine CRM tasks.',                                         icon: 'Workflow'  },
]);
const DEFAULT_VAULT_ROWS = JSON.stringify([
  { label: 'VPC Isolation',           status: 'Enabled' },
  { label: 'SSO/SAML Integration',    status: 'Active'  },
  { label: 'Data Encryption at Rest', status: 'AES-256' },
]);
const DEFAULT_SECURITY_ITEMS = JSON.stringify([
  { icon: 'Lock',     title: 'Zero Data Leaks', desc: 'No training on your proprietary inputs.'        },
  { icon: 'Settings2',title: 'SSO/IAM Ready',   desc: 'Seamless integration with Azure AD/Okta.'      },
]);

export default function EnterpriseAIAppsPage() {
  const { get } = usePageContent('services-enterprise-ai');

  // ── Hero ────────────────────────────────────────────────────────────────
  const accentColor      = get('hero', 'accent_color',     '#3b82f6');
  const badgeText        = get('hero', 'badge_text',       'Internal Ecosystem Engineering');
  const headlinePlain    = get('hero', 'headline_plain',   'ENTERPRISE');
  const headlineAccent   = get('hero', 'headline_accent',  'AI SOLUTIONS');
  const bodyText         = get('hero', 'body_text',        'Turn your internal data into an operational advantage. We build private, high-security AI applications that streamline departmental workflows without exposing your data to the public web.');
  const primaryBtnLabel  = get('hero', 'primary_btn_label','Start Enterprise Audit');
  const primaryBtnHref   = get('hero', 'primary_btn_href', '/contact');
  const secondBtnLabel   = get('hero', 'second_btn_label', 'Security Protocol');
  const secondBtnHref    = get('hero', 'second_btn_href',  '/contact');
  const accentFrom       = get('hero', 'accent_from',      '#60a5fa');
  const accentMid        = get('hero', 'accent_mid',       '#818cf8');
  const accentTo         = get('hero', 'accent_to',        '#2563eb');

  // ── Solutions ───────────────────────────────────────────────────────────
  const solutions        = safeParse<Solution[]>(get('solutions', 'solutions_json', DEFAULT_SOLUTIONS), []);

  // ── Security ────────────────────────────────────────────────────────────
  const secHeadlineLine1 = get('security', 'headline_line1',  'Private.');
  const secHeadlineLine2 = get('security', 'headline_line2',  'Portable.');
  const secHeadlineLine3 = get('security', 'headline_line3',  'Powerful.');
  const secBodyText      = get('security', 'body_text',       'Our enterprise applications are built to coexist with your current security stack. Whether it\'s on-premise, private cloud, or air-gapped environments, we ensure your AI is as secure as your core business.');
  const vaultRows        = safeParse<VaultRow[]>(get('security', 'vault_rows_json', DEFAULT_VAULT_ROWS), []);
  const securityItems    = safeParse<SecurityItem[]>(get('security', 'security_items_json', DEFAULT_SECURITY_ITEMS), []);

  // ── Stack ───────────────────────────────────────────────────────────────
  const stackHeadline    = get('stack', 'headline',   'Enterprise AI Stack');
  const stackSubhead     = get('stack', 'subheading', 'Standardized frameworks for global organizations.');

  // ── CTA ─────────────────────────────────────────────────────────────────
  const ctaHeadlineLine1 = get('cta', 'headline_line1', 'Empower Your');
  const ctaHeadlineLine2 = get('cta', 'headline_line2', 'Workforce');
  const ctaBodyText      = get('cta', 'body_text',      'Our enterprise consultants at DLF Cyber City are ready to design your private AI landscape.');
  const ctaBtnLabel      = get('cta', 'btn_label',      'BOOK STRATEGY SESSION');
  const ctaBtnHref       = get('cta', 'btn_href',       '/contact');
  const ctaPhone         = get('cta', 'phone_number',   '+91 870023 6923');

  // ── Derived styles ───────────────────────────────────────────────────────
  const accentBg   = `${accentColor}1a`;   // 10% opacity fill
  const accentBorder = `${accentColor}33`; // 20% opacity border

  return (
    <main className="flex min-h-screen flex-col bg-[#020617] text-white overflow-x-hidden">
      <Navbar />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6">
        <div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] -z-10"
          style={{ background: `${accentColor}1a` }}
        />

        <div className="max-w-7xl mx-auto text-center">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8 backdrop-blur-md"
            style={{ background: accentBg, borderColor: accentBorder }}
          >
            <Building2 className="w-4 h-4" style={{ color: accentColor }} />
            <span
              className="text-xs font-bold uppercase tracking-widest"
              style={{ color: accentColor }}
            >
              {badgeText}
            </span>
          </div>

          <h1 className="text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight">
            {headlinePlain} <br />
            <span
              className="text-transparent bg-clip-text italic"
              style={{
                backgroundImage: `linear-gradient(to right, ${accentFrom}, ${accentMid}, ${accentTo})`,
              }}
            >
              {headlineAccent}
            </span>
          </h1>

          <p className="max-w-3xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12">
            {bodyText}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = primaryBtnHref)}
              className="px-10 py-5 rounded-2xl font-bold transition-all shadow-xl flex items-center justify-center gap-2 text-white hover:opacity-90"
              style={{
                background: accentColor,
                boxShadow:  `0 20px 40px ${accentColor}33`,
              }}
            >
              {primaryBtnLabel} <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => (window.location.href = secondBtnHref)}
              className="px-10 py-5 bg-white/5 border border-white/10 hover:bg-white/10 rounded-2xl font-bold transition-all"
            >
              {secondBtnLabel}
            </button>
          </div>
        </div>
      </section>

      {/* ── SOLUTIONS ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {solutions.map((item, i) => {
            const Icon = SOLUTION_ICON_MAP[item.icon] ?? BarChart3;
            return (
              <div
                key={i}
                className="group p-10 rounded-[2.5rem] border border-white/5 transition-all"
                style={{ background: accentBg }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = `${accentColor}4d`)}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)')}
              >
                <div
                  className="mb-6 p-4 rounded-2xl inline-block transition-all group-hover:text-white"
                  style={{ background: accentBg, color: accentColor }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.background = accentColor;
                    (e.currentTarget as HTMLElement).style.color = '#fff';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.background = accentBg;
                    (e.currentTarget as HTMLElement).style.color = accentColor;
                  }}
                >
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── SECURITY ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

          {/* Left — vault card */}
          <div className="order-2 lg:order-1 relative">
            <div
              className="absolute -inset-10 blur-[100px] rounded-full"
              style={{ background: `${accentColor}0d` }}
            />
            <div className="relative bg-[#03081a] border border-white/10 rounded-[3rem] p-10 shadow-2xl overflow-hidden">
              <div className="flex items-center gap-3 mb-8">
                <ShieldCheck className="w-6 h-6" style={{ color: accentColor }} />
                <span
                  className="font-mono text-xs tracking-[0.2em] uppercase"
                  style={{ color: accentColor }}
                >
                  Secure_Vault_Deployment
                </span>
              </div>

              <div className="space-y-4">
                {vaultRows.map((row, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center p-4 rounded-xl bg-white/5 border border-white/5"
                  >
                    <span className="text-sm font-bold text-gray-300">{row.label}</span>
                    <span
                      className="text-[10px] font-mono font-bold"
                      style={{ color: accentColor }}
                    >
                      {row.status}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map(i => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-[#03081a] flex items-center justify-center"
                      style={{ background: `${accentColor}1a` }}
                    >
                      <Users2 className="w-4 h-4" style={{ color: accentColor }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right — copy */}
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-black mb-8 italic tracking-tighter">
              {secHeadlineLine1} <br />
              {secHeadlineLine2} <br />
              {secHeadlineLine3}
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">{secBodyText}</p>

            <div className="grid grid-cols-2 gap-6">
              {securityItems.map((item, i) => {
                const Icon = item.icon === 'Lock' ? Lock : Settings2;
                return (
                  <div key={i} className="flex items-start gap-3">
                    <Icon className="shrink-0 mt-1" style={{ color: accentColor }} />
                    <div>
                      <h4 className="font-bold">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── STACK ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-6 border-y border-white/5">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold italic">{stackHeadline}</h2>
          <p className="text-gray-500 mt-4">{stackSubhead}</p>
        </div>
        <div className="mt-20">
          <ExecutionFlow />
        </div>
      </section>

      <FeatureGrid />

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className="py-32 px-6">
        <div
          className="max-w-6xl mx-auto border rounded-[4rem] p-12 md:p-24 text-center backdrop-blur-3xl relative overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom right, ${accentColor}1a, ${accentTo}1a)`,
            borderColor:     `${accentColor}33`,
          }}
        >
          <div className="relative z-10">
            <h2 className="text-4xl md:text-7xl font-black mb-8 italic tracking-tighter uppercase leading-tight">
              {ctaHeadlineLine1} <br /> {ctaHeadlineLine2}
            </h2>
            <p className="text-blue-100/70 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
              {ctaBodyText}
            </p>
            <div className="flex flex-col items-center gap-6">
              <button
                onClick={() => (window.location.href = ctaBtnHref)}
                className="bg-white px-16 py-6 rounded-full font-black text-2xl hover:scale-110 transition-all shadow-2xl"
                style={{ color: accentTo }}
              >
                {ctaBtnLabel}
              </button>
              <div
                className="font-mono text-sm tracking-widest uppercase"
                style={{ color: accentColor }}
              >
                {ctaPhone}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
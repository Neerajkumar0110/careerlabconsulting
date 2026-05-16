"use client";

import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/sections/Footer';
import {
  TrendingUp, MessageSquare, ShieldAlert,
  Zap, Clock, Mail, ChevronRight,
} from 'lucide-react';
import { usePageContent } from '@/hooks/usePageContent';

const EscalationPolicy = () => {
  const { get } = usePageContent('home-escalation');

  // ── Hero ──────────────────────────────────────────────────────────────────
  const accentFrom        = get('hero', 'accent_from',     '#3b82f6');
  const accentTo          = get('hero', 'accent_to',       '#6366f1');
  const badgeText         = get('hero', 'badge_text',      'Priority Resolution');
  const headlinePlain     = get('hero', 'headline_plain',  'Escalation');
  const headlineAccent    = get('hero', 'headline_accent', 'Policy.');
  const lastUpdated       = get('hero', 'last_updated',    'January 26, 2026');

  // ── Commitment ────────────────────────────────────────────────────────────
  const commitTitle       = get('commitment', 'section_title', 'Our Commitment');
  const commitBody        = get('commitment', 'body_text',     'We aim for first-contact resolution. However, we understand that complex technical or billing issues may require specialized attention. This policy outlines the tiered process we use to escalate and resolve your concerns with maximum efficiency and transparency.');

  // ── Tiers ─────────────────────────────────────────────────────────────────
  const tiersTitle        = get('tiers', 'section_title',    'Resolution Tiers');
  const tier1Title        = get('tiers', 'tier1_title',      'Level 01: Standard Support');
  const tier1Badge        = get('tiers', 'tier1_badge',      'Response: 24h');
  const tier1Body         = get('tiers', 'tier1_body',       'Initial contact via our ticketing system or support email. Most technical and general inquiries are resolved here.');
  const tier2Title        = get('tiers', 'tier2_title',      'Level 02: Management Review');
  const tier2Badge        = get('tiers', 'tier2_badge',      'Response: 48h');
  const tier2Body         = get('tiers', 'tier2_body',       'If Level 01 fails to provide a satisfactory solution, your case is moved to a Senior Support Specialist or Department Lead.');
  const tier3Title        = get('tiers', 'tier3_title',      'Level 03: Executive Escalation');
  const tier3Badge        = get('tiers', 'tier3_badge',      'Priority: Critical');
  const tier3Body         = get('tiers', 'tier3_body',       'Final stage involving our Compliance Officer or Executive Management for disputes that remain unresolved after 7 business days.');

  // ── When to Escalate ──────────────────────────────────────────────────────
  const whenTitle         = get('when_to_escalate', 'section_title', 'When to Escalate?');
  const whenBullet1       = get('when_to_escalate', 'bullet1',       'No response for over 48 business hours.');
  const whenBullet2       = get('when_to_escalate', 'bullet2',       'Technical bug preventing service access.');
  const whenBullet3       = get('when_to_escalate', 'bullet3',       'Dispute regarding Refund Policy eligibility.');

  // ── Emergency ─────────────────────────────────────────────────────────────
  const emergencyTitle    = get('emergency', 'section_title', 'Emergency Cases');
  const emergencyBody     = get('emergency', 'body_text',     'Data breaches, account compromises, or total platform outages are treated as Critical (Level 3) immediately. Skip standard tiers and use "EMERGENCY" in your email subject line.');

  // ── Contact ───────────────────────────────────────────────────────────────
  const contactNote       = get('contact', 'note_text',     'Please ensure you have an active Ticket ID before requesting an escalation to Level 02 or higher.');
  const contactCTA        = get('contact', 'cta_headline',  'Raise a Ticket?');
  const contactSubtext    = get('contact', 'subtext',       'Email our specialized resolution team:');
  const contactEmail      = get('contact', 'email_address', 'resolutions@yourdomain.com');
  const contactBtnLabel   = get('contact', 'btn_label',     'Contact Resolutions');

  return (
    <main className="min-h-screen bg-[#020617] text-slate-100 font-sans">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 border-b border-white/5 bg-slate-900/20">
        <div className="max-w-4xl mx-auto">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6 backdrop-blur-xl"
            style={{ background: `${accentFrom}1a`, border: `1px solid ${accentFrom}33` }}
          >
            <TrendingUp size={14} style={{ color: accentFrom }} />
            <span className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: accentFrom }}>
              {badgeText}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-4">
            {headlinePlain} <span className="text-slate-500">{headlineAccent}</span>
          </h1>
          <p className="text-slate-400 font-light italic text-sm">Last Updated: {lastUpdated}</p>
        </div>
      </section>

      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto space-y-16">

          {/* Commitment */}
          <article className="space-y-6">
            <div className="flex items-center gap-3" style={{ color: accentFrom }}>
              <MessageSquare size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">{commitTitle}</h2>
            </div>
            <p className="text-slate-400 leading-relaxed font-light">{commitBody}</p>
          </article>

          {/* Tiers */}
          <article className="space-y-8">
            <div className="flex items-center gap-3" style={{ color: accentFrom }}>
              <Zap size={20} />
              <h2 className="text-xl font-black uppercase tracking-tight italic text-white">{tiersTitle}</h2>
            </div>
            <div className="space-y-4">
              {/* Tier 1 */}
              <div className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-black text-sm uppercase italic tracking-widest" style={{ color: accentFrom }}>{tier1Title}</h4>
                  <span
                    className="text-[10px] px-2 py-1 rounded"
                    style={{ background: `${accentFrom}33`, color: accentFrom }}
                  >{tier1Badge}</span>
                </div>
                <p className="text-sm text-slate-400 font-light">{tier1Body}</p>
              </div>
              {/* Tier 2 */}
              <div className="group p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-black text-sm uppercase italic tracking-widest" style={{ color: accentFrom }}>{tier2Title}</h4>
                  <span
                    className="text-[10px] px-2 py-1 rounded"
                    style={{ background: `${accentFrom}33`, color: accentFrom }}
                  >{tier2Badge}</span>
                </div>
                <p className="text-sm text-slate-400 font-light">{tier2Body}</p>
              </div>
              {/* Tier 3 */}
              <div
                className="p-6 rounded-2xl shadow-lg"
                style={{ background: `${accentFrom}0d`, border: `1px solid ${accentFrom}33` }}
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-white font-black text-sm uppercase italic tracking-widest">{tier3Title}</h4>
                  <span
                    className="text-[10px] text-white px-2 py-1 rounded"
                    style={{ background: accentFrom }}
                  >{tier3Badge}</span>
                </div>
                <p className="text-sm text-slate-300 font-light italic">{tier3Body}</p>
              </div>
            </div>
          </article>

          {/* When to Escalate + Emergency */}
          <article className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-3" style={{ color: accentFrom }}>
                <Clock size={20} />
                <h2 className="text-lg font-black uppercase tracking-tight italic text-white">{whenTitle}</h2>
              </div>
              <ul className="space-y-3 text-sm text-slate-500 font-light">
                {[whenBullet1, whenBullet2, whenBullet3].map((b, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <ChevronRight size={14} style={{ color: accentFrom }} /> {b}
                  </li>
                ))}
              </ul>
            </div>
            <div className="p-8 rounded-[2rem]" style={{ background: '#ef44440d', border: '1px solid #ef444433' }}>
              <div className="flex items-center gap-3 text-red-400 mb-4">
                <ShieldAlert size={20} />
                <h2 className="text-lg font-black uppercase tracking-tight italic text-white">{emergencyTitle}</h2>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed font-light">{emergencyBody}</p>
            </div>
          </article>

          {/* Contact */}
          <article className="pt-10 border-t border-white/5">
            <div className="flex flex-col md:flex-row justify-between gap-10">
              <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-2 text-white font-black italic uppercase">
                  <Mail size={16} />
                  <span>Escalation Desk</span>
                </div>
                <p className="text-sm text-slate-500 font-light">{contactNote}</p>
              </div>
              <div className="space-y-4">
                <h3 className="text-white font-black italic uppercase tracking-tighter text-2xl">{contactCTA}</h3>
                <p className="text-slate-400 text-sm mb-4">{contactSubtext}</p>
                <button
                  onClick={() => window.location.href = `mailto:${contactEmail}`}
                  className="bg-white text-black px-8 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all"
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = accentFrom; (e.currentTarget as HTMLButtonElement).style.color = '#fff'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fff'; (e.currentTarget as HTMLButtonElement).style.color = '#000'; }}
                >
                  {contactBtnLabel}
                </button>
              </div>
            </div>
          </article>

        </div>
      </section>

      <Footer />
    </main>
  );
};

export default EscalationPolicy;